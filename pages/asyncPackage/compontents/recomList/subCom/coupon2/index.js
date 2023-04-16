import {
  mpCmsJump,
  djCmsJump,
} from "../../../../../../common/util/agreementV2.js";
import {
  getCoupon,
  getCouponProtocol,
} from "../../../../../../common/util/services";
import mp from "../../../../../../common/util/wxapi";
import { request, FNIDS } from "../../../../../../common/util/api";
import util from "../../../../../../common/util/util";
import { clickBuriedV2_ } from "../../../../../../common/util/BI";
Component({
  lazyObj: {
    epSelector: ".wrapper .ep_recom-coupon",
    needExposure: true,
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    title: {
      type: String,
      value: "",
    },
    coupon: {
      type: Object,
      value: {},
    },
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    isFollow: {
      type: Boolean,
      value: false,
    },
    addCarPushCoupon: {
      type: Object,
      value: null,
    },
    brandCoupon: {
      type: Object,
      value: null,
    },
    traceId: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    NeedExposure: {
      type: Boolean,
      value: false,
    },
    fromPisition: {
      type: String,
      value: "",
    },
    optionsPos: {
      type: Object,
      value: {},
    },
  },
  observers: {
    coupon: function (obj) {
      this.setData({
        couponData: obj,
        originUserAction: obj.userAction || "",
      });
    },
    addCarPushCoupon: function (obj) {
      if (obj) {
        if (obj.couponId == this.data.couponData.couponId && obj.couponButton) {
          this.setData({
            [`couponData.couponButton`]: obj.couponButton,
          });
        }
      }
    },
    brandCoupon: function (obj) {
      if (obj) {
        if (obj.couponId == this.data.couponData.couponId && obj.couponButton) {
          this.setData({
            [`couponData.couponButton`]: obj.couponButton,
            [`couponData.markState`]: 3,
            [`couponData.needToUse`]: 1,
          });
        }
      }
    },
  },
  data: {
    couponData: {},
    originUserAction: "",
  },
  methods: {
    // 点击券
    rightBtnClick(e) {
      if (util.isLogin()) {
        let data = e.currentTarget.dataset.item;
        let {
          activityCode = "",
          markState = 0,
          needToUse = 0,
          to,
          params,
          userAction,
          brandId,
          memberFlag,
          couponId,
          accessType,
          couponType,
          couponButton = {},
        } = data;
        let { pageIdFirstPage, currentPageName, prePageName } =
          this.data.buriedObj || {};
        clickBuriedV2_({
          click_id: "click_coupon",
          click_par: {
            traceId: this.data.traceId || "",
            userAction: this.data.originUserAction || "",
            storeId: this.data.storeId || "",
            activityCode: activityCode || "",
            couponId: couponId || "",
            couponType: couponType || "",
            actType: couponButton.title || "",
          },
          pageId: pageIdFirstPage || "",
          currentPageName: currentPageName || "",
          prePageName: prePageName || "",
        });
        // 3 优惠券去使用  9vip去使用
        if (markState == 3 || markState == 9) {
          if (needToUse === 1) {
            this.handleCouponGo(data);
          } else if (to && params) {
            djCmsJump({
              to,
              params,
              userAction: userAction || "",
              traceId: this.data.traceId || "",
              preObj: this.data.buriedObj,
              buried_position: {
                key: this.data.fromPisition || "没有",
                options: this.data.optionsPos,
              },
            });
          }
        } else if (markState == 8) {
          // vip兑换
          this.handleRedPacketCoupon(activityCode);
        } else if (markState == 2) {
          // 未领取状态 accessType：1调用券网关 2：调用上海品牌券网关

          if (accessType && accessType == 2) {
            // 未开通过会员,展示开通会员弹层
            if (brandId && !memberFlag) {
              this.getMemberLayerPop(brandId, couponId);
            } else {
              // 已经是品牌会员，直接领券
              this.getBrandCoupon(couponId, brandId);
            }
          } else {
            this.getCoupon(activityCode, userAction);
          }
        }
      } else {
        mpCmsJump({
          pageType: "p56",
          preObj: this.data.buriedObj,
          buried_position: {
            key: this.data.fromPisition || "没有",
            options: this.data.optionsPos,
          },
        });
      }
    },
    // 优惠券跳转
    handleCouponGo(data) {
      getCouponProtocol({
        activityCode: data.activityCode || "",
        storeId: this.data.storeId || "",
        markState: data.markState || "",
        refPageSource: "store",
        skuId: data.skuId || "",
        orgCode: this.data.orgCode || "",
        couponGoSource: 0,
        couponId: data.couponId || "",
        couponPattern: data.couponPattern || "",
      })
        .then((res) => {
          let result = res.data.result || "";
          if (res.data.code == "0" && result) {
            let { to = "", params = {} } = result;
            let paramsNew = { userAction: this.data.originUserAction };
            for (let i in result.params) {
              if (i != "passThroughParam") {
                paramsNew[i] = params[i];
              } else {
                for (let j in params.passThroughParam) {
                  if (params.passThroughParam[j]) {
                    paramsNew[j] = params.passThroughParam[j];
                  }
                }
              }
            }
            if (!paramsNew.orgCode) {
              paramsNew.orgCode = this.data.orgCode;
            }
            if (to) {
              djCmsJump({
                to: to,
                params: paramsNew,
                userAction: this.data.originUserAction,
                traceId: this.data.traceId || "",
                preObj: this.data.buriedObj,
                buried_position: {
                  key: this.data.fromPisition || "没有",
                  options: this.data.optionsPos,
                },
              });
            }
          } else {
            mp.toast({
              title:
                (res.data && res.data.msg) || "哎呀，点击太疼啦，稍后再点我哦~",
            });
          }
        })
        .catch(() => {
          mp.toast({
            title: "哎呀，点击太疼啦，稍后再点我哦~",
          });
        });
    },
    // 处理叠加红包
    handleRedPacketCoupon(activityCode) {
      // 获取兑换券信息
      let { functionId, appVersion } = FNIDS.vipChangePopInfo;
      request({
        functionId,
        appVersion,
        method: "post",
        body: {
          activityCode: activityCode || "",
          // 门店主页
          grabChannel: "station_index_page",
        },
        preObj: this.data.buriedObj || {},
      })
        .then((res) => {
          let result = res.data.result;
          if (!result.vip) {
            // wx.navigateTo({
            //   url: "/pages/vpayMember-t/home/index?channel=wechatmendianye&business=wechatmendianye",
            // });
            mpCmsJump({
              pageType: "p52",
              params: {
                channel: "wechatmendianye",
                business: "wechatmendianye",
                buried_position: {
                  key: this.data.fromPisition || "没有",
                  options: this.data.optionsPos,
                },
              },
              traceId: this.data.traceId || "",
              preObj: this.data.buriedObj,
            });
          } else {
            this.triggerEvent(
              "pageEvent",
              {
                type: "showVipExchange",
                data: {
                  showVipExchange: true,
                  vipExchange: result,
                },
              },
              { composed: true, bubbles: true }
            );
          }
        })
        .catch(() => {});
    },
    // 领取普通优惠券
    getCoupon(activityCode, userAction) {
      getCoupon({
        channel: "station_home_page",
        source: "homestore",
        code: activityCode,
        isFollow: this.data.isFollow ? 1 : 0,
        orgCode: this.data.orgCode || "",
        storeNo: this.data.storeId || "",
        isFloor: 0,
        pageSource: "store",
        needCouponGo: true,
        grabPlat: 1,
      })
        .then((res) => {
          let result = res.data.result;
          let couponId = this.data.couponData && this.data.couponData.couponId;
          if (res.data.code == "0" && result) {
            let coupon = (result.responseList && result.responseList[0]) || {};
            switch (result.busiCode) {
            // 限制V+会员领取
            case "AC4402":
              mp.dialog({
                title: "温馨提示",
                content: "开通会员后才可领取哦~",
                showCancel: false,
                confirmText: "知道了",
              });
              break;
              // 活动即将开始，敬请期待！(AC1205)
            case "AC1205":
              mp.toast({
                title: result.message || "活动即将开始，敬请期待！",
              });
              break;
              // 限制商家会员领取
            case "AC4401":
              mp.dialog({
                title: "温馨提示",
                content: result.message || "开通会员后才可领取哦~",
                confirmText: "去开通",
              }).then((res) => {
                if (res.confirm) {
                  if (util.isLogin()) {
                    let openId = "";
                    try {
                      let loginInfo = wx.getStorageSync("login_info");
                      openId = loginInfo.openId || "";
                    } catch (e) {
                      // console.log(e)
                    }
                    if (result.url) {
                      djCmsJump({
                        to: "web",
                        params: {
                          openId,
                        },
                        traceId: this.data.traceId || "",
                        preObj: this.data.buriedObj,
                        buried_position: {
                          key: this.data.fromPisition || "没有",
                          options: this.data.optionsPos,
                        },
                      });
                    } else {
                      mp.toast({
                        title: "哎呀，跳转路径丢失啦！请稍后再试~",
                      });
                    }
                  } else {
                    mpCmsJump({
                      pageType: "p56",
                      preObj: this.data.buriedObj,
                      buried_position: {
                        key: this.data.fromPisition || "没有",
                        options: this.data.optionsPos,
                      },
                    });
                  }
                }
              });
              break;
              // 限制VIP领取
            case "AC4400":
              mp.dialog({
                title: "温馨提示",
                content: "VIP会员专享券，开通VIP会员即可领取！",
                showCancel: false,
                confirmText: "知道了",
              });
              break;
              // 限制粉丝领取
            case "AC3600":
              mp.dialog({
                title: "温馨提示",
                content: result.message || "关注店铺即可领取！",
                confirmText: "关注领取",
              }).then((res) => {
                if (res.confirm) {
                  // 关注并领取
                  request({
                    functionId: FNIDS.doFollow.functionId,
                    appVersion: FNIDS.doFollow.appVersion,
                    body: {
                      isFollow: true,
                      storeId: this.data.storeId,
                    },
                    preObj: this.data.buriedObj || {},
                  })
                    .then((res) => {
                      let result = res.data.result;
                      if (result) {
                        this.getCoupon(activityCode);
                        this.triggerEvent(
                          "pageEvent",
                          {
                            type: "isFollow",
                            data: {
                              isFollow: true,
                            },
                          },
                          { composed: true, bubbles: true }
                        );
                      } else {
                        mp.toast({
                          title: res.msg || "关注失败",
                        });
                      }
                    })
                    .catch(() => {
                      mp.toast({
                        title: "关注失败",
                      });
                    });
                }
              });
              break;
            default:
              mp.toast({
                title: "领取成功！",
              });
              if (!coupon.couponId) {
                coupon.couponId = couponId;
                coupon.userAction = userAction;
              }
              this.setData({
                couponData: coupon,
              });
              break;
            }
          } else {
            mp.toast({
              title: (res.data && res.data.msg) || "领取失败！",
            });
          }
        })
        .catch(() => {
          mp.toast({
            title: "领取失败！",
          });
        });
    },
    // 获取入会弹窗文案信息
    getMemberLayerPop(brandId, couponId) {
      request({
        ...FNIDS.brandMemberLayerInfo,
        method: "GET",
        isNeedDealError: true,
        isForbiddenDialog: true,
        body: {
          brandId: brandId || "",
        },
        preObj: this.data.buriedObj || {},
      })
        .then((res) => {
          let { code, result } = res.data || {};
          if (code == 0 && result) {
            // 弹品牌兑换券弹层
            this.triggerEvent(
              "pageEvent",
              {
                type: "showBrandVipPop",
                data: {
                  isShowBrandVipPop: true,
                  brandMemberPLayerInfo: {
                    ...result,
                    couponId,
                    brandId,
                  },
                },
              },
              { composed: true, bubbles: true }
            );
          } else {
            mp.toast({
              title: (res.data && res.data.msg) || "领取失败~",
            });
          }
        })
        .catch(() => {
          mp.toast({
            title: "领取失败~",
          });
        });
    },
    // 领取品牌券
    getBrandCoupon(couponId, brandId) {
      request({
        ...FNIDS.getBrandCoupon,
        method: "GET",
        isNeedDealError: true,
        isForbiddenDialog: true,
        body: {
          couponId: couponId || "",
          brandId: brandId || "",
        },
        preObj: this.data.buriedObj || {},
      })
        .then((res) => {
          let { code, result } = res.data || {};
          if (code == 0 && result) {
            let couponButton = {
              title: result.bntWords,
              titleColor: result.bntWordsStyle,
              startColor: result.bntStyle,
              endColor: result.bntStyle,
              state: 1,
            };
            this.setData({
              [`couponData.couponButton`]: couponButton,
              [`couponData.markState`]: 3,
              [`couponData.needToUse`]: 1,
            });
          } else {
            mp.toast({
              title: (res.data && res.data.msg) || "领取失败~",
            });
          }
        })
        .catch(() => {
          mp.toast({
            title: "领取失败~",
          });
        });
    },
  },
});

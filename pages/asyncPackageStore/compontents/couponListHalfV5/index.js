/* eslint-disable camelcase */
/* eslint-disable no-unused-vars*/
/* eslint-disable no-empty */

import { djCmsJump, mpCmsJump } from '../../../../common/util/agreementV2'
import { request, FNIDS } from '../../../../common/util/api';
import { getCoupon, getShareCoupon, getCouponProtocol } from '../../../../common/util/services'
import mp from '../../../../common/util/wxapi';
import util from '../../../../common/util/util';
import { pvBuriedV2_, clickBuriedV2_ } from "../../../../common/util/BI";
import emitter from "../../../../common/util/events";
import djBus from "../../../../common/util/djBus";
Component({
  lazyObj: {
    epSelector: ".content .ep_coupon-half-more",
    needExposure: true
  },
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 展示弹层
    showPop: {
      type: Boolean,
      value: false,
      observer (newVal) {
        if (newVal) {
          djBus.once("mask_couponLayer", (data) => {
            let pageId = util.getPageIdrandom();
            this.setData(
              {
                toTop: 0,
                pageName: "couponLayer",
                prePageName: data.currentPageName,
                pageId: pageId,
                recommendObj: {
                  prePageName: data.currentPageName,
                  currentPageName: "couponLayer",
                  pageSource: data.pageSource,
                  refPageSource: data.refPageSource,
                  pageIdFirstPage: pageId,
                },
              },
              () => {
                this.triggerEvent("getPopRecommendObj", {
                  data: this.data.recommendObj,
                  popName: "couponLayer",
                });
                this.pvFunc();
                const pageList = getCurrentPages();
                const route =
                  (pageList &&
                    pageList.length &&
                    pageList[pageList.length - 1].route) ||
                  "";
                // buriedObj
                const prePageId = this.data.recommendObj.pageIdFirstPage || "";
                emitter.emit(
                  "halfMaskFunc_" + route + "_couponLayer_" + prePageId,
                  {
                    name: "couponLayer",
                    type: "open",
                    selector: "#store >>> #couponLayer", // 用于页面找打半弹层
                    buriedObj: this.data.recommendObj,
                  }
                );
              }
            );
          });
        } else {
          this.setData({
            toTop: ""
          });
          const pageList = getCurrentPages();
          const route =
            (pageList &&
              pageList.length &&
              pageList[pageList.length - 1].route) ||
            "";
          const prePageId = this.data.recommendObj.pageIdFirstPage || "";
          emitter.emit("halfMaskFunc_" + route + "_couponLayer_" + prePageId, {
            name: "couponLayer",
            type: "close",
            selector: "#store >>> #couponLayer", // 用于页面找打半弹层
            buriedObj: this.data.recommendObj,
          });
        }
      }
    },
    // 店铺优惠
    storeCouponInfo: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val) {
          val.couponModelList &&
            val.couponModelList.forEach((item, index) => {
              item.flag = true;
              item.cpIndex = index;
            });
          this.setData({
            couponsList: val.couponModelList || [],
            couponsTitle: val.mainTitle || ""
          });
        }
      }
    },
    // 店铺红包
    storeRedPackageInfo: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val) {
          val.couponModelList &&
            val.couponModelList.forEach((item, index) => {
              item.flag = true;
              item.cpIndex = index;
            });
          this.setData({
            redPackCouponsList: val.couponModelList || [],
            redPackCouponsMainTitle: val.mainTitle || "",
            redPackCouponsMainSubTitle: val.subTitle || ""
          });
        }
      }
    },
    // 展示更多红包按钮
    couponShowMore: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val) {
          this.setData({
            couponMore: val
          });
        }
      }
    },
    // 门店id
    storeId: {
      type: String,
      value: {}
    },
    // 商家id
    orgCode: {
      type: String,
      value: {}
    },
    // 是否关注门店
    isFollow: {
      type: Boolean,
      value: false
    },
    refreshStoreHeadCoupons: {
      type: Object,
      value: {},
      observer (data) {
        if (data && data.activityCode) {
          let originCouponList = this.data.couponsList || [];
          originCouponList.forEach((item, index) => {
            if (item.activityCode === data.activityCode) {
              // 找到当前优惠券更新状态
              let key = `couponsList[${index}]`;
              this.setData({
                [key]: data
              });
            }
          });
        }
      }
    },
    // 优惠满减
    tags: {
      type: Array,
      value: []
    },
    traceId: {
      type: String,
      value: ""
    },
    // buriedObj: {
    //   type: Object,
    //   value: {},
    // },
    options: {
      type: Object,
      value: {}
    },
    pageIsGetInfoOnShow: {
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    attached () {}
  },
  pageLifetimes: {
    show () {}
  },
  /**
   * 组件的初始数据
   */
  data: {
    // 门店红包回顶部
    toTop: 0,
    // 红包券列表
    redPackCouponsList: [],
    // 红包券主标题
    redPackCouponsMainTitle: "",
    // 红包券副标题
    redPackCouponsMainSubTitle: "",
    // 普通优惠券列表
    couponsList: [],
    // 普通优惠券标题
    couponsTitle: "",
    // 更多优惠券
    couponMore: {},
    // 是否显示红包兑换弹层
    showVipExchange: false,
    // 是否展示全部满减信息
    showAllTags: false,
    // 普券是v+会员才能领的弹层
    popInfo: {},
    NeedExposure: true,
    vipCouponInfo: null,
    recommendObj: {},
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭弹层
    hidePop () {
      this.triggerEvent("pageEvent", {
        type: "closeCouonHalf"
      });
    },
    // 去更多优惠券页
    goToMoreCouponPage (e) {
      let { to, userAction, params, storeId, orgCode } =
        e.currentTarget.dataset;
      params.storeId = storeId || "";
      params.orgCode = orgCode || "";
      params.isFollow = this.data.isFollow ? 1 : 0 || 0;
      params.fromPop = "old";
      djCmsJump({
        to,
        userAction,
        params,
        traceId: this.data.traceId || "",
        preObj: this.data.recommendObj,
        buried_position: {
          key: `store-couponListHalfV5-1`,
          options: this.data.options
        }
      });
    },
    // 点击券
    rightBtnClick (e) {
      if (!util.isLogin()) {
        let data = e.detail.data;
        let {
          couponShowType = "",
          activityCode = "",
          helpCouponGo = {},
          markState = 0,
          needToUse = 0,
          couponId = "",
          couponType = "",
          couponButton = {},
          userAction = "",
          toast = "",
          exchangeButton = false
        } = data;
        if (couponShowType == 3) {
          // 助力券
          this.handleHelpCoupon(helpCouponGo, activityCode, couponId);
        } else if (couponShowType == 5) {
          // 红包或V+会员券
          if (markState == 8 || markState == 2) {
            // 未兑换状态
            this.setData({
              vipCouponInfo: data,
              showVipExchange: !this.data.showVipExchange
            });
          }
        } else {
          // 普通券或新人专享券
          if (needToUse == 1) {
            // 去使用
            this.handleCouponGo(data);
          } else {
            if (markState == 2) {
              // 未领取状态
              // 防连点
              if (data.flag) {
                data.flag = false;
                let key = `couponsList[${data.cpIndex}]`;
                this.setData({
                  [key]: data
                });
                this.getCoupon(activityCode, data);
              }
            }
          }
        }
        clickBuriedV2_({
          click_id: "click_coupon",
          click_par: {
            activityCode: activityCode,
            couponId: couponId,
            type: "window",
            couponType: couponType,
            actType: couponButton.title || "",
            userAction: userAction,
            traceId: this.data.traceId || ""
          },
          currentPageName: this.data.pageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId || ""
        });
      } else {
        mpCmsJump({
          pageType: "p56",
          preObj: this.data.recommendObj,
          buried_position: {
            key: `store-couponListHalfV5-2`,
            options: this.data.options
          }
        });
      }
    },
    // 优惠券跳转
    handleCouponGo (data) {
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
        promotionSource: "storePromotion"
      })
        .then((res) => {
          let result = res.data.result || "";
          if (res.data.code == "0" && result) {
            let { to = "", params = {}, userAction = "" } = result;
            let paramsNew = { userAction: userAction };
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
                userAction,
                traceId: this.data.traceId || "",
                preObj: this.data.recommendObj,
                buried_position: {
                  key: `store-couponListHalfV5-3`,
                  options: this.data.options
                }
              });
            }
          } else {
            mp.toast({
              title:
                (res.data && res.data.detail) ||
                "哎呀，点击太疼啦，稍后再点我哦~"
            });
          }
        })
        .catch(() => {
          mp.toast({
            title: "哎呀，点击太疼啦，稍后再点我哦~"
          });
        });
    },
    // 领取普通优惠券
    getCoupon (activityCode, cpData) {
      getCoupon({
        channel: "station_home_page",
        source: "homestore",
        code: activityCode,
        isFollow: cpData.isFans || 0,
        orgCode: this.data.orgCode || "",
        storeNo: this.data.storeId || "",
        isFloor: 0,
        pageSource: "store",
        needCouponGo: true,
        grabPlat: 1,
      })
        .then((res) => {
          let result = res.data.result;
          if (res.data.code == "0" && result) {
            if (result.busiCode === "AC4402") {
              // 限制V+会员领取
              this.setData({
                showVipCouponPop: true,
                popInfo: result.extFieldMap || {}
              });
              this.preventClick(cpData);
            } else if (result.busiCode === "AC1205") {
              // 活动即将开始，敬请期待！(AC1205)
              mp.toast({
                title: result.message || "活动即将开始，敬请期待！"
              });
              this.preventClick(cpData);
            } else if (result.busiCode === "AC4401") {
              // 限制商家会员领取
              mp.dialog({
                title: "温馨提示",
                content: result.message || "开通会员后才可领取哦~",
                confirmText: "去开通"
              })
                .then((res) => {
                  if (res.confirm) {
                    // 去开通
                    if (util.isLogin()) {
                      let openId = "";
                      try {
                        let loginInfo = wx.getStorageSync("login_info");
                        openId = loginInfo.openId || "";
                      } catch (e) {
                        // console.log(e)
                      }
                      if (result.url) {
                        wx.navigateTo({
                          url:
                            "/pages/h5/index?&url=" +
                            encodeURIComponent(
                              result.url + `&openId=${openId}`
                            ),
                          preObj: this.data.recommendObj,
                          buried_position: {
                            key: "store-couponHalfV5-getCoupon1",
                            options: this.data.options
                          }
                        });
                      } else {
                        mp.toast({
                          title: "哎呀，跳转路径丢失啦！请稍后再试~"
                        });
                      }
                    } else {
                      wx.navigateTo({
                        url: `/pages/newLogin/login/login`,
                        preObj: this.data.recommendObj,
                        buried_position: {
                          key: "store-couponHalfV5-getCoupon2",
                          options: this.data.options
                        }
                      });
                    }
                  }
                  this.preventClick(cpData);
                  try {
                    this.maidian("clickCouponLayer", {
                      title: result.message,
                      storeId: this.data.storeId,
                      btnName: "open",
                      userAction: cpData.userAction
                    });
                  } catch (error) {}
                })
                .catch(() => {
                  this.preventClick(cpData);
                  try {
                    this.maidian("clickCouponLayer", {
                      title: result.message,
                      storeId: this.data.storeId,
                      btnName: "cancel",
                      userAction: cpData.userAction
                    });
                  } catch (error) {}
                });
              try {
                this.maidian("showCouponLayer", {
                  title: result.message,
                  storeId: this.data.storeId,
                  type: "shopMember",
                  userAction: cpData.userAction
                });
              } catch (error) {}
            } else if (result.busiCode === "AC4400") {
              // 限制VIP领取
              mp.dialog({
                title: "温馨提示",
                content: "VIP会员专享券，开通VIP会员即可领取！",
                showCancel: false,
                confirmText: "知道了"
              })
                .then(() => {
                  this.preventClick(cpData);
                })
                .catch(() => {
                  this.preventClick(cpData);
                });
            } else if (result.busiCode === "AC3600") {
              // 限制粉丝领取
              mp.dialog({
                title: "温馨提示",
                content: result.message || "关注店铺即可领取！",
                confirmText: "关注领取"
              })
                .then((res) => {
                  if (res.confirm) {
                    // 关注并领取
                    request({
                      functionId: FNIDS.doFollow.functionId,
                      appVersion: FNIDS.doFollow.appVersion,
                      body: {
                        isFollow: true,
                        storeId: this.data.storeId
                      },
                      pageId: this.data.pageId || "",
                      preObj: this.data.recommendObj || {}
                    })
                      .then((res) => {
                        let result = res.data.result;
                        if (result) {
                          this.getCoupon(activityCode, cpData);
                          this.triggerEvent("pageEvent", {
                            type: "isFollow",
                            data: {
                              isFollow: true
                            }
                          });
                        } else {
                          mp.toast({
                            title: res.msg || "关注失败"
                          });
                        }
                      })
                      .catch(() => {
                        mp.toast({
                          title: "关注失败"
                        });
                      });
                  }
                  this.preventClick(cpData);
                  try {
                    this.maidian("clickCouponLayer", {
                      title: result.message,
                      storeId: this.data.storeId,
                      btnName: "favorite",
                      userAction: cpData.userAction
                    });
                  } catch (error) {}
                })
                .catch(() => {
                  this.preventClick(cpData);
                  try {
                    this.maidian("clickCouponLayer", {
                      title: result.message,
                      storeId: this.data.storeId,
                      btnName: "cancel",
                      userAction: cpData.userAction
                    });
                  } catch (error) {}
                });
              try {
                this.maidian("showCouponLayer", {
                  title: result.message,
                  storeId: this.data.storeId,
                  type: "fans",
                  userAction: cpData.userAction
                });
              } catch (error) {}
            } else if (result.busiCode === "AC0000") {
              mp.toast({
                title: result.message || "黑名单！"
              });
              this.preventClick(cpData);
            } else {
              let coupon =
                (result.responseList && result.responseList[0]) || {};
              let originCouponList = this.data.couponsList || [];
              originCouponList.forEach((item, index) => {
                if (item.activityCode === coupon.activityCode) {
                  // 找到当前优惠券更新状态
                  let userAction = item.userAction;
                  coupon = Object.assign(item, coupon);
                  coupon.userAction = userAction;
                  coupon.flag = true;
                  let key = `couponsList[${index}]`;
                  this.setData({
                    [key]: coupon
                  });
                  this.triggerEvent("pageEvent", {
                    type: "updateCurrentCouponStatus",
                    data: coupon
                  });
                  mp.toast({
                    title: "领取成功！"
                  });
                }
              });
            }
          } else {
            mp.toast({
              title: (res.data && res.data.msg) || "领取失败！"
            });
            this.data.couponsList.forEach((item) => {
              if (!item.flag) {
                item.flag = true;
              }
            });
            this.setData({
              couponsList: this.data.couponsList
            });
          }

          this.reportCouponError(activityCode, res);
        })
        .catch((err) => {
          mp.toast({
            title: "领取失败！"
          });
          this.data.couponsList.forEach((item) => {
            if (!item.flag) {
              item.flag = true;
            }
          });
          this.setData({
            couponsList: this.data.couponsList
          });

          this.reportCouponError(activityCode, err);
        });
    },
    // 处理助力红包
    handleHelpCoupon (helpCouponGo, activityCode) {
      if (helpCouponGo.to == "web") {
        // 已发起过助力，进行跳转。
        let url = helpCouponGo.params.url;
        if (url) {
          if (url.indexOf("appThroughH5") > -1) {
            url = JSON.parse(
              decodeURIComponent(url.split("body=")[1].split("&")[0])
            ).returnLink;
          }
        }
        djCmsJump({
          to: "web",
          params: {
            url: url
          },
          traceId: this.data.traceId || "",
          preObj: this.data.recommendObj,
          buried_position: {
            key: `store-couponListHalfV5-4`,
            options: this.data.options
          }
        });
      } else if (helpCouponGo.to == "couponShare") {
        // 未发起过助力，发起助力并进行分享。
        this.getShareCoupon(activityCode);
      }
    },
    // 领取助力券
    getShareCoupon (activityCode) {
      getShareCoupon({
        storeId: this.data.storeId || "",
        activityId: activityCode || "",
        type: "helpon"
      })
        .then((res) => {
          let result = res.data.result || "";
          if (res.data.code == "0" && result) {
            let { chat = {}, square = {}, couponModel = {} } = result || {};
            let originCouponList = this.data.couponsList || [];
            originCouponList.forEach((item, index) => {
              if (item.activityCode === couponModel.activityCode) {
                // 找到当前优惠券更新状态
                let key = `couponsList[${index}]`;
                this.setData({
                  [key]: couponModel
                });
                this.triggerEvent("pageEvent", {
                  type: "shareHelpCoupon",
                  data: {
                    chat,
                    square,
                    couponModel
                  }
                });
              }
            });
          } else {
            mp.toast({
              title: (res.data && res.data.msg) || "领取失败！"
            });
          }
        })
        .catch((err) => {
          if (err && err.data && err.data.code == "100009") {
            // console.log(err)
          } else {
            mp.toast({
              title: "领取失败！"
            });
          }
        });
    },
    // 监听组件事件
    widgetEvent (e) {
      let type = e.detail.type;
      let result = e.detail.data;
      let redPackCouponsList = this.data.redPackCouponsList || [];
      if (type === "vipExchange") {
        // vip券
        redPackCouponsList.forEach((item, index) => {
          if (item.couponId == result.couponId && result.couponButton) {
            let key = `redPackCouponsList[${index}].couponButton`;
            let couponButton = result.couponButton;
            this.setData({
              [key]: couponButton
            });
            this.triggerEvent("pageEvent", {
              type: "vipHeadCoupon",
              data: result
            });
          }
        });
      } else if (type === "closeVipCouponPop") {
        this.setData({
          showVipCouponPop: false
        });
      }
    },
    // 展示所有满减信息
    showAllTags () {
      this.setData({
        showAllTags: !this.data.showAllTags
      });
    },
    // 阻止连点
    preventClick (data) {
      if (data) {
        data.flag = true;
        let key = `couponsList[${data.cpIndex}]`;
        this.setData({
          [key]: data
        });
      }
    },
    pvFunc (back) {
      let { prePageName = "", pageIdFirstPage = "" } =
        this.data.recommendObj || {};
      pvBuriedV2_({
        page_par: {
          storeId: this.data.storeId
        },
        pageId: pageIdFirstPage,
        prePageName: prePageName || "",
        currentPageName: "couponLayer",
        isBack: back || ""
      });
    },
    // 监控领券或者去使用等操作报错信息
    reportCouponError (activityCode, res) {
      let deviceid_pdj_jd = util.getUUIDMD5();
      let loginInfo = wx.getStorageSync("login_info");
      let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
      clickBuriedV2_({
        click_id: "reportCouponError",
        click_par: {
          pin: PDJ_H5_PIN,
          deviceId: deviceid_pdj_jd,
          position: "couponListHalfV5",
          activityCode: activityCode || "没有",
          storeNo: this.data.storeId || "没有",
          refPageSource:
            this.data.recommendObj && this.data.recommendObj.refPageSource,
          res: res || ""
        }
      });
    },
    maidian (clickId, clickPar) {
      clickBuriedV2_({
        click_id: clickId,
        click_par: clickPar,
        currentPageName: this.data.pageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId || ""
      });
    }
  }
});

import {
  djCmsJump,
  mpCmsJump,
} from "../../../../common/util/agreementV2.js";
import util from "../../../../common/util/util";
import {
  getCoupon,
  getCouponProtocol,
} from "../../../../common/util/services";
import mp from "../../../../common/util/wxapi";
import { request, FNIDS } from "../../../../common/util/api";
import { clickBuriedV2_ } from "../../../../common/util/BI";
import { addFilterMsg, error } from "../../../../common/util/wxLog";
import { syncCoupon } from "../public.js";
Component({
  lazyObj: {
    epSelector: ".ep_couponfloor-three .ep_show-more",
    needExposure: true,
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    floor: {
      type: Object,
      value: {},
      observer: function (obj) {
        if (obj.couponList && obj.couponList.length) {
          obj.couponList.forEach((coupon, index) => {
            coupon.flag = true;
            coupon.cpIndex = index;
          });
          this.setData({
            couponList: obj.couponList || [],
          });
        }
      },
    },
    isFollow: {
      type: Boolean,
      value: false,
    },
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    traceId: {
      type: String,
      value: "",
    },
    pageId: {
      type: String,
      value: "",
    },
    currentPageName: {
      type: String,
      value: "",
    },
    prePageName: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
    needSyncCoupon: {
      type: Object,
      value: {},
      observer: function (coupon, oldCoupon) {
        if (
          JSON.stringify(coupon) !== "{}" &&
          JSON.stringify(coupon) != JSON.stringify(oldCoupon)
        ) {
          let list = this.data.couponList;
          list.forEach((item, index) => {
            if (item.couponId == coupon.couponId) {
              let newCoupon = syncCoupon(item, coupon);
              this.setData({
                [`couponList[${index}]`]: newCoupon,
              });
            }
          });
        }
      },
    },
  },
  data: {
    showAll: false,
    couponList: [],
  },
  methods: {
    showAll(e) {
      let userAction = e.currentTarget.dataset.userAction || "";
      this.setData({
        showAll: !this.data.showAll,
      });
      let { pageId, currentPageName, prePageName } = this.data || {};
      clickBuriedV2_({
        click_id: "unfoldCoupon",
        click_par: {
          userAction: userAction,
          traceId: this.data.traceId || "",
        },
        pageId,
        currentPageName,
        prePageName,
      });
    },
    jumpMore(e) {
      let { to, params, userAction } = e.currentTarget.dataset || {};
      params.isFollow = this.data.isFollow ? 1 : 0 || 0;
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: "store-couponFloor-three-1",
          options: this.data.options,
        },
      });
    },
    rightBtnClick(e) {
      if (util.isLogin()) {
        let data = e.detail.data;
        let { activityCode = "", markState = 0, needToUse = 0 } = data || {};
        // 去使用
        if (needToUse == 1) {
          this.handleCouponGo(data);
        } else {
          if (markState == 2) {
            // 未领取状态
            // 防连点
            if (data.flag) {
              data.flag = false;
              let key = `couponList[${data.cpIndex}]`;
              this.setData({
                [key]: data,
              });
              this.getCoupon(activityCode, data);
            }
          }
        }
      } else {
        mpCmsJump({
          pageType: "p56",
          preObj: this.data.buriedObj,
          buried_position: {
            key: "store-couponFloor-three-2",
            options: this.data.options,
          },
        });
      }
    },
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
        promotionSource: "storePromotion",
      })
        .then((res) => {
          let result = res.data.result || "";
          if (res.data.code == "0" && result) {
            let { to = "", params = {} } = result;
            let paramsNew = {};
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
                userAction: data.userAction || "",
                traceId: this.data.traceId || "",
                preObj: this.data.buriedObj,
                buried_position: {
                  key: "store-couponFloor-three-3",
                  options: this.data.options,
                },
              });
            }
          } else {
            mp.toast({
              title:
                (res.data && res.data.detail) ||
                "哎呀，点击太疼啦，稍后再点我哦~",
            });
            let deviceid_pdj_jd = util.getUUIDMD5();
            let loginInfo = wx.getStorageSync("login_info");
            let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
            let logParams = {
              activityCode: data.activityCode,
              markState: data.markState,
              storeId: this.data.storeId,
              orgCode: this.data.orgCode,
              couponId: data.couponId,
              position: "yhe",
              pin: getApp().globalData.loginStateInfo.PDJ_H5_PIN,
            };
            addFilterMsg("singleCouponBuyError");
            addFilterMsg("coupon/singleCouponTready");
            addFilterMsg(deviceid_pdj_jd);
            addFilterMsg(PDJ_H5_PIN);
            error(JSON.stringify(logParams));
          }
        })
        .catch(() => {
          mp.toast({
            title: "哎呀，点击太疼啦，稍后再点我哦~",
          });
        });
    },
    // 领取普通优惠券
    getCoupon(activityCode, cpData) {
      getCoupon({
        channel: "station_home_page_two",
        source: "homestore",
        code: activityCode,
        isFollow: (cpData && cpData.isFans) || 0,
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
              this.triggerEvent("popEvent", {
                type: "showVipCouponPop",
                data: result.extFieldMap || {},
              });
              this.preventClick(cpData);
            } else if (result.busiCode === "AC4401") {
              // 限制商家会员领取
              mp.dialog({
                title: "温馨提示",
                content: result.message || "开通会员后才可领取哦~",
                confirmText: "去开通",
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
                        djCmsJump({
                          to: "web",
                          params: {
                            url: result.url,
                            openId: openId,
                          },
                          traceId: this.data.traceId || "",
                          preObj: this.data.buriedObj,
                          buried_position: {
                            key: "store-couponFloor-three-4",
                            options: this.data.options,
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
                          key: "store-couponFloor-three-5",
                          options: this.data.options,
                        },
                      });
                    }
                  }
                  this.preventClick(cpData);
                  try {
                    this.maidian("clickCouponLayer", {
                      title: result.message,
                      storeId: this.data.storeId,
                      btnName: "open",
                      userAction: cpData.userAction,
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
                      userAction: cpData.userAction,
                    });
                  } catch (error) {}
                  
                });
              try {
                this.maidian("showCouponLayer", {
                  title: result.message,
                  storeId: this.data.storeId,
                  type: "shopMember",
                  userAction: cpData.userAction,
                });
              } catch (error) {}
              
            } else if (result.busiCode === "AC4400") {
              // 限制VIP领取
              mp.dialog({
                title: "温馨提示",
                content: "VIP会员专享券，开通VIP会员即可领取！",
                showCancel: false,
                confirmText: "知道了",
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
                confirmText: "关注领取",
              })
                .then((res) => {
                  if (res.confirm) {
                    // 关注并领取
                    request({
                      functionId: FNIDS.doFollow.functionId,
                      appVersion: FNIDS.doFollow.appVersion,
                      body: {
                        isFollow: true,
                        storeId: this.data.storeId,
                      },
                      pageId:
                        (this.data.buriedObj &&
                          this.data.buriedObj.pageIdFirstPage) ||
                        "",
                      preObj: this.data.buriedObj || {},
                    })
                      .then((res) => {
                        let result = res.data.result;
                        if (result) {
                          this.getCoupon(activityCode, cpData);
                          this.triggerEvent(
                            "pageEvent",
                            {
                              type: "isFollow",
                              data: {
                                isFollow: true,
                              },
                            },
                            {
                              bubbles: true,
                              composed: true,
                            }
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
                  this.preventClick(cpData);
                  try {
                    this.maidian("clickCouponLayer", {
                      title: result.message,
                      storeId: this.data.storeId,
                      btnName: "favorite",
                      userAction: cpData.userAction,
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
                      userAction: cpData.userAction,
                    });
                  } catch (error) {}
                  
                });
              try {
                this.maidian("showCouponLayer", {
                  title: result.message,
                  storeId: this.data.storeId,
                  type: "fans",
                  userAction: cpData.userAction,
                });
              } catch (error) {}
            } else if (result.busiCode === "AC0000") {
              mp.toast({
                title: result.message || "黑名单！",
              });
              this.preventClick(cpData);
            } else {
              let coupon =
                (result.responseList && result.responseList[0]) || {};
              let originCouponList = this.data.couponList || [];
              originCouponList.forEach((item) => {
                if (item.activityCode == coupon.activityCode) {
                  // 找到当前优惠券更新状态
                  let newCoupon = syncCoupon(item, coupon);
                  this.preventClick(newCoupon);
                  mp.toast({
                    title: (result && result.message) || "领取成功！",
                  });
                  this.noticeSyncCoupon(coupon);
                  // 通知半弹层，需要刷新异步优惠券接口
                  this.noticeToFresh();
                  // 如果是限品券，领取成功后如果是去使用，要直接跳到券购或者券聚合页，所以需要再调一个获取券协议的接口
                  if (
                    newCoupon.limitedStandard == 1 &&
                    newCoupon.needToUse == 1
                  ) {
                    this.handleCouponGo(newCoupon);
                  }
                }
              });
            }
          } else {
            mp.toast({
              title: (res.data && res.data.msg) || "领取失败！",
            });
            this.data.couponList.forEach((item) => {
              if (!item.flag) {
                item.flag = true;
              }
            });
            this.setData({
              couponList: this.data.couponList,
            });
            let deviceid_pdj_jd = util.getUUIDMD5();
            let loginInfo = wx.getStorageSync("login_info");
            let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
            let logParams = {
              storeId: this.data.storeId,
              orgCode: this.data.orgCode,
              position: "yhe",
              pin: getApp().globalData.loginStateInfo.PDJ_H5_PIN,
            };
            addFilterMsg("grabCouponError");
            addFilterMsg("coupon/grabCoupon");
            addFilterMsg(deviceid_pdj_jd);
            addFilterMsg(PDJ_H5_PIN);
            error(JSON.stringify(logParams));
          }
          this.reportCouponError(activityCode, res);
        })
        .catch((err) => {
          console.log("errrr", err);
          mp.toast({
            title: "领取失败！",
          });
          this.data.couponList.forEach((item) => {
            if (!item.flag) {
              item.flag = true;
            }
          });
          this.setData({
            couponList: this.data.couponList,
          });
          this.reportCouponError(activityCode, err);
        });
    },
    // 防连点--重置优惠券能点击
    preventClick(data) {
      if (data) {
        data.flag = true;
        let key = `couponList[${data.cpIndex}]`;
        this.setData({
          [key]: data,
        });
      }
    },
    // 通知门店优惠券半弹层，后续点击关闭按钮要异步刷新优惠券
    noticeToFresh() {
      this.triggerEvent("popEvent", {
        type: "updateCoupon",
      });
    },
    // 监控领券或者去使用等操作报错信息
    reportCouponError(activityCode, res) {
      let deviceid_pdj_jd = util.getUUIDMD5();
      let loginInfo = wx.getStorageSync("login_info");
      let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
      clickBuriedV2_({
        click_id: "reportCouponError",
        click_par: {
          pin: PDJ_H5_PIN,
          deviceId: deviceid_pdj_jd,
          position: "couponFloorThree",
          activityCode: activityCode || "没有",
          storeNo: this.data.storeId || "没有",
          refPageSource:
            this.data.recommendObj && this.data.recommendObj.refPageSource,
          res: res || "",
        },
      });
    },
    // 通知优惠券半弹层，当前领取的是哪一张券
    noticeSyncCoupon(coupon) {
      this.triggerEvent("popEvent", {
        type: "syncCoupon",
        data: coupon,
      })
    },
    maidian(clickId, clickPar) {
      clickBuriedV2_({
        click_id: clickId,
        click_par: clickPar,
        currentPageName: this.data.pageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId || "",
      });
    },
  },
});

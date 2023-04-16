import { getCoupon, getCouponProtocol } from '../../../../common/util/services'
import mp from '../../../../common/util/wxapi';
import { djCmsJump, mpCmsJump } from '../../../../common/util/agreementV2'
import util from '../../../../common/util/util'
import { FNIDS, request } from "../../../../common/util/api";
import {clickBuriedV2_}  from '../../../../common/util/BI.js';
Component({
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
    },
    orgCode: {
      type: String,
      value: "",
    },
    storeId: {
      type: String,
      value: "",
    },
    skuId: {
      type: String,
      value: "",
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    traceId: {
      type: String,
      value: "",
    },
    options: {
      type: Object,
      value: {},
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击优惠券
    clickCoupon(e) {
      if (util.isLogin()) {
        let { dataset = {} } = e.currentTarget || {};
        let { index = "" } = dataset || {};
        let item = dataset.item || {};
        let {
          markState = "",
          needToUse = 1,
          couponButton = {},
          userAction = "",
          activityCode = "",
          couponId = "",
          storeId = "",
          skuId = "",
          couponType = "",
        } = item || {};
        let { state = 0 } = couponButton || {};
        let {
          currentPageName = "",
          prePageName = "",
          pageIdFirstPage = "",
        } = this.data.recommendObj;
        clickBuriedV2_({
          click_id: "click_coupon",
          click_par: {
            userAction,
            actType: couponButton.title,
            activityCode,
            couponId,
            storeId,
            skuId,
            couponType,
            traceId: this.data.traceId || "",
          },
          currentPageName,
          prePageName,
          pageId: pageIdFirstPage,
        });
        if (state == 1) {
          // 1：可以点击 0： 不可点击
          if (markState == 2) {
            // 未领取状态，调领取接口。
            this.handleGetCoupon(item, index);
          } else {
            if (needToUse == 1) {
              // 去使用
              this.handleGetCouponProtocol(item);
            }
          }
        }
      } else {
        mpCmsJump({
          pageType: "p56",
          preObj: this.data.recommendObj,
          buried_position: {
            key: "product-couponNew-clickCoupon",
            options: this.data.options,
          },
        });
      }
    },
    // 领取优惠券
    handleGetCoupon(item, index, isFollow) {
      let { activityCode = "" } = item || {};
      getCoupon({
        channel: "single_product_page",
        source: "homestore",
        code: activityCode,
        isFollow: isFollow || 0,
        orgCode: this.data.orgCode || "",
        storeNo: this.data.storeId || "",
        isFloor: 0,
        needCouponGo: true,
        grabPlat: 1,
        pageSource: "productDetail",
        ctp: "goodsinfo",
      })
        .then((res) => {
          let { result = "", code = "" } = res.data || {};
          let { busiCode = "", responseList = [] } = result || {};
          if (code == "0") {
            if (busiCode === "AC4402") {
              // 限制V+会员领取
              mp.dialog({
                title: "温馨提示",
                content: "开通会员后才可领取哦~",
                showCancel: false,
                confirmText: "知道了",
              });
            } else if (busiCode === "AC1205") {
              // 活动即将开始，敬请期待！(AC1205)
              mp.toast({
                title: result.message || "活动即将开始，敬请期待！",
              });
            } else if (busiCode === "AC4401") {
              // 限制商家会员领取
              mp.dialog({
                title: "温馨提示",
                content: result.message || "开通会员后才可领取哦~",
                confirmText: "去开通",
              }).then((res) => {
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
                          url: encodeURIComponent(
                            result.url + `&openId=${openId}`
                          ),
                        },
                        preObj: this.data.recommendObj,
                        buried_position: {
                          key: "product-couponNew-handleGetCoupon1",
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
                      preObj: this.data.recommendObj,
                      buried_position: {
                        key: "product-couponNew-handleGetCoupon2",
                        options: this.data.options,
                      },
                    });
                  }
                }
              });
            } else if (busiCode === "AC4400") {
              // 限制VIP领取
              mp.dialog({
                title: "温馨提示",
                content: "VIP会员专享券，开通VIP会员即可领取！",
                showCancel: false,
                confirmText: "知道了",
              });
            } else if (busiCode === "AC3600") {
              // 限制粉丝领取
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
                    preObj: this.data.recommendObj || {},
                  })
                    .then((res) => {
                      let result = res.data.result;
                      if (result) {
                        this.handleGetCoupon(item, index, true);
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
            } else if (busiCode == "0") {
              mp.toast({
                title: "领取成功",
              });
              let { couponList = [] } = this.data.item || {};
              let {
                activityCode = "",
                markState = "",
                needToUse = 0,
                couponButton = {},
              } = responseList[0] || {};
              couponList.forEach((item, index) => {
                if (item.activityCode === activityCode) {
                  this.setData({
                    [`item.couponList[${index}]`]: responseList[0],
                  });
                  // this.setData({
                  //   [`item.couponList[${index}].markState`]: markState,
                  //   [`item.couponList[${index}].needToUse`]: needToUse,
                  //   [`item.couponList[${index}].couponButton`]: couponButton,
                  // });
                }
              });
            } else {
              mp.toast({
                title: res.data.msg || "领取优惠券失败，请稍后再试~",
              });
            }
          } else {
            mp.toast({
              title: res.data.msg || "领取优惠券失败，请稍后再试~",
            });
          }
        })
        .catch(() => {
          mp.toast({
            title: "领取优惠券失败，请稍后再试~",
          });
        });
    },
    // 优惠券跳转
    handleGetCouponProtocol(item) {
      let { markState = "", activityCode = "", couponId = "" } = item || {};
      getCouponProtocol({
        activityCode: activityCode,
        storeId: this.data.storeId,
        markState: markState,
        refPageSource: "store",
        pageSource: "",
        skuId: this.data.skuId,
        orgCode: this.data.orgCode,
        couponGoSource: 0,
        couponId: couponId,
        // 券模式 1、实物券 2、虚拟券 3、支付券 为空时：默认实物券
        couponPattern: "",
      })
        .then((res) => {
          let result = res.data.result || "";
          if (res.data.code == "0" && result) {
            let { to = "", params = {} } = result;
            let paramsNew = { userAction: item.userAction };
            for (let i in result.params) {
              if (i != "passThroughParam") {
                paramsNew[i] = params[i];
              } else {
                Object.assign(paramsNew, params.passThroughParam);
              }
            }
            if (to) {
              djCmsJump({
                to: to,
                params: paramsNew,
                userAction: item.userAction,
                traceId: this.data.traceId || "",
                preObj: this.data.recommendObj,
                buried_position: {
                  key: "product-couponNew-handleGetCouponProtocol",
                  options: this.data.options,
                },
              });
            }
          } else {
            mp.toast({
              title: res.data.detail || "哎呀，点击太疼啦，稍后再点我哦~",
            });
          }
        })
        .catch(() => {
          mp.toast({
            title: "服务异常，请稍后再试~",
          });
        });
    },
  },
});

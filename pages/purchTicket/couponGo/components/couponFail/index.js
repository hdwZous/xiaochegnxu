import mp from '../../../../../common/util/wxapi'
import { getCoupon, getCouponProtocol } from "../../../../../common/util/services"
import { request, FNIDS } from '../../../../../common/util/api';
import {
  djCmsJump,
  mpCmsJump,
} from "../../../../../common/util/agreementV2.js";
import util from "../../../../../common/util/util"
import { clickBuriedV2_ } from "../../../../../common/util/BI.js";
let app = getApp()

Component({
  properties: {
    responseList: {
      type: Array,
      value: [],
    },
    orgCode: {
      type: String,
      value: "",
    },
    storeId: {
      type: String,
      value: "",
    },
    refPageSource: {
      type: String,
      value: "",
    },
    skuId: {
      type: Array,
      value: [""],
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
  },
  data: {},
  attached() {
    this.setData({
      isIpx: app.globalData.isIpx,
    });
  },
  observers: {},
  methods: {
    goBack() {
      let pages = getCurrentPages();
      if (pages.length > 1) {
        wx.navigateBack({
          delta: 1,
          preObj: this.data.recommendObj,
        });
      } else {
        wx.switchTab({
          url: "/pages/home/home",
          preObj: this.data.recommendObj,
        });
      }
    },
    jump(e) {
      let data = e.detail.data;
      let {
        markState = 0,
        needToUse,
        userAction,
        activityCode,
        couponId,
        couponButton = {},
        storeId,
        couponType,
      } = e.detail.data;
      if (markState == 2) {
        // 未领取状态
        this.getCoupon(data);
      } else {
        if (needToUse == 1) {
          // 去使用
          this.handleCouponGo(data);
        }
      }
      let {
        pageIdFirstPage = "",
        prePageName = "",
        currentPageName = "",
      } = this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "click_coupon",
        click_par: {
          activityCode: activityCode || "",
          couponId: couponId,
          couponType: couponType || "",
          actType: couponButton.title,
          userAction: userAction || "",
          storeId: storeId || "",
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      });
    },
    // 券购跳转协议
    handleCouponGo(data) {
      getCouponProtocol({
        activityCode: data.activityCode || "",
        storeId: this.data.storeId || "",
        markState: data.markState || "",
        refPageSource: this.data.refPageSource,
        skuId: this.data.skuId.length > 0 ? this.data.skuId[0] : "",
        orgCode: this.data.orgCode || "",
        couponGoSource: 0,
        couponId: data.couponId || "",
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
            if (to) {
              djCmsJump({
                to: to,
                params: paramsNew,
                userAction,
                preObj: this.data.recommendObj,
                buried_position: {
                  key: "couponGo-couponFail-handleCouponGo",
                  options: this.data.options,
                },
              });
            }
          } else {
            mp.toast({
              title: res.data.msg || "哎呀，点击太疼啦，稍后再点我哦~",
            });
          }
        })
        .catch(() => {
          mp.toast({
            title: "哎呀，点击太疼啦，稍后再点我哦~",
          });
        });
    },
    // 领取普通优惠券
    getCoupon(data) {
      getCoupon({
        channel: "couponGo",
        source: "failPageGrab", //'failPageGrab',
        code: data.activityCode || "",
        platNewActivityFlag: data.platNewActivityFlag || 0,
        orgCode: this.data.orgCode || "",
        storeNo: this.data.storeId || "",
        pageSource: "couponGoodsList",
        needCouponGo: true,
        operType: 0,
      })
        .then((res) => {
          let { code, msg, result } = res.data;
          if (code == "0" && result) {
            if (result.busiCode === "AC4402") {
              // 限制V+会员领取
              mp.dialog({
                title: "温馨提示",
                content: "开通会员后才可领取哦~",
                showCancel: false,
                confirmText: "知道了",
              });
            } else if (result.busiCode === "AC1205") {
              // 活动即将开始，敬请期待！(AC1205)
              mp.toast({
                title: result.message || "活动即将开始，敬请期待！",
              });
            } else if (result.busiCode === "AC4401") {
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
                          key: "couponGo-couponFail-getCoupon1",
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
                        key: "couponGo-couponFail-getCoupon2",
                        options: this.data.options,
                      },
                    });
                  }
                }
              });
            } else if (result.busiCode === "AC4400") {
              // 限制VIP领取
              mp.dialog({
                title: "温馨提示",
                content: "VIP会员专享券，开通VIP会员即可领取！",
                showCancel: false,
                confirmText: "知道了",
              });
            } else if (result.busiCode === "AC3600") {
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
                        this.getCoupon(data);
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
            } else {
              mp.toast({
                title: "领取成功！",
              });
              let coupon =
                (result.responseList && result.responseList[0]) || {};
              this.data.responseList.forEach((item, index) => {
                if (
                  item.activityCode === coupon.activityCode &&
                  coupon.couponButton
                ) {
                  this.setData({
                    [`responseList[${index}]`]: coupon,
                  });
                }
              });
            }
          } else {
            mp.toast({
              title: msg || "领取失败！",
            });
          }
        })
        .catch(() => {
          mp.toast({
            title: "领取失败！",
          });
        });
    },
    // 埋点 领券失败领取推荐优惠券-使用
    clickUse() {
      // console.log(e)
    },
  },
});
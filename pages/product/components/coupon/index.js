import {
  FNIDS,
  request
} from "../../../../common/util/api";
import mp from "../../../../common/util/wxapi";
import {
  isLogin
} from '../../../../common/util/loginUtil';
import { getCoupon, getCouponProtocol } from '../../../../common/util/services'
import { djCmsJump, mpCmsJump } from '../../../../common/util/agreementV2'
/**
 * 事件类型
 */
const TYPE = {
  // 获取优惠券成功
  storeCouponGetCouponSuccess: 'storeCouponGetCouponSuccess',
  // 去登陆
  storeCouponToLogin: 'storeCouponToLogin',
  // 更新优惠券信息
  updateCoupon: 'updateCoupon'
};

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否关注门店 1： 关注 0：未关注
    attention: {
      type: Number,
      value: 0,
    },
    // 优惠券信息
    data: {
      type: Array,
      value: [],
      observer: function (newVal) {
        if (newVal.length > 0) {
          newVal.forEach((ele) => {
            if (ele.amount.indexOf(".") > -1) {
              ele.yuan = ele.amount.split(".")[0];
              ele.cent = ele.amount.split(".")[1];
            }
          });
          this.setData({
            data: newVal,
          });
        }
      },
    },
    // 门店ID
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
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

  /**
   * 组件的初始数据
   */
  data: {
    helpCouponInfo: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取优惠券
    getCoupon(e) {
      if (isLogin()) {
        let data = e.currentTarget.dataset;
        let index = data.index;
        // 是否要弹出随机券弹层
        let isShowLayer = data.isShowLayer;
        let {
          markState = "",
          needToUse = 1,
          styles = {},
          couponButton = "",
        } = data.item || {};
        let { couponButStyle = {} } = styles;
        let { state = 0 } = couponButStyle;
        if (couponButton) {
          state = couponButton.state || 0;
        }
        if (state == 1) {
          if (markState == 2) {
            // 未领取状态
            this.requestCoupon(data.item, index, isShowLayer);
          } else {
            if (needToUse == 1) {
              // 去使用
              this.handleCouponGo(data);
            }
          }
        }
      } else {
        mpCmsJump({
          pageType: "p56",
          preObj: this.data.recommendObj,
          buried_position: {
            key: "product-coupon-getCoupon",
            options: this.data.options,
          },
        });
      }
    },
    // 优惠券跳转
    handleCouponGo(data) {
      getCouponProtocol({
        activityCode: data.item.activityCode || "",
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
            let { to = "", params = {}, userAction = "" } = result;
            let paramsNew = { userAction: userAction };
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
                userAction,
                preObj: this.data.recommendObj,
                buried_position: {
                  key: "product-coupon-handleCouponGo",
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
    // 优惠券请求
    requestCoupon(couponItem, index, isShowLayer) {
      getCoupon({
        channel: "station_home_page",
        source: "homestore",
        code: couponItem.activityCode,
        isFollow: couponItem.isFans,
        orgCode: this.data.orgCode || "",
        storeNo: this.data.storeId || "",
        isFloor: 0,
        needCouponGo: true,
        grabPlat: 1,
        pageSource: "productDetail",
        ctp: "goodsinfo",
      })
        .then((res) => {
          let data = res.data;
          if (data.code === "0" && data.result) {
            let { busiCode, url, message } = data.result;
            if (busiCode == "AC4401") {
              wx.showModal({
                title: "温馨提示",
                content: message,
                confirmText: "去开通",
                success: function (res) {
                  if (res.confirm) {
                    djCmsJump({
                      to: "web",
                      params: {
                        url: encodeURIComponent(url),
                      },
                      preObj: this.data.recommendObj,
                      buried_position: {
                        key: "product-coupon-requestCoupon",
                        options: this.data.options,
                      },
                    });
                  }
                },
              });
            } else if (busiCode == "AC3600") {
              mp.dialog({
                content: "关注店铺才可领取粉丝券！",
                confirmText: "关注领取",
              }).then((res) => {
                if (res.confirm) {
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
                        // 优惠券请求
                        this.requestCoupon(couponItem, index, isShowLayer);
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
              let couponData =
                (data.result &&
                  data.result.responseList &&
                  data.result.responseList[0]) ||
                "";
              this.getStationCoupon(couponItem, couponData || {});
              if (busiCode == "0") {
                let key = `data[${index}]`;
                this.setData({
                  [key]: couponData,
                });
              } else {
                let key = `data[${index}].couponButton`;
                let key1 = `data[${index}].markState`;
                this.setData({
                  [key]: couponData.couponButton,
                  [key1]: couponData.markState,
                });
              }
              // 非新人券，toast提示
              if (!isShowLayer) {
                mp.toast({
                  title:
                    (data.result.message && data.result.message) ||
                    data.msg ||
                    "",
                });
              }
            }
          } else {
            // 其他券toast
            mp.toast({
              title: res.data.msg,
            });
          }
        })
        .catch(() => {});
    },
    // 更新优惠券信息
    getStationCoupon(obj, data) {
      this.triggerEvent("pageEvent", {
        type: TYPE.updateCoupon,
        data: {
          isShowLayer: obj.showLayer,
          data: data,
          opertype: obj.opertype,
          isFans: obj.isFans,
        },
      });
    },
  },
});

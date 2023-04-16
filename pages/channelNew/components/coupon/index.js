import { djCmsJump } from "../../../../common/util/agreementV2";
import {
  getActivityCoupon,
  getActivityCouponProtocol,
} from "../../../../common/util/services";
import mp from "../../../../common/util/wxapi";
import util from '../../../../common/util/util';
import { clickBuried_, clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  options: {
    addGlobalClass: true,
  },
  lazyObj: {
    epSelector: '.case_four .channel_comp_ep'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (val) {
        let listOne = val && val.data && val.data[0] || {};
        if (listOne.imgWidth && listOne.imgHeight) {
          this.setData({
            // imgWidth: '226rpx',
            imgHeight: (226 * listOne.imgHeight / listOne.imgWidth) + 'rpx'
          })
        }
      },
    },
    idx: {
      type: Number,
      value: 0,
    },
    traceId: {
      type: String,
      value: ''
    },
    // 搜推埋点需要的参数
    pageId: {
      type: String,
      value: ''
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // imgWidth: '226rpx',
    imgHeight: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击优惠券(普通券和红包)
    clickCoupon(e) {
      // console.log('e',e)
      let { item = {}, index = 0 } = e.currentTarget.dataset || {};
      let { markState, activityCode } = item;
      if (util.isLogin()) {
        if (markState === 2) {
          // 普通券未领取
          this.getCoupon(activityCode).then((res) => {
            if (res.length > 1) {
              // 展示弹层
              this.triggerEvent("onCouponEvent", {
                type: "coupons",
                data: res,
              });
            } else {
              // 更改券状态
              let key = `item.data[${index}].markState`;
              this.setData({
                [key]: 3,
              });
            }
          });
        } else if (markState === 3) {
          // 普通券去使用
          this.jump({
            activityCode: activityCode || "",
            storeId: item.storeId || "",
            markState: item.markState || "",
            orgCode: item.orgCode || "",
            couponId: item.couponId || "",
            userAction: item.userAction || ""
          });
        }
        // 埋点
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "click_coupon",
          click_par: {
            userAction: item.userAction || "",
            storeId: item.storeId || "",
            activityCode: activityCode || "",
            couponId: item.couponId || "",
            couponType: item.couponType || "",
            actType: item.markState == 2 ? '领取' : '使用',
          },
          pageId: this.data.pageId || "",
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName
        });
      } else {
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.recommendObj,
          buried_postion: "channel-coupon-login"
        })
      }
    },
    // 跳转协议
    jump(data) {
      let { orgCode, storeId } = this.data.storeInfo || {};
      getActivityCouponProtocol({
        activityCode: data.activityCode || "",
        storeId: data.storeId || storeId || "",
        markState: data.status || "",
        refPageSource: "",
        pageSource: "channel",
        orgCode: data.orgCode || orgCode || "",
        couponGoSource: 4,
        couponPattern: data.couponType || 1,
        couponId: data.couponId || "",
        ref: "",
        ctp: "active"
      }).then(res => {
        let result = res.data.result || '';
        if (res.data.code == '0' && result && result.length) {
          if (result.length > 1) { // 展示券包弹层
            // 展示弹层
            this.triggerEvent('onCouponEvent', {
              type: 'coupons',
              data: result
            })
          } else {
            let item = result[0] || {};
            if (item.toast) {
              mp.toast({
                title: item.toast
              })
            } else {
              let { to = '', params = {}, userAction = "" } = item.couponComponentResponse || {};
              let paramsNew = { userAction: userAction };
              for (let i in item.couponComponentResponse.params) {
                if (i != 'passThroughParam') {
                  paramsNew[i] = params[i]
                } else {
                  for (let j in params.passThroughParam) {
                    if (params.passThroughParam[j]) {
                      paramsNew[j] = params.passThroughParam[j]
                    }
                  }
                }
              }
              if (to) {
                djCmsJump({
                  to: to,
                  params: paramsNew,
                  userAction: data.userAction,
                  preObj: this.data.recommendObj,
                  buried_postion: "channel-coupon"
                })
              }
            }

          }
        } else {
          mp.toast({
            title: res.data.detail || '哎呀，点击太疼啦，稍后再点我哦~'
          })
        }
      })
    },
    // 领取普通券
    getCoupon(code) {
      return new Promise((resolve) => {
        getActivityCoupon({
          refPageSource: "home",
          code: code,
          fromSource: 2,
          operType: 1,
          isFloor: 1,
          needCouponGo: true,
          grabPlat: 1,
          platNewActivityFlag: "",
          orgCode: "",
          channel: "activity_page",
          couponPattern: 1,
          pageSource: "activityDetail",
          ref: "home",
          ctp: "active",
        }).then((res) => {
          if (res.data.code === "0") {
            let { message, busiCode, responseList } = res.data.result || {};
            if (busiCode === "0") {
              resolve(responseList);
            } else {
              message &&
                mp.toast({
                  title: message,
                });
            }
          } else {
            mp.toast({
              title: res.data.msg || "领券失败！",
            });
          }
        }).catch((res) => {
          mp.toast({
            title: res.data.msg || "领券失败！",
          });
        });
      });
    },
  },
});

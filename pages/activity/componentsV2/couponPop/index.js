
import { djCmsJump } from '../../../../common/util/agreementV2'
// import { getActivityCouponProtocol } from '../../../../common/util/services';
import mp from '../../../../common/util/wxapi'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [],
      observer: function (val) {
        if (val && val.length) {
          val.forEach(item => {
            if (item.couponComponentResponse) {
              item.couponComponentResponse.toast = item.toast || ''
            }
          });
        }
        this.setData({
          list: val
        })
      }
    },
    // 门店信息
    storeInfo: {
      type: Object,
      value: {}
    },
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
    traceId: {
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
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    catchtouchmove() {
      return false
    },
    // 点击优惠券
    rightBtnClick(e) {
      let { userAction, toast, to, params } = e.detail.data || {};
      if (toast) {
        mp.toast({
          title: toast
        })
      } else {
        let { orgCode = '', storeId = '' } = this.data.storeInfo || {}
        let paramsNew = { userAction: userAction };
        for (let i in params) {
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
        if (!paramsNew.orgCode && orgCode) {
          paramsNew.orgCode = orgCode
        }
        if (!paramsNew.storeId && storeId) {
          paramsNew.storeId = storeId
        }
        if (to) {
          djCmsJump({
            to: to,
            params: paramsNew,
            userAction,
            preObj: this.data.recommendObj,
            buried_position: "active-couponPop"
          })
        }
      }

      // getActivityCouponProtocol({
      //     activityCode: activityCode || '',
      //     storeId: stationNo || this.data.storeInfo.storeId || '',
      //     markState: markState || '',
      //     refPageSource: "home",
      //     pageSource: 'activityDetail',
      //     orgCode: orgCode || this.data.storeInfo.orgCode || '',
      //     couponGoSource: 1,
      //     couponPattern: couponType || 1,
      //     couponId: couponId || "",
      //     ref: "",
      //     ctp: "active"
      // }).then(res => {
      //     let result = res.data.result && res.data.result[0] || '';
      //     if (res.data.code == '0' && result && result.couponComponentResponse) {
      //         let { to = '', params = {}, userAction = "" } = result.couponComponentResponse;
      //         let paramsNew = { userAction: userAction };
      //         for (let i in result.params) {
      //             if (i != 'passThroughParam') {
      //                 paramsNew[i] = params[i]
      //             } else {
      //                 for (let j in params.passThroughParam) {
      //                     if (params.passThroughParam[j]) {
      //                         paramsNew[j] = params.passThroughParam[j]
      //                     }
      //                 }
      //             }
      //         }
      //         if (to) {
      //             djCmsJump({
      //                 to: to,
      //                 params: paramsNew,
      //                 userAction
      //             })
      //         }
      //     } else {
      //         mp.toast({
      //             title: res.data.detail || '哎呀，点击太疼啦，稍后再点我哦~'
      //         })
      //     }
      // })
    },
    // 关闭弹层
    closePop() {
      this.setData({
        list: []
      })
    },
    // 查看我的优惠券
    goToMyCoupon() {
      wx.navigateTo({
        url: '/pages/coupon/person-coupon',
        preObj: this.data.recommendObj,
        buried_position: "active-coupon-goToMyCoupon"
      })
    }
  }
})

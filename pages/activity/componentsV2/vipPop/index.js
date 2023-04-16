import { djCmsJump } from '../../../../common/util/agreementV2'
import { convertCoupon } from '../../../../common/util/services'
import mp from '../../../../common/util/wxapi';
Component({
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    vip: {
      type: Object,
      value: {}
    },
    coupon: {
      type: Object,
      value: {}
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭vip弹层
    closeVipPop() {
      this.setData({
        vip: ''
      })
    },
    // 开通vip 
    goToOpenVip() {
      let { to = "", params = {} } = this.data.vip || {};
      djCmsJump({
        to: to,
        params: params,
        preObj: this.data.recommendObj,
        buried_position: "active-vipPop"
      })
    },
    // cancel兑换
    cancel() {
      this.setData({
        vip: ''
      })
    },
    // 确认兑换
    sure() {
      let { exchangeFlag = "", targetPackage = {}, sourcePackage = {} } = this.data.vip || {};

      convertCoupon({
        "refPageSource": "home",
        "activityCode": targetPackage.activityCode || '',
        "consumeCode": sourcePackage.activityCode || '',
        "grabChannel": "activity_page",
        "serviceVersion": 2,
        "exchangeFlag": exchangeFlag,
        "buyCouponWithOrderFlag": false,
        "pageSource": "activityDetail",
        "ref": "home",
        "ctp": "active"
      }).then(res => {
        if (res.data.code === '0') { // 兑换成功
          this.triggerEvent('onConvertCouponEvent', {
            data: res.data.result || {}
          })
        } else {
          mp.toast({
            title: res.data.msg || '兑换失败'
          })
        }
        this.cancel()
      }).catch(() => {
        mp.toast({
          title: '兑换失败'
        });
        this.cancel()
      })
    }
  }
})

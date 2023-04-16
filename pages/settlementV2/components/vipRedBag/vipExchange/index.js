import mp from '../../../../../common/util/wxapi'
import { request, FNIDS } from '../../../../../common/util/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    data: {
      type: Object,
      value: {},
      observer: function (newVal) {
        // console.log(newVal)
      }
    },
    orderPageId: {
      type: String,
      value: "",
    },
    buyCouponWithOrderFlag: {
      type: Number,
      value: 0
    },
    buriedObj: {
      type: Object,
      value: null
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
    // 放弃优惠
    clickCancel() {
      this.setData({
        show: false
      })
    },
    // 点击确认兑换
    clickSure() {
      let data = this.data.data;
      let consumeCode = data.sourcePackage && data.sourcePackage.activityCode || '';
      let activityCode = data.targetPackage && data.targetPackage.activityCode || '';
      request({
        ...FNIDS.changeRedPacketCoupon,
        isNeedDealError: true,
        method: "post",
        body: {
          activityCode: activityCode,
          consumeCode: consumeCode,
          grabChannel: 'order_pay_page',
          exchangeFlag: data.exchangeFlag || 3,
          orderPageId: this.data.orderPageId,
          buyCouponWithOrderFlag: this.data.buyCouponWithOrderFlag,
          serviceVersion: 2
        },
        preObj: this.data.buriedObj
      }).then(res => {
        let result = res.data.result;
        if (res.data.code == '0') {
          this.triggerEvent('widgetEvent', {
            type: 'vipExchange',
            data: {
              activityCode: result.activityCode || '',
              consumeCode: result.consumeCode || ''
            }
          });
          this.setData({
            show: false
          });
          mp.toast({
            title: '兑换成功'
          });
        } else {
          mp.toast({
            title: '兑换失败'
          })
        }
      }).catch(err => {
        mp.toast({
          title: err.msg || '兑换失败'
        });
      })
    }
  }
});

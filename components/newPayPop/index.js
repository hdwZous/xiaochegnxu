const plugin = requirePlugin('jd@wxapp-deal')
const loginPlugin = requirePlugin("loginPlugin");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showNewPayPop: {
      type: Boolean,
      value: false
    },
    fee: {
      type: Number || String,
      value: 0
    },
    dealId: {
      type: String,
      value: '',
    },
    storeId: {
      type: String,
      value: '',
    },
    orgCode: {
      type: String,
      value: '',
    },
    bgType: {
      type: Number || String,
      value: 1,
    },
    buriedObj: {
      type: Object,
      value: {}
    }
  },
  created() {
    plugin.setAuthentication({
      ptkey: loginPlugin.getPtKey()
    })
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
    // 关闭弹层
    closeNewPayPop() {
      this.triggerEvent('closeNewPayPop')
    },
    // 支付取消
    onPayCancel(e) {
      wx.switchTab({
        url: '/pages/tabBar/orderlist/index'
      })
      this.triggerEvent('onPayCancel', e)
    },
    // 支付成功
    onPaySuccess(e) {
      const { dealId, storeId, orgCode, bgType, buriedObj } = this.data
      wx.navigateTo({
        url: `/pages/order/paySuccess/index?orderId=${dealId}&storeId=${storeId}&orgCode=${orgCode}&bgType=${bgType}`,
        preObj: buriedObj
      })
      this.triggerEvent('onPaySuccess', e)
    },
    // 支付错误
    onPayFail(e) {
      wx.switchTab({
        url: '/pages/tabBar/orderlist/index',
        preObj: this.data.buriedObj
      })
      this.triggerEvent('onPayFail', e)
    },
    // 登录丢失
    onAuthFail(e) {
      this.triggerEvent('onAuthFail', e)
    },
  }
})

Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
    toLogin() {
      wx.navigateTo({
        url: `/pages/newLogin/login/login`,
        preObj: this.data.buriedObj
      })
    }
  },
})

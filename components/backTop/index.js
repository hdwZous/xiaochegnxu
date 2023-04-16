Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageMoving: {
      type: Boolean,
      value: false
    },
    hideBackTop: {
      type: Boolean,
      value: true
    },
    showMinicar: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: getApp().globalData.isIphoneX
  },
  lifetimes: {
    // attached: function () {
    // }
  },
  pageLifetimes: {
    // show: function () {
    // }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goBackTop() {
      wx.pageScrollTo({
        scrollTop: 0,
      });
      this.triggerEvent('handleBackTop')
    }
  }
})

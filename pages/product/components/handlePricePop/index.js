
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 展示弹层
    showPop: {
      type: Boolean,
      value: false
    },
    data: {
      type: Object,
      value: null,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIpx: getApp().globalData.isIpx,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭弹层
    hidePop() {
      this.triggerEvent("pageEvent", {
        type: "handlePricePop",
      });
      // this.setData({
      //   showPop: false,
      // });
    },
    catchtouchmove() {
      return false
    }
  },
});

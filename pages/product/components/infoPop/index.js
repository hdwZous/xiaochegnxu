Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
    },
    isShow: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIpx: getApp().globalData.isIpx,
  },
  attached() {
    this.setData({
      isIpx: getApp().globalData.isIpx,
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    closePop() {
      // this.setData({
      //   isShow: false,
      // });
      this.triggerEvent("pageEvent", {
        type: "hideInfoPop"
      });
    },
  },
});

Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    capsule: {
      type: Object,
    },
    retainCoupon: {
      type: Object,
      value: null
    },
    storeId: {
      type: String,
      value: ''
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
    goBack() {
      if (this.data.retainCoupon && this.data.retainCoupon.title && this.todayNeedShowPop()) {
        this.triggerEvent('showRetain')
      } else {
        wx.navigateBack({
          delta: 1,
        });
      }
    },
    // 判断当前门店挽留弹窗当天是否弹出过
    todayNeedShowPop() {
      let old = "";
      try {
        old = wx.getStorageSync("settleRetain")[this.data.storeId];
      } catch (e) {}
      let date = new Date();
      let now = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
      if (now != old) {
        try {
          wx.setStorageSync("settleRetain", {[this.data.storeId]: now});
        } catch (e) {}
        return true;
      } else {
        return false;
      }
    },
  }
});

Component({
  options: {
    addGlobalClass: true
  },
  /**
     * 组件的属性列表
     */
  properties: {
    indexPageRequestLoaded: {
      type: Boolean,
      value: false,
      observer: function() {
        this.handleAddMyMpPop()
      }
    }
  },

  /**
     * 组件的初始数据
     */
  data: {
    showPop: false, 
    top: '140rpx',
  },
  lifetimes: {
    attached() {
      let top = getApp().globalData.isIpx ? '180rpx' : '140rpx';
      this.setData({
        top: top
      });
    }
  },
  /**
     * 组件的方法列表
     */
  methods: {
    // 【弹层】添加我的小程序弹层
    handleAddMyMpPop() {
      let addMyMpFlagNormal = wx.getStorageSync('add_my_mp_flag_normal');  // 普通添加小程序弹层（整个APP中只弹一次）
      if(!addMyMpFlagNormal) {
        wx.setStorageSync('add_my_mp_flag_normal', true);
        this.setData({
          showPop: true
        })
      }else {
        this.triggerEvent("handleAddMyMpCallback", {})
      }
    },

    closeBg() {
      this.setData({
        showPop: false
      })
      this.triggerEvent("addGuideLayerBuried")
    },
    closeKnowBtn() {
      this.triggerEvent("guideGetBeanBuried")
      this.setData({
        showPop: false
      })
    }
  }
})


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    initData: {
      type: Object,
      value: {},
      observer: function () {
        //  console.log('val',val)
      }
    },
    type: {
      type: Number,
      value: 1
    },
    serviceDialogVisible:{
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // noticeDialogVisible: false,
    noticeDialogData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.triggerEvent("onServiceDialogVisible", {serviceDialogVisible: false})
    },
    handleClickTel() {
      wx.makePhoneCall({
        phoneNumber: this.data.initData.phoneNum,
      });
    }
  }
})

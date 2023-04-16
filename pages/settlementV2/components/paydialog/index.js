Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showDialog: {
      type: Boolean,
      value: false 
    },
    width: {
      type: Number,
      value: 588
    },
    height: {
      type: Number,
      value: 0
    },
    //背景色
    backgroundColor: {
      type: String,
      value: 'white'
    },
    //密码位数
    maxLength: {
      type: Number,
      value: 6
    },
    title: {
      type: String,
      value: ''
    },
    tips: {
      type: String,
      value: ''
    },
    errorTips: {
      type: String,
      value: ''
    },
    forgetPassword: {
      type: String,
      value: ''
    },
    clear: {
      type: String,
      value: '',
      observer(newVal) {
        if (newVal) {
          this.setData({
            inputPwd: ''
          })
        }
      }
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
    inputPwd: '',
    focus: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hide() {
      this.setData({
        showDialog: false,
        inputPwd: ""
      });
      this.triggerEvent("inputPwd", {data: ''})
    },
    prevent() {
      return false;
    },
    focusInput() {
      this.setData({
        focus: true
      })
    },
    inputBlur() {
      this.setData({
        focus: false
      })
    },
    forgetGiftPwd() {
      wx.navigateTo({
        url: `/pages/h5/index?url=${encodeURIComponent(this.data.forgetPassword||"")}`,
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'settlementv2_paydialog_forgetGiftPwd'
        }
      })
    },
    showDialog() {
      this.setData({
        showDialog: true
      })
    },
    inputPwd(e) {
      let inputPwd = e.detail.value
      this.setData({
        inputPwd
      })
      if (inputPwd.length === this.data.maxLength) {
        this.triggerEvent("inputPwd", {data: inputPwd})
      }
    }
  }
});
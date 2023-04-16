
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
    noticeDialogVisible: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    noticeDialogData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.triggerEvent("onNoticeDialogVisible", {noticeDialogVisible: false})
    }
  }
})

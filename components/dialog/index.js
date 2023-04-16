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
    useClose: {
      type: Boolean,
      value: true
    },
    backgroundColor: {
      type: String,
      value: ''
    },
    scroll: {
      type: Boolean,
      value: true
    },
    userScroll: {
      type: Boolean,
      value: true
    },
    styles: {
      type: String,
      value: ""
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
    hide() {
      this.setData({
        showDialog: false
      });
      this.triggerEvent("pageEvent", {
        type: "closeDialog"
      })
    },
    showDialog() {
      this.setData({
        showDialog: true
      })
    }
  }
});

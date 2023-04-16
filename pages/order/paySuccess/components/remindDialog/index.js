Component({
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    tips: {
      type: String,
      value: '',
      observer(news) {
        if (news) {
          this.setData({show: true})
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.setData({show: false})
    },
  },
});

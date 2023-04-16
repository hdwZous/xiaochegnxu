Component({
  /**
     * 组件的属性列表
     */
  properties: {
    images: {
      type: Array,
      value: []
    },
    imageWaterMark: {
      type: String,
      value: ''
    }
  },

  /**
     * 组件的初始数据
     */
  data: {
    current: 0
  },

  /**
     * 组件的方法列表
     */
  methods: {
    // 监听滑动事件
    onBindChange(e) {
      let { current = 0 } = e.detail;
      this.setData({
        current
      })
    }
  }
})

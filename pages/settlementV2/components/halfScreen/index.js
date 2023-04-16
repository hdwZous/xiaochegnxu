Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //外部控制是否显示弹层
    show: {
      type: Boolean,
      value: false
    },
    //弹窗内容高度 默认80%
    height: {
      type: String,
      value: '80vh'
    },
    //是否显示标标题
    showTitle: {
      type: Boolean,
      value: true
    },
    //标题
    title: {
      type: String,
      value: ''
    },
    //层级高度
    zIndex: {
      type: Number,
      value: 12
    },
    //来源
    from: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBg: false,
    showContent: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _hide() {
      this.triggerEvent('closeBg')
    },
    preventD() {
      return false
    }
  }
});

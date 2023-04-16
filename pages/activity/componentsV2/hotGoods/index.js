Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function (newVal) {
        this.setData({
          hotGoodList: newVal.data || [],
          styleTpl: newVal.styleTpl
        })
      }
    },
    activityId: {
      type: String,
      value: ''
    },
    biActivityId: {
      type: String,
      value: ''
    },
    traceId: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hotGoodList: [],
    styleTpl: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
});

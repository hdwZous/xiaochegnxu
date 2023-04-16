
Component({
  lazyObj: {
    selector: '.channel_comp_ep',
    epSelector: '.infeedNav .channel_comp_ep'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    currentIndex: {
      type: String,
      value: ''
    },
    item: {
      type: Object,
      value: {}
    },
    traceId: {
      type: String,
      value: ''
    },
    userAction: {
      type: String,
      value: ''
    },
    config: {
      type: Object,
      value: {}
    },
    infeedType: {
      type: String,
      value: ''
    },
    isShowArrow: {
      type: Boolean,
      value: false
    },
    arrowDirection: {
      type: Boolean,
      value: false
    },
    horiCurrentIndex: {
      type: String,
      value: ''
    },
    sencondName: {
      type: String,
      value: ''
    },
    index2: {
      type: String,
      value: ''
    },
    pageId: {
      type: String,
      value: ''
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
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
    
  }
})

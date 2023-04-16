Component({
  /**
   * 组件的属性列表
   */
  lazyObj: {
    epSelector: ".more_case_pop_content"
  },
  options: {
    addGlobalClass: true
  },
  properties: {
    item: {
      type: Object,
      value: {}
    },
    curNav: {
      type: String,
      value: 'nav0'
    },
    index: {
      type: Number,
      value: 0
    },
    traceId: {
      type: String,
      value: ''
    },
    storeImgLazyLoad: {
      type: Object,
      value: {}
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
  }
})
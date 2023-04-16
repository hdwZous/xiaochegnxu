Component({
  /**
   * 组件的属性列表
   */
  lazyObj: {
    epSelector: ".filter-item"
  },
  properties: {
    subItem: {
      type: Object,
      value: {}
    },
    traceId: {
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
    },
  }
});
Component({
  /**
   * 组件的属性列表
   */
  lazyObj: {
    epSelector: ".filter-subitem"
  },
  properties: {
    traceId: {
      type: String,
      value: ''
    },
    subItem: {
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
});
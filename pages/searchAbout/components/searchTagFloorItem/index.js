Component({
  /**
   * 组件的属性列表
   */
  lazyObj: {
    epSelector: ".tag-floor-item-con"
  },
  properties: {
    item: {
      type: Object,
      value: null,
      observer(val) {
        if (val) {
          this.epSection && this.epSection();
        }
      }
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
    }
  }
});
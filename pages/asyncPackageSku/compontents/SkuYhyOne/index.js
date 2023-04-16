// 全局搜索商品
Component({
  /**
   * 组件的属性列表
   */
  lazyObj: {
    epSelector: ".good-item"
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: {
      type: Object,
      value: null,
      observer(val) {
        if(val){
          this.epSection && this.epSection();
        }
      }
    },
    traceId: {
      // 埋点产品要求新增 traceId
      type: String,
      value: ""
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
    recommendObj: {
      type: Object,
      value: {}
    }
  }
});
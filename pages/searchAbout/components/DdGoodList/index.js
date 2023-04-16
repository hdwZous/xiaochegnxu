// 全局搜索商品列表
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    traceId: {
      // 埋点产品要求新增 traceId
      type: String,
      value: "",
    },
    keyword: {
      type: String,
      value: ''
    },
    goodList: {
      type: Array,
      value: []
    },
    hasNextPage: {
      type: Boolean,
      value: true,
    },
    imgLazyLoad: {
      type: Object,
      value: {},
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  }
});
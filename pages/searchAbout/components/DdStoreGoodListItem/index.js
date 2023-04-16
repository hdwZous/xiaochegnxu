Component({
  options: {
    addGlobalClass: true
  },

  lazyObj: {
    selector: '.dd_store_list_box'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {}
    },
    traceId: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    },
    keyword:{
      type: String,
      value: ''
    }
  }
})

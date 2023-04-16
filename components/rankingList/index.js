import { djCmsJump } from "../../common/util/agreementV2";
Component({
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
    item: {
      type:Object,
      value: {}
    },
    userAction: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  },

  options: {
    addGlobalClass: true
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
    goRank(e) {
      let { to, params } = e.currentTarget.dataset;
      if (params && params.url.match('https://daojia.jd.com/html/index.html')) {
        params.url = params.url.replace('https://daojia.jd.com/html/index.html','https://daojia.jd.com/html/index/index.html')
      }
      if (to) {
        let {storeId, keyword, skuId} = this.data.item;
        let traceId = this.data.traceId;
        djCmsJump({
          to,
          params,
          userAction: this.data.userAction,
          storeId,
          keyword,
          skuId,
          traceId,
          preObj: this.data.buriedObj
        })
      }
    }
  }
});

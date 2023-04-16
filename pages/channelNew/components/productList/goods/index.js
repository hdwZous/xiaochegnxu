// pages/channelNew/components/productList/goods/index.js
Component({
  lazyObj: {
    epSelector: '.channel_goods_ep .channel_comp_ep',
    needExposure: true,
    componentName: 'productList'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function(val, oldVal) {
        if (oldVal.data && val.data.skuId != oldVal.data.skuId) {
          this.epSection && this.epSection()
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

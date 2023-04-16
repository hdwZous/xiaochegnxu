Component({
  /**
   * 组件的属性列表
   */
  properties: {
    skuName: {
      type: String,
      value: ''
    },
    skuImgUrl: {
      type: String,
      value: ''
    },
    storeName: {
      type: String,
      value: ''
    },
    storeIcon: {
      type: String,
      value: ''
    },
    basicPrice: {
      type: String,
      value: ''
    },
    actPrice: {
      type: String,
      value: ''
    },
    totalMembers: {
      type: String,
      value: ''
    },
    price: {
      type: String,
      value: ''
    },
    // 商品价格-订单详情页
    productPrice: {
      type: Array,
      value: null
    },
    skuId: {
      type: Number,
      value: 0
    },
    orgCode: {
      type: String,
      value: ''
    },
    storeId: {
      type: String,
      value: ''
    },
    promotionId: {
      type: Number,
      value: 0
    },
    deliveryType: {
      type: Number,
      value: 0
    },
    groupType: {
      type: String,
      value: ''
    },
    groupMode: {
        type: Number,
        value: 0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    goGoodDetail(e) {
      var data = e.currentTarget.dataset;
      this.triggerEvent("pageEvent", {
        type: "goGoodDetail",
        data: {
          orgCode: data.orgcode,
          promotionId: data.promotionid || '',
          skuId: data.skuid,
          storeId: data.storeid
        }
      })
    }
  }
});
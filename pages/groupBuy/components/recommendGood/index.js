Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodInfo: {
      type: Object,
      value: {},
      observe: function(newVal, oldVal) {
        this.setData({
          goodInfo: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    goodInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toGroupBuyDetail(e) {
      let data = e.currentTarget.dataset;
      this.triggerEvent("pageEvent", {
        type: "toGroupBuyDetail",
        data: {
          orgCode: data.orgcode,
          promotionId: data.promotionid,
          skuId: data.skuid,
          storeId: data.storeid
        }
      })
    }
  }
})
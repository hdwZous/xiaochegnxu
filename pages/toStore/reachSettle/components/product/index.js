
Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    infos: {
      type: Object,
      value: {}
    }
  },

  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    modify(e) {
      let { type = '', infos = {} } = e.currentTarget.dataset
      let { skuId, cartUuid = '', skuNum } = infos
      let count = type == 'min' ? skuNum - 1 : type == 'add' ? skuNum + 1 : 0
      this.triggerEvent('modifySku', {
        count,
        skuId,
        cartUuid,
        type
      })
    }
  }
})

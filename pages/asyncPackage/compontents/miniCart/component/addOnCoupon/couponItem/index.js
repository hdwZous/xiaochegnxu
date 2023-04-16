Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item:{
      type:Object,
      value:{},
      observer: function(val) {
        this.filterConponListData(val)
      }
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
    handleBtnClick() {
      this.triggerEvent('rightBtnClick',{data:this.data.item})
    },
    filterConponListData(item) {
      let {price} = item;
      if(price && price.split('.').length > 1) {
        item.renderDataByFE = {};
        item.renderDataByFE.price = price.split('.')
        this.setData({
          item:item
        })
      }
    },
  }
})

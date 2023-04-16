Component({
  /**
   * 组件的属性列表
   */
  properties: {
    skus: {
      type: Array,
      value: []
    },
    productTotal: {
      type: Number,
      value: 0
    },
    totalWeight: {
      type: String,
      value: ''
    },
    storeName: {
      type: String,
      value: ''
    },
    distributionType: {
      type: Object,
      value: null
    }
  },

  observers: {
    'skus': function (newVal) {
      if (newVal && newVal.length) {
        let productList = newVal.length > 2 ? newVal.slice(0, 2) : newVal
        let productIsFold = newVal.length > 2 ? true : false
        this.setData({
          productList,
          productIsFold
        })
      }
    }
  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    productList: [],
    amountOfFold: 2,
    productIsFold: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onProductFoldBtnClicked() {
      if (this.data.skus.length > 2) {
        let productIsFold = !this.data.productIsFold
        let productList = productIsFold ? this.data.skus.slice(0, 2) : this.data.skus
        this.setData({
          productList,
          productIsFold
        })
      } else {
        return
      }
    }
  }
});

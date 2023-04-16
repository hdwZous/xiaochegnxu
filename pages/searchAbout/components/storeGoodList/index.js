Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    goodList: {
      type: Array,
      value: [],
      observer: function (val) {
        let arr = []
        // 用户滑动浏览商品数大于200，截去后200
        if (val.length >= 200) {
          val = val.slice(-200)
        }
        val.map(item => {
          arr.push(item.skuId)
        });
        this.setData({
          excludeSkuIds: arr
        })
      }
    },
    imgLazyLoad: {
      type: Object,
      value: {}
    },
    keyword: {
      type: String,
      value: ''
    },
    traceId: {
      type: String,
      value: ''
    },
    recommendNumber: {
      type: String,
      value: 1,
      observer: function (val) {
        this.setData({
          totalTimes: val
        })
      }
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
    updateNum: {
      type: Object,
      value: {}
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },
  data: {
    currentRecommd: {},
    excludeSkuIds: [],
    totalTimes: 1,
    currentCheckList: []
  },
  methods: {
    noticeParent(type, data) {
      this.triggerEvent('listenCountChange', {
        params: {
          type: type,
          data: data
        }
      })
    },
    // 获取加车信息
    addMinControllerChange(e) {
      if (e.detail.type == 'add' && this.data.totalTimes > 0) {
        this.data.currentCheckList.push(e.detail.data.skuId)
        this.setData({
          currentRecommd: e.detail.data,
          // totalTimes: (this.data.totalTimes - 1),
          currentCheckList: this.data.currentCheckList
        })
      }
    },
    // 推荐加车组件回调
    computeTime(e) {
      if (e.detail && e.detail.productList.length > 0 && this.data.totalTimes > 0) {
        this.setData({
          totalTimes: (this.data.totalTimes - 1)
        })
      }
    }
  }
});
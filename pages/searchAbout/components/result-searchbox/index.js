// 共用组件
Component({
  properties: {
    searchKey: {
      type: String,
      value: ""
    },
    fromSource: {
      type: String,
      value: ""
    },
    storeId: {
      type: String,
      value: ""
    },
    orgCode: {
      type: String,
      value: ""
    },
    channelId: {
      type: String,
      value: ""
    },
    isCart: {
      type: Boolean,
      value: true
    },
    fatherFilterList: {
      type: Array,
      value: [],
      observer: function (arr) {
        this.setData({
          filterList: arr,
          id: `_${arr.length - 1}`
        });
      }
    },
    searchTag: {
      type: Object,
      value: {}
    },
    styleABMap: {
      type: Object,
      value: {}
    },
    onPullDown: {
      type: Boolean,
      value: false
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    isHasTabs: {
      type: Boolean,
      value: false
    },
    channelType: {
      type: String,
      value: ''
    }
  },
  data: {
    filterList: [],
    id: ""
  },
  methods: {
    onSeachWordClicked () {
      let { buriedObj = {}, isCart = true } = this.data;
      if (this.data.fromSource) {
        // 从店内搜索结果页过来
        wx.redirectTo({
          url: `../search/search?searchKey=${this.data.searchKey}&curStoreId=${this.data.storeId}&fromSource=${this.data.fromSource}&orgCode=${this.data.orgCode}&showValue=true&channelId=${this.data.channelId}&isCart=${isCart}&channelType=${this.data.channelType}`,
          preObj: buriedObj
        });
      } else {
        // 从全局搜索结果页过来
        wx.redirectTo({
          url: `../search/search?searchKey=${this.data.searchKey}&showValue=true&channelType=${this.data.channelType}`,
          preObj: buriedObj
        });
      }
    },
    clickItem (e) {
      let {item} = e.currentTarget.dataset
      this.triggerEvent("getGoodList", {
        type: 'search',
        data: item
      });
    },
    clickTag (e) {
      const { item } = e.currentTarget.dataset
      // this.triggerEvent("getGoodList", {
      //   type: 'searchTag',
      //   data: item
      // });
      this.triggerEvent("fetchData", {
        type: 'searchTag',
        data: item
      });
    }
  }
});
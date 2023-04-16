Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    capsule: {
      type: Object,
    },
    titlePicUrl: {
      type: String,
      value: "",
    },
    scrollTop: {
      type: Number,
      value: 0,
    },
    searchWord: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  },

  observers: {
    scrollTop: function (nums) {
      let opacity = 1 - (nums / 100) * 2;
      this.setData({
        opacity,
      });
    },
    searchWord: function (newVal) {
      if (newVal.length && newVal.length > 4) {
        this.setData({ searchWord: "" });
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageError: false,
    opacity: 1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack() {
      wx.navigateBack({
        delta: 1,
      });
    },
    imageError() {
      this.setData({
        imageError: true,
      });
    },
    goToSearch() {
      wx.navigateTo({
          url: `/pages/searchAbout/search/search?searchKey=${this.data.searchWord}&fromSource=seckill`,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'seckill_navigation_goToSearch'
          }
      });
    },
  },
  lifetimes: {
    attached() {},
  },
});

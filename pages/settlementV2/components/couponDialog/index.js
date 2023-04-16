Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        setTimeout(() => {
          this.setData({
            showDialog: newVal,
          });
        }, 100);
      },
    },
    list: {
      type: Array,
      value: [],
      observer: function(val) {
        // console.log('val',val)
      },
    },
    unique:{
      type: String,
      value: ''
    },
    orderPageId:{
      type:String,
      value: ''
    },
    couponCacheId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIpx: getApp().globalData.isIpx,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击券
    clickCoupon(e) {
      let index = e.currentTarget.dataset.index;
      let state = e.currentTarget.dataset.state;
      this.triggerEvent("onClickCoupon", { index: index, state: state });
    },
    // 点击关闭弹层
    closePop() {
      this.setData({
        showDialog: false,
      });
      setTimeout(() => {
        this.triggerEvent("onClickCloseCoupon", { isShow: false });
      }, 100);
    },
    // 点击不可用原因
    clickReason(e) {
      let index = e.currentTarget.dataset.index;
      let list = this.data.list;
      list.length > 0 &&
        list.forEach((item, idx) => {
          if (index === idx) {
            item.tipsShow = true;
          } else {
            item.tipsShow = false;
          }
        });
      this.setData({
        list: list,
      });
    },
    // 去掉其他提示语
    clickContent() {
      let list = this.data.list;
      list.length > 0 &&
        list.forEach((item) => {
          item.tipsShow = false;
        });
      this.setData({
        list: list,
      });
    },
  },
});

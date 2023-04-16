let app = getApp();

Component({
  properties: {
    logo: {
      type: String,
      value: "",
    },
    url: {
      type: String,
      value: "",
    },
    storeMemberName: {
      type: String,
      value: "",
    },
    couponSimpleInfo: {
      type: Array,
      value: [],
    },
    // 老优惠券弹层的满减信息
    tags: {
      type: Array,
      value: [],
    },
    navigateBarHeight: {
      type: Number,
      value: 66,
      observer: function (val) {
        let { windowWidth = 375 } = app.globalData.systemInfo || {};
        let scale = windowWidth / 750;
        let height = 268 * scale + val;
        this.setData({
          height: parseInt(height),
        });
      },
    },
    // 新优惠券弹层的满减信息
    promotionList: {
      type: Array,
      value: [],
    },
  },
  data: {
    height: 200,
  },
});
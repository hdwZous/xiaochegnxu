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
    // 优惠券
    couponInfo: {
      type: Array,
      value: [],
    },
    // 满减信息
    promotionList: {
      type: Array,
      value: [],
    },
  },
  data: {
    height: 200,
  },
  attached() {
    let { 
      statusBarHeight = 0, 
      windowWidth = 375 
    } = app.globalData.systemInfo || {};
    let navigateBarHeight = statusBarHeight + 46; //导航高度
    let scale = windowWidth / 750;
    let height = 268 * scale + navigateBarHeight;
    this.setData({
      height: parseInt(height),
    });
  },
});
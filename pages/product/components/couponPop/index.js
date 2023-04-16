Component({
  properties: {
    couponData: {
      type: Array,
      value: null,
    },
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },

    showPop: {
      type: Boolean,
      value: false,
      observer(newVal) {
        if (newVal) {
          this.setData({
            toTop: 0,
          });
        } else {
          this.setData({
            toTop: "",
          });
        }
      },
    },
    vip: {
      type: Boolean,
      value: false,
    },
    options: {
      type: Object,
      value: {},
    },
    buriedObj: {
      type: Object,
      value: {},
    },
  },
  data: {
    couponData: [],
    toTop: "",
  },
  methods: {
    // 监听组件事件
    widgetEvent(e) {
      let type = e.detail.type;
      let data = e.detail.data;
      if (type === "updateCoupon") {
        // 成功领取优惠券
        this.triggerEvent("pageEvent", {
          type: type,
          data: data,
        });
      } else if (type === "storeCouponToLogin") {
        // 优惠券去登录
        this.setData({
          isAlreadyLogin: true,
        });
      }
    },
    // 关闭弹层
    hidePop() {
      this.setData({
        showPop: false,
      });
      // this.triggerEvent("popClickEvent",{});
    },
    catchtouchmove() {
      return false;
    },
  },
});
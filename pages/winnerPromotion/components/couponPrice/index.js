
Component({
  properties: {
    initData: {
      type: Object,
      value: {},
      observer: function (val) {
      },
    },
    majorPrice: {
      type: Object,
      value: {},
    },
    minorPrice: {
      type: Object,
      value: {},
    },
    toHandPrice: {
      type: Object,
      value: {},
      observer: function (val) {
      },
    },
    majorPriceFz: {
      // 主价格字号
      type: String,
      value: "36rpx",
    },
    majorPriceWhFz: {
      // 称重商品字号
      type: String,
      value: "24rpx",
    },
    minorPriceFz: {
      // 次要价格字号
      type: String,
      value: "24rpx",
    },
    intervalPrice: {
      //是否有起参数
      type: Boolean,
      value: false,
    },
    showSaledPrice: {
      //是否展示券后价
      type: Boolean,
      value: true,
    },
    isBottom: {
      //是否底对齐
      type: Boolean,
      value: false,
    },
    isShortHandPrice: {
      // 是否用短的到手价
      type: Boolean,
      value: false
    }
  },
  data: {
    visible: false,
  },
  methods: {
    handleMask() {
      if (this.data.initData.explainIcon && this.data.initData.explainText) {
        this.setData({
          visible: !this.data.visible,
        });
      }
    },
  },
})

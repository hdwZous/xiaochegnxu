import { clickBuriedV2_ } from "../../common/util/BI.js";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initData: {
      type: Object,
      value: {},
      observer: function () {
        //  console.log('val02',val)
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
      value: null,
      observer: function () {
        //  console.log('toHandPrice',val)
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
    majorPriceFamily: {
      // 主要价格字体
      type: String,
      value: "regular",
    },
    // 主要价格右间距
    majorPriceMr: {
      // 主价格字号
      type: String,
      value: "0",
    },
    minorPriceFz: {
      // 次要价格字号
      type: String,
      value: "24rpx",
    },
    minorPriceFamily: {
      // 次要价格字体
      type: String,
      value: "light",
    },
    // 次要价格右间距
    minorPriceMr: {
      // 主价格字号
      type: String,
      value: "0",
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
      value: false,
    },
    iconWidth: {
      type: String,
      value: "78rpx",
    },
    iconHeight: {
      type: String,
      value: "24rpx",
    },
    storeId: {
      type: String,
      value: "",
    },
    skuId: {
      type: String,
      value: "",
    },
    currentPageName: {
      type: String,
      value: "",
    },
    prePageName: {
      type: String,
      value: "",
    },
    pageId: {
      type: String,
      value: "",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleMask() {
      if (this.data.initData.explainIcon && this.data.initData.explainText) {
        if (!this.data.visible && this.data.initData.priceType == 7 && this.data.currentPageName) {
          clickBuriedV2_({
            click_id: "clickExplainIcon",
            click_par: {
              iconName: "券后价",
            },
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName,
            pageId: this.data.pageId,
          });
        }
        this.setData({
          visible: !this.data.visible,
        });
      }
    },
  },
});

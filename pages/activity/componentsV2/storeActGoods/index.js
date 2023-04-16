import { djCmsJump } from "../../../../common/util/agreementV2";
/**
 * 事件类型
 */
// let TYPE = {
//   // 显示详情
//   showGoodDetail: "showGoodDetail",
//   // 添加
//   add: "add",
//   // 减少com
//   min: "min",
// };
Component({
  lazyObj: {
    epSelector: '.activity_comp_ep',
    componentName: 'storeactgoods'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 商品列表数据
    goodList: {
      type: Object,
      value: {},
      observer: function (newVal) {
        if (newVal.length > 0) {
          this.setData({
            goodList: newVal,
          });
        }
      },
    },
    //排列方式
    styleTpl: {
      type: String,
      value: "",
      observer: function (newVal) {
        if (newVal) {
          this.setData({
            styleTpl: newVal,
          });
        }
      },
    },
    // 门店信息
    storeInfo: {
      type: Object,
      value: {},
      observer: function (newVal) {
        if (newVal) {
          this.setData({
            storeInfo: newVal,
          });
        }
      },
    },
    screenWidth: {
      type: Number,
      value: "",
      observer: function (newVal) {
        if (newVal) {
          this.setData({
            screenWidth: newVal,
          });
        }
      },
    },
    biPageName: {
      type: String,
      value: ''
    },
    biActivityId: {
      type: String,
      value: ''
    },
    traceId: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    goodList: {},
    storeInfo: {},
    cartInfo: {},
    styleTpl: {},
    storeId: "",
    orgCode: "",
    screenWidth: 0,
  },
  attached() {
    let screenWidth = wx.getSystemInfoSync().windowWidth;
    this.setData({
      screenWidth,
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //监听数量加减按钮 透传给父级
    onAddMinControllerChange(e) {
      this.triggerEvent("onAddMinControllerChange", e.detail, {
        composed: true,
        bubbles: true,
      });
    },
    // 去商品详情
    showGoodDetail(e) {
      let data = e.currentTarget.dataset;
      // 如果是跳转h5,但是没下发url则不跳转
      if (data.to == 'web' && (!data.params || !data.params.url)) return
      // 跳转协议
      djCmsJump({
        to: data.to,
        params: data.params,
        userAction: data.userAction,
        preObj: this.data.recommendObj,
        buried_position: "active-storeActGoods"
      });
    },
  },
});

import utils from '../../common/util/util'
Component({
  /**
     * 组件的属性列表
     */
  properties: {
    // 页面类型
    type: {
      type: Number,
      value: 0,
      observer: function (newVal) {
        let type = newVal || 0;
        this.setSrc(type);
      },
    },
    // 按钮类型
    btnType: {
      type: String,
      value: "",
    },
    // 按钮文案
    btnText: {
      type: String,
      value: "",
    },
    // 提示文案
    tips: {
      type: String,
      value: "",
    },
    subtips: {
      type: String,
      value: "",
    },
    height: {
      type: Boolean,
      value: false,
    },
    fromsource: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    }
  },

  /**
     * 组件的初始数据
     */
  data: {
    type: 0,
    src: "https://storage.360buyimg.com/wximg/common/loading.gif",
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      // // 埋点
      // this.data.tips &&
      //     clickBuried_({
      //         create_time: new Date(),
      //         click_id: "defaultPage",
      //         click_par: {},
      //     });
    },
  },

  /**
     * 组件的方法列表
     */
  methods: {
    // 点击按钮事件
    dealDefault(e) {
      // 事件类型
      let type = this.data.type;
      let data = {};
      if (this.data.btnType) {
        data = e.detail;
      }
      this.triggerEvent("defaultBtnEvent", {
        type: type,
        data: data,
      });
    },
    // 设置默认展示图
    setSrc(type) {
      let src = "";
      switch (type) {
      case 0: //默认加载中
        src = "https://storage.360buyimg.com/wximg/common/loading.gif";
        break;
      case 1: //没有网络
      src = "/images/common_errorbar_icon_nonetworkV1.png";
        break;
      case 2: //未登录
        src = "https://storage.360buyimg.com/wximg/common/errorbar_icon_no_loginV2.png";
        break;
      case 3: //当前位置无服务
        src = "https://storage.360buyimg.com/wximg/common/errorbar_icon_noshopV1.png";
        break;
      case 4: //接口未返回数据
        src = "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png";
        break;
      case 5: //无砍价数据||无收货地址
        src = "https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png";
        break;
      case 6: //店铺已下线
        src =  "https://storage.360buyimg.com/wximg/common/errorOfflineV1.png";
        break;
      case 7: //购物车暂无商品
        src =  "https://storage.360buyimg.com/wximg/common/errorbar_icon_emptyCartV1.png";
        break;
      case 8: //暂无订单
        src =  "https://storage.360buyimg.com/wximg/common/errorbar_icon_noorder_evaluationV1.png";
        break;
      case 9: //暂无评价
        src =  "https://storage.360buyimg.com/wximg/common/errorbar_icon_noorder_evaluationV1.png";
        break;
      case 10: //暂无优惠券
        src =  "https://storage.360buyimg.com/wximg/common/errorbar_icon_nocouponV1.png";
        break;
      case 11: //门店闭店
        src =  "https://storage.360buyimg.com/wximg/common/errorbar_icon_noclosedV1.png";
        break;
      default:
        src =  "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png";
        break;
      }
      this.setData({
        src,
        type,
      });
    },
    // 去地址页
    goToAddress() {
      if (utils.isLogin()) {
        wx.navigateTo({
          url: '/pages/address/home/index?from=default',
          preObj: this.data.buriedObj
        })
      } else {
        wx.navigateTo({
          url: '/pages/address/search/index?from=default',
          preObj: this.data.buriedObj
        })
      }
    },
  },
});

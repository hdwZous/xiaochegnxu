import {
  requestPay
} from "../../../common/util/PayTools"
import { pvBuriedV2_, clickBuriedV2_ } from '../../../common/util/BI';

// var self
// var app = getApp()
var enumPayType = {
  BUY_MEMBER_CARD: 1,
  RENUEW_MEMBER_CARD: 2,
  APPLY_FREE_MEMBER: 3,
  BIND_MEMBER_CARD: 4,
}
Page({
  data: {
    orderId: "",
    orderPrice: "",
    payType: null,
    //支付状态
    payStatus: "支付中",
    //付款参数
    payParams: null,

    //上次成功付款的支付参数
    lastSuccessPayParams: null,
    //是否已经在支付流程中
    paying: false,
    /**是否已经支付失败过
     * 注意:有这个标志位是因为,
     *在Android中如果已经弹出输密码支付对话框,
     *按home键退到桌面，再进去时会先调用支付失
     *败的回调（handlePayFail 这将会把 paying
     *置回false,在ios中并不会调用支付失败的回调)
     *,虽然此时已经回到了上级页面，但，任然回调用
     *onShow方法(导致在上级页面弹出支付框)
     **/
    payFaill: false,

    source: '', // 是从哪个楼层跳转到会员中心的，门店首页会员楼层以及门店优惠券弹层在支付后回到门店需要刷新楼层
    backReload: '' // 用于单品页面，是从那个楼层跳转到会员h5信息收集页面，从h5返回到页面需要刷新
  },

  /**
   * 生命周期函数--监听页面加载
   *
   */
  onLoad: function (options) {
    let params = {
      appid: options.appid,
      timestamp: options.timestamp,
      noncestr: options.noncestr,
      prepayid: options.prepayid,
      signType: options.signType,
      sign: options.sign,
    };
    // debugger
    this.setData({
      payType: options.payType,
      payParams: params,
      source: options.source || '',
      backReload: options.backReload || ''
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
    if (this.data.paying || this.data.payFaill) {
      return;
    }
    let navigationBarTitle = "购买会员";
    if (this.data.payType == enumPayType.RENUEW_MEMBER_CARD) {
      navigationBarTitle = "会员续费";
    } else if (this.data.payType == enumPayType.BIND_MEMBER_CARD) {
      navigationBarTitle = "会员卡绑定";
    }
    wx.setNavigationBarTitle({
      title: navigationBarTitle,
    });
    if (this.data.payType == enumPayType.APPLY_FREE_MEMBER) {
      this.setData({
        payStatus: "购买成功",
      });
      return;
    }
    if (this.data.payType == enumPayType.BIND_MEMBER_CARD) {
      this.setData({
        payStatus: "绑定成功",
      });
      return;
    }
    if (
      this.data.lastSuccessPayParams &&
      this.data.payParams &&
      this.data.lastSuccessPayParams.prepayid == this.data.payParams.prepayid
    ) {
      return;
    }
    this.setData({
      paying: true,
    });
    requestPay(this.data.payParams, this.handlePaySuccess, this.handlePayFail);

    
  },

  pvFunc(back) {
    let {orderId = '', recommendObj = {}} = this.data;
    pvBuriedV2_({
      page_par: {
        orderId: orderId,
        ref_par: {
          traceId: recommendObj.preTraceId || "",
          userAction: recommendObj.preUserAction || "",
        }
      },
      pageId: recommendObj.pageIdFirstPage || "",
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      'isBack': back || ''
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  onHide: function () {},

  onUnload: function () {},

  //支付成功的回调
  handlePaySuccess: function (msg, payParams) {
    let _this = this;
    this.setData({
      paying: false,
      payStatus:
        _this.data.payType == enumPayType.RENUEW_MEMBER_CARD
          ? "续费成功"
          : "购买成功",
      lastSuccessPayParams: payParams,
    });
  },

  //支付失败的回调
  handlePayFail: function () {
    let _this = this;
    this.setData({
      paying: false,
      payStatus:
        _this.data.payType == enumPayType.RENUEW_MEMBER_CARD
          ? "续费失败"
          : "购买失败",
      payFaill: true,
    });
    wx.navigateBack();
  },

  //去首页
  goStore: function () {
    // 如果是门店首页会员楼层
    if (this.data.source == "storemember") {
      wx.setStorageSync("businessSource", "storemember");
    }
    // 如果是门店头商家会员
    if (this.data.source == "storememberbar") {
      wx.setStorageSync("businessSource", "storememberbar");
    }

    // 如果单品页面
    if (this.data.source == "newproductDetail" || this.data.backReload == 1) {
      wx.setStorageSync("businessSource", "newproductDetail");
    }

    // 如果是门店优惠券弹层的商家券楼层
    if (this.data.source == "storecoupon" || this.data.backReload == 1) {
      wx.setStorageSync("businessSource", "storecoupon");
    }
    wx.navigateBack({
      delta: 2,
    });

    clickBuriedV2_({
      create_time: new Date(),
      click_id: "to_shop",
      click_par: {},
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
  },
});
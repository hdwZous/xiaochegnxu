
import { request, FNIDS, onCaptureScreen, offCaptureScreen } from '../../../../common/util/api';
import { pvBuriedV2_, clickBuriedV2_ } from "../../../../common/util/BI";
let app = getApp()
Page({
  buried: {
    encodeOrderId: "空",
    channel: "空",



  },
  /**
   * 页面的初始数据
   */
  data: {
    isIPX: app.globalData.isIpx,
    showEmpty: true,
    type: 0,// 列表-类型
    tips: "",// 列表-提示
    btnText: "", // 列表-按钮
    orderId: '', // 订单id  1100001096572491
    orderInfo: {}, // 订单信息
    shareToken: '', // 分享出来的加密字符串

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().globalData.qrcode.business = options.business
    this.buried.encodeOrderId = options.shareToken;
    this.buried.channel = options.business;
   
    
    this.setData({
      shareToken: options.shareToken
    }, () => {
      this.initData()
    })


  },
  onShow: function () {
    let {
      orderId
    } = this.data.orderInfo
    // 开启监听截图
    onCaptureScreen({
      orderId
    }, this.data.recommendObj);

  },
  onHide() {
    offCaptureScreen();
  },
  pvFunc(back) {
    let {encodeOrderId = '',channel = '', recommendObj = {}} = this.data;
    pvBuriedV2_({
      page_par: {
        encodeOrderId: encodeOrderId,
        channel: channel,
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
  initData: function () {
    let {recommendObj={}} = this.data;
    request({
      ...FNIDS.orderInfo,
      body: {
        // "orderId":this.data.orderId,
        shareToken: this.data.shareToken
      },
      pageId: recommendObj.pageIdFirstPage || '',
      preObj: recommendObj
    }).then(res => {
      if (res.data && res.data.code == 0 && res.data.result) {
        this.setData({
          showEmpty: false,
          orderInfo: res.data.result,
          orderId: res.data.result.orderId
        })
      } else {
        this.setData({
          showEmpty: true,
          type: 1,
          tips: res.data && res.data.msg,
          btnText: "重新加载",
        })
      }
    }).catch(err => {
      this.setData({
        showEmpty: true,
        type: 1,
        tips: err.data && err.data.msg,
        btnText: "重新加载",
      })
    })
  },
  // 前往订单状态页面
  handleGotoOrderStatusPage() {
    let { recommendObj = {} } = this.data;
    wx.navigateTo({
      url: `/pages/order/orderstatus/index?shareToken=${this.data.shareToken}&orderId=${this.data.orderId}`,
      preObj: recommendObj,
      buried_postion: "order-shareOrder"
    });
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'click_order_state',
      click_par: {},
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
  },
  //监听默认按钮点击
  onDefaultBtnEvent(e) {
    let type = e.detail.type
    if (type === 1) {
      this.setData({
        type: 0,
        showEmpty: true
      })
      this.initData()
    }
  },
  handleFooterClick: function () {
    let { recommendObj = {} } = this.data;
    wx.switchTab({
      url: `/pages/home/home`,
      preObj: recommendObj,
      buried_postion: "order-shareOrder2"
    })

    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'click_batton',
      click_par: {},
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
  },
  // 中间号弹窗
  showMiddleModal() {
    this.setData({
      isShowMiddleModal: true
    })
    // 埋点
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'showLayer',
      click_par: {
        type: 'rideNormalProtect',
        orderId: this.data.orderId,
        storeId: this.data.orderInfo.storeId
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
  },
  closeModal() {
    this.setData({
      isShowMiddleModal: false
    })
  },

})
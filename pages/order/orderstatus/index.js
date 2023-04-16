import { request, FNIDS } from "../../../common/util/api"
import orderPublic from "../../../common/util/public.js"
import { djCmsJump } from '../../../common/util/agreementV2';
import { pvBuriedV2_, clickBuriedV2_ } from '../../../common/util/BI';
import { addFilterMsg, error } from '../../../common/util/wxLog'; 
import util from "../../../common/util/util";
var orderId = null
var This = null
var app = getApp()

const domain='https://static-o2o.360buyimg.com/activity/images/fe/';
const iconStateObj = {
  "1": {
    selected_icon: `${domain}orderlist_stateIcon1.png`,
    icon: `${domain}orderlist_stateIcon_1.png`
  },
  "2": {
    selected_icon: `${domain}orderlist_stateIcon2.png`,
    icon: `${domain}orderlist_stateIcon_2.png`
  },
  "3": {
    selected_icon: `${domain}orderlist_stateIcon3.png`,
    icon: `${domain}orderlist_stateIcon_3.png`
  },
  "4": {
    selected_icon: `${domain}orderlist_stateIcon4.png`,
    icon: `${domain}orderlist_stateIcon_4.png`
  },
  "5": {
    selected_icon: `${domain}orderlist_stateIcon5.png`,
    icon: `${domain}orderlist_stateIcon_6.png`
  },
  "6": {
    selected_icon: `${domain}orderlist_stateIcon6.png`,
    icon: `${domain}orderlist_stateIcon_6.png`
  },
  "7": {
    selected_icon: `${domain}orderlist_stateIcon7.png`,
    icon: `${domain}orderlist_stateIcon_7.png`
  },
  "8": {
    selected_icon: `${domain}orderlist_stateIcon8.png`,
    icon: `${domain}orderlist_stateIcon_8.png`
  }

}
Page({
  buried: {
    order_id: "空",
    step_name: "空",
    orderId: ""
  },
  data: {
    isIPX: app.globalData.isIpx,
    orderState: null,
    isShowMiddleModal: false,
    orderId: "",
    iconStateObj
  },
  onLoad(options) {
    this.buried.orderId = options.orderId
    This = this
    orderId = options.orderId
    // this.data.orderId = orderId
    this.setData({
      orderId,
      shareToken: options.shareToken
    })
    // this.data.shareToken = options.shareToken  // 订单分享的加密字符串
    // 请求接口
    This.requestData()
  },
  goback: function () {
    wx.navigateBack({

    })
  },
  onShareAppMessage: function () {
    var shareUtil = require("../../../common/util/share_utils.js")
    var url = shareUtil.getShareUrl()

    return {
      title: "京东到家",
      path: url
    }
  },
  onReady() { },
  onShow: function () {
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
      currentPageName: recommendObj.currentPageName,
      prePageName: recommendObj.prePageName,
      'isBack': back || ''
    })
  },
  calling(e) {
    var data = e.target.dataset;
    let order_id = this.data.orderId;
    let step_name = data.stateTitle;
    if (data.middle == 1) {
      this.showMiddleModal();
      return;
    }

    wx.makePhoneCall({
      phoneNumber: e.target.id,
      success: function () {

      },
      fail: function () {

      }
    })
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "click_msg_phone",
      click_par: {
        order_id,
        step_name
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
  },
  deleteOrder: orderPublic.deleteOrder,
  cancelOrder: orderPublic.cancelOrder,
  // 无使用
  gotopay(e) {
    orderPublic.gotopay(e, function () {
      This.requestData()
    })
  },
  requestData() {
    request({
      ...FNIDS.orderState,
      body: {
        orderId: orderId,
        shareToken: this.data.shareToken
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {}
    }).then(res => {
      if (res.data.result) {
        This.setData({
          orderState: res.data.result
        })
      } else {
        wx.reportMonitor(40, 20);
      }
    }).catch((err) => {
      wx.reportMonitor(40, 20);
      let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
      let errInfo = err && err.toString();
      let deviceid_pdj_jd = util.getUUIDMD5();
      addFilterMsg(deviceid_pdj_jd)
      addFilterMsg('orderStateFn');
      addFilterMsg(PDJ_H5_PIN)
      error(errInfo)
    })
  },

  rewardDeliveryman(e) {
    let url = e.currentTarget.dataset.url;
    let { recommendObj = {} } = this.data;
    // 跳转H5
    wx.navigateTo({
      url: '/pages/h5/index?needToken=1&url=' + encodeURIComponent(url),
      preObj: recommendObj,
      buried_postion: "order-orderstatus2"
    })
  },
  jumpHandler(e) {
    const { orderId, orderState: { storeId } = {}, recommendObj = {} } = this.data
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "clickWrite",
      click_par: {
        orderId,
        storeId,
        type: 'page'
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
    const { to = '', params = {} } = e.currentTarget.dataset;
    if (to) {
      djCmsJump({
        to,
        params,
        preObj: recommendObj,
        buried_postion: "order-orderstatus"
      })
    }
  },
  // 中间号弹窗
  showMiddleModal() {
    this.setData({
      isShowMiddleModal: true
    })
    // 埋点
    let {orderId = '', orderState = {}, recommendObj = {}} = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'showLayer',
      click_par: {
        type: 'rideNormalProtect',
        orderId: orderId,
        storeId: orderState.storeId || ''
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
  },
  closeModal() {
    this.setData({
      isShowMiddleModal: false
    })
  }
})
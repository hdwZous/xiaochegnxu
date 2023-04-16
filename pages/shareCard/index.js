// pages/shareCard//index.js
import {
  request,
  FNIDS
} from '../../common/util/api'

import {
} from "../../common/util/BI";

let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareInfo: {
      title: "京东到家",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let [qrCodeId, activityId] = decodeURIComponent(options.scene).split(",")
    let key = qrCodeId || options.scene || options.dj_par_key || ""
    if (key) {
      this.getCodeInfo(decodeURIComponent(key))
        .then(res => {
          this.handleCodeInfo(res)
        })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let { shareInfo } = this.data
    return shareInfo
  },
  //根据二维码id获取参数
  getCodeInfo(key) {
    return request({
      ...FNIDS.getQrCode,
      isNeedDealError: true,
      body: {
        qrCodeId: key
      }
    })
  },

  handleCodeInfo(res) {
    if (res && res.data.code == 0) {
      let codeInfo = res.data.result || {}
      let path = null
      if (codeInfo.type == 98 || codeInfo.type == 110) {
        path = `/pages/takeCoupon-t/index?qrCodeId=${codeInfo.qrCodeId}&activityId=${codeInfo.couponActivityId}&business=${codeInfo.business}`;
      } else {
        path =
          `/pages/home/home?scene=${codeInfo.dj_par_key}` || "/pages/home/home";
      }
      let shareInfo = {
        title: codeInfo.shareTitle || "京东到家",
        imageUrl: codeInfo.shareImgUrl || "",
        path
      }
      this.setData({
        shareInfo,
        codeInfo
      })
    }
  },

  scanCode() {
    wx.scanCode({
      success(res) {
        console.log(res)
        wx.showModal({
          content: JSON.stringify(res)
        })
      }
    })
  }
})
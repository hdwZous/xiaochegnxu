// pages/settlement/remarkDialog/remarkPage.js
var app = getApp()
import { pvBuriedV2_, clickBuriedV2_ } from "../../../common/util/BI"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isIPX: app.globalData.isIpx,
    remarkContent: "",

  },

  onRemarkCompleted: function (e) {
    app.globalData.settlement.remark = this.data.remarkContent
    this.goback()
    clickBuriedV2_({
      click_id: 'FinishNote',
      pageId: this.data.recommendObj.pageIdFirstPage || '',
      currentPageName: this.data.recommendObj.currentPageName || '',
      prePageName: this.data.recommendObj.prePageName || ''
    })
  },

  onRemarkInput: function (e) {
    this.data.remarkContent = e.detail.value
  },

  // 阻止对话框事件穿透
  preventD: function () { },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      remarkContent: app.globalData.settlement.remark,
    })
  },
  pvFunc(back){
    pvBuriedV2_({
      pageId: this.data.recommendObj.pageIdFirstPage || '',
      currentPageName: this.data.recommendObj.currentPageName || '',
      prePageName: this.data.recommendObj.prePageName || '',
      isBack: back || "",
    })
  },

  goback: function () {
    wx.navigateBack({})
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

  }
})
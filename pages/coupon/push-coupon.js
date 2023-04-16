// pages/coupon/push-coupon.js
let app = getApp();
var self = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIPX: app.globalData.isIpx,
    voucherList: [],
    hasNextPage: false,
    pageNo: 0,
    isEmpty: false,
    tip: '',
    orgcode: '',
    storeid:'',
    voucherCode:'',//右上角标
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    if (options.orgCode) {
      self.data.orgcode = options.orgCode
    }
    if (options.storeId) {
      self.data.storeid = options.storeId
    }
  },
  goback: function () {
    wx.navigateBack({

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (app.globalData.pushcodes) {
      self.setData({
        tip: '优惠券已放至绑定手机' + app.globalData.pushcodes.phone + '的账户',
        voucherList: app.globalData.pushcodes.codes,
        orgcode: app.globalData.pushcodes.orgcode,
      })
    }
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
    var shareUtil = require('../../common/util/share_utils.js')
    var url = shareUtil.getShareUrl();

    return {
      title: '京东到家',
      path: url
    }
  },
  selectCouponHandle(event) {

  },
  toUse: function () {
    goHome()
  }
})

function goHome() {

  // if (self.data.orgcode) {
    // app.needLoad = true;
    // wx.navigateBack({
    //   delta: 2
    // })
  // } else {
  //   wx.redirectTo({
  //     url: '../store-list/store-list'
  //   })
  // }
  let { recommendObj = {} } = this.data;
  wx.redirectTo({
    url: '../store/index?storeId=' + self.data.storeid + "&orgCode=" + self.data.orgcode + '&longitude=' + app.globalData.addressInfo.longitude + '&latitude=' + app.globalData.addressInfo.latitude,
    preObj: recommendObj
  })
}
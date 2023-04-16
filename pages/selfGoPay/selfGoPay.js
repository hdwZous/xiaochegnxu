// pages/selfGoPay/selfGoPay.js
// 登录信息
import {
  isLogin
} from '../../common/util/loginUtil'
var plugin = requirePlugin("easyGoPlugin")
var app = getApp()
// import config from "../../common/util/config"
let globalData = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeId: 0,
    orgCode: "",
    deviceNo: "",
    rType: 0,

    //是否登录
    isLogin: false,
    login_info: {},
    paySuccess: false,
    pageHide: false,
    refresh: true,
    weixinCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    plugin.setPluginEnv(globalData.config.HOST);
    this.setData({
      storeId: options.storeid,
      orgCode: options.orgcode,
      deviceNo: options.deviceNo,
      rType: options.type,
      visitorFlag: options.y
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var tlogin = isLogin();
    if (tlogin) {
      this.setData({
        isLogin: true,
        login_info: wx.getStorageSync('login_info'),
        'login_info.jdlogin_pt_key': wx.getStorageSync('jdlogin_pt_key'),
        'login_info.uuId': wx.getStorageSync('uuId'),
      })
    } else {
      this.setData({
        isLogin: false,
      })
    }

    this.setData({
      maxLimitTime: 120,
      refresh: !this.data.refresh
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      pageHide: !this.data.pageHide
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.setData({
      pageHide: !this.data.pageHide
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  pluginEvent(e) {
    let type = e.detail.type;
    let data = e.detail.data;
    //去首页
    if (type === 'easyGoHomePage') {
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
    //去支付
    if (type === 'easyGoToPay') {
      this.gotoPay(data);
    }
    //去登录
    if (type === 'easyGoToLogin') {

      wx.navigateTo({
          url: `/pages/newLogin/login/login`
      })
    }
    //获取wxLogin
    if (type === 'getWXLoginCode') {
      wx.showLoading({
        title: '加载中..',
      })
      var that = this
        // todo
      wx.login({
        success: function (res) {
          if (res.code) {
            console.log("wxLoginCode" + res.code)
            that.setData({
              weixinCode: res.code
            });
              wx.setStorageSync('JDHasUseLogin', true);
            wx.setStorageSync('code', res.code);
          }
        },
        fail: function (res) {
          wx.hideLoading();
        }
      })
    }
    //点击领取优惠券，跳转到首页
    if (type === 'getNewUserCoupon')
     {
      app.globalData.qrcode.business = "116"
      wx.switchTab({
        url: '/pages/home/home',
      })
     }
     //去门店
    if (type === 'selfGoPayToStore')
    {
      //跳转到对应的秒杀品携带skuId
      if (data && data.jumpType && (data.jumpType == 1 || data.jumpType == 2) && data.secondKillInfo && data.secondKillInfo.skuId)
      {
        if (this.data.storeId && this.data.orgCode) {
          app.globalData.jumpType = "p20";
          app.globalData.jumpParams = {
            storeId: this.data.storeId || "",
            orgCode: this.data.orgCode || "",
            skuId: data.secondKillInfo.skuId
          };
        }
        app.globalData.qrcode.business = "116"
        wx.switchTab({
          url: '/pages/home/home'
        })
      }
      //正常跳转到门店
      else
      {
        if (this.data.storeId && this.data.orgCode) {
          app.globalData.jumpType = "p20";
          app.globalData.jumpParams = {
            storeId: this.data.storeId || "",
            orgCode: this.data.orgCode || ""
                      };
        }
        app.globalData.qrcode.business = "116"
        wx.switchTab({
          url: '/pages/home/home'
        })
      }
    }
    //去首页
    if (type === 'selfGoPayToHome')
    {
      app.globalData.qrcode.business = "116"
      wx.switchTab({
        url: '/pages/home/home',
      })
    }
  },

  // 去收银台
  gotoPay: function(data) {
    var that = this;
    let paytools = require('../../common/util/PayTools')
    paytools.requestSignEasyGo(data.responseObj,
      function () {
        that.setData({
          paySuccess: true,
        });
      },
      function () {
        that.setData({
          paySuccess: false,
        });
      })
  }
})

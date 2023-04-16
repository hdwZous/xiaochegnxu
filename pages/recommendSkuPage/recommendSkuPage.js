import {
  request,
  FNIDS
} from '../../common/util/api'
// 埋点描述文件
import { pvBuriedV2_ } from "../../common/util/BI";
const app = getApp()
const TITLE_HEIGHT = 88;
const TAB_HEIGHT = 78;
const DEFAULT_TOP = 176;
Page({
  // 埋点描述文件
  buried: {
    channelId: "",
    tagId: "",
    floorId: "",
    traceId: '',
    userAction: ''
  },
  /**
   * 页面的初始数据
   */
  data: {
    netError: false,
    isIpx: false,
    skuList: [],
    classifications: [],
    statusBarHeight: 88,
    paddingTop: 176,
    traceId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.buried.channelId = options.channelId;
    this.buried.traceId = options.traceId;
    this.buried.userAction = options.userAction;
    this.buried.tagId = options.tagId;
    this.buried.floorId = options.floorId;
    const { statusBarHeight = 0 } = wx.getSystemInfoSync()
    this.setData({
      ...options,
      statusBarHeight: statusBarHeight * 2,
      paddingTop: statusBarHeight * 2 + TITLE_HEIGHT,
      title: decodeURIComponent(options.title)
    })
    if (options.userAction) {
      this.setData({
        userAction: decodeURIComponent(options.userAction)
      })
    }
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.setData({
      isIpx: app.globalData.isIpx
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getSkuList()
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

  onTabClick(e) {
    const { activeTab } = e.detail;
    this.setData({
      tagId: activeTab
    })
    wx.pageScrollTo({
      scrollTop: 0,
    });
    setTimeout(() => {
      this.getSkuList()
    }, 0)
  },

  // 获取推荐商品信息
  getSkuList() {
    const addressInfo = wx.getStorageSync('address_info') || {};
    const { longitude = '', latitude = '', cityId = '', cityName = '' } = addressInfo;
    const { tagId, tagIds, title, channelId, floorId } = this.data;
    const query = {
      city: cityName,
      areaCode: cityId,
      longitude,
      latitude,
      coordType: 2,
      channelId,
      tagId,
      tagIds,
      floorId,
      title,
      refPageSource: 'newChannelPage',
      pageSource: 'ChannelRecGoods',
      from: 'channel',
      ref: 'channel',
      ctp: "ChannelRecGoods",
      ref_par: {
        userAction: this.buried.userAction || "",
      }
    }
    let failMsg = ''
    wx.showLoading({
      title: '加载中...',
    })
    request({
      functionId: FNIDS.channelRecommendSkus.functionId,
      appVersion: FNIDS.channelRecommendSkus.appVersion,
      body: query,
      content: {
        platform: 6
      },
      method: 'POST',
      pageId: this.data.recommendObj.pageIdFirstPage,
      preObj: this.data.recommendObj
    }).then(res => {
      wx.hideLoading()
      if (res && res.data) {
        const { result = {}, code, traceId } = res.data;
        if (code == 0) {
          const {
            data = [],
            upHalfBgPic = '',
            downHalfBgPic = '',
            tagId = '',
            classifications = []
          } = result;
          let paddingTop = DEFAULT_TOP
          if (classifications.length) {
            paddingTop = TAB_HEIGHT + DEFAULT_TOP
          }
          this.setData({
            skuList: data,
            tabList: classifications,
            upHalfBgPic,
            downHalfBgPic,
            paddingTop,
            tagId,
            traceId,
            netError: false
          })
          return
        }
        this.setData({
          netError: true
        })
        failMsg = err.data && err.data.msg || '';
      } else {
        failMsg = '网络异常'
        this.setData({
          netError: true
        })
      }
    }).catch(err => {
      wx.hideLoading()
      failMsg = err.data && err.data.msg || '';
      this.setData({
        netError: true
      })
    })
  },
  pvFunc(back) {
    this.buried.channelId = this.data.channelId
    pvBuriedV2_({
      page_par: {
        channelId: this.buried.channelId,
        tagId: this.buried.tagId,
        floorId: this.buried.floorId,
        ref_par: {
          traceId: this.buried.traceId || "",
          userAction: this.buried.userAction || "",
        }
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName,
      isBack: back || "",
    })
  },
})

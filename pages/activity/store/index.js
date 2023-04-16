import { request, FNIDS } from "../../../common/util/api"
// import {
//   getAbTestService
// } from "../../../common/util/services";
import mp from "../../../common/util/wxapi";
// import util from "../../../common/util/util";
// import config from "../../../common/util/config";
// let app = getApp();
let globalData = getApp().globalData;
let roomId = ''
// 埋点描述文件
// import { Exposure } from '../../../common/util/exposure';
import { pvBuriedV2_, clickBuriedV2_ } from "../../../common/util/BI";
var self;
var movTime = null; 
Page({
  // 埋点描述文件
  buried: {
    roomId: '',
    activityId: '',
    storeId: '',
    skuId: '',
    childPageName: '',
  },

  data: {
    // ab名称
    strategyName: '',
    addressInfo: {},
    activityData: [],
    floorStyle: {},
    // 商品数据
    goodInfo: {},
    // 删除全部商品
    clearAllGoods: false,
    showDefault: false,
    storeInfo: {},
    // 加减购物车ID
    cartSkuId: "",
    // 加减车类型
    cartType: "",
    refreshMiniCartData: false,
    // 商品详情参数
    initProductdetail: false,
    checkedSkuId: "",
    initProductNum: "",
    // 滑动
    scrollY: true,
    // 小球状态
    ballX: 0,
    ballY: 0,
    showBall: false,
    catAnimation: true,
    // 默认提示文案
    tips: "网络开小差，请稍后再试哦~",
    // 默认页-图标
    src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png",
    pageConfig: '',
    // 返回顶部icon
    hideBackTop: true,
    // 是否最后一页
    lastPage: false,
    //同步更新页面数据
    upDateGoods: {},
    pageMoving: false,
    isIphoneX: globalData.isIphoneX,
    traceId: '',
    self_page: 'storeactivity'
  },

  // 自定义数据
  scopeData: {
    currentPage: 1,
    // 曝光埋点对象
    exposureObj: null,
    // 助力券分享信息
    helpCouponShareMsg: {},
  },

  onLoad: function (options) {
    this.refresh(options)
  },
  initIsCartInItem: function () { },

  onShow: function () {
    this.buried.activityId = self.data.storeInfo.activityId || ""
    this.buried.storeId = self.data.storeInfo.storeId || ""
    this.buried.roomId = self.data.storeInfo.roomId || ""
    if (getApp().globalData.refreshHomeFlag) {
      getApp().globalData.refreshHomeFlag = false
      this.refresh(this.data.storeInfo)
    }
  },
  // 刷新页面
  refresh(options) {
    // 初始化数据
    this.setData({
      'activityData': [],
      'lastPage': false,
      'hideBackTop': true
    })
    this.scopeData.currentPage = 1
    // 屏蔽转发
    if (options.isBanShare == 1) {
      wx.hideShareMenu({
        menus: ['shareAppMessage', 'shareTimeline']
      })
    }

    self = this;
    if (options) {
      self.setData({
        storeInfo: options,
        addressInfo: wx.getStorageSync("address_info") || {}
      });
      roomId = options.roomId || options.roomid || options.room_id || ""
    }
    var res = wx.getSystemInfoSync();
    self.setData({
      screenHeight: res.windowHeight,
      screenWidth: res.windowWidth
    })
    this.getActPage()
  },
  pvFunc(back) {
    pvBuriedV2_({
      page_par: {
        activityId: self.data.storeInfo.activityId,
        roomId: self.data.storeInfo.roomId,
        storeId: self.data.storeInfo.storeId,
        ref_par: {
          traceId: this.data.recommendObj.preTraceId || "",
          userAction: this.data.recommendObj.preUserAction || "",
        }
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName,
      isBack: back || "",
    })
  },
  /**
    * 页面滑动
    */
  onPageScroll(e) {
    if (e.scrollTop > 300) {
      if (this.data.hideBackTop) {
        this.setData({
          hideBackTop: false
        })
      }
      if (e.scrollTop > 500) {
        this.showBackTop()
      }
    } else {
      if (!this.data.hideBackTop) {
        this.setData({
          hideBackTop: true
        })
      }
      this.hiddenBackTop()
    }
  },
  showBackTop() {
    // 页面不滑动、pageMoving为false
    if (!this.data.pageMoving) {
      this.setData({
        pageMoving: true
      })
    }
    this.hiddenBackTop()
  },
  hiddenBackTop()  {
    movTime && clearTimeout(movTime)
    movTime = setTimeout(() => {
      this.setData({
        pageMoving: false
      })
    }, 250)
  },

  // 点击返回顶部
  clickBackTop() {
    wx.pageScrollTo({
      scrollTop: 0
    });
    this.setData({
      hideBackTop: true
    })
  },
  onReachBottom() {
    if (!this.data.lastPage) {
      this.scopeData.currentPage += 1
      this.getActPage()
    }
  },
  getActPage: function () {
    mp.loading_cover()
    let { longitude, latitude } = this.data.addressInfo
    let { cityId, storeId, activityId } = this.data.storeInfo
    let { functionId, appVersion } = FNIDS.storeActivity
    request({
      functionId,
      appVersion,
      body: {
        areaCode: cityId,
        downgradeInfo: "",
        store_id: storeId,
        longitude: longitude,
        activityId: activityId,
        currentPage: this.scopeData.currentPage,
        latitude: latitude,
        pageSource: this.data.recommendObj.pageSource,
        refPageSource: this.data.recommendObj.refPageSource,
        ref_par: {
          traceId: this.data.recommendObj.preTraceId || "",
          userAction: this.data.recommendObj.preUserAction || "",
        }
      },
      method: 'POST',
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj
    }).then(res => {
      mp.hideLoading();
      if (res.data.code == "0") {
        if (res.data.result) {
          let { data, config, storeInfo } = res.data.result
          let { lists, pageConfig } = this.dealData(data, config, storeInfo)
          let setstr = `activityData[${this.scopeData.currentPage - 1}]`
          let lastPage = config.totalCount > config.currentPage * config.pageSize ? false : true
          self.setData({
            showDefault: false,
            [setstr]: lists,
            shareInfo: config.shareInfo,
            traceId: res.data.traceId,
            pageConfig,
            lastPage
          }, () => {
            setTimeout(() => {
              this.judgeDom()
            }, 300)
            this.judgeDom()
          });
          wx.setNavigationBarTitle({
            title: config.gloabTitle,
          })
        } else {
          if (this.scopeData.currentPage == 1) {
            self.setData({
              // 默认页-提示
              showDefault: true,
              type: 4,
              tips: "暂无活动哦～",
              btnText: "",
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1500,
              mask: false,
            });
          }
        }
      } else {
        self.setData({
          // 默认页-提示
          showDefault: true,
          type: 1,
          tips: res.data.msg,
          // 默认页-图标
          btnText: "重新加载",
        })
      }
    }).catch(() => {
      mp.hideLoading();
      this.setData({
        // 默认页-默认页展示
        showDefault: true,
        // 默认页-类型length
        type: 1,
        // 默认页-提示
        tips: '服务异常，请稍后再试~',
        // 默认页-按钮
        btnText: '重新加载',
      })
    })
  },
  dealData(datas, config, storeInfo) {
    if (datas.length) {
      datas.map(item => {
        if (item.floorStyle == 'product5' && !item.data[0].skuList) {
          let data = [{ storeId: item.data[0].storeId, skuList: [] }]
          item.data.forEach(lists => {
            data[0].skuList.push(lists.skuInfo)
          })
          item.data = data
        }
      })
    }
    let pageConfig = Object.assign({}, config, { storeInfo })
    return { lists: datas, pageConfig }
  },
  // 页面数据加载完之后，判断当前加载的数据是否铺满一屏，不够一屏继续请求接口
  judgeDom() {
    let that = this
    let refQuery = wx.createSelectorQuery();
    refQuery.select('.store-container').boundingClientRect(function (res) {
      let height = res && res.height || 0
      if (height < that.data.screenHeight && !that.data.lastPage) {
        that.scopeData.currentPage += 1
        that.getActPage()
      }
    }).exec()
  },
  // 默认页监听点击按钮
  onDefaultBtnEvent() {
    this.getActPage()
  },
  onPullDownRefresh: function () {
    self.getActPage()
  },
  // 监听好友助力分享信息
  onShareMsg(e) {
    let { chat = {} } = e.detail.data || {};
    this.scopeData.helpCouponShareMsg = chat
  },
  onShareAppMessage: function (e) {
    let currentCouponInfo = this.data.currentCouponInfo;
    let config = this.data.config && this.data.config.shareInfo || {};
    const { options: { activityId = '' } = {} } = this.data
    //debugger
    if (e.from == 'button') {
      if (e.target.dataset.from == "groupBuy") {
        this.shareBury(currentCouponInfo)
        this.setData({
          showShare2WxDialog: false
        })
        let shareInfo = this.data.shareInfo
        return {
          title: shareInfo.chat && shareInfo.chat.miniProgram && shareInfo.chat.miniProgram.title || "京东到家",
          imageUrl: shareInfo.chat.miniProgram.imageUrl || "",
          path: shareInfo.chat.miniProgram.miniProgram
        }
      } else if (e.target.dataset.from == 'helpCoupon') { // 好友助力
        let helpCouponShareMsg = this.scopeData.helpCouponShareMsg;
        return {
          title: helpCouponShareMsg.miniProgram && helpCouponShareMsg.miniProgram.title || "京东到家",
          imageUrl: helpCouponShareMsg.miniProgram.imageUrl || "",
          path: helpCouponShareMsg.miniProgram.miniProgram
        }
      } else {
        return {
          title: config.title || "京东到家",
          path: `/pages/home/home?type=18&activityId=${this.data.storeInfo.activityId}&storeId=${this.data.storeInfo.storeId}`
        }
      }
    } else {
      return {
        title: config.title || "京东到家",
        path: `/pages/home/home?type=18&activityId=${this.data.storeInfo.activityId}&storeId=${this.data.storeInfo.storeId}`
      }
    }
  },
  // 商品跳转详情埋点
  goodBury(data) {
    this.buried.storeId = data.storeId
    this.buried.skuId = data.skuId
    this.buried.childPageName = 'goodsinfo'
    this.buried.activityId = self.data.storeInfo.activityId || ""
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "click_sku",
      click_par: {
        activityId: self.data.storeInfo.activityId || '',
        childPageName: 'goodsinfo',
        skuId: data.skuId,
        storeId: data.storeId
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    });
  },
  // 购物车加车埋点
  carAddBury(data) {
    this.buried.storeId = self.data.storeInfo.storeId
    this.buried.skuId = data.skuId
    this.buried.activityId = self.data.storeInfo.activityId || ""
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "click_add",
      click_par: {
        activityId: self.data.storeInfo.activityId || '',
        skuId: data.skuId,
        storeId: data.storeId
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    });
  },
  // 购物车减车埋点
  carRedBury(data) {
    this.buried.storeId = self.data.storeInfo.storeId
    this.buried.skuId = data.skuId
    this.buried.activityId = self.data.storeInfo.activityId || ""
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "click_reduce",
      click_par: {
        activityId: self.data.storeInfo.activityId || '',
        skuId: data.skuId,
        storeId: data.storeId
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    });
  },
  goodAddBury(e) {
    this.buried.storeId = e.detail.storeId
    this.buried.skuId = e.detail.skuId
    this.buried.activityId = self.data.storeInfo.activityId || ""
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "click_add",
      click_par: {
        activityId: self.data.storeInfo.activityId || '',
        skuId: e.detail.skuId,
        storeId: e.detail.storeId
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    });
  },
  goodRecBury(e) {
    this.buried.storeId = e.detail.storeId
    this.buried.skuId = e.detail.skuId
    this.buried.activityId = self.data.storeInfo.activityId || ""
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "click_reduce",
      click_par: {
        activityId: self.data.storeInfo.activityId || '',
        skuId: e.detail.skuId,
        storeId: e.detail.storeId
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    });
  },
  // 新店内活动页 监听商详页加车
  _UPDATEGOODSNUM(data) {
    this.setData({ upDateGoods: data })
  }
});

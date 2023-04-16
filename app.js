/* eslint-disable camelcase */
import { signInit } from './common/util/sign.v2';
import config from './common/util/config'
// 重写 请求
import './common/util/rqQueue'
// 重写Page
import './common/util/firstPage'
import './common/util/rewrite'
import "./common/util/rewriteWxRoute"
import { error } from './common/util/wxLog'
import { requestUpdateManager } from './common/util/updateManager';
import { testGetsecurityList } from './common/util/getSecurityList'
import { reportAllExposureData } from "./common/util/BI";
// 自动化埋点实例化
// import Tracker from './common/util/bi/index'
// 初始化
// new Tracker()
let mpChannel = 'wx_xcx';
// 小程序中台监控系统
// import monitor from './common/util/mo.min.js'

// 初始化
// monitor.config({
//   url: 'https://api.m.jd.com/api',
//   appKey: '11abfb618048452a939e0cfaf6e4fb48',
//   serverName: 'jddj', // 网关注册的应用名称
//   plugin: true,
//   reqHeaderData: true,
//   reqResponseData: true,
//   disableFetchQuery: true
// });
// 腾讯有数SDK需要先通过init初始化才能正常使用
// const tConfig = require('./common/util/tencentBi/config');
// const sr = require('./common/util/tencentBi/index').init(tConfig)
// 是否展示首页自动切换按钮，提审时请设置为false。
let handleControlChangeBtn = true
// 直播插件
let livePlayer = requirePlugin('live-player-plugin')
App({
  // 腾讯有数
  // sr,
  onLaunch: function (options) {
    var that = this;
    this.globalData.isAppLaunch = true;
    // 开启视觉无障碍功能埋点上报
    if (wx.checkIsOpenAccessibility) {
      wx.checkIsOpenAccessibility({
        success: (res) => {
          if (res && res.open) {
            // 修改是否开启无障碍标识别
            // getApp().globalData.isOpenAccessibility  =true;
            this.globalData.isOpenAccessibility = true;
          }
        }
      });
    }
    let getDevice = require("./common/util/deviceInfo");
    getDevice().report();
    // 获取胶囊
    this.getCapsule();
    // 【自动切换环境】判断小程序体验版\开发版\线上版,然后切换环境。
    this.getEnvVersion((envVersion) => {
      // 自动切换环境标识，只有体验版或预发布版才识别本地缓存环境标识。
      if (envVersion === "develop" || envVersion === "trial") {
        // 开发版本和体验版，首页出现切换环境按钮。
        this.globalData.isShowEnvChangeBtn = true;
        try {
          // 如果缓存有环境标识，按缓存标识切换到相应环境。
          let envVersionIndex = wx.getStorageSync("envVersionIndex") || "";
          // console.log('envVersionIndex==>', envVersionIndex);
          if (envVersionIndex) {
            this.testAutoChangeEnv(envVersionIndex).then(() => { });
          }
        } catch (e) {
          console.error('切换环境报错', e)
        }
      }
    });
    // 获取手机信息
    wx.getSystemInfo({
      success: (res) => {
        that.globalData.systemInfo = res;
        let modelmes = (res && res.model) || "";
        if (/iPhone\s?(X|1[1-9])/ig.test(modelmes)) {
          that.globalData.isIphoneX = true;
          that.globalData.isIpx = true;
        }
        wx.setStorageSync("modelmes", modelmes);
      }
    });
    this.globalData.loginStateInfo = wx.getStorageSync("login_info") || {};
    this.globalData.userInfo = wx.getStorageSync("userInfo");
    if (options && options.scene) {
      this.globalData.scene = {
        scene: options.scene,
        load: false
      };
    } else {
      this.globalData.scene = {
        scene: "1001",
        load: false
      };
    }
    // 获取网络状态
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        that.globalData.networkType = res.networkType;
      }
    });

    try {
      let addressInfo = wx.getStorageSync("address_info");
      if (addressInfo.latitude && addressInfo.longitude) {
        that.globalData.addressInfo = addressInfo;
      }
    } catch (e) {
      console.error(e)
    }
    // 清除code
    try {
      let storageCode = wx.getStorageSync("code");
      let codeClearFlag = wx.getStorageSync("codeFlag");
      if (storageCode && !codeClearFlag) {
        wx.removeStorageSync("code");
        wx.setStorageSync("codeFlag", true);
      }
    } catch (e) {
      console.error(e)
    }
    // 独立分包业务设置business
    if (this.setBusiness()) {
      this.globalData.qrcode.business = this.setBusiness();
    }
    // 获取腰带缓存,初始化小程序删除腰带缓存
    let beltExist = wx.getStorageSync("beltExist");
    if (beltExist) {
      wx.removeStorageSync("beltExist");
    }
    // 性能指标上报
    // this.initPerformance();
    if (options.query) {
      this.globalData.qrcode.pushUserId = options.query.pushUserId || "";
      this.globalData.qrcode.business = options.query.business || "";
      this.globalData.channelCode = options.query.outPromotion || "";
    }
    // 监控内存
    this.onMemory();
  },
  // 上报性能指标
  initPerformance () {
    try {
      const performance = wx.getPerformance();
      const observer = performance.createObserver((entryList) => {
        // console.log('performance', entryList.getEntries())
        let list = entryList.getEntries() || [];
        setTimeout(() => {
          let clickPar = {};
          list.forEach((item) => {
            clickPar[item.name] = {
              duration: item.duration,
              name: item.name,
              entryType: item.entryType,
              path: item.path,
              startTime: item.startTime
            };
          });
          let totalTime = 0;
          totalTime =
            (clickPar.appLaunch && clickPar.appLaunch.duration) ||
            (clickPar.route && clickPar.route.duration);
          clickPar.totalTime = totalTime;
        }, 10);
      });
      observer.observe({ entryTypes: ["render", "script", "navigation"] });
    } catch (error) {
      console.error("performance", error);
    }
  },
  // 获取直播间room_id
  getLiveRoomId (options) {
    console.log("进来getLiveRoomId方法了", options);
    let _this = this;
    console.log("_this", this);
    let { scene = "", query = {}, path = "" } = options || {};
    if (path.indexOf("wx2b03c6e691cd7370") > -1) {
      console.log("直播插件的path", path);
      // 直播
      if (query.room_id) {
        console.log("直播插件的query", query);
        // 自定义渠道
        // 设置默认渠道号
        !query.business && (query.business = 219);
        // _this.globalData.globalCurrentPageNameObj  ={
        //   currentPageName: 'liveplayer'
        // }
        _this.reportLivePv(query);

      } else if (
        scene == 1007 ||
        scene == 1008 ||
        scene == 1014 ||
        scene == 1044 ||
        scene == 1045 ||
        scene == 1046 ||
        scene == 1047 ||
        scene == 1048 ||
        scene == 1049 ||
        scene == 1073 ||
        scene == 1154
      ) {
        console.log("scene", scene);
        console.log("livePlayer", livePlayer.getShareParams);
        // 分享卡片
        if (livePlayer && livePlayer.getShareParams) {
          console.log("pvLiveGetShareParams---try");
          livePlayer
            .getShareParams()
            .then((res) => {
              // 房间号
              console.log("get room id", res.room_id);
              // 设置默认渠道号
              res.business = 182;
              // res.room_id && _this.reportLivePv(res);
              _this.reportLivePv(res);
            })
            .catch((err) => {
              console.log("getShareParams---err", err)
            });
        } else {
          console.log("pvLiveNoLivePlayer", options);
        }
        console.log("pvLiveSceneEnd", options);

      } else {
        console.log("pvLiveElse");
      }
    } else {
      console.log("pvLiveNoAppId");
    }
  },
  // 上报直播pv
  reportLivePv (params) {
    this.globalData.roomId = params.room_id;
    this.globalData.qrcode.business = params.business;
    setTimeout(() => {
      try {
        let { pvLiveBuriedV2_ } = require("./common/util/BI");
        pvLiveBuriedV2_({
          create_time: new Date(),
          livePath:
            "plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin",
          livePageName: "liveplayer",
          page_par: {
            roomid: params.room_id,
            params: params
          },
          currentPageName: "liveplayer",
          prePageName: "outside"
        });
        console.log("走完pvLiveBuriedV2_了");
      } catch (e) {
        console.log("setTimeout----catch", e);
      }
    }, 10);
  },
  onHide () {
    try {
      let _prePageName = this.globalData.globalCurrentPageNameObj && this.globalData.globalCurrentPageNameObj.currentPageName || ''
      let duration = Date.now() - this.globalData.onAppShowTime
      let { pvBuriedV2_ } = require("./common/util/BI");
      pvBuriedV2_({
        page_par: {
          duration
        },
        currentPageName: 'outside',
        prePageName: _prePageName
      })
    } catch (e) {
      console.log('onHide', e)
    }
    if (this.compareVersion("2.9.0") >= 0) {
      wx.offMemoryWarning();
    }
    try {
      this.globalData.pageStack.push("outside");

      this.globalData.isBackToFront = false;

      this.globalData.globalCurrentPageNameObj = {};
      this.globalData.globalCurrentPageNameObj.currentPageName = "outside";
      // 压后台，上报所有埋点
      reportAllExposureData();
    } catch (e) {
      console.error('压后台上报错误', e)
    }
  },
  onShow (options) {
    const that = this;
    this.globalData.isBackToFront = true;
    this.globalData.onAppShowTime = Date.now()
    // console.error('ptions.query',options.query)
    // 标识onShow
    this.globalData.isAppShow = true;
    // 防连点重置为能点击的状态
    this.globalData.preventClickFlag = false;
    if (options.query) {
      this.globalData.qrcode.pushUserId = options.query.pushUserId || "";
      this.globalData.channelCode = options.query.outPromotion || "";
    }

    if (options.query && options.query.business) {
      that.globalData.qrcode.business = options.query.business || "";
    }
    // 获取openid
    const { getNewOpenId, reportBusiness } = require("./common/util/services");
    getNewOpenId(1, () => {
      reportBusiness({ isNeedDealError: 1 });
    });

    // 分享信息
    if (options.shareTicket) {
      this.globalData.shareTicket = options.shareTicket;
    } else {
      this.globalData.shareTicket = "";
    }
    if (options && options.scene) {
      this.globalData.appScene = options.scene;
    }
    if (options && options.referrerInfo) {
      this.globalData.referrerInfo = options.referrerInfo;
    }
    console.log(options.referrerInfo, "res.referrerInfo");
    if (
      options &&
      options.referrerInfo &&
      options.referrerInfo.extraData &&
      options.referrerInfo.extraData.redeemCode
    ) {
      this.globalData.redeemCode = options.referrerInfo.extraData.redeemCode;
    }
    // 小程序版本升级
    requestUpdateManager();
    // 获取直播间room_id
    this.getLiveRoomId(options);
    // 同步登陆和定位信息
    const { referrerInfo } = options;
    const {
      extraData: {
        addressInfo = {},
        loginInfo = {},
        uuId = "",
        from = "",
        dySignKey = ""
      } = {}
    } = referrerInfo || {};
    console.log("extraData", referrerInfo);
    if (addressInfo.latitude && addressInfo.longitude) {
      this.globalData.addressInfo = {
        ...addressInfo,
        from
      };
      wx.setStorageSync("address_info", addressInfo);
    }
    if (loginInfo && loginInfo.o2o_m_h5_sid) {
      setTimeout(function () {
        const mp = require("./common/util/wxapi");
        mp.getOpenId()
          .then((res) => {
            loginInfo.openId = res;
            that.globalData.loginStateInfo = loginInfo;
            wx.setStorageSync("login_info", loginInfo);
            wx.setStorageSync("VERIFY_SIG_KEY", dySignKey);
            that.globalData.uuId = uuId;
            wx.setStorageSync("uuId", uuId);
          })
          .catch((err) => {
            console.log(err, "eerrrrrrrrrrr");
          });
      }, 4);
    }
  },
  onError (err) {
    // 上报错误
    this.reportError(err);
  },

  // 错误上报
  reportError (err) {
    try {
      if (err) {
        error(err);
      }
    } catch (e) {
      console.error(e);
    }
  },

  // 监控性能
  onMemory () {
    let that = this;
    if (this.compareVersion("2.0.2") >= 0) {
      wx.onMemoryWarning(function (res) {
        if (res) {
          res.name = "onMemoryWarningReceive";
          that.reportError(res);
        }
      });
    }
  },

  // 上报小程序测速 id: 监控ID  val: 监控值
  reportPerformance (id, val) {
    if (id && val) {
      try {
        wx.reportPerformance(id, val);
      } catch (e) {
        console.error('reportPerformance', e)
      }
    }
  },

  // 版本兼容判断
  compareVersion (v2) {
    let currentVersion = wx.getSystemInfoSync().SDKVersion;
    let v1 = (currentVersion && currentVersion.split(".")) || [];
    v2 = v2.split(".") || [];
    const len = Math.max(v1.length, v2.length);

    while (v1.length < len) {
      v1.push("0");
    }
    while (v2.length < len) {
      v2.push("0");
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i]);
      const num2 = parseInt(v2[i]);

      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }

    return 0;
  },

  // 获取胶囊位置
  getCapsule () {
    try {
      let capsuleNew =
        (wx.getMenuButtonBoundingClientRect &&
          wx.getMenuButtonBoundingClientRect()) ||
        "";
      if (capsuleNew) {
        this.globalData.capsule = capsuleNew;
      }
    } catch (e) {
      console.error('getCapsule', e)
    }
  },

  // 【自动切换环境】判断小程序体验版\开发版\线上版
  getEnvVersion (fn) {
    try {
      if (typeof __wxConfig == "object") {
        // develop: 工具或者真机 开发环境
        // trial: 测试环境(体验版)
        // release: 正式环境
        let version = __wxConfig.envVersion;
        let curVersion = version || "";
        fn(curVersion);
        // console.log("当前环境:" + curVersion);
      }
    } catch (e) {
      console.error('getEnvVersion', e)
    }
  },

  // 【自动切换环境】测试自动切环境
  testAutoChangeEnv (index) {
    return new Promise((resolve) => {
      this.globalData.envVersionIndex = index;
      try {
        wx.setStorageSync("VERIFY_SIG_KEY", "");
        wx.setStorageSync("envVersionIndex", index);
      } catch (e) {
        console.error('testAutoChangeEnv', e)
      }
      if (index == 1) {
        this.globalData.config = config.pro;
      } else if (index == 2) {
        this.globalData.config = config.test;
      } else if (index == 3) {
        this.globalData.config = config.pre;
      } else if (index == 4) {
        this.globalData.config = config.pre3;
      } else if (index == 5) {
        this.globalData.config = config.pre4;
      } else if (index == 6) {
        this.globalData.config = config.qa1;
      } else if (index == 7) {
        this.globalData.config = config.qa2;
      } else if (index == 8) {
        this.globalData.config = config.qa3;
      }
      resolve(index);
    });
  },

  // AppID: config.appId,
  jdAppId: 121,
  needLoad: false,
  // globalRequestUrl: config.globalRequestUrl,
  requestLoginEntity: {
    islogining: false,
    requestList: []
  },
  // 独立分包设置的business
  setBusiness: function () {
    return "";
  },
  globalData: {
    isSupportWebp: true,
    mpChannel,
    // 是否展示返回app按钮
    isShowBackToAppBtn: true,
    historyPage: [],
    homeIconFlag: false,
    itemCollection: {},
    itemClickCount: 0,
    isIphoneX: false,
    // 配置（默认线上）
    config: config.pro,
    // 【自动切换环境】首页是否展示切换环境按钮（根据环境判断，默认不展示）
    isShowEnvChangeBtn: false,
    // 【自动切换环境】首页切换按钮状态（默认按钮激活线上状态）613
    envVersionIndex: 1,
    // 【自动切换环境】是否展示首页自动切换环境按钮（手动，默认不展示）
    handleControlChangeBtn: handleControlChangeBtn,
    // 是否刷新页面
    refreshHomeFlag: false,
    // 胶囊位置（用于首页自定义导航条）
    capsule: {},
    // 群Id
    wxGroupId: "",
    // AB test
    testtag: [],
    // 分享信息
    shareTicket: "",
    // 埋点判断是从首页进行的后续操作还是频道页进行的后续操作，index:首页，channel:频道页
    sourcefrom: "index",
    // 是否重新登录弹窗
    reLogin: false,
    // 内部跳转类型
    jumpType: 0,
    // 内部跳转参数
    jumpParams: "",
    // 域名地址
    HOST: "",
    // 监听断网
    isConnected: true,
    // gps定位信息
    gpsInfo: {},
    // 系统信息
    systemInfo: {},
    // 网络状态
    netWorkType: "",
    // 埋点用
    scene: "",
    // 是否是iphoneX
    isIpx: false,
    // 当前地址类型， 临时/地址列表选择
    ADDRESS_TYPE_TEMP: 1,
    ADDRESS_TYPE_SELECTION: 2,
    // app版本号-接口用点
    // platform: config.platform,
    // 结算请求版本号
    // settlementPlatform: config.settlementPlatform,
    currentAddType: 1,
    // 用户登录态信息
    loginStateInfo: {},
    // 是否是新用户
    isNewUser: true,
    // 1.2.3只能输入数字
    // appVersion: config.xcxVersion,
    userInfo: null,
    couponCode: "",
    // easyGoodlist
    easyGoodlist: {},
    addressInfo: {
      // 全局地址信息
      cityName: "",
      countyName: "",
      countyId: "",
      cityId: "",
      adcode: "",
      addr: "",
      longitude: "",
      latitude: "",
      poi: "",
      addressDetail: "",
      name: "",
      mobile: "",
      addressId: ""
    },
    // 首页门店信息
    storeInfo: {
      storeId: "",
      orgCode: ""
    },

    // 轻松购首页门店信息
    easyGoStoreInfo: {
      storeId: "",
      orgCode: "",
      storeName: "",
      activityCount: 0 // 门店活动数量
    },
    // 轻松购商品查询方式 1：扫描方式、2：手输方式
    easyGoSearchType: 1,
    // 轻松购门店是否被切换
    isEasyGoStoreChanged: false,
    // 轻松购手动输入条码
    easyGoInputCode: "",

    // 结算信息
    settlement: {
      addressInfo: {},
      storeId: "",
      orgCode: "",
      isGet: true,
      remark: ""
    },
    // poi选择结果
    poiSelectResult: {},
    decreaseHidden: true,
    cartList: [],
    cartListHidden: true,
    cartHeight: 0,
    jdPin: "",
    jdPinAgain: "", // 登录专用，勿要赋值

    cartMaxHeight: 0,
    cartUI: {
      cartItemHeight: 100,
      cartBottomBarHeight: 50,
      cartHeaderHeight: 44,
      promotionSuitHeight: 40
    },
    shoppingList: [],
    wxxcxPlatform: "",
    roomId: "",
    qrcode: {
      business: "",
      orgcode: "",
      type: "-1",
      storeid: ""
    },
    isEasyGo: false,
    isHomePage: true,
    needLoadOrder: false,
    isEasyGoExist: false,
    // isLoginSuccBack: false,//是否从登录注册新用户返回,
    // 开团页点进首页到拼团列表页
    // isToGroupBuy:false
    // 点击的时间
    clickTime: 0,
    // 是否对购物车进行放大
    scaleAble: false,
    // 判断上一页是否是登录页
    provideIsLogin: false,
    // 判断上一页是否是登录页
    hasCoupon: false,
    uuId: wx.getStorageSync("uuId") || "",
    needCheckLocationChange: true,
    addMpStatus: 0, // 添加我的小程序当前状态 0 不展示 1 状态1 2 状态2
    addMpRequested: false, // / 是否请求过（添加小程序）
    pvRouteObj: {}, // pv 格式增加的数据对象
    channelCode: "", // 外部投放打标的促销渠道
    isFirstPageFlag: true, // 是否是首屏
    currentOnReadyTime: null, // 当前页面onReady时间
    back_deltaNum: 0, // 发生页面back时，返回后页面栈的长度
    homeSingleProductObj: null,
    isBackToFront: false, // 标识是否从后台进去到小程序页面
    halfMaskArr: [
      // {
      //   path:'',
      //   subMaskArr:[
      //     {
      //       name:'',
      //     }
      //   ]
      // }
    ],
    isOpenAccessibility: false, // 是否开启无障碍
    // 存储曝光数据
    epArr: [],
    globalLogEpArr: [], // 将不同traceId下的曝光数据整合
    globalLogClickArr: [], // 将不同click曝光数据整合
    // pvStack: [], //
    pageStack: [],
    pageSourceStack: [],
    H5extraParams: {}, // h5跳转小程序带过来的参数
    globalLogEpObj: {},
    globalCurrentPageNameObj: {},
    _uuid: [],
    _pvHalfMaskName: [
      "mini_shopcar",
      "priceRemindLayer",
      "ExposureSpuGoods",
      "aggregateStoresLayer",
      "redPacLayer",
      "couponLayer",
      "newCouponLayer",
      "shopService",
      "outRange",
      "select_address",
      "couponListLayer"
    ],
    allPageIds: [],
    onAppShowTime: 0
  },

  saveAddress: function (addressInfo) {
    this.setAddressType(false);
    // 保存地址
    try {
      wx.setStorageSync("address_info", addressInfo);
      this.globalData.addressInfo = addressInfo;
    } catch (e) {
      // ignore
    }
  },

  /**
   * 保存当前地址类型
   */
  setAddressType: function (isTempAddress) {
    var addType = isTempAddress
      ? this.globalData.ADDRESS_TYPE_TEMP
      : this.globalData.ADDRESS_TYPE_SELECTION;
    this.globalData.currentAddType = addType;
  },

  /**
   * 当前是否正使用临时地址
   */
  isUsingTempAddress: function () {
    return this.globalData.currentAddType == this.globalData.ADDRESS_TYPE_TEMP;
  }
});
// 获取加密白名单
testGetsecurityList()
// 验签初始化
signInit()
// require("./common-taro/app.js").taroApp


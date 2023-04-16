import {
  request,
  FNIDS
} from '../../common/util/api'
import mp from '../../common/util/wxapi'

import {
  isLogin
} from '../../common/util/loginUtil'
import {
  Lazy
} from "../../common/util/lazyLoad";
import {
  getDaoJiaLocation,
  getSubscribeAb
} from '../../common/util/services'
// 埋点描述文件
import { djCmsJump } from '../../common/util/agreementV2';
import { handleScanOptionsAndJump } from '../../common/util/jumpHandler';
import emitter from '../../common/util/events'
import Public from '../../common/util/public';
import getDevice from "../../common/util/deviceInfo";
import { pvBuriedV2_ } from "../../common/util/BI";
import { addFilterMsg } from "../../common/util/wxLog";
import util from '../../common/util/util'
// 当前时间（性能检测上报用）
let startTime = 0;
// 获取全局app.js
let app = getApp();
let feedList
Page({
  // 埋点描述文件
  // 埋点
  buried: {
    type: "空",
    urlParams: "空"
  },
  homeoptions: null,
  // 当前实例变量
  scopeData: {
    // onShow触发的次数
    onShowTimes: 1,
    // 地址信息
    addressInfo: {},
    // 侧边栏判断停止滑动
    sideBarTimer: null,
    // 侧边栏是否有标识
    hasSideBar: false,
    // 曝光埋点对象
    exposureObj: null,
    // 【图片懒加载】实例对象
    LazyLoad: null,
    // 所有组件的高度以375宽度为准（key: 楼层名称, value: 高度）
    componentsHeight: {
      // 头部组件
      "header": 132,
      // 首焦组件
      "banner_tpl3": 146,
      // 小程序轮播
      "banner_tpl2": 105,
      // 临时宫格
      "3": 105,
      // vip会员楼层
      "120": 50,
      // 百宝箱组件（大于5个）
      "ball_tpl2": 198,
      // 百宝箱组件（小于等于5个）
      "ball_tpl2_small": 100,
      // 运营标签组件
      "ball_tpl4": 54,
      // 推荐门店组件
      "slideStoreList_tpl1": 217,
      // 新人组件 --后台下发
      "marketing_tpl2": 129,
      // 换肤组件
      "floorBanner_tpl8": 140,
      // 头条楼层
      "floorBanner_tpl9": 40,
      // 会场组件(1行3个)
      "act4_tpl13": 158,
      // 会场组件(1行4个)
      "act4_tpl12": 168,
      // 战略宫格组件(2个)
      "act2_tpl11": 144,
      // 图文宫格组件(一行2、3、4个)
      "act2_tpl10": 98,
      "act3_tpl10": 152,
      "act4_tpl10": 152,
      // 商品楼层组件
      "rollTag_tpl1": 149
    },
    isPullDownRefresh: false
  },
  // 页面的初始数据
  data: {
    // 展示feed流,
    showFeeds: false,
    // 入口球回顶部
    scrollLeft: 0,
    // 图片懒加载
    imgLazyLoad: {},
    // 2.0 所有楼层数据
    pageData: [],
    // 【自动切换环境】显示隐藏
    testEnvTab: false,
    // 【自动切换环境】是否展示首页自动切换按钮（手动，默认不展示）
    handleControlChangeBtn: false,
    // 【自动切换环境】切换环境按钮激活状态（默认线上）
    envVersionIndex: 1,
    // 【自动切换环境】是否展示首页自动切换按钮（根据环境判断，默认不展示）
    isShowEnvChangeBtn: false,
    // 页面滚动距离
    scrollTop: 0,
    //  首焦传给头部组件的背景色
    linkColor: '',
    // 换肤楼层或运营标签 传递给推荐好店和小程序资源位的背景色
    recommendBgColor: '',
    // 触发触底事件
    pageReachBottom: 0,
    // 首页请求数据是否加载完毕
    resourceRequestFinished: false,
    // 搜索头部地理位置
    poi: '',
    // 无数据提示
    showDefault: false,
    // 默认页-类型
    defaultType: 0,
    defaultObj: {},
    // 侧边栏楼层隐藏显示
    sideBarHide: false,
    // 获取地理位置失败错误信息
    locationError: {},
    // 胶囊位置
    capsule: app.globalData.capsule,
    // 签到提示
    signImgUrl: '',
    // 天降红包、新人弹层、模态弹层(不支持lottie动画)
    otherPop: {},
    otherPopTraceId: '',
    isHasCacheDataFlag: false, // 是否有缓存数据
    setDataEnd: false,
    isDeafultWhiteBag: false,
    isShowTopBanner: false, // 是否显示上推 bannner
    agreeMentPrivacy: true,
    pageDataTraceId: '',
    isBeltShow: false,
    fading: false,
    fadeSrcoll: null,
    beltType: 0,
    feedSkuShow: false,
    refreshBeltTimeFlag: '', // 刷新腰带标识
    isBeltData: false,
    self_page: 'home'

  },
  // 【生命周期】
  async onLoad (options) {
    this.buried.urlParams = options || '未获取到参数'
    this.homeoptions = options || '未获取到参数'
    startTime = Date.now();
    emitter.addListener('leavePop', (val) => {
      this.setData({
        leaveModalVisible: true,
        leaveModal: val.leaveModal
      })
    })
    // 地址位置处理 如果其他渠道有传入定位信息则以传入定位为准
    if (options.channelBusiness == 'jdncapplsd') {
      if (!options.storeId) {
        try {
          const res = await Public.goToStoreGetCoupon(options, this);
          options.storeId = res.storeId;
          this._handleCurrentPageData(options);
          if (options.storeId) {
            handleScanOptionsAndJump(options, this);
          }
        } catch (error) {
          this._handleCurrentPageData(options);
        }
      } else {
        try {
          this._handleCurrentPageData(options);
          handleScanOptionsAndJump(options, this);
        } catch (error) {
          this._handleCurrentPageData(options);
          handleScanOptionsAndJump(options, this);
        }
      }
      return
    }
    // 地址位置处理
    this._handleLocation((hasAddress) => {
      if (hasAddress) {
        // 获取当前页数据
        this._handleCurrentPageData();
      }
      // 解析参数并且走跳转协议
      handleScanOptionsAndJump(options, this);
    })

  },
  // 【生命周期】监听页面显示，当从当前页面调转到另一个页面，另一个页面销毁时会再次执行
  onShow (options) {
    // 实例化曝光埋点和图片懒加载
    this._newBuriedAndImgLoad();
    // 调用新老页面逻辑
    if (this.scopeData.onShowTimes > 1 || app.globalData.refreshHomeFlag) {
      this._handleOnShow()
    }
    this.scopeData.onShowTimes += 1;

    // 解析参数并且走跳转协议
    handleScanOptionsAndJump(options, this);
    // 如果腰带存在，下拉刷新时，重新获取腰带接口
    if (this.data.isBeltData || this.data.isBeltShow) {
      this.setData({
        refreshBeltTimeFlag: (new Date()).getTime()
      })
    }

    // 获取订阅消息AB
    getSubscribeAb()


  },

  // pv埋点上报
  pvFunc (back) {
    let recommendObj = this.data.recommendObj || {};
    pvBuriedV2_({
      create_time: new Date(),
      page_par: {
        urlParams: this.buried.urlParams || ""
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || "",
      isBack: back || ""
    });
  },

  // 【生命周期】监听页面隐藏
  onHide () {
    // 处理tabBar图标
    setTimeout(() => {
      app.globalData.homeIconFlag && this.setTabBarItem('pdj_home_default')
    }, 100)

    // 处理侧边栏
    this.scopeData.sideBarTimer && clearTimeout(this.scopeData.sideBarTimer);
    this.setData({
      sideBarHide: false
    });
  },

  // 【生命周期】监听页面卸载
  onUnload () {

  },

  // 【生命周期】生命周期函数--监听页面初次渲染完成
  onReady () {

  },

  // 【生命周期】分享
  onShareAppMessage () {
    return {
      title: '京东到家',
      path: '/pages/home/home'
    }
  },

  // 【生命周期】页面上拉触底事件的处理函数,分页请求
  onReachBottom () {
    this.handleOnReachBottom()
  },
  // 找到腰带feed出现位置
  feedSkuPosition (e) {
    feedList = wx.createSelectorQuery()
    this.setData({
      feedSkuShow: e.detail.feedSkuShow
    })
  },
  // 【生命周期】页面滚动触发事件的处理函数
  onPageScroll (e) {
    if (!this.data.showDefault) { // 有资源位内容
      // 侧边栏动画
      this.sideBarAnimate(e.scrollTop);
      // 导航条显示隐藏
      this.setData({
        scrollTop: e.scrollTop
      })
    }
    // 腰带
    if (!this.data.fading) {
      this.setData({
        fading: true
      })
    }
    this.data.fadeSrcoll && clearTimeout(this.data.fadeSrcoll);
    this.data.fadeSrcoll = setTimeout(() => {
      this.setData({
        fading: false
      })
    }, 500)
    // 交互2 && 出现feed吸顶条 && 腰带有数据
    if (this.data.feedSkuShow && this.data.beltType == 2 && this.data.isBeltData) {
      feedList.select('#feed_position').boundingClientRect().exec((res) => {
        if (res[0] && res[0].top && res[0].top <= 60 && !this.data.isBeltShow) {
          this.setData({
            isBeltShow: true
          })
        } else if (res[0] && res[0].top && res[0].top > 60 && this.data.isBeltShow) {
          this.setData({
            isBeltShow: false
          })
        }
      })
    }

    let _this = this;
    let isShowTopBanner = this.data.isShowTopBanner;
    let bannner_time = 0;
    let is_close_home_banner = null;

    let six_hours = this.data.pageData.config && this.data.pageData.config.ceilingBannerConfig && this.data.pageData.config.ceilingBannerConfig.timeOut || 6
    let isDownceilingBannerConfig = this.data.pageData.config && this.data.pageData.config.ceilingBannerConfig ? true : false;
    // 获取缓存时间
    try {
      bannner_time = wx.getStorageSync('close_home_banner_time')
      is_close_home_banner = wx.getStorageSync('close_home_banner')
    } catch(err) {
      /**/
    }
    if(isDownceilingBannerConfig) {
      if(is_close_home_banner) { // 关闭过
        let six_hours_times = six_hours * 60 * 60 * 1000;
        let time = new Date().getTime() - bannner_time
        if(time < six_hours_times) { // 不展示
          if(this.data.isShowTopBanner) {
            _this.setData({
              isShowTopBanner: false
            })
          }
        }else{
          const query1 = wx.createSelectorQuery()
          query1.select('.container >>> #feeds-sku').boundingClientRect().selectViewport().scrollOffset().exec(function (res) {
            let top = res[0] ? res[0].top : 1000
            if(!isShowTopBanner && top <= 160) {
              _this.setData({
                isShowTopBanner: true
              })
            }
            if(isShowTopBanner && top > 160) {
              _this.setData({
                isShowTopBanner: false
              })
            }

          })
        }
      }else{
        const query1 = wx.createSelectorQuery()
        query1.select('.container >>> #feeds-sku').boundingClientRect().selectViewport().scrollOffset()
          .exec(function (res) {
            let top = res[0] ? res[0].top : 1000
            if(!isShowTopBanner && top <= 160) {
              _this.setData({
                isShowTopBanner: true
              })
            }
            if(isShowTopBanner && top > 160) {
              _this.setData({
                isShowTopBanner: false
              })
            }

          })
      }
    }
  },
  // 【生命周期】当前是 tab 页时，点击 tab 时触发
  onTabItemTap () {
    if (app.globalData.homeIconFlag) {
      this.setTabBarItem('pdj_home');
      app.globalData.homeIconFlag = false;
    } else {
      let { bottomNavigation = {} } = this.data.pageData.config || {};
      let { to = '', params = {} } = bottomNavigation;
      djCmsJump({
        to,
        params,
        preObj: this.data.recommendObj,
        buried_position: {
          currentPageName: 'homepageclick_onTabItemTap_home'
        }
      })
    }
  },

  // 【生命周期】下拉刷新
  onPullDownRefresh () {
    if (!this.data.showDefault) {
      this._handleCurrentPageData();
      this._initState();
    }
    // 如果腰带存在，下拉刷新时，重新获取腰带接口
    if (this.data.isBeltData) {
      this.setData({
        refreshBeltTimeFlag: (new Date()).getTime()
      })
    }
    this.scopeData.isPullDownRefresh = true;
    wx.stopPullDownRefresh();
  },

  /**
   * @description: 实例化曝光埋点和图片懒加载
   * @param {Void}
   * @return {Void}
   */
  _newBuriedAndImgLoad () {
    // 图片懒加载实例化对象
    this.scopeData.LazyLoad = new Lazy(this, '.container >>> .lazy-load');
  },

  /**
   * @description: 初始化曝光埋点和图片懒加载
   * @param {Void}
   * @return {Void}
   */
  _initBuriedAndImgLoad () {
    // 监听图片懒加载
    this.scopeData.LazyLoad && this.scopeData.LazyLoad.initObserver && this.scopeData.LazyLoad.initObserver(imgId => {
      if (!this.data.imgLazyLoad[imgId]) {
        this.setData({
          [`imgLazyLoad.${imgId}`]: true
        })
      }
    });
  },

  /**
   * @description: 卸载曝光埋点和图片懒加载
   * @param {Void}
   * @return {Void}
   */
  _disconnectBuriedAndImgLoad () {
    // 卸载监听曝光埋点
    // 卸载监听图片懒加载
    this.scopeData.LazyLoad && this.scopeData.LazyLoad.disconnectObserver && this.scopeData.LazyLoad.disconnectObserver();
  },

  /**
   * @description: 监听弹层曝光
   * @param {Object}
   * @return {void}
   */
  onPopExposure () {
    // let data = e.detail.data;
  },

  /**
   * @description: 监听组件懒加载曝光
   * @param {Object}
   * @return {void}
   */
  onExposure () {
    // 初始化曝光
  },

  /**
   * @description: 初始化状态
   * @param {Void}
   * @return {Void}
   */
  _initState () {
    this.setData({
      pageReachBottom: 0,
      showFeeds: false,
      resourceRequestFinished: false
    })
  },

  /**
   * @description: onShow
   * @param {type}
   * @return:
   */
  _handleOnShow () {
    // 如果地理位置改变，登录状态。重新加载数据
    if (app.globalData.refreshHomeFlag) {
      this._initState();
      // 地址位置处理
      this._handleLocation((hasAddress) => {
        if (hasAddress) {
          // 获取当前页数据
          this._handleCurrentPageData()
        }
      })
      setTimeout(() => {
        app.globalData.refreshHomeFlag = false
      }, 1000)
    } else {
      // 初始化曝光和图片懒加载
      this._initBuriedAndImgLoad();

    }

  },
  /**
   * @description: 获取当前页面数据
   * @param {void}
   * @return {void}
   */
  _handleCurrentPageData () {
    let requestCostTime = Date.now();
    // 获取当前页面数据
    this._getCurrentPageData().then(({
      result = '',
      mpCmsResult = {},
      code = '',
      recommendBgColor = {},
      popData = {},
      pageDataTraceId = '',
      totalData = {}
    } = {}) => {
      // 请求时间
      requestCostTime = Date.now() - requestCostTime;
      let { addressInfo = {} } = app.globalData || {};
      if (result) {
        // 渲染数据
        this.setData(Object.assign({
          linkColor: "",
          imgLazyLoad: this.scopeData.isPullDownRefresh ? this.data.imgLazyLoad : {},
          scrollLeft: 0,
          recommendBgColor: recommendBgColor.first || recommendBgColor.second || "",
          pageData: result,
          showDefault: false,
          poi: addressInfo.poi,
          handleControlChangeBtn: app.globalData.handleControlChangeBtn,
          isShowEnvChangeBtn: app.globalData.isShowEnvChangeBtn,
          envVersionIndex: app.globalData.envVersionIndex,
          // setDataEnd: true,
          isDeafultWhiteBag: true,
          pageDataTraceId
        }, popData), () => {

          this._finishSetData();
          if (startTime > 0) { // onLoad时上报

            let setDataTime = Date.now() - startTime - requestCostTime;
            // 上报setDate渲染时间（性能检测上报用）
            app.reportPerformance(2037, setDataTime);


            startTime = 0;
          }
        });
        // 签到提示
        this.showStepTips(mpCmsResult.signImgUrl);
        this.scopeData.isPullDownRefresh = false;
        app.globalData.refreshHomeFlag = false;
      } else { // 展示默认页
        app.globalData.refreshHomeFlag = true;
        if(code) {
          if (code === '2') { // 主接口没返回 有效数据
            this.setData({
              showDefault: true,
              defaultType: 1,
              defaultObj: totalData,
              poi: addressInfo.poi,
              handleControlChangeBtn: app.globalData.handleControlChangeBtn,
              isShowEnvChangeBtn: app.globalData.isShowEnvChangeBtn,
              envVersionIndex: app.globalData.envVersionIndex
            })
          }else if (code === '100') { // 主接口没返回 有效数据
            this.setData({
              showDefault: true,
              defaultType: 1,
              defaultObj: totalData,
              poi: addressInfo.poi,
              handleControlChangeBtn: app.globalData.handleControlChangeBtn,
              isShowEnvChangeBtn: app.globalData.isShowEnvChangeBtn,
              envVersionIndex: app.globalData.envVersionIndex
            })
          } else { // 系统繁忙，请稍后再试
            this.setData({
              showDefault: true,
              defaultType: 1,
              defaultObj: totalData,
              poi: addressInfo.poi,
              handleControlChangeBtn: app.globalData.handleControlChangeBtn,
              isShowEnvChangeBtn: app.globalData.isShowEnvChangeBtn,
              envVersionIndex: app.globalData.envVersionIndex
            })
          }
        }else{
          // 断网
          this.setData({
            showDefault: true,
            defaultType: 2,
            poi: addressInfo.poi,
            handleControlChangeBtn: app.globalData.handleControlChangeBtn,
            isShowEnvChangeBtn: app.globalData.isShowEnvChangeBtn,
            envVersionIndex: app.globalData.envVersionIndex
          })
        }
      }
    })
  },

  /**
   * @description: 获取当前页面数据
   * @param {void}
   * @return {object} result: 结果数据
   */
  async _getCurrentPageData () {
    mp.loading_cover();
    const getDjCmsData = this._getDjCmsData();
    const getMpCmsData = this._getMpCmsData();
    const djCmsData = await getDjCmsData;
    const mpCmsData = await getMpCmsData;
    mp.hideLoading();
    if (djCmsData.code == '0') { // 接口请求正常
      let djCmsResult = djCmsData.result || {};
      let mpCmsResult = mpCmsData.result || {};
      let recommendBgColor = {};
      let mpCmsGroup = {
        groupId: -1,
        data: []
      };
      // 判断是否有侧边栏资源位-滑动页面动画效果用
      if (djCmsResult.config.sideFloor && djCmsResult.config.sideFloor.length) {
        this.scopeData.hasSideBar = true
      }
      // 过滤小程序cms资源位楼层
      if (mpCmsResult.data && mpCmsResult.data.length > 0) {
        mpCmsGroup.data = mpCmsResult.data.filter(item => {
          return item.type == 3 || item.type == 120 || (item.floorStyle === 'banner' && item.styleTpl === 'tpl2')
        })
      }
      if (Array.isArray(djCmsResult.data)) {
        djCmsResult.data.splice(1, 0, mpCmsGroup);
        // 分屏加载
        let firstScreenDataHeight = this.scopeData.componentsHeight.header;
        let systemInfo = app.globalData.systemInfo;
        let targetScreenHeight = 0;
        let addOneMore = true;
        if (systemInfo.screenHeight && systemInfo.screenWidth) {
          targetScreenHeight = systemInfo.screenHeight * 375 / systemInfo.screenWidth;
        }
        djCmsResult.data.forEach((group, index) => {
          if (group && group.groupId === 'undefined') { // 不带卡片的楼层
            group.needFloorBackground = true;
            let floorGroup = {
              groupId: -2,
              data: [group]
            };
            group[index] = floorGroup
          } else {
            let needFloorBackground = !group.groupBgColor;
            if (Array.isArray(group.data)) {
              group.data.forEach(floor => {
                floor.needFloorBackground = needFloorBackground;
                if (floor.type) { // 小程序cms楼层
                  let mpCmsFloorHeight = this.scopeData.componentsHeight[`${floor.type}`];
                  mpCmsFloorHeight && (firstScreenDataHeight += mpCmsFloorHeight)
                } else if (floor.floorStyle && floor.styleTpl) { // 到家cms楼层
                  // 换肤楼层
                  if (floor.floorStyle == 'floorBanner' && floor.styleTpl == 'tpl8' && floor.floorBgColor) {
                    recommendBgColor.first = floor.floorBgColor
                  } else if (floor.floorStyle == 'ball' && floor.styleTpl == 'tpl4' && floor.floorBgColor && !this.data.recommendBgColor) { // 运营标签楼层
                    recommendBgColor.second = floor.floorBgColor
                  }

                  // 会场一行三个的楼层或者图文宫格的楼层
                  if ((floor.styleTpl == 'tpl13' || floor.styleTpl == 'tpl10') && floor.floorStyle.includes('act')) {
                    floor.floorStyle = 'act'
                  }
                  let djCmsFloorHeight = 0;
                  if (floor.floorStyle === 'ball' && floor.styleTpl === 'tpl3') { // 行业球
                    if (floor.data && floor.data.length > 5) {
                      djCmsFloorHeight = this.scopeData.componentsHeight[`${floor.floorStyle}_${floor.styleTpl}`];
                    } else {
                      djCmsFloorHeight = this.scopeData.componentsHeight[`${floor.floorStyle}_${floor.styleTpl}_small`];
                    }
                  } else if (floor.floorStyle === 'marketing' && floor.styleTpl === 'tpl2') { // 新人楼层
                    djCmsFloorHeight = floor.data[0].floorCellData.imgHeight / 2;
                    // 新增的 新人品，处理高度问题
                    if (floor.data[0].floorCellData.skuList && floor.data[0].floorCellData.skuList.length == 3) {
                      djCmsFloorHeight += 170
                    } else if (floor.data[0].floorCellData.skuList && floor.data[0].floorCellData.skuList.length == 6) {
                      djCmsFloorHeight += 340
                    }
                  }
                  else {
                    djCmsFloorHeight = this.scopeData.componentsHeight[`${floor.floorStyle}_${floor.styleTpl}`];
                  }

                  djCmsFloorHeight && (firstScreenDataHeight += djCmsFloorHeight);
                }
                if (targetScreenHeight) { // 获取到设备宽高
                  if (firstScreenDataHeight < targetScreenHeight) {
                    floor.showFloor = true;
                  } else {
                    if (addOneMore) {
                      floor.showFloor = true;
                      addOneMore = false;

                    } else {
                      floor.showFloor = false;
                      djCmsResult.hasSecondPage = true
                    }
                  }
                } else {
                  floor.showFloor = true
                }
              })
            }
          }
        })
        // 资源位不够一屏，加载feeds。
        if (firstScreenDataHeight < targetScreenHeight && addOneMore) {
          this.setData({
            showFeeds: true
          })
        }
      }
      let popData = {};
      const getPopData = this._getPopData();
      popData = await getPopData;
      return {
        result: djCmsResult,
        mpCmsResult: mpCmsResult,
        recommendBgColor,
        popData,
        pageDataTraceId: djCmsData.traceId
      }
    } else { // 接口请求失败
      let deviceid_pdj_jd = util.getUUIDMD5();
      let loginInfo = wx.getStorageSync("login_info");
      wx.reportMonitor('23', 1)
      addFilterMsg("pages/home/home_indexh5/getIndex/error");
      addFilterMsg(FNIDS.homeData && FNIDS.homeData.functionId);
      addFilterMsg(deviceid_pdj_jd);
      addFilterMsg(loginInfo.PDJ_H5_PIN || '');
      // 默认页
      return {
        result: '',
        msg: djCmsData.msg,
        code: djCmsData.code,
        totalData: djCmsData
      }
    }
  },

  /* @description: 获取到家cms弹层信息
  * @param {void}
  * @return {String}: old/new
  */
  _getPopData () {
    return new Promise(resolve => {
      let { functionId = '', appVersion = '' } = FNIDS.homePop || {};
      request({
        functionId,
        appVersion,
        isForbiddenDialog: true,
        isNeedDealError: true,
        body: {
          refPageSource: "",
          userChannel: "app",
          globalPlat: "2",
          pageSource: "home",
          ref: "",
          ctp: "home"
        },
        pageId: (this.data.recommendObj && this.data.recommendObj.pageIdFirstPage) || "",
        preObj: this.data.recommendObj && this.data.recommendObj || {}
      }).then(res => {
        let obj = {};
        let result = res.data.result || [];
        for (let i = 0; i < result.length; i++) {
          let type = result[i].type;
          if (type === 3) { // pop3:动效弹层(先执行)
            // obj.animatePop = result[i]
          } else { // 新人弹层||天降红包||模态弹层(互斥)
            obj.otherPop = result[i]
            obj.otherPop.traceId = res.data.traceId
          }
        }
        resolve(obj)
        if(res.data.code != 0) {
          let deviceid_pdj_jd = util.getUUIDMD5();
          let loginInfo = wx.getStorageSync("login_info");
          addFilterMsg("pages/home/home_lauch/aggregation/error");
          addFilterMsg(FNIDS.homePop && FNIDS.homePop.functionId);
          addFilterMsg(deviceid_pdj_jd);
          addFilterMsg(loginInfo.PDJ_H5_PIN || '');
        }
      }).catch(() => {
        resolve({})
      })
    })
  },

  /**
   * @description: 请求到家CMS数据
   * @param {void}
   * @return {object} {data{object}: 数据}
   */
  _getDjCmsData () {
    let {
      addressInfo = {}
    } = this.scopeData;
    let { functionId = '', appVersion = '' } = FNIDS.homeData || {};
    return new Promise(resolve => {
      request({
        functionId,
        appVersion,
        isNeedDealError: true,
        body: {
          city: addressInfo.cityName || '',
          latitude: addressInfo.latitude,
          longitude: addressInfo.longitude,
          coordType: 2,
          address: addressInfo.countyName
        },
        method: 'POST',
        pageId: (this.data.recommendObj && this.data.recommendObj.pageIdFirstPage) || "",
        preObj: this.data.recommendObj && this.data.recommendObj || {}
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        resolve(err)
      })
    })
  },

  /**
   * @description: 请求小程序CMS数据
   * @param {void}
   * @return {object} {data{object}: 数据}
   */
  _getMpCmsData () {
    let {
      addressInfo = {}
    } = this.scopeData
    return new Promise(resolve => {
      let { functionId = '', appVersion = '' } = FNIDS.mpHomeData || {};
      request({
        // 真实接口
        functionId,
        appVersion,
        isNeedDealError: true,
        body: {
          "lgt": addressInfo.longitude || '',
          "lat": addressInfo.latitude || '',
          "cityId": addressInfo.cityId || ''
        },
        pageId: (this.data.recommendObj && this.data.recommendObj.pageIdFirstPage) || "",
        preObj: this.data.recommendObj && this.data.recommendObj || {}
      }).then(res => {
        resolve(res.data)
        if(res.data.code != 0) {
          let deviceid_pdj_jd = util.getUUIDMD5();
          let loginInfo = wx.getStorageSync("login_info");
          addFilterMsg("pages/home/home_xapp/getIndexSimpl/error");
          addFilterMsg(FNIDS.mpHomeData && FNIDS.mpHomeData.functionId);
          addFilterMsg(deviceid_pdj_jd);
          addFilterMsg(loginInfo.PDJ_H5_PIN || '');
        }
      }).catch(err => {
        resolve(err)
      })
    })
  },

  /**
   * @description:【location】处理地理位置信息
   * @param {function}
   * @return {object} 地理位置信息
   */
  _handleLocation (fn) {
    let { addressInfo = {} } = app.globalData || {};
    if (addressInfo.cityId && addressInfo.from === 'yy_xcx') { // 医药地址同步逻辑
      // 当前页地址赋值
      this.scopeData.addressInfo = addressInfo;
      // 回调
      fn && fn(true)
    } else {
      // 微信API获取经纬度
      this._getLocation().then(res => {
        let {
          longitude,
          latitude
        } = res;
        // 根据经纬度调用接口获取地址详情信息
        this._getLocationInfo(longitude, latitude).then(currentAddress => {
          // 和上一次地址比较（提示用户异地）
          this._compareLocation(currentAddress).then(compareAddress => {
            // 当前页地址赋值
            this.scopeData.addressInfo = compareAddress;
            // 同步app.js globalData.addressInfo
            app.globalData.addressInfo = compareAddress;
            // 设置缓存
            try {
              util.saveAddressPoi(compareAddress)
            } catch (err) {
              /**/
            }
            // 回调
            fn && fn(true)
          })
        }).catch(() => { // 接口获取地理位置信息失败
          wx.reportMonitor('24', 1)
          this.setData({
            showDefault: true,
            defaultType: 3
          });
          app.globalData.refreshHomeFlag = true;
          // 回调
          fn && fn(false)
        })
      }).catch(() => { // 微信API获取授权信息失败
        let addressInfo = {};
        // 设置缓存
        try {
          addressInfo = wx.getStorageSync('address_info');
        } catch (err) {
          /**/
        }
        if (addressInfo.latitude && addressInfo.longitude) { // 有缓存
          // 当前页地址赋值
          this.scopeData.addressInfo = addressInfo;
          // 同步app.js globalData.addressInfo
          app.globalData.addressInfo = addressInfo;
          // 回调
          fn && fn(true);
          app.globalData.refreshHomeFlag = false;
        } else {
          this.setData({
            showDefault: true,
            defaultType: 3,
            poi: addressInfo.poi,
            handleControlChangeBtn: app.globalData.handleControlChangeBtn,
            isShowEnvChangeBtn: app.globalData.isShowEnvChangeBtn,
            envVersionIndex: app.globalData.envVersionIndex
          })
          app.globalData.refreshHomeFlag = true;
          // 回调
          fn && fn(false)
        }
      })
    }
  },

  /**
   * @description:【location】比较当前地理位置来提示用户是否是异地
   * @param {object} 地址信息
   * @return {object} 比较后的地址信息
   */
  _compareLocation (currentAddress) {
    return new Promise(resolve => {

      let oldAddress = {};
      // 获取缓存
      try {
        oldAddress = wx.getStorageSync('address_info') || {};
      } catch (err) {
        /**/
      }
      if (app.globalData.needCheckLocationChange) { // 需要提示切换地址
        if (!oldAddress.cityId || currentAddress.cityId === oldAddress.cityId) { // 同城市
          resolve(currentAddress)
        } else {
          let date = new Date();
          let today = date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate();
          let lastDay = '';
          try {
            lastDay = wx.getStorageSync('dif_address_flag');
          } catch (err) {
            /**/
          }
          if (today !== lastDay) { // 一天提示一次
            wx.showModal({
              title: '地址提示',
              content: `定位到你在${currentAddress && currentAddress.cityName || ''}，是否切换到该城市?`,
              success (res) {
                if (res.confirm) { // 目标地址
                  resolve(currentAddress)
                } else if (res.cancel) { // 原来地址
                  resolve(oldAddress)
                }
              },
              complete () {
                wx.setStorageSync('dif_address_flag', today)
              }
            })
          } else {
            resolve(oldAddress)
          }
        }
      } else {
        resolve(oldAddress)
      }
    })
  },

  /**
   * @description:【location】获取详情地理位置
   * @param {number, number} 经度、纬度
   * @return {object} {longitude: 经度,latitude: 纬度,cityId: 城市id,cityName: 城市名称,countyName: 省份,poi: 具体位置名称,adcode: 地址id}
   */
  _getLocationInfo (longitude, latitude) {
    return new Promise((resolve, reject) => {
      getDaoJiaLocation({
        longitude: longitude,
        latitude: latitude
      }, function (res) {
        if (res) {
          let deviceInfo = getDevice()
          deviceInfo.setLatitude(res.latitude)
          deviceInfo.setLongitude(res.longitude)
          deviceInfo.report()
          resolve(res)
        } else {
          reject({
            longitude: '',
            latitude: '',
            cityId: '',
            cityName: '',
            countyName: '',
            poi: '',
            adcode: ''
          })
        }
      }, {
        isNeedDealError: true,
        isForbiddenDialog: true
      })
    })
  },

  /**
   * @description: 【location】获取经纬度
   * @param {void}
   * @return {object}
   */
  _getLocation () {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'wgs84',
        success (res) {
          const latitude = res.latitude;
          const longitude = res.longitude;
          resolve({
            latitude,
            longitude
          })
        },
        fail (err) {
          reject(err)
        }
      })
    })
  },

  /**
   * @description: 完成渲染后，刷新曝光合图片懒加载。
   * @param {type}
   * @return:
   */
  _finishSetData () {
    // 初始化曝光和图片懒加载
    this._initBuriedAndImgLoad();
    // 刷新页面标识
    this.setData({
      resourceRequestFinished: !this.data.resourceRequestFinished
    })
  },

  /**
   * @description: 父页面接收组件传递过来的背景颜色
   * @param {void}
   * @return:
   */
  onChangeBackground (e) {
    let {
      type,
      data
    } = e.detail
    if (type == 'banner') {
      this.setData({
        linkColor: data
      })
    }
  },

  /**
   * @description: 页面触底事件
   * @param {void}
   * @return:
   */
  handleOnReachBottom () {
    if (app.globalData.refreshHomeFlag) return;
    this.setData({
      pageReachBottom: ++this.data.pageReachBottom,
      showFeeds: true
    })
    // 第二屏资源位分页
    let pageData = this.data.pageData;
    if (pageData.hasSecondPage) { // 有第二分页
      pageData.hasSecondPage = false;
      pageData.data.forEach((group, groupIndex) => {
        if (Array.isArray(group.data)) {
          group.data.forEach((floor, floorIndex) => {
            if (!floor.showFloor) {
              this.setData({
                [`pageData.data[${groupIndex}].data[${floorIndex}].showFloor`]: true
              })
            }
          })
        }
      })
      this._initBuriedAndImgLoad()

    }
  },

  /**
   * @description: 切换首页tabBar图标
   * @param {type}
   * @return:
   */
  setTabBarItem (icon) {
    wx.setTabBarItem({
      index: 0,
      text: icon === 'pdj_home' ? '附近店铺' : '首页',
      selectedIconPath: `/images/${icon}.png`
    });
  },

  /**
   * @description: 侧边栏动画
   * @param {type}
   * @return:
   */
  sideBarAnimate (curScrollTop) {
    if (this.scopeData.hasSideBar) {
      if (curScrollTop - this.data.scrollTop > 0) { // 上滑动作
        if (!this.data.sideBarHide) { // 防止重复setData
          this.setData({
            sideBarHide: true
          })
        }
        // 滑动停止需要展示侧边栏
        this.scopeData.sideBarTimer && clearTimeout(this.scopeData.sideBarTimer);
        this.scopeData.sideBarTimer = setTimeout(() => {
          this.setData({
            sideBarHide: false
          });
        }, 1000)
      } else { // 下滑动作
        if (this.data.sideBarHide) { // 防止重复setData
          this.scopeData.sideBarTimer && clearTimeout(this.scopeData.sideBarTimer);
          this.setData({
            sideBarHide: false
          })
        }
      }
    }
  },

  /**
   * @description: 监听默认页按钮事件
   * @param {type}
   * @return:
   */
  _defaultBtnEvent (e) {
    let type = e.detail.type;
    if (type == 0) { // 接口获取地理位置失败
      // 地址位置处理
      this._handleLocation((hasAddress) => {
        if (hasAddress) {
          // 获取当前页数据
          this._handleCurrentPageData()
        }
      })
    } else if (type == 3) { // 未开通
      wx.navigateTo({
        url: '/pages/address/home/index?from=3',
        preObj: this.data.recommendObj,
        buried_position: {
          currentPageName: 'home_defaultBtnEvent_home'
        }
      })
    } else if (type == 1) { // 授权地理位置
      wx.openSetting({});
    } else if (type == 2) { // 网络失败
      // 地址位置处理
      this._handleLocation((hasAddress) => {
        if (hasAddress) {
          // 获取当前页数据
          this._handleCurrentPageData()
        }
      })
    }
  },

  /**
   * @description: 关闭步数赚指示
   * @param {type}
   * @return:
   */
  closeShowStepIncomeTip () {
    try {
      wx.setStorageSync('signImgUrl', this.data.signImgUrl || '');
    } catch (e) {
      /**/
    }
    this.setData({
      signImgUrl: ''
    });
    wx.navigateTo({
      url: '/pages/tabBar/signIn-t/index',
      preObj: this.data.recommendObj,
      buried_position: {
        currentPageName: 'home_closeShowStepIncomeTip_home'
      }
    })
  },

  /**
   * @description: 签到提示
   * @param {type}
   * @return:
   */
  showStepTips (signImgUrl) {
    if (signImgUrl) { // 图片地址
      let localSignImgUrl = '';
      try {
        localSignImgUrl = wx.getStorageSync('signImgUrl');
      } catch (e) {
        /**/
      }
      if (signImgUrl != localSignImgUrl) {
        this.setData({
          signImgUrl: signImgUrl
        })
      }
    }
  },

  /**
   * @description: 【自动切换环境】测试自动切环境
   * @param {object}}
   * @return {void}
   */
  clickChangeEnv (e) {
    let index = e.currentTarget.dataset.index;
    // 切换环境
    app.testAutoChangeEnv(index).then(idx => {
      this.setData({
        envVersionIndex: idx
      });
      // 刷新页面
      this.onPullDownRefresh()
    })
  },

  /**
   * @description: 【自动切换环境】点击出现隐藏标签
   * @param {void}
   * @return {void}
   */
  clickEnvTab () {
    this.setData({
      testEnvTab: !this.data.testEnvTab
    })
  },

  /**
   * @description: 点击v+会员楼层按钮
   * @param {void}
   * @return {void}
   */
  onClickVip (e) {
    let { url = '', userAction = '' } = e.detail;
    if (url) {
      let traceId = this.data.pageDataTraceId
      if (isLogin()) {
        url &&
          wx.navigateTo({
            url:
              url.indexOf("?") > -1
                ? `/${url}&userAction=${encodeURIComponent(userAction)}`
                : `/${url}?userAction=${encodeURIComponent(
                  userAction
                )}&traceId=${encodeURIComponent(traceId) || ""}`,
            preObj: this.data.recommendObj,
            buried_position: {
              currentPageName: 'home_onClickVip_home'
            }
          });
      } else {
        wx.navigateTo({
          url: `/pages/newLogin/login/login&traceId=${encodeURIComponent(traceId) || ''}`,
          preObj: this.data.recommendObj,
          buried_position: {
            currentPageName: 'home_onClickVip_home'
          }
        })
      }
    } else {
      this.onTapMore()
    }
  },
  // 页面滚动
  pageScrollTo (e) {
    let { rectTop = 0, id = '' } = e.detail || {};
    let { top = 0, height = 0 } = this.data.capsule || {};
    if (rectTop) {
      wx.createSelectorQuery().selectViewport().scrollOffset((res) => {
        let scrollTop = res.scrollTop + rectTop - (top + height + 70);
        wx.pageScrollTo({
          scrollTop: scrollTop,
          duration: 100
        })
      }).exec()

    } else {
      wx.pageScrollTo({
        selector: id,
        duration: 100
      })
    }
  },
  testDrug () {
    wx.navigateTo({
      url: "/pages/channelNew/index?channelId=4051&channelBusiness=50",
      preObj: this.data.recommendObj,
      buried_position: {
        currentPageName: 'home_testDrug_home'
      }
    })
  },
  getToken () {
    const { functionId = '', appVersion = '' } = FNIDS.token;
    request({
      functionId,
      appVersion,
      body: {},
      pageId: (this.data.recommendObj && this.data.recommendObj.pageIdFirstPage) || "",
      preObj: this.data.recommendObj && this.data.recommendObj || {},
      method: "GET"
    }).then((res) => {
      // const { data: { } = {} } = res
      console.log(res)
    }).catch((v) => {
      console.log(v)
    })
  },
  getToRedpack () {
    wx.navigateTo({
      url: "/pages/communityRedpack/index",
      preObj: this.data.recommendObj,
      buried_position: {
        currentPageName: 'home_getToRedpack_home'
      }
    })
  },
  goShopCart () {
    wx.navigateTo({
      url: "/pages/shopCartList/index",
      preObj: this.data.recommendObj,
      buried_position: {
        currentPageName: 'home_goShopCart_home'
      }
    })
  },
  gotoMock () {
    // require('../../common/util/api.mock');
    // wx.navigateTo({
    //   url: "/pages/mockTools/index",
    // })
  },
  // 回传腰带交互类型
  beltBacktop (e) {
    this.setData({
      beltType: e.detail.beltType,
      isBeltData: e.detail.isBeltData
    })
    if (e.detail.beltType == 1) { // type为1，腰带常在
      this.setData({
        isBeltShow: true
      })
    } else if (e.detail.beltType == 2 && !this.data.isBeltShow) {
      // 滚动到feed条吸顶再显示
      this.setData({
        isBeltShow: false
      })
    }
  }
});
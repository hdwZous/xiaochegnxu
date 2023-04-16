/* eslint-disable */
import {
  reportPromote,
  getDaoJiaLocation
} from "../../../common/util/services";
// 埋点描述文件
// 请求
import {
  request,
  FNIDS
} from "../../../common/util/api"
import mp from "../../../common/util/wxapi";
import util from "../../../common/util/util";
import { isLogin } from "../../../common/util/loginUtil.js";
import { pvBuriedV2_, clickBuriedV2_ } from "../../../common/util/BI";
import { observeProxy, setProxy } from '../../../common/util/rewrite'
import { addFilterMsg, warn, error } from '../../../common/util/wxLog';
let app = getApp();
let globalData = app.globalData
// 当前时间（性能检测上报用）
let movTime = null;
let deviceid_pdj_jd = util.getUUIDMD5();
let loginInfo = wx.getStorageSync('login_info');
let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || '';
Page({
  // 埋点描述文件
  // 埋点上报参数
  buried: {
    userAction: '',
    activityId: '',
    roomId: '',
    getCouponResult: false,
    couponId: '',
    storeId: '',
    skuId: '',
    resType: '',
    urlParams: '',
  },
  // 页面的初始数据
  data: {
    // ab名称
    strategyName: '',
    // 楼层列表
    floorList: [],
    // 页面配置信息
    pageConfig: {},
    // 底部导航栏信息
    activityBtNavigaInfo: {},
    // 页面参数
    options: null,
    shareInfo: null,
    config: null,
    currentCouponInfo: null,
    // 无授权
    showLocDefault: 0,
    refreshFlag: false,
    // 默认页-默认页展示
    showDefault: false,
    // 默认页-类型length
    type: 0,
    // 默认页-提示
    tips: "",
    // 默认页-按钮
    btnText: "",
    // 返回顶部icon
    hideBackTop: true,
    // 是否还有分页
    lastPage: false,
    // 跳到门店页加车后需同步更新页面数据
    upDateGoods: null,
    pageOptions: {},
    flatCarInfo: null,
    // 扁平化动画
    pageMoving: false,
    isIphoneX: globalData.isIphoneX,
    isCart: false,
    isShowCart: false,
    isMedShowCart: false,
    shareMessageInfo: null, // 分享卡片的信息
    traceId: '',
    recommendObj:{
      currentPageName:'active'
    },
    refPar: {},
    self_page: 'active'
  },

  // 自定义数据
  scopeData: {
    currentPage: 1,
    // 助力券分享信息
    helpCouponShareMsg: {},
    // 曝光埋点对象
    exposureObj: null,
    // 【图片懒加载】实例对象
    LazyLoad: null,
    yetInitlay: false,
    requestTime: [],
    setDataTime: [],
    floor: [],
    floorStack: [],
    floorCount: 0
  },

  onShow() {
    if (this.data.refreshFlag) {
      // 获取地理位置
      this.handleLocation()
    }
    if (getApp().globalData.refreshHomeFlag) {
      getApp().globalData.refreshHomeFlag = false
      this.refresh(this.data.pageOptions)
    }
    this.globalshopcart()
    this.getQueryAllCartsNum()
  },

  //【生命周期】生命周期函数--监听页面初次渲染完成
  onReady() {

  },
  onUnload() {
    // 卸载曝光埋点和图片懒加载
    // this._disconnectBuriedAndImgLoad()
  },
  onHide() {
    // 卸载曝光埋点和图片懒加载
    // this._disconnectBuriedAndImgLoad()
  },

  // pv埋点
  pvFunc(params) {
    pvBuriedV2_({
      page_par: {
        activityId: this.data.options.activityId,
        ref_par: {
          traceId: this.data.recommendObj.preTraceId || "",
          userAction: this.data.recommendObj.preUserAction || "",
        }
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName,
      isBack:params
    })
    this.setData({
      refPar: {
        traceId: this.data.recommendObj.preTraceId || "",
        userAction: this.data.recommendObj.preUserAction || "",
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refresh(options)
    // wx.reportEvent && wx.reportEvent("wxdata_perf_monitor", {
    //   "wxdata_perf_monitor_id": 'dj_1',
    //   "wxdata_perf_monitor_level": 0,
    //   "wxdata_perf_error_code": 502,
    //   "wxdata_perf_error_msg": '基础监控-code0'
    // })
  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (e) {
    wx.showShareMenu({
      withShareTicket: true
    })
    let currentCouponInfo = this.data.currentCouponInfo;
    let config = this.data.config && this.data.config.shareInfo || {};
    let shareMessageInfo = this.data.shareMessageInfo || null
    const { options: { activityId = '' } = {} } = this.data;
    
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
          title: shareMessageInfo && shareMessageInfo.title || "京东到家",
          path: "/pages/home/home?type=12&activityId=" + activityId,
          imageUrl: shareMessageInfo && shareMessageInfo.imgeUrl || ''
        }
      }
    } else {
      // if (this.data.shareInfo) {
      //   return this.data.shareInfo
      // }
      return {
        title: shareMessageInfo && shareMessageInfo.title || "京东到家",
        path: "/pages/home/home?type=12&activityId=" + activityId,
        imageUrl: shareMessageInfo && shareMessageInfo.imgeUrl || ''
      }
    }
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
      this.hiddenBackTop()
      if (!this.data.hideBackTop) {
        this.setData({
          hideBackTop: true
        })
      }
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
  // 跳转全局购物车
  goShopCart() {
    wx.navigateTo({
      url: "/pages/shopCartList/index",
      preObj: this.data.recommendObj,
      buried_position: "active-goShopCart"
    })
  },

  onReachBottom() {
    if (!this.data.lastPage) {
      this.scopeData.currentPage += 1
      this.getActivityData(this.scopeData.currentPage)
    } else {
      clickBuriedV2_({
        click_id: 'show_bottom_text',
        click_par: {
          activityId: this.data.options.activityId,
          storeId: this.data.pageOptions.storeId
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        currentPageName: this.data.recommendObj.currentPageName,
        prePageName: this.data.recommendObj.prePageName
      })
    }
  },
  // 获取新活动页面数据
  getActivityData(currentPage) {
    mp.loading_cover()
    let { cityId = "", longitude = "", latitude = "", activityId = "" } = this.data.options || {};
    let { storeId = null } = this.data.pageOptions || {}
    let { functionId, appVersion } = FNIDS.globalActivity
    let requestStartTime = Date.now(); // 请求接口的时间
    if (!currentPage || !this.scopeData.currentPage || currentPage == 0) {
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'activity_currentPage',
        click_par: {
          currentPage: currentPage,
          time: Date.now(),
          storeId: storeId,
          scopeData: this.scopeData,
          pageOptions: this.data.pageOptions,
          options: this.data.options
        }
      })
      currentPage = 1
      this.scopeData.currentPage = 1
    }
    let query = {
      areaCode: cityId,
      downgradeInfo: "",
      longitude: longitude,
      activityId: activityId,
      currentPage: currentPage,
      coordType: "2",
      latitude: latitude,
      store_id: storeId,
      pageSource: this.data.recommendObj.pageSource,
      refPageSource: this.data.recommendObj.refPageSource,
      ref_par: {
        traceId: this.data.recommendObj.preTraceId || "",
        userAction: this.data.recommendObj.preUserAction || "",
      }
    }
    if (observeProxy.aheadRqFinish == null) {
      request({
        functionId,
        method: 'post',
        appVersion,
        isNeedDealError: true,
        body: query,
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        preObj: this.data.recommendObj
      }).then(res => {
        this.commonFunction(requestStartTime, currentPage, res)
      }).catch(() => {
        wx.reportMonitor(19, 20);
        addFilterMsg('activityListError')
        addFilterMsg(functionId)
        addFilterMsg(deviceid_pdj_jd)
        addFilterMsg(PDJ_H5_PIN)
        warn(query)
        // 异常
        this.dealRequestError(1, '服务异常，请稍后再试~', '重新加载')
      })
    } else if (observeProxy.aheadRqFinish == 'loading') {
      observeProxy.stack = this.commonFunction.bind(this, requestStartTime, currentPage)
    } else if (observeProxy.aheadRqFinish == 'finished') {
      let preLoad = observeProxy.preLoad
      setProxy(true)
      this.commonFunction(requestStartTime, currentPage, preLoad)
    }
  },

  commonFunction(requestStartTime, currentPage, res) {
    mp.hideLoading()
    if (res.data.code === '0') {
      let requestEndTime = Date.now(); // 接口返回的时间
      // 记录前两页的请求时长
      if (currentPage <= 2) {
        this.scopeData.requestTime.push({
          name: FNIDS.globalActivity,
          startTime: requestStartTime,
          endTime: requestEndTime,
          duration: requestEndTime - requestStartTime, // 请求耗时
          currentPage
        })
      }

      this.scopeData.floor = this.scopeData.floor.concat(res.data.result.data) // 拼接接口返回的数据
      let {
        setObj,
        needDelay,
        delay,
        delayObj,
        lastPage
      } = this.dealSetInfo(currentPage, res.data.result) // 整合处理数据

      // 计算setData时长
      let setStartTime = Date.now()
      if (setObj.pageConfig && setObj.pageConfig.actMixType) {
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "getActMixType",
          click_par: {
            actMixType: setObj.pageConfig.actMixType
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName
        });
      }
      this.setData(setObj, () => {
        if (currentPage <= 2) {
          let setEndTime = Date.now()
          this.scopeData.setDataTime.push({
            name: FNIDS.globalActivity,
            startTime: setStartTime,
            endTime: setEndTime,
            duration: setEndTime - setStartTime,
            currentPage
          })
        }
        // 活动页每次都直接请求两页数据，大部分情况下第一页下发数据很可能填不满一屏，故取第二次请求后的setData的时长作为首屏渲染完时间
        if (currentPage == 2 || (currentPage == 1 && lastPage)) {
          // let requestDuration = 0
          // let setDataDuration = 0
          // this.scopeData.requestTime.map(item => {
          //   requestDuration += item.duration
          // })
          // this.scopeData.setDataTime.map(item => {
          //   setDataDuration += item.duration
          // })
          // console.log('接口请求时长--', requestDuration)
          // console.log('set数组',this.scopeData.setDataTime)
          // console.log('set时长--', setDataDuration)
          // clickBuried_({
          //     click_id: "performance_second_init",
          //     click_par: {
          //         secondRenderRequest: {
          //             name: "secondRenderRequest",
          //             path: "pages/activity/homeFocus/index",
          //             entryType: "request",
          //             tab: "activity",
          //             request: this.scopeData.requestTime,
          //             totalDuration: requestDuration
          //         },
          //         secondRenderView: {
          //             totalDuration: setDataDuration,
          //             name: "secondRenderSet",
          //             path: "pages/activity/homeFocus/index",
          //             entryType: "setData",
          //             tab: "activity",
          //         }
          //     },
          // });
        }

        if (needDelay) {
          setTimeout(() => {
            this.setData(delayObj)
          }, delay);
        }
      });
      this.setData({
        traceId: this.data.traceId ? this.data.traceId : res.data.traceId
      })
      this.judgeDom(currentPage, lastPage)

      if (!this.scopeData.floor.length && lastPage) { // 无活动数据
        this.dealRequestError(4, '暂无活动，我们努力开拓中~')
      }
    } else { // 接口异常
      let { functionId } = FNIDS.globalActivity
      addFilterMsg('activityListError')
      addFilterMsg(functionId)
      addFilterMsg(deviceid_pdj_jd)
      addFilterMsg(PDJ_H5_PIN)
      this.dealRequestError(1, res.data.msg, '重新加载')
    }
  },

  dealSetInfo(currentPage, result = {}) {
    // 处理接口返回数据，根据页码合理返回set数据，减少首屏需要的set量，加快首屏渲染
    let setObj = {}, needDelay = false, delay = 1000, delayObj = {};
    let { config = {}, data = [], lastPage = false } = result;
    if (currentPage == 1) {
      let activityBtNavigaInfo = config.activityBtNavigaInfo || {}
      // 扁平化购物路径信息(普通购物车)
      let flatCarInfo = config.flatCarInfo || {}

      // 页面数据
      if (lastPage) {
        // 第一页即最后一页
        let setstr = `floorList[0]`, delaystr = '', setArray = data.slice(0, 10), delayArray = []
        // 数据大于10条，暂存
        if (data.length > 10) {
          needDelay = true
          this.scopeData.floorCount += 1
          delayArray = data.slice(10)
          delaystr = `floorList[${this.scopeData.floorCount}]`
          delayObj = {
            [delaystr]: delayArray
          }
        }
        // 要直接加载的数据
        setObj = {
          [setstr]: setArray,
          pageConfig: config,
          activityBtNavigaInfo,
          flatCarInfo,
          lastPage
        }
      } else {
        // 第一页楼层数据先暂存，待第二页数据返回后一起set
        this.scopeData.floorStack = data
        setObj = {
          pageConfig: config,
          activityBtNavigaInfo,
          flatCarInfo,
          lastPage
        }
      }

      let title = config && config.gloabTitle || ""
      // 设置title
      wx.setNavigationBarTitle({
        title: title
      })
    } else if (currentPage == 2) {
      let lists = this.scopeData.floorStack.concat(data) // 桥接多条数据
      this.scopeData.floorStack = []
      let setstr = `floorList[${this.scopeData.floorCount}]`, delaystr = '', setArray = lists.slice(0, 10), delayArray = []
      if (lists.length > 10) {
        needDelay = true
        this.scopeData.floorCount += 1
        delayArray = lists.slice(10)
        delaystr = `floorList[${this.scopeData.floorCount}]`
        delayObj = {
          [delaystr]: delayArray
        }
      }
      setObj = {
        [setstr]: setArray,
        lastPage
      }
    } else {
      this.scopeData.floorCount += 1
      let setstr = `floorList[${this.scopeData.floorCount}]`
      setObj = {
        [setstr]: data,
        lastPage
      }
    }
    return { setObj, needDelay, delay, delayObj, lastPage }
  },
  // 获取购物车数量信息
  getQueryAllCartsNum() {
    const { cityId = "", longitude = "", latitude = "", activityId = "" } = this.data.options || {};
    const { storeId = null } = this.data.pageOptions || {}
    const { functionId, appVersion } = FNIDS.queryAllCartsNum
    let query = {
      areaCode: cityId,
      downgradeInfo: "",
      longitude: longitude,
      activityId: activityId,
      coordType: "2",
      latitude: latitude,
      store_id: storeId,
      pageSource: "activityDetail",
      fromSource: '5'
    }
    request({
      functionId,
      method: 'post',
      appVersion,
      isNeedDealError: true,
      body: query,
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj
    }).then(res => {
      const { data } = res
      if (data.code == '0' && data.result && data.result.validTotalNum) {
        this.setData({
          isCart: data.result.validTotalNum > 0 ? true : false
        })
      } else {
        this.setData({
          isCart: false
        })
        addFilterMsg('activityQueryCartNum')
        addFilterMsg(functionId)
        addFilterMsg(deviceid_pdj_jd)
        addFilterMsg(PDJ_H5_PIN)
        warn(query)
      }
    }).catch((res) => {
      addFilterMsg('activityQueryCartNumCatch')
      addFilterMsg(functionId)
      addFilterMsg(deviceid_pdj_jd)
      addFilterMsg(PDJ_H5_PIN)
      warn(query)
    })
  },
  // AB实验-全局购物车
  globalshopcart() {
    const { functionId, appVersion } = FNIDS.abTest
    request({
      functionId,
      method: 'get',
      appVersion,
      body: {
        experimentName: 'WeChatglobalshopcart'
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj
    }).then(res => {
      const { data } = res
      if (data.code == 0) {
        this.setData({
          isShowCart: data.result.strategyName
        })
      }
    }).catch(res => {
      addFilterMsg('activityShopCart')
      addFilterMsg(functionId)
      addFilterMsg(deviceid_pdj_jd)
      addFilterMsg(PDJ_H5_PIN)
      console.log(res);
    })
  },
  // 刷新活动页源数据
  // onRefreshActivityHomeData(e) {
  //   console.log('onRefreshActivityHomeData', e.detail.data);
  //   for(let i = 0;i < this.data.floorList.length;i++) {
  //     this.data.floorList[i].map((item, index) => {
  //       if (item.floorId == e.detail.data.floorId) {
  //         this.data.floorList[i][index] = e.detail.data
  //         this.setData({
  //           floorList: this.data.floorList
  //         })
  //       }
  //     })
  //   }
  // },

  _UPDATEGOODSNUM(data) {
    // 加车后刷新购物车数量接口
    if (data.type == 'add') {
      this.getQueryAllCartsNum()
    }
    this.setData({ upDateGoods: data })
  },

  // 页面数据加载完之后，判断当前加载的数据是否铺满一屏，不够一屏继续请求接口
  judgeDom(currentPage, lastPage) {
    if (currentPage == 1 && !lastPage) {
      this.scopeData.currentPage += 1
      this.getActivityData(this.scopeData.currentPage)
    }
  },

  // 接口异常处理
  dealRequestError(type, tips, btnText) {
    this.setData({
      // 默认页-默认页展示
      showDefault: true,
      // 默认页-类型length
      type: type || '',
      // 默认页-提示
      tips: tips || "哎呀！太忙啦！请稍后再试~",
      // 默认页-按钮
      btnText: btnText || "",
    })
  },

  // 默认页监听点击按钮
  onDefaultBtnEvent() {
    this.getActivityData(this.scopeData.currentPage)
  },

  // 获取经纬度
  getAddress(options) {
    let activityId = options.activityId || options.id || '';
    let longitude = "";
    let latitude = "";
    let cityId = "";

    // 埋点信息
    this.buried.roomId = options.roomId || options.roomid || options.room_id || "";
    this.buried.urlParams = options || "";
    this.buried.activityId = options.activityId || "";
    options.userAction && (this.buried.userAction = decodeURIComponent(options.userAction));

    if (globalData.addressInfo.longitude && globalData.addressInfo.latitude) {
      longitude = globalData.addressInfo.longitude;
      latitude = globalData.addressInfo.latitude;
      cityId = globalData.addressInfo.cityId;
    } else {
      try {
        let addressInfo = wx.getStorageSync('address_info') || {};
        longitude = addressInfo.longitude || "";
        latitude = addressInfo.latitude || "";
        cityId = addressInfo.cityId || "";
      } catch (e) {
        // console.log(e);
      }
    }

    // 如果本地有经纬度
    if (longitude && latitude) {
      this.setData({
        showLocDefault: 1,
        options: {
          activityId: activityId,
          longitude: longitude,
          latitude: latitude,
          cityId: cityId
        }
      });
      this.getActivityData(this.scopeData.currentPage)
    } else {
      this.setData({
        options: {
          activityId: activityId,
        }
      })
      this.handleLocation()
    }
  },

  // 授权经纬度
  getLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          const latitude = res.latitude;
          const longitude = res.longitude;
          resolve({
            latitude,
            longitude
          })
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },

  // 获取经纬度详细信息
  handleLocation() {
    this.getLocation().then((res) => {
      getDaoJiaLocation({
        longitude: res.longitude,
        latitude: res.latitude,
      }, this.handleAddress)
    }).catch(err => { // 微信API获取授权信息失败
      let addressInfo = wx.getStorageSync('address_info') || {}
      if (addressInfo.latitude && addressInfo.longitude) {
        getDaoJiaLocation({
          longitude: addressInfo.longitude,
          latitude: addressInfo.latitude,
        }, this.handleAddress)
      } else {
        this.setData({
          locationError: err,
          showLocDefault: -1,
          refreshFlag: true
        })
      }
    })

  },

  // 地理位置异地提醒
  handleAddress(addressInfo) {
    if (addressInfo == null) {
      //定位失败，请重试
      this.setData({
        showLocDefault: -1
      })
    } else {
      // 异地地址切换提醒
      this.compareLocationWithOld(addressInfo, res => {
        globalData.addressInfo = res
        globalData.refreshHomeFlag = true // 回到首页后首页的地理位置更新
        app.saveAddress(res)
        // 更新活动ID
        let options = {
          longitude: addressInfo.longitude,
          latitude: addressInfo.latitude,
          cityId: addressInfo.cityId
        }
        this.setData({
          showLocDefault: 1,
          options: Object.assign({}, this.data.options, options)
        });
        this.getActivityData(this.scopeData.currentPage)
      })
    }
  },

  // 异地地址比较决定是否弹异地弹层
  compareLocationWithOld(targetAddress, fn) {
    let localAddressInfo = wx.getStorageSync('address_info');
    if (localAddressInfo) { // 本地缓存有地址
      let dif_address_flag = wx.getStorageSync('dif_address_flag') || '';
      let date = new Date();
      let today = date.getFullYear() + '' + (date.getMonth() + 1) + '' + date.getDate();
      let localCityId = localAddressInfo && localAddressInfo.cityId || '';
      if (getApp().globalData.needCheckLocationChange) { // 需要提示切换地址
        if (localCityId != targetAddress.cityId && dif_address_flag != today && targetAddress.cityName) { // 异地
          wx.showModal({
            title: '地址提示',
            content: `定位到你在${targetAddress && targetAddress.cityName || ''}是否切换到该城市?`,
            success(res) {
              if (res.confirm) { // 目标地址
                fn(targetAddress)
              } else if (res.cancel) { // 原来地址
                fn(localAddressInfo)
              }
            },
            complete() {
              wx.setStorageSync('dif_address_flag', today)
            }
          })
        } else { // 原来地址
          if (localCityId == targetAddress.cityId) {
            fn(targetAddress)
          } else {
            fn(localAddressInfo)
          }
        }
      } else { // 不需要提示切换地址
        fn(localAddressInfo)
      }
    } else { // 第一次进入
      fn(targetAddress)
    }
  },


  // 监听组件事件
  componentEvent(e) {
    let type = e.detail.type
    let data = e.detail.data
    if (type === "helpCouponShareInfo") { //助力券信息
      this.setData({
        shareInfo: data.helpCouponShareInfo,
        currentCouponInfo: data.currentCouponInfo,
      })
    } else if (type == 'config') {
      this.setData({
        config: data.config
      })
    }
  },
  // 获取分享信息
  fetchShareInfo() {
    let { functionId = "", appVersion = "" } = FNIDS.getCouponShareInfo || {};
    let addressInfo = wx.getStorageSync("address_info") || {}
    let query = {
      "type":"activity",
      "packageVersion":2,
      "activityId": this.data.options && this.data.options.activityId || '',
      "latitude": addressInfo.latitude || '',
      "longitude":addressInfo.longitude || '',
      "address":addressInfo.poi || '',
      "ctp":"active",
      "pageSource":"activityDetail"
    }
    request({
      functionId,
      appVersion,
      body: query,
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      isNeedDealError: true,
      isForbiddenDialog: true,
      preObj: this.data.recommendObj
    }).then(res => {
      let { code, result } = res.data || {}
      if (code == 0 && result && result.qq) {
        if (result.qq.miniProgram) {
          this.setData({
            shareMessageInfo: result.qq.miniProgram
          })
        } else {
          this.setData({
            shareMessageInfo: null
          })
        }
      } else {
        // wx.reportMonitor(17, 20);
        addFilterMsg('activityShare')
        addFilterMsg(functionId)
        addFilterMsg(deviceid_pdj_jd)
        addFilterMsg(PDJ_H5_PIN)
        warn(query)
      }
    }).catch(err => {
      wx.reportMonitor(18, 20);
      addFilterMsg('activityShare')
      addFilterMsg(functionId)
      addFilterMsg(deviceid_pdj_jd)
      addFilterMsg(PDJ_H5_PIN)
      warn(query)
      this.setData({
        shareMessageInfo: null
      })
    })
  },
  // 刷新页面
  refresh(options) {
    if (options.dj_par_key) {
      let qrCode = app.globalData.qrcode
      let shareInfo = {
        title: qrCode.shareTitle,
        imageUrl: qrCode.shareImgUrl,
        path: `pages/home/home?scene=${options.dj_par_key}`
      }
      this.setData({
        shareInfo
      })
    }
    if (options.isBanShare == 1) {
      wx.hideShareMenu({
        menus: ['shareAppMessage', 'shareTimeline']
      })
    }
    // 初始化数据
    this.setData({
      'strategyName': '',
      'floorList': [],
      'pageConfig': {},
      'showDefault': false,
      'hideBackTop': true,
      'lastPage': false,
      'pageOptions': options
    })
    this.scopeData.currentPage = 1
    // 实例化曝光埋点和图片懒加载
    this.getAddress(options)
    // 判断是否为医药，控制是否隐藏全局购物车
    this.setData({
      isMedShowCart: this.data.isMed ? false : true
    })
    this.fetchShareInfo()
    if (options.pushUserId && isLogin()) {
      reportPromote({
        pushUserId: options.pushUserId || "",
        business: options.business || "",
      });
    }
  },

  // 监听好友助力分享信息
  onShareMsg(e) {
    let { chat = {} } = e.detail.data || {};
    this.scopeData.helpCouponShareMsg = chat
  },

  /**
   * @description: 卸载曝光埋点和图片懒加载
   * @param {Void} 
   * @return {Void} 
   */
  _disconnectBuriedAndImgLoad() {
    // 卸载监听曝光埋点
    // this.scopeData.exposureObj && this.scopeData.exposureObj.disconnectObserver && this.scopeData.exposureObj.disconnectObserver();
    // 卸载监听图片懒加载
    // this.scopeData.LazyLoad && this.scopeData.LazyLoad.disconnectObserver && this.scopeData.LazyLoad.disconnectObserver();
  },

  /** <<====================
   * 老活动页埋点 TODO: start
   */
  shareMomentBury(e) {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "ClickShareMoments",
      click_par: {
        activityId: e.detail.activityId || "",
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    });
  },
  allClickBury(e) {
    if (e.detail.type == 'get_coupon_result') {
      this.getCouponResult(e.detail.data)
    } else if (e.detail.type == 'ClickAssistCoupon') {
      this.clickAssistCoupon(e.detail.data)
    } else if (e.detail.type == 'unflod_shop_act') {
      this.unflodShopAct(e.detail.data)
    } else if (e.detail.type == 'click_sku') {
      this.clickSku(e.detail.data)
    } else if (e.detail.type == 'bannerlist') {
      this.bannerList(e.detail.data)
    }
  },
  getCouponResult(data) {
    this.buried.activityId = data.activityId || ''
    this.buried.couponId = data.couponId || ''
    this.buried.getCouponResult = data.getCouponResult || ''
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "get_coupon_result",
      click_par: {
        getCouponResult: data.getCouponResult || "",
        couponId: data.couponId || '',
        activityId: data.activityId || ''
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    });
  },
  clickAssistCoupon(data) {
    this.buried.userAction = data.userAction || ''
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "ClickAssistCoupon",
      click_par: {
        userAction: data.userAction || ''
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    });
  },
  unflodShopAct(data) {
    this.buried.activityId = data.activityId || ''
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "unflod_shop_act",
      click_par: {
        activityId: data.activityId || ''
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    });
  },
  clickSku(data) {
    this.buried.storeId = data.storeId || ''
    this.buried.skuId = data.skuId || ''
    this.buried.userAction = data.userAction || ''
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "click_sku",
      click_par: {
        storeId: data.storeId || '',
        userAction: data.userAction || '',
        skuId: data.skuId || '',
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    });
  },
  bannerList(data) {
    this.buried.activityId = data.activityId || ''
    this.buried.resType = data.resType || ''
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "bannerlist",
      click_par: {
        storeId: data.activityId || '',
        userAction: data.resType || '',
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    });
  },
  shareBury(data) {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "ClickShareFriend",
      click_par: {
        activityId: data.activityId || "",
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    });
  },

  /** ====================>>
   * 老活动页埋点 TODO: end
   */
})
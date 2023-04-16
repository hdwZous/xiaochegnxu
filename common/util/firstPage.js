const backupPage = Page;
const backComponent =  Component;
import { transferExposureData, reportAllExposureData,clickBuriedV2_} from './BI';
import Newexposure from './newexpos';
import util from './util'
import { isLogin } from "./loginUtil"
import { routeMapName} from './routeMapName';
import { getPrePageName,getPrePageSource,handleMaskFunc,getMaskOpenPageNameAndPageSourceV2} from "./bi/utils";
import emitter from './events'
import djBus from "./djBus.js"
import djHalfMaskNameArr from './halfMaskName'
import firstBi from "./firstBi.js"

Page = (config) => {
  const app = getApp();
  const old = config.onLoad;
  const oldOnHide = config.onHide;
  const oldPageScroll = config.onPageScroll;
  const oldOnReady = config.onReady;
  const oldOnUnload = config.onUnload;
  const oldOnShow = config.onShow;
  let mpChannel = app.globalData.mpChannel;

  console.log("进入firstPage-onload");

  // 根据code 查询接口type
  // 重写onLoad
  config.onLoad = function(opts) {
    try { firstBi.onload(this, opts) } catch (error) {} 


    // 初始化全局曝光
    if (config.exposureObj && config.exposureObj.selector) {
      this.data.newExposure = new Newexposure(
        this,
        config.exposureObj.selector
      );
    }
    
    getApp().globalData.isAppShow = false// 更改onShow标识值
    getApp().globalData.isAppLaunch = false// 更改onLaunch标识值
  
    this.recommendObj_isFirstShow = ''
    this.pageHalfMaskArr = []
  

    app.globalData.isFirstPageFlag = true;

    // 处理h5跳转过来的extraParams参数
    if (opts.extraParams) {
      if (typeof opts.extraParams == "object") {
        getApp().globalData.H5extraParams = opts.extraParams;
      } else {
        getApp().globalData.H5extraParams = JSON.parse(opts.extraParams);
      }
    }

    
    // 处理页面曝光
    old && old.call(this, opts);

    try {
      let {JumpLoginByLaunch = -1, type = null} = opts;
      if(!isLogin() && JumpLoginByLaunch == 1 && this.route) {
        if(this.route.includes('home/home') && (type == 9 || !type) && !opts.qrCodeId){
          // 首页跳登录页
          let preObj = this && this.data && this.data.recommendObj || {}
          util.toLogin(preObj)
        } else if(!this.route.includes('home/home')) {
          // 目标页跳登录页 || 直接投放本页
          let preObj = this && this.data && this.data.recommendObj || {}
          util.toLogin(preObj)
        }
      }
    } catch(e) {

    }
  };
  // 重写onShow
  config.onShow = function(opts) {
    try { firstBi.onshow(this, opts) } catch (error) {} 
    const _this = this
    // 重置防连跳转标识
    app.globalData.allowJump = false;
    
    oldOnShow && oldOnShow.call(this, opts);
  };
  // 重写onhide
  config.onHide = function(opts) {
    try { firstBi.onhide(this, opts) } catch (error) {} 
    const _this = this
   
    //上报所有埋点
    reportAllExposureData();
    // 在页面跳转后，重置标识别
    app.globalData.isBackToFront = false;
    oldOnHide && oldOnHide.call(this, opts);
  };

  // 重写onReady
  config.onReady = function (opts) {
    oldOnReady && oldOnReady.call(this, opts);
    let pageList = getCurrentPages();
    let route =
      (pageList && pageList.length && pageList[pageList.length - 1].route) ||
      "";
    app.globalData.currentOnReadyTime = {
      route,
      startTime: Date.now(),
    };
  };

  // 重写onUnload
  config.onUnload = function (opts) {
    try { firstBi.onunload(this, opts) } catch (error) {} 
    this.data.newExposure &&
      this.data.newExposure.disconnectObserver &&
      this.data.newExposure.disconnectObserver();
    //上报所有埋点
    reportAllExposureData();
    oldOnUnload && oldOnUnload.call(this);
  };

  // onPageScroll
  config.onPageScroll = function (e) {
    oldPageScroll && oldPageScroll.call(this, e);
    if (app.globalData.isFirstPageFlag) {
      app.globalData.isFirstPageFlag = false;
    }
  };

  // 定义曝光init方法
  config.exposureInit = function () {
    this.data.newExposure &&
      this.data.newExposure.initObserver &&
      this.data.newExposure.initObserver();
  };

  return backupPage(config);
};

Component = (config) => {
  // 定义监听节点方法
  const interSection = function (that) {
    that.data.lazyRefQuery = that.createIntersectionObserver();
    that.data.lazyRefQuery
      .relativeToViewport()
      .observe(config.lazyObj.selector, function (res) {
        if (res && res.intersectionRatio > 0) {
          that.setData({ hookLazy: true });
          disconnect(that);
        }
      });
  };

  // 清除定时器及时间戳
  const clearExposure = function (that, onlyTag) {
    if (
      that.data.epDatabase[onlyTag] &&
      that.data.epDatabase[onlyTag].actuatorFunc
    ) {
      clearTimeout(that.data.epDatabase[onlyTag].actuatorFunc);
    }
    that.data.epDatabase[onlyTag] = null;
  };

  // 定义卸载监听方法
  const disconnect = function (that) {
    that.data.lazyRefQuery &&
      that.data.lazyRefQuery.disconnect &&
      that.data.lazyRefQuery.disconnect();
  };

  // 定义卸载监听方法
  const epDisconnect = function () {
    config.lazyObj &&
      config.lazyObj.epQuery &&
      config.lazyObj.epQuery.disconnect &&
      config.lazyObj.epQuery.disconnect();
  };

  // 重写生命周期
  const oldReady = config.ready || undefined;
  const oldDetach = config.detached || undefined;
  const oldMethods = config.methods || {};
  const oldonLoad = config.methods && config.methods.onLoad || undefined
  const oldonShow = config.methods && config.methods.onShow || undefined
  const oldonHide = config.methods && config.methods.onHide || undefined
  const minxs = {
    // 定义曝光监听方法
    epSection() {
      const that = this;
      this.data.epDatabase = {};
      config.lazyObj.epQuery = this.createIntersectionObserver({
        thresholds: [0.5],
        observeAll: true,
      });
      config.lazyObj.epQuery
        .relativeToViewport()
        .observe(config.lazyObj.epSelector, function (res) {
          /* 出现在屏幕中时将出现的时间记录在lazyObj，设置1s定时器触发上报函数，假如滑动过快立马划出屏幕，根据组件id标识
        判断两次时间差，在1s中内的需要清除掉定时器及时间戳
        停留1s或以上时长则上报埋点，并将定时器消除
        */
          let {
            userAction = "",
            traceId = "",
            pageId = "",
            currentPageName = "",
            prePageName = "",
            noNeedExposure = false,
          } = res.dataset;
          let lazyObj = JSON.stringify(config.lazyObj);
          // console.log("lazyObj--config------", lazyObj);
          // console.log('----that.data------',noNeedExposure)
          if (noNeedExposure === true) return;
          if (res && res.intersectionRatio >= 0.5) {
            // 记录出现时间
            if (
              that.data.epDatabase[userAction] &&
              that.data.epDatabase[userAction].actuatorFunc
            ) {
              clearExposure(that, userAction);
            }
            that.data.epDatabase[userAction] = {
              observeTimes: res.time,
              actuatorFunc: setTimeout(() => {
                // console.log("traceId", traceId);
                // console.log("userAction", userAction);
                // console.log("currentPageName", currentPageName);
                // console.log("prePageName", prePageName);
                transferExposureData({
                  userAction,
                  traceId,
                  create_time: new Date(),
                  clienttime: Date.now(),
                  pageId,
                  currentPageName,
                  prePageName,
                  lazyObj,
                });
                clearExposure(that, userAction);
              }, 1000),
            };
          } else {
            if (
              that.data.epDatabase[userAction] != null &&
              res.time - that.data.epDatabase[userAction].observeTimes < 1000 &&
              that.data.epDatabase[userAction].actuatorFunc
            ) {
              clearExposure(that, userAction);
            }
          }
        });
    },
  };
  const taro = {
    onLoad(options) {
      if (this.$component && this.$component.$componentType == "PAGE") {
        // try { firstBi.onload(this, options) } catch (error) {}
        getApp().globalData.isAppShow = false// 更改onShow标识值
        getApp().globalData.isAppLaunch = false// 更改onLaunch标识值
        console.log('taro_onload修改isAppShow缓存');

        try {
          clickBuriedV2_({
            create_time: new Date(),
            click_id: "test_taro_onload",
            click_par: {
              isAppShow: getApp().globalData.isAppShow
            }
          });
        } catch (e) {

        }

      }
      oldonLoad && oldonLoad.call(this, options)
    },
    onShow(options) {
      if (this.$component && this.$component.$componentType == "PAGE") {
        // try { firstBi.onshow(this) } catch (error) {}
      }
      oldonShow && oldonShow.call(this, options)
    },
    onHide(options) {
      if (this.$component && this.$component.$componentType == "PAGE") {
        // try { firstBi.onhide(this) } catch (error) {}
      }
      oldonHide && oldonHide.call(this, options)
    }
  }

  config.ready = function () {
    // 懒加载方法
    if (config.lazyObj && config.lazyObj.selector) {
      this.data.lazyRefQuery = null;
      interSection(this);
    }
    // 曝光方法
    if (config.lazyObj && config.lazyObj.epSelector) {
      config.lazyObj.epQuery = null;
      this.epSection();
    }
    oldReady && oldReady.call(this);
  };

  config.detached = function () {
    disconnect(this)
    epDisconnect()
    oldDetach && oldDetach.call(this)
  }

  config.methods = Object.assign({}, oldMethods, minxs, taro)
  return backComponent(config)
}

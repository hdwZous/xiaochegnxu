import { request, FNIDS } from "../../../common/util/api";
import mp from '../../../common/util/wxapi'
import {
  isLogin,
  goToLogin
} from "../../../common/util/loginUtil"
import {
  getDaoJiaLocation
} from '../../../common/util/services'
import {
  djCmsJump
} from '../../../common/util/agreementV2.js'
import { updateGoodsNum } from "../../../common/util/carService";
import util from '../../../common/util/util'
import { clickBuriedV2_, pvBuriedV2_ } from "../../../common/util/BI.js";
import { addFilterMsg, error } from "../../../common/util/wxLog";
import djBus from "../../../common/util/djBus";
let app = getApp()
Page({
  scopeData: {
    backupDisplayFilterFloor: [],
    options: {},
  },
  data: {
    // 请求入参
    couponId: "",
    storeId: "",
    orgCode: "",
    skus: [],
    activityCode: "",
    markState: "",
    refPageSource: "",
    channel: "couponGo",
    keyword: "",
    sortType: 0,
    filterList: [],

    showLoading: true,
    type: 0,
    tips: "",
    btnText: "",
    defaultSrc:
      "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png",

    // 购物车相关
    refreshMiniCartData: false, // 刷新mini购物车
    catAnimation: false, // 执行购物车动画
    toggle: false, //多规格商品的spu选择器
    spuData: {},
    reachedTheLimit: false, // 是否达到限购
    limitFlag: 0, // 是否弹过限购弹层
    limitPop: {}, // 限购弹层的信息
    msg: "", // 限购弹的提示
    bottomDiff: [], // 小黄条文案信息

    // 页面展示逻辑
    isFirstLoad: true, // 是否初次请求页面接口
    locationError: {},
    showLocDefault: false, // 是否展示默认地址页
    busiCode: "", // 领券结果 0、1成功， 2失败
    responseList: [], // 券列表
    storeList: [], // 门店列表
    categorys: [], // 分类list
    categoryId: 0, // 锚中分类的标识
    products: [], // 商品list
    from: "", // 券购页点击搜索跳转自己的标识
    strickTop: "", // 吸顶距离
    opacity: 0.06,
    scrollTop: 0,
    isShowFilter: false, // 是否展示了筛选蒙层
    capsule: {}, // 胶囊信息
    screenShow: false, // 是否展示筛选按钮
    sideslip: false, // 是否横划教育
    showStoreMove: false,
    showTipMove: false,
    // 8.9外露筛选项
    displayFilterFloor: [],
    // 筛选项弹层
    screen: {},
    orderType: "",
    priceFilter: [],
    sortModal: false,
    categoryModal: false,
    storeTraceId: "", // 埋点需要
    goodTraceId: "", // 埋点需要
    curStoreIndex: 0, // 当前选中的门店下标
    isCart: true,
  },
  onLoad(options) {
    if (!/\d+/.test(options.skuIds)) {
      options.skuIds = JSON.stringify([]);
    }
    this.scopeData.options = options;
    let limitFlag = wx.getStorageSync("limitFlag") || 0;
    let sysInfo = wx.getSystemInfoSync() || {};
    let capsule = util.getCapsule(sysInfo); // 获取胶囊高度
    options.skuIds = decodeURIComponent(options.skuIds);
    if (options.orgCode == "undefined" || options.orgCode == "null") {
      options.orgCode = "";
    }
    if (options.storeId == "undefined" || options.storeId == "null") {
      options.storeId = "";
    }
    this.setData(
      {
        capsule,
        strickTop: capsule.top + capsule.height || 0,
        options: options,
        refPageSource: options.refPageSource || "",
        storeId: options.storeId || "",
        orgCode: options.orgCode || "",
        markState: options.markState || 3,
        skuIds: (options.skuIds && JSON.parse(options.skuIds)) || [],
        keyword: options.keyword || "",
        activityCode: options.code || "",
        from: options.from || "",
        limitFlag: limitFlag,
        couponId: options.couponId || options.limitId || "",
        userAction: options.userAction
          ? decodeURIComponent(options.userAction)
          : "",
      },
      () => {
        if (options.storeId && options.orgCode) {
          this.setData({
            refreshMiniCartData: !this.data.refreshMiniCartData,
          });
        }
      }
    );
  },
  onReady() {},
  onShow() {
    if (!this.data.isFirstLoad) return;
    this.getLocation()
      .then(() => {
        this.setData({
          showLocDefault: false,
        });
        if (this.data.from == "self") {
          this.couponResult();
        } else {
          this.pageLoad();
        }
        // if (isLogin()) {
        //   this.setData({
        //     showLocDefault: false,
        //   });
        //   if (this.data.from == "self") {
        //     this.couponResult();
        //   } else {
        //     this.pageLoad();
        //   }
        // } else {
        //   wx.navigateTo({
        //     url: `/pages/newLogin/login/login`,
        //     preObj: this.data.recommendObj,
        //     buried_position: {
        //       key: "couponGo-onShow",
        //       options: this.data.options,
        //     },
        //   });
        // }
      })
      .catch(() => {});
  },
  onHide() {},
  onUnload() {
    wx.setStorageSync("limitFlag", 0);
  },
  onPageScroll(e) {
    let scrollTop = e.scrollTop;
    let opacity = 0;
    if (scrollTop <= 60) {
      scrollTop = e.scrollTop <= 30 ? scrollTop : 30;
      opacity = 0.06 - scrollTop / 500;
      this.setData({
        opacity,
        showStoreMove: false,
        showTipMove: false,
      });
    }
  },
  onShareAppMessage() {
    return {
      title: "京东到家",
      path: `/pages/purchTicket/couponGo/index?refPageSource=${
        this.data.options.refPageSource
      }&storeId=${this.data.options.storeId}&orgCode=${
        this.data.options.orgCode
      }&markState=${this.data.options.markState}&skuIds=${
        this.data.options.skuIds
      }&code=${this.data.options.code}&keyword=${
        this.data.options.keyword || ""
      }&from=${this.data.options.from || ""}&couponId=${
        this.data.options.couponId
      }`,
    };
  },
  onReachBottom() {
    this.scopeData.pageNum = this.scopeData.pageNum + 1;
    if (this.scopeData.pageNum < this.scopeData.totalPage) {
      this.setData({
        products: this.data.products.concat(
          this.scopeData.cacheList[this.scopeData.pageNum]
        ),
      });
    }
  },
  pvFunc(back) {
    pvBuriedV2_({
      page_par: {
        storeId: this.data.storeId || "",
        orgCode: this.data.orgCode || "",
        markState: this.data.markState || "",
        activityCode: this.data.activityCode || "",
        couponId: this.data.couponId || "",
        from: this.data.from || "",
        keyword: this.data.keyword || "",
        ref_par: {
          traceId: this.data.recommendObj.preTraceId || "",
          userAction: this.data.recommendObj.preUserAction || "",
        },
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      isBack: back || "",
    });
    this.setData({
      refPar: {
        userAction: this.data.recommendObj.preUserAction,
        traceId: this.data.recommendObj.preTraceId,
      },
    });
  },
  // 券购页逻辑
  pageLoad() {
    this.fetchCoupon()
      .then((res) => {
        this.setData({
          busiCode: res.busiCode,
          responseList: res.responseList,
          isFirstLoad: false,
          showLoading: false,
          couponId:
            (res.responseList.length > 0 && res.responseList[0].couponId) || "",
          msg: res.busiCode == "0" ? res.toast : "",
        });
        // 领券toast消失
        let timer = setTimeout(() => {
          clearTimeout(timer);
          this.setData({ msg: "" });
        }, 2000);
        // 请求门店
        this.fetchStores()
          .then((res) => {
            this.setData(
              {
                storeList: res || [],
                orgCode:
                  (res.length > 0 && res[0].orgCode) || this.data.orgCode, // 请求分类和商品接口需要orgCode
                storeId:
                  (res.length > 0 && res[0].stationNo) || this.data.storeId, // 请求分类和商品接口需要storeId
              },
              () => {
                this.fetchCategoryAndGoods(res); // 请求分类和商品
                this.fetchPriceDiff(); // 底部小黄条文案
                this.maidian("selectTab", {
                  keyword: this.data.keyword || "",
                  activityCode: this.data.activityCode || "",
                  couponId: this.data.couponId || "",
                  storeId:
                    (this.data.storeList &&
                      this.data.storeList.length &&
                      this.data.storeList[0].stationNo) ||
                    "",
                  isLayer: "0",
                  state: "0",
                  traceId: this.data.storeTraceId || "",
                });
              }
            );
            // 刷新mini购物车，进来没有orgCode的时候，走接口的来刷新购物车。
            if (
              (!this.data.options.orgCode && res.length > 0 && res[0].orgCode) ||
              (!this.data.options.storeId && res.length > 0 && res[0].stationNo)
            ) {
              this.setData({
                refreshMiniCartData: !this.data.refreshMiniCartData,
              });
            }
          })
          .catch((err) => {
            this.setData({
              storeList: null,
              type: 7,
              btnText: "重新加载",
              tips: (err.data && err.data.msg) || "当前位置暂无可用门店",
            });
          });
      })
      .catch(() => {
        // 接口失败，跳转券列表 展示券失败页面
        this.setData({
          busiCode: 2,
          isFirstLoad: false,
          showLoading: false,
        });
      });
  },
  // 券购结果落地页逻辑
  couponResult() {
    // 请求门店
    this.fetchStores()
      .then((res) => {
        this.setData({
          busiCode: "1",
          isFirstLoad: false,
          showLoading: false,
          storeList: res || [],
          orgCode: (res.length > 0 && res[0].orgCode) || this.data.orgCode, // 请求分类和商品接口需要orgCode
          storeId: (res.length > 0 && res[0].stationNo) || this.data.storeId, // 请求分类和商品接口需要storeId
        });
        // 根据筛选、排序、门店、搜索关键字等刷新商品列表
        this.fetchGoods();
        this.fetchPriceDiff(); // 底部小黄条文案
      })
      .catch((err) => {
        this.setData({
          busiCode: "1",
          storeList: null,
          showLoading: false,
          type: 7,
          btnText: "重新加载",
          tips: (err.data && err.data.msg) || "当前位置暂无可用门店",
        });
      });
  },
  // 获取地理授权信息
  getLocation() {
    let self = this;
    return new Promise((resolve, reject) => {
      if (app.globalData.addressInfo.longitude) {
        resolve();
        return;
      }
      wx.getLocation({
        type: "wgs84",
        success(res) {
          getDaoJiaLocation(
            {
              longitude: res.longitude,
              latitude: res.latitude,
            },
            self.handleAddress
          );
          resolve();
        },
        fail(err) {
          self.setData({
            locationError: err,
            showLocDefault: true,
          });
          reject(err);
        },
      });
    });
  },
  // 获取地址信息
  handleAddress(addressInfo) {
    if (addressInfo != null) {
      app.globalData.addressInfo = addressInfo;
      app.globalData.refreshHomeFlag = true;
      app.saveAddress(addressInfo);
    }
  },
  // 领券来判断加载不同页面
  fetchCoupon() {
    mp.loading_cover();
    let {
      pageIdFirstPage,
      pageSource,
      refPageSource,
      preUserAction,
      preTraceId,
    } = this.data.recommendObj || {};
    return new Promise((resolve, reject) => {
      request({
        isForbiddenDialog: true,
        isNeedDealError: true,
        ...FNIDS.couponGoGrab,
        method: FNIDS.couponGoGrab.method || "POST",
        body: {
          channel: this.data.channel,
          markState: this.data.markState,
          code: this.data.activityCode,
          storeNo: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          skuIds: this.data.skuIds,
          pageSource: pageSource || "couponGoodsList",
          refPageSource: refPageSource || "",
          ref_par: {
            userAction: preUserAction || "",
            traceId: preTraceId || "",
          },
          pageName: "couponGoodsList",
        },
        pageId: pageIdFirstPage,
        preObj: this.data.recommendObj || {},
      })
        .then((res) => {
          mp.hideLoading();
          let { code, result } = res.data;
          if (code == 0) {
            resolve(result);
          } else {
            reject(res);
            let deviceid_pdj_jd = util.getUUIDMD5();
            let loginInfo = wx.getStorageSync("login_info");
            let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
            wx.reportMonitor(3, 20);
            let logParams = {
              appVersion: FNIDS.couponGoGrab.appVersion,
              channel: this.data.channel,
              markState: this.data.markState,
              code: this.data.activityCode,
              storeNo: this.data.storeId || "",
              orgCode: this.data.orgCode || "",
              skuIds: this.data.skuIds,
              options: this.scopeData.options,
              refPageSource:
                this.data.recommendObj && this.data.recommendObj.refPageSource,
              globalAddressInfo: app.globalData.addressInfo,
              res: res,
              pin: PDJ_H5_PIN,
            };
            addFilterMsg("couponGoGrabCouponCodeError");
            addFilterMsg(
              FNIDS.couponGoGrabCoupon && FNIDS.couponGoGrabCoupon.functionId
            );
            addFilterMsg(deviceid_pdj_jd);
            addFilterMsg(PDJ_H5_PIN);
            error(JSON.stringify(logParams));
          }
        })
        .catch((err) => {
          mp.hideLoading();
          reject(err);
          let deviceid_pdj_jd = util.getUUIDMD5();
          let loginInfo = wx.getStorageSync("login_info");
          let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
          wx.reportMonitor(3, 20);
          let logParams = {
            appVersion: FNIDS.couponGoGrab.appVersion,
            channel: this.data.channel,
            markState: this.data.markState,
            code: this.data.activityCode,
            storeNo: this.data.storeId || "",
            orgCode: this.data.orgCode || "",
            skuIds: this.data.skuIds,
            options: this.scopeData.options,
            refPageSource:
              this.data.recommendObj && this.data.recommendObj.refPageSource,
            globalAddressInfo: app.globalData.addressInfo,
            err: err && err.toString(),
            pin: PDJ_H5_PIN,
          };
          addFilterMsg("couponGoGrabCouponCatchError");
          addFilterMsg(
            FNIDS.couponGoGrabCoupon && FNIDS.couponGoGrabCoupon.functionId
          );
          addFilterMsg(deviceid_pdj_jd);
          addFilterMsg(PDJ_H5_PIN);
          error(JSON.stringify(logParams));
        });
    });
  },
  // 门店列表
  fetchStores() {
    let {
      pageIdFirstPage,
      pageSource,
      refPageSource,
      preUserAction,
      preTraceId,
    } = this.data.recommendObj || {};
    return new Promise((resolve, reject) => {
      request({
        isForbiddenDialog: true,
        isNeedDealError: true,
        ...FNIDS.couponGoStoreList,
        method: FNIDS.couponGoStoreList.method || "POST",
        body: {
          couponId: this.data.couponId || "",
          stationNo: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          pageSource: pageSource || "couponGoodsList",
          refPageSource: refPageSource || "",
          ref_par: {
            userAction: preUserAction || "",
            traceId: preTraceId || "",
          },
        },
        pageId: pageIdFirstPage,
        preObj: this.data.recommendObj || {},
      })
        .then((res) => {
          let { code, result, traceId } = res.data;
          this.setData({
            storeTraceId: traceId,
          });
          if (code == 0) {
            resolve(result);
          } else {
            reject(res);
            let deviceid_pdj_jd = util.getUUIDMD5();
            let loginInfo = wx.getStorageSync("login_info");
            let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
            wx.reportMonitor(5, 20);
            let logParams = {
              appVersion: FNIDS.couponGoStoreList.appVersion,
              channel: this.data.channel,
              markState: this.data.markState,
              code: this.data.activityCode,
              storeNo: this.data.storeId || "",
              orgCode: this.data.orgCode || "",
              skuIds: this.data.skuIds,
              options: this.scopeData.options,
              refPageSource:
                this.data.recommendObj && this.data.recommendObj.refPageSource,
              globalAddressInfo: app.globalData.addressInfo,
              res: res,
              pin: PDJ_H5_PIN,
            };
            addFilterMsg("v8ApplyStoreListCodeError");
            addFilterMsg(
              FNIDS.couponGoStoreList && FNIDS.couponGoStoreList.functionId
            );
            addFilterMsg(deviceid_pdj_jd);
            addFilterMsg(PDJ_H5_PIN);
            error(JSON.stringify(logParams));
          }
        })
        .catch((err) => {
          reject(err);
          let deviceid_pdj_jd = util.getUUIDMD5();
          let loginInfo = wx.getStorageSync("login_info");
          let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
          wx.reportMonitor(5, 20);
          let logParams = {
            appVersion: FNIDS.couponGoStoreList.appVersion,
            channel: this.data.channel,
            markState: this.data.markState,
            code: this.data.activityCode,
            storeNo: this.data.storeId || "",
            orgCode: this.data.orgCode || "",
            skuIds: this.data.skuIds,
            options: this.scopeData.options,
            refPageSource:
              this.data.recommendObj && this.data.recommendObj.refPageSource,
            globalAddressInfo: app.globalData.addressInfo,
            err: err && err.toString(),
            pin: PDJ_H5_PIN,
          };
          addFilterMsg("v8ApplyStoreListCatchError");
          addFilterMsg(
            FNIDS.couponGoStoreList && FNIDS.couponGoStoreList.functionId
          );
          addFilterMsg(deviceid_pdj_jd);
          addFilterMsg(PDJ_H5_PIN);
          error(JSON.stringify(logParams));
        });
    });
  },
  // 初始化分类和商品(只第一次进来调用)
  fetchCategoryAndGoods() {
    let {
      pageIdFirstPage = "",
      prePageName = "",
      currentPageName = "",
      pageSource,
      refPageSource,
      preUserAction,
      preTraceId,
    } = this.data.recommendObj || {};
    // 查找为啥storeId会为空
    if (!this.data.storeId) {
      this.setData({
        categorys: [],
        products: [],
        type: 4,
        btnText: "",
        tips: "抱歉，没有您想要的商品",
      });
      clickBuriedV2_({
        click_id: "fetchCategoryAndGoodsError",
        click_par: {
          options: this.scopeData.options,
          storeId: this.data.storeId,
          orgCode: this.data.orgCode,
          activityCode: this.data.activityCode,
          couponId: this.data.couponId,
          storeList: this.data.storeList,
          from: this.data.from,
          appVersion: FNIDS.v8Init && FNIDS.v8Init.appVersion,
          time: new Date(),
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      });
      let deviceid_pdj_jd = util.getUUIDMD5();
      let loginInfo = wx.getStorageSync("login_info");
      let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
      wx.reportMonitor(7, 20);
      let logParams = {
        appVersion: FNIDS.v8Init.appVersion,
        channel: this.data.channel,
        markState: this.data.markState,
        code: this.data.activityCode,
        storeNo: this.data.storeId || "",
        orgCode: this.data.orgCode || "",
        skuIds: this.data.skuIds,
        options: this.scopeData.options,
        refPageSource:
          this.data.recommendObj && this.data.recommendObj.refPageSource,
        globalAddressInfo: app.globalData.addressInfo,
        pin: PDJ_H5_PIN,
      };
      addFilterMsg("fetchCategoryAndGoodsError");
      addFilterMsg(FNIDS.v8Init && FNIDS.v8Init.functionId);
      addFilterMsg(deviceid_pdj_jd);
      addFilterMsg(PDJ_H5_PIN);
      error(JSON.stringify(logParams));
      return;
    }
    mp.loading_cover();
    request({
      isForbiddenDialog: true,
      isNeedDealError: true,
      ...FNIDS.v8Init,
      method: FNIDS.v8Init.method || "POST",
      body: {
        couponId: this.data.couponId || "",
        stationNo: this.data.storeId || "",
        orgCode: this.data.orgCode || "",
        skus: this.data.skuIds || [],
        activityCode: this.data.activityCode || "",
        pageSource: pageSource || "couponGoodsList",
        refPageSource: refPageSource || "",
        ref_par: {
          userAction: preUserAction || "",
          traceId: preTraceId || "",
        },
      },
      pageId: pageIdFirstPage,
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        mp.hideLoading();
        let { code, result, traceId } = res.data;
        let { isCart = true } = result;
        if (code == 0) {
          let showStoreMove = false,
            showTipMove = false;
          let showed = wx.getStorageSync("showCouponGo");
          if (this.data.storeList.length > 2 && result.sideslip && !showed) {
            wx.setStorageSync("showCouponGo", true);
            showStoreMove = true;
            showTipMove = true;
          }

          let list = result.products || []; // 全部商品
          this.setList(list);
          this.setData({
            categorys: result.categorys || [],
            products: this.scopeData.cacheList[0] || [],
            screenShow: result.screenShow || false,
            sideslip: result.sideslip || false,
            type: 4,
            btnText: this.data.storeId ? "进店逛逛" : "",
            tips: "没有找到符合的商品",
            showStoreMove: showStoreMove,
            displayFilterFloor: result.displayFilterFloor || [],
            screen: result.screen || {},
            goodTraceId: traceId,
            isCart
          });
          let timer1 = setTimeout(() => {
            clearTimeout(timer1);
            this.setData({
              showTipMove: showTipMove,
            });
          }, 1800);
          // 备份外露筛选项 用于重置筛选条件
          this.scopeData.backupDisplayFilterFloor = JSON.parse(
            JSON.stringify(result.displayFilterFloor || [])
          );
        } else {
          this.setData({
            categorys: [],
            products: [],
            type: 4,
            btnText: this.data.storeId ? "进店逛逛" : "",
            tips: res.data.msg || "没有找到符合的商品",
          });
          let deviceid_pdj_jd = util.getUUIDMD5();
          let loginInfo = wx.getStorageSync("login_info");
          let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
          wx.reportMonitor(7, 20);
          let logParams = {
            appVersion: FNIDS.v8Init.appVersion,
            channel: this.data.channel,
            markState: this.data.markState,
            code: this.data.activityCode,
            storeNo: this.data.storeId || "",
            orgCode: this.data.orgCode || "",
            skuIds: this.data.skuIds,
            options: this.scopeData.options,
            refPageSource:
              this.data.recommendObj && this.data.recommendObj.refPageSource,
            globalAddressInfo: app.globalData.addressInfo,
            pin: PDJ_H5_PIN,
            res: res,
          };
          addFilterMsg("v8InitCategoryAndGoodsCodeError");
          addFilterMsg(FNIDS.v8Init && FNIDS.v8Init.functionId);
          addFilterMsg(deviceid_pdj_jd);
          addFilterMsg(PDJ_H5_PIN);
          error(JSON.stringify(logParams));
        }
      })
      .catch((err) => {
        mp.hideLoading();
        this.setData({
          categorys: [],
          products: [],
          type: 4,
          btnText: this.data.storeId ? "进店逛逛" : "",
          tips: "没有找到符合的商品",
        });
        let deviceid_pdj_jd = util.getUUIDMD5();
        let loginInfo = wx.getStorageSync("login_info");
        let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
        wx.reportMonitor(7, 20);
        let logParams = {
          appVersion: FNIDS.v8Init.appVersion,
          channel: this.data.channel,
          markState: this.data.markState,
          code: this.data.activityCode,
          storeNo: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          skuIds: this.data.skuIds,
          options: this.scopeData.options,
          refPageSource:
            this.data.recommendObj && this.data.recommendObj.refPageSource,
          globalAddressInfo: app.globalData.addressInfo,
          pin: PDJ_H5_PIN,
          err: err && err.toString(),
        };
        addFilterMsg("v8InitCategoryAndGoodsCatchError");
        addFilterMsg(FNIDS.v8Init && FNIDS.v8Init.functionId);
        addFilterMsg(deviceid_pdj_jd);
        addFilterMsg(PDJ_H5_PIN);
        error(JSON.stringify(logParams));
      });
  },
  //点击过滤条件刷新商品列表和分类
  fetchGoods(filterSource) {
    mp.loading_cover();
    const {
      orderType,
      priceFilter = [],
      filterList = [],
      sortType,
    } = this.data;
    let {
      pageIdFirstPage,
      pageSource,
      refPageSource,
      preUserAction,
      preTraceId,
    } = this.data.recommendObj || {};
    request({
      isForbiddenDialog: true,
      isNeedDealError: true,
      ...FNIDS.v8SearchGoods,
      method: FNIDS.v8SearchGoods.method || "",
      body: {
        couponId: this.data.couponId || "",
        stationNo: this.data.storeId || "",
        orgCode: this.data.orgCode || "",
        keyword: this.data.keyword,
        sortType: sortType,
        filterList: [...filterList, ...priceFilter],
        orderType,
        pageSource: pageSource || "couponGoodsList",
        refPageSource: refPageSource || "",
        ref_par: {
          userAction: preUserAction || "",
          traceId: preTraceId || "",
        },
      },
      pageId: pageIdFirstPage,
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        mp.hideLoading();
        let { code, result, traceId } = res.data;
        let { isCart = true } = result;
        const { keyword = "", displayFilterFloor, screen } = this.data;
        if (code == 0) {
          this.setData({
            products: result.products || [],
            displayFilterFloor: keyword
              ? result.displayFilterFloor &&
                result.displayFilterFloor.length &&
                !filterList.length
                ? result.displayFilterFloor
                : displayFilterFloor
              : displayFilterFloor,
            screen: keyword
              ? result.screen &&
                result.screen.displayFilterFloor &&
                result.screen.displayFilterFloor.length &&
                !filterList.length
                ? result.screen
                : screen
              : screen,
            type: 4,
            btnText: "进店逛逛",
            tips: "没有找到符合的商品",
            goodTraceId: traceId,
            isCart
          });
          if (filterSource == "filter") {
            let {
              preTraceId,
              preUserAction,
              pageIdFirstPage,
              currentPageName,
              prePageName,
            } = this.data.recommendObj || {};
            clickBuriedV2_({
              click_id: "getFilterResult",
              click_par: {
                contentType: "sku",
                cnt: result.products.length || 0,
                storeId: this.data.storeId || "",
                couponId: this.data.couponId || "",
              },
              pageId: pageIdFirstPage || "",
              currentPageName: currentPageName || "",
              prePageName: prePageName || "",
            });
          }
        } else {
          this.setData({
            categorys: [],
            products: [],
            type: 4,
            btnText: "进店逛逛",
            tips: res.data.msg || "没有找到符合的商品",
            isCart
          });
        }
      })
      .catch(() => {
        mp.hideLoading();
        this.setData({
          categorys: [],
          products: [],
          type: 1,
          btnText: "重新加载",
          tips: "获取商品信息失败",
        });
      });
  },
  // 小黄条文案
  fetchPriceDiff(obj) {
    let {
      pageIdFirstPage,
      pageSource,
      refPageSource,
      preUserAction,
      preTraceId,
    } = this.data.recommendObj || {};
    let params = {
      couponId: this.data.couponId || "",
      stationNo: this.data.storeId || "",
      orgCode: this.data.orgCode || "",
      pageSource: pageSource || "couponGoodsList",
      refPageSource: refPageSource || "",
      ref_par: {
        userAction: preUserAction || "",
        traceId: preTraceId || "",
      },
    };
    if (obj && obj.skuId) {
      params.skuId = obj.skuId;
    }
    request({
      isForbiddenDialog: true,
      isNeedDealError: true,
      ...FNIDS.v8PriceDiff,
      body: params,
      pageId: pageIdFirstPage,
      preObj: this.data.recommendObj || {},
      method: FNIDS.v8PriceDiff.method,
    })
      .then((res) => {
        let { code, result, msg = "" } = res.data;
        let obj = {
          bottomDiff: result.bottomDiff || [],
        };
        if (this.data.storeList && this.data.storeList.length) {
          obj[`storeList[${this.data.curStoreIndex}].priceDiff`] =
            result.headDiff || [];
        }
        if (code == 0) {
          this.setData(obj);
        } else if (code == "AC8005") {
          //同花顺互斥toast
          this.setData({ msg });
        } else {
          this.setData({
            bottomDiff: [],
          });
        }
      })
      .catch((err) => {
        this.setData({
          bottomDiff: [],
        });
      });
  },
  showToast(tips) {
    wx.showToast({
      title: tips,
      icon: "none",
      duration: 2000,
    });
  },
  // 去门店
  goToStore() {
    djCmsJump({
      to: "store",
      params: {
        storeId: this.data.storeId || "",
        orgCode: this.data.orgCode,
      },
      preObj: this.data.recommendObj,
      buried_position: {
        key: "couponGo-goToStore",
        options: this.data.options,
      },
    });
  },
  // 点击分类
  clickCategory(e) {
    let item = e.currentTarget.dataset.item;
    if (item.categoryId == this.data.categoryId) return;
    let filterList = this.data.filterList || [];
    if (filterList.length > 0) {
      let i = filterList.findIndex((ele) => {
        return ele.filterType == 1;
      });
      if (item.categoryId == 0) {
        filterList.splice(i, 1);
      } else {
        if (i > -1) {
          filterList.splice(i, 1, {
            ...item,
            itemId: item.categoryId,
            itemName: item.categoryName,
          });
        } else {
          filterList.push({
            ...item,
            itemId: item.categoryId,
            itemName: item.categoryName,
          });
        }
      }
    } else {
      // 如果点击”全部“按钮
      if (item.categoryId == 0) {
        filterList = [];
      } else {
        filterList = [
          {
            ...item,
            itemId: item.categoryId,
            itemName: item.categoryName,
          },
        ];
      }
    }
    this.setData({
      filterList: filterList,
      categoryId: item.categoryId,
    });

    this.fetchGoods();
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
  // 接收组件传过来的参数进行请求接口，更新商品列表
  onGetGoods(e) {
    let type = e.detail.type;

    if (type == "sort") {
      let { sortType, orderType } = e.detail.data;
      this.setData({
        sortType: sortType,
        orderType,
      });
      this.fetchGoods();
      wx.pageScrollTo({
        scrollTop: 0,
      });
    } else if (type == "filter") {
      let { cateList, otherfilterList = [], priceFilter } = e.detail.data;
      let { displayFilterFloor = [] } = this.data;
      let filterList = otherfilterList;
      let cateItem = {};
      if (Array.isArray(cateList)) {
        cateItem = cateList[0];
      }
      cateItem && cateItem.itemName && filterList.push(cateItem);
      displayFilterFloor.forEach((item) => {
        if (item.nodeType == 2 && item.itemList.length) {
          const { itemList = [] } = item;
          itemList.forEach((i) => {
            i.status = false;
          });
          let subFilterNameAry = [];
          let subFilterCount = 0;
          filterList.forEach((fItem) => {
            itemList.forEach((i) => {
              if (i.itemId == fItem.itemId) {
                subFilterNameAry.push(i.itemName);
                subFilterCount++;
                i.status = true;
              }
            });
          });
          item.subFilterName = subFilterNameAry.join(",");
          item.subFilterCount = subFilterCount;
          item.subFilterNameAry = subFilterNameAry;
        } else {
          item.status = false;
          const { displayItem } = item;
          filterList.forEach((fItem) => {
            if (displayItem.itemId == fItem.itemId) {
              item.status = true;
            }
          });
        }
      });
      this.setData({
        categoryId: (cateList.length > 0 && cateList[0].itemId) || 0,
        filterList,
        displayFilterFloor,
        priceFilter,
      });
      this.fetchGoods("filter");
      wx.pageScrollTo({
        scrollTop: 0,
      });
    } else if (type == "store") {
      let { orgCode, stationNo = '' } = e.detail && e.detail.data || {};
      this.setData({
        orgCode: orgCode || '',
        storeId: stationNo || '',
        categoryId: 0,
        filterList: [],
        refreshMiniCartData: !this.data.refreshMiniCartData,
        curStoreIndex: e.detail.curStoreIndex || 0,
        showTipMove: false,
        priceFilter: [],
      });
      // 如果在搜索结果页切换门店，则不调用初始化商品和分类接口
      if (this.data.from == "self") {
        this.fetchGoods();
      } else {
        if (!this.data.storeId) {
          let {
            pageIdFirstPage = "",
            prePageName = "",
            currentPageName = "",
          } = this.data.recommendObj || {};
          clickBuriedV2_({
            click_id: "clickStoreListError",
            click_par: {
              options: this.scopeData.options,
              orgCode: this.data.orgCode,
              activityCode: this.data.activityCode,
              couponId: this.data.couponId,
              storeList: this.data.storeList,
              storeId: this.data.storeId,
              from: this.data.from,
            },
            currentPageName: currentPageName,
            prePageName: prePageName,
            pageId: pageIdFirstPage,
          });
        }
        this.fetchCategoryAndGoods();
      }
      wx.pageScrollTo({
        scrollTop: 0,
      });
      this.fetchPriceDiff(); // 底部小黄条文案
    } else if (type == "categoryNew") {
      const { data } = e.detail;
      const { displayFilterFloor = [] } = this.data;
      displayFilterFloor.forEach((item) => {
        if (item.nodeType == 2 && item.itemList.length) {
          const { itemList = [] } = item;
          itemList.forEach((i) => {
            i.status = false;
          });
          let subFilterNameAry = [];
          let subFilterCount = 0;
          data.forEach((fItem) => {
            itemList.forEach((i) => {
              if (i.itemId == fItem.itemId) {
                subFilterNameAry.push(i.itemName);
                subFilterCount++;
                i.status = true;
              }
            });
          });
          item.subFilterName = subFilterNameAry.join(",");
          item.subFilterCount = subFilterCount;
          item.subFilterNameAry = subFilterNameAry;
        } else {
          item.status = false;
          const { displayItem } = item;
          data.forEach((fItem) => {
            if (displayItem.itemId == fItem.itemId) {
              item.status = true;
            }
          });
        }
      });
      this.setData({
        filterList: data,
        displayFilterFloor,
      });
      this.fetchGoods();
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }
  },
  onGetFilterStatus(e) {
    this.setData({
      isShowFilter: e.detail.showFilter,
    });
  },
  onGetZIndex(e) {
    this.setData({
      isShow: e.detail.isShow,
    });
  },
  // 更新商品列表数量
  _UPDATEGOODSNUM(obj) {
    let { limitData = {}, msg = "", skuId } = obj.data || {};
    // 如果达到限购上限，则展示限购弹窗或toast
    if (limitData.reachedTheLimit) {
      wx.setStorageSync("limitFlag", this.data.limitFlag + 1);
      this.handleLimit(limitData, skuId);
    }

    if (obj.type == "add" || obj.type == "min") {
      // 底部小黄条文案接口
      this.fetchPriceDiff(obj.data);
      this.setData({
        refreshMiniCartData: !this.data.refreshMiniCartData,
        msg: msg,
      });
      if (obj.type == "add") {
        this.setData({
          catAnimation: !this.data.catAnimation,
        });
      }
      let timer2 = setTimeout(() => {
        clearTimeout(timer2);
        this.setData({ msg: "" });
      }, 2000);
    } else if (obj.type == "showModel") {
      djBus.emit("mask_spu", this.data.recommendObj);
      this.setData({
        toggle: true,
        spuData: obj.data,
      });
    } else if (obj.type == "clear") {
      // 底部小黄条文案接口
      this.fetchPriceDiff();
    }
    updateGoodsNum(this, this.data.products, obj, "products");
  },
  onminiCartWidgetEvent(e) {
    let { type } = e.detail;
    if (type == "miniCartCheckToggle" || type == "miniCartAllChoose") {
      // 底部小黄条文案接口
      this.fetchPriceDiff();
    }
  },
  // 处理限购弹层信息
  handleLimit(limitData, skuId) {
    let limitFlag = wx.getStorageSync("limitFlag");
    // 弹层只展示一次
    if (limitFlag > 1) return;
    this.setData({
      limitFlag: limitFlag,
      limitPop: limitData.popupVo,
      reachedTheLimit: limitData.reachedTheLimit,
      limitSkuId: skuId,
    });
  },
  onDefaultBtnEvent(e) {
    let type = e.detail.type;
    if (type == 4) {
      // 跳转到门店
      this.goToStore();
    } else if (type == 7) {
      // 重新请求门店列表
      // 请求门店
      this.fetchStores()
        .then((res, traceId) => {
          this.setData({
            storeList: res || [],
            orgCode:
              (res.length > 0 && res[0].orgCode) || this.data.orgCode || "", // 请求分类和商品接口需要orgCode
            storeId:
              (res.length > 0 && res[0].stationNo) || this.data.storeId || "", // 请求分类和商品接口需要storeId
          });
          if (!this.data.storeId) {
            let {
              pageIdFirstPage = "",
              prePageName = "",
              currentPageName = "",
            } = this.data.recommendObj || {};
            clickBuriedV2_({
              click_id: "onDefaultBtnEvent",
              click_par: {
                type: type,
                storeList: this.data.storeList,
                storeId: this.data.storeId,
                orgCode: this.data.orgCode,
              },
              currentPageName: currentPageName,
              prePageName: prePageName,
              pageId: pageIdFirstPage,
            });
          }
          this.fetchCategoryAndGoods(res); // 请求分类和商品
          this.fetchPriceDiff(); // 底部小黄条文案
        })
        .catch((err) => {
          this.setData({
            storeList: null,
            type: 7,
            btnText: "重新加载",
            tips: (err.data && err.data.msg) || "当前位置暂无可用门店",
          });
        });
    }
  },
  showModal(e) {
    const { type = "", value = "" } = e.detail;
    const modalData = {
      sortModal: false,
      categoryModal: false,
    };
    switch (type) {
    case "categoryModal":
      modalData.categoryModal = value;
      break;
    case "sortModal":
      modalData.sortModal = value;
      break;
    default:
      break;
    }
    this.setData({
      ...modalData,
    });
  },
  setList(list) {
    let cacheList = []; // 缓存分页的数据
    let size = this.scopeData.pageSize || 10; // 一个数量
    let totalPage = Math.floor(list.length / size); //总页数
    totalPage = list.length % size > 0 ? totalPage + 1 : totalPage;
    for (let i = 0; i < totalPage; i++) {
      let start = i * size;
      let end = start + size;
      let curPage = list.slice(start, end);
      cacheList[i] = curPage;
    }
    this.scopeData.pageNum = 0;
    this.scopeData.totalPage = totalPage;
    this.scopeData.cacheList = cacheList;
  },
  maidian(clickId, clickPar) {
    let { pageIdFirstPage, currentPageName, prePageName } =
      this.data.recommendObj || {};
    clickBuriedV2_({
      click_id: clickId,
      click_par: clickPar,
      currentPageName,
      prePageName,
      pageId: pageIdFirstPage,
    });
  },
  onSpuSelectorEvent(e) {
    let {type, data} = e.detail || {}
    if (type == 'closeSpu') {
      this.setData({
        toggle: false
      })
    }
  }
});
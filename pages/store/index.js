import { getLocation } from "../../common/util/wxapi";
import {
  getDaoJiaLocation,
  getNearbyStoreId,
  getSubscribeAb
} from "../../common/util/services";
import util from "../../common/util/util";
import { djCmsJump } from "../../common/util/agreementV2";
import Public from "../../common/util/public";
import { request, FNIDS } from "../../common/util/api";
import { isLogin } from '../../common/util/loginUtil'
import getDevice from "../../common/util/deviceInfo";
import { pvBuriedV2_, clickBuriedV2_ } from "../../common/util/BI";
import emitter from '../../common/util/events'
let logTimer = null;
const app = getApp();

Page({
  data: {
    refreshStoreHeadCoupons: "",
    showCart: false, // 进店是否展开购物车
    onLoadTime: Date.now(),
    upDateGoodsNum: null,
    couponInfo: {},
    roomId: "",
    refreshFlag: false,
    longitude: "",
    latitude: "",
    isFollow: false,
    keyword: "", // 搜索入店关键字
    keyWord: "", // 搜索入店关键字
    source: "",

    type: 0, // 默认页-类型length
    tips: "", // 默认页-提示
    btnText: "", // 默认页-按钮
    showDefault: false, //  是否展示默认页
    locationError: {}, // 获取地理位置失败错误信息
    showLocDefault: 0, // 无授权
    shareInfo: {
      title: "京东到家"
    },
    popup: 0,
    isNeedReFresh: false,
    strategyCode: null,
    popupCoupon: "",
    spreadChannel: "",
    asyncRefresh: false, // 是否异步调用刷新优惠券接口
    recommendObj: {}, // 埋点注入的字段
    needAnchorSku: false, // 8.24.0搜索进店传这个为true需要锚中全部商品tab
    anchorCateId: 0, // 8.28增加锚中必选品，此值从url参数中获取 || 从缓存中获取miniCartMustOrder中取anchorCateId字段
    miniCartMustOrder: '' // 8.28增加锚中必选品，重缓存中取值miniCartMustOrder
  },
  scopeData: {
    options: {},
    isNeedReFresh: false, // 是否需要重新走外部投放逻辑
    isLogin: false
  },
  async onLoad (options) {
    if (options.orgCode == "undefined" || options.orgCode == "null") {
      options.orgCode = "";
    }
    if (options.couponId == "undefined") {
      options.couponId = "";
    }
    if(options.anchorCateId == "undefined") {
      options.anchorCateId = 0;
    }
    options.roomId = options.roomId || options.roomid || options.room_id || "";
    options.isAddCart =
      String(options.isAddCart) == "true" || String(options.isAddCart) == "1"
        ? true
        : false;
    options.needAnchorSku =
      String(options.needAnchorSku) == "true" ||
      String(options.needAnchorSku) == "1"
        ? true
        : false;
    this.scopeData.isLogin = isLogin();
    this.scopeData.options = options;

    let markedChannel = app.globalData.markedChannel || "";
    // 缓存中有打标的渠道
    if (!options.outPromotion && markedChannel) {
      this.setData({
        outPromotion: markedChannel
      });
    }
    // 外部投放
    if (options.channelBusiness == "outside") {
      try {
        let canNext = await this.outThrow(options);
        if (!canNext) {
          return;
        }
      } catch (error) {
        // console.log(error)
      }
    } else if (options.channelBusiness == "jdncapplsd") {
      try {
        let { storeId } = options;
        if (!storeId) {
          const res = await Public.goToStoreGetCoupon(options);
          if (!res.storeId) {
            wx.switchTab({
              url: "/pages/home/home"
            });
            return;
          }
          options.storeId = res.storeId;
        } else {
          try {
            await Public.syncLoginAndLocation(options, this);
          } catch (error) {
            // console.log(error)
          }
        }
      } catch (error) {
        // console.log(error);
      }
    } else if (
      // 来来推或者助力
      options.spreadChannel == "winnerCoupon" ||
      options.spreadChannel == "winnerCouponSku"
    ) {
      // 来来推、助力券下发数据异常，比如没有下发商家ID不能跳转到指定商家，跳转到小程序首页
      if (!options.orgCode) {
        wx.switchTab({
          url: "/pages/home/home"
        });
        return false;
      }
    }
    if (options.dj_par_key) {
      let qrCode = app.globalData.qrcode;
      let shareInfo = {
        title: qrCode.shareTitle,
        imageUrl: qrCode.shareImgUrl,
        path: `pages/home/home?scene=${options.dj_par_key}`
      };
      options.shareInfo = shareInfo;
    }

    this.setData({
      ...options,
      options: options
    });

    let addressInfo = wx.getStorageSync("address_info") || {};
    let lng = addressInfo.longitude || "";
    let lat = addressInfo.latitude || "";

    // 如果本地有经纬度则直接请求
    if (lng && lat) {
      this.setData({
        longitude: lng,
        latitude: lat,
        showLocDefault: 1
      });
      // 如果没有门店id，根据经纬度获取附近商家门店。
      !options.storeId && this.getNearbyStoreId(options.orgCode, lng, lat);
    } else if (options.longitude && options.latitude) {
      getDaoJiaLocation(
        {
          longitude: options.longitude,
          latitude: options.latitude
        },
        this.handleAddress,
        {},
        "pages/store/index"
      );
    } else {
      this.handleLocation(); // 判断是否有地理位置信息
    }
    // 指纹上报
    getDevice().report();
  },
  onShow () {
    // 外部投放渠道未打标，离开门店页去登录页回来需要重新走打标逻辑
    if (!this.scopeData.isLogin && isLogin()) {
      this.scopeData.isNeedReFresh = true;
      this.setData({
        isNeedReFresh: true
      });
    }
    // 如果地理位置改变，登录状态。重新加载数据
    if (this.data.refreshFlag) {
      this.handleLocation();
    }

    // 如果外部投放的地理位置、登录态改变
    if (this.scopeData.isNeedReFresh) {
      this._onLoad(this.scopeData.options);
    }
    // 获取订阅消息AB
    getSubscribeAb();
    this.getMiniCartMustOrder();
  },
  onReady () {
    this.onReadyTime = Date.now();
    emitter.addListener("storeMiniGo", () => {
      this.setData({
        showCart: true
      })
    });
  },
  onShareAppMessage: function (e) {
    if (e.from == "button") {
      let shareInfo = this.data.shareInfo;
      return shareInfo;
    } else {
      let shareInfo = this.data.shareInfo;
      return shareInfo;
    }
  },
  onHide () {
    // 清除外投流量时长埋点
    clearInterval(logTimer);
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  // 页面pv埋点,
  pvFunc (back) {
    let recommendObj = this.data.recommendObj || {};
    pvBuriedV2_({
      create_time: new Date(),
      page_par: {
        storeId: this.data.storeId || "",
        roomId: this.data.roomId || "",
        channelId: this.data.channelId || "",
        needAddCart: this.data.needAddCart || "",
        skuId: this.data.skuId || "",
        activityId: this.data.activityId || "",
        storeStyle: this.data.storeStyle || "",
        keyword: this.data.keyword || "",
        ref_par: {
          traceId: recommendObj.preTraceId || "",
          userAction: recommendObj.preUserAction || ""
        }
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || "",
      isBack: back || ""
    });
  },

  // 获取附近门店id
  getNearbyStoreId (orgCode, longitude, latitude) {
    getNearbyStoreId({
      orgCode: orgCode || "",
      longitude: longitude || "",
      latitude: latitude || ""
    })
      .then((res) => {
        if (res.data.code == "0") {
          let { stationNo = "" } = res.data.result || {};
          if (stationNo) {
            this.setData({
              showDefault: false,
              storeId: stationNo,
              showLocDefault: 1
            });
          } else {
            this.showNoStore();
          }
        } else {
          this.showNoStore();
        }
      })
      .catch(() => {
        this.showNoStore();
      });
  },

  // 监听默认页
  onDefaultBtnEvent () {
    djCmsJump({
      to: "home",
      preObj: this.data.recommendObj,
      buried_position: {
        key: "store-onDefaultBtnEvent",
        options: this.data.options
      }
    });
  },

  // 获取经纬度
  handleLocation () {
    getLocation()
      .then((res) => {
        getDaoJiaLocation(
          {
            longitude: res.longitude,
            latitude: res.latitude
          },
          this.handleAddress,
          {},
          "pages/store/index"
        );
      })
      .catch((err) => {
        this.setData({
          locationError: err,
          showLocDefault: -1,
          refreshFlag: true
        });
      });
  },

  // 经纬度默认页
  handleAddress (addressInfo) {
    if (addressInfo == null) {
      // 定位失败，请重试
      this.setData({
        showLocDefault: -1
      });
    } else {
      app.globalData.addressInfo = addressInfo;
      app.globalData.refreshHomeFlag = true;
      app.saveAddress(addressInfo);
      this.setData({
        showLocDefault: 1
      });
      // 如果没有门店id，根据经纬度获取附近商家门店。
      !this.data.storeId &&
        this.getNearbyStoreId(
          this.data.orgCode,
          addressInfo.longitude,
          addressInfo.latitude
        );
    }
  },

  // 更新分享信息
  onUpdateShareInfo (e) {
    let { type = "", data = {} } = e.detail;
    // 监听分享信息传输，收到助力券分享
    if (type == "shareHelpCoupon") {
      let miniProgram = (data.chat && data.chat.miniProgram) || {};
      let shareInfo = {
        title: miniProgram.title || "京东到家",
        imageUrl: miniProgram.imageUrl || "",
        path: miniProgram.miniProgram || ""
      };
      this.setData({
        shareInfo: shareInfo,
        currentCouponInfo: data.currentCouponInfo || {}
      });
    } else if (type == "shopShare") {
      this.setData({
        shareInfo: {
          title: data.title || "京东到家",
          imageUrl: data.imageUrl || ""
        }
      });
    }
  },

  // 更新商品列表数量
  _UPDATEGOODSNUM (obj) {
    this.setData({
      upDateGoodsNum: obj
    });
  },

  // 更多优惠券落地页来调用此方法，领取粉丝券更改门店关注状态
  updateIsFollow (isFollow) {
    this.setData({
      isFollow: isFollow
    });
  },

  // 8.20以前更多优惠券落地页，更新门店头部券标状态
  updateStoreHeadCoupons (data) {
    data &&
      this.setData({
        refreshStoreHeadCoupons: data
      });
  },
  // 外部投放进门店逻辑
  async outThrow (options) {
    // 默认兜底
    if (!options.orgCode && !options.storeId) {
      wx.switchTab({
        url: "/pages/home/home"
      });
      return false;
    }
    let address = await this.outAddress(options);
    if (!address) return false;
    // 获取门店id
    if (options.orgCode && !options.storeId) {
      options.storeId = await this.outGetStoreId(address, options.orgCode);
      if (!options.storeId) {
        wx.switchTab({
          url: "/pages/home/home"
        });
        return false;
      }
    }
    // 如果登录调用打标接口
    if (util.isLogin()) {
      await this.outMark(options);
    }
    return true;
  },
  // 处理外部投放地理位置逻辑
  outAddress (options) {
    return new Promise((resolve) => {
      // 如果链接带经纬度,获取到家地理信息
      if (options.longitude && options.latitude) {
        getDaoJiaLocation(
          {
            longitude: options.longitude,
            latitude: options.latitude
          },
          function (addressInfo) {
            app.globalData.addressInfo = addressInfo;
            app.globalData.refreshHomeFlag = true;
            app.saveAddress(addressInfo);
            resolve(addressInfo);
          },
          {},
          "pages/store/index"
        );
      } else {
        let addressInfo = wx.getStorageSync("address_info");
        if (addressInfo) {
          resolve(addressInfo);
        } else {
          // 授权地理信息
          getLocation()
            .then((res) => {
              getDaoJiaLocation(
                {
                  longitude: res.longitude,
                  latitude: res.latitude
                },
                function (addressInfo) {
                  app.globalData.addressInfo = addressInfo;
                  app.globalData.refreshHomeFlag = true;
                  app.saveAddress(addressInfo);
                  resolve(addressInfo);
                },
                {},
                "pages/store/index"
              );
            })
            .catch((err) => {
              // 微信API获取授权信息失败
              this.setData({
                locationError: err,
                showLocDefault: -1
              });
              // 授权地理回来需要重新走外部投放逻辑
              this.scopeData.isNeedReFresh = true;
              resolve(null);
            });
        }
      }
    });
  },
  // 打标接口
  outMark (options) {
    return new Promise((resolve) => {
      let markedChannel = app.globalData.markedChannel || "";
      // 当前促销渠道和缓存中的打标渠道是同一个, 不需要再调用打标接口
      if (markedChannel == options.outPromotion) {
        resolve();
      } else {
        let address = wx.getStorageSync("address_info") || {};
        request({
          ...FNIDS.uvpTag,
          method: "POST",
          isForbiddenDialog: true,
          isNeedDealError: true,
          body: {
            channel: options.outPromotion,
            cityId: address.cityId || "",
            storeId: options.storeId || "",
            orgCode: options.orgCode || "",
            source: "o2o-super-vip-user"
          },
          pageId:
            (this.data.recommendObj &&
              this.data.recommendObj.pageIdFirstPage) ||
            "",
          preObj: this.data.recommendObj || {}
        })
          .then((res) => {
            let { code = -1, flag = false } = res.data || {};
            // 打标成功
            if (code == 0 && flag) {
              app.globalData.markedChannel = options.outPromotion;
              resolve();
            } else {
              resolve();
            }
          })
          .catch(() => {
            resolve();
          });
      }
    });
  },
  // 获取附近的storeId
  outGetStoreId (addressInfo, orgCode) {
    return new Promise((resolve) => {
      getNearbyStoreId({
        orgCode: orgCode || "",
        longitude: addressInfo.longitude || "",
        latitude: addressInfo.latitude || ""
      })
        .then((res) => {
          if (res.data.code == "0") {
            let { stationNo = "" } = res.data.result || {};
            if (stationNo) {
              resolve(stationNo);
            } else {
              resolve(null);
            }
          }
        })
        .catch(() => {
          resolve(null);
        });
    });
  },
  showNoStore () {
    this.setData({
      showDefault: true,
      type: 3,
      tips: "附近暂无门店",
      btnText: "去首页逛逛"
    });

    let deviceid_pdj_jd = util.getUUIDMD5();
    let loginInfo = wx.getStorageSync("login_info");
    let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
    clickBuriedV2_({
      click_id: "reportNoStoreId",
      click_par: {
        pin: PDJ_H5_PIN,
        deviceId: deviceid_pdj_jd,
        refPageSource:
          this.data.recommendObj && this.data.recommendObj.refPageSource,
        addressInfo: app.globalData.addressInfo || "没有"
      }
    });
  },
  asyncRefresh (flag) {
    this.setData({
      asyncRefresh: flag
    });
  },
  _onLoad (options) {
    let addressInfo = wx.getStorageSync("address_info") || {};
    let lng = addressInfo.longitude || "";
    let lat = addressInfo.latitude || "";

    // 如果本地有经纬度则直接请求
    if (lng && lat) {
      this.setData({
        longitude: lng,
        latitude: lat,
        showLocDefault: 1
      });
      // 如果没有门店id，根据经纬度获取附近商家门店。
      !options.storeId && this.getNearbyStoreId(options.orgCode, lng, lat);
    } else if (options.longitude && options.latitude) {
      getDaoJiaLocation(
        {
          longitude: options.longitude,
          latitude: options.latitude
        },
        this.handleAddress,
        {},
        "pages/store/index"
      );
    } else {
      this.handleLocation(); // 判断是否有地理位置信息
    }
  },
  onStoreCouponPopAb (e) {
    if (this.pageHalfMaskArr && this.pageHalfMaskArr.length) {
      let index = this.pageHalfMaskArr.indexOf(e.detail.name);
      if (index != -1) {
        this.pageHalfMaskArr.splice(index, 1)
      }
    }
  },
  // 从缓存中获取必选品对象miniCartMustOrder - 8.28新增
  getMiniCartMustOrder () {
    let miniCartMustOrder = wx.getStorageSync("miniCartMustOrder");
    // anchorCateId:必选品id; toast: 提示语，需传给购物车
    let {anchorCateId = ''} = miniCartMustOrder;
    let {options = {}} = this.data;
    if(anchorCateId) {
      options.anchorCateId = anchorCateId;
      this.setData({
        miniCartMustOrder,
        options
      }, () => {
        wx.setStorageSync("miniCartMustOrder", '')
      })
    }
  },
  // 点击一级分类清楚必选分类锚中
  clearMustOrder () {
    let {options = {}} = this.data;
    if(options && options.anchorCateId) {
      options.anchorCateId = null;
      this.setData({
        options
      })
    }
  }
});

import {
  request,
  FNIDS
} from '../../../common/util/api';
import { getLocation } from "../../../common/util/wxapi";
import {
  getDaoJiaLocation,
} from "../../../common/util/services";

var app = getApp()
import { pvBuriedV2_ } from "../../../common/util/BI";

Page({
  data: {
    // 医药屏蔽标签
    isShow: false,
    // 位置信息
    addressTitle: "定位的地址",
    storeList: [],
    newData: [],
    options: {},
    showEmpty: true,
    type: 0,
    tips: "",
    btnText: "",
    showLocDefault: 0,
    locationError: "",
    refreshFlag: true,
  },

  // 阻止对话框事件穿透
  preventD: function () {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options,
    });
  },

  // 获取经纬度
  handleLocation() {
    getLocation()
      .then((res) => {
        getDaoJiaLocation(
          {
            longitude: res.longitude,
            latitude: res.latitude,
          },
          this.handleAddress,
          {},
          ""
        );
      })
      .catch((err) => {
        this.setData({
          locationError: err,
          showLocDefault: -1,
          refreshFlag: true,
        });
      });
  },
  // 经纬度默认页
  handleAddress(addressInfo) {
    if (addressInfo == null) {
      //定位失败，请重试
      this.setData({
        showLocDefault: -1,
      });
    } else {
      app.globalData.addressInfo = addressInfo;
      app.globalData.refreshHomeFlag = true;
      app.saveAddress(addressInfo);
      this.setData({
        showLocDefault: 1,
        showEmpty: false,
      });
      this.requestData();
    }
  },

  requestData() {
    let addressInfo = app.globalData.addressInfo;

    let poi = (addressInfo && addressInfo.poi) || "";
    this.setData({
      addressTitle: app.globalData.addressInfo.poi || poi || "",
    });

    this.getStationList(this.data.options);
  },
  initStoreData(self, stationList, type) {
    if (stationList && stationList.length > 0) {
      if (type == 1) {
        self.setData({
          isShow: false,
          showEmpty: false,
          storeList: stationList,
        });
      } else if (type == 2) {
        self.setData({
          isShow: false,
          showEmpty: false,
          newData: stationList,
        });
      }
    }
  },
  checkCouponsHeight(array) {
    let width = wx.getSystemInfoSync().windowWidth || 375;

    let totalWidth = 0;
    let wordWidth = 0;
    let totalSpan = array.length * 5;
    array.forEach(function (v) {
      wordWidth += v.words.length * 11;
    });
    totalWidth = wordWidth + totalSpan;
    if (totalWidth >= width * 0.72) {
      return true;
    } else {
      return false;
    }
  },

  getStationList(options) {
    // this.setData({
    //   showEmpty: true,
    //   type: 0,
    //   tips: "",
    //   btnText: "",
    //   storeList: [],
    // })
    // 兼容经纬度
    let address_info = wx.getStorageSync("address_info");
    let latitude, longitude;
    if (
      options.latitude == "undefined" ||
      options.latitude == "" ||
      options.latitude == "null" ||
      !options.latitude
    ) {
      latitude = address_info.latitude;
    } else {
      latitude = options.latitude;
    }
    if (
      options.longitude == "undefined" ||
      options.longitude == "" ||
      options.longitude == "null" ||
      !options.longitude
    ) {
      longitude = address_info.longitude;
    } else {
      longitude = options.longitude;
    }
    const pages = getCurrentPages();
    let listt = [];
    for (let i = 0; i < pages.length; i++) {
      listt.push(pages[i].route);
    }
    let { pageIdFirstPage } = this.data.recommendObj || {};
    request({
      ...FNIDS.stroreIdInCoordinatorAndType,
      isNeedDealError: true,
      isForbiddenDialog: true,
      // appVersion: configList.pro.h5ApiVersion,
      body: {
        coordType: 2,
        latitude,
        longitude,
        openJPIndustryName: [],
        areaCode: options.cityId || "",
        limitId: options.promotionInfoId || options.limitId || "",
        jumpType: options.jumpType || "",
      },
      pageId: pageIdFirstPage,
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        let result = res.data.result;
        if (
          res.data != null &&
          res.data.code == "0" &&
          res.data.result != null
        ) {
          if (result.isShow === 1) {
            // 展示医药门店默认页
            this.setData({
              showEmpty: false,
              isShow: true,
              showLocDefault: 1,
            });
          } else {
            if (
              (result.data && result.data.length > 0) ||
              (result.newData && result.newData.length > 0)
            ) {
              let dataOne = (result.data && result.data.slice(0, 20)) || [];
              let dataTwo =
                (result.newData && result.newData.slice(0, 20)) || [];
              this.initStoreData(this, dataOne, 1);
              this.initStoreData(this, dataTwo, 2);
              this.setData({
                showLocDefault: 1,
                showEmpty: false,
              });
            } else {
              this.setData({
                isShow: false,
                showLocDefault: 1,
                showEmpty: true,
                type: 4,
                tips: "附近暂无符合条件的商家~",
                btnText: "",
              });
            }
          }
        } else {
          this.setData({
            showEmpty: true,
            showLocDefault: 1,
            type: 4,
            tips: res.data.msg || "暂无数据~~",
            btnText: "",
          });
        }
      })
      .catch(() => {
        this.setData({
          showEmpty: true,
          showLocDefault: 1,
          type: 4,
          tips: "附近暂无商家~~",
          btnText: "重新加载",
        });
      });
  },
  /**
   * 监听默认按钮点击
   */
  onDefaultBtnEvent() {
    this.setData({
      type: 0,
    });
    this.requestData();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let addressInfo = wx.getStorageSync("address_info") || {};
    if (addressInfo && addressInfo.cityId) {
      this.requestData();
    } else {
      this.handleLocation();
    }

  },
  pvFunc(back) {
    pvBuriedV2_({
      page_par: {
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
  },

  goback: function () {
    wx.navigateBack({
      preObj: this.data.recommendObj,
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});

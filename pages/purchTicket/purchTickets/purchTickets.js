import {
  request,
  FNIDS
} from '../../../common/util/api';
import configList from "../../../common/util/config";
import {updateGoodsNum} from '../../../common/util/carService'
import { clickBuriedV2_, pvBuriedV2_ } from "../../../common/util/BI.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    resultData: {},
    noSearchBtn: "nobtn",
    placeHolder: "搜索你想要的商品",
    sortType: "",
    keyword: "",
    rangeWay: 0,
    showBottomTip: true,
    goodList: [],
    longitude: "",
    latitude: "",
    orgCode: "",
    storeId: "",
    // 加减购物车ID
    cartSkuId: "",
    // 加减车类型
    cartType: "",
    // 刷新mini购物车
    refreshMiniCartData: false,
    // 刷新商品列表
    refreshGoodListData: false,
    catAnimation: true,
    showCart: false,
    couponId: "",
    togetherOrderInfo: [],
    // 点击显示搜索框
    isShowSearchLayout: false,
    focus: false,
    isShowSearchCancel: false,
    showEmpty: true,
    type: 0,
    tips: "",
    btnText: "",
  },
  getGoodsList() {
    this.setData({
      showEmpty: true,
      type: 0,
      tips: "",
      btnText: "",
      goodList: [],
    });
    let { pageIdFirstPage } = this.data.recommendObj || {};
    request({
      ...FNIDS.couponApplyGoods,
      method: "POST",
      appVersion: configList.pro.h5ApiVersion,
      body: {
        coordType: 2,
        stationNo: this.data.storeId || "",
        couponId: this.data.couponId || "",
        sortType: this.data.sortType || "",
      },
      pageId: pageIdFirstPage,
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        let result = res.data.result;
        if (result.productInfoList && result.productInfoList.length > 0) {
          for (let i = 0; i < result.productInfoList.length; i++) {
            let value = result.productInfoList[i];
            value.imgUrl = (value.imageList || [])[0];
            if (value.skuPrice) {
              value.vipPrice = value.skuPrice.vipPrice;
              value.vipPriceColorCode = value.skuPrice.vipPriceColorCode;
              value.vipPriceIcon = value.skuPrice.vipPriceIcon;
              value.realTimePrice = value.skuPrice.realTimePrice;
              value.basicPrice = value.skuPrice.basicPrice;
              value.mkPrice = value.skuPrice.mkPrice;
              value.promotion = value.skuPrice.promotion;
              value.newExclusivePrice = value.skuPrice.newExclusivePrice;
              value.isStoreVip = value.skuPrice.isStoreVip;
            }
            //为了点击加减购物车埋点准备的参数
            value.userActionSku =
              '{"venderId":' +
              result.venderId +
              ',"skuId":' +
              value.skuId +
              ',"storeId":' +
              result.stationNo +
              "}";
          }
          // let h = result.productInfoList.length * 202 + 220;
          this.setData({
            showEmpty: false,
            resultData: result,
            goodList: result.productInfoList,
            togetherOrderInfo: result.togetherOrderInfo,
            orgCode: result.venderId,
          });
        } else {
          this.setData({
            showEmpty: true,
            type: 4,
            tips: "暂无符合条件的商品",
            btnText: "进店逛逛",
            resultData: result,
            goodList: [],
            togetherOrderInfo: result.togetherOrderInfo,
            orgCode: result.venderId,
          });
        }
        this.setData({
          refreshMiniCartData: !this.data.refreshMiniCartData,
        });
      })
      .catch(() => {
        this.setData({
          showEmpty: true,
          type: 4,
          tips: "暂无符合条件的商品",
          btnText: "进店逛逛",
          goodList: [],
        });
      });
  },
  getPriceDiff() {
    let { functionId = "", appVersion = "" } = FNIDS.couponPriceDiff;
    let { pageIdFirstPage } = this.data.recommendObj || {};
    request({
      functionId,
      method: "POST",
      appVersion,
      body: {
        stationNo: this.data.storeId || "",
        couponId: this.data.couponId || "",
        orgCode: this.data.orgCode || "",
      },
      pageId: pageIdFirstPage,
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        let result = res.data.result;
        this.setData({
          togetherOrderInfo: result,
        });
      })
      .catch(() => {});
  },

  handleShowSearchClick() {
    this.setData({
      keyword: "",
      isShowSearchLayout: !this.data.isShowSearchLayout,
      focus: true,
    });
    let {
      preTraceId,
      preUserAction,
      pageIdFirstPage,
      currentPageName,
      prePageName,
    } = this.data.recommendObj || {};
    clickBuriedV2_({
      click_id: "click_search",
      click_par: {
        traceId: preTraceId,
        userAction: preUserAction,
      },
      pageId: pageIdFirstPage || "",
      currentPageName: currentPageName || "",
      prePageName: prePageName || "",
    });
  },
  handleMongClick() {
    this.setData({
      isShowSearchLayout: false,
      focus: false,
    });
  },
  handleSearchClick() {
    // this.getGoodsList();
    wx.navigateTo({
      url:
        "/pages/purchTicket/purchTicketSearch/index?stationNo=" +
        this.data.storeId +
        "&keyword=" +
        this.data.keyword +
        "&couponId=" +
        this.data.couponId +
        "&longitude=" +
        this.data.longitude +
        "&latitude=" +
        this.data.latitude +
        "&orgCode=" +
        this.data.orgCode,
      preObj: this.data.recommendObj,
      buried_position: {
        key: "purchTickets-handleSearchClick",
        options: this.data.options,
      },
    });
    this.setData({
      isShowSearchLayout: false,
      focus: false,
      isShowSearchCancel: true,
    });
  },
  // handleSearchCancelClick(){
  //   this.setData({
  //     keyword:'',
  //     isShowSearchLayout:false,
  //     focus:false,
  //     isShowSearchCancel:false
  //   });
  //   this.getGoodsList();
  // },
  searchInput(e) {
    let searchContent = e.detail.value;
    this.setData({
      keyword: searchContent,
    });
  },
  sortTypeClick(e) {
    let type = e.currentTarget.dataset.type;
    let sortType = "";
    let rangeWay = 0;
    if (type == 1) {
      sortType = "";
      rangeWay = 0;
    } else if (type == 2) {
      sortType = "sort_redissale30_desc";
      rangeWay = 0;
    } else if (type == 3) {
      if (this.data.sortType == "sort_price_desc") {
        sortType = "sort_price_asc";
        rangeWay = 1;
      } else if (this.data.sortType == "sort_price_asc") {
        sortType = "sort_price_desc";
        rangeWay = 2;
      } else {
        sortType = "sort_price_asc";
        rangeWay = 1;
      }
    }
    let {
      preTraceId,
      preUserAction,
      pageIdFirstPage,
      currentPageName,
      prePageName,
    } = this.data.recommendObj || {};
    clickBuriedV2_({
      click_id: "click_sort",
      click_par: {
        traceId: preTraceId,
        userAction: preUserAction,
        type: type,
      },
      pageId: pageIdFirstPage || "",
      currentPageName: currentPageName || "",
      prePageName: prePageName || "",
    });

    this.setData({
      sortType: sortType,
      rangeWay: rangeWay,
    });
    this.getGoodsList();
  },
  // 监听mini购物车事件
  onMiniCartWidgetEvent(e) {
    let type = e.detail.type;
    let data = e.detail.data;
    if (type === "miniCartToBill") {
      // 去结算
      wx.navigateTo({
        url:
          "/pages/settlementV2/index?" +
          "storeId=" +
          data.storeId +
          "&orgCode=" +
          data.orgCode +
          "&storeName=" +
          data.storeName +
          "&attention=" +
          this.data.attention,
        preObj: this.data.recommendObj,
        buried_position: {
          key: "purchTickets-onMiniCartWidgetEvent",
          options: this.data.options,
        },
      });
    }
    if (type === "miniCartAllChoose") {
      this.getPriceDiff();
    }
    if (type === "miniCartCheckToggle") {
      this.getPriceDiff();
    }
  },

  // 更新当前页面商品数量 skuId, cartNum, clear, spuId
  _UPDATEGOODSNUM(obj) {
    let { type } = obj;
    if (type == "showModel") {
      // this.toggleSpuSelector();
      // this.setData({
      //   toggle: true,
      //   spuData: data
      // })
    } else {
      updateGoodsNum(this, this.data.goodList, obj, "goodList");
      this.getPriceDiff();
    }
  },
  // 监听商品加减车变化
  onAddMinControllerChange(e) {
    let data = e.detail.data;
    let type = e.detail.type;
    if (type === "add") {
      this.setData({
        catAnimation: !this.data.catAnimation,
      });
    }
    this.setData({
      cartType: type,
      cartSkuId: data.skuId,
      refreshMiniCartData: !this.data.refreshMiniCartData,
    });
  },
  toStoreClick() {
    let pages = getCurrentPages();
    let delta = 1,
      index = null;
    pages.forEach((item, i) => {
      if (item && item.route === "pages/store/index") {
        index = i;
      }
    });
    if (index != null) {
      delta = pages.length - (index + 1);
      delta &&
        wx.navigateBack({
          delta
        });
    } else {
      wx.navigateTo({
        url:
          "/pages/store/index?storeId=" +
          this.data.storeId +
          "&longitude=" +
          this.data.longitude +
          "&latitude=" +
          this.data.latitude +
          "&orgCode=" +
          this.data.orgCode,
        preObj: this.data.recommendObj,
        buried_position: {
          key: "purchTickets-toStoreClick",
          options: this.data.options,
        },
      });
    }
    let {
      preTraceId,
      preUserAction,
      pageIdFirstPage,
      currentPageName,
      prePageName,
    } = this.data.recommendObj || {};
    clickBuriedV2_({
      click_id: "click_store",
      click_par: {
        traceId: preTraceId,
        userAction: preUserAction,
      },
      pageId: pageIdFirstPage || "",
      currentPageName: currentPageName || "",
      prePageName: prePageName || "",
    });
  },
  toStoreClickBottom() {
    let pages = getCurrentPages();
    let delta = 1,
      index = null;
    pages.forEach((item, i) => {
      if (item && item.route == "pages/store/index") {
        index = i;
      }
    });
    if (index != null) {
      delta = pages.length - (index + 1);
      delta &&
        wx.navigateBack({
          delta
        });
    } else {
      wx.navigateTo({
        url:
          "/pages/store/index?storeId=" +
          this.data.storeId +
          "&longitude=" +
          this.data.longitude +
          "&latitude=" +
          this.data.latitude +
          "&orgCode=" +
          this.data.orgCode,
        preObj: this.data.recommendObj,
        buried_position: {
          key: "purchTickets-toStoreClickBottom",
          options: this.data.options,
        },
      });
    }
    let {
      preTraceId,
      preUserAction,
      pageIdFirstPage,
      currentPageName,
      prePageName,
    } = this.data.recommendObj || {};
    clickBuriedV2_({
      click_id: "click_more_goods",
      click_par: {
        traceId: preTraceId,
        userAction: preUserAction,
      },
      pageId: pageIdFirstPage || "",
      currentPageName: currentPageName || "",
      prePageName: prePageName || "",
    });
  },

  // 去商品详情
  goToDetail(e) {
    let data = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/product/index?orgCode=${data.orgCode}&storeId=${data.storeId}&skuId=${data.skuId}`,
      preObj: this.data.recommendObj,
      buried_position: {
        key: "purchTickets-goToDetail",
        options: this.data.options,
      },
    });
  },

  // 阻止对话框事件穿透
  preventD: function () {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 刷新mini购物车
    this.setData({
      couponId: options.couponId,
      storeId: options.stationNo,
      longitude: options.longitude || "",
      latitude: options.latitude || "",
      orgCode: options.orgCode || "",
      options: options,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getGoodsList();
  },
  pvFunc(back) {
    let {
      preTraceId,
      preUserAction,
      pageIdFirstPage,
      currentPageName,
      prePageName,
    } = this.data.recommendObj || {};
    pvBuriedV2_({
      page_par: {
        ref_par: {
          traceId: preTraceId || "",
          userAction: preUserAction || "",
        },
      },
      pageId: pageIdFirstPage || "",
      currentPageName: currentPageName || "",
      prePageName: prePageName || "",
      isBack: back || "",
    });
    this.setData({
      refPar: {
        userAction: preUserAction,
        traceId: preTraceId,
      },
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
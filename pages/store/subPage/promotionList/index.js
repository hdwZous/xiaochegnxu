import { request, FNIDS } from "../../../../common/util/api";
import mp from '../../../../common/util/wxapi'
import { updateGoodsNum } from "../../../../common/util/carService";
import util from '../../../../common/util/util'
import { pvBuriedV2_, clickBuriedV2_ } from "../../../../common/util/BI.js";
import djBus from "../../../../common/util/djBus";
let app = getApp()
let flag = true
Page({
  cacheSkuList: [], // 全部商品列表
  data: {
    showEmpty: false,
    showLoading: true,
    showCategoryModal: false,
    showPromoteModal: false,
    showSortModal: false,
    showSearchModal: false,
    type: 0,
    tips: "",
    btnText: "",
    // 默认页-默认图
    defaultSrc:
      "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png",

    showCart: false, // 是否展示购物车
    refreshMiniCartData: false, // 刷新mini购物车
    catAnimation: false, // 执行购物车动画
    toggle: false, //多规格商品的spu选择器
    spuData: {},
    isRefresh: false,
    orgCode: "", // 接口入参
    storeId: "", // 接口入参
    landType: "", // 接口入参
    promLabel: "", // 接口入参
    promSkuId: "", // 接口入参
    channelBusiness: "", // 接口入参
    channelId: "", // 接口入参
    promotion: "", // 接口入参
    tagId: "", // 接口入参
    themeName: "", // 接口入参
    skuIds: [], // 接口入参
    floorId: "", // 接口入参
    activityId: "", // 接口入参
    title: "", // 页面标题
    skuList: [], // 分页展示的商品对象
    totalCount: 0, // 全部商品长度
    pageSize: 20,
    curPromo: {}, // 当前促销分类下标
    // 是否是iphoneX
    isIpx: false,
    capsule: {},
    keyword: "",
    // 8.9新增 排序&筛选项
    displayFilterFloor: [],
    sidebarFilterFloor: [],
    filterList: [],
    sortType: "",
    orderType: "",
    priceFilter: [],
    sortNodeList: [], // 排序选项
    productTraceId: "" // 商品列表接口的traceId
  },
  onLoad(options) {
    const sysInfo = wx.getSystemInfoSync() || {};
    const capsule = util.getCapsule(sysInfo); // 获取胶囊高度
    let promotionLabel = options.promotionLabel
    if (!options.promotionLabel && options.promType && options.promId) {
      promotionLabel = `${options.promType}:${options.promId}`;
    }
      this.setData({
        capsule,
        isIpx: app.globalData.isIpx,
        orgCode: options.orgCode || "",
        storeId: options.storeId || "",
        landType: options.landType || "",
        promLabel: promotionLabel || "",
        promSkuId: options.skuId || "",
        channelBusiness: options.channelBusiness || "",
        channelId: options.channelId || "",
        promotion: options.promotion || "",
        tagId: options.tagId || "",
        themeName: options.themeName || "",
        skuIds: options.skuIds ? options.skuIds.split(",") : [],
        refreshMiniCartData: !this.data.refreshMiniCartData,
        activityId: options.activityId || "",
        floorId: options.floorId || 0,
      });
    this.fetchData(options.landType);
  },
  onReady() {},
  onShow() {
  },
  pvFunc(back) {
    let recommendObj = this.data.recommendObj || {};
    pvBuriedV2_({
      create_time: new Date(),
      page_par: {
        storeId: this.data.storeId || "",
        landType: this.data.landType || "",
        ref_par: {
          traceId: recommendObj.preTraceId || "",
          userAction: recommendObj.preUserAction || "",
        },
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || "",
      isBack: back || "",
    });
    this.setData({
      refPar: {
        userAction: recommendObj.preUserAction,
        traceId: recommendObj.preTraceId,
      },
    });
  },
  onHide() {
    this.setData({
      isRefresh: true,
    });
  },
  onUnload() {
    this.cacheSkuList = [];
  },
  onReachBottom() {
    if (this.cacheSkuList.length > 0 && flag) {
      flag = false;
      let num = this.data.pageSize;
      if (this.data.totalCount / this.data.pageSize < 1) {
        num = this.data.totalCount;
      }
      this.setData(
        {
          skuList: this.data.skuList.concat(this.cacheSkuList.splice(0, num)),
        },
        () => {
          flag = true;
        }
      );
    }
  },
  fetchData(landType) {
    if (landType == 5 || landType == 7 || landType == 8) {
      this.fetchSKus()
        .then((result) => {
          this.setData({
            showEmpty: !(result.skuList && result.skuList.length),
            skuList: result.skuList || [],
            type: 4,
            btnText: "重新加载",
            tips: "没找到您想要的品",
            imgLazyLoad: {},
            title: result.title || "京东到家",
            showCart: result.isCart,
          });
        })
        .catch(() => {
          this.setData({
            showEmpty: true,
            type: 4,
            btnText: "重新加载",
            tips: "数据异常",
            title: "京东到家",
          });
        });
    } else if (
      landType == 1 ||
      landType == 2 ||
      landType == 3 ||
      landType == 6
    ) {
      // 请求促销分类接口
      this.fetchPromoData()
        .then((result) => {
          this.handlePromoData(result);
          // 请求促销品接口
          this.getGoodList("promoteLabel");
        })
        .catch(() => {
          this.setData({
            showEmpty: true,
            type: 4,
            tips: "数据异常",
            btnText: "重新加载",
          });
        });
    }
  },
  // 获取促销分类标签列表
  fetchPromoData() {
    mp.loading_cover();
    let {
      pageIdFirstPage,
      pageSource,
      refPageSource,
      preUserAction,
      preTraceId,
    } = this.data.recommendObj || {};
    return new Promise((resolve) => {
      request({
        ...FNIDS.getPromotionLabelList,
        isForbiddenDialog: true,
        isNeedDealError: true,
        method: FNIDS.getPromotionLabelList.method || "POST",
        body: {
          orgCode: this.data.orgCode,
          storeId: this.data.storeId,
          landType: this.data.landType,
          promLabel: this.data.promLabel,
          pageSource: pageSource || "promotionPage",
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
          let { code, result = {}, msg } = res.data || {};
          if (code == 0 && result) {
            if (result.promotionLabelList && result.promotionLabelList.length) {
              resolve(result);
            } else {
              this.setData({
                showEmpty: true,
                type: 4,
                tips: "没有找到符合的商品",
                btnText: "重新加载",
              });
            }
          } else {
            this.setData({
              showEmpty: true,
              type: 4,
              tips: msg || "数据异常",
              btnText: "重新加载",
            });
          }
        })
        .catch((err) => {
          mp.hideLoading();
          this.setData({
            showEmpty: true,
            type: 4,
            tips: "数据异常",
            btnText: "重新加载",
          });
        });
    });
  },
  // 获取促销分类下商品
  fetchGoodList(curPromo = {}) {
    let {
      pageIdFirstPage,
      pageSource,
      refPageSource,
      preUserAction,
      preTraceId,
    } = this.data.recommendObj || {};
    const {
      filterList = [],
      sortType = "",
      orderType = "",
      priceFilter = [],
      keyword = "",
    } = this.data;
    const promLableVoList = {
      ...curPromo,
      sortType,
      keyword,
      filterList: [...priceFilter, ...filterList],
      orderType,
    };
    mp.loading_cover();
    return new Promise((resolve) => {
      request({
        ...FNIDS.getPromotionSkuList,
        isForbiddenDialog: true,
        isNeedDealError: true,
        method: FNIDS.getPromotionSkuList.method || "POST",
        body: {
          promLableVoList: curPromo ? [promLableVoList] : [],
          orgCode: this.data.orgCode,
          storeId: this.data.storeId,
          landType: this.data.landType,
          promSkuId: this.data.promSkuId,
          ctp: "StoreHomeActivity",
          pageSource: pageSource || "promotionPage",
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
          let { code, result = {}, traceId } = res.data;
          if (code == 0 && result) {
            resolve(result);
            this.setData({
              productTraceId: traceId,
            });
          } else {
            this.setData({
              showEmpty: false,
              showGoodEmpty: true,
              type: 4,
              tips: "数据异常",
              btnText: "重新加载",
            });
          }
        })
        .catch(() => {
          mp.hideLoading();
          this.setData({
            showEmpty: false,
            showGoodEmpty: true,
            type: 4,
            tips: "数据异常",
            btnText: "重新加载",
          });
        });
    });
  },
  // 获取商品列表
  fetchSKus() {
    let outPromotion = wx.getStorageSync("markedChannel") || "";
    mp.loading_cover();
    let params = {
      orgCode: this.data.orgCode,
      storeId: this.data.storeId,
      landType: this.data.landType,
      pageSource: "promotionPage",
      promotion: this.data.promotion || "",
      themeName: this.data.themeName || "",
      skuIds: this.data.skuIds || [],
      tagId: this.data.tagId || "",
    };
    if (this.data.landType == 8) {
      params = Object.assign({}, params, {
        channelBusiness: this.data.channelBusiness || "",
        channelId: this.data.channelId || "",
      });
    }
    if (this.data.landType == 7) {
      params = Object.assign({}, params, {
        activityId: this.data.activityId,
        floorId: this.data.floorId,
      });
    }
    return new Promise((resolve) => {
      request({
        ...FNIDS.floorSkus,
        isForbiddenDialog: true,
        isNeedDealError: true,
        content: {
          // 外部投放展示渠道价需要参数
          channelCode: outPromotion || "",
        },
        body: params,
        pageId:
          (this.data.recommendObj && this.data.recommendObj.pageIdFirstPage) ||
          "",
        preObj: this.data.recommendObj || {},
      })
        .then((res) => {
          mp.hideLoading();
          let { code, result = {}, traceId } = res.data || {};
          if (code == 0 && result) {
            resolve(result);
            this.setData({
              productTraceId: traceId,
            });
          } else {
            this.setData({
              showEmpty: true,
              type: 4,
              btnText: "重新加载",
              tips: (res.data && res.data.msg) || "数据异常",
              title: "京东到家",
            });
          }
        })
        .catch(() => {
          mp.hideLoading();
          this.setData({
            showEmpty: true,
            type: 4,
            btnText: "重新加载",
            tips: "数据异常",
            title: "京东到家",
          });
        });
    });
  },
  // 处理促销分类接口信息
  handlePromoData(result) {
    let curPromo = {};
    const { promotionLabelList = [] } = result;
    promotionLabelList.forEach((item) => {
      if (item.checked) {
        curPromo = item;
      }
    });
    this.setData({
      promoLabels: result.promotionLabelList || [],
      curPromo: curPromo, // 当前选中的分类
      showEmpty: false,
      title: result.title || "京东到家",
    });
  },
  // 处理促销产品接口信息
  handleGoodListData(result = {}, filterSource) {
    let totalCount = 0;
    let {
      displayFilterFloor,
      sidebarFilterFloor,
      keyword = "",
      sortNodeList = [],
      screenShow,
    } = this.data;
    if (Array.isArray(result.skuVoList) && result.skuVoList.length > 0) {
      const skuVoItem = result.skuVoList[0];
      this.cacheSkuList = skuVoItem.skuList || [];
      totalCount = (skuVoItem.skuList && skuVoItem.skuList.length) || 0;
      if (filterSource == "promoteLabel" || filterSource == "keyword") {
        // 排序
        sortNodeList = skuVoItem.sortNodeList || [];
        // 筛选弹层
        screenShow = skuVoItem.screenShow;
        displayFilterFloor = skuVoItem.displayFilterFloor || [];
        // 外露筛选项
        sidebarFilterFloor = skuVoItem.sidebarFilterFloor || [];
      }
      // 埋点
      if (filterSource == "filter") {
        let { pageIdFirstPage, currentPageName, prePageName } =
          this.data.recommendObj || {};
        clickBuriedV2_({
          click_id: "getFilterResult",
          click_par: {
            contentType: "sku",
            cnt: (skuVoItem.skuList && skuVoItem.skuList.length) || 0,
            storeId: this.data.storeId || "",
            keyword: keyword || "",
            promId: this.data.curPromo.promId || "",
            promType: this.data.curPromo.promType || "",
          },
          prePageName,
          currentPageName,
          pageId: pageIdFirstPage || "",
        });
      }
    }
    this.setData({
      showEmpty: false,
      showGoodEmpty: false,
      showGoodListEmpty: !totalCount,
      skuList: this.cacheSkuList.splice(0, this.data.pageSize),
      totalCount,
      type: 4,
      btnText: "重新加载",
      tips: "没有找到符合的商品",
      imgLazyLoad: {},
      displayFilterFloor,
      sidebarFilterFloor,
      showCart: result.isCart !== false,
      sortNodeList,
      screenShow,
    });
  },
  getGoodsEvnet(e) {
    let item = e.detail.item || {};
    // 切换tab时清除筛选数据
    this.setData(
      {
        curPromo: item,
        filterList: [],
        sortType: "",
        orderType: "",
        priceFilter: [],
      },
      () => {
        this.getGoodList("promoteLabel");
      }
    );
  },
  // 请求促销tab下的商品
  getGoodList(filterSource) {
    const { curPromo } = this.data;
    // 请求促销品接口
    this.fetchGoodList(curPromo)
      .then((result) => {
        this.handleGoodListData(result, filterSource);
      })
      .catch(() => {
        this.setData({
          showEmpty: true,
          type: 4,
          tips: "数据异常",
          btnText: "重新加载",
        });
      });
  },
  // 更新商品列表数量
  _UPDATEGOODSNUM(obj) {
    let data = {};
    if (obj.type == "add" || obj.type == "min") {
      data.refreshMiniCartData = !this.data.refreshMiniCartData;
      if (obj.type == "add") {
        data.catAnimation = !this.data.catAnimation;
      }
    } else if (obj.type == "showModel") {
      djBus.emit("mask_spu", this.data.recommendObj);
      data.toggle = true;
      data.spuData = obj.data;
    }
    this.setData(data);
    updateGoodsNum(this, this.data.skuList, obj, "skuList");
  },
  onDefaultBtnEvent: function (e) {
    // let type = e.detail.type;
    if (this.data.showEmpty) {
      this.fetchData(this.data.landType);
    } else if (this.data.showGoodEmpty) {
      this.getGoodList();
    } else if (this.data.showGoodListEmpty) {
      this.getGoodList();
    }
  },
  // 根据点击组件条件来过滤商品
  onGetGoods(e) {
    let { data: { sortType = "", orderType = "" } = {}, type = "" } = e.detail;
    if (type == "sort") {
      this.setData({
        sortType: sortType,
        orderType,
        imgLazyLoad: {},
      });
      this.getGoodList();
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }
    if (type == "filter") {
      let { cateList, otherfilterList, priceFilter } = e.detail.data;
      let { displayFilterFloor } = this.data;
      const filterList = otherfilterList.concat(cateList) || [];
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
        imgLazyLoad: {},
        priceFilter,
      });
      this.getGoodList("filter");
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }
    if (type == "keyword") {
      const { data: { keyword = "" } = {} } = e.detail;
      this.setData(
        {
          keyword,
          sortType: "sort_default",
          orderType: "desc",
          filterList: [],
        },
        () => {
          this.getGoodList("keyword");
          wx.pageScrollTo({
            scrollTop: 0,
          });
        }
      );
    }
    if (type == "categoryNew") {
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
      this.getGoodList("categoryNew");
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }
  },
  isShowModal(e) {
    const { type = "", value = "" } = e.detail;
    let data = {
      showCategoryModal: false,
      showPromoteModal: false,
      showSortModal: false,
      showSearchModal: false,
    };
    switch (type) {
      case "categoryModal":
        data.showCategoryModal = value;
        break;
      case "promoteModal":
        data.showPromoteModal = value;
        break;
      case "sortModal":
        data.showSortModal = value;
        break;
      case "searchModal":
        data.showSearchModal = value;
        break;
      default:
        break;
    }
    this.setData({
      ...data,
      zIndex: value ? 4 : 3,
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
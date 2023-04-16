import { FNIDS, request } from "../../../../common/util/api";
import { Lazy } from "../../../../common/util/lazyLoad";
import {
  expose_sku_component,
} from "../../../../common/util/tencentBi/report";
import { clickBuriedV2_ } from "../../../../common/util/BI";
import { addFilterMsg,warn, error } from "../../../../common/util/wxLog";
import util from "../../../../common/util/util";
import {computeFloatBall} from "../public.js"

let flag = false;
let isFirst = true;
let app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    tabIndex: {
      type: Number,
      value: -1,
    },
    storeGoodsIndex: {
      type: Number,
      value: -1,
    },
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    skuId: {
      type: String,
      value: "",
    },
    // 请求商品的入参
    req: {
      type: Object,
      value: null,
    },
    // 当前请求商品的分类下标（拍平的数组中的下标）
    curIndex: {
      type: Number,
      value: null,
    },
    // flatCatList数组的长度
    size: {
      type: Number,
      value: 0,
    },
    catId: {
      type: String,
      value: "",
    },
    updateNum: {
      type: Object,
      value: null,
    },
    isAddCart: {
      type: Boolean,
      value: false,
    },
    userAction: {
      type: String,
      value: "",
    },
    times: {
      type: Number,
      value: 0,
    },
    isFollow: {
      type: Boolean,
      value: false,
    },
    // 加车掉券
    addCarPushCoupon: {
      type: Object,
      value: null,
    },
    brandCoupon: {
      type: Object,
      value: null,
    },
    vipConfig: {
      type: Object,
      value: null,
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
    tabName: {
      type: String,
      value: ""
    },
    // 是否展开悬浮球
    showFloatBall: {
      type: Boolean,
      value: true
    }
  },
  observers: {
    productTouchTop: function (val) {
      let { curIndex } = this.data;
      if (curIndex == 0) {
        this.notifyTop(val);
      }
    },
    updateNum: function (newval) {
      if (newval) {
        // 解决进门店tab是首页，加减车时，切换tab到全部商品，会有bug。 this.data.showList[0].length > 0表示已经渲染了商品列表
        if (this.data.showList[0] && this.data.showList[0].length > 0) {
          this.updateNumber(newval);
          this.updateLimitCount(newval);
        }
      }
    },
    curIndex: function () {
      this.showList = [];
      this.cacheList = [];
      this.setData({
        defaultErrorKey: "",
        imgLazyLoad: {}, // 图片懒加载
        productTouchTop: true,
        pageSize: 5,
        curPage: 0,
        totalPage: 0,
        showList: [],
        priceWay: -1,
        sortKey: "",
        showSort: true, // 展示排序
        // excludeSkuIds: [],
        hasBuyIds: [],
        recomProducts: 0,
        // couponIds: [],
      });
      this.getGoodsList();
    },
    times: function (val) {
      this.setData({
        totalTimes: val,
      });
    },
    tabIndex: function (val) {
      // 第一次进店，并且当前点击tab是全部商品
      if (this.data.storeGoodsIndex == val && isFirst) {
        this.updateCacheShowList(this.data.updateNum);
        flag = true;
        isFirst = false;
      }
    },
    storeId: function () {
      this.setData({
        couponIds: [], // 已曝光过的券code
      });
    },
  },
  showList: [], // 全部商品 二维数组，渲染
  cacheList: [], // 全部商品 一维数组，缓存所有
  LazyLoad: null,
  data: {
    defaultErrorKey: "",
    imgLazyLoad: {}, // 图片懒加载
    productTouchTop: true,
    pageSize: 5,
    curPage: 0,
    totalPage: 0,
    showSort: true, // 展示排序
    priceWay: -1,
    sortKey: "",
    showList: [],
    totalTimes: 0, // 搭配购买剩余次数
    excludeSkuIds: [],
    sku_id: null,
    hasBuyIds: [], // 以展示搭配购买的skuid
    couponIds: [], // 已曝光过的券code
    recomProducts: 0, // 已曝光过的搭配购买楼层个数
    isMember: 0, // 是否是商家会员
    sTop: 0, // 解决进店锚中加车时商品列表没自动在顶部，所以手动滑动到顶部
  },
  lifetimes: {
    created() {
      this.showList = [];
      this.cacheList = [];
    },
    attached() {
      // this.getGoodsList();
    },
    ready() {},
    detached() {
      // this.cancelObserver();
      // 卸载监听图片懒加载
      let LazyLoad = this.LazyLoad;
      LazyLoad && LazyLoad.disconnectObserver && LazyLoad.disconnectObserver();
      isFirst = true;
    },
  },
  pageLifetimes: {
    show() {
      //   不是会员并且在会员秒杀分类下，刷新接口，更新会员信息
      if (
        !isFirst &&
        !this.data.isMember &&
        this.data.req &&
        this.data.req.cateSource == "vipSeckill"
      ) {
        this.updateVipConfig();
      }
    },
  },
  methods: {
    //通知外边爷滑动到顶了
    notifyTop(val) {
      this.triggerEvent("touchTop", { data: val });
    },
    // 请求接口数据
    getGoodsList() {
      let {
        preUserAction,
        preTraceId,
        pageIdFirstPage,
        pageSource,
        refPageSource,
      } = this.data.buriedObj || {};
      request({
        method: "POST",
        ...FNIDS.storeGoodsList,
        body: {
          storeId: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          // 这个参数是用来下发锚中商品的，只有需要锚中的分类对应的商品列表需要锚中，如果其他分类中也有此商品，不应也锚中，所以需要置空
          skuId: (this.data.req.openCatetory && this.data.skuId) || "",
          catIds: this.data.req ? [this.data.req] : [],
          ctp: "storeinfo",
          showSoldOutSkus: true,
          needPreSell: true,
          pageSource: pageSource || "store",
          refPageSource: refPageSource || "",
          ref_par: {
            userAction: preUserAction || "",
            traceId: preTraceId || "",
          },
        },
        pageId: pageIdFirstPage,
        preObj: this.data.buriedObj || {},
      })
        .then((res) => {
          let { code, result, traceId } = res.data;
          let searchCatResultVOList = result.searchCatResultVOList || [];
          if (code == 0) {
            if (searchCatResultVOList.length > 0) {
              let searchList = result.searchCatResultVOList;
              if (searchList[0].vipConfig) {
                this.triggerEvent("pageEvent", {
                  type: "vipVirtual",
                  data: {
                    vipConfig: searchList[0].vipConfig,
                  },
                });
              } else {
                if (this.data.vipConfig) {
                  this.triggerEvent("pageEvent", {
                    type: "vipVirtual",
                    data: {
                      vipConfig: null,
                    },
                  });
                }
              }
              searchList.forEach((item) => {
                // 是否有锚中商品
                if (item.anchoredProduct) {
                  this.setData({
                    sTop: 1,
                  });
                  // 是否自动加车
                  if (this.data.isAddCart) {
                    item.anchoredProduct.isAddCart = true;
                  }
                  item.anchoredProduct.anchoredProduct = true;
                  item.searchResultVOList.unshift(item.anchoredProduct);
                }
                // 如果没有商品
                if (
                  !item.searchResultVOList ||
                  item.searchResultVOList.length == 0
                ) {
                  this.showError("goodsEmpty");

                  let deviceid_pdj_jd = util.getUUIDMD5();
                  let loginInfo = wx.getStorageSync("login_info");
                  let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
                  let logParams = {
                    appVersion: FNIDS.storeGoodsList.appVersion,
                    storeId: this.data.storeId,
                    orgCode: this.data.orgCode,
                    skuId:
                      (this.data.req.openCatetory && this.data.skuId) || "",
                    catIds: this.data.req ? [this.data.req] : [],
                    res: res,
                    pin: app.globalData.loginStateInfo.PDJ_H5_PIN,
                  };
                  addFilterMsg("goodListEmpty");
                  addFilterMsg(FNIDS.storeGoodsList);
                  addFilterMsg(deviceid_pdj_jd);
                  addFilterMsg(PDJ_H5_PIN);
                  warn(JSON.stringify(logParams));
                  return;
                }
                // 最多展示200条
                if (item.searchResultVOList.length > 200) {
                  item.searchResultVOList = item.searchResultVOList.slice(
                    0,
                    199
                  );
                }
                this.setList(item.searchResultVOList);
              });
              this.setData({
                traceId: traceId,
              });
            } else {
              this.showError("goodsEmpty");

              let deviceid_pdj_jd = util.getUUIDMD5();
              let loginInfo = wx.getStorageSync("login_info");
              let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
              let logParams = {
                appVersion: FNIDS.storeGoodsList.appVersion,
                storeId: this.data.storeId,
                orgCode: this.data.orgCode,
                skuId: (this.data.req.openCatetory && this.data.skuId) || "",
                catIds: this.data.req ? [this.data.req] : [],
                res: res,
                pin: app.globalData.loginStateInfo.PDJ_H5_PIN,
              };
              addFilterMsg("goodListEmpty");
              addFilterMsg(FNIDS.storeGoodsList);
              addFilterMsg(deviceid_pdj_jd);
              addFilterMsg(PDJ_H5_PIN);
              warn(JSON.stringify(logParams));
            }
          } else {
            this.showError("goodsError");

            let deviceid_pdj_jd = util.getUUIDMD5();
            let loginInfo = wx.getStorageSync("login_info");
            let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
            wx.reportMonitor(6, 20);
            let logParams = {
              appVersion: FNIDS.storeGoodsList.appVersion,
              storeId: this.data.storeId,
              orgCode: this.data.orgCode,
              skuId: (this.data.req.openCatetory && this.data.skuId) || "",
              catIds: this.data.req ? [this.data.req] : [],
              res: res,
              pin: app.globalData.loginStateInfo.PDJ_H5_PIN,
            };
            addFilterMsg("goodListError");
            addFilterMsg(FNIDS.storeGoodsList);
            addFilterMsg(deviceid_pdj_jd);
            addFilterMsg(PDJ_H5_PIN);
            error(JSON.stringify(logParams));
          }
        })
        .catch((e) => {
          this.showError("goodsError");

          let deviceid_pdj_jd = util.getUUIDMD5();
          let loginInfo = wx.getStorageSync("login_info");
          let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
          wx.reportMonitor(6, 20);
          let logParams = {
            appVersion: FNIDS.storeGoodsList.appVersion,
            storeId: this.data.storeId,
            orgCode: this.data.orgCode,
            skuId: (this.data.req.openCatetory && this.data.skuId) || "",
            catIds: this.data.req ? [this.data.req] : [],
            pin: app.globalData.loginStateInfo.PDJ_H5_PIN,
            err: e && e.toString(),
          };
          addFilterMsg("goodListThenCatchError");
          addFilterMsg(FNIDS.storeGoodsList);
          addFilterMsg(deviceid_pdj_jd);
          addFilterMsg(PDJ_H5_PIN);
          error(JSON.stringify(logParams));
        });
    },
    // 分页加载商品
    setList(list) {
      let showList = [];
      this.cacheList = list;
      let { pageSize = 1 } = this.data;
      let pageNum = Math.floor(list.length / pageSize); // 总页数
      pageNum = list.length % pageSize > 0 ? pageNum + 1 : pageNum;
      for (let i = 0; i < pageNum; i++) {
        let start = pageSize * i;
        let end = start + pageSize;
        showList[i] = list.slice(start, end);
      }
      this.showList = showList;
      this.setData(
        {
          sTop: 0,
          productTouchTop: true,
          totalPage: pageNum,
          curPage: 0,
          showList: new Array(showList.length),
        },
        () => {
          // reportDataTime(startTime, Date.now(), "setList"); 暂时不需要
          // console.log("setList", Date.now() - startTime);
          this.cellLazyLoad();
        }
      );
    },
    // 商品懒加载
    cellLazyLoad() {
      wx.nextTick(() => {
        // 图片懒加载实例化对象
        let LazyLoad = this.LazyLoad || new Lazy(this, ".inner");
        LazyLoad.initObserver &&
          LazyLoad.initObserver((index) => {
            let { showList = [] } = this.data;
            if (showList[index] && showList[index].length) {
              // console.log("showList[index]", showList[index]);
              return;
            }
            wx.nextTick(() => {
              this.setData(
                {
                  ["showList[" + index + "]"]: this.showList[index],
                  curPage: Number(index),
                },
                () => {
                  // 腾讯有数埋点
                  try {
                    let tList = this.showList[index] || [];
                    tList.forEach((item) => {
                      item.catId = this.data.catId || 0;
                      item.catName = this.data.catName || "";
                      item.storeInfo = this.data.storeInfo || {};
                      expose_sku_component(item);
                    });
                  } catch (error) {
                    // console.log(err)
                  }

                  // 二次渲染时间统计
                  try {
                    if (flag) {
                      flag = false;
                    }
                  } catch (error) {
                    // console.log(err)
                  }
                }
              );
            });
          });
        this.LazyLoad = LazyLoad;
      });
    },
    // 商品排序
    sort(e) {
      this.setData({
        showList: [],
      });
      let {
        key,
        way = 0,
        sortType,
        orderType,
        userAction,
      } = e.currentTarget.dataset;
      let anchoredProduct = null;
      // 锚中的商品始终置顶，不受排序影响
      if (this.cacheList[0] && this.cacheList[0].anchoredProduct) {
        anchoredProduct = this.cacheList.shift();
        // 只要不是第一次进去页面，不应自动加车
        anchoredProduct.isAddCart = false;
      }
      let sortSearch = this.cacheList.sort((a, b) => {
        return way > 0 ? b[key] - a[key] : a[key] - b[key];
      });
      anchoredProduct && sortSearch.unshift(anchoredProduct);
      let priceWay = way <= 0 ? 1 : 0;
      this.setData({
        sortKey: key,
        priceWay: key === "realTimePriceSortIndex" ? priceWay : -1,
      });
      this.setList(sortSearch);
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "selectSort",
        click_par: {
          sortType: sortType,
          orderType: orderType,
          storeId: this.data.storeId,
          userAction: userAction,
          traceId: this.data.traceId || "",
        },
        prePageName,
        currentPageName,
        pageId: pageIdFirstPage || "",
      });
    },
    updateNumber(obj) {
      let { type, data = {} } = obj || {};
      if (type == "clear") {
        let showList = this.showList || [];
        for (let i = 0; i < showList.length; i++) {
          let search = showList[i];
          for (let j = 0; j < search.length; j++) {
            let item = search[j];
            let a = this.data.showList[i];
            if (item.showModel) {
              if (item.spuCartCount > 0) {
                if (a && a.length && a[j] && JSON.stringify(a[j]) != "{}") {
                  this.setData({
                    [`showList[${i}][${j}].spuCartCount`]: 0,
                    [`showList[${i}][${j}].cartWeight`]: "0g",
                  });
                }
                item.spuCartCount = 0;
                item.cartWeight = "0g";
              }
            } else {
              if (item.incartCount > 0) {
                if (a && a.length && a[j] && JSON.stringify(a[j]) != "{}") {
                  this.setData({
                    [`showList[${i}][${j}].incartCount`]: 0,
                    [`showList[${i}][${j}].cartWeight`]: "0g",
                  });
                }
                item.incartCount = 0;
                item.cartWeight = "0g";
              }
            }
          }
        }
      } else if (type == "add" || type == "min") {
        let key = "",
          num = "";
        if (data.spuId && data.spuId !== "null") {
          (key = "spuId"), (num = "spuNum");
        } else if (data.skuId) {
          (key = "skuId"), (num = "cartNum");
        }
        let found = false,
          cartNum = 0,
          index = 0,
          index2 = 0,
          showModel = 0,
          cartWeight = "0g";
        let showList = this.showList || [];
        for (let i = 0; i < showList.length; i++) {
          let search = showList[i];
          for (let j = 0; j < search.length; j++) {
            let item = search[j];
            if (item[key] && item[key] == data[key]) {
              found = true;
              cartNum = data[num];
              cartWeight = data.cartWeight;
              index = i;
              index2 = j;
              showModel = item.showModel || 0;
              if (showModel) {
                item.spuCartCount = cartNum;
                item.cartWeight = cartWeight;
              } else {
                item.incartCount = cartNum;
                item.cartWeight = cartWeight;
              }
              break;
            }
          }
        }
        // if (!this.data.showList[index]) return
        if (found) {
          let a = this.data.showList[index];
          if (a && a.length && a[index2] && JSON.stringify(a[index2] != "{}")) {
            if (showModel) {
              this.setData({
                [`showList[${index}][${index2}].spuCartCount`]: cartNum || 0,
                [`showList[${index}][${index2}].cartWeight`]: cartWeight || 0,
              });
            } else {
              this.setData({
                [`showList[${index}][${index2}].incartCount`]: cartNum || 0,
                [`showList[${index}][${index2}].cartWeight`]: cartWeight || 0,
              });
            }
          }
        }
      }
    },
    productScroll(e) {
      // console.log('eeee productScroll:', e)
      let { scrollTop } = e.detail;
      if (scrollTop > 3) {
        if (this.data.productTouchTop) {
          this.setData({
            productTouchTop: false,
          });
        }
      } else {
        if (!this.data.productTouchTop) {
          this.setData({
            productTouchTop: true,
          });
        }
      }
      computeFloatBall(this, scrollTop)
    },
    productTouchTop() {
      if (!this.data.productTouchTop) {
        this.setData({
          productTouchTop: true,
        });
      }
    },
    productTouchBottom() {
      if (!this.data.productTouchBottom) {
        this.setData({
          productTouchBottom: true,
        });
      }
      if (!this.data.productTouchTop) {
        this.setData({
          productTouchTop: false,
        });
      }

      // let timeout = setTimeout(() => {
      //     // wx.hideLoading()
      //     clearTimeout(timeout)
      // }, 500)
    },
    // 监听默认页事件
    onDefaultBtnEvent() {
      let { defaultErrorKey } = this.data;
      this.setData({
        defaultErrorKey: "",
      });
      if (defaultErrorKey == "goodsError") {
        this.getGoodsList();
      }
    },
    updateCacheShowList(obj) {
      let { type, data = {} } = obj || {};
      if (type == "clear") {
        let showList = this.showList || [];
        for (let i = 0; i < showList.length; i++) {
          let search = showList[i];
          for (let j = 0; j < search.length; j++) {
            let item = search[j];
            if (item.showModel) {
              item.spuCartCount = 0;
              item.carWeight = "0g";
            } else {
              item.incartCount = 0;
              item.carWeight = "0g";
            }
          }
        }
      } else if (type == "add" || type == "min") {
        let key = "",
          num = "";
        if (data.spuId && data.spuId !== "null") {
          (key = "spuId"), (num = "spuNum");
        } else if (data.skuId) {
          (key = "skuId"), (num = "cartNum");
        }
        let found = false,
          cartNum = 0,
          index = 0,
          index2 = 0,
          showModel = 0,
          carWeight = "0g";
        let showList = this.showList || [];
        for (let i = 0; i < showList.length; i++) {
          let search = showList[i];
          for (let j = 0; j < search.length; j++) {
            let item = search[j];
            if (item[key] && item[key] == data[key]) {
              found = true;
              cartNum = data[num];
              index = i;
              index2 = j;
              showModel = item.showModel || 0;
              carWeight = data.carWeight || "0g";
              break;
            }
          }
        }
        if (found) {
          if (showModel) {
            this.showList[index][index2].spuCartCount = cartNum || 0;
          } else {
            this.showList[index][index2].incartCount = cartNum || 0;
          }
          this.showList[index][index2].carWeight = carWeight || "0g";
        }
      }
    },
    // 更新限频次数
    updateLimitCount(obj) {
      // 获取购物车中所有的skuid(不包括失效、套装、无货、下架)
      let excludeSkuIds = new Set(app.globalData.excludeSkuIds || []);
      let { type, data } = obj || {};
      if (type == "clear") {
        excludeSkuIds.clear();
      } else if (type == "min") {
        excludeSkuIds.delete(obj.skuId);
      } else if (type == "add") {
        excludeSkuIds.add(data.skuId);

        if (data.floorName == "recomBuy") {
          this.setData({
            // 如果是搭配商品楼层, 限频次数恢复到初始的次数 3次
            totalTimes: this.data.times,
            recomProducts: 0,
          });
        }
        // 如果是全部商品tab下的商品
        else if (data.floorName == "productList") {
          // 如果在限频历史记录中，不做任何调整
          let flag = this.data.hasBuyIds.indexOf(data.skuId) > -1;
          if (!flag) {
            this.data.hasBuyIds.push(data.skuId);
          }
          this.setData({
            hasBuyIds: this.data.hasBuyIds,
            sku_id: data.skuId,
            excludeSkuIds: Array.from(excludeSkuIds),
          });
        }
        // 如果是多规格选择器中的商品加车
        else if (data.floorName == "spuSelector") {
          // 如果在限频历史记录中，不做任何调整
          let flag = this.data.hasBuyIds.indexOf(data.spuId) > -1;
          if (!flag) {
            this.data.hasBuyIds.push(data.spuId);
          }
          this.setData({
            hasBuyIds: this.data.hasBuyIds,
            sku_id: data.skuId,
            excludeSkuIds: Array.from(excludeSkuIds),
          });
        }
      }
    },
    // 更新次数
    computeTime(e) {
      // 已经曝光过的优惠券id
      let couponIds = this.data.couponIds || [];
      // 已经曝光过的搭配购买楼层个数
      let recomProducts = this.data.recomProducts || 0;
      // 当前曝光的优惠券
      let couponId = (e.detail && e.detail.couponId) || null;
      // 当前曝光的搭配购买品楼层
      let productList = (e.detail && e.detail.productList) || [];

      // 最多纪录30个couponI并且当前的券code未在已曝光的列表中
      if (
        couponId &&
        couponIds.indexOf(couponId) == -1 &&
        couponIds.length < 30
      ) {
        couponIds.push(couponId);
      }
      // 如果搭配购买楼层
      if (productList.length > 0) {
        recomProducts = recomProducts >= 3 ? 3 : recomProducts + 1;
      }
      let num = this.data.totalTimes > 0 ? this.data.totalTimes - 1 : 0;
      this.setData({
        totalTimes: num,
        couponIds,
        recomProducts,
      });
    },
    showError(errType) {
      this.setData({
        defaultErrorKey: errType,
        defaultError: defaultError[errType],
      });
    },
    clickTopSku(e) {
      let { categoryId = "" } = e.currentTarget.dataset.item || {};
      let skuId = e.currentTarget.dataset.skuId || {};
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "clickTopSku",
        click_par: {
          storeId: this.data.storeId || "",
          skuId: skuId || "",
          categoryId: categoryId,
          traceId: this.data.traceId || "",
        },
        prePageName,
        currentPageName,
        pageId: pageIdFirstPage || "",
      });
    },
    updateVipConfig() {
      request({
        method: "POST",
        ...FNIDS.storeGoodsList,
        body: {
          storeId: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          // 这个参数是用来下发锚中商品的，只有需要锚中的分类对应的商品列表需要锚中，如果其他分类中也有此商品，不应也锚中，所以需要置空
          skuId: (this.data.req.openCatetory && this.data.skuId) || "",
          catIds: this.data.req ? [this.data.req] : [],
          pageSource: "store",
          ctp: "storeinfo",
          showSoldOutSkus: false,
          needPreSell: true,
        },
        preObj: this.data.buriedObj || {},
      })
        .then((res) => {
          let { code, result } = res.data;
          let searchCatResultVOList = result.searchCatResultVOList || [];
          if (code == 0) {
            if (searchCatResultVOList.length >= 0) {
              let searchList = result.searchCatResultVOList;
              if (searchList[0].vipConfig) {
                this.setData({
                  isMember: searchList[0].vipConfig.member || 0,
                });
                this.triggerEvent("pageEvent", {
                  type: "vipVirtual",
                  data: {
                    vipConfig: searchList[0].vipConfig,
                  },
                });
              }
            }
          }
        })
        .catch(() => {
          // console.log(e);
        });
    },
  },
});
const defaultError = {
  goodsError: {
    // 默认页-展示
    showEmpty: true,
    // 默认页-类型
    type: 1,
    // 默认页-图标
    src:
      "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png",
    // 默认页-按钮
    btnText: "重新加载",
    // 默认页-按钮
    tips: "网络异常",
  },
  goodsEmpty: {
    // 默认页-展示
    showEmpty: true,
    // 默认页-类型
    type: 4,
    // 默认页-图标
    src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png",
    // 默认页-按钮
    btnText: "",
    // 默认页-按钮
    tips: "抱歉，暂无您想要的商品~",
  },
};

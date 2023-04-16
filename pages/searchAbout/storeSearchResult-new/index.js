import {
  pvBuriedV2_,
  clickBuriedV2_
} from "../../../common/util/BI"
import mp from '../../../common/util/wxapi'
import {
  request, FNIDS
} from "../../../common/util/api"
import {
  getShareUrl
} from '../../../common/util/share_utils.js'
import {
  Lazy
} from "../../../common/util/lazyLoad"
import util from '../../../common/util/util'
import { updateGoodsNum } from "../../../common/util/carService";
import { addFilterMsg, error } from '../../../common/util/wxLog';
import djBus from '../../../common/util/djBus'
let app = getApp();
// 【图片懒加载】实例对象
let LazyLoad = null;

let searchFlag = false;
let timer = null;
Page({
  buried: {
    userAction: "",
    keyword: "",
    storeId: "",
    skuId: "",
    standardCatIds: [],
    brandIds: [],
    catIds: [],
    state: "",
    searchType: ''
  },
  scopedData: {
    type: '' // 筛选类型
  },
  data: {
    showGoodListEmpty: false, // 列表是否为空
    showMedicineDefault: false, // 医药屏蔽
    showBackTop: false,
    type: 0,
    btnText: "",
    tips: "",
    promptTips: "",
    promptWord: "",
    searchType: app.globalData.KEY_TYPE_DEFAULT,

    windowHeight: 0, // 设备高度
    fromSource: "storehome", // 公用组件判断是哪个页面调用 global是全局，store是店内
    displayFilterFloor: {}, // 外部展示的分类
    multiDisplayFilterFloorList: [], // 外部展示的分类（V8.21.5）
    isShowFilter: false, // 是否展示筛选按钮
    searchFilterList: [], // 筛选蒙层列表
    goodList: [], // 商品列表
    recommendInfo: null, // 相关商品推荐
    recommendSkuList: [],
    forbidScroll: false, //是否禁止页面滑动
    imgLazyLoad: {}, // 图片懒加载

    longitude: "",
    latitude: "",
    currentPage: 1,
    industryTag: "", // 行业标签
    orgCode: "",
    storeId: "",
    filterList: [], // 筛选入参
    searchKey: "", // 搜索关键字
    sortType: "sort_default", // 排序类型，默认综合排序
    orderType: "desc", // 排序方式，默认降序(目前只有价格用到)
    hasNextPage: true, // 是否还有下一页数据
    resultNotice: false, // 是否展示小黄条

    // 刷新mini购物车
    refreshMiniCartData: false,
    catAnimation: false, // 执行购物车动画
    //多规格商品的spu选择器
    toggle: false,
    spuData: {},
    isRefresh: false,
    pageMoving: false, // 是否滑动
    hideBackTop: true,
    traceId: '',
    oneBuriedSort: false,
    sortModal: false,
    categoryModal: false,
    otherSortModal: false,
    storeModal: false,
    sortNodeList: [],
    recommendNumber: '',
    styleABMap: {},
    searchTagFix: false,
    userAction: '',
    prePageId: '',
    updateNum: {},
    fading: false,
    fadeScroll: null,
    top: 0,
    onPullDown: false,
    backTop: false,
    defaultType: 0,
    defaultObj: {},
    topMargin: 0,
    imgSize: 120,
    isShowTopFilter: false
  },
  onLoad(options) {
    searchFlag = false;
    return this.init(options);
  },
  onReady() {
    // 图片懒加载实例化对象
    LazyLoad = new Lazy(this, ".container >>> .lazy-load");
  },
  onShow() {
    searchFlag = false;
  },
  pvFunc(back) {
    let {searchKey = '', searchType = '', storeId = '', userAction = '', prePageId} = this.data;
    let {pageIdFirstPage = '', currentPageName = '', prePageName = '', preTraceId ='', preUserAction =''} = this.data.recommendObj || {}
    let refPar = { pageId: prePageId }
    pvBuriedV2_({
      page_par: {
        keyword: searchKey,
        searchType: searchType,
        storeId,
        userAction,
        ref_par: refPar
      },
      pageId: pageIdFirstPage,
      currentPageName: currentPageName,
      prePageName: prePageName,
      'isBack': back || ''
    })
    this.setData({ refPar })
  },
  onHide() {
    this.setData({
      isRefresh: true,
    });
    timer && clearInterval(timer);
  },
  onUnLoad() {
    // 卸载监听图片懒加载
    LazyLoad && LazyLoad.disconnectObserver && LazyLoad.disconnectObserver();
  },
  onShareAppMessage() {
    return {
      title: "京东到家",
      path: getShareUrl(),
    };
  },
  onReachBottom() {
    let {sortModal=false, categoryModal= false,otherSortModal = false, storeModal=false} = this.data
    if (!this.data.hasNextPage || sortModal || categoryModal || otherSortModal || storeModal) return;
    this.setData({
      currentPage: this.data.currentPage + 1,
    });
    this.fetchData();
  },
  /**
  * 页面滑动
  */
  onPageScroll(e) {
    let { scrollTop } = e;
    if(scrollTop === 0) {
      this.setData({
        onPullDown: true,
        backTop: true,
        hideBackTop: true
      })
    }

    // 控制滑动频率
    if (!this.data.fading) {
      this.setData({
        fading: true
      })
    } else {
      return
    }
    // 控制页头滑动
    this.controlSliding(scrollTop);
    this.controlHeadFix(scrollTop);

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

    // 滑动停止需要展示侧边栏
    this.data.fadeScroll && clearTimeout(this.data.fadeScroll);
    this.data.fadeScroll = setTimeout(() => {
      this.setData({
        fading: false
      })
    }, 100)
  },

  controlHeadFix(scrollTop) {
    let {rectTop = null, searchTagFix = false} = this.data;
    let rectDom = wx.createSelectorQuery().select('#searchTag');
    if(scrollTop > rectTop) {
      if(!searchTagFix && rectDom) {
        rectDom.boundingClientRect((rect)=>{
          let {top =0} = rect ? rect : {top: 0};
          if(top <= -1) {
            this.setData({
              searchTagFix: true,
              top: scrollTop
            });
          } else {
            this.setData({
              searchTagFix: false,
              top: scrollTop
            })
          }
        }).exec()
      } else {
        this.setData({
          top: scrollTop
        })
      }
    } else {
      this.setData({
        searchTagFix: false,
        top: scrollTop
      })
    }
  },

  // 控制滑动&navList
  controlSliding(scrollTop){
    let { top , onPullDown, styleABMap = {} } = this.data; 
        if(scrollTop > top) {
          if(onPullDown) {
            this.setData({
              onPullDown: false,
              backTop: false,
              
            })
          }
        } else {
          if(!onPullDown) {
            this.setData({
              onPullDown: true,
              backTop: true
            })
          }
        }
  },

  getSearchTagScrollTop(times=100){
    let flag = 0;
    timer && clearInterval(timer);
    timer = setInterval(()=>{
      if(flag < 20) {
      wx.createSelectorQuery().select('#searchTag').boundingClientRect((rect)=>{
        let {top = 0} = rect || {};
        if(top > 0 && top != this.data.rectTop){
          this.setData({
            rectTop: top
          })
          timer && clearInterval(timer);
          mp.hideLoading();
        }
      }).exec()
      if(flag > 10){
        mp.hideLoading();
      }
      flag++
    } else {
      timer && clearInterval(timer);
      mp.hideLoading();
    }
    }, times);
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
  hiddenBackTop() {
    this.movTime && clearTimeout(this.movTime)
    this.movTime = setTimeout(() => {
      this.setData({
        pageMoving: false
      })
    }, 250)
  },

  async init(options) {
    this.setData({
      searchKey: decodeURIComponent(options.name),
      searchType: options.type,
      storeId: options.curStoreId || "",
      orgCode: options.orgCode,
      industryTag: options.industryTag || "",
      isCart: options.isCart === 'false' ? false : true,
      windowHeight: wx.getSystemInfoSync().windowHeight,
      refreshMiniCartData: !this.data.refreshMiniCartData,
      prePageId: options.pageId || ''
    });
    this.buried.storeId = options.curStoreId || "";
    this.buried.keyword = decodeURIComponent(options.name) || "";
    this.buried.searchType = options.type;
    return await this.fetchData();
    
  },
  fetchData() {
    mp.loading_cover();
    let {currentPageName = "", prePageName = "", pageIdFirstPage = "", refPageSource="",preTraceId = '', preUserAction=""} = this.data.recommendObj;
    return request({
      ...FNIDS.storeIndexSearch,
      isNeedDealError: true,
      isForbiddenDialog: true,
      method: "post",
      body: {
        refPageSource: refPageSource,
        refPar:  {
          traceId: preTraceId,
          userAction: preUserAction
        },
        key: this.data.searchKey,
        storeId: this.data.storeId,
        sortType: this.data.sortType,
        orderType: this.data.orderType,
        page: this.data.currentPage,
        pageSize: 10,
        orgCode: this.data.orgCode,
        needRec: true,
        needAggrCats: true,
        showSoldOutSkus: true,
        needPreSell: true,
        pageSource: "storeSearchResult",
        ref: "storeSearch",
        ctp: "store_search",
        filterList: this.data.filterList || [],
      },
      pageId: pageIdFirstPage,
      preObj: this.data.recommendObj || {}
    })
      .then((res) => {
        mp.hideLoading();
        let { code, result, traceId } = res.data;
        let data = {
          hasNextPage: (result && result.hasNextPage) || "",
        };
        if (code == 0 && result) {          
          let recommendInfo = result.recommendInfo || null;
          let goodList = result.searchResultVOList || [];
          let styleABMap = result.styleABMap || {};
          if (this.scopedData.type == 'filter') {
            clickBuriedV2_({
              click_id: "getFilterResult",
              click_par: {
                contentType: "sku",
                cnt: goodList.length || 0,
                storeId: this.data.storeId || "",
                keyword: this.buried.keyword || "",
                traceId: traceId
              },
              currentPageName: currentPageName,
              prePageName: prePageName,
              pageId: pageIdFirstPage
            });
          }
          if (!this.data.oneBuriedSort) {
            this.setData({ oneBuriedSort: true })
            clickBuriedV2_({
              create_time: new Date(),
              click_id: 'selectSort',
              click_par: {
                sortType: result.sortNodeList && result.sortNodeList[0].sortType,
                orderType: "desc",
                keyword: this.data.searchKey,
                storeId: this.data.storeId,
                sortState: 0
              },
              currentPageName: currentPageName,
              prePageName: prePageName,
              pageId: pageIdFirstPage
            })
          }

          if(!goodList.length) {
            let warnResponse = result.warnResponse || null;
            this.setData({
              showMedicineDefault: false,
              showEmpty: false,
              showDefault: true,
              defaultType: 1,
              defaultObj:{...warnResponse},
              topMargin: 10,
              imgSize: 80
            })
          }
          
          goodList.forEach((item) => {
            item.styleABMap = styleABMap;
            if (item.showModel == 1) {
              // spu商品
              item.incartCount = item.spuCartCount;
            }
            item.tags &&
              item.tags.forEach((tag) => {
                if (
                  tag.type == 24 ||
                  (tag.iconText.indexOf("减") > -1 &&
                    tag.iconText.indexOf("运费") > -1)
                ) {
                  item.isJianyun = true;
                }
              });
            item.imgUrl = util.dealImgUrl(80, 80, item.imgUrl);
          });
          if (
            recommendInfo &&
            recommendInfo.recommendSkuList &&
            recommendInfo.recommendSkuList.length > 0
          ) {
            recommendInfo.recommendSkuList.forEach((item) => {
              if (item.showModel == 1) {
                // spu商品
                item.incartCount = item.spuCartCount;
              }
              item.tags &&
                item.tags.forEach((tag) => {
                  if (
                    tag.type == 24 ||
                    (tag.iconText.indexOf("减") > -1 &&
                      tag.iconText.indexOf("运费") > -1)
                  ) {
                    item.isJianyun = true;
                  }
                });
              item.imgUrl = util.dealImgUrl(172, 173, item.imgUrl);
            });
          }
          if (this.data.currentPage == 1) {
            console.log(searchFlag && this.data.multiDisplayFilterFloorList && this.data.multiDisplayFilterFloorList.length , result.multiDisplayFilterFloor.filterNodeList, this.data.multiDisplayFilterFloorList,'======测试',!goodList.length)
            this.setData({
              traceId,
              showGoodListEmpty: !goodList.length,
              isShowTopFilter: this.data.isShowTopFilter ? this.data.isShowTopFilter : goodList.length,
              type: 4,
              // 外部展示的分类
              displayFilterFloor: result.displayFilterFloor,
              multiDisplayFilterFloorList: (searchFlag && this.data.multiDisplayFilterFloorList && this.data.multiDisplayFilterFloorList.length) ? this.data.multiDisplayFilterFloorList : result.multiDisplayFilterFloor.filterNodeList,
              // 筛选蒙层的筛选属性
              searchFilterList: result.searchFilter.filterList || [],
              // 是否展示筛选按钮
              isShowFilter: result.searchFilter.showFilter || false,
              goodList: goodList,
              recommendInfo: recommendInfo,
              recommendNumber: this.data.recommendNumber ? this.data.recommendNumber : result.recommendNumber,
              recommendSkuList:
                (recommendInfo && recommendInfo.recommendSkuList) || [],
              sortNodeList: (searchFlag && this.data.sortNodeList && this.data.sortNodeList.length) ? this.data.sortNodeList  : result.sortNodeList ,
              styleABMap: result.styleABMap || {},
              ...data,
            }, () => {
              this.lazyObserver();
            });
          } else {
            this.setData({
              goodList: this.data.goodList.concat(goodList),
              recommendInfo: recommendInfo,
              recommendSkuList: (recommendInfo && recommendInfo.recommendSkuList) || this.data.recommendSkuList || [],
              recommendNumber: this.data.recommendNumber ? this.data.recommendNumber : result.recommendNumber,
              ...data,
            }, () => {
              this.lazyObserver();
            });
          }
          searchFlag = true;
          // 不显示小黄条
          if (result.promptWord && goodList.length > 0) {
            this.setData({
              resultNotice: true,
            });
          }
        } else if (code == 50000) {
          this.setData({
            showMedicineDefault: true,
            showEmpty: true,
            showDefault: true,
            defaultType: 1,
            defaultObj:{...res.data},
            topMargin: 0,
            imgSize: 120
          });
        } else {
          this.setData({
            showMedicineDefault: false,
            showEmpty: false,
            showDefault: true,
            defaultType: 1,
            defaultObj:{...res.data},
            topMargin: 0,
            imgSize: 120
          })
          wx.reportMonitor(29, 20);
        }
      })
      .catch((err) => {
        // 接口返回失败,没网
        this.setData({
          showMedicineDefault: false,
          showEmpty: false,
          showDefault: true,
          showMedicineDefault: false,
          defaultType: 2,
          topMargin: 0,
          imgSize: 120
        })
        wx.reportMonitor(29, 20);
        let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
        let errInfo = err && err.toString();
        let deviceid_pdj_jd = util.getUUIDMD5();
        addFilterMsg(deviceid_pdj_jd)
        addFilterMsg('storeSearchInfoFn');
        addFilterMsg(PDJ_H5_PIN);
        error(errInfo)
      });
  },
  forbid(){},
  // 点击筛选或排序来重新调用接口
  getGoodList(e) {
    let { type, data } = e.detail;
    this.scopedData.type = type;
    if (type == "sort") {
      this.setData({
        imgLazyLoad: {},
        currentPage: 1,
        sortType: data.sortType,
        orderType: data.orderType,
      });
    } else if (type == "filter") {
      let {displayFilterFloor, multiDisplayFilterFloorList} = this.data;
      let filterList = data.otherfilterList.concat(data.cateList);
      // 解决当用户手动将品类筛选滑动到右侧并没选中任何分类时，切换排序时，要将品类筛选初始化到原位
      if (filterList.length == 0) {
        displayFilterFloor = {};
        multiDisplayFilterFloorList = [];
      }
      multiDisplayFilterFloorList.forEach((item) => {
        if (item.nodeType == 2 && item.itemList.length) {
          const { itemList = [] } = item;
          itemList.forEach((i) => {
            i.status = false
          })
          let subFilterNameAry = [];
          let subFilterCount = 0;
          filterList.forEach((fItem) => {
            itemList.forEach((i) => {
              if (i.itemId == fItem.itemId) {
                subFilterNameAry.push(i.itemName)
                subFilterCount++
                i.status = true
              }
            })
          })
          item.subFilterName = subFilterNameAry.join(',');
          item.subFilterCount = subFilterCount;
          item.subFilterNameAry = subFilterNameAry;
        } else {
          item.status = false
          const { displayItem } = item;
          filterList.forEach((fItem) => {
            if (displayItem.itemId == fItem.itemId) {
              item.status = true
            }
          })
        }
      })
      this.setData({
        imgLazyLoad: {},
        currentPage: 1,
        filterList,
        displayFilterFloor,
        multiDisplayFilterFloorList
      });
    } else if (type == "category") {
      let filterList = this.data.filterList || [];
      if (filterList.length > 0) {
        let i = filterList.findIndex((ele) => {
          return ele.filterType == 1;
        });
        
        let arr = type === 'categoryNew' ?  data[0] : data;
        filterList.splice(i, 1, arr);
      } else {
        filterList = type === 'categoryNew' ? data : [data];
      }
      this.setData({
        filterList,
      });
    } else if (type == "search") {
      let filterList = this.data.filterList || [];
      let i = filterList.findIndex((ele) => {
        return ele.itemId == data.itemId;
      });
      filterList.splice(i, 1);
      this.setData({
        filterList,
      });
    } else if (type == 'categoryNew') {
      const { multiDisplayFilterFloorList = [], searchFilterList = [] } = this.data;
      searchFilterList.forEach((item, index) => {
        if (searchFilterList.length == 1) {
          item.firstScreen = searchFilterList[0].length;
        } else {
          item.firstScreen = index > 2 ? 0 : 12;
        }
        item.showAll = false;
        item.selectNames = [];
        item.hasSelectCount = 0;
        data.forEach((pageItem) => {
          // 匹配之前选中的条件
          if (pageItem.filterType == item.filterType) {
            item.itemList.forEach((subItem) => {
              if (subItem.itemId == pageItem.itemId) {
                item.hasSelectCount++;
                item.selectNames.push(pageItem.itemName);
                subItem.status = true;
              }
            });
          }
        });
      });
      multiDisplayFilterFloorList.forEach((item) => {
        if (item.nodeType == 2 && item.itemList.length) {
          const { itemList = [] } = item;
          itemList.forEach((i) => {
            i.status = false
          })
          let subFilterNameAry = [];
          let subFilterCount = 0;
          data.forEach((fItem) => {
            itemList.forEach((i) => {
              if (i.itemId == fItem.itemId) {
                subFilterNameAry.push(i.itemName)
                subFilterCount++
                i.status = true
              }
            })
          })
          item.subFilterName = subFilterNameAry.join(',');
          item.subFilterCount = subFilterCount;
          item.subFilterNameAry = subFilterNameAry;
        } else {
          item.status = false
          const { displayItem } = item;
          data.forEach((fItem) => {
            if (displayItem.itemId == fItem.itemId) {
              item.status = true
            }
          })
        }
      })
      this.setData({
        filterList: data,
        multiDisplayFilterFloorList,
        searchFilterList
      })
    }

    wx.pageScrollTo({
      scrollTop: 0,
    });
    this.fetchData();
  },
  // 当点击筛选时蒙层展示，禁止底部列表滑动
  clickChangeZIndex(e) {
    this.setData({
      forbidScroll: e.detail.type == "zIndexSort" ? true : false,
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
      djBus.emit('mask_spu',this.data.recommendObj)
      data.toggle = true;
      data.spuData = obj.data;
    }
    // 整合加车后推荐商品
    data = Object.assign(data, {updateNum: obj})
    this.setData(data);
    updateGoodsNum(this, this.data.goodList, obj, "goodList");
    updateGoodsNum(this, this.data.recommendSkuList, obj, "recommendSkuList");
  },
  clickBury(name, storeId, skuId) {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: name,
      click_par: {
        store_id: storeId ? [storeId] : [],
        sku_id: skuId ? [skuId] : [],
        child_page_name: "mini_shopcar",
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    });
  },

  onDefaultBtnEvent(e) {
    let type = e.detail.type;
    if (type == 1) {
      // 网络请求失败
      this.fetchData();
    }
  },
  lazyObserver() {
    // 监听图片懒加载
    LazyLoad &&
      LazyLoad.initObserver &&
      LazyLoad.initObserver((imgId) => {
        if (!this.data.imgLazyLoad[imgId]) {
          this.setData({
            [`imgLazyLoad.${imgId}`]: true,
          });
        }
      });
  },
  // 点击筛选蒙层中的查看按钮埋点
  lookBury(e) {
    // this.buried.standardCatIds = e.detail.standardCatIds || [];
    // this.buried.catIds = e.detail.catIds || [];
    // this.buried.brandIds = e.detail.brandIds || [];
    let {standardCatIds, catIds, brandIds} = e.detail;
    clickBuriedV2_({
      click_id: "click_filter_name",
      click_par: {
        standardCatIds,
        catIds,
        brandIds
      },
      currentPageName: this.data.recommendObj.currentPageNam || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    });

  },
  // 点击品牌分类组件的埋点
  catogoryBury(e) {
    this.buried.standardCatIds = e.detail.standardCatIds || [];
    this.buried.catIds = e.detail.catIds || [];
  },
  // 商品列表加车埋点
  goodAddBury(e) {
    let {detail} = e;
    clickBuriedV2_({
      click_id: "click_add",
      click_par: {
        storeId: detail.storeId || "",
        skuId: detail.skuId || "",
        state: detail.isJianyun ? "Reduce_freight_commodity" : ""
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    });
  },
  // 商品列表加车埋点
  goodReduceBury(e) {
    let {detail} = e;
    clickBuriedV2_({
      click_id: "click_reduce",
      click_par: {
        storeId: detail.storeId || "",
        skuId: detail.skuId || "",
        state: detail.isJianyun ? "Reduce_freight_commodity" : ""
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    });
  },
  // 推荐商品加车埋点
  recGoodAddBury(e) {
    let {detail} = e;
    clickBuriedV2_({
      click_id: "click_add",
      click_par: {
        storeId: detail.storeId || "",
        skuId: detail.skuId || "",
        state: detail.isJianyun ? "Reduce_freight_commodity" : ""
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    });
  },
  // 推荐商品加车埋点
  recGoodReduceBury(e) {
    let {detail} = e;
    clickBuriedV2_({
      click_id: "click_reduce",
      click_par: {
        storeId: detail.storeId || "",
        skuId: detail.skuId || "",
        state: detail.isJianyun ? "Reduce_freight_commodity" : ""
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    });
  },
  showModal(e) {
    const { type = '', value = '' } = e.detail;
    const modalData = {
      sortModal: false,
      categoryModal: false,
      otherSortModal: false,
      storeModal: false
    }
    switch (type) {
    case 'categoryModal':
      modalData.categoryModal = value;
      break;
    case 'sortModal':
      modalData.sortModal = value;
      break;
    case 'otherSortModal':
      modalData.otherSortModal = value;
      break;
    case 'storeModal':
      modalData.storeModal = value;
      break;
    default:
      break;
    }
    this.setData({
      ...modalData
    })
  },
  handleBackTop() {
    if(!this.data.searchTagFix) {
      this.setData({
        searchTagFix: false
      });
    }
  },
  onSpuSelectorEvent(e) {
    let {type} = e.detail || {}
    if (type == 'closeSpu') {
      this.setData({
        toggle: false
      })
    }
  }
});
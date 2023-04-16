/* eslint-disable */
import { request, FNIDS } from "../../../common/util/api"
import { toMedicine } from '../../../common/util/xcxJumper';
import mp from '../../../common/util/wxapi'
import { Lazy } from "../../../common/util/lazyLoad"
import util from '../../../common/util/util'
import { pvBuriedV2_, clickBuriedV2_ } from "../../../common/util/BI";
import { addFilterMsg, error } from '../../../common/util/wxLog';

let searchFlag = false;
let multiDisplayFilterFloor = [];
let app = getApp()
// 【图片懒加载】实例对象
let LazyLoad = null
// 当前时间（性能检测上报用）
let startTime = Date.now()
// 请求开始时间
let requestPreTime = Date.now()
// onLoad触发上报性能，onShow不触发
let flag = 0
let fromSource = '';
let timer = null;

Page({
  options: {
    addGlobalClass: true,
  },
  buried: {
    userAction: "",
    keyword: "",
    real_keyword: '',
    storeIdList: [],
    standardCatIds: [],
    brandIds: [],
    catIds: [],
    searchType: '',
    channelId: '',
    isIphoneX: false
  },
  scopedData: {
    type: '' // 筛选类型
  },
  data: {
    nearbyObj:{
      title:'选择附近好店/热门商圈',
      text:'',
      lastItemList: []
    },
    tabResultList: [],
    // 刷新mini购物车
    refreshMiniCartData: false,
    businessName: '全部', // 顶部tab名称
    // 执行购物车动画
    catAnimation: false,
    longitude: "",
    latitude: "",
    showEmpty: true,
    showLoading: true,
    type: 0,
    tips: "",
    btnText: "",
    guideData: null,
    showMedicineDefault: false,
    showGoodListEmpty: false,
    windowHeight: 0, // 设备高度
    showBackTop: false,
    fromSource: "global",
    storeInfo: {}, // 当前门店信息
    navList: [{}], // 门店列表
    categoryList: [], // 品类筛选列表
    goodList: [], // 商品列表
    hasNextPage: true,
    hoursBuyHasNextPage: true,
    DdHasNextPage:true,
    isShowFilter: false, // 是否展示筛选按钮
    searchFilterList: [], // 筛选蒙层列表
    filterType: 0, // 1：店内分类；2：品牌；3:平台标准分类
    forbidScroll: false, //是否禁止页面滑动
    page: 1,
    hoursBuyPage:1,
    ddPage: 1,
    pageSize: 20,
    searchKey: "", //从搜索页带过来的关键字
    searchAll: true, // 入参-true:多门店，false:单门店
    hoursBuySearchAll: true,// 入参-true:多门店，false:单门店 - 小时购
    storeIdList: [], // 多门店搜索的入参
    storeId: "", // 单门店搜索入参
    orgCode: "", // 单门店搜索入参
    standardCatIds: [], // 入参-平台分类
    brandIds: [], // 入参-品牌
    hoursBuyBrandIds:[],// 入参-品牌
    catIds: [], // 入参-店内分类
    sortType: "sort_default", // 排序类型，默认综合排序
    hoursBuySortType:"sort_default",// 排序类型，默认综合排序(小时购)
    hoursBuyOrderType:"",// 排序方式，默认降序(目前只有价格用到小时购)
    orderType: "", // 排序方式，默认降序(目前只有价格用到)
    keyType: "",
    curStoreId: "",
    // 图片懒加载
    storeImgLazyLoad: {}, // 门店列表的图片
    goodImgLazyLoad: {}, // 商品列表的图片
    // 广告资源位
    bannerData: {},
    // 门店个数
    storeCount: "",
    //多规格商品的spu选择器
    toggle: false,
    spuData: {},
    isRefresh: false,
    // 页面配置
    searchConfig: {},
    zIndexSort: 17,
    zIndexNav: 17,
    // 筛选
    filterList: [],
    // 小时购筛选
    hoursBuyFilterList:[],
    // 弹层筛选
    displayFilterFloor: [],
    // 小黄条
    searchDesc: [],
    hoursBuySearchDesc:[],
    sortNodeList: [], // 排序
    channelBusiness: "",
    channelType:"",
    channelId: "",
    // 8.9新版外露筛选项
    multiDisplayFilterFloor: [],
    // 8.9新增平铺筛选项
    searchTagFloor: [],
    searchTag: {},
    sortModal: false,
    categoryModal: false,
    hoursBuySortModal: false,
    hoursBuyCategoryModal: false,
    otherSortModal: false,
    storeModal: false,
    hoursBuyStoreModal: false,
    hoursBuyOtherSortModal: false,
    pageMoving: false, // 是否滑动
    hideBackTop: true,
    hoursBuyHideBackTop: true,
    traceId: '',
    hoursBuyTraceId: '',
    DdTraceId: '',
    searchType: '', //埋点用，需要传到购物车
    // 仅第一次进页面默认上报一次selectTab埋点
    oneBuriedTab: false,
    // 仅第一次进页面默认上报一次selectSort埋点
    oneBuriedSort: false,
    traceIdHomeStoresSearch: '',
    fading: false,
    Loading: false,
    fadeSrcoll: null,
    LoadingScroll:null,
    isBeltShow: false, //  是否显示腰带
    beltType: 0, // 腰带交互类型
    refreshBeltTimeFlag: '', // 刷新腰带标识
    styleABMap: {},
    rectTop: null,
    tabSwitchTix: false,
    tabType: -1,
    onPullDown: false,
    hoursBuyOnPullDown: false,
    top: 0,
    backTop: false,
    showNearby: false,
    filterObj: {},
    hoursBuyNavList:[],
    hoursBuyBannerData: {},
    hoursBuyStoreInfo:{},
    // 去tabList下的第一个对象的tabParams，请求列表接口给后端透传，前端无使用
    tabParams: {},
    hoursBuyTabParams: {},
    DdTabParams:{},
    // 筛选蒙层列表小时购
    hoursBuySearchFilterList:[],
    hoursBuyGoodList: [],
    DdGoodList: [],
    // 到店附近搜索弹框数据
    searchFilterDd: [],
    allScroll: false,
    hoursBuyScroll: false,
    storeScroll: false,
    allScrollTop: 0,
    hoursBuyScrollTo: 0,
    storeScrollTo:0,
    // 小时购店id
    hoursBuyStoreId: 0,
    hoursBuyOrgCode: 0,
    hoursBuyDefaultErrObj:{},
    DdDefaultErrObj: {},
    allDefaultErrObj: {},
    allTopNum:0, 
    hoursBuyTopNum:0,
    DdTopNum: 0,
    DdHideBackTop: true,
    height: wx.getSystemInfoSync().windowHeight,
    mgTop: 0,
    showFilterModel: false,
    // view容器层级
    viewZIndex: 0
  },
  onLoad(options) {
    fromSource = options.fromSource || "";
    searchFlag = false;
    return this.init(options);
  },

  async init(options) {
    // 打点起始时间
    startTime = Date.now();
    let { latitude = "", longitude = "" } =
      getApp().globalData.addressInfo || {};
    if (!latitude && !longitude) {
      try {
        let addressInfo = wx.getStorageSync("address_info") || "";
        latitude = addressInfo.latitude || "";
        longitude = addressInfo.longitude || "";
      } catch (error) {
        // console.log(error)
      }
    }
    options.channelId =
      options.channelId == "undefined" ? "" : options.channelId;
    options.channelBusiness =
      options.channelBusiness == "undefined" ? "" : options.channelBusiness;
    options.channelType = options.channelType =="undefined" ? "":options.channelType;
    this.setData({
      fromSource: options.fromSource,
      latitude,
      longitude,
      searchKey: decodeURIComponent(options.name),
      windowHeight: wx.getSystemInfoSync().windowHeight,
      keyType: options.type,
      curStoreId: options.curStoreId,
      channelId: options.channelId || "",
      channelBusiness: options.channelBusiness || "",
      searchType: options.type || '',
      channelType: options.channelType || ""
    });
    this.buried.keyword = this.data.searchKey;
    this.buried.real_keyword = this.data.searchKey;
    this.buried.searchType = options.type;
    this.buried.channelId = options.channelId;
    return await this.fetchData();
  },

  onReady() {
    // 图片懒加载实例化对象
    LazyLoad = new Lazy(this, ".container >>> .lazy-load");
  },
  onShow() {
    searchFlag = false;
    flag += 1;
    this.setData({
      isIphoneX: app.globalData.isIpx
    })
    this.setData({
      refreshBeltTimeFlag: (new Date()).getTime()
    })

    this.getSearchTagScrollTop(500);
  },
  onHide(){
    timer && clearInterval(timer);
  },
  pvFunc(back) {
    let {searchKey = '', searchType = '', channelId = '', recommendObj = {}} = this.data;
    pvBuriedV2_({
      page_par: {
        keyword: searchKey,
        real_keyword: searchKey,
        searchType: searchType,
        channelId: channelId,
        ref_par: {
          traceId: recommendObj.preTraceId || "",
          userAction: recommendObj.preUserAction || "",
          refPageSource: recommendObj.refPageSource || "",
        }
      },
      pageId: recommendObj.pageIdFirstPage || "",
      currentPageName: recommendObj.currentPageName,
      prePageName: recommendObj.prePageName,
      'isBack': back || ''
    })
  },
  onUnLoad() {
    // 卸载监听图片懒加载
    LazyLoad && LazyLoad.disconnectObserver && LazyLoad.disconnectObserver();
  },

  // 控制滑动&navList
  controlSliding(scrollTop){
    let { top , onPullDown} = this.data; 

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

  // 控制页头固定
  controlHeadFix(scrollTop){
    let {rectTop = null, searchTagFix = false, tabResultList=[]} = this.data;
    let rectDom = wx.createSelectorQuery().select('#searchTag');
    if(scrollTop > rectTop) {
      if(!searchTagFix && rectDom) {
        rectDom.boundingClientRect((rect)=>{
          let {top =0} = rect ? rect : {top: 0};
          if(top <= -1) {
            this.setData({
              searchTagFix: tabResultList && tabResultList.length ? false : true,
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

  fetchGoodsData(type, tabTypeFlag) {
    let { 
      searchTag = {},
      searchKey = '',
      sortType='',
      hoursBuySortType ='',
      orderType,
      hoursBuyOrderType,
      brandIds=[],
      hoursBuyBrandIds=[],
      page = 1,
      hoursBuyPage = 1,
      ddPage = 1,
      tabType = 0,
      tabParams = {},
      hoursBuyTabParams= {},
      DdTabParams={},
      hoursBuyFilterList = [],
      filterList = [],
      nearbyObj = {},
      hoursBuyMultiDisplayFilterFloor = [],
      multiDisplayFilterFloor = []
    } = this.data;
    const { itemName = '', query = '' } = searchTag;
    tabType = tabTypeFlag ? tabTypeFlag : tabType;

    let clickType = type;
    mp.loading_cover();
    let { currentPageName = "", prePageName = "", pageIdFirstPage = "", refPageSource = '', preTraceId="", preUserAction="" } = this.data.recommendObj;
    let params = {
      key: query || searchKey,
      displayKey: itemName ? `${searchKey} ${itemName}` : searchKey,
      longitude: app.globalData.addressInfo.longitude,
      latitude: app.globalData.addressInfo.latitude,
      page: tabType == 0 ? page : tabType == 1 ? hoursBuyPage: ddPage,
      pageSize: this.data.pageSize || 20,
      needAggrCats: true,
      sortType: tabType == 0 ? sortType : hoursBuySortType,
      orderType: tabType == 0 ? orderType : hoursBuyOrderType,
      brandIds:  tabType == 0 ? brandIds : hoursBuyBrandIds,
      refPageSource: refPageSource,
      refPar:  {
        traceId: preTraceId,
        userAction: preUserAction
      },
      pageSource: fromSource === 'seckill' ? 'seckillSearchTransitPage':'storeListByKey',
      ctp: "search_results",
      ref: "",
      recallType: this.data.recallType,
      channelId: this.data.channelId || null,
      showCar: this.data.searchConfig.showCar || null,
      needPreSell: true,
      filterList: tabType== 0 ? filterList: tabType == 1 ? hoursBuyFilterList : nearbyObj.lastItemList,
      storeCount: tabType== 1 ? this.data.hoursBuyStoreCount: this.data.storeCount,
      channelBusiness: this.data.channelBusiness,
      tabParams: tabType == 0 ? tabParams : tabType == 1 ? hoursBuyTabParams: DdTabParams,
      tabType: tabType
    };
    if (this.data.filterType == 3) {
      // 平台分类
      params.standardCatIds = this.data.standardCatIds;
    } else if (this.data.filterType == 1) {
      // 店内分类
      params.catIds = this.data.catIds;
    }
    let requestParams =
      fromSource === "seckill"
        ? FNIDS.homePromotionGoodsSearch
        : FNIDS.homeGoodsSearch;
    if (fromSource === "seckill") {
      if (this.data.searchAll) {
        // 多门店
        params.storeIdList = this.data.storeIdList || null;
      } else {
        params.storeId = this.data.storeId || null;
        params.orgCode = this.data.orgCode || null;
      }
      params.promoteTypes = ["3"];
      params.searchAll = this.data.searchAll;
    }
    if (clickType == 'searchTag') {
      const { searchTag = {}, searchKey } = this.data;
      params.key = searchTag.query || searchTag.itemName || searchKey;
      params.reSearch = (searchTag.query || searchTag.itemName) ? true : false;
      params.originKey = searchKey;
    }
    
    params.pageId = pageIdFirstPage;
    request({
      ...requestParams,
      isForbiddenDialog: true,
      isNeedDealError: true,
      method: "POST",
      body: params,
      pageId: pageIdFirstPage
    })
      .then((res) => {
        let { code, result, traceId , recommendObj = {}} = res.data;
        let { searchFilterDd = {}} = this.data;
        let currentPageNum = this.data.page;
        if(tabType == 1){
          currentPageNum = this.data.hoursBuyPage;
        } else if (tabType == 2) {
          currentPageNum = this.data.ddPage
        }

        if (code == 0 && result) {
          let data = {};
          if (this.scopedData.type == "filter") {
            clickBuriedV2_({
              click_id: "getFilterResult",
              click_par: {
                contentType: "sku",
                cnt: result.searchResultVOList.length || 0,
                storeId: this.data.storeId || "",
                keyword: this.buried.keyword || "",
                traceId: traceId
              },
              currentPageName: currentPageName ,
              prePageName: prePageName,
              pageId: pageIdFirstPage,
              preObj: recommendObj
            });
          }
          let totalList = tabType == 2 ? result.storeSkuResultList: this.mergeList(result) ;
          
          // 首次请求处理
          if (currentPageNum == 1) {
            let type = result.displayFilterType;
            const { searchTagFloor: { itemList = [] } = {}, multiDisplayFilterFloor: { filterNodeList = [] } = {} } = result;
            
            data = {
              showEmpty: false,
              filterType: type,
              isShowFilter: result.searchFilter.showFilter || false,
              // 门店列表如果当前是全部tab下，点击分类会，接口下发的分类顺序会发生变化，导致锚中效果出错，其他具体门店tab下，分类顺序不变，所以判断当是全部tab并且用户点击了分类，则不用接口下发的新的分类，而是用之前接口下发的
              displayFilterFloor: clickType == "category" && this.data.searchAll ? this.data.displayFilterFloor : result.displayFilterFloor || [],
              searchTagFloor: itemList,
              sortNodeList: clickType == "sortPop" ? this.data.sortNodeList : result.sortNodeList || [],
              styleABMap: result.styleABMap || {},
              
            };
            if(tabType == 1) {
              
              data.hoursBuyMultiDisplayFilterFloor= (!hoursBuyMultiDisplayFilterFloor.length ? filterNodeList : hoursBuyMultiDisplayFilterFloor);
              data.hoursBuySearchFilterList=result.searchFilter.filterList || [];
              data.hoursBuyGoodList = totalList;
              data.hoursBuyHasNextPage= result.hasNextPage;
              data.hoursBuyStoreInfo = result.storeInfo || {};
              data.hoursBuyStoreInfo.freightWords =  data.hoursBuyStoreInfo.ferightDesc
              data.hoursBuyTraceId = traceId;
              if(data.hoursBuyGoodList.length == 0) {
                let errMsg ={
                  showGoodListEmpty: true,
                  type: 4,
                  btnText: "",
                  tips: "抱歉，未能找到您搜索的商品"
                }
                this.setDefaultErrMsg(errMsg, 1);
              }
            } else if (tabType ==  2) {
              data.searchFilterDd = searchFilterDd.filterList ? searchFilterDd : result.searchFilter;
              data.DdGoodList = totalList;
              data.DdHasNextPage= result.hasNextPage;
              data.DdTraceId=traceId;
              if(data.DdGoodList.length == 0) {
                let errMsg ={
                  showGoodListEmpty: true,
                  type: 4,
                  btnText: "",
                  tips: "抱歉，未能找到您搜索的商品"
                }
                this.setDefaultErrMsg(errMsg, 2);
              }
            }else {
              data.searchFilterList = result.searchFilter.filterList || [];
              data.multiDisplayFilterFloor = (!multiDisplayFilterFloor.length ? filterNodeList : multiDisplayFilterFloor);
              data.goodList = totalList;
              data.hasNextPage= result.hasNextPage;
              data.storeInfo = result.storeInfo || {}
              data.storeInfo.freightWords =  data.storeInfo.ferightDesc
              data.traceId = traceId;
              if(data.goodList.length == 0) {
                let errMsg ={
                  showGoodListEmpty: true,
                  type: 4,
                  btnText: "",
                  tips: "抱歉，未能找到您搜索的商品"
                }
                this.setDefaultErrMsg(errMsg, 0);
              }
            }
          } else {
            if(totalList){
              if(this.data.tabType == 1) {
                data.hoursBuyGoodList = this.data.hoursBuyGoodList.concat(totalList);
                data.hoursBuyHasNextPage= result.hasNextPage;
              }else if (this.data.tabType ==  2) {
                data.DdGoodList = this.data.DdGoodList.concat(totalList);
                data.DdHasNextPage= result.hasNextPage;
              } else {
                data.goodList = this.data.goodList.concat(totalList);
                data.hasNextPage= result.hasNextPage;
              }
            }
          }
          searchFlag = true
          this.setData(
            {
              ...data,
            },
            function () {
              if (flag < 2) {
                // 请求结束时间（性能检测上报用）
                let requestEndTime = Date.now();
                // 请求时间（性能检测上报用）
                let requestTime = requestEndTime - requestPreTime;
                // 上报请求时间（性能检测上报用）
                app.reportPerformance(1030, requestTime);
                // setDate渲染时间（性能检测上报用）
                let setDataTime = Date.now() - startTime - requestTime;
                // 上报setDate渲染时间（性能检测上报用）
                app.reportPerformance(2029, setDataTime);
              }
            }
          );


          if(type === 'storeNav') {
            this.getSearchTagScrollTop();
          } else {
            mp.hideLoading();
          }
          // 图片懒加载
          this.lazyObserver();

          

          // 默认埋点
          if (type == 'reachbottom' || type == 'sortPop' || type == 'sort') return
          if (result.sortNodeList && result.sortNodeList.length > 0 && !this.data.oneBuriedSort) { // 兼容没有排序,点击二级排序触发埋点((
            this.setData({
              oneBuriedSort: true
            })

            // 埋点参数
            let click_par = {
              click_par: {
                sortType: result.sortNodeList && result.sortNodeList[0].sortType,
                orderType: "desc",
                keyword: this.data.searchKey,
                storeId: result.storeInfo ? result.storeInfo.storeId : '',
                sortState: 0
              }
            }
            if(this.data.tabType > -1) {
              click_par.tabType = this.data.tabType
            }
            clickBuriedV2_({
              create_time: new Date(),
              click_id: 'selectSort',
              click_par,
              currentPageName: currentPageName,
              prePageName: prePageName,
              pageId: pageIdFirstPage
            })
          }
          if(this.data.tabResultList[tabType]){
            this.data.tabResultList[tabType].loadData = true
          }
        } else {
          if (currentPageNum == 1) {
            let errMsg ={
              showGoodListEmpty: true,
              type: 1,
              btnText: "重新加载",
              tips: (res.data && res.data.msg) || "出错了"
            }
            console.log('出错了接口异常了非0')
            this.setDefaultErrMsg(errMsg, tabType);
          } else {
            mp.toast({
              title: (res.data && res.data.msg) || "加载完啦！",
            });
          }
          wx.reportMonitor(27, 20);
        }
      })
      .catch((err) => {
        console.log('出错了:',err)
        mp.hideLoading();
        let errMsg ={
          showGoodListEmpty: true,
          type: 1,
          tips: "网络异常，请检查网络",
          btnText: "重新加载",
        }
        this.setDefaultErrMsg(errMsg, tabType);
        wx.reportMonitor(27, 20);
        let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
        let errInfo = err && err.toString();
        let deviceid_pdj_jd = util.getUUIDMD5();
        addFilterMsg(deviceid_pdj_jd)
        addFilterMsg('searchAboutInfoFn');
        addFilterMsg(PDJ_H5_PIN);
        error(errInfo)
      });
  },

  getSearchTagScrollTop(times=100){
    let flag = 0;
    timer && clearInterval(timer);
    timer = setInterval(()=>{
      // console.log('============sdfds======',flag)
      if(flag < 20) {
      wx.createSelectorQuery().select('#searchTag').boundingClientRect((rect)=>{
        let {top = 0} = rect || {};
        if(top > 0 && top != this.data.rectTop){
          // console.log(top, '==================',flag)
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


  fetchNavListData(loadFlag = false) {
    const { searchTag = {}, searchKey = '', recommendObj = {}, height = 0 , 
    channelType = '', channelId =''} = this.data;
    const { itemName = '', query = '' } = searchTag;
    let { currentPageName = "", prePageName = "", pageIdFirstPage = "", refPageSource = "", preTraceId='',preUserAction=''} = this.data.recommendObj;
    return new Promise((resolve) => {
      // 请求开始时间（性能检测上报用）
      requestPreTime = Date.now();
      let requestParams =
        fromSource === "seckill"
          ? FNIDS.homePromotionStoresSearch
          : FNIDS.homeStoresSearch;
      let promoteTypes = fromSource === "seckill" ? ["3"] : [];
      request({
        ...requestParams,
        isForbiddenDialog: true,
        isNeedDealError: true,
        method: "POST",
        body: {
          type: 1,
          latitude: app.globalData.addressInfo.latitude,
          longitude: app.globalData.addressInfo.longitude,
          cityId: app.globalData.addressInfo.cityId,
          key: query || searchKey,
          displayKey: itemName ? `${searchKey} ${itemName}` : searchKey,
          channelId,
          channelType,
          industryTags: [],
          ref: "",
          ctp: "search_results",
          needPreSell: true,
          pageSource: fromSource === 'seckill' ? 'seckillSearchTransitPage':'storeListByKey',
          promoteTypes: promoteTypes,
          refPageSource: refPageSource,
          refPar:  {
            traceId: preTraceId,
            userAction: preUserAction
          }
        },
        pageId: pageIdFirstPage,
        preObj: recommendObj
      })
        .then((res) => {
          if (res.data.code == 0) {
            let result = res.data.result,// 无tab时使用
            storeResult={},// 到店tab使用
            resultObj={},// 小时购tab使用
            initResult = res.data.result;// 有tab时使用
            if(fromSource != 'seckill'){ // 全局搜索使用此逻辑
              let hoursBuyData={},
              resultObj = res.data.result;
              let {tabResultList =[]} = resultObj;
              tabResultList.forEach(e => {
                e.loadData = false
                if(e.tabType==1){
                  hoursBuyData = e;
                  // 处理小时购tab逻辑
                  this.hoursBuyTabData(hoursBuyData, resultObj,res.data.traceId);  
                  this.setData({
                    // tabResultList: tabResultList,
                    hoursBuyTabParams: e.storeConfigList[0].tabParams
                  }) 
                } else if(e.tabType == 2) {
                  storeResult = e
                  this.setData({
                    DdTabParams: e.storeConfigList[0].tabParams
                  }) 
                } else { // tabTape == 1 或其他（理论上不会存在其他值）
                  result = e
                  this.setData({
                    tabParams: e.storeConfigList[0].tabParams
                  }) 
                }
                if(e.selected){
                  this.selectTabBi(e.tabName, 0)
                }
              });
              this.setData({
                tabResultList: tabResultList,
                tabType: tabResultList && tabResultList[0] &&tabResultList[0].tabType,
                height: loadFlag ? height : tabResultList.length < 2 ? (height - 38):(height - 75),
                mgTop: tabResultList.length < 2 ? 'mgT90':'mgT150'
              }) 
            } else {// 秒杀搜索使用此逻辑
              result = res.data.result;
              this.setData({
                height: wx.getSystemInfoSync().windowHeight,
                mgTop: ''
              })
            }
            
            // this.buried.userAction = result.user_action || "未获取到埋点数据";

    
            // 如果全部tab下有数据
            if (result.storeConfigList && result.storeConfigList.length > 0) {
              result.storeConfigList.forEach((item) => {
                item.majorIcon = util.dealImgUrl(28, 28, item.majorIcon);
              });

              if(this.data.traceIdHomeStoresSearch){
                this.setData({
                  searchDesc: initResult.searchDesc || [],
                  navList: result.storeConfigList || [],
                  searchConfig: initResult.searchConfig || {},
                  storeCount: result.storeCount || "",
                  bannerData:
                    (initResult.cmsSearchKeyBannerResult &&
                      initResult.cmsSearchKeyBannerResult.floors &&
                      initResult.cmsSearchKeyBannerResult.floors[0] &&
                      initResult.cmsSearchKeyBannerResult.floors[0].data &&
                      initResult.cmsSearchKeyBannerResult.floors[0].data[0]) ||
                    [],
                });
              }else{
                this.setData({
                  traceIdHomeStoresSearch: res.data.traceId,
                  searchDesc: initResult.searchDesc || [],
                  navList: result.storeConfigList || [],
                  searchConfig: initResult.searchConfig || {},
                  storeCount: result.storeCount || "",
                  bannerData:
                    (initResult.cmsSearchKeyBannerResult &&
                      initResult.cmsSearchKeyBannerResult.floors &&
                      initResult.cmsSearchKeyBannerResult.floors[0] &&
                      initResult.cmsSearchKeyBannerResult.floors[0].data &&
                      initResult.cmsSearchKeyBannerResult.floors[0].data[0]) ||
                    [],
                });
              }
              
              // 图片懒加载
              this.lazyObserver();
              let storeInfo = this.data.navList.find(e => {
                return e.storeId == this.data.storeId
              });
              if (storeInfo) {
                storeInfo.freightWords = storeInfo.ferightDesc
                resolve(storeInfo);
              } else {
                this.data.navList[0].freightWords = this.data.navList[0].ferightDesc
                resolve(this.data.navList[0]);
              }
              if (result.storeConfigList && result.storeConfigList.length && this.data.oneBuriedTab == false) {
                // 默认tab埋点
                clickBuriedV2_({
                  create_time: new Date(),
                  click_id: 'selectTab',
                  click_par: {
                    userAction: result.storeConfigList[0].userAction,
                    isStore: (result.storeConfigList[0].title == "全部" || !result.storeConfigList[0].storeId) ? 0 : 1,
                    tabName: result.storeConfigList[0].title,
                    storeId: result.storeConfigList[0].storeId || '',
                    isLayer: 0,
                    state: 0
                  },
                  currentPageName: currentPageName,
                  prePageName: prePageName,
                  pageId: pageIdFirstPage
                })
                this.setData({ oneBuriedTab: true })
              }
            } 
            let guideFlag = false;
            if(fromSource == 'seckill') {
              guideFlag = (fromSource == 'seckill' && result.storeConfigList && result.storeConfigList.length > 0);
            } else {
              guideFlag = (fromSource != 'seckill' && res.data.result.tabResultList &&  res.data.result.tabResultList.length > 0);
            }
            if(!guideFlag) {
              let linkText =
                (result.paotuiInfo && result.paotuiInfo.paotuiLinkText) || "";
              if (linkText) {
                let guide = {
                  desc: result.paotuiInfo.paotuiDesc,
                  imgUrl: result.paotuiInfo.paotuiImgUrl,
                  descColorCode: result.paotuiInfo.paotuiDescColorCode,
                  linkText: linkText,
                };
                this.setData({
                  showMedicineDefault: false,
                  showEmpty: true,
                  guideData: guide,
                  tips: "抱歉，未能找到您搜索的商品",
                });
              } else {
                this.setData({
                  showMedicineDefault: false,
                  showEmpty: true,
                  type: 4,
                  btnText: "",
                  tips: "抱歉，未能找到您搜索的商品",
                });
              }
            } else {
              resolve({});
            }
          } else if (res.data.code == 50000) {
            this.setData({
              showEmpty: true,
              showMedicineDefault: true,
            });
          } else {
            // 接口返回失败/没网
            this.setData({
              showMedicineDefault: false,
              showEmpty: true,
              type: 1,
              btnText: "重新加载",
              tips: "网络开小差，请稍后再试哦~",
            });
            wx.reportMonitor(28, 20);
          }
        })
        .catch((err) => {
          // 接口返回失败/没网
          this.setData({
            showMedicineDefault: false,
            showEmpty: true,
            type: 1,
            btnText: "重新加载",
            tips: "网络开小差，请稍后再试哦~",
          });
          wx.reportMonitor(28, 20);
          let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
          let errInfo = err && err.toString();
          let deviceid_pdj_jd = util.getUUIDMD5();
          addFilterMsg(deviceid_pdj_jd)
          addFilterMsg('searchAboutNavListFn');
          addFilterMsg(PDJ_H5_PIN);
          error(errInfo)
        });
    });
  },
  fetchData(e = {}) {
    if(e && e.detail && e.detail.type == 'searchTag'){
      this.setData({
        searchTag: {}
      });
    }
    let flag = e && e.detail && e.detail.type;
    return this.fetchNavListData(flag).then((obj) => {
      this.setData({
        ...obj,
      });
      this.buried.storeIdList = obj.storeIdList || [];
      // 有tabs时，初始化其他tabs数据
      let {tabResultList = []} = this.data;
      if(tabResultList.length > 2){
        this.fetchGoodsData('',tabResultList[0].tabType);
      } else if(tabResultList.length == 1) {
        this.fetchGoodsData('', this.data.tabType);
      } else {
        this.fetchGoodsData()
      }
    });
  },
  getGoodList(e) {
    flag += 1;
    let { type, data } = e.detail;
    this.scopedData.type = type;
    if (type == "storeNav") {
      searchFlag = false
      const { multiDisplayFilterFloor = [] } = this.data;
      multiDisplayFilterFloor.forEach((item) => {
        if (item.nodeType == 2 && item.itemList.length) {
          const { itemList = [] } = item;
          itemList.forEach((i) => {
            i.status = false
          })
          item.subFilterName = '';
          item.subFilterCount = 0;
          item.subFilterNameAry = [];
        } else {
          item.status = false
        }
      })
      // 如果是切换门店，那么所有筛选条件置为初始条件
      if(!data.storeId){
        data.storeId = ''
      }
      console.log(data, '====1========')
      this.setData({
        page: 1,
        sortType: "sort_default",
        orderType: "desc",
        filterList: [],
        goodImgLazyLoad: {},
        refreshMiniCartData: !this.data.refreshMiniCartData,
        multiDisplayFilterFloor,
        tabParams: data, // 赋值全局搜索结果页，搜索条件（店信息，827新增）
        ...data // 赋值秒杀搜索条件（storeId、searchAll、recallType、orgCode）
      });
      // 重置价格
      const childSort = this.selectComponent('.sort-new');
      childSort.setData({
        minPriceValue: '',
        maxPriceValue: ''
      })

      wx.pageScrollTo({
        scrollTop: 0,
      });
    } else if (type == "sort" || type == "sortPop") {
      this.setData({
        goodImgLazyLoad: {},
        currentPage: 1,
        sortType: data.sortType,
        orderType: data.orderType,
        page: 1
      });
      // if (this.data.storeInfo.storeName || this.data.bannerData) {
      //   let scrollTop = this.data.bannerData.prefixImgUrl ? 132 : 0;
      //   wx.pageScrollTo({
      //     scrollTop: scrollTop,
      //   });
      // } else {
      //   wx.pageScrollTo({
      //     scrollTop: 0,
      //   });
      // }
    } else if (type == "filter") {
      let displayFilterFloor = this.data.displayFilterFloor;
      let filterList = data.otherfilterList.concat(data.cateList);
      const { multiDisplayFilterFloor = [] } = this.data;
      multiDisplayFilterFloor.forEach((item) => {
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
        page: 1,
        goodImgLazyLoad: {},
        currentPage: 1,
        filterList,
        displayFilterFloor,
        multiDisplayFilterFloor
      });
      wx.pageScrollTo({
        scrollTop: 0,
      });
    } else if (type == "category") {
      let filterList = this.data.filterList || [];
      if (filterList.length > 0) {
        let i = filterList.findIndex((ele) => {
          return ele.filterType == 1 || ele.filterType == 3;
        });
        if (i > -1) {
          filterList.splice(i, 1, data);
        } else {
          filterList.push(data);
        }
      } else {
        filterList = [data];
      }
      this.setData({
        page: 1,
        goodImgLazyLoad: {},
        filterList,
      });
      if (this.data.storeInfo.storeName || this.data.bannerData) {
        let scrollTop = this.data.bannerData.prefixImgUrl ? 132 : 0;
        wx.pageScrollTo({
          scrollTop: scrollTop,
        });
      } else {
        wx.pageScrollTo({
          scrollTop: 0,
        });
      }
    } else if (type == "search") {
      let filterList = this.data.filterList || [];
      let i = filterList.findIndex((ele) => {
        return ele.itemId == data.itemId;
      });
      filterList.splice(i, 1);
      this.setData({
        page: 1,
        goodImgLazyLoad: {},
        filterList,
      });
      wx.pageScrollTo({
        scrollTop: 0,
      });
    } else if (type === "guessLike") {
      let { filterList = [], searchFilterList = [], multiDisplayFilterFloor = [] } = this.data;
      if (filterList && filterList.length) {
        filterList.push(data);
      } else {
        filterList = [data];
      }
      searchFilterList.forEach((item, index) => {
        if (searchFilterList.length == 1) {
          item.firstScreen = searchFilterList[0].length;
        } else {
          item.firstScreen = index > 2 ? 0 : 12;
        }
        item.showAll = false;
        item.selectNames = [];
        item.hasSelectCount = 0;
        filterList.forEach((pageItem) => {
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
      multiDisplayFilterFloor.forEach((item) => {
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
        page: 1,
        filterList: filterList,
        multiDisplayFilterFloor,
        searchFilterList
      })
      wx.pageScrollTo({
        scrollTop: 0,
      });
    } else if (type == 'searchTag') {
      searchFlag = false
      this.setData({
        searchTag: {}
      });
      clickBuriedV2_({
        click_id: "ClickSearchFilter",
        click_par: {
          title: data.itemName
        },
        currentPageName: this.data.recommendObj.currentPageName || "",
        prePageName: this.data.recommendObj.prePageName || "",
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        preObj: this.data.recommendObj
      });
    } else if (type == 'categoryNew') {
      const { multiDisplayFilterFloor = [], searchFilterList = [] } = this.data;
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
      multiDisplayFilterFloor.forEach((item) => {
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
        page: 1,
        filterList: data,
        multiDisplayFilterFloor,
        searchFilterList
      })
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }
    this.fetchGoodsData(type);
  },
  getHoursBuyGoodList(e) {
    flag += 1;
    let { type, data } = e.detail;
    this.scopedData.type = type;
    if (type == "storeNav") {
      searchFlag = false
      const { hoursBuyMultiDisplayFilterFloor = [] } = this.data;
      hoursBuyMultiDisplayFilterFloor.forEach((item) => {
        if (item.nodeType == 2 && item.itemList.length) {
          const { itemList = [] } = item;
          itemList.forEach((i) => {
            i.status = false
          })
          item.subFilterName = '';
          item.subFilterCount = 0;
          item.subFilterNameAry = [];
        } else {
          item.status = false
        }
      })
      this.setData({
        hoursBuyPage: 1,
        hoursBuySortType: "sort_default",
        hoursBuyOrderType: "desc",
        hoursBuyFilterList: [],
        goodImgLazyLoad: {},
        hoursBuyMultiDisplayFilterFloor,
        hoursBuyTabParams: data
        // ...data
      });
      // 重置价格
      const childSort = this.selectComponent('.hours-buy-sort-new');
      childSort.setData({
        minPriceValue: '',
        maxPriceValue: ''
      })

      wx.pageScrollTo({
        scrollTop: 0,
      });
    } else if (type == "sort" || type == "sortPop") {
      this.setData({
        goodImgLazyLoad: {},
        hoursBuySortType: data.sortType,
        hoursBuyOrderType: data.orderType,
        hoursBuyPage: 1
      });
    } else if (type == "filter") {
      let displayFilterFloor = this.data.displayFilterFloor;
      let filterList = data.otherfilterList.concat(data.cateList);
      const { hoursBuyMultiDisplayFilterFloor = [] } = this.data;
      hoursBuyMultiDisplayFilterFloor.forEach((item) => {
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
        hoursBuyPage: 1,
        goodImgLazyLoad: {},
        hoursBuyFilterList: filterList,
      });
      wx.pageScrollTo({
        scrollTop: 0,
      });
    } else if (type == "search") {
      let filterList = this.data.hoursBuyFilterList || [];
      let i = filterList.findIndex((ele) => {
        return ele.itemId == data.itemId;
      });
      filterList.splice(i, 1);
      this.setData({
        hoursBuyPage: 1,
        goodImgLazyLoad: {},
        hoursBuyFilterList: filterList,
      });
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }else if (type == 'searchTag') {
      searchFlag = false
      this.setData({
        searchTag: {}
      });
      clickBuriedV2_({
        click_id: "ClickSearchFilter",
        click_par: {
          title: data.itemName
        },
        currentPageName: this.data.recommendObj.currentPageName || "",
        prePageName: this.data.recommendObj.prePageName || "",
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        preObj: this.data.recommendObj
      });
    } else if (type == 'categoryNew') {
      const { hoursBuyMultiDisplayFilterFloor = [], hoursBuySearchFilterList = [] } = this.data;
      hoursBuySearchFilterList.forEach((item, index) => {
        if (hoursBuySearchFilterList.length == 1) {
          item.firstScreen = hoursBuySearchFilterList[0].length;
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
      hoursBuyMultiDisplayFilterFloor.forEach((item) => {
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
        hoursBuyPage: 1,
        hoursBuyFilterList: data,
        hoursBuyMultiDisplayFilterFloor,
        hoursBuySearchFilterList
      })
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }
    this.fetchGoodsData(type);
  },
  
  mergeList(data) {
    let styleABMap = data.styleABMap || {};
    data.searchResultVOList &&
      data.searchResultVOList.forEach((item) => {
        item.tags && item.tags.forEach((tag) => {
          if (tag.type == 24 || (tag.iconText.indexOf("减") > -1 && tag.iconText.indexOf("运费") > -1)) {
            item.isJianyun = true;
          }
        });
        item.imgUrl = util.dealImgUrl(80, 80, item.imgUrl);
        item.styleABMap = styleABMap;
      });
    let totalList = data.searchResultVOList || [];
    let guessList = (data.searchFilterFloor && data.searchFilterFloor.filterList) || [];
    if (guessList && guessList.length > 0) {
      guessList.forEach((item, index) => {
        item.isShowGuess = true;
        totalList.splice(item.location + index, 0, item);
        if (totalList[item.location + index + 1]) {
          totalList[item.location + index + 1].guessNext = true;
        }
      });
    }
    return totalList;
  },
  forbid(e) {
    this.setData({
      forbidScroll: e.detail.data,
    });
  },
  lazyObserver() {
    // 监听图片懒加载
    LazyLoad && LazyLoad.initObserver &&
      LazyLoad.initObserver((imgId) => {
        if (!this.data.storeImgLazyLoad[imgId]) {
          this.setData({
            [`storeImgLazyLoad.${imgId}`]: true,
          });
        }
        if (!this.data.goodImgLazyLoad[imgId]) {
          this.setData({
            [`goodImgLazyLoad.${imgId}`]: true,
          });
        }
      });
  },
  onDefaultBtnEvent() {
    let {tabType = -1, tabResultList = [], guideData = null} = this.data;
    if (guideData) {
      this.guideClick();
    } else if(tabResultList.length >= 1){
      this.fetchGoodsData('', tabType);
    } else {
      this.fetchData();
    }
  },

  
  guideClick() {
    let key = this.data.searchKey;
    let path =
      "/common/pages/bwmPage/home/index?autoOrderContent=" +
      encodeURIComponent(key) +
      "&channel='djxcxbwm'";
    wx.navigateToMiniProgram({
      appId: "wxcecfde2bc765c661",
      path: path,
    });

    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'ClickBwmSpm',
      click_par: {},
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
    
  },
  // 点击筛选蒙层中的查看按钮埋点
  lookBury(e) {
    // this.buried.standardCatIds = e.detail.standardCatIds || [];
    // this.buried.catIds = e.detail.catIds || [];
    // this.buried.brandIds = e.detail.brandIds || [];
    let {
      standardCatIds = [],
      brandIds = [],
      catIds = []} = e.detail;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'click_filter_name',
      click_par: {
        standardCatIds,
        brandIds,
        catIds
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
  },
  // 点击品牌分类组件的埋点
  catogoryBury(e) {
    this.buried.standardCatIds = e.detail.standardCatIds || [];
    this.buried.catIds = e.detail.catIds || [];
  },
  clickChangeZIndex(e) {
    let { type = "" } = e.detail || {};
    if (type === "zIndexSort") {
      this.setData({
        zIndexSort: 18,
        zIndexNav: 17,
      });
    } else if (type === "zIndexNav") {
      this.setData({
        zIndexSort: 17,
        zIndexNav: 18,
      });
    } else if (type === "zIndexHide") {
      this.setData({
        zIndexSort: 10,
        zIndexNav: 10,
      });
    }
  },
  toMedicine() {
    toMedicine({
      path: `/pages/searchAbout/search-result-new/index?name=${this.data.searchKey || ""}&fromSource='daojia_xcx'&type=${this.data.keyType}&curStoreId=${this.data.curStoreId}`,
      inside: 1
    });
  },
  searchTagTap(e) {
    const { dataset: { item = {} } } = e.currentTarget;
    searchFlag = false
    this.setData({
      searchTag: item,
      filterList: []
    }, () => {
      this.fetchNavListData(true).then((obj) => {
        this.setData({
          ...obj,
        });
        this.buried.storeIdList = obj.storeIdList || [];
        this.fetchGoodsData('searchTag');
      });
    })
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'selectRelateTag',
      click_par: {
        userAction: item.userAction,
        keyword: this.data.itemName,
        itemName: item.itemName
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })

  },
  showModal(e) {
    const { type = '', value = '' } = e.detail;
    const modalData = {
      sortModal: false,
      categoryModal: false,
      hoursBuySortModal: false,
      hoursBuyCategoryModal: false,
      hoursBuyOtherSortModal: false,
      otherSortModal: false,
      storeModal: false,
      hoursBuyStoreModal: false
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
    case 'hoursBuyCategoryModal':
      modalData.hoursBuyCategoryModal = value;
      break;
    case 'hoursBuyStoreModal':
      modalData.hoursBuyStoreModal = value;
      break;
    case 'hoursBuyOtherSortModal':
      modalData.hoursBuyOtherSortModal = value;
      break;
    case 'hoursBuySortModal':
      modalData.hoursBuySortModal = value;
      break;
    default:
      break;
    }

    // 根据筛选弹框处理view属性和赋值
    if(type == "categoryModal" || type == "hoursBuyCategoryModal" || type=='otherSortModal'|| type=='hoursBuyOtherSortModal') {
      this.setData({
        ...modalData
      })
    } else if(fromSource == 'seckill'){
      this.setData({
        viewZIndex: value ? 12 : 0,
        ...modalData
      })
    } else {
      let viewInfo = this.setViewAttribute(value);
      this.setData({
        height: viewInfo.height,
        mgTop: viewInfo.mgTop,
        viewZIndex: viewInfo.viewZIndex,
        ...modalData
      })
    }
  },


  // 根据数据设置容器属性
  setViewAttribute(val){
    let { height , mgTop = '', tabResultList = [], viewZIndex = 0} = this.data;
    let windowHeight = wx.getSystemInfoSync().windowHeight
    if(val) {
      height = windowHeight;
      mgTop = '';
      viewZIndex = 12;
    } else {
      height =  tabResultList.length < 2 ? (windowHeight - 38):(windowHeight - 75);
      mgTop = tabResultList.length < 2 ? (fromSource != 'seckill') ? 'mgT90': '':'mgT150';
      viewZIndex = 0; 
    }
    return {
      height,
      mgTop,
      viewZIndex
    }
  },

  // 腰带组件
  beltBackTop(e) {
    this.setData({
      isBeltShow: true
    })
  },
  handleBackTop() {
    let {tabType = 0} = this.data;
    if(tabType == 1) {
      this.setData({
        hoursBuyTopNum: 0
      })
    } else if(tabType == 2) {
      this.setData({
        DdTopNum: 0
      })
    } else {
      this.setData({
        allTopNum: 0
      })
    }
  },
  // 页头tab选择（8.27新增）
  selectTab(e){
    let {tabType = -1, tabItem = {}} = e.detail;
    let {tabResultList=[], hoursBuyTabClickFlag = false, ddTabClickFlag = false} = this.data;
    tabResultList.forEach(v => {
      if(v.tabType == tabType){
        v.selected = 1;
        !v.loadData && this.fetchGoodsData('', tabType);
        this.selectTabBi(v.tabName)
      } else {
        v.selected = 0;
      }
    });
    this.setData({
      tabResultList: JSON.parse(JSON.stringify(tabResultList)),
      tabType,
      businessName: tabItem.tabName,
      searchAll: true,
      isBeltShow: tabType == 2 ? false : true
    })
  },

  // tab选择埋点
  selectTabBi(tabTypeName = '', stateFlag){
    let { currentPageName = '', prePageName = '', pageIdFirstPage ='', searchKey = ''} = this.data;
    let params = {
      keyword: searchKey,
      tabType: tabTypeName,
    }
    if(stateFlag == 0){
      params.state = 0
    }
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'selectTab',
      click_par: params,
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage,
    })
  },
  selectNearby(e){
    let {showNearby = false} = e.detail;
    this.setData({
      showNearby
    })
  },

  // 附近筛选弹窗-关闭
  clickClosePop() {
    this.setData({
        showNearby: false
    })
  },

  // 附近筛选弹窗-确认
  clickConfirm(e){
    let { filterType = 0, lastItemList = [], names='',itemActive = [], subItemActive = [], thirdItemActive = []  } = e.detail;
    let title = '选择附近好店/热门商圈';
    if(filterType == 8 && names){
      title = '距您当前位置'
    } else if (filterType == 9 && names){
      title = '热门商圈';
    }
    let nearbyObj = {
      title,
      text: names,
      lastItemList
    }
    this.setData({
      showNearby: false,
      nearbyObj,
      ddPage: 1
    })
    this.fetchGoodsData();

    // 埋点
    let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
    this.data.recommendObj || {};
    let filterList = this.deepClone(itemActive);
    if (filterList[0]) {
        filterList[0].itemList = subItemActive;
        if (filterList[0].itemList[0]) {
            filterList[0].itemList[0].subItemList = thirdItemActive;
        }
    }

    let clickPar = {
        "element": "filter",
        "tabType": '到店',
        "businessType": this.data.tabType,
        "businessName": this.data.businessName,
        "tagFilterName": "nearbyFilter",
        filterList
    };
    clickBuriedV2_({
        click_id: "clickConfirm",
        click_par: clickPar,
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
    })
  },

  // 深拷贝
  deepClone(obj) {
    var newObj = obj;
    if (obj) {
      newObj = JSON.stringify(obj);
      newObj = JSON.parse(newObj);
    }
    return newObj;
},
  
  clickReset(){
    this.setData({
      showNearby: false
    })
  },

  // 处理小时购tab下的页头数据
  hoursBuyTabData(result, resultObj, traceId){
    let {traceIdHomeStoresSearch =''} = this.data;
    if (result.showStoreList && result.storeConfigList && result.storeConfigList.length > 0) {
      result.storeConfigList.forEach((item) => {
        item.majorIcon = util.dealImgUrl(28, 28, item.majorIcon);
      });
      this.setData({
        traceIdHomeStoresSearch: traceIdHomeStoresSearch ? traceIdHomeStoresSearch: traceId,
        hoursBuySearchDesc: resultObj.searchDesc || [],
        hoursBuyNavList: result.storeConfigList || [],
        searchConfig: resultObj.searchConfig || {},
        hoursBuyStoreCount: result.storeCount || "",
        hoursBuyBannerData:
          (resultObj.cmsSearchKeyBannerResult &&
            resultObj.cmsSearchKeyBannerResult.floors &&
            resultObj.cmsSearchKeyBannerResult.floors[0] &&
            resultObj.cmsSearchKeyBannerResult.floors[0].data &&
            resultObj.cmsSearchKeyBannerResult.floors[0].data[0]) ||
          [],
      });
      // 小时购当前选中店铺
      let hoursBuyStoreInfo = this.data.hoursBuyNavList.find(e => {
        return e.storeId == this.data.hoursBuyStoreId
      });
      if (hoursBuyStoreInfo) {
        hoursBuyStoreInfo.freightWords = hoursBuyStoreInfo.ferightDesc
        this.setData({
          hoursBuyStoreInfo
        })
      } else {
        this.data.hoursBuyNavList[0].freightWords = this.data.hoursBuyNavList[0].ferightDesc
        this.setData({
          hoursBuyStoreInfo:this.data.hoursBuyNavList[0]
        })
      }
    }
  },
  // 处理有门店信息或banner信息的滚动位置
  hoursBuyPageScrollTop(){
    if (this.data.hoursBuyStoreInfo.storeName || this.data.hoursBuyBannerData) {
      let scrollTop = this.data.hoursBuyBannerData.prefixImgUrl ? 132 : 0;
      wx.pageScrollTo({
        scrollTop: scrollTop,
      });
    } else {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }
  },
  scrollLower(e){
      let {tabType = '0', page = 1,ddPage = 1, hoursBuyPage =1, hasNextPage =false,DdHasNextPage =false,hoursBuyHasNextPage=false} = this.data;
      if(this.data.Loading) {
        return
      }
      this.data.Loading = true
      console.log(hoursBuyPage, '444')
      if (tabType == 1) {
        this.setData({
          hoursBuyPage: hoursBuyPage + 1
        });
        hoursBuyHasNextPage && this.fetchGoodsData('reachbottom');
      } else if(tabType == 2){
        this.setData({
          ddPage: ddPage + 1
        })
        DdHasNextPage && this.fetchGoodsData('reachbottom');
      } else {
        this.setData({ 
          page: page + 1
        });
        hasNextPage && this.fetchGoodsData('reachbottom');
      }
      this.LoadingScrollFn();
      
  },
  scrollPull(e){
    let {allScrollTop = 0, fading = false, tabType = 0, tabResultList = []} = this.data;
    if(fading || (fromSource != 'seckill' && tabType!=0)) {
      return
    }
    if(e.detail.scrollTop > allScrollTop) {
      this.setData({
        onPullDown: false,
        allScrollTop: e.detail.scrollTop
      })
    } else {
      this.setData({
        onPullDown: true,
        allScrollTop: e.detail.scrollTop
      })
    }
    if(e.detail.scrollTop > 500) {
      this.setData({
        hideBackTop: false
      })
      this.showBackTop();
    } else {
      this.setData({
        hideBackTop: true
      })
    }
    // 使用老样式，外露筛选项滚动定位顶部
    (!tabResultList || tabResultList.length <= 1) && this.controlHeadFix(e.detail.scrollTop)
    if(!fading) {
      this.setData({
        fading: true
      })
    }
    // 滑动停止需要展示侧边栏
    this.fadingFn()
  },
  hoursBuyScrollPull(e){
    let {hoursBuyScrollTo = 0, fading = false, tabType= 0} = this.data;
    if(fading || tabType != 1) {
      return
    }
    if(e.detail.scrollTop > hoursBuyScrollTo) {
      this.setData({
        hoursBuyOnPullDown: false,
        hoursBuyScrollTo: e.detail.scrollTop
      })
    } else {
      this.setData({
        hoursBuyOnPullDown: true,
        hoursBuyScrollTo: e.detail.scrollTop
      })
    }
    if(e.detail.scrollTop > 500) {
      this.showBackTop();
      this.setData({
        hoursBuyHideBackTop: false
      })
    } else {
      this.setData({
        hoursBuyHideBackTop: true
      })
    }
    if(!fading) {
      this.setData({
        fading: true
      })
    }
     // 滑动停止需要展示侧边栏
    this.fadingFn()
  },
  DdScrollPull(e){
    let {fading = false, tabType= 0} = this.data;
    if(fading || tabType != 2) {
      return
    }
    if(e.detail.scrollTop > 600) {
      this.setData({
        DdHideBackTop: false
      })
      this.showBackTop();
    } else {
      this.setData({
        DdHideBackTop: true
      })
    }
  },
  fadingFn() {
     // 滑动停止需要展示侧边栏
    this.data.fadeSrcoll && clearTimeout(this.data.fadeSrcoll);
      this.data.fadeSrcoll = setTimeout(() => {
        this.setData({
        fading: false
      })
    }, 100)
  },
  LoadingScrollFn(){
    this.data.LoadingScroll && clearTimeout(this.data.LoadingScroll);
      this.data.LoadingScroll = setTimeout(() => {
        this.data.Loading = false
    }, 1000)
  },
  // 设置tabs 空白页信息
  setDefaultErrMsg(errMsg, tabType){
    if(tabType == 1){
      this.setData({
        showEmpty: false,
        hoursBuyDefaultErrObj: errMsg
      });
    } else if (tabType == 2) {
      this.setData({
        showEmpty: false,
        DdDefaultErrObj: errMsg
      });
    } else {
        this.setData({
          showEmpty: false,
          allDefaultErrObj: errMsg
        });
    }
  }
});

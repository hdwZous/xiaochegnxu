
import {
  handleMongClick,
  getGoodsList,
  sortTypeClick,
  handleShowSearchClick,
  searchInput,
  goToDetail,
  getPriceDiff,
  _UPDATEGOODSNUM,
  onLoad,
  onShow,
  onReachBottom,
  clickCategory,
  data,
  toggleSpuSelector,
  fetchCatData,
  goSettlement,
  showHomeOrBack,
  goBack,
  goHome,
  hidePop,
  popback,
  cancel,
  confirm
} from "../common/server";
import emitter from '../../../common/util/events'
import { pvBuriedV2_, clickBuriedV2_  } from '../../../common/util/BI'

let _data = { 
  tipsByListApi: true,
  self_page:'collectFreight'
 }
let app = getApp();
Page({
  // 页面数据
  data: Object.assign(_data, data),
  // 获取列表数据
  getGoodsList() {
    getGoodsList(this);
  },
  // 获取购物车接口
  fetchCatData() {
    fetchCatData(this);
  },
  goSettlement() {
    goSettlement(this, 1);
    clickBuriedV2_({
      click_id: "goCart",
      click_par: {
        storeId: this.data.storeId || "",
        btnName: this.data.catText || '',
        couponId: this.data.couponId || ''
      },
      pageId: this.data.recommendObj.pageIdFirstPage || '',
      currentPageName: this.data.recommendObj.currentPageName || '',
      prePageName: this.data.recommendObj.prePageName || ''
    })
  },
  showHomeOrBack() {
    showHomeOrBack(this);
  },
  goBack(e) {
    if (this.data.fromPage == "settle" && this.data.cartButton == 1) {
      this.showLayer();
    }
    goBack(e, this);
  },
  goHome() {
    goHome(this);
  },
  hidePop() {
    hidePop(this);
  },
  popback() {
    popback(this);
  },
  cancel() {
    cancel(this);
  },
  confirm() {
    confirm(this, 1);
  },
  // 排序tab切换
  sortTypeClick(e) {
    // let type = e.target.dataset.type || 1;
    // if (type == 1) {
    //   this.buried.sortType = "default_sort";
    // } else if (type == 2) {
    //   this.buried.sortType = "sales_volume";
    // } else if (type == 3) {
    //   this.buried.sortType = "price";
    // }
    sortTypeClick(this, e);
  },
  // 点击蒙层
  handleMongClick() {
    handleMongClick(this);
  },
  // 点击搜索框 生成蒙层
  handleShowSearchClick(e) {
    handleShowSearchClick(this, e);
  },
  // 搜索框输入
  searchInput(e) {
    searchInput(this, e);
  },
  // 点击搜索 跳转到凑单搜索页
  handleSearchClick(e) {
    // handleSearchClick(this, e)
    let { keyword, params, recommendObj = null } = this.data;
    let body = {
      ...params,
      keyword: keyword,
    };
    body = JSON.stringify(body);
    wx.navigateTo({
      url: `/pages/addOnFreight/freightSearch/index?params=${body}`,
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'addonfreight_freight_handleSearchClick'
      }
    });
    this.setData({
      isShowSearchLayout: false,
      focus: false,
      isShowSearchCancel: true,
      keyword: "",
    });
    clickBuriedV2_({
      click_id: "search",
      click_par: {
        keyword
      },
      pageId: recommendObj.pageIdFirstPage || '',
      currentPageName: recommendObj.currentPageName || '',
      prePageName: recommendObj.prePageName || ''
    })
  },
  // 去商品详情
  goToDetail(e) {
    goToDetail(this, e);
  },
  getPriceDiff() {
    getPriceDiff(this);
  },
  // 更新当前页面商品数量 skuId, cartNum, clear, spuId
  _UPDATEGOODSNUM(obj) {
    _UPDATEGOODSNUM(this, obj);
  },
  toggleSpuSelector() {
    toggleSpuSelector(this);
  },
  // 监听商品加减车变化
  onAddMinControllerChange(e) {
    
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    onLoad(this, options, app);
    let params = JSON.parse(options.params);
    if (params.fromPage && params.fromPage == "settle") {
      emitter.emit('goaddOn')
    }
  },
  // 生命周期函数--监听页面显示
  onShow: function () {
    onShow(this);
  },
  pvFunc(back) {
    // 埋点
    let { price = '', recommendObj: {pageIdFirstPage = '', currentPageName = '', prePageName = ''} = {} } = this.data;
    pvBuriedV2_({
      page_par: {
        amount: price
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName,
      isBack: back || "",
    })
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    onReachBottom(this);
  },
  clickCategory(e) {
    clickCategory(this, e);
  },
  showLayer() {
    clickBuriedV2_({
      click_id: "showLayer",
      click_par: {
        storeId: this.data.storeId || "",
        type: 'block'
      },
      pageId: this.data.recommendObj.pageIdFirstPage || '',
      currentPageName: this.data.recommendObj.currentPageName || '',
      prePageName: this.data.recommendObj.prePageName || ''
    })
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

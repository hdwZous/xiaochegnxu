
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
let app = getApp();
import { pvBuriedV2_, clickBuriedV2_  } from '../../../common/util/BI'
let _data = {
  self_page:'collectFreightSearchResult'
}
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
    goSettlement(this, 2);
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
    confirm(this, 2);
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
  // 点击搜索 刷新当前页
  handleSearchClick(e) {
    this.setData({
      isShowSearchLayout: false,
      focus: false,
      isShowSearchCancel: true,
      pageCount: 1,
      isFinish: false,
      goodList: [],
    });
    this.getGoodsList();
    let { keyword, recommendObj = null } = this.data;
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
  },
  // 生命周期函数--监听页面显示
  onShow: function () {
    onShow(this);
  },
  pvFunc(back) {
    let { recommendObj: {pageIdFirstPage = '', currentPageName = '', prePageName = ''} = {} } = this.data;
    pvBuriedV2_({
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName,
      isBack: back || ""
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

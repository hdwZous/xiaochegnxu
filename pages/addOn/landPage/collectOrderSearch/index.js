
import {
  handleMongClick,
  getGoodsList,
  sortTypeClick,
  handleShowSearchClick,
  searchInput,
  goToDetail,
  getPriceDiff,
  onMiniCartWidgetEvent,
  upDateGoodsNum,
  _UPDATEGOODSNUM,
  onAddMinControllerChange,
  onLoad,
  onShow,
  onReachBottom,
  updateTips,
  goToStore,
  data,
  toggleSpuSelector,
  onSpuSelectorEvent,
  onDefaultBtnEvent
} from '../common/server'
import { pvBuriedV2_, clickBuriedV2_ } from '../../../../common/util/BI'
let app = getApp();
let _data = {
  self_page:'collectOrderSearchResult'
}
Page({
  // 页面数据
  data: Object.assign(_data, data),
  // 获取列表数据
  getGoodsList() {
    getGoodsList(this)
  },
  // 排序tab切换
  sortTypeClick(e) {
    sortTypeClick(this, e)
  },
  // 点击蒙层
  handleMongClick() {
    handleMongClick(this);
  },
  // 点击搜索框 生成蒙层
  handleShowSearchClick(e) {
    handleShowSearchClick(this, e)
  },
  // 搜索框输入
  searchInput(e) {
    searchInput(this, e)
  },
  // 点击搜索 刷新当前页
  handleSearchClick(e) {
    this.setData({
      isShowSearchLayout:false,
      focus:false,
      isShowSearchCancel:true,
      isFinish: false,
      goodList: []
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
    goToDetail(this, e)
  },
  // 去门店
  goToStore(){
    goToStore(this)
  },
  // 加减车后重新获取tips文案
  getPriceDiff() {
    getPriceDiff(this)
  },
  // 监听mini购物车事件
  onMiniCartWidgetEvent(e) {
    onMiniCartWidgetEvent(this, e)
  },
   // 更新当前页面商品数量 skuId, cartNum, clear, spuId
   _UPDATEGOODSNUM(obj) {
    _UPDATEGOODSNUM(this, obj)
  },
  toggleSpuSelector() {
    toggleSpuSelector(this)
  },
  onSpuSelectorEvent(e) {
    onSpuSelectorEvent(this, e)
  },
  // 更新凑单tips
  updateTips(data) {
    updateTips(this, data)
  },
  // 监听商品加减车变化
  onAddMinControllerChange(e) {
    onAddMinControllerChange(this, e)
  },
  // 生命周期函数--监听页面加载
  onLoad: function(options) {
    onLoad(this, options);
    // 获取凑单页tips文案
    let pages = getCurrentPages();
    let len = pages.length;
    let lastPage = pages[len - 2] || {};
    if(lastPage.route == 'pages/addOn/landPage/collectOrderList/index') {
      let {togetherOrderInfo} = lastPage.data;
      if(togetherOrderInfo) {
        this.setData({
          togetherOrderInfo
        })
      }
    }
    
    
  },
  // 生命周期函数--监听页面显示
  onShow: function () {
    onShow(this);
  },
  pvFunc(back) {
    let { storeId = '', promotionId = '', keyword = '', recommendObj: {pageIdFirstPage = '', currentPageName = '', prePageName = ''} = {} } = this.data;
    pvBuriedV2_({
      page_par: {
        storeId,
        promotionId,
        keyword
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName,
      isBack: back || "",
    })
  },
  onDefaultBtnEvent(e) {
    onDefaultBtnEvent(this, e)
  },
  onSpuSelectorEvent(e) {
  let {type, data} = e.detail || {}
  if (type == 'closeSpu') {
    this.setData({
      toggle: false
    })
  }
}
  // 页面上拉触底事件的处理函数
  // onReachBottom: function () {
  //   onReachBottom(this)
  // },
  
});

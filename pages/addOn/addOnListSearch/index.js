
import {
  handleMongClick,
  getGoodsList,
  getGoodsListDesc,
  refreshOrder,
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
  confirm,
  showModal,
  onDefaultBtnEvent
} from "../common/index";
import { pvBuriedV2_, clickBuriedV2_ } from "../../../common/util/BI";
let app = getApp();
let _data = {
  self_page:'PieceTogetherSearchResult'
}
Page({
  // 页面数据
  data: Object.assign(_data, data),
  // 获取列表数据
  getGoodsList(buriedtypes) {
    getGoodsList(this, buriedtypes);
  },
  // 获取列表数据--文案
   getGoodsListDesc() {
    getGoodsListDesc(this);
  },
  // 点击去凑单，刷新页面
  refreshOrder() {
    refreshOrder(this);
  },
  // 获取购物车接口
  fetchCatData() {
    fetchCatData(this);
  },
  goSettlement() {
    goSettlement(this, 2);
  },
  showHomeOrBack() {
    showHomeOrBack(this);
  },
  goBack(e) {
    goBack(e, this, 2);
  },
  goHome() {
    goHome(this);
  },
  hidePop(e) {
    hidePop(this, e);
  },
  popback(e) {
    popback(this, e);
  },
  cancel() {
    cancel(this);
  },
  confirm() {
    confirm(this, 2);
  },
  // 排序tab切换
  sortTypeClick(e) {
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
      displayFilterFloor: [],
      screen: {}
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
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    onLoad(this, options, app);
  },
  // 生命周期函数--监听页面显示
  onShow: function () {
    onShow(this);
  },
  // pv埋点上报
  pvFunc(back) {
    let recommendObj = this.data.recommendObj || {};
    pvBuriedV2_({
      create_time: new Date(),
      page_par: {
        storeId: this.data.storeId,
        limitType: this.data.limitType,
        couponId: this.data.couponId,
        keyWord: this.data.keyword
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || "",
      isBack: back || "",
    });
  },
  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    onReachBottom(this);
  },
  clickCategory(e) {
    clickCategory(this, e);
  },
  onGetGoods(e) {
    let { data: { sortType = '', orderType = '' } = {}, type = '' } = e.detail;
    this.setData({
      pageCount: 1
    })
    if (type == "sort") {
      this.setData({
        sortType: sortType,
        orderType,
        imgLazyLoad: {},
      });
      this.getGoodsList();
      wx.pageScrollTo({
        scrollTop: 0,
      });
    } else if (type == "filter") {
      let { cateList = [], otherfilterList = [], priceFilter } = e.detail.data;
      let { displayFilterFloor = [] } = this.data;
      let filterList = otherfilterList;
      let cateItem = {};
      if (Array.isArray(cateList)) {
        cateItem = cateList[0];
      }
      cateItem && cateItem.itemName && (filterList.push(cateItem));
      displayFilterFloor.forEach((item) => {
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
        categoryId: (cateList.length > 0 && cateList[0].itemId) || 0,
        filterList,
        displayFilterFloor,
        imgLazyLoad: {},
        priceFilter,
      });
      this.getGoodsList('filter');
      wx.pageScrollTo({
        scrollTop: 0,
      });
    } else if (type == 'categoryNew') {
      const { data } = e.detail;
      const { displayFilterFloor = [] } = this.data;
      displayFilterFloor.forEach((item) => {
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
        displayFilterFloor
      })
      this.getGoodsList();
			wx.pageScrollTo({
				scrollTop: 0,
			});
    }
  },
  showModal(e) {
    showModal(this, e)
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
});

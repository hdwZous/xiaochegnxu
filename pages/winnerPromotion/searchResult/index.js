import { searchList } from '../services/index'
import { SORT_TYPE, SORT_TYPE_ORDER } from './constant'

Page({
  data: {
    isFixed: false, // 禁止页面滑动
    showBackTop: false,
    isEmpty: true,
    showMedicineDefault: false, // 屏蔽医药
    type: 0, // 异常类型
    tips: '', // 异常提示
    btnText: '', // 异常按钮名称

    longitude: '',
    latitude: '',
    searchKey: '', // 搜索关键字
    filterList: [], // 筛选入参
    storeId: '',
    orgCode: '',
    pageNum: 1,
    hasMore: true, // 是否还有下一页数据

    goodList: [], // 商品列表
    showFilter: false, // 是否展示筛选按钮
    filterOptions: [], // 筛选蒙层列表
    sortType: SORT_TYPE.default,
    orderType: SORT_TYPE_ORDER.desc,
    displayFilterFloor: {}, // 外部展示的分类

    windowHeight: 0, // 设备高度
  },
  onLoad(options) {
    return this.init(options)
  },
  onReachBottom: function () {
    const { pageNum, hasMore } = this.data
    if (!hasMore) return
    this.setData({ pageNum: pageNum + 1 })
    this.fetchData()
  },

  onPageScroll(e) {
    const { windowHeight } = this.data
    this.setData({ showBackTop: e.scrollTop >= windowHeight })
  },

  async init(options) {
    const { searchKey, storeId, orgCode, channelId } = options

    this.setData({
      searchKey: decodeURIComponent(searchKey),
      storeId,
      orgCode,
      channelId,
      // latitude,
      // longitude,
      windowHeight: wx.getSystemInfoSync().windowHeight,
    })
    return await this.fetchData().catch((err) => {
      console.log('err: ', err)
      this.setData({
        showEmpty: true,
        showMedicineDefault: false,
        type: 1,
        btnText: '重新加载',
        tips: '网络开小差，请稍后再试哦',
      });
    })
  },

  async fetchData() {
    let { pageNum } = this.data
    const { searchKey, storeId, orgCode, sortType, orderType, filterList } = this.data

    const res = await searchList({
      key: searchKey,
      storeId,
      orgCode,
      sortType,
      orderType,
      page: pageNum,
      pageSize: 10,
      needRec: true, // 是否在尾页返回推荐信息
      needAggrCats: true, // 是否需要在分页查询的首页聚合召回结果的一级分类信息
      showSoldOutSkus: true,
      needPreSell: true, // 是否需要预售数据，默认值
      pageName: getCurrentPages()[0].route,
      filterList: filterList || [],
    })

    const { code, result } = res
    if (+code === 5000) {
      this.setData({
        showMedicineDefault: true,
        showEmpty: true,
      })
      return
    }
    if (+code !== 0) {
      this.setData({
        showEmpty: true,
        showMedicineDefault: false,
        type: 1,
        btnText: '重新加载',
        tips: '网络开小差，请稍后再试哦~',
      })
      return
    }

    const data = {
      hasMore: result.hasNextPage,
      pageNum: result.page
    }

    let goodList = result.searchResultVOList || []

    goodList = goodList.map(item => ({
      ...item,
      incartCount: item.showModel == 1 ? item.spuCartCount : undefined,
      tags: item.tags.map(tag => {
        const isJianyun = tag.type === 24 || (tag.iconText.includes('减') && tag.iconText.includes('运费'))
        return {
          ...tag,
          isJianyun
        }
      })
    }))

    if (pageNum === 1) {
      this.setData({
        showEmpty: false,
        type: 4,
        btnText: '',
        tips: '没有找到您要的商品',
        displayFilterFloor: result.displayFilterFloor,  // 外部展示的分类
        filterOptions: result.searchFilter.filterList || [], // 筛选蒙层的筛选列表
        showFilter: result.searchFilter.showFilter || false, // 是否展示筛选按钮
        goodList: goodList,
        ...data,
        isEmpty: false,
      })
    } else {
      this.setData({
        goodList: this.data.goodList.concat(goodList),
        ...data,
        isEmpty: false,
      })
    }
  },

  handleExceptionReload(e) {
    const { type } = e.detail
    if (type == 1) {
      this.fetchData()
    }
  },

  // 点击筛选或排序来重新调用接口
  handleSortChange(e) {
    const { type, data } = e.detail
    if (type == 'sort') {
      this.setData({
        pageNum: 1,
        sortType: data.sortType,
        orderType: data.orderType,
      })
    } else if (type == 'filter') {
      let { displayFilterFloor } = this.data
      let filterList = data.filterList
      // 解决当用户手动将品类筛选滑动到右侧并没选中任何分类时，切换排序时，要将品类筛选初始化到原位
      if (filterList.length == 0) {
        displayFilterFloor = {}
      }
      this.setData({
        pageNum: 1,
        filterList,
        displayFilterFloor,
      })
    } else if (type == "search") {
      let filterList = this.data.filterList || [];
      let i = filterList.findIndex((ele) => {
        return ele.itemId == data.itemId;
      })
      filterList.splice(i, 1);
      this.setData({
        filterList,
      })
    }

    wx.pageScrollTo({ scrollTop: 0 })
    this.fetchData()
  },

  handleCategoryChange(e) {
    const item = e.detail
    let { filterList = [] } = this.data
    if (filterList.length > 0) {
      let index = filterList.findIndex((i) => i.filterType === 1)
      filterList.splice(index, 1, item)
    } else {
      filterList = [item]
    }
    this.setData({ filterList })
    this.fetchData()
  },
  handleBackTop() {
    wx.pageScrollTo({ scrollTop: 0 })
  },
})

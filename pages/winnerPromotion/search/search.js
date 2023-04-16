import { searchHotWordList } from '../services/index'
import { djGetLocation } from '../utils/modules/dj_wx_mini_util'

const SEARCH_HISTORY_KEY = 'search_history'

Page({
  data: {
    storeId: '',
    orgCode: '',
    searchHistories: [], // 历史搜索
    searchHotWords: [], // 热门搜索
    searchKey: '',
    // showValue: false, //是否展示回显值
  },
  onLoad(options) {
    const { storeId, orgCode, channelId, searchKey } = options
    const searchHistories = wx.getStorageSync(SEARCH_HISTORY_KEY)
    console.log('search::: ', { storeId, orgCode, channelId, searchKey })

    this.setData({
      storeId,
      orgCode,
      channelId,
      searchKey,
      searchHistories: searchHistories || []
    })
    this.getHotWords()
  },
  async getHotWords() {
    const { latitude, longitude } = await djGetLocation()
    const { storeId } = this.data
    const res = await searchHotWordList({
      type: 2,
      size: 12,
      latitude,
      longitude,
      storeIds: [storeId],
      pageSource: 'storeSearch'
    })
    const { code, result } = res
    if (+code !== 0) return

    const searchHotWords = result.hotWordVOList.map(i => ({
      ...i,
      iconUrl: result.iconUrl,
      color: result.color
    }))
    this.setData({ searchHotWords })
  },
  toSearchResult(searchKey, keyType, userAction) {
    const { storeId, orgCode, channelId } = this.data
    wx.redirectTo({
      url: `/pages/winnerPromotion/searchResult/index?searchKey=${searchKey}&storeId=${storeId}&orgCode=${orgCode}&showValue=true&channelId=${channelId}`,
    })
  },
  handleRealSearch(value, tagType, userAction) {
    if (value) {
      this.saveSearchHistories(value) // 保存搜索记录
      this.toSearchResult(value || '', tagType || '', userAction || '')
    }
  },
  handleInputSearch(e) { // 点击搜索按钮或者按回车
    const { value, tagType } = e.detail
    this.handleRealSearch(value, tagType)
  },
  saveSearchHistories(value) { // 保存历史记录
    let { searchHistories } = this.data
    searchHistories.forEach((item, index) => {
      if (item.keyWord == value) {
        searchHistories.splice(index, 1)
      }
    })
    searchHistories.unshift({ keyWord: value })
    searchHistories = searchHistories.slice(0, 19)
    this.setData({ searchHistories })
    wx.setStorageSync(SEARCH_HISTORY_KEY, searchHistories)
  },

  handleClearHistories() {
    wx.showModal({
      content: '确定清空全部搜索历史吗？',
      cancelColor: '#999999',
      confirmColor: '#47B34F',
      success: (res) => {
        if (!res.confirm) return
        this.setData({ searchHistories: [] })
        wx.removeStorage({
          key: SEARCH_HISTORY_KEY,
          success: (_) => {
            wx.showToast({
              title: '搜索历史已清空',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    })
  },
  handleHistorySearch(e) {
    this.handleRealSearch(e.currentTarget.id, 'history')
  },
  handleHotSearch(e) {
    let { item } = e.currentTarget.dataset
    this.handleRealSearch(item.hotWords, 'hotkey')
  },
})

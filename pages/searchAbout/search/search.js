import { request, FNIDS } from "../../../common/util/api"
import { djCmsJump } from '../../../common/util/agreementV2';
import {
  pvBuriedV2_
} from "../../../common/util/BI"
import util from '../../../common/util/util'
import { addFilterMsg, error } from '../../../common/util/wxLog';

var app = getApp()
// var COLOR_BTN_DEFAULT = "#0"
// 保存、读取 历史搜索记录 KEY
var KEY_HISTORY = "search_history"
Page({
  buried: {
    storeId: '',
    userAction: '',
    channelId: ''
  },
  data: {
    fromSource: "", // 来源："":首页，"storehome":门店页
    curStoreId: null,
    orgCode: '',
    industryTag: '',
    historySearch: [], // 历史搜索
    hotSearch: [], // 热门搜索
    searchKey: "",
    ids: '',
    showValue: false, // 是否展示回显值
    traceId: '',
    rankTraceId: '',
    isCart: true,
    searchFloorList: []
  },
  exposureObj: {
    selector: '.wrapper .search_list'
  },
  onLoad (options) {
    this.setData({
      searchKey: options.searchKey || "", // 从结果页点击搜索框跳转回来携带的参数
      fromSource: options.fromSource ? options.fromSource : "",
      curStoreId: options.curStoreId || "",
      orgCode: options.orgCode ? options.orgCode : "",
      industryTag: options.industryTag || '',
      storeId: options.curStoreId,
      ids: options.ids || "",
      storeIdList: options.ids ? options.ids.split(",") : [],
      channelBusiness: options.channelBusiness,
      channelId: options.channelId,
      channelType: options.channelType,
      showValue: options.showValue,
      isCart: options.isCart
    })
    wx.getStorage({
      key: KEY_HISTORY,
      success: (res) => {
        this.setData({
          historySearch: res.data || []
        })
      }
    })
    this.getHotWords() // 调用热门搜索词接口
    if (!options.fromSource || options.fromSource === 'newChannel') {
      this.getSearchRank()
    }
    this.buried.storeId = this.data.ids || ''
    this.buried.channelId = options.channelId || ''
  },
  onShow () {
  },
  pvFunc (back) {
    /* eslint-disable camelcase */
    let {recommendObj = {}, channelId = '', storeId = ""} = this.data;
    pvBuriedV2_({
      page_par: {
        channelId: channelId,
        storeId: storeId,
        ref_par: {
          traceId: recommendObj.preTraceId || "",
          userAction: recommendObj.preUserAction || "",
          pageId: recommendObj.pageIdFirstPage || ""
        }
      },
      pageId: recommendObj.pageIdFirstPage || "",
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      'isBack': back || ''
    })
    /* eslint-disable camelcase */
  },
  onShareAppMessage () {
    // eslint-disable-next-line
    var shareUtil = require("../../../common/util/share_utils.js")
    var url = shareUtil.getShareUrl()
    return {
      title: "京东到家",
      path: url
    }
  },
  getHotWords () { // 获取热门搜索词
    this.makeRequest(FNIDS.getHotWords).then(res => {
      this.initHotWordsResult(res.data || {})
    }).catch((err) => {
      wx.reportMonitor(30, 20);
      let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
      let errInfo = err && err.toString();
      // eslint-disable-next-line camelcase
      let deviceid_pdj_jd = util.getUUIDMD5();
      addFilterMsg(deviceid_pdj_jd)
      addFilterMsg('searchGetHotWordsFn');
      addFilterMsg(PDJ_H5_PIN);
      error(errInfo)
    })
  },
  getSearchRank () {
    this.makeRequest(FNIDS.djSearchRankList)
      .then(res => {
        const { code, result, traceId } = res.data || {}
        if (code == 0) {
          const { searchFloorList = [] } = result || {}
          this.setData({
            searchFloorList,
            rankTraceId: traceId || ''
          })
        }
      })
  },
  makeRequest (functionKey) {
    const { functionId = '', appVersion = '' } = functionKey
    let {pageIdFirstPage = "", preUserAction = "", preTraceId = "", refPageSource = ""} = this.data.recommendObj;
    let refPar = JSON.stringify({
      traceId: preTraceId,
      userAction: preUserAction,
      pageId: pageIdFirstPage
    })
    return request({
      functionId,
      appVersion,
      body: {
        "type": 2,
        "size": 12,
        "latitude": app.globalData.addressInfo.latitude,
        "longitude": app.globalData.addressInfo.longitude,
        "storeIds": this.data.fromSource == "storehome" ? [this.data.curStoreId] : [],
        "channelId": this.data.channelId,
        "channelBusiness": this.data.channelBusiness,
        "pageSource": this.data.fromSource == "storehome" ? "storeSearch" : "searchTransitPage",
        "refPar": refPar,
        "refPageSource": refPageSource
      },
      pageId: pageIdFirstPage,
      preObj: this.data.recommendObj || {}
    })
  },
  initHotWordsResult (res) { // 初始化热门搜索词
    let result = res.result || {}
    let words = result.hotWordVOList || []
    words.forEach(item => {
      item.iconUrl = result.iconUrl
      item.color = result.color
    })
    this.setData({
      hotSearch: words,
      traceId: res.traceId
    })
    this.exposureInit();
  },
  handleHotAndSearch (e) { // 热门搜索点击
    let { item } = e.currentTarget.dataset;
    if (item.returnType == 1) {
      if (item.params) {
        item.params.activityId = item.params.id
      }
      item.preObj = this.data.recommendObj
      djCmsJump({
        ...item,
        // eslint-disable-next-line camelcase
        buried_postion: "searchAbout-search"
      })
      return
    }
    this.doRealSearch(e.currentTarget.dataset.id, 'hotkey', item.userAction);
  },
  handleHistorySearch (e) { // 历史搜索点击
    let { id } = e.currentTarget.dataset;

    this.data.hotSearch.forEach((item) => {
      if (item.hotWords == id) {
        this.doRealSearch(id, 'history', item.userAction)
      }
    })
    this.doRealSearch(id, 'history')
  },
  showSuggestionList (e) {
    this.setData({
      showSuggestion: e.detail
    })
  },
  getSearch (e) { // 点击搜索按钮或者按回车
    let { key, tagType, userAction } = e.detail.data
    this.doRealSearch(key, tagType, userAction)
  },
  doRealSearch (key, tagType, userAction) {
    if (key) {
      // 保存搜索记录
      this.saveSearchHistory(key)
      this.jumpResultPage(key || '', tagType || '', userAction || '')
    }
  },
  jumpResultPage (keyName, keyType, userAction) { // 跳转到搜索结果页
    let url = '';
    let {recommendObj = {}, traceId = '', isCart = true, channelType = ''} = this.data;
    if (this.data.fromSource == 'storehome') { // 跳转店内
      url = `../storeSearchResult-new/index?name=${keyName}&userAction=${userAction}&type=${keyType}&curStoreId=${this.data.curStoreId}&orgCode=${this.data.orgCode}&industryTag=${this.data.industryTag}&traceId=${traceId}&pageId=${recommendObj.pageIdFirstPage}&isCart=${isCart}`
    } else { // 跳转全局
      url = `../search-result-new/index?name=${keyName}&userAction=${userAction}&type=${keyType}&curStoreId=${this.data.curStoreId}&fromSource=${this.data.fromSource}&channelId=${this.data.channelId}&channelBusiness=${this.data.channelBusiness}&traceId=${traceId}&pageId=${recommendObj.pageIdFirstPage}&channelType=${channelType}`
    }
    wx.redirectTo({
      url: url,
      preObj: recommendObj
    })
  },
  saveSearchHistory (key) { // 保存历史记录
    let searchHistoryData = this.data.historySearch
    searchHistoryData.forEach((item, index) => {
      if (item.keyWord == key) {
        searchHistoryData.splice(index, 1)
      }
    })
    searchHistoryData.unshift({ keyWord: key });
    this.setData({
      historySearch: searchHistoryData.slice(0, 19)
    })
    wx.setStorageSync(KEY_HISTORY, this.data.historySearch)
  },
  clearHistorySearch () {
    wx.showModal({
      content: '确定清空全部搜索历史吗？',
      cancelColor: '#999999',
      confirmColor: '#47B34F',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            historySearch: []
          })
          wx.removeStorage({
            key: KEY_HISTORY,
            success: () => {
              wx.showToast({
                title: "搜索历史已清空",
                icon: "success",
                duration: 2000
              })
            }
          })
        }
      }
    })
  }
})
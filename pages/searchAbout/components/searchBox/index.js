import {
  request,
  FNIDS
} from "../../../../common/util/api"
import { clickBuriedV2_ } from '../../../../common/util/BI';
let timer = null
let app = getApp()

Component({
  properties: {
    fromSource: {
      type: String,
      value: ''
    },
    searchKey: {
      type: String,
      value: '',
      observer: function (val) {
        if (val) {
          this.setData({
            initSearchVal: val,
            // searchValue: val,
            // showEditDeleteBtn: true
          })
        }
      }
    },
    curStoreId: {
      type: Number,
      value: 0
    },
    channelId: {
      type: Number,
      value: 0
    },
    showValue: {
      type: Boolean,
      value: false
    },
    pageId: {
      type: String,
      value: ''
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },
  data: {
    autoFocus: true,
    searchValue: '',
    showEditDeleteBtn: false,
    suggestionList: [],
    initSearchVal: '',
    traceId: '',
    styleABMap: {}
  },
  methods: {
    bindSearchInput(e) {
      timer = setTimeout(() => {
        clearTimeout(timer)
        this.setData({
          searchValue: e.detail.value,
          showEditDeleteBtn: e.detail.value.length > 0
        })
        if (this.data.searchValue.length > 0) {
          this.getSuggestionList(e.detail.value)
        } else {
          this.clearSuggestionList()
        }
      }, 150)
    },
    getSuggestionList(key) { // 请求联想词
      let {currentPageName = "", prePageName = "", pageId = "", recommendObj={}} = this.data;
      request({
        functionId: FNIDS.getSearchList.functionId, //"suggest/list",
        appVersion: FNIDS.getSearchList.appVersion,
        method: "POST",
        body: {
          key: key,
          latitude: app.globalData.addressInfo.latitude,
          longitude: app.globalData.addressInfo.longitude,
          type: 2,
          size: 10,
          storeIds: this.data.fromSource == 'storehome' ? [this.data.curStoreId] : [],
          source: "newMultiSearch",
          channelId: this.data.channelId,
          "pageSource": this.data.fromSource == "storehome" ? "storeSearch" : this.data.fromSource == "seckill" ? 'seckillSearchTransitPage': "searchTransitPage"
        },
        pageId: pageId,
        preObj: recommendObj
      }).then(res => {
        if (res && res.data && res.data.code == 0) {
          let { result: { resultListVO = [], styleABMap = false } = {} } = res.data;

          // TODO: 开始mock删除
          //   resultListVO[0].store.isTimeFight = 1;
          // resultListVO[0].store.deliveryFirst='预计明天8：00送达';
          // resultListVO[0].store.ferightDesc="满¥49免运费";
          // resultListVO[0].store.freightDescForLine = "¥6";
          // resultListVO[0].store.distance = '1.9m';
          // resultListVO[0].store.deliveryTime='40分钟'
          // resultListVO[0].store.storeBrandLogo = 'https://storage.360buyimg.com/wxmini/search/searchIcon.png';
          // resultListVO[0].store.recommendLabels=[]
          // {
          //   "backgroundColor": "#fff",
          //   "couponMode": 0,
          //   "frontColor": "red",
          //   "outLineColor": "#000",
          //   "sort": 0,
          //   "words": "好店"
          // }
          // resultListVO[0].store.coupons=[{
          //   "backgroundColor": "#fff",
          //   "couponMode": 0,
          //   "frontColor": "#FF1E1A",
          //   "outLineColor": "#FF1E1A",
          //   "sort": 0,
          //   "words": "领25元券"
          // }]
          // TODO:结束mock删除



          if(resultListVO.length > 0) {
            this.setData({
              suggestionList: []
            });
          }
          this.setData({
            suggestionList: resultListVO,
            traceId: res.data.traceId,
            styleABMap: styleABMap
          }, () => {
            // 埋点
            clickBuriedV2_({
              create_time: new Date(),
              click_id: 'getSugResult',
              click_par: {
                inputKey: key,
                sugCnt: resultListVO.length
              },
              currentPageName: currentPageName,
              prePageName: prePageName,
              pageId: pageId
            })
          })
          this.triggerEvent("showSuggestionList", true)
        }
      })
    },
    clearSuggestionList() { // 清空联想词
      this.setData({ suggestionList: [] })
      this.triggerEvent("showSuggestionList", false)
    },
    handleSearch() { // 点击搜索或者回车
      let { searchValue = '', initSearchVal = '', recommendObj} = this.data;
      this.triggerEvent('getSearch', {
        type: 'searchboxClick',
        data: {
          key: searchValue || initSearchVal,
          tagType: 'general'
        }
      })
    },
    clickDelBtn() {
      this.setData({
        searchValue: '',
        showEditDeleteBtn: false
      })
      this.clearSuggestionList()
    },
    // 点击联想词
    handlePageToGo(e) {
      let { item } = e.currentTarget.dataset;
      let { recommendObj } = this.data;
      if (item.type == 1) {
        wx.navigateTo({
          url: `/pages/store/index?storeId=${item.store.storeId}&orgCode=${item.store.orgCode}&userAction=${item.userAction}`,
          preObj: recommendObj,
          buried_postion: "searchAbout-searchBox"
        })
      }
      if (item.type == 0) {
        this.triggerEvent("getSearch", {
          type: "suggestionClick",
          data: {
            key: item.name,
            userAction: item.userAction, 
            tagType: "automate",
          },
        });
      }
    }
  }
})
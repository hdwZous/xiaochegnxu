import { djCmsJump } from '../../../../common/util/agreementV2';
import { transferExposureData, clickBuriedV2_ } from '../../../../common/util/BI';
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initData: {
      type: Object,
      val: {},
      observer: function (val) {
        const { searchConfig: { recommendKeyList = [] } = {} } = val;
        if (recommendKeyList.length > 0) {
          this.setData({
            currentItem: recommendKeyList[0]
          })
        }
      }
    },
    traceId: {
      type: String,
      value: ''
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
    },
    categoryBallName: {
      type: String,
      value: ''
    }
  },

  pageLifetimes: {
    show() {
      this.setData({
        autoplay: true
      })
    },
    hide() {
      this.setData({
        autoplay: false
      })
    }
  },
  lifetimes: {
    attached: function () {
      let { top = 24, width = 87, height = 32, right = 365 } = app.globalData.capsule;
      let { screenWidth = 375 } = app.globalData.systemInfo;
      this.setData({
        top: top ? top + (height - 30) / 2 : 25,
        width: width + (screenWidth - right + 10)
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: 20,
    currentItem: {},
    width: 87,
    autoplay: true
  },
  ready: function () {


  },
  /**
   * 组件的方法列表
   */
  methods: {
    goback: function () {
      this.triggerEvent('hanldeGoBack')
      let { channelId = '' } = this.data.initData;
      clickBuriedV2_({
        click_id: "clickReturn",
        click_par: {
          channelId: String(channelId),
          categoryBallName: this.data.categoryBallName
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    handleSearch: function () {
      let { channelBusiness = '', channelId = '', userAction = '', channelType = '' } = this.data.initData;

      clickBuriedV2_({
        click_id: "search",
        click_par: {
          
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      if (Object.keys(this.data.currentItem).length > 0) {
        const { to, params, userAction } = this.data.currentItem
        params.channelType = channelType
        djCmsJump({
          to,
          params,
          userAction,
          preObj: this.data.recommendObj,
          buried_postion: "channel-header"
        })
      } else {
        wx.navigateTo({
          url: `/pages/searchAbout/search/search?searchKey=&fromSource=newChannel&channelBusiness=${channelBusiness}&channelId=${channelId}&userAction=${userAction}&channelType=${channelType}`,
          preObj: this.data.recommendObj,
          buried_postion: "channel-header-search"
        })
      }
    },

    // 获取当前页面路径
    _getHistoryPage() {
      try {
        let historyPage = getApp().globalData.historyPage || [];
        return JSON.stringify(historyPage);
      } catch (err) {
        return JSON.stringify([]);
      }
    },
    handleSwiperChange: function (e) {
      if (this.data.autoplay) {
        let index = e.detail.current;
        let item = this.data.initData.searchConfig.recommendKeyList[index];
        this.data.currentItem = item;
  
        // 搜索框文本上报埋点
        let history = JSON.parse(this._getHistoryPage())
        const { userAction } = this.data.initData.searchConfig.recommendKeyList[index]
        const traceId = this.data.traceId
        transferExposureData({
          userAction,
          traceId,
          pageId: this.data.pageId,
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          create_time: new Date(),
          clienttime: Date.now()
        }, history)
      }
    }
  }
})

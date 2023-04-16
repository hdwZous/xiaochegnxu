import { clickBuriedV2_ } from "../../../../common/util/BI";
let pre = 0;
let app = getApp()
Component({
  lazyObj: {
    epSelector: '.ball .channel_comp_ep'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    initData: {
      type: Object,
      value: {},
      observer: function (val) {
        // console.log('initData')
        this.handleInitData(val)
      }
    },
    currentIndex: {
      type: Number,
      value: 1,
      observer: function () {
        // console.log('currentIndex',val)
      }
    },
    currentBallIndex: {
      type: Number,
      value: 1
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    type: 1,//1 5个分类球 2 6-7个分类球 3 8-10个分类球 4 超过10个分类球 5 fixed横滑样式
    width: 0,
    translateX: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInitData(val) {
      clickBuriedV2_({
        click_id: "click_ball",
        click_par: {
          state: '0',
          traceId: this.data.traceId,
          userAction: val.categoryList[0].userAction
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      
      let { categoryList } = val
      if (categoryList && categoryList.length > 0) {
        if (categoryList.length > 5 && categoryList.length <= 7) {
          this.setData({
            type: 2
          })
        }
        if (categoryList.length >= 8 && categoryList.length <= 10) {
          this.setData({
            type: 3
          })
        }
        if (categoryList.length > 10) {
          this.setData({
            type: 4,
            width: 74 * Math.ceil(categoryList.length / 2) * 2
          })
          categoryList.map((item, index) => {
            if (index + 1 > Math.ceil(categoryList.length / 2)) {
              item.pb = 0
            } else {
              item.pb = 24
            }
            return item
          })
        }
        this.setData({
          list: categoryList
        })
      }
    },
    handleScroll(e) {
      // console.log('e',e,)
      let { screenWidth } = app.globalData.systemInfo;
      let { width } = this.data;
      let ratio = 0;
      let now = Date.now();
      if (now - pre > 60) {
        let scrollLeft = e.detail.scrollLeft;
        ratio = scrollLeft / (width / 2 - screenWidth - 50)
        ratio <= 0 && (ratio = 0)
        ratio >= 1 && (ratio = 1)
        this.setData({
          translateX: 24 * ratio
        }, () => {
          pre = now;
        })
      }
    },
    handleFirstNavClick(e) {
      let { index, item } = e.currentTarget.dataset;
      clickBuriedV2_({
        click_id: "click_ball",
        click_par: {
          state: '1',
          traceId: this.data.traceId,
          userAction: item.userAction
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      if (index != this.data.currentIndex) {
        this.triggerEvent('handleFirstNavClick', { ...item })
      }
      this.setData({
        currentIndex: index,
      })
    },
  }
})

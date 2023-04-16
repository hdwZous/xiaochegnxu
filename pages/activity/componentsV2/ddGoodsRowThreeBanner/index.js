import { clickBuriedV2_ } from '../../../../common/util/BI'
let app = getApp();
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    activityId: {
      type: String,
      value: ''
    },
    showStoreLogo: {
      type: Boolean,
      value: false
    },
    styles: {
      type: String,
      value: ''
    },
    // 商品列表数据
    data: {
      type: Array,
      value: []
    },
    // 是否需要门店入口
    isShowStoreEnter: {
      type: Boolean,
      value: false
    },
    pageConfig: {
      type: Object,
      value: {}
    },
    pageFrom: {
      type: String,
      value: ''
    },
    biPageName: {
      type: String,
      value: ''
    },
    biActivityId: {
      type: String,
      value: ''
    },
    traceId: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    },
    storeId: {
      type: String,
      value: ''
    }
  },

  observers: {
    'data': function (newVal) {
      if (newVal.length) {
        let goodList, isFold
        if (this.data.isFold == undefined) {
          goodList = newVal.length > 9 ? newVal.slice(0, 9) : newVal
          isFold = newVal.length > 9 ? true : false
        } else {
          goodList = this.data.isFold ? newVal.slice(0, 9) : newVal
          isFold = this.data.isFold
        }

        this.setData({
          goodList,
          isFold
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 商品列表
    goodList: [],
    isFold: undefined
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 去门店页--进店逛逛
    goToStoreHome(e) {
      let dataset = e.currentTarget.dataset
      let params = dataset.params;
      try {
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "click_producks_gotostore",
          click_par: {
            userAction: e.currentTarget.dataset.data.userAction || ""
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName
        });
      } catch(e) {
        console.log(e);
      }
      wx.navigateTo({
        url: '/pages/store/index?storeId=' + params.storeId + "&orgCode=" + params.orgCode + "&skuId=" + '' + "&activityId=" + '' + "&promotionType=" + '' + '&longitude=' + app.globalData.addressInfo.longitude + '&latitude=' + app.globalData.addressInfo.latitude,
        preObj: this.data.recommendObj,
        buried_position: "active-goodsRowThreeBanner-store"
      })
    },
    lookmore() {
      clickBuriedV2_({
        click_id: 'unfoldGoods',
        click_par: {
          activityId: this.data.activityId,
          status: this.data.isFold ? 1 : 0,
          storeId: this.data.storeId
        },
        pageId: this.data.pageIdFirstPage || "",
        currentPageName: this.data.currentPageName || "",
        prePageName: this.data.prePageName || ""
      })
      let isFold = !this.data.isFold
      let goodList = isFold ? this.data.data.slice(0, 9) : this.data.data
      this.setData({
        goodList,
        isFold
      })
    }
  }
});

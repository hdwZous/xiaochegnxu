import { djCmsJump } from '../../../../common/util/agreementV2'
import { clickBuriedV2_ } from '../../../../common/util/BI'
let app = getApp();
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.dd_goods_row_three'
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
    // 楼层类型 10：一行三个半，11：一行三个, 12带banner
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
      value: false,
      observer: function (val) {
          
      }
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
    storeModel: {
        type: Object,
        value: {}
    }
  },

  observers: {
    'data': function (newVal) {
      if (newVal.length) {
        this.setData({
          goodList: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 商品列表
    goodList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 去门店页--进店逛逛
    goToStoreHome(e) {
      let dataset = e.currentTarget.dataset
      let params = dataset.params;
      let to = dataset.to;
      let userAction = dataset.userAction;
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
      djCmsJump({
          to: this.data.storeModel.to,
          params: this.data.storeModel.params,
          userAction: this.data.storeModel.userAction,
          preObj: this.data.recommendObj
      })
    //   wx.navigateTo({
    //     url: '/pages/store/index?storeId=' + params.storeId + "&orgCode=" + params.orgCode + "&skuId=" + '' + "&activityId=" + '' + "&promotionType=" + '' + '&longitude=' + app.globalData.addressInfo.longitude + '&latitude=' + app.globalData.addressInfo.latitude,
    //     preObj: this.data.recommendObj,
    //     buried_position: "active-goodsRoThree-store"
    //   })
    }
  }
});

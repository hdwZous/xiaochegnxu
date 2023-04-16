import { djCmsJump } from '../../../../../../common/util/agreementV2';
let app = getApp();
Component({
  options: {
    addGlobalClass: true
  },

  lazyObj: {
    epSelector: '.cartgoods_ep',
  },

  properties: {
    orgCode: {
      type: String,
      value: ''
    },
    storeId: {
      type: String,
      value: ''
    },
    pageSource: {
      type: String,
      value: ''
    },
    refPageSource: {
      type: String,
      value: ''
    },
    biPageName: {
      type: String,
      value: ''
    },
    fromMinicart: {
      type: Boolean,
      value: false
    },
    activityId: {
      type: String,
      value: ''
    },
    // 10 或者 null 或者不传为mini购物车, 20为全局购物车
    cartType: {
      type: Number,
      value: 10
    },
    mode: {
      type: String,
      value: ''
    },
    subItem: {
      type: Object,
      value: null
    },
    traceId: {
      type: String,
      value: ''
    },
    pullDownFlag: {
      type: String,
      value: '',
      observer(news) {
        if (news && news == 'pullDown') {
          this.epSection && this.epSection()
          this.setData({ pullDownFlag: '' })
        }
      }
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
    noNeedExposure: {
      type: Boolean,
      value: false
    },
    refPar: {
      type: Object,
      value: null
    },
    buriedObj: {
      type: Object,
      value: null
    },
    prescriptionFlowMark:{
        type: Number,
        value: 0
    }
  },
  data: {
    
  },
  methods: {
    addMinControllerChange(e) {
      this.triggerEvent('onAddMinControllerChange', e.detail, { composed: true, bubbles: true })
    },
    goToProduct(e) {
      let { storeId = '', orgCode = '', skuId = '', userAction = '' } = e.currentTarget.dataset.items
      wx.navigateTo({
        url: `/pages/product/index?storeId=${storeId}&orgCode=${orgCode}&skuId=${skuId}&userAction=${userAction}`,
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'minicart_productdetail_goToProduct'
        }
      })
      if (this.data.cartType == 20) {
        // 从全局购物车进入其他页面时，全局记录storeId,以便返回时单一刷新
        app.globalData.refreshShopid = storeId
      }
    },
    gofailure(e) {
      let { items, userAction = '' } = e.currentTarget.dataset
      let { to, params } = items
      params.userAction = userAction
      djCmsJump({
        to,
        params,
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'minicart_productdetail_gofailure'
        }
      })
      if (this.data.cartType == 20) {
        // 从全局购物车进入其他页面时，全局记录storeId,以便返回时单一刷新
        app.globalData.refreshShopid = this.data.storeId
      }
    },
    onShowModify(e) {
      let infos = e.detail.infos
      this.triggerEvent("showModify", {
        infos: infos
      });
    }
  }
});

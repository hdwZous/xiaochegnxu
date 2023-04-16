import { djCmsJump } from "../../../../../../common/util/agreementV2";
Component({
  options: {
    addGlobalClass: true
  },

  lazyObj: {
    epSelector: '.recommend-sku-box'
  },

  properties: {
    infos: {
      type: Array,
      value: []
    },
    recommendSkusTitle: {
      type: String,
      value: ''
    },
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
    fromMinicart: {
      type: Boolean,
      value: false
    },
    traceId: {
      type: String,
      value: '',
      observer(news) {
        if (news) {
          // 初始化曝光
          this.epSection && this.epSection()
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
    isHideCartInfo: {
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
    }
  },
  data: {
    
  },
  methods: {
    addMinControllerChange(e) {
      this.triggerEvent('onAddMinControllerChange', e.detail)
    },
    // 去商品详情
    goToDetail(e) {
      let item = e.currentTarget.dataset.item || {};
      djCmsJump({
        to: "productDetail",
        params: {
          orgCode: item.orgCode || this.data.orgCode,
          storeId: item.storeId || this.data.storeId,
          skuId: item.skuId || "",
          spuId: item.spuId,
          userAction: item.userAction|| ""
        },
        userAction: item.userAction || "",
        traceId: this.data.traceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'minicart_recommendgoods_goToDetail'
        }
      });
    }
  }
});

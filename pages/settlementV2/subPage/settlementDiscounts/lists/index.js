import { djCmsJump } from '../../../../../common/util/agreementV2'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer(newl) {
        if (newl && newl.userAction) {
          this.epSection && this.epSection()
        }
      }
    },
    longitude: {
      type: String,
      value: ''
    },
    latitude: {
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
    traceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: null
    }
  },

  attached() {
    
  },

  lazyObj: {
    selector: '.good-item-wrap',
    epSelector: '.good-item-wrap'
  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击商品
    goToDetail(e) {
      let item = e.currentTarget.dataset.item;
      djCmsJump({
        to: 'productDetail',
        params: {
          storeId: item.storeId,
          orgCode: item.orgCode,
          skuId: item.skuId,
          spuId: item.spuId,
        },
        userAction: encodeURIComponent(item.userAction),
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'settlementv2_settlediscount_goToDetail'
        }
      })
    }
  }
    
});

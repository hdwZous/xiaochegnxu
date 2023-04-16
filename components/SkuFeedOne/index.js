import { djCmsJump } from "../../common/util/agreementV2";
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    epSelector: '.channel_comp_ep',
  },

  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function(val){
        if( val && val.userAction){
          this.epSection && this.epSection()
        }
      }
    },
    traceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    }
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
    clickToStore(e) {
      let { to = '', params = '', userAction = '', storeId = '', orgCode = '' } = e.currentTarget.dataset.item || {};
      let { buriedObj = {} } = this.data;
      djCmsJump({
        to,
        params,
        userAction,
        preObj: buriedObj
      })
      this.triggerEvent('feedsShopId', { storeId, orgCode }, { composed: true, bubbles: true })
    }
  }
})

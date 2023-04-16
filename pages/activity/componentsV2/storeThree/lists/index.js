import { djCmsJump } from '../../../../../common/util/agreementV2'
Component({
  options: {
    addGlobalClass: true
  },

  lazyObj: {
    selector: '.store_list',
    epSelector: '.activity_comp_ep'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    subItem: {
      type: Object,
      value: {}
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
    clickImg(e) {
      let data = e.currentTarget.dataset;
      // 如果是跳转h5,但是没下发url则不跳转
      if (data.to == 'web' && (!data.params || !data.params.url)) return
      // 跳转协议
      djCmsJump({
        to: data.to,
        params: data.params,
        userAction: data.userAction,
        preObj: this.data.recommendObj,
        buried_position: "active-storeThree1"
      })
    },
    expandCouponJump(e) {
      let { item = {} } = e.currentTarget.dataset || {};
      let { to = '', params = {}, userAction = "" } = item || {};
      djCmsJump({
        to: item.expansionCoupon.to,
        userAction: item.expansionCoupon.userAction,
        params: item.expansionCoupon.params,
        preObj: this.data.recommendObj,
        buried_position: "active-storeThree2"
      })
    }
  }
})

import { djCmsJump } from '../../../../common/util/agreementV2'
let app = getApp();
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    epSelector: '.activity_comp_ep',
    componentName: 'footertab'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Array,
      value: []
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
    isIphoneX: app.globalData.isIpx
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
        buried_position: "active-footer"
      })
    }
  }
})

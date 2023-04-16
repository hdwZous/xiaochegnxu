import { djCmsJump } from '../../../../common/util/agreementV2'
Component({
  lazyObj: {
    epSelector: '.activity_comp_ep',
    componentName: 'bottomtips'
  },
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    pageConfig: {
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
    // 返回门店
    goBackStore() {
      wx.navigateBack({
        delta: 1
      })
    },
    // 点击去门店
    clickToStore(e) {
      let { to = 'home', params = {}, userAction = '' } = e.currentTarget.dataset.item || {}
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        preObj: this.data.recommendObj,
        buried_position: "active-bottomTips"
      })
    },
  }
})

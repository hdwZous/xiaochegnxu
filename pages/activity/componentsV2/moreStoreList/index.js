import { djCmsJump } from '../../../../common/util/agreementV2'
Component({
  lazyObj: {
    epSelector: '.activity_comp_ep',
    componentName: 'morestorelist'
  },
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    userAction: {
      type: String,
      value: ''
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
    // 点击门店列表更多按钮
    clickMoreStore(e) {
      let { to = 'home', params = {}, userAction = '' } = e.currentTarget.dataset.item || {}
      if (params.venderIndustryType) {
        params.venderIndustryType = (params.venderIndustryType).toString()
      }
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        preObj: this.data.recommendObj,
        buried_position: "active-moreStoreList"
      })
    },
  }
})

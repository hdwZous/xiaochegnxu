import { djCmsJump } from '../../../../common/util/agreementV2'
Component({
  options: {
    addGlobalClass: true
  },

  lazyObj: {
    selector: '.store-three'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    activityId: {
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
    }
  },

  observers: {
    'item': function (newVal) {
      if (newVal.data && newVal.data.length) {
        let storeList = newVal.data[0].slideStoreList.slice(0, 10)
        this.setData({ storeList })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    storeList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goStoreList(e) {
      let data = e.currentTarget.dataset;
      // 如果是跳转h5,但是没下发url则不跳转
      if (data.to == 'web' && (!data.params || !data.params.url)) return
      if (data.params && data.params.venderIndustryType) {
        data.params.venderIndustryType = (data.params.venderIndustryType).toString()
      }
      // 跳转协议
      djCmsJump({
        to: data.to,
        params: data.params,
        userAction: data.userAction,
        preObj: this.data.recommendObj,
        buried_position: "active-storeThree"
      })
    }
  }
})

import {
  jumpTo
} from "../../../../../common/util/activity_utils"
Component({
  options: {
    addGlobalClass: true
  },

  lazyObj: {
    selector: '.log-good-three-pro-new',
    epSelector: '.activity_comp_ep'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: null
    },
    // 是否需要门店入口
    isShowStoreEnter: {
      type: Boolean,
      value: false
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
    // 去门店锚中商品
    goToStoreShotGood(e) {
      let data = e.currentTarget.dataset;
      // 如果是跳转h5,但是没下发url则不跳转
      if (data.to == 'web' && (!data.params || !data.params.url)) return
      jumpTo(data, data.icontype, this.data.item,data.skutype, this.data.recommendObj)
    },
    //监听数量加减按钮 透传给父级
    onAddMinControllerChange(e) {
      this.triggerEvent("onAddMinControllerChange", e.detail, { composed: true, bubbles: true })
    },
  }
});

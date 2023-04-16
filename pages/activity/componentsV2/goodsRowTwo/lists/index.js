import {
  jumpTo
} from "../../../../../common/util/activity_utils"
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    item: {
      type: Object,
      value: null
    },
    activityId: {
      type: String,
      value: ''
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
  lazyObj: {
    selector: ".row_two_list",
    epSelector: '.activity_comp_ep'
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   */
  attached() {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //监听数量加减按钮 透传给父级
    onAddMinControllerChange(e) {
      this.triggerEvent("onAddMinControllerChange", e.detail, { composed: true, bubbles: true })
    },
    // 去门店锚中商品
    goToStore(e) {
      let data = e.currentTarget.dataset;
      if (data.type == 'buy') {
        // 去门店首页购买商品
        data.params.isAddCart = true;
      } else if (data.type == 'store') {
        data.params.isAddCart = false;
      }
      // 如果是跳转h5,但是没下发url则不跳转
      if (data.to == 'web' && (!data.params || !data.params.url)) return
      jumpTo(data, data.icontype, this.data.item, data.skutype, this.data.recommendObj)
    },
  }
});
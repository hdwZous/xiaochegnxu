import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_strategy',
    epSelector: '.home_strategy'
  },
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    // 楼层唯一id
    floorId: {
      type: String,
      value: ''
    },
    // 图片懒加载
    imgLazyLoad: {
      type: Object,
      value: {}
    },
    strategyData: {
      type: Object,
      value: {}
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
  },
  data: {},
  pageLifetimes: {
    show() { }
  },
  methods: {
    jump(e) {
      let item = e.currentTarget.dataset.item
      let to = item.to || ''
      let params = item.params || {}
      let userAction = item.userAction || ''
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homestrategy_jump_home'
        }
      })
    }
  }
})
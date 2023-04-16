import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
Component({
  lazyObj: {
    selector: '.home_grid',
    epSelector: '.home_grid'
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
    gridData: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val.data && val.data.length && val.data.length >= 2) {
          this.epSection && this.epSection()
        }
      }
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
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
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homegrid_jump_home'
        }
      })
    }
  }
})
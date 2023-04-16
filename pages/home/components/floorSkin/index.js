import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_floorSkin',
    epSelector: '.home_floorSkin'
  },
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    skinData: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val.data && val.data.length && val.data.length > 0) {
          let img = val.data[0]
          this.setData({
            img: img
          })
          this.epSection && this.epSection()
        }
      }
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
    pageDataTraceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  },
  data: {
    img: ''
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
          currentPageName: 'homefloorskin_jump_home'
        }
      })
    }
  }
})
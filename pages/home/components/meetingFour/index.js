import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
Component({
  lazyObj: {
    selector: '.home_MeetingFour',
    epSelector: '.home_MeetingFour'
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
    meetingFourObj: {
      type: Object,
      value: {},
      observer: function (obj) {
        if (obj.data && obj.data.length > 0) {
          this.setData({
            list: obj.data.length > 4 ?  obj.data.slice(0,4) : obj.data
          })
          this.epSection && this.epSection()
        }
      }
    },
    bigSaleObj: {
      type: Object,
      value: {},
      observer: function (obj) {
        if (obj.data && obj.data.length > 0) {
          this.setData({
            listBigSale: obj.data.slice(0, 3)
          })
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
  data: {
    list: [],
    listBigSale: [],
  },
  methods: {
    jump(e) {
      let item = e.currentTarget.dataset.item
      let type = e.currentTarget.dataset.type || '';
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
          currentPageName: 'homemeetingfour_jump_home'
        }
      })
    }
  }
})
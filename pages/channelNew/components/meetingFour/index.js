import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
Component({
  // lazyObj: {
  //   epSelector: ' .meeting-container .channel_comp_ep',
  //   needExposure: true
  // },
  properties: {
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
            list: obj.data
          })
        }
      }
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
  data: {
    list: []
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
        preObj: this.data.recommendObj,
        buried_postion: "channel-meetingFour"
      })
    }
  }
})
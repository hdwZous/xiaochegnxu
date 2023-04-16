import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
Component({
  lazyObj: {
    epSelector: '.skin-wrapper .channel_comp_ep'
  },
  options: {
    addGlobalClass: true
  },
  properties: {
    skinData: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val.data.length > 0) {
          let img = val.data[0]
          this.setData({
            img: img
          })
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
    img: ''
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
        buried_postion: "channel-floorSkin"
      })
    }
  }
})
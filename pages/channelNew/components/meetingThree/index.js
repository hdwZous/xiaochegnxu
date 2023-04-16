import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
Component({
  options: {
    addGlobalClass: true
  },
  // lazyObj: {
  //   epSelector: '.meeting-container .channel_comp_ep',
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
    meetingThreeObj: {
      type: Object,
      value: {},
      observer: function (val) {
        let list = val.data
        if (list.length == 3) { // 小于三个不轮播，所以要复制一组
          list = list.concat(val.data)
        } else if (list.length > 9) { // 最多展示9个
          list.splice(0, 9)
        }
        list.unshift(list.pop())
        this.setData({
          list: list
        })
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
    autoPlay: false,
    current: 0,
    list: []
  },
  lifetimes: {
    ready() {
      setTimeout(() => {
        this.setData({
          autoPlay: true
        })
      }, 2000);
    }
  },

  pageLifetimes: {
    show() {
      this.setData({
        autoplay: true
      })
    },
    hide() {
      this.setData({
        autoplay: false
      })
    }
  },
  methods: {
    swiperChange2(e) {
      let current = e.detail.current
      this.setData({
        current: current
      })
    },
    swiperPositionChange() {
      // console.log(e)
    },
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
        buried_postion: "channel-meetingThree"
      })
    }
  }
})
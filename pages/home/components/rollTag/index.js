import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'

let animation = {}
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_rolltag',
    epSelector: '.home_rolltag'
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
    buriedObj: {
      type: Object,
      value: {}
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
    goodData: {
      type: Object,
      value: {},
      observer: function (val) {
        let item = val.data && val.data[0]
        let list = val.data
        if (list.length == 3) {
          list = list.concat(val.data)
        }
        list.unshift(list.pop())
        list.forEach(item => {
          if (item.title.length > 10) {
            item.title = `${item.title.substring(0, 10)}...`
          }
        })
        this.epSection && this.epSection()
        this.setData({
          list: list,
          item: item
        })
      }
    }
  },
  data: {
    list: [],
    item: {}, // 跳转时要用的参数
    aCurrent: 0,
    current: 0,
    autoPlay: true,
    interval: 3000,
    animationData: {}
  },
  lifetimes: {
    ready() {
      // 创建购物车动画
      animation = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease',
      })
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
    swiperChange(e) {
      let current = e.detail.current
      if (this.data.list.length == current + 1) {
        current = -1
      }
      animation.translateY('115%').step()
      this.setData({
        current: current,
        animationData: animation.export()
      })

    },
    animationEnd() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    },
    changeCur() {
      this.setData({
        autoPlay: false
      })
      let curIndex = this.data.current + 1 >= this.data.list.length ? -1 : this.data.current + 1
      this.setData({
        aCurrent: curIndex
      })
      setTimeout(() => {
        this.setData({
          autoPlay: true
        })
      }, 500)
    },
    jump(e) {
      let item = e.currentTarget.dataset.item
      let to = this.data.list[this.data.current + 1].to || ''
      let params = this.data.list[this.data.current + 1].params || {}
      let userAction = item.userAction || ''
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homerolltag_jump_home'
        }
      })
    }
  }
})
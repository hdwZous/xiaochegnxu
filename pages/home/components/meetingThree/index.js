import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_floormeetingthree',
    epSelector: '.home_floormeetingthree'
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
        if(list && list.length == 1){
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
  data: {
    autoPlay: true,
    current: 0,
    list: []
  },
  lifetimes: {

  },
  pageLifetimes: {
    show() {
      this.setData({
        autoPlay: true
      })
    },
    hide() {
      this.setData({
        autoPlay: false
      })
    }
  },
  methods: {
    // 获取当前页面路径
    _getHistoryPage() {
      try {
        let historyPage = getApp().globalData.historyPage || [];
        return JSON.stringify(historyPage);
      } catch (err) {
        return JSON.stringify([]);
      }
    },
    swiperChange2(e) {
      let _this = this;
      let current = e.detail.current
      this.setData({
        current: current
      })
    },
    swiperPositionChange() {
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
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homemeetingthree_jump_home'
        }
      })
    }
  }
})
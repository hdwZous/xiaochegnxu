import { djCmsJump } from '../../../../common/util/agreementV2';
import { clickBuriedV2_ } from '../../../../common/util/BI';
Component({
  lazyObj: {
    selector: '.channel_comp_ep',
    epSelector: '.contanier .channel_comp_ep',
    needExposure: true,
    componentName: 'strategybanner'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function (newVal) {
        const { data = [], styleTpl = '' } = newVal;
        if (data.length == 2) {
          // 特殊banner样式的hack方法 如果只有两个实例 在banner切换的时候会不流畅
          this.setData({
            bannerList: [...data, ...data]
          })
          return
        }
        this.setData({
          bannerList: data,
          styleTpl
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

  /**
   * 组件的初始数据
   */
  data: {
    bannerList: [],
    swiperCurrent: 0,
    styleTpl: '',
    autoplay: true
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

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange: function (e) {
      this.setData({
        swiperCurrent: e.detail.current
      })
    },
    chuangEvent: function (e) {
      this.setData({
        swiperCurrent: e.currentTarget.id
      })
    },
    jumper: function (e) {
      clickBuriedV2_({
        click_id: "strategy_item",
        click_par: {
          
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      const data = e.currentTarget.dataset;
      if (data.to && data.params) {
        if (data.to == 'web' && !data.params.url) return
        djCmsJump({
          ...data,
          preObj: this.data.recommendObj,
          buried_postion: "channel-strategyBanner"
        })
      }
    }
  }
})

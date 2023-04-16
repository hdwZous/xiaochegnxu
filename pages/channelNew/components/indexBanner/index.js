import { djCmsJump } from '../../../../common/util/agreementV2'
import { clickBuriedV2_ } from '../../../../common/util/BI';
Component({
  lazyObj: {
    epSelector: '.wrap .channel_comp_ep',
    needExposure: true,
    componentName: 'indexbanner'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      val: {},
      observer: function (val) {
        let newVa
        //  一行一轮播图数据兼容
        if (val.data.resources && val.data.resources.length > 0) {
          newVa = val.data.resources.map((i) => {
            return {
              ...i,
              // imgUrl: i.imgUrl.replace('.png', '.dpg.webp')
            }
          })
        } else {
          newVa = val.data.map((i) => {
            return {
              ...i,
              // imgUrl: i.imgUrl.replace('.png', '.dpg.webp')
            }
          })
        }
        this.setData({
          newData: newVa
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
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    newData: [],
    autoplay: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSwiperChange(e) {
      this.setData({
        currentIndex: e.detail.current
      })
    },
    handlePageJump(e) {
      clickBuriedV2_({
        click_id: "banner_click",
        click_par: {
          
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      let { item } = e.currentTarget.dataset;
      djCmsJump({
        to: item.to,
        params: item.params,
        userAction: item.userAction,
        traceId: this.data.traceId,
        preObj: this.data.recommendObj,
        buried_postion: "channel-indexBanner"
      })
    }
  }
})

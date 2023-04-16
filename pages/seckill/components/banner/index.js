import { transferExposureData } from '../../../../common/util/BI';
Component({
  lazyObj: {
    selector: '.seckill_banner',
    epSelector: '.seckill_banner'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    datas: {
      type: Array,
      value: []
    },
    scrollTop: {
      type: Number,
      value: 0,
      observer: function (nums) {
        let opacity = 1 - (nums / 100) * 2
        this.setData({
          opacity
        })
      }
    },
    traceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  },

  pageLifetimes: {
    show: function () {
      this.setData({
        autoplay: true
      })
    },
    hide: function () {
      this.setData({
        autoplay: false
      })
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 当前页
    activeIndex: 0,
    opacity: 1,
    autoplay: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 图片切换
    bannerChange(e) {
      let index = e.detail.current;
      this.setData({
        activeIndex: index
      })
      let history = this._getHistoryPage();
      const traceId = this.data.traceId
      const { userAction ='' } = this.data.datas[index]
      let pageId = this.data.buriedObj.pageIdFirstPage || ''
      let currentPageName = this.data.buriedObj.currentPageName || ''
      let prePageName = this.data.buriedObj.prePageName || ''
      transferExposureData({
        userAction,
        traceId,
        pageId,
        create_time: new Date(),
        clienttime: Date.now(),
        currentPageName,
        prePageName
      }, history)
    }
  }
});

import { djCmsJump } from "../../common/util/agreementV2";
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.channel_comp_ep',
    epSelector: '.channel_comp_ep'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    NeedExposure: {
      type: Boolean,
      value: true
    },
    list: {
      type: Array,
      value: [],
      observer: function (val) {
        if(val && val.length) {
          let item = val[0];
          let {width = 344, height = 575} = item;
          let swiperCaseHeight = Math.floor(width / 344 * height);
          this.setData({swiperCaseHeight})
        }
      }
    },
    traceId: {
      type: String,
      value: '',
      observer: function () {
        // console.log(val);
      }
    },
    buriedObj: {
      type: Object,
      value: {}
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
    }
  },
  lifetimes: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0,
    autoplay: true,
    observerObj: null,
    swiperCaseHeight: ''
  },
  pageLifetimes: {
    show () {
      this.setData({
        autoplay: true
      })

    },
    hide () {
      this.setData({
        autoplay: false
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickImg (e) {
      let { to = '', params = '', userAction = '' } = e.currentTarget.dataset.item || {};
      let { buriedObj = {} } = this.data;
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId,
        preObj: buriedObj
      })
    },
    swiperChange (e) {
      let { current = 0 } = e.detail || {};
      this.setData({
        currentIndex: current
      })
    }
  }
})

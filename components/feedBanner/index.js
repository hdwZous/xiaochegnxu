import { djCmsJump } from '../../common/util/agreementV2';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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
    traceId: {
      type: String,
      value: ''
    },
    item: {
      type: Object,
      value: {}
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    fromPositon: {
      type: String,
      value: ''
    },
    optionsPos: {
      type: Object,
      value: {}
    }
  },

  lazyObj: {
    selector: '.feed_banner',
    epSelector: '.feed_banner',
    needExposure: true
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击广告图
    clickBanner(e) {
      let { to = '', params = [], userAction = '' } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId,
        preObj: this.data.buriedObj,
        buried_position: {
          fromPositon: `feedBanner-${this.data.fromPositon}`,
          optionsPos: this.data.optionsPos
        }
      })
    }
  }
})

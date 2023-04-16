import { djCmsJump } from '../../../../common/util/agreementV2'
Component({
  lazyObj: {
    epSelector: ".banner_wrap"
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function (val) {
        let { imgHeight = '', imgWidth = '' } = val || {};
        if (imgHeight && imgWidth) {
          this.setData({
            imgHeight: 710 * imgHeight / imgWidth + 'rpx'
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

  /**
   * 组件的初始数据
   */
  data: {
    imgHeight: '232rpx'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickImg() {
      let { to = '', params = {}, userAction = '' } = this.data.data || {};
      djCmsJump({
        to,
        params,
        userAction,
        preObj: this.data.recommendObj,
        buried_postion: "searchAbout-banner"
      })
    }
  }
})

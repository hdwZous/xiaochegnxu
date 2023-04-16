import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
Component({
  lazyObj: {
    selector: '.home_pop3',
    epSelector: '.home_pop3'
  },
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    data: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val && val.data) {
          this.setData({
            item: val.data
          });
          // val.userAction && this.triggerEvent('onPopExposure', {
          //     data: val.userAction
          // });
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

  /**
   * 组件的初始数据
   */
  data: {
    show: true,
    item: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closePop() {
      this.setData({
        show: false
      })
    },
    clickContent() {
      let { data, userAction } = this.data.data || {};
      djCmsJump({
        to: data.to,
        params: data.params,
        userAction: userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homepop3_clickContent_home'
        }
      });
      this.closePop()
    }
  }
})

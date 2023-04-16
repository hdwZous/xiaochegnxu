import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
Component({
  /**
   * 组件的属性列表
   */
  lazyObj: {
    selector: '.home_sidebar',
    epSelector: '.home_sidebar'
  },
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function () {
      }
    },
    NeedExposure:{
      type: Boolean,
      value: true
    },
    sideBarHide: {
      type: Boolean,
      value: false
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
  data: {},

  /**
   * 组件所在页面的生命周期声明对象，参见 组件生命周期
   */
  pageLifetimes: {
    show: function () {
     
    }
  },

  /**
   * 组件生命周期函数-在组件布局完成后执行)
   */
  ready() {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 侧边栏
    formSubmit() {
      let { to = '', params = {}, userAction = '' } = this.data.data || {};
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homesidebar_formSubmit_home'
        }
      })
    }
  }
});

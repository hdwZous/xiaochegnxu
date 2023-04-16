import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_fission',
    epSelector: '.home_fission'
  },
  /**
   * 组件的属性列表
   */
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
    // 商品列表数据
    fissionData: {
      type: Object,
      value: {},
      observer: function (newVal) {
        this.setData({
          fissArr: newVal.data.slice(0, 4) || []
        })
        this.epSection && this.epSection()
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
    fissArr: {},
  },
  attached() { },
  /**
   * 组件的方法列表
   */
  methods: {
    //点击事件
    fissonClick(e) {
      let dataset = e.currentTarget.dataset || {};
      let item = dataset.item
      let to = item.to || ''
      let params = item.params || {}
      let userAction = dataset.userAction || ''
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homefission_fissonClick_home'
        }
      })
    }
  }
});
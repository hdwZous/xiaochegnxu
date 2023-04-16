Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_vip',
    epSelector: '.home_vip'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    bgColor: {
      type: String,
      value: ''
    },
    vipData: {
      type: Object,
      value: {}
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickBtn() {
      this.triggerEvent('onClickVip', {
        type: this.data.vipData.vipFlag,
        url: this.data.vipData.goUrl,
        userAction: this.data.vipData.userAction
      })
    }
  }
})

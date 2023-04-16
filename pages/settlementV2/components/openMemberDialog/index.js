import { djCmsJump } from '../../../../common/util/agreementV2'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    info: {
      type: Object,
      value: {}
    },
    storeId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: null
    }
  },

  observers: {
    
  },

  options: {
    addGlobalClass: true,
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
    close() {
      this.setData({ show: false })
      this.triggerEvent('popStatus', {
        types: 'openMemberDialog',
        flag: false
      })
    },
    goagrement(e) {
      let { to, params } = e.currentTarget.dataset
      // 如果是跳转h5,但是没下发url则不跳转
      if (to == 'web' && (!params || !params.url)) return
      // 跳转协议
      djCmsJump({
          to,
          params,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'settlementv2_openmemberdialog_goagrement'
          }
      })
    },
    openMbmber() {
      this.triggerEvent('memberToastopen')
      this.close()
    }
  }
});

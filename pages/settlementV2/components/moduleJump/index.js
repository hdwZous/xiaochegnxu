import { djCmsJump } from '../../../../common/util/agreementV2'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infos:{
      type:Object,
      value: null
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
    buriedObj: {
      type: Object,
      value: null
    }
  },

  options: {
    addGlobalClass: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    tipShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClickQuestion(e){
      let { items: { type = '', jumpUrl = '' } = {} } = e.currentTarget.dataset
      if (type == 1) {
        if (!jumpUrl.length) return
        djCmsJump({
          to: 'web',
          params: {
            url: jumpUrl
          },
          preObj: this.data.buriedObj || null,
          buried_position: {
            currentPageName: 'settlementv2_modulejump_handleClickQuestion'
          }
        })
      } else if (type == 2) {
        this.showRule()
      }
    },
    showRule() {
      this.setData({ tipShow: !this.data.tipShow })
    },
    goToH5Page(){
      let { key = '', refreshFlag = false, jumpAgreement = null } = this.data.infos
      if (jumpAgreement.to) {
        djCmsJump({
          to: jumpAgreement.to,
          params: jumpAgreement.params,
          preObj: this.data.buriedObj || null,
          buried_position: {
            currentPageName: 'settlementv2_modulejump_goToH5Page'
          }
        })
      }
      this.triggerEvent('refreshModuleKey', { key, types: 'jump', refreshFlag })
    }
  }
})

import { djCmsJump } from '../../../../common/util/agreementV2'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newVip: {
      type: Object,
      value: {},
      observer: function (val) {
        this.handleRedBag(val)
      }
    },
    isIOS: {
      type: Boolean,
      value: false
    },
    buriedObj: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    redbag: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showVipRedPag(e) {
      let { url = '' } = e.currentTarget.dataset
      djCmsJump({
        to: 'web',
        params: {
          url
        },
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'settlementv2_vip_showVipRedPag'
        }
      })
    },
    // 购买vip
    buyVip(e) {
      let { checkVip = '', vipId = '' } = e.currentTarget.dataset
      this.triggerEvent('handleVipCheck', { checkVip, vipId })
    },
    handleRedBag(val) {
      let { data } = val
      if (data && data.newStyle) {
        // let redbagArr=[];
        let redbagArrObj = { reductionAmountTip: data.reductionAmountTip, couponLimitRule: data.couponLimitRule }
        // 转成数组
        let redbag = Array.from({ length: data.couponCount }, () => redbagArrObj)
        this.setData({
          redbag
        })
      }
    },
    goAgreement(e) {
      let { to = '', params = {}, jumpFlag = '' } = e.currentTarget.dataset.items
      if (to && jumpFlag) {
        djCmsJump({
          to,
          params,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'settlementv2_vip_goAgreement'
          }
        })
      }
    }
  }
})

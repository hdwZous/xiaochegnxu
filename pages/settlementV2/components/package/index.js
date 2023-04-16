import { djCmsJump } from '../../../../common/util/agreementV2'
import { clickBuriedV2_ } from '../../../../common/util/BI'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lists: {
      type: Array,
      value: []
    },
    unique: {
      type: String,
      value: ''
    },
    orderPageId: {
      type: String,
      value: ''
    },
    storeId: {
      type: String,
      value: ''
    },
    orgCode: {
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
    initSettleParams: {
      type: Object,
      value: null
    },
    buriedObj: {
      type: Object,
      value: null
    }
  },

  attached() {
    
  },

  observers: {
    'lists': function (newVal) {
      if (newVal && newVal.length) {
        let pack = null, freight = null, service = null, periodFreight = null, preferential = null, selfService = null
        newVal.map(item => {
          if (item.moneyType == 'packaging' || item.name == '包装费') {
            pack = item
            // 包装费{规则有更新}文案只展示一次，记录在缓存
            try {
              let pickTip = wx.getStorageSync('pickTipShowOnce')
              if (!pickTip) {
                this.setData({ pickTipShow: true })
                wx.setStorageSync('pickTipShowOnce', true)
              }
            } catch (error) {
              
            }
          } else if (item.moneyType == 'freight' || item.name == '运费') {
            // // mock数据
            // Object.assign(item, mock)
            // // 
            freight = item
            // debugger
            if (freight.tipFeeNew && freight.tipFeeNew.feeToast && this.data.feeToast) {
              let timerId = setTimeout(()=> {
                clearTimeout(timerId);
                wx.showToast({
                  title: freight.tipFeeNew.feeToast,
                  icon: "none",
                  duration: 2500,
                })
              }, 500)
              this.setData({ feeToast: false })
            }
            // 无障碍
            let btnName = ''
            let { freightMoreSaved = {} } = freight
            let { text = {} } = freightMoreSaved 
            let { textList = [] } = text
            textList.map((item, index) => {
              if (item.type != 3) {
                btnName += item.text
              }
            })
            if (btnName) {
              this.setData({
                btnName
              })
            }
          } else if (item.moneyType == 'periodFreight' || item.name == '时段运费') {
            periodFreight = item
          } else if (item.moneyType == 'addItemDiscount' || item.name == '满19元享特惠') {
            preferential = item
          }
        })
        this.setData({
          pack,
          freight,
          periodFreight,
          preferential
        })
      }
    }
  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    pack: null,
    freight: null,
    periodFreight: null,
    preferential: null,
    noticeDialogVisible: false,
    feeToast: false,
    showDeliveryDiscount: false,
    pickTipShow: null,
    isShowFreightPop: false,
    btnName: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDeliverFeeClick: function (e) {
      let { items, iconName } = e.currentTarget.dataset;
      // 紧急需求 包装费模块点击时需要先隐藏 {规则更新} 引导，再次点击才展示提示文案
      // if (types == 'pack' && this.data.pickTipShow) {
      //   this.setData({ pickTipShow: null })
      //   return
      // }
      this.setData({
        noticeDialogVisible: true,
        noticeDialogData: items
      })
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickExplainIcon',
        click_par: {
          iconName
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    selectFeeId(e) {
      let deliveryClerkFeeId, deliveryClerkFeeTipId
      let check = e.currentTarget.dataset.check || ''
      if (this.data.freight.tipFeeNew.check) {
        this.triggerEvent('selectFeeId', {
          deliveryClerkFeeId: '',
          deliveryClerkFeeTipId: ''
        })
      } else {
        this.data.freight.tipFeeNew.tipFeeNewVOList.map(item => {
          if (item.check) {
            deliveryClerkFeeId = item.feeId
            deliveryClerkFeeTipId = item.freight
          }
        })
        this.triggerEvent('selectFeeId', {
          deliveryClerkFeeId,
          deliveryClerkFeeTipId
        })
        this.setData({
          feeToast: true
        })
      }
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'select_feeid',
        click_par: {
          check
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    selectTags(e) {
      let { feeId, check } = e.currentTarget.dataset
      if (!check) {
        this.triggerEvent('selectFeeId', {
          deliveryClerkFeeId: feeId,
          deliveryClerkFeeTipId: feeId
        })
      }
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'select_feeid_tag',
        click_par: {
          check,
          feeId
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    goDiscounts() {
      let params = this.data.freight.freeFreightProductsDto ? JSON.stringify(this.data.freight.freeFreightProductsDto.params) : {}
      wx.navigateTo({
        url: `/pages/settlementV2/subPage/settlementDiscounts/index?params=${params}`,
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'settlementv2_package_goDiscounts'
        }
      });
      clickBuriedV2_({
        click_id: 'go_discounts',
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    showDiscount(e) {
      let { flag = '' } = e.currentTarget.dataset
      if (!flag) return
      this.setData({
        showDeliveryDiscount: true,
        freight: this.data.freight
      })
    },
    goToAddOn(e) {
      let { to, params } = e.currentTarget.dataset
      djCmsJump({
        to,
        params,
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'settlementv2_package_goToAddOn'
        }
      })
    },
    // 点我省运费
    openMember(e) {
      const { clickEventType, to, params } = e.currentTarget.dataset
      // 打开运费立减弹层
      if (clickEventType == 11) {
        this.setData({
          isShowFreightPop: true,
          breaksFreightLayer: this.data.breaksFreightLayer
        })
      } else if (clickEventType == 12) { // 商家会员弹层
        if (this.data.freight.freightMoreSavedTag) {
          this.triggerEvent('oneKeyOpen', {
            data: this.data.freight.memberBenefitInfoWeb
          })
        }
      } else if (clickEventType == 13) { // 跳转减免运费落地页
        djCmsJump({
          to,
          params,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'settlementv2_package_openMember'
          }
        })
      }
      clickBuriedV2_({
        click_id: 'clickReduceFreight',
        click_par: {
          btnName: this.data.btnName
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    // 关闭运费弹层
    closeFreight () {
      this.setData({
        isShowFreightPop: false
      })
    },
    // 开通商家会员
    checkBusiness(e) {
      this.triggerEvent('checkBusiness', {
        openState: e.detail.openState
      })
    },
    selectPack() {
      this.triggerEvent('needPackage', {packUseFlag: !this.data.pack.selectedButtonFlag})
      clickBuriedV2_({
        click_id: 'clickButton',
        click_par: {
          type: 'packingSwitch',
          status: this.data.pack.selectedButtonFlag == true ? 0 : 1,
          state: 0,
          storeId: this.data.storeId
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    dialogClose() {
      this.setData({
        noticeDialogVisible: false
      })
    },
    discountClose() {
      this.setData({
        showDeliveryDiscount: false
      })
    },
    // 通知无障碍
    noticePop(flag) {
      this.triggerEvent('popStatus', {
        types: 'package',
        flag
      })
    },
    resetDelivery(e) {
      let { info = {} } = e.detail
      this.setData({
        'freight.deliveryDiscountResp': info
      })
    }
  }
});

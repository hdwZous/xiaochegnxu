import { djCmsJump } from '../../../../common/util/agreementV2'
import { clickBuriedV2_ } from '../../../../common/util/BI'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    infos: {
      type: Object,
      value: {},
      observer(newv) {
        if (newv && newv.vipId) {
          this.analyInfo(newv)
        }
      }
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
    storeId: {
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
    showStyle: null,
    tipShow: false
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
          currentPageName: 'settlementv2_vipnewstyle_showVipRedPag'
        }
      })
    },
    // 购买vip
    buyVip(e) {
      let { checkVip = 0, vipId = '', unionVipFlag = false, unionMemberId = '', vipType = '', saleText = '', cornerMarkText = '' } = e.currentTarget.dataset
      this.triggerEvent('handleNewVip', {
        checkVip,
        vipId,
        unionVipFlag,
        unionMemberId,
        vipType
      })
      let vipPackageType = vipType, vipEntranceShowType = this.data.infos.vipEntranceShowType || ''
      let { vpType = '' } = this.data.infos
      clickBuriedV2_({
        click_id: 'selectModule',
        click_par: {
          status: checkVip,
          type: 'vplusMem',
          vipPackageType,
          vipEntranceShowType,
          saleText,
          cornerMarkText,
          storeId: this.data.storeId,
          vpType
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
    },
    goAgreement(e) {
      let { to = '', params = {}, jumpFlag = '' } = e.currentTarget.dataset.items
      if (to && jumpFlag) {
        djCmsJump({
          to,
          params,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'settlementv2_vipnewstyle_goAgreement'
          }
        })
      }
    },
    analyInfo(info) {
      let showStyle = null, showItem = null, defaultIds = '', cornerMarkText = ''
      if (info.vipPackageChoiceType == 1) {
        // 多套餐样式从列表中取
        info.vipPackageItemList.map((items, index) => {
          if (items.checkVipFlag == 1) {
            showItem = items
          }
          if (items.defaultShowFlag == true) {
            defaultIds = index
          }
          if (items.vipPackageType == 2) {
            cornerMarkText = items.cornerMarkText || ''
          }
        })
        showItem = showItem ? showItem : info.vipPackageItemList[defaultIds]
      }
      showStyle = {
        subhead: info.vipPackageChoiceType == 1
          ? (showItem.subhead || '')
          : (info.subhead || ''),
        mainhead: info.vipPackageChoiceType == 1
          ? (showItem.mainhead || null)
          : (info.mainhead || null),
        jump: info.vipPackageChoiceType == 1
          ? (showItem.jump || '')
          : (info.jump || ''),
        benefitDescription: info.vipPackageChoiceType == 1
          ? (showItem.benefitDescription || '')
          : (info.benefitDescription || ''),
        autoRenewDescription: info.vipPackageChoiceType == 1
          ? (showItem.autoRenewDescription || '')
          : (info.autoRenewDescription || ''),
        autoRenewQuestionLayer: info.vipPackageChoiceType == 1
          ? (showItem.autoRenewQuestionLayer || null)
          : (info.autoRenewQuestionLayer || null),
        agreementDocument: info.vipPackageChoiceType == 1
          ? (showItem.agreementDocument || null)
          : (info.agreementDocument || null)
      }
      this.setData({ showStyle })
      clickBuriedV2_({
        click_id: 'showModule',
        click_par: {
          type: 'vplusMem',
          vipEntranceShowType: info.vipEntranceShowType,
          cornerMarkText,
          saleText: info.saleText,
          storeId: this.data.storeId,
          vpType: info.vpType
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
    },
    showRule() {
      this.setData({ tipShow: !this.data.tipShow })
    }
  }
})

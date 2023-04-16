import { djCmsJump } from '../../../../common/util/agreementV2'
import emitter from '../../../../common/util/events'
import { getMaskOpenPageNameAndPageSource, getCurrentMaskHasOpen } from "../../../../common/util/bi/utils";
import { pvBuriedV2_, clickBuriedV2_ } from '../../../../common/util/BI';
import util from '../../../../common/util/util'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShowFreightPop: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          let isHasOpenMask = getCurrentMaskHasOpen('pointSaveLayer')
          let { pageName = '', prePageName = '' } = getMaskOpenPageNameAndPageSource('open', 'pointSaveLayer')
          this.setData({
            currentPageName: pageName,
            prePageName
          })
          if (!this.data.pageId) {
            let pageId = util.getPageIdrandom()
            this.setData({
              pageId: pageId
            }, () => {
              pvBuriedV2_({
                page_par: {
                  storeId: this.data.storeId,
                },
                pageId: this.data.pageId,
                currentPageName: pageName,
                prePageName: prePageName,
                isHasOpenMask
              })
            })
          } else {
            pvBuriedV2_({
              page_par: {
                storeId: this.data.storeId,
              },
              pageId: this.data.pageId,
              currentPageName: pageName,
              prePageName: prePageName,
              isHasOpenMask
            })
          }
        }
      }
    },
    storeId: {
      type: String,
      value: ''
    },
    freight: {
      type: Object,
      value: {},
      observer: function (val) {
        // 无障碍
        if (val && val.breaksFreightLayer && val.breaksFreightLayer.breaksFreightVOS) {
          val.breaksFreightLayer.breaksFreightVOS.map((item, index) => {
            item.title.textList.map(((ele, index) => {
              if (item.title.label == undefined) {
                item.title.label = ele.text
              } else {
                item.title.label += ele.text
              }
            }))
            item.subtitle.textList.map(((ele, index) => {
              if (item.subtitle.label == undefined) {
                item.subtitle.label = ele.text
              } else {
                item.subtitle.label += ele.text
              }
            }))
          })
          this.setData({
            freight: val
          })
        }
        if (val && val.breaksFreightLayer && val.breaksFreightLayer.breaksFreightVOS && val.breaksFreightLayer.breaksFreightVOS.length > 0) {
          this.setData({
            isData: true
          })
        } else {
          this.setData({
            isData: false
          })
        }
      }
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
    currentPageName: '',
    prePageName: '',
    isData: false,
    pageId: ''
  },

  pageLifetimes: {
    show: function () {
      this.triggerEvent('closeFreight', {})
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭弹层
    closeFreight() {
      getMaskOpenPageNameAndPageSource('close', 'pointSaveLayer')
      emitter.emit('pvFunc',{maskName:'pointSaveLayer'})
      this.triggerEvent('closeFreight', {})
    },
    // 选中商家会员
    checkBusiness(e) {
      // 1 取消开通 2： 开通
      const { openState } = e.currentTarget.dataset
      this.triggerEvent('checkBusiness', {
        openState: openState
      })
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickMember',
        click_par: {
          storeId: this.data.storeId,
          memType: 'storeMem',
          status: openState == 2 ? 1 : 0
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    // 商家会员协议跳转
    jumpAgreement(e) {
      const {to = '', params = '', jumpFlag = false} = e.currentTarget.dataset.item
      if (jumpFlag) {
        djCmsJump({
          to,
          params,
          preObj: this.data.buriedObj || null,
          buried_position: {
            currentPageName: 'settlementv2_freightpop_jumpAgreeUrl'
          }
        })
      }
    },
    catchtouchmove() {
      return false
    },
    // 更多商品跳转
    jumpMoreProduct(e) {
      getMaskOpenPageNameAndPageSource('close', 'pointSaveLayer')
      emitter.emit('pvFunc',{maskName:'pointSaveLayer'})
      const {to = '', params = '', userAction =''} = e.currentTarget.dataset.item
      djCmsJump({
        to,
        params,
        userAction,
        preObj: this.data.buriedObj || null,
        buried_position: {
          currentPageName: 'settlementv2_freightpop_jumpMoreProduct'
        }
      })
    },
    // 运费凑单跳转
    jumpFreight(e) {
      getMaskOpenPageNameAndPageSource('close', 'pointSaveLayer')
      emitter.emit('pvFunc',{maskName:'pointSaveLayer'})
      const {to = '', params = '', userAction =''} = e.currentTarget.dataset.item
      djCmsJump({
        to,
        params,
        userAction,
        preObj: this.data.buriedObj || null,
        buried_position: {
          currentPageName: 'settlementv2_freightpop_jumpFreight'
        }
      })
    }
  }
})

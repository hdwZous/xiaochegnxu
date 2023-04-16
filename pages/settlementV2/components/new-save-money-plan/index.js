/* eslint-disable camelcase */

import { clickBuriedV2_ } from "../../../../common/util/BI";
import { djCmsJump } from '../../../../common/util/agreementV2.js'
import { request, FNIDS } from '../../../../common/util/api';
let app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    infos: {
      type: Object,
      value: null
    },
    getPlanHml: {
      type: Boolean,
      value: false,
      observer () {
        setTimeout(() => {
          this.setData({
            'hmlInfo.tip_base': '',
            'hmlInfo.tip_over': false,
            'hmlInfo.tip_open': null
          }, () => {
            this.getHtmlInfo()
          })
          this.asynlInfo()
        }, 300)
      }
    },
    refreshSwell: {
      type: Boolean,
      value: false,
      observer () {
        let saveMoneyItems = this.data.infos.saveMoneyItems
        saveMoneyItems.forEach(item => {
          if (item.type == 3) {
            this.setData({ inflationSuccess: true })
          }
        })
      }
    },
    storeId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: null
    },
    orderPageId: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIPX: app.globalData.isIpx,
    hmlInfo: {
      top_origin_h: '',
      top_comp_h: '',
      items_box_h: '',
      tip_base: '',
      tip_over: false,
      tip_open: null
    },
    animation: 0,
    layerOpen: false,
    inflationSuccess: false,
    // 仅存在膨胀券
    justFlat: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getHtmlInfo () {
      let that = this
      this.createSelectorQuery().selectAll('.strategy-top-box, .new-strategy-space, .new-strategy-top-tip, .new-strategy-vip-box,').boundingClientRect(function (rect) {
        if (rect.length) {
          let origin = 0; let comp = 0; let box = 0; let base = 0; let tip = 0; let over = false; let open = null
          rect.forEach(item => {
            switch(item.id) {
            case 'top-box':
              origin = item.height
              break;
            case 'top-tip':
              tip = item.height
              break;
            case 'strategy-space':
              base = item.height
              break;
            case 'vip-box':
              box = item.height
              break;
            default:
              break;
            }
          })
          if (tip > base) {
            let num = tip / base
            comp = origin - (num - 1) * base
            over = true
            open = false
          }
          that.setData({
            'hmlInfo.top_origin_h': origin,
            'hmlInfo.top_comp_h': comp,
            'hmlInfo.items_box_h': box,
            'hmlInfo.tip_base': base,
            'hmlInfo.tip_over': over,
            'hmlInfo.tip_open': open
          })
        }
      }).exec()
    },
    asynlInfo () {
      // justFlat 是否仅有膨胀券
      let saveMoneyItems = this.data.infos.saveMoneyItems; let justFlat = true
      saveMoneyItems.map(item => {
        if (item.type == 1 || item.type == 2) {
          justFlat = false
        }
      })
      this.setData({ justFlat })
    },
    upStrategy () {
      let layerOpen = !this.data.layerOpen
      let animation = layerOpen ? this.data.hmlInfo.items_box_h : 0
      this.setData({
        layerOpen,
        animation
      })
      if (layerOpen == false) {
        this.triggerEvent('listenNewSaveMoney', {
          callSaveMoney: true,
          mode: 6
        })
      }
    },
    showTip () {
      this.setData({
        'hmlInfo.tip_over': !this.data.hmlInfo.tip_over,
        'hmlInfo.tip_open': !this.data.hmlInfo.tip_open
      })
    },
    closeLayer () {
      this.setData({ layerOpen: false, animation: 0 })
    },
    jumpAgreeUrl (e) {
      let item = e.currentTarget.dataset.item || {}
      if (item.to && item.params) {
        djCmsJump({
          to: 'web',
          params: item.params,
          preObj: this.data.buriedObj
        })
      } else {
        if (item.jumpUrl) {
          djCmsJump({
            to: 'web',
            params: {
              url: item.jumpUrl
            },
            preObj: this.data.buriedObj
          })
        }
      }
    },
    // 点击我要省
    async changeMoneyStaus () {
      if (!this.data.layerOpen) {
        this.setData({ layerOpen: true, animation: this.data.hmlInfo.items_box_h })
      }
      let openState = this.data.infos.openState
      let saveMoneyItems = this.data.infos.saveMoneyItems
      let money = {} // 1.v+会员普通/月卡 2.联合月卡 3.商家会员 4.膨胀券
      let buriedType = []; let buriedPackage = ''; let beforeExchangeFlag = null; let exchangeId = ''
      saveMoneyItems.map(item => {
        if (item.type == 1 && item.openState == openState) {
          if (item.vipPackageType == 1 || item.vipPackageType == 2) {
            money.vm = {
              openState: openState == 2 ? 1 : 2,
              vipId: item.vipId
            }
            buriedType.push(1)
          } else if (item.vipPackageType == 3) {
            money.vum = {
              openState: openState == 2 ? 1 : 2,
              vipId: item.vipId,
              unionMemberId: item.unionMemberId
            }
            buriedType.push(1)
          }
          buriedPackage = item.vipPackageType
          beforeExchangeFlag = item.beforeExchangeFlag
          exchangeId = item.exchangeId
        } else if (item.type == 2 && item.openState == openState) {
          money.sm = {
            openState: openState == 2 ? 1 : 2
          }
          buriedType.push(2)
        } else if (item.type == 3 && this.data.inflationSuccess == false) {
          money.inflat = true
          buriedType.push(3)
        }
        item.openState = openState == 2 ? 1 : 2
      })
      // 假如有津贴兑换，需要先兑换再勾选
      if (!this.data.justFlat && openState == 2 && beforeExchangeFlag && exchangeId) {
        let exchange = await this.handleOneKeyExchange(exchangeId)
        if (!exchange) return
      }
      this.setData({
        'infos.openState': this.data.justFlat == true ? openState : openState == 2 ? 1 : 2,
        'infos.saveMoneyItems': saveMoneyItems
      })
      this.triggerEvent('listenNewSaveMoney', {
        callSaveMoney: false,
        mode: 1, // mode 1.点击我要省 2.商家会员 3.v+会员/包月 4.联合会员 5.膨胀券 6.收起省钱攻略
        openState,
        money,
        needToast: exchangeId && openState == 2 ? false : true
      })
      clickBuriedV2_({
        click_id: 'selectMember',
        click_par: {
          status: openState == 2 ? 1 : 0,
          storeId: this.data.storeId,
          type: buriedType.join(),
          vipPackageType: buriedPackage
        },
        pageId: this.data.buriedObj.pageIdFirstPage,
        currentPageName: this.data.buriedObj.currentPageName,
        prePageName: this.data.buriedObj.prePageName
      })
    },
    // 每一个单独选项
    async changeMoneyItemsStaus (e) {
      let { items, ids } = e.currentTarget.dataset
      let { type, unionMemberId = '', vipId = '', vipPackageType = '', openState, beforeExchangeFlag = null, exchangeId = '' } = items
      if (type == 1) {
        // v+ 会员
        if (beforeExchangeFlag && exchangeId) {
          let exchange = await this.handleOneKeyExchange(exchangeId)
          if (!exchange) return
        }
        if (vipPackageType == 1 || vipPackageType == 2) {
          this.triggerEvent('listenNewSaveMoney', {
            callSaveMoney: false,
            mode: 3,
            openState,
            vipId,
            needToast: exchangeId && openState == 2 ? false : true
          })
        } else if (vipPackageType == 3) {
          // 联合会员
          this.triggerEvent('listenNewSaveMoney', {
            callSaveMoney: false,
            mode: 4,
            openState,
            vipId,
            unionMemberId,
            needToast: exchangeId && openState == 2 ? false : true
          })
        }
      } else if (type == 2) {
        // 商家会员
        this.triggerEvent('listenNewSaveMoney', {
          callSaveMoney: false,
          mode: 2,
          openState
        })
      } else if (type == 3) {
        // 膨胀券
        this.triggerEvent('listenNewSaveMoney', {
          callSaveMoney: false,
          mode: 5
        })
      }
      let str = `infos.saveMoneyItems[${ids}].openState`
      this.setData({
        [str]: openState == 2 ? 1 : 2
      }, () => {
        let saveMoneyItems = this.data.infos.saveMoneyItems; let hasCheck = false
        saveMoneyItems.forEach(item => {
          if (item.openState == 1 && item.type != 3) {
            hasCheck = true
          }
        })
        this.setData({
          'infos.openState': hasCheck ? 1 : 2
        })
      })
      clickBuriedV2_({
        click_id: 'selectPackage',
        click_par: {
          status: openState == 2 ? 1 : 0,
          storeId: this.data.storeId,
          type,
          vipPackageType
        },
        pageId: this.data.buriedObj.pageIdFirstPage,
        currentPageName: this.data.buriedObj.currentPageName,
        prePageName: this.data.buriedObj.prePageName
      })
    },
    handleOneKeyExchange (exchangeId) {
      return new Promise((resolve, reject) => {
        let { functionId, appVersion } = FNIDS.convertCouponOneKey;
        let { buriedObj = {} } = this.data
        let { pageIdFirstPage = ''} = buriedObj
        request({
          functionId,
          isNeedDealError: true,
          appVersion,
          method: "post",
          body: {
            activityCode: '',
            grabChannel: "order_pay_page",
            orderPageId: this.data.orderPageId,
            buyCouponWithOrderFlag: this.data.buyCouponWithOrderFlag == 0 ? false : true,
            exchangeId,
            fromSource: 5
          },
          pageId: pageIdFirstPage,
          preObj: buriedObj
        }).then((res) => {
          if (res.data && res.data.code == 0) {
            wx.showToast({
              title: "兑换成功",
              icon: "none",
              duration: 2500
            });
            resolve(true)
          } else {
            wx.showToast({
              title: res.data.msg || "兑换失败",
              icon: "none",
              duration: 2500
            });
            reject(false)
          }
        }).catch(err => {
          console.log(err)
          reject(false)
        });
      })
    }
  }
});

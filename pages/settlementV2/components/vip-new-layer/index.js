/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
/* eslint-disable  no-empty */
import mp from "../../../../common/util/wxapi";
import { queryRedPacketService } from "../../../../common/util/services";
import { pvBuriedV2_, clickBuriedV2_ } from "../../../../common/util/BI";
import util from "../../../../common/util/util";
import emitter from '../../../../common/util/events'
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer (vals) {
        this.setData({
          showDialog: vals
        })
        // pv埋点
        if (vals == true) {
          let pageId = util.getPageIdrandom()
          let prePageName = this.data.preBuried.currentPageName
          this.setData({
            pageId,
            currentPageName: 'redPacLayer',
            prePageName: prePageName,
            recommendObj: {
              pageId,
              currentPageName: 'redPacLayer',
              prePageName: prePageName,
              pageSource: this.data.preBuried.pageSource,
              refPageSource: this.data.preBuried.refPageSource
            }
          }, () => {
            this.pvFunc()
            const pageList = getCurrentPages();
            const route = (pageList && pageList.length && pageList[pageList.length - 1].route) || ''
            const prePageId = this.data.preBuried.pageIdFirstPage || ''
            emitter.emit('halfMaskFunc_' + route + '_aggregateStoresLayer_' + prePageId, {
              name: 'redPacLayer',
              type: 'open',
              selector: '#vip-new-layer',
              buriedObj: this.data.recommendObj
            })
          })
        } else {
          const pageList = getCurrentPages();
          const route = (pageList && pageList.length && pageList[pageList.length - 1].route) || ''
          const prePageId = this.data.preBuried.pageIdFirstPage || ''
          emitter.emit('halfMaskFunc_' + route + '_aggregateStoresLayer_' + prePageId, {
            name: 'redPacLayer',
            type: 'close',
            selector: '#vip-new-layer',
            buriedObj: this.data.recommendObj
          })
        }
      }
    },
    data: {
      type: Object,
      value: null,
      observer (newVal) {
        this.initData(newVal)
      }
    },
    storeId: {
      type: String,
      value: ''
    },
    orgCode: {
      type: String,
      value: ''
    },
    unique: {
      type: String,
      value: ''
    },
    requestFlag: {
      type: String,
      value: "",
      observer (newVal) {
        if (newVal) {
          this.queryRedPacket()
        }
      }
    },
    orderPageId: {
      type: String,
      value: ""
    },
    buyCouponWithOrderFlag: {
      type: Number,
      value: 0
    },
    isIOS: {
      type: Boolean,
      value: false
    },
    vipMemberFlag: {
      type: Boolean,
      value: false
    },
    mockVip: {
      type: Boolean,
      value: false
    },
    preBuried: {
      type: Object,
      value: null
    },
    biPageName: {
      type: String,
      value: ''
    },
    v28VoucherList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    redPacketInfo: {},
    isIpx: getApp().globalData.isIpx,
    count: 0,
    amount: 4,
    selectedStr: '',
    selectedCoupon: null,
    vipFloor: {
      exist: false,
      isChecked: 0,
      vipId: '',
      unionVipFlag: false,
      unionMemberId: '',
      vipPackageChoiceType: 0
    },
    // 大额红包兑换类型 1.仅兑换(仅需传code) 2.开通并兑换(需要传code及vipId)
    exchangeType: null,
    vipRequest: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    pvFunc (back) {
      pvBuriedV2_({
        page_par: {
          storeId: this.data.storeId
        },
        pageId: this.data.pageId,
        currentPageName: 'redPacLayer',
        prePageName: this.data.prePageName,
        isBack: back || ''
      })
    },
    hide () {
      this.setData({
        showDialog: false
      });
      setTimeout(() => {
        this.triggerEvent('closeLayer', { type: 'showNewVipLayer' })
      }, 100)
    },
    initData (disInfo) {
      if (disInfo.data) {
        for (let i = 0; i < disInfo.data.length; i++) {
          if (disInfo.data[i].name == '红包') {
            this.setData({
              redPacketInfo: disInfo.data[i].redPacketInfo || null,
              count: 0,
              amount: 0,
              selectedStr: '',
              selectedCoupon: null
            }, () => {
              this.data.redPacketInfo && this.analyRedInfo(this.data.redPacketInfo)
            })
            break;
          }
        }
      }
    },
    queryRedPacket () {
      queryRedPacketService({
        isNeedDealError: true,
        body: {
          storeId: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          fromSource: "5",
          unique: this.data.unique || "",
          orderPageId: this.data.orderPageId
        }
      }
      ).then(res => {
        if (res.data.code == 0) {
          this.setData({
            redPacketInfo: res.data.result || {},
            show: true
          })
        } else {
          mp.dialog({
            content: res.data.msg || "网路开小差~",
            showCancel: false
          }).then(res => {
            console.log(res)
            wx.navigateBack()
          })
        }
      }).catch(() => {
        mp.dialog({
          content: "网路开小差~",
          showCancel: false
        }).then(res => {
          console.log(res)
          wx.navigateBack()
        })
      })
    },
    analyRedInfo (obj) {
      let selectedStr = ''; let selectedCoupon = null; let count = 0; let amount = 0; let vipId = '';
      let exist = obj.newVipPurchaseEntrance ? true : false; let isChecked = 0
      if (obj.newVipPurchaseEntrance) {
        if (obj.newVipPurchaseEntrance.vipPackageChoiceType == 1) {
          let ids = ''; let checkItem = null
          obj.newVipPurchaseEntrance.vipPackageItemList.forEach((item, index) => {
            if (item.checkVipFlag == 1) {
              checkItem = item
              isChecked = 1
            }
            if (item.defaultShowFlag == true) {
              ids = index
            }
          })
          checkItem = checkItem ? checkItem : obj.newVipPurchaseEntrance.vipPackageItemList[ids]
          vipId = checkItem.vipId
        } else {
          vipId = obj.newVipPurchaseEntrance.vipId
          isChecked = obj.newVipPurchaseEntrance.checkVipFlag
        }
      }
      this.setData({
        vipFloor: {
          exist: exist,
          vipId: exist ? vipId : '',
          isChecked: exist ? isChecked : 0,
          vipPackageChoiceType: exist ? obj.newVipPurchaseEntrance.vipPackageChoiceType || 0 : 0,
          unionVipFlag: exist ? obj.newVipPurchaseEntrance.unionVipFlag : false,
          unionMemberId: exist ? obj.newVipPurchaseEntrance.unionVipFlag && obj.newVipPurchaseEntrance.unionMemberId : ''
        }
      })
      if (obj.vMemberList && obj.vMemberList.length) {
        for (let i = 0; i < obj.vMemberList.length; i++) {
          if (obj.vMemberList[i].selectedState == 20) {
            selectedStr = `redPacketInfo.vMemberList[${i}].selectedState`
            selectedCoupon = obj.vMemberList[i]
            count = 1
            amount = obj.vMemberList[i].price
            break
          }
        }
        if (selectedStr && selectedCoupon) {
          this.setData({
            selectedStr,
            selectedCoupon,
            count,
            amount
          })
          return
        }
      }
      if (obj.exchangeList && obj.exchangeList.length) {
        for (let i = 0; i < obj.exchangeList.length; i++) {
          if (obj.exchangeList[i].selectedState == 20) {
            selectedStr = `redPacketInfo.exchangeList[${i}].selectedState`
            selectedCoupon = obj.exchangeList[i]
            count = 1
            amount = obj.exchangeList[i].price
            break
          }
        }
        if (selectedStr && selectedCoupon) {
          this.setData({
            selectedStr,
            selectedCoupon,
            count,
            amount
          })
          return
        }
      }
      if (obj.ordinaryList && obj.ordinaryList.length) {
        for (let i = 0; i < obj.ordinaryList.length; i++) {
          if (obj.ordinaryList[i].selectedState == 20) {
            selectedStr = `redPacketInfo.ordinaryList[${i}].selectedState`
            selectedCoupon = obj.ordinaryList[i]
            count = 1
            amount = obj.ordinaryList[i].price
            break
          }
        }
        if (selectedStr && selectedCoupon) {
          this.setData({
            selectedStr,
            selectedCoupon,
            count,
            amount
          })
          return
        }
      }
    },
    handleCheck (e) {
      let { infos: { couponCode = '', activityCode = '', selectedState = 0, exchangeId = '' }, belongCamp } = e.detail
      let lists = this.data.redPacketInfo[belongCamp]
      let states = selectedState == 10 ? 20 : selectedState == 20 ? 10 : 0
      let ids = lists.findIndex(item => {
        if (belongCamp == 'exchangeList') {
          if (activityCode) return item.activityCode == activityCode
          if (exchangeId) return item.exchangeId == exchangeId
        } else {
          return item.couponCode == couponCode
        }
      })
      let coupon = lists[ids]
      let instr = `redPacketInfo.${belongCamp}[${ids}].selectedState`
      let setObj = {}
      if (this.data.selectedStr == '') {
        setObj = {
          [instr]: states,
          selectedStr: instr,
          selectedCoupon: coupon,
          count: 1,
          amount: coupon.price
        }
      } else {
        if (this.data.selectedStr == instr) {
          setObj = {
            [instr]: states,
            selectedStr: states == 20 ? instr : '',
            selectedCoupon: states == 20 ? coupon : null,
            count: states == 20 ? 1 : 0,
            amount: states == 20 ? coupon.price : ''
          }
        } else {
          setObj = {
            [instr]: states,
            [this.data.selectedStr]: 10,
            selectedStr: instr,
            selectedCoupon: coupon,
            count: 1,
            amount: coupon.price
          }
        }
      }
      this.setData(setObj)
      // 埋点
      clickBuriedV2_({
        click_id: 'selectRedPac',
        click_par: {
          couponCode,
          activityCode,
          vplus: this.data.vipMemberFlag ? 1 : 0,
          status: states
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
    },
    handleNewVip (e) {
      let { checkVip = 0, vipId = '', vipType = '' } = e.detail;
      let obj = this.data.redPacketInfo.newVipPurchaseEntrance
      let vipPackageChoiceType = this.data.vipFloor.vipPackageChoiceType
      if (vipPackageChoiceType == 1) {
        obj.vipPackageItemList.map(item => {
          if (item.vipId == vipId && item.vipPackageType == vipType) {
            item.checkVipFlag = checkVip
          } else {
            item.checkVipFlag = 0
          }
        })
      } else {
        obj.checkVipFlag = checkVip
      }
      this.setData({
        'vipFloor.isChecked': checkVip,
        'vipFloor.vipId': vipId,
        'redPacketInfo.newVipPurchaseEntrance': obj,
        mockVip: checkVip == 1 ? true : false
      })
    },
    confirm () {
      try {
        clickBuriedV2_({
          click_id: 'clickConfirm',
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId
        })
      } catch (error) { }
      // 假如是会员的情况下 (弹层外面会员楼层勾选或本身就是会员在弹层内不下发vip楼层)
      let notice = {}; let vip = this.data.vipFloor; let coupon = this.data.selectedCoupon
      if (vip.exist == false) {
        if (coupon && coupon.needChangeFlag == true) {
          // 选中可兑换大额红包 -- 弹兑换弹窗
          this.setData({
            vipRequest: !this.data.vipRequest,
            exchangeType: 1
          })
          return
        } else {
          // 选择普通红包或商家红包
          notice = {
            redPacketCode: coupon ? coupon.couponCode : ''
          }
        }
      } else {
        // 不是会员的情况
        if (coupon == null && vip.isChecked == 0) {
          // 没有选择红包也没有选择vip楼层
          notice = {
            redPacketCode: ''
          }
        } else if (coupon == null && vip.isChecked == 1) {
          // 没有选择红包但选择vip楼层
          notice = {
            redPacketCode: '',
            checkVipFlag: 1, // 结算参数
            purchaseVipTypeId: vip.vipId, // 结算 提单参数
            purchaseVip: true, // 提单参数
            buyCouponWithOrderFlag: 1,
            unionVipFlag: vip.unionVipFlag,
            purchaseMemberId: vip.unionMemberId
          }
        } else if (coupon && coupon.needOpenVPlusFlag == false && vip.isChecked == 0) {
          // 选择普通红包但没选择vip楼层
          notice = {
            redPacketCode: coupon.couponCode
          }
        } else if (coupon && coupon.needOpenVPlusFlag == false && vip.isChecked == 1) {
          // 选择普通红包也选择vip楼层
          notice = {
            redPacketCode: coupon.couponCode,
            checkVipFlag: 1, // 结算参数
            purchaseVipTypeId: vip.vipId, // 结算 提单参数
            purchaseVip: true, // 提单参数
            buyCouponWithOrderFlag: 1,
            unionVipFlag: vip.unionVipFlag,
            purchaseMemberId: vip.unionMemberId
          }
        } else if (coupon && coupon.needOpenVPlusFlag == true && !coupon.needChangeFlag && vip.isChecked == 0) {
          // 选择商家红包但未选择vip楼层
          this.setData({
            showRemarkDialog: true
          })
          // 埋点
          clickBuriedV2_({
            click_id: 'showLayer',
            click_par: {
              type: 'openVplusMem'
            },
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName,
            pageId: this.data.pageId
          })
          return
        } else if (coupon && coupon.needOpenVPlusFlag == true && !coupon.needChangeFlag && vip.isChecked == 1) {
          // 选择商家红包且选择vip楼层
          notice = {
            redPacketCode: coupon.couponCode,
            checkVipFlag: 1, // 结算参数
            purchaseVipTypeId: vip.vipId, // 结算 提单参数
            purchaseVip: true, // 提单参数
            buyCouponWithOrderFlag: 1,
            unionVipFlag: vip.unionVipFlag,
            purchaseMemberId: vip.unionMemberId
          }
        } else if (coupon && coupon.needChangeFlag == true) {
          // 选中可兑换大额红包 -- 弹兑换弹窗
          this.setData({
            vipRequest: !this.data.vipRequest,
            exchangeType: 2,
            buyCouponWithOrderFlag: 1
          })
          return
        }
      }
      this.noticeFuc(notice)
      this.hide()
    },
    onRemarkCompleted () {
      this.hide()
      let notice = {
        redPacketCode: this.data.selectedCoupon.couponCode,
        checkVipFlag: 1, // 结算参数
        purchaseVipTypeId: this.data.vipFloor.vipId, // 结算 提单参数
        purchaseVip: true, // 提单参数
        buyCouponWithOrderFlag: 1,
        unionVipFlag: this.data.vipFloor.unionVipFlag,
        purchaseMemberId: this.data.vipFloor.unionMemberId
      }
      this.noticeFuc(notice)
      // 埋点
      clickBuriedV2_({
        click_id: 'clickLayer',
        click_par: {
          type: 'openVplusMem'
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
    },
    listenExchange (e) {
      let { consumeCode = '', exchangeFlag } = e.detail
      let notice = {}; let vip = this.data.vipFloor; let specil = {}
      if (this.data.exchangeType == 1) {
        notice = {
          redPacketCode: consumeCode
        }
      } else {
        notice = {
          redPacketCode: consumeCode,
          checkVipFlag: 1, // 结算参数
          purchaseVipTypeId: vip.vipId, // 结算 提单参数
          purchaseVip: true, // 提单参数
          buyCouponWithOrderFlag: 1,
          unionVipFlag: vip.unionVipFlag,
          purchaseMemberId: vip.unionMemberId
        }
      }
      if (exchangeFlag == 5) {
        // couponCacheId 优惠券缓存id
        specil = { couponCacheId: '' }
      }
      if (exchangeFlag == 6) {
        // firstPlaceRedPacketCode 红包code码
        specil = { firstPlaceRedPacketCode: null }
      }
      notice = Object.assign({}, notice, specil)
      this.noticeFuc(notice, exchangeFlag, false)
      this.hide()
    },
    noticeFuc (notice, exchangeFlag, needToast = true) {
      // 红包弹层中勾选v+会员楼层---12; 红包弹层中勾选（反勾选）红包---30
      let vip = this.data.vipFloor
      notice.userOperateType = exchangeFlag == 6 ? null : vip.isChecked ? 12 : 30
      notice.needToast = needToast
      this.triggerEvent('listenNewVipPop', { notice })
    }
  }
});

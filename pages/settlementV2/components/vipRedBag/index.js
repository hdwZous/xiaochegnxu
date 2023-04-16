import mp from "../../../../common/util/wxapi";
import { request, FNIDS } from "../../../../common/util/api";
import { queryRedPacketService } from "../../../../common/util/services";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer(newVal, oldVal) {
        setTimeout(() => {
          this.setData({
            showDialog: newVal
          })
        }, 10)
      }
    },
    data: {
      type: Object,
      value: null,
      observer(newVal, oldVal) {
        this.initData(newVal)
      }
    },
    storeId: {
      type: String,
      value: '',
    },
    orgCode: {
      type: String,
      value: '',
    },
    unique: {
      type: String,
      value: '',
    },
    requestFlag: {
      type: String,
      value: "",
      observer(newVal) {
        if (newVal) {
          this.queryRedPacket()
        }
      }
    },
    orderPageId: {
      type: String,
      value: "",
    },
    buyCouponWithOrderFlag: {
      type: Number,
      value: 0
    },
    isIOS: {
      type: Boolean,
      value: false
    },
    pageId: {
      type: String,
      value: ''
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
    redPacketInfo: {},
    unavailableCode: "",//不可用券code
    reason: "",
    isIpx: getApp().globalData.isIpx
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hide() {
      this.setData({
        showDialog: false,
        unavailableCode: '',
      });
      setTimeout(() => {
        this.setData({
          show: false,
          reason: ''
        })
        this.triggerEvent('popStatus', {
          types: 'vipredbag',
          flag: false
        })
      }, 100)
    },
    initData(disInfo) {
      // console.log('disInfo',disInfo)
      if (disInfo.data) {
        for (let i = 0; i < disInfo.data.length; i++) {
          if (disInfo.data[i].name == '红包') {
            // console.log('redPacketInfo',disInfo.data[i].redPacketInfo)
            this.setData({
              redPacketInfo: disInfo.data[i].redPacketInfo || {}
            })
            break;
          }
        }
      }
    },
    checkRed(e) {
      let { couponCode, selectedState, types = '', datas = null } = e.currentTarget.dataset || {}
      if (selectedState == 10) {
        if (types == 'exchange') {
          this.getVipExchangeInfo({detail: datas})
        } else {
          this.triggerEvent('handleVipChecked', couponCode)
          this.hide()
        }
      }
    },
    // 兑换信息
    getVipExchangeInfo(e) {
      let { activityCode, state, exchangeFlag } = e.detail.data || {}
      // 获取兑换券信息
      let { functionId, appVersion } = FNIDS.vipChangePopInfo
      request({
        functionId,
        isNeedDealError: true,
        method: "post",
        appVersion,
        body: {
          activityCode: activityCode || '',
          grabChannel: 'order_pay_page',  // 结算页面
          orderPageId: this.data.orderPageId,
          exchangeFlag: exchangeFlag || 3,
          buyCouponWithOrderFlag: this.data.buyCouponWithOrderFlag
        },
        pageId: this.data.pageId || '',
        preObj: this.data.buriedObj
      }).then(res => {
        let result = res.data.result;
        let code = res.data.code;
        if (code == '0') {
          this.setData({
            vipExchange: result,
            showVipExchange: true,
            hidePop: true
          })
        } else {
          mp.toast({
            title: res.data.msg || '兑换失败'
          })
        }
      }).catch(err => {
        mp.toast({
          title: err.data.msg || '兑换失败'
        })
      })
    },

    onWidgetEvent(e) {
      let { type, data } = e.detail
      // this.triggerEvent("pageEvent", {
      //     type: 'vip',
      //     data: data.consumeCode || ''
      // })
      this.triggerEvent('exchangeVipBag', data.consumeCode)
      this.hide()
    },
    catchtouchmove() {
      return false;
    },
    queryRedPacket() {
      queryRedPacketService({
        isNeedDealError: true,
        body: {
          storeId: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          fromSource: "5",
          unique: this.data.unique || "",
          orderPageId: this.data.orderPageId
        },
        pageId: this.data.pageId || ''
      }
      ).then(res => {
        if (res.data.code == 0) {
          this.setData({
            redPacketInfo: res.data.result || {},
            show: true
          }, () => {
            console.log('redPacketInfo', this.data.redPacketInfo)
          })
        } else {
          mp.dialog({
            content: res.data.msg || "网路开小差~",
            showCancel: false,
          }).then(res => {
            // console.error(res)
            wx.navigateBack()
          })
        }
      }).catch(() => {
        mp.dialog({
          content: "网路开小差~",
          showCancel: false,
        }).then(res => {
          // console.error(res)
          wx.navigateBack()
        })
      })
    }
  }
});

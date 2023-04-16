import { djIsLogin, djToLogin } from '../../utils/modules/dj_wx_mini_util'
import { behavior } from '../../utils/modules/miniprogram-computed'
import { verifyCoupon, grapCoupon } from '../../services/index'
import { clickLog } from '../../utils/log'

Component({
  behaviors: [behavior],
  properties: {
    coupon: {
      type: Object,
      value: {}
    },
    storeId: {
      type: String,
      value: ''
    },
    orgCode: {
      type: String,
      value: ''
    }
  },
  computed: {
    buttonLabel(data) {
      const { markState } = data.coupon || {}
      if (markState === 2) return '领取'
      if (markState === 3) return '已领取'
      if (markState === 5) return '已抢光'
      if (markState === 7) return '今日抢光'
      return '领取'
    }
  },
  methods: {
    async handleTapCoupon() {
      const { coupon, storeId, orgCode } = this.data
      if (coupon.markState !== 2) return
      if (!djIsLogin()) {
        djToLogin()
        return
      }

      // this.triggerEvent('changeCoupon', { ...coupon, markState: 3 })
      // return

      // TODO 接口校验
      let res = await verifyCoupon({
        storeNo: storeId,
        orgCode,
        code: coupon.activityCode,
        couponId: coupon.couponId,
      })
      if (+res.code !== 0) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        return
      }

      res = await grapCoupon({
        fromSource: '2',
        isFans: 0,
        isFloor: 0,
        needCouponGo: true,
        grabPlat: 1,
        channel: 'station_home_page',
        source: 'homestore',
        platNewActivityFlag: '',
        code: coupon.activityCode,
        orgCode,
        storeNo: storeId,
        pageSource: 'store',
        operType: 1
      })
      if (+res.code !== 0) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        return
      }
      clickLog('winner_store_info_page__click_assist_coupon', {
        store_id: storeId,
        orgCode: orgCode,
        res: res
      })

      const { responseList, message } = res.result
      wx.showToast({
        title: message,
        icon: 'none'
      })
      if (responseList && responseList[0]) {
        this.triggerEvent('changeCoupon', responseList[0])
      }
    }
  },
})

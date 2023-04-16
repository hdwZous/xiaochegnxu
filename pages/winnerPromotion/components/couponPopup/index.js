import { clickLog, epLog } from "../../utils/log"

const COPUON_MAX_SIZE = 5 // 优惠券弹层最多只展示5张

Component({
  properties: {
    storeId: {
      type: String,
      value: ''
    },
    orgCode: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: '',
    },
    coupons: {
      type: Array,
      value: [],
      observer(value) {
        const coupons = value.length > COPUON_MAX_SIZE ? value.slice(0, COPUON_MAX_SIZE) : value
        clickLog('winner_store_info_page__store_coupon_list', { coupons: coupons, shopId: this.data.storeId, orgCode: this.data.orgCode })
        this.setData({ coupons })
      }
    },
  },
  methods: {
    handleClose() {
      this.triggerEvent('close')
    },
    handleChangeCoupon(e) {
      this.triggerEvent('changeCoupon', e.detail)
    },
    handleToCouponList() {
      const { storeId, orgCode } = this.data
      clickLog('winner_store_info_page__click_all_coupon')
      this.triggerEvent('close')
      wx.navigateTo({ url: `/pages/winnerPromotion/couponList/index?storeId=${storeId}&orgCode=${orgCode}` })
    },
  },
})

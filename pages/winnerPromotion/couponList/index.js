import { behavior } from '../utils/modules/miniprogram-computed'
import { couponList } from '../services/index'
import { clickLog } from '../utils/log'

Page({
  behaviors: [behavior],
  data: {
    storeId: '',
    orgCode: '',
    tagIndex: 0,
    tags: [],
    coupons: []
  },
  computed: {
    tagCoupons(data) {
      const { coupons, tagIndex } = data
      if (coupons.length <= 0) return []
      return coupons[tagIndex].coupons
    }
  },
  onLoad(options) {
    const { storeId, orgCode } = options
    this.setData({ storeId, orgCode })
    this.getCouponList()
  },
  async getCouponList() {
    const { storeId, orgCode } = this.data
    const res = await couponList({ stationNo: storeId, orgCode })
    if (+res.code !== 0) {
      wx.showModal({
        content: res.msg,
        showCancel: false,
      })
      return
    }
    const tags = res.result.map(i => i.title)
    clickLog('winner_store_info_page__all_coupon_list', { storeId: storeId, orgCode: orgCode, coupons: res.result })
    this.setData({ tags, coupons: res.result })
  },
  handleChangeTag(e) {
    const { index } = e.currentTarget.dataset
    clickLog('winner_store_info_page__click_coupon_type', { tag_index: index, tags: this.data.tags })
    this.setData({ tagIndex: index })
  },
  handleChangeCoupon(e) {
    const coupon = e.detail
    let { coupons } = this.data
    coupons = coupons.map(i => ({
      ...i,
      coupons: i.coupons.map(j => {
        if (j.activityCode === coupon.activityCode) {
          return {
            ...j,
            ...coupon
          }
        }
        return j
      })
    }))
    this.setData({ coupons })
  }
})

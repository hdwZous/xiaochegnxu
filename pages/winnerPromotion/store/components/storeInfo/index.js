import { clickLog } from "../../../utils/log"

//Component Object
Component({
  properties: {
    storeInfo: {
      type: Object,
      value: {},
    },
    storeCouponInfo: {
      type: Object,
      value: {},
      observer: function (newVal) {
        if (newVal && newVal.couponModelList)
          this.setData({
            showList: newVal.couponModelList.splice(0, 3)
          })
      }
    },
  },
  data: {
    showList: []
  },
  methods: {
    handleShowCouponPopup(e) {
      clickLog('winner_store_info_page__click_coupon_layer')
      this.triggerEvent("handleShowCouponPopup", e)
    }
  }
})

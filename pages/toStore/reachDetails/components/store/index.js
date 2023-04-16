import { djCmsJump } from "../../../../../common/util/agreementV2"
import mp from '../../../../../common/util/wxapi'

Component({
  properties: {
    title: {
      type: String,
      value: '适用门店'
    },
    storeInfo: {
      type: Object,
      value: {},
      observer(storeInfo) {
        const { businessTimeList = [] } = storeInfo
        const businessTimeStrs = []

        businessTimeList.forEach(businessTime => {
          const { startTime = '', endTime = '' } = businessTime
          if (startTime && endTime) {
            businessTimeStrs.push(`${startTime}-${endTime}`)

          }
        })

        this.setData({ businessTimeStr: businessTimeStrs.join('，') })
      }
    },
    moreText: String,
    moreJump: Object,
    config: {
      type: Object,
      value: {},
    }
  },
  methods: {
    toH5MoreStore() {
      const { moreJump, config } = this.data
      const { userAction } = config || {}

      if (moreJump) {
        djCmsJump({ ...moreJump, userAction })
      }
    },
    toCall() {
      const { storeInfo } = this.data
      const { phone = [] } = storeInfo

      if (Array.isArray(phone) && phone.length) {
        if (phone.length === 1) {
          return wx.makePhoneCall({ phoneNumber: phone[0] })
        }

        wx.showActionSheet({
          itemList: phone,
          success({ tapIndex }) {
            wx.makePhoneCall({ phoneNumber: phone[tapIndex] })
          }
        })
      }
    },
    toShowMap() {
      const { storeInfo } = this.data
      const { latitude, longitude, fullAddress, name } = storeInfo || {}
      wx.openLocation({
        name,
        address: fullAddress,
        latitude: latitude - 0,
        longitude: longitude - 0,
        scale: 18,
        fail() {
          mp.toast({
            title: '获取位置失败！'
          })
        }
      })
    }
  }
})

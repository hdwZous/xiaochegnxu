import emitter from '../../../../../../../common/util/events'
import { TAKE_COUPON, TAKE_COUPON_RES, CLICK_BURIED } from '../../../../constants'

Component({
  options: {
    virtualHost: true,
  },
  lazyObj: {
    epSelector: '.product_coupon_item__ep'
  },
  properties: {
    coupon: {
      type: Object,
      value: {},
      observer(value) {
        this.setData({ curCoupon: value })
      }
    },
    index: Number,
    traceId: {
      type: String,
      value: '',
    },
    buriedObj: {
      type: Object,
      value: {
        pageIdFirstPage: '',
        currentPageName: '',
        prePageName: '',
      },
    }
  },
  attached() {
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    const { index } = this.data

    this.pid = page.pid
    this.pcfg = page.data.config

    emitter.addListener(`${TAKE_COUPON_RES}_${index}` + this.pid, (res) => {
      this.setData({
        'curCoupon.markState': res.markState || 3,
        'curCoupon.couponButton': res.couponButton,
      })
    })
  },
  detached() {
    const { index } = this.data
    emitter.removeListener(`${TAKE_COUPON_RES}_${index}` + this.pid)
  },
  methods: {
    clickCoupon() {
      const { curCoupon, index } = this.data
      const { storeId = '', skuId = '' } = this.pcfg || {}
      const { couponButton = {}, userAction = {}, couponId = '', couponMode = '', activityCode = '' } = curCoupon || {}
      const actType = couponButton.title || ''

      emitter.emit(CLICK_BURIED + this.pid, {
        click_id: 'click_coupon',
        click_par: {
          userAction,
          activityCode,
          actType,
          couponId,
          storeId,
          skuId,
          couponMode,
        }
      })

      if (curCoupon.markState == 2 && couponButton.state == 1) {
        emitter.emit(TAKE_COUPON + this.pid, { coupon: curCoupon, index })
      }
    },
  },
});

import emitter from '../../../../../common/util/events'
import { TO_REACH_SETTLE, TO_STORE_POPUP } from '../../constants'

Component({
  properties: {
    skuInfo: {
      type: Object,
      value: {},
    },
    buttonInfo: {
      type: Array,
      value: [],
      observer(buttonInfo = []) {
        const button = buttonInfo[0] || {}
        this.setData({ button })
      }
    },
    serviceTagList: {
      type: Array,
      value: [],
    },
  },
  data: {
    button: {},
  },
  attached() {
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    this.pid = page.pid
  },
  methods: {
    openPopup(e) {
      const { popupInfo } = e.currentTarget.dataset
      if (popupInfo && popupInfo.title && popupInfo.html) {
        emitter.emit(TO_STORE_POPUP + this.pid, popupInfo)
      }
    },
    onPurchase(e) {
      const { userAction = {} } = e.currentTarget.dataset
      emitter.emit(TO_REACH_SETTLE + this.pid, userAction)
    }
  }
})

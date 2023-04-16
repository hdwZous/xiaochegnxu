import emitter from '../../../../../common/util/events'
import { TO_STORE_POPUP } from '../../constants'

Component({
    properties: {
        title: {
            type: String,
            value: '购买须知',
        },
        ruleList: {
            type: Object,
            value: [],
        }
    },
    data: {
        limit: 3,
    },
    attached() {
        const pages = getCurrentPages()
        const page = pages[pages.length - 1]
        this.pid = page.pid
    },
    methods: {
        showDetailHtml(e) {
          const { popupInfo } = e.currentTarget.dataset
          if (popupInfo && popupInfo.title && popupInfo.html) {
            emitter.emit(TO_STORE_POPUP + this.pid, popupInfo)
          }
        },
        showMore() {
          this.setData({ limit: 99 })
        }
    }
})

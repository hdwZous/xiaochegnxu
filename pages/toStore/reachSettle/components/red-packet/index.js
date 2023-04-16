
import { clickBuriedV2_ } from "../../../../../common/util/BI";
let owner = null
Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    infos: {
      type: Object,
      value: {}
    },
    isIPX: {
      type: Boolean,
      value: false
    },
    bgType: {
      type: String || Number,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    storeId: {
      type: String,
      value: ''
    },
    orderPageId: {
      type: String,
      value: ''
    }
  },

  ready() {
    let self = this.selectOwnerComponent()
    owner = self
  },

  data: {
    showLayer: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getRedPacket(e) {
      let { status } = e.currentTarget.dataset
      if (status == 1) {
        owner.settleOperate(30).then(res => {
          if (res === 'success') {
            this.setData({
              showLayer: true
            })
            clickBuriedV2_({
              click_id: "showLayer",
              click_par: {
                type: 'jdRedPacket',
                storeId: this.data.storeId,
                orderPageId: this.data.orderPageId,
                businessType: this.data.bgType
              },
              pageId: this.data.buriedObj.pageIdFirstPage,
              currentPageName: this.data.buriedObj.currentPageName,
              prePageName: this.data.buriedObj.prePageName
            });
          }
        })
      }
    }
  }
})

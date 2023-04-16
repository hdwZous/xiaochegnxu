import { clickBuriedV2_ } from "../../../../../common/util/BI"; 
let owner = null
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer(vals) {
        this.setData({
          showDialog: vals
        })
      }
    },
    infos: {
      type: Object,
      value: {}
    },
    isIpx: {
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

  /**
   * 组件的初始数据
   */
  data: {
    initialSelected: [],
    tipDialog: {
      show: false,
      types: 0,
      title: "",
      desc: "",
      readmeList: [],
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hide() {
      this.setData({
        showDialog: false
      });
      setTimeout(() => {
        owner.setData({
          showLayer: false
        })
      }, 100)
    },
    selectRed(e) {
      let { status = false } = e.currentTarget.dataset
      this.setData({
        'infos.selected': status == false ? true : false
      })
    },
    explain() {
      this.setData({
        'tipDialog.show': true,
        'tipDialog.types': 1,
        'tipDialog.readmeList': this.data.infos.useRule.contentList,
      })
    },
    tipClose() {
      this.setData({
        'tipDialog.show': false
      })
    },
    confirm() {
      let { selected, availableJdRedPacket } = this.data.infos
      let that = owner.selectOwnerComponent()
      that.settleOperate(selected?31:32)
      this.hide()
      clickBuriedV2_({
        click_id: "selectRedPacket",
        click_par: {
          storeId: this.data.storeId,
          totalJdRedPacket: selected ? availableJdRedPacket : '0',
          orderPageId: this.data.orderPageId,
          businessType: this.data.bgType
        },
        pageId: this.data.buriedObj.pageIdFirstPage,
        currentPageName: this.data.buriedObj.currentPageName,
        prePageName: this.data.buriedObj.prePageName
      });
    }
  }
});

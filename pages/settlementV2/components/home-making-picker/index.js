import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer(val) {
        if (val) {
          this.showBox(val)
        }
      }
    },
    infos: {
      type: Object,
      value: null,
      observer(val) {
        if (val) {
          this.dealInit(val.data)
        }
      }
    },
    buriedObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBox: false,
    selectedIndex: 0,
    timeIndex: 0
  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showBox() {
      setTimeout(() => {
        this.setData({
          showBox: true
        })
      }, 100)
    },
    hide() {
      this.setData({
        showBox: false
      })
      this.triggerEvent('popStatus', {
        types: 'homemaking',
        flag: false
      })
    },
    dealInit(info) {
      if (info.serviceDateTimeItems && info.serviceDateTimeItems.length) {
        for (let i=0; i<info.serviceDateTimeItems.length; i++) {
          let selectedStatus = info.serviceDateTimeItems[i].selectedStatus
          if (selectedStatus == 1) {
            this.setData({
              selectedIndex: i
            })
            let dateItems = info.serviceDateTimeItems[i].serviceTimeItems
            let select = dateItems.findIndex(item => {
              return item.selectable == 2
            })
            if (select != -1) {
              this.setData({
                timeIndex: select
              })
              let { serviceDateTime = '', startDate = '', endDate = '' } = dateItems[select]
              this.triggerEvent("getHomemakingTime", { 
                serviceDateTime, 
                startDate,
                endDate,
                requestFlag: false,
              })
              break
            }
          }
        }
      }
    },
    //点击上方类目
    selectCurDateIndex(e) {
      let index = e.currentTarget.dataset.ids
      this.setData({
        selectedIndex: index
      })
    },
    //点击下发的类目
    selectTimeIndex(e) {
      let { status, infos = {} } = e.currentTarget.dataset
      let { serviceDateTime = '', startDate = '', endDate = '' } = infos
      if (status !== 1) {
        return
      }
      this.hide()
      this.triggerEvent("getHomemakingTime", { 
        serviceDateTime,
        startDate,
        endDate,
        requestFlag: true 
      })
    }
  }
})

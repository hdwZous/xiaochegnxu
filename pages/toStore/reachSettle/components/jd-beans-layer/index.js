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
      value: null,
      observer(newv) {
        if (newv) {
          let exchange = newv.useType ? newv.usePoints / newv.exchangeRatio : 0.01
          let jdNums = newv.useType ? newv.usePoints : 1
          this.setData({
            jdNums: jdNums,
            exchange: exchange.toFixed(2)
          })
        }
      }
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
    tipDialog: {
      show: false,
      types: 0,
      title: "",
      desc: "",
      readmeList: [],
    },
    jdNums: 1,
    exchange: 0.01,
    isLegal: true
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
      let { status = 0 } = e.currentTarget.dataset
      let { useType = 0 } = this.data.infos
      if (useType == status) return
      this.setData({
        'infos.useType': status
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
    changeNums(e) {
      let value = e.detail.value
      let num = 0, exchange = 0, isLegal = true, origin = this.data.jdNums
      let { minUsePoints, maxUsePoints, exchangeRatio } = this.data.infos
      if (value == '') {
        num = ''
        exchange = 0
        isLegal = false
      } else if (value < minUsePoints) {
        num = value
        exchange = num / exchangeRatio
        isLegal = false
      } else if (value >= minUsePoints && value <= maxUsePoints) {
        num = value
        exchange = num / exchangeRatio
        isLegal = true
      } else if (value > maxUsePoints) {
        num = origin
        exchange = num / exchangeRatio
        isLegal = false
      }
      this.setData({
        jdNums: num,
        exchange: exchange.toFixed(2),
        isLegal
      })
    },
    inFocus(e) {
      console.log(e, '点击键盘了')
    },
    confirm() {
      let that = owner.selectOwnerComponent()
      let jd = this.data.jdNums
      let { minUsePoints, maxUsePoints, useType } = this.data.infos
      if (useType==1) {
        if (jd >= minUsePoints && jd <= maxUsePoints) {
          that.setData({
            usePointsNum: this.data.jdNums
          }, () => {
            that.settleOperate(41)
          })
          clickBuriedV2_({
            click_id: "selectjingDou",
            click_par: {
              storeId: this.data.storeId,
              usePointsNum: this.data.jdNums,
              orderPageId: this.data.orderPageId,
              businessType: this.data.bgType
            },
            pageId: this.data.buriedObj.pageIdFirstPage,
            currentPageName: this.data.buriedObj.currentPageName,
            prePageName: this.data.buriedObj.prePageName
          });
        } else {
          wx.showToast({
            title: this.data.infos.toastTips,
            icon: 'none'
          })
          return
        }
      } else if (useType==0) {
        that.setData({
          usePointsNum: 0
        }, () => {
          that.settleOperate(42)
        })
        clickBuriedV2_({
          click_id: "selectjingDou",
          click_par: {
            storeId: this.data.storeId,
            usePointsNum: 0,
            orderPageId: this.data.orderPageId,
            businessType: this.data.bgType
          },
          pageId: this.data.buriedObj.pageIdFirstPage,
          currentPageName: this.data.buriedObj.currentPageName,
          prePageName: this.data.buriedObj.prePageName
        });
      }
      this.hide()
    }
  }
});

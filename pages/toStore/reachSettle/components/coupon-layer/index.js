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
          showDialog: vals,
          count: vals ? this.data.count : 0,
          initialSelected: vals ? this.data.initialSelected : [],
          operation: vals ? this.data.operation : false
        })
        if (vals && this.data.infos && this.data.infos.data) {
          this.initData(this.data.infos.data)
        }
      }
    },
    infos: {
      type: Object,
      value: {},
      observer(newV) {
        if (newV && newV.data && this.data.show) {
          this.initData(this.data.infos.data)
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
    couponList: [],
    notCanUsedCouponList: [],
    couponExplainLayer: null,
    initialSelected: [],
    // 是否是首次初始化数据
    count: 0,
    tipDialog: {
      show: false,
      types: 0,
      title: "",
      desc: "",
      readmeList: [],
    },
    operation: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hide() {
      if (this.data.couponList.length) {
        let that = owner.selectOwnerComponent()
        if (this.data.operation) {
          that.setData({
            couponOperateList: this.data.initialSelected
          }, () => {
            that.settleOperate(23)
          })
        }
      }
      setTimeout(() => {
        owner.setData({
          showLayer: false
        })
      }, 100)
    },
    initData(info) {
      this.setData({
        count: this.data.count + 1,
        couponExplainLayer: info.couponExplainLayer|| null,
        couponList: info.couponList || [],
        notCanUsedCouponList: info.notCanUsedCouponList || []
      }, () => {
        if (info.couponList && info.couponList.length && this.data.count == 1) {
          info.couponList.forEach(item => {
            if (item.selectedState == 20) {
              this.data.initialSelected.push({
                couponCode: item.couponCode,
                couponKey: item.couponKey
              })
            }
          })
        }
      })
    },
    handleCheck(e) {
      let { infos: { couponCode = '', couponKey = '', selectedState = 0 } } = e.detail
      let states = selectedState == 10 ? 20 : selectedState == 20 ? 10 : 0
      let that = owner.selectOwnerComponent()
      that.setData({
        couponOperateList: [{
          couponCode,
          couponKey
        }]
      }, () => {
        that.settleOperate(states==20?21:22)
      })
      this.data.operation = true
    },
    explain() {
      this.setData({
        'tipDialog.show': true,
        'tipDialog.types': 1,
        'tipDialog.readmeList': this.data.couponExplainLayer.contentList,
      })
    },
    tipClose() {
      this.setData({
        'tipDialog.show': false
      })
    },
    confirm() {
      setTimeout(() => {
        owner.setData({
          showLayer: false
        })
      }, 100)
      if (this.data.couponList && this.data.couponList.length) {
        let coupon = [], couponCode = [], couponGroup = []
        this.data.couponList.forEach(item => {
          if (item.selectedState == 20) {
            coupon.push(item)
          }
        })
        if (coupon.length) {
          coupon.forEach(item => {
            item.couponCode && couponCode.push(item.couponCode)
            item.couponGroup && couponGroup.push(item.couponGroup)
          })
        }
        clickBuriedV2_({
          click_id: "selectCoupon",
          click_par: {
            storeId: this.data.storeId,
            couponId: coupon.length ? couponCode.join(',') : '',
            couponGroup: coupon.length ? couponGroup.join(',') : '',
            orderPageId: this.data.orderPageId,
            businessType: this.data.bgType
          },
          pageId: this.data.buriedObj.pageIdFirstPage,
          currentPageName: this.data.buriedObj.currentPageName,
          prePageName: this.data.buriedObj.prePageName
        });
      }
    }
  }
});

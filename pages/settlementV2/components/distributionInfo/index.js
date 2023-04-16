import { clickBuriedV2_ } from '../../../../common/util/BI';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    deliverType: {
      type: Object,
      value: {}
    },
    receiptAddress: {
      type: Object,
      value: {}
    },
    deliverTime: {
      type: Object,
      value: {}
    },
    selectedDeliveryTime: {
      type: String,
      value: ''
    },
    selfAddress: {
      type: Object,
      value: {},
      observer(val) {
        if (val && val.data) {
          !this.data.self_phone && this.setPhone(val.data.phone || '')
        }
      }
    },
    dispatchMold: {
      type: String,
      value: '1'
    },
    orderPageId: {
      type: String
    },
    storeId: {
      type: Number
    },
    unique: {
      type: String
    },
    deliverTypeABStyle: {
      type: Number,
      value: 0
    },
    pageId: {
      type: String,
      value: ''
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: null
    },
    serviceDateTime: {
      type: Object,
      value: null
    }
  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    tipShow: false,
    self_phone: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goAddress(e) {
      let { type, from } = e.currentTarget.dataset
      this.triggerEvent('goAddress', {
        type,
        from
      })
    },
    onDeliverTimeClick() {
      if (this.data.deliverTime && this.data.deliverTime.data && this.data.deliverTime.data.promiseDateRespItems && this.data.deliverTime.data.promiseDateRespItems.length) {
        this.triggerEvent('onDeliverTimeClick')
      }
    },
    clickAddressTab(e) {
      this.triggerEvent('clickAddressTab', {
       'deliverModel': e.currentTarget.dataset.type
      })
    },
    showTip() {
      this.setData({tipShow: true})
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickExplainIcon',
        click_par: {
          iconName: '预售品可送时间'
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    tipClose() {
      this.setData({tipShow: false})
    },
    phoneBlur(e) {
      let self_phone = e.detail.value || ''
      this.setPhone(self_phone)
    },
    setPhone(phone = '') {
      this.setData({
        self_phone: phone
      }, () => {
        this.triggerEvent('newselfPhone', { self_phone: phone })
      })
    },
    toMap() {
      wx.navigateTo({
        url: `/pages/settlementV2/subPage/map/index?orderPageId=${this.data.orderPageId}&storeId=${this.data.storeId}&unique=${this.data.unique}`,
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'settlementv2_distributioninfo_toMap'
        }
      });
    },
    serviceTimeClick(e) {
      let { types } = e.currentTarget.dataset
      if (types == 0) {
        return
      } else if (types == 1) {
        this.triggerEvent('popStatus', {
          types: 'homemaking',
          flag: true
        })
      } else if (types == 2) {
        let { data: { timeSelectedArrowClickText = '' } = {} } = this.data.serviceDateTime
        wx.showToast({
          title: timeSelectedArrowClickText,
          icon: 'none',
          duration: 2500
        })
      }
    }
  }
});

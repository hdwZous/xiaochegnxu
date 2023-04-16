import { _deleteGift, _addGiftsMulti } from '../../../../common/util/carService'
let app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {},
    },
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    recomObj: {
      type: Object,
      value: {}
    }
  },

  observers: {},

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    clickExchange(e) {
      let { info } = e.currentTarget.dataset;
      if (info.skuNum) {
        this.removeGifts(info);
      } else {
        this.addGifts(info);
      }
    },
    addGifts(info) {
      let multiInputGiftVoList = [], infoId = info.infoId, inputGiftVoList = [], params = {}
      let { pageIdFirstPage = '', pageSource, refPageSource = '' } = this.data.recomObj
      inputGiftVoList.push({
        id: info.skuId,
        ladderId: info.ladderId,
        giftFlag: info.giftFlag,
        addCartSource: info.addCartSource,
        num: 1,
      })
      multiInputGiftVoList.push({
          infoId,
          inputGiftVoList
      })
      params = {
        storeId: this.data.storeId,
        orgCode: this.data.orgCode,
        lat: app.globalData.addressInfo.latitude,
        lng: app.globalData.addressInfo.longitude,
        multiInputGiftVoList,
        pageSource,
        refPageSource
      }
      _addGiftsMulti(params, pageIdFirstPage)
      .then(res => {
          if (res.data.code == '0') {
            this.triggerEvent('exchangeSuccess')
          }
      }).catch(err => {
          wx.showToast({
              title: err.msg,
              icon: 'none'
          });
      })
    },
    removeGifts(info) {
      let { pageIdFirstPage = '' } = this.data.recomObj
      let params = {
        lat: app.globalData.addressInfo.latitude,
        lng: app.globalData.addressInfo.longitude,
        orgCode: this.data.orgCode,
        storeId: this.data.storeId,
        infoGiftMap: {
            [info.infoId]: [info.skuId]
        }
      }
      _deleteGift(params, pageIdFirstPage)
      .then(res => {
          if (res.data.code == 0) {
              this.triggerEvent('exchangeSuccess')
          }
      }).catch(err => {
          wx.showToast({
              title: err.msg,
              icon: 'none'
          });
      })
    }
  },
});

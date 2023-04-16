import { djCmsJump } from '../../../../../common/util/agreementV2'

Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: ".hoot_list",
    epSelector: '.hoot_list'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    suItem: {
      type: Object,
      value: null
    },
    styleTpl: {
      type: String,
      value: ''
    },
    activityId: {
      type: String,
      value: ''
    },
    biActivityId: {
      type: String,
      value: ''
    },
    traceId: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转至门店锚中商品
    goToStore(e) {
      let data = e.currentTarget.dataset;
      let to = data.to
      let params = data.params
      let items = data.item
      let userAction = data.userAction
      let iconType = data.iconType
      params.isAddCart = data.addCart ? data.addCart : ''
      params.activityId = this.data.activityId
      // 打开spu弹层
      if (iconType == 1) {
        let spuData = {
          storeId: items.storeId,
          orgCode: items.orgCode,
          spuId: items.spuId,
          skuId: items.skuId,
          transmitData: items.transmitData,
          carNumber: items.carNumber
        }
        this.triggerEvent('toggleSpuSelector', spuData, { composed: true, bubbles: true })
        return
      } else {
        // 如果是跳转h5,但是没下发url则不跳转
        if ( data.to == 'web' && (!data.params || !data.params.url) ) {
          return
        }
        // console.log('to:' + to);
        // console.log('params:' + JSON.stringify(params));
        // console.log('userAction:' + userAction);
        // 跳转协议
        djCmsJump({
          to,
          params,
          userAction,
          preObj: this.data.recommendObj,
          buried_position: "active-hotGoods1"
        })
      }
    },
    // 跳转至门店锚中商品展示商品详情
    goToStoreShowDetail(e) {
      let data = e.currentTarget.dataset;
      // 如果是跳转h5,但是没下发url则不跳转
      if (data.to == 'web' && (!data.params || !data.params.url)) return
      data.params.isShowGoodsDetail = true;
      // 跳转协议
      djCmsJump({
        to: data.to,
        params: data.params,
        userAction: data.userAction,
        preObj: this.data.recommendObj,
        buried_position: "active-hotGoods2"
      })
    }
  }
});

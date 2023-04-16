// 店内搜索商品列表
import { djCmsJump } from "../../../../common/util/agreementV2";
import { trigger_sku_component } from '../../../../common/util/tencentBi/report'
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  lazyObj: {
    epSelector: ".good-item-log"
  },
  options: {
    addGlobalClass: true
  },
  properties: {
    item: {
      type: Object,
      value: null,
      observer(val) {
        if (val) {
          this.epSection && this.epSection();
        }
      }
    },
    imgLazyLoad: {
      type: Object,
      value: {}
    },
    keyword: {
      type: String,
      value: ''
    },
    traceId: {
      type: String,
      value: ''
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
    index: {
      type: Number,
      value: 0
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },
  data: {
    latitude: app.globalData.addressInfo.latitude,
    longitude: app.globalData.addressInfo.longitude,
    formTmp: 'store'
  },
  methods: {
    noticeParent(type, data) {
      this.triggerEvent('listenCountChange', {
        params: {
          type: type,
          data: data
        }
      })
    },
    // 去商品详情
    goToDetail(e) {
      let item = e.currentTarget.dataset.item;
      let { to, params, userActionSku } = item || {};
      params.keyword = this.data.keyword;
      let { recommendObj, traceId } = this.data
      djCmsJump({
        to,
        params,
        userAction: userActionSku,
        traceId: traceId,
        preObj: recommendObj,
        buried_postion: "searchAbout-storeGoodListItem"
      });
      trigger_sku_component(item || {})
    },
    addMinControllerChange(e) {
      this.triggerEvent("addMinControllerChange", e.detail)
    }
  }
});
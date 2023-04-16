import { djCmsJump } from "../../../../common/util/agreementV2";
import { trigger_sku_component } from '../../../../common/util/tencentBi/report'
let app = getApp();
Component({
  properties: {
    recommendInfo: {
      type: Object,
      value: null
    },
    recommendSkuList: {
      type: Array,
      value: []
    },
    imgLazyLoad: {
      type: Object,
      value: {}
    },
    traceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
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
    }
  },
  data: {
    latitude: app.globalData.addressInfo.latitude,
    longitude: app.globalData.addressInfo.longitude
  },
  methods: {
    // 去商品详情
    goToDetail(e) {
      let item = e.currentTarget.dataset.item;
      let { to, params, userActionSku } = e.currentTarget.dataset.item;
      let { buriedObj, traceId } = this.data;
      djCmsJump({
        to,
        params,
        userAction: userActionSku,
        traceId: traceId,
        preObj: buriedObj,
        buried_postion: "searchAbout-recommendGood"
      });
      trigger_sku_component(item || {})
      // TODO
      // clickBuriedV2_({
      //   click_id: "click_related_product",
      //   click_par: {
      //     storeId: item.storeId || "",
      //     skuId: item.skuId || "",
      //     state: item.state || ""
      //   },
      //   currentPageName: this.data.currentPageName,
      //   prePageName: this.data.prePageName,
      //   pageId: this.data.pageId
      // });
    },
    noticeParent(type, data) {
      this.triggerEvent('listenCountChange', {
        params: {
          type: type,
          data: data
        }
      })
    },
  }
});
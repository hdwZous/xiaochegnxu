import { djCmsJump } from "../../../../../common/util/agreementV2";
import { trigger_sku_component } from "../../../../../common/util/tencentBi/report";
import { clickBuriedV2_ } from "../../../../../common/util/BI";
Component({
  lazyObj: {
    epSelector: ".ep_product-goods"
  },
  options: {
    addGlobalClass: true
  },
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (val) {
        if (!val || !val.userActionSku) {
          clickBuriedV2_({
            click_id: "test_product_user_empty_0804",
            click_par: val
          });
        }
      }
    },
    itemIndex: {
      type: String,
      value: ""
    },
    traceId: {
      type: String,
      value: ""
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    options: {
      type: Object,
      value: {}
    },
    tabName: {
      type: String,
      value: ""
    },
    catId: {
      type: Number || String,
      value: 0
    }
  },
  data: {
    NeedExposure: true
  },
  methods: {
    // 点击商品
    goToDetail (e) {
      let item = e.currentTarget.dataset.item || {};
      djCmsJump({
        to: "productDetail",
        params: {
          orgCode: item.orgCode || "",
          storeId: item.storeId || "",
          skuId: item.skuId || "",
          spuId: item.spuId,
          userAction: item.userActionSku || ""
        },
        userAction: item.userActionSku || "",
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: "oneInRow",
          options: this.data.options
        }
      });
      trigger_sku_component(item || {});

      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "click_goods",
        click_par: {
          skuId: item.skuId || "",
          spuId: item.spuId || "",
          storeId: item.storeId || "",
          orgCode: item.orgCode || "",
          traceId: this.data.traceId || ""
        },
        pageId: pageIdFirstPage || "",
        currentPageName,
        prePageName
      });
    }
  }
});

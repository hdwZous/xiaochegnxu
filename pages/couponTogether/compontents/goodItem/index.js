import { djCmsJump } from "../../../../common/util/agreementV2.js";
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val) {
          // 手动上报曝光
          this.epSection && this.epSection()
        }
      }
    },
    traceId: {
      type: String,
      value: "",
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {}
    }
  },
  lazyObj: {
    selector: ".lazy-load-wrap",
    epSelector: ".ep_good-item",
  },
  data: {
    NeedExposure: true
  },
  methods: {
    // 去商品详情
    goToDetail(e) {
      let item = e.currentTarget.dataset.item || {};
      djCmsJump({
        to: "productDetail",
        params: {
          orgCode: item.orgCode || "",
          storeId: item.storeId || "",
          skuId: item.skuId || "",
          spuId: item.spuId,
        },
        userAction: item.userAction || "",
        traceId: this.data.traceId || "",
        preObj: this.data.recommendObj,
        buried_position: {
          key: "couponTogether-goodItem",
          options: this.data.options
        }
      });
    },
  },
});

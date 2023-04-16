import { djCmsJump } from "../../../../../common/util/agreementV2.js";
import { clickBuriedV2_ } from "../../../../../common/util/BI.js";
Component({
  lazyObj: {
    epSelector: ".ep_good-item",
  },
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val) {
          // 手动上报曝光
          this.epSection && this.epSection();
        }
      },
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
      value: {},
    },
    storeId: {
      type: String,
      value: ""
    },
  },
  data: {
    NeedExposure: true,
  },
  methods: {
    // 去商品详情
    goToDetail(e) {
      let { to, params, userAction } = e.currentTarget.dataset.item;
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.goodTraceId || "",
        preObj: this.data.recommendObj,
        buried_position: {
          key: "couponGo-goodItem-goToDetail",
          options: this.data.options,
        },
      });
    },
  },
});

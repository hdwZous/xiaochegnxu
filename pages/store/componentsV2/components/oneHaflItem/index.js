
import { djCmsJump } from "../../../../../common/util/agreementV2";
Component({
  lazyObj: {
    selector: ".lazy-load-wrap",
    epSelector: ".ep_one-half-item",
    needExposure: true,
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: {
      type: Object,
      value: {},
    },
    traceId: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
    fromPosition: {
      type: String,
      value: "",
    },
    tabName: {
      type: String,
      value: "",
    },
  },
  data: {
    NeedExposure: true,
  },
  methods: {
    // 点击商品
    goToDetail(e) {
      let item = e.currentTarget.dataset.item;
      djCmsJump({
        to: item.to,
        params: item.params || {},
        userAction: item.userAction || "",
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: `oneHalfItem-${this.data.fromPosition || ""}`,
          options: this.data.options,
        },
      });
    },
  },
});

import { djCmsJump } from "../../../../../common/util/agreementV2";
Component({
  lazyObj: {
    epSelector: ".ep_one-item",
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: {
      type: Object,
      value: {},
    },
    itemIndex: {
      type: String,
      value: "",
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
          key: `oneItem-${this.data.fromPosition || ""}`,
          options: this.data.options,
        },
      });
    },
  },
});
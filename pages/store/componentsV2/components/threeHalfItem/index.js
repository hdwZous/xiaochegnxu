import { djCmsJump } from "../../../../../common/util/agreementV2";
Component({
  lazyObj: {
    selector: ".lazy-load-wrap",
    epSelector: ".ep_three-half-item",
    needExposure: true,
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
    showCart: {
      type: Boolean,
      value: false,
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
  options: {
    addGlobalClass: true,
  },
  data: {
    NeedExposure: true,
  },
  methods: {
    jumpDetail(e) {
      let { item = {} } = e.currentTarget.dataset || {};
      djCmsJump({
        to: item.to,
        params: item.params || {},
        userAction: item.userAction || "",
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: `threeHalfItem-${this.data.fromPosition}`,
          options: this.data.options,
        },
      });
    },
  },
});

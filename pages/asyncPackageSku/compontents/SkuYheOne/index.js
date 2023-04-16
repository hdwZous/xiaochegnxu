import { djCmsJump } from "../../../../common/util/agreementV2.js";
Component({
  lazyObj: {
    selector: ".lazy-load-wrap",
    epSelector: ".ep_choose-for-you",
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
    jumpDetail(e) {
      let { to, params, userAction } = e.currentTarget.dataset.item;
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
      });
    },
  },
});

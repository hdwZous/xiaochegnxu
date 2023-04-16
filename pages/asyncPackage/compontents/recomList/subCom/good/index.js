import { djCmsJump } from "../../../../../../common/util/agreementV2";
Component({
  lazyObj: {
    epSelector: ".ep_recom-list",
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
    length: {
      type: Number,
      value: 0,
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    NeedExposure: {
      type: Boolean,
      value: false,
    },
    fromPisition: {
      type: String,
      value: "",
    },
    optionsPos: {
      type: Object,
      value: {},
    },
    tabName: {
      type: String,
      value: "",
    },
  },
  data: {},
  methods: {
    jump(e) {
      let { to, params, userAction } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to,
        params,
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: this.data.fromPisition || "没有",
          options: this.data.optionsPos,
        },
      });
    },
    // 获取加车信息
    addMinControllerChange(e) {
      console.log(e.detail);
    },
  },
});

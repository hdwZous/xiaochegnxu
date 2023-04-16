
import { djCmsJump } from "../../../../../../common/util/agreementV2";
Component({
  lazyObj: {
    epSelector: ".ep_suit-good",
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    pro: {
      type: Object,
      value: {},
    },
    traceId: {
      type: String,
      value: "",
    },
    curIndex: {
      type: Number,
      value: 0,
      observer: function (newV, oldV) {
        // 切换tab要重新曝光当前tab下的商品
        if (newV != oldV) {
          this.epSection && this.epSection();
        }
      },
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
  },
  methods: {
    // 点击商品
    goDetail(e) {
      let { to, params, userAction } = e.currentTarget.dataset.item;
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: `suit-good`,
          options: this.data.options,
        },
      });
    },
  },
  data: {
    NeedExposure: true,
  },
});
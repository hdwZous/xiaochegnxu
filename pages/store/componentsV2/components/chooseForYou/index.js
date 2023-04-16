import { djCmsJump } from '../../../../../common/util/agreementV2'
import { updateGoodsNum } from "../../../../../common/util/carService";
Component({
  properties: {
    floor: {
      type: Object,
      value: {},
      observer: function (val) {
        this.setData({
          list: val.data || [],
        });
      },
    },
    updateNum: {
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
    tabName: {
      type: String,
      value: ""
    }
  },
  data: {},
  observers: {
    updateNum: function (newval) {
      if (newval) {
        updateGoodsNum(this, this.data.list, newval, "list");
      }
    },
  },
  methods: {
    jumpDetail(e) {
      let { to, params, userAction } = e.currentTarget.dataset.item;
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: "store-chooseForYou-jumpDetail",
          options: this.data.options,
        },
      });
    },
  },
});
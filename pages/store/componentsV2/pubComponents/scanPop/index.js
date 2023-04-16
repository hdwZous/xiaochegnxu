import { updateGoodsNum } from "../../../../../common/util/carService";
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    showScan: {
      type: Boolean,
      value: false,
    },
    scanSkuList: {
      type: Array,
      value: [],
    },
    updateNum: {
      type: Object,
      value: {},
      observer: function (obj) {
        if (obj) {
          updateGoodsNum(this, this.data.scanSkuList, obj, "scanSkuList");
        }
      },
    },
    options: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    triggerScan() {
      this.triggerEvent("toScan", { type: "continue" });
    },
    hidePop() {
      this.triggerEvent("toScan", { type: "hide" });
    },
  },
});

import { updateGoodsNum } from "../../../../../common/util/carService";
Component({
  properties: {
    floor: {
      type: Object,
      value: {},
      observer: function (val) {
        this.setData({
          list: val.data,
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
      value: "",
    },
  },
  data: {
    list: [],
  },
  observers: {
    updateNum: function (newval) {
      if (newval) {
        updateGoodsNum(this, this.data.list, newval, "list");
      }
    },
  },
  methods: {},
});
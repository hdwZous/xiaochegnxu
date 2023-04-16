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
      observer: function (newVal) {
        console.log(newVal);
      },
    },
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

Component({
  properties: {
    afterSale: {
      type: Array,
      value: [],
      observer: function () {
        // console.log("afterSale", val);
      }
    },
  },
  data: {},

  methods: {
    showAfterSale(e) {
      let { title = "", content = "" } =
        e.currentTarget.dataset || {};
      this.triggerEvent("pageEvent", {
        type: "afterSale",
        data: {
          title,
          content
        },
      });
    },
  },
});

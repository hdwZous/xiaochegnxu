Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    dialogInfo: {
      type: Object,
      value: {},
    },
  },
  data: {},

  methods: {
    closeDialog() {
      // this.setData({
      //   isShow: false,
      // });
      this.triggerEvent("pageEvent", {
        type: "hideAfterSale",
      });
    },
  },
});

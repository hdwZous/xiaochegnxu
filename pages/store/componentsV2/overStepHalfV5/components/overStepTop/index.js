
Component({
  properties: {
    // 主文案
    mainTitle: {
      type: String,
      value: "",
    },
    // 副文案
    subtitle: {
      type: String,
      value: "",
    },
    // 地址
    poi: {
      type: String,
      value: "",
    },
    url: {
      type: String,
      value: "",
      // value:
      //   "https://storage.360buyimg.com/wximg/common/errorbar_icon_noclosedV1.png",
    },
    isLogin: {
      type: Boolean,
      value: false
    }
  },
  data: {
  },
  methods: {
    hidePop() {
      this.triggerEvent("popEvent", {
        type: "hidePop",
      });
    },
    handelAddress() {
      this.triggerEvent("popEvent", {
        type: "handelAddress",
      });
    },
  },
});

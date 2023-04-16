
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          wx.setStorageSync("storeEducation", Date.now())
        }
      }
    },
    // 当前门店类型2：到店，其他：到家
    type: {
      type: Number,
      value: 0,
      observer: function (val) {
        let imgUrl =
          "https://storage.360buyimg.com/wximg/common/toDdStore1.png";
        if (val == 2) {
          imgUrl = "https://storage.360buyimg.com/wximg/common/toDjStore1.png"
        }
        this.setData({
          imgUrl: imgUrl,
          top: this.data.navHeight + 24
        })
      },
    },
    navHeight: {
      type: Number,
      value: 0
    },
  },
  data: {
    imgUrl: "",
    top: 0,
  },
  methods: {
    // 关闭弹层
    hidePop() {
      this.triggerEvent("pageEvent", {
        type: "closeEducationPop",
      });
    },
  },
});

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //跑马灯图片
    winList: {
      type: Array,
      observer() {
        // 执行数据更新

      }
    },
    backgroundColor: {
      type: String,
      value: "rgba(228, 225, 225, 0.5)"
    },
    fontColor: {
      type: String,
      value: "#FFFFFF"
    },
    locationId: {
      type: String,
      value: "",
      observer(newVal) {
        let top = "40rpx"
        if (newVal === "lotteryList") {
          top = "20rpx";
        }
        this.setData({
          top: top,
        });
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    top: "40rpx"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onload: function () {

    }
  }
});
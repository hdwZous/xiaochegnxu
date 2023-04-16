
import { djCmsJump } from "../../../../../common/util/agreementV2.js";
Component({
  properties: {
    capsule: {
      type: Object,
      value: {},
    },
    opacity: {
      type: Number,
      value: 0,
    },
    pageName: {
      type:String,
      value: ''
    },
    color: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  data: {
    compatible: false,
    statusBarHeight: 0,
    isShow: false,
    showBack: false,
    showHome: false,
  },
  attached() {
    let sysInfo = wx.getSystemInfoSync() || {};
    let { version, statusBarHeight = 0 } = sysInfo;
    let compatible = this.isCompatible(version, "7.0.0");
    //显示返回还是home
    this.showHomeOrBack();
    //不兼容时
    if (compatible < 0) {
      this.setData({
        compatible: false,
      });
      return;
    }
    //兼容
    this.setData({
      compatible: true,
      statusBarHeight,
    });
  },
  methods: {
    showHomeOrBack() {
      let pages = getCurrentPages();
      if (pages.length === 1) {
        this.setData({
          showHome: true,
        });
      } else if (pages.length > 1) {
        this.setData({
          showBack: true,
        });
      }
    },
    /**
     * 判断是否兼容，微信7.0.0+才支持页面自定义标题
     * @param version
     * @returns {boolean}
     */
    isCompatible(v1, v2) {
      v1 = v1.split(".");
      v2 = v2.split(".");
      const len = Math.max(v1.length, v2.length);
      while (v1.length < len) {
        v1.push("0");
      }
      while (v2.length < len) {
        v2.push("0");
      }
      for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i]);
        const num2 = parseInt(v2[i]);
        if (num1 > num2) {
          return 1;
        } else if (num1 < num2) {
          return -1;
        }
      }
      return 0;
    },
    goBack() {
      wx.navigateBack({});
    },
    goHome() {
      let {recommendObj = {}} = this.data;
      djCmsJump({
        to: "home",
        params: {},
        preObj: recommendObj,
        buried_postion: "order-paySuccess-navigation"
      });
    },
  },
});

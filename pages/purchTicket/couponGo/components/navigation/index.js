import {
  djCmsJump
} from '../../../../../common/util/agreementV2.js'
import util from '../../../../../common/util/util.js'
import { clickBuriedV2_ } from "../../../../../common/util/BI.js";
Component({
  properties: {
    capsule: {
      type: Object,
      value: {},
    },
    // 0/1展示搜索框样式，其他展示 京东到家
    word: {
      type: String,
      value: null,
      observer: function (val) {
        this.setData({
          keyword: val || "",
        });
      },
    },
    busiCode: {
      type: String,
      value: "",
    },
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    markState: {
      type: Number,
      value: null,
    },
    skuIds: {
      type: Array,
      value: [],
    },
    activityCode: {
      type: String,
      value: "",
    },
    from: {
      type: String,
      value: "",
    },
    couponId: {
      type: String,
      value: "",
    },
    refPageSource: {
      type: String,
      value: "",
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
  },
  data: {
    compatible: false,
    showBack: false,
    showHome: false,
    statusBarHeight: 0,
    titleBarHeight: 46,
    keyword: "", // 搜索关键字
    showMask: false, // 是否展示蒙层
  },
  pageLifetimes: {
    show: function () {
      //  this.setData({
      //    keyword: ''
      //  })
    },
  },
  lifetimes: {
    attached() {
      let sysInfo = wx.getSystemInfoSync() || {};
      let compatible = util.isCompatible();
      this.setData({
        compatible: compatible < 0 ? false : true, //是否兼容
        statusBarHeight: sysInfo.statusBarHeight || 0,
      });
      //显示返回还是home
      this.showHomeOrBack();
    },
  },
  methods: {
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
    goBack() {
      wx.navigateBack({
        delta: 1,
        preObj: this.data.recommendObj,
      });
    },
    goHome() {
      wx.switchTab({
        url: "/pages/home/home",
        preObj: this.data.recommendObj,
      });
    },
    // 点击搜索，展示蒙层
    clickInput() {
      this.setData({
        showMask: true,
      });
      try {
        if (this.data.from == 'self') {
          this.maidian(
            "ClickNewCouponSearch",
            this.data.keyword,
            this.data.storeId,
            "default"
          );
          
        } else {
          this.maidian("ClickSearchBar");
        }
        
      } catch (error) {}
    },
    // 隐藏蒙层
    hideMask() {
      this.setData({
        showMask: false,
      });
    },
    bindKeyInput(e) {
      this.setData({
        keyword: e.detail.value || "",
      });
    },
    bindConfirm() {
      if (!this.data.keyword) {
        wx.showToast({
          title: "请输入搜索词",
          icon: "none",
          duration: 2000,
        });
        return;
      }
      let {
        storeId,
        orgCode,
        markState,
        skuIds,
        keyword,
        activityCode,
        couponId,
      } = this.data;
      this.hideMask();
      if (this.data.from == "self") {
        wx.redirectTo({
          url: `/pages/purchTicket/couponGo/index?storeId=${
            storeId || ""
          }&orgCode=${orgCode || ""}&markState=${markState}&skuIds=${
            skuIds || []
          }&keyword=${keyword || ""}&code=${
            activityCode || ""
          }&from=self&couponId=${couponId}&refPageSource=${
            this.data.refPageSource || ""
          }`,
          preObj: this.data.recommendObj,
          buried_position: {
            key: "couponGo-navigation-bindConfirm1",
            options: this.data.options,
          },
        });
      } else {
        djCmsJump({
          to: "couponGoodsList",
          params: {
            storeId: storeId || "",
            orgCode: orgCode || "",
            markState: markState || "",
            skuIds: skuIds || [],
            keyword: keyword || "",
            code: activityCode,
            couponId: couponId,
            from: "self",
            refPageSource: this.data.refPageSource || "",
          },
          preObj: this.data.recommendObj,
          buried_position: {
            key: "couponGo-navigation-bindConfirm2",
            options: this.data.options,
          },
        });
      }
      let timer = setTimeout(() => {
        clearTimeout(timer);
        this.setData({
          keyword: "",
        });
      }, 500);
    },
    maidian(clickId, keyword, storeId, type) {
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: clickId,
        click_par: {
          keyword,
          storeId,
          type,
        },
        currentPageName,
        prePageName,
        pageId: pageIdFirstPage,
      });
    }
  },
});
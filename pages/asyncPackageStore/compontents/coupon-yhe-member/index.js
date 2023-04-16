// 优惠券一行一
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  lazyObj: {
    selector: ".lazy-load-wrap",
    epSelector: ".ep_yhe_member_coupon",
    needExposure: true,
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    // 券
    item: {
      type: Object,
      value: {},
      observer: function (obj) {
        if (obj.couponId) {
          obj.flag = true;
          if (obj.styles) {
            let styles = obj.styles;
            let {
              couponBgColor,
              couponBgEndColor,
              couponBgBorderColor,
              couponBgIShadowColor,
              couponBgIShadowOpacity,
              couponBgOShadowColor,
              couponBgOShadowOpacity,
              couponBgMDottedLine,
            } = styles.couponBgStyle || {};
            let {
              priceColor,
              couponTitleColor,
              couponLimitColor,
              couponExpireColor,
            } = styles.couponContentStyle || {};
            // 券背景
            obj.couponBgColor = couponBgColor
              ? couponBgColor
              : obj.couponBgColor;
            obj.couponBgEndColor = couponBgEndColor
              ? couponBgEndColor
              : obj.couponBgEndColor;
            // 券边框
            obj.couponBgBorderColor = couponBgBorderColor
              ? couponBgBorderColor
              : obj.couponBgBorderColor;
            // 券-内阴影
            obj.couponBgIShadowColor = couponBgIShadowColor
              ? couponBgIShadowColor
              : obj.couponBgIShadowColor;
            obj.couponBgIShadowOpacity = couponBgIShadowOpacity
              ? couponBgIShadowOpacity
              : obj.couponBgIShadowOpacity;
            // 券-外阴影
            obj.couponBgOShadowColor = couponBgOShadowColor
              ? couponBgOShadowColor
              : obj.couponBgOShadowColor;
            obj.couponBgOShadowOpacity = couponBgOShadowOpacity
              ? couponBgOShadowOpacity
              : obj.couponBgOShadowOpacity;
            // 券中线色值
            obj.couponBgMDottedLine = couponBgMDottedLine
              ? couponBgMDottedLine
              : obj.couponBgMDottedLine;
            // 券内容
            obj.priceColor = priceColor ? priceColor : obj.priceColor;
            obj.couponTitleColor = couponTitleColor
              ? couponTitleColor
              : obj.couponTitleColor;
            obj.couponLimitColor = couponLimitColor
              ? couponLimitColor
              : obj.couponLimitColor;
            obj.couponExpireColor = couponExpireColor
              ? couponExpireColor
              : obj.couponExpireColor;
            //券按钮
            if (obj.styles.couponButStyle) {
              obj.couponButton = styles.couponButStyle;
            }
            // 券标签
            if (obj.styles.couponLabelStyle) {
              obj.couponSigns = styles.couponLabelStyle;
            }
            // 左脚标
            if (obj.styles.leftTopIconList) {
              obj.leftTopIconList = styles.leftTopIconList;
            }
          }
          this.setData({
            couponItem: obj,
          });
        }
      },
    },
    traceId: {
      type: String,
      value: "",
    },
    pageId: {
      type: String,
      value: "",
    },
    currentPageName: {
      type: String,
      value: "",
    },
    prePageName: {
      type: String,
      value: "",
    },
    NeedExposure: {
      type: Boolean,
      value: false,
    },
    options: {
      type: Object,
      value: {},
    },
  },
  data: {
    couponItem: {},
  },
  methods: {
    clickCoupon(e) {
      let data = e.currentTarget.dataset && e.currentTarget.dataset.item;
      this.triggerEvent("rightBtnClick", {
        data: data,
      });
      let { pageId, prePageName, currentPageName } = this.data || {};
      clickBuriedV2_({
        click_id: "click_coupon",
        click_par: {
          activityCode: data.activityCode,
          couponId: data.couponId,
          type: "window",
          couponType: data.couponType,
          actType: data.couponButton.title || "",
          userAction: data.userAction,
          traceId: this.data.traceId || "",
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId,
      });
    },
  },
});
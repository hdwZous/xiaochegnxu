// 优惠券一行一
import { clickBuriedV2_ } from "../../../../common/util/BI.js";
import { request, FNIDS } from '../../../../common/util/api';
Component({
  lazyObj: {
    selector: ".lazy-load-wrap",
    epSelector: ".ep_yhy_one_coupon",
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
          let { couponLeftIcon = null } = styles.couponLconStyle || {};
          // 券背景
          obj.couponBgColor = couponBgColor ? couponBgColor : obj.couponBgColor;
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
          // 券不可用原因
          obj.couponLeftIcon = couponLeftIcon
            ? couponLeftIcon
            : obj.couponLeftIcon;
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
        if (this.data.fromWhere == "couponMore") {
          this.epSection && this.epSection();
        }
      },
    },
    traceId: {
      type: String,
      value: "",
    },
    fromWhere: {
      type: String,
      value: "",
    },
    belongCamp: {
      type: String,
      value: "",
    },
    unique: {
      type: String,
      value: "",
    },
    orderPageId: {
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
    pageId: {
      type: String,
      value: "",
    },
    noNeedExposure: {
      type: Boolean,
      value: false,
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    isFirst: {
      //是否竖向滚动,在sroll-view页面使用fixed定位，不能全部显示，得拿到scroll-view页面外
      type: Boolean,
      value: false,
    },
    bgType: {
      type: String || Number,
      value: ''
    },
    orderPageId: {
      type: String,
      value: "",
    }
  },
  data: {
    couponItem: {},
    showTips: false,
    left: 0,
    bottom: 0,
    a: 0,
  },
  methods: {
    clickCoupon(e) {
      let data = e.currentTarget.dataset && e.currentTarget.dataset.item;
      data.position = "coupon-yhy-one";
      this.triggerEvent("rightBtnClick", {
        data: data,
      });
      clickBuriedV2_({
        click_id: "click_coupon",
        click_par: {
          activityCode: data.activityCode,
          couponId: data.couponId,
          couponType: data.couponType,
          actType: (data.couponButton && data.couponButton.title) || "",
          userAction: data.userAction,
        },
      });
    },
    // 左边icon点击
    handleLeftIconClick() {
      let window = wx.getSystemInfoSync();
      let bottom = 0;
      let left = 0;
      let top = 0;
      let _this = this;
      let query = wx.createSelectorQuery().in(this);
      query
        .select(".cp-yhy-wrap")
        .boundingClientRect(function (res) {
          left = res.left;
          top = res.top;
          bottom = window.windowHeight - res.top + 10;
          if (_this.data.couponItem.use == "UNAVAILABLE") {
            if (!_this.data.isFirst) {
              _this.setData({
                showTips: !_this.data.showTips,
                left,
                bottom,
              });
            } else {
              _this.setData({
                showTips: !_this.data.showTips,
                left,
                top: top + 20
              });
            }
            clickBuriedV2_({
              click_id: "clickExplainIcon",
              click_par: {
                iconName: '优惠券不可用',
                orderPageId: _this.data.orderPageId,
                couponId: _this.data.couponItem.couponCode,
                businessType: _this.data.bgType,
              },
              pageId: _this.data.buriedObj.pageIdFirstPage,
              currentPageName: _this.data.buriedObj.currentPageName,
              prePageName: _this.data.buriedObj.prePageName
            });
          }
        })
        .exec();
      if (
        !this.data.couponItem.unusableReason &&
        this.data.unique &&
        this.data.couponItem.use == "UNAVAILABLE" &&
        this.data.bgType != '2'
      ) {
        let { functionId = "", appVersion = "" } =
          FNIDS.queryCouponUnusableReason;
        request({
          method: "POST",
          functionId,
          appVersion,
          body: {
            unique: this.data.unique || "",
            orderPageId: this.data.orderPageId,
            type: "redPacket",
            fromSource: 5,
            couponCode: this.data.couponItem.couponCode,
          },
          preObj: this.data.buriedObj || {},
        }).then((res) => {
          if (res && res.data && res.data.result) {
            let unusableReason = res.data.result.unusableReason;
            this.setData({
              "couponItem.unusableReason": unusableReason,
            });
          }
        });
      }
    },
    handleMaskClick() {
      this.setData({
        showTips: false,
      });
    },
    handleCheck(e) {
      let { infos = null } = e.currentTarget.dataset;
      if (infos && infos.selectedState != 30) {
        this.triggerEvent("handleCheck", {
          infos,
          belongCamp: this.data.belongCamp,
        });
      }
    },
  },
});
import { clickBuriedV2_ } from "../../../../../common/util/BI";
import { request, FNIDS } from "../../../../../common/util/api";
import mp from "../../../../../common/util/wxapi.js";
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    buriedObj: {
      type: Object,
      value: {},
    },
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    popupPosition: {
      type: String,
      value: "",
      observer: function (val) {
        if (val == "storeFirstLoad") {
          this.setData({
            showPop: true,
            originCoupon: this.data.popupData.originCoupon,
            targetCoupon: this.data.popupData.targetCoupon,
            couponButton: this.data.popupData.couponButton,
          });
        } else if (val == "couponHalfV6") {
          this.fetchPop();
        }
      },
    },
    // 膨胀券弹层数据
    popupData: {
      type: Object,
      value: {},
    },
    // 门店logo
    logoUrl: {
      type: String,
      value: "",
    },
    // 膨胀弹层接口需要的部分入参
    popup4Params: {
      type: Object,
      value: {},
    },
  },
  observers: {
    showPop: function (val) {
      if (val) {
        let { storeId, targetCoupon = {}, originCoupon = {} } = this.data;
        this.maidian("showLayer", {
          inflateCode: targetCoupon.inflateCode || "",
          storeId: storeId || "",
          couponId: originCoupon.couponId || "",
        });
      }
    },
  },
  data: {
    showPop: false,
    originCoupon: {},
    targetCoupon: {},
    couponButton: {},
  },
  methods: {
    // 请求膨胀弹层信息
    fetchPop() {
      // 膨胀系统的膨胀弹层接口
      let { storeId, orgCode, logoUrl, popup4Params = {} } = this.data || {};
      request({
        ...FNIDS.inflateExpand,
        isNeedDealError: true,
        body: {
          storeId: storeId || "",
          orgCode: orgCode || "",
          inflateCode: popup4Params.inflateCode || "",
          consumerCode: popup4Params.consumerCode || "",
          logoUrl: logoUrl || "",
        },
        method: "POST",
        pageId:
          (this.data.buriedObj && this.data.buriedObj.pageIdFirstPage) || "",
        preObj: this.data.buriedObj || {},
      })
        .then((res) => {
          let { code, result } = res.data || {};
          if (code == 0 && result) {
            this.setData({
              showPop: true,
              originCoupon: result.originCoupon,
              targetCoupon: result.targetCoupon,
              couponButton: result.couponButton,
            });
          } else {
            this.setData({
              showPop: false,
              popupPosition: "",
            });
          }
        })
        .catch((err) => {
          this.setData({
            showPop: false,
            popupPosition: "",
          });
        });
    },
    close() {
      this.setData({
        showPop: false,
        popupPosition: "",
      });
      let { storeId, targetCoupon = {}, originCoupon = {} } = this.data;
      this.maidian("clickClose", {
        inflateCode: targetCoupon.inflateCode || "",
        storeId: storeId || "",
        couponId: originCoupon.couponId || "",
      });
    },
    goExpand() {
      let { functionId = "", appVersion = "" } = FNIDS.inflateRightNow;
      let { storeId, orgCode, originCoupon, targetCoupon, couponButton } =
        this.data;
      request({
        functionId,
        appVersion,
        isNeedDealError: true,
        body: {
          inflateCode: targetCoupon.inflateCode || "",
          consumerCode: originCoupon.consumerCode || "",
          storeId: storeId || "",
          orgCode: orgCode || "",
          channelCode: "store-page-20220630",
        },
        method: "POST",
        pageId:
          (this.data.buriedObj && this.data.buriedObj.pageIdFirstPage) || "",
        preObj: this.data.buriedObj || {},
      })
        .then((res) => {
          res.data1 = {
            code: "0",
            msg: "膨胀成功",
            result: {
              inflateCode: "",
              consumerCode: "",
              couponId: "",
            },
            traceId: "H5_DEV_2910FFED-E8DA-4242-A7F3-F7E054B8DA691568194699569",
            umpTraceId: "677336.48188.16564048562767127",
            errorCode: "[1032,1082]",
            success: true,
          };
          let { code, result } = res.data || {};
          if (code == 0 && result) {
            this.close();
            this.setData({
              title: "膨胀成功",
            });
            this.triggerEvent("pageEvent", {
              type: "expandNeedFreshStore",
              data: {},
            });
          } else {
            this.close();
            mp.toast({
              title: res.data.msg || "活动异常，请稍后重试",
            });
          }
        })
        .catch(() => {
          this.close();
          mp.toast({
            title: "活动异常，请稍后重试",
          });
        });
      this.maidian("clickLayer", {
        inflateCode: targetCoupon.inflateCode || "",
        storeId: storeId || "",
        couponId: originCoupon.couponId || "",
        btnName: couponButton.title || "",
      });
    },
    maidian(id, par) {
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: id,
        click_par: par,
        prePageName,
        currentPageName,
        pageId: pageIdFirstPage || "",
      });
    }
  },
});

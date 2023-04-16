import { djCmsJump } from '../../../../../common/util/agreementV2'
import { getCoupon } from "../../../../../common/util/services"
import mp from '../../../../../common/util/wxapi'
import { updateGoodsNum } from "../../../../../common/util/carService";
import { trigger_sku_component } from "../../../../../common/util/tencentBi/report";
import { clickBuriedV2_ } from "../../../../../common/util/BI";

Component({
  lazyObj: {
    epSelector: ".ep_newer-pro",
    needExposure: true,
  },
  properties: {
    floor: {
      type: Object,
      value: {},
      observer: function (val) {
        this.setData({
          list: val.data || [],
          couponModelList: val.couponModelList || [],
        });
      },
    },
    updateNum: {
      type: Object,
      value: {},
    },
    orgCode: {
      type: String,
      value: "",
    },
    storeId: {
      type: String,
      value: "",
    },
    traceId: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
    tabName: {
      type: String,
      value: "",
    },
  },

  data: {
    list: [],
    couponModelList: [],
    NeedExposure: true,
  },
  observers: {
    updateNum: function (newval) {
      if (newval) {
        updateGoodsNum(this, this.data.list, newval, "list");
      }
    },
  },
  methods: {
    jumpDetail(e) {
      let { item = {} } = e.currentTarget.dataset || {};
      let { to, params, userAction } = item;
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: "store-newSV2-1",
          options: this.data.options,
        },
      });
      trigger_sku_component(item || {});
    },
    jumpPromoList(e) {
      let { to, params, userAction } = e.currentTarget.dataset;
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: "store-newSV2-2",
          options: this.data.options,
        },
      });
    },
    // 点击优惠券
    onClickCoupon(e) {
      let {
        activityCode,
        markState,
        platNewActivityFlag,
        userAction = "",
        couponId,
        couponType,
        couponButton = {},
      } = e.detail.data;

      if (markState == 2) {
        // 未领取
        this.getCoupon(activityCode, platNewActivityFlag);
      } else if (markState == 3) {
        // 未使用
        // this.getToUse(to, params, userAction)
      }
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "click_coupon",
        click_par: {
          activityCode: activityCode || "",
          couponId: couponId,
          couponType: couponType || "",
          actType: couponButton.title,
          userAction: userAction || "",
          storeId: this.data.storeId || "",
          traceId: this.data.traceId || "",
        },
        pageId: pageIdFirstPage || "",
        currentPageName,
        prePageName,
      });
    },
    // 领取优惠券
    getCoupon(activityCode, platNewActivityFlag) {
      getCoupon({
        channel: "station_home_page",
        source: "homestore",
        code: activityCode || "",
        platNewActivityFlag: platNewActivityFlag,
        orgCode: this.data.orgCode || "",
        storeNo: this.data.storeId || "",
      })
        .then((res) => {
          let { code, msg, result } = res.data;
          if (code == "0" && result) {
            let coupon = (result.responseList && result.responseList[0]) || {};
            this.data.couponModelList.forEach((item, index) => {
              if (item.activityCode === coupon.activityCode) {
                this.setData({
                  [`couponModelList[${index}]`]: coupon,
                });
              }
            });
          } else {
            mp.toast({
              title: msg || "领取失败！",
            });
          }
        })
        .catch(() => {
          mp.toast({
            title: "领取失败！",
          });
        });
    },
    // 使用优惠券
    getToUse(to, params, userAction) {
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: "store-newSV2-3",
          options: this.data.options,
        },
      });
    },
  },
});
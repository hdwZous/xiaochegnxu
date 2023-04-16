import { djCmsJump } from "../../../../../common/util/agreementV2";
import { isLogin } from "../../../../../common/util/loginUtil";
import { request, FNIDS } from "../../../../../common/util/api";
import { getCouponProtocol } from "../../../../../common/util/services";
import { clickBuriedV2_ } from "../../../../../common/util/BI";
Component({
  lazyObj: {
    epSelector: ".wrapper .ep_coupon_floor",
    needExposure: true,
  },
  properties: {
    floor: {
      type: Object,
      value: {},
      observer: function (obj) {
        if (obj.foldSize > 0) {
          this.setData({
            floorData: obj,
            hasShowAll: false,
          });
        }
      },
    },
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
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
  },
  data: {
    floorData: {},
    hasShowAll: false,
    flag: false,
    lastPage: "",
  },
  pageLifetimes: {
    show() {
      if (
        (isLogin() && this.data.flag) ||
        this.data.lastPage == "promotionGoodsList"
      ) {
        this.data.flag = false;
        this.data.lastPage = "";
        this.refreshFloor();
      }
    },
  },
  methods: {
    clickMoreBtn(e) {
      let { to, params, userAction, from, floorTail } = e.currentTarget.dataset;
      if (from == "top") {
        djCmsJump({
          to: to,
          params: params,
          userAction: userAction,
          traceId: this.data.traceId || "",
          preObj: this.data.buriedObj,
          buried_position: {
            key: "store-couponFloor-clickMoreBtn",
            options: this.data.options,
          },
        });
        return;
      }
      if (!this.data.hasShowAll) {
        let { skuList = [] } =
          (this.data.floorData.data && this.data.floorData.data[0]) || {};
        this.setData({
          hasShowAll: true,
        });
        let { pageIdFirstPage, currentPageName, prePageName } =
          this.data.buriedObj || {};
        clickBuriedV2_({
          click_id: "unfoldResCoupon",
          click_par: {
            storeId: (skuList.length && skuList[0].storeId) || "",
            traceId: this.data.traceId || "",
            userAction: floorTail.userAction || "",
          },
          prePageName,
          currentPageName,
          pageId: pageIdFirstPage || "",
        });
      } else {
        djCmsJump({
          to: to,
          params: params,
          userAction: floorTail.userAction,
          traceId: this.data.traceId || "",
          preObj: this.data.buriedObj,
          buried_position: {
            key: "store-couponFloor-clickMoreBtn2",
            options: this.data.options,
          },
        });
      }
    },
    clickItem(e) {
      let item = e.currentTarget.dataset.item;
      if (isLogin()) {
        this.jumpCoupon(item);
      } else {
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.buriedObj,
          buried_position: {
            key: "store-couponFloor-clickCoupon",
            options: this.data.options,
          },
        });
      }
    },
    clickCoupon(e) {
      if (isLogin()) {
        let item = e.currentTarget.dataset.item;
        let { pageIdFirstPage, currentPageName, prePageName } =
          this.data.buriedObj || {};
        clickBuriedV2_({
          click_id: "click_coupon",
          click_par: {
            userAction: item.userAction,
            storeId: this.data.storeId || "",
            activityCode: item.activityCode || "",
            couponId: item.couponId || "",
            couponType: item.couponType || "",
            actType: "去使用",
            traceId: this.data.traceId || "",
          },
          prePageName,
          currentPageName,
          pageId: pageIdFirstPage || "",
        });
        this.jumpCoupon(item);
      } else {
        this.data.flag = true;
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.buriedObj,
          buried_position: {
            key: "store-couponFloor-clickCoupon",
            options: this.data.options,
          },
        });
      }
    },
    refreshFloor() {
      request({
        ...FNIDS.refreshCouponFloor,
        isForbiddenDialog: true,
        isNeedDealError: true,
        body: {
          orgCode: this.data.orgCode,
          storeId: this.data.storeId,
        },
        pageId:
          (this.data.buriedObj && this.data.buriedObj.pageIdFirstPage) || "",
        preObj: this.data.buriedObj || {},
      })
        .then((res) => {
          let { code, result } = res.data || {};
          if (code == 0 && result) {
            this.setData({
              floorData: result,
            });
          }
        })
        .catch(() => {
          // console.log(err);
        });
    },
    jumpCoupon(item) {
      getCouponProtocol({
        storeId: this.data.storeId || "",
        orgCode: this.data.orgCode || "",
        activityCode: item.activityCode || "",
        markState: item.markState || 2,
        refPageSource: "store",
        skuId: item.skuId || "",
        couponGoSource: 0,
        couponId: item.couponId || "",
        couponPattern: "",
        promotionSource: "storePromotion",
      })
        .then((res) => {
          let result = res.data.result || "";
          if (res.data.code == "0" && result) {
            if (result.to == "promotionGoodsList") {
              this.setData({
                lastPage: result.to,
              });
            }
            let params = { userAction: item.userAction };
            params.couponId = item.couponId;
            for (let i in result.params) {
              if (i != "passThroughParam") {
                params[i] = result.params[i];
              } else {
                for (let j in result.params.passThroughParam) {
                  if (result.params.passThroughParam[j]) {
                    params[j] = result.params.passThroughParam[j];
                  }
                }
              }
            }
            djCmsJump({
              to: result.to,
              params: params,
              userAction: item.userAction,
              traceId: this.data.traceId || "",
              preObj: this.data.buriedObj,
              buried_position: {
                key: "store-couponFloor-jumpCoupon",
                options: this.data.options,
              },
            });
          } else {
            wx.showToast({
              title: (res.data && res.data.msg) || "网络繁忙，请稍后重试",
              icon: "none",
            });
          }
        })
        .catch(() => {
          wx.showToast({
            title: "网络繁忙，请稍后重试",
            icon: "none",
          });
        });
    },
  },
});

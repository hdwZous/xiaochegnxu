import { djCmsJump } from "../../../../common/util/agreementV2";
import { pvBuriedV2_, clickBuriedV2_ } from "../../../../common/util/BI";
import util from "../../../../common/util/util";
import emitter from "../../../../common/util/events";
import djBus from "../../../../common/util/djBus"; 
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    storeCouponPop: {
      type: Object,
      value: {},
      observer: function (obj) {
        if (obj.couponFloorList && obj.couponFloorList.length) {
          this.setData({
            couponFloorList: obj.couponFloorList,
          });
        }
      },
    },
    showPop: {
      type: Boolean,
      value: false,
      observer(newVal) {
        if (newVal) {
          setTimeout(() => {
            this.setData({
              showCeilMoreBtn: true,
            });
          }, 500);
          djBus.once("mask_newCouponLayer", (data) => {
            let pageId = util.getPageIdrandom();
            this.setData(
              {
                pageName: "newCouponLayer",
                prePageName: data.currentPageName,
                pageId: pageId,
                recommendObj: {
                  prePageName: data.currentPageName,
                  currentPageName: "newCouponLayer",
                  pageSource: data.pageSource,
                  refPageSource: data.refPageSource,
                  pageIdFirstPage: pageId,
                },
              },
              () => {
                this.triggerEvent("getPopRecommendObj", {
                  data: this.data.recommendObj,
                  popName: "newCouponLayer",
                });
                this.pvFunc();
                const pageList = getCurrentPages();
                const route =
                  (pageList &&
                    pageList.length &&
                    pageList[pageList.length - 1].route) ||
                  "";
                const prePageId = this.data.buriedObj.pageIdFirstPage || "";
                emitter.emit(
                  "halfMaskFunc_" + route + "_newCouponLayer_" + prePageId,
                  {
                    name: "newCouponLayer",
                    type: "open",
                    selector: "#store >>> #newCouponLayer", // 用于页面找打半弹层
                    buriedObj: this.data.recommendObj,
                  }
                );
              }
            );
          });
        } else {
          this.setData({
            toTop: "",
          });
          setTimeout(() => {
            this.setData({
              showCeilMoreBtn: false,
            });
          }, 500);
          const pageList = getCurrentPages();
          const route =
            (pageList &&
              pageList.length &&
              pageList[pageList.length - 1].route) ||
            "";
          const prePageId =
            (this.data.buriedObj && this.data.buriedObj.pageIdFirstPage) || "";
          emitter.emit(
            "halfMaskFunc_" + route + "_newCouponLayer_" + prePageId,
            {
              name: "newCouponLayer",
              type: "close",
              selector: "#store >>> #newCouponLayer", // 用于页面找打半弹层
              buriedObj: this.data.recommendObj,
            }
          );
        }
      },
    },
    isFollow: {
      type: Boolean,
      value: false,
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
    // 门店优惠券弹层实验结果
    storeCouponPopAb: {
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
    // 门店类型
    storeBusinessType: {
      type: Number,
      value: 1
    },
  },
  data: {
    couponFloorList: [],
    freshFlag: false,
    showBusMemberPop: false,
    popInfo: {},
    needSyncCoupon: {},
    isIpx: getApp().globalData.isIpx,
  },
  lifetimes: {},
  pageLifetimes: {
    show() {},
  },
  methods: {
    jumpPage(e) {
      let {
        to = "",
        params = {},
        userAction = "",
      } = e.currentTarget.dataset || {};
      params.isFollow = this.data.isFollow ? 1 : 0 || 0;
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.recommendObj,
        buried_position: {
          key: `store-couponListHalfV6`,
          options: this.data.options,
        },
      });
      this.maidian({
        storeId: this.data.storeId,
        userAction: userAction,
      });
    },
    // 关闭弹层
    hidePop() {
      // this.setData({
      //   showPop: false,
      // });
      this.triggerEvent("pageEvent", {
        type: "closeCouonHalf",
      });
      if (this.data.freshFlag) {
        this.data.freshFlag = false;
        this.triggerEvent("pageEvent", {
          type: "asyncFreshStoreCoupon",
        });
      }
    },
    popEvent(e) {
      let { type, data } = e.detail || {};
      // 是否需要异步刷新优惠券接口
      if (type == "updateCoupon") {
        this.data.freshFlag = true;
      }
      // 商家会员券点击弹出商家会员领取弹层
      else if (type == "isShowMemberPop") {
        this.setData({
          showBusMemberPop: data.isShow,
          popInfo: data.popInfo,
        });
      }
      // 普券是限v+才能领的
      else if (type == "showVipCouponPop") {
        this.setData({
          showVipCouponPop: true,
          popInfo: data,
        });
      }
      // 点击的是膨胀券，需要半弹层通知页面展示膨胀弹层
      else if (type == "showExpandPop") {
        this.triggerEvent("pageEvent", {
          type: "showExpandPop",
          data: data,
        });
      }
      // 遍历整个弹层数据，找到相同的券，同步券状态
      else if (type == "syncCoupon") {
        this.setData({
          needSyncCoupon: data,
        });
      }
    },
    pvFunc(back) {
      let { pageIdFirstPage, prePageName } = this.data.recommendObj || {};
      pvBuriedV2_({
        page_par: {
          storeId: this.data.storeId,
          businessType: this.data.storeBusinessType,
        },
        pageId: pageIdFirstPage,
        prePageName: prePageName || "",
        currentPageName: "newCouponLayer" || "",
        isBack: back || "",
      });
    },
    maidian(params) {
      let { pageIdFirstPage, prePageName } = this.data.recommendObj || {};
      clickBuriedV2_({
        click_par: params,
        pageId: pageIdFirstPage,
        prePageName: prePageName || "",
        currentPageName: "newCouponLayer" || "",
      });
    },
  },
});

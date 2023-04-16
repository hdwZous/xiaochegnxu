/* eslint-disable no-unused-vars*/
/* eslint-disable no-empty */
/* eslint-disable camelcase */
/* eslint-disable  no-undef */


import mp from '../../../../common/util/wxapi'
import { request, FNIDS } from '../../../../common/util/api'
import { clickBuriedV2_ } from "../../../../common/util/BI";
import { djCmsJump } from "../../../../common/util/agreementV2.js";
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties: {
    requestFlag: {
      type: Boolean,
      value: false,
      observer() {
        this.getVipExchangeInfo();
      },
    },
    couponInfo: {
      type: Object,
      value: {},
    },
    grabChannel: {
      type: String,
      value: "",
    },
    orderPageId: {
      type: String,
      value: "",
    },
    buyCouponWithOrderFlag: {
      type: Number,
      value: 0,
    },
    storeId: {
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
    mockVip: {
      type: Boolean,
      value: false,
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    exchangeId: {
      type: String,
      value: "",
    },
    exchangeFlag: {
      type: String,
      value: "",
    },
    redPacketInfo: {
      type: Object,
      value: {},
    },
    v28VoucherList: {
      type: Array,
      value: [],
    },
    pageSource: {
      type: String,
      value: "",
    },
    refPageSource: {
      type: String,
      value: "",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    infos: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 兑换信息
    getVipExchangeInfo() {
      // 获取兑换券信息
      let {
        activityCode = "",
        exchangeId,
        exchangeFlag,
        couponId,
        couponType,
        couponButton = {},
      } = this.data.couponInfo;
      let { functionId, appVersion } = FNIDS.vipChangePopInfo;
      let { selectedVipRedPacketFlag = false } = this.data.redPacketInfo || {};
      let selectedVipCouponFlag = !!(
        this.data.v28VoucherList.findIndex(
          (item) => item.vipCouponFlag == true && item.selectedState == 20
        ) >= 0
      );
      wx.showLoading();
      request({
        functionId,
        isNeedDealError: true,
        method: "POST",
        appVersion,
        body: {
          storeId: this.data.storeId,
          activityCode: activityCode,
          grabChannel: this.data.grabChannel,
          orderPageId: this.data.orderPageId,
          exchangeFlag: exchangeFlag || this.data.exchangeFlag || 3,
          buyCouponWithOrderFlag: true,
          mockVip: this.data.mockVip,
          exchangeId: exchangeId || this.data.exchangeId || "",
          selectedVipCouponFlag,
          selectedVipRedPacketFlag,
          ref: this.data.prePageName,
          ctp: this.data.currentPageName,
          pageSource: this.data.pageSource,
        },
      })
        .then((res) => {
          wx.hideLoading();
          let { code, result = null } = res.data;
          if (code == "0") {
            // 如果是门店页
            this.setData({
              infos: result,
              show: true,
            });
            // 埋点
            clickBuriedV2_({
              click_id: "showLayer",
              click_par: {
                userAction: result.userAction || "",
                type: result.btnText,
              },
              currentPageName: this.data.currentPageName,
              prePageName: this.data.prePageName,
              pageId: this.data.pageId,
            });
          } else {
            mp.toast({
              title: res.data.msg || "获取兑换信息失败",
              duration: 2500,
            });
          }
        })
        .catch((err) => {
          wx.hideLoading();
          mp.toast({
            title: err.data.msg || "获取兑换信息失败",
            duration: 2500,
          });
        });
    },
    // 点击确认兑换
    clickSure() {
      let data = this.data.infos || {};
      if (data.to && data.params) {
        djCmsJump({
          to: data.to,
          params: data.params,
          preObj: this.data.recommendObj || {
            currentPageName: this.data.currentPageName,
            pageIdFirstPage: this.data.pageId,
            pageSource: this.data.pageSource,
            prePageName: this.data.prePageName,
            refPageSource: this.data.refPageSource,
          },
        });
        // 埋点
        clickBuriedV2_({
          click_id: "click_open",
          click_par: {
            userAction: data.userAction || "",
            type: data.btnText,
          },
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId,
        });
        return;
      }
      let consumeCode =
        (data.sourcePackage && data.sourcePackage.activityCode) || "";
      let activityCode =
        (data.targetPackage && data.targetPackage.activityCode) || "";
      let {
        exchangeId = "",
        couponType,
        couponButton = {},
      } = this.data.couponInfo || {};
      request({
        ...FNIDS.changeRedPacketCoupon,
        isNeedDealError: true,
        method: "post",
        body: {
          activityCode: activityCode,
          consumeCode: consumeCode,
          grabChannel: this.data.grabChannel,
          exchangeFlag: data.exchangeFlag || 3,
          orderPageId: this.data.orderPageId,
          buyCouponWithOrderFlag:
            this.data.buyCouponWithOrderFlag == 0 ? false : true,
          serviceVersion: "2",
          exchangeId: exchangeId || this.data.exchangeId || "",
          fromSource: 5,
        },
      })
        .then((res) => {
          let result = res.data.result;
          if (res.data.code == "0") {
            // 如果是门店页
            if (this.data.grabChannel == "station_index_page") {
              // 8.20 兑换成功，要trigger页面调用异步刷新接口，不是trigger之前的vipExchange进行局部更新逻辑
              let triggerName =
                (this.data.couponInfo && this.data.couponInfo.triggerName) ||
                "vipExchange";
              this.triggerEvent("widgetEvent", {
                type: triggerName,
                data: result,
              });
            } else {
              this.triggerEvent("listenExchange", {
                activityCode: result.activityCode || "",
                consumeCode: result.consumeCode || "",
                exchangeFlag: this.data.infos.exchangeFlag,
              });
            }
            this.setData({
              show: false,
            });
            mp.toast({
              title: res.data.msg || "兑换成功",
              duration: 2500,
            });
          } else {
            mp.toast({
              title: res.data.msg || "兑换失败",
              duration: 2500,
            });
          }
        })
        .catch((err) => {
          mp.toast({
            title: err.data.msg || "兑换失败",
            duration: 2500,
          });
        });
      // 埋点
      clickBuriedV2_({
        click_id: "click_open",
        click_par: {
          userAction: this.data.infos.userAction || "",
          type: this.data.infos.btnText,
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId,
      });
    },
    // 放弃优惠
    clickCancel() {
      this.setData({
        show: false,
      });
    },
  },
});

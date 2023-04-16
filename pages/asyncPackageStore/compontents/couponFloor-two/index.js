import {
  djCmsJump,
} from "../../../../common/util/agreementV2.js";
import mp from "../../../../common/util/wxapi";
import { request, FNIDS } from "../../../../common/util/api";
import { clickBuriedV2_ } from "../../../../common/util/BI";
import { addFilterMsg, error } from "../../../../common/util/wxLog";
import util from "../../../../common/util/util";
Component({
  lazyObj: {
    epSelector: ".ep_couponfloor-two .ep_show-more",
    needExposure: true,
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    floor: {
      type: Object,
      value: {},
      observer: function (obj) {
        if (obj.couponList && obj.couponList.length) {
          obj.couponList.forEach((coupon, index) => {
            coupon.flag = true;
            coupon.cpIndex = index;
          });
          this.setData({
            couponList: obj.couponList || [],
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
    showAll: false,
    couponList: [],
  },
  methods: {
    showAll(e) {
      let userAction = e.currentTarget.dataset.userAction || "";
      this.setData({
        showAll: !this.data.showAll,
      });
      let { pageId, currentPageName, prePageName } = this.data || {};
      clickBuriedV2_({
        click_id: "unfoldCoupon",
        click_par: {
          userAction: userAction,
          traceId: this.data.traceId || "",
        },
        pageId,
        currentPageName,
        prePageName,
      });
    },
    rightBtnClick(e) {
      let data = e.detail.data || {};
      if (data.markState != 2) return;
      // 直接领取
      let memberInfo = data.memberCouponItem;
      if (memberInfo.optType == "grabCoupon") {
        this.grabCoupon(memberInfo, data.couponId, data.activityCode);
      } else {
        // 是否展示弹窗
        if (memberInfo.guidePop) {
          let popInfo = {
            couponId: data.couponId,
            activityCode: data.activityCode,
            msg: memberInfo.popUpMsg,
            agreementTitle: memberInfo.memberAgreementTitle,
            agreementUrl: memberInfo.memberAgreementUrl,
            buttonLeft: memberInfo.buttonLeft,
            cancStytle: memberInfo.cancStytle,
            comStytle: memberInfo.comStytle,
            buttonRight: memberInfo.buttonRight,
            title: memberInfo.popUpHint,
            vipType: memberInfo.vipType,
            optType: memberInfo.optType,
            urlSource: memberInfo.urlSource,
          };
          this.triggerEvent("popEvent", {
            type: "isShowMemberPop",
            data: {
              isShow: true,
              popInfo: popInfo,
            },
          });
        } else {
          let { to, params, userAction } = data.memberCouponItem || {};
          // 跳转到会员中心
          params.url =
            params.url + "&userAction=" + encodeURIComponent(userAction) || "";
          djCmsJump({
            to,
            params,
            userAction,
            traceId: this.data.traceId || "",
            preObj: this.data.buriedObj,
            buried_position: {
              key: "store-couponFloor-two-1",
              options: this.data.options,
            },
          });
        }
      }
    },
    // 领取商家券
    grabCoupon(memberInfo, couponId, activityCode) {
      request({
        ...FNIDS.grabBusinessCoupon,
        method: "POST",
        isNeedDealError: true,
        isForbiddenDialog: true,
        body: {
          orgCode: this.data.orgCode || "",
          source: memberInfo.urlSource,
          storeId: this.data.storeId || "",
          couponId: couponId || "",
          activityCode: activityCode || "",
        },
        pageId:
          (this.data.buriedObj && this.data.buriedObj.pageIdFirstPage) || "",
        preObj: this.data.buriedObj || {},
      })
        .then((res) => {
          let { code, result = {}, msg } = res.data || {};
          if (code == 0 && result && result.couponModel) {
            let originCouponList = this.data.couponList;
            originCouponList.forEach((item) => {
              item.couponButton = result.couponModel.couponButton || {};
              item.markState = result.couponModel.markState || 3;
            });
            this.setData({
              couponList: originCouponList,
            });
            this.noticeToFresh();
          } else {
            mp.toast({
              title: msg || "领取失败",
            });
            let deviceid_pdj_jd = util.getUUIDMD5();
            let loginInfo = wx.getStorageSync("login_info");
            let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
            let logParams = {
              storeId: this.data.storeId,
              orgCode: this.data.orgCode,
              source: memberInfo.urlSource,
              activityCode: activityCode,
              position: "yhe-member",
              couponId: couponId,
              pin: getApp().globalData.loginStateInfo.PDJ_H5_PIN,
            };
            addFilterMsg("grabCouponError");
            addFilterMsg("coupon/grabCoupon");
            addFilterMsg(deviceid_pdj_jd);
            addFilterMsg(PDJ_H5_PIN);
            error(JSON.stringify(logParams));
          }
          this.reportCouponError(activityCode, res, couponId);
        })
        .catch(() => {
          mp.toast({
            title: "领取失败",
          });
        });
    },
    // 通知门店优惠券半弹层，后续点击关闭按钮要异步刷新优惠券
    noticeToFresh() {
      this.triggerEvent("popEvent", {
        type: "updateCoupon",
      });
    },
    // 监控领券或者去使用等操作报错信息
    reportCouponError(activityCode, res, couponId) {
      let deviceid_pdj_jd = util.getUUIDMD5();
      let loginInfo = wx.getStorageSync("login_info");
      let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
      clickBuriedV2_({
        click_id: "reportCouponError",
        click_par: {
          pin: PDJ_H5_PIN,
          deviceId: deviceid_pdj_jd,
          position: "couponFloorTwo",
          activityCode: activityCode || "没有",
          couponId: couponId,
          storeNo: this.data.storeId || "没有",
          refPageSource:
            this.data.recommendObj && this.data.recommendObj.refPageSource,
          res: res || "",
        },
      });
    },
  },
});

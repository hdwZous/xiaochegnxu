import {
  djCmsJump,
  mpCmsJump,
} from "../../../../common/util/agreementV2.js";
import util from "../../../../common/util/util";
import {
  getCoupon,
  getCouponProtocol,
} from "../../../../common/util/services";
import mp from "../../../../common/util/wxapi";
import { clickBuriedV2_ } from "../../../../common/util/BI";
import { addFilterMsg, error } from "../../../../common/util/wxLog";
import { syncCoupon } from "../public.js";

Component({
  lazyObj: {
    epSelector: ".ep_couponfloor-one .ep_show-more",
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
    needSyncCoupon: {
      type: Object,
      value: {},
      observer: function (coupon, oldCoupon) {
        if (
          JSON.stringify(coupon) !== "{}" &&
          JSON.stringify(coupon) != JSON.stringify(oldCoupon)
        ) {
          let list = this.data.couponList;
          list.forEach((item, index) => {
            if (item.couponId == coupon.couponId) {
              let newCoupon = syncCoupon(item, coupon);
              this.setData({
                [`couponList[${index}]`]: newCoupon,
              });
            }
          });
        }
      },
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
      let data = e.detail.data;
      if (util.isLogin()) {
        let {
          activityCode = "",
          markState = 0,
          needToUse = 0,
        } = data || {};

        // 普通券或新人专享券
        if (needToUse == 1) {
          // 去使用
          this.handleCouponGo(data);
        } else {
          if (markState == 2) {
            // 未领取状态
            // 防连点
            if (data.flag) {
              data.flag = false;
              let key = `couponList[${data.cpIndex}]`;
              this.setData({
                [key]: data,
              });
              this.getCoupon(activityCode, data);
            }
          }
        }
        clickBuriedV2_({
          click_id: "click_coupon",
          click_par: {
            activityCode: activityCode,
            couponId: data.couponId,
            type: "window",
            couponType: data.couponType,
            actType: data.couponButton.title || "",
            userAction: data.userAction,
            traceId: this.data.traceId || "",
          },
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId || "",
        });
      } else {
        mpCmsJump({
          pageType: "p56",
          preObj: this.data.buriedObj,
          buried_position: {
            key: "store-couponFloor-one-1",
            options: this.data.options,
          },
        });
      }
    },
    // 重置优惠券能点击
    preventClick(data) {
      if (data) {
        data.flag = true;
        let key = `couponList[${data.cpIndex}]`;
        this.setData({
          [key]: data,
        });
      }
    },
    // 领取普通优惠券
    getCoupon(activityCode, cpData) {
      getCoupon(
        {
          channel: "station_home_page",
          source: "homestore",
          code: activityCode,
          isFollow: (cpData && cpData.isFans) || 0,
          orgCode: this.data.orgCode || "",
          storeNo: this.data.storeId || "",
          isFloor: 0,
          pageSource: "store",
          needCouponGo: true,
          grabPlat: 1,
          bgType: (cpData.params && cpData.params.bgType) || "",
          encryptedKey: cpData.encryptedKey || "",
          ruleId: cpData.ruleId || "",
          couponId: cpData.couponId,
        },
        true,
        true
      )
        .then((res) => {
          res.data1 = {
            code: "0",
            msg: "成功",
            detail: null,
            result: {
              responseList: [
                {
                  state: 0,
                  couponSignNew: 0,
                  toUse: false,
                  couponButton: {
                    title: "已领取",
                    titleColor: "#999999",
                    startColor: "#FFFFFF",
                    endColor: "#FFFFFF",
                    borderColor: "#CCCCCC",
                    state: 0,
                  },
                  markState: 3,
                  couponId: "966933053",
                  localRefreshNeedCompare: false,
                  his: false,
                },
              ],
              busiCode: "0",
              message: "成功",
            },
            success: true,
          };
          let result = res.data.result;
          if (res.data.code == "0" && result) {
            if (result.busiCode === "AC0000") {
              mp.toast({
                title: result.message || "黑名单！",
              });
              this.preventClick(cpData);
            } else {
              let coupon =
                (result.responseList && result.responseList[0]) || {};
              let originCouponList = this.data.couponList || [];
              originCouponList.forEach((item) => {
                if (item.couponId == coupon.couponId) {
                  // 找到当前优惠券更新状态
                  let userAction = item.userAction;
                  coupon = Object.assign(item, coupon);
                  coupon.userAction = userAction;
                  this.preventClick(coupon);
                  mp.toast({
                    title: (result && result.message) || "领取成功！",
                  });
                  // 通知把弹层，需要调用异步刷新优惠券接口
                  this.noticeToFresh();
                }
              });
            }
          } else {
            mp.toast({
              title: (res.data && res.data.msg) || "领取失败！",
            });
            this.data.couponList.forEach((item) => {
              if (!item.flag) {
                item.flag = true;
              }
            });
            this.setData({
              couponList: this.data.couponList,
            });
            let deviceid_pdj_jd = util.getUUIDMD5();
            let loginInfo = wx.getStorageSync("login_info");
            let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
            let logParams = {
              storeId: this.data.storeId,
              orgCode: this.data.orgCode,
              position: "yhy-one",
              pin: PDJ_H5_PIN,
            };
            addFilterMsg("grabCouponError");
            addFilterMsg("coupon/grabCoupon");
            addFilterMsg(deviceid_pdj_jd);
            addFilterMsg(PDJ_H5_PIN);
            error(JSON.stringify(logParams));
          }
          this.reportCouponError(activityCode, res);
        })
        .catch((err) => {
          mp.toast({
            title: "领取失败！",
          });
          this.data.couponList.forEach((item) => {
            if (!item.flag) {
              item.flag = true;
            }
          });
          this.setData({
            couponList: this.data.couponList,
          });
          this.reportCouponError(activityCode, err);
        });
    },
    // 去使用点击获取跳转协议
    handleCouponGo(data) {
      getCouponProtocol({
        activityCode: data.activityCode || "",
        storeId: this.data.storeId || "",
        markState: data.markState || "",
        refPageSource: "store",
        skuId: data.skuId || "",
        orgCode: this.data.orgCode || "",
        couponGoSource: 0,
        couponId: data.couponId || "",
        couponPattern: data.couponPattern || "",
        promotionSource: "storePromotion",
      })
        .then((res) => {
          let result = res.data.result || "";
          if (res.data.code == "0" && result) {
            let { to = "", params = {} } = result;
            let paramsNew = {};
            for (let i in result.params) {
              if (i != "passThroughParam") {
                paramsNew[i] = params[i];
              } else {
                for (let j in params.passThroughParam) {
                  if (params.passThroughParam[j]) {
                    paramsNew[j] = params.passThroughParam[j];
                  }
                }
              }
            }
            if (!paramsNew.orgCode) {
              paramsNew.orgCode = this.data.orgCode;
            }
            if (to) {
              djCmsJump({
                to: to,
                params: paramsNew,
                userAction: data.userAction || "",
                traceId: this.data.traceId || "",
                preObj: this.data.buriedObj,
                buried_position: {
                  key: "store-couponFloor-one-4",
                  options: this.data.options,
                },
              });
            }
          } else {
            mp.toast({
              title:
                (res.data && res.data.detail) ||
                "哎呀，点击太疼啦，稍后再点我哦~",
            });
            let deviceid_pdj_jd = util.getUUIDMD5();
            let loginInfo = wx.getStorageSync("login_info");
            let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
            let logParams = {
              activityCode: data.activityCode,
              markState: data.markState,
              storeId: this.data.storeId,
              orgCode: this.data.orgCode,
              couponId: data.couponId,
              position: "yhy-one",
              pin: PDJ_H5_PIN,
            };
            addFilterMsg("singleCouponBuyError");
            addFilterMsg("coupon/singleCouponTready");
            addFilterMsg(deviceid_pdj_jd);
            addFilterMsg(PDJ_H5_PIN);
            error(JSON.stringify(logParams));
          }
          this.reportCouponError(data.activityCode, res);
        })
        .catch((err) => {
          mp.toast({
            title: "哎呀，点击太疼啦，稍后再点我哦~",
          });
          this.reportCouponError(data.activityCode, err);
        });
    },
    // 通知门店优惠券半弹层，后续点击关闭按钮要异步刷新优惠券
    noticeToFresh() {
      this.triggerEvent("popEvent", {
        type: "updateCoupon",
      });
    },
    // 监控领券或者去使用等操作报错信息
    reportCouponError(activityCode, res) {
      let deviceid_pdj_jd = util.getUUIDMD5();
      let loginInfo = wx.getStorageSync("login_info");
      let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
      clickBuriedV2_({
        click_id: "reportCouponError",
        click_par: {
          pin: PDJ_H5_PIN,
          deviceId: deviceid_pdj_jd,
          position: "couponFloorOne",
          activityCode: activityCode || "没有",
          storeNo: this.data.storeId || "没有",
          refPageSource:
            this.data.recommendObj && this.data.recommendObj.refPageSource,
          res: res || "",
        },
      });
    },
    maidian(clickId, clickPar) {
      clickBuriedV2_({
        click_id: clickId,
        click_par: clickPar,
        currentPageName: this.data.pageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId || "",
      });
    },
  },
});

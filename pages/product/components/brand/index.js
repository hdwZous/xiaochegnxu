import { djCmsJump } from "../../../../common/util/agreementV2";
import {
  getCoupon,
  getCouponProtocol,
} from "../../../../common/util/services";
import { request, FNIDS } from '../../../../common/util/api';
import mp from '../../../../common/util/wxapi';
import {clickBuriedV2_}  from '../../../../common/util/BI.js';

Component({
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    homeInfo: {
      type: Object,
      value: null,
    },
    couponInfo: {
      type: Object,
      value: null,
      observer: function (obj) {
        if (obj) {
          this.maidian("epBrandFloor", {
            orgCode: this.data.orgCode,
            storeId: this.data.storeId,
            skuId: this.data.skuId,
            brandId: obj.brandId
          })
        }
      }
    },
    brandLayerInfo: {
      type: Object,
      value: null,
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
    skuId: {
      type: String,
      value: "",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    dialogShow: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToBrand() {
      let { transferProtocol = {} } = this.data.homeInfo || {};
      djCmsJump({
        to: transferProtocol.to,
        params: transferProtocol.params,
        preObj: this.data.recommendObj,
        buried_position: {
          key: "product-brand-goToBrand",
          options: this.data.options,
        },
      });
      try {
        this.maidian("clickBrandFloor", {
          orgCode: this.data.orgCode,
          storeId: this.data.storeId,
          skuId: this.data.skuId,
          brandId: this.data.couponInfo && this.data.couponInfo.brandId
        })
      } catch (error) {}
    },
    clickCoupon(e) {
      let {
        memberFlag,
        needToUse,
        markState,
        activityCode,
        couponType,
        couponId,
        accessType,
        brandId,
        userAction,
        couponButton
      } = e.currentTarget.dataset.info;
      if (needToUse || markState == 3) {
        this.jump({
          activityCode: activityCode,
          storeId: this.data.storeId || "",
          markState: markState,
          orgCode: this.data.orgCode || "",
          couponId: couponId,
          couponType: couponType,
          userAction: "",
        });
      } else if (markState == 2) {
        if (accessType && accessType == 1) {
          this.getCoupon(
            activityCode,
            couponType,
            (this.data.orgCode = "")
          ).then(() => {
            // 更改券状态
            this.setData({
              "couponInfo.markState": 3,
              "couponInfo.couponButton.title": "去使用",
            });
          });
        } else {
          if (brandId && !memberFlag) {
            this.setData({
              dialogShow: true,
            });
          } else {
            this.getBrandCoupon(couponId, brandId);
          }
        }
      }
      try {
        this.maidian('click_coupon', {
          userAction,
          activityCode,
          couponType,
          couponId,
          storeId: this.data.storeId,
          actType: couponButton && couponButton.title
        })
      } catch (error) {}
    },
    // 领取普通券
    getCoupon(code, couponType, orgCode) {
      return new Promise((resolve) => {
        getCoupon({
          channel: "single_product_page",
          refPageSource: "",
          code: code,
          operType: 1,
          isFloor: 1,
          needCouponGo: true,
          grabPlat: 1,
          orgCode: orgCode || "",
          storeNo: this.data.storeId || "",
          couponPattern: couponType,
          pageSource: "productDetail",
          ref: "",
          ctp: "goodsinfo",
        })
          .then((res) => {
            if (res.data.code === "0") {
              let {
                message,
                busiCode,
                responseList,
                extFieldMap = "",
              } = res.data.result || {};
              if (busiCode === "0") {
                resolve(responseList);
              } else if (busiCode === "AC4401") {
                // 商家券
                mp.dialog({
                  title: "提示",
                  content:
                    message || "开通会员后才可领取哦~(限商家会员)(AC4401)",
                  cancelText: "暂不开通",
                  confirmText: "立即开通",
                }).then((actRes) => {
                  if (actRes.confirm) {
                    extFieldMap &&
                      djCmsJump({
                        to: "web",
                        params: extFieldMap,
                        preObj: this.data.recommendObj,
                      });
                  }
                });
              } else {
                message &&
                  mp.toast({
                    title: message,
                  });
              }
            } else {
              mp.toast({
                title: res.data.msg || "领券失败！",
              });
            }
          })
          .catch((err) => {
            mp.toast({
              title: err.data.msg || "领券失败！",
            });
          });
      });
    },
    // 跳转协议
    jump(data) {
      getCouponProtocol({
        activityCode: data.activityCode || "",
        storeId: this.data.storeId || data.storeId || "",
        markState: data.markState || "",
        refPageSource: "",
        pageSource: "productDetail",
        couponGoSource: 0,
        couponId: data.couponId || "",
        ref: "",
        ctp: "goodsinfo",
      }).then((res) => {
        let result = res.data.result || "";
        if (res.data.code == "0" && result) {
          let { to = "", params = {} } = result;
          let paramsNew = { userAction: data.userAction };
          for (let i in result.params) {
            if (i != "passThroughParam") {
              paramsNew[i] = params[i];
            } else {
              Object.assign(paramsNew, params.passThroughParam);
            }
          }
          if (to) {
            djCmsJump({
              to: to,
              params: paramsNew,
              userAction: data.userAction,
              traceId: this.data.traceId || "",
              preObj: this.data.recommendObj,
            });
          }
        } else {
          mp.toast({
            title: res.data.detail || "哎呀，点击太疼啦，稍后再点我哦~",
          });
        }
      });
    },
    // 领取品牌券
    getBrandCoupon(couponId = "", brandId = "") {
      request({
        ...FNIDS.getBrandCoupon,
        method: "GET",
        isNeedDealError: true,
        isForbiddenDialog: true,
        body: {
          couponId: couponId,
          brandId,
        },
        preObj: this.data.recommendObj || {},
      })
        .then((res) => {
          let { code, result } = res.data || {};
          if (code == 0 && result) {
            this.changeInfo(result);
            wx.showToast({
              title: "优惠券已领取成功",
              icon: "none",
              duration: 3000,
            });
          } else {
            mp.toast({
              title: (res.data && res.data.msg) || "领取失败~",
            });
          }
        })
        .catch(() => {
          mp.toast({
            title: "领取失败~",
          });
        });
    },
    closeBrand() {
      this.setData({
        dialogShow: false,
      });
    },
    openSuccess(e) {
      let { couponVo } = e.detail;
      this.setData({
        "couponInfo.memberFlag": true,
      });
      this.changeInfo(couponVo);
      this.closeBrand();
    },
    changeInfo(info) {
      this.setData({
        "couponInfo.couponButton.title": info.bntWords,
        "couponInfo.couponButton.titleColor": info.bntWordsStyle,
        "couponInfo.couponButton.startColor": info.bntStyle,
        "couponInfo.couponButton.endColor": info.bntStyle,
        "couponInfo.markState": 3,
        "couponInfo.needToUse": info.needToUse,
      });
    },
    maidian(clickId, clickPar) {
      let {
        currentPageName = "",
        prePageName = "",
        pageIdFirstPage = "",
      } = this.data.recommendObj;
      clickBuriedV2_({
        click_id: clickId,
        click_par: clickPar,
        currentPageName,
        prePageName,
        pageId: pageIdFirstPage,
      });
    }
  },
});

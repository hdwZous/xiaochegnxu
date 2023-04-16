import { mpCmsJump } from '../../../../common/util/agreementV2';
import { request, FNIDS } from '../../../../common/util/api';
import {clickBuriedV2_}  from '../../../../common/util/BI.js';

Component({
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    brandLayerInfo: {
      type: Object,
      value: {},
    },
    couponId: {
      type: String,
      value: "",
    },
    brandId: {
      type: String,
      value: "",
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
    storeId: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.triggerEvent("closeBrand");
    },
    goAgreement(e) {
      let { href } = e.currentTarget.dataset;
      mpCmsJump({
        pageType: "p19",
        params: {
          url: encodeURIComponent(href),
          noNeedLogin: true,
        },
        preObj: this.data.recommendObj,
        buried_position: {
          key: "product-brandDialog-goAgreement",
          options: this.data.options,
        },
      });
    },
    getCoupon() {
      let { functionId, appVersion } = FNIDS.getBrandCoupon;
      request({
        functionId,
        appVersion,
        isNeedDealError: true,
        body: {
          couponId: this.data.couponId,
          brandId: this.data.brandId,
        },
        preObj: this.data.recommendObj || {},
      })
        .then((res) => {
          if (res.data.code == 0) {
            this.triggerEvent("openSuccess", { couponVo: res.data.result });
            wx.showToast({
              title: "恭喜入会成功，券已发放",
              icon: "none",
              duration: 3000,
            });
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 3000,
            });
            this.close();
          }
        })
        .catch((err) => {
          wx.showToast({
            title: err.data.msg || "入会失败，请稍后再试",
            icon: "none",
            duration: 3000,
          });
          this.close();
        });
      try {
        let {userAction} = this.data.brandLayerInfo || {}
        this.maidian('clickCouponLayer', {
          userAction,
          type: "brandMember",
          storeId: this.data.storeId
        })
      } catch (error) {}
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

import { mpCmsJump, djCmsJump } from "../../../../common/util/agreementV2";
import { pvBuriedV2_, clickBuriedV2_ } from "../../../../common/util/BI";
import util from "../../../../common/util/util";
import emitter from "../../../../common/util/events";
import djBus from "../../../../common/util/djBus";
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          djBus.once("mask_shopService", (data) => {
            this.setData(
              {
                pageName: "shopService",
                prePageName: data.currentPageName,
                pageId: util.getPageIdrandom(),
                recommendObj: {
                  prePageName: data.currentPageName,
                  currentPageName: "shopService",
                  pageSource: data.pageSource,
                  refPageSource: data.refPageSource,
                  pageIdFirstPage: util.getPageIdrandom(),
                },
              },
              () => {
                this.pvFunc()
                const pageList = getCurrentPages();
                const route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
                const prePageId = this.data.buriedObj.pageIdFirstPage || ''
                emitter.emit("halfMaskFunc_"+route+"_shopService_"+prePageId, {
                  name: "shopService",
                  type: "open",
                  selector: "#store >>> #shopService", // 用于页面找打半弹层
                  buriedObj: this.data.recommendObj,
                });
              }
            );
          });
        } else {
          const pageList = getCurrentPages();
          const route =
            (pageList &&
              pageList.length &&
              pageList[pageList.length - 1].route) ||
            "";
          const prePageId = this.data.buriedObj.pageIdFirstPage || "";
          emitter.emit("halfMaskFunc_" + route + "_shopService_" + prePageId, {
            name: "shopService",
            type: "close",
            selector: "#store >>> #shopService", // 用于页面找打半弹层
            buriedObj: this.data.recommendObj,
          });
        }
      },
    },
    storeCommentVO: {
      type: Object,
      value: {},
    },
    storeInfo: {
      type: Object,
      value: {},
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
  data: {},
  pageLifetimes: {
    show() {},
  },
  methods: {
    // 关闭弹层
    hidePop() {
      // this.setData({
      //   show: false,
      // });
      this.triggerEvent("pageEvent", {
        type: "closeOrgServiceHalf",
      });
    },
    // 去商家资质
    goToCondition(e) {
      let { url, qualificationList = [] } = e.currentTarget.dataset || "";
      let {storeBusinessType = ''} = this.data.storeInfo
      // 如果是到店
      if (storeBusinessType == 2 && qualificationList.length) {
        wx.setStorageSync("qualificationList", qualificationList);
        wx.navigateTo({
          url: "/pages/toStore/qualification/index",
        });
      } else if (url) {
        mpCmsJump({
          pageType: "p19",
          params: {
            url: url,
          },
          preObj: this.data.recommendObj,
          buried_position: {
            key: `store-orgServiceHalfV5-1`,
            options: this.data.options,
          },
        });
        this.maidian("shangjiazizhi", {
          url: url,
        });
      }
    },
    // 打电话
    makePhone(e) {
      let phone = e.currentTarget.dataset.phone || "";
      if (phone) {
        wx.makePhoneCall({
          phoneNumber: phone,
        });
      }
      this.maidian("call_store", {
        storeId: this.data.storeInfo.storeId,
      });
    },
    pvFunc(isBack) {
      // 埋点参数
      let { pageId, prePageName } = this.data.recommendObj || {};
      pvBuriedV2_({
        pageId: pageId,
        prePageName: prePageName || "",
        currentPageName: "shopService" || "",
        isBack: isBack,
      });
    },
    maidian(clickId, clickPar) {
      let { pageId, prePageName } = this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: clickId,
        click_par: clickPar,
        pageId: pageId,
        prePageName: prePageName || "",
        currentPageName: "shopService" || "",
      });
    },
    // 点击地址跳导航页
    jumpNav() {
      let {latitude, longitude, storeBusinessType = '', storeAddress, storeName} = this.data.storeInfo
      if (storeBusinessType == 2) {
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
          name: storeName,
          address: storeAddress,
        })
      } 
    },
    // 到店-点击跳转评价页
    jumpComment() {
      let {to, params} = this.data.storeCommentVO
      params.url = `${params.url}?storeId=${params.storeId}&bgType=${params.bgType ? params.bgType : ''}`
      djCmsJump({
        to: to,
        params: params,
        preObj: this.data.recommendObj,
        buried_position: {
          key: `store-orgServiceHalfV5-1`,
          options: this.data.options,
        },
      });
    }
  },
});

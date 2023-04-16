import { request, FNIDS } from "../../../../common/util/api";
import { requestPay } from "../../../../common/util/PayTools";
import util from "../../../../common/util/util";
import { mpCmsJump, djCmsJump } from "../../../../common/util/agreementV2";
import { clickBuriedV2_ } from "../../../../common/util/BI";
let that = {}
Component({
  properties: {
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    showPop: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          let {
            currentPageName = "",
            prePageName = "",
            pageIdFirstPage = "",
          } = this.data.recommendObj;
          clickBuriedV2_({
            click_id: "showLayer",
            click_par: {
              type: "storeMem",
              storeId: this.data.storeId || "",
              position: "middle",
              memberType: this.data.memberFloorInfoVO.vipType,
              traceId: this.data.traceId || "",
            },
            currentPageName,
            prePageName,
            pageId: pageIdFirstPage,
          });
        }
      },
    },
    memberFloorInfoVO: {
      type: Object,
      value: null,
      observer: function () {
        that = this;
      },
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    traceId: {
      type: String,
      value: "",
    },
    options: {
      type: Object,
      value: {},
    },
  },
  lifeTimes: {
    attached() {
      that = this;
    },
  },
  methods: {
    openVip() {
      if (util.isLogin()) {
        let {
          optType,
          vipType,
          urlSource = "newproductDetail",
        } = this.data.memberFloorInfoVO || {};
        let {
          currentPageName = "",
          prePageName = "",
          pageIdFirstPage = "",
        } = this.data.recommendObj;
        clickBuriedV2_({
          click_id: "clickLayer",
          click_par: {
            type: "storeMem",
            storeId: this.data.storeId || "",
            position: "middle",
            memberType: this.data.memberFloorInfoVO.vipType,
            btnName: "入会并领取",
            traceId: this.data.traceId || "",
          },
          currentPageName,
          prePageName,
          pageId: pageIdFirstPage,
        });
        // 如果付费是需要登录的
        if (vipType && !util.isLogin()) {
          mpCmsJump({
            pageType: "p56",
            preObj: this.data.recommendObj,
            buried_position: {
              key: "product-openVip-openVip",
              options: this.data.options,
            },
          });
          return;
        }
        if (!optType) return;
        // optType 开卡操作：openCard、续费操作：renewCard
        // vipType 免费会员 false，付费会员 true 会员付费类型 0.免费、1.付费
        let functionId =
          optType == "openCard"
            ? FNIDS.buycard.functionId
            : FNIDS.renewcard.functionId;
        let loginInfo = wx.getStorageSync("login_info") || {};
        request({
          functionId,
          appVersion: FNIDS.buycard.appVersion,
          method: "GET",
          isNeedDealError: true,
          isForbiddenDialog: true,
          body: {
            orgCode: this.data.orgCode || "",
            paySource: 286,
            notifyUrl: "/pages/product/index",
            source: urlSource,
            openId: loginInfo.openId || "",
            storeId: this.data.storeId || "",
          },
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            let { code, result, msg } = res.data || {};
            if (code == 0 && result) {
              // 如果是付费，则需要吊起支付
              if (vipType) {
                if (result.paymentUrl) {
                  let params = JSON.parse(result.paymentUrl);
                  requestPay(params, this.handlePaySuccess, this.handlePayFail);
                } else {
                  this.showTip("开通失败，请稍后重试~");
                }
              } else {
                this.showTip("开通成功");
                // 刷新单品页面
                this.refreshProductIndex();
              }
            } else {
              this.showTip(msg || "开通失败，请稍后重试");
            }
          })
          .catch(() => {
            this.showTip("开通失败，请稍后重试");
          });
      } else {
        mpCmsJump({
          pageType: "p56",
          preObj: this.data.recommendObj,
          buried_position: {
            key: "product-openVip-openVip2",
            options: this.data.options,
          },
        });
      }
    },
    // 刷新单品商家会员楼层
    refreshProductIndex() {
      this.triggerEvent("pageEvent", {
        type: "refreshProductIndex",
        data: {
          isShow: false,
        },
      });
    },
    // 支付成功回调
    handlePaySuccess: function () {
      that.triggerEvent("pageEvent", {
        type: "refreshProductIndex",
        data: {
          isShow: false,
        },
      });
      that.showTip("开通成功");
    },
    //支付失败回调
    handlePayFail: function () {
      that.showTip("开通失败");
    },
    cancel() {
      this.triggerEvent("pageEvent", {
        type: "isShowMemberPop",
        data: {
          isShow: false,
        },
      });
      let {
        currentPageName = "",
        prePageName = "",
        pageIdFirstPage = "",
      } = this.data.recommendObj;
      clickBuriedV2_({
        click_id: "clickLayer",
        click_par: {
          type: "storeMem",
          storeId: this.data.storeId || "",
          position: "middle",
          memberType: this.data.memberFloorInfoVO.vipType,
          btnName: "暂不领取",
          traceId: this.data.traceId || "",
        },
        currentPageName,
        prePageName,
        pageId: pageIdFirstPage,
      });
    },
    showTip(msg) {
      wx.showToast({
        title: msg || "",
        icon: "none",
      });
    },
    // 会员协议跳转
    jumpHref(e) {
      let { to = "", params = "" } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to,
        params,
        traceId: this.data.traceId || "",
        preObj: this.data.recommendObj,
        buried_position: {
          key: "product-openVip-jumpHref",
          options: this.data.options,
        },
      });
    },
  },
});
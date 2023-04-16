import { request, FNIDS } from "../../../../common/util/api";
import { requestPay } from "../../../../common/util/PayTools";
import util from "../../../../common/util/util";
import { mpCmsJump } from "../../../../common/util/agreementV2";
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
          let { pageIdFirstPage, currentPageName, prePageName } =
            this.data.buriedObj || {};
          clickBuriedV2_({
            click_id: "showLayer",
            click_par: {
              type: "storeMem",
              storeId: this.data.storeId || "",
              traceId: this.data.traceId || "",
            },
            prePageName,
            currentPageName,
            pageId: pageIdFirstPage || "",
          });
        }
      },
    },
    popInfo: {
      type: Object,
      value: null,
      observer: function () {
        that = this;
      },
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
  lifeTimes: {
    attached() {
      that = this;
    },
  },
  methods: {
    openVip() {
      let { optType, vipType } = this.data.popInfo || {};
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "clickLayer",
        click_par: {
          type: "storeMem",
          storeId: this.data.storeId || "",
          traceId: this.data.traceId || "",
        },
        prePageName,
        currentPageName,
        pageId: pageIdFirstPage || "",
      });
      // 如果付费是需要登录的
      if (vipType && !util.isLogin()) {
        mpCmsJump({
          pageType: "p56",
          preObj: this.data.buriedObj,
          buried_position: {
            key: `store-busMemberPop-1`,
            options: this.data.options,
          },
        });
        return;
      }
      if (!optType) return;
      // optType 开卡操作：openCard、续费操作：renewCard、领券：grabCoupon
      // vipType 免费会员 false，付费会员 true
      this.open();
    },
    // 刷新门店首页会员楼层
    refreshStore() {
      this.setData({
        showPop: false,
      });
      this.triggerEvent(
        "pageEvent",
        {
          type: "refreshStore",
          data: {
            isShow: false,
          },
        },
        {
          bubbles: true,
          composed: true,
        }
      );
    },
    // 支付成功回调
    handlePaySuccess: function () {
      that.setData({
        showPop: false,
      });
      that.triggerEvent(
        "pageEvent",
        {
          type: "refreshStore",
          data: {
            isShow: false,
          },
        },
        {
          bubbles: true,
          composed: true,
        }
      );
      that.showTip("开通成功");
    },
    //支付失败回调
    handlePayFail: function () {
      that.showTip("开通失败");
    },
    cancel() {
      this.setData({
        showPop: false,
      });
      this.triggerEvent("pageEvent", {
        type: "isShowMemberPop",
        data: {
          isShow: false,
        },
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
      let url = e.currentTarget.dataset.href;
      url = encodeURIComponent(url);
      wx.navigateTo({
        url: `/pages/h5/index?noNeedLogin=true&url=${url}`,
        preObj: this.data.buriedObj,
        buried_position: {
          key: "store-busMemberPop-jumpHref",
          options: this.data.options,
        },
      });
    },
    // 开通商家会员
    open() {
      let {
        optType,
        vipType,
        urlSource = "storemember",
      } = this.data.popInfo || {};

      let functionId = "";
      if (optType == "openCard") {
        functionId = FNIDS.buycard.functionId;
      } else if (optType == "renewCard") {
        functionId = FNIDS.renewcard.functionId;
      }
      let loginInfo = wx.getStorageSync("login_info") || {};
      request({
        functionId,
        appVersion: FNIDS.buycard.appVersion,
        method: "GET",
        isNeedDealError: true,
        isForbiddenDialog: true,
        body: {
          orgCode: this.data.orgCode || "",
          paySource: 281,
          notifyUrl: "/pages/store/index",
          source: urlSource,
          openId: loginInfo.openId || "",
          storeId: this.data.storeId || "",
        },
        preObj: this.data.buriedObj || {},
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
              // 刷新门店首页的商家会员楼层
              this.refreshStore();
            }
          } else {
            this.showTip(msg || "开通失败，请稍后重试");
          }
        })
        .catch(() => {
          this.showTip("开通失败，请稍后重试");
        });
    },
  },
});
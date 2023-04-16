import { djCmsJump } from "../../../../../common/util/agreementV2";
import { clickBuriedV2_ } from "../../../../../common/util/BI";
Component({
  lazyObj: {
    epSelector: ".wrap",
    needExposure: true,
  },
  properties: {
    storeId: {
      type: String,
      value: "",
    },
    floor: {
      type: Object,
      value: {},
      observer: function (obj) {
        if (obj.data && obj.data.length > 0) {
          this.setData({
            memberObj: obj.data[0] || {},
          });
        }
      },
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
    memberObj: {},
    NeedExposure: true,
  },
  methods: {
    openMember(e) {
      let {
        to,
        params,
        guidePop,
        userAction = "",
        popUpHint = "信息提示",
        popUpMsg = "",
        memberAgreementTitle = "会员协议",
        memberAgreementUrl = "",
        openMemberUrl = "",
        optType = "",
        vipType = "",
        memberTo,
        merberParams,
        buttonLeft,
        buttonRight,
        urlSource,
      } = e.currentTarget.dataset.item || {};

      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "clickMemFloor",
        click_par: {
          userAction,
          traceId: this.data.traceId || "",
        },
        pageId: pageIdFirstPage || "",
        currentPageName,
        prePageName,
      });
      // 不需要填资料
      if (guidePop) {
        this.triggerEvent(
          "pageEvent",
          {
            type: "isShowMemberPop",
            data: {
              isShow: true,
              popInfo: {
                title: popUpHint,
                msg: popUpMsg,
                agreementTitle: memberAgreementTitle,
                agreementUrl: memberAgreementUrl,
                optType: optType,
                vipType,
                memberTo,
                merberParams,
                buttonLeft,
                buttonRight,
                urlSource,
              },
            },
          },
          {
            bubbles: true,
            composed: true,
          }
        );
      } else if (openMemberUrl) {
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
            key: "store-memberFloor-1",
            options: this.data.options,
          },
        });
      }
    },
  },
});


import { clickBuriedV2_ } from "../../../../common/util/BI.js";
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    memberFloorInfoVO: {
      type: Object,
      value: {},
    },
    recommendObj: {
      type: Object,
      value: {}
    },
    storeId: {
      type: String,
      value: ""
    },
    traceId: {
      type: String,
      value: ""
    }
  },
  data: {},
  methods: {
    clickCard(e) {
      let item = e.currentTarget.dataset.item || {};
      // 如果是商家会员
      if (item.memberType == 1) {
        this.triggerEvent("pageEvent", {
          type: "busMember",
          data: item,
        });
      }
      // 如果是v+会员
      else if (item.memberType == 2) {
        this.triggerEvent("pageEvent", {
          type: "vipMember",
          data: item,
        });
      }
      let { currentPageName, prePageName, pageIdFirstPage } =
        this.data.recommendObj;
      clickBuriedV2_({
        click_id: "clickMember",
        click_par: {
          storeId: this.data.storeId,
          memType: item.memberType,
          position: "middle",
          type: item.style || "",
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      });
    },
  },
});

import { clickBuriedV2_ } from "../../../../../../common/util/BI.js";
Component({
  options: {
    addGlobalClass: true,
  },
  lazyObj: {
    epSelector: ".ep_cate_item",
    needExposure: true,
  },
  properties: {
    item: {
      type: Object,
      value: {},
    },
    checked: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          this.addLog("click_blist", {
            userAction: this.data.item && this.data.item.user_action,
            state: this.data.isClickBlist ? "" : 0,
            select: this.data.isClickBlist ? 1 : ""
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
    isClickBlist: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    NeedExposure: true,
  },
  methods: {
    addLog(name, opts) {
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: name,
        click_par: opts,
        pageId: pageIdFirstPage || "",
        currentPageName,
        prePageName,
      });
    },
  },
});
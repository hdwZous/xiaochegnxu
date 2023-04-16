
import { clickBuriedV2_ } from "../../../../../../common/util/BI.js";
Component({
  options: {
    addGlobalClass: true,
  },
  lazyObj: {
    epSelector: ".ep_sec-cate-item",
    needExposure: true,
  },
  properties: {
    subItem: {
      type: Object,
      value: {},
    },
    checked: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          this.addLog("click_slist", {
            userAction: this.data.subItem && this.data.subItem.user_action,
            state: this.data.isClickSlist ? "" : 0,
            select: this.data.isClickSlist ? 1 : "",
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
    isClickSlist: {
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
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    floor: {
      type: Object,
      value: {},
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
  },
  data: {
    showAllTags: false,
  },
  methods: {
    showAllTags() {
      this.setData({
        showAllTags: !this.data.showAllTags,
      });
      let { pageId, currentPageName, prePageName } =
        this.data || {};
      clickBuriedV2_({
        click_id: "unfoldSale",
        click_par: {
          traceId: this.data.traceId || "",
        },
        pageId,
        currentPageName,
        prePageName,
      });
    },
  },
});

import { mpCmsJump } from "../../../../../common/util/agreementV2";
import { clickBuriedV2_ } from "../../../../../common/util/BI";
Component({
  properties: {
    showPop: {
      type: Boolean,
      value: false,
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    options: {
      type: Object,
      value: {}
    }
  },
  methods: {
    jump() {
      this.cancel();
      mpCmsJump({
        pageType: "p56",
        preObj: this.data.buriedObj,
        buried_position: {
          key: `store-loginPop-1`,
          options: this.data.options,
        },
      });
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "clickLoginLayer",
        click_par: {
          type: "outsideLogin",
          btnName: "login",
        },
        prePageName,
        currentPageName,
        pageId: pageIdFirstPage || "",
      });
    },
    cancel() {
      this.setData({
        showPop: false,
      });
    },
  },
});
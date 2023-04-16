import { djCmsJump } from "../../../../../../common/util/agreementV2";
import { clickBuriedV2_ } from "../../../../../../common/util/BI";
Component({
  lazyObj: {
    epSelector: ".scroll-view .ep_three-in-row-cate",
    needExposure: true,
  },
  properties: {
    traceId: {
      type: String,
      value: "",
    },
    floor: {
      type: Object,
      value: {},
    },
    buriedObj: {
      type: Object,
      value: {},
    },
  },
  data: {
    NeedExposure: true,
  },
  methods: {
    clickCategory(e) {
      let { to, params, userAction } = e.currentTarget.dataset.item;
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: `store-threeInRow-category`,
        },
      });
      clickBuriedV2_({
        click_id: "clickTag",
        click_par: {
          traceId: this.data.traceId || "",
          userAction: userAction || "",
        },
        pageId: this.data.buriedObj.pageIdFirstPage || "",
        currentPageName: this.data.buriedObj.currentPageName,
        prePageName: this.data.buriedObj.prePageName,
      });
    },
    clickMoreBtn(e) {
      let { to, params, userAction } = e.currentTarget.dataset || {}
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: `store-threeInRow-category-more`,
        },
      });
    },
  },
});

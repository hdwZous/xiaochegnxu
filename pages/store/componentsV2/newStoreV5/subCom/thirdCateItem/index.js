
import { clickBuriedV2_ } from "../../../../../../common/util/BI.js";
Component({
  options: {
    addGlobalClass: true,
  },
  lazyObj: {
    epSelector: ".ep_third-cate-item",
    needExposure: true,
  },
  properties: {
    thirdItem: {
      type: Object,
      value: {},
    },
    checked: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          this.addLog("click3cate", {
            userAction: this.data.thirdItem && this.data.thirdItem.user_action,
            state: this.data.isClick3Cate ? "" : 0,
            select: this.data.isClick3Cate ? 1 : "",
          });
        }
      },
    },
    traceId: {
      type: String,
      value: "",
    },
    secondIndex: {
      type: Number,
      value: -1,
      observer: function (newV, oldV) {
        // 切换二级分类要重新曝光当前二级分类下的三级分类
        if (newV != oldV) {
          this.epSection && this.epSection();
        }
      },
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    isClick3Cate: {
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
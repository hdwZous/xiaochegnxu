import { djCmsJump } from "../../../../common/util/agreementV2";
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          try {
            this.maidian("showGuideVipPlusWindow", {
              position: "",
              storeId: this.data.storeId
            });
          } catch (error) {}
        }
      }
    },
    popInfo: {
      type: Object,
      value: {},
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    options: {
      type: Object,
      value: {}
    },
    storeId: {
      type: String,
      value: ""
    }
  },
  data: {},
  methods: {
    close() {
      this.setData({
        show: false,
      });
    },
    clickButton(e) {
      let url = e.currentTarget.dataset.url || "";
      djCmsJump({
        to: "web",
        params: {
          url,
        },
        preObj: this.data.buriedObj,
        buried_position: {
          key: `store-vipCouponPop-1`,
          options: this.data.options,
        },
      });
      this.close()
    },
    maidian(clickId, clickPar) {
      let { currentPageName, prePageName, pageIdFirstPage } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: clickId,
        click_par: clickPar,
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      });

    }
  },
});

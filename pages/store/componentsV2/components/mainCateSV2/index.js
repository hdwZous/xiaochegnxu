
import { djCmsJump } from "../../../../../common/util/agreementV2";
import { clickBuriedV2_ } from "../../../../../common/util/BI";
Component({
  lazyObj: {
    epSelector: ".maincate-wrapper .ep_cate",
  },
  properties: {
    data: {
      type: Array,
      value: [],
    },
    floorStyle: {
      type: String,
      value: "",
    },
    imgLazyLoad: {
      type: Object,
      value: {},
    },
    floorId: {
      type: String,
      value: "",
    },
    floorName: {
      type: String,
      value: "",
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
    NeedExposure: true,
  },
  methods: {
    // 点击通知newStoreV4组件锚中对应分类
    anchorProduct(e) {
      let data = e.currentTarget.dataset.item || {};
      let { to, params, userAction } = data;
      if (to) {
        djCmsJump({
          to: to,
          params: params,
          userAction: userAction,
          traceId: this.data.traceId || "",
          preObj: this.data.buriedObj,
          buried_position: {
            key: "store-mainCateSV2-1",
            options: this.data.options,
          },
        });
      } else {
        let timer = setTimeout(() => {
          clearTimeout(timer);
          this.triggerEvent("tellParent", {
            type: "main-cate",
            data,
          });
        }, 100);
      }
      let { currentPageName, prePageName, pageIdFirstPage } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "clickBall",
        click_par: {
          firstCateId: data.firstCateId || "",
          secondCateId: data.secondCateId || "",
          traceId: this.data.traceId || "",
          userAction,
        },
        prePageName,
        currentPageName,
        pageId: pageIdFirstPage,
      });
    },
  },
});
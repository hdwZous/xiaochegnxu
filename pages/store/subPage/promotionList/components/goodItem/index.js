
import { mpCmsJump } from "../../../../../../common/util/agreementV2.js";

Component({
  lazyObj: {
    epSelector: ".ep_three-item",
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: {
      type: Object,
      value: {},
    },
    index: {
      type: Number,
      value: null,
    },
    traceId: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    title: {
      type: String,
      value: ""
    },
  },
  data: {
    NeedExposure: true,
  },
  methods: {
    // 点击商品
    goToDetail(e) {
      let item = e.currentTarget.dataset.item;
      mpCmsJump({
        pageType: "p30",
        params: {
          storeId: item.storeId || "",
          orgCode: item.orgCode || "",
          skuId: item.skuId || "",
          spuId: item.spuId || "",
          userAction:
            (item.userActionSku && encodeURIComponent(item.userActionSku)) ||
            (item.userAction && encodeURIComponent(item.userAction)) ||
            "",
        },
        preObj: this.data.buriedObj,
        buried_position: {
          key: `store-promotionList-goodItem-1`,
          options: this.data.options,
        },
      });
    },
  },
});
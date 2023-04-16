import { request, FNIDS } from "../../common/util/api.js";
import {djCmsJump} from '../../common/util/agreementV2.js'
Component({
  lazyObj: {
    epSelector: ".wrap .ep_self-buy",
    needExposure: true,
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    floorBgImg: {
      type: String,
      value: "",
    },
    bgColor: {
      type: String,
      value: "",
    },
    floorTitle: {
      type: String,
      value: "",
    },
    subTitle: {
      type: String,
      value: "",
    },
    floor: {
      type: Object,
      value: {},
    },
    pageSource: {
      type: String,
      value: "",
    },
    skuList: {
      type: Array,
      value: [],
    },
    traceId: {
      type: String,
      value: "",
    },
    // 自提标
    tag: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    NeedExposure: {
      type: Boolean,
      value: false,
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },
  methods: {
    async clickSku(e) {
      let floor = e.currentTarget.dataset.floor || {};
      let item = e.currentTarget.dataset.item || {};
      if (!item.stockCount) return;
      let result = await this.checkLimit();
      // 如果超出限购，则弹窗提示
      if (result >= floor.limitCount) {
        wx.showToast({
          title: floor.toast,
          icon: "none",
        });
      } else {
        djCmsJump({
          to: item.to || "",
          params: item.params || {},
          userAction: item.userAction || "",
          preObj: this.data.buriedObj,
        });
      }
    },
    //校验是否超出限购
    async checkLimit() {
      let res = await request({
        ...FNIDS.recentOrderList,
        isForbiddenDialog: true,
        isNeedDealError: true,
        body: {
          stateCode: 1,
          stateAfter: true,
          tags: [1],
        },
        preObj: this.data.recommendObj
      });
      if (res.data.code == 0 && res.data.result) {
        return res.data.result.size;
      } else {
        return 0;
      }
    },
  },
});
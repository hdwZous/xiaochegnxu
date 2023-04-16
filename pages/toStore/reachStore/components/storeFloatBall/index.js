import { djCmsJump } from "../../../../../common/util/agreementV2.js";
import { maidian } from "../../public.js";

let app = getApp();

Component({
  properties: {
    switchStore: {
      type: Object,
      value: null,
    },
    showFloatBall: {
      type: Boolean,
      value: true,
    },
    navHeight: {
      type: Number,
      value: 0
    },
    traceId: {
      type: String,
      value: ""
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    storeInfo: {
      type: Object,
      value: {},
    },
  },
  data: {},
  attached() {
    let { statusBarHeight = 0, windowWidth = 375 } =
      app.globalData.systemInfo || {};
    let navigateBarHeight = statusBarHeight + 46; //导航高度
    let scale = windowWidth / 750;
    let height = 268 * scale + navigateBarHeight;
    this.setData({
      height: parseInt(height),
    });
  },
  methods: {
    goSwitchStore(e) {
      let { to, params, userAction } = e.currentTarget.dataset || {};
      djCmsJump({
        to,
        params,
        userAction: userAction,
        traceId: this.data.traceId
      });
      let {storeBusinessType, storeId} = this.data.storeInfo || {}
      maidian('clickExchangeBusinessType', {
        storeId: storeId,
          businessType: storeBusinessType,
          toBusinessType: this.data.switchStore.businessType
      },this.data.buriedObj)
    },
  },
});

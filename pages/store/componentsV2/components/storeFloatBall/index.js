import { djCmsJump } from "../../../../../common/util/agreementV2.js";
import { clickBuriedV2_ } from "../../../../../common/util/BI";
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
      value: 66
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
      let { to, params } = e.currentTarget.dataset || {};
      djCmsJump({
        to,
        params
      });
      let { pageIdFirstPage, prePageName, currentPageName } =
        this.data.buriedObj || {};
      let { storeId, storeBusinessType } = this.data.storeInfo
      clickBuriedV2_({
        click_id: 'clickExchangeBusinessType',
        click_par: {
          storeId: storeId,
          businessType: storeBusinessType,
          toBusinessType: this.data.switchStore.businessType
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      });
    },
  },
});

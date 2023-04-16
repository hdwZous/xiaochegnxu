
import { djCmsJump } from "../../common/util/agreementV2";
import { clickBuriedV2_ } from "../../common/util/BI";
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    iconType: {
      type: Number,
      value: -1,
      observer: function (val) {
        console.log(val)
      }
    },
    to: {
      type: String,
      value: ""
    },
    params: {
      type: Object,
      value: {}
    },
    userAction: {
      type: String,
      value: ""
    },
    buttonStyle: {
      type: Object,
      value: {}
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    storeId: {
      type: String,
      value: ""
    },
    skuId: {
      type: String,
      value: ""
    }
  },
  data: {
  },
  attached() {
  },
  methods: {
    jump(e) {
      djCmsJump({
        to: this.data.to,
        params: this.data.params,
        userAction: this.data.userAction,
        preObj: this.data.buriedObj
      })
      // let { pageIdFirstPage, currentPageName, prePageName } = this.data.buriedObj || {};
      // clickBuriedV2_({
      //   click_id: 'click_add',
      //   click_par: {
      //     userAction: this.data.userAction,
      //     skuId: this.data.skuId,
      //     storeId: this.data.storeId
      //   },
      //   pageId: pageIdFirstPage || "",
      //   currentPageName: currentPageName,
      //   prePageName: prePageName,
      // })
    }
  },
});

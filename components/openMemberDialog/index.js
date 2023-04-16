import { djCmsJump } from '../../common/util/agreementV2';
import { clickBuriedV2_ } from "../../common/util/BI";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    info: {
      type: Object,
      value: {},
    },
    storeId: {
      type: String,
      value: "",
    },
    fromSource: {
      type: String,
      value: "",
    },
    fromMinicart: {
      type: Boolean,
      value: false,
    },
    currentPageName: {
      type: String,
      value: "",
    },
    prePageName: {
      type: String,
      value: "",
    },
    pageId: {
      type: String,
      value: ""
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    fromPositon: {
      type: String,
      value: ''
    },
    optionsPos: {
      type: Object,
      value: {}
    }
  },

  observers: {
    fromSource: function (val) {
      if (val == "storeInfo") {
        this.setData({
          openMemberBtnUrl:
            "https://storage.360buyimg.com/wximg/common/store-open-member2.png",
        });
      }
    },
  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    openMemberBtnUrl:
      "https://storage.360buyimg.com/wximg/storewin/st-member-open.png",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.setData({ show: false });
    },
    goagrement(e) {
      let { to, params } = e.currentTarget.dataset;
      // 如果是跳转h5,但是没下发url则不跳转
      if (to == "web" && (!params || !params.url)) return;
      // 跳转协议
      djCmsJump({
        to,
        params,
        preObj: this.data.buriedObj,
        buried_position: {
          fromPositon: `openMemberDialog-${this.data.fromPositon}`,
          optionsPos: this.data.optionsPos
        }
      });
    },
    openMbmber() {
      this.triggerEvent("memberToastopen");
      this.close();
      clickBuriedV2_({
        livePageName: this.data.fromMinicart == true ? "mini_shopcar" : "",
        create_time: new Date(),
        click_id: "clickLayer",
        click_par: {
          storeId: this.data.storeId,
          type: "freeMember",
          btnName: "freeOpen",
        },
        currentPageName: this.data.buriedObj.currentPageName || '',
        prePageName: this.data.buriedObj.prePageName || '',
        pageId: this.data.buriedObj.pageIdFirstPage || ''
      });
    },
  },
});

import { clickBuriedV2_ } from "../../../../../common/util/BI";
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    storeId: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    closeTip1: {
      type: Object,
      value: null,
    },
    closeTip2: {
      type: Object,
      value: null,
    },
    // 购物车是否有小黄条
    miniCarHasTips: {
      type: String,
      value: "",
      observer: function (val) {
        let isIpx = getApp().globalData.isIpx;
        if (val === "0" && this.data.isShow) {
          this.setData({
            showTip: val,
            transHeight: isIpx ? 212 : 148,
          });
        } else if (val === "1" && this.data.isShow) {
          this.setData({
            showTip: val,
            transHeight: isIpx ? 288 : 224,
          });
        }
      },
    },
  },
  data: {
    showTip: false,
    transHeight: 148,
    info: {}
  },
  observers: {
    showTip: function (val) {
      let { closeTip2, closeTip1, storeId } = this.data || {};
      this.setData({
        info: closeTip1 || closeTip2 || {},
      });
      let { pageIdFirstPage, prePageName, currentPageName } =
        this.data.buriedObj || {};
      let click_id = val ? "ExposureLayer" : "clickLayer";
      clickBuriedV2_({
        click_id: click_id,
        click_par: {
          storeId: storeId || "",
          title: this.data.info && this.data.info.closeText || "",
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      });
    },
  },
  methods: {
    // 关闭闭店提醒
    closeStoreTip() {
      this.setData({
        showTip: false,
      });
    },
  },
});

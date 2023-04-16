import { clickBuriedV2_ } from "../../../../../common/util/BI.js";
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    storeList: {
      type: Array,
      value: []
    },
    capsule: {
      type: Object,
      value: {},
    },
    showStoreMove: {
      type: Boolean,
      value: false,
    },
    showTipMove: {
      type: Boolean,
      value: false,
      observer: function(val) {
        if (val) {
          let { pageIdFirstPage, currentPageName, prePageName } =
            this.data.recommendObj || {};
          clickBuriedV2_({
            click_id: "clickTraverseEducation",
            click_par: {
              couponId: this.data.couponId || "", 
            },
            currentPageName,
            prePageName,
            pageId: pageIdFirstPage,
          });
        }
      }
    },
    couponId: {
      type: String,
      value: "",
    },
    keyword: {
      type: String,
      value: "",
    },
    activityCode: {
      type: String,
      value: "",
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    traceId: {
      type: String,
      value: "",
    },
    curStoreIndex: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    storeId: "",
    showPop: false,
    // showTip: false,
    // showStoreMove: false,
  },
  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached: function () {},
  },
  methods: {
    catchtouchmove() {
      return false;
    },
    clickStoreItem(e) {
      const { storeList = [] } = this.data;
      if (storeList.length <= 1) return;
      let { item, index } = e.currentTarget.dataset || {};
      this.setData({
        storeId: item.stationNo || "",
      });
      this.triggerEvent("onGetGoods", {
        type: "store",
        data: item,
        curStoreIndex: index,
      });
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "selectTab",
        click_par: {
          keyword: this.data.keyword || "",
          activityCode: this.data.activityCode || "",
          couponId: this.data.couponId || "",
          storeId: item.stationNo || "",
          isLayer: "0",
          traceId: this.data.traceId || "",
        },
        currentPageName,
        prePageName,
        pageId: pageIdFirstPage,
      });
    },
    clickStorePopItem(e) {
      let { item, index } = e.currentTarget.dataset || {};
      this.triggerEvent("onGetGoods", {
        type: "store",
        data: item,
        curStoreIndex: index,
      });
      this.setData({
        storeId: item.stationNo || "",
      });
      let timer = setTimeout(() => {
        clearTimeout(timer);
        this.closePop();
      }, 0);
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "selectTab",
        click_par: {
          keyword: this.data.keyword || "",
          activityCode: this.data.activityCode || "",
          couponId: this.data.couponId || "",
          storeId: item.stationNo || "",
          isLayer: "1",
          traceId: this.data.traceId || "",
        },
        currentPageName,
        prePageName,
        pageId: pageIdFirstPage,
      });
    },
    closePop() {
      this.setData({
        showPop: false,
      });
      this.triggerEvent("onGetZIndex", {
        isShow: false,
      });
    },
    showPop() {
      this.setData({
        showPop: true,
      });
      this.triggerEvent("onGetZIndex", {
        isShow: true,
      });
    },
    storeScroll() {
      if (this.data.showTipMove) {
        this.setData({
          showTipMove: false,
        });
      }
    },
  },
});

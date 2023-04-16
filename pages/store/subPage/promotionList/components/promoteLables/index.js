import { clickBuriedV2_ } from "../../../../../../common/util/BI.js";
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    landType: {
      type: String,
      value: "",
    },
    list: {
      type: Array,
      value: [],
    },
    capsule: {
      type: Object,
      value: {},
    },
    showPromoteModal: {
      type: Boolean,
      value: false,
    },
    keyword: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    storeId: {
      type: String,
      value: "",
    },
  },
  observers: {
    list: function (arr) {
      if (arr.length > 0) {
        let curIndex = "";
        arr.forEach((item, index) => {
          if (item.checked) {
            curIndex = `_${index}`;
          }
        });
        this.setData({
          promoLabels: arr,
          curIndex,
        });
        let { promId, promType, slogan } = curIndex && arr[curIndex] || arr[0] || {};
        this.maidian(promId, promType, slogan, false, 0);
      }
    },
  },
  data: {
    promoLabels: [],
    curIndex: "",
    // showMask: false,
  },
  methods: {
    // 点击促销分类
    clickPromo(e) {
      let index = e.currentTarget.dataset.index;
      let isLayer = e.currentTarget.dataset.isLayer;
      let cur = "promoLabels[" + index + "].checked";
      if (this.data.promoLabels[index].checked) return;
      this.data.promoLabels.forEach((item) => {
        item.checked = 0;
      });
      this.triggerEvent("isShowModal", {
        type: "promoteModal",
        value: false,
      });
      this.setData({
        promoLabels: this.data.promoLabels,
        [cur]: 1,
        curIndex: `_${index}`,
        // showMask: false,
      });
      this.triggerEvent("getGoodsEvnet", {
        item: this.data.promoLabels[index],
      });
      let { promId, promType, slogan } = this.data.promoLabels[index] || {};
      this.maidian(promId, promType, slogan, isLayer, "");
    },
    // 展示促销分类弹层
    showPop(e) {
      let isShow = e.currentTarget.dataset.isShow;
      this.triggerEvent("isShowModal", {
        type: "promoteModal",
        value: isShow,
      });
      // this.setData({
      //   showMask: isShow,
      // });
    },
    stopBubble() {},
    maidian(promId, promType, slogan, isLayer, state) {
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      let landType = this.data.landType
      clickBuriedV2_({
        click_id: "selectTab",
        click_par: {
          promId: promId || "",
          promType: promType || "",
          tabName: slogan || "",
          storeId: this.data.storeId || "",
          isLayer: isLayer || false,
          state: state,
          floorName:
            landType == 1
              ? "满额促销"
              : landType == 2
                ? "多买优惠"
                : landType == 3
                  ? "新人专享" : landType == 6 
                    ? "爆品抢购" : landType == 4 ? "为你优选" : "",
        },
        prePageName,
        currentPageName,
        pageId: pageIdFirstPage || "",
      });
    },
  },
});

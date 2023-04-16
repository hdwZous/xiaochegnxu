// 共用组件
import { clickBuriedV2_ } from "../../../../../common/util/BI.js";
Component({
  properties: {
    multiDisplayFilterFloor: {
      type: Array,
      value: [],
      observer: function (params) {
        this.setData({ displayFilterFloor: params });
      },
    },
    fatherFilterList: {
      type: Array,
      value: [],
      observer: function (arr) {
        this.setData({ selectSubItemList: arr });
      },
    },
    categoryModal: {
      type: Boolean,
      value: false,
    },
    storeId: {
      type: String,
      value: "",
    },
    keyword: {
      type: String,
      value: "",
    },
    couponId: {
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
  },
  data: {
    scrollLeft: 0,
    selectItemObj: {},
    selectSubItemList: [],
    subFilterScrollHeight: 0,
    displayFilterFloor: [],
  },
  methods: {
    clickCatogory(e) {
      const item = e.currentTarget.dataset.item;
      let { selectSubItemList = [] } = this.data;
      const { itemList = [] } = item;
      if (itemList.length && item.nodeType == 2) {
        const { categoryModal } = this.data;
        this.triggerEvent("showModal", {
          type: "categoryModal",
          value: !categoryModal,
        });
        const subFilterScrollHeight =
          ((itemList.length > 12 ? 12 : itemList.length) / 2).toFixed() * 66;
        this.setData({
          selectItemObj: item,
          subFilterScrollHeight,
        });
        let {
          pageIdFirstPage,
          currentPageName,
          prePageName,
        } = this.data.recommendObj || {};
        clickBuriedV2_({
          click_id: "unfoldDisplayFilter",
          click_par: {
            bizType: item.bizType || "",
            filterName: item.filterName || "",
            status: !categoryModal ? 1 : 0,
            keyword: this.data.keyword || "",
            couponId: this.data.couponId || "",
            traceId: this.data.traceId || '',
            userAction: item.userAction || ''
          },
          currentPageName,
          prePageName,
          pageId: pageIdFirstPage,
        });
        return;
      }
      item.displayItem.nodeType = item.nodeType;
      if (item.status) {
        selectSubItemList = [];
      } else {
        selectSubItemList = [item.displayItem];
      }
      this.triggerEvent("onGetGoods", {
        type: "categoryNew",
        data: selectSubItemList,
      });
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "selectCateTag",
        click_par: {
          storeId: this.data.storeId || "",
          keyword: this.data.keyword || "",
          couponId: this.data.couponId || "",
          userAction: item.displayItem.userAction || "",
          traceId: this.data.traceId || "",
        },
        currentPageName,
        prePageName,
        pageId: pageIdFirstPage,
      });
    },
    closeModal() {
      this.triggerEvent("showModal", {
        type: "categoryModal",
        value: false,
      });
    },
    stopBubble() {
      return false;
    },
    resetSubFilter() {
      const { selectItemObj = {}, displayFilterFloor = [] } = this.data;
      selectItemObj.subFilterCount = 0
      selectItemObj.itemList.forEach((item) => {
        item.status = false;
      });
      let newSelectSubItemList = [];
      displayFilterFloor.forEach((item) => {
        if (selectItemObj.filterType != item.filterType) {
          if (item.nodeType == 2 && item.itemList.length) {
            const { itemList = [] } = item;
            itemList.forEach((i) => {
              if (i.status) {
                newSelectSubItemList.push(i);
              }
            });
          } else {
            if (item.status) {
              newSelectSubItemList.push(item.displayItem);
            }
          }
        } else {
          const { itemList = [] } = item;
          item.subFilterCount = 0
          itemList.forEach((i) => {
            i.status = false;
          });
        }
      });
      this.setData({
        selectItemObj,
        selectSubItemList: newSelectSubItemList,
      });
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "clickReset",
        click_par: {
          bizType: selectItemObj.bizType || "",
          filterName: selectItemObj.filterName || "",
          element: "displayFilter",
          keyword: this.data.keyword || "",
          couponId: this.data.couponId || "",
          traceId: this.data.traceId || "",
        },
        currentPageName,
        prePageName,
        pageId: pageIdFirstPage,
      });
    },
    confirmSubFilter() {
      const { displayFilterFloor } = this.data;
      let newSelectSubItemList = [];
      displayFilterFloor.forEach((item) => {
        if (item.nodeType == 2 && item.itemList.length) {
          const { itemList = [] } = item;
          itemList.forEach((i) => {
            if (i.status) {
              newSelectSubItemList.push(i);
            }
          });
        } else {
          if (item.status) {
            newSelectSubItemList.push(item.displayItem);
          }
        }
      });
      this.triggerEvent("onGetGoods", {
        type: "categoryNew",
        data: newSelectSubItemList,
      });
      this.triggerEvent("showModal", {
        type: "categoryModal",
        value: false,
      });
      let { bizType, filterName } = this.data.selectItemObj || {};
      let itemIds = "";
      newSelectSubItemList.forEach((ele) => {
        itemIds += `${ele.itemId},`;
      });

      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "clickConfirm",
        click_par: {
          bizType: bizType || "",
          filterName: filterName || "",
          element: "displayFilter",
          keyword: this.data.keyword || "",
          couponId: this.data.couponId || "",
          itemIds: itemIds || "",
          traceId: this.data.traceId || "",
        },
        currentPageName,
        prePageName,
        pageId: pageIdFirstPage,
      });
    },
    clickSubFilter(e) {
      const {
        dataset: { item = {}, index },
      } = e.currentTarget;
      const { displayFilterFloor, selectItemObj } = this.data;
      const status = item.status;
      if (status) {
        displayFilterFloor.forEach((i) => {
          if (i.bizType == selectItemObj.bizType) {
            const { subFilterNameAry = [], subFilterCount = 0 } = i;
            i.subFilterNameAry = subFilterNameAry.filter((e) => {
              return e != item.itemName;
            });
            i.subFilterCount = subFilterCount - 1;
            selectItemObj.subFilterCount = subFilterCount - 1;
            i["itemList"][index].status = false;
          }
        });
      } else {
        if (selectItemObj.subFilterCount >= selectItemObj.multi) {
          wx.showToast({
            title: `最多选择${selectItemObj.multi}个哦`,
            icon: "none",
          });
          return;
        }
        displayFilterFloor.forEach((i) => {
          if (i.bizType == selectItemObj.bizType) {
            const { subFilterNameAry = [], subFilterCount = 0 } = i;
            subFilterNameAry.push(item.itemName);
            i.subFilterNameAry = subFilterNameAry;
            i.subFilterCount = subFilterCount + 1;
            selectItemObj.subFilterCount = subFilterCount + 1;
            i["itemList"][index].status = true;
          }
        });
        item.fatherFilterName = selectItemObj.filterName;
        item.nodeType = selectItemObj.nodeType;
        item.multi = selectItemObj.multi;
      }
      selectItemObj.itemList[index].status = !status;
      this.setData({ selectItemObj, displayFilterFloor });
    },
  },
});
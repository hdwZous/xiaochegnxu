import { clickBuriedV2_ } from "../../../../common/util/BI";
// 共用组件
Component({
  properties: {
    multiDisplayFilterFloor: {
      type: Array,
      value: [],
      observer: function (params) {
        this.setData({ displayFilterFloor: params });
      }
    },
    fatherFilterList: {
      type: Array,
      value: [],
      observer: function (arr) {
        let otherList = [];
        let cateObj = {};
        arr.forEach((pageItem) => {
          if (pageItem.fatherNodeType == 1 || pageItem.filterType == 'virtual') {
            cateObj = pageItem;
          } else {
            otherList.push(pageItem);
          }
        })
        this.setData({
          cateObj,
          selectSubItemList: otherList
        })
      },
    },
    categoryModal: {
      type: Boolean,
      value: false,
    },
    couponId: {
      type: String,
      value: '',
    },
    keyword: {
      type: String,
      value: '',
    },
    pageId: {
      type: String,
      value: ''
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    }
  },
  data: {
    scrollLeft: 0,
    selectItemObj: {},
    selectSubItemList: [],
    subFilterScrollHeight: 0,
    displayFilterFloor: [],
    cateObj: {}
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
          selectItem: !categoryModal ? item : this.data.selectItemObj
        });
        const subFilterScrollHeight = ((itemList.length > 12 ? 12 : itemList.length) / 2).toFixed() * 66;
        this.setData({
          selectItemObj: item,
          subFilterScrollHeight
        })
        return
      }
      item.displayItem.nodeType = item.nodeType;
      if (item.status) {
        selectSubItemList = []
      } else {
        selectSubItemList = [item.displayItem]
      }
      this.triggerEvent("onGetGoods", {
        type: "categoryNew",
        data: selectSubItemList,
      });
    },
    closeModal() {
      this.triggerEvent("showModal", {
        type: "categoryModal",
        value: false,
        selectItem: this.data.selectItemObj
      });
    },
    stopBubble() {
      return false
    },
    resetSubFilter() {
      const { selectItemObj = {}, displayFilterFloor = [] } = this.data;
      selectItemObj.itemList.forEach((item) => {
        item.status = false
      })
      selectItemObj.subFilterCount = 0
      selectItemObj.subFilterIdAry = []
      let newSelectSubItemList = [];
      displayFilterFloor.forEach((item) => {
        if (selectItemObj.filterType != item.filterType) {
          if (item.nodeType == 2 && item.itemList.length) {
            const { itemList = [] } = item;
            itemList.forEach((i) => {
              if (i.status) {
                newSelectSubItemList.push(i)
              }
            })
          } else {
            if (item.status) {
              newSelectSubItemList.push(item.displayItem)
            }
          }
        } else {
          const { itemList = [] } = item;
          itemList.forEach((i) => {
            i.status = false
          })
          item.subFilterCount = 0
        }
      })
      this.setData({
        selectItemObj,
        selectSubItemList: newSelectSubItemList,
      })
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickReset',
        click_par: {
          bizType: selectItemObj.bizType,
          filterName: selectItemObj.filterName,
          element: 'displayFilter',
          couponId: this.data.couponId,
          keyword: this.data.keyword
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
    },
    confirmSubFilter() {
      const { displayFilterFloor } = this.data;
      let newSelectSubItemList = [];
      displayFilterFloor.forEach((item) => {
        if (item.nodeType == 2 && item.itemList.length) {
          const { itemList = [] } = item;
          itemList.forEach((i) => {
            if (i.status) {
              newSelectSubItemList.push(i)
            }
          })
        } else {
          if (item.status) {
            newSelectSubItemList.push(item.displayItem)
          }
        }
      })
      this.triggerEvent("onGetGoods", {
        type: "categoryNew",
        data: newSelectSubItemList,
      });
      this.triggerEvent("showModal", {
        type: "categoryModal",
        value: false,
        selectItem: this.data.selectItemObj
      });

      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickConfirm',
        click_par: {
          bizType: this.data.selectItemObj.bizType,
          filterName: this.data.selectItemObj.filterName,
          itemIds: this.data.selectItemObj.subFilterIdAry ? this.data.selectItemObj.subFilterIdAry.join() : '',
          element: 'displayFilter',
          couponId: this.data.couponId,
          keyword: this.data.keyword
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
    },
    clickSubFilter(e) {
      const { dataset: { item = {}, index } } = e.currentTarget;
      const { displayFilterFloor, selectItemObj } = this.data;
      const status = item.status;
      const subFilterIdAry = selectItemObj.subFilterIdAry || []
      if (status) {
        displayFilterFloor.forEach((i) => {
          if (i.bizType == selectItemObj.bizType) {
            const { subFilterNameAry = [], subFilterCount = 0 } = i;
            i.subFilterNameAry = subFilterNameAry.filter((e) => {
              return e != item.itemName
            });
            selectItemObj.subFilterIdAry = subFilterIdAry.filter(e => {
              return e != item.itemId
            })
            i.subFilterCount = subFilterCount - 1;
            selectItemObj.subFilterCount = subFilterCount - 1;
            i['itemList'][index].status = false;
          }
        })
      } else {
        if (selectItemObj.subFilterCount >= selectItemObj.multi) {
          wx.showToast({
            title: `最多选择${selectItemObj.multi}个哦`,
            icon: "none",
          });
          return
        }
        displayFilterFloor.forEach((i) => {
          if (i.bizType == selectItemObj.bizType) {
            const { subFilterNameAry = [], subFilterCount = 0 } = i;
            subFilterNameAry.push(item.itemName)
            subFilterIdAry.push(item.itemId)
            i.subFilterNameAry = subFilterNameAry;
            i.subFilterCount = subFilterCount + 1;
            selectItemObj.subFilterCount = subFilterCount + 1;
            selectItemObj.subFilterIdAry = subFilterIdAry
            i['itemList'][index].status = true;
          }
        })
        item.fatherFilterName = selectItemObj.filterName;
        item.nodeType = selectItemObj.nodeType;
        item.multi = selectItemObj.multi;
      }
      selectItemObj.itemList[index].status = !status;
      this.setData({ selectItemObj, displayFilterFloor });
    }
  },
});
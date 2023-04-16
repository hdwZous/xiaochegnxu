import { clickBuriedV2_ } from "../../../../../../common/util/BI.js";
let app = getApp();

Component({
  properties: {
    screenShow: {
      type: Boolean,
      value: false,
    },
    fatherFilterList: {
      type: Array,
      value: [],
      observer: function (arr) {
        const { filterFloor } = this.data;
        let cateList,
          otherList = [];
        filterFloor.forEach((item, index) => {
          item.itemList.forEach((subItem) => {
            subItem.status = false;
          });
          if (filterFloor.length == 1) {
            item.firstScreenCount = filterFloor[0].length;
          } else {
            item.firstScreenCount = index > 2 ? 0 : 12;
          }
          item.showAll = false;
          item.selectNames = [];
          item.hasSelectCount = 0;
          arr.forEach((pageItem) => {
            // 匹配之前选中的条件
            if (pageItem.filterType == item.filterType) {
              item.hasSelectCount++;
              item.selectNames.push(pageItem.itemName);
              item.itemList.forEach((subItem) => {
                if (subItem.itemId == pageItem.itemId) {
                  subItem.status = true;
                }
              });
            }
          });
        });
        let filterCount = 0;
        arr.forEach((pageItem) => {
          if (pageItem.filterType != "virtual") {
            filterCount++;
          }
          otherList.push(pageItem);
        });
        this.data.priceFilter.forEach((item) => {
          filterCount++;
        });
        this.setData({
          filterCount,
          cateList: cateList,
          otherfilterList: otherList,
          filterFloor,
        });
      },
    },
    sidebarFilterFloor: {
      type: Object,
      value: {},
      observer: function (arr) {
        let cateList,
          otherList = [];
        arr.forEach((item, index) => {
          // 如筛选层中只有一个筛选条件则默认该筛选条件下的所有筛选项全部展示；
          // 排序大于3的筛选项，其筛选值默认收起，点击展开按钮后展开全部筛选值；
          if (arr.length == 1) {
            item.firstScreenCount = arr[0].length;
          } else {
            item.firstScreenCount = index > 2 ? 0 : 12;
          }
          item.showAll = false;
          item.selectNames = [];
          item.hasSelectCount = 0;
          this.data.fatherFilterList.forEach((pageItem) => {
            // 匹配之前选中的条件
            if (pageItem.filterType == item.filterType) {
              item.hasSelectCount++;
              item.selectNames.push(pageItem.itemName);
              item.itemList.forEach((subItem) => {
                if (subItem.itemId == pageItem.itemId) {
                  subItem.status = true;
                }
              });
            }
          });
        });
        this.data.fatherFilterList.forEach((pageItem) => {
          otherList.push(pageItem);
        });
        this.setData({
          cateList: cateList,
          otherfilterList: otherList,
          filterFloor: arr || [],
        });
      },
    },
    priceFilter: {
      type: Array,
      value: [],
      observer: function (arr = []) {
        if (!(arr && arr.length)) {
          this.setData({
            minValItem: {},
            maxValItem: {},
          });
        }
      },
    },
    capsule: {
      type: Object,
      value: {},
    },
    showSortModal: {
      type: Boolean,
      value: false,
      observer: function (val) {
        this.triggerEvent("onGetZIndex", { isShow: val });
        if (!val) {
          this.setData({
            currentIndex: "",
          });
        }
      },
    },
    storeId: {
      type: String,
      value: "",
    },
    // 当前促销分类
    curPromo: {
      type: Object,
      value: {},
      observer: function (val) {
        this.setData({
          sortType: 0,
        });

        let { pageIdFirstPage, currentPageName, prePageName } =
          this.data.buriedObj || {};
        val.promType &&
          clickBuriedV2_({
            click_id: "selectSort",
            click_par: {
              sortType: "sort_default",
              orderType: this.data.priceType,
              // couponId: "",
              storeId: this.data.storeId || "",
              // promId: val.promId || "",
              promType: val.promType || "",
              sortState: 0,
              // keyword: this.data.keyword || "",
            },
            prePageName,
            currentPageName,
            pageId: pageIdFirstPage || "",
          });
      },
    },
    keyword: {
      type: String,
      value: "",
      observer: function () {
        this.setData({
          sortType: 0,
        });
      },
    },
    sortNodeList: {
      type: Array,
      value: [],
    },
    buriedObj: {
      type: Object,
      value: {},
    },
  },
  data: {
    // 是否是iphoneX
    isIpx: false,
    sortType: "0",
    priceType: "desc", // 价格升序or降序
    filterCount: 0,
    filterFloor: [], //接口下发的所有筛选项
    cateList: [], // 选中的分类
    otherfilterList: [], // 出分类以外选中的
    currentIndex: "",
    minValItem: {},
    maxValItem: {},
  },
  attached() {
    this.setData({
      isIpx: app.globalData.isIpx,
    });
  },
  methods: {
    catchtouchmove() {
      return false;
    },
    clickSort(e) {
      let { sortType } = e.currentTarget.dataset;
      let priceType = this.data.priceType;
      if (sortType == 1) {
        if (priceType == "asc") {
          priceType = "desc";
        } else {
          priceType = "asc";
        }
      }
      this.setData({
        sortType,
        priceType: priceType,
      });
      this.triggerEvent("onGetGoods", {
        type: "sort",
        data: {
          sortType: sortType,
          orderType: priceType,
        },
      });
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "selectSort",
        click_par: {
          sortType:
            sortType == 0
              ? "sort_default"
              : sortType == 1
              ? "sort_price"
              : "sort_sale",
          orderType: priceType,
          storeId: this.data.storeId || "",
          promId: this.data.curPromo.promId || "",
          promType: this.data.curPromo.promType || "",
          keyword: this.data.keyword || "",
        },
        prePageName,
        currentPageName,
        pageId: pageIdFirstPage || "",
      });
    },
    // 点击筛选按钮，展示蒙层并调取接口
    clickFilter() {
      this.triggerEvent("isShowModal", {
        type: "sortModal",
        value: true,
      });
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "clickFilter",
        click_par: {
          storeId: this.data.storeId || "",
          // keyword: this.data.keyword || "",
          promId: this.data.curPromo.promId || "",
          promType: this.data.curPromo.promType || "",
        },
        prePageName,
        currentPageName,
        pageId: pageIdFirstPage || "",
      });
    },
    // 隐藏筛选蒙层
    hideFilter() {
      this.triggerEvent("isShowModal", {
        type: "sortModal",
        value: false,
      });
    },
    // 点击筛选的某个类别
    clickFilterFloor(e) {
      // 当前选中的分类属性，作为筛选商品接口的入参
      let cateList = this.data.cateList || [];
      // 当前选中的其他属性，作为筛选商品接口的入参
      let otherfilterList = this.data.otherfilterList || [];
      let index = e.currentTarget.dataset.index;
      let subIndex = e.currentTarget.dataset.subIndex;
      let item = e.currentTarget.dataset.item || {};
      const { fatherFilterName = "", multi = "" } = e.currentTarget.dataset;
      item.fatherFilterName = fatherFilterName;
      item.nodeType = item.filterType == 1 || item.filterType == 3 ? 1 : 2;
      item.multi = multi;
      let curFilterFloor = this.data.filterFloor[index];
      // 每个属性能选择的个数有限制
      if (
        !item.status &&
        curFilterFloor.multi &&
        curFilterFloor.hasSelectCount >= curFilterFloor.multi
      ) {
        wx.showToast({
          title: `最多选择${curFilterFloor.multi}个哦`,
          icon: "none",
        });
        return;
      }
      curFilterFloor.itemList.forEach((ele, i) => {
        if (subIndex == i) {
          ele.status = !ele.status;
          if (ele.status) {
            // 当前属性已选的个数+1
            curFilterFloor.hasSelectCount++;
            // 当前属性已选的名称
            curFilterFloor.selectNames.push(ele.itemName);
            // 当前属性存到数组中，去请求接口的入参
            otherfilterList.push(item);
          } else {
            curFilterFloor.hasSelectCount--;
            curFilterFloor.selectNames = curFilterFloor.selectNames.filter(
              (name) => {
                return name != ele.itemName;
              }
            );
            otherfilterList = otherfilterList.filter((i) => {
              return i.itemId != ele.itemId;
            });
          }
        }
      });
      this.setData({
        cateList: cateList,
        otherfilterList: otherfilterList,
        [`filterFloor[${index}].selectNames`]: curFilterFloor.selectNames,
        [`filterFloor[${index}].itemList`]: curFilterFloor.itemList,
      });
      // console.log("+++++++++", this.data.cateList);
      // console.log(this.data.otherfilterList);
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "selectTag",
        click_par: {
          storeId: this.data.storeId || "",
          // keyword: this.data.keyword || "",
          promId: this.data.curPromo.promId || "",
          promType: this.data.curPromo.promType || "",
          status: !item.status ? 1 : 0,
          userAction: item.userAction || "",
        },
        prePageName,
        currentPageName,
        pageId: pageIdFirstPage || "",
      });
    },
    // 点击箭头，展开or折叠
    switch(e) {
      let index = e.currentTarget.dataset.index;
      let curFilterFloor = this.data.filterFloor[index];
      this.setData(
        {
          [`filterFloor[${index}].showAll`]: !curFilterFloor.showAll,
        },
        () => {
          // 底部的属性展开后别遮挡，所以需要滑动一下
          if (index >= 3) {
            this.setData({
              currentIndex: index,
            });
          }
        }
      );
    },
    confirm() {
      let filterCount = 0;
      let { cateList = [], otherfilterList = [] } = this.data;
      let filterList = otherfilterList;
      if (cateList && cateList.length) {
        filterList = otherfilterList.concat(cateList);
      }
      const { maxValItem = {}, minValItem = {} } = this.data;
      let priceFilter = [];
      if (minValItem.itemValue) {
        priceFilter.push(minValItem);
        filterCount++;
      }
      if (maxValItem.itemValue) {
        priceFilter.push(maxValItem);
        filterCount++;
      }
      this.triggerEvent("onGetGoods", {
        type: "filter",
        data: {
          otherfilterList: filterList,
          cateList: [],
          priceFilter,
        },
      });
      let timer = setTimeout(() => {
        clearTimeout(timer);
        this.triggerEvent("isShowModal", {
          type: "sortModal",
          value: false,
        });

        let buryFilterList = [];
        filterList.forEach((ele) => {
          if (ele && ele.itemName != "全部") {
            filterCount++;
          }
          if (buryFilterList.length > 0) {
            buryFilterList.forEach((item, i) => {
              if (ele.filterType == item.filterType) {
                buryFilterList[i].itemList.push({
                  itemId: ele.itemId,
                  itemName: ele.itemName,
                });
              } else {
                buryFilterList.push({
                  filterType: ele.filterType,
                  filterName: ele.fatherFilterName,
                  itemList: [
                    {
                      itemId: ele.itemId,
                      itemName: ele.itemName,
                    },
                  ],
                });
              }
            });
          } else {
            buryFilterList.push({
              filterType: ele.filterType,
              filterName: ele.fatherFilterName,
              itemList: [
                {
                  itemId: ele.itemId,
                  itemName: ele.itemName,
                },
              ],
            });
          }
        });
        if (priceFilter.length) {
          buryFilterList.push({
            filterType: priceFilter[0].filterType,
            filterName: "价格区间",
            itemList: [
              {
                itemId: priceFilter[0].itemId,
                itemName: priceFilter[0].itemName,
                itemValue: priceFilter[0].itemValue,
              },
            ],
          });
          if (priceFilter.length > 1) {
            buryFilterList[buryFilterList.length - 1].itemList.push({
              itemId: priceFilter[1].itemId,
              itemName: priceFilter[1].itemName,
              itemValue: priceFilter[1].itemValue,
            });
          }
        }
        this.setData({
          filterCount,
          // showFilter: false,
          totalFilterList: filterList,
        });

        let { pageIdFirstPage, currentPageName, prePageName } =
          this.data.buriedObj || {};
        clickBuriedV2_({
          click_id: "clickConfirm",
          click_par: {
            storeId: this.data.storeId || "",
            keyword: this.data.keyword || "",
            promId: this.data.curPromo.promId || "",
            promType: this.data.curPromo.promType || "",
            element: "filter",
            filterList: buryFilterList || [],
          },
          prePageName,
          currentPageName,
          pageId: pageIdFirstPage || "",
        });
      }, 0);
    },
    reset() {
      this.data.filterFloor.forEach((item) => {
        // 如果当前有选中的属相，则遍历当前属性下的itemList
        if (item.selectNames) {
          // item.selectNames = "";
          item.selectNames = [];
          item.hasSelectCount = 0;
          item.itemList.forEach((subItem) => {
            if (subItem.status) {
              subItem.status = false;
            }
          });
        }
      });
      this.setData({
        filterFloor: this.data.filterFloor,
        cateList: [],
        otherfilterList: [],
        minValItem: {},
        maxValItem: {},
      });

      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "clickReset",
        click_par: {
          storeId: this.data.storeId || "",
          // keyword: this.data.keyword || "",
          promId: this.data.curPromo.promId || "",
          promType: this.data.curPromo.promType || "",
          element: "filter",
        },
        prePageName,
        currentPageName,
        pageId: pageIdFirstPage || "",
      });
    },
    priceChange(e) {
      const { item = {}, type } = e.currentTarget.dataset;
      const { value = "" } = e.detail;
      item.itemValue = value;
      if (type == "min") {
        this.setData({ minValItem: item });
      } else {
        this.setData({ maxValItem: item });
      }
    },
    clickPriceFloor(e) {
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      const { item = {} } = e.currentTarget.dataset;
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "selectTag",
        click_par: {
          userAction: item.userAction || "",
          storeId: this.data.storeId,
          // couponId: this.data.couponId,
          promId: this.data.curPromo.promId || "",
          promType: this.data.curPromo.promType || "",
          status: !item.status ? 1 : 0,
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      });
    },
  },
});

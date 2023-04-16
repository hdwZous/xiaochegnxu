import { clickBuriedV2_ } from "../../../../common/util/BI";
let app = getApp()

Component({
  properties: {
    capsule: {
      type: Object,
      value: {},
    },
    // 入参
    couponId: {
      type: String,
      value: "",
    },
    // 入参
    storeId: {
      type: String,
      value: "",
      observer: function (val) {
        // 切换门店后，将排序初始化
        this.setData({
          curValue: 0,
        });
      },
    },
    // 入参
    orgCode: {
      type: String,
      value: "",
    },
    // 如果是self代表是券购搜索结果页，这时不展示筛选按钮
    from: {
      type: String,
      value: "",
    },
    screenShow: {
      type: Boolean,
      value: false,
    },
    fatherFilterList: {
      type: Array,
      value: [],
      observer: function (arr) {
        const { filterFloor } = this.data;
        let cateList, otherList = [];
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
            if (pageItem.itemName == '全部') {
              return
            }
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
        })
        let filterCount = 0
        arr.forEach((pageItem) => {
          if (pageItem.itemName != '全部') {
            filterCount++;
          }
          otherList.push(pageItem);
        })
        this.setData({
          filterCount: filterCount,
          cateList: cateList,
          otherfilterList: otherList,
          filterFloor,
        });
      },
    },
    screen: {
      type: Object,
      value: {},
      observer: function (obj = {}) {
        console.log(obj)
        const displayFilterFloor = obj == null ? '' : obj.displayFilterFloor;
        let cateList, otherList = [];
        displayFilterFloor && displayFilterFloor.length && displayFilterFloor.forEach((item, index) => {
          // 如筛选层中只有一个筛选条件则默认该筛选条件下的所有筛选项全部展示；
          // 排序大于3的筛选项，其筛选值默认收起，点击展开按钮后展开全部筛选值；
          if (displayFilterFloor.length == 1) {
            item.firstScreenCount = displayFilterFloor[0].length;
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
        })
        this.setData({
          cateList: cateList,
          otherfilterList: otherList,
          filterFloor: displayFilterFloor || [],
        });
      }
    },
    sortModal: {
      type: Boolean,
      value: false,
      observer: function (val) {
        this.triggerEvent("onGetZIndex", { isShow: val });
        if (!val) {
          this.setData({
            currentIndex: "",
          });
        }
      }
    },
    keyword: {
      type: String,
      value: ''
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
    // 是否是iphoneX
    isIpx: false,
    sortList: [
      {
        title: "综合排序",
        value: "0",
        text: "sort_default",
      },
      {
        title: "销量",
        value: "1",
        text: "sort_sale",
      },
      {
        title: "价格",
        value: "2",
        text: "sort_price",
      },
    ],
    curValue: "0",
    priceType: false, // 价格升序or降序
    filterCount: 0,
    filterFloor: [], //接口下发的所有筛选项
    cateList: [], // 选中的分类
    otherfilterList: [], // 出分类以外选中的
    currentIndex: '',
    minValItem: {},
    maxValItem: {}
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
      let { sortType, sortText, couponId = '', storeId = '' } = e.currentTarget.dataset;
      let priceType = this.data.priceType;
      let type = sortType;
      if (sortType == 2 || sortType == 3) {
        priceType = !priceType;
        type = priceType ? 2 : 3;
      }
      this.setData({
        curValue: type,
        priceType: priceType,
      });
      const orderType = priceType ? 'asc' : 'desc';

      this.triggerEvent("onGetGoods", {
        type: "sort",
        data: {
          sortType: sortText,
          priceType,
          orderType
        },
      });

      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'selectSort',
        click_par: {
          sortType: sortText,
          orderType: sortType == 2 ? orderType : 'desc',
          storeId,
          couponId
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    // 点击筛选按钮，展示蒙层并调取接口
    clickFilter() {
      this.triggerEvent("showModal", {
        type: "sortModal",
        value: true
      });

      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickFilter',
        click_par: {
          storeId: this.data.storeId,
          couponId: this.data.couponId
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    // 隐藏筛选蒙层
    hideFilter() {
      // 仅是隐藏筛选蒙层，并没有点击查看去请求时，应将筛选条件重置为当前筛选的状态
      this.triggerEvent("showModal", {
        type: "sortModal",
        value: false
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
      let userAction = e.currentTarget.dataset.userAction || ''
      const { fatherFilterName = '', multi = '' } = e.currentTarget.dataset;
      item.fatherFilterName = fatherFilterName;
      item.nodeType = (item.filterType == 1 || item.filterType == 3) ? 1 : 2;
      item.multi = multi;
      let curFilterFloor = JSON.parse(JSON.stringify(this.data.filterFloor[index]));
      if (
        !item.status && curFilterFloor.multi &&
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
            if (!curFilterFloor.selectNames) {
              curFilterFloor.selectNames = [];
            }
            // 当前属性已选的名称
            curFilterFloor.selectNames.push(ele.itemName);
            // 当前属性存到数组中，去请求接口的入参
            otherfilterList.push(item);
          } else {
            curFilterFloor.hasSelectCount--;
            curFilterFloor.selectNames = curFilterFloor.selectNames.filter((name) => {
              return name != ele.itemName
            })
            otherfilterList = otherfilterList.filter((i) => {
              return i.itemId != ele.itemId
            })
          }
        }
      });
      this.setData({
        cateList: cateList,
        otherfilterList: otherfilterList,
        [`filterFloor[${index}]`]: curFilterFloor
        // [`filterFloor[${index}].selectNames`]: curFilterFloor.selectNames,
        // [`filterFloor[${index}].itemList`]: curFilterFloor.itemList,
      });

      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'selectTag',
        click_par: {
          userAction,
          storeId: this.data.storeId,
          couponId: this.data.couponId
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      // console.log("+++++++++", this.data.cateList);
      // console.log(this.data.otherfilterList);
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
      let { cateList = [], otherfilterList = [] } = this.data;
      let filterList = otherfilterList;
      if (cateList && cateList.length) {
        filterList = otherfilterList.concat(cateList)
      }
      const { maxValItem = {}, minValItem = {} } = this.data;
      let priceFilter = []
      if (minValItem.itemValue) {
        priceFilter.push(minValItem)
      }
      if (maxValItem.itemValue) {
        priceFilter.push(maxValItem)
      }
      this.triggerEvent("onGetGoods", {
        type: "filter",
        data: {
          otherfilterList: filterList,
          cateList: [],
          priceFilter
        },
      });
      let timer = setTimeout(() => {
        clearTimeout(timer);
        this.triggerEvent("showModal", {
          type: "sortModal",
          value: false
        });
        let filterCount = 0;
        filterList.forEach((pageItem) => {
          if (pageItem && pageItem.itemName != '全部') {
            filterCount++;
          }
        })
        this.setData({
          filterCount,
          totalFilterList: filterList,
        });
      }, 0);
      // 埋点
      this.confirmBuried(filterList, priceFilter)
    },
    reset() {
      let filterFloor = JSON.parse(JSON.stringify(this.data.filterFloor)) 
      filterFloor.forEach((item, index) => {
        // 如果当前有选中的属相，则遍历当前属性下的itemList
        if (item.selectNames) {
          item.selectNames = "";
          item.hasSelectCount = 0;
          item.itemList.forEach((subItem) => {
            if (subItem.status) {
              subItem.status = false;
            }
          });
        }
      });
      this.setData({
        filterFloor: filterFloor,
        cateList: [],
        otherfilterList: [],
        minValItem: {},
        maxValItem: {}
      });
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickReset',
        click_par: {
          storeId: this.data.storeId,
          couponId: this.data.couponId,
          element: 'filter'
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    priceChange(e) {
      const { item = {}, type } = e.currentTarget.dataset;
      const { value = '' } = e.detail;
      item.itemValue = value;
      if (type == 'min') {
        this.setData({ minValItem: item })
      } else {
        this.setData({ maxValItem: item })
      }
    },
    confirmBuried(filterList, priceFilter) {
      let buriedList = []
      if (priceFilter.length) {
        let itemList = []
        priceFilter.forEach(item => {
          itemList.push({
            itemName: item.itemName,
            itemId: item.itemId,
            itemValue: item.itemValue
          })
        })
        buriedList.push({
          bizType: priceFilter[0].bizType,
          filterName: '价格区间',
          itemList
        })
      }
      if (filterList.length) {
        filterList.forEach(item => {
          let ids = buriedList.findIndex(e => {
            return e.filterName == item.fatherFilterName
          })
          if (ids == -1) {
            buriedList.push({
              bizType: item.bizType,
              filterName: item.fatherFilterName,
              itemList: [{
                itemName: item.itemName,
                itemId: item.itemId,
                itemValue: item.itemValue
              }]
            })
          } else {
            buriedList[ids].itemList.push({
              itemName: item.itemName,
              itemId: item.itemId,
              itemValue: item.itemValue
            })
          }
        })
      }
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickConfirm',
        click_par: {
          filterList: buriedList,
          element: 'filter',
          storeId: this.data.storeId,
          couponId: this.data.couponId,
          keyword: this.data.keyword
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    }
  },
});
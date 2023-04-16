import { clickBuriedV2_ } from '../../../../common/util/BI';
// 共用组件
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  lazyObj: {
    epSelector: ".filter-items"
  },
  properties: {
    isShowFilter: {
      type: Boolean,
      value: false,
      observer: function () {
        // this.setData({
        //   refresh: true,
        // });
      }
    },
    traceId: {
      type: String,
      value: ''
    },
    searchFilterList: {
      type: Array,
      value: [],
      observer: function (arr) {
        if (arr.length == 0) return;
        arr.forEach((item, index) => {
          // 如筛选层中只有一个筛选条件则默认该筛选条件下的所有筛选项全部展示；
          // 排序大于3的筛选项，其筛选值默认收起，点击展开按钮后展开全部筛选值；
          if (arr.length == 1) {
            item.firstScreen = arr[0].length;
          } else {
            item.firstScreen = index > 2 ? 0 : 12;
          }
          item.showAll = false;
          item.selectNames = [];
          item.hasSelectCount = 0;
          this.data.fatherFilterList.forEach((pageItem) => {
            // 匹配之前选中的条件
            if (pageItem.bizType == item.bizType) {
              item.itemList.forEach((subItem) => {
                if (subItem.itemId == pageItem.itemId) {
                  item.hasSelectCount++;
                  item.selectNames.push(pageItem.itemName);
                  subItem.status = true;
                }
              });
            }
          });
        });
        this.setData({
          filterFloor: JSON.parse(JSON.stringify(arr)),
        });
      },
    },
    // 多门店搜索的门店id
    storeId: {
      type: String,
      value: "",
      observer: function (newVal, oldVal) {
        if (newVal != oldVal) {
          this.triggerEvent("showModal", {
            type: "otherSortModal",
            value: false
          });
          this.setData({
            refresh: false,
            curValue: "sort_default",
            priceSortType: false,
            filterCount: this.data.fatherFilterList.length || 0,
            cateList: [],
            otherfilterList: [],
            curSortIndex: 0,
            sortList: this.data.sortNodeList,
            subList: (this.data.sortNodeList && this.data.sortNodeList[0] && this.data.sortNodeList[0].subList) || [],
          }, () => {
            this.setData({
              refresh: true,
            });
          });
        }
      },
    },
    // 缓存的筛选条件
    fatherFilterList: {
      type: Array,
      value: [],
      observer: function (arr) {
        let cateList = [], // 分类属性（单选）
          otherList = [],
          count = 0; // 品牌、规格、包装等其他属性（多选）
        arr.forEach((pageItem) => {
          if (pageItem.filterType == 1 || pageItem.filterType == 3) {
            cateList = [pageItem];
            count++;
          } else {
            if(pageItem.bizType !='price'){
              count++
            }
            otherList.push(pageItem);
          }
        });
        this.setData({
          cateList: cateList,
          otherfilterList: otherList,
          filterCount: count, // 已选的数量
        });
      },
    },
    // 排序选项
    sortNodeList: {
      type: Array,
      value: [],
    },
    sortModal: {
      type: Boolean,
      value: false,
      observer: function (val) {
        this.triggerEvent("clickChangeZIndex", {
          type: val ? "zIndexSort" : "zIndexHide",
        });
      }
    },
    modalTabType:{
      type: String,
      value:'sortModal'
    },
    otherSortModalTabType:{
      type: String,
      value:'otherSortModal'
    },
    otherSortModal: {
      type: Boolean,
      value: false
    },
    searchKey: {
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
    },
    tabType: {
      type: Number,
      value: -1
    }
  },
  flag: false,
  data: {
    refresh: true, // 为了解决筛选按钮，展示和不展示来回切换时，导致排序这四个按钮排列的样式错误，因为数据无变化，UI不会重新渲染，导致布局错乱
    isIpx: false, // 是否是iphoneX
    priceSortType: false, // 降序
    curValue: "sort_default",
    sortList: [],
    filterFloor: [],
    isShow: false, //是否显示mask
    filterCount: 0, // 选中的个数
    cateList: [], // 选择的分类属性
    otherfilterList: [], // 选择的其他属性
    curSortIndex: 0, // 当前选中排序的下标
    subList: [], // 综合排序下的排序
    currentIndex: "", // 筛选弹层中当前属性
    minPriceValue: '',
    maxPriceValue: ''
  },

  observers: {
    isShow: function (val) {
      // 弹层关闭，将滚动条重置为0
      if (!val) {
        this.setData({
          currentIndex: "",
        });
      }
      this.triggerEvent("clickChangeZIndex", {
        type: val ? "zIndexSort" : "zIndexHide",
      });
    },
    sortNodeList: function (val) {
      if (val.length && !this.flag) {
        this.flag = true;
        this.setData({
          sortList: val,
          subList: val[0].subList || [],
        });
      }
    },
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
      let item = e.currentTarget.dataset.item;
      let index = e.currentTarget.id;
      let {otherSortModalTabType='otherSortModal'} = this.data;
      // 综合排序
      if (index == 0) {
        // 综合排序下如有细分的排序，则展示细分排序的弹层，不请求接口
        // 如果没有细分排序，点击就请求接口
        if (!item.subList || item.subList.length == 0) {
          // 避免重复请求
          if (index != this.data.curSortIndex) {
            this.triggerEvent("getGoodList", {
              type: "sort",
              data: {
                sortType: item.sortType,
                orderType: "",
              },
            });
            // 埋点
            let click_par = {
              sortType: item.sortType,
              orderType: this.data.priceSortType ? "asc" : "desc",
              keyword: this.data.searchKey,
              storeId: this.data.storeId,
              traceId: this.data.traceId
            }
            if(this.data.tabType > -1) {
              click_par.tabType = this.data.tabType
            }
            clickBuriedV2_({
              create_time: new Date(),
              click_id: 'selectSort',
              click_par: click_par,
              currentPageName: this.data.currentPageName,
              prePageName: this.data.prePageName,
              pageId: this.data.pageId
            })
          }
        }
        const { otherSortModal } = this.data;
        this.triggerEvent("showModal", {
          type: otherSortModalTabType,
          value: !otherSortModal
        });
        if (this.data.curSortIndex != 0) {
          this.setData({
            curValue: "sort_default",
            curSortIndex: index,
          });
        }
      } else {
        // 避免重复请求
        if (index == this.data.curSortIndex && item.sortType != "sort_price") {
          return;
        }
        this.triggerEvent("showModal", {
          type: otherSortModalTabType,
          value: false
        });
        this.setData({
          priceSortType: item.doubleOrder ? !this.data.priceSortType : false,
          curSortIndex: index,
          curValue: item.sortType,
          [`sortList[0]`]: this.data.sortNodeList[0],
        });
        this.triggerEvent("getGoodList", {
          type: "sort",
          data: {
            sortType: item.sortType,
            orderType: this.data.priceSortType ? "asc" : "desc",
          },
        });
        // 埋点
        let click_par = {
          sortType: item.sortType,
          orderType: this.data.priceSortType ? "asc" : "desc",
          keyword: this.data.searchKey,
          storeId: this.data.storeId,
          traceId: this.data.traceId
        }
        if(this.data.tabType > -1) {
          click_par.tabType = this.data.tabType
        }
        clickBuriedV2_({
          create_time: new Date(),
          click_id: 'selectSort',
          click_par,
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId
        })
      }
    },
    // 点击排序弹层
    clickPopSort(e) {
      let item = e.currentTarget.dataset.item;
      let {otherSortModalTabType = 'otherSortModal'} = this.data;
      this.triggerEvent("showModal", {
        type: otherSortModalTabType,
        value: false
      });
      this.setData(
        {
          priceSortType: item.doubleOrder ? !this.data.priceSortType : false,
          [`sortList[0]`]: {
            subList: this.data.subList,
            ...item,
          },
        },
        () => {
          this.setData({
            curValue: item.sortType,
          });
        }
      );

      // 埋点
      let click_par = {
        sortType: item.sortType,
        orderType: this.data.priceSortType ? "asc" : "desc",
        keyword: this.data.searchKey,
        storeId: this.data.storeId,
        traceId: this.data.traceId
      }
      if(this.data.tabType > -1) {
        click_par.tabType = this.data.tabType
      }
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'selectSort',
        click_par,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })

      this.triggerEvent("getGoodList", {
        type: "sortPop",
        data: {
          sortType: item.sortType,
          orderType: this.data.priceSortType ? "asc" : "desc",
        },
      });
    },
    // 隐藏其他排序选项
    hideOtherSortPop() {
      let {otherSortModalTabType = 'otherSortModal'} = this.data;
      this.triggerEvent("showModal", {
        type: otherSortModalTabType,
        value: false
      });
    },
    showFilter() {
      let {modalTabType = 'showModal'} = this.data;
      this.triggerEvent("showModal", {
        type: modalTabType,
        value: true
      });
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickFilter',
        click_par: {
          storeId: this.data.storeId,
          keyword: this.data.searchKey,
          traceId: this.data.traceId
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
    },
    hideFilter() {
      let {modalTabType = 'showModal'} = this.data;
      let cateList = [],
        otherList = [];
      let searchFilterList = this.data.searchFilterList || [];

      searchFilterList.forEach((item) => {
        item.showAll = false;
        item.selectNames = [];
        item.hasSelectCount = 0;
        this.data.fatherFilterList.forEach((pageItem) => {
          // 匹配之前选中的条件
          if (pageItem.filterType == item.filterType) {
            item.itemList.forEach((subItem) => {
              if (subItem.itemId == pageItem.itemId) {
                item.hasSelectCount++;
                item.selectNames.push(pageItem.itemName);
                subItem.status = true;
              }
            });
          }

          if (pageItem.filterType == 1 || pageItem.filterType == 3) {
            cateList = [pageItem];
          } else {
            otherList.push(pageItem);
          }
        });
      });
      this.triggerEvent("showModal", {
        type: modalTabType,
        value: false
      });
      this.setData({
        filterFloor: JSON.parse(JSON.stringify(searchFilterList)),
        cateList: cateList,
        otherfilterList: otherList,
        filterCount: this.data.fatherFilterList.length,
        isShow: false,
      });
    },
    // 点击箭头，展开or折叠
    switch(e) {
      let index = e.currentTarget.dataset.index;
      let curFilterFloor = this.data.filterFloor[index];
      this.setData(
        {
          [`filterFloor[${index}].showAll`]: !curFilterFloor.showAll,
        }, () => {
          // 底部的属性展开后别遮挡，所以需要滑动一下
          if (index >= 3) {
            this.setData({
              currentIndex: index,
            });
          }
        }
      );
    },
    reset() {
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickReset',
        click_par: {
          storeId: this.data.storeId,
          keyword: this.data.searchKey,
          element: 'filter'
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
      this.data.filterFloor.forEach((item) => {
        // 如果当前有选中的属相，则遍历当前属性下的itemList
        if (item.selectNames.length) {
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
        minPriceValue: '',
        maxPriceValue: ''
      });
    },
    confirm() {
      let {modalTabType='showModal'}=this.data;
      this.triggerEvent("getGoodList", {
        type: "filter",
        data: {
          otherfilterList: this.data.otherfilterList,
          cateList: this.data.cateList,
        },
      });
      this.triggerEvent("showModal", {
        type: modalTabType,
        value: false
      });
      this.setData({
        isShow: false,
        totalFilerList: this.data.cateList.concat(this.data.otherfilterList),
      },() => {
        let buryFilterList = [];
        let buryCate = []
        if (this.data.cateList.length) {
          buryCate = [
            {
              filterType: this.data.cateList[0].filterType,
              filterName: this.data.cateList[0].filterName,
              itemList: [
                {
                  itemId: this.data.cateList[0].itemId,
                  itemName: this.data.cateList[0].itemName,
                },
              ],
            },
          ];
        }
        this.data.otherfilterList.forEach((ele) => {
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
        
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "clickConfirm",
          click_par: {
            storeId: this.data.storeId,
            keyword: this.data.searchKey,
            element: "filter",
            filterList: buryCate.concat(buryFilterList),
          },
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId
        });
      });
      // 埋点
      const filterList = []
      this.data.filterFloor.forEach(val => {
        const itemList = []
        val.itemList.forEach(v => {
          const item = {
            itemId: v.itemId,
            itemName: v.itemName
          }
          const pricemap = [this.data.minPriceValue, this.data.maxPriceValue]
          if (v.filterType == 'price') {
            item.itemValue = pricemap[v.itemId];
            itemList.push(item);
          }

          v.status && itemList.push(item);
        })
        // console.log('itemList', itemList);

        itemList.length && filterList.push({
          filterName: val.filterName,
          itemList
        });
      })
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
      const { fatherFilterName = '', multi = '' } = e.currentTarget.dataset;
      item.fatherFilterName = fatherFilterName;
      item.multi = multi;
      item.nodeType = (item.filterType == 1 || item.filterType == 3) ? 1 : 2;
      let curFilterFloor = this.data.filterFloor[index];
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'selectTag',
        click_par: {
          userAction: item.userAction,
          storeId: this.data.storeId,
          keyword: this.data.searchKey,
          element: 'filter',
          status: item.status ? 0 : 1
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })

      // 分类是单选，其他多选
      if (multi == 1) {
        curFilterFloor.itemList.forEach((ele, i) => {
          if (subIndex == i) {
            ele.status = !ele.status;
            curFilterFloor.selectNames = ele.status ? [ele.itemName] : [];
            ele.fatherFilterName = fatherFilterName;
            ele.multi = multi;
            ele.nodeType = (ele.filterType == 1 || ele.filterType == 3) ? 1 : 2;
            cateList = ele.status ? [ele] : [];
          } else {
            ele.status = false;
          }
        });
      } else {
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
              curFilterFloor.hasSelectCount++; // 当前属性已选的个数+1
              curFilterFloor.selectNames.push(ele.itemName); // 当前属性已选的名称
              otherfilterList.push(item); // 当前属性存到数组中，去请求接口的入参
            } else {
              curFilterFloor.hasSelectCount--;
              curFilterFloor.selectNames.some((name, j) => {
                if (name == ele.itemName) {
                  curFilterFloor.selectNames.splice(j, 1);
                }
              });
              // 点击已经选中的则要反选，将入参从数组中删除, 当前属性已选的名称删除
              otherfilterList.some((obj, j) => {
                if (obj.itemId == ele.itemId) {
                  otherfilterList.splice(j, 1);
                }
              });
            }
          }
        });
      }
      this.setData({
        cateList: cateList,
        otherfilterList: otherfilterList,
        [`filterFloor[${index}].selectNames`]: curFilterFloor.selectNames,
        [`filterFloor[${index}].itemList`]: curFilterFloor.itemList,
      });
    },
    clickPriceFloor(e) {
      const { item = {}, num = '' } = e.currentTarget.dataset;
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'selectTag',
        click_par: {
          userAction: item.userAction,
          keyword: this.data.searchKey,
          element: 'filter',
          storeId: this.data.storeId,
          status: 1,
          type: num
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
    },
    priceChange(e) {
      const { item = {}, type, father } = e.currentTarget.dataset;
      const { value = '' } = e.detail;
      item.fatherFilterName = father;
      item.nodeType = (item.filterType == 1 || item.filterType == 3) ? 1 : 2;
      item.itemValue = value;

      this.data.otherfilterList.forEach((val, index) => {
        if (val.itemId == item.itemId) {
          let keyPrice = 'otherfilterList[' + index + ']'
          val.filterType == 'price' && (item.itemValue = value)
          this.setData({ [keyPrice]: item })
        }
      })
      if (type == 'min') {
        this.setData({ minPriceValue: value })
      } else {
        this.setData({ maxPriceValue: value })
      }
      if (!this.data.otherfilterList.some(val => val.itemId == item.itemId)) {
        this.data.otherfilterList.push(item)
      }
    }
  },
});
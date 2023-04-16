import { clickBuriedV2_ } from '../../../../common/util/BI';
// 共用组件
Component({
  lazyObj: {
    epSelector: '.ep_search_filternew_item'
  },
  properties: {
    multiDisplayFilterFloor: {
      type: Array,
      value: [],
      observer: function (params) {
        this.setData({ displayFilterFloor: params })
      }
    },
    fatherFilterList: {
      type: Array,
      value: [],
      observer: function (arr) {
        this.setData({
          selectSubItemList: arr,
        })
      },
    },
    categoryModal: {
      type: Boolean,
      value: false
    },
    storeId: {
      type: String,
      value: ''
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
    traceId: {
      type: String,
      value: ''
    },
    fromSource: {
      type: String,
      value: '',
      observer: function (val) {
        console.log('---fromSource------',val)
      },
    },
    modalTabType:{
      type: String,
      value:'categoryModal'
    },
  },
  data: {
    scrollLeft: 0,
    selectFilterIdx: -1,
    selectItemObj: {},
    selectSubItemList: [],
    subFilterScrollHeight: 0,
    displayFilterFloor: [],
    cateObj: {},
  },
  methods: {
    clickCatogory(e) {
      const item = e.currentTarget.dataset.item;
      const { itemList = [] } = item;
      let { selectItemObj = {}, selectSubItemList = [] } = this.data;
      if (item.itemList && item.itemList.length > 0) {
        clickBuriedV2_({
          create_time: new Date(),
          click_id: 'unfoldDisplayFilter',
          click_par: {
            bizType: item.bizType,
            filterName: item.filterName,
            status: this.data.categoryModal ? 0 : 1
          },
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId
        })
      } else {
        if(this.data.fromSource == 'fromSource'){
          clickBuriedV2_({
            create_time: new Date(),
            click_id: 'selectCateTag',
            click_par: {
              userAction: item.displayItem && item.displayItem.userAction,
              storeId: this.data.storeId,
              keyword: this.data.searchKey,
              element: 'displayFilter',
              status: item.status ? 0 : 1
            },
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName,
            pageId: this.data.pageId
          })
        }else{
          clickBuriedV2_({
            create_time: new Date(),
            click_id: 'selectCateTag',
            click_par: {
              userAction: item.displayItem && item.displayItem.userAction,
              itemId: item.displayItem && item.displayItem.itemId,
              itemName: item.displayItem && item.displayItem.itemName,
              status: item.status ? 0 : 1
            },
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName,
            pageId: this.data.pageId
          })
        }
       
      }
      if (itemList.length && item.nodeType == 2) {
        const subFilterScrollHeight = ((itemList.length > 12 ? 12 : itemList.length) / 2).toFixed() * 66;
        this.setData({
          selectItemObj: item,
          subFilterScrollHeight
        })
        const { categoryModal, modalTabType = 'categoryModal' } = this.data;
        if (selectItemObj.filterType == item.filterType) {
          this.triggerEvent("showModal", {
            type: modalTabType,
            value: !categoryModal
          });
          return
        }
        this.triggerEvent("showModal", {
          type: modalTabType,
          value: true
        });
        return
      }
      this.triggerEvent("buryClick", item);
      item.displayItem.nodeType = item.nodeType;
      if (item.status) {
        selectSubItemList = selectSubItemList.filter((i) => {
          return i.itemId != item.displayItem.itemId
        })
      } else {
        // selectSubItemList = selectSubItemList.filter((i) => {
        //     return i.nodeType != 1
        // })
        // TODO:区分 不同类型的数据逻辑

        // let bizTypeList = selectSubItemList.filter((i) => {
        //   return i.bizType == item.bizType;
        // })

        let selectSubItemListInit = [], bizTypeList = [];
        for (let i = 0; i < selectSubItemList.length; i++) {
          let ele = selectSubItemList[i];
          if (ele.bizType != item.bizType) {
            selectSubItemListInit.push(ele)
          } else {
            bizTypeList.push(ele)
          }
        }

        if (bizTypeList.length > 0 && item.multi > 1) {
          bizTypeList.push(item.displayItem)
        } else {
          bizTypeList = [item.displayItem];
        }
        selectSubItemList = bizTypeList.concat(selectSubItemListInit)
      }
      this.triggerEvent("getGoodList", {
        type: "categoryNew",
        data: selectSubItemList,
      });
    },
    closeModal() {
      let {modalTabType ='categoryModal'} = this.data;
      this.triggerEvent("showModal", {
        type: modalTabType,
        value: false
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
      let newSelectSubItemList = [];
      displayFilterFloor.forEach((item) => {
        if (selectItemObj.bizType != item.bizType) {
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
        }
      })

      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickReset',
        click_par: {
          bizType: this.data.selectItemObj.bizType,
          filterName: this.data.selectItemObj.filterName,
          element: "displayFilter"
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
      this.setData({
        selectItemObj,
        selectSubItemList: newSelectSubItemList,
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
      // 处理价格
      this.data.fatherFilterList.forEach(val => {
        if (val.bizType == 'price' && val.itemValue) newSelectSubItemList.push(val)
      })
      let buriedItemList = []
      for (let i = 0; i < newSelectSubItemList.length; i++) {
        buriedItemList.push(newSelectSubItemList[i].itemId)
      }
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickConfirm',
        click_par: {
          bizType: this.data.selectItemObj.bizType,
          filterName: this.data.selectItemObj.filterName,
          itemIds: String(buriedItemList),
          element: "displayFilter"
        }
      })
      let {modalTabType ='categoryModal'} = this.data;
      this.triggerEvent("getGoodList", {
        type: "categoryNew",
        data: newSelectSubItemList,
      });
      this.triggerEvent("showModal", {
        type: modalTabType,
        value: false
      });
    },
    clickSubFilter(e) {
      const { dataset: { item = {}, index } } = e.currentTarget;
      const { displayFilterFloor, selectItemObj } = this.data;
      const status = item.status;
      if (status) {
        displayFilterFloor.forEach((i) => {
          if (i.bizType == selectItemObj.bizType) {
            const { subFilterNameAry = [], subFilterCount = 0 } = i;

            // console.log('subFilterNameAry', subFilterNameAry, i);
            i.subFilterNameAry = subFilterNameAry.filter((e) => {
              return e != item.itemName
            });
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
            i.subFilterNameAry = subFilterNameAry;
            i.subFilterCount = subFilterCount + 1;
            selectItemObj.subFilterCount = subFilterCount + 1;
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
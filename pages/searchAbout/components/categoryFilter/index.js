import { clickBuriedV2_ } from '../../../../common/util/BI';
// 共用组件
Component({
  properties: {
    displayFilterFloor: {
      type: Object,
      value: {},
    },
    fatherFilterList: {
      type: Array,
      value: [],
      observer: function (arr) {
        let itemId = ''
        arr.forEach((pageItem) => {
          if (pageItem.filterType == 1 || pageItem.filterType == 3) {
            itemId = `_${pageItem.itemId}`
          }
        });
        if (itemId) {
          this.setData({
            itemId
          })
        } else {
          this.setData({
            scrollLeft: 0,
            itemId
          })
        }
      },
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
    }
  },
  data: {
    scrollLeft: 0,
    itemId: "_",
  },
  methods: {
    clickCatogory(e) {
      let item = e.currentTarget.dataset.item;
      if (this.data.itemId == `_${item.itemId}`) {
        return
      }
      this.setData({
        itemId: `_${item.itemId}`,
      });
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'selectCateTag',
        click_par: {
          userAction: item.userAction,
          keyword: this.data.searchKey,
          storeId: this.data.storeId,
          element: 'filter',
          status: 1
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
      this.triggerEvent("buryClick", item);
      this.triggerEvent("getGoodList", {
        type: "category",
        data: item,
      });
    },
  },
});
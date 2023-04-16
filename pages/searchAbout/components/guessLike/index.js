import { djCmsJump } from "../../../../common/util/agreementV2";
import { clickBuriedV2_ } from "../../../../common/util/BI";
// 全局搜索
Component({
  lazyObj: {
    epSelector: ".guess-like-wrapper .guess-item-ep"
  },
  options: {
    addGlobalClass: true
  },
  properties: {
    guessLike: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val && val.itemList && val.itemList.length > 0) {
          val.itemList.slice(0, 4 * (val.itemList.length % 4))
          this.setData({
            list: val.itemList
          })
          if (val.filterType == 3 || val.filterType == 4 || val.filterType == 1) {
            this.epSection && this.epSection();
          }
        }
      }
    },
    traceId: {
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
    recommendObj: {
      type: Object,
      value: {}
    }
  },
  data: {
    list: [],
    curGuessIndex: null
  },
  methods: {
    clickStoreListItem(e) {
      let { params = {}, to = '', userAction = '' } = e.currentTarget.dataset.item || {};
      let { recommendObj, traceId } = this.data;
      djCmsJump({
        to,
        params,
        userAction,
        traceId: traceId,
        preObj: recommendObj,
        buried_postion: "searchAbout-guessLike"
      })
      let { standardCatIds, catIds, brandIds } = e.currentTarget.dataset.item;
      clickBuriedV2_({
        click_id: "click_guess_class_filter",
        click_par: {
          standardCatIds,
          catIds,
          brandIds,
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      });
    },
    clickGuessLike(e) {
      let item = e.currentTarget.dataset.item
      // 点击猜你喜欢，就要把猜你喜欢隐藏，参数自动回显到品类筛选和筛选项中
      // let params = { isShowGuess: false };
      this.triggerEvent('getGoodList', {
        type: 'guessLike',
        data: item
      }, { composed: true, bubbles: true })
      let {standardCatIds, catIds, brandIds}  = item;
      clickBuriedV2_({
        click_id: "click_guess_class_filter",
        click_par: {
          standardCatIds,
          catIds,
          brandIds,
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      });
      clickBuriedV2_({
        click_id: "ClickSearchInsertFilter",
        click_par: {
          itemName: item.itemName,
          userAction: item.userAction
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      });
    }
  }
})
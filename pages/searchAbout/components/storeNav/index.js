// 全局搜索
import { clickBuriedV2_ } from "../../../../common/util/BI"
Component({
  /**
   * 组件的属性列表
   */
  lazyObj: {
    epSelector: ".nav-item"
  },
  options: {
    addGlobalClass: true
  },
  properties: {
    navList: {
      type: Array,
      value: []
    },
    storeImgLazyLoad: {
      type: Object,
      value: {}
    },
    storeCount: {
      type: String,
      value: ''
    },
    storeModal: {
      type: Boolean,
      value: false
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
    modalTabType:{
      type: String,
      value:'storeModal'
    },
  },
  data: {
    curNav: 'nav0',
    navScrollLeft: 0
  },
  methods: {
    clickNav(e) {
      let { id = '', dataset = {} } = e.currentTarget || {};
      let { item = {}, layer = false } = dataset
      let {modalTabType='storeModal'} = this.data;
      if (this.data.curNav == id) {
        this.triggerEvent("showModal", {
          type: modalTabType,
          value: false
        });
        return false
      }
      this.triggerEvent("showModal", {
        type: modalTabType,
        value: false
      });
      this.setData({
        curNav: id,
        navScrollLeft: id
      })
      this.triggerEvent('getGoodList', {
        type: 'storeNav',
        data: dataset.item
      })
      console.log(dataset.item,id, '-------')
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'selectTab',
        click_par: {
          userAction: item.userAction,
          isStore: (item.title == "全部" || !item.storeId) ? 0 : 1,
          tabName: item.title,
          storeId: item.storeId || '',
          isLayer: layer ? 1 : 0
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
    },
    scrollUpper() {
      if (this.data.navList.length > 0) {
        this.triggerEvent('lazyObserver')
      }
    },
    clickShowPop() {
      this.scrollUpper();
      // 埋点
      clickBuriedV2_({
        click_id: 'unfoldStoreLayer',
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
      let {modalTabType='storeModal'} = this.data;
      this.triggerEvent("showModal", {
        type: modalTabType,
        value: true
      });
      this.triggerEvent('clickChangeZIndex', {
        type: 'zIndexNav'
      })
    },
    clickClosePop() {
      let {modalTabType='storeModal'} = this.data;
      this.triggerEvent("showModal", {
        type: modalTabType,
        value: false
      });
      this.triggerEvent('clickChangeZIndex', {
        type: 'zIndexHide'
      })
    },
    catchtouchmove() {
      return false
    }
  }
})
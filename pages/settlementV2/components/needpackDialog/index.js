import { clickBuriedV2_ } from "../../../../common/util/BI";

Component({
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    info: {
      type: Object,
      value: {}
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

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.triggerEvent("packDialogStatus");
      clickBuriedV2_({
        click_id: 'clickLayer',
        click_par: {
          type: 'closePacking'
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    agreement() {
      this.triggerEvent("packDialogStatus", { packUseFlag: true });
      clickBuriedV2_({
        click_id: 'clickLayer',
        click_par: {
          type: 'usePacking'
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    }
  },
});

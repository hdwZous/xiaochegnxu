import { clickBuriedV2_ } from '../../../../common/util/BI';
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
    /**
     * dealDeposit 1.直接关闭弹窗 2.展示协议弹窗 3.同意下单
     */
    close() {
      this.triggerEvent("monitorDeposit", {types: 1});
    },
    showGuardRule(e) {
      let { readmeList } = e.currentTarget.dataset
      this.triggerEvent("monitorDeposit", {types: 2, readmeList});
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickExplainIcon',
        click_par: {
          iconName: '预售协议'
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    agreement() {
      this.triggerEvent("monitorDeposit", {types: 3});
    }
  },
});

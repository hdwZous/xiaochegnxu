import { clickBuriedV2_ } from "../../../../../common/util/BI";
Component({
  options: {
    addGlobalClass: true,
  },

  lazyObj: {
    selector: '.video_list',
    epSelector: '.activity_comp_ep'
  },
  lifetimes: {
    attached: function() {
      
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    subItem: {
      type: Object,
      value: {},
      observer: function (val) {

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
    play() {
      clickBuriedV2_({
        click_id: 'seeVedio',
        click_par: {
          userAction: this.data.subItem.userAction
        },
        pageId: this.data.pageIdFirstPage || "",
        currentPageName: this.data.currentPageName || "",
        prePageName: this.data.prePageName || ""
      })
    }
  },
});

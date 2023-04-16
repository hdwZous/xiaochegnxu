import { clickBuriedV2_ } from '../../../../common/util/BI'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initData: {
      type: Object,
      value: {},
      observer: function (val) {
        //  console.log('val',val)
      }
    },
    vipMemberFlag: {
      type: Boolean,
      value: false
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
    buriedObj: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  options: {
    addGlobalClass: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleVipClick(e) {
      let data = e.currentTarget.dataset.item;
      this.triggerEvent("handleVipClick", data)
    },
    // 一键兑换
    handleOneKeyExchange(e) {
      //  console.log('e',e)
      let data = e.currentTarget.dataset.item;
      let types = e.currentTarget.dataset.types
      let buried = e.currentTarget.dataset.buried || ''
      this.triggerEvent("handleOneKeyExchange", {
        data,
        types
      })
      if (types == 'new') {
        clickBuriedV2_({
          create_time: new Date(),
          click_id: 'clickTag',
          click_par: {
            vplus: this.data.vipMemberFlag ? 1 : 0,
            style: buried
          },
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId
        })
      }
    },
    popNewVip(e) {
      let data = e.currentTarget.dataset.item;
      let types = e.currentTarget.dataset.types
      let buried = e.currentTarget.dataset.buried || ''
      this.triggerEvent("popNewVip", data)
      if (types == 'new') {
        clickBuriedV2_({
          create_time: new Date(),
          click_id: 'clickTag',
          click_par: {
            vplus: this.data.vipMemberFlag ? 1 : 0,
            style: buried
          },
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId
        })
      }
    }
  }
})

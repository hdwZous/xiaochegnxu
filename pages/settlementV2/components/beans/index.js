import { clickBuriedV2_ } from '../../../../common/util/BI'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    freshBeanInfo:{
      type:Object,
      value:{},
      observer:function(val){
        // console.log('val',val)
      }
    },
    usePlatPointsFlag:{
      type:Object,
      value:false
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
  data: {
    showBeanDialog:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showBeanDialog() {
      this.setData({
          showBeanDialog: !this.data.showBeanDialog
      })
      if (!this.data.showBeanDialog) {
        clickBuriedV2_({
          create_time: new Date(),
          click_id: 'clickExplainIcon',
          click_par: {
            iconName: '鲜豆'
          },
          pageId: this.data.pageId,
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName
        })
      }
    },
    useFreshBean: function (e) {
      this.triggerEvent('handleUseBeans')
    },
  }
})

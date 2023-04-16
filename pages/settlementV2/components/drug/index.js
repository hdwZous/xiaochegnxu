
import { clickBuriedV2_ } from '../../../../common/util/BI'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initData:{
      type:Object,
      value:{},
      observer:function(val){
        // console.log('val',val)
      }
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
    noticeList:[],
    visible:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClickQuestion(){
      let {readmeList}=this.data.initData.data;
      this.setData({
        noticeList:readmeList.filter(item=>item.text.title),
        visible:true
      },()=>{
        // console.log('noticeList',this.data.noticeList)
      })
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickExplainIcon',
        click_par: {
          iconName: '用药信息'
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    goToH5Page(){
      let url = this.data.initData.data.skipUrl
      wx.navigateTo({
        url: '/pages/h5/index?url=' + encodeURIComponent(url),
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'settlementv2_drug_goToH5Page'
        }
      })
    },
    stopBubble(){return false},
    close(){
      this.setData({
        visible:false
      })
    }
  }
})

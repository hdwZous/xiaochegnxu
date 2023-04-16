

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initData:{
      type:Object,
      value:{}
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
      let {readmeList}=this.data.initData;
      this.setData({
        noticeList:readmeList,
        visible:true
      })
    },
    goToH5Page(){
      let url = this.data.initData.skipUrl
      if(this.data.initData.certificationPassFlag){
        return 
      }
      wx.navigateTo({
        url: '/pages/h5/index?url=' + encodeURIComponent(url),
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'settlementv2_student_goToH5Page'
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

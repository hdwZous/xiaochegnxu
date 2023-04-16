import mp from "../../common/util/wxapi";

Component({
  options: {
    addGlobalClass: true
  },

  /**
     * 组件的属性列表
     */
  properties: {

  },

  /**
     * 组件的初始数据
     */
  data: {
    isShow: false,
    appScene: ''
  },
  pageLifetimes: {
    show() {
      const { appScene = '', isShowBackToAppBtn = false } = getApp().globalData;
      this.setData({
        isShow: (appScene === 1069) && isShowBackToAppBtn ? true : false,
        appScene
      })
    }
  },

  /**
     * 组件的方法列表
     */
  methods: {
    clickClose() {
      this.setData({
        isShow: false
      });
      getApp().globalData.isShowBackToAppBtn = false
    },
    launchAppError() {
      mp.toast({
        title: '请先下载“京东到家”APP，极致体验等着你 ~'
      })
    }
  }
})

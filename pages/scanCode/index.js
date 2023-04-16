// pages/shareCard//index.js

const { indexOf } = require("../../npm/prop-types/lib/ReactPropTypesSecret")

let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareInfo: {
      title: "京东到家",
    },
    tabBarList: [
      "pages/home/home",
      "pages/tabBar/easyGo/easyGo",
      "pages/tabBar/orderlist/index",
      "pages/tabBar/person/person",
      "pages/tabBar/signIn-t/index"
    ],
    envVersionIndex: wx.getStorageSync('envVersionIndex')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let { shareInfo } = this.data
    return shareInfo
  },
  scanCode() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.setData({
          result: JSON.stringify(res),
          path: res.path
        })
        wx.showModal({
          content: JSON.stringify(res),
          confirmText: "跳转",
          success: (res) => {
            if (res.confirm) {
              this.handleScanInfo()
            }
          }
        })
      }
    })
  },
  handleScanInfo() {
    let { tabBarList, path } = this.data
    let isTabPage = false
    for (let index = 0; index < tabBarList.length; index++) {
      if (path.indexOf(tabBarList[index]) > -1) {
        isTabPage = true
      }
    }

    if (path.indexOf('/') !== 0) {
      path = `/` + path
    }
    if (isTabPage) {
      wx.showToast({
        title:'tab页不能传参数哟~',
        duration:1000
      })
      setTimeout(()=>{
        wx.reLaunch({
        // wx.switchTab({
          url: path,
          fail(e) {
            wx.showModal({
              showCancel: false,
              content: JSON.stringify(e),
            })
          }
        })
      },1000)
     
    } else {
      wx.navigateTo({
        url: path,
        fail(e) {
          wx.showModal({
            showCancel: false,
            content: JSON.stringify(e),
          })
        }
      })
    }

  },
  bindconfirm(e) {
    let path = e.detail.value
    this.setData({
      path
    })
  },
  /**
    * @description: 【自动切换环境】测试自动切环境
    * @param {object}} 
    * @return {void}
    */
  clickChangeEnv(e) {
    let index = e.currentTarget.dataset.index;
    // 切换环境
    app.testAutoChangeEnv(index).then(idx => {
      this.setData({
        envVersionIndex: idx
      });
    })
  },

  /**
   * @description: 【自动切换环境】点击出现隐藏标签
   * @param {void} 
   * @return {void} 
   */
  clickEnvTab() {
    this.setData({
      testEnvTab: !this.data.testEnvTab
    })
  },


})
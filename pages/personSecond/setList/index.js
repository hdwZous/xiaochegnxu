import {
    request,
    FNIDS
} from "../../../common/util/api"
import mp from '../../../common/util/wxapi'
import { pvBuriedV2_ } from "../../../common/util/BI";
let app = getApp()
let self = null
let globalData = getApp().globalData;

Page({
    /**
     * 页面的初始数据
     */
    data: {
        switchChecked: false,
        isLogin: false,
        optionsPos: null,
        self_page:'set'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this;
        this.setData({
          optionsPos: options
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        if (app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid) {
            self.setData({
                isLogin: true
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid) {
            self.setData({
                isLogin: true
            })
        }
    },
    pvFunc(back) {
      let {recommendObj = {}} = this.data;
      pvBuriedV2_({
          page_par: {
              ref_par: {
                  traceId: recommendObj.preTraceId || "",
                  userAction: recommendObj.preUserAction || "",
              }
          },
          pageId: recommendObj.pageIdFirstPage || "",
          currentPageName: recommendObj.currentPageName,
          prePageName: recommendObj.prePageName,
          isBack: back || "",
      })
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

    },
    toSetDetail(e) {
        const { to } = e.currentTarget.dataset
        if (!self.data.isLogin) {
            self.toLogin();
            return
        }
        let { recommendObj = {}, optionsPos={} } = self.data;
        // 自动化决策
        if (to == 1) {
            wx.navigateTo({
                url: "/pages/personSecond/set/index",
                preObj: recommendObj,
                buried_position: {
                  currentPageName:'set1',
                  optionsPos
                }
            })
        } else if(to == 2) { // 隐私政策简要版
            // wx.navigateTo({
            //   url: '/pages/h5/index?needToken=1&url=' + encodeURIComponent('https://daojia.jd.com/activity/privacy/index.html'),
            //     preObj: recommendObj,
            //     buried_position: {
            //       currentPageName:'set2',
            //       optionsPos
            //     }
            // })
            wx.navigateTo({
              url: '/pages/personSecond/privacy_information/index',
                preObj: recommendObj,
                buried_position: {
                  currentPageName:'set2',
                  optionsPos
                }
            })
        } else if(to == 3) { // 个人信息收集清单
            wx.navigateTo({
                url: '/pages/h5/index?needToken=1&url=' + encodeURIComponent('https://daojia.jd.com/html/agreementApp.html?type=96'),
                preObj: recommendObj,
                buried_position: {
                  currentPageName:'set2',
                  optionsPos
                }
            })
            
        } else if(to == 4) { // 应用权限说明
            wx.navigateTo({
                url: '/pages/h5/index?needToken=1&url=' + encodeURIComponent('https://daojia.jd.com/html/agreementApp.html?type=97'),
                preObj: recommendObj,
                buried_position: {
                  currentPageName:'set2',
                  optionsPos
                }
            })
        } else if(to == 5) { // 个人信息共享清单
            wx.navigateTo({
                url: '/pages/h5/index?needToken=1&url=' + encodeURIComponent('https://daojia.jd.com/html/agreementApp.html?type=110'),
                preObj: recommendObj,
                buried_position: {
                  currentPageName:'set2',
                  optionsPos
                }
            })
        }
    },
    toLogin: function () {
        let { recommendObj = {}, optionsPos={} } = this.data;
        wx.navigateTo({
            url: `/pages/newLogin/login/login`,
            preObj: recommendObj,
            buried_position: {
              currentPageName:'set2',
              optionsPos
            }
        })
    },
    toLogout: function () {
        wx.setStorage({
            key: "fromSettoMy",
            data: 1,
            success() {
                wx.navigateBack()
            }
        })
    }
})
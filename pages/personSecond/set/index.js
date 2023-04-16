import {
    request,
    FNIDS
} from "../../../common/util/api"
import mp from '../../../common/util/wxapi'
import { pvBuriedV2_,clickBuriedV2_ } from "../../../common/util/BI";
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
        self_page:'autoDecide'
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
        self.getRecommendFun();
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
    // pv埋点上报
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
        create_time: new Date(),
        page_par: {
           
        },
        currentPageName: recommendObj.currentPageName || "",
        prePageName: recommendObj.prePageName || "",
        pageId: recommendObj.pageIdFirstPage || "",
        isBack: back || "",
        });
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
    switchChange: function (e) {
        if (!self.data.isLogin) {
            self.toLogin()
            return
        }
        this.updateRecommendFun(e.detail.value)
    },
    getRecommendFun() {
        request({
            method: "GET",
            ...FNIDS.getUserRecommendStatus,
            body: {},
            preObj: this.data.recommendObj || {}
        }).then(res => {
            let result = res.data.result;
            if (result) {
                this.setData({
                    switchChecked: result.recommendState === 1 ? true : false
                })
            } else {
                mp.toast({
                    title: res.data.errMsg
                });
            }
        })
    },
    updateRecommendFun(val) {
        request({
            method: "GET",
            ...FNIDS.updateUserRecommendStatus,
            body: {
                recommendState: val ? 1 : 2,
                djPin: globalData.loginStateInfo.PDJ_H5_PIN
            },
            host: 'daojia.jddj.com',
            preObj: this.data.recommendObj || {}
        }).then(res => {
            let result = res.data.result;
            if (result) {
                // debugger
            } else {
                mp.toast({
                    title: res.data.errMsg
                });
            }
        }).catch(err => {
            mp.toast({
                title: '设置失败稍后再试'
            });
        })
        // 埋点
        let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
        this.data.recommendObj || {};
        clickBuriedV2_({
            create_time: new Date(),
            click_id: 'clickButton',
            click_par: {
                type: 'show',
                status: val ? 1 : 0
            },
            currentPageName: currentPageName,
            prePageName: prePageName,
            pageId: pageIdFirstPage,
        })
    },
    toLogin: function () {
        let { recommendObj = {}, optionsPos ={} } = this.data;
        wx.navigateTo({
            url: `/pages/newLogin/login/login`,
            preObj: recommendObj,
            buried_position: {
              currentPageName:'autoDecide1',
              optionsPos
            }
        })
    }
})
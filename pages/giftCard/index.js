import { request, FNIDS } from '../../common/util/api';
import { requestSign } from '../../common/util/PayTools';
const app = getApp();
const globalData = app.globalData;
Page({
    data: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const { fromSource = '', cardMoney = '', cardNum = '', amount = '', payAmount = '', activityId = 0, imageId = '', storeId = '', authorize = 0 } = options;
        const { functionId, appVersion } = FNIDS.giftCardApp;
        const query = {
            fromSource,
            cardMoney,
            cardNum,
            amount,
            payAmount,
            activityId,
            imageId,
            storeId,
            authorize
        }
        const jumpUrl = `https://${globalData.config.HOST}/html/index/giftCardList`;
        request({
            functionId,
            appVersion,
            body: query,
            preObj: this.data.recommendObj || {}
        }).then(res => {
            const { data: { code = -1, result = '' } = {} } = res;
            if (code == 0) {
                if (result) {
                    requestSign({
                        orderId: result,
                    },
                    () => {
                        wx.navigateTo({
                            url:  "/pages/h5/index?giftFlag=1&url=" + encodeURIComponent(jumpUrl)
                        })
                    },
                    () => {
                        wx.navigateBack()
                    })
                }
            }
        }).catch(err => {
            console.log(err)
        })
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
        if (globalData.giftFlag == 1) {
            globalData.giftFlag = 0
            wx.navigateBack({
                delta: 2
            })
        }
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
})
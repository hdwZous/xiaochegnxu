import {request,FNIDS} from '../../../common/util/api'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nodes: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getRules()
    },

    /**
     * 用户点击右上角转发
     */
    onShareAppMessage() {
        return {
            title: '京东到家',
            path: '/pages/home/home'
        }
    },

    // 获取说明
    getRules() {
        request({
           ...FNIDS.couponIntroduce,
            body: {
                type: '21'
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
        }).then(res => {
            this.setData({
                nodes: res.data.result
            })
        }).catch(err => {

        })
    }
});
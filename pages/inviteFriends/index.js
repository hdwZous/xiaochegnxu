import {
    FNIDS,
    request
} from "../../common/util/api";
import {
    pvBuriedV2_ ,
    clickBuriedV2_
} from '../../common/util/BI';
let globalData = getApp().globalData;
let app = getApp();
Page({
    buried:{
        userAction:"空",
        type:"home",
        
        
        

    },
    /**
     * 页面的初始数据
     */
    data: {
        // 页面图片信息
        headImg: "",
        profitImg: "",
        ruleImg: "",
        shareButtonImg: "",
        shareImg: "",
        shareTitle: "",
        // 滚动文案
        scrollData: [],
        // 分享链接
        shareUrl: "",
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var host = globalData.config.HOST.indexOf('daojia') != -1 ? '44' : '49';
        this.setData({
            from: options.from || ""
        })
        this.getPageData(host);
        this.getShareData();
        if(options.userAction) {
            let userAction = decodeURIComponent(options.userAction)
            this.buried.userAction = userAction
        }
        
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
       
    },

    // pv() {
    //
    // },
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
            create_time: new Date(),
            page_par: {
                userAction: this.buried.userAction || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
            isBack: back || "",
        });
    },

    // 获取页面img数据
    getPageData: function(host) {
        request({
          ...FNIDS.shareInfo,
          body: {
            infoId: host,
            type: 4,
          },
          preObj: this.data.recommendObj || {},
        }).then((res) => {
          if (res.data.result) {
            var result = res.data.result;
            var rollText = result.rollText && result.rollText.split(",");
            this.setData({
              headImg: result.infoTopPics[0].imgJsonBo.url,
              profitImg: result.infoBackgroundPics[0].imgJsonBo.url,
              ruleImg: result.infoBackgroundPics[1].imgJsonBo.url,
              shareImg: result.infoButtonPics[1].imgJsonBo.url,
              shareButtonImg: result.infoButtonPics[0].imgJsonBo.url,
              shareTitle: result.shareTitle,
              scrollData: rollText,
            });
          }
        });
    },
    // 获取分享数据
    getShareData: function() {
        request({
          ...FNIDS.getShareRewardLink,
          body: {
            pin: getApp().globalData.loginStateInfo.PDJ_H5_PIN,
          },
          preObj: this.data.recommendObj || {},
        }).then((res) => {
          var result = res.data.result;
          if (result && result.pathUrl) {
            this.setData({
              shareUrl: result.pathUrl || "",
            });
          }
        });
    },
    onShareAppMessage: function(res) {
        this.buried.type = this.data.from || "home";
        //埋点
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "share_invite_coupon",
            click_par: {
                type: this.buried.type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        return {
            title: this.data.shareTitle,
            path: this.data.shareUrl,
            imageUrl: this.data.shareImg
        }
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    }
})

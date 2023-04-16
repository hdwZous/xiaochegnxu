import { pvBuriedV2_ } from "../../../common/util/BI";
let app = getApp()
let self = null
let globalData = getApp().globalData;

Page({
    /**
     * 页面的初始数据
     */
    data: {
        isLogin: false,
        optionsPos: null,
        self_page:'pages/personSecond/wallet/index'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this;
        this.setData({
          optionsPos: options
        });
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
        wx.getStorage({
            key: 'wallet',
            success(res) {
                // console.log('wallet---', res.data)
                self.setData(res.data)
            }
        })
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
   
    toCouponList: function () {
        if (!self.data.isLogin) {
            self.toLogin()
            return
        }
        let { recommendObj = {}, couponJumpType = 0, optionsPos={} } = self.data;
        let url = "";
        if(couponJumpType === 1) {
          let ref_page = 'my_wallet',
          ref_par = encodeURIComponent(JSON.stringify({
            traceId: recommendObj.preTraceId || "",
            userAction: recommendObj.preUserAction || ""
          }));
          let paramsStr = `?ref_page=${ref_page}&ref_par=${ref_par}`
          url = `/pages/myCoupons/index${paramsStr}`
        } else {
          url = '../../coupon/person-coupon';
        }
        wx.navigateTo({
            url: url,
            preObj: recommendObj,
            buried_position: {
              currentPageName:'pages/personSecond/wallet/index1',
              optionsPos
            }
        })
    },

    toRedEnvelopeList() {
        let { recommendObj = {}, optionsPos={} } = self.data;
        if (!self.data.isLogin) {
            self.toLogin();
            return
        }
        wx.navigateTo({
            url: "/pages/redEnvelopeList/list/index",
            preObj: recommendObj,
            buried_position: {
              currentPageName:'pages/personSecond/wallet/index2',
              optionsPos
            }
        })
    },

    toFreshBean: function () {
        if (!self.data.isLogin) {
            self.toLogin()
            return
        }
        let url = "https://" + globalData.config.HOST + "/html/vue/index.html#integral";
        let { recommendObj = {}, optionsPos={} } = self.data;
        wx.navigateTo({
            url: "/pages/h5/index?needToken=1&url=" + encodeURIComponent(url),
            preObj: recommendObj,
            buried_position: {
              currentPageName:'pages/personSecond/wallet/index3',
              optionsPos
            }
        })


    },
    toGiftCard: function (e) {
        if (!this.data.isLogin) {
            this.toLogin()
            return
        }
        let url = this.data.giftUrl || '';
        let { recommendObj = {}, optionsPos={} } = this.data;
        // let url = 'https://prepdjm.jd.com/html/index/giftCardList'
        wx.navigateTo({
            url: "/pages/h5/index?url=" + encodeURIComponent(url),
            preObj: recommendObj,
            buried_position: {
              currentPageName:'pages/personSecond/wallet/index4',
              optionsPos
            }
        })

    },

    toLogin: function () {
        let { recommendObj = {}, optionsPos={} } = this.data;
        wx.navigateTo({
            url: `/pages/newLogin/login/login`,
            preObj: recommendObj,
            buried_position: {
              currentPageName:'pages/personSecond/wallet/index5',
              optionsPos
            }
        })
    }
})
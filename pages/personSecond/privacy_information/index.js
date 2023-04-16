import { pvBuriedV2_ } from "../../../common/util/BI";
Page({

    /**
     * 页面的初始数据
     */
    data: {
      list: [{
        title: '创建平台账号',
        desc: '用户名、密码、手机号',
        icon: 'https://daojia.jd.com/activity/privacy/images/1.png'
      }, {
        title: '第三方账号快捷登录',
        desc: '第三方账号信息',
        icon: 'https://daojia.jd.com/activity/privacy/images/2.png'
      }, {
        title: '商品/服务展示',
        desc: '日志信息',
        icon: 'https://daojia.jd.com/activity/privacy/images/3.png'
      }, {
        title: '下单交易及订单管理',
        desc: '联系人信息(姓名、手机号)、地址信息(收货地址)、订单信息、支付信息',
        icon: 'https://daojia.jd.com/activity/privacy/images/4.png'
      },{
        title: '交付配送',
        desc: '订单信息',
        icon: 'https://daojia.jd.com/activity/privacy/images/5.png'
      },{
        title: '客服与售后',
        desc: '沟通记录、账户信息、订单信息、支付信息',
        icon: 'https://daojia.jd.com/activity/privacy/images/6.png'
      },{
        title: '安全风控',
        desc: '设备信息、日志信息、订单信息及其他必要信息',
        icon: 'https://daojia.jd.com/activity/privacy/images/7.png',
        style: 'none'
      }],
      list2: [{
        title: '位置',
        desc: '推荐或展示周边的商品/服务',
        icon: 'https://daojia.jd.com/activity/privacy/images/8.png'
      }, {
        title: '相机',
        desc: '扫码、拍摄',
        icon: 'https://daojia.jd.com/activity/privacy/images/9.png'
      }, {
        title: '相册',
        desc: '联系客服时发送图片或视频',
        icon: 'https://daojia.jd.com/activity/privacy/images/10.png',
        style: 'none'
      }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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

    jump(e) {
      const { type } = e.currentTarget.dataset
      const { recommendObj } = this.data
      wx.navigateTo({
        url: '/pages/h5/index?needToken=1&url=' + encodeURIComponent(`https://daojia.jd.com/html/agreementApp.html?type=${type}`),
        preObj: recommendObj,
        buried_position: {
          currentPageName:'privacy',
        }
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
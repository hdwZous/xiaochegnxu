// pages/groupBuy/goodDetail/index.js
import {
	FNIDS,
	request
} from "../../../common/util/api"
let self = null
Page({

	/**
     * 页面的初始数据
     */
	data: {
		// 接收参数
		promotionId: "",
		storeId: "",
		orgCode: "",
		skuId: "",
		// 详情数据
		goodInfo: {

		},
		// 默认显示第一张商品图
		currentIndex: 0,
		// 商品详情
		productDetailHtml: "",
		// 是否展示页面
		showPage: false
	},

	/**
     * 生命周期函数--监听页面加载
     */
	onLoad: function(options) {
		self = this
		if (options && options.promotionId) {
			self.setData({
				promotionId: options.promotionId,
				storeId: options.storeId,
				orgCode: options.orgCode,
				skuId: options.skuId,
			})
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
		self.reqGroupDetailData()
	},
	/**
     * 请求推荐商品详情数据
     */
	reqGroupDetailData: function() {
		wx.showLoading({
			title: "加载中...",
		})
		request({
      ...FNIDS.groupDetail,
      body: {
        promotionId: self.data.promotionId || "",
        storeId: self.data.storeId || "",
        orgCode: self.data.orgCode || "",
        skuId: self.data.skuId || "",
      },
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        wx.hideLoading();
        let result = res.data.result;
        if (res.data.code == "0") {
          if (result.status == "2") {
            wx.showModal({
              title: "提示",
              content: result.failReason,
              showCancel: false,
              success: function (e) {
                wx.navigateBack({});
              },
            });
            this.setData({
              showPage: false,
            });
          } else {
            if (res.data.result) {
              this.setData({
                goodInfo: result,
                showPage: true,
              });
            }
          }
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
          });
        }
      })
      .catch((err) => {
        wx.hideLoading();
      });
	},
	// 轮播变换
	swiperChange: function(e) {
		self.setData({
			currentIndex: e.detail.current
		})
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

	},

	/**
     * 用户点击右上角分享
     */
	onShareAppMessage: function() {
		let data = this.data
		return {
			title: this.data.groupDetailData.skuName || "",
			imageUrl: this.data.groupDetailData.skuImgUrl || "",
			path: "/pages/groupBuy/goodDetail/index?promotionId=" + data.promotionId +
                "&storeId=" + data.storeId +
                "&orgCode=" + data.orgCode +
                "&skuId=" + data.skuId
		}
	}
})
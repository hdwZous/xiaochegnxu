import {
    request,
    FNIDS
} from "../../../common/util/api"
import {pvBuriedV2_} from '../../../common/util/BI'

var app = getApp()
var self = null


Page({
// 埋点
buried: {
    
	
	   
},
	/**
     * 页面的初始数据
     */
	data: {
		isIPX: app.globalData.isIpx,
		items: [{
			code: "01",
			name: "遇到问题",
			checked: "true",
			hint: "比如在（）情况下，小程序出现了（）异常"
		},
		{
			code: "02",
			name: "功能建议",
			hint: "比如我希望加入/完善（）功能，因为（）"
		},
		],
		placeText: "比如在（）情况下，小程序出现了（）异常",
		curCode: "01",
		phone: "",
		content: "",
		isEnable: false,
		enableForPhone: true,
		enableForContent: true,
		
	},

	/**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		self = this
		
		
	},

	/**
     * 生命周期函数--监听页面初次渲染完成
     */
	onReady: function () {

	},

	/**
     * 生命周期函数--监听页面显示
     */
	onShow: function () {},
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
	goback: function () {
		wx.navigateBack({})
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
		var shareUtil = require("../../../common/util/share_utils.js")
		var url = shareUtil.getShareUrl()

		return {
			title: "京东到家",
			path: url
		}
	},
	radioChange: function (e) {
		if (e.detail.value == "01") {
			self.setData({
				placeText: self.data.items[0].hint,
				curCode: self.data.items[0].code
			})
		} else if (e.detail.value == "02") {
			self.setData({
				placeText: self.data.items[1].hint,
				curCode: self.data.items[1].code
			})
		}
	},

	changeInput: function (e) {

		var value = e.detail.value
		var curName = e.target.dataset.name
		switch (curName) {
		case "phone":
			self.setData({
				phone: value,
			})
			if (value) {
				if (value.length == 11 && value[0] == "1") {
					self.data.enableForPhone = true
				} else {
					self.data.enableForPhone = false
				}
			} else {
				self.data.enableForPhone = true
			}
			break
		case "content":
			self.setData({
				content: value,
			})
			if (value) {
				self.data.enableForContent = true
			} else {
				self.data.enableForContent = false
			}
			break
		}

		if (self.data.enableForPhone && self.data.enableForContent) {
			self.setData({
				isEnable: true
			})
		} else {
			self.setData({
				isEnable: false
			})
		}
	},

	toFeedback: function (e) {
		if (!self.data.isEnable) {
			return
		}
		self.setData({
			isEnable: false
		})
		var isFail = true
		var errTip = "网络异常"
		var content = ""
		if (self.data.phone) {
			content += self.data.phone + " "
		}
		content += self.data.content
		var addressInfo = app.globalData.addressInfo
		if (addressInfo) {
			content += "["
			if (addressInfo.cityName) {
				content += addressInfo.cityName + "@"
			}
			if (addressInfo.countyName) {
				content += addressInfo.countyName + "@"
			}
			if (addressInfo.poi) {
				content += addressInfo.poi
			}
			content += "]"
		}
		content += "by xcx " + self.data.curCode
		request({
			// 意见反馈接口
			...FNIDS.addfeedback,
			method: "POST",
			body: {
				contact: app.globalData.loginStateInfo.PDJ_H5_PIN,
				content: content,
      },
      preObj: this.data.recommendObj || {}
		}).then(res => {
			if (res && res.data) {
				if (res.data.code == "0") {
					isFail = false
					wx.showToast({
						title: "感谢您的反馈！",
						icon: "success",
					})
					setTimeout(function () {
						wx.navigateBack({
							delta: 1
						})
					}, 1000)
				} else {
					if (res.data.msg) {
						errTip = res.data.msg
					}
				}
			}
			if (isFail) {
				wx.showToast({
					title: errTip,
					image: "/images/common_icon_warn.png",
				})
			}
			self.setData({
				isEnable: true
			})
		}).catch(err => {
			wx.showToast({
				title: "网络异常",
				image: "/images/common_icon_warn.png",
			})
			if (isFail) {
				wx.showToast({
					title: errTip,
					image: "/images/common_icon_warn.png",
				})
			}
			self.setData({
				isEnable: true
			})
		})
	}
})
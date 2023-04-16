import {
    request,
    FNIDS
} from "../../../common/util/api"

import {
	isLogin
} from "../../../common/util/loginUtil"
import { pvBuriedV2_ } from "../../../common/util/BI";
import orderPublic from "../../../common/util/public.js"

var app = getApp()
var self = null
Page({
  // 埋点
  buried: {
    order_id: '',
    pay_amt: '',
    coupon_amt: '',
	  title: '',
	  type:''
  },
	/**
     * 页面的初始数据
     */
	data: {
		isIPX: app.globalData.isIpx,
		codeInfo: undefined,
		needDelay: true,
		isSuccessGet: false,
		orderId: undefined,
		orderName: undefined,
		isInit: false,
		sourceFrom: 0, //0是 开通会员页面返回
		isNoPwd: false, //是否免密
		isVip: false, //是否是会员
		payTitle: "支付中",
		payStatus: 0, // 0:开卡,1:唤起收银台；2:代扣处理中 3:代扣成功
		businessId: "",
		payResult: {},
		hasNewCoupon: false,
    isLogin: isLogin(),
    optionsPos: null,
    self_page:'ordersuccess_offlin'
	},

	/**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
		self = this
		// 检测是否有新人券
		this.checkNewCoupon()
		let imgWidth = (wx.getSystemInfoSync().windowWidth) * 2,
			imgHeight = (imgWidth / 5)
		this.setData({
			payStatus: options.payStatu,
			businessId: options.businessId || options.orderId || "",
			imgWidth: imgWidth,
      imgHeight: imgHeight,
      optionsPos: options
		})
		if (options.payStatu == 1) {
			wx.setNavigationBarTitle({
				title: "请支付"
			})
		} else if (options.payStatu == 2) {
			wx.setNavigationBarTitle({
				title: "支付中"
			})
		} else if (options.payStatu == 3) {
			wx.setNavigationBarTitle({
				title: "支付成功"
			})
			this.showPopHandle()
		}
	},

	/**
     * 生命周期函数--监听页面初次渲染完成
     */
	onReady: function () {
		if (this.data.businessId) {
			requestOrder()
		}
	},

	/**
     * 生命周期函数--监听页面显示
     */
	onShow: function () {
		if (!self.data.isInit) {
			return
		}
		self.data.needDelay = true
		if (!self.data.isSuccessGet) {
			requestDelay()
		}
	},
	// 检测是否有新人券
	checkNewCoupon: function () {
		if (isLogin()) {
			orderPublic.judgeNewPerson().then(res => {
				let result = res.data.result || {}
				if (res.data.code == "0") {
					if (result.layerType == "3" || result.layerType == "6") {
            this.reportNewCoupon()
						
						this.setData({
							hasNewCoupon: true
						})
						if (this.data.payStatus == "3") {
							this.showPopHandle()
						}
					}
				}
			}).catch(err => {
			})
		}
	},
	// 处理新人券弹层是否展示
	showPopHandle: function () {
		if (this.data.hasNewCoupon && isLogin()) {
			this.setData({
				showPop: true,
				isLogin: true
			})
		} else {

		}
	},
	/**
     * 生命周期函数--监听页面隐藏
     */
	onHide: function () {
		self.data.needDelay = false
	},

	/**
     * 生命周期函数--监听页面卸载
     */
	onUnload: function () {
		self.data.needDelay = false
	},

	goback: function () {
		wx.navigateBack({})
	},
	dealErrorClick: function () {
		if (self.data.errorType == 0) {
			requestDelay()
		}

	},
	goHome: function () {
    let { recommendObj = {}, optionsPos={} } = this.data;
		wx.switchTab({
      url: "/pages/home/home",
      preObj: recommendObj,
      buried_position: {
        currentPageName:'ordersuccess_offline1',
        optionsPos
      }
		})
	},
	goOrderList: function () {
    let { recommendObj = {} , optionsPos={}} = this.data;
		wx.switchTab({
      url: "/pages/tabBar/orderlist/index",
      preObj: recommendObj,
      buried_position: {
        currentPageName:'ordersuccess_offline2',
        optionsPos
      }
		})
	},
	goRedPackage() {
    let { recommendObj = {}, optionsPos={} } = this.data;
		wx.redirectTo({
      url: "/pages/inviteFriends/index",
      preObj: recommendObj,
      buried_position: {
        currentPageName:'ordersuccess_offline3',
        optionsPos
      }
		})
  	},
  /* ------------------ 自动化埋点新增逻辑    --------------------  */
//   pv(order_id, pay_amt, coupon_amt) {
//     this.buried.orderId = order_id
//     this.buried.pay_amt = pay_amt || 0
//     this.buried.coupon_amt = coupon_amt || 0
//   },
	// pv埋点上报
	pvFunc(back) {
		let recommendObj = this.data.recommendObj || {};
		pvBuriedV2_({
		create_time: new Date(),
		page_par: {
			order_id: this.data.businessId,
			pay_amt: this.data.payResult.payMoney,
			coupon_amt: this.data.payResult.couponDiscountMoney
		},
		currentPageName: recommendObj.currentPageName || "",
		prePageName: recommendObj.prePageName || "",
		pageId: recommendObj.pageIdFirstPage || "",
		isBack: back || "",
		});
	},
  reportNewCoupon() {
    this.buried.title = '15元红包待使用弹层'
  },
  pageBuried(e){
	const {title,type,types}=e.detail;
	if(type==1 || type==2 || type==3){
		this.layerBuried(title)
	}
	if(type==4 || type==5 || type==6){
		this.closeBuried(title,types)
	}
	},
	layerBuried(title){
		this.buried.title=title
	},
	closeBuried(title,type){
		this.buried.title=title
		this.buried.type=type
	}
})


function requestOrder() {
	request({
		// 真实接口
		...FNIDS.getOrderPayStatus,
		body: {
			businessId: self.data.businessId
    },
    preObj: this.data.recommendObj || {}
	}).then(res => {
		if (res && res.data && res.data.result) {
			//会员开卡
			if (res.data.result.statusType == "0") {
				// self.data.isSuccessGet = true;
				//非免密 调取微信支付
			} else if (res.data.result.statusType == "1" && res.data.result.statusValue) {
				self.data.isSuccessGet = true
				self.setData({
					payStatus: 1
				})
				wx.setNavigationBarTitle({
					title: "请支付"
				})
				requestSign({
					orderId: res.data.result.statusValue
				})
				//免密支付中
			} else if (res.data.result.statusType == "2") {
				wx.setNavigationBarTitle({
					title: "支付中"
				})
				self.setData({
					payStatus: 2,
					payResult: JSON.parse(res.data.result.statusValue || "{}")
				})
				//免密支付成功
			} else if (res.data.result.statusType == "3") {
				self.data.isSuccessGet = true
				wx.setNavigationBarTitle({
					title: "支付成功"
				})
				self.setData({
					payStatus: 3,
					payResult: JSON.parse(res.data.result.statusValue || "{}")
        })
        self.pv(self.data.businessId, self.data.payResult.payMoney, self.data.payResult.couponDiscountMoney)
				
				this.showPopHandle()
			} else {

			}
		} else {

		}
		requestDelay()
	}).catch(err => {
		self.setData({
			warnTip: "网络异常",
			showEmpty: true,
			errorType: 0,
			btnName: "重新加载",
			errorImg: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png"
		})
		requestDelay()
	})
}

function requestDelay() {
	if (self.data.isSuccessGet || !self.data.needDelay || !self.data.businessId) {
		return
	}
	setTimeout(function () {
		requestOrder()
	}, 2000)
}

const requestSign = function (options) {
	let paytools = require("../../../common/util/PayTools")
	paytools.requestSign(options, function () {
		self.data.isSuccessGet = false
		requestOrder()
	}, function () {
		// cancelOrder()
		app.globalData.needLoadOrder = true
		var url = "/pages/tabBar/orderlist/index"
		wx.switchTab({
			url: url,
		})
	})
}
import {
	pvBuriedV2_
} from "../../common/util/BI"
import {
	requestPay
} from "../../common/util/PayTools"
let app = getApp();
Page({
	data: {
		orderId: "",
		orderPrice: "",
		//支付状态
		payStatus: "支付中",
		//付款参数
		payParams: null,
		//上次成功付款的支付参数
		lastSuccessPayParams: null,
		//是否已经在支付流程中
		paying: false,
		/**是否已经支付失败过
		 * 注意:有这个标志位是因为,
		 *在Android中如果已经弹出输密码支付对话框,
		*按home键退到桌面，再进去时会先调用支付失
		*败的回调（handlePayFail 这将会把 paying
		*置回false,在ios中并不会调用支付失败的回调)
		*,虽然此时已经回到了上级页面，但，任然回调用
		*onShow方法(导致在上级页面弹出支付框)
		**/
		payFaill: false,
		
	},

	/**
   * 生命周期函数--监听页面加载
   *
   */
	onLoad: function(options) {
		let params = {
			appid: options.appid,
			timestamp: options.timestamp,
			noncestr: options.noncestr,
			prepayid: options.prepayid,
			signType: options.signType,
			sign: options.sign
		};
		this.setData({
			payParams: params
		})

		
		
	},

	/**
   * 生命周期函数--监听页面显示
   */
	onShow: function() {
		
		if (this.data.paying || this.data.payFaill) {
			return
		}
		if (this.data.lastSuccessPayParams
            && this.data.payParams
            && this.data.lastSuccessPayParams.prepayid === this.data.payParams.prepayid) {
			return
		}
		this.setData({
			paying: true,
		});
        requestPay(this.data.payParams, this.handlePaySuccess, this.handlePayFail)
	
    },
    // pv埋点
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

    //支付成功的回调
    handlePaySuccess: function (msg, payParams) {
        this.setData({
            paying: false,
            payStatus: "购买成功",
            lastSuccessPayParams: payParams,
        });
        let pages = getCurrentPages();
        if (pages.length >= 2) {
            let prevPage = pages[pages.length - 2];
            if (prevPage && prevPage.route === "pages/h5/index") {
                prevPage.refresh();
            }
        }
    },

	//支付失败的回调
	handlePayFail: function() {
		this.setData({
			paying: false,
			payStatus: "购买失败",
			payFaill: true,
		});
		wx.navigateBack();
	},

    toSee:function () {
        wx.navigateBack();
    }
})
import util from "../../../common/util/jdUtil/util.js"
import { reqLoginNew } from "../../../common/util/reqLogin.js"
const DEFAULT_COUNT = 120;
const ERROR_MSG = "服务异常";
var app = getApp(),that;
Page({
	data: {
		inputVaild: {
			phonecode: false, //手机号是否输入
			msgcode: false, //短信验证码是warn-info否输入
		},
		iconClear: {
			phoneClear: true,
			msgClear: true,
		},
		canLogin: false, //登录是否可点击
		getMsgCode: false, //是否能获取短信验证码
		getMsgCodeText: "获取验证码",
		phoneInput: "", //手机号 init
		msgInput: "", //短信验证码 init
		msgWarn: true, //错误提示
		warnShow: true, //告警toast显示控制
		returnPage: "",
		waitTime: true,
		pageType: "", //页面来源类型
	},
	onLoad: function(options) {
		let { returnPage = "", pageType = "" ,loginByMp = "",redirectUrl = ""} = options;
		this.setData({
			returnPage,
			pageType,
			loginByMp,
			redirectUrl
		});
		that = this
	},
	// 手机号输入框
	changeInput: function(e) {
		var inputJson = this.data.inputVaild;
		var value = e.detail.value;
		var curName = e.target.dataset.name;

		switch (curName) {
		case "phonecode":
			this.setData({
				phoneInput: value,
			});
			break;
		case "msgcode":
			this.setData({
				msgInput: value,
			});
			break
		}
		if (value) {
			inputJson[curName] = true;
			if (curName == "phonecode") { //手机号
				if (util.checkPhone(value)) {
					this.setData({
						getMsgCode: true
					})
				} else {
					inputJson[curName] = false;
					this.setData({
						getMsgCode: false
					})
				}
			}
		} else {
			inputJson[curName] = false;
			if (curName == "phonecode") { //手机号
				this.setData({
					getMsgCode: false
				})
			}
		}
		if (util.checkLogin(inputJson)) {
			this.setData({
				canLogin: true
			})
		} else {
			this.setData({
				canLogin: false
			})
		}
	},
	// 获取焦点
	inputFocus: function(e) {
		var iconName = e.target.dataset.name;
		switch (iconName) {
		case "phonecode":
			this.setData({
				"iconClear.phoneClear": false
			});
			break;
		case "msgcode":
			this.setData({
				"iconClear.msgClear": false
			});
			break
		}
	},
	// 失去焦点
	inputBlur: function(e) {
		var iconName = e.target.dataset.name;
		switch (iconName) {
		case "phonecode":
			this.setData({
				"iconClear.phoneClear": true
			});
			break;
		case "msgcode":
			this.setData({
				"iconClear.msgClear": true
			});
			break
		}
	},
	// 清除手机号输入框
	clearPhoneInput: function() {
		var inputJson = this.data.inputVaild;
		inputJson.phonecode = false;
		this.setData({
			phoneInput: "",
			canLogin: false,
			getMsgCode: false
		});
		return false
	},
	// 清除验证码输入框
	clearMsgInput: function() {
		var inputJson = this.data.inputVaild;
		inputJson.msgcode = false;
		this.setData({
			msgInput: "",
			canLogin: false
		});
		return false
	},
	//获取短信验证码
	obtainCode: function(e) {
		let { getMsgCode, waitTime, phoneInput } = this.data;
		let canSend = getMsgCode && waitTime;
		if (!canSend) {
			return
		}
		//重置toast
		this.setData({
			warnShow: true,
			warnText: ""
		});
		wx.showModal({
			title: " 提示",
			content: `我们将发送到${phoneInput}`,
			success: (resModal) => {
				if (!resModal.confirm) {
					return
				}
				let sdk_ver = wx.getStorageSync("jdlogin_sdk_ver");
				util.smslogin_sendmsg({
					sdk_ver,
					mobile: phoneInput,
					callback: (res) => {
						let { isSuccess, err_code, err_msg, guid, lsid } = res;
						if (isSuccess && !err_code) {
							util.setListStorage([{ key: "jdlogin_guid", val: guid }, { key: "jdlogin_lsid", val: lsid }]);
							this.setData({
								imgCodeShow: false,
								getMsgCode: false,
								getMsgCodeText: `${DEFAULT_COUNT}s`,
								waitTime: false
							});
							this.setIntervalTime()
						} else {
							this.setData({
								warnShow: false,
								warnText: err_msg || ERROR_MSG
							})
						}
					}
				})
			}
		})
	},
	setIntervalTime(count = DEFAULT_COUNT) {
		let timer = setInterval(() => {
			count--;
			if (count > 0) {
				this.setData({
					getMsgCodeText: `${count}s`
				})
			} else {
				clearInterval(timer);
				this.setData({
					getMsgCode: true,
					getMsgCodeText: "获取验证码",
					waitTime: true
				})
			}
		}, 1000)
	},
	doLogin() {
		let { canLogin, phoneInput, msgInput } = this.data;
		if (!canLogin) {
			return
		}
		this.setData({
			warnShow: true,
			warnText: "",
			canLogin: false
		});
		util.dosmslogin({
			mobile: phoneInput,
			smscode: msgInput,
			callback: (res) => {
				let { isSuccess, err_msg, err_code } = res;
				if (isSuccess && !err_code) {
					util.setCommonStorage(res);
					// 处理跳转页面
					this.handleJumpPage(res)
				} else {
					this.setData({
						warnShow: false,
						warnText: err_msg || ERROR_MSG
					})
				}
			}
		})
	},
	handleJumpPage(params = {}) {
		let { need_receiver } = params;
		let { returnPage, phoneInput, pageType } = this.data;
		//有历史收货人，跳转历史收货人页面
		if (need_receiver == 1) {
      let { recommendObj = {} } = this.data;
			wx.redirectTo({
        url: `../login-receive/login-receive?mobile=${phoneInput}&returnPage=${returnPage}&pageType=${pageType}`,
        preObj: recommendObj
			})
		} else {
			// 检测是否有ptkey,走到家接口
			goHome()
			// returnPage && util.goBack(this.data);
		}
	},
	goProtocol: function() {
    let { recommendObj = {} } = this.data;
		wx.navigateTo({
      url: "../protocolTxt/protocolTxt?returnpage=" + this.data.returnpage,
      preObj: recommendObj
		})
	},

});

function goHome() {
	reqLoginNew({
		type: 1, //1代表手机号登陆
	}).then((res) => {
		if (res == "loginSuccess") {
			app.globalData.loginByMp = that.data.loginByMp;
			app.globalData.redirectUrl = that.data.redirectUrl;
			let pages = getCurrentPages();
			for(let page of pages ){
				if(page && (page.route == "pages/coupon/voucher/index")) {
					page.setData({
						reRequest: true
					});
					break
				}
			}
			wx.navigateBack()
		} else {
			wx.showToast({
				title: "登录失败",
				icon: "none"
			})
		}
	})
}
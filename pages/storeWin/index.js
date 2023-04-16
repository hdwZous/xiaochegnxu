import { pvBuriedV2_, clickBuriedV2_ } from "../../common/util/BI"
import { request,FNIDS } from "../../common/util/api"
import { isLogin } from '../../common/util/loginUtil';
import { djCmsJump } from "../../common/util/agreementV2.js";

const app = getApp()
var dateTimePicker = require('./utils.js');
Page({
	shareFlag: true,
	isFirst:true,
	isNeedRequestBrand:true,
	buried: {
		isLogin: 0,
		templates: '',
		tempId: ''
	},
	/**
	 * 页面的初始数据
	 */
	data: {
		/**
		 * 链接附带参数
		 */
		qrCodeId: null,
		params: null,
		/**
		 * 按钮状态:
		 * null: 页面此时不需要显示按钮
		 * 0: 未登录
		 * 1: 注册成功，新用户
		 * 2: 已登录、已注册，老用户
		 * 3: 领券失败
		 */
		btstatus: null,
		/**
		 * loading状态:
		 * null: 默认
		 * loading: 正在加载
		 * done: 加载完成
		 */
		loading: null,
		errmsg: '',
		list: [],
		showSubscribeMessage: false,
		tmplIds: '',
		showLoading: true,
		nonetwork: false,
		protoolText:'',
		protoolUrl:"https://daojia.jd.com/html/agreementApp.html?type=88",
		openBrandAccount:false,
		brandName:"",
		isShowBrand:false,


		start_time: '',
		dateTimeArray: '', //时间数组
		startYear: new Date().getFullYear() - 10, //最小年份
		endYear: new Date().getFullYear() + 2, // 最大年份
		start_time_p: '', 
		showBabyInfo: false,
		babyInfoRequired: false,
		couponListTip:'',
		
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this

		wx.getNetworkType({
			success: function (res) {
			  const networkType = res.networkType
			  //不为none代表有网络
			  if ('none' != networkType) {
				that.setData({
					showLoading: true,
					nonetwork: false
				})
				if (options.paramText) {
					let param = JSON.parse(options.paramText)
					that.setParam(param)
				} else if (options.inviterId && options.shopId && options.taskId) {
					that.setParam(options)
					// this.setData({
					// 	qrCodeId: options.qrCodeId
					// })
				} else {
					if (options.qrCodeId) {
						that.setData({
							qrCodeId: options.qrCodeId
						}, () => {
							that.getQrCodeIdParams(options.qrCodeId)
						})
					}
					if (options.scene && options.scene.length) {
						that.setData({
							qrCodeId: options.scene
						}, () => {
							that.getQrCodeIdParams(options.scene)
						})
					}
				}
				wx.onNetworkStatusChange(function (res) {
					if (res.isConnected) {
						that.setData({
							showLoading: false,
							nonetwork: false
						})
					} else {
						that.setData({
							showLoading: false,
							nonetwork: true
						})
					}
				})
				
			  } else {
				that.setData({
					showLoading: false,
					nonetwork: true
				})
				wx.onNetworkStatusChange(function (res) {
					if (res.isConnected) {
						that.setData({
							showLoading: false,
							nonetwork: false
						})
					} else {
						that.setData({
							showLoading: false,
							nonetwork: true
						})
					}
				})
			  }
			},
		  })

	
		var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
		this.setData({
			start_time: obj.dateTime,
			// end_time: obj.dateTime,
			dateTimeArray: obj.dateTimeArray,
		});
		
	},

	// 生命周期函数--监听页面显示
	async onShow() {
		this.judgeBt();
	},

	changeDateTime(e) {
		let dateTimeArray = this.data.dateTimeArray,
		  {
			type,
			param
		  } = e.currentTarget.dataset;
		this.setData({
		  [type]: e.detail.value,
		  [param]: dateTimeArray[0][e.detail.value[0]] + '-' + dateTimeArray[1][e.detail.value[1]] + '-' + dateTimeArray[2][e.detail.value[2]] 
		});
	  },
	  changeDateTimeColumn(e) {
		console.log("111111");
		var dateArr = this.data.dateTimeArray,
		  {
			type
		  } = e.currentTarget.dataset,
		  arr = this.data[type];
		arr[e.detail.column] = e.detail.value;
		dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
		this.setData({
		  dateTimeArray: dateArr,
		  [type]: arr
		});
	  },

	_throttle(fn) {
        if (!this.shareFlag) return;
        this.shareFlag = false;
        fn.apply(this, arguments);
        setTimeout(() => {
            this.shareFlag = true;
        }, 2000);
    },

	showBabyPop(){
		// let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
		// this.data.recommendObj || {};
		// clickBuriedV2_({
		// 	create_time: new Date(),
		// 	click_id: "showModule",
		// 	click_par: {
		// 		type: "babyBirth",
		// 		taskId: this.data.params.taskId,
		// 		babyInfoRequired: this.data.babyInfoRequired ? 1:0
		// 	},
		// 	page_par:{
		// 		taskId: this.data.params.taskId,
		// 		inviterId: this.data.params.inviterId,
		// 		shopId: this.data.params && this.data.params.shopId
		// 	},
		// 	currentPageName: currentPageName,
		// 	prePageName: prePageName,
		// 	pageId: pageIdFirstPage,
		// });					
	},

	gotoH5(){
		let data = {
			"to": 'web',
			"params":{
				"url":this.data.protoolUrl,
			},
		}
    let { recommendObj = null } = this.data
		djCmsJump({
			to: data.to,
			params: data.params,
      preObj:recommendObj
		});
	},
	clickPro(){
		let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
		this.data.recommendObj || {};
		clickBuriedV2_({
			create_time: new Date(),
			click_id: "selectModule",
			click_par: {
				type: "brandMem",
				taskId: this.data.params.taskId,
				status: !this.data.openBrandAccount ? 1:0
			},
			page_par:{
				taskId: this.data.params.taskId,
				inviterId: this.data.params.inviterId,
				shopId: this.data.params && this.data.params.shopId
			},
			currentPageName: currentPageName,
			prePageName: prePageName,
			pageId: pageIdFirstPage,
		});
		this.setData({
			openBrandAccount: !this.data.openBrandAccount,
		})
		
	},

	pv() {
	
	},
	// pv埋点上报
	pvFunc(back) {
		let recommendObj = this.data.recommendObj || {};
		pvBuriedV2_({
		  create_time: new Date(),
		  currentPageName: recommendObj.currentPageName || "",
		  prePageName: recommendObj.prePageName || "",
		  pageId: recommendObj.pageIdFirstPage || "",
		  isBack: back || ""
		});
	},
	onNetworkStatusChange() {
		//获取网络类型
		wx.getNetworkType({
		  success: function (res) {
			const networkType = res.networkType
			//不为none代表有网络
			if ('none' != networkType) {
				this.setData({
					showLoading: false,
					nonetwork: false
				})
			//   that.globalData.nonetwork = true
			//   //网络状态变化事件的回调函数   开启网络监听，监听小程序的网络变化
			//   wx.onNetworkStatusChange(function (res) {
			// 	if (res.isConnected) {
			// 	  //网络变为有网
			// 	  that.globalData.nonetwork = true
			// 	} else {
			// 	  //网络变为无网
			// 	  that.globalData.nonetwork = false
			// 	}
			//   })
			} else {

				this.setData({
					showLoading: false,
					nonetwork: true
				})
			   //无网状态
			//   wx.onNetworkStatusChange(function (res) {
			// 	if (res.isConnected) {
			// 	  that.globalData.nonetwork = true
			// 	} else {
			// 	  that.globalData.nonetwork = false
			// 	}
			//   })
			}
		  },
		})
	  },
	judgeBt() {

		const { showLoading } = this.data;
		if (!isLogin()) {
			if (!this.isFirst && app.globalData.qrcode.business){
				wx.navigateTo({
          url: "/pages/newLogin/login/login",
          preObj: this.data.recommendObj,
        });
				this.setData({
					btstatus: 0
				})
			}
		} else {
			if (showLoading && this.data.params && this.data.params.shopId ){

				this._throttle(() => {
					this.getCoupon(true);
				})
			}
			if (this.data.btstatus !== 1 && this.data.btstatus !== 2 && this.data.btstatus !== 3) {
				this.setData({
					btstatus: 4,
				})
			}
		}
	},

	getThrottleCoupon(){
		this._throttle(() => {
			this.getCoupon(true);
		})
	},

	async getCoupon(isNeedJump) {
		// this.setData({
		// 	loading: 'loading',
		// 	showSubscribeMessage: true,
		// 	tmplIds: ['K1HtLhViyzUMKbZjeFmR3OKpz8gGpq3Fuy1guWIYVKA']
		// })


		// this.setData({
		// 	btstatus: 1,
		// 	loading: 'done',
		// 	list: resultsss.content.result,
		// 	showLoading: false
		// })
		this.setData({
			showLoading: false,
		})

		if (this.isNeedRequestBrand && this.data.params && this.data.params.taskClassify && this.data.params.taskClassify == '2'){
			this.isNeedRequestBrand = false
			request({
				method: "POST",
				...FNIDS.queryBrandHref,
				body: {
					...this.data.params
				},
			  }).then((res) => {
				if (res.data.status === "ok" && res.data.content &&( res.data.content.isShow || res.data.content.showBabyInfo)) {
					// setProtoolText(res.content.hrefWord)
					// setProtoolUrl(res.content.href)
					// setBrandName(res.content.brandName)
					// brandDispatch({ type: 'brand' })

					this.setData({
						protoolText: res.data.content.hrefWord,
						protoolUrl: res.data.content.href,
						brandName: res.data.content.brandName,
						isShowBrand: res.data.content.isShow,
						showBabyInfo: res.data.content.showBabyInfo,
						babyInfoRequired: res.data.content.babyInfoRequired,
						// isShowBrand: true,
						// showBabyInfo: true,
						// babyInfoRequired: false,
						loading: 'done',
					})
					let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
					this.data.recommendObj || {};
					clickBuriedV2_({
						create_time: new Date(),
						click_id: "showModule",
						click_par: {
							type: "brandMem",
							taskId: this.data.params.taskId
						},
						page_par:{
							taskId: this.data.params.taskId,
							inviterId: this.data.params.inviterId,
							shopId: this.data.params && this.data.params.shopId
						},
						currentPageName: currentPageName,
						prePageName: prePageName,
						pageId: pageIdFirstPage,
					});

					clickBuriedV2_({
						create_time: new Date(),
						click_id: "showModule",
						click_par: {
							type: "babyBirth",
							taskId: this.data.params.taskId,
							babyInfoRequired: this.data.babyInfoRequired ? 1:0
						},
						page_par:{
							taskId: this.data.params.taskId,
							inviterId: this.data.params.inviterId,
							shopId: this.data.params && this.data.params.shopId
						},
						currentPageName: currentPageName,
						prePageName: prePageName,
						pageId: pageIdFirstPage,
					});	

				}else{
					this.getList(isNeedJump)
					// this.setData({
					// 	protoolText:"res.data.content.hrefWord,",
					// 	protoolUrl: "https://baidu.com",
					// 	brandName: "ddd",
					// 	// isShowBrand: res.data.content.isShow,
					// 	// showBabyInfo: res.data.content.showBabyInfo,
					// 	// babyInfoRequired: res.data.content.babyInfoRequired,
					// 	isShowBrand: true,
					// 	showBabyInfo: true,
					// 	babyInfoRequired: false,
					// 	loading: 'done',
					// })
				}
				
			  }).catch(err => {
				this.getList(isNeedJump)
			 });
			
		}else{
			if (this.data.showBabyInfo && this.data.babyInfoRequired ){
				if (!this.data.start_time_p){
					wx.showToast({
						title: '请选择宝宝的生日',
						icon: "none",
					});
					return;
				}
				if (!this.data.openBrandAccount){
					wx.showToast({
						title: '请勾选品牌协议',
						icon: "none",
					});
					return;
				}
			}
			this.getList(isNeedJump)
		}
		
		

	},

	async getQrCodeIdParams(qrCodeId) {
		let res = await request({ ...FNIDS.getQrCode, body: { qrCodeId } })
		if (res.data.code == '0' && res.data.result) {
			let param = JSON.parse(res.data.result.paramText)
			this.setParam(param)
		}
	},

	setParam(param) {
		const { showLoading } = this.data;
		
		app.globalData.qrcode.business = param.business
		this.buried.isLogin = app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid ? 1 : 0
		this.setData({
			params: {
				inviterId: param.inviterId,
				shopId: param.shopId,
				taskId: param.taskId,
				orgCode: param.orgCode,
				taskClassify: param.taskClassify
			}
		}, () => {
			let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
					this.data.recommendObj || {};
					clickBuriedV2_({
						create_time: new Date(),
						click_id: "getPageResult",
						page_par:{
							taskId: this.data.params.taskId,
							inviterId: this.data.params.inviterId,
							shopId: this.data.params && this.data.params.shopId
						},
						currentPageName: currentPageName,
						prePageName: prePageName,
						pageId: pageIdFirstPage,
					});
			if (isLogin() && showLoading){
				this._throttle(() => {
					this.getCoupon(true);
				})
				
			}
			if (!isLogin() && this.isFirst ){
				if (app.globalData.qrcode.business){
					this.isFirst = false;
					wx.navigateTo({
            url: "/pages/newLogin/login/login",
            preObj: this.data.recommendObj,
          });
					this.setData({
						btstatus: 0
					})
				}else{
					wx.showToast({
						title: 'business为空',
						icon: 'none',
						duration: 3000,
					});
				}
				
			}
		})	
		console.log("this.data.params11111111111", this.data.params)
		
	},

	goregister() {

		wx.navigateTo({
      url: "/pages/newLogin/login/login",
      preObj: this.data.recommendObj,
    });

	},

	gohome() {
		if (this.data.params && this.data.params.shopId && this.data.params.orgCode){
      let { recommendObj = null } = this.data
			djCmsJump({
				to: 'store',
				params: {
					storeId: this.data.params.shopId,
					orgCode: this.data.params.orgCode,
					spreadChannel: "winnerCoupon"
				},
        preObj: recommendObj
			})
		}else {
			wx.switchTab({
				url: '/pages/home/home',
        preObj: this.data.recommendObj || {}
			})
		}
		let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
		this.data.recommendObj || {};
		clickBuriedV2_({
			create_time: new Date(),
			click_id: "clickUse",
			click_par: {
				taskId: this.data.params.taskId
			},
			page_par:{
				taskId: this.data.params.taskId,
				inviterId: this.data.params.inviterId,
				shopId: this.data.params && this.data.params.shopId
			},
			currentPageName: currentPageName,
			prePageName: prePageName,
			pageId: pageIdFirstPage,
		});

	},
	// 埋点监测该方法，勿删
	getapp() {
	},

	// 获取优惠券
	getList(isNeedJump) {
		//   pin 、inviterId、shopId、taskId 、cityId、wxOpenId、phone
		let loginStateInfo = app.globalData.loginStateInfo || {}
		let addressInfo = app.globalData.addressInfo || {}
		const unionId = wx.getStorageSync('unionid') || "";
		console.log('this.data.params====', this.data.params)
		console.log('loginStateInfo====', loginStateInfo)
		console.log('addressInfo====', addressInfo)
		let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
		this.data.recommendObj || {};
		
		clickBuriedV2_({
			create_time: new Date(),
			click_id: "clickReceive",
			click_par: {
				taskId: this.data.params.taskId
			},
			page_par:{
				taskId: this.data.params.taskId,
				inviterId: this.data.params.inviterId,
				shopId: this.data.params && this.data.params.shopId
			},
			currentPageName: currentPageName,
			prePageName: prePageName,
			pageId: pageIdFirstPage,
		});

		let data = {
			isNeedDealError: true,
			...FNIDS.wincoupon,
			body: {
				...this.data.params,
				...{
					cityId: addressInfo.cityId || 0,
					pin: loginStateInfo.PDJ_H5_PIN || '',
					wxOpenId: loginStateInfo.openId || '',
					openId: loginStateInfo.openId || '',
    				wxUnionId: unionId || '',
					phone: loginStateInfo.PDJ_H5_MOBILE || '',
					openBrandAccount: this.data.openBrandAccount,
					babyBirthday: this.data.start_time_p || '',
					showBrandAgreement: this.data.isShowBrand
				}
			}
		}
		this.setData({
		   loading: 'loading'
		})
		request(data)
			.then(res => {
				this.setData({
					loading: 'done'
				})
				if (res.data.status && res.data.status == 'ok') {
					if (res.data.content && res.data.content.result && res.data.content.result.length>0){
						this.setData({
							btstatus: 1,
							list: res.data.content.result,
						})
					}else{
						this.setData({
							btstatus: 1,
							errmsg: "暂无优惠券",
							list: res.data.content.result,
						})
					}

					let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
						this.data.recommendObj || {};

						if (res.data.content){
							this.setData({
								couponListTip: res.data.content.couponListTip
							})
						}
						
						
					if (res.data.content && this.data.params && this.data.params.taskClassify == '2'){
						
						if (res.data.content.openedBrandAccount == 1){

						  clickBuriedV2_({
							create_time: new Date(),
							click_id: "getBrandMemResult",
							click_par: {
								status: res.data.content.openedBrandAccount,
								taskId: this.data.params.taskId,
								errorCode: res.data.content.openedBrandAccount,
								errorMsg: '开通品牌会员失败',
							},
							page_par:{
								taskId: this.data.params.taskId,
								inviterId: this.data.params.inviterId,
								shopId: this.data.params && this.data.params.shopId
							},
							currentPageName: currentPageName,
							prePageName: prePageName,
							pageId: pageIdFirstPage,
						});
						}else if (res.data.content.openedBrandAccount == 2){
							clickBuriedV2_({
								create_time: new Date(),
								click_id: "getBrandMemResult",
								click_par: {
									status: res.data.content.openedBrandAccount,
									taskId: this.data.params.taskId
								},
								page_par:{
									taskId: this.data.params.taskId,
									inviterId: this.data.params.inviterId,
									shopId: this.data.params && this.data.params.shopId
								},
								currentPageName: currentPageName,
								prePageName: prePageName,
								pageId: pageIdFirstPage,
							});
						}
					}
					clickBuriedV2_({
						create_time: new Date(),
						click_id: "getCouponResult",
						click_par: {
							taskId: this.data.params.taskId,
							code: res.data.code,
							babyInfoRequired: this.data.babyInfoRequired ? 1:0,
							brandErrorCode: res.data.content.brandErrorCode
						},
						page_par:{
							taskId: this.data.params.taskId,
							inviterId: this.data.params.inviterId,
							shopId: this.data.params && this.data.params.shopId
						},
						currentPageName: currentPageName,
						prePageName: prePageName,
						pageId: pageIdFirstPage,
					});
					
					if (isNeedJump){
						if (res.data.content && res.data.content.couponListTip){
							this.setData({
								showLoading: false
							})
						}else{
							this.gohome();
							setTimeout(()=>{
								this.setData({
									showLoading: false
								})
							},3000);
						}
						
					}else{
						this.setData({
							showLoading: false
						})
					}
				} else if (res.data.status && res.data.status == 'fail') {
					let { errorMsg = '',errorCode } = res.data
					this.setData({
						btstatus: 2,
						errmsg: errorMsg,
						showLoading: false
					})
					let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
					this.data.recommendObj || {};
					clickBuriedV2_({
						create_time: new Date(),
						click_id: "getCouponResult",
						click_par: {
							taskId: this.data.params.taskId,
							code: errorCode,
							msg: errorMsg,
						},
						page_par:{
							taskId: this.data.params.taskId,
							inviterId: this.data.params.inviterId,
							shopId: this.data.params && this.data.params.shopId
						},
						currentPageName: currentPageName,
						prePageName: prePageName,
						pageId: pageIdFirstPage,
					});
				}
			})
			.catch(err => {
				console.log(err)

				
				this.setData({
					loading: 'done',
					showLoading: false
				})
			})
	},

	showBuyGoodsBury() {
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
	subscribeMessageBuried01() { },
	subscribeMessageBuried02() { },
	pageBuried(e) {
		const { type, templates, tempId } = e.detail;
		if (type == 1) {
			this.buried.templates = templates
			this.subscribeMessageBuried01()
		}
		if (type == 2) {
			this.buried.tempId = tempId
			this.subscribeMessageBuried02()
		}
	},
	showPicker_11: function () {
		this.setData({
		  isShow_11: true,
		})
	  
	},
	sureCallBack_11 (e) {
		let data = e.detail
		console.log("data",data);
		this.setData({
		  isShow_11: false,
		  picker_11_data: JSON.stringify(e.detail.choosedData),
		  picker_11_index:JSON.stringify(e.detail.choosedIndexArr)
	  
		})
	  },
	  cancleCallBack_11 () {
		this.setData({
		  isShow_11: false
		})
	  },

})

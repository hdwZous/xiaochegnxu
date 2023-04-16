import {
	FNIDS,
	request
} from "../../../common/util/api"
import mp from "../../../common/util/wxapi"

Page({

	/**
   * 页面的初始数据
   */
	data: {
		name: "请输入用药人真实姓名",
		idCard: "",
		phone: "",
		// 性别选择 
		chooseSex: -1,
		// 出生日期
		bornDate: "",
		// 现在年月日
		nowDate: {},
		// 日历选择器结束日期
		endTime: "",
		// 编辑的用药人信息
		editData: {},
		// 页面栈
		pages: []
	},

	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		if (options) {
			this.setData({
				type: options.type,
				name: options.name || "",
				editData: options.editData != undefined ? JSON.parse(options.editData) : ""
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
		let date = new Date(),
			month = date.getMonth() + 1,
			day = date.getDate();
		if (month < 10) {
			month = "0" + month
		}
		if (day < 10) {
			day = "0" + day
		}
		this.setData({
			nowDate: {
				year: date.getFullYear(),
				month: date.getMonth() + 1,
				day: date.getDate()
			},
			endTime: date.getFullYear() + "-" +
        month + "-" + day
		});
		getCurrentPages().forEach(item => {
			if (item && (item.route == "pages/medicineMan/choose/index")) {
				this.setData({
					prePage: item
				})
			}
		});
		let data = this.data;
		if (data.type == "edit" && data.editData) {
			this.setData({
				name: data.editData.useDrugName,
				chooseSex: data.editData.sex,
				idCard: data.editData.identityNumber,
				bornDate: data.editData.birthday,
				phone: data.editData.phoneNumber
			});
			wx.setNavigationBarTitle({
				title: "编辑用药人信息",
			})
		}
	},
	// 处理输入框
	handleInput(e) {
		let type = e.target.dataset.name,
			value = e.detail.value,
			nowDate = this.data.nowDate;
		switch (type) {
		case "name":
			let nameValue = value.replace(/[\d]/g, "");
			this.setData({
				name: nameValue
			});
			break;
		case "idCard":
			let cardValue = value;
			if (value.length >= 18) {
				// cardValue = value.slice(0, 18)
				let year = value.slice(6, 10),
					month = value.slice(10, 12),
					day = value.slice(12, 14);
				if (year >= 1960 && nowDate.year && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
					let bornDate = `${year}-${month}-${day}`;
					this.setData({
						bornDate: bornDate
					})
				}
			}
			this.setData({
				idCard: cardValue
			});
			break;
		case "phone":
			let phoneValue = value;
			this.setData({
				phone: phoneValue
			});
			break;
		default:
		}
	},
	// 清除输入框内容
	clearInput(e) {
		let type = e.target.dataset.name;
		switch (type) {
		case "name":
			this.setData({
				name: ""
			});
			break;
		case "idCard":
			this.setData({
				idCard: ""
			});
			break;
		case "phone":
			this.setData({
				phone: ""
			});
			break;
		default:
			break
		}
	},
	// input获取焦点
	inputFocus(e) {
		let type = e.target.dataset.name;
		switch (type) {
		case "name":
			this.setData({
				nameFocus: true
			});
			break;
		case "idCard":
			if (this.data.type == "edit") {
				this.setData({
					idCard: ""
				})
			}
			this.setData({
				idCardFocus: true,
			});
			break;
		case "phone":
			if (this.data.type == "edit") {
				this.setData({
					phone: ""
				})
			}
			this.setData({
				phoneFocus: true
			});
			break;
		default:
			break
		}
	},
	// input失去焦点
	inputBlur(e) {
		let type = e.target.dataset.name;
		switch (type) {
		case "name":
			this.setData({
				nameFocus: false
			});
			break;
		case "idCard":
			this.setData({
				idCardFocus: false
			});
			break;
		case "phone":
			this.setData({
				phoneFocus: false
			});
			break;
		default:
			break
		}
	},
	// 选择性别
	chooseSex(e) {
		let sexValue = e.target.dataset.sex;
		this.setData({
			chooseSex: sexValue
		})
	},
	// 选择日期
	bindDateChange(e) {
		let date = e.detail.value;
		this.setData({
			bornDate: date
		})
	},
	// 保存用药人信息
	saveMedicineMan() {
		let functionId;
		if (this.data.type == "edit") {
			functionId = FNIDS.updateUseDrugInfo;
			this.createOrUpdate(functionId)
		} else {
			functionId = FNIDS.insertUseDrugInfo;
			this.createOrUpdate(functionId)
		}
	},
	// 插入或修改用药人信息
	createOrUpdate(functionId) {
		let data = this.data;
		if (!data.name) {
			wx.showToast({
				title: "请填写用药人真实姓名",
				icon: "none"
			})
		} else if (data.chooseSex == -1) {
			wx.showToast({
				title: "请选择性别",
				icon: "none"
			})
		} else if (!data.idCard || data.idCard.length < 18) {
			if (data.idCard.length > 0 && data.idCard.length < 18) {
				wx.showToast({
					title: "身份证号码填写错误",
					icon: "none"
				})
			} else {
				wx.showToast({
					title: "请填写身份证号",
					icon: "none"
				})
			}

		} else if (!data.bornDate) {
			wx.showToast({
				title: "请选择出生日期",
				icon: "none"
			})
		} else if (!data.phone || data.phone.length < 11) {
			if (data.phone.length > 0 && data.phone.length < 11) {
				wx.showToast({
					title: "联系方式填写错误",
					icon: "none"
				})
			} else {
				wx.showToast({
					title: "请填写联系方式",
					icon: "none"
				})
			}
		} else {
			mp.loading();
			request({
				...functionId,
				method: "POST",
				body: {
					infoId: data.editData ? data.editData.infoId : "",
					useDrugName: data.name,
					sex: data.chooseSex,
					identityNumber: data.idCard,
					birthday: data.bornDate,
					phoneNumber: data.phone
				}
			}).then(res => {
				mp.hideLoading();
				let result = res.data.result;
				if (result && result.infoId) {
					if (this.data.type == "edit") {
						this.data.prePage.callBack({
							toast: "用药人信息已更新",
							chooseIndex: 0,
							infoId: result.infoId,
							name: this.data.name
						});
						this.updateSettel(result);
						wx.navigateBack({})
					} else if (this.data.type == "settlement") {
						wx.navigateBack({});
						this.updateSettel(result)
					} else if (this.data.type == "create") {
						this.data.prePage.callBack({
							toast: "",
							chooseIndex: 0,
							infoId: result.infoId,
							name: this.data.name
						});
						this.updateSettel(result);
						wx.navigateBack({})
					}
				} else {
					wx.showToast({
						title: "没有result",
						icon: "none"
					})
				}
			}).catch(error => {
				mp.hideLoading()
			})
		}
	},
	// 删除用药人信息
	deleteMedicineMan() {
		wx.showModal({
			title: "提示",
			content: "确定删除用药人信息吗",
			success: (res) => {
				if (res.confirm) {
					if (this.data.editData && this.data.editData.infoId) {
						mp.loading();
						request({
							...FNIDS.deleteUseDrugInfo,
							method: "POST",
							body: {
								infoId: this.data.editData.infoId
							}
						}).then(res => {
							mp.hideLoading();
							let data = res.data;
							if (data.code == 0) {
								this.data.prePage.callBack({
									toast: "用药人信息已删除"
								});
								wx.navigateBack({})
							} else {
								wx.showToast({
									title: data.msg,
									icon: "none"
								})
							}
						}).catch(error => {
							mp.hideLoading()
						})
					}
				}
			}
		})

	},
	// 更新结算页用药人信息
	updateSettel(result) {
		getCurrentPages().forEach(item => {
			if (item && (item.route == "pages/settlementV2/index")) {
				item.initMan({
					medicineManId: result.infoId,
					medicineManName: this.data.name
				})
			}
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

	}
});
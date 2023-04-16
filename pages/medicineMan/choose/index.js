import {
	FNIDS,
	request
} from "../../../common/util/api"
import mp from "../../../common/util/wxapi"
import { pvBuriedV2_ , clickBuriedV2_} from "../../../common/util/BI";
import {
	isLogin
} from "../../../common/util/loginUtil"
let app = getApp();
Page({
	buried:{
		
		
		
	},
	/**
     * 页面的初始数据
     */
	data: {
		// 用药人列表
		personList: [],
		// 选择的用药人index；
		chooseIndex: 0,
		// 默认页提示
		tips: "暂无可用的用药人信息",
		// 是否显示默认页
		showEmpty: false,
		// 默认页图片
		src: "https://storage.360buyimg.com/wximg/medicine/noPerson.png",
		// 选中图标
		chooseSrc: "https://storage.360buyimg.com/wximg/medicine/choose.png",
		// 未选中图标
		onChooseSrc: "https://storage.360buyimg.com/wximg/medicine/noChoose.png",
		// pages
		pages: [],
		
	},

	/**
     * 生命周期函数--监听页面加载
     */
	onLoad: function(options) {
		this.setData({
			infoId: options.infoId && options.infoId || ""
		})
		
		
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
		
		if (!isLogin()) {
			
			wx.navigateTo({
			    url: `/pages/newLogin/login/login`
			})
		} else {
			this.getPersonList()
		}
	
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
	// 获取用药人信息列表
	getPersonList() {
		request({
			...FNIDS.getUseDrugInfoList,
			method: "POST",
		}).then(res => {
			if (this.data.toast) {
				wx.showToast({
					title: this.data.toast,
					icon: "none"
				});
				// 防止toast重复显示
				this.setData({
					toast: ""
				})
			}
			let result = res.data.result;
			if (result && result.useDrugVOList && result.useDrugVOList.length > 0) {
				let chooseIndex = 0,
					useDrugName = "",
					infoId = result.useDrugVOList[0].infoId;
				if (this.data.infoId) {
					result.useDrugVOList.forEach((item, index) => {
						if (item.infoId == this.data.infoId) {
							chooseIndex = index;
							useDrugName = item.useDrugName;
							infoId = item.infoId
						}
					})
				}
				this.setData({
					personList: result.useDrugVOList,
					showEmpty: false,
					chooseIndex: chooseIndex,
					infoId: infoId
				});
				this.updateSettel({
					infoId: infoId,
					useDrugName: useDrugName
				})
			} else {
				this.setData({
					showEmpty: true
				})
			}
		}).catch(error => {})
	},
	// 新建用药人
	createPerson() {
		let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
        this.data.recommendObj || {};
		clickBuriedV2_({
			create_time: new Date(),
			click_id: "addDrugUser",
			click_par:{

			},
			currentPageName: currentPageName,
            prePageName: prePageName,
            pageId: pageIdFirstPage,

		});
		wx.navigateTo({
			url: "/pages/medicineMan/createOrEdit/index?type=create",
		})
	},
	// 编辑用药人
	editPerson(e) {
		let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
        this.data.recommendObj || {};
		clickBuriedV2_({
			create_time: new Date(),
			click_id: "editDrugUser",
			click_par:{

			},
			currentPageName: currentPageName,
            prePageName: prePageName,
            pageId: pageIdFirstPage,

		});
		let editData = JSON.stringify(e.currentTarget.dataset.item);
		wx.navigateTo({
			url: `/pages/medicineMan/createOrEdit/index?type=edit&editData=${editData}`,
		})
	},
	// 选择用药人
	choosePerson(e) {
		let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
        this.data.recommendObj || {};
		clickBuriedV2_({
			create_time: new Date(),
			click_id: "selectDrugUser",
			click_par:{

			},
			currentPageName: currentPageName,
            prePageName: prePageName,
            pageId: pageIdFirstPage,
		});
		let data = e.currentTarget.dataset;
		this.setData({
			chooseIndex: data.index
		});
		wx.navigateBack({});
		this.updateSettel(data)
	},
	// 编辑用药人的回调
	callBack(data) {
		if (data) {
			this.setData({
				toast: data.toast,
				chooseIndex: data.chooseIndex || this.data.chooseIndex,
				infoId: data.infoId || this.data.infoId
			})
		}
	},
	// 更新结算页用药人信息
	updateSettel(data) {
		getCurrentPages().forEach(item => {
			if (item && (item.route == "pages/settlementV2/index")) {
				item.initMan({
					medicineManId: data.infoId,
					medicineManName: data.useDrugName
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
	onUnload: function() {},

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
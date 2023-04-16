import {
	isLogin
} from "../../../common/util/loginUtil"
import {request, FNIDS} from "../../../common/util/api"
import { mpCmsJump } from "../../../common/util/agreementV2";
import {
  pvBuriedV2_,
  clickBuriedV2_
} from "../../../common/util/BI"
let app = getApp()
Page({
  // 埋点
  buried: {
    userAction: {
      url: '',
      res_type: '',
      res_unit: ''
    },
	get_coupon_result: 'success',
	
	
	
  },
	/**
   * 页面的初始数据
   */
	data: {
		stroeName: "观音寺北里",
		// 弹层宽高
		dialogWidth: 590,
		dialogHeight: 410,
		showDialog: false,
		scrollViewData: "",
		// 是否登录
		isLogin: false,
		// 优惠券信息
		CouponEntity: [],
		// 商家Id
		storeId: "",
		// 经纬度
		longitude: 91.00565,
		latitude: 29.63876,
		// 地址
		address: "北京市大兴区南湖巷",
		// 城市Id
		cityId: 2951,
		// 跳转
		type: 7,
		// 默认页-按钮
		btnText: "返回首页",
		// 默认页-提示
		tips: "当前门店没有线下优惠券可领哦~",
		// 默认页-图标
		src: "https://storage.360buyimg.com/wximg/medicine/noPerson.png",
		// 是否展示默认页 true 不展示 false 展示
		CouponEntityShow: false,
		reRequest: false,
		currentIndex: 0,
		
	},
	/**
   * 展示弹层
   */
	show_dialog: function () {
		this.setData({
			showDialog: true
		})
		// 上报
    let {recommendObj = {}} = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "seeCouponExplain",
      click_par: {},
      pageId: recommendObj.pageId || "",
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || ""
    });
	},
	/**
   * 跳转门店列表页
   */
	toSearch () {
    let {recommendObj = {}} = this.data;
		wx.navigateTo({
      url: `../storeList/index?longitude=${this.data.longitude}&latitude=${this.data.latitude}&cityId=${this.data.cityId}&stroeName=${this.data.stroeName}`,
      preObj: recommendObj
		})
	},
	/**
   * 获取门店下的优惠券列表
   */
	getStoreVoucher: function(lgt, lat, cityId, storeId) {
		request({
      ...FNIDS.superMemberCoupon,
      isNeedDealError: true,
      body: {
        lgt: lgt,
        lat: lat,
        cityId: cityId,
        storeId: storeId,
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        let data = res.data.result;
        let CouponEntityShow = false;
        if (res.data.code == 0) {
          // 判断是否显示默认组件
          if (data.couponList.length == 0) {
            CouponEntityShow = true;
          }
          this.setData({
            scrollViewData: data.config,
            stroeName: data.stationInfoVO.statioName,
            CouponEntity: data.couponList,
            CouponEntityShow: CouponEntityShow,
          });
          // 首页曝光
          this.upClickData(0);
        }
      })
      .catch(() => {});
	},
	/**
   * 获取优惠券
   */
	getCoupon(e) {
		let self = this
    // 判断是否需要登录
    let {recommendObj = {}} = this.data;
		if(isLogin()) {
			let data = e.currentTarget.dataset
			// 优惠券码
			let couponCode = data.couponCode
      // 埋点
      this.reportGetCoupon()
		
			// 是否要弹出随机券弹层
			let isShowLayer = data.isShowLayer
			// 点击的位置
			let index = data.index
			// 优惠券请求
			this.requestCoupon({
				couponCode: couponCode,
				opertype: 2,
				index: index
			})
		}else {
			
			wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: recommendObj
			})
		}
	},
	/**
   * 重置优惠券状态
   */
	resetCouponstatus(index) {
		let dataLsit = this.data.CouponEntity
		dataLsit[index].isGain = true
		this.setData({
			CouponEntity: dataLsit
		})
	},
	/**
   * 优惠券请求
   */
	requestCoupon(obj) {
		var _t = this
		request({
      ...FNIDS.getCoupon,
      isNeedDealError: true,
      body: {
        code: obj.couponCode || "",
        fromSource: "5",
        storeNo: this.data.storeId || "",
        operType: obj.opertype || "",
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        let data = res.data;
        if (data.code === "0" && data.result) {
          // 领券成功
          _t.resetCouponstatus(obj.index);
          // 埋点
          this.reportRequestCoupon("success");
        } else {
          // 其他券toast
          mp.toast({
            title: res.data.msg,
          });
          // 埋点
          this.reportRequestCoupon("fail");
        }
      })
      .catch(() => {
        // 埋点
        this.reportRequestCoupon("fail");
      });
	},
	/**
   * 点击轮播跳转
   */
	bannerJump: function(e) {
		let data = e.currentTarget.dataset
		let needLogin = data.needLogin
		let jump = data.jump
		let linkUrl = data.linkUrl
		let index = data.index
		let type = data.type
    let dataLength = this.data.scrollViewData.length;
    let { recommendObj = {} } = this.data;
		// 登录逻辑
		if (needLogin) {
			if (isLogin()) {
				if(jump) {
					mpCmsJump({
            pageType: jump,
            params: {},
          });
				}else {
					let url = linkUrl
					wx.navigateTo({
            url: "/pages/h5/index?needToken=1&url=" + encodeURIComponent(url),
            preObj: recommendObj
					})
				}
			} else {
				// wx.navigateTo({
				// 	url: "../newLogin/login/login?source=game"
				// })
                
                wx.navigateTo({
                    url: `/pages/newLogin/login/login`,
                    preObj: recommendObj
                })
			}
		} else {
			if(jump) {
				mpCmsJump({
          pageType: jump,
          params: {},
          preObj: recommendObj
        });
			}else {
				let url = linkUrl
				wx.navigateTo({
          url: `/pages/h5/index?&url=${encodeURIComponent(url)}`,
          preObj: recommendObj
				})
			}
		}
		if (!linkUrl) {
			linkUrl = "page/home/home"
		}
		index = ++index

    // 上报
    this.reportBannerClick(linkUrl, dataLength, index)
	},
	/**
   * 没有订单,时候跳转首页
   */
	backtoHome () {
    let { recommendObj = {} } = this.data;
    // 上报
    this.reportBackHome()
		mpCmsJump({
      pageType: "p1",
      params: {},
      preObj: recommendObj
    });
	},
	/**
   * 生命周期函数--监听页面加载
   */
	onLoad: function(options) {
		// 上线前打开这段注释
		if (options) {
			// 获取从首页跳转数据
			this.setData({
				longitude: options.longitude || app.globalData.addressInfo.longitude || "",
				latitude: options.latitude || app.globalData.addressInfo.latitude || "",
				cityId: options.cityId || app.globalData.addressInfo.cityId || "",
				storeId: options.storeId || app.globalData.storeInfo.storeId || "",
				stroeName: options.stroeName || app.globalData.qrcode.stroeName || ""
			})
			this.getStoreVoucher(this.data.longitude, this.data.latitude, this.data.cityId, this.data.storeId)
		}
		this.getStoreVoucher(this.data.longitude, this.data.latitude, this.data.cityId, this.data.storeId)

		
		
	},
	/**
   * 关闭弹层
   */
	closePop: function () {
	},
	/**
   * 用户点击右上角分享
   */
	onShareAppMessage: function() {
		return {
			title: "京东到家",
			path: `/pages/home/home?type=12&activityId=${this.data.activityId}`
		}
	},
	/**
   * 滚动事件
   */
	swiperChange: function (e) {
		let index = e.detail.current
		// this.upClickData(index);
		this.setData({
			currentIndex: e.detail.current
		})
	},
	upClickData (index) {
		let data = this.data.scrollViewData[index]
		let linkUrl = data.linkUrl
		let currentIndex = data.index
		let type = data.type
		let dataLength = this.data.scrollViewData.length
		if (!linkUrl) {
			linkUrl = "page/home/home"
		}
    index = ++index
    this.reportUpClickData(linkUrl, dataLength, index)
	},
	/**
   * 跳转回领券页重新请求列表
   */
	onShow: function() {
		if (this.data.reRequest) {
			let longitude = this.data.longitude || app.globalData.addressInfo.longitude || "" 
			let latitude = this.data.latitude || app.globalData.addressInfo.latitude || ""
			let cityId = this.data.cityId || app.globalData.addressInfo.cityId || ""
			let storeId = this.data.storeId || app.globalData.storeInfo.storeId || ""
			this.getStoreVoucher(this.data.longitude, this.data.latitude, this.data.cityId, this.data.storeId)
		}
		
		
		
		
  },

  pvFunc(back) {
    let { recommendObj } = this.data;
    pvBuriedV2_({
      page_par: {
        ref_par: {
          traceId: recommendObj.preTraceId || "",
          userAction: recommendObj.preUserAction || "",
        }
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
	  pageId: recommendObj.pageIdFirstPage || "",
	  isBack: back || "",
    })
  },

  /* ------------------ 自动化埋点新增逻辑    --------------------  */
  reportUpClickData(linkUrl, dataLength, index) {
    let userAction = {
      url: linkUrl,
      res_type: `banner_${dataLength}`,
      res_unit: index
    }

    let {recommendObj = {}} = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "bannerlist",
      click_par: {
        userAction
      },
      pageId: recommendObj.pageId || "",
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || ""
    });
  },
  reportGetCoupon(){
    let {recommendObj = {}} = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "get_coupon",
      click_par: {},
      pageId: recommendObj.pageId || "",
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || ""
    });
  },
  reportRequestCoupon(result) {
    let get_coupon_result = result
    let {recommendObj = {}} = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "get_coupon_result",
      click_par: {
        get_coupon_result
      },
      pageId: recommendObj.pageId || "",
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || ""
    });

  },
  reportBannerClick(linkUrl, dataLength, index) {
    let userAction = {
      url: linkUrl,
      res_type: `banner_${dataLength}`,
      res_unit: index
    }
    let {recommendObj = {}} = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "bannerClick",
      click_par: {
        userAction
      },
      pageId: recommendObj.pageId || "",
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || ""
    });
  },
  reportBackHome(){
    let {recommendObj = {}} = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "to_home",
      click_par: {},
      pageId: recommendObj.pageId || "",
      currentPageName: recommendObj.currentPageName || '',
      prePageName: recommendObj.prePageName || ''
    });
  }
})
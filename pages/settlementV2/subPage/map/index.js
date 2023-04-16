import { request, FNIDS } from "../../../../common/util/api"
import { pvBuriedV2_ } from "../../../../common/util/BI"
import util from "../../../../common/util/util"
let app = getApp();
let map;
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		// 定位与门店的距离说明
		distanceExplain: "",
		// 经度
		longitude: "",
		// 纬度
		latitude: "",
		// 门店地址
		storeAddress: '',
		// 门店图标
		storeIcon: '',
		storeLat: "",
		storeLng: "",
		storeName: "",
		markers: [],
    orderPageId: '',
    storeId: '',
    unique: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		// 使用 wx.createMapContext 获取 map 上下文
		map = wx.createMapContext("map");
    this.setData({
      orderPageId: options.orderPageId || '',
      storeId: options.storeId || '',
      unique: options.unique || ''
    })

		this.getSettleStoresMap();
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},
  pvFunc(back){
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    pvBuriedV2_({
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName,
      isBack: back || ""
    })
  },
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	// 获取地图信息
	getSettleStoresMap() {
    let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
		request({
			method: "POST",
			...FNIDS.settleStoresMap,
			body: {
				cityId: app.globalData.addressInfo.cityId,
				fromSource: 5,
				unique: this.data.unique,
				storeId: this.data.storeId,
				orderPageId: this.data.orderPageId
			},
      pageId: pageIdFirstPage,
      preObj: recommendObj
		}).then(res => {
			if(res.data.code == 0) {
				this.setData({
					markers: [{
						id: 1,
						longitude: res.data.result.storeLng,
						latitude: res.data.result.storeLat,
						// iconPath: res.data.result.storeIcon,
						iconPath: 'https://storage.360buyimg.com/wxmini/map/icon-dot.png',
						width: 1,
						height: 1,
						head: res.data.result.storeIcon,
						alpha: 1,
						customCallout: {
							alpha: 1,
							anchorY: -10,
							// anchorX: -1,
							display: 'ALWAYS'
						}
					}],
					...res.data.result
				})
			}
			this.getLocation();
		})
	},
	
	copy() {
		wx.setClipboardData({
			data: this.data.storeAddress,
			success() {
				wx.showToast({
					title: '地址复制成功',
					icon: 'none',
			})
			}
		})
	},

	/**
	 * 获取当前位置
	 */
	getLocation() {
		let self = this;
		wx.getSetting({
			success (res) {
				if(res.authSetting["scope.userLocation"]) {
					wx.getStorage({
						key: 'address_info',
						success (res) {					
							self.setData({
								markers: [
									self.data.markers[0],
									{
										longitude: res.data.longitude,
										latitude: res.data.latitude,
										width: 40,
										height: 48,
										iconPath: 'https://storage.360buyimg.com/wxmini/map/icon-start.png'
									}
								],
								longitude: res.data.longitude || "",
								latitude: res.data.latitude || ""
							});
						}
					})
				}
			}
		})
	},

	/**
	 * 将地图中心移动到当前定位点
	 */
	resetMap() {
		map.moveToLocation({
			longitude: this.data.storeLng,
			latitude: this.data.storeLat
		})
	},

	/**
	 * 设置缓存
	 * @param key: 地址名
	 * @param value：地址值
	 * @param isChange：是否需要首页切换地址
	 */
	setStorageSync(key, value, isChange) {
		return new Promise((resolve, reject) => {
			try {
				wx.setStorage({
					key: key,
					data: value,
					success(res) {
						util.refreshHomePage(isChange);
						app.globalData.addressInfo = value;
						app.globalData.needCheckLocationChange = false;
						resolve(res)
					},
					fail(err) {
						reject(err)
					}
				})
			} catch (e) { }
		})
	}
});


import {
  clickBuriedV2_
} from "../../common/util/BI"
import {
    request,
    FNIDS
} from '../../common/util/api';

let app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    stroeName: '亦城财富中心',
    isShowHistory: false,
    // 地址信息
    addressInfo: '',
    // 城市Id
    cityCode: '',
    // 经纬度
    longitude: '',
    latitude: '',
    storeListData:{
      "code": "0",
      "msg": "成功",
      "result": [{
        "stationNo": "10001",
        "stationAddress": '朝阳区金蝉里22号院1号楼10号铺位',
        "orgCode": '11000000',
        "statioName": '百果园林肯公园店',
        "distance": 0.2,
        "distanceDesc": "距离描述 1.1km",
        "serviceTimeDesc": "门店营业时间：09:00~21:00"
      }, {
        "stationNo": "10001",
        "stationAddress": '朝阳区金蝉里22号院1号楼10号铺位',
        "orgCode": '11000000',
        "statioName": '百果园林肯公园店',
        "distance": 0.2,
        "distanceDesc": "距离描述 1.1km",
        "serviceTimeDesc": "门店营业时间：09:00~21:00"
      }, {
        "stationNo": "10001",
        "stationAddress": '朝阳区金蝉里22号院1号楼10号铺位',
        "orgCode": '11000000',
        "statioName": '百果园林肯公园店',
        "distance": 0.2,
        "distanceDesc": "距离描述 1.1km",
        "serviceTimeDesc": "门店营业时间：09:00~21:00"
      }, {
        "stationNo": "10001",
        "stationAddress": '朝阳区金蝉里22号院1号楼10号铺位',
        "orgCode": '11000000',
        "statioName": '百果园林肯公园店',
        "distance": 0.2,
        "distanceDesc": "距离描述 1.1km",
        "serviceTimeDesc": "门店营业时间：09:00~21:00"
      }, {
        "stationNo": "10001",
        "stationAddress": '朝阳区金蝉里22号院1号楼10号铺位',
        "orgCode": '11000000',
        "statioName": '百果园林肯公园店',
        "distance": 0.2,
        "distanceDesc": "距离描述 1.1km",
        "serviceTimeDesc": "门店营业时间：09:00~21:00"
      }, {
        "stationNo": "10001",
        "stationAddress": '朝阳区金蝉里22号院1号楼10号铺位',
        "orgCode": '11000000',
        "statioName": '百果园林肯公园店',
        "distance": 0.2,
        "distanceDesc": "距离描述 1.1km",
        "serviceTimeDesc": "门店营业时间：09:00~21:00"
      }, {
        "stationNo": "10001",
        "stationAddress": '朝阳区金蝉里22号院1号楼10号铺位',
        "orgCode": '11000000',
        "statioName": '百果园林肯公园店',
        "distance": 0.2,
        "distanceDesc": "距离描述 1.1km",
        "serviceTimeDesc": "门店营业时间：09:00~21:00"
      }, {
        "stationNo": "10001",
        "stationAddress": '朝阳区金蝉里22号院1号楼10号铺位',
        "orgCode": '11000000',
        "statioName": '百果园林肯公园店',
        "distance": 0.2,
        "distanceDesc": "距离描述 1.1km",
        "serviceTimeDesc": "门店营业时间：09:00~21:00"
      }, {
        "stationNo": "10001",
        "stationAddress": '朝阳区金蝉里22号院1号楼10号铺位',
        "orgCode": '11000000',
        "statioName": '百果园林肯公园店',
        "distance": 0.2,
        "distanceDesc": "距离描述 1.1km",
        "serviceTimeDesc": "门店营业时间：09:00~21:00"
      }, {
        "stationNo": "10001",
        "stationAddress": '朝阳区金蝉里22号院1号楼10号铺位',
        "orgCode": '11000000',
        "statioName": '百果园林肯公园店',
        "distance": 0.2,
        "distanceDesc": "距离描述 1.1km",
        "serviceTimeDesc": "门店营业时间：09:00~21:00"
      }],
      "success": true
    }
  },
  /**
   * 请求超级会员码
   */
  getStoreList() {
      request({
        ...FNIDS.superNumStationList,
        body: {
          lgt: this.data.longitude,
          lat: this.data.latitude,
          cityId: this.data.cityCode,
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        preObj: this.data.recommendObj || {},
      })
        .then((res) => {})
        .catch((err) => {});
  },
  /**
   * 去地图页
   */
  goToMap() {
      let { recommendObj = {} } = this.data;
      // 获取缓存地理位置信息
      try {
        let addressInfo = wx.getStorageSync('address_info');
        if (addressInfo) {
          wx.navigateTo({
            url: '/pages/address/map/index?from=voucherstoList',
            preObj: recommendObj
          })
        }else {
          wx.showToast({
            title: '请先返回授权地理位置哦！',
            icon: 'none',
            duration: 2000
          })
        }
      } catch (e) {

      }
  },
  /**
   * 去搜索地址页
   */
  goToSearch() {
      // 埋点
      let {recommendObj = {}} = this.data;
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "searchAddress",
          click_par: {},
          pageId: recommendObj.pageId || "",
          currentPageName: recommendObj.currentPageName || '',
          prePageName: recommendObj.prePageName || ''
        });
      wx.navigateTo({
        url: '../../address/search/index?from=pages/voucherAbout/storeList/index',
        preObj: recommendObj
      })
  },
  /**
   * 点击门店列表获取门店优惠券
   */
  getStoreVoucher (e) {
    let data = e.currentTarget.dataset;
    let longitude = this.data.longitude || app.globalData.addressInfo.longitude;
    let latitude = this.data.latitude || app.globalData.addressInfo.latitude;
    let cityId = this.data.cityCode || app.globalData.addressInfo.cityId;
    let {recommendObj = {}} = this.data;
    wx.navigateTo({
      url: `../voucher/index?longitude=${longitude}&latitude=${latitude}&cityId=${cityId}&storeNo=${data.stroeNo}&stroeName=${this.data.stroeName}`,
      preObj: recommendObj
    })
  },
  onShow() {
    // 第一次进来 addressInfo为null,从选择地址页进来会更新
    if( this.data.addressInfo){
      this.setData({
        cityCode: this.data.addressInfo.cityId,
        longitude: this.data.addressInfo.longitude,
        latitude: this.data.addressInfo.latitude,
        stroeName: this.data.addressInfo.poi
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getStoreList(this.data.longitude, this.data.latitude, this.data.cityCode);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '京东到家',
      path: '/pages/home/home?type=12&activityId=' + this.data.activityId
    }
  }
});
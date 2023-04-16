
import {
  pvBuriedV2_,
  clickBuriedV2_
} from "../../../common/util/BI"
import mp from "../../../common/util/wxapi"
import {
    request,
    FNIDS
} from "../../../common/util/api"


let app = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        stroeName: "亦城财富中心",
        isShowHistory: false,
        // 地址信息
        addressInfo: "",
        // 城市Id
        cityCode: "",
        // 经纬度
        longitude: "",
        latitude: "",
        storeListData: [],
        // 当前页面
        currentPage: 1,
        // 是否展示lodaing
        showBottomTip: false,
        
    },
    /**
     * 请求超级会员码门店列表
     */
    getStoreList(lgt, lat, cityId, dasize, currentPage) {
        let t = this;
            // 用于展示的列表
        let showList = this.data.storeListData;
            // 开启loading
        mp.loading_cover();
        request({
          ...FNIDS.superNumStationList,
          isNeedDealError: true,
          body: {
            lgt: lgt,
            lat: lat,
            cityId: cityId,
            dasize: 10,
            currentPage: currentPage,
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            let data = res.data;
            // 拼接展示的数据
            if (data.code === "0" && data.result) {
              showList = showList.concat(data.result);
              t.setData({
                storeListData: showList,
                currentPage: currentPage + 1,
              });
            }
          })
          .catch(() => {});
    },
    /**
     * 去地图页
     */
    goToMap() {
        // 埋点
        let {recommendObj = {}} = this.data;
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "searchAddress",
          click_par: {},
          pageId: recommendObj.pageId || "",
          currentPageName: recommendObj.currentPageName || "",
          prePageName: recommendObj.prePageName || ""
        });

        // 获取缓存地理位置信息
        try {
            let addressInfo = wx.getStorageSync("address_info");
            if (addressInfo) {
                wx.navigateTo({
                    url: "../../address/map/index?region=" + addressInfo.cityName + "&longitude=" + addressInfo.longitude + "&latitude=" + addressInfo.latitude + "&from=" + "voucherstoList",
                    preObj: recommendObj
                })
            } else {
                wx.showToast({
                    title: "请先返回授权地理位置哦！",
                    icon: "none",
                    duration: 2000
                })
            }
        } catch (e) {}
    },
    /**
     * 去搜索地址页
     */
    goToSearch() {
        let {recommendObj = {}} = this.data;
        wx.navigateTo({
            url: "../../address/search/index?from=pages/coupon/storeList/index",
            preObj: recommendObj
        })
    },
    /**
     * 点击门店列表获取门店优惠券
     */
    getStoreVoucher(e) {
        let data = e.currentTarget.dataset;
        let longitude = this.data.longitude || app.globalData.addressInfo.longitude;
        let latitude = this.data.latitude || app.globalData.addressInfo.latitude;
        let cityId = this.data.cityCode || app.globalData.addressInfo.cityId;
        let storeId = data.stroeNo;
        let stroeName = data.statioName;
        let pages = getCurrentPages();

        for (let page of pages) {
            if (page && (page.route == "pages/coupon/voucher/index")) {
                page.setData({
                    longitude: longitude,
                    latitude: latitude,
                    cityId: cityId,
                    storeId: storeId,
                    stroeName: stroeName,
                    reRequest: true
                });
                wx.navigateBack();
                break
            }
        }
        let {recommendObj = {}} = this.data;
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "selectAddress",
          click_par: {
            poi: stroeName
          },
          pageId: recommendObj.pageId || "",
          currentPageName: recommendObj.currentPageName || "",
          prePageName: recommendObj.prePageName || ""
        });
    },
    /**
     * 分页加载数据
     */
    loadingMore() {
        this.getStoreList(this.data.longitude, this.data.latitude, this.data.cityCode, 20, this.data.currentPage)
    },
    onShow() {
        // 第一次进来 addressInfo为null,从选择地址页进来会更新
        if (this.data.addressInfo) {
            this.setData({
                cityCode: this.data.addressInfo.cityId,
                longitude: this.data.addressInfo.longitude,
                latitude: this.data.addressInfo.latitude,
                stroeName: this.data.addressInfo.poi,
                currentPage: 1,
                storeListData: []
            });
            this.getStoreList(this.data.addressInfo.longitude, this.data.addressInfo.latitude, this.data.addressInfo.cityId, 20, this.data.currentPage)
        }

        
        
        
    },
    // pv埋点上报
    pvFunc(back) {
      let { recommendObj } = this.data;
      pvBuriedV2_({
        page_par: {
          page_name: 'SelectAddressOffline',
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (options) {
            this.setData({
                longitude: options.longitude,
                latitude: options.latitude,
                cityCode: options.cityId,
                stroeName: options.stroeName
            });
            this.getStoreList(this.data.longitude, this.data.latitude, this.data.cityCode, 20, this.data.currentPage)
            
            
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {
        return {
            title: "京东到家",
            path: "/pages/home/home?type=12&activityId=" + this.data.activityId
        }
    }
});
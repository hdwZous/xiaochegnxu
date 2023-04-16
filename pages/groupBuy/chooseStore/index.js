import {
    FNIDS,
    request
} from "../../../common/util/api"
import { pvBuriedV2_ , clickBuriedV2_ } from "../../../common/util/BI";
import { getDaoJiaLocation } from "../../../common/util/services";
let app = getApp(),
    that;


Page({
    // 埋点数据
    buried: {
        storeId: "",
        
        
        
    },

	/**
     * 页面的初始数据
     */
    data: {

        // 默认页-是否展示
        showEmpty: false,
        // 默认页-类型
        type: "",
        // 默认页-图标
        src: "",
        // 默认页-按钮
        btnText: "",
        // 默认页-按钮
        tips: "暂无门店",

        //附近门店列表
        storeList: [],
        
    },

	/**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            storeId: options.storeId || "",
            from: options.from || "",
            addressId: options.addressId || "",
            orgCode: options.orgCode || "",
            skuId: options.skuId || "",
            promotionId: options.promotionId || "",

            cityCode: options.cityCode || "",
            longitude: options.longitude || "",
            latitude: options.latitude || "",
            addressInfo: null
        })
        
        
    },

	/**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //第一次进来 addressInfo为null,从选择地址页进来会更新
        if (this.data.addressInfo) {
            this.data.cityCode = this.data.addressInfo.cityId,
                this.data.longitude = this.data.addressInfo.longitude,
                this.data.latitude = this.data.addressInfo.latitude
        }
        // 获取地址列表
        this.checkLocation(this.getExtractStationList);

        
        
        
    },

    // pv埋点上报
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
            create_time: new Date(),
            page_par: {},
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
            isBack: back || "",
        });
    },

	/**
     * 获取地址列表
     */
    getExtractStationList() {
        request({
          ...FNIDS.getExtractStationList,
          body: {
            fromSource: 5,
            storeId: "",
            orgCode: this.data.orgCode || "",
            skuId: this.data.skuId || "",
            promotionId: this.data.promotionId || "",
            cityCode: this.data.cityCode || "",
            longitude: this.data.longitude || "",
            latitude: this.data.latitude || "",
          },
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            let result = res.data.result;
            if (result && result.extractStation) {
              if (result.extractStation.length > 0) {
                this.setData({
                  storeList: result.extractStation,
                  showEmpty: false,
                });
              } else {
                this.setData({
                  showEmpty: true,
                  type: 0,
                  tips: "很抱歉，附近暂无提货门店",
                  src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png",
                });
              }
            }
          })
          .catch(() => {});
    },

	/**
     * 监听默认页按钮事件
     */
    onDefaultBtnEvent(e) {
        let type = e.detail.type;
        if (type === 6) { // 去登录
            let recommendObj = this.data.recommendObj || {};
            wx.navigateTo({
              url: `/pages/newLogin/login/login`,
              preObj: recommendObj,
              buried_position: "groupBuy-chooseStore",
            });
        } else if (type === 7) {
            // 跳转至编辑或新建地址页
            this.goToEditAddress(e)
        } else if (type === 2) {
            // 获取地址列表
            this.getAddressData()
        }
    },

	/**
     * 去搜索地址页
     */
    goToSearch() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "search",
            click_par: {},
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        let page = getCurrentPages();
        let currentPage = page[page.length - 1] && page[page.length - 1].route;
        wx.navigateTo({
          url: "/pages/address/search/index?from=" + currentPage,
          preObj: recommendObj,
          buried_position: "groupBuy-chooseStore2",
        });
    },

	/**
     * 去地图页
     */
    goToMap() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "click_map",
            click_par: {},
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        // 获取缓存地理位置信息
        try {
            let addressInfo = wx.getStorageSync("address_info");
            if (addressInfo) {
                wx.navigateTo({
                  url: "/pages/address/map/index?from=group_buy_choose_store",
                  preObj: recommendObj,
                  buried_position: "groupBuy-chooseStore3",
                });
            } else {
                wx.showToast({
                    title: "请先返回授权地理位置哦！",
                    icon: "none",
                    duration: 2000
                })
            }
        } catch (e) {

        }
    },

	/**
     * 选择地址，返回上一页
     */
    selectAddress(e) {
        let data = e.currentTarget.dataset;
        let storeId = data.storeId;
        let orgCode = data.orgCode;
        let latitude = data.latitude;
        let longitude = data.longitude;
        let pages = getCurrentPages();
        //点击埋点
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "click_store",
            click_par: {
                storeId,
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        for (let page of pages) {
            if (page && (page.route === "pages/groupBuy/confirmOrder/index")) {
                page.setData({
                    // 'addressInfo.latitude':latitude,
                    // 'addressInfo.longitude':longitude,
                    "addressInfo.cityId": this.data.addressInfo.cityId,
                    storeId: storeId,
                    orgCode: orgCode
                });
                wx.navigateBack();
                break
            }
        }
        this.buried.storeId = storeId
    },
    //去门店的地图
    toMap(e) {
        let latitude = e.currentTarget.dataset.latitude,
            longitude = e.currentTarget.dataset.longitude;
        if (latitude && longitude) {
            wx.openLocation({
                latitude: latitude,
                longitude: longitude,
                scale: 28
            })
        }
    },
	/**
     * 设置缓存
     */
    setStorageSync(key, value) {
        return new Promise((resolve, reject) => {
            try {
                wx.setStorage({
                    key: key,
                    data: value,
                    success(res) {
                        // util.refreshHomePage();
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
    },
    //检查是否存在地址信息
    checkLocation(cb) {
        //当前页
        if (this.data.addressInfo && this.data.addressInfo.longitude) {
            cb && cb();

        }
        //内存里
        else if (app.globalData.addressInfo && app.globalData.addressInfo.longitude && app.globalData.addressInfo.latitude) {
            this.setData({
                addressInfo: app.globalData.addressInfo
            });
            cb && cb();


        } //本地缓存
        else if (wx.getStorageSync("address_info") && wx.getStorageSync("address_info").longitude && wx.getStorageSync("address_info").latitude) {
            this.setData({
                addressInfo: wx.getStorageSync("address_info")
            });
            cb && cb();


            //手动获取
        } else {
            wx.getSetting({
                success(res) {
                    if (!res.authSetting["scope.userLocation"]) {
                        wx.authorize({
                            scope: "scope.userLocation",
                            success(res) {
                                that.getLocation(cb)
                            },
                            fail(err) {
                                wx.openSetting({
                                    complete: (res) => {
                                        if (res.authSetting["scope.userLocation"]) {
                                            that.getLocation(cb)
                                        } else {
                                            wx.showModal({
                                                title: "授权",
                                                content: "获取位置失败，请检查重试。",
                                                showCancel: false,
                                                success: function (res) {
                                                    if (res.confirm) {
                                                        wx.navigateBack()
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })

                            }
                        })
                    } else {
                        that.getLocation(cb)
                    }
                }
            })
        }
    },
    //无地址的时候获取
    getLocation(cb) {
        wx.getLocation({
            type: "wgs84",
            success: function (res) {
                getDaoJiaLocation({
                    longitude: res.longitude,
                    latitude: res.latitude
                }, function (addressInfo) {
                    if(res) {
                        app.globalData.addressInfo = addressInfo;
                        app.saveAddress(addressInfo);
                        that.setData({
                            addressInfo: addressInfo
                        })
                    }
                    cb && cb()
                })
                // request({
                //     functionId: FNIDS.transferAddress,
                //     body: {
                //         "longitude": res.longitude,
                //         "latitude": res.latitude,
                //         "coord_type": "1",
                //         "needMatch": 0
                //     },
                // }).then(res => {
                //     if (res.data.code == "0" && res.data.result) {
                //         var poi = res.data.result.title,
                //             result = res.data.result;
                //         if (!poi) {
                //             poi = res.data.result.address
                //         }
                //         var addressInfo = {
                //             longitude: result.longitude,
                //             latitude: result.latitude,
                //             cityId: result.areaCode,
                //             cityName: result.city,
                //             countyName: result.district,
                //             poi: poi,
                //             adcode: result.adcode || ""
                //         };
                //         app.globalData.addressInfo = addressInfo;
                //         app.saveAddress(addressInfo);
                //         that.setData({
                //             addressInfo: addressInfo
                //         });
                //         cb && cb()
                //     }
                // }).catch((err) => {

                // })
            },
            fail: function (res) {
                wx.showModal({
                    title: "授权",
                    content: "获取位置失败，请检查重试。",
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) {
                            wx.navigateBack()
                        }
                    }
                })

            }
        })
    },
});

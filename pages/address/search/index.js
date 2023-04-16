import {
    request,
    FNIDS
} from "../../../common/util/api"
import {
  clickBuriedV2_,
  pvBuriedV2_
} from "../../../common/util/BI"
import util from "../../../common/util/util"
// 埋点描述文件
import { addFilterMsg, warn, error } from '../../../common/util/wxLog';

let app = getApp();
let time = null;
Page({
    // 埋点
    buried: {
        islogin: util.isLogin(),
        poi: '',
    },
    /**
     * 页面的初始数据
     */
    data: {
        // 城市列表
        cities: [],
        // 显示隐藏城市列表
        showCities: false,
        // 当前市
        city: "",
        // 历史记录
        addressHistoryData: [],
        // 搜索联系词儿列表
        searchList: [],
        // 输入框值
        inputVal: "",
        // 显示隐藏输入框清楚按钮
        hideClear: true,
        // 默认页-是否展示
        showEmpty: false,
        // 默认页-类型
        type: "",
        // 默认页-图标
        src: "",
        // 默认页-按钮
        btnText: "",
        // 默认页-按钮
        tips: "",
        //上一页
        refPage: "",
        // 来源
        from: "",
        optionsPos: null,
        self_page:'poi_search_lst'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        try {
            let addressInfo = wx.getStorageSync("address_info");
            if (addressInfo && addressInfo.cityName) {
                this.setData({
                    city: addressInfo.cityName,
                    from: options && options.from || "",
                    optionsPos: options
                })
            } else {
                this.setData({
                    city: "北京市",
                    from: options && options.from || "",
                    optionsPos: options
                })
            }
        } catch (e) {
        }



        // 获取城市列表
        this.getCityList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        // 获取历史记录
        this.getAddressHistory();
    },

    pvFunc(back) {
      pvBuriedV2_({
        page_par: {
          ref_par: {
            traceId: this.data.recommendObj.preTraceId || "",
            userAction: this.data.recommendObj.preUserAction || "",
          }
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        currentPageName: this.data.recommendObj.currentPageName,
        prePageName: this.data.recommendObj.prePageName,
        isBack: back || "",
      })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    /**
     * 获取城市列表
     */
    getCityList() {
        let self = this;
        let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
        request({
            ...FNIDS.getCities,
            body: {
                "ref": "index/LID:5"
            },
            pageId: pageIdFirstPage,
            preObj: recommendObj
        }).then(res => {
            let result = res.data.result;
            if (res.data && res.data.code === "0") {
                if (result) {
                    self.setData({
                        cities: result
                    })
                }
            }
        }).catch(err => {

        })
    },

    /**
     * 获取历史记录
     */
    getAddressHistory() {
        let self = this;
        let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
        request({
            ...FNIDS.getSearchInfos,
            body: {
                "ref": "index/LID:5"
            },
            isNeedDealError: true,
            pageId: pageIdFirstPage,
            preObj: recommendObj
        }).then(res => {
            let result = res.data && res.data.result;
            if (res.data && res.data.code === "0") {
                if (result) {
                    self.setData({
                        addressHistoryData: result
                    })
                }
                // 提示登录
                self.setData({
                    // 默认页-是否展示
                    showEmpty: false
                })
            } else if (res.data.code === "202") {
                // 提示登录
                self.setData({
                    // 默认页-是否展示
                    showEmpty: true,
                    // 默认页-类型
                    type: 6,
                    // 默认页-图标
                    src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_no_loginV2.png",
                    // 默认页-按钮
                    btnText: "立即登录",
                    // 默认页-按钮
                    tips: "登录后才能查看历史记录哦～"
                })
            }
        }).catch(err => {

        })
    },

    /**
     * 获取搜索联想词儿
     */
    getSearchData(obj) {
        let self = this;
        let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
        request({
            ...FNIDS.addressSearch,
            isNeedDealError: true,
            body: {
                ref: "index/LID:5",
                region: obj.city || "",
                key: obj.key || ""
            },
            pageId: pageIdFirstPage,
            preObj: recommendObj
        }).then(res => {
            let result = res.data && res.data.result;
            if (res.data && res.data.code === "0") {
                if (result) {
                    self.setData({
                        searchList: result
                    })
                }
            }
        }).catch(err => {

        })
    },

    /**
     * 添加历史记录
     */
    addAddressHistory(obj) {
        let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
        request({
            ...FNIDS.addSearchInfo,
            body: obj,
            isNeedDealError: true,
            pageId: pageIdFirstPage,
            preObj: recommendObj
        }).then(res => {

        }).catch(err => {

        })
    },

    /**
     * 选择城市
     */
    chooseCity() {
      let { recommendObj = {}, optionsPos={} } = this.data;
        // 埋点
        clickBuriedV2_({
          click_id: "clickSelectCity",
          click_par: {
            islogin: util.isLogin()
          },
          pageId: recommendObj.pageIdFirstPage || "",
          currentPageName: recommendObj.currentPageName,
          prePageName: recommendObj.prePageName,
        })
        wx.navigateTo({
            url: "/pages/address/city/index",
            preObj: recommendObj,
            buried_position: {
              currentPageName:'poi_search_lst1',
              optionsPos
            }
        });
    },

    /**
     * 点击城市列表
     */
    clickCity(e) {
        clickBuriedV2_({
          click_id: "selectCity",
          click_par: {
            city_name: city
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
    },

    /**
     * 清楚历史记录
     */
    clearHistory() {
        let self = this;
        let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
        request({
            ...FNIDS.delSearchInfos,
            body: {
                "ref": "index/LID:5"
            },
            pageId: pageIdFirstPage,
            preObj: recommendObj
        }).then(res => {
            if (res.data && res.data.code === "0") {
                self.setData({
                    addressHistoryData: []
                })
            }
        }).catch(err => {

        })
    },

    /**
     * 点击历史记录
     */
    clickHistoryItem(e) {
        let data = e.currentTarget.dataset;
        let cityId = data.cityId;
        let cityName = data.cityName;
        let countyName = data.countyName;
        let latitude = data.latitude;
        let longitude = data.longitude;
        let poi = data.poi;
        // 地址信息
        let addressInfo = {
            cityId: cityId,
            cityName: cityName,
            countyName: countyName,
            latitude: latitude,
            longitude: longitude,
            poi: poi
        };
        // 来源（search: 搜索联想词儿；undefined: 历史记录）
        if (data.from === "search") {
            this.reportRecPoi(poi)
            // 添加历史记录用
            let history = data.history || {};
            // 添加历史记录
            if (util.isLogin && util.isLogin()) {
                this.addAddressHistory(history)
            }
        } else if (data.from) {
        } else {
            this.reportLsSearch()
        }
        //如果需要返回上一页 拼团、超级会员码
        let fromPage = this.data.from;
        if (fromPage && fromPage !== 'locationDefault' && fromPage !== 'addressHome') {
            let pages = getCurrentPages();
            for (let page of pages) {
                if (page && (page.route === this.data.from)) {
                    page.setData({
                        addressInfo: addressInfo
                    },()=>{
                      console.log(addressInfo, '===========进入================')
                    });
                    wx.navigateBack();
                    break
                }
            }
            return
        }

        // 缓存地理位置信息
        util.saveAddressPoi(addressInfo)
        // wx.setStorageSync('address_info', addressInfo);
        util.refreshHomePage(true);
        app.globalData.addressInfo = addressInfo;
        app.globalData.needCheckLocationChange = false;
        if(addressInfo.poi !== wx.getStorageSync('address_info').poi){
          let logParams = {
            globalAddressInfo: app.globalData.addressInfo,
            addressInfo: wx.getStorageSync('address_info'),
            pin: app.globalData.loginStateInfo.PDJ_H5_PIN
          }
          addFilterMsg('addressInfoSearchNew');
          warn(JSON.stringify(logParams))
          console.log('进入异常了进入异常了=========', wx.getStorageSync('address_info'), addressInfo)
        }
        if (fromPage === 'addressHome') {
          let { recommendObj = {}, optionsPos={} } = this.data;
          wx.switchTab({
            url: "/pages/home/home",
            preObj: recommendObj,
            buried_position: {
              currentPageName:'current_address_search',
              optionsPos
            }
          })
          
        } else {
            wx.navigateBack()
        }
    },

    /**
     * 城市搜索
     */
    searchAddress(e) {
        clearTimeout(time);
        time = setTimeout(() => {
            let val = e.detail.value;
            // console.log('val',val)
            if (val) {
                this.getSearchData({
                    city: this.data.city,
                    key: val
                });
                this.setData({
                    hideClear: false,
                    // inputVal: val
                })
            } else {
                this.setData({
                    searchList: [],
                    // inputVal: "",
                    hideClear: true
                })
            }
        }, 1000)

    },

    /**
     * 输入框聚焦-埋点上报
     */
    searchFocus() {
        this.reportFocus()
    },

    /**
     * 清除输入框
     */
    clearInput() {
        this.reportClear()
        this.setData({
            searchList: [],
            hideClear: true,
            inputVal: ""
        })
    },

    /**
     * 监听默认页事件
     */
    onDefaultBtnEvent(e) {
        let type = e.detail.type;
        if (type === 6) { // 去登录
            let { recommendObj = {}, optionsPos={} } = this.data;

            wx.navigateTo({
                url: `/pages/newLogin/login/login`,
                preObj: recommendObj,
                buried_position: {
                  currentPageName:'poi_search_lst2',
                  optionsPos
                }
            })
        }
    },

    // 去设置页授权地理位置
    goToSetting() {
        // 埋点
        clickBuriedV2_({
          click_id: "clickCouponAuthorize",
          click_par: {
            islogin: util.isLogin()
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
        wx.openSetting({
            success(res) {
                if (res.authSetting['scope.userLocation']) {
                    app.globalData.refreshHomeFlag = true;
                    wx.navigateBack()
                }
            }
        });
    },
    /* ------------------ 自动化埋点新增逻辑    --------------------  */
    reportRecPoi(poi) {
        this.buried.poi = poi
        // 埋点
        clickBuriedV2_({
          click_id: "selectRecPoi",
          click_par: {
            poi: poi
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
    },
    reportLsSearch() {
        // 埋点
        clickBuriedV2_({
          click_id: "click_ls_search",
          click_par: {
            islogin: this.buried.islogin
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
    },
    reportFocus() {
        // 埋点
        clickBuriedV2_({
          click_id: "clickSearchAddress",
          click_par: {
            islogin: this.buried.islogin
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
    },
    reportClear() {
        // 埋点
        clickBuriedV2_({
          click_id: "deleteLsSearch",
          click_par: {
              
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
    }
});

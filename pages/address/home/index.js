import {
    request,
    FNIDS
} from "../../../common/util/api"
import {
    isLogin
} from "../../../common/util/loginUtil"
import {
    clickBuriedV2_,
    pvBuriedV2_
} from "../../../common/util/BI"
import util from "../../../common/util/util"
// 埋点描述文件
import { addFilterMsg, warn, error } from '../../../common/util/wxLog';

let app = getApp()
Page({
    // 埋点描述文件
    // 埋点
    buried: {
        poi: '',



    },
    /**
     * 页面的初始数据
     */
    data: {
        // 来源
        from: "",
        // 店铺ID
        storeId: "",
        // 地址ID
        addressId: "",
        // 可配送范围地址列表
        inAddress: [],
        // 不可配送范围地址列表
        outAddress: [],
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
        // 是否显示选择按钮
        showChooseIcon: false,
        options: {},
        self_page:'manage_address',
        optionsPos: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 更新storeId和来源
        this.setData({
            storeId: options && options.storeId || "",
            from: options && options.from || "",
            addressId: options && options.addressId || "",
            options: options,
            optionsPos: options
        })
        if (options && options.from === "person") {
            // title
            wx.setNavigationBarTitle({
                title: "管理收货地址"
            })
        }


    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {



        this.getAddressData();
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
        return {
            title: "京东到家",
            path: "/pages/home/home"
        }
    },

    /**
     * 获取地址列表
     */
    getAddressData() {
        let self = this
        let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
        if (isLogin()) {
            // 请求参数
            let body = {}
            // 如果是订单选择地址（区分可配送范围地址）
            if (this.data.storeId) {
                body = {
                    storeId: this.data.storeId,
                    needCheckDelivery: 1
                }
                this.setData({
                    showChooseIcon: true
                })
            }
            // 发请求
            request({
                ...FNIDS.getAddressList,
                body: body,
                method: 'post',
                pageId: pageIdFirstPage,
                preObj: recommendObj
            }).then(res => {
                // 地址列表数据
                let result = res.data.result
                // 可配送范围地址列表
                let inAddress = []
                // 不可配送范围地址列表
                let outAddress = []
                // 处理接口数据
                if (res.data && res.data.code === "0") {
                    if (result.length > 0) {
                        result.forEach(item => {
                            // 匹配标签
                            switch (item.tags) {
                                case "1":
                                    item.tagName = "家"
                                    break
                                case "2":
                                    item.tagName = "公司"
                                    break
                                case "3":
                                    item.tagName = "学校"
                                    break
                                default:
                            }
                            // 区分数据（可配送和不可配送）
                            if (item.canDelivery) {
                                // 结算页地址匹配
                                if (item.id == self.data.addressId) {
                                    item.target = true
                                }
                                inAddress.push(item)
                            } else {
                                outAddress.push(item)
                            }
                        })
                        // 更新数据
                        self.setData({
                            showEmpty: false,
                            inAddress: inAddress,
                            outAddress: outAddress
                        })
                    } else {
                        // 收货地址为空
                        self.setData({
                            showEmpty: true,
                            type: 7,
                            btnText: "新建地址",
                            tips: "您还没有收货地址",
                            src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noshopV1.png"
                        })
                    }
                } else {
                    self.setData({
                        showEmpty: true,
                        type: "",
                        btnText: "",
                        tips: res.data && res.data.msg || '',
                        src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png"
                    })
                    wx.reportMonitor(50, 20);

                }
            }).catch(err => {
                self.setData({
                    showEmpty: true,
                    type: 2,
                    btnText: "重新加载",
                    tips: err.data && err.data.msg || '',
                    src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png"
                })
                let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
                let errInfo = err && err.toString();
                let deviceid_pdj_jd = util.getUUIDMD5();
                wx.reportMonitor(50, 20);
                addFilterMsg(deviceid_pdj_jd)
                addFilterMsg('getAddressListFn');
                addFilterMsg(PDJ_H5_PIN)
                error(errInfo)
            })
        } else {
            this.setData({
                showEmpty: true,
                type: 6,
                btnText: "立即登录",
                tips: "登录后才能查看地址哦",
                src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_no_loginV2.png"
            })
        }
    },

    /**
     * 监听默认页按钮事件
     */
    onDefaultBtnEvent(e) {
        let type = e.detail.type
        if (type === 6) { // 去登录
            let { recommendObj = {}, optionsPos ={} } = this.data;
            wx.navigateTo({
                url: `/pages/newLogin/login/login`,
                preObj: recommendObj,
                buried_position: {
                  currentPageName:'manage_address1',
                  optionsPos
                }
            })
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
      let { recommendObj = {}, optionsPos={} } = this.data;
        // 埋点
      clickBuriedV2_({
        click_id: "searchAddress",
        click_par: {
            
        },
        pageId: recommendObj.pageIdFirstPage || "",
        currentPageName: recommendObj.currentPageName,
        prePageName: recommendObj.prePageName,
      })
        wx.navigateTo({
            url: "/pages/address/search/index?from=addressHome",
            preObj: recommendObj,
            buried_position: {
              currentPageName:'manage_address2',
              optionsPos
            }
        })
    },

    /**
     * 去地图页
     */
    goToMap() {
        let { recommendObj = {}, optionsPos={} } = this.data;
        wx.navigateTo({
            url: "/pages/address/map/index?from=addressList",
            preObj: recommendObj,
            buried_position: {
              currentPageName:'manage_address3',
              optionsPos
            }
        })
    },

    /**
     * 选择地址，返回上一页
     */
    selectAddress(e) {
        let data = e.currentTarget.dataset
        let cityId = data.cityId
        let cityName = data.cityName
        let countyName = data.countyName
        let latitude = data.latitude
        let longitude = data.longitude
        let poi = data.poi
        let addressName = data.addressName
        let name = data.name
        let mobile = data.mobile
        let addressId = data.id
        let from = this.data.from

        let addressObj = {
            cityId: cityId,
            cityName: cityName,
            countyName: countyName,
            latitude: latitude,
            longitude: longitude,
            poi: poi
        }


        if (from === "order") {
            let settlementAddress = app.globalData.settlement
            settlementAddress.isGet = false
            settlementAddress.addressInfo.name = name
            settlementAddress.addressInfo.mobile = mobile
            settlementAddress.addressInfo.fullAddress = addressName
            settlementAddress.addressInfo.addressId = addressId
            // 保存地址类型
            app.setAddressType(false)
            wx.navigateBack()
        } else if (from === "person") {

        } else {
            
            util.saveAddressPoi(addressObj)
            // wx.setStorageSync('address_info', addressObj);
            util.refreshHomePage();
            app.globalData.addressInfo = addressObj;
            app.globalData.needCheckLocationChange = false;
            
            if(addressObj.poi !== wx.getStorageSync('address_info').poi){
              let logParams = {
                globalAddressInfo: app.globalData.addressInfo,
                addressInfo: wx.getStorageSync('address_info'),
                pin: app.globalData.loginStateInfo.PDJ_H5_PIN
              }
              addFilterMsg('addressInfoHomeNew');
              warn(JSON.stringify(logParams))
            }
            if (from == "group") {
              app.globalData.addressInfo = addressObj;
              wx.navigateBack()
            } else if (from === 'locationDefault') {
                app.globalData.addressInfo = addressObj;
                wx.navigateBack()
            } else {
                let { recommendObj = {}, optionsPos ={} } = this.data;
                wx.switchTab({
                    url: "/pages/home/home",
                    preObj: recommendObj,
                    buried_position: {
                      currentPageName:'manage_address4',
                      optionsPos
                    }
                })
            }
            console.log('正常正常正常正常。。。。。。。。',wx.getStorageSync('address_info'), addressObj)
            this.reportSeAddress(poi)
        }
    },

    /**
     * 去编辑或新建地址页
     */
    goToEditAddress(e) {
        let data = e.currentTarget.dataset
        let { recommendObj = {}, optionsPos={} } = this.data;
        // 来源
        let from = data.from || ""
        // 经度
        let longitude = data.longitude || ""
        // 纬度
        let latitude = data.latitude || ""
        // 城市ID
        let cityId = data.cityId || ""
        // 所在城市
        let cityName = data.cityName || ""
        // 区
        let countyName = data.countyName || ""
        // 具体位置
        let poi = data.poi || ""
        // 县级ID
        let countyId = data.countyId || ""
        // 地址主键
        let id = data.id || ""
        // 楼号-门牌号
        let addressDetail = data.addressDetail || ""
        // 收货人
        let name = data.name || ""
        // 联系电话
        let mobile = data.mobile || ""
        // 标签
        let tags = data.tags || 0
        // 配送范围
        let canDelivery = data.canDelivery

        // 设置缓存（地图和搜索返回用onShow周期用到）
        try {
            wx.setStorageSync("address_edit_info", {
                longitude: longitude,
                latitude: latitude,
                cityId: cityId,
                cityName: cityName,
                countyName: countyName,
                poi: poi,
                coordType: 1,
                countyId: countyId,
                id: id,
                addressDetail: addressDetail,
                name: name,
                mobile: mobile,
                tags: tags,
                canDelivery: canDelivery
            })
        } catch (e) {

        }
        if (from === "edit") {
            this.reportEditAddress()
        } else {
            this.reportAddAddress()
            // 地址大于20条，toast
            let addressLen = this.data.inAddress.length + this.data.outAddress.length
            if (addressLen > 19) {
                wx.showToast({
                    title: "收货地址已到最大数量",
                    icon: "none",
                    duration: 2000
                })
                return
            }
        }
        // 跳转至编辑或新建地址页
        wx.navigateTo({
            url: "../createOrEdit/index?from=" + from,
            preObj: recommendObj,
            buried_position: {
              currentPageName:'manage_address5',
              optionsPos
            }
        })
    },

    // 去设置页授权地理位置
    goToSetting() {
        // 埋点
      clickBuriedV2_({
        click_id: "clickCouponAuthorize",
        click_par: {
            
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
    reportSeAddress(poi) {
        this.buried.poi = poi
        clickBuriedV2_({
          click_id: "selectAddress",
          click_par: {
            poi: poi
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
    },
    reportEditAddress() {
        clickBuriedV2_({
          click_id: "editAddress",
          click_par: {
              
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
    },
    reportAddAddress() { 
        clickBuriedV2_({
          click_id: "addAddress",
          click_par: {
              
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
    }
});

import { request, FNIDS } from "../../../common/util/api"
import { addFilterMsg, error } from '../../../common/util/wxLog'; 
import {
    clickBuriedV2_,
    pvBuriedV2_
} from "../../../common/util/BI"
import emitter from '../../../common/util/events'
import util from "../../../common/util/util"
let app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 是否展示删除按钮
        showDelete: false,
        // 选择器-城市列表
        cities: [],
        // 选择器-默认选择序号
        index: 0,
        // 经度
        longitude: "",
        // 纬度
        latitude: "",
        // 城市ID
        cityId: "",
        // 所在城市
        cityName: "",
        // 区
        countyName: "",
        // 具体位置
        poi: "",
        coordType: 1,
        // 配送范围
        canDelivery: false,
        // 县级ID
        countyId: "",
        // 地址主键
        id: "",
        // 楼号-门牌号
        addressDetail: "",
        // 收货人
        name: "",
        // 联系电话
        mobile: "",
        // 标签
        tags: "",
        // 来源
        from: "",
        flag: true,
        storeId: '', //店铺ID
        addNewAddressDelivery: true,  //新增地址的时候能否配送
        self_page:'new_address',
        optionsPos: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 来源
        if (options && options.from) {
            this.setData({
                from: options.from || "",
                showDelete: true
            })
        }
        if (options && options.storeId) {
            this.setData({
                storeId: options.storeId
            })
        }
        if (options && options.from == 'order_settle') {
            this.setData({
                showDelete: false
            })
        }
        if (options && options.pageSource) {
            this.setData({
                pageSource: options.pageSource || ''
            })
        }
        this.setData({
          optionsPos: options
        });
        // 获取城市列表
        // this.getCityList()
    },

    onShow: function () {
        this.initData()
    },
    initData() {
        // 获取缓存地址信息
        let res = {}
        try {
            res = wx.getStorageSync("address_edit_info")
        } catch (e) { }
        // 编辑或新建地址
        if (res.cityName && this.data.from === "edit") { // 来源于编辑
            // title
            wx.setNavigationBarTitle({
                title: "编辑收货地址"
            });
            // 更新数据
            this.setData({
                longitude: res.longitude || "",
                latitude: res.latitude || "",
                cityId: res.cityId || "",
                cityName: res.cityName || "",
                countyName: res.countyName || "",
                poi: res.poi || "",
                coordType: 1,
                countyId: res.countyId || "",
                id: res.id || "",
                canDelivery: res.canDelivery || false
            })
        } else { // 来源于新建
            // title
            wx.setNavigationBarTitle({
                title: "新建收货地址"
            });
            if (res.cityName) {
                // 更新数据
                this.setData({
                    longitude: res.longitude || "",
                    latitude: res.latitude || "",
                    cityId: res.cityId || "",
                    cityName: res.cityName || app.globalData.addressInfo.cityName || "",
                    countyName: res.countyName || "",
                    poi: res.poi || "",
                    coordType: 1,
                    countyId: res.countyId || "",
                    id: res.id || "",
                }, () => {
                    // console.log('from',this.data.from)
                    if (this.data.from == 'order_settle') { //来自订单结算页面
                        request({
                            ...FNIDS.containsStoreId,
                            method: "post",
                            body: {
                                storeId: this.data.storeId,
                                longitude: this.data.longitude,
                                latitude: this.data.latitude,
                                coordType: 5
                            },
                            pageId: this.data.recommendObj.pageIdFirstPage || "",
                            preObj: this.data.recommendObj || {}
                        }).then(res => {
                            // console.log('res',res)
                            if (res.data && res.data.code == 0) {
                                if (res.data.result.exists) {
                                    this.setData({
                                        addNewAddressDelivery: true
                                    })
                                } else {
                                    this.setData({
                                        addNewAddressDelivery: false
                                    })
                                }
                            }
                        })
                    }
                })
            } else {
                // 获取当前地址
                try {
                    // 获取首页当前位置信息
                    let addressInfo = wx.getStorageSync("address_info")
                    this.setData({
                        // 所在城市
                        cityName: addressInfo.cityName || "",
                        longitude: addressInfo.longitude || "",
                        latitude: addressInfo.latitude || ""
                    })
                } catch (e) {

                }
            }
        }
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
    onReady: function () {
        // 获取缓存地址信息
        let res = {}
        try {
            res = wx.getStorageSync("address_edit_info")
        } catch (e) {

        }
        // 编辑或新建地址
        if (res.longitude && this.data.from === "edit") { // 来源于编辑
            // title
            wx.setNavigationBarTitle({
                title: "编辑收货地址"
            });
            // 更新数据
            this.setData({
                longitude: res.longitude || "",
                latitude: res.latitude || "",
                cityId: res.cityId || "",
                cityName: res.cityName || "",
                countyName: res.countyName || "",
                poi: res.poi || "",
                coordType: 1,
                countyId: res.countyId || "",
                id: res.id || "",
                addressDetail: res.addressDetail || "",
                name: res.name || "",
                mobile: res.mobile || "",
                tags: res.tags || "",
                canDelivery: res.canDelivery || false
            })
        } else { // 来源于新建
            // title
            wx.setNavigationBarTitle({
                title: "新建收货地址"
            });
            if (res.longitude) {
                // 更新数据
                this.setData({
                    longitude: res.longitude || "",
                    latitude: res.latitude || "",
                    cityId: res.cityId || "",
                    cityName: res.cityName || app.globalData.addressInfo.cityName || "",
                    countyName: res.countyName || "",
                    poi: res.poi || "",
                    coordType: 1,
                    countyId: res.countyId || "",
                    id: res.id || "",
                    addressDetail: res.addressDetail || "",
                    name: res.name || "",
                    mobile: res.mobile || "",
                    tags: res.tags || ""
                })
            } else {
                // 获取当前地址
                try {
                    // 获取首页当前位置信息
                    let addressInfo = wx.getStorageSync("address_info")
                    this.setData({
                        // 所在城市
                        cityName: addressInfo.cityName || "",
                        longitude: addressInfo.longitude || "",
                        latitude: addressInfo.latitude || ""
                    })
                } catch (e) {

                }
            }
        }
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
            body: { "ref": "index/LID:5" },
            pageId: pageIdFirstPage,
            preObj: recommendObj
        }).then(res => {
            let result = res.data.result
            let cities = []
            if (res.data && res.data.code === "0") {
                if (result) {
                    result.forEach(item => {
                        cities.push({
                            cityIdid: item.areaCode,
                            cityName: item.areaName
                        })
                    })
                }
            } else {
              wx.reportMonitor(48, 20);
            }
            self.setData({
                cities: cities
            })
        }).catch(err => {
          let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
          let errInfo = err && err.toString();
          wx.reportMonitor(48, 20);
          let deviceid_pdj_jd = util.getUUIDMD5();
          addFilterMsg(deviceid_pdj_jd)
          addFilterMsg('getCitiesFn')
          addFilterMsg(PDJ_H5_PIN);
          error(errInfo)
        })
    },

    /**
     * 选择器选择所在城市
     */
    bindSelectorChange(e) {
        let index = e.detail.value
        let cityName = this.data.cities[index].cityName
        if (this.data.cityName === cityName) return
        this.setData({
            cityName: cityName,
            poi: ""
        })
        this.reportSelector(cityName)
    },

    /**
     * 去地图选择定位地址
     */
    goToMap() {
        // 埋点
        clickBuriedV2_({
          click_id: "selectPoi",
          click_par: {
              
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
        let { recommendObj = {}, optionsPos ={} } = this.data;
        wx.navigateTo({
            url: "/pages/address/map/index?from=createOrEdit&cityName=" + this.data.cityName,
            preObj: recommendObj,
            buried_position: {
              currentPageName:'new_address1',
              optionsPos
            }
        })
    },

    /**
     * input输入
     */
    inputChange(e) {
        let type = e.currentTarget.dataset.type
        let val = e.detail.value
        if (type === "address" && val) {
            this.reportInputRoom()
            this.setData({
                addressDetail: val
            })
        } else if (type === "mobile" && val) {
            this.reportInputPhone()
            this.setData({
                mobile: val
            })
        } else if (type === "name" && val) {
            this.setData({
                name: val
            })
        }
    },

    /**
     * 输入框聚焦-埋点用
     */
    inputFocus(e) {
        let type = e.currentTarget.dataset.type
        if (type === "address") {
            this.reportInputRoom()
        } else if (type === "mobile") {
            this.reportInputPhone()
        } else if (type === "name") {
            this.reportInputName()
        }
    },

    /**
     * 保存
     */
    saveAddress() {
        if (this.data.flag) {
            this.setData({
                flag: false
            });
            this.reportSaveAddress()
            let data = this.data;
            let cityName = data.cityName
            let poi = data.poi
            let addressDetail = data.addressDetail
            let name = data.name
            let mobile = data.mobile
            if (cityName === "") {
                this.toast("请选择城市")
            }
            if (poi === "") {
                this.toast("小区/大厦/学校");
                this.setData({
                    flag: true
                });
                return
            }
            if (addressDetail === "") {
                this.toast("楼号-门牌号");
                this.setData({
                    flag: true
                });
                return
            }
            if (name === "") {
                this.toast("请填写收货人的姓名");
                this.setData({
                    flag: true
                });
                return
            }
            if (mobile === "") {
                this.toast("请填写收货手机号码");
                this.setData({
                    flag: true
                });
                return
            } else if (mobile.length !== 11) {
                this.toast("请填写正确的手机号码");
                this.setData({
                    flag: true
                });
                return
            } else if (!this.data.addNewAddressDelivery && this.data.from == "order_settle") {
                wx.showModal({
                    content: "此地址不支持当前订单配送",
                    cancelText: "重新修改",
                    confirmText: "仍然保存",
                    cancelColor: "#999999",
                    confirmColor: "#47B34F",
                    success: (res) => {
                        if (res.confirm) {
                            this.confirmSaveAddress()
                        } else if (res.cancel) {
                            // console.log('用户点击取消')
                            this.setData({
                                flag: true
                            });
                        }
                    }
                })
                return
            }
            this.confirmSaveAddress()
            // 埋点
            clickBuriedV2_({
            click_id: "clickSave",
            click_par: {},
            pageId: this.data.recommendObj.pageIdFirstPage || "",
            currentPageName: this.data.recommendObj.currentPageName,
            prePageName: this.data.recommendObj.prePageName,
          })
        }
    },
    // 确认保存地址
    confirmSaveAddress() {
        let self = this;
        let data = this.data;
        let longitude = data.longitude;
        let latitude = data.latitude;
        let cityId = data.cityId
        let cityName = data.cityName
        let countyName = data.countyName
        let poi = data.poi
        let coordType = data.coordType
        let countyId = data.countyId
        let id = data.id
        let addressDetail = data.addressDetail
        let name = data.name
        let mobile = data.mobile
        let tags = data.tags
        // 编辑页和新建地址
        let functionId = "";
        if (data.from === "edit") {
            functionId = FNIDS.updateAddress
        } else {
            functionId = FNIDS.addAddress
        }
        let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
        request({
            method: "POST",
            ...functionId,
            body: {
                longitude: longitude,
                latitude: latitude,
                cityId: cityId,
                cityName: cityName,
                countyName: countyName,
                poi: poi,
                coordType: coordType,
                countyId: countyId,
                id: id,
                addressDetail: addressDetail,
                name: name,
                mobile: mobile,
                tags: tags
            },
            pageId: pageIdFirstPage,
            preObj: recommendObj
        }).then(res => {
            this.setData({
                flag: true
            });
            if (res.data && res.data.code === "0") {
                let result = res.data.result;
                if (this.data.pageSource === 'settlement' && result) {
                    result.isGet = false;
                    let addressInfo = {};
                    addressInfo.name = result.name;
                    addressInfo.mobile = result.mobile;
                    addressInfo.fullAddress = result.addressName;
                    addressInfo.addressId = result.id;
                    addressInfo.canDelivery = result.canDelivery
                    result.addressInfo = addressInfo;
                    app.globalData.settlement = result || {}
                }
                if (this.data.pageSource === 'reviseOrder') {
                    emitter.emit('addAddress', { id: result ? result.id : id })
                }
                wx.navigateBack()
            } else {
                self.toast(res.data && res.data.msg)
                wx.reportMonitor(49, 20);
            }
        }).catch(err => {
            this.setData({
                flag: true
            });
            self.toast(err.data && err.data.msg)
            let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
            let errInfo = err && err.toString();
            let deviceid_pdj_jd = util.getUUIDMD5();
            wx.reportMonitor(49, 20);
            addFilterMsg(deviceid_pdj_jd)
            addFilterMsg('updateAddressAndAddAddress');
            addFilterMsg(PDJ_H5_PIN)
            error(errInfo)
        })
    },
    /**
     * 表单校验提示
     */
    toast(text) {
        wx.showToast({
            title: text,
            icon: "none",
            duration: 2000
        })
    },

    /**
     * 删除地址
     */
    deleteAddress() {
        this.reportDeleteAddress()
        let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
        let self = this
        this.dialog({
            content: "确认删除该地址吗？"
        }).then(res => {
            if (res.confirm) {
                request({
                    method: "POST",
                    ...FNIDS.delAddress,
                    body: {
                        "id": self.data.id
                    },
                    pageId: pageIdFirstPage,
                    preObj: recommendObj
                }).then(res => {
                    if (res.data && res.data.code === "0") {
                        wx.navigateBack()
                    } else {
                        self.toast(res.data && res.data.msg)
                    }
                }).catch(err => {
                    self.toast(err.data && err.data.msg)
                })
            }
        })
    },

    /**
     * dialog
     * @param title 抬头文案
     * @param msg 提示文案
     * @param isShowCancel 是否展示取消按钮
     * @param confirmText 确定按钮文案
     * @param cancelText 取消按钮文案
     */
    dialog(obj) {
        return new Promise((resolve, reject) => {
            wx.showModal({
                title: obj.title || "温馨提示",
                content: obj.content || "",
                showCancel: obj.showCancel === undefined || false,
                confirmText: obj.confirmText || "确定",
                cancelText: obj.cancelText || "取消",
                success(res) {
                    resolve(res)
                },
                fail(err) {
                    reject(err)
                }
            })
        })
    },

    /**
     * 选择标签
     */
    clickTag(e) {
        let tag = e.currentTarget.dataset.tag
        if (tag === this.data.tags) {
            this.setData({
                tags: ""
            })
        } else {
            this.setData({
                tags: tag
            })
        }
        this.reportTag(tag)
    },
    /* ------------------ 自动化埋点新增逻辑    --------------------  */
    reportSelector(cityName) {
        // 埋点
        clickBuriedV2_({
            click_id: "selectCity",
            click_par: {
                city_name: cityName
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
            currentPageName: this.data.recommendObj.currentPageName,
            prePageName: this.data.recommendObj.prePageName,
        })
    },
    reportInputRoom() {
        // 埋点
        clickBuriedV2_({
            click_id: "inputRoomNo",
            click_par: {
                
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
            currentPageName: this.data.recommendObj.currentPageName,
            prePageName: this.data.recommendObj.prePageName,
        })
    },
    reportInputPhone() {
        // 埋点
        clickBuriedV2_({
            click_id: "inputPhone",
            click_par: {
                
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
            currentPageName: this.data.recommendObj.currentPageName,
            prePageName: this.data.recommendObj.prePageName,
        })
    },
    reportInputName() {
        // 埋点
        clickBuriedV2_({
            click_id: "inputName",
            click_par: {
                
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
            currentPageName: this.data.recommendObj.currentPageName,
            prePageName: this.data.recommendObj.prePageName,
        })
    },
    reportSaveAddress() {
        let isOut = this.data.addNewAddressDelivery ? false : true;
        // 埋点
        clickBuriedV2_({
            click_id: "save",
            click_par: {
                isOut
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
            currentPageName: this.data.recommendObj.currentPageName,
            prePageName: this.data.recommendObj.prePageName,
        })},
    reportDeleteAddress() {
        let isOut = this.data.addNewAddressDelivery ? false : true;
        // 埋点
        clickBuriedV2_({
            click_id: "delete",
            click_par: {
                isOut
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
            currentPageName: this.data.recommendObj.currentPageName,
            prePageName: this.data.recommendObj.prePageName,
        })
    },
    reportTag(tag) {
        // 埋点
        clickBuriedV2_({
            click_id: "selectaddrtag",
            click_par: {
                selectaddrtag: [tag]
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
            currentPageName: this.data.recommendObj.currentPageName,
            prePageName: this.data.recommendObj.prePageName,
        })
    },
    // 跳转城市列表页
    chooseCity() {
        let { recommendObj = {}, optionsPos={} } = this.data;
        wx.navigateTo({
            url: "/pages/address/city/index",
            preObj: recommendObj,
            buried_position: {
              currentPageName:'new_address2',
              optionsPos
            }
        });
    }
})

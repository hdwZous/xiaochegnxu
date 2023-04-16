import {
    FNIDS,
    request
} from "../../../common/util/api"
import {
    requestSign
} from "../../../common/util/PayTools"
import util from "../../../common/util/util"
import mp from "../../../common/util/wxapi";
import {  pvBuriedV2_ , clickBuriedV2_ } from "../../../common/util/BI";
let globalData = getApp().globalData;
import {
    getGroupShareImg,
    chanageAttention,
    checkAttentionStore,
} from "../common/public.js"
let app = getApp();

import { getDaoJiaLocation } from "../../../common/util/services";

Page({
    // 埋点数据
    buried: {
        deliver_type: "",
        group_type: "",
        order_id: "",
        store_id: "",
        sku_id: "",
        orgcode: "",
        toast: "",
        type: "",
        
        
        
    },
    /**
     * 页面的初始数据
     */
    data: {
        // 买家备注
        remarkText: "",
        /*
         * 提单参数
         */
        pin: "",
        jdPin: "",
        wxUserInfo: {},
        /**
         * 无地址参数
         */
        showDialog: false,
        /**
         * 结算参数
         */
        ref: "",
        fromSource: "",
        storeId: "",
        orgCode: "",
        groupCode: "",
        groupSkuId: "",
        groupPromotionId: "",
        cityCode: "",
        longitude: "",
        latitude: "",
        // 支付金额
        totalMoney: 0,
        // 提单-签名
        serverSign: "",
        // 提单-唯一id
        unique: "",
        // 附近提货门店地址信息
        address: {},
        // 拼团商品信息
        goodsInfo: {},
        // 地址信息
        addressInfo: {},
        // 是否展示默认页
        showEmpty: false,
        // 来源
        from: "",
        // 防止重复提单支付
        submitGroupOrderDisabled: false,
        // 支付完防止触发onShow
        preventOnShow: false,
        //配送类型1, "送货上门" ,2, "到店自提"
        deliveryType: "",
        //预售图片
        presaleImage: {},
        showPicker: false,
        //拼团类型	Integer	是	1、自提拼团 2、常规拼团 3、预售团
        groupType: "",
        //拼团模式
        groupMode: "",
        remark: "",
        // 是否展示关注门店
        showAttentionModal: true,
        //是否为团长,在团长代收中对地址处理
        isLeader: true,
        
    },

    // 时间选择器组件点击埋点
    onLogEvent(e) {
        let data = e.detail;
        this.buried.type = data.type;
        this.buried.toast = data.toast;
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "click_delivered_time",
            click_par: {
                type: data.type || "",
                toast: data.toast || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 更新数据
        this.setData({
            // 门店ID
            storeId: options.storeId || "",
            // 商家ID
            orgCode: options.orgCode || "",
            // 参团必传 开团为空
            groupCode: options.groupCode || "",
            isLeader: !options.groupCode,
            // 商品ID
            groupSkuId: options.skuId || "",
            // 活动ID
            groupPromotionId: options.promotionId || "",
            //拼团模式
            groupMode: options.groupMode || "",
            // 登录信息pin
            pin: app.globalData.loginStateInfo && app.globalData.loginStateInfo.PDJ_H5_PIN ? app.globalData.loginStateInfo.PDJ_H5_PIN : wx.getStorageSync("login_info").PDJ_H5_PIN || "",
            // 登录信息jdPin
            jdPin: app.globalData.loginStateInfo && app.globalData.loginStateInfo.PDJ_H5_JDPIN ? app.globalData.loginStateInfo.PDJ_H5_JDPIN : wx.getStorageSync("login_info").PDJ_H5_JDPIN || "",
        });
        // 校验是否关注门店
        this.hasAttentionStore(options.storeId);
        // 默认关注门店
        this.attentionStore(options.storeId);
        
        
    },
    //计算预售团 流程图的
    onReady() {
        let presaleImage = util.computeImgHeight(0.23432, 0.79)
        this.setData({
            presaleImage: presaleImage
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 去登陆返回当前页面更新
        this.setData({
            pin: app.globalData.loginStateInfo && app.globalData.loginStateInfo.PDJ_H5_PIN ? app.globalData.loginStateInfo.PDJ_H5_PIN : wx.getStorageSync("login_info").PDJ_H5_PIN || "",
            jdPin: app.globalData.loginStateInfo && app.globalData.loginStateInfo.PDJ_H5_JDPIN ? app.globalData.loginStateInfo.PDJ_H5_JDPIN : wx.getStorageSync("login_info").PDJ_H5_JDPIN || "",
        })
        if (!this.data.preventOnShow) {
            // 地址授权检测
            this.checkLocation()
        }
        // 设置备注信息
        this.setData({
            remarkText: app.globalData.settlement.remark
        })
    },
    onUnload: function () {
        // 清空备注信息
        app.globalData.settlement.remark = "";
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    /**
     * 切换地址
     */
    changeAddress: function (e) {
        let data = e.currentTarget.dataset
        let storeId = data.storeId || this.data.storeId
        let orgCode = data.orgCode || this.data.orgCode
        let skuId = data.skuId || this.data.goodsInfo.data.skuId
        let promotionId = data.promotionId || this.data.groupPromotionId
        let longitude = this.data.addressInfo.longitude
        let latitude = this.data.addressInfo.latitude
        let cityCode = this.data.addressInfo.cityId
        //埋点
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickChangeCollageStore",
            click_par: {},
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        wx.navigateTo({
          url:
            "../chooseStore/index?storeId=" +
            storeId +
            "&orgCode=" +
            orgCode +
            "&skuId=" +
            skuId +
            "&promotionId=" +
            promotionId +
            "&longitude=" +
            longitude +
            "&latitude=" +
            latitude +
            "&cityCode=" +
            cityCode,
          preObj: recommendObj,
          buried_position: "groupBuy-confirmOrder1",
        });
    },

    /**
     * 检查是否存在地址信息
     */
    checkLocation() {
        if (this.data.addressInfo && this.data.addressInfo.longitude) {
            this.getGroupShopping()
        } else if (app.globalData.addressInfo && app.globalData.addressInfo.longitude && app.globalData.addressInfo.latitude) {
            // 获取app.js地址信息
            this.setData({
                addressInfo: app.globalData.addressInfo
            })
            this.getGroupShopping()
        } else if (wx.getStorageSync("address_info") && wx.getStorageSync("address_info").longitude && wx.getStorageSync("address_info").latitude) {
            // 获取本地缓存地址信息
            this.setData({
                addressInfo: wx.getStorageSync("address_info")
            })
            this.getGroupShopping()
        } else {
            // 授权获取地址信息
            this.getLocation()
        }
    },

    /**
     * 去授权地理位置
     */
    openSettingLocation() {
        let that = this
        wx.openSetting({
            success(res) {
                if (res.authSetting["scope.userLocation"]) {
                    that.getLocation()
                }
            }
        })
    },

    /**
     * 监听默认页事件
     */
    onDefaultBtnEvent(e) {
        let type = e.detail.type
        if (type === 1) {
            this.openSettingLocation()
        } else if (type === 7) {
            this.goGroupList()
        } else if (type === 2) {
            wx.navigateBack()
        }
    },
    /**
     * 去拼团列表
     */
    goGroupList() {
        getApp().globalData.jumpType = 3
        let recommendObj = this.data.recommendObj || {};
        wx.switchTab({
            url: "/pages/home/home",
            preObj: recommendObj
        })
    },
    /**
     * 无地址的时候获取
     */
    getLocation() {
        let that = this
        wx.getLocation({
            type: "wgs84",
            success: function (res) {
                getDaoJiaLocation({
                    longitude: res.longitude,
                    latitude: res.latitude,
                }, function (addressInfo) {
                    if (addressInfo) {
                        app.globalData.addressInfo = addressInfo
                        app.saveAddress(addressInfo)
                        that.setData({
                            addressInfo: addressInfo
                        })
                    }
                    that.getGroupShopping(that.setDeliveryTime)
                })
                // request({
                //     functionId: FNIDS.transferAddress,
                //     body: {
                //         longitude: res.longitude,
                //         latitude: res.latitude,
                //         coord_type: "1",
                //         needMatch: 0
                //     },
                // }).then(res => {
                //     let result = res.data.result
                //     if (result) {
                //         let poi = result.title
                //         if (!poi) {
                //             poi = result.address
                //         }
                //         let addressInfo = {
                //             longitude: result.longitude,
                //             latitude: result.latitude,
                //             cityId: result.areaCode,
                //             cityName: result.city,
                //             countyName: result.district,
                //             poi: poi,
                //             adcode: result.adcode
                //         }
                //         app.globalData.addressInfo = addressInfo
                //         app.saveAddress(addressInfo)
                //         that.setData({
                //             addressInfo: addressInfo
                //         })
                //         that.getGroupShopping(that.setDeliveryTime)
                //     }
                // }).catch((err) => {

                // })
            },
            fail: function () {
                that.setData({
                    showEmpty: true,
                    type: 1,
                    btnText: "重新授权",
                    tips: "获取定位信息失败，请授权",
                    src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png"
                })
            }
        })
    },

    /**
     * 检查用户信息
     * @returns {boolean}
     */
    checkUserInfo() {
        if (this.data.wxUserInfo && this.data.wxUserInfo.nickName) { // 授权用户信息
            return true
        } else if (app.globalData.wxUserInfo && app.globalData.wxUserInfo.nickName) { // app.js用户信息
            this.setData({
                wxUserInfo: app.globalData.wxUserInfo
            })
            return true
        } else if (wx.getStorageSync("wxUserInfo") && wx.getStorageSync("wxUserInfo").nickName) { // 本地缓存
            this.setData({
                wxUserInfo: wx.getStorageSync("wxUserInfo")
            })
            return true
        }
        return false
    },
    /**
     * 预售团需要检查配送时间
     */
    checkDeliveryTime() {
        if (this.data.groupType == 3) {
            let flag = this.data.deliverTime && this.data.deliverTime.data.pushTimeFlag
            if (!flag) {
                wx.showToast({
                    title: "请选择收货时间",
                    icon: "none",
                    duration: 1000
                })
            }
            return flag
        }
        return true
    },
    /**
     * 获取用户信息
     * @param e
     */
    getUserInfo(e) {
        // //debugger;
        //检查接口下发的地址是否为空
        let hasAddressStoreId = this.checkAddress()
        if (!hasAddressStoreId) {
            return
        }
        //检查配送时间
        let checkDelivery = this.checkDeliveryTime()
        if (!checkDelivery) {
            return
        }
        //以下为登录信息 与用户头像昵称校验
        // let userInfo = e.detail.userInfo
        //判断是否登录有pin
        let hasPin = this.checkLogin()
        if (!hasPin) {
            this.goLogin()
            return
        }
        //是否包含头像昵称
        let hasUserInfo = this.checkUserInfo()
        if (this.data.groupType == 1) {
            this.showDialog()
        } else {
            this.submitGroupOrder()
        }
        // console.error(hasUserInfo)
    },

    /**
     * 获取登录状态
     * @returns {boolean}
     */
    checkLogin() {
        if (this.data.pin && this.data.jdPin) {
            return true
        } else {
            return false
        }
    },
    /**
     * 自提需要检查接口是否下发了地址信息
     * @returns {boolean}
     */
    checkStoreId() {
        if (this.data.groupType == 1 && this.data.address && this.data.address.data && this.data.address.data.storeId && this.data.address.data.storeAddress) {
            return true
        } else {
            return false
        }
    },
    /**
     * 检查地址模块
     */
    checkAddress() {
        let recommendObj = this.data.recommendObj || {};
        //团长代收,团员参团
        if (this.data.groupMode == 1 && !this.data.isLeader) {
            if (this.data.receiptAddress && this.data.receiptAddress.data && this.data.receiptAddress.data.addressVo) {
                return true
            } else {
                wx.showModal({
                    title: "温馨提示",
                    content: "团长代收地址错误,无法参团,首页逛逛吧～",
                    showCancel: false,
                    success(res) {
                        wx.switchTab({
                            url: "/pages/home/home",
                            preObj: recommendObj
                        })
                    },
                });
                return false
            }
        }
        //自提
        if (this.data.groupType == 1) {
            if (this.data.address && this.data.address.data && this.data.address.data.storeId && this.data.address.data.storeAddress) {
                return true
            } else {
                wx.showModal({
                    title: "温馨提示",
                    content: "附近暂无提货门店，可切换地址",
                    showCancel: false
                })
                return false
            }
            //商家自送上门 预售
        } else if (this.data.groupType == 2 || this.data.groupType == 3) {
            if (this.data.receiptAddress && this.data.receiptAddress.data && this.data.receiptAddress.data.addressVo && this.data.receiptAddress.data.addressVo.addressId) {
                let phone = this.data.receiptAddress.data.bindPhoneVO && this.data.receiptAddress.data.bindPhoneVO.bindType == 1 ? this.data.receiptAddress.data.bindPhoneVO.bindNewPhone : ""
                this.setData({
                    addressId: this.data.receiptAddress.data.addressVo.addressId,
                    ordererMobile: phone //鲜花蛋糕需要手机号
                })
                return true
            } else {
                wx.showModal({
                    title: "温馨提示",
                    content: "请选择地址",
                    showCancel: false
                })
                return false
            }
        }
    },
    /**
     * 确认订单接口数据
     */
    getGroupShopping(cb) {
        request({
          ...FNIDS.getGroupShopping,
          isNeedDealError: true,
          body: {
            ref: "",
            fromSource: "5",
            addressId: app.globalData.settlement.addressInfo.addressId || "",
            //来自上一页
            storeId: this.data.storeId,
            orgCode: this.data.orgCode,
            groupCode: this.data.groupCode,
            groupSkuId: this.data.groupSkuId,
            groupPromotionId: this.data.groupPromotionId,
            //来自系统
            cityCode: this.data.addressInfo.cityId,
            longitude: this.data.addressInfo.longitude,
            latitude: this.data.addressInfo.latitude,
            //预售团添加
            promiseDate: this.data.promiseDate || "",
            orgStartTime: this.data.orgStartTime || "",
            orgEndTime: this.data.orgEndTime || "",
            userStartTime: this.data.userStartTime || "",
            userEndTime: this.data.userEndTime || "",
            //团类型
            groupType: this.data.groupType || "",
            //拼团模式( 0或null：普通拼团 1：团长代收 注意:团长代收时必传)
            groupMode: this.data.groupMode || "",
            traceId: new Date().getTime() + "",
          },
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            if (res.data.code == 0) {
              let result = res.data.result;
              if (result && result.newModules) {
                let address = {}, //自提信息
                  goodsInfo = {}, //商品信息
                  receiptAddress = {}, //商家自送
                  moneyInfo = {}, //金额
                  deliverTime = {}, //配送时间
                  groupType = result.groupType || "", //拼团类型 1自提 2常规 3预售
                  deliveryType = result.deliveryType || ""; //配送方式 1送货上门 2自提
                result.newModules.forEach((item) => {
                  if (item.moduleKey === "extractAddress") {
                    address = item;
                  } else if (item.moduleKey === "miniproductInfo") {
                    goodsInfo = item;
                  } else if (item.moduleKey === "receiptAddress") {
                    receiptAddress = item;
                  } else if (item.moduleKey === "moneyInfo") {
                    moneyInfo = item;
                  } else if (item.moduleKey === "deliverTime") {
                    deliverTime = item;
                  }
                });
                // 更新数据
                this.setData({
                  showEmpty: false,
                  deliveryType: deliveryType,
                  groupType: groupType,
                  groupMode: result.groupMode || "",
                  remark: result.remark || "",
                  totalMoney: result.totalMoney || 0,
                  serverSign: result.serverSign || "",
                  unique: result.unique || "",
                  address: address,
                  goodsInfo: goodsInfo,
                  receiptAddress: receiptAddress,
                  moneyInfo: moneyInfo,
                  deliverTime: deliverTime,
                });
                this.buried.deliver_type = groupType;
                this.buried.group_type = result.groupMode;

                this.buried.store_id = this.data.storeId;
                this.buried.sku_id = this.data.groupSkuId;
                this.buried.orgcode = this.data.orgCode;
              }
              cb && cb();
            } else if (res.data.code == "AA250") {
              this.setData({
                showEmpty: true,
                type: 7,
                btnText: "去拼团",
                tips: "当前城市暂无该商品的拼团活动 你可参与附近拼团",
                src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png",
              });
            } else {
              wx.showModal({
                title: "温馨提示",
                content: res.data.msg || "加载异常，请重试",
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateBack();
                  }
                },
              });
            }
          })
          .catch((err) => {
            this.setData({
              showEmpty: true,
              type: 2,
              btnText: "稍后重试",
              tips: "网络异常~",
            });
          });
    },
    /**
     * 拼团提单
     */
    submitGroupOrder() {
        if (this.data.submitGroupOrderDisabled) {
            return
        }
        this.setData({
            submitGroupOrderDisabled: true
        });
        wx.showLoading({
            title: "加载中...",
            mask: true
        });
        let that = this;
        let deliveryTime = "";
        if (that.data && that.data.promiseDate && that.data.orgEndTime) {
            deliveryTime = that.data.groupType == 3 && (that.data.promiseDate + " " + that.data.orgEndTime + ":00") || "";
        }
        let sendTime = "";
        if (that.data && that.data.promiseDate && that.data.orgStartTime) {
            sendTime = that.data.groupType == 3 && (that.data.promiseDate + " " + that.data.orgStartTime + ":00") || "";
        }
        let { recommendObj = {} } = this.data;
        request({
            method: "POST",
            ...FNIDS.submitGroupOrder,
            isNeedDealError: true,
            body: {
                pin: that.data.pin,
                jd_pin: that.data.jd_pin,
                produceStationNo: that.data.address.data.storeId || that.data.storeId || "",
                signatureKey: that.data.serverSign || "",
                unique: that.data.unique || "",
                clientVersion: globalData.config.xcxVersion || "",
                groupCode: that.data.groupCode,
                groupPromotionId: that.data.groupPromotionId,
                fromSource: "5",
                groupSkuId: that.data.groupSkuId,
                wxUserName: that.data.wxUserInfo.nickName || "",
                wxUserPicUrl: that.data.wxUserInfo.avatarUrl || "",
                deliveryType: that.data.deliveryType || "", //配送类型
                addressId: that.data.addressId || "", //送货上门的时候，必须填写
                ordererMobile: that.data.ordererMobile || "",

                groupType: that.data.groupType || "", //拼团类型 1自提 2常规 3预售
                groupMode: that.data.groupMode || "", //0或null：普通拼团 ；1：团长代收 （团长代收时必传）
                deliveryTime: deliveryTime,
                sendTime: sendTime,
                expectedDeliveryTime: that.data.expectedDeliveryEndTime || "",
                expectedDeliveryBeginTime: that.data.expectedDeliveryBeginTime || "",
                deliveryTip: that.data.deliveryTip || "",

                orderBuyerRemark: this.data.remarkText
            },
            preObj: this.data.recommendObj || {}
        }).then(res => {
            wx.hideLoading();
            this.setData({
                submitGroupOrderDisabled: false
            });
            this.buried.deliver_type = that.data.groupType;
            this.buried.group_type = that.data.groupMode;
            this.buried.store_id = that.data.storeId;
            this.buried.sku_id = that.data.groupSkuId;
            this.buried.orgcode = that.data.orgCode;
            this.buried.toast = res.data.msg || "";
            this.clickSubmit();
            if (res.data.code == 0) {
                //团长代收且预处理订单失败
                if (that.data.groupMode === 1 && (!res.data.result || !res.data.result.payFlag)) {
                    mp.toast({
                        title: "唤起支付失败，请重试",
                    });
                    wx.navigateTo({
                      url: "/pages/groupBuy/groupOrder/index?tabIndex=2",
                      preObj: recommendObj,
                      buried_position: "groupBuy-confirmOrder2",
                    });
                    return
                }
                this.requestSign({
                    orderId: res.data.result.orderId,
                    groupMode: that.data.groupMode,
                });
            } else if (res.data.code == "50400") {
                wx.showModal({
                    title: "提示",
                    content: '您的账号未绑定手机号，请选择手机号登录',
                    confirmText: "去登录",
                    showCancel: false,
                    success: (res) => {
                        if (res.confirm) {
                            that.goLogin()
                        }
                    }
                })
            } else if (res.data.code == "202") {
                this.goLogin()
            } else {
                wx.showModal({
                    title: "提示",
                    content: res.data.msg,
                    showCancel: false
                })
            }
        }).catch(() => {
            this.setData({
                showDialog: false,
                submitGroupOrderDisabled: false
            });
            wx.hideLoading()
        })
    },

    // 上报埋点
    clickSubmit() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "to_pay",
            click_par: {
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                toast: this.buried.toast || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },

    /**
     * 支付
     * @param options
     */
    requestSign(options) {
        let that = this;
        // 阻止调取onShow
        that.setData({
            preventOnShow: true
        });
        requestSign(options, function () {
            let { recommendObj = {} } = that.data;
            that.groupPayCheck(options.orderId).then(res => {
                let result = res.data.result;
                if (result) {
                    // 校验拼团或参团成功
                    wx.redirectTo({
                        url: "../paySuccess/index?orderId=" + options.orderId + "&groupId=" + that.data.groupCode,
                        preObj: recommendObj,
                        buried_position: "groupBuy-confirmOrder1",
                        success() {
                            that.buried.order_id = options.orderId;
                            that.buried.deliver_type = that.data.groupType;
                            that.buried.group_type = that.data.groupMode;
                            that.buried.store_id = that.data.storeId;
                            // that.pv()
                            that.setData({
                                preventOnShow: false
                            })
                        }
                    })
                } else {
                    mp.dialog({
                        content: res.data.msg,
                        showCancel: false
                    }).then(() => {
                        that.setData({
                            preventOnShow: false
                        });
                        // 校验拼团或参团失败
                        if (that.data.groupCode) {
                            wx.redirectTo({
                              url:
                                "../join/index?&groupId=" + that.data.groupCode,
                              preObj: recommendObj,
                              buried_position: "groupBuy-confirmOrder2",
                            });
                        } else {
                            if (that.data.groupMode == 1) {
                                wx.redirectTo({
                                  url: "/pages/groupBuy/groupOrder/index?tabIndex=2",
                                  preObj: recommendObj,
                                  buried_position: "groupBuy-confirmOrder3",
                                });
                            } else {
                                wx.redirectTo({
                                  url:
                                    "../orderInfo/index?&orderId=" +
                                    options.orderId,
                                  preObj: recommendObj,
                                  buried_position: "groupBuy-confirmOrder4",
                                });
                            }
                        }
                    })
                }
            }).catch(() => {
                if (that.data.groupMode == 1) {
                    wx.redirectTo({
                      url: "/pages/groupBuy/groupOrder/index?tabIndex=2",
                      preObj: recommendObj,
                      buried_position: "groupBuy-confirmOrder5",
                      success() {
                        that.setData({
                          preventOnShow: false,
                        });
                      },
                    });
                } else {
                    wx.redirectTo({
                      url: "../orderInfo/index?&orderId=" + options.orderId,
                      preObj: recommendObj,
                      buried_position: "groupBuy-confirmOrder6",
                      success() {
                        that.setData({
                          preventOnShow: false,
                        });
                      },
                    });
                }
            })
        }, function () {
            if (that.data.groupMode == 1) {
                wx.redirectTo({
                  url: "/pages/groupBuy/groupOrder/index?tabIndex=2",
                  preObj: recommendObj,
                  buried_position: "groupBuy-confirmOrder7",
                  success: function () {
                    that.setData({
                      preventOnShow: false,
                    });
                  },
                });
            } else {
                wx.redirectTo({
                  url: "../orderInfo/index?orderId=" + options.orderId,
                  preObj: recommendObj,
                  buried_position: "groupBuy-confirmOrder8",
                  success: function () {
                    that.setData({
                      preventOnShow: false,
                    });
                  },
                });
            }
        });
        this.setData({
            showDialog: false
        });
        //   埋点
        this.buried.order_id = options.orderId
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "to_order",
            click_par: {
                order_id: options.orderId || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },

    /**
     * 校验参团
     */
    groupPayCheck(orderId) {
        return new Promise((resolve, reject) => {
            request({
              ...FNIDS.groupPayCheck,
              body: {
                orderId: orderId,
              },
              preObj: this.data.recommendObj || {},
            })
              .then((res) => {
                resolve(res);
              })
              .catch((err) => {
                reject(err);
              });
        })
    },

    // pv埋点回调函数
    // pv() {
    //
    // },
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
            create_time: new Date(),
            page_par: {
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
                store_id: this.buried.store_id || "",
                orgcode: this.buried.orgcode || "",
                sku_id: this.buried.sku_id || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
            isBack: back || "",
        });
    },
    /**
     * 展示dialog
     */
    showDialog() {
        this.setData({
            showDialog: true
        })
    },

    /**
     * 关闭dialog
     */
    hideDialog() {
        this.setData({
            showDialog: false
        })
    },
    /**
     * 获取地址
     * @param e
     */
    goAddress(e) {
        //如果是团长代收且为团员不可更改收货地址
        if (this.data.groupMode == 1 && !this.data.isLeader) {
            return;
        }
        let type = e.currentTarget.dataset.type

        let { recommendObj = {} } = this.data;
        //1详细 2新建 3新建 4选择 5超出20个
        if (type == 2 || type == 3) {
            wx.removeStorageSync("address_edit_info")
            wx.navigateTo({
              url: "/pages/address/createOrEdit/index",
              preObj: recommendObj,
              buried_position: "groupBuy-confirmOrder3",
            });
            return
        }
        let addressId = e.currentTarget.dataset.addressId || "",
            storeId = e.currentTarget.dataset.storeId || "" //取下发对
        wx.navigateTo({
          url: `/pages/address/home/index?from=order&storeId=${storeId}&addressId=${addressId}`,
          preObj: recommendObj,
          buried_position: "groupBuy-confirmOrder4",
        });
    },
    //去详情页面
    goDetailInfo(e) {
        let {
            type,
            data
        } = e.detail
        let { recommendObj = {} } = this.data;
        wx.navigateTo({
          url: `/pages/groupBuy/goodDetail/index?orgCode=${data.orgCode}&promotionId=${data.promotionId}&skuId=${data.skuId}&storeId=${data.storeId}`,
          preObj: recommendObj,
          buried_position: "groupBuy-confirmOrder5",
        });
    },
    //显示time picker
    onDeliverTimeClick: function () {
        console.log("onDeliverTimeClick");
        //团长代收且非团长无法更改收获时间
        if (this.data.groupMode == 1 && !this.data.isLeader) {
            return;
        }
        if (this.data.deliverTime && this.data.deliverTime.data && this.data.deliverTime.data.promiseDateRespItems && this.data.deliverTime.data.promiseDateRespItems.length) {
            this.setData({
                showPicker: true
            })
        }
    },
    pickerEvent(e) {
        let {
            type,
            data
        } = e.detail
        if (type == "picker-time") {
            this.setDeliveryTime(data)
            this.getGroupShopping()
        }
    },
    //设置当前时间
    setDeliveryTime(data_, cb) {
        //根据索引获取日期 具体参考promiseDateRespItems结构 [{a:1,promiseTimeRespItems:[]},{a:2,promiseTimeRespItems:[]}]
        let promiseDateRespItems = this.data.deliverTime.data.promiseDateRespItems || [],
            data = data_ || {
                dateIndex: 0,
                timeIndex: 0
            },
            promiseDateItems = promiseDateRespItems[data.dateIndex] || {},
            promiseDate = promiseDateItems.promiseDate || "",
            promiseTimeRespItems = promiseDateItems.promiseTimeRespItems || [],
            promiseTime = promiseTimeRespItems[data.timeIndex] || "",
            orgStartTime = promiseTime.orgStartTime || "",
            orgEndTime = promiseTime.orgEndTime || "",
            userStartTime = promiseTime.userStartTime || "",
            userEndTime = promiseTime.userEndTime || "",
            onTime = promiseTime.dingshida ? 1 : 0,
            deliveryTip = promiseTime.deliveryTip || ""

        /**判断是否存在 expectedDeliveryTime 如有 2018-09-09 12：00-14：30
         * expectedDeliveryTime 需要转化为两个参数
         * expectedDeliveryBeginTime：2018-09-09 12：00：00
         * expectedDeliveryEndTime： 2018-09-09 14：30：00
         */
        let expectedDeliveryTime = promiseTime.expectedDeliveryTime || "",
            expectedDate, expectedTime, expectedDeliveryBeginTime, expectedDeliveryEndTime
        if (expectedDeliveryTime) {
            let expectedDeliveryTimeArr = expectedDeliveryTime.split(" ")
            expectedDate = expectedDeliveryTimeArr[0],
                expectedTime = expectedDeliveryTimeArr[1],
                expectedDeliveryBeginTime = `${expectedDate + " " + expectedTime.split("-")[0]}:00`,
                expectedDeliveryEndTime = `${expectedDate + " " + expectedTime.split("-")[1]}:00`
        } else {
            //没有expectedDeliveryTime的话则取默认的开始和结束时间
            expectedDeliveryBeginTime = promiseDate && userStartTime ? `${promiseDate + " " + userStartTime}:00` : ""
            expectedDeliveryEndTime = promiseDate && userEndTime ? `${promiseDate + " " + userEndTime}:00` : ""
        }
        this.setData({
            promiseDate,
            promiseTime,
            orgStartTime,
            orgEndTime,
            userStartTime,
            userEndTime,
            onTime,
            deliveryTip,
            expectedDeliveryBeginTime,
            expectedDeliveryEndTime
        });
        cb && cb(this)
    },
    // 判断当前用户是否关注此门店
    hasAttentionStore(storeId) {
        checkAttentionStore({
            storeId: storeId,
            preObj: this.data.recommendObj || {}
        }).then(res => {
            if (res.data.result) {
                this.setData({
                    showAttentionModal: false
                })
            }
        })
    },
    // 关注门店
    attentionStore(storeId) {
        // 默认关注门店
        chanageAttention({
            storeId: storeId,
            isFollow: true,
            preObj: this.data.recommendObj || {}
        }).then(res => {
            if (res.data.result) {
                // util.refreshHomePage()
            }
        })
    },
    // 去备注
    goToRemark() {
        let { recommendObj = {} } = this.data;
        wx.navigateTo({
          url: "/pages/other/remarkPage/remarkPage",
          preObj: recommendObj,
          buried_position: "groupBuy-confirmOrder6",
        });
    },
    //去登录
    goLogin() {
        let { recommendObj = {} } = this.data;

        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: recommendObj,
          buried_position: "groupBuy-confirmOrder7",
        });
    }
})

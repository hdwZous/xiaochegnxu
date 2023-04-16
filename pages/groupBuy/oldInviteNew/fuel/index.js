import {
    FNIDS,
    request
} from "../../../../common/util/api";
import {
    isLogin
} from '../../../../common/util/loginUtil';
import {
    getDetailInfo,
    startGroup
} from "../resultAndFuel/index.js";
import paytools from '../../../../common/util/PayTools';
import mp from '../../../../common/util/wxapi';
import util from '../../../../common/util/util'
import { getDaoJiaLocation } from "../../../../common/util/services";
import {  pvBuriedV2_ , clickBuriedV2_ } from "../../../../common/util/BI";
import { mpCmsJump } from "../../../../common/util/agreementV2";
let app = getApp()
Page({
    buried: {
        is_default: "",
        missing_reason: "",
        type: "",
        store_id: "",
        sku_id: "",
        orgcode: "",
        status: "",
        
        
        
    },

    /**
     * 页面的初始数据
     */
    data: {
        // 推荐的拼团列表
        recommendInfoList: [],
        // 拼团详情信息
        groupInfoVO: {},
        addressInfo: {},
        promotionId: "",
        groupId: "",
        btnType: "",
        // 剩余时间
        groupRemainTime: 0,
        showRuleDialog: false,

        showImg: false,
        showPage: true,
        // 默认页
        type: 1,
        btnText: "获取地理位置",
        src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png",
        dialogTxt: "",
        useClose: false,
        dialogBtn: "去首页逛逛",

        // 券状态
        couponType: 1,
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        app.globalData.qrcode.business = "22"
        this.setData({
            promotionId: options.promotionId || "",
            groupId: options.groupId || "",
            storeId: options.storeId || ""
        });
        // 处理地址信息
        this.handelAddress()

        
        

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (util.goHome()) {
          let { recommendObj = {} } = this.data;
            wx.switchTab({
                url: "/pages/home/home",
                preObj: recommendObj
            })
        }
        if (app.globalData.changeAddress) {
            this.handelAddress()
        }
    },
    handelAddress() {
        let addressInfo = {};
        try {
            addressInfo = wx.getStorageSync('address_info') || app.globalData.addressInfo
        } catch (e) {

        }
        if (addressInfo && addressInfo.latitude) {
            this.getInfo()
        } else {
            this.getLocationByWX()
        }
    },
    // 微信地理位置授权
    getLocationByWX() {
        wx.getLocation({
            success: (res) => {
                this.getAddress(res).then((res) => {
                    if (res) {
                        var addressInfo = {
                            longitude: res.longitude,
                            latitude: res.latitude,
                            cityId: res.cityId,
                            cityName: res.cityName,
                            countyName: res.countyName,
                            poi: res.poi,
                            adcode: res.adcode || ""
                        }
                        app.globalData.addressInfo = addressInfo;
                        app.saveAddress(addressInfo);
                    }
                    this.getInfo()
                })
            },
            fail: (res) => {
                this.getInfo()
            }
        })
    },
    // 打开设置页
    setAddress() {
        wx.openSetting({
            complete: (res) => {
                if (res.authSetting["scope.userLocation"]) {
                    this.getLocationByWX();
                }
            }
        });
    },
    // 获取地理位置
    getAddress(location) {
        return new Promise((resolve, reject) => {
            getDaoJiaLocation({
                longitude: location.longitude,
                latitude: location.latitude,
            }, function(res) {
                resolve(res)
            }, {
                isNeedDealError: true
            })
            // request({
            //     // 真实接口
            //     functionId: "local/getAddressN",
            //     noLoading: true,
            //     body: {
            //         "longitude": location.longitude,
            //         "latitude": location.latitude,
            //         "coord_type": "1",
            //         "needMatch": 0
            //     },
            //     isNeedDealError: true
            // }).then((res) => {
            //     let result = res.data.result || {}
            //     resolve(result)
            // }).catch((err) => { })
        })
    },
    // 获取详情数据
    getInfo() {
        let params = {
            promotionId: this.data.promotionId || "",
            groupId: this.data.groupId || "",
            storeId: this.data.storeId || ""
        }
        let self = this;
        getDetailInfo(params).then(res => {
            let is_default = false;
            if (res.data.code == 0) {
                if (!res.data.result) {
                    this.setData({
                        type: 3,
                        // 列表-提示
                        tips: '暂未获取到商品信息，稍后重试~',
                        // 列表-按钮
                        btnText: '首页逛逛',
                        // 列表-默认图
                        src: 'https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png',
                        showPage: false,
                        missing_reason: res.data.msg
                    })
                } else {
                    let result = res.data.result
                    this.setData({
                        recommendInfoList: result.recommendInfo || [],
                        groupInfoVO: result.groupInfoVO,
                        groupRemainTime: result.groupInfoVO.groupRemainTime || "",
                        shareImgUrl: result.groupInfoVO.shareImgUrl,
                        showImg: true
                    })
                    let buttonId = this.data.groupInfoVO.buttonId
                    if (buttonId == 1 || buttonId == 6 || buttonId == 7 || buttonId == 9) { //立即使用-去开新团-首页逛逛
                        this.setData({
                            groupRemainTime: 0
                        })

                    } else if (buttonId == 3) { //邀请新用户
                        this.setData({
                            btnType: "share"
                        })
                    } else if (buttonId == 2 || buttonId == 5 || buttonId == 8) { //重新开团
                        this.setData({
                            btnType: "formId",
                            groupRemainTime: 0
                        })
                        if (this.data.hasJoin && buttonId == 5) { //支付后显示此团已满员，跳转到团列表页
                            this.setData({
                                hasJoin: false
                            })
                            let { recommendObj = {} } = self.data;
                            wx.redirectTo({
                              url: `/pages/groupBuy/groupOrder/index`,
                              preObj: recommendObj,
                              buried_position: "groupBuy-confirmOrder-fuel1",
                            });
                        }
                    } else if (buttonId == 4) { //一键参团
                        this.setData({
                            btnType: "formId"
                        })
                    } else if (buttonId == 10) {
                        this.setData({
                            couponType: 2
                        })
                    }
                }

            } else {
                is_default = true
                this.setData({
                    type: 2,
                    // 列表-提示
                    tips: '当前位置无活动～',
                    // 列表-按钮
                    btnText: '切换地址',
                    // 列表-默认图
                    src: 'https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png',
                    showPage: false,
                    missing_reason: res.data.msg
                })
                // console.error("=====没有result=====")
            }
            // 埋点
            this.buried.is_default = is_default ? "yes" : "no";
            this.buried.missing_reason = res.data.msg || "";
            this.buried.type = this.data.couponType;
           
        })
    },
    // pv埋点回调
    // pv() {
    //
    // },
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
            create_time: new Date(),
            page_par: {
                is_default: this.buried.is_default || "",
                missing_reason: this.buried.missing_reason || "",
                type: this.buried.type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
            isBack: back || "",
        });
    },
    // 点击埋点回调
    clickUse() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "click_use",
            click_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 点击埋点回调
    clickJoinCollage() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickJoinCollage",
            click_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 点击埋点回调
    clickOpenCollageAgain() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickOpenCollageAgain",
            click_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                status: this.buried.status || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 点击埋点回调
    clickOpenNewCollage() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickOpenCollageAgain",
            click_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                type: this.buried.type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 点击埋点回调
    toHome() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "to_home",
            click_par: {
                type: this.buried.type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 点击埋点回调
    clickGoCollage() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickGoCollage",
            click_par: {},
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 点击埋点回调
    clickChangeAddress() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickChangeAddress",
            click_par: {
                missing_reason: this.buried.missing_reason || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 组件事件监听
    widgetEvent(e) {
        let recommendObj = this.data.recommendObj || {};
        let type = e.detail.type,
            data = this.data.groupInfoVO;
        if (type == "groupClickBtn") {
            if (data.buttonId == 1) { //立即使用，进店锚中商品并加车
                // 埋点
                this.buried.store_id = data.storeId;
                this.buried.sku_id = data.skuId;
                this.buried.orgcode = data.orgCode;
                this.clickUse();
                mpCmsJump({
                  pageType: "p20",
                  params: {
                    storeId: data.storeId,
                    orgCode: data.orgCode,
                    skuId: data.skuId,
                    isAddCart: true,
                    showCart: true,
                  },
                  preObj: recommendObj,
                  buried_position: "groupBuy-oldInviteNew-fuel1",
                });
            } else if (data.buttonId == 2 || data.buttonId == 4 || data.buttonId == 5 || data.buttonId == 8) { //重新开团-一键参团-唤起微信支付
                if (isLogin()) {
                    if (data.buttonId == 4) { //一键参团
                        // 埋点
                        this.buried.store_id = data.storeId;
                        this.buried.sku_id = data.skuId;
                        this.buried.orgcode = data.orgCode;
                        this.clickJoinCollage()
                        this.joinGroup(e)
                    } else { //重新开团
                        // 埋点
                        this.buried.store_id = data.storeId;
                        this.buried.sku_id = data.skuId;
                        this.buried.orgcode = data.orgCode;
                        this.buried.status = data.buttonId == 2 ? "2" : "1";
                        this.clickOpenCollageAgain();
                        this.reStartGroup(e)
                    }
                } else {

                    wx.navigateTo({
                      url: `/pages/newLogin/login/login`,
                      preObj: recommendObj,
                      buried_position: "groupBuy-oldInviteNew1",
                    });
                }
            } else if (data.buttonId == 6 || data.buttonId == 7 || data.buttonId == 9) { //去开新团-进入列表
                // 埋点
                this.buried.store_id = data.storeId;
                this.buried.sku_id = data.skuId;
                this.buried.orgcode = data.orgCode;
                this.buried.type = data.title;
                this.clickOpenNewCollage();
                mpCmsJump({
                  pageType: "p14",
                  preObj: recommendObj,
                  buried_position: "groupBuy-oldInviteNew-fuel2",
                });
            } else if (data.buttonId == 10) {
                this.buried.type = this.data.couponType;
                this.toHome()
                wx.switchTab({
                    url: "/pages/home/home",
                    preObj: recommendObj
                })
            }
        } else if (type == "timeEnd") {
            if (this.data.groupRemainTime > 0) {
                this.getInfo()
            }
        }
    },
    // 默认按钮点击事件
    componentEvent(e) {
        // missing_reason
        let type = e.detail.type;
        if (type == 2) {
            let recommendObj = this.data.recommendObj || {};
            wx.navigateTo({
              url: "/pages/address/home/index?from=group",
              preObj: recommendObj,
              buried_position: "groupBuy-oldInviteNew2",
            });
            this.buried.missing_reason = this.data.missing_reason || ""
            this.clickChangeAddress()
        } else if (type == 3) {
            this.buried.type = this.data.couponType;
            this.toHome();
            wx.switchTab({
                url: '/pages/home/home',
                preObj: recommendObj
            })
        }
    },
    // 提单支付-一键参团
    joinGroup(e) {
        mp.loading_cover()
        let promotionId = this.data.promotionId || '',
            groupId = this.data.groupId,
            data = e.detail.data,
            self = this;
        startGroup({
            promotionId: promotionId || '',
            storeId: this.data.groupInfoVO.storeId,
            groupId: groupId,
            formId: data.event.detail.formId,
        }).then(result => {
            if (result.data.code == "0") {
                let res = result.data.result
                if (res) {
                    paytools.requestPay(res, function (res) {
                        self.setData({
                            hasJoin: true
                        })
                        self.getInfo()
                    })
                }
            } else {
                if (result.data.code == "60001") {
                    this.setData({
                        showRuleDialog: true,
                        dialogTxt: result.data.msg,
                        dialogBtn: "知道了",
                        dailogType: "groupList"
                    })
                } else if (result.data.code !== "60005") {
                    this.setData({
                        showRuleDialog: true,
                        dialogTxt: result.data.msg,
                        dailogType: "home"
                    })
                }
            }

        })
    },
    // 提单支付-重新开团
    reStartGroup(e) {
        mp.loading_cover()
        let promotionId = this.data.promotionId,
            data = e.detail.data,
            storeId = this.data.groupInfoVO.storeId;
        let self = this;
        startGroup({
            promotionId: promotionId,
            storeId: storeId,
            formId: data.event.detail.formId,
            groupId: this.data.newGroupId || ""
        }).then(result => {
            if (result.data.code == 0) {
                let res = result.data.result;
                if (res) {
                    let newGroupId = res.groupId
                    if (!this.data.newGroupId) {
                        newGroupId = res.groupId
                        this.setData({
                            newGroupId
                        })
                    }
                    paytools.requestPay(res, function (res) {
                        let recommendObj = self.data.recommendObj || {};
                        wx.redirectTo({
                          url: `/pages/groupBuy/oldInviteNew/result/index?promotionId=${promotionId}&groupId=${newGroupId}&storeId=${storeId}`,
                          preObj: recommendObj,
                          buried_position: "groupBuy-confirmOrder-fue2",
                        });
                    })
                }
            } else {
                if (result.data.code == "60001") {
                    this.setData({
                        showRuleDialog: true,
                        dialogTxt: result.data.msg,
                        dialogBtn: "知道了",
                        dailogType: "groupList"
                    })
                } else {
                    this.setData({
                        showRuleDialog: true,
                        dialogTxt: result.data.msg,
                        dailogType: "home"
                    })
                }
            }

        })
    },
    // 去拼团列表
    goToGroupList() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickMoreCollage",
            click_par: {},
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        wx.navigateTo({
          url: "/pages/groupBuy/groupList/index",
          preObj: recommendObj,
          buried_position: "groupBuy-oldInviteNew3",
        });
    },
    // 进店领优惠
    goToStoreHome() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickGoStoreBenfit",
            click_par: {},
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        let data = this.data.groupInfoVO;
        mpCmsJump({
          pageType: "p20",
          params: {
            storeId: data.storeId,
            orgCode: data.orgCode,
          },
          preObj: recommendObj,
          buried_position: "groupBuy-oldInviteNew-fuel3",
        });
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },
    // 去首页
    dailogClick() {
        let dailogType = this.data.dailogType
        let recommendObj = this.data.recommendObj || {};
        if (dailogType == "groupList") {
            this.clickGoCollage()
            wx.navigateTo({
              url: "/pages/groupBuy/groupList/index",
              preObj: recommendObj,
              buried_position: "groupBuy-oldInviteNew4",
            });
        } else if (dailogType == "home") {
            this.buried.type = this.data.couponType;
            this.toHome();
            wx.switchTab({
                url: '/pages/home/home',
                preObj: recommendObj
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage(res) {

        let data = this.data.groupInfoVO;
        let promotionId = this.data.promotionId;
        let groupId = this.data.groupId;
        let storeId = this.data.storeId;
        let skuName = data.skuName;
        let basicPrice = data.basicPrice;
        let groupPrice = data.groupPrice;
        let shareTitle = '快！' + groupPrice + '元拼【原价' + basicPrice + '元】' + skuName;
        // 埋点
        this.buried.store_id = data.storeId;
        this.buried.sku_id = data.skuId;
        this.buried.orgcode = data.orgCode;
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickShareFriend",
            click_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                type: this.buried.type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        // 【1.0元拼（原价12元）】中国京欣大西瓜
        return {
            title: shareTitle,
            path: `/pages/groupBuy/oldInviteNew/fuel/index?promotionId=${promotionId}&groupId=${groupId}&storeId=${storeId}`,
            imageUrl: data.shareImgUrl
        }
    }
})

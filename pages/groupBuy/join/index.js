import {
    request,
    FNIDS
} from "../../../common/util/api"
import util from "../../../common/util/util"
import mp from "../../../common/util/wxapi"
import {
    getGroupShareImg,
    chanageAttention,
    checkAttentionStore,
 } from "../common/public.js"
import { getDaoJiaLocation } from "../../../common/util/services"
import {  pvBuriedV2_ , clickBuriedV2_ } from "../../../common/util/BI";
let app = getApp()
Page({
    // 埋点数据
    buried: {
        is_finished: "",
        store_id: "",
        sku_id: "",
        orgcode: "",
        deliver_type: "",
        group_type: "",
        storeId: "",
        groupId:"",
        leader:"",
        promotionId:"",
        
        
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        groupId: "",
        channel: "",
        data: {},
        // 地址信息
        addressInfo: {
            lgt: "",
            lat: ""
        },
        // 显示页面
        showPage: false,
        // 展示分享微信朋友圈弹层
        showShare2WxDialog: false,
        // 朋友圈分享图片
        momentsShareImgSrc: "",
        // 保存分享图片弹层
        showShare2MomentsDialog: false,
        // 点击保存图片埋点信息
        savePicDialogReportData: {},
        // 关注门店
        showAttentionModal: true,
        
    },

    // 生命周期函数--监听页面加载
    onLoad(options) {
        let groupId = options.groupId;
        let channel = options.channel;
        app.globalData.qrcode.business = "19"
        let addressInfo = getApp().globalData.addressInfo;
        this.setData({
            groupId: groupId || "",
            channel: channel || ""
        })
        this.resolveParams(options);
        if (addressInfo.latitude) {
            this.setData({
                addressInfo: addressInfo
            })
            this.groupJoin()
        } else {
            this.getLocationByWX()
        }
        
        
    },
    resolveParams(options) {
        // 解析参数
        console.log("options.scene===", options, options.scene, options.scene == true)
        if (options.scene) {
            let tmpScene = decodeURIComponent(options.scene)
            let data = tmpScene.split(",");

            this.setData({
                groupId: data[0],
                channel: data[1]
            })
            if (data[1]) {
                app.globalData.qrcode.channel = data[1]
            }
        } else {
            app.globalData.qrcode.channel = options.channel || "2"
        }
    },
    // 生命周期函数--监听小程序显示
    onShow() { 
       
    },
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
                leader: this.buried.leader || "",
                groupId: this.buried.groupId || "",
                promotionId: this.buried.promotionId || "",
                is_finished: this.buried.is_finished || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
            isBack: back || "",
        });
    },
    // 参团
    groupJoin() {
        this.requestGroupJoin().then(res => {
            let result = res.data.result
            if (!result.userInfoList) {
                result.userInfoList = [null]
            }

            this.setData({
                showPage: true
            })
            // 修改文案
            switch (result.status) {
                case 1:
                    result.btnTxt = "一键参团"
                    result.title = "还差<span class=\"num\">" + result.leftMembers + "人</span>成团"
                    break
                case 2:
                    result.btnTxt = "我也要开团"
                    result.title = "已成团"
                    if (!result.leftMembers) {
                        result.remainTime = 0
                    }
                    break
                case 21:
                    result.btnTxt = "去查看"
                    result.title = "拼团成功"
                    result.remainTime = 0
                    break
                case 22:
                    result.btnTxt = "去查看"
                    result.title = "拼团成功"
                    result.remainTime = 0
                    break
                case 23:
                    result.btnTxt = "邀请好友参团，一起享超级优惠"
                    result.title = "还差<span class=\"num\">" + result.leftMembers + "人</span>成团"
                    result.remainTime = 0
                    result.buttonType = "share"

                    // result.btnType = "share"
                    break
                case 24:
                    result.btnTxt = "我也要开团"
                    result.title = "已成团"
                    result.remainTime = 0
                    break
                case 3:
                    result.btnTxt = "我也要开团"
                    result.title = "已结束"
                    result.remainTime = 0
                    break
                case 4:
                    result.btnTxt = "去开新团"
                    if (!result.leftMembers) {
                        result.remainTime = 0
                    }
                    result.title = "已参团"
                    break
                case 5:
                    result.btnTxt = "看看别的商品"
                    result.title = "参团资格达上限"
                    result.remainTime = 0
                    break
                case 6:
                    result.btnTxt = "看看别的商品"
                    result.title = "商品已抢光"
                    result.remainTime = 0
                    break
                case 7:
                    result.btnTxt = "去支付"
                    result.title = "待支付"
                    break
                case 8:
                    result.btnTxt = "看看别的商品"
                    result.title = "团已取消"
                    result.remainTime = 0
                    break
                default:
                    break
            }
            // 埋点
            this.buried.is_finished = result.title;
            this.buried.store_id = result.storeId;
            this.buried.sku_id = result.skuId;
            this.buried.orgcode = result.orgCode;
            this.buried.deliver_type = result.deliveryType;
            this.buried.group_type = result.groupMode;

            this.buried.groupId = result.groupId ||"";
            this.buried.promotionId = result.promotionId||"";
            this.buried.leader = result.leader||"";
            let recommendObj = this.data.recommendObj || {};
            clickBuriedV2_({
                click_id: "groupJoin",
                click_par: {
                    is_finished: this.buried.is_finished || "",
                    store_id: this.buried.store_id || "",
                    sku_id: this.buried.sku_id || "",
                    deliver_type: this.buried.deliver_type || "",
                    orgcode: this.buried.orgcode || "",
                    group_type: this.buried.group_type || "",
                },
                currentPageName: recommendObj.currentPageName || "",
                prePageName: recommendObj.prePageName || "",
                pageId: recommendObj.pageIdFirstPage || "",
            });
            // 更新数据
            this.setData({
                data: result
            })
            
            
            
        }).catch(err => {
        })
    },
    // 请求参团接口
    requestGroupJoin() {
        return new Promise((resolve, reject) => {
            request({
              ...FNIDS.groupJoin,
              body: {
                groupId: this.data.groupId,
                groupMode: this.data.groupMode,
                lgt: this.data.addressInfo.longitude,
                lat: this.data.addressInfo.latitude,
                cityId: this.data.addressInfo.cityId,
              },
              preObj: this.data.recommendObj || {},
            })
              .then((res) => {
                // 校验是否在关注门店
                let storeId = res.data.result.storeId;
                if (util.isLogin() && storeId) {
                  checkAttentionStore({
                    storeId: storeId,
                    preObj: this.data.recommendObj || {}
                  })
                    .then((res) => {
                      if (res.data.result) {
                        this.setData({
                          showAttentionModal: false,
                        });
                      } else {
                        // 默认关注门店
                        this.attentionStrore(storeId);
                      }
                    })
                    .catch((err) => {
                      // 默认关注门店
                      this.attentionStrore(storeId);
                    });
                }
                resolve(res);
              })
              .catch((err) => {
                reject(err);
              });
        })
    },
    // 默认关注门店
    attentionStrore(storeId) {
        chanageAttention({
          storeId: storeId,
          isFollow: true,
          preObj: this.data.recommendObj || {},
        }).then((res) => {
          if (res.data.result) {
            util.refreshHomePage();
          }
        });
    },
    // 埋点
    ClickOpenCollage() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickOpenCollage",
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
    // 埋点
    ClickOneKeyCollage() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickOneKeyCollage",
            click_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
                leader: this.buried.leader || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },
    // 组件事件监听
    widgetEvent(e) {
        let type = e.detail.type
        let recommendObj = this.data.recommendObj || {};
        if (type === "groupClickBtn") {
            if (this.data.data.buttonType == "share") {
                this.setData({
                    showShare2WxDialog: true
                })
            } else {
                // 参团校验
                this.requestGroupJoin().then(res => {
                    let result = res.data.result
                    if (result) {
                        let status = result.status
                        let orgCode = result.orgCode || ""
                        let storeId = result.storeId || ""
                        let skuId = result.skuId || ""
                        let orderId = result.orderId || ""
                        let promotionId = result.promotionId || ""
                        let groupMode = result.groupMode ;

                        if (status === 2 || status === 3 || status === 6 || status === 8) { // 2：团已满 3：已结束 6: 商品已被抢光 type=14: 代表去首页转到商品列表
                            getApp().globalData.jumpType = 3
                            // 埋点
                            this.buried.store_id = storeId;
                            this.buried.sku_id = skuId;
                            this.buried.orgcode = orgCode;
                            this.ClickOpenCollage();
                            // 通过首页跳转至拼团商品列表
                            wx.switchTab({
                                url: "/pages/home/home",
                                preObj: recommendObj
                            })
                        } else {
                            if (util.isLogin()) {
                                if (status === 1) { // 1: 可参团
                                    // 埋点
                                    this.buried.store_id = storeId;
                                    this.buried.sku_id = skuId;
                                    this.buried.orgcode = orgCode;
                                    this.buried.deliver_type = result.deliveryType;
                                    this.buried.group_type = groupMode;
                                    this.ClickOneKeyCollage();
                                    // 去参团
                                    wx.navigateTo({
                                      url:
                                        "../confirmOrder/index?groupCode=" +
                                        this.data.groupId +
                                        "&storeId=" +
                                        storeId +
                                        "&orgCode=" +
                                        orgCode +
                                        "&skuId=" +
                                        skuId +
                                        "&promotionId=" +
                                        promotionId +
                                        "&groupMode=" +
                                        groupMode,
                                      preObj: recommendObj,
                                      buried_position: "groupBuy-widgetEvent1",
                                    });
                                } else if (status === 4 || status === 5 || status == 24) { // 4: 已参与过此团 5：无参团资格
                                    // 埋点
                                    this.buried.store_id = storeId;
                                    this.buried.sku_id = skuId;
                                    this.buried.orgcode = orgCode;
                                    this.ClickOpenCollage();
                                    getApp().globalData.jumpType = 3
                                    // 通过首页跳转至拼团商品列表
                                    wx.switchTab({
                                        url: "/pages/home/home",
                                        preObj: recommendObj
                                    })
                                } else if (status === 7 || status === 22 || status == 21) { // 7：已参加该团，订单尚未支付;22拼团成功，点击查看商品到哪里啦；21拼团成功，请在48小时内凭自提码到店提货。
                                    if (result.groupMode == 1) {
                                        wx.navigateTo({
                                          url:
                                            "/pages/groupBuy/collection/myCollectionDetail/index?orderId=" +
                                            orderId,
                                          preObj: recommendObj,
                                          buried_position:
                                            "groupBuy-widgetEvent2",
                                        });
                                    } else {
                                        wx.navigateTo({
                                          url:
                                            "/pages/groupBuy/orderInfo/index?orderId=" +
                                            orderId,
                                          preObj: recommendObj,
                                          buried_position:
                                            "groupBuy-widgetEvent3",
                                        });
                                    }
                                } else if (status === 23) {
                                    self.onShareAppMessage(e)
                                } else {
                                    mp.dialog({
                                        content: result.failReson,
                                        showCancel: false
                                    }).then(res => {

                                    }).catch(err => {

                                    })
                                }
                            } else {

                                wx.navigateTo({
                                  url: `/pages/newLogin/login/login`,
                                  preObj: recommendObj,
                                  buried_position: "groupBuy-widgetEvent4",
                                });
                            }
                        }
                    }
                }).catch(err => {

                })
            }

        }
    },
    // 去首页
    goToHome() {
        let app = getApp(),
            data = this.data.data
        // 埋点
        this.buried.storeId = data.storeId || "";
        this.buried.sku_id = data.skuId || "";
        this.buried.orgcode = data.orgCode || "";
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "goHomeForCoupon",
            click_par: {
                storeId: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        // 经首页到门店主页
        if (data.storeId && data.orgCode) {
            app.globalData.jumpType = "p20"
            app.globalData.jumpParams = {
                storeId: data.storeId,
                orgCode: data.orgCode
            }
        }
        wx.switchTab({
            url: "/pages/home/home",
            preObj: recommendObj
        })

    },
    // 微信地理位置授权
    getLocationByWX() {
        let _this = this
        wx.getLocation({
            success: function (res) {
                _this.getAddress(res).then((res) => {
                    var poi = res.title
                    if (!poi) {
                        poi = res.address
                    }
                    var addressInfo = {
                        longitude: res.longitude,
                        latitude: res.latitude,
                        cityId: res.cityId,
                        cityName: res.cityName,
                        countyName: res.countyName,
                        poi: poi,
                        adcode: res.adcode || ""
                    }
                    app.globalData.addressInfo = addressInfo
                    _this.setData({
                        addressInfo: addressInfo
                    })
                    _this.groupJoin()
                })

            },
            fail: function (res) {
                _this.groupJoin()
            }
        })
    },
    // 获取地理位置
    getAddress(location) {
        return new Promise((resolve, reject) => {
            getDaoJiaLocation({
                longitude: location.longitude,
                latitude: location.latitude
            }, function (res) {
                if (res) {
                    resolve(res)
                } else {
                    wx.showToast({
                        title: '获取地址失败，请稍后再试！',
                        icon: "none"
                    })
                }
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
            //     }
            // }).then((res) => {
            //     if (res && res.data) {
            //         if (res.data.code == "0" && res.data.result) {
            //             resolve(res.data.result)
            //         } else {
            //             wx.showToast({
            //                 title: res.data.msg,
            //                 icon: "none"
            //             })
            //         }
            //     } else {
            //         wx.showToast({
            //             title: res.data.msg,
            //             icon: "none"
            //         })
            //     }
            // }).catch((err) => { })
        })
    },
    // 推荐商品事件
    recommendEvent(e) {
        let type = e.detail.type,
            data = e.detail.data;
        // 埋点
        this.buried.store_id = data.storeId || "";
        this.buried.sku_id = data.skuId || "";
        this.buried.orgcode = data.orgCode || "";
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "click_sku",
            click_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        if (type == "toGroupBuyDetail") {
            wx.navigateTo({
              url:
                "/pages/groupBuy/groupBuyDetail/index?orgCode=" +
                data.orgCode +
                "&promotionId=" +
                data.promotionId +
                "&skuId=" +
                data.skuId +
                "&storeId=" +
                data.storeId,
              preObj: recommendObj,
              buried_position: "groupBuy-widgetEvent5",
            });
        }
    },
    // 点击商品事件
    goodsComponentEvent(e) {
        let type = e.detail.type,
            data = e.detail.data
        let recommendObj = this.data.recommendObj || {};
        if (type == "goGoodDetail") {
            wx.navigateTo({
              url:
                "/pages/groupBuy/goodDetail/index?orgCode=" +
                data.orgCode +
                "&promotionId=" +
                data.promotionId +
                "&skuId=" +
                data.skuId +
                "&storeId=" +
                data.storeId,
              preObj: recommendObj,
              buried_position: "groupBuy-widgetEvent6",
            });
        }
    },
    // 拼团分享
    onShareAppMessage(res) {
        let data = this.data.data
        let groupId = data.groupId
        let skuName = data.skuName
        let basicPrice = data.basicPrice
        let actPrice = data.actPrice
        let shareTitle = "快！" + actPrice + "元拼【原价" + basicPrice + "元】" + skuName
        //【1.0元拼（原价12元）】中国京欣大西瓜
        return {
            title: shareTitle,
            path: "/pages/groupBuy/join/index?groupId=" + groupId + "&channel=2",
            imageUrl: this.data.data.shareImgUrl
        }
    },
    // 点击朋友圈分享
    share2Moments(e) {
        let data = this.data.data;
        // 请求生成朋友圈图片接口
        mp.loading_cover();
        let params = {
          groupId: this.data.groupId,
          channel: "1",
          storeId: data.storeId,
          orgCode: data.orgCode,
          skuId: data.skuId,
          preObj: this.data.recommendObj || {},
        };
        this.setData({
            savePicDialogReportData: {
                create_time: new Date(),
                click_id: "ClickSavePicture",
                click_par: {
                    origin: data.leader,
                }
            }
        })
        getGroupShareImg(params).then(res => {
            if (res.data.code == 0 && res.data.result) {
                this.setData({
                    showShare2WxDialog: false,
                    showShare2MomentsDialog: true,
                    momentsShareImgSrc: res.data.result,
                });
            } else {
                this.hintRequestShareMomentsPicFailed();
            }
        }).catch(err => {
            let msg = (err && err.data) ? err.data.msg : "今日分享朋友圈机会已用完，请直接分享好友";
            this.hintRequestShareMomentsPicFailed(msg);
        })
    },
    //获取分享朋友圈图片失败提示
    hintRequestShareMomentsPicFailed(msg) {
        this.setData({
            showShare2WxDialog: false,
        });
        mp.toast({
            title: msg || "获取到分享朋友圈图片失败,稍后重试",
        });
    }
})
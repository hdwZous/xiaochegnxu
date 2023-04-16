import {
    getDetailInfo,
    startGroup
} from "../resultAndFuel/index.js";
import {  pvBuriedV2_ , clickBuriedV2_ } from "../../../../common/util/BI";
import paytools from '../../../../common/util/PayTools';
import mp from '../../../../common/util/wxapi'
// 埋点描述文件
import { mpCmsJump } from "../../../../common/util/agreementV2";
let app = getApp();
Page({
    // 埋点上报数据
    buried: {
        is_default: "",
        missing_reason: "",
        type: "",
        store_id: "",
        sku_id: "",
        orgcode: "",
        status: "",
        missing_reason: "",
        
        
        
    },
    /**
     * 页面的初始数据
     */
    data: {
        // 推荐的拼团列表
        recommendInfoList: [],
        // 拼团详情信息
        groupInfoVO: {},
        promotionId: "",
        groupId: "",
        btnType: "",
        // 剩余时间
        groupRemainTime: 0,
        showImg: false,
        showPage: true,
        shareImgUrl: "",
        // 列表-类型
        type: 0,
        // 列表-提示
        tips: '',
        // 列表-按钮
        btnText: '',
        // 列表-默认图
        src: '',
        showRuleDialog: false,
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
        this.setData({
            promotionId: options.promotionId || "",
            groupId: options.groupId || "",
            storeId: options.storeId || ""
        })
        this.getInfo(this.data.groupId)
        
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () { },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    // 获取详情数据
    getInfo(groupId) {
        let params = {
            promotionId: this.data.promotionId || '',
            groupId: groupId,
            storeId: this.data.storeId
        }
        if (this.data.newGroupTimeEnd) {
            this.setData({
                newGroupId: ""
            })
        }
        getDetailInfo(params).then(res => {
            let is_default = false
            if (res.data.code == 0) {
                if (res.data.result) {
                    let result = res.data.result
                    this.setData({
                        recommendInfoList: result.recommendInfo || "",
                        groupInfoVO: result.groupInfoVO,
                        groupRemainTime: result.groupInfoVO.groupRemainTime || "",
                        shareImgUrl: result.groupInfoVO.shareImgUrl,
                        showImg: true
                    })
                    let buttonId = this.data.groupInfoVO.buttonId
                    if (buttonId == 1 || buttonId == 6 || buttonId == 7 || buttonId == 9) { //立即使用-去开新团
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
                    } else if (buttonId == 4) { //一键参团
                        this.setData({
                            btnType: "formId"
                        })
                    } else if (buttonId == 10) {
                        this.setData({
                            couponType: 2
                        })
                    }
                } else {
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
                }
            } else {
                this.setData({
                    type: 2,
                    // 列表-提示
                    tips: '当前区域暂无拼团商品，我们正在努力开拓中',
                    // 列表-按钮
                    btnText: '我的列表',
                    // 列表-默认图
                    src: 'https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png',
                    showPage: false
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
            click_id: "ClickOpenNewCollage",
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
                  buried_position: "groupBuy-oldInviteNew-result1",
                });
            } else if (data.buttonId == 2 || data.buttonId == 4 || data.buttonId == 5 || data.buttonId == 8) { //重新开团-一键参团-唤起微信支付
                if (data.buttonId == 4) {
                    // 埋点
                    this.buried.store_id = data.storeId;
                    this.buried.sku_id = data.skuId;
                    this.buried.orgcode = data.orgCode;
                    this.clickJoinCollage()
                } else {
                    // 埋点
                    this.buried.store_id = data.storeId;
                    this.buried.sku_id = data.skuId;
                    this.buried.orgcode = data.orgCode;
                    this.buried.status = data.buttonId == 2 ? "2" : "1";
                    this.clickOpenCollageAgain();
                } //一键参团
                this.reStartGroup(e)
            } else if (data.buttonId == 6 || data.buttonId == 7 || data.buttonId == 9) { //去开新团-进入列表
                // 埋点
                this.buried.store_id = data.storeId;
                this.buried.sku_id = data.skuId;
                this.buried.orgcode = data.orgCode;
                this.buried.type = data.title;
                this.clickOpenNewCollage();
                wx.navigateTo({
                  url: "/pages/groupBuy/groupList/index",
                  preObj: recommendObj,
                  buried_position: "groupBuy-oldInviteNew-result1",
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
                if (this.data.newGroupId) {
                    this.setData({
                        newGroupTimeEnd: true
                    })
                    this.getInfo(this.data.newGroupId)
                } else {
                    this.getInfo(this.data.groupId)
                }
            }
        }
    },
    onDefaultBtnEvent(e) {
        let type = e.detail.type;
        let recommendObj = this.data.recommendObj || {};
        if (type == 2) {
            this.buried.missing_reason = this.data.missing_reason;
            this.clickChangeAddress();
            if (this.data.from == "order") {
                wx.navigateBack()
            } else {
                wx.redirectTo({
                  url: "/pages/groupBuy/groupOrder/index",
                  preObj: recommendObj,
                  buried_position: "groupBuy-confirmOrder-result",
                });
            }
        } else if (type == 3) {
            this.buried.type = this.data.couponType;
            this.toHome();
            this.dailogClick()
        }
    },
    // 提单支付-重新开团
    reStartGroup(e) {
        mp.loading_cover()
        let promotionId = this.data.promotionId || '',
            data = e.detail.data,
            storeId = this.data.groupInfoVO.storeId,
            self = this;
        startGroup({
            promotionId: promotionId || '',
            storeId: storeId,
            formId: data.event.detail.formId,
            groupId: this.data.newGroupId || "" //防止产生多余无效订单
        }).then(result => {
            if (result.data.code == 0) {
                let res = result.data.result
                if (res) {
                    let newGroupId = res.groupId
                    if (!this.data.newGroupId) {
                        newGroupId = res.groupId
                        this.setData({
                            newGroupId
                        })
                    }
                    paytools.requestPay(res, function (res) {
                        self.getInfo(self.data.newGroupId)
                    }, function (res) {

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
          buried_position: "groupBuy-oldInviteNew-result2",
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
          buried_position: "groupBuy-oldInviteNew-result2",
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
            this.clickGoCollage();
            wx.navigateTo({
              url: "/pages/groupBuy/groupList/index",
              preObj: recommendObj,
              buried_position: "groupBuy-oldInviteNew-result3",
            });
        } else if (dailogType == "home") {
            this.buried.type = this.data.couponType;
            this.toHome()
            wx.switchTab({
                url: '/pages/home/home',
                preObj: recommendObj
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        let data = this.data.groupInfoVO;
        let promotionId = this.data.promotionId || '';
        let groupId = this.data.newGroupId || this.data.groupId;
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
        return {
            title: shareTitle,
            path: `/pages/groupBuy/oldInviteNew/fuel/index?promotionId=${promotionId}&groupId=${groupId}&storeId=${storeId}`,
            imageUrl: this.data.shareImgUrl
        }
    }
})

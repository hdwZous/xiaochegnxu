import {
    FNIDS,
    request
} from "../../../../common/util/api";
import {
    isLogin
} from '../../../../common/util/loginUtil';
import paytools from '../../../../common/util/PayTools';
import mp from '../../../../common/util/wxapi'
import {  pvBuriedV2_ , clickBuriedV2_ } from "../../../../common/util/BI";

import {
    startGroup
} from "../resultAndFuel/index.js"
// 埋点描述文件
import { mpCmsJump } from "../../../../common/util/agreementV2";
Page({
    // 埋点上报数据
    buried: {
        userAction: "",
        is_default: "",
        source: "",
        type: "",
        store_id: "",
        sku_id: "",
        orgcode: "",
        
        
        
    },
    /**
     * 页面的初始数据
     */
    data: {
        // 拼团列表传递参数
        storeId: "",
        promotionId: "",
        // 拼团详情
        groupDetailData: {},
        // 是否显示页面
        showPage: true,
        // 是否登录
        isLogin: false,
        // 商品图片
        goodImg: [],
        // 地址
        addressInfo: {},
        disabled: false,
        failStatusDesc: "",
        // 列表-类型
        type: '',
        // 列表-提示
        tips: '',
        // 列表-按钮
        btnText: '',
        // 列表-默认图
        src: 'https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png',
        showRuleDialog: false,
        dialogTxt: "",
        useClose: false,
        dialogBtn: "去首页逛逛",
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
        this.setData({
            storeId: options.storeId || "",
            promotionId: options.promotionId || "",
            source: options.source || ""
        })
        
        
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
        // 请求详情数据
        this.reqGroupDetailData();
        // 判断是否登录
        if (isLogin()) {
            this.setData({
                isLogin: true
            })
        }
    },
    /**
     * 请求拼团详情数据
     */
    reqGroupDetailData: function () {
        mp.loading()
        request({
          ...FNIDS.queryGroupSkuPage,
          body: {
            promotionId: this.data.promotionId || "",
            storeId: this.data.storeId,
          },
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            let is_default = false,
              couponType = 1;
            if (res.data.result) {
              let result = res.data.result;
              if (result.status !== 1) {
                let failStatusDesc;
                if (result.status == 2) {
                  failStatusDesc = "活动结束";
                } else if (result.status == 3) {
                  failStatusDesc = "已售罄";
                } else if (result.status == 4) {
                  couponType = 2;
                  failStatusDesc = "券已抢光";
                }
                this.setData({
                  disabled: true,
                  failStatusDesc: failStatusDesc,
                });
              }
              this.setData({
                groupDetailData: result,
                remainTime: result.remainTime,
              });
            } else {
              is_default = true;
              this.setData({
                // 列表-类型
                type: 2,
                // 列表-提示
                tips: "暂未获取到商品信息，稍后重试~",
                // 列表-按钮
                btnText: "去首页逛逛",
                // 列表-默认图
                src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png",
                showPage: false,
              });
            }
            this.buried.is_default = is_default ? "yes" : "no";
            this.buried.source = this.data.source;
            this.buried.type = couponType;
          })
          .catch((err) => {
            wx.hideLoading();
          });
    },

    // 埋点回调方法
    // pv() {
    //
    // },
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
            create_time: new Date(),
            page_par: {
                userAction: this.buried.userAction || "",
                is_default: this.buried.is_default || "",
                source: this.buried.source || "",
                type: this.buried.type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
            isBack: back || "",
        });
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
        let data = this.data.groupInData;
        return {
            title: this.data.groupDetailData.skuName || '',
            imageUrl: this.data.groupDetailData.skuImgUrl || '',
            path: '/pages/groupBuy/oldInviteNew/detail/index?promotionId=' + data.promotionId +
                '&storeId=' + data.storeId
        }
    },
    /**一键开团 */
    startGroup: function (e) {
        if (!isLogin()) {
            let recommendObj = this.data.recommendObj || {};
            wx.navigateTo({
              url: `/pages/newLogin/login/login`,
              preObj: recommendObj,
              buried_position: "groupBuy-oldInviteNew6",
            });
        } else {
            let groupDetailData = this.data.groupDetailData;
            // 埋点
            this.buried.store_id = groupDetailData.storeId;
            this.buried.sku_id = groupDetailData.skuId;
            this.buried.orgcode = groupDetailData.orgCode;
            let recommendObj = this.data.recommendObj || {};
            clickBuriedV2_({
                click_id: "ClickOneKeyOpenCollage",
                click_par: {
                    store_id: this.buried.store_id || "",
                    sku_id: this.buried.sku_id || "",
                    orgcode: this.buried.orgcode || "",
                },
                currentPageName: recommendObj.currentPageName || "",
                prePageName: recommendObj.prePageName || "",
                pageId: recommendObj.pageIdFirstPage || "",
            });
            mp.loading_cover()
            startGroup({
                promotionId: groupDetailData.promotionId,
                storeId: groupDetailData.storeId,
                groupId: this.data.groupId || "",
                formId: e.detail.formId
            }).then(res => {
                if (res.data.code == 0) {
                    let result = res.data.result
                    if (result) {
                        let groupId
                        if (this.data.groupId) {
                            groupId = this.data.groupId || ""
                        } else {
                            groupId = result.groupId
                            this.setData({
                                groupId: groupId
                            })
                        }
                        paytools.requestPay(result, function (res) {
                            wx.redirectTo({
                              url: `/pages/groupBuy/oldInviteNew/result/index?promotionId=${groupDetailData.promotionId}&groupId=${groupId}&storeId=${groupDetailData.storeId}`,
                              preObj: recommendObj,
                              buried_position: "groupBuy-oldInviteNew-detail",
                            });
                        })
                    }
                } else {
                    if (res.data.code == "60001") {
                        this.setData({
                            showRuleDialog: true,
                            dialogTxt: res.data.msg,
                            dialogBtn: "知道了",
                            dailogType: "groupList"
                        })
                    } else {
                        this.setData({
                            showRuleDialog: true,
                            dialogTxt: res.data.msg,
                            dailogType: "home"
                        })
                    }
                }
            })
        }

    },
    // 原价购买
    basicPriceBuy() {
        let storInfo = this.data.groupDetailData
        // 埋点
        this.buried.store_id = storInfo.storeId;
        this.buried.sku_id = storInfo.skuId;
        this.buried.orgcode = storInfo.orgCode;
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickBuyOriginPrice",
            click_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        if (storInfo.storeId && storInfo.orgCode && storInfo.skuId) {
            let pageType = "p20",
                params = {
                    storeId: storInfo.storeId,
                    orgCode: storInfo.orgCode,
                    skuId: storInfo.skuId,
                    isAddCart: true,
                    showCart: true,
                };
            mpCmsJump({
              pageType,
              params,
              preObj: recommendObj,
              buried_position: "groupBuy-oldInviteNew-detail",
            });
        }
    },
    // 默认页按钮点击文案
    onDefaultBtnEvent(e) {
        let recommendObj = this.data.recommendObj || {};
        let type = e.detail.type;
        if (type == 2) {
            // this.reqGroupDetailData()
            wx.switchTab({
                url: "/pages/home/home",
                preObj: recommendObj
            })
        }
    },
    // 去首页
    dailogClick() {
        let dailogType = this.data.dailogType
        if (dailogType == "groupList") {
            this.toGroupList()

        } else if (dailogType == "home") {
            this.toHome()
        }
    },

    toGroupList() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickGoCollage",
            click_par: {},
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        wx.navigateBack()
    },

    toHome() {
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "to_home",
            click_par: {},
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        wx.switchTab({
            url: '/pages/home/home',
            preObj: recommendObj
        })
    },
    componentEvent(e) {
        let type = e.detail.type;
        if (type == "timeEnd") {
            if (this.data.remainTime > 0) {
                this.reqGroupDetailData()
            }
        }
    }
})

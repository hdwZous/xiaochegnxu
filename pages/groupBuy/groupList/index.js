import {
    FNIDS,
    request
} from "../../../common/util/api"
import { pvBuriedV2_ , clickBuriedV2_ } from "../../../common/util/BI";
import {
    isLogin
} from "../../../common/util/loginUtil"
let app = getApp()
Page({
    // 埋点数据
    buried: {
        userAction: "",
        list: "",
        is_default: "",
        type: "",
        deliver_type: "",
        group_type: "",
        store_id: "",
        sku_id: "",
        orgcode: "",
        list: "",
        
        
        
    },

    /**
     * 页面的初始数据
     */
    data: {
        // 地址信息
        addressInfo: {},
        // 拼团数据
        groupBuyList: [],
        // 老带新团
        oldInviteNewList: [],
        // tab类型 0：老带新团 1：超值拼团
        tabActive: 0,
        // 规则弹层
        showRuleDialog: false,
        // 列表-是否展示
        isShowEmpty: true,
        // 列表-类型
        type: 0,
        // 列表-提示
        tips: "",
        // 列表-按钮
        btnText: "",
        // 列表-默认图
        src: "",
        // 是否展示tab
        showTab: true,
        // 显示团长代收
        collectionShowRuleDialog: false,
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // 地址信息
        let addressInfo = {}
        try {
            addressInfo = wx.getStorageSync("address_info")
        } catch (e) {

        }
        this.setData({
            addressInfo: addressInfo || app.globalData.addressInfo || {}
        })
        // 获取老带新团列表
        if (this.data.tabActive === 0) {
            this.getOldInviteNewList()
        } else if (this.data.tabActive === 1) {
            this.getGroupBuyList()
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    // 监听埋点
    onLog(e) {
        let data = e.detail;
        console.log(data)
        this.buried.deliver_type = data.deliver_type;
        this.buried.group_type = data.group_type;
        this.buried.store_id = data.store_id;
        this.buried.orgcode = data.orgcode;
        this.buried.sku_id = data.sku_id;
        this.buried.list = data.list;
        //埋点
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickToCollage",
            click_par: {
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
                store_id: this.buried.store_id || "",
                orgcode: this.buried.orgcode || "",
                sku_id: this.buried.sku_id || "",
                list: this.buried.list || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    },

    // 监听埋点
    onLogBanner(e) {
        let data = e.detail;
        this.buried.orgcode = data.orgcode;
        this.buried.store_id = data.store_id;
        this.buried.sku_id = data.sku_id;
        //埋点
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "bannerClick",
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

    /**
     * 监听默认页点击按钮事件
     */
    onDefaultBtnEvent(e) {
        let type = e.detail.type
        let tabActive = this.data.tabActive;
        let { recommendObj = {} } = this.data;
        if (type === 1) {
            if (tabActive === 0) {
                this.getOldInviteNewList()
            } else if (tabActive === 1) {
                this.getGroupBuyList()
            }
        } else if (type == 4) {
            wx.navigateTo({
              url: "/pages/address/home/index?from=group",
              preObj: recommendObj,
              buried_position: "groupBuy-groupList1",
            });
        }
    },

    /**
     * 去订单列表
     */
    goToOrder() {
        let { recommendObj = {} } = this.data;
        if (isLogin()) {
            wx.navigateTo({
              url: "/pages/groupBuy/groupOrder/index?tabIndex=1",
              preObj: recommendObj,
              buried_position: "groupBuy-groupList2",
            });
        } else {

            wx.navigateTo({
              url: `/pages/newLogin/login/login`,
              preObj: recommendObj,
              buried_position: "groupBuy-groupList3",
            });
        }
    },

    /**
     * 弹出弹层
     */
    openRulesPop() {
        //埋点
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "click_rule",
            click_par: {},
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        this.setData({
            showRuleDialog: true
        })
    },

    /**
     * 点击tab切换
     */
    clickTab(e) {
        let index = Number(e.currentTarget.dataset.index)
        let recommendObj = this.data.recommendObj || {};
        if (index !== this.data.tabActive) {
            if (index === 0) {
                // 埋点
                this.buried.type = "old&new"
                clickBuriedV2_({
                    click_id: "ClickCollageTab",
                    click_par: {
                        type: "old&new",
                    },
                    currentPageName: recommendObj.currentPageName || "",
                    prePageName: recommendObj.prePageName || "",
                    pageId: recommendObj.pageIdFirstPage || "",
                });
                // 获取老带新团列表
                this.getOldInviteNewList()
            } else if (index === 1) {
                // 埋点
                this.buried.type = "value"
                clickBuriedV2_({
                    click_id: "ClickCollageTab",
                    click_par: {
                        type: "value",
                    },
                    currentPageName: recommendObj.currentPageName || "",
                    prePageName: recommendObj.prePageName || "",
                    pageId: recommendObj.pageIdFirstPage || "",
                });
                // 获取拼团列表
                this.getGroupBuyList()
            }
            this.setData({
                tabActive: index
            })
            if (wx.pageScrollTo) {
                wx.pageScrollTo({
                    scrollTop: 0
                })
            }
        }
    },

    /**
     * 请求拼团列表数据
     */
    getGroupBuyList() {
        request({
          ...FNIDS.groupList,
          body: {
            lgt: this.data.addressInfo.longitude,
            lat: this.data.addressInfo.latitude,
            cityId: this.data.addressInfo.cityId,
          },
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            let result = res.data.result || [],
              is_default = false;
            if (result && result.length > 0) {
              this.setData({
                groupBuyList: res.data.result,
                isShowEmpty: false,
              });
            } else {
              is_default = true;
              this.setData({
                // 列表-是否展示
                isShowEmpty: true,
                // 列表-类型
                type: 4,
                // 列表-提示
                tips: "当前区域暂无拼团商品，我们正在努力开拓中",
                // 列表-按钮
                btnText: "切换地址",
                // 列表-默认图
                src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png",
              });
            }
            this.buried.list = "value";
            this.buried.is_default = is_default ? "yes" : "no";
          })
          .catch((err) => {
            this.setData({
              // 列表-是否展示
              isShowEmpty: true,
              // 列表-类型
              type: 1,
              // 列表-提示
              tips: err.data.msg || "服务异常",
              // 列表-按钮
              btnText: "重新加载",
              // 列表-默认图
              src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png",
            });
          });
    },

    // 埋点
    // pv() {
    //
    // },
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
            create_time: new Date(),
            page_par: {
                userAction: this.buried.userAction || "",
                list: this.buried.list || "",
                is_default: this.buried.is_default || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
            isBack: back || "",
        });
    },
    /**
     * 请求老带新团列表数据
     */
    getOldInviteNewList() {
        request({
          ...FNIDS.ordInviteNewList,
          body: {
            longitude: this.data.addressInfo.longitude,
            latitude: this.data.addressInfo.latitude,
            cityId: this.data.addressInfo.cityId,
          },
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            let result = res.data.result,
              is_default = false;
            if (result && result.length > 0) {
              this.setData({
                isShowEmpty: false,
                oldInviteNewList: result,
                showTab: true,
              });
              this.buried.list = "value";
              this.buried.is_default = is_default ? "yes" : "no";
            } else {
              is_default = true;
              this.setData({
                showTab: false,
                tabActive: 1,
              });
              this.getGroupBuyList();
            }
          })
          .catch((err) => {
            // console.error("===请求失败===")
            this.setData({
              // 列表-是否展示
              isShowEmpty: true,
              // 列表-类型
              type: 1,
              // 列表-提示
              tips: err.data.msg || "服务异常",
              // 列表-按钮
              btnText: "重新加载",
              // 列表-默认图
              src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png",
            });
          });
    },
    // 团长代收规则弹层
    openCollectionRulesPop() {
        this.setData({
            collectionShowRuleDialog: true
        })
    }
})

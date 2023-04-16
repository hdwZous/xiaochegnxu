import {
    FNIDS,
    request
} from "../../../common/util/api"
import util from "../../../common/util/util"
var self = null
import {
    isLogin
} from "../../../common/util/loginUtil"
import {  pvBuriedV2_ , clickBuriedV2_ } from "../../../common/util/BI"
import mp from "../../../common/util/wxapi"

var app = getApp()
Page({
    buried: {
        userAction: {},
        toast: "",
        org_code: "",
        sku_id: "",
        deliver_type: "",
        group_type: "",
        store_id: "",
        storeId: "",
        orgcode: "",
        group_type: "",
        
        
        
    },

    /**
     * 页面的初始数据
     */
    data: {
        // 活动倒计时
        actTime: {
            day: "",
            hour: "",
            minute: "",
            second: "",
            timeEnd: false,
            timer: null,
            type: 0,
            tips: "",
            btnText: "",
            src: "",
        },
        // 推荐团活动倒计时
        leftTime: {
            day: "",
            hour: "",
            minute: "",
            second: "",
            timeEnd: false,
            timer: null
        },
        // 拼团列表传递参数
        groupInData: {},
        // 拼团详情
        groupDetailData: {},
        // 推荐团信息
        recommendGroupInfo: {},
        // 是否能开团
        canOpenGroup: false,
        // 微信授权信息
        wxInfo: {},
        // 登录数据
        wxUserInfo: {},
        wxLoginCode: "",
        returnPage: "",
        pageType: "",
        jdlogin: 0,
        // 一键开团验证请求次数
        startFirst: true,
        // 默认显示第一张商品图
        currentIndex: 0,
        // 是否登录
        isLogin: false,
        // 是否是iphoneX
        isIphoneX: false,
        // 默认页数据
        showEmpty: true,
        type: 0,
        tips: "",
        btnText: "",
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this;
        if (options) {
            self.setData({
                groupInData: {
                    orgCode: options.orgCode,
                    skuId: options.skuId,
                    storeId: options.storeId,
                    promotionId: options.promotionId || ""
                }
            })
        }

        
        

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
        mp.getLoginCode().then(code => {
            self.setData({
                wxLoginCode: code
            })
        }).catch(err => {

        })
        self.reqGroupDetailData()
        // 清除倒计时
        if (self.data.actTime.timer) {
            clearInterval(self.data.actTime.timer)
        }
        if (self.data.leftTime.timer) {
            clearInterval(self.data.leftTime.timer)
        }
        // 判断是否登录
        if (isLogin()) {
            this.setData({
                isLogin: true
            })
        }
        //
        this.setData({
            isIphoneX: app.globalData.isIpx
        })
    },
    /**
     * 请求拼团详情数据
     */
    reqGroupDetailData: function () {
        wx.showLoading({
            title: "加载中...",
        });
        // 地址信息
        let addressInfo = {};
        try {
            addressInfo = wx.getStorageSync("address_info")
        } catch (e) {
            //ignore
        }
        request({
          ...FNIDS.groupDetail,
          isNeedDealError: true,
          body: {
            promotionId: self.data.groupInData.promotionId || "",
            storeId: self.data.groupInData.storeId || "",
            orgCode: self.data.groupInData.orgCode || "",
            skuId: self.data.groupInData.skuId || "",
            lgt: addressInfo.longitude || "",
            lat: addressInfo.latitude || "",
          },
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            wx.hideLoading();
            if (res.data.code == "0" && res.data.result) {
              var result = res.data.result;
              var canOpenGroup = false;
              var showEmpty = true;
              if (result.status == "1") {
                canOpenGroup = true;
                showEmpty = false;
              } else if (result.status == "2") {
                showEmpty = true;
                wx.showModal({
                  title: "提示",
                  content: result.failReason,
                  showCancel: false,
                  success: function (e) {
                    wx.navigateBack({});
                  },
                });
              } else {
                showEmpty = false;
              }

              // 埋点
              this.buried.toast =
                result && result.failReason ? result.failReason : "";
              this.buried.org_code = self.data.groupInData.orgCode;
              this.buried.sku_id = self.data.groupInData.skuId;
              this.buried.store_id = self.data.groupInData.storeId;
              this.buried.deliver_type = result.deliveryType;
              this.buried.group_type = result.groupMode;

              // 更新数据
              self.setData({
                groupDetailData: result,
                canOpenGroup: canOpenGroup,
                showEmpty: showEmpty,
              });
              self.countDown(result.remainTime);
              if (result.recommendInfo) {
                self.setData({
                  recommendGroupInfo: result.recommendInfo,
                });
                self.leftCountDown(result.recommendInfo.remainTime);
              }
            } else {
              if (res.data.code == 5) {
                this.setData({
                  showEmpty: true,
                  type: 3,
                  tips: res.data.msg,
                  btnText: "去首页",
                });
              } else {
                this.setData({
                  showEmpty: true,
                  type: 3,
                  tips: res.data.msg,
                  btnText: "",
                });
              }
            }
          })
          .catch((err) => {
            wx.hideLoading();
            let msg = err && err.data ? err.data.msg : "网络异常";
            this.setData({
              showEmpty: true,
              type: 1,
              tips: msg,
              btnText: "",
            });
          });
    },

    // pv埋点上报
    // pv() {
    //
    // },
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
            create_time: new Date(),
            page_par: {
                userAction: this.buried.userAction || "",
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
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
        let data = this.data.groupInData
        return {
            title: this.data.groupDetailData.skuName || "",
            imageUrl: this.data.groupDetailData.skuImgUrl || "",
            path: "/pages/groupBuy/groupBuyDetail/index?promotionId=" + data.promotionId +
                "&storeId=" + data.storeId +
                "&orgCode=" + data.orgCode +
                "&skuId=" + data.skuId
        }
    },
    // 点击默认按钮
    onDefaultBtnEvent(e) {
        let type = e.detail.type
        if (type == 3) {
            wx.navigateBack()
        }
    },
    // 活动倒计时
    countDown(time) {
        //时间  回调方法  当前实例
        if (time < 0) {
            self.setData({
                actTime: {
                    timeEnd: true
                }
            })
        }
        util.countDownList(time, self.timeCallback, self, "actTime")
    },
    // 推荐团倒计时
    leftCountDown(time) {
        if (time < 0) {
            self.setData({
                leftTime: {
                    timeEnd: true
                }
            })
        }
        util.countDownList(time, self.timeCallback, self, "leftTime")

    },
    // 时间回调函数
    timeCallback(timeObj, self, index) {
        if (timeObj.hour == "00" && timeObj.minute == "00" && timeObj.second == "00") {
            var timeEndIndex = index + ".timeEnd"
            self.setData({
                [timeEndIndex]: true,
            })
        }
        if (!timeObj.isOver) {
            var hourIndex = index + ".hour",
                minuteIndex = index + ".minute",
                secondIndex = index + ".second",
                dayIndex = index + ".day",
                timer = index + ".timer"
            self.setData({
                [dayIndex]: timeObj.day,
                [hourIndex]: timeObj.hour,
                [minuteIndex]: timeObj.minute,
                [secondIndex]: timeObj.second,
                [timer]: timeObj.timer
            })
        } else {

        }
    },
    /**一键开团 */
    startGroup(e) {
        this.buried.store_id = self.data.groupInData.storeId;
        this.buried.sku_id = self.data.groupInData.skuId;
        this.buried.orgcode = self.data.groupInData.orgCode;
        //埋点
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickOneKeyOpenCollage",
            click_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        if (self.data.canOpenGroup && !self.data.actTime.timeEnd) {
            var groupDetailData = self.data.groupDetailData;
            var url = "/pages/groupBuy/confirmOrder/index?storeId=" + groupDetailData.storeId +
                "&orgCode=" + groupDetailData.orgCode +
                "&skuId=" + groupDetailData.skuId +
                "&promotionId=" + groupDetailData.promotionId +
                "&groupMode=" + groupDetailData.groupMode;
            if (isLogin()) {
                self.setData({
                    startFirst: true
                })
                // 跳转到确认订单页
                wx.navigateTo({
                  url: url,
                  preObj: recommendObj,
                  buried_position: "groupBuy-groupBuyDetail1",
                });
            } else {
                wx.navigateTo({
                  url: `/pages/newLogin/login/login`,
                  preObj: recommendObj,
                  buried_position: "groupBuy-groupBuyDetail2",
                  success() {
                    self.setData({
                      startFirst: true,
                    });
                  },
                });
            }
        }
    },
    /**点击按钮回去微信用户信息 */
    getwxInfo: function (e) {
        var detail = e.detail
        if (detail && detail.userInfo && self.data.startFirst) {
            self.setData({
                wxUserInfo: detail,
                startFirst: false
            })
            wx.setStorage({
                key: "wxUserInfo",
                data: detail.userInfo || "",
            })
            self.startGroup()
        }
    },
    /**
     * 去参团
     */
    goGroup() {
        var groupId = self.data.recommendGroupInfo.groupId;
        this.buried.store_id = self.data.groupInData.storeId;
        this.buried.sku_id = self.data.groupInData.skuId;
        this.buried.orgcode = self.data.groupInData.orgCode;
        //埋点
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "ClickAddCollage",
            click_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        if (self.data.leftTime.timeEnd) {
            return
        }
        wx.showLoading({
            title: "加载中...",
        })
        request({
          ...FNIDS.groupJoin,
          body: {
            groupId: groupId,
          },
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            wx.hideLoading();
            if (res.data.code == "0") {
              var result = res.data.result;
              if (result.status == "1") {
                // 跳转到参团页
                wx.navigateTo({
                  url: "/pages/groupBuy/join/index?groupId=" + groupId,
                  preObj: recommendObj,
                  buried_position: "groupBuy-groupBuyDetail3",
                });
              } else {
                wx.showModal({
                  title: "提示",
                  content: result.failReason,
                  showCancel: false,
                  success: (res) => {},
                });
              }
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: "none",
              });
            }
          })
          .catch(() => {});
    },
    /**
     * 去首页
     */
    goHome: function () {
        let recommendObj = this.data.recommendObj || {};
        wx.switchTab({
            url: "/pages/home/home",
            preObj: recommendObj
        })
    },
    // 轮播变换
    swiperChange: function (e) {
        self.setData({
            currentIndex: e.detail.current
        })
    },
    // 单独购买
    originalPriceBuy() {
        let data = this.data.groupDetailData;
        this.buried.store_id = data.storeId || "";
        this.buried.sku_id = data.skuId || "";
        this.buried.orgcode = data.orgCode || "";
        this.buried.deliver_type = data.deliveryType;
        this.buried.group_type = data.groupMode;
        //埋点
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "Click_singlebuy",
            click_par: {
                store_id: this.buried.store_id || "",
                sku_id: this.buried.sku_id || "",
                orgcode: this.buried.orgcode || "",
                deliver_type: this.buried.deliver_type || "",
                group_type: this.buried.group_type || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        // 经首页到门店主页
        if (data.storeId && data.orgCode) {
            app.globalData.jumpType = "p30"
            app.globalData.jumpParams = {
                storeId: data.storeId,
                orgCode: data.orgCode,
                skuId: data.skuId,
                isAddCart: true,
                showCart: true
            }
        }
        wx.switchTab({
            url: "/pages/home/home",
            preObj: recommendObj
        })
    }
})

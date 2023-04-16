
import util from '../../../../common/util/util';
import {
    requestSign
} from "../../../../common/util/PayTools";
import {  pvBuriedV2_ , clickBuriedV2_ } from "../../../../common/util/BI"
import mp from "../../../../common/util/wxapi";
let app = getApp()
const TYPE = {
    // 倒计时结束
    refresh: 'refresh',
    // 邀请好友
    shareApp: 'shareApp'
}
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: {
            type: Object,
            value: {}
        },
        recommendObj: {
          type: Object,
          value: {}
        }
    },
    // 在组件实例被从页面节点树移除时执行
    detached() {
        // 清楚倒计时
        this.clearInterval()
    },
    /**
     * 组件的初始数据
     */
    data: {
        item: {},
        countDownStr: '00:00:00',
        timer: null
    },
    attached() {
        let data = this.data.data || {};
        let time = data && data.remainTime;
        this.setData({
            item: data
        });
        if (time && time > 0) {
            this.showCountDown(time)
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 再团一个
        noceMore(e) {
            let recommendObj = this.data.recommendObj || {};
            wx.navigateTo({
              url: "/pages/groupBuy/groupList/index",
              preObj: recommendObj,
              buried_position: "groupBuy-valueOrder1",
            });
            let data = e.currentTarget.dataset;
            // 埋点上报
            let deliveryType = '',
                groupMode = '';
            if (data.deliveryType == 1) {
                deliveryType = '到店自提';
            } else if (data.deliveryType == 2) {
                deliveryType = '常规拼团';
            } else {
                deliveryType = '预售团';
            }
            if (data.groupMode == 0) {
                groupMode = '普通拼团';
            } else {
                groupMode = '团长代收'
            }
           
            
            clickBuriedV2_({
                click_id: "ClickInviteCollage",
                click_par: {
                    storeId: data.storeId || "",
                    skuId: data.skuId || "",
                    orgcode: data.orgCode || "",
                    deliver_type: deliveryType || "",
                    group_type: groupMode || "",
                },
                currentPageName: recommendObj.currentPageName || "",
                prePageName: recommendObj.prePageName || "",
                pageId: recommendObj.pageIdFirstPage || "",
            });
        },
        // 进入订单详情
        toOrderDetail(e) {
            let data = e.currentTarget.dataset;
            let orderId = data.orderId;
            let groupMode = data.groupMode
            let recommendObj = this.data.recommendObj || {};
            if (groupMode == 1) {
                // 团长代收
                wx.navigateTo({
                  url: `/pages/groupBuy/collection/myCollectionDetail/index?orderId=${orderId}`,
                  preObj: recommendObj,
                  buried_position: "groupBuy-valueOrder2",
                });
            } else {
                // 普通拼团
                wx.navigateTo({
                  url: `/pages/groupBuy/orderInfo/index?orderId=${orderId}`,
                  preObj: recommendObj,
                  buried_position: "groupBuy-valueOrder3",
                });
            }

        },
        // 进入门店
        enterStore(e) {
           
            let recommendObj = this.data.recommendObj || {};
            clickBuriedV2_({
                click_id: "ClickChangeCollageStore",
                click_par: {
                    "type": 2
                },
                currentPageName: recommendObj.currentPageName || "",
                prePageName: recommendObj.prePageName || "",
                pageId: recommendObj.pageIdFirstPage || "",
            });
            let data = e.currentTarget.dataset;
            let skuId = data.skuId || '';
            let storeId = data.storeId || '';
            let orgCode = data.orgCode || '';
            wx.navigateTo({
              url:
                "/pages/store/index?storeId=" +
                storeId +
                "&orgCode=" +
                orgCode +
                "&skuId=" +
                skuId +
                "&longitude=" +
                app.globalData.addressInfo.longitude +
                "&latitude=" +
                app.globalData.addressInfo.latitude,
              preObj: recommendObj,
              buried_position: "groupBuy-valueOrder4",
            });
        },
        // 超值享优惠订单去支付
        rePay(e) {
            let data = e.currentTarget.dataset;
            let orderId = data.orderId;
            let groupMode = data.groupMode;
            let groupCode = data.groupCode;
            let options = {
                orderId: orderId,
                groupMode: groupMode,
                groupCode: groupCode
            };
            let recommendObj = this.data.recommendObj || {};
            this.setData({
                options: options
            });
            // 唤起支付
            requestSign(options, function () {
                mp.toast({
                    title: "支付成功"
                });
                setTimeout(() => {
                    wx.navigateTo({
                      url: `/pages/groupBuy/join/index?groupId=${options.groupCode}`,
                      preObj: recommendObj,
                      buried_position: "groupBuy-valueOrder4",
                    });
                }, 2000);
            }, function (res) {
                mp.toast({
                    title: "支付失败"
                });
            });
            // 埋点上报
            let deliveryType = '';
            if (data.deliveryType == 1) {
                deliveryType = '到店自提';
            } else if (data.deliveryType == 2) {
                deliveryType = '常规拼团';
            } else {
                deliveryType = '预售团';
            }
            if (data.groupMode == 0) {
                groupMode = '普通拼团';
            } else {
                groupMode = '团长代收'
            }
            clickBuriedV2_({
                click_id: "to_pay",
                click_par: {
                    storeId: data.storeId || "",
                    skuId: data.skuId || "",
                    orgcode: data.orgCode || "",
                    deliver_type: deliveryType || "",
                    group_type: groupMode || "",
                },
                currentPageName: recommendObj.currentPageName || "",
                prePageName: recommendObj.prePageName || "",
                pageId: recommendObj.pageIdFirstPage || "",
            });
        },
        // 展示倒计时
        showCountDown(time) {
            let flag = true;
            if (time > 0) {
                util.newCountDown(time, res => {
                    if (res.end) {
                        this.setData({
                            countDownStr: '00:00:00'
                        });
                        this.clearInterval();
                        this.triggerEvent('pageEvent', {
                            type: TYPE.refresh,
                        })
                        return;
                    }
                    let countDownStr = '';
                    if (res.day) {
                        countDownStr = res.day + '天' + res.hour + ':' + res.minute + ':' + res.second
                    } else {
                        countDownStr = res.hour + ':' + res.minute + ':' + res.second
                    }
                    // 更新时间
                    this.setData({
                        countDownStr: countDownStr
                    });
                    if (flag) {
                        this.setData({
                            timer: res.timer
                        });
                        flag = false
                    }
                })
            } else {
                this.setData({
                    countDownStr: '00:00:00'
                })
            }
        },
        // 清除计时器
        clearInterval() {
            let timer = this.data.timer;
            if (timer !== null) {
                clearInterval(timer);
                this.setData({
                    timer: null
                })
            }
        },
        // 分享
        showShare(e) {
            let item = this.data.item;
            let data = {
                shareData: item,
                showShare2WxDialog: true,
            }
            this.triggerEvent('pageEvent', {
                type: TYPE.shareApp,
                data
            })
            let deliveryType = '',
                groupMode = '';
            if (item.deliveryType == 1) {
                deliveryType = '到店自提';
            } else if (item.deliveryType == 2) {
                deliveryType = '常规拼团';
            } else if (item.deliveryType == 3) {
                deliveryType = '预售团';
            }
            if (item.groupMode == 0) {
                groupMode = '普通拼团';
            } else if (item.groupMode == 1) {
                groupMode = '团长代收'
            }
           
            let recommendObj = this.data.recommendObj || {};
            clickBuriedV2_({
                click_id: "ClickInviteCollage",
                click_par: {
                    skuId: item.skuId || "" || "",
                    storeId: item.storeId || "",
                    orgcode: item.orgCode || "",
                    deliver_type: deliveryType || "",
                    group_type: groupMode || "",
                },
                currentPageName: recommendObj.currentPageName || "",
                prePageName: recommendObj.prePageName || "",
                pageId: recommendObj.pageIdFirstPage || "",
            });
        },
    }
})
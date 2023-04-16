import { djCmsJump } from '../../../../common/util/agreementV2'
import { getActivityCoupon, getActivityCouponProtocol, getShareCoupon } from '../../../../common/util/services'
import mp from '../../../../common/util/wxapi';
import util from '../../../../common/util/util';
import { clickBuriedV2_ } from '../../../../common/util/BI'
Component({
    options: {
        addGlobalClass: true
    },
    lazyObj: {
        selector: '.seckill_coupon',
        epSelector: '.seckill_coupon'
    },
    /**
     * 组件的属性列表
     */
    properties: {
        lists: {
            type: Object,
            value: {},
        },
        traceId: {
            type: String,
            value: ''
        },
        buriedObj: {
            type: Object,
            value: {}
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        clickItems(e) {
            let {item = {}, index = 0} = e.currentTarget.dataset
            if (item.couponShowType == 1) {
                this.clickCoupon(item, index)
            } else if (item.couponShowType == 3) {
                this.clickHelpCoupon(item, index)
            } 
        },
        // 点击优惠券(普通券和红包)
        clickCoupon(item, index) {
            if (util.isLogin()) {
                let { markState, activityCode = '', couponShowType, orgId = '' } = item;
                if (markState === 2) { // 普通券未领取
                    this.getCoupon(activityCode, couponShowType, orgId).then(res => {
                        // 更改券状态
                        let key = `lists[${index}].markState`;
                        this.setData({
                            [key]: 3
                        })
                    })
                } else if (markState === 3) { // 普通券去使用
                    this.jump({
                        activityCode: activityCode,
                        storeId: item.storeId || "",
                        markState: item.status || "",
                        orgCode: item.orgCode || "",
                        couponId: item.couponId || "",
                        couponType: item.couponShowType || "",
                        userAction: item.userAction
                    })
                }
                let actTypeText = markState == 2 ? "领取" : markState == 1 ? "未开始" : markState == 3 ? "去使用" : markState == 5 ? "已抢光" : markState == 6 ? "已结束" : markState == 7 ? "明日抢" :  "" ;
                let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =  this.data.buriedObj || {};
                clickBuriedV2_({
                    create_time: new Date(),
                    click_id: "click_coupon",
                    click_par: {
                        traceId: this.data.traceId,
                        userAction: item.userAction || "",
                        storeId: item.storeId || "",
                        activityCode: activityCode || "",
                        couponId: item.couponId || "",
                        couponType: item.couponType || "",
                        actType: item.couponButton.title || actTypeText,
                    },
                    currentPageName: currentPageName,
                    prePageName: prePageName,
                    pageId: pageIdFirstPage,
                });
            } else {
                wx.navigateTo({
                    url: `/pages/newLogin/login/login`,
                    preObj: this.data.buriedObj,
                    buried_position: {
                        currentPageName: 'seckill_coupon_clickCoupon'
                    }
                })
            }
        },
        // 点击助力券
        clickHelpCoupon(item, index) {
            if (util.isLogin()) {
                let { activityCode = "", helpStatus, helpCouponGo = {},couponShowType,markState, userAction = '' } = item || {};
                let { to = '', params = {}, toast = null } = helpCouponGo || {}
                if (helpStatus == 1) { // 分享
                    this.shareHelpCoupon(activityCode, index)
                } else if (helpStatus == 3) { // 助力中 
                  to && djCmsJump({
                      to,
                      params,
                      userAction,
                      preObj: this.data.buriedObj,
                      buried_position: {
                        currentPageName: 'seckill_coupon_clickHelpCoupon'
                      }
                  })
                } else if (helpStatus == 4) { // 失败
                  this.shareHelpCoupon(activityCode, index)
                } else if (helpStatus == 5) { // 再次领
                  this.shareHelpCoupon(activityCode, index)
                } else if (helpStatus == 2) { //助力中
                    to && djCmsJump({
                        to,
                        params,
                        userAction,
                        preObj: this.data.buriedObj,
                        buried_position: {
                            currentPageName: 'seckill_coupon_clickHelpCoupon'
                        }
                    })
                } else {
                    toast && mp.toast({
                        title: toast
                    })
                }
                let actTypeText = markState == 2 ? "领取" : markState == 1 ? "未开始" : markState == 3 ? "去使用" : markState == 5 ? "已抢光" : markState == 6 ? "已结束" : markState == 7 ? "明日抢" :  "" ;
                let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
                this.data.buriedObj || {};
                clickBuriedV2_({
                    create_time: new Date(),
                    click_id: "click_coupon",
                    click_par: {
                        traceId: this.data.traceId,
                        userAction: item.userAction || "",
                        storeId: item.storeId || "",
                        activityCode: activityCode || "",
                        couponId: item.couponId || "",
                        couponType: item.couponType || "",
                        actType: item.couponButton.title || actTypeText,
                    },
                    currentPageName: currentPageName,
                    prePageName: prePageName,
                    pageId: pageIdFirstPage,
                });
            } else {
                wx.navigateTo({
                    url: `/pages/newLogin/login/login`,
                    preObj: this.data.buriedObj,
                    buried_position: {
                        currentPageName: 'seckill_coupon_clickHelpCoupon'
                    }
                });
            }
        },
        // 助力券分享
        shareHelpCoupon(activityId, index) {
            if (util.isLogin()) {
                getShareCoupon({
                    activityId: activityId || '',
                    type: 'helpon'
                }).then(res => {
                    let result = res.data.result || '';
                    if (res.data.code == '0') {
                        if (result) {
                            let { helpStatus = 3, helpCouponGo = {}, couponButton = {}, couponExpire = '' } = result.couponModel || {};
                            this.triggerEvent('onCouponEvent', {
                                type: 'helpCoupon',
                                data: result
                            })
                            this.setData({
                                [`lists[${index}].helpStatus`]: helpStatus,
                                [`lists[${index}].helpCouponGo`]: helpCouponGo,
                                [`lists[${index}].couponButton`]: couponButton,
                                [`lists[${index}].couponExpire`]: couponExpire
                            })
                        } else {
                            mp.toast({
                                title: '领取失败！'
                            })
                        }
                    } else if (res.data.code == '100009') {
                        if (res.data.detail) {
                            mp.toast({
                                title: res.data.detail || res.data.msg || '领取失败！'
                            })
                        } else {
                            let { helpCouponGo = {}, userAction = '' } = result && result.couponModel || {};
                            let { to = '', params = {} } = helpCouponGo || {};
                            if (to) {
                                djCmsJump({
                                    to: to,
                                    params: params,
                                    userAction,
                                    preObj: this.data.buriedObj,
                                    buried_position: {
                                        currentPageName: 'seckill_coupon_shareHelpCoupon'
                                    }
                                })
                            }
                        }
                    } else {
                        mp.toast({
                            title: res.data.msg || '领取失败！'
                        })
                    }

                }).catch(err => {
                    mp.toast({
                        title: '领取失败！'
                    })
                })
            } else {
                wx.navigateTo({
                    url: `/pages/newLogin/login/login`,
                    preObj: this.data.buriedObj,
                    buried_position: {
                        currentPageName: 'seckill_coupon_shareHelpCoupon'
                    }
                });
            }
        },
        // 跳转协议
        jump(data) {
            getActivityCouponProtocol({
                activityCode: data.activityCode || "",
                storeId: data.storeId || "",
                markState: data.markState || "",
                refPageSource: "",
                pageSource: "seckill",
                orgCode: data.orgCode || "",
                couponGoSource: 4,
                couponPattern: data.couponType || 1,
                couponId: data.couponId || "",
                ref: "",
                ctp: "seckill_active"
            }).then(res => {
                let result = res.data.result || '';
                if (res.data.code == '0' && result && result.length) {
                    if (result.length > 1) { // 展示券包弹层
                        // 展示弹层
                        this.triggerEvent('onCouponEvent', {
                            type: 'coupons',
                            data: result
                        })
                    } else {
                        let item = result[0] || {};
                        if (item.toast) {
                            mp.toast({
                                title: item.toast
                            })
                        } else {
                            let { to = '', params = {}, userAction = "" } = item.couponComponentResponse || {};
                            let paramsNew = { userAction: userAction };
                            for (let i in item.couponComponentResponse.params) {
                                if (i != 'passThroughParam') {
                                    paramsNew[i] = params[i]
                                } else {
                                    for (let j in params.passThroughParam) {
                                        if (params.passThroughParam[j]) {
                                            paramsNew[j] = params.passThroughParam[j]
                                        }
                                    }
                                }
                            }
                            if (to) {
                                djCmsJump({
                                    to: to,
                                    params: paramsNew,
                                    userAction,
                                    preObj: this.data.buriedObj,
                                    buried_position: {
                                        currentPageName: 'seckill_coupon_jump'
                                    }
                                })
                            }
                        }

                    }
                } else {
                    mp.toast({
                        title: res.data.detail || '哎呀，点击太疼啦，稍后再点我哦~'
                    })
                }
            })
        },
        // 领取普通券
        getCoupon(code, couponType, orgCode) {
            return new Promise(resolve => {
                getActivityCoupon({
                    "refPageSource": '',
                    "code": code,
                    "fromSource": 2,
                    "operType": 1,
                    "isFloor": 1,
                    "needCouponGo": true,
                    "grabPlat": 1,
                    "platNewActivityFlag": '',
                    "orgCode": orgCode || '',
                    "channel": 'seckill_land_page',
                    "couponPattern": couponType,
                    "pageSource": 'seckill',
                    "ref": '',
                    "ctp": 'seckill_active'
                }).then(res => {
                    if (res.data.code === '0') {
                        let { message, busiCode, responseList, extFieldMap = '' } = res.data.result || {};
                        if (busiCode === '0') {
                            resolve(responseList)
                        } else if (busiCode === 'AC4401') { // 商家券
                            mp.dialog({
                                title: '提示',
                                content: message || '开通会员后才可领取哦~(限商家会员)(AC4401)',
                                cancelText: '暂不开通',
                                confirmText: '立即开通'
                            }).then(actRes => {
                                if (actRes.confirm) {
                                    extFieldMap && djCmsJump({
                                        to: 'web',
                                        params: extFieldMap,
                                        preObj: this.data.buriedObj,
                                        buried_position: {
                                            currentPageName: 'seckill_coupon_getCoupon'
                                        }
                                    })
                                }
                            })
                        } else {
                            message && mp.toast({
                                title: message
                            })
                        }
                    } else {
                        mp.toast({
                            title: res.data.msg || '领券失败！'
                        })
                    }
                }).catch(err => {
                    mp.toast({
                        title: res.data.msg || '领券失败！'
                    })
                })
            })
        }
    }
})

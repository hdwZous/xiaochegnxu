import { request, FNIDS } from '../../common/util/api';
import util from '../../common/util/util';
import jumpAgreement from '../../common/util/jumpAgreement';
import { pvBuriedV2_ , clickBuriedV2_} from "../../common/util/BI";
import { mpCmsJump } from '../../common/util/agreementV2';
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 券列表
        couponInfoList: [],
        // 无红包弹窗提示语
        toastTitle: '',
        // 活动规则
        rules: '',
        modalName: '',
        money: 0,
        amount: 0,
        // 账户红包金额
        accountBalance: 0,
        // 是否可提现
        withdrawCash: false,
        // 提现条件不满足时的按钮文案
        buttonText: '',
        // 提现门槛
        cashingThreshold: 0,
        // 个人领取提现记录
        records: [],
        resources: [],
        // 群内领取记录
        redPacketRecords: [],
        // 无群内领取记录的缺省标题
        redPacketRecordMsg: '',
        unionId: '',
        recordPageNo: 1,
        userRecordPageNo: 1,
        // 红包活动id
        activityId: '',
        activityType: '',
        enablePull: false,
        showSubscribeMessage: false,
        // 活动开始之前的消息订阅标记
        isFirstStart: true,
        // 活动开始之后的消息订阅标记
        isFirstEnd: true,
        isLogin: false,
        // 是否第一次提现
        isFirstAuth: true,
        timeStatus: 0,
        // 开红包结果
        type: 0,
        self_page: 'communityRedpack'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const unionId = wx.getStorageSync('unionid') || "";
        const addressInfo = wx.getStorageSync('address_info');
        this.setData({ unionId });
        request({
            ...FNIDS.getConfigInfo,
            body: {
                cityId: addressInfo.cityId || 1,
                pageId: 20,
            },
            preObj: this.data.recommendObj
        }).then(res => {
            const { data: { result = [] } = {} } = res;
            let config = {};
            if (Array.isArray(result)) {
                config = result[0] || {};
                this.setData({
                    resources: config.data || []
                })
            }
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        const unionId = wx.getStorageSync('unionid') || "";
        this.setData({
            unionId
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const unionId = wx.getStorageSync('unionid') || "";
        request({
            ...FNIDS.redPacketTips,
            isNeedDealLogin: true,
            isForbiddenDialog: true,
            body: {
                unionId
            },
            preObj: this.data.recommendObj
        }).then(res => {
            const { data = {} } = res;
            const { code, result: { showRedPacketTips = 0, couponInfoList = [], toastTitle = '', activityId = '', timeStatus = '', type } = {} } = data;
            this.setData({ activityId, timeStatus, type });
            if (timeStatus == 1) {
                const communityRedpackStartTime = wx.getStorageSync('communityRedpackStartTime') || "";
                const date = new Date();
                const now = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
                if (now == communityRedpackStartTime) {
                    this.setData({
                        isFirstStart: false
                    })
                }
            } else if (timeStatus == 3) {
                const communityRedpackEndTime = wx.getStorageSync('communityRedpackEndTime') || "";
                const date = new Date();
                const now = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
                if (now == communityRedpackEndTime) {
                    this.setData({
                        isFirstEnd: false
                    })
                }
            }
            if (code == 0 && showRedPacketTips == 1) {
                this.setData({
                    modalName: 'animation',
                })
                clickBuriedV2_({
                    create_time: new Date(),
                    click_id: "showRedLayer",
                    click_par: {
                        activityId
                    }
                })
            } else {
                if (util.isLogin()) {
                    clickBuriedV2_({
                        create_time: new Date(),
                        click_id: "showRedResultLayer",
                        click_par: {
                            type
                        }
                    })
                    // 优惠券弹窗、社群活动下线 注释掉
                    // this.setData({
                    //     couponInfoList,
                    //     modalName: 'coupon',
                    //     toastTitle
                    // })
                } else {
                    wx.navigateTo({
                        url: `/pages/newLogin/login/login`,
                        preObj: this.data.recommendObj,
                        buried_postion: "communityRedpack6"
                    })
                    return
                }
            }
        }).catch(err => {
            const { data: { code, msg = '' } = {} } = err;
            if (code == 2001) {
                if (!util.isLogin()) {
                    wx.navigateTo({
                        url: `/pages/newLogin/login/login`,
                        preObj: this.data.recommendObj,
                        buried_postion: "communityRedpack7"
                    })
                }
            }
        })
        this.getActivityIndex();
        this.getRedPacketRecord('first');
        const isLogin = util.isLogin();
        this.setData({
            isLogin
        })
        // 设置弹窗 当天只显示一次
        if (isLogin) {
            let isShowModal = wx.getStorageSync('redpackModel')
            let date = new Date()
            let redpackDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            if (isShowModal != redpackDate) {
                wx.showModal({
                    title: '提示',
                    showCancel: false,
                    confirmText: '我知道了',
                    content: '红包活动已于9月10日结束～～请大家尽快提现，未提现金额会在9月25日为大家自动兑换为鲜豆，鲜豆下单时可抵扣等额现金。',
                    success (res) {
                      if (res.confirm) {
                        // console.log('用户点击确定')
                      } else if (res.cancel) {
                        // console.log('用户点击取消')
                      }
                    }
                })
                wx.setStorage({
                    key: 'redpackModel',
                    data: redpackDate
                })
            }
        }
          
    },

    // pv埋点
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
          create_time: new Date(),
          page_par: {
           
          },
          currentPageName: recommendObj.currentPageName || "",
          prePageName: recommendObj.prePageName || "",
          pageId: recommendObj.pageIdFirstPage || "",
          isBack: back || "",
        });
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
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
        const { recordPageNo } = this.data;
        this.setData({
            recordPageNo: recordPageNo + 1
        }, () => {
            this.getRedPacketRecord()
        })
    },

    onDefaultBtnEvent: function () {
    },

    jumpHandler: function (e) {
        const { jump, jumpParam, needLogin, linkUrl } = e.currentTarget.dataset;
        let jumpParamObj = new Object();
        let jumpParamStr = jumpParam || "";
        let paramArry = jumpParamStr.split("&");
        paramArry.forEach((item) => {
            const itemData = item.split("=");
            let keyName = itemData[0];
            let keyValue = itemData[1];
            jumpParamObj[keyName] = keyValue
        })
        // 跳转
        if (needLogin) {
            if (isLogin()) {
                if (jump) {
                    mpCmsJump({
                      pageType: jump,
                      params: jumpParam,
                      preObj: this.data.recommendObj,
                      buried_postion: "communityRedpack1"
                    });
                    return
                }
                let url = linkUrl;
                if (url) {
                    wx.navigateTo({
                        url: '/pages/h5/index?needToken=1&url=' + encodeURIComponent(url),
                        preObj: this.data.recommendObj,
                        buried_postion: "communityRedpack2"
                    })
                }
            } else {
                wx.navigateTo({
                    url: `/pages/newLogin/login/login`,
                    preObj: this.data.recommendObj,
                    buried_postion: "communityRedpack3"
                })
            }
        } else {
            //后置登录
            if (jump) {
                mpCmsJump({
                  pageType: jump,
                  params: jumpParamObj,
                  preObj: this.data.recommendObj,
                  buried_postion: "communityRedpack4"
                });
                return
            }
            let url = linkUrl;
            if (url) {
                wx.navigateTo({
                    url: '/pages/h5/index?url=' + encodeURIComponent(url),
                    preObj: this.data.recommendObj,
                    buried_postion: "communityRedpack5"
                })
            }
        }
    },

    getActivityIndex() {
        const unionId = wx.getStorageSync('unionid') || "";
        request({
            ...FNIDS.activityIndex,
            isNeedDealLogin: true,
            isForbiddenDialog: true,
            body: { unionId },
            method: 'POST',
            preObj: this.data.recommendObj
        }).then(res => {
            const { data = {} } = res;
            const { code, result: { accountBalance = 0, withdrawCash = false, cashingThreshold = 0, buttonText = '' } = {} } = data;
            if (code == 0) {
                this.setData({
                    accountBalance,
                    withdrawCash,
                    cashingThreshold,
                    buttonText
                })
            }
        }).catch(err => {
            console.log(err)
        })
    },

    // 获取群内领取记录
    getRedPacketRecord(type) {
        let { recordPageNo = 1, unionId = '' } = this.data;
        if (type == 'first') {
            recordPageNo = 1
        }
        request({
            ...FNIDS.redPacketRecord,
            isNeedDealLogin: true,
            isForbiddenDialog: true,
            body: {
                unionId,
                pageNo: recordPageNo
            },
            method: 'POST',
            preObj: this.data.recommendObj
        }).then(res => {
            const { data: { code, result = [] } = {} } = res;
            if (code == 0) {
                const { redPacketRecords = [] } = this.data;
                let newRedPacketRecords = [];
                if (type == 'first') {
                    newRedPacketRecords = result;
                } else {
                    newRedPacketRecords = redPacketRecords.concat(result)
                }
                this.setData({ redPacketRecords: newRedPacketRecords });
            }
            if (code == 4) {
                const redPacketRecordMsg = (msg || '').split('，')
                this.setData({
                    redPacketRecordMsg
                })
                // 无群内领取记录时上报
                clickBuriedV2_({
                    create_time: new Date(),
                    click_id: "getEmptyResult",
                    click_par: {}
                })
            }
        }).catch(err => {
            const { data: { code, msg = '' } = {} } = err;
            if (code == 4) {
                const redPacketRecordMsg = (msg || '').split('，')
                this.setData({
                    redPacketRecordMsg
                })
                // 无群内领取记录时上报
                clickBuriedV2_({
                    create_time: new Date(),
                    click_id: "getEmptyResult",
                    click_par: {}
                })
            }
            console.log(err)
        })
    },

    // 开红包
    openRedPacket(e) {
        const { result = {}, code } = e.detail;
        const { money = '', totalMoney = '', toastTitle = '', couponInfoList = [], activityId = '', type = '' } = result;
        this.setData({
            type
        })
        if (code == 2001) {
            setTimeout(() => {
                wx.showToast({
                    title: '您已参与过本次活动抢红包活动了',
                    icon: "none",
                    duration: 2000,
                })
            }, 500)
            return
        }
        if (money) {
            this.setData({
                amount: money,
                accountBalance: totalMoney,
                activityId,
                activityType: type
            })
            clickBuriedV2_({
                create_time: new Date(),
                click_id: "getRedResult",
                click_par: {
                    money,
                    activityId,
                    totalMoney,
                    type
                }
            })
        } else {
            clickBuriedV2_({
                create_time: new Date(),
                click_id: "showRedResultLayer",
                click_par: {
                    type
                }
            })
            this.setData({
                couponInfoList,
                modalName: 'coupon',
                toastTitle,
                activityId,
                activityType: type
            })
        }
        this.getActivityIndex();
        this.getRedPacketRecord('first');
    },

    showModal(e) {
        const { type = '' } = e.detail;
        const { modalName = '' } = this.data;
        const resType = this.data.type;
        if (modalName == 'record' && !type) {
            this.setData({
                userRecordPageNo: 0,
                enablePull: false
            })
        }
        if (type == 'success' || type == 'tips' || type == 'coupon') {
            clickBuriedV2_({
                create_time: new Date(),
                click_id: "showRedResultLayer",
                click_par: {
                    type: resType
                }
            })
        }
        this.setData({ modalName: type });
    },

    // 活动规则
    openRule() {
        const { rules = '' } = this.data;
        let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
        this.data.recommendObj || {};
        let {btnName = ''} = e.currentTarget.dataset || {}
        clickBuriedV2_({
            click_id: "clickButton",
            click_par: {
                btnName
            },
            currentPageName: currentPageName,
            prePageName: prePageName,
            pageId: pageIdFirstPage,
        })
        if (rules) {
            this.setData({ modalName: 'rule' });
        } else {
            request({
                ...FNIDS.getRule,
                body: {},
                method: 'POST',
                preObj: this.data.recommendObj
            }).then(res => {
                const { data: { code, result = '' } = {} } = res;
                if (code == 0) {
                    this.setData({
                        rules: result,
                        modalName: 'rule'
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },

    // 个人领取记录弹层
    openRecord(e) {
        const { unionId } = this.data;
        let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
        this.data.recommendObj || {};
        let {btnName = ''} = e.currentTarget.dataset || {}
        clickBuriedV2_({
            click_id: "clickButton",
            click_par: {
                btnName
            },
            currentPageName: currentPageName,
            prePageName: prePageName,
            pageId: pageIdFirstPage,
        })
        request({
            ...FNIDS.walletDetails,
            body: {
                unionId,
                pageNo: 1
            },
            method: 'POST',
            isForbiddenDialog: true,
            preObj: this.data.recommendObj
        }).then(res => {
            const { data: { code, result = [] } = {} } = res;
            if (code == 0) {
                this.setData({
                    records: result,
                    userRecordPageNo: 2
                })
            }
            this.setData({
                modalName: 'record',
            })
        }).catch(err => {
            this.setData({
                modalName: 'record',
            })
            console.log(err)
        })
    },

    getRecords() {
        const { userRecordPageNo, records = [], unionId, enablePull = false } = this.data;
        if (enablePull) return
        this.setData({
            userRecordPageNo: userRecordPageNo + 1
        }, () => {
            request({
                ...FNIDS.walletDetails,
                body: {
                    unionId,
                    pageNo: userRecordPageNo
                },
                method: 'POST',
                isForbiddenDialog: true,
                preObj: this.data.recommendObj
            }).then(res => {
                const { data: { code, result = [] } = {} } = res;
                const newRecords = records.concat(result);
                if (code == 0) {
                    this.setData({
                        records: newRecords,
                    })
                }
            }).catch(err => {
                const { data: { code } = {} } = err;
                if (code == 4) {
                    this.setData({
                        enablePull: true
                    })
                }
                console.log(err)
            })
        })

    },

    withdraw() {
        let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
        this.data.recommendObj || {};
        let {btnName = ''} = e.currentTarget.dataset || {}
        clickBuriedV2_({
            click_id: "clickButton",
            click_par: {
                btnName
            },
            currentPageName: currentPageName,
            prePageName: prePageName,
            pageId: pageIdFirstPage,
        })
        const { loginStateInfo: { openId = '' } = {} } = app.globalData;
        request({
            ...FNIDS.withdrawCheck,
            body: { openId },
            method: 'POST',
            preObj: this.data.recommendObj
        }).then(res => {
            const { data: { code, result = '' } = {} } = res;
            if (result != 1) {
                this.setData({ isFirstAuth: false })
            }
            this.setData({ modalName: 'auth' })
        }).catch(err => {
            this.setData({ modalName: 'auth' })
        })
    },

    withdrawSuccess() {
        this.getActivityIndex()
    },

    subscribeMsg() {
        this.updateFirstState();
        let isSubscribeMessage = true;
        let t = setTimeout(() => {
            if (isSubscribeMessage) {
                this.setData({
                    showSubscribeMessage: true
                })
            } else {
                this.setData({
                    showSubscribeMessage: false
                })
            }
            clearInterval(t);
        }, 800)
        const _this = this;
        wx.requestSubscribeMessage({
            tmplIds: [
                'iwJcSNrbfOXKnfhoi4tEJh0s48uz689kTloguhSZryk',
                'fchAp-FzoMeL7H-ENM6JyboyPHI5mMhuG9XqsCvqK5I'
            ],
            success(res) {
                if (res.errMsg == 'requestSubscribeMessage:ok') {
                    // 用于阻止已经点击总是
                    isSubscribeMessage = false
                    _this.subscribeMessageUpdata(res, _this)
                }
            },
            fail(err) {
                console.log("========err======", err)
            },
            complete() {
                _this.setData({
                    showSubscribeMessage: false
                })
            }
        })
    },

    updateFirstState() {
        const { timeStatus = 0 } = this.data;
        if (timeStatus == 1) {
            const communityRedpackStartTime = wx.getStorageSync('communityRedpackStartTime') || "";
            const date = new Date();
            const now = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
            if (now == communityRedpackStartTime) {
                this.setData({
                    isFirstStart: false
                })
            } else {
                wx.setStorageSync('communityRedpackStartTime', now)
            }
        } else if (timeStatus == 3) {
            const communityRedpackEndTime = wx.getStorageSync('communityRedpackEndTime') || "";
            const date = new Date();
            const now = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
            if (now == communityRedpackEndTime) {
                this.setData({
                    isFirstEnd: false
                })
            } else {
                wx.setStorageSync('communityRedpackEndTime', now)
            }
        }
    },
    // 订阅消息请求
    subscribeMessageUpdata(res, context) {
        console.log(res)
        const loginStateInfo = app.globalData.loginStateInfo;
        // 模板入参
        const templates = [];
        for (let key in res) {
            const tempId = {}
            if (res[key] == 'reject') {
                tempId.status = "reject"
                tempId.templateId = key
                tempId.channelId = context.matchChannel(key)
                templates.push(tempId)
            } else if (res[key] == 'accept') {
                tempId.status = "accept"
                tempId.templateId = key
                tempId.channelId = context.matchChannel(key)
                templates.push(tempId)
            } else if (res[key] == 'ban') {
                tempId.status = "ban"
                tempId.templateId = key
                tempId.channelId = context.matchChannel(key)
                templates.push(tempId)
            }
        }
        request({
            ...FNIDS.subscribeMsg,
            body: {
                openId: loginStateInfo.openId || "",
                templates: templates
            },
            preObj: this.data.recommendObj
        }).then(res => {
            console.log("==========res==========", res)
        }).catch(err => {
            console.log("==========err==========", err)
        })
    },
    // 匹配channel
    matchChannel(templeKey) {
        let channel = 1
        switch (templeKey) {
            case 'MUMVz8L2w1GfGlI_pzERYQKRy8VvCMNUcUsxW-A7c3I': channel = 1; break;
            case '2DTGty37XUIpQfM2QgM-HUCE2YJ4Um6DUzM9ENBcXSE': channel = 2; break;
            case 'foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU': channel = 3; break;
            case 'sUa5bwdXb322H3gZYAUF2CLKhDqgCfEE8ClYdMr69AU': channel = 4; break;
            case 'oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs': channel = 5; break;
            case 'foXXDvHMDaA45_8QPRwAd_p9unR3syrGG8kxIVQXUQ0': channel = 6; break;
            case 'oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs': channel = 7; break;
            case 'foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU': channel = 8; break;
            case 'sUa5bwdXb322H3gZYAUF2CLKhDqgCfEE8ClYdMr69AU': channel = 9; break;
            case 'aHE90mjezRAJVQhzUhZ5vXoSQwwI8hgR-tYVSa9F5-A': channel = 10; break;
            case 'Ut2OT-SDxpcLcAp2MB_kJqF69ohZ5-Wjt8OnBDSscso': channel = 11; break;
            case 'B5atC925FkTqrFPYvjw4zywhoIDVcSKPXaMkAqqBQOY': channel = 12; break;
            case 'foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU': channel = 13; break;
            case 'fchAp-FzoMeL7H-ENM6JyboyPHI5mMhuG9XqsCvqK5I': channel = 15; break;
            case 'iwJcSNrbfOXKnfhoi4tEJh0s48uz689kTloguhSZryk': channel = 16; break;
            default:
                channel = 14;
        }
        return channel
    },
})
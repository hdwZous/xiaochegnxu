import { request, FNIDS } from '../../../../common/util/api';
import { clickBuriedV2_ } from "../../../../common/util/BI";
import { getNewOpenId } from '../../../../common/util/services';
let throttleFlag = true;
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        accountBalance: {
            type: Number,
            value: 0,
        },
        isFirstAuth: {
            type: Boolean,
            value: true
        },
        recommendObj: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        userName: '',
        userInfo: {
            openId: '',
            nickName: '',
            avatarUrl: ''
        },
        showWxAuth: true,
        showUserName: false,
        showWithdrawing: false,
        showRetain: false,
        retainFlag: 0,
        historyModal: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        closeModal() {
            this.triggerEvent("showModal", { type: '' });
        },
        stopBubble() {
            return false
        },
        onCancel(e) {
            const { retainFlag } = this.data;
            const { buttonType = '' } = e.currentTarget.dataset;
            if (retainFlag == 0) {
                const historyModal = this.getHistory();
                this.setData({
                    retainFlag: 1,
                    showRetain: true,
                    showWxAuth: false,
                    showUserName: false,
                    showWithdrawing: false,
                    historyModal
                })
                clickBuriedV2_({
                    create_time: new Date(),
                    click_id: "showRedRetainLayer",
                    click_par: {}
                })
                return
            }
            if (buttonType == 'retain') {
                clickBuriedV2_({
                    create_time: new Date(),
                    click_id: "clickRedRetainLayer",
                    click_par: {
                        btnName: 'giveUp'
                    }
                })
            }
            switch (buttonType) {
                case "showWxAuth":
                    this.setData({
                        showWxAuth: false
                    })
                    this.triggerEvent("showModal", { type: '' });
                    break;
                case "showUserName":
                    this.setData({
                        showUserName: false
                    })
                    this.triggerEvent("showModal", { type: '' });
                    break;
                case "retain":
                    this.triggerEvent("showModal", { type: '' });
                default:
                    break;
            }
        },
        onSubmit(e) {
            const { buttonType = '', type = '' } = e.currentTarget.dataset;
            if (buttonType != 'retain') {
                clickBuriedV2_({
                    create_time: new Date(),
                    click_id: "clickConfirm",
                    click_par: {
                        type
                    }
                })
            }
            if (buttonType == 'retain') {
                clickBuriedV2_({
                    create_time: new Date(),
                    click_id: "clickRedRetainLayer",
                    click_par: {
                        btnName: 'continue'
                    }
                })
            }
            switch (buttonType) {
                case "showWxAuth":
                    const { isFirstAuth } = this.data;
                    if (isFirstAuth) {
                        this.getUserProfile()
                    } else {
                        this.goWithdrawConfirm()
                    }
                    break;
                case "showUserName":
                    if (this.data.userName) {
                        this.goWithdrawConfirm()
                    } else {
                        wx.showToast({
                            title: '请输入真实姓名',
                            icon: "none"
                        });
                    }
                    break;
                case "retain":
                    const { historyModal } = this.data;
                    this.setData({
                        showRetain: false,
                        historyModal: '',
                        [historyModal]: true
                    })
                default:
                    break;
            }
        },

        getUserProfile() {
            wx.getUserProfile({
                desc: '完善提现信息',
                success: (res) => {
                    getNewOpenId(1)
                    this.getUserOpenId(res.userInfo || {})
                }
            })
        },
        
        getUserOpenId(userInfo) {
            const { isFirstAuth } = this.data;
            const res = wx.getStorageSync('login_info') || {};
            if (userInfo.nickName) {
                this.setData({
                    showWxAuth: false,
                    userInfo: {
                        openId: userInfo.openId || res.openId || '',
                        nickName: userInfo.nickName || res.nickname || '',
                        avatarUrl: userInfo.avatarUrl || res.avatar || ''
                    }
                })
                if (isFirstAuth) {
                    this.setData({
                        showUserName: true,
                    })
                } else {
                    this.goWithdrawConfirm()
                }
            } else {
                this.setData({
                    showWxAuth: false
                })
                this.triggerEvent("showModal", { type: '' });
                wx.showToast({
                    title: "获取提现微信账户失败~",
                    icon: "none"
                })
            }
        },
        hideWithdrawing(e) {
            this.setData({ showWithdrawing: false });
            this.triggerEvent('withdrawSuccess')
            this.triggerEvent("showModal", { type: '' });
        },
        changeInput(e) {
            const { value = '' } = e.detail;
            this.setData({ userName: value });
        },
        goWithdrawConfirm() {
            if (throttleFlag) {
                throttleFlag = false;
                const { accountBalance, userName, userInfo: { nickName, avatarUrl } = {} } = this.data;
                const { loginStateInfo: { openId = '' } = {} } = app.globalData;
                request({
                    ...FNIDS.redPacketWithdraw,
                    body: {
                        accountBalance,
                        userName,
                        openId,
                        nickName,
                        avatar: avatarUrl,
                        type: 1
                    },
                    method: 'POST',
                    isForbiddenDialog: true,
                    preObj: this.data.recommendObj
                }).then(res => {
                    const { data: { result: { state = 0 } = {}, detail = '', code, msg } = {} } = res;
                    clickBuriedV2_({
                        create_time: new Date(),
                        click_id: "getWithdrawalResult",
                        click_par: {
                            code,
                            state,
                            msg
                        }
                    })
                    if (state == 1) {
                        this.setData({
                            showUserName: false,
                            showWithdrawing: true
                        })
                    } else {
                        this.setData({
                            showUserName: false
                        })
                        wx.showToast({
                            title: detail || "提现失败",
                            icon: "none"
                        });
                        this.triggerEvent("showModal", { type: '' });
                    }
                    throttleFlag = true
                }).catch(err => {
                    throttleFlag = true
                    const { data: { result: { state = 0 } = {}, detail = '', code, msg } = {} } = err;
                    clickBuriedV2_({
                        create_time: new Date(),
                        click_id: "getWithdrawalResult",
                        click_par: {
                            code,
                            state,
                            msg
                        }
                    })
                    if (state != 1) {
                        this.setData({
                            showUserName: false
                        })
                        wx.showToast({
                            title: detail || "提现失败",
                            icon: "none"
                        });
                    }
                    this.setData({
                        showUserName: false
                    })
                    this.triggerEvent("showModal", { type: '' });
                });
            }
        },
        getHistory() {
            const { showWxAuth, showUserName, showWithdrawing } = this.data;
            if (showWxAuth) return 'showWxAuth';
            if (showUserName) return 'showUserName';
            if (showWithdrawing) return 'showWithdrawing';
        }
    }
})

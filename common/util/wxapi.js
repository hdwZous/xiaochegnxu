import { request } from "./api";
import FNIDS from './functionId';
let app = getApp();

let mp = {
    /**
     * 获取地理位置
     */
    getLocation() {
        return new Promise((resolve, reject) => {
            wx.getLocation({
                success(res) {

                    resolve(res)
                },
                fail(err) {
                    reject(err)
                }
            })
        })
    },

    /**
     * 设置缓存信息
     * @param key
     * @param val
     */
    setStorage(key, val) {
        return new Promise((resolve, reject) => {
            try {
                wx.setStorage({
                    key: key,
                    data: val,
                    success: res => {
                        resolve(res)
                    },
                    fail: err => {
                        reject(err)
                    }
                })
            } catch (err) {
                reject(err)
            }
        })
    },

    /**
     * 获取缓存信息
     * @param key
     */
    getStorage(key) {
        return new Promise((resolve, reject) => {
            try {
                wx.getStorage({
                    key: key,
                    success: res => {
                        resolve(res.data)
                    },
                    fail: err => {
                        try {
                            reject(err)
                        } catch (e) {

                        }
                    }
                })
            } catch (e) {

            }
        })
    },

    /**
     * dialog
     * @param title 抬头文案
     * @param msg 提示文案
     * @param showCancel 展示取消按钮(默认展示)
     * @param confirmText 确定按钮文案
     * @param cancelText 取消按钮文案
     */
    dialog(obj) {
        return new Promise((resolve, reject) => {
            wx.showModal({
                title: obj.title || '温馨提示',
                content: obj.content || '网络问题',
                showCancel: obj.showCancel === undefined || false,
                confirmText: obj.confirmText || '确定',
                cancelText: obj.cancelText || '取消',
                success(res) {
                    resolve(res)
                },
                fail(err) {
                    reject(err);
                }
            })
        })
    },

    /**
     * 获取用户信息
     */
    getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                success(res) {
                    resolve(res)
                },
                fail(err) {
                    reject(err)
                }
            })
        })
    },

    /**
     * 用户授权
     * @param type userInfo/userLocation等详情见文档
     */
    openSetting(type) {
        let key = 'scope.' + type;
        return new Promise((resolve, reject) => {
            wx.openSetting({
                success: (res) => {
                    let val = res.authSetting[key];
                    if (val) {
                        resolve(val)
                    } else {
                        reject(val)
                    }
                }
            })
        })
    },

    /**
     * 扫描二维码
     */
    scanCode() {
        return new Promise((resolve, reject) => {
            wx.scanCode({
                onlyFromCamera: true,
                success: res => {
                    resolve(res)
                },
                fail: err => {
                    reject(err)
                }
            })
        })
    },

    /**
     * 加载中
     */
    loading() {
        wx.showLoading({
            title: '加载中',
        })
    },

    /**
     * 加载中带有蒙层
     */
    loading_cover() {
        wx.showLoading({
            title: '加载中',
            mask: true
        })
    },

    /**
     * 关闭loading
     */
    hideLoading() {
        wx.hideLoading({})
    },

    /**
     * toast提示
     * @param obj.title: 提示语
     * @param obj.icon: 提示icon
     * @param obj.duration: 提示延迟时间(默认2000毫秒)
     */
    toast(obj) {
        wx.showToast({
            title: obj.title,
            icon: obj.icon || 'none',
            duration: obj.duration || 2000
        })
    },

    showToast(obj) {
        return new Promise((resolve, reject) => {
            wx.showToast({
                title: obj.title,
                icon: obj.icon || 'none',
                duration: obj.duration || 2000,
                mask: obj.mask || false,
                success: () => {
                    resolve()
                },
                fail: () => {
                    reject()
                }

            })
        })


    },

    /**
     * 获取openId
     */
    getOpenId() {
        return new Promise((resolve, reject) => {
            try {
                let openId = wx.getStorageSync('openId') || '';
                let login_info = wx.getStorageSync('login_info') || {};
                if (openId || login_info.openId) {
                    resolve(openId)
                } else {
                    this.getLoginCode().then(code => {
                        let { functionId = '', appVersion = '' } = FNIDS.requestOpenId
                        request({
                            functionId,
                            appVersion,
                            isNeedDealError: true,
                            content: {
                                "code": code,
                            }
                        }).then(res => {
                            if (res.data && res.data.result && res.data.result.openId) { // 获取到openId
                                try {
                                    wx.setStorageSync('openId', res.data.result.openId);
                                    resolve(res.data.result.openId)
                                } catch (e) {
                                    reject(e)
                                }
                            } else {
                                try {
                                    // 接口获取code失败，重置缓存，后面再重新获取code
                                    wx.setStorageSync('code', '')
                                } catch (e) {
                                    reject(e)
                                }
                                reject(res)
                            }
                        }).catch(err => {
                            reject(err)
                        })
                    }).catch(err => {
                        reject(err)
                    })
                }

            } catch (e) {
                reject(e)
            }
        })
    },

    /**
     * 获取code码
     */
    getLoginCode() {
        return new Promise((resolve, reject) => {
            let JDHasUseLogin = wx.getStorageSync('JDHasUseLogin');
            if (JDHasUseLogin) { // 如果京东用过code，则生成新code
                wx.login({
                    success(res) {
                        if (res.code) {
                            try {
                                wx.setStorageSync('code', res.code);
                                wx.setStorageSync('JDHasUseLogin', false);
                                // console.error('===new Code from JDHasUseLogin in true ==', res.code);
                                resolve(res.code);
                            } catch (e) {
                                reject(e)
                            }
                        } else {
                            reject(res.errMsg);
                            // console.error('登录失败！at wxapi.js getLoginCode' + res.errMsg)
                        }
                    }
                })
            } else {
                wx.checkSession({
                    success() {
                        //session_key 未过期，并且在本生命周期一直有效
                        try {
                            let code = wx.getStorageSync('code');
                            if (!code) { // 缓存没有，重新获取
                                wx.login({
                                    success(res) {
                                        if (res.code) {
                                            try {
                                                wx.setStorageSync('code', res.code);
                                                // console.error('===new Code from checkSession success in storage null ==', res.code);
                                                resolve(res.code)
                                            } catch (e) {
                                                reject(e)
                                            }
                                        } else {
                                            reject(res.errMsg);
                                            // console.error('登录失败！at wxapi.js getLoginCode' + res.errMsg)
                                        }
                                    }
                                })
                            } else {
                                // console.error('===old Code from checkSession success in storage ==', code);
                                resolve(code)
                            }
                        } catch (e) {
                            reject(e)
                        }
                    },
                    fail() {
                        // session_key 已经失效，需要重新执行登录流程
                        wx.login({
                            success(res) {
                                if (res.code) {
                                    try {
                                        wx.setStorageSync('code', res.code);
                                        // console.error('===new Code from checkSession fail ==', res.code);
                                        resolve(res.code)
                                    } catch (e) {
                                        reject(e)
                                    }
                                } else {
                                    reject(res.errMsg);
                                    // console.error('登录失败！at wxapi.js getLoginCode' + res.errMsg)
                                }
                            }
                        })
                    }
                })
            }
        })
    },

    /**
     * 获取分享信息
     */
    getShareInfo() {
        return new Promise((resolve, reject) => {
            // 获取群id
            if (app.globalData.shareTicket) {
                wx.getShareInfo({
                    shareTicket: app.globalData.shareTicket,
                    success: (res) => {
                        if (res.iv && res.encryptedData) {
                            resolve(res)
                        } else {
                            reject(res)
                        }
                    },
                    fail: err => {
                        reject(err)
                    }
                });
            } else {
                reject();
                // console.error('===no shareTicket===')
            }
        })
    },
    
};

export default mp
module.exports = mp


import {
    FNIDS,
    request
} from '../../common/util/api'
import mp from '../../common/util/wxapi'
import {
    isLogin
} from "../../common/util/loginUtil";

// 埋点描述文件

let from = '';
Page({
    // 埋点描述文件
    // 埋点
    buried: {
        from: "",
        state: "",
        userAction: {},
        status: ""
    },
    /**
     * 页面的初始数据
     */
    data: {
        checked: false,
        btnStatus: 20,
        pin: '',
        showEmpty: false,
        business: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        from = options.from;
        this.buried.userAction = options.userAction
        this.setData({
            business: options.business
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if (isLogin()) {
            this.getCurrentPageStatus()
        } else {
           
        }
    },

    // 获取当前页按钮状态
    getCurrentPageStatus() {
        // console.log(11111)
        request({
            ...FNIDS.getWeBankStatus,
            isNeedDealError: true,
            isNeedDealLogin: true
        }).then(res => {
            if (res.data.code == '0') {
                let result = res.data.result || {};
                let btnStatus = result.userAccountStatus || 20;
                let pin = result.encodePin || '';
                this.setData({
                    showEmpty: false,
                    btnStatus: btnStatus,
                    pin: pin
                });
            } else {
                mp.toast({
                    title: res.data && res.data.msg || '服务异常，请稍后再试~'
                });
                this.setData({
                    showEmpty: false
                });
            }
        }).catch(err => {
            mp.toast({
                title: '服务异常，请稍后再试~'
            });
            this.setData({
                showEmpty: false
            });
        })
    },

    // 上报埋点参数
    pv(from, state) {
        this.buried.from = from;
        this.buried.state = state;
    },

    // 开通临时账户
    openTempAccount() {
        request({
            ...FNIDS.openWeBankTempAccount,
            isNeedDealError: true,
            isNeedDealLogin: true,
            method: 'post',
            body: {
                changeType: 1
            }
        }).then(res => {
            if (res.data.code == '0') {
                // 刷新页面
                console.log(2222)
                this.getCurrentPageStatus()
            } else {
                mp.toast({
                    title: res.data && res.data.msg || '开通失败，请稍后再试~'
                })
            }
        }).catch(err => {
            mp.toast({
                title: '开通失败，请稍后再试~'
            })
        })
    },

    // 点击按钮
    clickBtn() {
        if (isLogin()) {
            let status = this.data.btnStatus;
            if (status === 20) { // 未预开通
                if (this.data.checked) { // 同意协议
                    this.openTempAccount()
                } else {
                    mp.toast({
                        title: '您需同意《京东到家隐私政策》和《微众银行微常准服务协议》才能进行下一步操作'
                    })
                }

                // 埋点
                this.clickBtnA()
            } else if (status === 30) { // 已预开通，未激活
                this.goToWeBankMp();
                // 埋点
                this.clickBtnB()
            }
        } else {
          let { recommendObj = null } = this.data
            wx.navigateTo({
                url: `/pages/newLogin/login/login`,
                preObj: recommendObj
            })
        }
    },

    // 未预开通点击埋点
    clickBtnA() {

    },
    // 已预开通，未激活，点击埋点
    clickBtnB() {

    },

    // 去微众小程序
    goToWeBankMp() {
        let pin = this.data.pin || '';
        let business = this.data.business
        let config = getApp().globalData.config;
        let weBankConfig = config && config.weBankConfig || {};
       
        wx.navigateToMiniProgram({
            appId: weBankConfig.appId || 'wxe0fd3b6e024bf626',
            path: weBankConfig.path || '',
            extraData: {
                webankAppId: weBankConfig.webankAppId || 'XLoe7tjW',
                memberId: pin,
                secondId: 'app' ,
                thirdId: business || 'act',
            },
            envVersion: config.env === 'pro' ? 'release' : 'develop',
            success(res) {
                try {
                    wx.setStorageSync('weBankPage', self.data.pageName)
                } catch (e) {

                }
            }
        })
        
    },

    // 协议勾选
    checkboxChange() {
        let status = !this.data.checked;
        this.setData({
            checked: status
        });
        this.buried.state = status;
        
    },

    // 去协议页
    goToProtocol() {
      let { recommendObj = null } = this.data
        wx.navigateTo({
            url: '/pages/weBank/protocol/index',
            preObj: recommendObj
        })
    }
});
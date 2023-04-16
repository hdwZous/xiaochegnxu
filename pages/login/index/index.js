import util from '../util.js'
let plugin = requirePlugin("loginPlugin");
let config = util.getLoginConfig();
import {
    reqLoginNew
} from "../../../common/util/reqLogin.js";

Page({
  data: {
    config
  },
  smsloginResListener(res = {}) {
    util.handleJump(res.detail)
  },
  getPhoneNumber(event = {}) {
    let {
      stopClick
    } = this.data;
    let { detail } = event;
    let { iv, encryptedData } = detail;
    plugin.clickLog({
      event,
      eid: 'WLogin_Diversion_Wechat',
    });
    if (!iv || !encryptedData) return;
    if (stopClick) {
      wx.showToast({
        icon: 'none',
        title: '请不要重复点击'
      });
      return
    }
    this.setData({
      detail,
      stopClick: true
    });
    this.mobileLogin();
    plugin.clickLog({
      event,
      eid: 'WLogin_DiversionWechat_Allow',
    })
  },
  mobileLogin() {
    let {
      code,
      detail
    } = this.data;
    let {
      iv,
      encryptedData
    } = detail;
    if (!code || !iv || !encryptedData) return;

    const startClick = () => {
      this.setData({
        stopClick: false
      })
    };
    plugin.WXMobileLogin({
      iv,
      encryptedData,
      code,
    }).then(res => {
      startClick();
      util.handleJump(res)
    }).catch(res => {
      startClick();
      console.jdLoginLog(res)
    }); 

  },
  onLoad(options) {
    this.setData({
      config: util.getLoginConfig(options)
    });
    util.setLoginParamsStorage(options);
    plugin.setLog({ url: 'pages/login/index/index', pageId: 'WLogin_Diversion'});
    util.setCustomNavigation();
    // todo
    wx.login({
      success: (res = {}) => {
        this.setData({
          code: res.code
        });
          wx.setStorageSync('JDHasUseLogin', true);
          wx.setStorageSync('code', res.code);
      }
    })
  },
  onShow(){
    plugin.pvLog();
    let pt_key = plugin.getPtKey();
    if (pt_key) {
        reqLoginNew({
            type: 1,//标识登录
        }).then((res) => {
            if (res == "loginSuccess") {
                let pages = getCurrentPages();
                for (let page of pages) {
                    if (page && (page.route == "pages/coupon/voucher/index")) {
                        page.setData({
                            reRequest: true
                        });
                        break
                    }
                }
                wx.navigateBack()
            } else {
                wx.showToast({
                    title: "登录失败",
                    icon: "none"
                })
            }
        })
    }
  }
});
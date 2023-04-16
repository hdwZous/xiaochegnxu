import ParamsSign from '../../../miniprogram_npm/@legos/js-security-jdxcx/index'; //引入加固sdk
import util from '../util.js'
import utils from "../../../common/util/util";
import { reqLoginNew } from "../../../common/util/reqLogin.js";
import { reportPromote } from "../../../common/util/services.js";

import { djCmsJump } from "../../../common/util/agreementV2.js";
import { pvBuriedV2_ } from "../../../common/util/BI"
import {
  request,
  FNIDS
} from '../../../common/util/api'
let plugin = requirePlugin("loginPlugin");
// 设置延签加固
plugin.setParamsSign && plugin.setParamsSign(ParamsSign);
let fm = require("../fm.min.js")
let config = util.getLoginConfig();

Page({
  data: {
    config,
    stopClick: false,
    checkboxChecked: !config.author,
    returnBack: "",
  },
  smsloginResListener(res = {}) {
    if (this.data.checkboxChecked) {
      util.handleJump(res.detail);
    } else {
      this.showLoad();
    }
  },
  showLoad() {
    wx.showToast({
      title: "请阅读并勾选页面底部协议",
      icon: "none",
      duration: 3000,
    });
  },
  changeCheckbox(e) {
    this.setData({ checkboxChecked: e.detail });
  },
  needAuthor() {
    if (!this.data.checkboxChecked) {
      this.showLoad();
    }
  },
  getPhoneNumber(event = {}) {
    let { stopClick } = this.data;
    if (stopClick) {
      wx.showToast({
        icon: "none",
        title: "请不要重复点击",
      });
      return;
    }
    this.setData({
      stopClick: true,
    });
    let { detail } = event;
    let { iv, encryptedData } = detail;
    plugin.clickLog({
      event,
      eid: "WLogin_Diversion_Wechat",
    });
    if (!iv || !encryptedData) {
      this.setData({ stopClick: false });
      return;
    }
    wx.showLoading({
      title: "加载中",
    });
    this.setData({
      detail,
    });
    this.mobileLogin();
    plugin.clickLog({
      event,
      eid: "WLogin_DiversionWechat_Allow",
    });
  },
  mobileLogin() {
    let { code, detail } = this.data;
    let { iv, encryptedData } = detail;
    if (!code || !iv || !encryptedData) return;

    const startClick = () => {
      wx.hideLoading();
      this.setData({
        stopClick: false,
      });
    };
    plugin
      .WXMobileLogin({
        iv,
        encryptedData,
        code,
      })
      .then((res) => {
        if ([32, 33].indexOf(res.err_code) >= 0) return plugin.loginRequest({});
        if (res.err_code == 124) return this.getWxcode(); // 风控提示用户去浏览器解除 重新获取code
        return res;
      })
      .then((res) => {
        let { pt_key, rsa_modulus, guid } = res;
        if (!pt_key && rsa_modulus && guid) {
          // login 返回
          res.pluginUrl = plugin.formatPluginPage("main");
        }
        // startClick()
        console.log('----handleJump---res-------',res)
        util.handleJump(res);
      })
      .catch((res) => {
        startClick();
        console.jdLoginLog(res);
      });
  },
  getWxcode() {
    wx.login({
      success: (res = {}) => {
        this.setData({
          code: res.code,
        });
      },
    });
  },
  onLoad(options) {
    console.log('---login-----options--------',options)
    let { riskFail, loginByMp, redirectUrl } = options;
    this.setData({
      config: util.getLoginConfig(options),
      returnBack: options.returnBack || "",
    });
    //风控失败不重置缓存
    if (!riskFail) {
      util.setLoginParamsStorage(options);
    }
    plugin.setLog({
      url: "/pages/newLogin/login/login",
      pageId: "WLogin_Diversion",
    });
    util.setCustomNavigation();
    this.getWxcode();
    this.setFingerData();

    // todo
    const app = getApp();
    app.globalData.loginByMp = app.globalData.loginByMp || loginByMp || "";
    app.globalData.redirectUrl =
      app.globalData.redirectUrl || redirectUrl || "";
    wx.login({
      success: (res = {}) => {
        this.setData({
          code: res.code,
        });
        wx.setStorageSync("JDHasUseLogin", true);
        wx.setStorageSync("code", res.code);
      },
    });
  },
  setFingerData() {
    fm.config(this, { bizKey: plugin.bizKey });
    fm.init();
    fm.getEid((res = {}) => {
      plugin.setJdStorageSync("finger_tk", res.tk);
    });
  },
  // 拒绝协议
  reject() {
    let { rejectReturnPage, rejectPageType } = this.data.config;
    if (rejectReturnPage) {
      wx[`${rejectPageType}` || "rejectTo"]({ url: rejectReturnPage });
    } else {
      wx.navigateBack();
    }
  },
  // pv埋点上报
  pvFunc(back) {
    let recommendObj = this.data.recommendObj || {};
    let { prePageName = '' } = recommendObj
    if (prePageName) {
      pvBuriedV2_({
        create_time: new Date(),
        page_par: {
         
        },
        currentPageName: recommendObj.currentPageName || "",
        prePageName: recommendObj.prePageName || "",
        pageId: recommendObj.pageIdFirstPage || "",
        isBack: back || "",
      });
    }
  },
  onShow() {
    plugin.pvLog();
    let { recommendObj = {} } = this.data;
    if (this.data.returnBack == "true") {
      let pt_key = plugin.getPtKey();
      if (pt_key) {
        wx.showLoading({
          title: "登录中...",
          mask: true,
        });
        reqLoginNew({
          type: 1, //标识登录
        })
          .then((res) => {
            wx.hideLoading();
            if (res == "loginSuccess") {

              this.successCallback();
              // 首页新人楼层，直接进入单品单结
              let homeSingleProductObj = getApp().homeSingleProductObj;
              if(homeSingleProductObj){
                // util.handleSingleProduct(homeSingleProductObj)
                  let { to = '', params = {}, userAction = '', btnTo = '',btnParams = {} } = homeSingleProductObj.currentTarget.dataset.item || {} || {};
                  let {
                      skuId = '',
                      orgCode = '',
                      storeId = '',
                      preSaleSkuInfos = {}
                  } = to == 'forceReCheckToSettlement' ? params : btnParams;
                  // 需要校验是否登陆、是否有库存  医药小程序和到家是否做区分
                  const { functionId, appVersion } = FNIDS.verifySettleForSkuList;
                  request({
                    functionId,
                    appVersion,
                    method: 'POST',
                    body: {
                        storeId: storeId,
                        orgCode: orgCode,
                        skuList:[
                            {
                                id: skuId,
                                num: preSaleSkuInfos.skuCount || 1
                            }
                        ],
                        fromSource: 5,
                        verifyResource: 1,
                        pageSource: "home",
                    },
                    isNeedDealError: true,
                    preObj: this.data.recommendObj || {}
                  })
                  .then((subRes) => {
                          const { data: { code,msg } = {} } = subRes;
                          getApp().homeSingleProductObj = null;
                          if (code == 0) {
                              if(to && JSON.stringify(params) != '{}'){
                                  djCmsJump({
                                      to: 'Settlement',
                                      params: to == 'forceReCheckToSettlement' ? params : btnParams,
                                      userAction: userAction,
                                      preObj: recommendObj
                                  })
                              }
                          }else{
                            util.showDialog({
                              text: msg,
                              isClose: true,
                            })
                          }
                  })
                  .catch((err) => {
                      // console.log('---2222----err------',err);
                      // getApp().homeSingleProductObj = null;
                      // util.showDialog({
                      //   text: '请求失败',
                      //   isClose: true,
                      // })
                    
                  });
              }else{
                wx.navigateBack();
              }
              utils.refreshHomePage();
            } else {
              wx.showToast({
                title: "登录失败",
                icon: "none",
              });
            }
          })
          .catch((err) => {
            wx.hideLoading();
          });
      }
    }
  },

  successCallback() {
    try {
      let pages = getCurrentPages();
      const app = getApp();
      // 登录后如果全局有推广分销参数，上报推广信息
      if (app.globalData && app.globalData.qrcode.pushUserId) {
        reportPromote({
          pushUserId: app.globalData.qrcode.pushUserId || "",
          business: app.globalData.qrcode.business || "",
        });
      }
      for (let page of pages) {
        if (page && page.route == "pages/coupon/voucher/index") {
          page.setData({
            reRequest: true,
          });
          break;
        }
      }
    } catch (e) {
      console.error("successCallback error:", e);
    }
  },
});
let plugin = requirePlugin("loginPlugin");
import ParamsSign from '../../miniprogram_npm/@legos/js-security-jdxcx/index'; 
// 设置延签加固
plugin.setParamsSign && plugin.setParamsSign(ParamsSign);
import {
  request,
  FNIDS
} from '../../common/util/api'
(function () {
  if (console.jdLoginLog) return
  let normalLog = console.log;
  console.jdLoginLog = (...args) => {
    args.unshift('-------登录插件-------')
    normalLog && normalLog(...args);
  }
})()

const utils = {
  showDialog(content){
    wx.showModal({
      title: '提示',
      content: content.text,
      confirmText:content.confirmText||"返回首页",
      cancelText:content.cancelText||"取消",
      showCancel: content.showCancel||false,
      success: function (res) {
        if (res.confirm) {
          if (content.isClose) {
            wx.navigateBack({
              delta: 1,
              success: function (res) { },
              fail: function () { },
              complete: function () { }
            })
          }
        }
      }
    })
  },
  // 校验首页单品单结算
  handleSingleProduct(e){
    let { to = '', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
    let {
        skuId = '',
        orgCode = '',
        storeId = '',
        preSaleSkuInfos = {}
    } = params
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
    })
    .then((res) => {
            const { data: { code,msg } = {} } = res;
            if (code == 0) {
                if(to && JSON.stringify(params) != '{}'){
                    pvLiveBuried_({
                        page_par: {
                            userAction,
                        }
                    })
                    djCmsJump({
                        to: 'Settlement',
                        params: params,
                        userAction: userAction
                    })
                }
            }else{
              utils.showDialog({
                text: msg,
                isClose: true,
              })
            }
            getApp().homeSingleProductObj = null;
    })
    .catch((err) => {
        // console.log(err);
        getApp().homeSingleProductObj = null;
        utils.showDialog({
          text: '请求失败',
          isClose: true,
        })
       
    });
  },
  redirectPage(url) {
    wx.redirectTo({
      url
    });
  },
  redirectToH5({ page, wvroute }) {
    let url = plugin.formH5Url({ page: decodeURIComponent(page), wvroute })
    utils.redirectPage(url)
  },
  navigateToH5({ page, wvroute }) {
    let url = plugin.formH5Url({ page: decodeURIComponent(page), wvroute })
    wx.navigateTo({ url })
  },
  setLoginParamsStorage(obj = {}) {      
    plugin.setLoginStorageSync(utils.getLoginConfig(obj));
  },
  /*
  首页存缓存逻辑（兼容不适用loginConfig直接存缓存）：
  同名参数优先级：url 中参数 > loginConfig > 缓存中
  */
  getLoginConfig(obj = {}) {
    //兼容缓存中有returnPage， 传递的参数中无，塞缓存时会用缓存中的值，导致不匹配
    const handleUndefinedType = (o={})=>{
      let { pageType = 'redirectTo' } = o
      o.pageType = pageType;
      return o
    }
    let storageConfig = plugin.getLoginParams();
    let config = handleUndefinedType(utils.getDefaultConfig());
    let loginParams = { ...storageConfig, ...config };
    if (plugin.isObject(obj)) {
      loginParams = { ...loginParams, ...handleUndefinedType(obj) }
    } else {
      console.jdLoginLog('登录参数必须为对象')
    }
    return loginParams
  },
  getDefaultConfig() {
    let lgConfig;
    try {
      lgConfig = require("./config.js");
    } catch (err) {
      lgConfig = {};
    }
    return lgConfig.config || {}
  },
  handleJump(p = {}) {
    let { goback, pluginUrl, riskUrl } = p;
    if (goback) {
      utils.goBack();
      return
    }
    if (pluginUrl) {
      utils.redirectPage(pluginUrl);
      return
    }
    riskUrl && utils.redirectToH5({ page: riskUrl })
  },
  goBack() {
    let params = plugin.getLoginParams(),
      { returnPage, pageType } = params;
    if (!returnPage) {
      wx.showToast({
        title: '没有returnPage，无法跳转',
        icon: 'none'
      })
      return
    }
    if (pageType !== 'h5') {
      returnPage = decodeURIComponent(returnPage);
    }
    switch (pageType) {
      case 'switchTab':
        wx.switchTab({
          url: returnPage
        })
        break
      case 'h5':
        utils.redirectToH5({ page: returnPage })
        break
      case 'reLaunch':
        wx.reLaunch({ url: returnPage })
        break
      default:
        utils.redirectPage(returnPage)
    }
  },
  h5Init(options) {
    let p = plugin.getLoginParams();
    if (plugin.isEmptyObj(p)) utils.setLoginParamsStorage(options)
  },
  setCustomNavigation() {
    let { navigationBarColor, navigationBarTitle } = plugin.getLoginParams();
    plugin.isObject(navigationBarColor) && wx.setNavigationBarColor(navigationBarColor);
    plugin.isObject(navigationBarTitle) && wx.setNavigationBarTitle(navigationBarTitle);
  },
  requestWithLoginStatus(obj = {}) {
    obj.header = obj.header || {};
    let [GUID = '', KEY = '', TOKEN = '', PIN = ''] = plugin.getJdListStorage(['guid', 'pt_key', 'pt_token', 'pt_pin']),
      _cookie = `guid=${GUID}; pt_pin=${encodeURIComponent(PIN)}; pt_key=${KEY}; pt_token=${TOKEN}`,
      { cookie } = obj.header ;
    obj.header.cookie = cookie ? `${cookie};${_cookie}` : _cookie;
    wx.request(obj)
  },

  silentauthlogin(options, goToLogin, callback) {
    wx.login({
        success(res = {}) {
            let { code } = res;
            if (code) {
                utils.setLoginParamsStorage(options);
                plugin.silentauthlogin({ ...options, code }, goToLogin)
                    .then((res) => {
                        callback && callback();
                    })
                    .catch((res) => {
                        callback && callback();
                        console.jdLoginLog('请重试一次');
                    });
            } else {
                callback && callback();
                console.jdLoginLog('wx.login 获取code失败');
            }
        },
        fail() {
            callback && callback();
        },
    });
  }
}

export default utils

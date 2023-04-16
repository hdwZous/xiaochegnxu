let plugin = requirePlugin("loginPlugin");
import {
    reqLoginNew
} from "../../common/util/reqLogin.js"

const utils = {
  redirectPage(url) {
    wx.redirectTo({
      url
    });
  },
  redirectToH5({ page, wvroute }) {
    let url = plugin.formH5Url({ page: decodeURIComponent(page), wvroute });
    utils.redirectPage(url)
  },
  navigateToH5({ page, wvroute }) {
    let url = plugin.formH5Url({ page: decodeURIComponent(page), wvroute });
    wx.navigateTo({ url })
  },
  setLoginParamsStorage(obj = {}) {
    plugin.setLoginStorageSync(utils.getLoginConfig(obj));
  },
  getLoginConfig(obj = {}) {
    /*
  首页存缓存逻辑（兼容不适用loginConfig直接存缓存）：
  同名参数优先级：url 中参数 > loginConfig > 缓存中
  */
    let storageConfig = plugin.getLoginParams();
    let config = utils.getDefaultConfig();
    let loginParams = { ...storageConfig, ...config };
    if (plugin.isObject(obj)) {
      loginParams = { ...loginParams, ...obj }
    } else {
      console.jdLoginLog('登录参数必须为对象')
    }
    return loginParams
  },
  getDefaultConfig() {
    let lgConfig;
    try {
      lgConfig = getApp().globalData.config;
    } catch (err) {
      lgConfig = {};
    }
    return lgConfig.config || {}
  },
  handleJump(p = {}) {
    let { goback, pluginUrl, riskUrl } = p;
    if (goback) {
        if (plugin.getPtKey()) {
            reqLoginNew({
                type: 1, //标识登录
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
        } else {
            utils.goBack();
        }
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
      });
      return
    }
    if (pageType !== 'h5') {
      returnPage = decodeURIComponent(returnPage);
    }
    switch (pageType) {
      case 'switchTab':
        wx.switchTab({
          url: returnPage
        });
        break;
      case 'h5':
        utils.redirectToH5({ page: returnPage });
        break;
      case 'reLaunch':
        wx.reLaunch({ url: returnPage });
        break;
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
  requestWithLoginStatus({
    url,
    data,
    header = {},
    method,
    dataType,
    responseType,
    success,
    fail,
    complete
  }) {
    let { cookie = '' } = header,
    [GUID = '', KEY = '', TOKEN = '', PIN = ''] = plugin.getJdListStorage(['guid', 'pt_key', 'pt_token', 'pt_pin']),
    _cookie = `guid=${GUID}; pt_pin=${encodeURIComponent(PIN)}; pt_key=${KEY}; pt_token=${TOKEN}`;
    header.cookie = `${cookie};${_cookie}`;
    wx.request({
      url,
      data,
      header,
      method,
      dataType,
      responseType,
      success,
      fail,
      complete
    })
  }
};

export default utils

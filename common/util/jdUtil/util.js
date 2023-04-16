import serverApi from './server.js';
import Mmd5 from './Mmd5.js';
import { request, FNIDS } from '../api';
// import config from '../config'
let globalData = getApp().globalData;

let app = getApp();
let appid = app.jdAppId,
  wxversion = globalData.config.appId;

// const DEFAULT_APPID = 121;

function wxAjax({
  url,
  method = 'GET',
  data,
  header,
  callback
}) {
  const CONTENT_TYPE = 'application/x-www-form-urlencoded',
    DEFAULT_HEADER = {
      'content-type': CONTENT_TYPE,
      'cookie': setCookie()
    };
  wx.showLoading({
    title: '请求中...',
  })
  wx.request({
    url,
    data,
    method,
    header: header || DEFAULT_HEADER,
    complete: (res) => {
      wx.hideLoading()
      let {
          statusCode,
          data
        } = res,
        isSuccess = statusCode >= 200 && statusCode < 300 || statusCode === 304;
      data = data || {}; //兼容null
      data.isSuccess = isSuccess;
      data.wxStatus = isSuccess ? 'success' : 'fail';
      callback(data);
    },
    fail: (res) => {
      wx.showToast({
        title: res.errMsg,
        icon: "none"
      })
    }
  })
}

function setCookie() {
  const GUID = wx.getStorageSync('jdlogin_guid') || '',
    LSID = wx.getStorageSync('jdlogin_lsid') || '',
    PIN = wx.getStorageSync('jdlogin_pt_pin') || '',
    KEY = wx.getStorageSync('jdlogin_pt_key') || '',
    TOKEN = wx.getStorageSync('jdlogin_pt_token') || '';
  return `guid=${GUID}; lsid=${LSID}; pt_pin=${PIN}; pt_key=${KEY}; pt_token=${TOKEN}`
}

function smslogin({
  code,
  wxUserInfo,
  jdlogin,
  callback
}) {
  let {
    iv,
    encryptedData
  } = wxUserInfo;
  if (jdlogin) {
    code = '';
    iv = '';
    encryptedData = '';
    ['jdlogin_guid', 'jdlogin_lsid', 'jdlogin_pt_pin', 'jdlogin_pt_key', 'jdlogin_pt_tokenS'].forEach((item) => {
      wx.removeStorageSync(item)
    })
  }
  let data = {
    appid,
    wxversion,
    code,
    user_data: encryptedData,
    user_iv: iv,
  }
  wxAjax({
    url: serverApi.smslogin,
    data,
    method: 'POST',
    callback
  })
}

function smslogin_sendmsg({
  sdk_ver,
  mobile,
  callback
}) {
  const MD5_SALT = 'Abcdg!ax0bd39gYr3zf&dSrvm@t%a3b9';
  let commonStr = `appid=${appid}&mobile=${mobile}`;
  let sign = sdk_ver == 2 ? `${commonStr}&wxappid=${wxversion}${MD5_SALT}` : `${commonStr}${MD5_SALT}`;
  let md5Sign = Mmd5().hex_md5(sign);
  let url = `${serverApi.smslogin_sendmsg}?${commonStr}&sign=${md5Sign}`;
  wxAjax({
    url,
    callback
  })
}

function dosmslogin({
  mobile,
  smscode,
  callback
}) {
  let data = {
    mobile,
    smscode
  }
  wxAjax({
    url: serverApi.dosmslogin,
    data,
    method: 'POST',
    callback,
  })
}

function goBack({
  returnPage,
  pageType
}) {
  returnPage = decodeURIComponent(returnPage);
  switch (pageType) {
  case 'switchTab':
    wx.switchTab({
      url: returnPage
    })
    break
  case 'h5':
    h5JumpOnly(returnPage)
    break
  default:
    wx.redirectTo({
      url: returnPage
    });
  }
}

//只做跳转，其他逻辑在web-view中执行
function h5JumpOnly(page) {
  wx.redirectTo({
    url: '../web-view/web-view?h5_url=' + encodeURIComponent(page),
  })
}

function tokenLogin({
  token,
  callback
}) {
  let data = {
    token,
    appid
  }
  wxAjax({
    url: serverApi.tokenlogin,
    data,
    method: 'POST',
    callback,
  })
}

function smslogin_checkreceiver({
  mobile,
  receiver,
  callback
}) {
  let data = {
    mobile,
    receiver,
  }
  wxAjax({
    url: serverApi.smslogin_checkreceiver,
    data,
    method: 'POST',
    callback,
  })
}


function wxconfirmlogin({
  wx_token,
  callback
}) {
  let data = {
    wx_token,
  }
  wxAjax({
    url: serverApi.wxconfirmlogin,
    data,
    method: 'POST',
    callback,
  })
}

//退出登录
function logout(resultCallback) {
  //从京东系统退出登录
  wxAjax({
    url: `${serverApi.logout}?appid=${appid}`,
    callback: (res = {}) => {
      let {
        isSuccess
      } = res;
      if (isSuccess) {
        //调用到家自己系统退出登录
        logoutSelf(resultCallback);
      } else {
        logoutFailHint('退出登录失败稍后再试!');
      }
    }
  })
}

//从到家自己系统退出登录
function logoutSelf(resultCallback) {
  let { functionId = '', appVersion = '' } = FNIDS.selfLogout
  request({
    method: "POST",
    functionId,
    appVersion,
    body: {},
  }).then(res => {
    let result = res.data.result;
    if (result) {
      wx.setStorageSync('userInfo', {})
      app.globalData.userInfo = null;
      wx.setStorageSync('login_info', {});
      app.globalData.loginStateInfo = {};
      ['jdlogin_pt_key', 'jdlogin_pt_pin', 'jdlogin_pt_token'].forEach((item) => { wx.removeStorageSync(item) })
      resultCallback(result);
    } else {
      logoutFailHint(res.data.errMsg);
    }
  }).catch(() => {
    logoutFailHint('退出登录失败稍后再试!');
  })
}

function logoutFailHint(msg) {
  wx.showToast({
    title: msg,
  })
}

//检测是否能登录
function checkLogin(obj) {
  var flag = true;
  for (var key in obj) {
    if (!obj[key]) {
      flag = false;
      return flag;
    }
  }
  return flag;
}

//验证是否为手机号码
function checkPhone(phone) {
  var pattern = /^1[3-9][0-9]{9}$/;
  return pattern.test(phone);
}

function setCommonStorage(params = {}) {
  let {
    pt_key,
    pt_token,
    expire_time,
    refresh_time,
    pt_pin
  } = params;
  let temp = [{
    key: 'jdlogin_pt_pin',
    val: pt_pin
  }, {
    key: 'jdlogin_pt_key',
    val: pt_key
  }, {
    key: 'jdlogin_pt_token',
    val: pt_token
  }, {
    key: 'jdlogin_pt_key_expire_time',
    val: expire_time
  }, {
    key: 'jdlogin_pt_key_refresh_time',
    val: refresh_time
  }]
  setListStorage(temp);
}

function setListStorage(list = []) {
  list.forEach((item = {}) => {
    let {
      key,
      val
    } = item;
    val && wx.setStorageSync(key, val);
  })
}

function doSure({
  wx_token,
  // _data,
  // from,
  callback
}) {
  wxconfirmlogin({
    wx_token,
    callback
  })
}

function toMobilePage({
  returnPage,
  pageType
}) {
  wx.redirectTo({
    url: `/pages/newLogin/login-mobile/login-mobile?&returnPage=${returnPage}&pageType=${pageType}`
  })
}

function setConfirmLoginStorage(params) {
  let {
    pt_pin,
    pt_key,
    pt_token
  } = params;
  try {
    let temp = [{
      key: 'jdlogin_pt_pin',
      val: pt_pin
    }, {
      key: 'jdlogin_pt_key',
      val: pt_key
    }, {
      key: 'jdlogin_pt_token',
      val: pt_token
    }, {
      key: 'login_flag',
      val: true
    }]
    setListStorage(temp);
  } catch (e) {
    // console.log(e);
  }
}

function getQuery({
  str = '',
  key
}) {
  let index = str.indexOf('?')
  str = index === -1 ? str : str.slice(index + 1)
  let args = str.split('&');
  for (let i = 0, len = args.length; i < len; i++) {
    let arr = args[i].split('=');
    if (arr[0] == key) {
      return arr[1]
    }
  }
}

export default {
  smslogin,
  smslogin_sendmsg,
  dosmslogin,
  goBack,
  smslogin_checkreceiver,
  wxconfirmlogin,
  logout,
  checkPhone,
  checkLogin,
  h5JumpOnly,
  wxAjax,
  setCommonStorage,
  setListStorage,
  doSure,
  toMobilePage,
  getQuery,
  tokenLogin,
  setConfirmLoginStorage
}

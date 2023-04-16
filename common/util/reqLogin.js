import {
  request,
  FNIDS,
  requestUserBuried
} from './api';

import {
  isLogin
} from '../../common/util/loginUtil';
// import util from "../../common/util/jdUtil/util.js"
import mp from "./wxapi";
var app = getApp();
// todo 获取wxCode
function getWxCode() {
  return new Promise(function (resolve, reject) {
    // todo util方法
    wx.login({
      success(res) {
        if (res.code) {
          try {
            wx.setStorageSync('JDHasUseLogin', true);
            wx.setStorageSync('code', res.code);
            resolve(res.code)
          } catch (e) {
            reject(e)
          }
        } else {
          reject(res.errMsg);
        }
      }
    })
  })
}

// 请求登录或获取unionId
function reqLoginNew(requestEntity) {
  return new Promise((resolve, reject) => {
    mp.getLoginCode().then((res) => {
      return loginByPtKeyNew(requestEntity, res)
    }).then((res) => {
      resolve(res)
    })
  })

}
// 登录接口
function loginByPtKeyNew(requestEntity, code) {
  let pages = getCurrentPages();
  let pagesLen = pages.length;
  //拼团 0;砍价 1;0元抽奖 2;老带新团 3;助力 4;裂变 5;砍订单 6
  let regChannel = "";
  let lastPage = pages[pagesLen - 2] || {};
  if (pagesLen >= 2) {
    if (lastPage.route && lastPage.route.indexOf("pages/groupBuy") >= 0) {
      regChannel = 0;
    } else if (lastPage.route && lastPage.route.indexOf("pages/bargain") >= 0) {
      regChannel = 1;
    } else if (lastPage.route && lastPage.route.indexOf("pages/lottery") >= 0) {
      regChannel = 2;
    } else if (
      lastPage.route && lastPage.route.indexOf("pages/groupBuy/oldInviteNew") >= 0
    ) {
      regChannel = 3;
    } else if (lastPage.route && lastPage.route.indexOf("pages/friendHelp") >= 0) {
      regChannel = 4;
    } else if (
      lastPage.route && lastPage.route.indexOf("pages/redPacketFission") >= 0
    ) {
      regChannel = 5;
    } else if (
      lastPage.route && lastPage.route.indexOf("pages/hackOrder-t") >= 0
    ) {
      regChannel = 6;
    }
  }
  return new Promise((resolve, reject) => {
    var content = {
      "code": code
    };
    if (requestEntity.wxUserInfo || requestEntity.code) {
      content = {
        "encryptedData": requestEntity.wxUserInfo.encryptedData,
        "iv": requestEntity.wxUserInfo.iv,
        "signature": requestEntity.wxUserInfo.signature,
        "code": requestEntity.code,
      }
    }
    let { functionId = '', appVersion = '' } = FNIDS.loginByPtKeyNew;
    let app = getApp();
    request({
      functionId,
      appVersion,
      isNeedDealError: true,
      content: content,
      "body": {
        "fromSource": 5,
        "businessChannel": app.globalData.qrcode.business || "",
        "subChannel": app.globalData.qrcode.channel || "",
        "regChannel": regChannel || "",
      }
    }).then((res) => {
      if (res.data.code == '0') {
        // 保存用户登录态信息
        if (res.data.result) {
          var result = res.data.result;
          let loginInfo = {};
          let originInfo = {};
          try {
            loginInfo = wx.getStorageSync('login_info') || {}
          } catch (e) {

          }
          if (!result.unionid_pdj_jd_new && loginInfo.unionid_pdj_jd_new) {
            result.unionid_pdj_jd_new = loginInfo.unionid_pdj_jd_new
          }
          if (!app.globalData.loginStateInfo.PDJ_H5_PIN && loginInfo.PDJ_H5_PIN) {
            originInfo = loginInfo
          } else {
            originInfo = app.globalData.loginStateInfo
          }
          app.globalData.loginStateInfo = Object.assign({}, originInfo, result);
          if ((requestEntity.type != undefined) || (requestEntity.wxUserInfo && !isLogin())) {
            /***
             * 微信用户信息存储时机：
             * 登录且返回unionid_pdj_jd_new时；
             * 微信授权但未登录时
             * 目的是为了防止一个openId对应多个用户，后台信息存储时覆盖
             */
            saveWxUserInfo(result);
          }
          // 增加用户登陆后的信息上报
          const { getNewOpenId } = require("./services");
          getNewOpenId(1);
          // 增加用户登陆后的信息上报
          if (isLogin()) {
            wx.setStorageSync('JDHasUseLogin', true);
          }
          try {
            console.log('login_info=======>', app.globalData.loginStateInfo);
            console.log('login_info result=======>', result);
            wx.setStorageSync('login_info', app.globalData.loginStateInfo);
            let { nickname = "", avatar = "" } = app.globalData.loginStateInfo;
            if (nickname || avatar) {
              wx.setStorageSync('wxUserInfo', {
                nickName: nickname,
                avatarUrl: avatar
              });
            }
          } catch (e) { }
          // 判断是否是新用户
          app.globalData.isNewUser = result.newReg;
          var newPeople;
          if (res.data.result.newReg) {
            newPeople = 3;
          } else {
            newPeople = 2;
          }
          requestUserBuried(newPeople); //埋点
          resolve("loginSuccess")
        } else {
          wx.showToast({
            title: '无返回数据',
            icon: "none"
          })
        }
      } else {
        if (requestEntity.needNoTip) {
          return false
        }
        if (res.data.code == 'xapp0090') {
          // 不存在用户
          wx.showModal({
            title: '请您登录',
            content: '若您是新用户，完成登录可领新人红包',
            confirmText: '登录',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/newLogin/login/login'
                })
              } else {
                var info = getCurrentPages();
                if (info.length && info.length > 1) {
                  wx.navigateBack();
                }
              }
            }
          })
        } else {
          resolve("fail");
          wx.showModal({
            title: '提示',
            content: res.data.msg,
          })
        }
      }
    }).catch((e) => {
      console.log(e)
      resolve("fail")
    })
  })
}

// 保存微信用户信息
function saveWxUserInfo(res) {
  let wxInfo = {};
  try {
    wxInfo = wx.getStorageSync('wxUserInfo');
  } catch (e) { }
  let { functionId = '', appVersion = '' } = FNIDS.saveWxUserInfo
  request({
    functionId,
    appVersion,
    isForbiddenDialog: true,
    method: "POST",
    body: {
      openId: res.openId,
      unionId: res.unionid_pdj_jd_new,
      nickName: wxInfo.nickName || res.nickname,
      nickHeadUrl: wxInfo.avatarUrl || res.avatar
    }
  }).then(res => {

  })
}

module.exports = {
  reqLoginNew: reqLoginNew,
  saveWxUserInfo: saveWxUserInfo
};

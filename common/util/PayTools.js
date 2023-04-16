/**
 *
 * @param options
 * @param successCall
 * @param failCall
 */
import {
  isLogin
} from './loginUtil'
import { request } from './api'
import mp from "./wxapi";

function requestSign(options, successCall, failCall) {
  //获取openId
  options.openId = getApp().requestLoginEntity.openId || wx.getStorageSync("login_info").openId;
  //团长代收
  if (options.groupMode == 1) {
    options.functionId = "tx/core/unifiedPay";
    options.body = {
      "paySource": options.paySource || 101, 
      "openId": options.openId,
      "orderId": options.orderId,
      "payMode": options.payMode || 10,
    };
  } else {
    options.functionId = "tx/core/unifiedOrder";
    options.body = {
      "tradeName": options.payName,
      "merchantOrderNum": options.orderId,
      "orderId": options.orderId,
      "paySuccessUrl": "https://daojia.jd.com/html/index.html#orderopresult/result:success/payType:pay/orderId:" + options.orderId + '/payStageType:' + options.payStageType,
      "successUrl": "https://daojia.jd.com/html/index.html#orderopresult/result:success/payType:pay/orderId:" + options.orderId + '/payStageType:' + options.payStageType,
      "paySource": options.paySource || 27,
      "osVersion": "",
      "openId": options.openId,
      "payMode": options.payMode || 10,
      "payStageType": options.payStageType || ''
    };
  }
  if (options.openId) {
    pay(options, successCall, failCall);
    return;
  }
  getOpenId(options, successCall, failCall)
}

function showToast(text, flag) {
  if (flag == 0) {
    wx.showToast({
      title: text,
      icon: 'success',
    })
  } else {
    wx.showToast({
      title: text,
      image: '/images/common_icon_warn.png',
    })
  }

}

/**
 * 调起支付
 */
function pay(options, successCall, failCall) {
  var isSucess = false;
  request({
    method: "POST",
    functionId: options.functionId,
    body: options.body,
  }).then(res => {
    var response = res.data;
    // 轻松购埋点
    var pages = getCurrentPages();
    if (pages.length > 0) {
      pages.forEach(item => {
        if (item && (item.route == 'pages/easyGo/shoppingCart/index') && response.result) {
          item.reportWeChat(response.result.out_trade_no)
        }
      })
    }
    if (response != null) {
      if (response.code == '0') {
        isSucess = true;
        if (response.result) {
          payImpl(response.result, successCall, failCall);
        } else {
          successCall && successCall()
        }
      } else {
        showToast(response.msg)
      }
    } else {
      showToast('接口异常');
    }
    if (!isSucess && failCall) {
      failCall();
    }
  }).catch(() => {
    if (!isSucess && failCall) {
      failCall();
    }
  })
}

//调用微信接口进行支付
function payImpl(options, successCall, failCall) {
  wx.requestPayment({
    appId: options.appid,
    timeStamp: options.timestamp,
    nonceStr: options.noncestr,
    package: "prepay_id=" + options.prepayid,
    signType: options.signType || 'MD5',
    paySign: options.sign,
    success: function (res) {
      showToast('支付成功', 0);
      if (successCall) {
        successCall(res, options);
      }
    },
    fail: function (res) {
      showToast('支付失败', 1);
      if (failCall) {
        failCall(res, options);
      }
    },
    complete: function () { }
  })
}

//获取openId
function getOpenId(options, successCall, failCall) {
  const app = getApp();
  mp.getOpenId().then(openId => {
    mp.getLoginCode().then(code => {
      app.requestLoginEntity.wechatCode = code;
      // 保存openId
      app.requestLoginEntity.openId = openId;
      options.openId = openId;
      options.body.openId = openId;
      pay(options, successCall, failCall);
    }).catch(() => {
      wx.showModal({
        "title": "提示",
        "content": "网络有问题,请稍后重试",
        "showCancel": false
      })
    })
  }).catch(() => {
    wx.showModal({
      "title": "提示",
      "content": "网络有问题,请稍后重试",
      "showCancel": false
    })
  })
}

//轻松购-自助收银支付专用
function requestSignEasyGo(options, successCall, failCall) {
  let login = isLogin();
  //如果是登录状态，则传给后台openId
  if (login) {
    //获取openId
    let openId = getApp().requestLoginEntity.openId || wx.getStorageSync("login_info").openId;
    if (openId) {
      options.openId = openId;
      payEasyGo(options, successCall, failCall)
    } else {
      getEasyGoOpenId(options, successCall, failCall)
    }
  }
  //如果是未登录状态-不用传openId
  else {
    options.openId = '';
    payEasyGo(options, successCall, failCall)
  }
}

//调起支付-轻松购-自助收银支付专用
function payEasyGo(options, successCall, failCall) {
  wx.requestPayment({
    appId: options.wxPrePayResult.appid,
    timeStamp: options.wxPrePayResult.timestamp,
    nonceStr: options.wxPrePayResult.noncestr,
    package: "prepay_id=" + options.wxPrePayResult.prepayid,
    signType: 'MD5',
    paySign: options.wxPrePayResult.sign,
    success: function (res) {
      showToast('支付成功', 0);
      if (successCall) {
        successCall(res);
      }
    },
    fail: function (res) {
      showToast('支付失败');
      if (failCall) {
        failCall(res);
      }
    },
    complete: function () {

    }
  })
}

//轻松购-获取openId
function getEasyGoOpenId(options, successCall, failCall) {
  const app = getApp();
  mp.getOpenId().then(openId => {
    mp.getLoginCode().then(code => {
      app.requestLoginEntity.wechatCode = code;
      options.openId = openId;
      payEasyGo(options, successCall, failCall)
    }).catch(() => {
      wx.showModal({
        "title": "提示",
        "content": "网络有问题,请稍后重试",
        "showCancel": false
      })
    })
  }).catch(() => {
    wx.showModal({
      "title": "提示",
      "content": "网络有问题,请稍后重试",
      "showCancel": false
    })
  })
}

module.exports = {
  requestSign: requestSign,
  requestSignEasyGo: requestSignEasyGo,
  requestPay: payImpl,
};
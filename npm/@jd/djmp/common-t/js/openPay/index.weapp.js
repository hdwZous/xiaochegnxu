"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.openPay=void 0;var _indexWeapp=require("../taroapi/index.weapp.js"),openPay=exports.openPay=function(e){return new Promise(function(p,n){wx.requestPayment({appId:e.appid,timeStamp:e.timestamp,nonceStr:e.noncestr,package:"prepay_id="+e.prepayid,signType:e.signType||"MD5",paySign:e.sign,success:function(e){(0,_indexWeapp.showToast)({title:"支付成功!"}),p(e)},fail:function(e){(0,_indexWeapp.showToast)({title:"支付失败!"}),n(e)}})})};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.pay_weapp=void 0;var _indexWeapp=require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_indexWeapp2=require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),pay_weapp=exports.pay_weapp=function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return new Promise(function(p,i){wx.requestPayment({appId:a.appid,timeStamp:a.timestamp,nonceStr:a.noncestr,package:"prepay_id="+a.prepayid,signType:a.signType||"MD5",paySign:a.sign,success:function(e){(0,_indexWeapp.showToast)({title:"支付成功!"}),p(e)},fail:function(e){(0,_indexWeapp.showToast)({title:"支付失败!"}),i(e);e={data:JSON.stringify(a),error:JSON.stringify(e)};(0,_indexWeapp2.clickReport)({create_time:new Date,click_id:"weappWxPay",click_par:e})}})})};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.request=void 0;var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_indexWeapp=require("../storage/index.weapp.js"),_indexWeapp2=require("../../constants/index.weapp.js"),_indexWeapp3=require("../utils/index.weapp.js"),_indexWeapp4=require("../getApp/index.weapp.js"),_indexWeapp5=_interopRequireDefault(_indexWeapp4),_aesUtils=require("../utils/aes.utils.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var decryptFail=!1,request=exports.request=function(){var e,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=(0,_indexWeapp5.default)(),d="https://"+t._independent_.config.HOST+"/client?functionId="+n.functionId,i=(0,_indexWeapp.getStorageSync)(_indexWeapp2.ADDRESS_INFO)||{},a=(0,_indexWeapp.getStorageSync)(_indexWeapp2.REAL_ADDRESS_INFO)||{},p=(0,_indexWeapp.getStorageSync)(_indexWeapp2.LOGIN_INFO)||{},o={lat:i.latitude||"",lng:i.longitude||"",lat_pos:a.latitude||"",lng_pos:a.longitude||"",city_id:i.cityId||i.areaCode||i.cityCode||"",deviceToken:(0,_indexWeapp3.getDeviceId)(),deviceId:(0,_indexWeapp3.getDeviceId)(),channel:"wx_xcx",mpChannel:t._independent_.mpChannel||"wx_xcx",platform:"8.26.0",platCode:"mini",appVersion:"8.26.0",appName:"paidaojia",deviceModel:"appmodel",xcxVersion:"8.26.0",business:t._independent_.qrcode.business||t.globalData&&t.globalData.qrcode.business||""};for(e in n.body&&"object"===_typeof(n.body)&&(n.body=JSON.stringify(n.body)),n)o[e]=n[e];var r=p.o2o_m_h5_sid||"",a=(0,_indexWeapp3.getDeviceId)(),s="cart_uuid="+a+"; o2o_m_h5_sid="+r+"; deviceid_pdj_jd="+a;return o.signNeedBody=1,o.signKeyV1=(0,_indexWeapp3.genSignKeyV1)(o),decryptFail?new Promise(function(t,i){wx.request({method:n.method||"GET",url:d,data:o,credentials:"include",header:{sid:p[_indexWeapp2.PDJ_H5_SID_KEY]||"",Cookie:s,"content-type":"application/x-www-form-urlencoded;"},success:function(e){e=e.data||{};e.abTest&&(0,_indexWeapp3.updateAb)(e.abTest),e.result&&e.result.abTest&&(0,_indexWeapp3.updateAb)(e.result.abTest),(n.isNeedDealError||0==e.code?t:i)(e)},fail:function(e){i(e)}})}):new Promise(function(t,i){wx.request({method:n.method||"GET",url:d,data:{djencrypt:(0,_aesUtils.encrypt)(JSON.stringify(o))},credentials:"include",header:{sid:r||"",Cookie:s,"content-type":"application/x-www-form-urlencoded;"},success:function(e){e=e.data||{};"110"==e.code&&1==e.type?(decryptFail=!0,wx.request({method:n.method||"GET",url:d,data:o,credentials:"include",header:{sid:p[_indexWeapp2.PDJ_H5_SID_KEY]||"",Cookie:s,"content-type":"application/x-www-form-urlencoded;"},success:function(e){e=e.data||{};e.abTest&&(0,_indexWeapp3.updateAb)(e.abTest),e.result&&e.result.abTest&&(0,_indexWeapp3.updateAb)(e.result.abTest),(n.isNeedDealError||0==e.code?t:i)(e)},fail:function(e){i(e)}})):(e.abTest&&(0,_indexWeapp3.updateAb)(e.abTest),e.result&&e.result.abTest&&(0,_indexWeapp3.updateAb)(e.result.abTest),(n.isNeedDealError||0==e.code?t:i)(e))},fail:function(e){i(e)}})})};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.objToString=exports.countDown=exports.getHrefLocation=exports.getQueryStringHash=exports.getQueryStringNew=exports.getQueryString=exports.getDeviceId=exports.isEmptyObj=exports.getTaroPlatEnv=void 0,exports.updateAb=updateAb,exports.hasOpenPushSetting=hasOpenPushSetting,exports.hasOpenPushSetting1=hasOpenPushSetting1,exports.hasOpenPushSetting2=hasOpenPushSetting2,exports.goOpenPushSetting=goOpenPushSetting,exports.genSignKeyV1=genSignKeyV1;var _indexH=require("../../constants/index.h5.js"),_indexH2=require("../storage/index.h5.js"),_indexH3=require("../cookie/index.h5.js"),_indexH4=require("../env/index.h5.js"),_aesUtils=require("./aes.utils.js"),getTaroPlatEnv=exports.getTaroPlatEnv=function(){return"weapp"},isEmptyObj=exports.isEmptyObj=function(e){for(var n in e)return!1;return!0},getDeviceId=exports.getDeviceId=function(){var e="";return e=(0,_indexH3.getCookie)(_indexH.PDJ_H5_DEVICEID_KEY)?(0,_indexH3.getCookie)(_indexH.PDJ_H5_DEVICEID_KEY):e},getQueryString=exports.getQueryString=function(e,n){var t=new RegExp("[?&]"+e+"=([^&]*)","i"),e=window.location.href.split("?"),e=1<e.length&&e[e.length-1]||"",t=(n||"?&"+e).match(t);return null!=t?unescape(t[1]):""},getQueryStringNew=exports.getQueryStringNew=function(e,n){var t=new RegExp("[?&]"+e+"=([^&]*)","i"),e=window.location.search.split("?"),e=1<e.length&&e[e.length-1]||"",t=(n||"?&"+e).match(t);return null!=t?unescape(t[1]):""},getQueryStringHash=exports.getQueryStringHash=function(e,n){var t=new RegExp("[?&]"+e+"=([^&]*)","i"),e=window.location.hash.split("?"),e=1<e.length&&e[e.length-1]||"",t=(n||"?&"+e).match(t);return null!=t?unescape(t[1]):""},getHrefLocation=exports.getHrefLocation=function(){var e=new RegExp("[?&]djmsg=([^&]*)","i"),n=window.location.href.split("?"),e=(1<n.length&&n[n.length-1]||"").match(e)[1]||"{}",e=(0,_aesUtils.decrypt)(decodeURIComponent(e)),e=JSON.parse(e);return console.log("getHrefLocation------------",e),e},countDown=exports.countDown=function(e,n){var t=void 0;countDownTime(e/=1e3,t,n),e--,t=setInterval(function(){countDownTime(e,t,n),e--},1e3)};function countDownTime(e,n,t){var i=0,o=0,s=0,r=0;0<e&&(i=Math.floor(e/86400),o=Math.floor(e/3600)-24*i,s=Math.floor(e/60)-24*i*60-60*o,r=Math.floor(e)-24*i*60*60-60*o*60-60*s),o<=9&&(o="0"+o),s<=9&&(s="0"+s),r<=9&&(r="0"+r),0<e?t({day:i,hour:o,minute:s,second:r,timer:n,end:!1}):(clearInterval(n),t({hour:"00",minute:"00",second:"00",timer:n,end:!0}))}function updateAb(e){try{var t,i,o=window.h5abtest||(0,_indexH2.getStorageSync)(_indexH.PDJ_H5_ABTEST)||[];"string"==typeof o&&(o=JSON.parse(o)),e instanceof Array?e.forEach(function(t){var i=!0;t.startTime=Date.now(),o.forEach(function(e,n){e.experimentName===t.experimentName&&(o.splice(n,1,t),i=!1)}),i&&o.push(t)}):e&&e.experimentName&&(i=!0,(t=e||{}).startTime=Date.now(),o.forEach(function(e,n){e.experimentName===t.experimentName&&(o.splice(n,1,t),i=!1)}),i&&o.push(t)),window.h5abtest=o,(0,_indexH2.setStorageSync)(_indexH.PDJ_H5_ABTEST,o)}catch(e){}}function hasOpenPushSetting(e){window._hasOpenPushSettingCb=e,_indexH4.isDaojiaApp?"function"==typeof e?"7.4.5"<=_indexH4.djAppVersion?_indexH4.isIOS?_indexH4.supportDJSHWK?window.webkit.messageHandlers.MobileNavi.postMessage({method:"hasOpenPushSetting",callBackName:"hasOpenPushSetting",callBackId:null}):hasOpenPushSetting(e):_indexH4.isAndroid&&window.djJava.hasOpenPushSetting("hasOpenPushSetting"):console.debug("app version not support: 仅支持7.4.5及以上版本！！！"):console.debug("params error: 参数不是function！！！"):console.debug("not dao jia APP: 仅支持到家APP")}function hasOpenPushSetting1(e){window._hasOpenPushSettingCb=e,_indexH4.isDaojiaApp?"function"==typeof e?"7.4.5"<=_indexH4.djAppVersion?_indexH4.isIOS?_indexH4.supportDJSHWK?window.webkit.messageHandlers.MobileNavi.postMessage({method:"hasOpenPushSetting",callBackName:"hasOpenPushSetting",callBackId:null}):hasOpenPushSetting(e):_indexH4.isAndroid&&window.djJava.hasOpenPushSetting("hasOpenPushSetting"):console.debug("app version not support: 仅支持7.4.5及以上版本！！！"):console.debug("params error: 参数不是function！！！"):console.debug("not dao jia APP: 仅支持到家APP")}function hasOpenPushSetting2(n){window.hasOpenPushSetting=function(e){n(e)},_indexH4.isDaojiaApp?"function"==typeof n?"7.4.5"<=_indexH4.djAppVersion?_indexH4.isIOS?_indexH4.supportDJSHWK?window.webkit.messageHandlers.MobileNavi.postMessage({method:"hasOpenPushSetting",callBackName:"hasOpenPushSetting",callBackId:null}):hasOpenPushSetting2(n):_indexH4.isAndroid&&window.djJava.hasOpenPushSetting("hasOpenPushSetting"):console.debug("app version not support: 仅支持7.4.5及以上版本！！！"):console.debug("params error: 参数不是function！！！"):console.debug("not dao jia APP: 仅支持到家APP")}function goOpenPushSetting(){_indexH4.isDaojiaApp?"7.4.5"<=_indexH4.djAppVersion?_indexH4.isIOS?_indexH4.supportDJSHWK?window.webkit.messageHandlers.MobileNavi.postMessage({method:"goOpenPushSetting",callBackName:null,callBackId:null}):goOpenPushSetting():_indexH4.isAndroid&&window.djJava.goOpenPushSetting():console.debug("app version not support: 仅支持7.4.5及以上版本！！！"):console.debug("not dao jia APP: 仅支持到家APP")}window.hasOpenPushSetting=function(e){"function"==typeof window._hasOpenPushSettingCb&&window._hasOpenPushSettingCb(e),window._hasOpenPushSettingCb=null};var objToString=exports.objToString=function(e){function n(e,n){return void 0===n?e+"=":e+"="+n}if("[object Object]"!==Object.prototype.toString.call(e))return"";var t,i,o="",s=!0;for(t in e)e.hasOwnProperty(t)&&(i=e[t],s?(o+="?"+n(t,i),s=!1):o+="&"+n(t,i));return o};function genSignKeyV1(e){var n=e,t={};Object.keys(n).sort().forEach(function(e){"functionId"!=e&&(t[e]=n[e])});var i=Object.values(t).filter(function(e){if(""!=e)return e});require("./crypto-js/core.js"),require("./crypto-js/hmac.js"),require("./crypto-js/sha256.js");var o=require("./crypto-js/hmac-sha256.js"),e=require("./crypto-js/enc-hex.js"),i=o(i.join("&"),"923047ae3f8d11d8b19aeb9f3d1bc200");return e.stringify(i)}
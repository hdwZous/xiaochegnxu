"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getPlateCode=exports.checkDateForPop=exports.clickAnimation=exports.getWaterAnimationName=exports.clickAnimationName=exports.clickAnimationGap=exports.countDown=exports.checkTaskBrowseOrchard=exports.resetTaskBrowseOrchard=exports.getTaskBrowseOrchard=exports.saveTaskBrowseOrchard=exports.getUserId=exports.getInitSource=exports.setParamsInGetInitData=void 0;var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_indexWeapp=(exports.isCompatible=isCompatible,exports.callEnableIntercept=callEnableIntercept,exports.clearTimeout=clearTimeout,require("../npm/@jd/djmp/common-t/js/storage/index.weapp.js")),_indexWeapp2=require("../npm/@jd/djmp/common-t/js/env/index.weapp.js"),timer=null,isWeapp=!0,getInviterUserPinInWeapp=function(){var e=getCurrentPages().length-1||0,t=getCurrentPages()[e].options.inviteUserPin;return console.log(getCurrentPages()[e].options),t},setParamsInGetInitData=exports.setParamsInGetInitData=function(){var e=getInviterUserPinInWeapp();return e?{inviteUserPin:e}:{}},getInitSource=exports.getInitSource=function(){var e=getCurrentPages().length-1||0;return"share"==getCurrentPages()[e].options.source};function isCompatible(e,t){try{e=e.split("."),t=t.split(".");for(var r=Math.max(e.length,t.length);e.length<r;)e.push("0");for(;t.length<r;)t.push("0");for(var o=0;o<r;o++){var n=parseInt(e[o]),a=parseInt(t[o]);if(a<n)return 1;if(n<a)return-1}return 0}catch(e){}}var getUserId=exports.getUserId=function(){try{var e=getApp();return(wx.getStorageSync("login_info")||{}).PDJ_H5_PIN||e.globalData.loginStateInfo&&e.globalData.loginStateInfo.PDJ_H5_PIN||""}catch(e){console.debug(e)}},saveTaskBrowseOrchard=exports.saveTaskBrowseOrchard=function(e){e={info:e,browseTime:e.browseTime,time:(new Date).getTime()};(0,_indexWeapp.setStorageSync)("taskBrowseOrchard",e)},getTaskBrowseOrchard=exports.getTaskBrowseOrchard=function(){return(0,_indexWeapp.getStorageSync)("taskBrowseOrchard")},resetTaskBrowseOrchard=exports.resetTaskBrowseOrchard=function(){return(0,_indexWeapp.setStorageSync)("taskBrowseOrchard",""),""},checkTaskBrowseOrchard=exports.checkTaskBrowseOrchard=function(){var e,t,r=(0,_indexWeapp.getStorageSync)("taskBrowseOrchard");return!!r&&(e=void 0,e="string"==typeof r?JSON.parse(r):JSON.parse(JSON.stringify(r)),t=(new Date).getTime(),console.debug("t",r),console.debug("typeof t",void 0===r?"undefined":_typeof(r)),console.debug("data",e),console.debug("currentTime",t),console.debug("(currentTime-data.time)",t-e.time),console.debug("data.browseTime * 1000",1e3*e.browseTime),console.debug("(currentTime-data.time)>data.browseTime * 1000",t-e.time>1e3*e.browseTime),t-e.time>1e3*e.browseTime)};function callEnableIntercept(){_indexWeapp2.isDaojiaApp?_indexWeapp2.isIOS?_indexWeapp2.supportDJSHWK&&window.webkit.messageHandlers.MobileNavi.postMessage({method:"enableIntercept",params:1,callBackName:null,callBackId:null}):_indexWeapp2.isAndroid&&window.djJava.enableIntercept(1):console.debug("not dao jia APP: 仅支持到家APP")}var countDown=exports.countDown=function(n,a){n/=1e3,timer=setInterval(function(){var e=0,t=0,r=0,o=0;0<n&&(e=Math.floor(n/86400),t=Math.floor(n/3600)-24*e,r=Math.floor(n/60)-24*e*60-60*t,o=Math.floor(n)-24*e*60*60-60*t*60-60*r),t<=9&&(t="0"+t),r<=9&&(r="0"+r),o<=9&&(o="0"+o),0<n?a({day:e,hour:t,minute:r,second:o,timer:timer,end:!1}):(clearInterval(timer),a({hour:"00",minute:"00",second:"00",timer:timer,end:!0})),n--},1e3)};function clearTimeout(){clearInterval(timer)}var clickAnimationGap=exports.clickAnimationGap=500,clickAnimationName=exports.clickAnimationName="clickAnimation",getWaterAnimationName=exports.getWaterAnimationName="getWaterAnimation",clickAnimation=exports.clickAnimation=function(e){},checkDateForPop=exports.checkDateForPop=function(e){var t=(0,_indexWeapp.getStorageSync)(e),r=new Date,r=r.getFullYear()+"-"+(r.getMonth()+1)+"-"+r.getDate();return r!=t&&((0,_indexWeapp.setStorageSync)(e,r),!0)},getPlateCode=exports.getPlateCode=function(){return 5};
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleUrl=exports.handleUrlInH5=exports.handleUrlInWeapp=exports.sensitiveWords=void 0;var _utilsWeapp=require("../utils/utils.weapp.js"),sensitiveWords=exports.sensitiveWords=["longitude","latitude","cityId","lat","lng","lat_pos","lng_pos","city_id"],handleUrlInWeapp=exports.handleUrlInWeapp=function(e){return e},handleUrlInH5=exports.handleUrlInH5=function(e){var t=""+window.location.origin+window.location.pathname+"#"+e;return(0,_utilsWeapp.isInWhiteList)(t)?e:handleUrl(e)},handleUrl=exports.handleUrl=function(e){try{var t=!1,i={},n=sensitiveWords.length,s=e.split("?"),l=s[s.length-1];if(l&&l.length){for(var r,a=l.split("&"),o=0;o<a.length;o++)for(var p=0;p<n;p++)if(a[o].includes&&a[o].includes(sensitiveWords[p])){var d=a[o].split("=")[0],u=a[o].split("=")[1];if(d&&u){i[d]=u,a.splice(o,1),o--,t=!0;break}}t&&(r=(0,_utilsWeapp.setDjmsg)(i),e=e.split("?")[0]+"?"+a.join("&")+"&djmsg="+r)}}catch(e){}return e};
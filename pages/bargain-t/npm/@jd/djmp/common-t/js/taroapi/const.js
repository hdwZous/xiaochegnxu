"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.handleUrl=exports.handleUrlInH5=exports.handleUrlInWeapp=exports.sensitiveWords=void 0;var _utilsWeapp=require("../utils/utils.weapp.js"),sensitiveWords=exports.sensitiveWords=["longitude","latitude","cityId","lat","lng","lat_pos","lng_pos","city_id"],handleUrlInWeapp=exports.handleUrlInWeapp=function(e){return e},handleUrlInH5=exports.handleUrlInH5=function(e){var r=""+window.location.origin+window.location.pathname+"#"+e;return(0,_utilsWeapp.isInWhiteList)(r)?(console.error("在白名单中"),e):(console.error("不在白名单中"),handleUrl(e))},handleUrl=exports.handleUrl=function(e){try{var r=!1,l={},n=sensitiveWords.length,t=e.split("?"),s=t[t.length-1];if(s&&s.length){for(var i,o=s.split("&"),a=0;a<o.length;a++)for(var p=0;p<n;p++)if(o[a].includes&&o[a].includes(sensitiveWords[p])){var d=o[a].split("=")[0],u=o[a].split("=")[1];if(d&&u){l[d]=u,o.splice(a,1),a--,r=!0;break}}r&&(i=(0,_utilsWeapp.setDjmsg)(l),e=e.split("?")[0]+"?"+o.join("&")+"&djmsg="+i)}}catch(e){console.error(e)}return console.error("handleUrl",e),e};
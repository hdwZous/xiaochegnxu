"use strict";function timestampToTime(t){var e=new Date(t),s=e.getFullYear()+"-",g=(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-",o=(e.getDate()<10?"0"+e.getDate():e.getDate())+" ",n=(e.getHours()<10?"0"+e.getHours():e.getHours())+":",t=(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":",e=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds();return strDate=s+g+o+n+t+e,strDate}module.exports={timestampToTime:timestampToTime};
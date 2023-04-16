"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,a=arguments[t];for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},_createClass=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}(),_get=function e(t,n,a){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);return void 0!==i?"value"in i?i.value:void 0!==(i=i.get)?i.call(a):void 0:null!==(i=Object.getPrototypeOf(t))?e(i,n,a):void 0},_index=require("../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_orchard=require("../../api/orchard.js"),_indexWeapp=require("../../npm/@jd/djmp/common-t/js/share/index.weapp.js"),_indexWeapp2=require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_indexWeapp3=require("../../npm/@jd/djmp/common-t/js/env/index.weapp.js"),_constant=require("../../js/constant.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp4=require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp5=require("../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),_utils=require("../../js/utils.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var REPORT={clickShareZhuli:function(e,t){(0,_indexWeapp4.clickReport)({click_id:"clickShareZhuli",click_par:{zhuliId:e,zhuliProgress:t}})},clickZhuLiBall:function(){(0,_indexWeapp4.clickReport)({click_id:"clickZhuLiBall"})},zhuliFTE:function(){(0,_indexWeapp4.clickReport)({click_id:"zhuliFTE"})}},sharePath="pages/orchard-t/index?isAssis=1&business="+_constant.BUSINESS_MAP.assistant,generateOpenUrl=function(){var e,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=t.uniqueId,t=t.taskId;n&&(e=(0,_utils.getUserId)(),sharePath+="&uniqueId="+n+"&assistTargetPin="+e+"&taskId="+t)},isWeapp=!0,TASK_ID="1201",MODLE_ID="M10007",STORAGE_KEY="dateForAssistant",getPlateCode=function(){return 5},Assistance=(_temp2=_class=function(){function s(){var e,t;_classCallCheck(this,s);for(var n=arguments.length,a=Array(n),i=0;i<n;i++)a[i]=arguments[i];return(e=t=_possibleConstructorReturn(this,(t=s.__proto__||Object.getPrototypeOf(s)).call.apply(t,[this].concat(a)))).$usedState=["anonymousState__temp","anonymousState__temp4","anonymousState__temp5","anonymousState__temp8","loopArray3","loopArray4","entryAni","showBtnTips","showRedPoint","style","shortNum","subList","status","shareBtnAni","getAwardPerson","personNums","getExtraAward","fissionUserInfoList","showMain","taskInfo","shareInfo","isNewer","refreshNewPersonFunc","isFirst","isLargeScreen"],t.customComponents=[],_possibleConstructorReturn(t,e)}return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(e){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,e),this.state={showMain:!1,taskInfo:{},shareInfo:{title:"",shareUrl:"",shareText:""},isNewer:!1,getAwardPerson:"X",getExtraAward:"X",shortNum:"",personNums:"",showRedPoint:!1,showBtnTips:!1,entryAni:"",shareBtnAni:""},this.$$refs=[]}},{key:"receiveTask",value:function(){var e,t=this,n=this.state.taskInfo;0!==Object.keys(n).length&&(e=n.status,n=n.taskId,0==e)&&(0,_orchard.receivedTaskInfo)({modelId:MODLE_ID,taskType:TASK_ID,taskId:n,plateCode:getPlateCode()}).then(function(e){0==e.code&&t.getTaskInfo(),console.debug(e)}).catch(function(e){console.debug(e)})}},{key:"isCheckShowRedPoint",value:function(){var e=(0,_indexWeapp5.getStorageSync)(STORAGE_KEY);this.getCurrentDay()!=e?this.setState({showRedPoint:!0}):this.setState({showRedPoint:!1})}},{key:"getCurrentDay",value:function(){var e=new Date;return e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()}},{key:"saveTodayKey",value:function(){var e=this.getCurrentDay();(0,_indexWeapp5.setStorageSync)(STORAGE_KEY,e)}},{key:"clickAnimationForEntry",value:function(){var e=this;this.setState({entryAni:_utils.clickAnimationName},function(){setTimeout(function(){e.setState({entryAni:""})},_utils.clickAnimationGap)})}},{key:"handleClick",value:function(){var e=this.state,t=e.taskInfo,e=e.isNewer;this.clickAnimationForEntry(),this.setState({showRedPoint:!1}),this.saveTodayKey(),e&&REPORT.zhuliFTE(),console.log(t,"taskInfo=========="),0===Object.keys(t).length?((0,_indexWeapp2.showToast)({title:"小程序端目前暂未开放此功能，敬请谅解"}),this.setState({isNewer:!1})):(this.receiveTask(),this.getTaskInfo(),this.props.refreshNewPersonFunc&&this.props.refreshNewPersonFunc(),this.setState({isNewer:!1,showMain:!0}),REPORT.clickZhuLiBall())}},{key:"handleClose",value:function(){this.setState({showMain:!1})}},{key:"clickReport",value:function(){var e=this.state.taskInfo,t=e.taskId,t=void 0===t?"":t,n=e.subList,e=e.fissionUserInfoList,e=((void 0===e?[]:e).length||"-")+" / "+((void 0===n?[]:n).length||"-");console.debug(t,e),REPORT.clickShareZhuli(t,e)}},{key:"clickAnimationForBtn",value:function(){}},{key:"handleShareForWeapp",value:function(e){this.clickAnimationForBtn(e),this.clickReport()}},{key:"handleShareForH5",value:function(e){this.clickAnimationForBtn(e),this.clickReport(),this.openShare()}},{key:"openShare",value:function(){(0,_indexWeapp2.showLoading)(),_indexWeapp3.isDaojiaApp&&0<=(0,_utils.isCompatible)(String(_indexWeapp3.djAppVersion),String(7))?((0,_indexWeapp2.hideLoading)(),this.onlyCallUpWechat()):((0,_indexWeapp2.hideLoading)(),this.callUpShare())}},{key:"onlyCallUpWechat",value:function(){var e=this.state.shareInfo,t=e.title,t=void 0===t?"京东到家":t,n=e.shareUrl,n=void 0===n?"https://storage.360buyimg.com/wximg/signIn_new/giftBox.png":n;e.shareText;console.debug("shareInfo11111",e),_indexWeapp3.isIOS?_indexWeapp3.supportDJSHWK?window.webkit.messageHandlers.MobileNavi.postMessage({method:"toShareNew",params:JSON.stringify({method:"3",chat:{shareType:"2",data:{title:t,appId:"gh_5103b94a8a56",imageUrl:n,miniProgram:sharePath,shareUrl:sharePath},degradeParams:{title:t,dec:t,icon:n,degradeUrl:n}},square:{},imgUrl:{},userAction:{}}),callBackName:null,callBackId:null}):toShareNew(JSON.stringify({method:"3",chat:{shareType:"2",data:{title:t,appId:"gh_5103b94a8a56",imageUrl:n,miniProgram:sharePath,shareUrl:sharePath},degradeParams:{title:t,dec:t,icon:n,degradeUrl:n}},square:{},imgUrl:{},userAction:{}})):(_indexWeapp3.isAndroid,window.djJava.toShareNew("3",JSON.stringify({shareType:"2",data:{title:t,appId:"gh_5103b94a8a56",imageUrl:n,miniProgram:sharePath,shareUrl:sharePath},degradeParams:{title:t,dec:t,icon:n,degradeUrl:n}}),"","",""))}},{key:"callUpShare",value:function(e){var t=this.state.shareInfo,n=t.title,n=void 0===n?"京东到家":n,a=t.shareUrl,a=void 0===a?"https://storage.360buyimg.com/wximg/signIn_new/giftBox.png":a,i=t.shareText,t=(console.debug("callUpShare-shareInfo",t),{title:n,desc:i,shareUrl:a,imgUrl:a,appId:"gh_5103b94a8a56",mpImgUrl:a,path:sharePath,pyqImg:a,callback:"",clickcallback:"",timeline_title:"",channel:"Wxfriends"});console.debug("openShare-shareParams",t),t.pyqImg&&(0,_indexWeapp.openShare)(t)}},{key:"getShareMsg",value:function(){var n=this;(0,_orchard.getSharePictureInfo)({scene:1}).then(function(e){var t;0==e.code&&(console.debug("share111",e.result),t=(e=e.result).mpShareTitle,e=e.mpShareImg,n.setState({shareInfo:{title:t,shareUrl:e,shareText:t}},function(){console.debug("share111000000000",n.state.shareInfo)}))}).catch(function(e){(0,_indexWeapp2.showToast)({title:e.msg||"网络开小差，请稍后重试"})})}},{key:"getTaskInfo",value:function(){var s=this;(0,_orchard.taskListInfo)({modelId:MODLE_ID,plateCode:getPlateCode()}).then(function(e){var t=e.code,n=e.result,e=(e.msg,n.taskInfoList);0==t&&e.forEach&&e.forEach(function(e){var t,n,a,i;e.taskType==TASK_ID&&(i=e.subList,n=e.fissionUserInfoList,e.status,t=(i=void 0===i?[]:i).length,n=(void 0===n?[]:n).length||0,a=Number(i[t-1].prizeValue)||"",i=Number(i[0].prizeValue)||"",s.setState({taskInfo:e,getAwardPerson:i,getExtraAward:a-i,shortNum:t-n,personNums:t,showBtnTips:!0}),generateOpenUrl(e),console.debug(99999999,sharePath))})}).catch(function(e){console.log(e)})}},{key:"componentWillReceiveProps",value:function(e){}},{key:"componentDidMount",value:function(){this.getShareMsg(),this.getTaskInfo();var e=this.props.isFirst;this.setState({isNewer:e}),this.isCheckShowRedPoint()}},{key:"componentWillUnmount",value:function(){}},{key:"componentDidShow",value:function(){}},{key:"componentDidHide",value:function(){}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var e=this.__state,s=(e.showMain,e.shareInfo),t=e.taskInfo,e=(e.isNewer,e.getAwardPerson,e.getExtraAward,e.shortNum,e.personNums,e.showRedPoint,e.showShortNums,e.showBtnTips,e.entryAni,e.shareBtnAni,t.subList),r=void 0===e?[]:e,e=t.status,t=t.fissionUserInfoList,o=void 0===t?[]:t,t=this.__props.isLargeScreen,n=(0,_index.internal_inline_style)({bottom:t?"20px":null}),a=_extends({},s,{path:sharePath}),t=(0,_index.internal_inline_style)({marginTop:t?"-70px":null}),i=_extends({},s,{path:sharePath}),l=r.length?r.map(function(e,t){var n=(e={$original:(0,_index.internal_get_original)(e)}).$original,a=n.node,i=n.prizeType,n=n.prizeValue,t=o[t]||{};return{node:a,prizeType:i,prizeValue:n,nickName:t.nickName,nickHeadUrl:t.nickHeadUrl,$loopState__temp3:r.length?_extends({},s,{path:sharePath}):null,$original:e.$original}}):[],c=r.length?r.map(function(e,t){var n=(e={$original:(0,_index.internal_get_original)(e)}).$original,a=n.node,i=n.prizeType,n=n.prizeValue,t=o[t]||{};return{node:a,prizeType:i,prizeValue:n,nickName:t.nickName,nickHeadUrl:t.nickHeadUrl,$loopState__temp7:r.length?_extends({},s,{path:sharePath}):null,$original:e.$original}}):[];return Object.assign(this.__state,{anonymousState__temp:n,anonymousState__temp4:a,anonymousState__temp5:t,anonymousState__temp8:i,loopArray3:l,loopArray4:c,style:_indexModuleScssMap2.default,subList:r,status:e,fissionUserInfoList:o}),this.__state}}]),s}(),_class.$$events=["handleClick","handleClose","handleShareForWeapp"],_class.$$componentPath="pages/orchard-t/components/Assistance/index",_temp2);exports.default=Assistance,Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Assistance));
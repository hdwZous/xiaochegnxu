"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a,n=arguments[t];for(a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},_createClass=function(){function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}}(),_get=function e(t,a,n){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,a);return void 0!==i?"value"in i?i.value:void 0!==(i=i.get)?i.call(n):void 0:null!==(i=Object.getPrototypeOf(t))?e(i,a,n):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_bean=require("../../../../common-mp/api/bean.js"),_indexWeapp=require("../../../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_utilsWeapp=require("../../../../npm/@jd/djmp/common-t/js/utils/utils.weapp.js"),_indexWeapp2=require("../../../../npm/@jd/djmp/common-t/js/env/index.weapp.js"),_indexWeapp3=require("../../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_utils=require("../../../../common-mp/components/TaskListForSignNew/js/utils.js"),_indexWeapp4=require("../../../../npm/@jd/djmp/common-t/constants/index.weapp.js"),_indexWeapp5=require("../../../../npm/@jd/djmp/common-t/js/share/index.weapp.js"),_indexWeapp6=require("../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_constant=require("../../js/constant.js"),_indexWeapp7=require("../../../../npm/@jd/djmp/common-t/js/location/index.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var INVITER_NEW_TASK_TYPE=802,sharePathForOLd="pages/bean-t/index?beansource=task",pin=void 0,isWeapp=!0,login_info=wx.getStorageSync("login_info"),pin=login_info[_indexWeapp4.PDJ_H5_JDPIN_KEY],queryForInitNewFriend=_constant.INVITER_USER_PIN+"="+pin,sharePathForInviterNew="pages/bean-t/index?beansource=task&"+queryForInitNewFriend,sharePath=sharePathForOLd,PopUp=(_temp2=_class=function(){function s(){var e,t;_classCallCheck(this,s);for(var a=arguments.length,n=Array(a),i=0;i<a;i++)n[i]=arguments[i];return(e=t=_possibleConstructorReturn(this,(t=s.__proto__||Object.getPrototypeOf(s)).call.apply(t,[this].concat(n)))).$usedState=["showPopAminate","anonymousState__temp","disabled","switchChecked","welcomeFinnshTimes","hasShare","router","title","taskList","shareInfo","handleSuperOrderPop","getTaskListInfo","updataKettle"],t.customComponents=[],_possibleConstructorReturn(t,e)}return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(e){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,e),this.shareFlag=!0,this.state={disabled:!1,switchChecked:!1,welcomeFinnshTimes:0,hasShare:!1},this.$$refs=[]}},{key:"componentWillReceiveProps",value:function(e){if(e&&e.taskList&&0<e.taskList.length)for(var t=0;t<e.taskList.length;t++)505==e.taskList[t].taskType&&1==e.taskList[t].status&&this.state.welcomeFinnshTimes<1&&(this.setState({welcomeFinnshTimes:this.state.welcomeFinnshTimes+1}),this.finnshTask(e.taskList[t],!0,!1)),503==e.taskList[t].taskType&&this.state.hasShare&&(this.setState({hasShare:!1}),this.finnshTask(e.taskList[t],!0,!1))}},{key:"checkTaskBrowse",value:function(){var t=this,a=setInterval(function(){var e=(0,_utils.getTaskBrowseTimeBean)();e&&((0,_utils.checkTaskBrowseTimeBean)()?(e=JSON.parse(JSON.stringify(e)),t.finnshTask(e.info,!0,!1)):(0,_indexWeapp3.showToast)({title:"时间太短啦~"}),(0,_utils.resetTaskBrowseTimeBean)()),t.getTaskListInfo(!1),clearInterval(a)},100)}},{key:"componentDidMount",value:function(){var e=this.props.router&&this.props.router.params,t=e&&e.taskId,e=e&&e.taskType;e&&this.finnshTask({taskId:t||"",taskType:e||""},!0,!1)}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=this.__props.showPopAminate||!1,a=(this.__props.title,this.__state.switchChecked,this.__props),a=(a.taskList,a.shareInfo,this._createTaskListData(e+"HQAUBkZwho")());return Object.assign(this.__state,{showPopAminate:t,anonymousState__temp:a}),this.__state}},{key:"_createItemNotClickData",value:function(e){var a=this;return function(e){var t=a.props.shareInfo;return{anonymousState__temp2:0==e.status&&503==e.taskType?_extends({},void 0===t?{title:"鲜豆庄园",shareUrl:"https://storage.360buyimg.com/wximg/bean/beansShareIcon.png",beansource:"task"}:t,{path:"/pages/bean-t/index?beansource=task"}):null,item:e}}}},{key:"_createItemNotFinishData",value:function(e){var r=this;return function(e){var t=r.props.shareInfo,t=void 0===t?{title:"鲜豆庄园",shareUrl:"https://storage.360buyimg.com/wximg/bean/beansShareIcon.png",beansource:"task"}:t,a=e.status,n=e.taskType,a=1==a,i=a&&503==n,s=a&&n==INVITER_NEW_TASK_TYPE,o=a&&301==n,a=a&&306==n;return{anonymousState__temp3:i?_extends({},t,{path:"/pages/bean-t/index?beansource=task"}):null,anonymousState__temp4:s?_extends({},t,{path:"/pages/bean-t/index?beansource=task&"+queryForInitNewFriend}):null,initFriendType:i,item:e,initNewFriendType:s,h5ToApp:o,isWeapp:!0,addBusiWechat:a}}}},{key:"checkIsHaveFinishOrder",value:function(e){var t=e.subList;if(t&&0<t.length){for(var a=!1,n=0;n<t.length;n++)if(2==t[n].taskStatus){a=!0;break}return a}return!1}},{key:"_createItemData",value:function(n){var i=this;return function(e){var t=i._createItemNotClickData(n+"PPDgvlJhmJ")(e),a=513!=e.taskType?i._createItemNotFinishData(n+"gMRYrPhuSa")(e):null;return{anonymousState__temp7:i.checkIsHaveFinishOrder(e)?(0,_index.internal_inline_style)({color:"#FFF"}):null,anonymousState__temp8:(0,_index.internal_inline_style)({color:"#FF3B37"}),anonymousState__temp9:513==e.taskType?(0,_index.internal_inline_style)({color:"#FF3B37"}):null,anonymousState__temp10:(0,_index.internal_inline_style)({color:"#FF3B37"}),anonymousState__temp15:i.checkIsHaveFinishOrder(e),item:e,anonymousState__temp5:t,anonymousState__temp6:a}}}},{key:"taskAgainEvent",value:function(e){this.doTaskAct(e,!1)}},{key:"_createTaskListData",value:function(a){var n=this;return function(){var e=n.props.taskList;return{loopArray154:e&&0<e.length?e.map(function(e,t){return{$loopState__temp12:-1!=(e={$original:(0,_index.internal_get_original)(e)}).$original.isShow?n._createItemData(a+"sJpFgEAaoO"+t)(e.$original):null,$loopState__temp14:-1!=e.$original.isShow?t+"key":null,$original:e.$original}}):[],taskList:e}}}},{key:"closePop",value:function(e){e.stopPropagation(),this.props.onClosePopUp({})}},{key:"setSharePath",value:function(e){e=e.taskType;sharePath=e==INVITER_NEW_TASK_TYPE?sharePathForInviterNew:sharePathForOLd}},{key:"clickTaskEvent",value:function(e){var t=this;this.setSharePath(e),0==e.status?this.getTask(e,e.taskId,e.taskType):1==e.status?this.doTaskAct(e,!0):2==e.status?513==e.taskType?(this.props.handleSuperOrderPop(),this.props.onClosePopUp({})):this._throttle(function(){t.getReward(e.taskId,e.taskType)}):e.status,(0,_indexWeapp6.clickReport)({create_time:new Date,click_id:"clickButton",click_par:{questId:e.taskId,questName:e.taskName,waterReward:e.awardValue,questStatus:e.status}})}},{key:"getTaskListInfo",value:function(e){this.props.getTaskListInfo(e)}},{key:"getTask",value:function(t,e,a){var n=this;(0,_bean.receivedTaskInfo)({modelId:"M10003",taskId:e,taskType:a,plateCode:this.getPlateCode()}).then(function(e){0==e.code&&(t.status=1,0!=t.unreceiveTaskJumpFlag&&t.unreceiveTaskJumpFlag||n.doTaskAct(t,!0),n.getTaskListInfo(!0),309==t.taskType&&(0,_indexWeapp3.showToast)({title:"微信关注「京东到家」，回复「666」即可完成"}))}).catch(function(e){n.getTaskListInfo(!0)})}},{key:"handleJump",value:function(e){var t,a;_indexWeapp2.isDaojiaApp&&0<=(0,_utils.isCompatible)(String(_indexWeapp2.djAppVersion),String("8.6.0"))?(t="web",a={extraUrlInDJ:e},e.includes("throughLoginInDJAPP")&&(t="jdweb",a={extraUrl:e}),(0,_indexWeapp.jump)({type:"",to:t,params:a})):window.location.href=e}},{key:"doTaskAct",value:function(i,e){var t,a,n,s,o=this,r=function(){(0,_indexWeapp3.showToast)({title:"迷路了，请稍后再试"})},p=function(){o.openShare(),e&&setTimeout(function(){o.finnshTask(i,!0,!1)},5e3)},c=function(){e&&o.finnshTask(i,!0,!1)},d=function(){(0,_indexWeapp3.showToast)({title:"微信关注「京东到家」，回复「666」即可完成"})},l=function(){(0,_indexWeapp3.navigateTo)("/pages/vpayMember-t/home/index")},u=function(){(0,_indexWeapp3.showToast)({title:"任务还没有完成，加油呀！"})},h=function(){o.props.handleSuperOrderPop(),o.props.onClosePopUp({})},m=function(){var e=wx.getStorageSync("login_info")[_indexWeapp4.PDJ_H5_JDPIN_KEY];(0,_indexWeapp.jump)({to:"merchantMember",type:"h5",params:{storeId:i.params.storeId,orgCode:i.params.orgCode,source:"signin",taskId:i.taskId,pin:e,identificationCode:i.identificationCode}})},_=function(){e&&(0<i.browseTime?((0,_utils.saveTaskBrowseTimeBean)(i),setTimeout(function(){o.props.onClosePopUp({})},200)):o.finnshTask(i,!0,!1)),g()},f=function(){g()},g=function(){var e=i.params.url;i.identificationCode&&(-1<e.indexOf("?")?e+="&identificationCode="+i.identificationCode:e+="?identificationCode="+i.identificationCode),o.jumpThoughtUrl(i.params)},k=function(){wx.getStorageSync("login_info")[_indexWeapp4.PDJ_H5_SID_KEY];var n=i.params&&i.params.url?i.params.url:"https://kuai.imdada.cn/app/commonActivity#/?activityCode=20200804006iEst0n&channel=JDDJ_xdzyH5";i.identificationCode&&(-1<n.indexOf("?")?n+="&identificationCode="+i.identificationCode:n+="?identificationCode="+i.identificationCode),(0,_indexWeapp7.getLocation)().then(function(e){var t=e.areaCode||e.cityId,a=(encodeURIComponent(n+"&cityId="+t+"&lng="+e.longitude+"&lat="+e.latitude+"&"),i.params&&i.params.url?i.params.url:"https://kuai.imdada.cn/app/commonActivity#/?activityCode=20200831006r5TgQJ&channe=JDDJ_xdzywechat"),a="/common/pages/activity/couponActivityNew/index?activityCode="+((0,_utilsWeapp.getQueryString)("activityCode",a)||"20200831006r5TgQJ")+"&channel="+((0,_utilsWeapp.getQueryString)("channel",a)||"JDDJ_xdzywechat")+"&identificationCode="+i.identificationCode+"&cityId="+t+"&lng="+e.longitude+"&lat="+e.latitude;wx.navigateToMiniProgram({appId:"wxcecfde2bc765c661",path:a}),o.props.onClosePopUp({})}).catch(function(e){(0,_indexWeapp3.showToast)("定位失败")})};"home"==i.to?(0,_indexWeapp.jump)({to:"home"}):"mina"==i.to?(503==i.taskType?p:505==i.taskType?c:901==i.taskType?_:902==i.taskType?f:r)():"web"==i.to?(n=i.params,t=i.taskType,a=n.appId,n=n.path,a?(i.identificationCode&&(-1<n.indexOf("?")?n+="&identificationCode="+i.identificationCode:n+="?identificationCode="+i.identificationCode),901==t&&e?0<i.browseTime?((0,_utils.saveTaskBrowseTimeBean)(i),wx.navigateToMiniProgram({appId:a,path:n})):(s=this,wx.navigateToMiniProgram({appId:a,path:n,success:function(e){s.finnshTask(i,!0,!1)}})):wx.navigateToMiniProgram({appId:a,path:n})):503==i.taskType?p():309==i.taskType?d():505==i.taskType?c():310==i.taskType?m():510==i.taskType?l():901==i.taskType?_():902==i.taskType?f():511==i.taskType?u():1001==i.taskType?k():""!==i.params.url?801==i.taskType?_index2.default.navigateTo({url:"/pages/bean-t/index"}):o.jumpThoughtUrl(i.params):r()):"storeShop"==i.to?i.params&&i.params.storeId?310==i.taskType?m():(e&&(i.browseTime?((0,_utils.saveTaskBrowseTimeBean)(i),o.props.onClosePopUp({})):o.finnshTask(i,!0,!1)),_index2.default.navigateTo({url:"/pages/store/index?storeId="+i.params.storeId+"&orgCode="+i.params.orgCode})):(0,_indexWeapp3.showToast)({title:"当前位置暂无门店哦～"}):503==i.taskType?p():309==i.taskType?d():505==i.taskType?c():510==i.taskType?l():511==i.taskType?u():513==i.taskType?h():1001==i.taskType?k():306!=i.taskType&&301!=i.taskType&&(i.taskType==INVITER_NEW_TASK_TYPE?o.openShare():r())}},{key:"finnshTask",value:function(e,t,a){var n=this;(0,_bean.finishedTaskInfo)({modelId:"M10003",taskId:e.taskId,taskType:e.taskType,plateCode:this.getPlateCode()}).then(function(e){t&&n.getTaskListInfo(a)}).catch(function(e){t&&n.getTaskListInfo(a)})}},{key:"getReward",value:function(e,t){var a=this;(0,_bean.sendTaskPrizeInfo)({modelId:"M10003",taskId:e,taskType:t,plateCode:this.getPlateCode()}).then(function(e){0==e.code?(0,_indexWeapp3.showToast)({title:"成功收取"+e.result.awardValue+"水滴"}):(0,_indexWeapp3.showToast)({title:"网络开小差了，请稍后重试"}),a.updataKettle(e.result.awardValue),a.getTaskListInfo(!1)}).catch(function(e){(0,_indexWeapp3.showToast)({title:"网络开小差了，请稍后重试"}),a.getTaskListInfo(!1)})}},{key:"updataKettle",value:function(e){this.props.updataKettle(e)}},{key:"openShare",value:function(){var t=this;this._throttle(function(){(0,_indexWeapp3.showLoading)(),_indexWeapp2.isDaojiaApp&&0<=t.isCompatible(String(_indexWeapp2.djAppVersion),String(7))?((0,_indexWeapp3.hideLoading)(),t.onlyCallUpWechat(t.props.shareInfo)):t.getCircleSharePic().then(function(e){(0,_indexWeapp3.hideLoading)(),e.result?t.handleOpenShare(e.result):t.handleOpenShare()}).catch(function(){(0,_indexWeapp3.hideLoading)(),t.handleOpenShare()})})}},{key:"getCircleSharePic",value:function(){(0,_indexWeapp3.showLoading)()}},{key:"handleOpenShare",value:function(e){var t=this.props.shareInfo,e=e||"https://img10.360buyimg.com/mobilecms/jfs/t1/48798/36/8506/78945/5d5f5808E4c17f412/219404b469b14dd3.jpg",a=""+window.location.origin+window.location.pathname+"#/pages/sharePreview-t/index?image="+e+"&title=鲜豆庄园&beansource=task",a={title:t.title||"鲜豆庄园",desc:"京东到家鲜豆庄园",shareUrl:a,imgUrl:"https://img30.360buyimg.com/mobilecms/jfs/t1/65465/34/7772/289742/5d5ba9a2Ededf3e31/d9c6737e7ed4df17.png",appId:"gh_5103b94a8a56",mpImgUrl:t.shareUrl||"https://img30.360buyimg.com/mobilecms/jfs/t1/65465/34/7772/289742/5d5ba9a2Ededf3e31/d9c6737e7ed4df17.png",path:sharePath,pyqImg:e||"",callback:"",clickcallback:"",timeline_title:"",channel:"Wxfriends",qrparam:{top_pic:t.title||"鲜豆庄园",mid_pic:"",slogan:"京东二维码分享",qr_title:t.title||"鲜豆庄园",qr_content:"京东到家鲜豆庄园",qr_direct:e}};a.pyqImg&&(0,_indexWeapp5.openShare)(a)}},{key:"taroShareCode",value:function(){var e="00",t="00",a={},t=_indexWeapp2.isJDApp?_indexWeapp2.isJDReactNativeWebView?(e="01","02"):(e="03","04"):_indexWeapp2.isDaojiaApp?_indexWeapp2.isIOS?(e="05","06"):(e="07","08"):_indexWeapp2.isWeixin?(e="09","10"):(e="11","12");return a.circleChannel=e,a.cardChannel=t,a}},{key:"onlyCallUpWechat",value:function(e){(0,_indexWeapp3.hideLoading)(),_indexWeapp2.isIOS?_indexWeapp2.supportDJSHWK?window.webkit.messageHandlers.MobileNavi.postMessage({method:"toShareNew",params:JSON.stringify({method:"3",chat:{shareType:"2",data:{title:e.shareText||"京东到家",appId:"gh_5103b94a8a56",imageUrl:e.shareUrl||"https://storage.360buyimg.com/wximg/signIn_new/giftBox.png",miniProgram:sharePath,shareUrl:"https://testpdjm.jd.com/taroh5/h5dist/#/pages/bean-t/index"},degradeParams:{title:e.shareText||"京东到家",dec:"京东到家鲜豆庄园",icon:e.shareUrl||"https://storage.360buyimg.com/wximg/signIn_new/giftBox.png",degradeUrl:e.shareUrl||"https://storage.360buyimg.com/wximg/signIn_new/giftBox.png"}},square:{},imgUrl:{},userAction:{}}),callBackName:null,callBackId:null}):toShareNew(JSON.stringify({method:"3",chat:{shareType:"2",data:{title:e.shareText||"京东到家",appId:"gh_5103b94a8a56",imageUrl:e.shareUrl||"https://storage.360buyimg.com/wximg/signIn_new/giftBox.png",miniProgram:sharePath,shareUrl:"https://testpdjm.jd.com/taroh5/h5dist/#/pages/bean-t/index"},degradeParams:{title:e.shareText||"京东到家",dec:"京东到家鲜豆庄园",icon:e.shareUrl||"https://storage.360buyimg.com/wximg/signIn_new/giftBox.png",degradeUrl:e.shareUrl||"https://storage.360buyimg.com/wximg/signIn_new/giftBox.png"}},square:{},imgUrl:{},userAction:{}})):(_indexWeapp2.isAndroid,window.djJava.toShareNew("3",JSON.stringify({shareType:"2",data:{title:e.shareText||"京东到家",appId:"gh_5103b94a8a56",imageUrl:e.shareUrl||"https://storage.360buyimg.com/wximg/signIn_new/giftBox.png",miniProgram:sharePath,shareUrl:"https://testpdjm.jd.com/taroh5/h5dist/#/pages/bean-t/index"},degradeParams:{title:e.shareText||"京东到家",dec:"京东到家鲜豆庄园",icon:e.shareUrl||"https://storage.360buyimg.com/wximg/signIn_new/giftBox.png",degradeUrl:e.shareUrl||"https://storage.360buyimg.com/wximg/signIn_new/giftBox.png"}}),"","",""))}},{key:"isCompatible",value:function(e,t){try{e=e.split("."),t=t.split(".");for(var a=Math.max(e.length,t.length);e.length<a;)e.push("0");for(;t.length<a;)t.push("0");for(var n=0;n<a;n++){var i=parseInt(e[n]),s=parseInt(t[n]);if(s<i)return 1;if(i<s)return-1}return 0}catch(e){}}},{key:"getSubscribeNotifyInfo",value:function(){var t=this;(0,_bean.subscribeNotifyInfo)({notifyStatus:0}).then(function(e){0==e.code&&2==e.result?t.setState({switchChecked:!0}):t.setState({switchChecked:!1})}).catch(function(e){})}},{key:"subscribeNotifyInfo",value:function(){var t=this,e=1,e=this.state.switchChecked?1:2,e=(this.setState({switchChecked:!this.state.switchChecked}),(0,_bean.subscribeNotifyInfo)({notifyStatus:e}).then(function(e){0==e.code&&2==e.result?t.setState({switchChecked:!0}):t.setState({switchChecked:!1})}).catch(function(e){t.setState({switchChecked:!1})}),1==e?"open":"close");(0,_indexWeapp6.clickReport)({create_time:new Date,click_id:"clickNoticeButton",click_par:{switchStatus:e||""}})}},{key:"getPlateCode",value:function(){return 5}},{key:"_throttle",value:function(e){var t=this;this.shareFlag&&(this.shareFlag=!1,e.apply(this,arguments),setTimeout(function(){t.shareFlag=!0},1e3))}},{key:"jumpThoughtUrl",value:function(e){e=e.url;-1<e.indexOf("friendHelp")||-1<e.indexOf("friendhelp")?(0,_indexWeapp.jump)({type:"",to:"friendHelpList"}):-1<e.indexOf("bargain/list")?(0,_indexWeapp.jump)({type:"",to:"bargainList"}):-1<e.indexOf("bargain/detail")?(0,_indexWeapp.jump)({type:"",to:"bargainDetail"}):-1<e.indexOf("punch-t")?(0,_indexWeapp.jump)({type:"",to:"punch"}):-1<e.indexOf("lottery")?(0,_indexWeapp.jump)({type:"",to:"lottery"}):-1<e.indexOf("GroupBuy")?(0,_indexWeapp.jump)({type:"",to:"groupBuyList"}):-1<e.indexOf("taskList")?(0,_indexWeapp.jump)({type:"",to:"taskList"}):-1<e.indexOf("signIn-t")?(0,_indexWeapp.jump)({type:"",to:"newSignIn"}):-1<e.indexOf("bean-t")?(0,_indexWeapp.jump)({type:"",to:"beans"}):-1<e.indexOf("orchard-t")?(0,_indexWeapp.jump)({type:"",to:"orchard"}):-1<e.indexOf("cash-t")?(0,_indexWeapp.jump)({type:"",to:"cash"}):(0,_indexWeapp.jumpIntercept)(e)}},{key:"h5JumpIntercept",value:function(e){if(e.includes(".jd.com")&&_indexWeapp2.isDaojiaApp)return-1<e.indexOf("testpdjm.jd.com")||-1<e.indexOf("prepdjm.jd.com")||-1<e.indexOf("daojia.jd.com")?(0,_indexWeapp.jump)({type:"",to:"web",params:{extraUrlInDJ:e}}):(0,_indexWeapp.jump)({type:"",to:"jdweb",params:{extraUrl:e}}),!1;window.location.href=e}},{key:"preventDefaultEvent",value:function(e){e.stopPropagation()}},{key:"isShareEvent",value:function(e,t,a,n){this.setState({hasShare:!0}),(0,_bean.receivedTaskInfo)({modelId:"M10003",taskId:e,taskType:n,plateCode:this.getPlateCode()}).then(function(e){}).catch(function(e){}),(0,_indexWeapp6.clickReport)({create_time:new Date,click_id:"clickButton",click_par:{questId:e,questName:t,waterReward:a,questStatus:1}})}}]),s}(),_class.$$events=["closePop","preventDefaultEvent","isShareEvent","clickTaskEvent","isShareEvent","clickTaskEvent","taskAgainEvent","clickTaskEvent"],_class.multipleSlots=!0,_class.$$componentPath="pages/bean-t/components/popUp/index",_temp2);exports.default=PopUp,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(PopUp));
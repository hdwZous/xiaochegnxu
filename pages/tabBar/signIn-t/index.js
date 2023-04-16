"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i,n=arguments[t];for(i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e},_createClass=function(){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}(),_get=function e(t,i,n){null===t&&(t=Function.prototype);var s=Object.getOwnPropertyDescriptor(t,i);return void 0!==s?"value"in s?s.value:void 0!==(s=s.get)?s.call(n):void 0:null!==(s=Object.getPrototypeOf(t))?e(s,i,n):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../npm/@jd/djmp/common-t/js/location/index.weapp.js"),_indexWeapp2=require("../../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),_indexWeapp3=require("../../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_signIn=require("../../../common-mp/api/signIn.js"),_common=require("../../../common-mp/api/common.js"),_indexWeapp4=require("../../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),_indexWeapp5=require("../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp6=require("../../../npm/@jd/djmp/common-t/js/env/index.weapp.js"),_indexWeapp7=require("../../../npm/@jd/djmp/common-t/js/utils/index.weapp.js"),_utilsWeapp=require("../../../npm/@jd/djmp/common-t/js/utils/utils.weapp.js"),_indexWeapp8=require("../../../npm/@jd/djmp/common-t/js/epBi/index.weapp.js"),_indexWeapp9=_interopRequireDefault(_indexWeapp8),_indexWeapp10=require("../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_utils=require("../../../common-mp/components/TaskListForSignNew/js/utils.js"),_statusAction2=require("./js/statusAction.js"),_getNaviH=require("./js/getNaviH.js"),_utils2=require("./js/utils.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_largeScreen=require("../../../common-mp/api/largeScreen.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var isWeapp=!0,secTopPos=0,secList3Pos=0,screenHeight=0,currentScrollPos=0,goneToTaskList=!1,isClickPagePushSwitch=!1,MONITOR_REPORT={startTime:"",signInfoRequestPreTime:"",signInfoRequestEndTime:"",monitorReportFlag:!0},toast=function(e){var t=document.body,i=document.createElement("p"),e=document.createTextNode(e);i.style.background="rgba(0,0,0,.6)",i.style.color="#ffffff",i.style.textAlign="center",i.style.lineHeight="40px",i.style.borderRadius="6px",i.style.fontSize="14px",i.style.maxWidth="70%",i.style.minWidth="50%",i.style.padding="0 30px",i.style.display="inline-block",i.style.margin="0 auto",i.style.position="fixed",i.style.zIndex="9999",i.style.top="40%",i.style.left="50%",i.style.overflow="hidden",i.style.whiteSpace="nowrap",i.style.textOverflow="ellipsis",i.style.transform="translateX(-50%)",i.appendChild(e),t.appendChild(i),setTimeout(function(){i.style.display="none"},2e3)},MONITOR_ID={signIn:{index:{request:1008,render:2009}},beans:{index:{request:1010,render:2011}}},REPORT={pvReport:function(e){var t="",i=getCurrentPages().length||1,n=void 0;(n=getCurrentPages()[i-1]?getCurrentPages()[i-1].options.trench:n)&&(t=n),n=(i={from:t,userAction:e}).from,i=i.userAction,(0,_indexWeapp5.pvReport)({page_par:{trench:n,userAction:i}})},getLocationByJR:function(e){(0,_indexWeapp5.clickReport)({click_id:e+"GetLocationByJR"})},showNewSigninGuide:function(){(0,_indexWeapp5.clickReport)({click_id:"showNewSigninGuide"})},showOldSigninGuide:function(){(0,_indexWeapp5.clickReport)({click_id:"showOldSigninGuide"})}},fliterGetPositionInJR=function(){var e="allowGetPostionInJR",t=(0,_indexWeapp4.getStorageSync)(e);return 1==t||2!=t&&(window.confirm?window.confirm("为了更好地为您提供服务，京东到家想使用您当前的位置")?((0,_indexWeapp4.setStorageSync)(e,1),REPORT.getLocationByJR("allow"),!0):((0,_indexWeapp4.setStorageSync)(e,2),REPORT.getLocationByJR("refuse"),!1):void 0)},getPositionController=function(){return new Promise(function(t,i){_indexWeapp6.isJDFinanceApp?fliterGetPositionInJR()?(0,_indexWeapp.getPositionByJRJSBridge)().then(function(e){t(e)}).catch(function(){(0,_indexWeapp.getLocation)().then(function(e){t(e)}).catch(function(e){i(e)})}):i():(0,_indexWeapp.getLocation)().then(function(e){t(e)}).catch(function(e){i(e)})})},HOT_FIX_REPORT={report:function(e,t){},enterPage:function(){this.report("signIn_enterPage")},enterWillMount:function(e){this.report("signIn_willmount",e)},enterMounted:function(e){this.report("signIn_enterMounted",e)},enterShow:function(e){this.report("signIn_enterShow",e)},signInInfo:function(e){this.report("signIn_signInInfo",e)},getLoginStatus:function(e){this.report("signIn_getLoginStatus",e)},init:function(e){this.report("signIn_init",e)},hasOpenPushSettingHandle:function(e){this.report("signIn_hasOpenPushSettingHandle",e)},handle:function(e){this.report("signIn_handle",e)},handleReportNum:function(){this.report("signIn_handleReportNum")}},Index=(HOT_FIX_REPORT.enterPage(),_temp2=_class=function(){function o(){var e,t;_classCallCheck(this,o);for(var i=arguments.length,n=Array(i),s=0;s<i;s++)n[s]=arguments[s];return(e=t=_possibleConstructorReturn(this,(t=o.__proto__||Object.getPrototypeOf(o)).call.apply(t,[this].concat(n)))).$usedState=["anonymousState__temp3","anonymousState__temp4","$compid__2","$compid__3","$compid__4","$compid__5","$compid__6","$compid__7","$compid__8","$compid__9","$compid__10","$compid__11","$compid__12","$compid__13","$compid__14","$compid__15","$compid__16","$compid__17","$compid__18","style","isShowSignIn","guideFlag","isLargeScreen","v33ShowGetBeansPop","loginStatus","loading","showPoiInfo","newBenefitLists","taskStatus","seckillTaskLayer","isShowSecTaskSidebar","secTaskInfo","secKillProIsNull","showPop","anonymousState__temp","showTurnTableUp","anonymousState__temp2","affectSigninReward","hasSign","ifCic","couponList","v31FlagTask","unDoneMoneyCount","newPersonPop","userInfo","sevenDaysReward","sliderData","firstGridData","secondGridData","resources","attendBeanShare","hasSiderData","lostPeople","newPeople","address","position","isOpenPushStatus","longitude","latitude","showPopAminate","superOrderTaskInfo","secIsTop","secKillSideBarShow","turntableResponse","taskInfoList","needRefreshSecond","toExchangeButtonAbTest","pushSwitch","v31TaskGuideRect","v33BuyOneTaskInfo","v33OneAndMoreTasks","v33BeanInfo","v33IsTop","v34abflag"],t.config={navigationBarTitleText:"鲜豆当钱花",navigationBarBackgroundColor:"#fff",navigationBarTextStyle:"black",usingComponents:{"back-to-app":"/components/backToApp/index"},onReachBottomDistance:10},t.customComponents=["SuperOrderTaskPop","TurntablePop","GuideNew","GetBeansPop","BeanShare","FunBubble","NewBenefit","SecondKill","TaskList","Grid","StoreList","SecKillTaskPop","SecTaskSideBar","NewSevenPop","CallJddjApp","ExchangeSideBar","SignCicPop","HeaderNew","Sidebar"],_possibleConstructorReturn(t,e)}return _inherits(o,_index.Component),_createClass(o,[{key:"_constructor",value:function(e){var t=this;_get(o.prototype.__proto__||Object.getPrototypeOf(o.prototype),"_constructor",this).call(this,e),this.userAction="",this.Exposure=null,screenHeight=_index2.default.getSystemInfoSync().screenHeight,this.state={newPersonPop:!1,userInfo:{},sevenDaysReward:{},sliderData:{},firstGridData:{},secondGridData:{},resources:[],attendBeanShare:!1,loading:!0,loginStatus:!1,hasSiderData:!1,lostPeople:!1,newPeople:!1,address:{},position:{},showPop:!1,guideFlag:!0,taskStatus:1,unDoneMoneyCount:0,isOpenPushStatus:-1,longitude:"",latitude:"",showPopAminate:!1,superOrderTaskInfo:{},secIsTop:!1,secTaskInfo:{},secKillProIsNull:!1,seckillTaskLayer:!1,secKillSideBarShow:!1,isShowSecTaskSidebar:!0,showTurnTableUp:!1,turntableResponse:{},taskInfoList:[],needRefreshSecond:0,toExchangeButtonAbTest:!0,affectSigninReward:!1,hasSign:!1,pushSwitch:0,couponList:[],ifCic:0,isShowSignIn:-1,v31FlagTask:!1,v31TaskGuideRect:{},v33BuyOneTaskInfo:{},v33ShowGetBeansPop:!1,v33OneAndMoreTasks:[],v33BeanInfo:{},v33IsTop:!1,v34abflag:"myredeem",isLargeScreen:!1},this.$$refs=[{type:"component",id:"SPctW",refName:"",fn:function(e){return t.childPop=e}},{type:"component",id:"cOOID",refName:"",fn:function(e){return t.childsPop=e}},{type:"component",id:"OyQdY",refName:"",fn:function(e){return t.childGuide=e}},{type:"component",id:"ZREeN",refName:"",fn:function(e){return t.child=e}},{type:"component",id:"QspWV",refName:"",fn:function(e){return t.childFunBubble=e}},{type:"component",id:"IetSE",refName:"",fn:function(e){return t.childNewBenefit=e}},{type:"component",id:"AhgdT",refName:"",fn:function(e){return t.childSecondKill=e}},{type:"component",id:"WTAqg",refName:"",fn:function(e){return t.childTaskList=e}},{type:"component",id:"GIqbg",refName:"",fn:function(e){return t.childStoreList=e}},{type:"component",id:"KRRhQ",refName:"",fn:function(e){return t.childHeader=e}}]}},{key:"closeBeanShareLayer",value:function(){var t=this;_index2.default.createSelectorQuery();_index2.default.createSelectorQuery().in(this.$scope).selectAll("#dialog,#signInBtn").boundingClientRect(function(e){e[0]&&e[1]?(e=e[1].top+e[1].height/2-(e[0].top+e[0].height/2),t.child&&t.child.setStateForClose(e)):t.child&&t.child.setStateForClose()}).exec()}},{key:"checkDazhuanpan",value:function(){var e=getApp();!e.globalData.isDazhuanpan&&1||(e.globalData.isDazhuanpan=!1,this.handleTurnTablePop())}},{key:"handleQRCodeData",value:function(e){e&&e.scene&&(0<(e=decodeURIComponent(e.scene).split(",")).length&&this.setState({urlGroupId:e[0]}))}},{key:"onTabItemTap",value:function(){getApp().globalData.homeIconFlag=!0}},{key:"handleTaskListDataLoaded",value:function(e,t,i,n,s,o){n&&null!=n.secondsLeft?(n.secondsLeft=1e3*n.secondsLeft,this.setState({taskStatus:t,unDoneMoneyCount:i,secTaskInfo:n})):this.setState({taskStatus:t,unDoneMoneyCount:i}),this.setState({taskStatus:t,unDoneMoneyCount:i,secTaskInfo:n,taskInfoList:o,superOrderTaskInfo:s})}},{key:"goToLogin",value:function(){(0,_indexWeapp2.goToLogin)({localTargetUrl:"/pages/tabBar/signIn-t/index"})}},{key:"init",value:function(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1];try{t?this.signInInfo(e,!0):(this.setState({loginStatus:!0}),REPORT.pvReport(e)),this.handleQRCodeData(this.$router.params)}catch(e){HOT_FIX_REPORT.init(e)}}},{key:"signInInfo",value:function(t,i){var n=this;try{getPositionController().then(function(e){n.setState({showPoiInfo:!0}),n.initSignInInfo(e),n.setState({address:e}),setTimeout(function(){n.childNewBenefit&&n.childNewBenefit.refreshNewBenefit(e)},500),i&&REPORT.pvReport(t)}).catch(function(){n.initSignInInfo({}),i&&REPORT.pvReport(t)})}catch(e){HOT_FIX_REPORT.signInInfo(e)}}},{key:"reSignInInfo",value:function(){var t=this;getPositionController().then(function(e){t.initSignInInfo(e),t.setState({address:e})}).catch(function(){})}},{key:"setLngAndLat",value:function(e){var t=e.longitude,e=e.latitude;this.setState({longitude:void 0===t?"":t,latitude:void 0===e?"":e})}},{key:"setABFlagByResult",value:function(e){e=e.result,e=(void 0===e?{}:e).signABTestResult,e=(void 0===e?{}:e).isShowSignIn;this.setState({isShowSignIn:void 0===e?1:e})}},{key:"initSignInInfo",value:function(e){var i=this;try{MONITOR_REPORT.signInfoRequestPreTime=Date.now(),this.setLngAndLat(e);var t=this.state.ifCic,n=_extends({cityId:e.cityId||e.areaCode||"",platform:4,longitude:e.longitude||"",latitude:e.latitude||"",source:"H5",ifCIC:t,wholeVersion:1},(0,_utils2.setParamsInGetInitData)());(0,_signIn.signInInfo)(n).then(function(e){if(0==e.code){if(MONITOR_REPORT.signInfoRequestEndTime=Date.now(),i.setABFlagByResult(e),e.result.resources&&0<e.result.resources.length)for(var t=0;t<e.result.resources.length;t++)1!=e.result.resources[t].resourceNicheType&&2!=e.result.resources[t].resourceNicheType&&9!=e.result.resources[t].resourceNicheType&&10!=e.result.resources[t].resourceNicheType||(1==e.result.resources[t].resourceNicheIndex?(i.setState({firstGridData:e.result.resources[t]}),(0,_indexWeapp5.clickReport)({create_time:new Date,click_id:"ShowBall",click_par:{status:"第一屏"}})):2==e.result.resources[t].resourceNicheIndex&&(i.setState({secondGridData:e.result.resources[t]}),(0,_indexWeapp5.clickReport)({create_time:new Date,click_id:"ShowBall",click_par:{status:"第二屏"}}))),4==e.result.resources[t].resourceNicheType&&i.setState({sliderData:e.result.resources[t],hasSiderData:!0}),14==e.result.resources[t].resourceNicheType&&i.setState({resources:e.result.resources[t]});i.setState({userInfo:e.result.userInfoResponse,sevenDaysReward:e.result.sevenDaysRewardResponse,newPersonPop:"new"==e.result.sevenDaysRewardResponse.role,attendClockActivityHis:e.result.userInfoResponse.attendClockActivityHis,attendBeanShare:e.result.userInfoResponse.attendBeanShare,turntableResponse:e.result.turnTableResponse,pushSwitch:e.result.pushSwitch,couponList:e.result.couponList,lostPeople:!1,newPeople:!1,hasSign:e.result.userInfoResponse.hasSign},function(){i.monitorReport(),setTimeout(function(){i.callInitObserver()},2e3)}),"lost"==e.result.sevenDaysRewardResponse.role?i.setState({lostPeople:!0}):"new"==e.result.sevenDaysRewardResponse.role&&i.setState({newPeople:!0}),"new"!=e.result.sevenDaysRewardResponse.role&&"lost"!=e.result.sevenDaysRewardResponse.role||e.result.userInfoResponse.alreadySignInDays||i.state.urlGroupId||(i.setState({showPop:!0}),"new"==e.result.sevenDaysRewardResponse.role?(0,_indexWeapp5.clickReport)({create_time:new Date,click_id:"ShowNewAward",click_par:{}}):(0,_indexWeapp5.clickReport)({create_time:new Date,click_id:"ShowBackAward",click_par:{}})),setTimeout(function(){i.setState({loading:!1})},300)}else _index2.default.showToast({title:e.msg,icon:"none",duration:2e3}),setTimeout(function(){i.setState({loading:!1})},100)}).catch(function(e){"202"!=e.code&&"201"!=e.code||(0,_indexWeapp2.goToLogin)({localTargetUrl:"/pages/tabBar/signIn-t/index"}),setTimeout(function(){i.setState({loading:!1})},100)})}catch(e){this.setState({loading:!1}),(0,_indexWeapp5.clickReport)({click_id:"initSignInInfoCatch",click_par:{cur_url:window.location.href,_cookies_:document.cookie,ua:navigator.userAgent,error:e&&e.toString()}})}}},{key:"toHome",value:function(){getApp().globalData.refreshHomeFlag=!1,this.openWXSetting()}},{key:"callInitObserver",value:function(){this.Exposure&&this.Exposure.initObserver&&this.Exposure.initObserver()}},{key:"openWXSetting",value:function(){_index2.default.openSetting().then(function(){}).catch(function(){})}},{key:"popSignIn",value:function(){var e=this,t=(this.setState({showPop:!1}),_index2.default.pageScrollTo({scrollTop:0}).then(function(){e.childHeader.sign(),e.startGuide(1500)}),this.state),i=t.newPeople,t=t.lostPeople,t=void 0!==t&&t;void 0!==i&&i&&(0,_indexWeapp5.clickReport)({create_time:new Date,click_id:"ClickNewAwardSighIn",click_par:{}}),t&&(0,_indexWeapp5.clickReport)({create_time:new Date,click_id:"ClickBackAwardSighIn",click_par:{}})}},{key:"onShareAppMessage",value:function(e){var t=void 0,i=void 0,n=void 0;return"button"===e.from&&(n=(e=e.target.dataset.params).shareText,i=e.shareUrl,t=e.path),{title:n||"鲜豆当钱花",imageUrl:i||"https://img30.360buyimg.com/mobilecms/jfs/t1/65465/34/7772/289742/5d5ba9a2Ededf3e31/d9c6737e7ed4df17.png",path:t||"/pages/tabBar/signIn-t/index"}}},{key:"openBeansSharePop",value:function(){var t=this;try{var e=(this.state||{}).attendBeanShare;void 0!==e&&e?this.child&&this.child.getBeansShareInfo({}):this.child&&this.child.openBeansShareFun({}).then(function(e){return t.setState({attendBeanShare:e})}).catch(function(e){t.child.getBeansShareInfo({})})}catch(e){(0,_indexWeapp5.clickReport)({create_time:new Date,click_id:"err_openBeansSharePop",click_par:{err:JSON.stringify(e)}})}}},{key:"closeRule",value:function(){var e=this,t=(this.setState({showPop:!1}),this.state.attendClockActivityHis);void 0!==t&&t&&!(0,_indexWeapp4.getStorageSync)("teachPopHasShow")&&(0,_indexWeapp4.setStorageSync)("teachPopHasShow",!0),_index2.default.pageScrollTo({scrollTop:0}).then(function(){e.startGuide()})}},{key:"showPopTeach",value:function(){(0,_indexWeapp5.clickReport)({create_time:new Date,click_id:"ClickEarlyGetUp",click_par:{}})}},{key:"closeTeach",value:function(){}},{key:"monitorReport",value:function(){if(MONITOR_REPORT.monitorReportFlag){var e=MONITOR_ID.signIn.index.request,t=MONITOR_ID.signIn.index.render;try{var i=getApp(),n=MONITOR_REPORT.signInfoRequestEndTime-MONITOR_REPORT.signInfoRequestPreTime,s=(i.reportPerformance(e,n),Date.now()-MONITOR_REPORT.startTime-n);i.reportPerformance(t,s),MONITOR_REPORT.monitorReportFlag=!1}catch(e){}}}},{key:"statusAction",value:function(e,t,i){_statusAction2.statusAction.apply(void 0,[this].concat(Array.prototype.slice.call(arguments)))}},{key:"taskListRef",value:function(){var e=this;setTimeout(function(){e.childTaskList&&e.childTaskList.getTaskListData()},300)}},{key:"v33GetRewardAnimate",value:function(e){this.childTaskList&&this.childTaskList.getRewardAnimate(e)}},{key:"setScrollTop",value:function(){var t=this;var e=this.childNewBenefit.getNewBenfitFlag(),i=this.state.userInfo.alreadySignInDays;!e||(void 0===i?0:i)?this.childGuide.setState({guideIndex:4}):_index2.default.createSelectorQuery().select("#newbenefit").boundingClientRect(function(e){e=e.top-(0,_getNaviH.getNaviH)();_index2.default.pageScrollTo({scrollTop:e,duration:1500,success:function(){t.childNewBenefit.getPosition()}})}).exec()}},{key:"setTaskScroll",value:function(){var s=this;_index2.default.createSelectorQuery().select("#taskListId").boundingClientRect(function(e){var t=e.top,i=e.width,n=e.height;_index2.default.pageScrollTo({scrollTop:t-200,duration:500,success:function(){s.childGuide.setState({guideIndex:1,taskWidth:i,taskHeight:n,taskTop:t,isScrollDone:!0})}})}).exec()}},{key:"setNewBeneftScroll",value:function(){var t=this;var e=this.childNewBenefit.getNewBenfitFlag(),i=this.state.userInfo.alreadySignInDays;!e||(void 0===i?0:i)?this.childGuide.setState({guideIndex:-1}):_index2.default.createSelectorQuery().select("#newbenefit").boundingClientRect(function(e){e=e.top;_index2.default.pageScrollTo({scrollTop:e,duration:500,success:function(){t.childNewBenefit.getPosition()}})}).exec()}},{key:"setSecOrderTaskScroll",value:function(){this.setState({seckillTaskLayer:!1,secKillSideBarShow:!0}),this.childSecGoodsKill&&this.childSecGoodsKill.setSecOrderTaskScroll()}},{key:"startGuide",value:function(){var e=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;if("lost"!=this.state.sevenDaysReward.role){var i=this.state.userInfo.newUserGuide;if(void 0!==i&&i){if(1<arguments.length&&void 0!==arguments[1]&&arguments[1])return!0;setTimeout(function(){e.setState({guideFlag:!0},function(){e.childGuide&&e.childGuide.setState({guideIndex:0})})},t)}}}},{key:"handleTaskJump",value:function(){var e;(0,_indexWeapp5.clickReport)({create_time:new Date,click_id:"clickAllQuest"}),_indexWeapp6.isDaojiaApp&&_indexWeapp6.isAndroid&&0<=(0,_utils.isCompatible)(String(_indexWeapp6.djAppVersion),String("8.6.0"))?(e=window.location.origin+"/taroh5/h5dist/#/pages/signIn-t/taskList/index",(0,_indexWeapp3.jump)({type:"",to:"web",params:{extraUrlInDJ:e}})):(0,_indexWeapp10.navigateTo)("/pages/signIn-t/taskList/index")}},{key:"handleTaskJump1",value:function(){this.testLogin(!1)}},{key:"beanShareIconAnimate",value:function(){this.childFunBubble&&this.childFunBubble.beanShareIconAnimate&&this.childFunBubble.beanShareIconAnimate()}},{key:"hasOpenPushSettingHandle",value:function(){try{(0,_indexWeapp7.hasOpenPushSetting2)(this.handle.bind(this))}catch(e){HOT_FIX_REPORT.hasOpenPushSettingHandle(e)}}},{key:"handle",value:function(e){var t=this;try{HOT_FIX_REPORT.handleReportNum(),this.setState({isOpenPushStatus:e}),(0,_indexWeapp5.clickReport)({create_time:new Date,click_id:"appPushStatus",click_par:{status:1==e?"on":"off"}});var i=setInterval(function(){t.childTaskList&&(t.childTaskList.getTaskListData(),t.childTaskList.checkTimeB(),isClickPagePushSwitch&&(isClickPagePushSwitch=!1,t.refreshPushSwitchStatus(e)),clearInterval(i))},100)}catch(e){HOT_FIX_REPORT.handle(e)}}},{key:"onTouchMove",value:function(e){return e.preventDefault(),e.stopPropagation(),!1}},{key:"testLogin",value:function(){this.setState({showPopAminate:!0})}},{key:"getLimitedTimeBenefiteLists",value:function(e){this.setState({secondKillLists:e})}},{key:"jumpForConvertAB",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};this.childStoreList&&this.childStoreList.checkIsEmptyList()?this.childStoreList&&this.childStoreList.handleStoreListScroll(e,t):(0,_indexWeapp3.jump)({to:"home"})}},{key:"callToBottomList",value:function(){var e,t,i,n,s,o=this,a=(0,_indexWeapp4.getStorageSync)("isNeedToBottomList"),r=(0,_indexWeapp4.getStorageSync)("v33FullCoupon"),c="",l=(0,_indexWeapp4.getStorageSync)("v33BuyOneTaskInfo");r&&this.state.v33BuyOneTaskInfo&&(e=(i=this.state.v33BuyOneTaskInfo).awardValue,t=i.taskType,i=i.status,(r=JSON.parse(r)).awardValue=e,r.taskType=t,r.status=i,c="coupon-my-change",(0,_indexWeapp4.setStorageSync)("v33FullCoupon","")),l&&this.state.v33BuyOneTaskInfo&&((0,_indexWeapp4.setStorageSync)("v33BuyOneTaskInfo",""),l=JSON.parse(l),c="more-task"),a&&(this.childStoreList&&this.childStoreList.checkIsEmptyList()?"coupon-my-change"===c||"more-task"===c?(n="coupon-my-change"===c?r:l,s=setTimeout(function(){o.childStoreList&&o.childStoreList.handleStoreListScroll(c,n),clearTimeout(s)},400)):this.childStoreList&&this.childStoreList.handleStoreListScroll(c,r):(0,_indexWeapp3.jump)({to:"home"})),(0,_indexWeapp4.setStorageSync)("isNeedToBottomList","")}},{key:"getNewUserBenefitLists",value:function(e){this.setState({newBenefitLists:e})}},{key:"abAffectSigninReward",value:function(){var t=this;(0,_common.abTest)({experimentName:"QuestAffectSigninReward",routingValue:""}).then(function(e){e=e.result,e=(void 0===e?{}:e).strategyName;"ON"!=e&&"OFF"==e?t.setState({affectSigninReward:!1}):t.setState({affectSigninReward:!0})}).catch(function(){})}},{key:"onPageScroll",value:function(e){var t=this,i=(currentScrollPos=e.scrollTop,e.scrollTop>=secTopPos);0!=secTopPos&&this.state.secIsTop!=i&&0!=secTopPos&&this.setState({secIsTop:i}),0!=secList3Pos&&(i=e.scrollTop>=secList3Pos,!this.state.seckillTaskLayer&&i&&this.getTaskforSecKill()),this.childStoreList&&this.childStoreList.getStoreListWrapTop&&this.childStoreList.getStoreListWrapTop(function(e){e<=30&&!t.state.v33IsTop?(t.setState({v33IsTop:!0}),t.childStoreList.v33IsShowBarCel&&t.childStoreList.v33IsShowBarCel()):30<e&&t.state.v33IsTop&&t.setState({v33IsTop:!1})})}},{key:"setBarCel",value:function(){this.setState({v33IsTop:!0})}},{key:"getOneAndMoreTasksInfo",value:function(e){for(var t,i=[],n={},s=(new Date).toLocaleDateString(),o=0;o<e.length;o++){var a=e[o];506===a.taskType&&2!==a.status&&3!==a.status&&(n=a),506===a.taskType&&2===a.status&&(a.idx=o,i.push(a))}0<i.length?(t=i[0],(0,_indexWeapp4.getStorageSync)("task-"+t.taskType)&&(0,_indexWeapp4.getStorageSync)("task-"+t.taskType)==s||(this.setState({v33BuyOneTaskInfo:n,v33OneAndMoreTasks:i,v33ShowGetBeansPop:!0,v33BeanInfo:t}),(0,_indexWeapp4.setStorageSync)("task-"+t.taskType,s))):this.setState({v33BuyOneTaskInfo:n})}},{key:"v33CloseGetBeansPop",value:function(){this.setState({v33ShowGetBeansPop:!1})}},{key:"getTaskforSecKill",value:function(){this.childTaskList&&this.childTaskList.checkIsSecTaskGet()}},{key:"setSecTopPos",value:function(e){secTopPos=e+currentScrollPos}},{key:"setSecList3Pos",value:function(e){secList3Pos=0==e?e:e+currentScrollPos-screenHeight}},{key:"openSecTaskPop",value:function(){this.childTaskList&&this.childTaskList.getTaskListData(),this.setState({seckillTaskLayer:!0})}},{key:"closeSecTaskPop",value:function(e){this.setState({seckillTaskLayer:!1}),this.childTaskList&&e&&this.childTaskList.getTaskListData()}},{key:"secKillInfoCallback",value:function(e){this.setState({secKillProIsNull:e})}},{key:"handleGetSecTaskCallback",value:function(){this.setState({seckillTaskLayer:!0})}},{key:"getCurrentScrollPos",value:function(){return currentScrollPos}},{key:"handleSecTabChangeScroll",value:function(){this.childSecGoodsKill&&this.childSecGoodsKill.handleSecTabChangeScroll()}},{key:"taskGetReward",value:function(e){this.childTaskList&&e&&this.childTaskList.getReward(e.taskId,e.taskType),this.setState({seckillTaskLayer:!1})}},{key:"handleShowSecTaskSidebar",value:function(e){this.setState({isShowSecTaskSidebar:e})}},{key:"onClosePopUp",value:function(){this.setState({showPopAminate:!1})}},{key:"handleSuperOrderPop",value:function(){this.setState({showPopAminate:!0})}},{key:"_createCouponData",value:function(n){var s=this;return function(e){var t=(0,_index.genCompid)(n+"$compid__0"),i=s.state.showPopAminate;return e&&_index.propsManager.set({showPopAminate:i,onClosePopUp:s.onClosePopUp.bind(s),taskInfo:e,callToBottomList:s.jumpForConvertAB.bind(s),callToBottomListForBack:s.callToBottomList.bind(s),taskListRef:s.taskListRef.bind(s),from:1},t),{$compid__0:t,taskInfo:e}}}},{key:"onCloseTurnTableUp",value:function(){this.setState({showTurnTableUp:!1})}},{key:"handleTurnTablePop",value:function(){this.setState({showTurnTableUp:!0})}},{key:"handleTurnableClick",value:function(e){1==e?this.childHeader&&this.childHeader.sign(!1):2==e?(0,_indexWeapp10.navigateTo)("/pages/signIn-t/taskList/index?isBreath=true"):3==e&&(0,_indexWeapp10.navigateTo)("/pages/signIn-t/taskList/index"),this.setState({showTurnTableUp:!1})}},{key:"_createTurnTablePopData",value:function(r){var c=this;return function(){var e=(0,_index.genCompid)(r+"$compid__1"),t=c.state,i=t.turntableResponse,n=t.showTurnTableUp,s=t.userInfo,o=t.sevenDaysReward,a=t.taskInfoList,t=t.unDoneMoneyCount;return i&&1==i.popFlag&&_index.propsManager.set({showPopAminate:n,closeTurntableLayer:c.onCloseTurnTableUp.bind(c),turntableInfo:i,userInfo:s,sevenDaysReward:o,taskInfoList:a,unDoneMoneyCount:t,clickCallBack:c.handleTurnableClick.bind(c)},e),{$compid__1:e,turntableResponse:i}}}},{key:"wxPushAndAppPushOpc",value:function(){var e=(0,_utilsWeapp.isQueryCheck)("channel","rewardpush")||(0,_utilsWeapp.isQueryCheck)("channel","rewardwxpush");setTimeout(function(){goneToTaskList||(e&&setTimeout(function(){(0,_indexWeapp3.jump)({type:"",to:"taskList"})}),goneToTaskList=!0)},300)}},{key:"ifCrossIndustryCooperation",value:function(){var e=(0,_utilsWeapp.isQueryCheck)("ifcic",1);this.setState({ifCic:e?1:0})}},{key:"reportBusinessIdInWeapp",value:function(){var e=this.$router.params,t=e.businessId,e=e.businessid;getApp().globalData.qrcode.business=t||e}},{key:"getLoginStatus",value:function(){var e=this;try{(0,_indexWeapp2.isLogin)().then(function(){e.setState({loginStatus:!1}),e.init(e.userAction,!0)}).catch(function(){e.setState({loginStatus:!1}),e.init(e.userAction,!1)})}catch(e){HOT_FIX_REPORT.getLoginStatus(e)}}},{key:"setTimeRefresh",value:function(){var e=this,t=setInterval(function(){(0,_utils.getTaskBrowseTime)()?e.setState({needRefreshSecond:e.state.needRefreshSecond+1}):clearInterval(t)},1e3)}},{key:"refreshSignStatus",value:function(e){this.setState({hasSign:e})}},{key:"refreshPushSwitchStatus",value:function(t){var i=this;(0,_signIn.signInPushSwitch)({pushSwitch:t}).then(function(e){0==e.code&&i.setState({pushSwitch:t})}).catch(function(){})}},{key:"setIsClickPagePushSwitch",value:function(e){isClickPagePushSwitch=e}},{key:"onReachBottom",value:function(){this.childSecGoodsKill&&this.childSecGoodsKill.seckillBottomRefresh(),this.childStoreList&&this.childStoreList.storeListBottomRefresh()}},{key:"signForCic",value:function(){this.childHeader&&this.childHeader.sign(!1)}},{key:"showV31TaskGuide",value:function(){this.setState({v31FlagTask:!0});_index2.default.createSelectorQuery();_index2.default.createSelectorQuery().in(this.$scope).select("#taskListId").boundingClientRect(function(e){e=(e||{}).top;(e=150<e?e-150:e)&&_index2.default.pageScrollTo({scrollTop:e}).then(function(){})}).exec()}},{key:"handleClickV31Task",value:function(){this.setState({v31FlagTask:!1})}},{key:"getHeightAndPos",value:function(){var i=this;_index2.default.createSelectorQuery();_index2.default.createSelectorQuery().in(this.$scope).select("#taskListId").boundingClientRect(function(e){var e=e||{},t=e.top,e=e.height;t&&e&&i.setState({v31TaskGuideRect:{top:t+"px",height:e+"px"}})}).exec()}},{key:"getAbForV34",value:function(){var t=this;(0,_common.abTest)({experimentName:"couponjumpAB",routingValue:""}).then(function(e){e=e.result,e=(void 0===e?{}:e).strategyName;t.setState({v34abflag:void 0===e?"myredeem":e})}).catch(function(){})}},{key:"componentWillMount",value:function(){try{this.abAffectSigninReward(),MONITOR_REPORT.startTime=Date.now()}catch(e){HOT_FIX_REPORT.enterWillMount(e)}}},{key:"componentDidMount",value:function(){var e=this;try{this.wxPushAndAppPushOpc(),this.ifCrossIndustryCooperation(),setTimeout(function(){e.getHeightAndPos()},1e3),this.getAbForV34()}catch(e){HOT_FIX_REPORT.enterMounted(e)}}},{key:"componentDidShow",value:function(){var e=this,t=(0,_largeScreen.largeScreen)();this.setState({isLargeScreen:t});try{this.wxPushAndAppPushOpc(),this.ifCrossIndustryCooperation(),this.checkDazhuanpan(),this.reportBusinessIdInWeapp();var i,n=setInterval(function(){e.addMyMpChildern&&(e.addMyMpChildern.initData(),clearInterval(n))},100),s=(this.abAffectSigninReward(),this.callToBottomList(),_indexWeapp6.isDaojiaApp&&"7.4.5"<=_indexWeapp6.djAppVersion?this.hasOpenPushSettingHandle():i=setInterval(function(){e.childTaskList&&(e.childTaskList.getTaskListData(),e.childTaskList.checkTimeB(),clearInterval(i))},100),this.$router.params);s.userAction&&(this.userAction=decodeURIComponent(s.userAction)),s.groupId&&this.setState({urlGroupId:s.groupId}),s.channel&&isWeapp&&(0,_indexWeapp5.pvReport)({page_par:{channel:s.channel||"workwechat"}}),s.groupId&&(getApp().globalData.qrcode.business=150),this.getLoginStatus(),this.Exposure=new _indexWeapp9.default(".content >>> .exposure",this.$scope)}catch(e){HOT_FIX_REPORT.enterShow(e)}}},{key:"componentDidHide",value:function(){this.Exposure&&this.Exposure.disconnectObserver&&this.Exposure.disconnectObserver()}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=(0,_index.genCompid)(e+"$compid__2"),i=(0,_index.genCompid)(e+"$compid__3"),n=(0,_index.genCompid)(e+"$compid__4"),s=(0,_index.genCompid)(e+"$compid__5"),o=(0,_index.genCompid)(e+"$compid__6"),a=(0,_index.genCompid)(e+"$compid__7"),r=(0,_index.genCompid)(e+"$compid__8"),c=(0,_index.genCompid)(e+"$compid__9"),l=(0,_index.genCompid)(e+"$compid__10"),u=(0,_index.genCompid)(e+"$compid__11"),d=(0,_index.genCompid)(e+"$compid__12"),p=(0,_index.genCompid)(e+"$compid__13"),h=(0,_index.genCompid)(e+"$compid__14"),f=(0,_index.genCompid)(e+"$compid__15"),j=(0,_index.genCompid)(e+"$compid__16"),W=(0,_index.genCompid)(e+"$compid__17"),N=(0,_index.genCompid)(e+"$compid__18"),g=this.__state,S=g.showPoiInfo,M=g.showPop,_=g.newPersonPop,_=void 0!==_&&_,k=g.sevenDaysReward,k=void 0===k?{}:k,m=g.userInfo,m=void 0===m?{}:m,T=g.resources,T=void 0===T?[]:T,v=g.sliderData,v=void 0===v?{}:v,y=g.firstGridData,y=void 0===y?{}:y,I=g.secondGridData,I=void 0===I?{}:I,w=g.attendClockActivityHis,w=void 0!==w&&w,P=g.urlGroupId,P=void 0===P?"":P,R=(g.loading,g.loginStatus),R=void 0!==R&&R,x=g.address,x=void 0===x?{}:x,b=g.position,b=void 0===b?{left:0,top:0}:b,$=g.guideFlag,G=g.hasSiderData,F=(g.taskStatus,g.unDoneMoneyCount),E=g.isOpenPushStatus,H=g.longitude,q=g.latitude,K=g.superOrderTaskInfo,L=g.newBenefitLists,U=g.secondKillLists,B=(g.secIsTop,g.secTaskInfo),B=void 0===B?{}:B,Q=g.secKillProIsNull,J=g.seckillTaskLayer,V=(g.isShowSecTaskSidebar,g.showTurnTableUp),X=g.toExchangeButtonAbTest,z=g.taskInfoList,Z=g.affectSigninReward,O=g.hasSign,Y=g.pushSwitch,C=g.couponList,C=void 0===C?[]:C,D=g.ifCic,A=g.isShowSignIn,ee=(g.v31FlagTask,g.v31TaskGuideRect),te=g.v33BuyOneTaskInfo,ie=g.v33ShowGetBeansPop,ne=g.v33IsTop,se=g.v34abflag,g=g.isLargeScreen,ee=(0,_index.internal_inline_style)(ee),K=0!==A?this._createCouponData(e+"GogXZVKcIf")(K):null,V=0!==A&&V?this._createTurnTablePopData(e+"rhGkWTcXfA")():null,e=0!==A?!R:null;return 0!==A&&_index.propsManager.set({sevenDaysReward:k,userInfo:m,unDoneMoneyCount:F,attendClockActivityHis:w,secTaskInfo:B,secKillProIsNull:Q,urlGroupId:P,latitude:q,longitude:H,address:x,newBenefitLists:L,secondKillLists:U,resources:T,toExchangeButtonAbTest:X,affectSigninReward:Z,taskInfoList:z,isOpenPushStatus:E,pushSwitch:Y,ifCic:D,v33BuyOneTaskInfo:te,openBeansSharePop:this.openBeansSharePop.bind(this),showPopTeach:this.showPopTeach.bind(this),signInInfo:this.signInInfo.bind(this),openSecTaskPop:this.openSecTaskPop.bind(this),getTaskforSecKill:this.getTaskforSecKill.bind(this),refreshSignStatus:this.refreshSignStatus.bind(this),refreshPushSwitchStatus:this.refreshPushSwitchStatus.bind(this),setIsClickPagePushSwitch:this.setIsClickPagePushSwitch.bind(this),callToBottomList:this.jumpForConvertAB.bind(this),showV31TaskGuide:this.showV31TaskGuide.bind(this)},t),0!==A&&_index.propsManager.set({sliderData:v,openBeansSharePop:this.openBeansSharePop.bind(this)},i),0!==A&&$&&g&&_index.propsManager.set({statusAction:this.statusAction.bind(this),pos:b,hasSiderData:G,sevenDaysReward:k,showPop:M&&!(!O&&1==D&&C&&0<C.length)},n),0!==A&&ie&&_index.propsManager.set({v33BeanInfo:this.__state.v33BeanInfo,v33OneAndMoreTasks:this.__state.v33OneAndMoreTasks,taskListRef:this.taskListRef.bind(this),v33CloseGetBeansPop:this.v33CloseGetBeansPop.bind(this),v33GetRewardAnimate:this.v33GetRewardAnimate.bind(this)},s),0!==A&&_index.propsManager.set({userLogin:e,urlGroupId:P,beanShareIconAnimate:this.beanShareIconAnimate.bind(this),closeBeanShareLayer:this.closeBeanShareLayer.bind(this)},o),0!==A&&S&&_index.propsManager.set({openBeansSharePop:this.openBeansSharePop.bind(this),resources:T},a),0!==A&&S&&_index.propsManager.set({v34abflag:se,signInInfo:this.signInInfo.bind(this),statusAction:this.statusAction.bind(this),taskListRef:this.taskListRef.bind(this),getNewUserBenefitLists:this.getNewUserBenefitLists.bind(this),callToBottomList:this.jumpForConvertAB.bind(this)},r),0===A||!S||L&&L.items&&0<L.items.length||_index.propsManager.set({v34abflag:se,address:x,statusAction:this.statusAction.bind(this),taskListRef:this.taskListRef.bind(this),getLimitedTimeBenefiteLists:this.getLimitedTimeBenefiteLists.bind(this),callToBottomList:this.jumpForConvertAB.bind(this)},c),0!==A&&S&&_index.propsManager.set({from:"index",router:this.$router,handleSuperOrderPop:this.handleSuperOrderPop.bind(this),handleTaskListDataLoaded:this.handleTaskListDataLoaded.bind(this),handleGetSecTaskCallback:this.handleGetSecTaskCallback.bind(this),isOpenPushStatus:E,setTimeRefresh:this.setTimeRefresh.bind(this),callToBottomList:this.jumpForConvertAB.bind(this),callToBottomListForBack:this.callToBottomList.bind(this),getOneAndMoreTasksInfo:this.getOneAndMoreTasksInfo.bind(this)},l),0!==A&&S&&_index.propsManager.set({data:y},u),0!==A&&S&&_index.propsManager.set({data:I},d),0!==A&&S&&_index.propsManager.set({isTop:ne,setSecTopPos:this.setSecTopPos.bind(this),setBarCel:this.setBarCel.bind(this),callInitObserver:this.callInitObserver.bind(this),getCurrentScrollPos:this.getCurrentScrollPos.bind(this),v33BuyOneTaskInfo:te},p),0!==A&&S&&J&&_index.propsManager.set({secTaskInfo:B,closeSecTaskPop:this.closeSecTaskPop.bind(this),getReward:this.taskGetReward.bind(this),setSecOrderTaskScroll:this.setSecOrderTaskScroll.bind(this)},h),0!==A&&S&&B&&(2==B.status||1==B.status&&Q)&&_index.propsManager.set({secTaskInfo:B,closeSecTaskPop:this.closeSecTaskPop.bind(this),openOrderTaskPop:this.openSecTaskPop.bind(this)},f),0!==A&&S&&M&&_index.propsManager.set({newPersonPop:_,hasSign:O,sevenDays:k,popSignIn:this.popSignIn.bind(this),closeRule:this.closeRule.bind(this),isLargeScreen:g},j),0!==A&&Z&&O&&_index.propsManager.set({taskInfoList:z,taskListRef:this.taskListRef.bind(this)},W),0!==A&&!O&&1==D&&C&&0<C.length&&_index.propsManager.set({ifCic:D,couponList:C,sevenDaysReward:k,signForCic:this.signForCic.bind(this)},N),Object.assign(this.__state,{anonymousState__temp3:ee,anonymousState__temp4:e,$compid__2:t,$compid__3:i,$compid__4:n,$compid__5:s,$compid__6:o,$compid__7:a,$compid__8:r,$compid__9:c,$compid__10:l,$compid__11:u,$compid__12:d,$compid__13:p,$compid__14:h,$compid__15:f,$compid__16:j,$compid__17:W,$compid__18:N,style:_indexModuleScssMap2.default,showPoiInfo:S,newBenefitLists:L,anonymousState__temp:K,anonymousState__temp2:V}),this.__state}}]),o}(),_class.$$events=["handleClickV31Task","onPageScroll","goToLogin","handleTaskJump","toHome"],_class.options={},_class.multipleSlots=!0,_class.$$componentPath="pages/tabBar/signIn-t/index",_temp2);exports.default=Index,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Index,!0));
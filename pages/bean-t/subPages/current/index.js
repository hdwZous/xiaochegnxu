"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function i(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,a){return t&&i(e.prototype,t),a&&i(e,a),e}}(),_get=function e(t,a,i){null===t&&(t=Function.prototype);var s=Object.getOwnPropertyDescriptor(t,a);return void 0!==s?"value"in s?s.value:void 0!==(s=s.get)?s.call(i):void 0:null!==(s=Object.getPrototypeOf(t))?e(s,a,i):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_bean=require("../../../../common-mp/api/bean.js"),_indexWeapp2=require("../../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_indexWeapp3=require("../../../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),_indexWeapp4=require("../../../../npm/@jd/djmp/common-t/js/env/index.weapp.js"),_indexWeapp5=require("../../../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),_indexWeapp6=require("../../../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_utils=require("../../js/utils.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_utils2=require("../../../../common-mp/components/TaskListForSignNew/js/utils.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var couponGoObj=null,timer=null,lastTime=0,isDoubleHits=!1,isFirstDoubleHits=!0,isWeapp=!0,Current=(_temp2=_class=function(){function o(){var e,t;_classCallCheck(this,o);for(var a=arguments.length,i=Array(a),s=0;s<a;s++)i[s]=arguments[s];return(e=t=_possibleConstructorReturn(this,(t=o.__proto__||Object.getPrototypeOf(o)).call.apply(t,[this].concat(i)))).$usedState=["anonymousState__temp4","anonymousState__temp5","$compid__263","$compid__264","$compid__265","$compid__266","$compid__267","data","style","countDownStr","result","LatestDivide","resourcesList","imgUrl","preFinnshTips","treeAmimate","showWaterWheelNotice","waterCart","anonymousState__temp","anonymousState__temp2","WaterWheelNums","kettleAnimate","handShowTime","beansLotteryInfoData","happyRecieve","textInfoShow","anonymousState__temp3","storeCouponLayer","showSpeedNotice","happyRecieveMsgs","kettleImg","transition0","transition1","transition2","showPopAminate","resourceInfo","taskList","disabled","treeClickdisabled","getWaterDisabled","dailyWater","coldAmimate","coldAmimateImg","timer2","showHandAmimate","levalNum","reachPointTimes","animateKettleActive","animateDripsActive","processValue","showSubscribeMessage","teamInfoShow","waterTipsShow","waterTipsNums","kettleBreatheAnimate","kettleMoveAnimate","showPopForSuperOrder","superOrderTaskInfo","taskToast","toStoreInfo","shareInfo","groupId","router","isNewer","goToLoginProps","__fn_onNoticePopUp","setWaterFormGuideFalse","setShowRisePopByChild","setLevelPicByChild","waterFromGuide","onChangePage","onShowRules"],t.customComponents=["MessageBoard","MarqueeBean","PopUp","BrowseStoreCouponPop","TeamsLayer","SubscribeMessage","SuperOrderTaskPop"],_possibleConstructorReturn(t,e)}return _inherits(o,_index.Component),_createClass(o,[{key:"_constructor",value:function(e){var t=this;_get(o.prototype.__proto__||Object.getPrototypeOf(o.prototype),"_constructor",this).call(this,e),this.shareFlag=!0,this.state={kettleImg:"",transition0:{},transition1:{},transition2:{},happyRecieve:!0,showPopAminate:!1,resourceInfo:{resourcesList:[]},taskList:[],disabled:!1,treeClickdisabled:!1,beansLotteryInfoData:{},textInfoShow:!0,getWaterDisabled:!1,waterCart:0,dailyWater:0,coldAmimate:!0,coldAmimateImg:"",kettleAnimate:!0,timer2:null,showHandAmimate:!0,levalNum:0,reachPointTimes:0,showWaterWheelNotice:!1,showSpeedNotice:!1,animateKettleActive:"",animateDripsActive:"",treeAmimate:"",processValue:"",WaterWheelNums:0,imgUrl:"",data:{},result:{},showSubscribeMessage:!1,teamInfoShow:!1,happyRecieveMsgs:"",waterTipsShow:!1,waterTipsNums:0,kettleBreatheAnimate:"",kettleMoveAnimate:"",LatestDivide:[],showPopForSuperOrder:!1,superOrderTaskInfo:{},taskToast:"",storeCouponLayer:!1,toStoreInfo:{}},this.$$refs=[{type:"dom",id:"kettle",refName:"kettleBtn",fn:null},{type:"component",id:"dPgne",refName:"",fn:function(e){return t.childPop=e}},{type:"component",id:"MvuRH",refName:"",fn:function(e){return t.child=e}},{type:"component",id:"KVAmH",refName:"",fn:function(e){return t.childSubscribe=e}},{type:"component",id:"ljzDu",refName:"",fn:function(e){return t.childTaskSuPop=e}}]}},{key:"componentDidMount",value:function(){var e=this;this.getCurrentData(),this.getTaskListInfo(!1),setTimeout(function(){e.showTeamInfoFromShare()},2e3),this.refreshbCallInDjApp()}},{key:"componentDidHide",value:function(){clearInterval(this.state.timer2),this.setState({timer2:null})}},{key:"componentDidShow",value:function(){}},{key:"componentWillUnmount",value:function(){this.setBodyScrollInH5()}},{key:"componentWillReceiveProps",value:function(e){e=e.waterFromGuide;e!=this.state.waterFromGuide&&e&&this.onWaterFromGuide()}},{key:"_createData",value:function(){var e=this,t=(this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix),a=(0,_index.genCompid)(t+"$compid__263"),i=(0,_index.genCompid)(t+"$compid__264"),s=(0,_index.genCompid)(t+"$compid__265"),o=(0,_index.genCompid)(t+"$compid__266"),n=(0,_index.genCompid)(t+"$compid__267"),r=this.__state,p=(r.happyRecieve,r.taskList),c=r.showPopAminate,u=(r.textInfoShow,r.beansLotteryInfoData,r.waterCart,r.kettleAnimate,r.showWaterWheelNotice,r.showSpeedNotice,r.animateDripsActive,r.treeAmimate,r.processValue),l=(r.imgUrl,r.WaterWheelNums,r.data),d=r.result,h=r.teamInfoShow,m=(r.happyRecieveMsgs,r.kettleBreatheAnimate,r.kettleMoveAnimate,r.LatestDivide),f=r.superOrderTaskInfo,f=void 0===f?{}:f,_=(r.showPopForSuperOrder,r.storeCouponLayer),r=r.toStoreInfo,v=this.__props,g=v.shareInfo,y=(v.onShowRules,v.onChangePage,v.countDownStr),S=v.preFinnshTips,v=v.groupId,w=(0,_indexWeapp5.getStorageSync)("handShowTime")||0,d=d&&d.resourceInfo&&d.resourceInfo.resourcesList?d.resourceInfo.resourcesList:[],k=l?this._createWaterTipsData(t+"hFwlXUwVuw")():null,I=l?this._createKettleAndDripsData(t+"gEWEyHhmFJ")():null,t=l?this._createCouponData(t+"IXGkWKbqOF")(f):null,f=(this.anonymousFunc0=function(){return e.__props.onChangePage(0)},this.anonymousFunc1=function(){return e.__props.onChangePage(0)},this.anonymousFunc2=function(){return e.__props.onChangePage(2)},this.anonymousFunc3=function(){return e.__props.onChangePage(1)},l.maxLevel?(0,_index.internal_inline_style)({width:"100%"}):null),u=(0,_index.internal_inline_style)({width:u+"%"});return this.anonymousFunc4=function(){return e.__props.onShowRules()},l&&m&&0<m.length&&_index.propsManager.set({data:m},a),l&&_index.propsManager.set({showPopAminate:c,onClosePopUp:this.onClosePopUp.bind(this),getTaskListInfo:this.getTaskListInfo.bind(this),updataKettle:this.updataKettle.bind(this),taskList:p,title:"领水滴",shareInfo:g,handleSuperOrderPop:this.handleSuperOrderPop.bind(this),handleToStore:this.handleToStore.bind(this),router:this.__props.router},i),l&&_&&_index.propsManager.set({taskInfo:r,closeCouponLayer:this.closeCouponLayer.bind(this),finishTaskForStore:this.finishTaskForStore.bind(this)},s),l&&_index.propsManager.set({teamInfoShow:h,groupId:v,setShowTeamInfoByChild:this.setShowTeamInfo.bind(this),setShowRisePopByChild:this.updateDataAfterPlane.bind(this),updataRainsView:this.updataRainsView.bind(this),updataCurrentData:this.getCurrentData.bind(this)},o),_index.propsManager.set({subscribeMessageImageUrl:"https://storage.360buyimg.com/wximg/common/noticeImage.png"},n),Object.assign(this.__state,{anonymousState__temp4:f,anonymousState__temp5:u,$compid__263:a,$compid__264:i,$compid__265:s,$compid__266:o,$compid__267:n,style:_indexModuleScssMap2.default,countDownStr:y,resourcesList:d,preFinnshTips:S,anonymousState__temp:k,anonymousState__temp2:I,handShowTime:w,anonymousState__temp3:t}),this.__state}},{key:"showTeamInfoFromShare",value:function(){var e=this,t=getCurrentPages().length||1,t=getCurrentPages()[t-1].options,a=t.groupId,t=(t.activityId,t.scene),t=(!t||0<(t=decodeURIComponent(t).split(",")).length&&(a=t[0]),this.state.teamInfoShow);!a||t||this.props.isNewer||this.child&&this.child.getCarveUpInfo&&this.child.getCarveUpInfo({groupId:a},function(){e.setState({teamInfoShow:!0})},500)}},{key:"showTeamInfoFromShareNewer",value:function(){var e=this,t=getCurrentPages().length||1,t=getCurrentPages()[t-1].options,a=t.groupId,t=t.scene,t=(!t||0<(t=decodeURIComponent(t).split(",")).length&&(a=t[0]),this.state.teamInfoShow);a&&!t&&this.props.isNewer&&this.child.getCarveUpInfo({groupId:a},function(){e.setState({teamInfoShow:!0})},500)}},{key:"_throttleSetShowTeamInfo",value:function(e){var t=this;this._throttle(function(){t.setShowTeamInfo(e)},1e3)}},{key:"setShowTeamInfo",value:function(e){var t=this;e?this.child.getCarveUpInfo({},function(){t.setState({teamInfoShow:e})}):this.setState({teamInfoShow:e})}},{key:"getCurrentData",value:function(){var i=this;(0,_indexWeapp3.isLogin)().then(function(e){var t=(0,_utils.setParamsInGetInitData)();(0,_bean.getCurrentPageData)(t).then(function(e){var t,a=e.code,e=e.result;"0"==a||0==a?e&&(e.cur&&(t=e.cur,i.setState({processValue:(t.levelProgress/t.totalProgress*100).toFixed(2),WaterWheelNums:t.water,data:t,waterCart:t.waterCart}),clearInterval(i.state.timer2),i.waterWheelAnimte(t.dailyWater||0,1500-Number(t.dailyWater))),e.resourceInfo&&0<e.resourceInfo.resourcesList.length&&i.setState({imgUrl:e.resourceInfo.resourcesList[0].imgUrl||""}),i.setState({result:e})):"201"!=a&&201!=a&&"202"!=a&&202!=a||setTimeout(function(){i.props.goToLoginProps()},2e3)}).catch(function(e){(0,_indexWeapp2.showToast)({title:e.msg||"网络开小差，请稍后重试"})}),i.onLatestDivideResult()}).catch(function(e){setTimeout(function(){i.props.goToLoginProps()},2e3)})}},{key:"getTaskListInfo",value:function(s){var o=this;(0,_bean.taskListInfo)({modelId:"M10003",plateCode:this.getPlateCode()}).then(function(e){if(0==e.code||"0"==e.code){for(var t=e.result.taskInfoList,a={},i=0;i<t.length;i++)if(513==t[i].taskType){a=t[i];break}e.result.toast?o.setState({taskList:t,superOrderTaskInfo:a,taskToast:e.result.toast}):o.setState({taskList:t,superOrderTaskInfo:a})}s&&o.getCurrentData()}).catch(function(e){s&&o.getCurrentData()})}},{key:"waterWheelAnimte",value:function(e,t){var a=this,i=(clearInterval(this.state.timer2),this.setState({timer2:null}),this),s=t||0,o=this.state.reachPointTimes;e<1500?(t=setInterval(function(){var e;a.state.waterCart<300?(i.setState({waterCart:a.state.waterCart+1}),--s):i.setState({waterCart:300}),0==s&&0==o&&(i.setState({reachPointTimes:1}),clearInterval(a.state.timer2),a.setState({timer2:null}),e=setInterval(function(){a.state.waterCart<300?i.setState({waterCart:a.state.waterCart+1}):i.setState({waterCart:300})},6e4),a.setState({timer2:e}))},1e3),this.setState({timer2:t})):(clearInterval(this.state.timer2),this.setState({timer2:null}),e=setInterval(function(){a.state.waterCart<300?i.setState({waterCart:a.state.waterCart+1}):i.setState({waterCart:300})},6e4),this.setState({timer2:e}))}},{key:"popUp",value:function(){var e=this.state,t=e.taskList,e=e.taskToast;0==t.length?(0,_indexWeapp2.showToast)({title:"没有赚水任务哦"}):(e&&(_index2.default.showToast({title:e,icon:"none",duration:3e3}),this.setState({taskToast:""})),this.setState({showPopAminate:!0}),this.checkTaskBrowse(),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickWaterQuest",click_par:{activityId:this.state.data.activityId||""}}),this.setBodyScrollInH5(!1))}},{key:"checkTaskBrowse",value:function(){var a=this,i=setInterval(function(){var e,t=(0,_utils2.getTaskBrowseTimeBean)();t&&((0,_utils2.checkTaskBrowseTimeBean)()?(e=void 0,e="string"==typeof t?JSON.parse(t):JSON.parse(JSON.stringify(t)),a.finishTaskForStore(e.info)):(0,_indexWeapp2.showToast)({title:"时间太短啦~"}),(0,_utils2.resetTaskBrowseTimeBean)()),clearInterval(i)},300)}},{key:"onClosePopUp",value:function(){this.setState({showPopAminate:!1}),this.setBodyScrollInH5()}},{key:"setBodyScrollInH5",value:function(){}},{key:"_throttleOnClickTree",value:function(){var e=this;this._throttle(function(){e.onClickTree()},1e3)}},{key:"onClickTree",value:function(){var i=this,e=this.state.treeClickdisabled;void 0!==e&&e||(this.setState({treeClickdisabled:!0,happyRecieve:!0,textInfoShow:!0,treeAmimate:"treeAmimate"}),setTimeout(function(){i.setState({treeAmimate:""})},1e3),(0,_bean.beansLotteryInfo)({activityId:this.state.data.activityId||""}).then(function(e){var t,a;i.setState({treeClickdisabled:!1,happyRecieve:!0,textInfoShow:!0}),0==e.code?(a=e.result,i.setState({beansLotteryInfoData:a}),"TEXT"==a.lotteryType?(i.setState({textInfoShow:!1}),setTimeout(function(){i.setState({textInfoShow:!0})},2100)):"COUPON"==a.lotteryType?(i.setState({happyRecieve:!1}),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"showClickBeanPopup",click_par:{type:"coupon",waterNum:a.water||0,activityId:i.state.data.activityId||"",couponCode:a.couponCode||""}})):"WATER"==a.lotteryType?(i.setState({happyRecieve:!1}),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"showClickBeanPopup",click_par:{type:"water",waterNum:a.water||0,activityId:i.state.data.activityId||""}})):"AUTO_COUPON"==a.lotteryType?(t=(a=e.result.couponInfo).markState,a=a.couponGo,i.setState({happyRecieve:!1,happyRecieveMsgs:3==t?"去使用":"去领取"}),couponGoObj=a):(0,_indexWeapp2.showToast)({title:"什么也没有，再接再厉"})):(0,_indexWeapp2.showToast)({title:e.msg||"网络开小差，请稍后重试"})}).catch(function(e){i.setState({treeClickdisabled:!1}),(0,_indexWeapp2.showToast)({title:e.msg||"网络开小差，请稍后重试"})}),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickBean",click_par:{activityId:this.state.data.activityId||""}}))}},{key:"_throttleGetWater",value:function(){var e=this;this._throttle(function(){e.getWater()},500)}},{key:"getWater",value:function(){var a=this,e=this.state,t=e.getWaterDisabled,e=e.data;void 0!==t&&t||(this.setState({getWaterDisabled:!0}),(0,_bean.getWaterInfo)({activityId:e.activityId||""}).then(function(e){var t;a.setState({getWaterDisabled:!1}),0==e.code?(t=e.result,a.setState({WaterWheelNums:t.water,waterCart:0}),a.waterWheelAnimte(t.dailyWater||0,1500-Number(t.dailyWater)),e.result.speedFlag&&a.setState({showSpeedNotice:!0}),1500<t.dailyWater&&0==t.addWater?(0,_indexWeapp2.showToast)({title:"水车太累啦，速度变慢但在努力生产中，过会儿再来领吧"}):t.dailyWater<=1500&&0==t.addWater||(a.getWaterAmimate(),a.setState({showWaterWheelNotice:!0}),setTimeout(function(){a.setState({showWaterWheelNotice:!1})},2e3)),300<=t.addWater&&a.childSubscribe.initSubscribeMessage(["oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs"],[5]),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickWaterwheel",click_par:{collectWater:t.addWater||0,activityId:a.state.data.activityId||""}})):(0,_indexWeapp2.showToast)({title:"水车晃悠悠,请等一下吧"})}).catch(function(e){a.setState({getWaterDisabled:!1}),(0,_indexWeapp2.showToast)({title:e.msg||"水车晃悠悠,请等一下吧"})}))}},{key:"getWaterAmimate",value:function(){var e=this;this.setState({kettleAnimate:!1}),setTimeout(function(){e.setState({getWaterAmimate:!0,kettleAnimate:!0})},1500)}},{key:"_throttleOnWatering",value:function(){this.doubleHit()}},{key:"doubleHit",value:function(){var e,t=this,a=this.state,i=a.coldAmimate,i=void 0===i||i,s=a.WaterWheelNums,a=a.waterTipsShow,o=800,o=460;isDoubleHits=!0,isFirstDoubleHits&&(isFirstDoubleHits=!1,lastTime=Date.now());!i||s<100&&(t.onWatering(),1)||((200<=s||a)&&(i=Date.now()-lastTime<o,wx.vibrateShort({success:function(){},fail:function(){}}),i?(isDoubleHits=!0,lastTime=Date.now(),t.showTipsAndChangeWater()):(isDoubleHits=!1,lastTime=Date.now(),t.setState({waterTipsShow:!1,kettleBreatheAnimate:"kettleBreatheAnimate"}))),(s=t.state).WaterWheelNums,s.waterTipsNums,s=o,e=0,isDoubleHits||(s=400,e=100),timer&&clearTimeout(timer),timer=setTimeout(function(){t.setState({waterTipsShow:!1,waterTipsNums:e}),isFirstDoubleHits=!0,t.onWatering()},s))}},{key:"_createWaterTipsData",value:function(e){var a=this;return function(){var e=a.state,t=e.waterTipsShow,e=e.waterTipsNums;return{waterTipsShow:t,style:_indexModuleScssMap2.default,waterTipsNums:e}}}},{key:"_createKettleAndDripsData",value:function(e){var i=this;return function(){var e=i.state,t=e.kettleMoveAnimate,a=e.kettleBreatheAnimate,e=e.animateDripsActive;return{style:_indexModuleScssMap2.default,kettleMoveAnimate:t,kettleBreatheAnimate:a,animateDripsActive:e}}}},{key:"showTipsAndChangeWater",value:function(){var e=this.state,t=e.waterTipsNums,e=e.WaterWheelNums;100<=e&&this.setState({waterTipsShow:!0,waterTipsNums:t+100,WaterWheelNums:e-100,kettleBreatheAnimate:"kettleBreatheAnimate"})}},{key:"moveKettle",value:function(){var e=this;this.setState({kettleMoveAnimate:"kettleMoveAnimate"},function(){setTimeout(function(){e.setState({kettleMoveAnimate:""})},2500)})}},{key:"onWatering",value:function(){var a,i,s,o=this,e=this.state,t=e.coldAmimate,n=e.WaterWheelNums,r=e.data,e=e.waterTipsNums;void 0!==t&&!t||(0==(0,_indexWeapp5.getStorageSync)("handShowTime")?(0,_indexWeapp5.setStorageSync)("handShowTime",1):1==(0,_indexWeapp5.getStorageSync)("handShowTime")?(0,_indexWeapp5.setStorageSync)("handShowTime",2):2==(0,_indexWeapp5.getStorageSync)("handShowTime")?(0,_indexWeapp5.setStorageSync)("handShowTime",3):3<=(0,_indexWeapp5.getStorageSync)("handShowTime")&&(0,_indexWeapp5.setStorageSync)("handShowTime",999),o.setState({coldAmimate:!1,showHandAmimate:!1,kettleBreatheAnimate:""}),setTimeout(function(){o.setState({showHandAmimate:!0})},2e3),a=function(){setTimeout(function(){o.setState({coldAmimate:!0})},2500)},i=function(){o.setState({coldAmimate:!0})},s=function(){setTimeout(function(){o.setState({animateDripsActive:"animateDripsActive"}),setTimeout(function(){o.setState({animateDripsActive:""})},600)},1800)},n<100&&e<=100?(i(),(0,_bean.taskListInfo)({modelId:"M10003",plateCode:o.getPlateCode()}).then(function(e){var t;0==e.code?e.result&&(t=e.result.taskInfoList,o.setState({taskList:t}),1==e.result.status)?((0,_indexWeapp2.showToast)({title:"水滴不足，做任务获取水滴吧"}),isDoubleHits||o.popUp()):(0,_indexWeapp2.showToast)({title:"水滴不足，等等就能领了喔"}):(0,_indexWeapp2.showToast)({title:"网络开小差，请稍后重试吧"})}).catch(function(e){(0,_indexWeapp2.showToast)({title:"网络繁忙,请稍后重试"})}),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickWatering",click_par:{status:"失败",activityId:r.activityId||""}})):(0,_bean.watering)({activityId:r.activityId||"",waterAmount:e}).then(function(e){var t;o.moveKettle(),s(),("0"==e.code?(t=e.result,o.updataStateData(t),a):((0,_indexWeapp2.showToast)({title:e.msg||"浇水失败！"}),i))(),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickWatering",click_par:{status:"成功",activityId:o.state.data.activityId||""}})}).catch(function(e){(0,_indexWeapp2.showToast)({title:e.msg||"服务异常"}),a(),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickWatering",click_par:{status:"失败",activityId:o.state.data.activityId||""}})}),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"ClickWatering"}))}},{key:"onHappyRecieveBtn",value:function(){var e=this,t=(this.onHideRecieve(),this.state),a=t.beansLotteryInfoData,t=t.WaterWheelNums;"WATER"==a.lotteryType&&(this.setState({WaterWheelNums:t+a.water,kettleAnimate:!1}),setTimeout(function(){e.setState({kettleAnimate:!0})},1500))}},{key:"onHideRecieve",value:function(){this.setState({happyRecieve:!0})}},{key:"onHappyRecieve",value:function(){var e=this,t=(this.onHideRecieve(),this.state),a=t.WaterWheelNums,t=t.beansLotteryInfoData;"WATER"==t.lotteryType?(this.setState({WaterWheelNums:a+t.water,kettleAnimate:!1}),setTimeout(function(){e.setState({kettleAnimate:!0})},1500),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickBeanPopupButton",click_par:{type:"water",waterNum:t.water||0,activityId:this.state.data.activityId||""}})):"COUPON"==t.lotteryType?(a="/pages/farm-t/storelist/index?couponId="+t.couponInfo.couponId,(0,_indexWeapp2.navigateTo)(a),clearInterval(this.state.timer2),this.setState({timer2:null}),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickBeanPopupButton",click_par:{type:"coupon",waterNum:t.water||0,activityId:this.state.data.activityId||"",couponCode:t.couponCode||""}})):"AUTO_COUPON"==t.lotteryType?(t=(a=couponGoObj).orgCode,a=a.storeId,(0,_indexWeapp6.jump)({to:"store",params:{storeId:void 0===a?"":a,orgCode:void 0===t?"":t}})):(this.getCurrentData(),clearInterval(this.state.timer2),this.setState({timer2:null}))}},{key:"taskClickEvent",value:function(){var e=this.state.result.resourceInfo?this.state.result.resourceInfo.resourcesList:[],t=e[0].url;t&&(_indexWeapp4.isDaojiaApp&&0<=(0,_utils2.isCompatible)(String(_indexWeapp4.djAppVersion),String("8.6.0"))?(0,_indexWeapp6.jump)({type:"",to:"web",params:{extraUrlInDJ:t}}):(-1<t.indexOf("friendHelp")||-1<t.indexOf("friendhelp")?(0,_indexWeapp6.jump)({type:"",to:"friendHelpList"}):-1<t.indexOf("bargain/list")?(0,_indexWeapp6.jump)({type:"",to:"bargainList"}):-1<t.indexOf("bargain/detail")?(0,_indexWeapp6.jump)({type:"",to:"bargainDetail"}):-1<t.indexOf("punch-t")?(0,_indexWeapp6.jump)({type:"",to:"punch"}):-1<t.indexOf("lottery")?(0,_indexWeapp6.jump)({type:"",to:"lottery"}):-1<t.indexOf("GroupBuy")?(0,_indexWeapp6.jump)({type:"",to:"groupBuyList"}):-1<t.indexOf("taskList")?(0,_indexWeapp6.jump)({type:"",to:"taskList"}):-1<t.indexOf("signIn-t")?(0,_indexWeapp6.jump)({type:"",to:"newSignIn"}):-1<t.indexOf("firstOrderFission-t")?(0,_indexWeapp6.jump)({type:"",to:"firstOrderFission"}):(0,_indexWeapp2.navigateTo)("/pages/h5/index?url="+encodeURIComponent(t)),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickAd",click_par:{title:e[0].title||""}})))}},{key:"_throttle",value:function(e,t){var a=this;this.shareFlag&&(this.shareFlag=!1,e.apply(this,arguments),setTimeout(function(){a.shareFlag=!0},t||2e3))}},{key:"getPlateCode",value:function(){return 5}},{key:"showSpeedNotice",value:function(){this.setState({showSpeedNotice:!1})}},{key:"updataKettle",value:function(e){var t=this.state.WaterWheelNums;this.setState({WaterWheelNums:t+Number(e)})}},{key:"subscribeMessage",value:function(){var t=this,a=!0,e=setTimeout(function(){a?t.props.onNoticePopUp(!0,"https://storage.360buyimg.com/wximg/common/noticeImage.png"):t.props.onNoticePopUp(!1,"https://storage.360buyimg.com/wximg/common/noticeImage.png"),clearInterval(e)},1e3);wx.requestSubscribeMessage({tmplIds:["oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs"],success:function(e){"requestSubscribeMessage:ok"!=e.errMsg||"accept"!=e.oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs&&"reject"!=e.oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs||(a=!1,t.subscribeMessageUpdata("oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs",e.oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs,5)),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"subscribeMessage",click_par:{tempId:"oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs",status:e.oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs||"",channelId:5,errMsg:e.errMsg}}),t.props.onNoticePopUp(!1,"https://storage.360buyimg.com/wximg/common/noticeImage.png")},fail:function(e){t.props.onNoticePopUp(!1,"https://storage.360buyimg.com/wximg/common/noticeImage.png"),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"subscribeMessage",click_par:{tempId:"oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs",status:"false",channelId:5,errMsg:e.errMsg}})},complete:function(){}})}},{key:"subscribeMessageUpdata",value:function(e,t,a){var i=getApp().globalData.loginStateInfo;subscribeMsginfo({openId:i.openId||"",templates:[{templateId:e,status:t,channelId:a}]}).then(function(e){}).catch(function(e){})}},{key:"onWaterFromGuide",value:function(){this.onWatering(),this.props.setWaterFormGuideFalse()}},{key:"setShowRisePopByChild",value:function(e){this.props.setShowRisePopByChild(e)}},{key:"updataRainsView",value:function(e){this.rainsChild&&this.rainsChild.carveUpInfoView(e)}},{key:"updataStateData",value:function(e){var t=this,a=(e.levelProgress/e.totalProgress*100).toFixed(2),i=this.state.data;e.maxLevel&&(i.maxLevel=e.maxLevel),0<e.level?this.setState({data:i,WaterWheelNums:this.state.WaterWheelNums-100}):this.setState({WaterWheelNums:e.water,data:i}),setTimeout(function(){i.level=e.levelUp,i.levelProgress=e.levelProgress,i.totalProgress=e.totalProgress,e.level<=0?t.setState({processValue:a,data:i}):t.setState({data:i}),0<e.level&&(t.props.onShowRisePop(e,t.state.data.activityId),setTimeout(function(){e.pic&&(i.levelPic=e.pic),t.props.setLevelPicByChild(e.pic),t.setState({WaterWheelNums:e.water,processValue:a,data:i})},100))},2500)}},{key:"updateDataAfterPlane",value:function(e){var t=this,a=(e.levelProgress/e.totalProgress*100).toFixed(2),i=this.state.data;e.maxLevel&&(i.maxLevel=e.maxLevel),this.setState({WaterWheelNums:e.water}),setTimeout(function(){i.level=e.levelUp,i.levelProgress=e.levelProgress,i.totalProgress=e.totalProgress,e.level<=0?t.setState({processValue:a,data:i}):t.setState({data:i}),0<e.level&&(t.props.onShowRisePop(e,t.state.data.activityId),setTimeout(function(){e.pic&&(i.levelPic=e.pic),t.props.setLevelPicByChild(e.pic),t.setState({WaterWheelNums:e.water,processValue:a,data:i})},100))},1500),this.rainsChild&&this.rainsChild.getCarveUpInfo()}},{key:"onLatestDivideResult",value:function(){var t=this;(0,_bean.latestDivideResult)({number:100}).then(function(e){e&&"0"==e.code&&t.setState({LatestDivide:e.result||[]})}).catch(function(e){})}},{key:"taskListRef",value:function(){this.getTaskListInfo(!1)}},{key:"onClosePopUpForSpuerOrder",value:function(){this.setState({showPopForSuperOrder:!1}),this.popUp()}},{key:"handleSuperOrderPop",value:function(){this.setState({showPopForSuperOrder:!0})}},{key:"_createCouponData",value:function(i){var s=this;return function(e){var t=(0,_index.genCompid)(i+"$compid__268"),a=s.state.showPopForSuperOrder;return e&&_index.propsManager.set({showPopAminate:a,updataKettle:s.updataKettle.bind(s),onClosePopUp:s.onClosePopUpForSpuerOrder.bind(s),taskInfo:e,taskListRef:s.taskListRef.bind(s),from:2},t),{$compid__268:t,taskInfo:e}}}},{key:"closeCouponLayer",value:function(){this.setState({storeCouponLayer:!1})}},{key:"handleToStore",value:function(e){this.setState({storeCouponLayer:!0,toStoreInfo:e})}},{key:"finishTaskForStore",value:function(e){this.childPop&&this.childPop.finnshTask(e,!0,!1)}},{key:"refreshbCallInDjApp",value:function(){var e=this;_indexWeapp4.isDaojiaApp&&(_indexWeapp4.isAndroid&&(window.djAppDidBecomeActive=function(){e.getTaskListInfo(!1)}),_indexWeapp4.isIOS&&(window.djWebviewRefresh=function(){e.getTaskListInfo(!1)}))}},{key:"anonymousFunc0",value:function(e){}},{key:"anonymousFunc1",value:function(e){}},{key:"anonymousFunc2",value:function(e){}},{key:"anonymousFunc3",value:function(e){}},{key:"anonymousFunc4",value:function(e){}}]),o}(),_class.$$events=["popUp","taskClickEvent","anonymousFunc0","anonymousFunc1","anonymousFunc2","anonymousFunc3","_throttleOnClickTree","_throttleGetWater","_throttleOnWatering","anonymousFunc4","onHappyRecieve","onHappyRecieveBtn","showSpeedNotice"],_class.multipleSlots=!0,_class.$$componentPath="pages/bean-t/subPages/current/index",_temp2);exports.default=Current,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Current));
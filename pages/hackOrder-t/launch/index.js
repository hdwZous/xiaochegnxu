"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a,n=arguments[t];for(a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},_createClass=function(){function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}}(),_get=function e(t,a,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,a);return void 0!==o?"value"in o?o.value:void 0!==(o=o.get)?o.call(n):void 0:null!==(o=Object.getPrototypeOf(t))?e(o,a,n):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_indexWeapp2=require("../../../npm/@jd/djmp/common-t/js/location/index.weapp.js"),_indexWeapp3=require("../../../npm/@jd/djmp/common-t/js/env/index.weapp.js"),_indexWeapp4=require("../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp5=require("../../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),_indexWeapp6=require("../../../npm/@jd/djmp/common-t/constants/index.weapp.js"),_indexWeapp7=require("../../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_indexWeapp8=require("../../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),_hackOrder=require("../api/hackOrder.js"),_indexWeapp9=require("../../../npm/@jd/djmp/common-t/js/share/index.weapp.js"),_indexWeapp10=require("../../../npm/@jd/djmp/common-t/js/wxcode/index.weapp.js"),_indexWeapp11=require("../../../npm/@jd/djmp/common-t/js/utils/index.weapp.js"),_utilsWeapp=require("../common/utils.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var i=e.apply(this,arguments);return new Promise(function(r,s){return function t(e,a){try{var n=i[e](a),o=n.value}catch(e){return void s(e)}if(!n.done)return Promise.resolve(o).then(function(e){t("next",e)},function(e){t("throw",e)});r(o)}("next")})}}function _defineProperty(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var isWeapp=!0,hasClickShare=!1,startTime=Date.now(),isReportPerformance=!1,Launch=(_temp2=_class=function(){function r(){var e,a;_classCallCheck(this,r);for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];return(e=a=_possibleConstructorReturn(this,(e=r.__proto__||Object.getPrototypeOf(r)).call.apply(e,[this].concat(n)))).$usedState=["anonymousState__temp4","anonymousState__temp5","$compid__40","preventBack","showDefault","anonymousState__temp","anonymousState__temp2","isShowPrizeDraw","orderId","result","showRulePop","showSelfPop","isSelf","isSecondCut","ruleTxt","couponData","cutStatus","targetData","shareResp","showShareMomentsDialog","momentsShareImgSrc","savePicDialogReportData","cutOrderId","defaultType","defaultTips","cutAmount","helpCutAmount","secondMoney","cpOrderWithdrawSuccessInfos","shareType","showStayLayer","friendInfos","updatePercent","addressInfo","shareBackType","shareBackStatus","taskPopData","refreshTask","refreshTaskPop","cutOrderAbMap","showAuthPop","refreshOrderTask","isOrderTaskPeople","showOrderTaskPop","orderTaskInfo","randomBackCashWithdrawStatus","extraTask","userRightsResps","showQrcodePop","tabIndex","remainDrawsTimes","remainSharedDrawsTimes","clickTab"],a.config={navigationBarTitleText:"砍订单",navigationBarBackgroundColor:"#fff",navigationBarTextStyle:"black",navigationStyle:"custom",usingComponents:{navigationbar:"/components/navigationBar/index","back-to-app":"/components/backToApp/index"}},a.showPrizeDraw=function(){a.setState({isShowPrizeDraw:!0})},a.closePrizeDraw=function(){a.setState({isShowPrizeDraw:!1})},a.chooseTab=function(e,t){a.setState({tabIndex:t,clickTab:!0})},a.customComponents=["PrizeDraw","Marquee","BargainTargetNew","OrderTaskBall","Task","SourceNew","RecordList","TaskPop","RulePop","SelfPop","OrderTaskPop","StayLayer","AuthPop","QrCodePop","RecordListTab","CashList","ReturnCashStrategy","Default"],_possibleConstructorReturn(a,e)}var e;return _inherits(r,_index.Component),_createClass(r,[{key:"_constructor",value:function(e){_get(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"_constructor",this).call(this,e),this.state={orderId:"",result:{},showRulePop:!1,showSelfPop:!1,isSelf:!0,isSecondCut:!1,ruleTxt:"",couponData:{},cutStatus:1,targetData:{endTime:0},shareResp:{},showShareMomentsDialog:!1,momentsShareImgSrc:"",savePicDialogReportData:{},cutOrderId:"",showDefault:!0,defaultType:0,defaultTips:"",cutAmount:"",helpCutAmount:"",secondMoney:0,cpOrderWithdrawSuccessInfos:[],shareType:"",showStayLayer:!1,friendInfos:[],preventBack:!1,updatePercent:!1,addressInfo:{},shareBackType:null,shareBackStatus:null,taskPopData:{task:null,show:!1,showType:null},refreshTask:!1,refreshTaskPop:!1,cutOrderAbMap:{kdd_task_show:"true"},showAuthPop:!1,refreshOrderTask:!1,isOrderTaskPeople:!1,showOrderTaskPop:!1,orderTaskInfo:{},randomBackCashWithdrawStatus:0,isShowPrizeDraw:!1,extraTask:{},userRightsResps:[],showQrcodePop:!1,tabIndex:0,remainDrawsTimes:null,remainSharedDrawsTimes:null,clickTab:!1},this.data={cutRecordList:[]},this.$$refs=[]}},{key:"_createData",value:function(){var n=this,e=(this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix),t=(0,_index.genCompid)(e+"$compid__40"),a=this.__state,o=a.showDefault,r=(a.preventBack,a.isShowPrizeDraw),s=a.cutOrderId,i=a.targetData,a=a.cutStatus,o=o?this._createDefaultData(e+"JtDRNgXCwY")():null,e=this._createNewData(e+"GAxrqlHSGo")(),u=(this.anonymousFunc1=function(e){return n.switchStaylayer(e,!0)},r?function(){return n.closePrizeDraw()}:null),c=(this.anonymousFunc0=function(e,t,a){return n.onClickShare(e,t,a)},r?function(e){return n.fetchData(e)}:null);return r&&_index.propsManager.set({cutOrderId:s,closePrizeDraw:u,onClickShare:this.anonymousFunc0,fetchData:c,targetAmount:i.targetAmount,cutStatus:a,receivingDay:i.receivingDay},t),Object.assign(this.__state,{anonymousState__temp4:u,anonymousState__temp5:c,$compid__40:t,anonymousState__temp:o,anonymousState__temp2:e}),this.__state}},{key:"_createNewData",value:function(se){var ie=this;return function(){function e(e){return ie.switchStaylayer(e,!1)}var t=(0,_index.genCompid)(se+"$compid__41"),a=(0,_index.genCompid)(se+"$compid__42"),n=(0,_index.genCompid)(se+"$compid__43"),o=(0,_index.genCompid)(se+"$compid__44"),r=(0,_index.genCompid)(se+"$compid__45"),s=(0,_index.genCompid)(se+"$compid__46"),i=(0,_index.genCompid)(se+"$compid__47"),u=(0,_index.genCompid)(se+"$compid__48"),c=(0,_index.genCompid)(se+"$compid__49"),d=(0,_index.genCompid)(se+"$compid__50"),p=(0,_index.genCompid)(se+"$compid__51"),h=(0,_index.genCompid)(se+"$compid__52"),l=(0,_index.genCompid)(se+"$compid__53"),m=ie.state,M=m.showRulePop,_=m.showSelfPop,L=m.isSelf,$=m.isSecondCut,f=m.targetData,k=m.ruleTxt,k=void 0===k?"":k,B=m.helpCutAmount,y=m.cutOrderId,E=m.shareResp,w=m.cutStatus,S=m.friendInfos,S=void 0===S?[]:S,g=m.cpOrderWithdrawSuccessInfos,g=void 0===g?[]:g,q=m.showStayLayer,Q=(m.updatePercent,m.addressInfo),v=m.shareBackType,v=void 0===v?null:v,T=m.shareBackStatus,T=void 0===T?null:T,x=m.taskPopData,x=void 0!==x&&x,P=m.refreshTask,P=void 0!==P&&P,D=m.refreshTaskPop,D=void 0!==D&&D,N=m.expireTime,O=m.cutOrderAbMap,C=m.showAuthPop,z=m.isOrderTaskPeople,I=m.orderTaskInfo,W=void 0===I?{}:I,I=m.showOrderTaskPop,H=m.refreshOrderTask,b=m.randomBackCashWithdrawStatus,F=m.extraTask,F=void 0===F?{}:F,R=m.userRightsResps,R=void 0===R?[]:R,j=m.showQrcodePop,j=void 0!==j&&j,G=m.remainDrawsTimes,U=m.remainSharedDrawsTimes,m=m.clickTab,A=!1,J=!1,V=(1!=w&&2!=w&&3!=w||(A=!0),S.length&&A||(J=!0),2==x.taskType&&2==x.showType?"再邀请一人助力金额翻"+x.times+"倍":""),X="new1"==O.kdd_social?ie._createListNew1Data(se+"GlDvZrMIOC")(A):null,K="new2"==O.kdd_social?ie._createListNew2Data(se+"lyXLvDMxCB")(A):null,Y=(ie.anonymousFunc2=function(){return ie.onRefresh()},ie.anonymousFunc3=function(e,t){return ie.onClickShare(e,t)},ie.anonymousFunc4=function(){return ie.onRefreshOrder()},ie.anonymousFunc5=function(){return ie.onShowOrderTaskPop(W.status)},"new1"!==O.kdd_social&&"new2"!==O.kdd_social?"false"!==O.kdd_task_show:null),Z="new1"!==O.kdd_social&&"new2"!==O.kdd_social?"new"==O.kdd_facetoface:null,ee="new1"!==O.kdd_social&&"new2"!==O.kdd_social?"new"==O.kdd_lottery:null,te="new1"!==O.kdd_social&&"new2"!==O.kdd_social?function(e){return ie.taskEvent(e)}:null,ae="new1"!==O.kdd_social&&"new2"!==O.kdd_social?function(e){return ie.extraEvent(e)}:null,ne="new1"!==O.kdd_social&&"new2"!==O.kdd_social?function(e){return ie.qrCodeEvent(e)}:null,oe=(ie.anonymousFunc6=function(){return ie.showPrizeDraw()},ie.anonymousFunc7=function(e,t){return ie.onClickShare(e,t)},ie.anonymousFunc8=function(e,t,a){return ie.onClickShare(e,t,a)},ie.anonymousFunc9=function(e,t){return ie.onPopEvent(e,t)},ie.anonymousFunc10=function(e,t){return ie.onPopEvent(e,t)},_?"false"!==O.kdd_task_show:null),re=(ie.anonymousFunc11=function(e,t){return ie.onPopEvent(e,t)},ie.anonymousFunc12=function(e,t,a){return ie.onClickShare(e,t,a)},ie.anonymousFunc13=function(){return ie.onRefreshOrder()},ie.anonymousFunc14=function(){return ie.onCloseOrderTaskPop()},ie.anonymousFunc15=function(){return ie.onGetOrderTaskReward()},ie.anonymousFunc16=function(e,t){return ie.onClickShare(e,t)},C?Number(W.awardValue)/100:null);return ie.anonymousFunc17=function(){return ie.onRefreshOrder()},ie.anonymousFunc18=function(){return ie.hideAuthPop()},ie.anonymousFunc19=function(e,t){return ie.onPopEvent(e,t)},0<g.length&&_index.propsManager.set({data:g,background:"rgba(218, 60, 60, 0.6)"},t),_index.propsManager.set({isSelf:L,cutOrderId:y,friendInfos:S,isHelping:A,targetData:f,nCardBtn:V,onRefresh:ie.anonymousFunc2,onClickShare:ie.anonymousFunc3,kddSocial:O.kdd_social},a),z&&0!==W.status&&!b&&W.awardValue&&_index.propsManager.set({orderTaskInfo:W,onRefreshOrder:ie.anonymousFunc4,onShowOrderTaskPop:ie.anonymousFunc5},n),"new1"!==O.kdd_social&&"new2"!==O.kdd_social&&_index.propsManager.set({expireTime:N,showExtraTask:Y,showQrcode:Z,showLottery:ee,remainDrawsTimes:G,remainSharedDrawsTimes:U,cutOrderId:y,isHelping:A,cutStatus:w,refreshTask:P,taskEvent:te,extraEvent:ae,qrCodeEvent:ne,onShowPrizeDraw:ie.anonymousFunc6,shareBackType:v,shareBackStatus:T,clickTab:m},o),_index.propsManager.set({addressInfo:Q,show:J},r),"new1"!=O.kdd_social&&"new2"!=O.kdd_social&&_index.propsManager.set(_defineProperty({cutRecordList:ie.data.cutRecordList,friendInfos:S,isHelping:A,onClickShare:ie.anonymousFunc7},"cutRecordList",ie.data.cutRecordList),s),x.show&&_index.propsManager.set({taskPopData:x,endTime:f.endTime,cutOrderId:y,percent:f.percent,targetAmount:f.targetAmount,cutStatus:f.cutStatus,cutAmount:f.cutAmount,refreshTaskPop:D,onClickShare:ie.anonymousFunc8,onPopEvent:ie.anonymousFunc9},i),_index.propsManager.set({ruleTxt:k,showRulePop:M,onPopEvent:ie.anonymousFunc10},u),_&&_index.propsManager.set({showSelfPop:_&&E.shareImage||showSecondCut,expireTime:N,extraTask:F,cutAmount:f.cutAmount,leftAmount:f.leftAmount,percent:f.percent,targetAmount:f.targetAmount,showExtraTask:oe,isSecondCut:$,onPopEvent:ie.anonymousFunc11,onClickShare:ie.anonymousFunc12},c),I&&W.awardValue&&_index.propsManager.set({helpCutAmount:B,refreshOrderTask:H,rightCoupon:R[0],isSelf:L,orderTaskInfo:W,description:f.description,randomBackCashWithdrawStatus:b,onRefreshOrder:ie.anonymousFunc13,onCloseOrderTaskPop:ie.anonymousFunc14,onGetOrderTaskReward:ie.anonymousFunc15},d),_index.propsManager.set({showStayLayer:q,friendInfo:S[0],leftAmount:f.leftAmount,targetAmount:f.targetAmount,onClickShare:ie.anonymousFunc16,closeStaylayer:e},p),C&&_index.propsManager.set({showAuthPop:C,taskId:W.taskId,money:re,uniqueId:W.uniqueId,onRefreshOrder:ie.anonymousFunc17,onHideAuthPop:ie.anonymousFunc18},h),j&&_index.propsManager.set({cutOrderId:y,onPopEvent:ie.anonymousFunc19},l),{anonymousState__temp8:Y,anonymousState__temp9:Z,anonymousState__temp10:ee,anonymousState__temp11:te,anonymousState__temp12:ae,anonymousState__temp13:ne,anonymousState__temp14:oe,anonymousState__temp15:e,anonymousState__temp16:re,$compid__41:t,$compid__42:a,$compid__43:n,$compid__44:o,$compid__45:r,$compid__46:s,$compid__47:i,$compid__48:u,$compid__49:c,$compid__50:d,$compid__51:p,$compid__52:h,$compid__53:l,style:_indexModuleScssMap2.default,cpOrderWithdrawSuccessInfos:g,isOrderTaskPeople:z,orderTaskInfo:W,randomBackCashWithdrawStatus:b,cutOrderAbMap:O,anonymousState__temp6:X,anonymousState__temp7:K,taskPopData:x,showSelfPop:_,showOrderTaskPop:I,showAuthPop:C,showQrcodePop:j}}}},{key:"_createListNew1Data",value:function(g){var v=this;return function(e){var t=(0,_index.genCompid)(g+"$compid__54"),a=(0,_index.genCompid)(g+"$compid__55"),n=(0,_index.genCompid)(g+"$compid__56"),o=v.state,r=o.cutOrderId,s=o.cutStatus,i=o.shareBackType,i=void 0===i?null:i,u=o.shareBackStatus,u=void 0===u?null:u,c=o.refreshTask,c=void 0!==c&&c,d=o.expireTime,p=o.cutOrderAbMap,h=o.tabIndex,l=o.remainDrawsTimes,m=o.remainSharedDrawsTimes,o=o.clickTab,_=["全部任务","返现记录"],f=0==h?"false"!==p.kdd_task_show:null,k=0==h?"new"==p.kdd_facetoface:null,p=0==h?"new"==p.kdd_lottery:null,y=0==h?function(e){return v.taskEvent(e)}:null,w=0==h?function(e){return v.extraEvent(e)}:null,S=0==h?function(e){return v.qrCodeEvent(e)}:null;return v.anonymousFunc20=function(){return v.showPrizeDraw()},_index.propsManager.set({tabNameList:_,tabIndex:h,chooseTab:v.chooseTab},t),0==h&&_index.propsManager.set({expireTime:d,showExtraTask:f,showQrcode:k,showLottery:p,remainDrawsTimes:l,remainSharedDrawsTimes:m,cutOrderId:r,isHelping:e,cutStatus:s,refreshTask:c,taskEvent:y,extraEvent:w,qrCodeEvent:S,onShowPrizeDraw:v.anonymousFunc20,shareBackType:i,shareBackStatus:u,showNew:!0,clickTab:o},a),0!=h&&1==h&&_index.propsManager.set({cutRecordList:v.data.cutRecordList},n),{anonymousState__temp17:_,anonymousState__temp18:f,anonymousState__temp19:k,anonymousState__temp20:p,anonymousState__temp21:y,anonymousState__temp22:w,anonymousState__temp23:S,$compid__54:t,$compid__55:a,$compid__56:n,tabIndex:h}}}},{key:"_createListNew2Data",value:function(O){var C=this;return function(e){var t=(0,_index.genCompid)(O+"$compid__57"),a=(0,_index.genCompid)(O+"$compid__58"),n=(0,_index.genCompid)(O+"$compid__59"),o=(0,_index.genCompid)(O+"$compid__60"),r=(0,_index.genCompid)(O+"$compid__61"),s=C.state,i=s.tabIndex,u=s.friendInfos,u=void 0===u?[]:u,c=s.cutOrderId,d=s.cutStatus,p=s.shareBackType,p=void 0===p?null:p,h=s.shareBackStatus,h=void 0===h?null:h,l=s.refreshTask,l=void 0!==l&&l,m=s.expireTime,_=s.cutOrderAbMap,f=s.targetData,k=s.remainDrawsTimes,y=s.remainSharedDrawsTimes,s=s.clickTab,w=["返现攻略","全部任务"],S=((u&&0==u.length||0==e)&&(w=["全部任务"]),C.data.cutRecordList),g=(C.anonymousFunc21=function(e,t){return C.onClickShare(e,t)},w&&2==w.length&&1==i||w&&1==w.length?"false"!==_.kdd_task_show:null),v=w&&2==w.length&&1==i||w&&1==w.length?"new"==_.kdd_facetoface:null,_=w&&2==w.length&&1==i||w&&1==w.length?"new"==_.kdd_lottery:null,T=w&&2==w.length&&1==i||w&&1==w.length?function(e){return C.taskEvent(e)}:null,x=w&&2==w.length&&1==i||w&&1==w.length?function(e){return C.extraEvent(e)}:null,P=w&&2==w.length&&1==i||w&&1==w.length?function(e){return C.qrCodeEvent(e)}:null,D=(C.anonymousFunc22=function(){return C.showPrizeDraw()},["返现记录"]);return _index.propsManager.set({tabNameList:w,tabIndex:i,chooseTab:C.chooseTab},t),w&&2==w.length&&0==i&&_index.propsManager.set({friendInfos:u,onClickShare:C.anonymousFunc21,targetAmount:f.targetAmount},a),(w&&2==w.length&&1==i||w&&1==w.length)&&_index.propsManager.set({expireTime:m,showExtraTask:g,showQrcode:v,showLottery:_,remainDrawsTimes:k,remainSharedDrawsTimes:y,cutOrderId:c,isHelping:e,cutStatus:d,refreshTask:l,taskEvent:T,extraEvent:x,qrCodeEvent:P,onShowPrizeDraw:C.anonymousFunc22,shareBackType:p,shareBackStatus:h,showNew:!0,clickTab:s},n),_index.propsManager.set({tabNameList:D},o),_index.propsManager.set({cutRecordList:S},r),{anonymousState__temp24:g,anonymousState__temp25:v,anonymousState__temp26:_,anonymousState__temp27:T,anonymousState__temp28:x,anonymousState__temp29:P,anonymousState__temp30:D,$compid__57:t,$compid__58:a,$compid__59:n,$compid__60:o,$compid__61:r,tabNameList:w,tabIndex:i}}}},{key:"onEvent",value:function(e){e=e.target.data;this.setState({showShareMomentsDialog:e.flag})}},{key:"_createDefaultData",value:function(t){var a=this;return function(){var e=(0,_index.genCompid)(t+"$compid__62");return _index.propsManager.set({defaultType:a.state.defaultType,defaultTips:a.state.defaultTips,onDefaultEvent:a.onDefaultEvent.bind(a)},e),{$compid__62:e}}}},{key:"componentWillMount",value:function(){startTime=Date.now(),isReportPerformance=!0}},{key:"componentDidShow",value:function(){var t=this,e=this.getQuery("status"),a=this.getQuery("cutOrderId");e&&0==e?(0,_indexWeapp5.isLogin)().then(function(e){t.launchHelpCut()}).catch(function(e){t._goToLogin()}):this.setState({cutOrderId:a},function(){(0,_indexWeapp5.isLogin)().then(function(e){t.init()}).catch(function(e){return t._goToLogin()})}),hasClickShare&&((0,_indexWeapp.showToast)({title:"分享成功，别忘记提醒好友帮点"}),hasClickShare=!1)}},{key:"init",value:(e=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchData();case 2:this.getOrderTask();case 3:case"end":return e.stop()}},e,this)})),function(){return e.apply(this,arguments)})},{key:"onDefaultEvent",value:function(){3===this.state.defaultType&&this.fetchData()}},{key:"onPopEvent",value:function(e,t){var a=this,n=this.state,n=(n.cutStatus,n.isSecondCut,this.state.showRulePop);"rulePop"==t?this.setState({showRulePop:!n},function(){a.state.showRulePop&&(0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"clickfqzrules",click_par:{contentId:"rules"}})}):"hideTaskPop"==t?((n=this.state.taskPopData).show=!1,this.setState({taskPopData:n,shareBackType:null,shareBackStatus:null})):"refreshTask"==t?((n=this.state.taskPopData).show=!1,this.setState({taskPopData:n}),this.fetchData()):"getPacket"==t?((n=this.state.taskPopData).show=!1,this.setState({shareBackType:0,shareBackStatus:0,refreshTask:!this.state.refreshTask,taskPopData:n}),this.fetchData()):"getExtraReward"==t?this.setState({refreshTask:!this.state.refreshTask,shareBackType:3}):"hideQrcodePop"==t?this.setState({showQrcodePop:!1}):"selfPop"==t&&this.setState({showSelfPop:!1})}},{key:"pvReportFn",value:function(a){var n=this;(0,_indexWeapp2.getLocation)().then(function(e){n.setState({addressInfo:e});e=_extends({source:n.getQuery("source"),position:"valid"},a);(0,_indexWeapp4.pvReport)({create_time:new Date,page_par:e})}).catch(function(e){var t=_extends({source:n.getQuery("source"),position:"invalid"},a);(0,_indexWeapp4.pvReport)({create_time:new Date,page_par:t})})}},{key:"fetchData",value:function(e){var g=this,t=this.state,v=t.isSecondCut,T=t.secondMoney,t=(e||{}).hideSelfPop,x=void 0!==t&&t,P=Date.now();return new Promise(function(S,t){g.fetchDataFn().then(function(e){var t=Date.now(),e=e.result||{},a=e.cutStatus,n=e.cutAmount,o=e.endTime,r=e.leftAmount,s=e.receivingDay,i=e.helpCutAmount,u=e.targetAmount,c=e.percent,d=e.cutRecord,p=e.friendInfos,p=void 0===p?[]:p,h=e.description,l=e.rules,m=e.helpStatus,_=e.cutOrderId,f=e.successInfoWrapper,f=void 0===f?{}:f,k=e.expireTime,y=e.cutOrderAbMap,y=void 0===y?{}:y,w=e.shareResp,w=void 0===w?{}:w,n={cutAmount:n,leftAmount:r,cutStatus:a,endTime:o,targetAmount:u,percent:c,description:h,helpStatus:m,receivingDay:s},r=(g.data=_extends({},g.data,{cutRecordList:d}),e.randomBackCashQualifications&&"true"==e.cutOrderAbMap.kdd_ordertask_show),o={friendinfo:!p.length||1!=a&&2!=a&&3!=a||"new1"!=y.kdd_social&&"new2"!=y.kdd_social?2:1,statusId:9==a?"notime":10==a?"attending":""};g.pvReportFn(o),g.onStayEvent(a),g.setState({targetData:n,remainDrawsTimes:e.remainDrawsTimes,remainSharedDrawsTimes:e.remainSharedDrawsTimes,ruleTxt:l,cutStatus:a,expireTime:k,friendInfos:p,refreshTaskPop:!g.state.refreshTaskPop,isOrderTaskPeople:r,helpCutAmount:v?T:i,updatePercent:!!v,cutOrderId:10==a?_:g.getQuery("cutOrderId"),showSelfPop:!x&&(1==a||2==a),shareResp:w,showDefault:!1,cutOrderAbMap:y,cpOrderWithdrawSuccessInfos:f.cpOrderWithdrawSuccessInfos||[],randomBackCashWithdrawStatus:e.randomBackCashWithdrawStatus,userRightsResps:e.userRightsResps||[]},function(){S(),isReportPerformance&&(0,_indexWeapp11.testSpeed)(startTime,P,t,1035,2033).then(function(){isReportPerformance=!1})})}).catch(function(e){g.defaultSetData(),g.pvReportFn({friendinfo:2,statusId:""}),(0,_indexWeapp.showToast)({title:e&&e.msg||"请稍后再试~"}),t()})})}},{key:"defaultSetData",value:function(){this.setState({showSelfPop:!1,showDefault:!0,defaultType:3,defaultTips:"活动被挤爆啦，稍后再试哦～"})}},{key:"fetchDataFn",value:function(){var a=this,n=this.state.cutOrderId,e=((0,_indexWeapp8.getStorageSync)(_indexWeapp6.LOGIN_INFO)||{}).openId,o=void 0===e?"":e;return new Promise(function(t,e){(0,_hackOrder.getHackOrderInfo)({cutOrderId:n,openId:o}).then(function(e){0==e.code?t(e):(a.defaultSetData(),(0,_indexWeapp.showToast)({title:e&&e.msg||"请稍后再试~"}))}).catch(function(e){a.defaultSetData(),(0,_indexWeapp.showToast)({title:e&&e.msg||"请稍后再试~"})})})}},{key:"onClickShare",value:function(e,t,a){var n=this,o=(hasClickShare=!0,this.state.cutStatus);switch(this.setState({isSecondCut:!1,shareType:t}),"moment"!=t&&2==o&&(0,_indexWeapp10.getWxCode)().then(function(e){return n.helpCutApi(e)}),t){case"friend":var r=this.state.taskPopData;r.show=!1,this.setState({taskPopData:r,refreshTask:a&&a.forbidTask&&1==a.forbidTask?this.state.refreshTask:!this.state.refreshTask,shareBackType:a&&0<=a.shareBackType?a.shareBackType:null,shareBackStatus:a&&0<=a.shareBackStatus?a.shareBackStatus:null});break;case"moment":this.shareToMomentWeApp()}}},{key:"helpCutApi",value:function(e){var a=this,t=this.state.cutOrderId,t=void 0===t?"":t,n=(0,_indexWeapp8.getStorageSync)(_indexWeapp6.LOGIN_INFO)||{},t={cpOrderInfoId:t,nickname:n.nickname||"",headImageUrl:n.avatar||""},e=e+","+(n.openId||"");t.secret=(0,_utilsWeapp.encrypt)(e),(0,_hackOrder.hackOrderHelpCut)(t).then(function(e){var t;0==e.code?(t=(e.result||{}).helpCutAmount,a.setState({isSecondCut:0==e.result.status,secondMoney:t/100},function(){})):(0,_indexWeapp.showToast)({title:e&&e.msg||"请稍后再试~"})}).catch(function(e){(0,_indexWeapp.showToast)({title:e&&e.msg||"请稍后再试~"})})}},{key:"launchHelpCut",value:function(){var a=this,e=this.getQuery("orderId"),t=(0,_indexWeapp8.getStorageSync)(_indexWeapp6.LOGIN_INFO)||{},n=this.getQuery("source"),e={orderId:e,wxOpenid:"",nickName:t.nickname||"",portraitUrl:t.avatar||"",source:n};(0,_hackOrder.hackOrderSendCut)(e).then(function(e){var t;(0,_indexWeapp.hideLoading)(),0==e.code?a.setState({cutOrderId:e.result.id},function(){a.init()}):202==e.code||201==e.code?a._goToLogin():1033==e.code||1004==e.code||1005==e.code?(t=a.getQuery("cutOrderId"),a.setState({cutOrderId:t},function(){a.fetchData()})):((0,_indexWeapp.hideLoading)(),a.defaultSetData(),(0,_indexWeapp.showToast)({title:e&&e.msg||"发起失败"}))}).catch(function(e){(0,_indexWeapp.hideLoading)(),a.defaultSetData(),(0,_indexWeapp.showToast)({title:e&&e.msg||"网络异常"})})}},{key:"helpCutFn",value:function(){2==this.state.cutStatus&&this.helpCutApi()}},{key:"onShareAppMessage",value:function(e){var t=this.state,a=t.cutOrderId,t=t.shareResp,n=this.getQuery("source")||"",e=(e.from,"/pages/hackOrder-t/detail/index?cutOrderId="+a+"&source="+n+"&materialId="+t.materialId);return{title:t.shareTitle,imageUrl:t.shareImage,path:e}}},{key:"taroShareCode",value:function(){var e="00",t="00",a={},t=_indexWeapp3.isJDApp?_indexWeapp3.isJDReactNativeWebView?(e="01","02"):(e="03","04"):_indexWeapp3.isDaojiaApp?_indexWeapp3.isIOS?(e="05","06"):(e="07","08"):_indexWeapp3.isWeixin?(e="09","10"):(e="11","12");return a.circleChannel=e,a.cardChannel=t,a}},{key:"shareOfH5",value:function(e){var t=this.state,a=t.shareResp,t=t.cutOrderId,n=""+window.location.origin+window.location.pathname+"#/pages/sharePreview-t/index?image="+e+"&title=砍订单",o=this.taroShareCode(),n={title:a.shareTitle||"快来帮我砍一刀吧~~",desc:"砍订单",shareUrl:n,imgUrl:a.shareImage||"",appId:"gh_5103b94a8a56",mpImgUrl:a.shareImage||"",mpType:"0",path:"/pages/hackOrder-t/detail/index?cutOrderId="+t+"&channel="+o.cardChannel+"&materialId="+a.materialId,pyqImg:e||"",callback:"",clickcallback:"",timeline_title:"",channel:"Wxfriends,Wxmoments",qrparam:{top_pic:a.shareTitle||"砍订单",mid_pic:a.shareImage||"",slogan:"京东二维码分享",qr_title:"砍订单助力",qr_content:"砍订单助力",qr_direct:e}};(0,_indexWeapp9.openShare)(n),this.helpCutFn()}},{key:"shareToMomentWeApp",value:function(){var t=this;this.getCircleFn().then(function(e){e?t.setState({showShareMomentsDialog:!0,momentsShareImgSrc:e}):(0,_indexWeapp.showToast)({title:"今日分享朋友圈机会已用完，请直接分享好友~"})}).catch(function(e){(0,_indexWeapp.showToast)({title:e||"网络繁忙"})})}},{key:"getCircleFn",value:function(){var r=this;return new Promise(function(t,a){(0,_indexWeapp.showLoading)();var e=r.state,n=e.cutOrderId,e=e.shareResp,e=void 0===e?{}:e,o=r.getQuery("createSource")||"",n=JSON.stringify({cutOrderId:n,createSource:o,materialId:e.materialId});(0,_hackOrder.getCirclePic)({page:"pages/hackOrder-t/detail/index",requestParam:n}).then(function(e){(0,_indexWeapp.hideLoading)(),t(e.result)}).catch(function(e){(0,_indexWeapp.hideLoading)(),a(e)})})}},{key:"toHome",value:function(){(0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"clickfqzfrontpage",click_par:{contentId:"check"}}),(0,_indexWeapp7.jump)({to:"home"})}},{key:"getQuery",value:function(e){return this.$router.params[e]}},{key:"_goToLogin",value:function(){var e=this.getQuery("cutOrderId"),t=this.getQuery("orderId"),a=this.getQuery("source"),n=this.getQuery("createSource");(0,_indexWeapp5.goToLogin)({localTargetUrl:"/pages/hackOrder-t/launch/index?"+("cutOrderId="+e+"&orderId="+t+"&source="+a+"&createSource="+n)})}},{key:"switchStaylayer",value:function(e,t){t&&(0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"clickwanliu",click_par:{statusId:"show"}}),this.setState({showStayLayer:t,preventBack:!1});t=(new Date).getDate();(0,_indexWeapp8.setStorageSync)("showStayLayerDate",t)}},{key:"onStayEvent",value:function(e){var t="",a=(new Date).getDate();try{t=(0,_indexWeapp8.getStorageSync)("showStayLayerDate")||{}}catch(e){}a===t||1!=e&&2!=e&&3!=e?this.setState({preventBack:!1}):(this.setState({preventBack:!0}),(0,_indexWeapp8.setStorageSync)("showStayLayerDate",a))}},{key:"componentWillUnmount",value:function(){this.setState({shareType:""})}},{key:"taskEvent",value:function(e){this.state.isSecondCut&&4==e.taskType?(this.setState({showSelfPop:!0}),(0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"clicksecondbox",click_par:{statusId:"show"}})):(2!==this.state.cutStatus&&this.fetchData(),this.setState({taskPopData:e,refreshTaskPop:!this.state.refreshTaskPop}))}},{key:"extraEvent",value:function(e){this.setState({extraTask:e})}},{key:"qrCodeEvent",value:function(){this.setState({showQrcodePop:!0})}},{key:"onRefresh",value:function(){this.fetchData()}},{key:"hideAuthPop",value:function(){this.setState({showAuthPop:!1})}},{key:"getOrderTask",value:function(){var a=this;(0,_hackOrder.getTaskListInfo)({modelId:"K10001",plateCode:(0,_hackOrder.getPlateCode)()}).then(function(e){var e=(e.result||{}).taskInfoList,e=void 0===e?[]:e,t=(a.setState({orderTaskInfo:e[0]}),e[0].status);0!==t&&((0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"showOrderTaskBall",click_par:{taskStatus:t}}),3==t&&a.getWithdrawStatus(e[0].uniqueId))}).catch(function(e){})}},{key:"onGetOrderTaskReward",value:function(){this.setState({showAuthPop:!0,showOrderTaskPop:!1})}},{key:"onRefreshOrder",value:function(){this.getOrderTask(),this.setState({refreshOrderTask:!this.state.refreshOrderTask})}},{key:"onShowOrderTaskPop",value:function(e){(0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"showOrderTaskPop",click_par:{status:e}}),this.getOrderTask(),this.setState({showOrderTaskPop:!0})}},{key:"onCloseOrderTaskPop",value:function(){this.setState({showOrderTaskPop:!1})}},{key:"getWithdrawStatus",value:function(e){var t=this;(0,_hackOrder.withdrawStatus)({uniqueId:e}).then(function(e){e=e.result;t.setState({randomBackCashWithdrawStatus:e.randomBackCashWithdrawStatus})}).catch(function(e){})}},{key:"anonymousFunc0",value:function(e){}},{key:"anonymousFunc1",value:function(e){}},{key:"anonymousFunc2",value:function(e){}},{key:"anonymousFunc3",value:function(e){}},{key:"anonymousFunc4",value:function(e){}},{key:"anonymousFunc5",value:function(e){}},{key:"anonymousFunc6",value:function(e){}},{key:"anonymousFunc7",value:function(e){}},{key:"anonymousFunc8",value:function(e){}},{key:"anonymousFunc9",value:function(e){}},{key:"anonymousFunc10",value:function(e){}},{key:"anonymousFunc11",value:function(e){}},{key:"anonymousFunc12",value:function(e){}},{key:"anonymousFunc13",value:function(e){}},{key:"anonymousFunc14",value:function(e){}},{key:"anonymousFunc15",value:function(e){}},{key:"anonymousFunc16",value:function(e){}},{key:"anonymousFunc17",value:function(e){}},{key:"anonymousFunc18",value:function(e){}},{key:"anonymousFunc19",value:function(e){}},{key:"anonymousFunc20",value:function(e){}},{key:"anonymousFunc21",value:function(e){}},{key:"anonymousFunc22",value:function(e){}}]),r}(),_class.$$events=["anonymousFunc1","onPopEvent"],_class.options={addGlobalClass:!0},_class.multipleSlots=!0,_class.$$componentPath="pages/hackOrder-t/launch/index",_temp2);exports.default=Launch,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Launch,!0));
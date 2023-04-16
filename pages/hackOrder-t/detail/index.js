"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,o=arguments[t];for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},_createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}(),_get=function e(t,n,o){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,n);return void 0!==a?"value"in a?a.value:void 0!==(a=a.get)?a.call(o):void 0:null!==(a=Object.getPrototypeOf(t))?e(a,n,o):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp=require("../../../npm/@jd/djmp/common-t/js/utils/index.weapp.js"),_indexWeapp2=require("../../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_indexWeapp3=require("../../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),_indexWeapp4=require("../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp5=require("../../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),_indexWeapp6=require("../../../npm/@jd/djmp/common-t/js/wxcode/index.weapp.js"),_indexWeapp7=require("../../../npm/@jd/djmp/common-t/js/location/index.weapp.js"),_indexWeapp8=require("../../../npm/@jd/djmp/common-t/constants/index.weapp.js"),_indexWeapp9=require("../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_utilsWeapp=require("../common/utils.weapp.js"),_hackOrder=require("../api/hackOrder.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var i=e.apply(this,arguments);return new Promise(function(s,r){return function t(e,n){try{var o=i[e](n),a=o.value}catch(e){return void r(e)}if(!o.done)return Promise.resolve(a).then(function(e){t("next",e)},function(e){t("throw",e)});s(a)}("next")})}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var startTime=Date.now(),isReportPerformance=!1,secTopPos=0,secList3Pos=0,screenHeight=0,currentScrollPos=0,hasClickShare=!1,isWeapp=!0,Detail=(_temp2=_class=function(){function s(){var e,n;_classCallCheck(this,s);for(var t=arguments.length,o=Array(t),a=0;a<t;a++)o[a]=arguments[a];return(e=n=_possibleConstructorReturn(this,(e=s.__proto__||Object.getPrototypeOf(s)).call.apply(e,[this].concat(o)))).$usedState=["anonymousState__temp4","$compid__63","showLocation","anonymousState__temp","defaultMsg","anonymousState__temp2","anonymousState__temp3","isShowPrizeDraw","showRulePop","showHelperPop","showSelfPop","isSelf","isSecondCut","cutAmount","couponData","targetData","helpStatus","showShareMomentsDialog","savePicDialogReportData","locationError","newUserCoupon","hasAddress","isHelpCut","strategyCoupons","helperCoupon","friendInfos","showRecordPop","userRightsResps","shareBackType","shareBackStatus","taskPopData","refreshTask","refreshTaskPop","cutOrderAbMap","helpCutAmount","showAuthPop","showOrderTaskPop","showTaskBall","randomBackCashWithdrawStatus","orderTaskInfo","refreshOrderTask","showWithDrawRecord","showWithdrawRule","showOrderTask","bonusPoolEmpty","extraTask","isShowTaskPop","showQrcodePop","tabIndex","remainDrawsTimes","remainSharedDrawsTimes","clickTab"],n.requestFlag=!0,n.config={navigationBarTitleText:"砍订单",navigationBarBackgroundColor:"#fff",navigationBarTextStyle:"black",usingComponents:{"location-default":"/components-b/locationDefault/index","back-to-app":"/components/backToApp/index"}},n.showPrizeDraw=function(){n.setState({isShowPrizeDraw:!0})},n.closePrizeDraw=function(){n.setState({isShowPrizeDraw:!1})},n.chooseTab=function(e,t){n.setState({tabIndex:t,clickTab:!0})},n.onCloseTaskPop=function(){n.setState({isShowTaskPop:!1})},n.customComponents=["PrizeDraw","OrderTask","Marquee","BargainTargetNew","CouponSourceNew","OrderTaskBall","Task","SourceNew","RecordList","SecKillGoods","RulePop","RecordPop","TaskPop","HelperPop","SelfPop","WithDrawList","WithDrawRule","OrderTaskPop","AuthPop","QrCodePop","RecordListTab","CashList","ReturnCashStrategy","Default"],_possibleConstructorReturn(n,e)}var e;return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(e){var t=this;_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,e),this.state={showRulePop:!1,showHelperPop:!1,showSelfPop:!1,isSelf:!1,isSecondCut:!1,cutAmount:"",couponData:{},targetData:{helpStatus:""},helpStatus:"",defaultMsg:{defaultType:0,defaultTips:"",defaultBtnTxt:""},showShareMomentsDialog:!1,savePicDialogReportData:{},showLocation:!1,locationError:{errMsg:""},newUserCoupon:{},hasAddress:!1,isHelpCut:!1,strategyCoupons:[],helperCoupon:{},friendInfos:[],showRecordPop:!1,userRightsResps:[],shareBackType:null,shareBackStatus:null,taskPopData:{task:null,show:!1,showType:null},refreshTask:!1,refreshTaskPop:!1,cutOrderAbMap:{kdd_task_show:"true",kdd_ordertask_show:"true"},helpCutAmount:"",showAuthPop:!1,showOrderTaskPop:!1,showTaskBall:!1,randomBackCashWithdrawStatus:0,orderTaskInfo:{},refreshOrderTask:!1,showWithDrawRecord:!1,showWithdrawRule:!1,showOrderTask:!1,isShowPrizeDraw:!1,bonusPoolEmpty:0,extraTask:{},isShowTaskPop:!0,showQrcodePop:!1,tabIndex:0,remainDrawsTimes:null,remainSharedDrawsTimes:null,clickTab:!1},this.data={expireTime:"",cutOrderId:"",addressInfo:{},momentsShareImgSrc:"",shareResp:{},cutRecordList:[],cpOrderWithdrawSuccessInfos:[],isLogin:!1},this.$$refs=[{type:"component",id:"ZzwMZ",refName:"",fn:function(e){return t.childSecGoodsKill=e}}]}},{key:"_createData",value:function(){var o=this,e=(this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix),t=(0,_index.genCompid)(e+"$compid__63"),n=this.__state,a=n.defaultMsg,a=void 0===a?{}:a,s=n.showLocation,r=n.locationError,r=void 0===r?{}:r,i=n.isShowPrizeDraw,u=n.targetData,n=n.cutStatus,c=this.data.cutOrderId,c=void 0===c?"":c,s=s?this._createLocationData(e+"yQDlgJjXdL")(r):null,r=0<=a.defaultType?this._createDefaultData(e+"OBLDFirInq")(a):null,a=this._createNewData(e+"WRGhJErBtW")(),e=(this.anonymousFunc0=function(e,t,n){return o.onClickShare(e,t,n)},i?function(e){return o.fetchData(e)}:null);return i&&_index.propsManager.set({cutOrderId:c,closePrizeDraw:this.closePrizeDraw,onClickShare:this.anonymousFunc0,fetchData:e,targetAmount:u.targetAmount,cutStatus:n,receivingDay:u.receivingDay},t),Object.assign(this.__state,{anonymousState__temp4:e,$compid__63:t,anonymousState__temp:s,anonymousState__temp2:r,anonymousState__temp3:a}),this.__state}},{key:"_createNewData",value:function(we){var ye=this;return function(){var e=(0,_index.genCompid)(we+"$compid__64"),t=(0,_index.genCompid)(we+"$compid__65"),n=(0,_index.genCompid)(we+"$compid__66"),o=(0,_index.genCompid)(we+"$compid__67"),a=(0,_index.genCompid)(we+"$compid__68"),$=(0,_index.genCompid)(we+"$compid__69"),E=(0,_index.genCompid)(we+"$compid__70"),j=(0,_index.genCompid)(we+"$compid__71"),B=(0,_index.genCompid)(we+"$compid__72"),L=(0,_index.genCompid)(we+"$compid__73"),q=(0,_index.genCompid)(we+"$compid__74"),N=(0,_index.genCompid)(we+"$compid__75"),H=(0,_index.genCompid)(we+"$compid__76"),z=(0,_index.genCompid)(we+"$compid__77"),G=(0,_index.genCompid)(we+"$compid__78"),Q=(0,_index.genCompid)(we+"$compid__79"),K=(0,_index.genCompid)(we+"$compid__80"),V=(0,_index.genCompid)(we+"$compid__81"),U=(0,_index.genCompid)(we+"$compid__82"),s=ye.state,J=s.showRulePop,Z=s.showHelperPop,r=s.showSelfPop,i=s.isSelf,X=s.isSecondCut,u=s.targetData,c=s.ruleTxt,c=void 0===c?"":c,d=s.helpCutAmount,p=s.helpStatus,Y=s.isHelpCut,l=s.cutStatus,h=s.userRightsResps,h=void 0===h?[]:h,m=s.friendInfos,m=void 0===m?[]:m,_=s.secIsTop,_=void 0!==_&&_,f=s.showRecordPop,f=void 0!==f&&f,k=s.shareBackType,k=void 0===k?null:k,w=s.shareBackStatus,w=void 0===w?null:w,y=s.taskPopData,y=void 0===y?{}:y,S=s.refreshTask,S=void 0!==S&&S,g=s.refreshTaskPop,g=void 0!==g&&g,v=s.cutOrderAbMap,v=void 0===v?{}:v,T=s.randomBackCashWithdrawStatus,ee=s.showTaskBall,P=s.orderTaskInfo,P=void 0===P?{}:P,x=s.showAuthPop,te=s.showOrderTaskPop,ne=s.refreshOrderTask,C=s.showWithDrawRecord,oe=s.showWithdrawRule,D=s.showOrderTask,O=s.extraTask,O=void 0===O?{}:O,I=s.showQrcodePop,I=void 0!==I&&I,ae=s.remainDrawsTimes,se=s.remainSharedDrawsTimes,s=s.clickTab,R=ye.data,F=R.cutOrderId,F=void 0===F?"":F,b=R.addressInfo,b=void 0===b?{}:b,W=R.cutRecordList,W=void 0===W?[]:W,A=R.cpOrderWithdrawSuccessInfos,A=void 0===A?[]:A,re=R.isLogin,R=R.expireTime,M=!1,ie=(!i||1!=l&&2!=l&&3!=l||(M=!0),W.length?W[W.length-1].headImage:""),ue="new1"==v.kdd_social?ye._createListNew1Data(we+"TlgAWIyADN")(M):null,ce="new2"==v.kdd_social?ye._createListNew2Data(we+"EqWScdmgWz")(M):null,de=(ye.anonymousFunc1=function(){return ye.onRefreshOrder()},ye.anonymousFunc2=function(){return ye.onGetOrderTaskReward()},ye.anonymousFunc3=function(e){return ye.onCloseWithDrawPop(e)},ye.anonymousFunc4=function(e){return ye.onCloseWitndrawRule(e)},ye.anonymousFunc5=function(){return ye.onRefresh()},ye.anonymousFunc6=function(e,t){return ye.onClickShare(e,t)},ye.anonymousFunc7=function(){return ye.onRefreshOrder()},ye.anonymousFunc8=function(){return ye.onShowOrderTaskPop()},i&&"new1"!==v.kdd_social&&"new2"!==v.kdd_social?"true"==v.kdd_task_show:null),pe=i&&"new1"!==v.kdd_social&&"new2"!==v.kdd_social?"new"==v.kdd_facetoface:null,le=i&&"new1"!==v.kdd_social&&"new2"!==v.kdd_social?"new"==v.kdd_lottery:null,he=i&&"new1"!==v.kdd_social&&"new2"!==v.kdd_social?function(e){return ye.taskEvent(e)}:null,me=i&&"new1"!==v.kdd_social&&"new2"!==v.kdd_social?function(e){return ye.extraEvent(e)}:null,_e=i&&"new1"!==v.kdd_social&&"new2"!==v.kdd_social?function(e){return ye.qrCodeEvent(e)}:null,fe=(ye.anonymousFunc9=function(){return ye.showPrizeDraw()},ye.anonymousFunc10=function(e,t){return ye.onPopEvent(e,t)},ye.anonymousFunc11=function(e,t){return ye.onPopEvent(e,t)},ye.anonymousFunc12=function(e,t,n){return ye.onClickShare(e,t,n)},ye.anonymousFunc13=function(e,t){return ye.onPopEvent(e,t)},ye.anonymousFunc14=function(e,t){return ye.onPopEvent(e,t)},ye.anonymousFunc15=function(e){return ye.onCutPopShare(e)},r?"false"!==v.kdd_task_show:null),ke=(ye.anonymousFunc16=function(e,t){return ye.onPopEvent(e,t)},ye.anonymousFunc17=function(e,t,n){return ye.onClickShare(e,t,n)},ye.anonymousFunc18=function(){return ye.onCloseWithDrawPop(!1)},ye.anonymousFunc19=function(){return ye.onCloseWitndrawRule(!1)},ye.anonymousFunc20=function(){return ye.onRefreshOrder()},ye.anonymousFunc21=function(){return ye.onCloseOrderTaskPop()},ye.anonymousFunc22=function(){return ye.onGetOrderTaskReward()},x?Number(P.awardValue)/100:null);return ye.anonymousFunc23=function(){return ye.onRefreshOrder()},ye.anonymousFunc24=function(){return ye.hideAuthPop()},ye.anonymousFunc25=function(e,t){return ye.onPopEvent(e,t)},D&&P.awardValue&&_index.propsManager.set({helpCutAmount:d,isSelf:i,orderTaskInfo:P,description:u.description,rightCoupon:h[0],randomBackCashWithdrawStatus:T,onRefreshOrder:ye.anonymousFunc1,onGetOrderTaskReward:ye.anonymousFunc2,onCloseWithDrawPop:ye.anonymousFunc3,onCloseWitndrawRule:ye.anonymousFunc4},e),D&&P.awardValue||!i||_index.propsManager.set({data:A,background:"rgba(218, 60, 60, 0.6)"},t),D&&P.awardValue||!i&&0!=p||_index.propsManager.set({cutOrderId:F,friendInfos:m,isHelping:M,isSelf:i,targetData:u,onRefresh:ye.anonymousFunc5,onClickShare:ye.anonymousFunc6,kddSocial:v.kdd_social},n),!(D&&P.awardValue||i||0===p)&&0<h.length&&_index.propsManager.set({addressInfo:b,helpStatus:p,userRightsResps:h},o),ee&&i&&0!==P.status&&1!==T&&P.awardValue&&_index.propsManager.set({orderTaskInfo:P,onRefreshOrder:ye.anonymousFunc7,onShowOrderTaskPop:ye.anonymousFunc8},a),i&&"new1"!==v.kdd_social&&"new2"!==v.kdd_social&&_index.propsManager.set({expireTime:R,showExtraTask:de,showQrcode:pe,showLottery:le,remainDrawsTimes:ae,remainSharedDrawsTimes:se,cutOrderId:F,isHelping:M,cutStatus:l,refreshTask:S,taskEvent:he,extraEvent:me,qrCodeEvent:_e,onShowPrizeDraw:ye.anonymousFunc9,shareBackType:k,shareBackStatus:w,clickTab:s},$),_index.propsManager.set({addressInfo:b,show:!i||(!m.length||1!==l&&2!==l&&3!==l)&&"new1"==v.kdd_social},E),i&&"new1"!=v.kdd_social&&"new2"!=v.kdd_social&&_index.propsManager.set({cutRecordList:ye.data.cutRecordList},j),!i&&re&&_index.propsManager.set({tabColor:D&&P.awardValue?"#FF690A":"#ff973e",isTop:_,getCurrentScrollPos:ye.getCurrentScrollPos.bind(ye),setSecTopPos:ye.setSecTopPos.bind(ye),setSecList3Pos:ye.setSecList3Pos.bind(ye),secKillInfo:ye.secKillInfoCallback.bind(ye)},B),_index.propsManager.set({ruleTxt:c,showRulePop:J,onPopEvent:ye.anonymousFunc10},L),_index.propsManager.set({cutRecordList:W,showRecordPop:f,onPopEvent:ye.anonymousFunc11},q),y.show&&_index.propsManager.set({taskPopData:y,endTime:u.endTime,cutOrderId:F,percent:u.percent,targetAmount:u.targetAmount,cutAmount:u.cutAmount,refreshTaskPop:g,onClickShare:ye.anonymousFunc12,onPopEvent:ye.anonymousFunc13},N),Z&&_index.propsManager.set({isHelpCut:Y,userRightsResps:h,helpCutAmount:d,description:u.description,helpStatus:p,cutStatus:l,headImage:ie,addressInfo:b,onPopEvent:ye.anonymousFunc14,onClickShare:ye.anonymousFunc15},H),r&&_index.propsManager.set({extraTask:O,expireTime:R,cutAmount:u.cutAmount,leftAmount:u.leftAmount,percent:u.percent,targetAmount:u.targetAmount,showExtraTask:fe,isSecondCut:X,onPopEvent:ye.anonymousFunc16,onClickShare:ye.anonymousFunc17},z),C&&_index.propsManager.set({showWithDrawRecord:C,onCloseWithDrawPop:ye.anonymousFunc18},G),_index.propsManager.set({showWithdrawRule:oe,title:"提现规则",withdrawRuleDesc:P.rules,onCloseWitndrawRule:ye.anonymousFunc19},Q),te&&P.awardValue&&_index.propsManager.set({helpCutAmount:d,refreshOrderTask:ne,isSelf:i,orderTaskInfo:P,description:u.description,rightCoupon:h[0],randomBackCashWithdrawStatus:T,onRefreshOrder:ye.anonymousFunc20,onCloseOrderTaskPop:ye.anonymousFunc21,onGetOrderTaskReward:ye.anonymousFunc22},K),x&&_index.propsManager.set({showAuthPop:x,taskId:P.taskId,uniqueId:P.uniqueId,money:ke,onRefreshOrder:ye.anonymousFunc23,onHideAuthPop:ye.anonymousFunc24},V),I&&_index.propsManager.set({cutOrderId:F,onPopEvent:ye.anonymousFunc25},U),{anonymousState__temp7:de,anonymousState__temp8:pe,anonymousState__temp9:le,anonymousState__temp10:he,anonymousState__temp11:me,anonymousState__temp12:_e,anonymousState__temp13:fe,anonymousState__temp14:ke,$compid__64:e,$compid__65:t,$compid__66:n,$compid__67:o,$compid__68:a,$compid__69:$,$compid__70:E,$compid__71:j,$compid__72:B,$compid__73:L,$compid__74:q,$compid__75:N,$compid__76:H,$compid__77:z,$compid__78:G,$compid__79:Q,$compid__80:K,$compid__81:V,$compid__82:U,showOrderTask:D,orderTaskInfo:P,style:_indexModuleScssMap2.default,isSelf:i,helpStatus:p,userRightsResps:h,showTaskBall:ee,randomBackCashWithdrawStatus:T,cutOrderAbMap:v,anonymousState__temp5:ue,anonymousState__temp6:ce,isLogin:re,taskPopData:y,showHelperPop:Z,showSelfPop:r,showWithDrawRecord:C,showOrderTaskPop:te,showAuthPop:x,showQrcodePop:I,helpCutAmount:d,targetData:u}}}},{key:"_createListNew1Data",value:function(g){var v=this;return function(e){var t=(0,_index.genCompid)(g+"$compid__83"),n=(0,_index.genCompid)(g+"$compid__84"),o=(0,_index.genCompid)(g+"$compid__85"),a=v.state,s=a.cutStatus,r=a.shareBackType,r=void 0===r?null:r,i=a.shareBackStatus,i=void 0===i?null:i,u=a.refreshTask,u=void 0!==u&&u,c=a.expireTime,d=a.cutOrderAbMap,p=a.tabIndex,l=a.remainDrawsTimes,h=a.remainSharedDrawsTimes,a=a.clickTab,m=v.data.cutOrderId,_=["全部任务","返现记录"],f=0==p?"false"!==d.kdd_task_show:null,k=0==p?"new"==d.kdd_facetoface:null,d=0==p?"new"==d.kdd_lottery:null,w=0==p?function(e){return v.taskEvent(e)}:null,y=0==p?function(e){return v.extraEvent(e)}:null,S=0==p?function(e){return v.qrCodeEvent(e)}:null;return v.anonymousFunc26=function(){return v.showPrizeDraw()},_index.propsManager.set({tabNameList:_,tabIndex:p,chooseTab:v.chooseTab},t),0==p&&_index.propsManager.set({expireTime:c,showExtraTask:f,showQrcode:k,showLottery:d,remainDrawsTimes:l,remainSharedDrawsTimes:h,cutOrderId:m,isHelping:e,cutStatus:s,refreshTask:u,taskEvent:w,extraEvent:y,qrCodeEvent:S,onShowPrizeDraw:v.anonymousFunc26,shareBackType:r,shareBackStatus:i,showNew:!0,clickTab:a},n),0!=p&&1==p&&_index.propsManager.set({cutRecordList:v.data.cutRecordList},o),{anonymousState__temp15:_,anonymousState__temp16:f,anonymousState__temp17:k,anonymousState__temp18:d,anonymousState__temp19:w,anonymousState__temp20:y,anonymousState__temp21:S,$compid__83:t,$compid__84:n,$compid__85:o,tabIndex:p}}}},{key:"_createListNew2Data",value:function(I){var R=this;return function(e){var t=(0,_index.genCompid)(I+"$compid__86"),n=(0,_index.genCompid)(I+"$compid__87"),o=(0,_index.genCompid)(I+"$compid__88"),a=(0,_index.genCompid)(I+"$compid__89"),s=(0,_index.genCompid)(I+"$compid__90"),r=(0,_index.genCompid)(I+"$compid__91"),i=R.state,u=i.cutStatus,c=i.shareBackType,c=void 0===c?null:c,d=i.shareBackStatus,d=void 0===d?null:d,p=i.refreshTask,p=void 0!==p&&p,l=i.expireTime,h=i.cutOrderAbMap,m=i.friendInfos,m=void 0===m?[]:m,_=i.tabIndex,f=i.addressInfo,k=i.targetData,w=i.remainDrawsTimes,y=i.remainSharedDrawsTimes,i=i.clickTab,S=["返现攻略","全部任务"],g=((m&&0==m.length||0==e)&&(S=["全部任务"]),R.data),v=g.cutOrderId,g=g.cutRecordList,T=(R.anonymousFunc27=function(e,t){return R.onClickShare(e,t)},S&&2==S.length&&1==_||S&&1==S.length?"false"!==h.kdd_task_show:null),P=S&&2==S.length&&1==_||S&&1==S.length?"new"==h.kdd_facetoface:null,h=S&&2==S.length&&1==_||S&&1==S.length?"new"==h.kdd_lottery:null,x=S&&2==S.length&&1==_||S&&1==S.length?function(e){return R.taskEvent(e)}:null,C=S&&2==S.length&&1==_||S&&1==S.length?function(e){return R.extraEvent(e)}:null,D=S&&2==S.length&&1==_||S&&1==S.length?function(e){return R.qrCodeEvent(e)}:null,O=(R.anonymousFunc28=function(){return R.showPrizeDraw()},["返现记录"]);return _index.propsManager.set({tabNameList:S,tabIndex:_,chooseTab:R.chooseTab},t),S&&2==S.length&&0==_&&_index.propsManager.set({friendInfos:m,onClickShare:R.anonymousFunc27,targetAmount:k.targetAmount},n),(S&&2==S.length&&1==_||S&&1==S.length)&&_index.propsManager.set({expireTime:l,showExtraTask:T,showQrcode:P,showLottery:h,remainDrawsTimes:w,remainSharedDrawsTimes:y,cutOrderId:v,isHelping:e,cutStatus:u,refreshTask:p,taskEvent:x,extraEvent:C,qrCodeEvent:D,onShowPrizeDraw:R.anonymousFunc28,shareBackType:c,shareBackStatus:d,showNew:!0,clickTab:i},o),_index.propsManager.set({addressInfo:f,show:1!==u&&2!==u&&3!==u},a),_index.propsManager.set({tabNameList:O},s),_index.propsManager.set({cutRecordList:g},r),{anonymousState__temp22:T,anonymousState__temp23:P,anonymousState__temp24:h,anonymousState__temp25:x,anonymousState__temp26:C,anonymousState__temp27:D,anonymousState__temp28:O,$compid__86:t,$compid__87:n,$compid__88:o,$compid__89:a,$compid__90:s,$compid__91:r,tabNameList:S,tabIndex:_}}}},{key:"toHome",value:function(){(0,_indexWeapp2.jump)({to:"home"}),(0,_indexWeapp4.clickReport)({click_id:"clickzlzfrontpage",click_par:{contentId:this.state.isSelf?"check":"home"}})}},{key:"_createDefaultData",value:function(a){var s=this;return function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=(0,_index.genCompid)(a+"$compid__92"),n=e.defaultType,o=e.defaultTips,e=e.defaultBtnTxt;return _index.propsManager.set({defaultType:void 0===n?0:n,defaultTips:void 0===o?"":o,defaultBtnTxt:void 0===e?"":e,onDefaultEvent:s.onDefaultEvent.bind(s)},t),{$compid__92:t}}}},{key:"_createLocationData",value:function(e){return function(){return{defaultMsg:0<arguments.length&&void 0!==arguments[0]?arguments[0]:""}}}},{key:"pvReportFn",value:function(e,t,n){var o=((0,_indexWeapp5.getStorageSync)(_indexWeapp8.LOGIN_INFO)||{}).PDJ_H5_PIN,o=void 0===o?"":o,a=this.data.isLogin;(0,_indexWeapp4.pvReport)({create_time:new Date,page_par:{createSource:this.$router.params.createSource,login:o?"on":"off",position:e,friendinfo:n,interest:"invalid"==e?"none":t&&"new"==t.kdd_14_seckill&&a?"seckill":"shop"}})}},{key:"componentWillMount",value:function(){startTime=Date.now(),isReportPerformance=!0}},{key:"componentDidShow",value:function(){var e=this,t=(this.getAddressInfo(),this.$router.params),n=t.cutOrderId,o=t.scene,o=void 0===o?"":o,a=t.createSource,a=void 0===a?"":a,t=t.q,t=void 0===t?"":t;this.data.cutOrderId=void 0===n?"":n,this.setLoginState(),o?this.resloveQrCode(o).then(function(){return e.init()}).catch(function(e){}):t?this.data.cutOrderId=decodeURIComponent(t).split("?")[1].split("&")[1].split("=")[1]:this.setState({createSource:a},function(){((0,_indexWeapp5.getStorageSync)(_indexWeapp8.ADDRESS_INFO)||{}).longitude||e.init()}),hasClickShare&&((0,_indexWeapp9.showToast)({title:"分享成功，别忘记提醒好友帮点"}),hasClickShare=!1)}},{key:"componentDidMount",value:function(){getApp().globalData.qrcode.business=181}},{key:"componentWillUnmount",value:function(){hasClickShare=!1}},{key:"init",value:(e=_asyncToGenerator(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.fetchData(!0);case 2:this.getOrderTask();case 3:case"end":return e.stop()}},e,this)})),function(){return e.apply(this,arguments)})},{key:"setLoginState",value:function(){var t=this;(0,_indexWeapp3.isLogin)().then(function(e){t.data.isLogin=!0}).catch(function(e){t.data.isLogin=!1})}},{key:"onEvent",value:function(e){e=e.target.data;this.setState({showShareMomentsDialog:e.flag})}},{key:"helpCut",value:function(){var t=this,e=this.state,n=e.helpStatus,o=e.cutStatus,a=e.isSelf;e.isSecondCut&&this.setState({isSecondCut:!1}),(a&&2==o||!a&&0==n)&&(0,_indexWeapp3.isLogin)().then(function(e){(0,_indexWeapp6.getWxCode)().then(function(e){return t.helpCutApi(e)}).then(function(){return t.init()}).catch(function(e){(0,_indexWeapp9.showToast)({title:"网络开小差，请稍后再试~"})})}).catch(function(e){t.throttleFn(),(0,_indexWeapp3.goToLogin)()}),(0,_indexWeapp4.clickReport)({click_id:"clickcut",click_par:{contentId:"cut"}})}},{key:"resloveQrCode",value:function(e){var o=this;return new Promise(function(n,t){(0,_hackOrder.getCodeInfo)({qrCodeId:e}).then(function(e){var e=e.result,t={};e&&e.paramText&&(t=JSON.parse(e.paramText)),o.setState({createSource:t.createSource||""},function(){o.data.cutOrderId=t.cutOrderId||"",n(t)})}).catch(function(e){t(e)})})}},{key:"onDefaultEvent",value:function(){3===this.state.defaultType&&this.fetchData()}},{key:"helpCutApi",value:function(e){var s=this,t=(0,_indexWeapp5.getStorageSync)(_indexWeapp8.LOGIN_INFO)||{},e=e+","+(t.openId||""),n=this.state,r=n.cutStatus,i=n.isSelf,n=this.data.cutOrderId,u=void 0===n?"":n;if(this.requestFlag)return(this.requestFlag=!1,_hackOrder.hackOrderHelpCut)({cpOrderInfoId:u,nickname:t.nickname||"",headImageUrl:t.avatar||"",secret:(0,_utilsWeapp.encrypt)(e)}).then(function(e){var t,n,o,a;s.throttleFn(),0==e.code?(t=(a=e.result||{}).status,n=a.riskType,o=a.helpCutAmount,a=a.helpCutAmountStr,0==t?((0,_indexWeapp9.showToast)({title:"您已经帮忙砍价"+(a||"")+"~"}),i?s.setState({isSecondCut:2==r,helpCutAmount:o/100}):s.setState({helpCutAmount:o/100,isHelpCut:!0})):(1==n?(0,_indexWeapp9.showToast)({title:"已帮砍过"}):2==n?(0,_indexWeapp9.showToast)({title:"您的砍价次数用光"}):3==n?(0,_indexWeapp9.showToast)({title:"砍价已结束"}):(0,_indexWeapp9.showToast)({title:"账户环境存在风险，请稍后再试。"}),(0,_indexWeapp4.clickReport)({click_id:"clickunablecut",click_par:{statusId:t,riskType:n,cutOrderId:u}}))):(0,_indexWeapp9.showToast)({title:e&&e.msg||"请稍后再试~"})})}},{key:"throttleFn",value:function(){var e=this,t=null;t&&(clearTimeout(t),t=null),setTimeout(function(){e.requestFlag=!0},800)}},{key:"fetchData",value:function(u){var c=this,e=this.data.cutOrderId,t=void 0===e?"":e,e=((0,_indexWeapp5.getStorageSync)(_indexWeapp8.LOGIN_INFO)||{}).openId,n=void 0===e?"":e,d=Date.now();return new Promise(function(r,i){(0,_hackOrder.getHackOrderInfo)({cutOrderId:t,openId:n}).then(function(e){if(0==e.code){var t=Date.now(),n=e.result||{},e=c.state.isSecondCut,e=void 0!==e&&e;switch(n.helpStatus){case 1:n.description="谢谢你，你已经帮我砍过了";break;case 2:n.description="你暂时没有帮砍次数了哦";break;case 3:n.description="谢谢你，活动已经结束了";break;case 4:n.description="谢谢你，活动已经成功了";break;case 5:n.description="抱歉活动暂未开始";break;default:n.description=""}var o,a={cutAmount:n.cutAmount,leftAmount:n.leftAmount||"",cutStatus:n.cutStatus,endTime:n.endTime,targetAmount:n.targetAmount,percent:n.percent,description:n.description,helpStatus:n.helpStatus,receivingDay:n.receivingDay,helpCutAmount:n.helpCutAmount||""},s=n.randomBackCashQualifications&&"true"==n.cutOrderAbMap.kdd_ordertask_show;2!=n.character||0==n.helpStatus||s||c.showCutPopReport(),c.data=_extends({},c.data,{expireTime:n.expireTime,cutRecordList:n.cutRecord,cpOrderWithdrawSuccessInfos:n.successInfoWrapper.cpOrderWithdrawSuccessInfos||[],shareResp:n.shareResp||{}}),n.helpCutAmount&&c.setState({helpCutAmount:n.helpCutAmount}),u&&(o=c.$router.params.materialId,(0,_indexWeapp4.clickReport)({click_id:"clickwechatcutorder",click_par:{channelId:181,materialId:o}}),o=1!=n.character||!n.friendInfos||!n.friendInfos.length||1!=n.cutStatus&&2!=n.cutStatus&&3!=n.cutStatus||"new1"!=n.cutOrderAbMap.kdd_social&&"new2"!=n.cutOrderAbMap.kdd_social?2:1,c.pvReportFn("valid",n.cutOrderAbMap,o)),c.setState({targetData:a,remainDrawsTimes:n.remainDrawsTimes,remainSharedDrawsTimes:n.remainSharedDrawsTimes,ruleTxt:n.rules,isSelf:1==n.character,friendInfos:n.friendInfos||[],cutStatus:n.cutStatus,helpStatus:n.helpStatus,refreshTaskPop:!c.state.refreshTaskPop,showTaskBall:s,userRightsResps:n.userRightsResps,bonusPoolEmpty:n.bonusPoolEmpty,cutOrderAbMap:n.cutOrderAbMap||{},showSelfPop:!(1!=n.character||1!=n.cutStatus&&2!=n.cutStatus&&!e)},function(){r(),isReportPerformance&&(0,_indexWeapp.testSpeed)(startTime,d,t,1036,2034).then(function(){isReportPerformance=!1})})}else c.setState({defaultMsg:{defaultType:3,defaultTips:"活动被挤爆啦，稍后再试哦～"}}),i()}).catch(function(e){c.setState({defaultMsg:{showSelfPop:!1,showDefault:!0,defaultType:3,defaultTips:"活动被挤爆啦，稍后再试哦～"}})})})}},{key:"setHelpStatus",value:function(e){switch(e){case 2:return 0;case 3:return 1;case 4:return 2;default:return 0}}},{key:"getAddressInfo",value:function(){var n=this;(0,_indexWeapp7.getLocation)().then(function(e){var t=!1;e.cityId&&(t=!0),n.data.addressInfo=e,n.setState({showLocation:!1,hasAddress:t,locationError:""},function(){this.init()})}).catch(function(e){n.setState({showLocation:!0,hasAddress:!1,locationError:{errMsg:e&&e.msg||"获取位置失败"}}),n.pvReportFn("invalid","",2)})}},{key:"onShareAppMessage",value:function(e){var t=this.state.createSource,n=this.data,o=n.cutOrderId,n=n.shareResp,n=void 0===n?{}:n;return{title:n.shareTitle||"来帮好友助力吧~",imageUrl:n.shareImage||"",path:"/pages/hackOrder-t/detail/index?cutOrderId="+(void 0===o?"":o)+"&createSource="+t+"&materialId="+n.materialId}}},{key:"onPopEvent",value:function(e,t){var n=this,o=this.state,a=o.showRulePop,o=o.showRecordPop;"rulePop"==t?this.setState({showRulePop:!a},function(){n.state.showRulePop&&(0,_indexWeapp4.clickReport)({click_id:"clickzlzrules",click_par:{contentId:"rules"}})}):"record"==t?this.setState({showRecordPop:!o}):"hideTaskPop"==t?((a=this.state.taskPopData).show=!1,this.setState({taskPopData:a,shareBackType:null,shareBackStatus:null})):"refreshTask"==t?((o=this.state.taskPopData).show=!1,this.setState({taskPopData:o}),this.fetchData()):"getPacket"==t?((a=this.state.taskPopData).show=!1,this.setState({shareBackType:0,shareBackStatus:0,taskPopData:a,refreshTask:!this.state.refreshTask}),this.fetchData()):"getExtraReward"==t?this.setState({refreshTask:!this.state.refreshTask,refreshTaskPop:!this.state.refreshTaskPop,shareBackType:3}):"hideQrcodePop"==t?this.setState({showQrcodePop:!1}):"selfPop"==t?this.setState({showSelfPop:!1}):"helperPop"==t&&this.setState({showHelperPop:!1})}},{key:"onClickShare",value:function(e,t,n){switch(hasClickShare=!0,t){case"cutFn":this.helpCut();break;case"friend":var o=this.state.taskPopData;o.show=!1,this.setState({shareBackType:n&&0<=n.shareBackType?n.shareBackType:null,shareBackStatus:n&&0<=n.shareBackStatus?n.shareBackStatus:null,refreshTask:n&&1==n.forbidTask?this.state.refreshTask:!this.state.refreshTask,taskPopData:o}),this._openShare();break;case"moment":this._openShare();break;case"friendBtn":this.helpCut()}}},{key:"onCutPopShare",value:function(e){this.helpCut()}},{key:"_openShare",value:function(){this.shareToMomentWeApp()}},{key:"shareToMomentWeApp",value:function(){var t=this,e=((0,_indexWeapp9.showLoading)(),this.data),n=e.cutOrderId,e=e.shareResp,o=this.$router.params.createSource,n=JSON.stringify({cutOrderId:n,createSource:o,materialId:e.materialId});(0,_hackOrder.getCirclePic)({page:"pages/hackOrder-t/detail/index",requestParam:n}).then(function(e){(0,_indexWeapp9.hideLoading)();e=e.result;e?(t.data.momentsShareImgSrc=e,t.setState({showShareMomentsDialog:!0})):(0,_indexWeapp9.showToast)({title:"今日分享朋友圈机会已用完，请直接分享好友~"})}).catch(function(e){(0,_indexWeapp9.hideLoading)(),(0,_indexWeapp9.showToast)({title:e&&e.msg||"分享失败"})})}},{key:"componentDidHide",value:function(){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"componentDidHide",this)&&_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"componentDidHide",this).call(this)}},{key:"getCurrentScrollPos",value:function(){return currentScrollPos}},{key:"setSecTopPos",value:function(e){secTopPos=e+currentScrollPos}},{key:"secKillInfoCallback",value:function(e){this.setState({secKillProIsNull:e})}},{key:"setSecList3Pos",value:function(e){secList3Pos=0==e?e:e+currentScrollPos-screenHeight}},{key:"onReachBottom",value:function(){this.childSecGoodsKill&&this.childSecGoodsKill.seckillBottomRefresh()}},{key:"onPageScroll",value:function(e){currentScrollPos=e.scrollTop;e=e.scrollTop>=secTopPos;0!=secTopPos&&this.state.secIsTop!=e&&0!=secTopPos&&this.setState({secIsTop:e})}},{key:"taskEvent",value:function(e){var t;this.state.isSelf&&(t=1!=this.state.shareBackType&&2!=this.state.shareBackType&&4!=e.taskType&&this.state.showSelfPop,this.state.isSecondCut&&4==e.taskType?(this.setState({showSelfPop:!0,isSecondCut:!1}),(0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"clicksecondbox",click_par:{statusId:"show"}})):(2!==this.state.cutStatus&&this.fetchData(),this.setState({taskPopData:e})),this.setState({taskPopData:e,shareBackType:null,showSelfPop:t}))}},{key:"extraEvent",value:function(e){this.setState({extraTask:e})}},{key:"qrCodeEvent",value:function(){this.setState({showQrcodePop:!0})}},{key:"onRefresh",value:function(){this.fetchData(),this.setState({refreshTask:!this.state.refreshTask})}},{key:"onCloseOrderTaskPop",value:function(){this.setState({showOrderTaskPop:!1})}},{key:"onShowOrderTaskPop",value:function(){this.getOrderTask(!0)}},{key:"hideAuthPop",value:function(){this.setState({showAuthPop:!1})}},{key:"onGetOrderTaskReward",value:function(){this.setState({showAuthPop:!0,showOrderTaskPop:!1})}},{key:"onRefreshOrder",value:function(){this.getOrderTask(),this.setState({refreshOrderTask:!this.state.refreshOrderTask})}},{key:"getOrderTask",value:function(o){var a=this,e=this.state,t=e.showTaskBall,s=e.isSelf,n=e.userRightsResps,r=void 0===n?[{}]:n,i=e.bonusPoolEmpty,u=e.helpStatus;t?(0,_hackOrder.getTaskListInfo)({modelId:"K10001",plateCode:(0,_hackOrder.getPlateCode)()}).then(function(e){var e=(e.result||{}).taskInfoList,e=void 0===e?[]:e,t=e.length?e[0]:{},n=!1;0===u||s?0!==t.status&&((0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"showOrderTaskBall",click_par:{taskStatus:t.status}}),3==t.status&&a.getWithdrawStatus(e[0].uniqueId)):(i&&0!=t.status||!i?(n=o=!0,(0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"showOrderTaskPop",click_par:{taskStatus:t.status,couponId:r[0].couponEntity&&r[0].couponEntity.couponId||""}}),(0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"showOrderTask",click_par:{taskStatus:t.status,couponId:r[0].couponEntity&&r[0].couponEntity.couponId||""}})):a.showCutPopReport(),3==t.status&&a.getWithdrawStatus(t.uniqueId)),a.setState({orderTaskInfo:t,showOrderTask:n,showOrderTaskPop:o,defaultMsg:{defaultType:-1,defaultTips:""}})}).catch(function(e){}):this.setState({showOrderTask:!1,showOrderTaskPop:o,defaultMsg:{defaultType:-1,defaultTips:""}})}},{key:"showCutPopReport",value:function(){this.setState({showHelperPop:!0})}},{key:"onCloseWithDrawPop",value:function(e){this.setState({showWithDrawRecord:e})}},{key:"onCloseWitndrawRule",value:function(e){this.setState({showWithdrawRule:e})}},{key:"getWithdrawStatus",value:function(e){var t=this;(0,_hackOrder.withdrawStatus)({uniqueId:e}).then(function(e){e=e.result;t.setState({randomBackCashWithdrawStatus:e.randomBackCashWithdrawStatus})}).catch(function(e){})}},{key:"anonymousFunc0",value:function(e){}},{key:"anonymousFunc1",value:function(e){}},{key:"anonymousFunc2",value:function(e){}},{key:"anonymousFunc3",value:function(e){}},{key:"anonymousFunc4",value:function(e){}},{key:"anonymousFunc5",value:function(e){}},{key:"anonymousFunc6",value:function(e){}},{key:"anonymousFunc7",value:function(e){}},{key:"anonymousFunc8",value:function(e){}},{key:"anonymousFunc9",value:function(e){}},{key:"anonymousFunc10",value:function(e){}},{key:"anonymousFunc11",value:function(e){}},{key:"anonymousFunc12",value:function(e){}},{key:"anonymousFunc13",value:function(e){}},{key:"anonymousFunc14",value:function(e){}},{key:"anonymousFunc15",value:function(e){}},{key:"anonymousFunc16",value:function(e){}},{key:"anonymousFunc17",value:function(e){}},{key:"anonymousFunc18",value:function(e){}},{key:"anonymousFunc19",value:function(e){}},{key:"anonymousFunc20",value:function(e){}},{key:"anonymousFunc21",value:function(e){}},{key:"anonymousFunc22",value:function(e){}},{key:"anonymousFunc23",value:function(e){}},{key:"anonymousFunc24",value:function(e){}},{key:"anonymousFunc25",value:function(e){}},{key:"anonymousFunc26",value:function(e){}},{key:"anonymousFunc27",value:function(e){}},{key:"anonymousFunc28",value:function(e){}}]),s}(),_class.$$events=["onPageScroll","onPopEvent"],_class.options={addGlobalClass:!0},_class.multipleSlots=!0,_class.$$componentPath="pages/hackOrder-t/detail/index",_temp2);exports.default=Detail,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Detail,!0));
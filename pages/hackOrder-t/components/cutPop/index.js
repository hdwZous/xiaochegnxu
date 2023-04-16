"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_extends=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t,o=arguments[n];for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&(e[t]=o[t])}return e},_createClass=function(){function o(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,n,t){return n&&o(e.prototype,n),t&&o(e,t),e}}(),_get=function e(n,t,o){null===n&&(n=Function.prototype);var a=Object.getOwnPropertyDescriptor(n,t);if(void 0!==a){if("value"in a)return a.value;a=a.get;return void 0!==a?a.call(o):void 0}n=Object.getPrototypeOf(n);if(null!==n)return e(n,t,o)},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_indexWeapp2=require("../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp3=require("../../../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_animate=require("../../api/animate.js"),_animate2=_interopRequireDefault(_animate),_goToByCouponWeapp=require("../../../../npm/@jd/djmp/common-t/js/utils/goToByCoupon.weapp.js"),_hackOrder=require("../../api/hackOrder.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}var CutPop=(_temp2=_class=function(){function i(){var e,n;_classCallCheck(this,i);for(var t=arguments.length,o=Array(t),a=0;a<t;a++)o[a]=arguments[a];return(e=n=_possibleConstructorReturn(this,(e=i.__proto__||Object.getPrototypeOf(i)).call.apply(e,[this].concat(o)))).$usedState=["showCutPop","isSelf","anonymousState__temp","anonymousState__temp2","currentPercent","storeIdList","showShopFlag","showShopTitle","update","cutAmountNew","extraInfo","isSecondCut","targetAmount","leftAmount","showExtraTask","userRightsResps","description","newUserCoupon","cutAmount","strategyCoupons","helperCoupon","headImage","updatePercent","percent","extraTask","helpStatus","isHelpCut","couponData","addressInfo","expireTime"],n.anonymousFunc16Map={},n.anonymousFunc17Map={},n.customComponents=["Pop","StoreListPop","LostCoupon"],_possibleConstructorReturn(n,e)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.state={currentPercent:"0",storeIdList:"",showShopFlag:!0,showShopTitle:!1,update:!1,cutAmountNew:0,extraInfo:{}},this.$$refs=[]}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,n=this.__props,t=n.isSelf,o=n.showCutPop,n=t?this._createSelfData(e+"XzAigDuJVD")():null,e=this._createHelperData(e+"SGLPhlFChk")();return Object.assign(this.__state,{showCutPop:o,isSelf:t,anonymousState__temp:n,anonymousState__temp2:e}),this.__state}},{key:"_createSelfData",value:function(_){var m=this;return function(){var e=(0,_index.genCompid)(_+"$compid__237"),n=(0,_index.genCompid)(_+"$compid__238"),t=m.props,o=t.isSecondCut,a=t.showCutPop,i=t.targetAmount,u=t.leftAmount,s=t.showExtraTask,r=m.state,c=r.currentPercent,p=void 0===c?"":c,l=r.cutAmountNew,d=void 0===l?0:l,t=r.extraInfo,c=void 0===t?{finishNum:0,totalNum:0}:t,r=void 0,t=void 0,t=c.subList&&0<c.subList.length?(l=c&&c.subList&&c.subList[0]||{node:0,targetInviteNum:0,invitedNum:0},r=Number(l.node)-Number(c.finishNum||c.todayFinishNum)||0,Number(l.maxPrize||l.prizeValue)/1e3||"0.0"):(r=Number(c.totalNum)-Number(c.finishNum||c.todayFinishNum)||0,Number(c.maxPrize||0)/1e3||"0.0");m.anonymousFunc0=function(e){return m.onPopEvent(e,"self")};c=s?(0,_index.internal_inline_style)({width:p}):null;m.anonymousFunc1=function(e){m.onClickShare(e,"friend")},m.anonymousFunc2=function(e){return m.onPopEvent(e,"self")};p=(0,_index.internal_inline_style)({width:p});return m.anonymousFunc3=function(e){m.onClickShare(e,"friend")},s&&_index.propsManager.set({isShow:a,defineSelf:!0,isNeedCloseIcon:!0,onPopEvent:m.anonymousFunc0},e),s||_index.propsManager.set({isShow:a,defineSelf:!0,isNeedCloseIcon:!0,onPopEvent:m.anonymousFunc2},n),{anonymousState__temp3:c,anonymousState__temp4:p,$compid__237:e,$compid__238:n,style:_indexModuleScssMap2.default,isSecondCut:o,showExtraTask:s,cutAmountNew:d,targetAmount:i,inviteNum:r,maxPrize:t,leftAmount:u}}}},{key:"_createHelperData",value:function(n){var t=this;return function(){var e=t.isShowNotHelp();return{showNotHelp:e,anonymousState__temp6:e?t._createNotHelpData(n+"SSOhiMOtjv")():null,anonymousState__temp7:t._createHasHelpData(n+"vhIHBrrjUC")()}}}},{key:"_createNotHelpData",value:function(i){var u=this;return function(){var e=(0,_index.genCompid)(i+"$compid__239"),n=u.state.showShopFlag,t=u.props.userRightsResps,o=void 0===t?[]:t,a=u.isShowNotHelp(),t=o.length?u._createRightData(i+"BabaorFMqb")():null;return u.anonymousFunc4=function(e){return u.onShopJudge(e)},u.anonymousFunc5=function(e){return u.onPopEvent(e)},!o.length&&n&&_index.propsManager.set(_extends({},u.props,{showNotHelp:a,sceneId:"140",isPop:!0,onShopJudge:u.anonymousFunc4,onPopEvent:u.anonymousFunc5}),e),{$compid__239:e,userRightsResps:o,anonymousState__temp8:t,showShopFlag:n}}}},{key:"_createNewerNewData",value:function(e){var a=this;return function(e){var n=a.props,t=n.description,o=n.newUserCoupon,n=n.cutAmount;return a.anonymousFunc6=function(e){return a.toUse(e,"newer",o.couponId)},{type:e,style:_indexModuleScssMap2.default,cutAmount:n,description:t,newUserCoupon:o}}}},{key:"_createHasHelpData",value:function(m){var h=this;return function(){var e=(0,_index.genCompid)(m+"$compid__240"),n=(0,_index.genCompid)(m+"$compid__241"),t=h.props,o=t.strategyCoupons,a=void 0===o?[]:o,i=t.helperCoupon,u=void 0===i?{}:i,s=t.newUserCoupon,r=t.showCutPop,c=t.userRightsResps,p=void 0===c?[]:c,l=h.state.showShopFlag,d=h.isShowNotHelp(),_=p.length?h._createRightData(m+"ZxCbxOFAsj")():null,o=a.length?h._createLostCouponData(m+"PiAFmctVsc")():null,i=s&&s.couponId?h._createNewerNewData(m+"IMQcnyJrlG")("helpPop"):null,t=u&&u.amount?h._createHelpCouponData(m+"XoOMtNeINW")():null,c=h._createDefaultData(m+"vKkKSrBRqT")();return h.anonymousFunc7=function(e){return h.onPopEvent(e,"new")},h.anonymousFunc8=function(e){return h.onShopJudge(e)},h.anonymousFunc9=function(e){return h.onPopEvent(e)},!p.length&&!a.length&&s&&s.couponId&&_index.propsManager.set({isShow:r,defineSelf:!0,onPopEvent:h.anonymousFunc7},e),p.length||a.length||s&&s.couponId||u&&u.amount||!l||_index.propsManager.set(_extends({},h.props,{showNotHelp:d,sceneId:"140",isPop:!0,onShopJudge:h.anonymousFunc8,onPopEvent:h.anonymousFunc9}),n),{$compid__240:e,$compid__241:n,userRightsResps:p,anonymousState__temp9:_,strategyCoupons:a,anonymousState__temp10:o,newUserCoupon:s,anonymousState__temp11:i,helperCoupon:u,anonymousState__temp12:t,showShopFlag:l,anonymousState__temp13:c}}}},{key:"_createLostCouponData",value:function(i){var u=this;return function(){var e=(0,_index.genCompid)(i+"$compid__243"),n=u.props,t=n.cutAmount,o=n.showCutPop,a=n.strategyCoupons,n=void 0===a?[]:a;u.anonymousFunc10=function(e){return u.onPopEvent(e,"lost")};a=n.map(function(e,n){e={$original:(0,_index.internal_get_original)(e)};n=(0,_index.genCompid)(i+"RjpfhVOHqH"+n);return _index.propsManager.set({itemCoupon:e.$original},n),{$compid__242:n,$original:e.$original}});return _index.propsManager.set({isShow:o,defineSelf:!0,onPopEvent:u.anonymousFunc10},e),{loopArray87:a,$compid__243:e,style:_indexModuleScssMap2.default,strategyCoupons:n,cutAmount:t}}}},{key:"_createHelpCouponData",value:function(i){var u=this;return function(){var e=(0,_index.genCompid)(i+"$compid__244"),n=u.props,t=n.cutAmount,o=n.showCutPop,a=n.helperCoupon;return u.anonymousFunc11=function(e){return u.onPopEvent(e,"help")},u.anonymousFunc12=function(e){u.toUse(e,"helper",a.couponId)},_index.propsManager.set({isShow:o,defineSelf:!0,onPopEvent:u.anonymousFunc11},e),{$compid__244:e,style:_indexModuleScssMap2.default,cutAmount:t,helperCoupon:a}}}},{key:"_createDefaultData",value:function(o){var a=this;return function(){var e=(0,_index.genCompid)(o+"$compid__245"),n=a.props,t=n.cutAmount,n=n.showCutPop;return a.anonymousFunc13=function(e){return a.onPopEvent(e,"icon")},a.anonymousFunc14=function(e){a.onClickShare(e)},_index.propsManager.set({isShow:n,defineSelf:!0,onPopEvent:a.anonymousFunc13},e),{$compid__245:e,style:_indexModuleScssMap2.default,cutAmount:t}}}},{key:"_createRightData",value:function(s){var r=this;return function(){var e=(0,_index.genCompid)(s+"$compid__246"),n=r.props,t=n.showCutPop,o=n.userRightsResps,a=void 0===o?[]:o,i=n.cutAmount,u=n.description,o=n.headImage;r.anonymousFunc15=function(e){return r.onPopEvent(e,"right")};n=0<a.length?a.map(function(n,e){n={$original:(0,_index.internal_get_original)(n)};var t="fWDZn"+e;r.anonymousFunc16Map[t]=function(e){return r.rightCouponGo(e,n.$original)};e="kJTRL"+e;return r.anonymousFunc17Map[e]=function(e){return r.rightCouponGo(e,n.$original)},{_$indexKey:t,_$indexKey2:e,$original:n.$original}}):[];return _index.propsManager.set({isShow:t,defineSelf:!0,onPopEvent:r.anonymousFunc15},e),{loopArray88:n,$compid__246:e,style:_indexModuleScssMap2.default,headImage:o,userRightsResps:a,cutAmount:i,description:u}}}},{key:"componentDidMount",value:function(){this.initPercent()}},{key:"componentDidUpdate",value:function(){var e=this.props.updatePercent;e&&this.state.update!==e&&(this.initPercent(),this.setState({update:e}))}},{key:"initPercent",value:function(){var e=this,n=this.props,t=n.percent,o=void 0===t?"":t,a=n.cutAmount,t=n.extraTask,t=void 0===t?{}:t,n=n.isSelf;93<=o.split("%")[0]&&o.split("%")[0]<100?o="93%":100==o.split("%")[0]&&(o="98%"),this.setState({currentPercent:o});var i=new _animate2.default({target:a||0,speed:1e3,refreshTime:100,decimals:2,onUpdate:function(){e.setState({cutAmountNew:i.tempValue})},onComplete:function(){}});n&&(t&&t.taskId?this.setState({extraInfo:t}):this.getExtraInfo())}},{key:"isShowNotHelp",value:function(){var e=this.props,n=e.helpStatus,e=e.isHelpCut;return 2!=n&&3!=n&&4!=n||e?!1:!0}},{key:"setHelpStatus",value:function(){switch(this.props.helpStatus){case 2:return 0;case 3:return 1;case 4:return 2;default:return 0}}},{key:"onShopJudge",value:function(e){var n=e.type,t=e.data,o=this.setHelpStatus(),a=this.isShowNotHelp();"noData"==n?(this.setState({showShopFlag:t.show}),a&&this.props.onPopEvent(e,"cutPop"),(0,_indexWeapp2.clickReport)({create_time:new Date,click_id:"shownewhelperbox",click_par:{statusId:"show",awardId:"none"}})):"showData"==n?(a?(0,_indexWeapp2.clickReport)({create_time:new Date,click_id:"showunablecutbox",click_par:{statusId:o,contentId:"storeid",storeId:t.storeId}}):(0,_indexWeapp2.clickReport)({create_time:new Date,click_id:"shownewhelperbox",click_par:{statusId:"show",awardId:"storeid",storeId:t.storeId}}),this.setState({storeIdList:t.storeId,showShopFlag:t.show,showShopTitle:t.show})):"click"==n&&(a?(0,_indexWeapp2.clickReport)({create_time:new Date,click_id:"clickunablecutbox",click_par:{statusId:o,contentId:"storeid",storeId:t.storeId}}):(0,_indexWeapp2.clickReport)({create_time:new Date,click_id:"clicknewhelperbox",click_par:{contentId:"storeid",storeId:t.storeId}}))}},{key:"onPopEvent",value:function(e,n){var t=this.props,o=t.isSecondCut,a=t.strategyCoupons,i=void 0===a?[]:a,u=t.helperCoupon,a=t.userRightsResps,s=void 0===a?[]:a,t=t.newUserCoupon,r=void 0===t?{}:t;switch(this.props.onPopEvent(e,"cutPop"),n){case"right":var c="",p="";s.forEach(function(e){1==e.type?(p=e.couponEntity.couponId,1==e.couponEntity.couponRightsType&&(c="new"),2==e.couponEntity.couponRightsType&&(c="helpUser"),3==e.couponEntity.couponRightsType&&(c="lostUser")):2==e.type&&(p+=","+e.vipInfo.type)}),(0,_indexWeapp2.clickReport)({create_time:new Date,click_id:"shownewhelperbox",click_par:{statusId:"close",awardId:c,couponId:p}});break;case"icon":(0,_indexWeapp2.clickReport)({click_id:"shownewhelperbox",click_par:{statusId:"close",awardId:"none",couponId:""}});break;case"help":(0,_indexWeapp2.clickReport)({click_id:"shownewhelperbox",click_par:{statusId:"close",awardId:"helpUser",couponId:u.couponId}});break;case"lost":var l="";i.length&&i.forEach(function(e){l+=e.couponId+","}),(0,_indexWeapp2.clickReport)({click_id:"shownewhelperbox",click_par:{statusId:"close",awardId:"lostUser",couponId:l}});break;case"new":(0,_indexWeapp2.clickReport)({click_id:"clicknewbox",click_par:{statusId:"close",awardId:"new",couponId:r.couponId}});break;case"self":o?(0,_indexWeapp2.clickReport)({click_id:"clicksecondbox",click_par:{statusId:"close"}}):(0,_indexWeapp2.clickReport)({click_id:"clickfirstbox",click_par:{statusId:"close"}})}}},{key:"onClickShare",value:function(e,n){var t=this.props,o=t.isSecondCut,a=t.couponData;t.isSelf?o?(0,_indexWeapp2.clickReport)({create_time:new Date,click_id:"clicksecondbox",click_par:{statusId:"point"}}):(0,_indexWeapp2.clickReport)({create_time:new Date,click_id:"clickfirstbox",click_par:{statusId:"point",awardId:a&&a.amount?"yes":"no"}}):(0,_indexWeapp2.clickReport)({create_time:new Date,click_id:"clicknewhelperbox",click_par:{contentId:"none"}}),this.props.onClickShare(e,n)}},{key:"toUse",value:function(e,n,t){"newer"==n&&(0,_indexWeapp2.clickReport)({click_id:"clicknewbox",click_par:{contentId:"new",couponId:t}}),"helper"==n&&(0,_indexWeapp2.clickReport)({click_id:"clicknewhelperbox",click_par:{contentId:"helpUser",couponId:t}}),(0,_indexWeapp3.jump)({to:"home"})}},{key:"rightCouponGo",value:function(e,n){var t="",o="";1==n.type?(t=n.couponEntity.couponId,1==n.couponEntity.couponRightsType&&(o="new"),2==n.couponEntity.couponRightsType&&(o="helpUser"),3==n.couponEntity.couponRightsType&&(o="lostUser")):2==n.type&&(t=n.vipInfo.type),(0,_indexWeapp2.clickReport)({create_time:new Date,click_id:"clicknewhelperbox",click_par:{contentId:o,couponId:t}}),2==n.type?(0,_indexWeapp.navigateTo)("/pages/redEnvelopeList/list/index"):(o=this.props.addressInfo,(t={}).couponId=n.couponEntity.couponId,t.longitude=o.longitude,t.latitude=o.latitude,t.cityId=o.cityId,t.defaultJump_="home",(0,_goToByCouponWeapp.goToByCouponId)(t))}},{key:"getExtraInfo",value:function(){var t=this,e=this.props.expireTime;(0,_hackOrder.getTaskListInfo)({modelId:"K10002",plateCode:(0,_hackOrder.getPlateCode)(),finishTimestamp:e}).then(function(e){var n=e.result,n=void 0===n?{}:n;0==e.code&&n&&(n=n.taskInfoList||[],t.setState({extraInfo:n[0]}))}).catch(function(e){})}},{key:"anonymousFunc0",value:function(e){}},{key:"anonymousFunc1",value:function(e){}},{key:"anonymousFunc2",value:function(e){}},{key:"anonymousFunc3",value:function(e){}},{key:"anonymousFunc4",value:function(e){}},{key:"anonymousFunc5",value:function(e){}},{key:"anonymousFunc6",value:function(e){}},{key:"anonymousFunc7",value:function(e){}},{key:"anonymousFunc8",value:function(e){}},{key:"anonymousFunc9",value:function(e){}},{key:"anonymousFunc10",value:function(e){}},{key:"anonymousFunc11",value:function(e){}},{key:"anonymousFunc12",value:function(e){}},{key:"anonymousFunc13",value:function(e){}},{key:"anonymousFunc14",value:function(e){}},{key:"anonymousFunc15",value:function(e){}},{key:"anonymousFunc16",value:function(e,n){return this.anonymousFunc16Map[e]&&this.anonymousFunc16Map[e](n)}},{key:"anonymousFunc17",value:function(e,n){return this.anonymousFunc17Map[e]&&this.anonymousFunc17Map[e](n)}}]),i}(),_class.$$events=["anonymousFunc3","anonymousFunc1","anonymousFunc6","anonymousFunc12","anonymousFunc14","anonymousFunc16","anonymousFunc17"],_class.options={addGlobalClass:!0},_class.multipleSlots=!0,_class.$$componentPath="pages/hackOrder-t/components/cutPop/index",_temp2);exports.default=CutPop,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(CutPop));
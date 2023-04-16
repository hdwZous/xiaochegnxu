"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,a=arguments[t];for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},_createClass=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}(),_get=function e(t,n,a){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);return void 0!==i?"value"in i?i.value:void 0!==(i=i.get)?i.call(a):void 0:null!==(i=Object.getPrototypeOf(t))?e(i,n,a):void 0},_index=require("../../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_signIn=require("../../../../../common-mp/api/signIn.js"),_indexWeapp=require("../../../../../npm/@jd/djmp/common-t/constants/index.weapp.js"),_indexWeapp2=require("../../../../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),_indexWeapp3=require("../../../../../npm/@jd/djmp/common-t/js/share/index.weapp.js"),_indexWeapp4=require("../../../../../npm/@jd/djmp/common-t/js/env/index.weapp.js"),_indexWeapp5=require("../../../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_indexWeapp6=require("../../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp7=require("../../../../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_utilsWeapp=require("../../common/utils.weapp.js"),_largeScreen=require("../../../../../common-mp/api/largeScreen.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function o(){var e,t;_classCallCheck(this,o);for(var n=arguments.length,a=Array(n),i=0;i<n;i++)a[i]=arguments[i];return(e=t=_possibleConstructorReturn(this,(t=o.__proto__||Object.getPrototypeOf(o)).call.apply(t,[this].concat(a)))).$usedState=["anonymousState__temp","anonymousState__temp6","loopArray36","$compid__224","$compid__225","showBeansShow","style","showSuccess","animateClose","carveUpCount","joinUsers","groupStatus","result","wonUsers","showRule","rule","carveUpCountMoney","HH","MM","SS","MS","countDownStr","userLogin","params","timer","disabled","self","day","transition","isLargeScreen","closeBeanShareLayer","beanShareIconAnimate","urlGroupId"],t.config={navigationBarTitleText:""},t.customComponents=["Marquee","SubscribeMessage"],_possibleConstructorReturn(t,e)}return _inherits(o,_index.Component),_createClass(o,[{key:"_constructor",value:function(e){var t=this;_get(o.prototype.__proto__||Object.getPrototypeOf(o.prototype),"_constructor",this).call(this,e),this.shareFlag=!0,this.state={showBeansShow:!1,countDownStr:"00:00:00",userLogin:!1,params:{},result:{},timer:null,disabled:!1,showSuccess:!1,self:1,day:0,HH:"00",MM:"00",SS:"00",MS:"0",animateClose:"",transition:{opacity:"1"},isLargeScreen:!1},this.$$refs=[{type:"component",id:"NHKZS",refName:"",fn:function(e){return t.childSubscribe=e}}]}},{key:"openBeansShareFun",value:function(){var a=this,e=(0,_indexWeapp7.getStorageSync)(_indexWeapp.LOGIN_INFO)||{};return new Promise(function(t,n){(0,_signIn.openBeansShare)({nickName:e.nickname||"",nickHeadUrl:e.avatar||"",wcUnionId:e.unionid_pdj_jd_new||"",openId:e.openId||"",formId:"",type:1,traceId:(new Date).getTime()}).then(function(e){0==e.code?(a.getBeansShareInfo(e.result),t(!0)):n(!1)}).catch(function(e){_index2.default.showToast({title:e.msg,icon:"none",duration:2e3}),n(!1)})})}},{key:"attendBeansShare",value:function(e){var t=this,n=e.groupId,n=void 0===n?"":n,e=e.activityId,e=void 0===e?"":e,a=(0,_indexWeapp7.getStorageSync)(_indexWeapp.LOGIN_INFO)||{},i=n+","+e+","+(a.openId||"");(0,_signIn.joinBeansShare)({encryptData:(0,_utilsWeapp.encrypt)(i),groupId:n,activityId:e,nickName:a.nickname,nickHeadUrl:a.avatar,wcUnionId:a.unionid_pdj_jd_new||"",formId:"",type:1,traceId:new Date}).then(function(e){0==e.code?t.getBeansShareInfo(e.result):(0,_indexWeapp5.showToast)({title:e.msg,icon:"none",duration:2e3})}).catch(function(e){(0,_indexWeapp5.showToast)({title:e.msg,icon:"none",duration:2e3})})}},{key:"getBeansShareInfo",value:function(t){var r=this;return new Promise(function(o,e){(0,_signIn.beansGroupInfo)({groupId:t.groupId||"",type:1}).then(function(e){var t,n,a,i;0==e.code?(i=(a=e.result).wonUsers,a.successInCount,t=void 0===(t=a.self)?0:t,n=a.groupStatus,a=void 0===(a=a.groupId)?"":a,(i=void 0===i?[]:i).map(function(e){return e.nickName=(e.nickName||"")+"获得了"+(e.carveUpCount||"")+"鲜豆",e}),r.setState({result:e.result,wonUsers:i,showBeansShow:!0,self:t}),e.result.remainTime&&1==e.result.groupStatus&&r.showCountDown(e.result.remainTime),2!=n||1!=t&&2!=t||((i="string"==typeof(i=(0,_indexWeapp7.getStorageSync)("success_bean_groupIds")||[])?JSON.parse(i):i).includes(a)||(r.setState({showSuccess:!0}),setTimeout(function(){r.setState({showSuccess:!1})},1500),i.push(a),(0,_indexWeapp7.setStorageSync)("success_bean_groupIds",i)))):(0,_indexWeapp5.showToast)({title:e.msg,icon:"none",duration:2e3}),(0,_indexWeapp6.clickReport)({click_id:"ClickFromDivideBeanCard",create_time:new Date}),o(!0)}).catch(function(e){(0,_indexWeapp5.showToast)({title:e.msg,icon:"none",duration:2e3}),o(!1)})})}},{key:"showCountDown",value:function(e){var t=this;this.countDown(e,function(e){e.end&&(clearInterval(t.state.timer),t.getBeansShareInfo({})),0<e.day?t.setState({day:e.day,HH:e.hour,MM:e.minute,SS:e.second,MS:e.millisecond}):t.setState({HH:e.hour,MM:e.minute,SS:e.second,MS:e.millisecond})})}},{key:"countDown",value:function(i,o){this.state.timer&&(clearInterval(this.state.timer),this.setState({timer:null}));var r=setInterval(function(){var e=0,t=0,n=0,a=0;0<i&&(e=Math.floor(i/1e3/60/60),t=Math.floor(i/1e3/60%60),n=Math.floor(i/1e3%60),a=Math.floor(i%1e3/100)),e<=9&&(e="0"+e),t<=9&&(t="0"+t),n<=9&&(n="0"+n),o(0<i?{day:0,hour:e,minute:t,second:n,timer:r,end:!1,millisecond:a}:{hour:"00",minute:"00",second:"00",millisecond:"00",timer:r,end:!0}),i-=100},100);this.setState({timer:r})}},{key:"closeSharePop",value:function(){var t=this;(0,_indexWeapp2.isLogin)().then(function(e){t.closeAnimation()}).catch(function(e){(0,_indexWeapp2.goToLogin)()})}},{key:"closeAnimation",value:function(){this.props.closeBeanShareLayer()}},{key:"setStateForClose",value:function(){var e=this;this.setState({transition:{opacity:"1",transform:"translateY("+(0<arguments.length&&void 0!==arguments[0]?arguments[0]:-202)+"px) scale(0)"}},function(){setTimeout(function(){e.setState({showBeansShow:!1,animateClose:"",transition:{opacity:"1",transform:"translateY(0px) scale("+(e.state.isLargeScreen?.8:1)+")"}}),e.props&&e.props.beanShareIconAnimate&&e.props.beanShareIconAnimate()},600)})}},{key:"btnEvent",value:function(t){var n=this,a=t.buttonId;(0,_indexWeapp6.clickReport)({create_time:new Date,click_id:"ClickDivideBeanBotton",click_par:{buttonId:a}}),(0,_indexWeapp2.isLogin)().then(function(e){1!=a&&(2==a||6==a?n.openBeansShareFun().catch(function(e){n.getBeansShareInfo({groupId:""})}):3==a?n.attendBeansShare(t):4==a?n.setState({showBeansShow:!1}):5==a&&n.getBeansShareInfo({groupId:""}))}).catch(function(e){(0,_indexWeapp2.goToLogin)()})}},{key:"handleShareTellApi",value:function(){(0,_signIn.markSharingCarveUpBeanFn)({}).then(function(e){}).catch(function(e){})}},{key:"onInviteFriend",value:function(){var e=this,t=(this.state.result,(0,_indexWeapp2.isLogin)().then(function(){e.handleShareTellApi()}).catch(function(e){(0,_indexWeapp2.goToLogin)()}),this.sleep(1500),(0,_indexWeapp7.getStorageSync)("beanShare_flag")),n=new Date,n=n.getFullYear()+"-"+(n.getMonth()+1)+"-"+n.getDate();n!=t&&((0,_indexWeapp7.setStorageSync)("beanShare_flag",n),this.childSubscribe.initSubscribeMessage(["foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU"],[3])),(0,_indexWeapp6.clickReport)({create_time:new Date,click_id:"ClickDivideBeanBotton",click_par:{buttonId:1}})}},{key:"sleep",value:function(e){for(var t=new Date,n=t.getTime()+e;;)if((t=new Date).getTime()>n)return}},{key:"_throttle",value:function(e){var t=this;this.shareFlag&&(this.shareFlag=!1,e.apply(this,arguments),setTimeout(function(){t.shareFlag=!0},1e3))}},{key:"openShare",value:function(t){var n=this,e=this.state.disabled;void 0!==e&&e||(this.setState({disabled:!0}),this._throttle(function(){(0,_indexWeapp5.showLoading)(),n.getCircleSharePic(t).then(function(e){(0,_indexWeapp5.hideLoading)(),e.result?n.handleOpenShare(t,e.result):n.handleOpenShare(t)}).catch(function(){(0,_indexWeapp5.hideLoading)(),n.handleOpenShare(t)})}))}},{key:"getCircleSharePic",value:function(e){}},{key:"handleOpenShare",value:function(e,t){var n=this,t=t||"https://img10.360buyimg.com/mobilecms/jfs/t1/48798/36/8506/78945/5d5f5808E4c17f412/219404b469b14dd3.jpg",a=""+window.location.origin+window.location.pathname+"#/pages/sharePreview-t/index?image="+t+"&title=瓜分鲜豆",i=this.taroShareCode(),a={title:e.shareText||e.name||"瓜分鲜豆",desc:"京东到家瓜分鲜豆活动",shareUrl:a,imgUrl:e.shareUrl||"https://img30.360buyimg.com/mobilecms/jfs/t1/65465/34/7772/289742/5d5ba9a2Ededf3e31/d9c6737e7ed4df17.png",appId:"gh_5103b94a8a56",mpImgUrl:e.shareUrl||"https://img30.360buyimg.com/mobilecms/jfs/t1/65465/34/7772/289742/5d5ba9a2Ededf3e31/d9c6737e7ed4df17.png",path:"/pages/tabBar/signIn-t/index?activityId="+e.activityId+"&groupId="+e.groupId+"&channel="+i.cardChannel,pyqImg:t||"",callback:"",clickcallback:"",timeline_title:"",channel:"Wxfriends,QRCode",qrparam:{top_pic:e.shareText||e.name||"好友助力",mid_pic:e.shareUrl||e.imageUrl||"",slogan:"京东二维码分享",qr_title:"好友助力",qr_content:"好友助力",qr_direct:t}};a.pyqImg&&((0,_indexWeapp3.openShare)(a),setTimeout(function(){n.setState({disabled:!1})},500))}},{key:"taroShareCode",value:function(){var e="00",t="00",n={},t=_indexWeapp4.isJDApp?_indexWeapp4.isJDReactNativeWebView?(e="01","02"):(e="03","04"):_indexWeapp4.isDaojiaApp?_indexWeapp4.isIOS?(e="05","06"):(e="07","08"):_indexWeapp4.isWeixin?(e="09","10"):(e="11","12");return n.circleChannel=e,n.cardChannel=t,n}},{key:"openRule",value:function(){this.setState({showBeansShow:!1,showRule:!0}),(0,_indexWeapp6.clickReport)({create_time:new Date,click_id:"ClickDivideBeanRule"})}},{key:"closeRule",value:function(){this.setState({showBeansShow:!0,showRule:!1})}},{key:"initHandle",value:function(){var e=this.props.urlGroupId,t=this.state.showBeansShow;e&&!t&&(this.getBeansShareInfo({groupId:e}),(0,_indexWeapp6.clickReport)({create_time:new Date,click_id:"ClickDivideBean",click_par:{from:"Car"}}))}},{key:"componentWillMount",value:function(){var e=(0,_largeScreen.largeScreen)();e&&this.setState({isLargeScreen:e,transition:{opacity:"1",transform:"translateY(0px) scale(0.8)"}})}},{key:"componentWillUnmount",value:function(){clearInterval(this.state.timer)}},{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){e.initHandle()},1e3)}},{key:"componentWillReceiveProps",value:function(e){var t=e.urlGroupId,t=void 0===t?"":t,e=e.userLogin,n=this.state,a=n.showBeansShow,n=n.self;void 0!==e&&e&&t&&a&&2==(void 0===n?0:n)&&this.getBeansShareInfo({groupId:t})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=(0,_index.genCompid)(e+"$compid__224"),e=(0,_index.genCompid)(e+"$compid__225"),n=this.__state,a=n.showBeansShow,a=void 0!==a&&a,i=n.result,o=void 0===i?[]:i,i=(n.countDownStr,n.showRule),i=void 0!==i&&i,r=n.wonUsers,r=void 0===r?[]:r,n=(n.userLogin,n.showSuccess,n.day,n.HH,n.MM,n.SS,n.MS,n.animateClose,n.transition),s=this.__state.result,c=s.joinUsers,p=void 0===c?[]:c,c=s.rule,c=void 0===c?"":c,u=s.groupStatus,u=void 0===u?1:u,s=s.carveUpCount,s=void 0===s?0:s,l=s/1e3,n=a?(0,_index.internal_inline_style)(n):null,d=1==o.buttonId?_extends({},o,{path:"/pages/tabBar/signIn-t/index?activityId="+(o.activityId||"")+"&groupId="+(o.groupId||"")}):null,h=a?p.map(function(e,t){return e={$original:(0,_index.internal_get_original)(e)},{$loopState__temp3:p&&0<p.length?t+"joinUsers":null,$loopState__temp5:_extends({},o,{path:"/pages/tabBar/signIn-t/index?activityId="+(o.activityId||"")+"&groupId="+(o.groupId||"")}),$original:e.$original}}):[];return a&&0<r.length&&_index.propsManager.set({data:r,isText:!0},t),_index.propsManager.set({subscribeMessageImageUrl:"https://storage.360buyimg.com/wximg/common/subscribeImageSign.png"},e),Object.assign(this.__state,{anonymousState__temp:n,anonymousState__temp6:d,loopArray36:h,$compid__224:t,$compid__225:e,style:_indexModuleScssMap2.default,carveUpCount:s,joinUsers:p,groupStatus:u,wonUsers:r,showRule:i,rule:c,carveUpCountMoney:l}),this.__state}}]),o}(),_class.$$events=["openRule","onInviteFriend","btnEvent","closeSharePop","closeRule"],_class.$$componentPath="pages/tabBar/signIn-t/components/beanShare/index";var BeanShare=_temp2;exports.default=BeanShare,Component(require("../../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(BeanShare));
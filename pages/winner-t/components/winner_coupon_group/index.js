require('../../chunks/common.js'),require('../../chunks/taro.js'),require('../../chunks/vendors.js'),require('../../chunks/runtime.js'),(wx.webpackJsonp=wx.webpackJsonp||[]).push([[8],{"22":function(e,t,n){e.exports=n.p+"common/components/winner_coupon_group/index.wxml"},"41":function(e,t,n){e.exports={"winnerCouponGroup":"index-module__winnerCouponGroup___3KKXv","title":"index-module__title___2S6jl","img":"index-module__img___20Y8s","list":"index-module__list___JzQT-","item":"index-module__item___35LOb","last":"index-module__last___2YpQ4","couponTag":"index-module__couponTag___1wtgk","left":"index-module__left___3l6z7","price":"index-module__price___3iI32","small":"index-module__small___esZlP","limit":"index-module__limit___8RVcg","after":"index-module__after___Qrsoy","right":"index-module__right___V2DFo","span":"index-module__span___38FEo","errMsg":"index-module__errMsg___2TJn0","btnBox":"index-module__btnBox___3eSZW","loadingLayout":"index-module__loadingLayout___2txMv","layoutImg":"index-module__layoutImg___1FWTn"}},"72":function(e,t,n){"use strict";n(22)},"97":function(n,e,t){"use strict";t.r(e);t(72);var e=t(1),f=t.n(e),m=t(3),g=t(0),b=t.n(g),h=t(4),y=t(2),e=t(41),w=t.n(e),x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,o=arguments[t];for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},v=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function sliceIterator(e,t){var n=[],o=!0,r=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(o=(i=u.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(e){r=!0,a=e}finally{try{!o&&u.return&&u.return()}finally{if(r)throw a}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},e=function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e};function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function B(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0!==o){if("value"in o)return o.value;o=o.get;return void 0!==o?o.call(n):void 0}if(null!==(o=Object.getPrototypeOf(e)))return B(o,t,n)}var o;function _asyncToGenerator(e){return function(){var i=e.apply(this,arguments);return new Promise(function(r,a){return function step(e,t){try{var n=i[e](t),o=n.value}catch(e){return void a(e)}if(!n.done)return Promise.resolve(o).then(function(e){step("next",e)},function(e){step("throw",e)});r(o)}("next")})}}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)})(WinnerCouponGroup,b.a.Component),e(WinnerCouponGroup,[{"key":"_constructor","value":function _constructor(e){B(WinnerCouponGroup.prototype.__proto__||Object.getPrototypeOf(WinnerCouponGroup.prototype),"_constructor",this).call(this,e),this.$$refs=new b.a.RefsArray}},{"key":"_createData","value":function _createData(){function Wa(){return Object(m.b)("isOnline")?"https://image3.imdada.cn/fe7d9082fd3b489e80b6121564fff8f7.png":"https://image3.imdada.cn/67c0dfc385f84151a2e2449d7f7a0000.png"}function Xa(e){return 1===e?"https://image3.imdada.cn/d86a04523fd647bb9b3d8dc342e3ee63.png":2===e?"https://image3.imdada.cn/10b2f5670a044db987d32ecc6c7a577a.png":""}function Ya(){return o&&0<o.length?"https://image3.imdada.cn/02735ce553414218a607177cede4ce89.png":"https://image3.imdada.cn/9e3341a8f18b4525a9e6e436b75d0943.png"}function Za(){return Object(m.a)("isOnline")?"https://image3.imdada.cn/4636e4da7bb049478f04084ad95cb34c.png":"https://image3.imdada.cn/18fdf89d682b49a28ffce543d631a977.png"}var e,c=this,t=(this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix,this.__props),u=t.params,s=t.showTip,n=Object(g.useState)([]),n=v(n,2),o=n[0],r=n[1],n=Object(g.useState)(""),n=v(n,2),p=n[0],l=n[1],a=o.length,i=(Object(g.useEffect)(function(){var e;e=_asyncToGenerator(f.a.mark(function _callee(){var t,n,o,r,a,i;return f.a.wrap(function _callee$(e){for(;;)switch(e.prev=e.next){case 0:if(t=u.inviterId,n=u.taskId,o=u.shopId,r=u.version,a=u.locationId,i=Object(m.b)(),n&&t){e.next=4;break}return e.abrupt("return");case 4:if(i)return e.t0=h.h,e.t1=t,e.t2=a||o,e.t3=n,e.next=11,Object(m.c)();e.next=15;break;case 11:return e.t4=e.sent,e.t5=r||1,e.t6={"inviterId":e.t1,"shopId":e.t2,"taskId":e.t3,"phone":e.t4,"version":e.t5},e.abrupt("return",(0,e.t0)(e.t6));case 15:return e.abrupt("return",Object(h.k)({"inviterId":t,"taskId":n,"shopId":a||o,"userType":1}));case 16:case"end":return e.stop()}},_callee,this)})),function toGetCoupons(){return e.apply(this,arguments)}().then(function(e){if(e&&e.status&&"ok"===e.status)return Object(y.a)({"create_time":new Date,"click_id":"winnerCouponGetCouponsSucceed","click_par":x({},u,{"coupons":e.content.coupons})}),r(e.content.coupons),i(),s(e.content.resultTip,e.content.highFrequencyUseRedPackageHint),void setTimeout(function(){t.handleLoading()},3e3);l(e.errorMsg),setTimeout(function(){t.handleLoading()},1e3),r([]),Object(y.a)({"create_time":new Date,"click_id":"getCouponResult","click_par":{"activityId":u.taskId,"code":e.errorCode,"msg":e.errorMsg}})})},[u]),e=_asyncToGenerator(f.a.mark(function _callee2(){var t,n,o;return f.a.wrap(function _callee2$(e){for(;;)switch(e.prev=e.next){case 0:if(Object(m.b)("isOnline")){e.next=5;break}return Object(y.a)({"create_time":new Date,"click_id":"winnerCouponToLogin","click_par":u}),b.a.navigateTo({"url":"/pages/newLogin/login/login?type=46&business=153"}),e.abrupt("return");case 5:t=u.shopId,n=u.orgCode,o=u.skuId,Object(y.a)({"create_time":new Date,"click_id":"winnerCouponToOrder","click_par":u}),b.a.navigateTo({"url":"/pages/store/index?orgCode="+n+"&skuId="+(o||"")+"&isAddCart="+!!o+"&storeId="+t+"&spreadChannel=winnerCouponSku"});case 8:case"end":return e.stop()}},_callee2,c)})),function handleToOrder(){return e.apply(this,arguments)}),n=0<a?Wa():null,_=Ya(),d=(this.anonymousFunc0=i,0<a?o.map(function(e,t){return e={"$original":Object(g.internal_get_original)(e)},{"$loopState__temp3":0<a?Object(g.internal_inline_style)({"backgroundImage":"url("+Za()+")"}):null,"$loopState__temp5":Xa(e.$original.couponMode)?Xa(e.$original.couponMode):null,"$loopState__temp8":Xa(e.$original.couponMode),"$original":e.$original}}):[]);return Object.assign(this.__state,{"anonymousState__temp":n,"anonymousState__temp6":_,"loopArray13":d,"styles":w.a,"len":a,"coupons":o,"couponErrMsg":p}),this.__state}},{"key":"anonymousFunc0","value":function anonymousFunc0(e){}}]),o=e=WinnerCouponGroup,e.$$events=["anonymousFunc0"],e.$$componentPath="common/components/winner_coupon_group/index";e=o;function WinnerCouponGroup(){var e,t;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,WinnerCouponGroup);for(var n=arguments.length,o=Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t=_possibleConstructorReturn(this,(t=WinnerCouponGroup.__proto__||Object.getPrototypeOf(WinnerCouponGroup)).call.apply(t,[this].concat(o)))).$usedState=["anonymousState__temp","anonymousState__temp6","loopArray13","styles","len","coupons","couponErrMsg"],t.customComponents=[],_possibleConstructorReturn(t,e)}Component(t(0).default.createComponent(e))}},[[97,0,1,2,3]]]);
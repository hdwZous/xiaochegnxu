(wx.webpackJsonp=wx.webpackJsonp||[]).push([[20],{"105":function(n,e,t){"use strict";t.r(e);t(80);var e=t(1),g=t.n(e),O=t(0),o=t.n(O),k=t(4),x=t(2),e=t(48),P=t.n(e),C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function sliceIterator(e,t){var n=[],o=!0,r=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(o=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{!o&&c.return&&c.return()}finally{if(r)throw i}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},e=function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e};function defineProperties(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function p(e,t,n){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,t);if(void 0!==o){if("value"in o)return o.value;o=o.get;return void 0!==o?o.call(n):void 0}if(null!==(o=Object.getPrototypeOf(e)))return p(o,t,n)}var r;function _asyncToGenerator(e){return function(){var a=e.apply(this,arguments);return new Promise(function(r,i){return function step(e,t){try{var n=a[e](t),o=n.value}catch(e){return void i(e)}if(!n.done)return Promise.resolve(o).then(function(e){step("next",e)},function(e){step("throw",e)});r(o)}("next")})}}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var S={},$=void 0,I=void 0,e=(function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Main,o.a.Component),e(Main,[{"key":"_constructor","value":function _constructor(e){p(Main.prototype.__proto__||Object.getPrototypeOf(Main.prototype),"_constructor",this).call(this,e),this.$$refs=new o.a.RefsArray}},{"key":"_createData","value":function _createData(){function $a(e){return d(e)}var u,e=this,p=(this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix),t=Object(O.genCompid)(p+"$compid__38"),t=j(t,2),l=t[0],t=t[1],n=this.__props,r=n.params,_=n.picInfo,f=n.scrollInto,o=n.categories,i=n.current,a=n.setCurrent,d=void 0===a?function(){}:a,a=n.productList,c=void 0===a?[]:a,m=n.showDownLoad,a=n.getCommissionSkuList,y=void 0===a?function(){}:a,n=Object(O.useState)([]),a=j(n,2),s=a[0],b=a[1],h=(Object(O.useEffect)(function(){0<o.length&&y()},[i]),Object(O.useEffect)(function(){},[f]),Object(O.useEffect)(function(){b(c.slice(0,12))},[c]),Object(O.useEffect)(function(){"object"===(void 0===$?"undefined":C($))&&$.disconnect(),($=e.$scope.createIntersectionObserver({"thresholds":[1],"observeAll":!0})).relativeToViewport().observe(".observer",function(e){S[e.id]={"ratio":e.intersectionRatio,"stamp":e.time,"detail":e.dataset.product},I&&clearTimeout(I),I=setTimeout(function(){Object.keys(S).forEach(function(e){.8<=S[e].ratio&&Object(x.a)({"create_time":new Date,"click_id":"winnerShareProductObserveProduct","click_par":{"sku":S[e].detail,"timeStamp":S[e].stamp,"params":r}})}),S={}},1e3)})},[s]),u=_asyncToGenerator(g.a.mark(function _callee(){var t;return g.a.wrap(function _callee$(e){for(;;)switch(e.prev=e.next){case 0:t=s.length,c.length<=t||b(s.concat(c.slice(t,t+12)));case 3:case"end":return e.stop()}},_callee,e)})),function mainScrollToLower(){return u.apply(this,arguments)}),n=(_asyncToGenerator(g.a.mark(function _callee2(){return g.a.wrap(function _callee2$(e){for(;;)switch(e.prev=e.next){case 0:1<=i&&d(i-1);case 1:case"end":return e.stop()}},_callee2,e)})),Object(O.useState)([])),a=j(n,2),n=a[0],v=a[1],a=(Object(O.useEffect)(function(){var t;t=_asyncToGenerator(g.a.mark(function _callee3(t){var n;return g.a.wrap(function _callee3$(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(k.c)({"storeId":t.storeId});case 2:(n=e.sent)&&n.status&&"ok"===n.status?(Object(x.a)({"create_time":new Date,"click_id":"winnerShareProductShowBanner","click_par":{"params":t,"res":n}}),v(n.content.bannerUrlList)):Object(x.a)({"create_time":new Date,"click_id":"winnerShareProductShowBannerError","click_par":{"params":t,"res":n}});case 4:case"end":return e.stop()}},_callee3,e)})),function getBanner(e){t.apply(this,arguments)}(r)},[]),this.anonymousFunc0=function(){return h()},0<n.length&&o[i]&&-1===Number(o[i].categoryId)),w=s.map(function(e,t){e={"$original":Object(O.internal_get_original)(e)};var n=Object(O.genCompid)(p+"gzzzzzzzzz"+t,!0),n=j(n,2),o=n[0],n=n[1];return O.propsManager.set({"product":e.$original,"index":t,"picInfo":_,"params":r,"showDownLoad":m},n,o),{"$compid__37":n,"$original":e.$original}});return O.propsManager.set({"current":i,"setCurrent":$a,"params":r,"categories":o},t,l),Object.assign(this.__state,{"anonymousState__temp":$a,"anonymousState__temp2":a,"loopArray11":w,"$compid__38":t,"styles":P.a,"scrollInto":f,"bannerList":n,"showList":s}),this.__state}},{"key":"anonymousFunc0","value":function anonymousFunc0(e){}}]),r=e=Main,e.$$events=["anonymousFunc0"],e.$$componentPath="pages/winner-t/winner_share_product/components/Main/index",r);function Main(){var e,t;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Main);for(var n=arguments.length,o=Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t=_possibleConstructorReturn(this,(t=Main.__proto__||Object.getPrototypeOf(Main)).call.apply(t,[this].concat(o)))).$usedState=["anonymousState__temp","anonymousState__temp2","loopArray11","$compid__38","styles","scrollInto","bannerList","showList"],t.customComponents=["SliderBox","Product"],_possibleConstructorReturn(t,e)}Component(t(0).default.createComponent(e))},"30":function(e,t,n){e.exports=n.p+"pages/winner-t/winner_share_product/components/Main/index.wxml"},"48":function(e,t,n){e.exports={"content":"index-module__content___2yk_z","content_left":"index-module__content_left___2HDDK","content_right":"index-module__content_right___roAzS","content_right_collapse":"index-module__content_right_collapse___Y0oS7","productBox":"index-module__productBox___2qH2b","bottom":"index-module__bottom___296Gp","subHeader":"index-module__subHeader___1mWL7","spr":"index-module__spr___24CFx","sprItem":"index-module__sprItem___3wuay","pic":"index-module__pic___Rcyt0"}},"80":function(e,t,n){"use strict";n(30)}},[[105,0,1,2,3]]]);
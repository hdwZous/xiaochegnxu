"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function r(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,o){return t&&r(e.prototype,t),o&&r(e,o),e}}(),_get=function e(t,o,r){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,o);return void 0!==n?"value"in n?n.value:void 0!==(n=n.get)?n.call(r):void 0:null!==(n=Object.getPrototypeOf(t))?e(n,o,r):void 0},_index=require("../../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp2=require("../../../../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_indexWeapp3=require("../../../../../npm/@jd/djmp/common-t/js/location/index.weapp.js"),_indexWeapp4=require("../../../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_indexWeapp5=require("../../../../../npm/@jd/djmp/common-t/js/http/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var REPORT={gotoStoreForPro:function(e){var t=e.skuId,e=e.storeId;(0,_indexWeapp.clickReport)({click_id:"clickSku",click_par:{skuId:t,storeId:e}})},gotoStoreBottom:function(){(0,_indexWeapp.clickReport)({click_id:"clickButton",click_par:{type:"goShop"}})}},storeList=(_temp2=_class=function(){function i(){var e,t;_classCallCheck(this,i);for(var o=arguments.length,r=Array(o),n=0;n<o;n++)r[n]=arguments[n];return(e=t=_possibleConstructorReturn(this,(t=i.__proto__||Object.getPrototypeOf(i)).call.apply(t,[this].concat(r)))).$usedState=["loopArray49","style","isTop","v33ShowBarCel","storeList","page","hasNextPage","barText","v33IsMoreTask","setSecTopPos","callInitObserver","getCurrentScrollPos","setBarCel","v33BuyOneTaskInfo"],t.recommendStoreListNew=function(){return(0,_indexWeapp5.request)({functionId:"signin/nearstore",body:JSON.stringify(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}),method:"GET",appVersion:"8.26.0",signkey:1,isNeedDealError:!0})},t.customComponents=[],_possibleConstructorReturn(t,e)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.state={page:1,hasNextPage:!0,storeList:[],barText:"",v33ShowBarCel:!1,v33IsMoreTask:!1},this.isLoading=!1,this.$$refs=[]}},{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){e.initData()},100)}},{key:"storeListBottomRefresh",value:function(){this.getStoreListNew()}},{key:"initData",value:function(){var t=this;(0,_indexWeapp3.getLocation)().then(function(e){t.setState({address:e},function(){t.getStoreListNew()})}).catch(function(){(0,_indexWeapp4.showToast)({title:"获取地理位置有误"})})}},{key:"setSecTopPos",value:function(){var t=this,e=_index2.default.createSelectorQuery();(e=_index2.default.createSelectorQuery().in(this.$scope)).selectViewport().scrollOffset(),e.select("#bar_cel").boundingClientRect(function(e){e&&e.top?(e=e.top,t.props.setSecTopPos&&t.props.setSecTopPos(e-25)):t.props.setSecTopPos&&t.props.setSecTopPos(0)}).exec()}},{key:"getStoreListWrapTop",value:function(t){var e=_index2.default.createSelectorQuery();(e=_index2.default.createSelectorQuery().in(this.$scope)).selectViewport().scrollOffset(),e.select("#storeListWrap").boundingClientRect(function(e){e&&e.top&&t&&t(e.top)}).exec()}},{key:"getStoreListNew",value:function(){var r=this,e=this.state,t=e.address,t=void 0===t?{}:t,n=e.page,i=e.storeList;e.hasNextPage&&!this.isLoading&&(this.isLoading=!0,e=t.cityId||t.areaCode||t.cityCode||"",this.recommendStoreListNew({longitude:t.longitude,latitude:t.latitude,city_id:e,pageNo:n,pageSize:10}).then(function(e){var t,o=e.code,e=e.result;0==o?(o=e.storeSkuList,e.pageNo,t=(t=0)<(e=e.total)%10?parseInt(e/10,10)+1:parseInt(e/10,10),0<o.length&&r.setState({page:n+1,hasNextPage:!(t<n+1||10<n+1),storeList:i.concat(o)},function(){r.isLoading=!1,1!=n&&r.props.callInitObserver&&r.props.callInitObserver()})):r.isLoading=!1}).catch(function(e){r.isLoading=!1}))}},{key:"handleStoreListScroll",value:function(){var n=this,i=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",a=arguments[1],e=(this.setState({v33ShowBarCel:!1,v33IsMoreTask:!0,barText:""}),_index2.default.createSelectorQuery());(e=_index2.default.createSelectorQuery().in(this.$scope)).selectViewport().scrollOffset(),e.select("#storeListWrap").boundingClientRect(function(e){var t;e&&(e=e.top,t=a&&506===a.taskType&&2!==a.status&&3!==a.status?25:0,_index2.default.pageScrollTo({scrollTop:e+n.props.getCurrentScrollPos()-t,duration:300,success:function(){var r=setTimeout(function(){var e,t,o;a&&506===a.taskType&&2!==a.status&&3!==a.status?(e="",o=!1,"task"===i||"more-task"===i?(e="本页面下1单，立得"+a.awardValue+"鲜豆",o=!0):"coupon"===i?(o=!(t=void 0),a.showName?t=a.showName.split("元")[0]:a.quota&&(t=""+a.quota),e="本页面下1单，立减"+t+"元，再得"+a.awardValue+"鲜豆"):"coupon-my-change"===i&&(o=!0,e="本页面下1单，立减"+a.amount+"元，再得"+a.awardValue+"鲜豆"),n.setState({v33ShowBarCel:!0,v33IsMoreTask:!1,v33IsCoupon:o,barText:e}),n.props.setBarCel&&n.props.setBarCel(),t="",t=a.taskId||n.props.v33BuyOneTaskInfo&&n.props.v33BuyOneTaskInfo.taskId,o=a.couponId?{questid:t,couponid:a.couponId}:{questid:t},(0,_indexWeapp.clickReport)({click_id:"showBar",click_par:o})):n.setState({v33ShowBarCel:!1,v33IsMoreTask:!0,barText:""}),clearTimeout(r)},100)}}))}).exec()}},{key:"checkIsEmptyList",value:function(){var e=this.state.storeList;return 0<(void 0===e?[]:e).length}},{key:"v33IsShowBarCel",value:function(){var e;this.state.v33IsMoreTask?this.setState({v33IsMoreTask:!1}):(506===(e=this.props.v33BuyOneTaskInfo).taskType&&2!==e.status&&3!==e.status?this.setState({v33ShowBarCel:!0,barText:"本页面下1单，立得"+e.awardValue+"鲜豆"}):this.setState({v33ShowBarCel:!1,barText:""}),this.state.v33ShowBarCel&&(0,_indexWeapp.clickReport)({click_id:"showBar",click_par:{questid:e.taskId}}))}},{key:"jumpToStore",value:function(e,t){(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickBottomList",click_par:{pos:t,targetid:e.storeId}}),(0,_indexWeapp2.jump)({to:"store",params:{storeId:e.storeId,orgCode:"",addCart:!0,needAddCar:!0,needAddCart:1,isAddCart:!0,skuId:e.skuId||"",needAnchorSku:!0}})}},{key:"jumpToStoreBottom",value:function(e){REPORT.gotoStoreBottom(),(0,_indexWeapp2.jump)({to:"store",params:{storeId:e.storeId,orgCode:"",addCart:!0,needAddCar:!0,needAddCart:1,isAddCart:!0,skuId:e.skuId||"",needAnchorSku:!0}})}},{key:"jumpToStoreForProd",value:function(e,t){REPORT.gotoStoreForPro({skuId:e.skuId,storeId:t}),(0,_indexWeapp2.jump)({to:"store",params:{storeId:t,orgCode:"",addCart:!1,needAddCar:!1,needAddCart:0,isAddCart:!1,skuId:e.skuId||"",needAnchorSku:!0}})}},{key:"_createNewViewItemData",value:function(e){return function(e,t){var o=e.logo,r=e.userAction,n=e.storeName,i=e.skuList,p=void 0===i?[]:i,i=e.freightDesc,a=e.predictedTime,s=e.distance,l=e.carrierTag,l=void 0===l?{}:l,c=e.storeId,u=e.carrierTag?(0,_index.internal_inline_style)(l.strokeColorCode?"border-color:"+l.strokeColorCode+";":""):null,d=e.carrierTag?(0,_index.internal_inline_style)(l.iconTextColorCode?"color:"+l.iconTextColorCode+";":""):null,_=p.length?p.slice(0,6):[],g=e.couponList&&0<e.couponList.length?e.couponList.map(function(e,t){return e={$original:(0,_index.internal_get_original)(e)},{$loopState__temp2:t<3?"coupons"+t:null,$loopState__temp4:t<3?(0,_index.internal_inline_style)(e.$original.couponText.backgroundColor?"background-color:"+e.$original.couponText.backgroundColor+";":""):null,$loopState__temp6:t<3?(0,_index.internal_inline_style)(e.$original.couponText.outLineColor?"border-color:"+e.$original.couponText.outLineColor+";":""):null,$loopState__temp8:t<3?(0,_index.internal_inline_style)(e.$original.couponText.frontColor?"color:"+e.$original.couponText.frontColor+";":""):null,$original:e.$original}}):[];return{anonymousState__temp9:u,anonymousState__temp10:d,data:e,loopArray47:g,loopArray48:p.length?p.slice(0,6).map(function(e,t){var o=(e={$original:(0,_index.internal_get_original)(e)}).$original,r=o.skuName,n=o.imgUrl,i=o.tags,i=void 0===i?[]:i,a=o.majorPrice,a=void 0===a?{}:a,s=o.minorPrice,s=void 0===s?{}:s,o=o.toHandPrice,o=void 0===o?{}:o,l={},c=(i&&i[0]&&(l={backgroundImage:"linear-gradient(135deg, "+i[0].startColorCode+" 0%, "+i[0].endColorCode+" 100%)"}),i&&i[0]&&p.length?(0,_index.internal_inline_style)(l):null);return{skuName:r,imgUrl:n,tags:i,majorPrice:a,minorPrice:s,toHandPrice:o,styleObj:l,$loopState__temp12:c,$original:e.$original}}):[],userAction:r,index:t,style:_indexModuleScssMap2.default,logo:o,predictedTime:a,distance:s,storeId:c,$anonymousCallee__7:_,skuList:p,storeName:n,freightDesc:i,carrierTag:l}}}},{key:"_createData",value:function(){var o=this,r=(this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix),e=this.__state,t=e.storeList,n=void 0===t?[]:t,t=(e.v33ShowBarCel,this.__props.isTop),e=n?n.map(function(e,t){return e={$original:(0,_index.internal_get_original)(e)},{$loopState__temp14:n?o._createNewViewItemData(r+"LUaPFzKmiZ"+t)(e.$original,t):null,$original:e.$original}}):[];return Object.assign(this.__state,{loopArray49:e,style:_indexModuleScssMap2.default,isTop:t}),this.__state}}]),i}(),_class.$$events=["jumpToStore","jumpToStoreForProd","jumpToStoreBottom"],_class.multipleSlots=!0,_class.$$componentPath="pages/tabBar/signIn-t/components/storeList/index",_temp2);exports.default=storeList,Component(require("../../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(storeList));
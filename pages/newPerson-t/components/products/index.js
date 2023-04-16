"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o,n=arguments[e];for(o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},_createClass=function(){function n(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}}(),_get=function t(e,o,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,o);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(n):void 0:null!==(r=Object.getPrototypeOf(e))?t(r,o,n):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../npm/@jd/djmp/common-t/js/epBi/index.weapp.js"),_indexWeapp2=_interopRequireDefault(_indexWeapp),_indexWeapp3=require("../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp4=require("../../../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_index3=require("../../api/index.js");function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(t)return!e||"object"!=typeof e&&"function"!=typeof e?t:e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var productDb=null,Products=(_temp2=_class=function(){function i(){var t,e;_classCallCheck(this,i);for(var o=arguments.length,n=Array(o),r=0;r<o;r++)n[r]=arguments[r];return(t=e=_possibleConstructorReturn(this,(e=i.__proto__||Object.getPrototypeOf(i)).call.apply(e,[this].concat(n)))).$usedState=["loopArray125","loopArray126","loopArray127","loopArray128","$compid__284","hiddenProduct","style","showTopTab","curTab","scrollLeft","cateTabs","productList","originProductList","pageSize","pageNum","showTabAlert","tagInfo","firstSwitchTab","title","subtitle","tabIndex","position","channel"],e.goToPage=function(e,t){(0,_indexWeapp3.clickReport)({create_time:new Date,click_id:"clickSku",click_par:{skuId:e.skuId,storeId:e.storeId,promotionId:e.promotionId,promotionPrice:e.promotionPrice,ref_par:{userAction:e.userAction}}});var o=e.productJumpTyp,n=e.buttonJumpType,r=e.storeId,r=void 0===r?"":r,i=e.orgCode,i=void 0===i?"":i,a=e.skuId,s=void 0===a?"":a,a=e.spuId,u=void 0===a?"":a,a="shopImage"===t?void 0===o?1:o:void 0===n?1:n,t={1:"store",2:"Settlement",3:"productDetail"},c={skuId:e.skuId,storeId:e.storeId,orgCode:e.orgCode,spuId:e.spuId||"",userAction:encodeURIComponent(e.userAction)};1==a?(0,_indexWeapp4.jump)({to:t[a],params:_extends({},c,{needAnchorSku:!0,addCart:!0,needAddCar:!0,needAddCart:1,isAddCart:!0})}):2==a?(0,_index3.validSettle)({skuList:[{id:s,spuId:u,num:1}],storeId:r,orgCode:i,fromSource:5,verifyResource:1,pageSource:"newPerson"}).then(function(t){var e=[{skuCount:1,skuId:Number(s),spuId:Number(u)}];(0,_indexWeapp4.jump)({to:"Settlement",params:_extends({},c,{saleType:5,settleType:"0",preSaleSkuInfos:JSON.stringify(e),skuCount:1})})}).catch(function(t){(0,_indexWeapp4.jump)({to:"productDetail",params:_extends({},e,{settleShowType:1})})}):3==a&&(0,_indexWeapp4.jump)({to:t[a],params:_extends({},e,{settleShowType:1})})},e.anonymousFunc0Map={},e.anonymousFunc1Map={},e.customComponents=["ModuleTitle"],_possibleConstructorReturn(e,t)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(t){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,t),this.Exposure=null,this.userAction={},this.state={productList:[],cateTabs:[],tagInfo:null,hiddenProduct:!0,scrollLeft:0,firstSwitchTab:!0,title:"",subtitle:"",tabIndex:0,pageNum:1,pageSize:12},this.$$refs=[]}},{key:"componentDidMount",value:function(){this.Exposure=new _indexWeapp2.default(".content >>> .exposure",this.$scope),productDb=null,this.fetchData()}},{key:"componentWillUnmount",value:function(){this._observer&&this._observer.disconnect()}},{key:"fetchData",value:function(){var e=this,t=this.props,o=t.position,t=t.channel,n=this.state.pageSize,r=o.cityId,i=o.latitude,o=o.longitude;(0,_index3.newProducts)({city_id:r,lng_pos:o,lat_pos:i,channel:void 0===t?"":t}).then(function(t){0==t.code&&((productDb=t.result||null)&&productDb.productCategoryList?e.setState({hiddenProduct:!1,tagInfo:productDb.tagInfo,cateTabs:productDb.productCategoryList.map(function(t){return{categoryCode:t.categoryCode,categoryName:t.categoryName}}),productList:productDb.productCategoryList[0].productList.slice(0,n),curTab:productDb.productCategoryList[0].categoryCode,title:productDb.title,subtitle:productDb.subtitle},function(){e.watchProductList("#product_list_id"),e._toExposure()}):e.setState({hiddenProduct:!0}))}).catch(function(t){})}},{key:"_toExposure",value:function(){var t=this;this.state.productList.length&&setTimeout(function(){t.Exposure&&t.Exposure.initObserver&&t.Exposure.initObserver()},2e3)}},{key:"switchTab",value:function(e){var t=this.state.pageSize,o=productDb.productCategoryList.findIndex(function(t){return t.categoryCode==e}),t=productDb.productCategoryList[o].productList.slice(0,t)||[],n=productDb.productCategoryList[o].categoryCode||[],r={categoryCode:n,categoryName:productDb.productCategoryList[o].categoryName||[],isLayer:this.state.showTabAlert?1:0};this.state.firstSwitchTab&&(r.state=productDb.productCategoryList[0].categoryCode),(0,_indexWeapp3.clickReport)({create_time:new Date,click_id:"selectTab",click_par:r}),this.setState({productList:t,curTab:n,tabIndex:o,scrollLeft:70*(o||0)+16,firstSwitchTab:!1,pageNum:1})}},{key:"showAlert",value:function(){this.setState({showTabAlert:!0})}},{key:"hideAlert",value:function(){this.setState({showTabAlert:!1})}},{key:"alertSwitchTab",value:function(t){this.hideAlert(),this.switchTab(t)}},{key:"updateToptabCss",value:function(){}},{key:"resetToptabCss",value:function(){this.setState({showTopTab:!1})}},{key:"watchProductList",value:function(t){var e=this;this._observer&&this._observer.disconnect(),setTimeout(function(){e._observer=wx.createIntersectionObserver(e.$scope,{}),e._observer&&e._observer.relativeToViewport().observe(t,function(t){t.intersectionRatio<=0?e.updateToptabCss():e.resetToptabCss()})},400)}},{key:"_moreHandle",value:function(){var t=this,e=this.state,o=e.pageNum,n=e.pageSize,r=e.tabIndex,e=e.productList,i=productDb&&productDb.productCategoryList[r].productList;e.length>=i.length||o*n>=i.length||this.setState({pageNum:o+1,pageSize:n},function(){t.setState({productList:i.slice(0,12*t.state.pageNum)}),t._toExposure()})}},{key:"_createData",value:function(){var r=this,t=(this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix),t=(0,_index.genCompid)(t+"$compid__284"),e=this.__state,o=e.cateTabs,n=e.productList,i=(e.tagInfo,e.showTabAlert),a=e.curTab,s=e.showTopTab,u=e.hiddenProduct,c=(e.scrollLeft,e.title),p=e.subtitle,d=e.tabIndex,e=(e.pageSize,e.pageNum,productDb&&productDb.productCategoryList[d].productList||[]),d=(this.anonymousFunc2=function(){r._moreHandle()},u?[]:o.map(function(t,e){return{$loopState__temp2:e+"cat",$original:(t={$original:(0,_index.internal_get_original)(t)}).$original}})),l=u?[]:o.map(function(t,e){return{$loopState__temp4:e+"cat",$original:(t={$original:(0,_index.internal_get_original)(t)}).$original}}),n=u?[]:n.map(function(t,e){t={$original:(0,_index.internal_get_original)(t)};var o="JVKkO"+e,n=(r.anonymousFunc0Map[o]=function(){return r.goToPage(t.$original,"shopImage")},"GEZcu"+e);return r.anonymousFunc1Map[n]=function(){return r.goToPage(t.$original,"shopBtn")},{_$indexKey:o,_$indexKey2:n,$loopState__temp6:e+"index",$original:t.$original}}),o=i?o.map(function(t,e){return t={$original:(0,_index.internal_get_original)(t)},{$loopState__temp8:i?"tab"+e:null,$original:t.$original}}):[];return u||_index.propsManager.set({title:c,subTitle:p},t),Object.assign(this.__state,{loopArray125:d,loopArray126:l,loopArray127:n,loopArray128:o,$compid__284:t,style:_indexModuleScssMap2.default,showTopTab:s,curTab:a,originProductList:e,showTabAlert:i}),this.__state}},{key:"anonymousFunc0",value:function(t,e){return this.anonymousFunc0Map[t]&&this.anonymousFunc0Map[t](e)}},{key:"anonymousFunc1",value:function(t,e){return this.anonymousFunc1Map[t]&&this.anonymousFunc1Map[t](e)}},{key:"anonymousFunc2",value:function(t){}}]),i}(),_class.$$events=["switchTab","showAlert","anonymousFunc0","anonymousFunc1","anonymousFunc2","hideAlert","alertSwitchTab"],_class.$$componentPath="pages/newPerson-t/components/products/index",_temp2);exports.default=Products,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Products));
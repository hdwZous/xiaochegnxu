"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,a){return e&&n(t.prototype,e),a&&n(t,a),t}}(),_get=function t(e,a,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,a);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(n):void 0:null!==(r=Object.getPrototypeOf(e))?t(r,a,n):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_hackOrder=require("../../api/hackOrder.js"),_indexWeapp2=require("../../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,a=Array(t.length);e<t.length;e++)a[e]=t[e];return a}return Array.from(t)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(t)return!e||"object"!=typeof e&&"function"!=typeof e?t:e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var timerInterval=void 0,timerout1=void 0,timerout2=void 0,timerout3=void 0,timerout4=void 0,PrizeDraw=(_temp2=_class=function(){function o(){var t,e;_classCallCheck(this,o);for(var a=arguments.length,n=Array(a),r=0;r<a;r++)n[r]=arguments[r];return(t=e=_possibleConstructorReturn(this,(e=o.__proto__||Object.getPrototypeOf(o)).call.apply(e,[this].concat(n)))).$usedState=["showPrizeDraw","anonymousState__temp","showPrizeDrawResult","anonymousState__temp2","transtion1","transtion2","transtion3","n","isClick","showAddPrice","haveCutAmount","cutAmount","haveCutAmountCash","resultPosition","remainDrawsTimes","remainSharedDrawsTimes","winAward","priceFirst","priceSecond","isShowPointer","prizeDrawButtonTop","awardsList1","awardsList2","awardsList3","showCashBackButton","isShareButtonClick","targetAmount","cutStatus","receivingDay","closePrizeDraw","cutOrderId","fetchData"],e.customComponents=[],_possibleConstructorReturn(e,t)}return _inherits(o,_index.Component),_createClass(o,[{key:"_constructor",value:function(t){_get(o.prototype.__proto__||Object.getPrototypeOf(o.prototype),"_constructor",this).call(this,t),this.state={showPrizeDraw:!0,showPrizeDrawResult:!1,transtion1:{},transtion2:{},transtion3:{},n:0,isClick:!1,showAddPrice:!0,haveCutAmount:"",cutAmount:"",haveCutAmountCash:"",resultPosition:"",remainDrawsTimes:"",remainSharedDrawsTimes:"",winAward:{},priceFirst:"",priceSecond:"",isShowPointer:!0,prizeDrawButtonTop:"0px",awardsList1:[],awardsList2:[],awardsList3:[],showCashBackButton:!1,isShareButtonClick:!1},this.$$refs=[]}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var t=this.$prefix,e=this.__state,a=e.showPrizeDraw,e=e.showPrizeDrawResult,a=a?this._createPrizeDrawData(t+"hXCuPGccaV")():null,e=e?this._createPrizeDrawResultData(t+"BetBuvkfwi")():null;return Object.assign(this.__state,{anonymousState__temp:a,anonymousState__temp2:e}),this.__state}},{key:"_createPrizeDrawData",value:function(p){var m=this;return function(){var t=m.state,e=t.awardsList1,e=void 0===e?[]:e,a=t.awardsList2,a=void 0===a?[]:a,n=t.awardsList3,n=void 0===n?[]:n,r=t.transtion1,o=t.transtion2,i=t.transtion3,s=(t.n,t.isClick,t.remainDrawsTimes),u=t.remainSharedDrawsTimes,t=t.isShowPointer,c=0<s?m._createRemainDrawsTimesData(p+"LunzMTFauI")():null,l=0<u?m._createRemainSharedDrawsTimesData(p+"QRpNXFqoXK")():null,d=m._createPrizeDrawButtonDisabledData(p+"niLCPetCCR")();return m.anonymousFunc0=function(t){return m.onClosePop(t)},{anonymousState__temp6:(0,_index.internal_inline_style)(r),anonymousState__temp7:(0,_index.internal_inline_style)(o),anonymousState__temp8:(0,_index.internal_inline_style)(i),style:_indexModuleScssMap2.default,awardsList1:e,awardsList2:a,awardsList3:n,remainDrawsTimes:s,anonymousState__temp3:c,remainSharedDrawsTimes:u,anonymousState__temp4:l,anonymousState__temp5:d,isShowPointer:t}}}},{key:"_createRemainDrawsTimesData",value:function(t){var a=this;return function(){var t=a.state,e=t.isClick,t=t.prizeDrawButtonTop;return a.anonymousFunc1=function(){return a.prizeDraw()},{anonymousState__temp9:(0,_index.internal_inline_style)({position:"absolute",top:t}),style:_indexModuleScssMap2.default,isClick:e}}}},{key:"_createRemainSharedDrawsTimesData",value:function(t){var a=this;return function(){var t=a.state,e=t.isClick,t=t.prizeDrawButtonTop;return a.anonymousFunc2=function(t){return a.onClickShare(t,"friend","prizeDraw","addDrawsTimes")},{anonymousState__temp10:(0,_index.internal_inline_style)({position:"absolute",top:t}),style:_indexModuleScssMap2.default,isClick:e}}}},{key:"_createPrizeDrawButtonDisabledData",value:function(t){var e=this;return function(){e.state.isClick;return{style:_indexModuleScssMap2.default}}}},{key:"_createPrizeDrawResultData",value:function(l){var d=this;return function(){var t=d.state,e=t.showAddPrice,a=t.winAward,n=t.priceFirst,r=t.priceSecond,o=t.haveCutAmount,i=t.cutAmount,s=t.haveCutAmountCash,t=t.showCashBackButton,u=d.props,c=(u.targetAmount,u.cutStatus),u=u.receivingDay,o=3==a.awardCode?d._createNumsItemData(l+"SYWXwPzlPQ")(o||""):null;return d.anonymousFunc3=function(t){d.onClickShare(t,"friend","prizeDrawResult")},d.anonymousFunc4=function(){d.prizeDrawAgain()},d.anonymousFunc5=function(){d.prizeDrawAgain({hasNoPrize:!0})},d.anonymousFunc6=function(){d.prizeDrawAgain()},d.anonymousFunc7=function(){d.doWithdrawal()},d.anonymousFunc8=function(){d.onClosePop({buriedPoint:!0})},d.anonymousFunc9=function(){d.prizeDrawAgain()},d.anonymousFunc10=function(){d.doWithdrawal()},d.anonymousFunc11=function(){d.onClosePop({buriedPoint:!0})},d.anonymousFunc12=function(t){return d.onClickShare(t,"friend","prizeDrawResult")},d.anonymousFunc13=function(){d.prizeDrawAgain()},{style:_indexModuleScssMap2.default,winAward:a,priceSecond:r,cutStatus:c,anonymousState__temp11:o,showAddPrice:e,showCashBackButton:t,priceFirst:n,haveCutAmountCash:s,receivingDay:u,cutAmount:i}}}},{key:"componentDidMount",value:function(){this.initData(),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"showlottery"})}},{key:"onClosePop",value:function(t){var e=this.state.winAward,a=this.props.closePrizeDraw;this.setState({showPrizeDraw:!0,showPrizeDrawResult:!1}),a(),1==t.buriedPoint&&(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clicklotteryend",click_par:{reward:e.awardName}})}},{key:"prizeDraw",value:function(){var o=this,t=this.state.remainDrawsTimes,e=t,a=this.props,n=a.cutOrderId,i=a.fetchData,r=(this.setState({prizeDrawButtonTop:"10px",remainDrawsTimes:0==t?t:t-1}),timerout3=setTimeout(function(){o.setState({prizeDrawButtonTop:"0px"})},150),(0,_hackOrder.getLotteryDraw)({cutOrderId:n}).then(function(t){var e,a,n,r;0==t.code?(i({hideSelfPop:!0}),e=void 0,0==(t=t.result.winAward||{}).awardCode?(e=75.5,-1!=(a=String(t.amount)).indexOf(".")?(n=a.split(".")[0],r=a.split(".")[1],o.setState({priceFirst:n,priceSecond:r})):o.setState({priceFirst:a})):3==t.awardCode?(e=113.4,o.setState({haveCutAmount:t.haveCutAmount?t.haveCutAmount/100:"",cutAmount:t.cutAmount?t.cutAmount/100:"",showAddPrice:!0})):4==t.awardCode?(e=94.5,o.setState({haveCutAmountCash:t.newHaveCutAmount?t.newHaveCutAmount/100:""})):2==t.awardCode&&(e=131.8),o.setState({winAward:t,resultPosition:e})):(0,_indexWeapp2.showToast)({title:"系统异常3，请稍后再试",icon:"none",duration:2e3})}).catch(function(t){(0,_indexWeapp2.showToast)({title:"系统异常4，请稍后再试",icon:"none",duration:2e3})}),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clicklottery",click_par:{lotterynum:e}}),this.setState({isClick:!0,isShowPointer:!1}),(new Date).getTime());timerInterval=setInterval(function(){var t=(new Date).getTime();t-r<3e3?o.roll(1):3e3<=t-r&&t-r<4e3?o.roll(2):4e3<=t-r&&t-r<5e3?o.roll(3):o.clearTimer()},20)}},{key:"onClickShare",value:function(t,e,a,n){var r=this,o=(this.state.remainDrawsTimes,this.props),i=(o.onClickShare,o.cutOrderId);o.closePrizeDraw;this.props.onClickShare(t,e,{forbidTask:!0}),this.setState({showPrizeDraw:!0,showPrizeDrawResult:!1}),"prizeDrawResult"==a?(o=this.state.winAward,(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clicklotteryend",click_par:{reward:o.awardName}})):"prizeDraw"==a&&(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clicklottery",click_par:{lotterynum:0}}),"addDrawsTimes"==n&&(this.setState({prizeDrawButtonTop:"10px"}),timerout3=setTimeout(function(){r.setState({prizeDrawButtonTop:"0px"})},150),(0,_hackOrder.addDrawsTimes)({cutOrderId:i}).then(function(t){0==t.code&&(timerout4=setTimeout(function(){r.initData()},3e3))}).catch(function(t){}),this.setState({isShowPointer:!1})),"addDrawsTimes"!=n&&(this.initData(),this.setState({transtion1:{},transtion2:{},transtion3:{}}))}},{key:"roll",value:function(t){var e=this.state,a=e.n,e=e.resultPosition;0<=a&&a<30?a+=2:30==a&&(a=0),1==t?this.setState({n:a,transtion1:{transform:"translate(0, -"+100*a+"%)"},transtion2:{transform:"translate(0, -"+100*a+"%)"},transtion3:{transform:"translate(0, -"+100*a+"%)"}}):2==t?this.setState({n:a,transtion1:{transform:"translate(0, -"+6*e+"%)"},transtion2:{transform:"translate(0, -"+100*a+"%)"},transtion3:{transform:"translate(0, -"+100*a+"%)"}}):3==t&&this.setState({n:a,transtion1:{transform:"translate(0, -"+6*e+"%)"},transtion2:{transform:"translate(0, -"+6*e+"%)"},transtion3:{transform:"translate(0, -"+100*a+"%)"}})}},{key:"clearTimer",value:function(){var t=this,e=this.state,a=e.haveCutAmount,n=e.cutAmount,r=e.resultPosition,o=e.winAward,e=this.props.targetAmount,i=Number(a)+Number(n);i>=Number(e)&&(i=Number(e),this.setState({showCashBackButton:!0})),clearInterval(timerInterval),this.setState({n:0,transtion1:{transform:"translate(0, -"+6*r+"%)"},transtion2:{transform:"translate(0, -"+6*r+"%)"},transtion3:{transform:"translate(0, -"+6*r+"%)"},isClick:!1}),timerout1=setTimeout(function(){t.setState({showPrizeDraw:!1,showPrizeDrawResult:!0}),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"showlotteryend",click_par:{reward:o.awardName}})},500),timerout2=setTimeout(function(){t.setState({showAddPrice:!1,haveCutAmount:i})},3e3)}},{key:"_createNumsItemData",value:function(t){return function(t){0==t&&(t="0.00");var e=String(t).split(".")[1],e=(e&&2<e.length&&(t=t.toFixed(2)),String(t).split(""));return{loopArray76:e.map(function(t,e){var a=void 0,n={transform:"translate(0, -"+100*(a="."==(t={$original:(0,_index.internal_get_original)(t)}).$original?10:Number(t.$original))+"%)"};return{num:a,transtion:n,$loopState__temp13:(0,_index.internal_inline_style)(n),$loopState__temp15:"Nums0"+e,$loopState__temp17:"Nums1"+e,$loopState__temp19:"Nums2"+e,$loopState__temp21:"Nums3"+e,$loopState__temp23:"Nums4"+e,$loopState__temp25:"Nums5"+e,$loopState__temp27:"Nums6"+e,$loopState__temp29:"Nums7"+e,$loopState__temp31:"Nums8"+e,$loopState__temp33:"Nums9"+e,$loopState__temp35:"Nums."+e,$original:t.$original}}),style:_indexModuleScssMap2.default,a:e}}}},{key:"prizeDrawAgain",value:function(t){this.initData(),this.setState({showPrizeDraw:!0,showPrizeDrawResult:!1,isShowPointer:!0,transtion1:{},transtion2:{},transtion3:{}}),t&&1==t.hasNoPrize&&(t=this.state.winAward,(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clicklotteryend",click_par:{reward:t.awardName}})),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"showlottery"})}},{key:"doWithdrawal",value:function(){var t=this.state.winAward,e=this.props,a=e.cutOrderId,n=e.fetchData,e=e.closePrizeDraw;(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clicklotteryend",click_par:{reward:t.awardName}}),(0,_hackOrder.withdrawRequest)({cpOrderInfoId:a}).then(function(t){0==t.code&&((0,_indexWeapp2.showToast)({title:"恭喜，提现成功"}),n({hideSelfPop:!0}))}).catch(function(t){}),e(),this.setState({showPrizeDrawResult:!1})}},{key:"initData",value:function(){var _=this,t=this.props.cutOrderId;(0,_hackOrder.getLotteryInfo)({cutOrderId:t}).then(function(t){if(0==t.code){var t=t.result||null,e=t.awardsList||[],a=null!=t.remainDrawsTimes||null!=t.remainDrawsTimes?t.remainDrawsTimes:"",t=t.remainSharedDrawsTimes||"",n=[],r=new Map,o=!0,i=!1,s=void 0;try{for(var u,c=e[Symbol.iterator]();!(o=(u=c.next()).done);o=!0){var l=u.value;r.has(l.awardCode)||r.set(l.awardCode,l)}}catch(t){i=!0,s=t}finally{try{!o&&c.return&&c.return()}finally{if(i)throw s}}var n=[].concat(_toConsumableArray(r.values())),d=[],p=(n.map(function(t,e){0==t.awardCode&&(d[0]=t),4==t.awardCode&&(d[1]=t),3==t.awardCode&&(d[2]=t),2==t.awardCode&&(d[3]=t)}),{}),m=(e.map(function(t,e){2!=t.awardCode&&(p=t)}),d[0]&&d[0].awardCode&&0==d[0].awardCode?d[0]=d[0]:d[0]=p,d[1]&&d[1].awardCode&&4==d[1].awardCode?d[1]=d[1]:d[1]=p,d[2]&&d[2].awardCode&&3==d[2].awardCode?d[2]=d[2]:d[2]=p,d[3]&&d[3].awardCode&&2==d[3].awardCode?d[3]=d[3]:d[3]=p,[]),w=[],h=[];0<d.length&&d.map(function(t,e){0==t.awardCode?(t.url="https://storage.360buyimg.com/wximg/hackOrder/prizeCoupon.png",m.push(t),w.push(t),h.push(t)):3==t.awardCode?(t.url="https://storage.360buyimg.com/wximg/hackOrder/prizeRedEnvelope.png",m.push(t),w.unshift(t),h.push(t)):4==t.awardCode?(t.url="https://storage.360buyimg.com/wximg/hackOrder/prizeCashBack.png",m.push(t),w.push(t),h.unshift(t)):2==t.awardCode&&(t.url="https://storage.360buyimg.com/wximg/hackOrder/prizeNo.png",m.push(t),w.push(t),h.push(t))});i=(i=[{awardCode:"0",awardName:"优惠券",url:"https://storage.360buyimg.com/wximg/hackOrder/prizeCoupon.png"},{awardCode:"4",awardName:"直接提现",url:"https://storage.360buyimg.com/wximg/hackOrder/prizeCashBack.png"},{awardCode:"3",awardName:"免费砍一刀",url:"https://storage.360buyimg.com/wximg/hackOrder/prizeRedEnvelope.png"},{awardCode:"2",awardName:"无",url:"https://storage.360buyimg.com/wximg/hackOrder/prizeNo.png"}]).concat(i,i,i,i,i,i,i),m=1<m.length?m.concat(i):[],w=1<w.length?w.concat(i,i):[],h=1<h.length?h.concat(i,i,i):[];_.setState({awardsList1:m,awardsList2:w,awardsList3:h,remainDrawsTimes:a,remainSharedDrawsTimes:t,showPrizeDraw:!0})}else(0,_indexWeapp2.showToast)({title:"系统异常1，请稍后再试",icon:"none",duration:2e3})}).catch(function(t){(0,_indexWeapp2.showToast)({title:"系统异常2，请稍后再试",icon:"none",duration:2e3})})}},{key:"anonymousFunc0",value:function(t){}},{key:"anonymousFunc1",value:function(t){}},{key:"anonymousFunc2",value:function(t){}},{key:"anonymousFunc3",value:function(t){}},{key:"anonymousFunc4",value:function(t){}},{key:"anonymousFunc5",value:function(t){}},{key:"anonymousFunc6",value:function(t){}},{key:"anonymousFunc7",value:function(t){}},{key:"anonymousFunc8",value:function(t){}},{key:"anonymousFunc9",value:function(t){}},{key:"anonymousFunc10",value:function(t){}},{key:"anonymousFunc11",value:function(t){}},{key:"anonymousFunc12",value:function(t){}},{key:"anonymousFunc13",value:function(t){}}]),o}(),_class.$$events=["anonymousFunc0","anonymousFunc1","anonymousFunc2","anonymousFunc3","anonymousFunc4","anonymousFunc5","anonymousFunc6","anonymousFunc7","anonymousFunc8","anonymousFunc9","anonymousFunc10","anonymousFunc11","anonymousFunc12","anonymousFunc13"],_class.multipleSlots=!0,_class.$$componentPath="pages/hackOrder-t/components/prizeDraw/index",_temp2);exports.default=PrizeDraw,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(PrizeDraw));
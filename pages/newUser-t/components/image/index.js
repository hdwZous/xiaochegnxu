"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),_get=function e(t,o,n){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,o);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(n):void 0:null!==(r=Object.getPrototypeOf(t))?e(r,o,n):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function s(){var e,t;_classCallCheck(this,s);for(var o=arguments.length,n=Array(o),r=0;r<o;r++)n[r]=arguments[r];return(e=t=_possibleConstructorReturn(this,(t=s.__proto__||Object.getPrototypeOf(s)).call.apply(t,[this].concat(n)))).$usedState=["anonymousState__temp","id","className","name","mode","lazyLoad","key","hidden","webpsrc","animation","alt","width","height","webp","src","style","onClick","styletxt"],t.customComponents=[],_possibleConstructorReturn(t,e)}return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(e){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,e),this.state={webpsrc:""},this._refresh="",this.$$refs=[]}},{key:"componentDidMount",value:function(){var e=this.props.src,e=this.getImgType(e);this.setState({webpsrc:e})}},{key:"componentDidUpdate",value:function(){var e=this.props.src;e!=this._refresh&&(this._refresh=e,e=this.getImgType(e),this.setState({webpsrc:e}))}},{key:"isJdHost",value:function(e){return/^https:\/\/(img\d{2}|m)\.360buyimg\.com/.test(e)}},{key:"isJPG",value:function(e){return/\.(jpg|jpeg|png)$/i.test(e)}},{key:"isSupportWebp",value:function(){return!0}},{key:"getImgType",value:function(e){var t=e;return t=this.isJdHost(e)&&this.isJPG(e)&&this.isSupportWebp()?e+"!q70.webp":t}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix,this.__state.webpsrc;var e=this.__props,t=e.className,t=void 0===t?{}:t,o=e.id,o=void 0===o?"":o,n=e.name,n=void 0===n?"":n,r=(e.style,e.mode),r=void 0===r?"scaleToFill":r,s=e.lazyLoad,s=void 0===s||s,i=e.key,i=void 0===i?"":i,a=e.hidden,a=void 0===a?"":a,p=e.animation,p=void 0===p?"":p,c=(e.onClick,e.alt),c=void 0===c?"京东到家":c,l=e.width,l=void 0===l?"":l,u=e.height,u=void 0===u?"":u,_=e.webp,_=void 0===_||_,e=e.styletxt,e=(0,_index.internal_inline_style)(void 0===e?"":e);return Object.assign(this.__state,{anonymousState__temp:e,id:o,className:t,name:n,mode:r,lazyLoad:s,key:i,hidden:a,animation:p,alt:c,width:l,height:u,webp:_}),this.__state}}]),s}(),_class.$$events=[],_class.externalClasses=["my-class"],_class.$$componentPath="pages/newUser-t/components/image/index";var IMG=_temp2;exports.default=IMG,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(IMG));
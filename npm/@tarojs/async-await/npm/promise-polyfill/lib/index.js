"use strict";var setTimeoutFunc=setTimeout;function noop(){}function bind(e,t){return function(){e.apply(t,arguments)}}function Promise(e){if(!(this instanceof Promise))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],doResolve(e,this)}function handle(n,o){for(;3===n._state;)n=n._value;0!==n._state?(n._handled=!0,Promise._immediateFn(function(){var e,t=1===n._state?o.onFulfilled:o.onRejected;if(null!==t){try{e=t(n._value)}catch(e){return void reject(o.promise,e)}resolve(o.promise,e)}else(1===n._state?resolve:reject)(o.promise,n._value)})):n._deferreds.push(o)}function resolve(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof Promise)return t._state=3,t._value=e,void finale(t);if("function"==typeof n)return void doResolve(bind(n,e),t)}t._state=1,t._value=e,finale(t)}catch(e){reject(t,e)}}function reject(e,t){e._state=2,e._value=t,finale(e)}function finale(e){2===e._state&&0===e._deferreds.length&&Promise._immediateFn(function(){e._handled||Promise._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)handle(e,e._deferreds[t]);e._deferreds=null}function Handler(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function doResolve(e,t){var n=!1;try{e(function(e){n||(n=!0,resolve(t,e))},function(e){n||(n=!0,reject(t,e))})}catch(e){if(n)return;n=!0,reject(t,e)}}Promise.prototype.catch=function(e){return this.then(null,e)},Promise.prototype.then=function(e,t){var n=new this.constructor(noop);return handle(this,new Handler(e,t,n)),n},Promise.prototype.finally=function(t){var n=this.constructor;return this.then(function(e){return n.resolve(t()).then(function(){return e})},function(e){return n.resolve(t()).then(function(){return n.reject(e)})})},Promise.all=function(t){return new Promise(function(r,i){if(!t||void 0===t.length)throw new TypeError("Promise.all accepts an array");var u=Array.prototype.slice.call(t);if(0===u.length)return r([]);var s=u.length;for(var e=0;e<u.length;e++)!function t(n,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var o=e.then;if("function"==typeof o)return void o.call(e,function(e){t(n,e)},i)}u[n]=e,0==--s&&r(u)}catch(e){i(e)}}(e,u[e])})},Promise.resolve=function(t){return t&&"object"==typeof t&&t.constructor===Promise?t:new Promise(function(e){e(t)})},Promise.reject=function(n){return new Promise(function(e,t){t(n)})},Promise.race=function(r){return new Promise(function(e,t){for(var n=0,o=r.length;n<o;n++)r[n].then(e,t)})},Promise._immediateFn="function"==typeof setImmediate?function(e){setImmediate(e)}:function(e){setTimeoutFunc(e,0)},Promise._unhandledRejectionFn=function(e){},module.exports=Promise;
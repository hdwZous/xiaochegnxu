/**
 * sr-sdk-wxapp v1.8.2
 * (c) 2021 tabpan,glennzou,edenxing
 * @license ISC
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.SRT = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    try {
        if (!Object.entries) {
            Object.entries = function (obj) {
                var ownProps = Object.keys(obj), i = ownProps.length, resArray = new Array(i); // preallocate the Array
                while (i--)
                    { resArray[i] = [ownProps[i], obj[ownProps[i]]]; }
                return resArray;
            };
        }
        if (!Array.prototype.includes) {
            //or use Object.defineProperty
            Array.prototype.includes = function (search) {
                return !!~this.indexOf(search);
            };
        }
    }
    catch (error) {
        console.error('polyfill exec failed', error);
    }
    //# sourceMappingURL=polyfill.js.map

    // Polyfill from  https://github.com/MaxArt2501/base64-js/blob/master/base64.js
    // base64 character set, plus padding character (=)
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", 
    // Regular expression to check formal correctness of base64 encoded strings
    b64re = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
    var btoa = function (string) {
        string = String(string);
        var bitmap, a, b, c, result = "", i = 0, rest = string.length % 3; // To determine the final padding
        for (; i < string.length;) {
            if ((a = string.charCodeAt(i++)) > 255 ||
                (b = string.charCodeAt(i++)) > 255 ||
                (c = string.charCodeAt(i++)) > 255)
                { throw new TypeError("Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range."); }
            bitmap = (a << 16) | (b << 8) | c;
            result += b64.charAt(bitmap >> 18 & 63) + b64.charAt(bitmap >> 12 & 63) +
                b64.charAt(bitmap >> 6 & 63) + b64.charAt(bitmap & 63);
        }
        // If there's need of padding, replace the last 'A's with equal signs
        return rest ? result.slice(0, rest - 3) + "===".substring(rest) : result;
    };
    var atob = function (string) {
        // atob can work with strings with whitespaces, even inside the encoded part,
        // but only \t, \n, \f, \r and ' ', which can be stripped.
        string = String(string).replace(/[\t\n\f\r ]+/g, "");
        if (!b64re.test(string))
            { throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded."); }
        // Adding the padding if missing, for semplicity
        string += "==".slice(2 - (string.length & 3));
        var bitmap, result = "", r1, r2, i = 0;
        for (; i < string.length;) {
            bitmap = b64.indexOf(string.charAt(i++)) << 18 | b64.indexOf(string.charAt(i++)) << 12 |
                (r1 = b64.indexOf(string.charAt(i++))) << 6 | (r2 = b64.indexOf(string.charAt(i++)));
            result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
                r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
                    String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
        }
        return result;
    };
    var encode = function (str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
            var fromCharCode = function (code) { return String.fromCharCode(code); };
            return fromCharCode('0x' + p1);
        }));
    };
    var decode = function (str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    };
    var base64 = {
        uint8ArrayToBase64: function (u8a) {
            var maxArgs = 0x1000;
            var segments = [];
            for (var i = 0, l = u8a.length; i < l; i += maxArgs) {
                segments.push(String.fromCharCode.apply(null, u8a.subarray(i, i + maxArgs)));
            }
            return btoa(segments.join(''));
        },
        encode: function (str) {
            // first we use encodeURIComponent to get percent-encoded UTF-8,
            // then we convert the percent encodings into raw bytes which
            // can be fed into btoa.
            return encode(str)
                .replace(/=/g, "")
                .replace(/\+/g, "-")
                .replace(/\//g, "_");
        },
        decode: function (str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            str = str
                .replace(/\-/g, "+")
                .replace(/_/g, "/");
            var mod4 = str.length % 4;
            if (mod4 > 0) {
                str = str + "====".substring(mod4);
            }
            return decode(str);
        }
    };
    //# sourceMappingURL=base64.js.map

    var _toString = Object.prototype.toString;
    var base64$1 = base64;
    var isObject = function (o) { return _toString.call(o) === '[object Object]'; };
    var isArray = function (o) { return _toString.call(o) === '[object Array]'; };
    var debounce = function (fn, timestamp) {
        if (timestamp === void 0) { timestamp = 0; }
        var timer;
        var resolves = [];
        return function () {
            var arguments$1 = arguments;

            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments$1[_i];
            }
            // Run the function after a certain amount of time
            clearTimeout(timer);
            timer = setTimeout(function () {
                // Get the result of the inner function, then apply it to the resolve function of
                // each promise that has been created since the last time the inner function was run
                var result = fn.apply(void 0, args);
                resolves.forEach(function (r) { return r(result); });
                resolves = [];
            }, timestamp);
            return new Promise(function (r) { return resolves.push(r); });
        };
    };
    var getUUID = function () {
        return Date.now() + '-' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    var deepMerge = function () {
        var arguments$1 = arguments;

        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments$1[_i];
        }
        if (args.length === 0)
            { return {}; }
        if (args.length < 2)
            { return args[0]; }
        return args.reduce(function (o1, o2) {
            if (!(isObject(o1) && isObject(o2))) {
                console.error('deepMerge arguments only access object');
                return o1;
            }
            var result = o1 || {};
            Object.entries(o2).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (value === undefined)
                    { return; }
                if (!o1[key]) {
                    result[key] = value;
                    return;
                }
                if (isArray(o1[key])) {
                    if (!isArray(value)) {
                        result[key] = value;
                        return;
                    }
                    var arr = isArray(value) ? value : [value];
                    result[key] = __spreadArrays(o1[key], arr);
                    return;
                }
                if (isObject(o1[key])) {
                    result[key] = deepMerge(o1[key], value);
                    return;
                }
                result[key] = value;
            });
            return result;
        });
    };
    var isRegularVariable = function (key) {
        return /^[a-zA-Z\$_][a-zA-Z\d_]*$/.test(key) ? true : false;
    };
    var semver = /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
    var validate = function (version) {
        if (typeof version !== 'string') {
            throw new TypeError('Invalid argument expected string');
        }
        if (!semver.test(version)) {
            throw new Error('Invalid argument not valid semver (\'' + version + '\' received)');
        }
    };
    var tryParse = function (v) {
        return isNaN(Number(v)) ? v : Number(v);
    };
    var indexOrEnd = function (str, q) {
        return str.indexOf(q) === -1 ? str.length : str.indexOf(q);
    };
    var split = function (v) {
        var c = v.replace(/^v/, '').replace(/\+.*$/, '');
        var patchIndex = indexOrEnd(c, '-');
        var arr = c.substring(0, patchIndex).split('.');
        arr.push(c.substring(patchIndex + 1));
        return arr;
    };
    var compareVersions = function (v1, v2) {
        [v1, v2].forEach(validate);
        var s1 = split(v1);
        var s2 = split(v2);
        for (var i = 0; i < Math.max(s1.length - 1, s2.length - 1); i++) {
            var n1 = parseInt(s1[i] || 0, 10);
            var n2 = parseInt(s2[i] || 0, 10);
            if (n1 > n2)
                { return 1; }
            if (n2 > n1)
                { return -1; }
        }
        var sp1 = s1[s1.length - 1];
        var sp2 = s2[s2.length - 1];
        if (sp1 && sp2) {
            var p1 = sp1.split('.').map(tryParse);
            var p2 = sp2.split('.').map(tryParse);
            for (i = 0; i < Math.max(p1.length, p2.length); i++) {
                if (p1[i] === undefined || typeof p2[i] === 'string' && typeof p1[i] === 'number')
                    { return -1; }
                if (p2[i] === undefined || typeof p1[i] === 'string' && typeof p2[i] === 'number')
                    { return 1; }
                if (p1[i] > p2[i])
                    { return 1; }
                if (p2[i] > p1[i])
                    { return -1; }
            }
        }
        else if (sp1 || sp2) {
            return sp1 ? -1 : 1;
        }
        return 0;
    };
    var getRequestParams = function (urlStr) {
        var url = '';
        if (typeof urlStr == "undefined") {
            url = decodeURI(location.search); //鑾峰彇url涓�"?"绗﹀悗鐨勫瓧绗︿覆
        }
        else {
            if (urlStr.split("?").length > 1) {
                url = "?" + urlStr.split("?")[1];
            }
        }
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    var stringifyHandler = function () {
        var cache = [];
        var keyCache = [];
        return function (key, value) {
            if (value instanceof Error) {
                // 澶勭悊Error瀵硅薄
                return "Error.message: " + value.message + " \n  Error.stack: " + value.stack;
            }
            if (typeof value === 'object' && value !== null) {
                // 澶勭悊寰幆寮曠敤
                var index = cache.indexOf(value);
                if (index !== -1) {
                    return "[Circular " + keyCache[index] + "]";
                }
                cache.push(value);
                keyCache.push(key || 'root');
            }
            return value;
        };
    };
    // 澶勭悊瀵硅薄涓惈鏈塃rror瀵硅薄
    // 澶勭悊寰幆寮曠敤
    var stringifyPlus = function (target) {
        // 濡傛灉target鏄瓧绗︿覆锛屽垯鐩存帴杩斿洖锛岄伩鍏嶄簩娆″姞宸ワ紝瀵艰嚧JSON鏍囧噯瀛楃涓叉敼鍧�
        if (typeof target === 'string') {
            return target;
        }
        try {
            return (JSON.stringify(target, stringifyHandler(), 4) || 'undefined').replace(/"/gim, ''); // 杩欓噷涔嬫墍浠ヨ鍘绘帀瀛楃涓蹭腑鐨勬墍鏈� 鈥� " 鈥� 锛屾槸鍥犱负浼犺繘鏉ョ殑鏄� Error 瀵硅薄鏃朵細 stringify 涓ゆ
        }
        catch (e) {
            return "error happen when sdk stringify: \n " + e.message + " \n " + e.stack;
        }
    };
    // 鍒ゆ柇褰撳墠鐜鏄摢涓�
    var getCurrentEnvironment = function () {
        if (typeof wx !== 'undefined')
            { return wx; }
        if (typeof qq !== 'undefined')
            { return qq; }
        if (typeof swan !== 'undefined')
            { return swan; }
        if (typeof my !== 'undefined')
            { return my; }
        return wx;
    };
    //# sourceMappingURL=utils.js.map

    var Uploader = /** @class */ (function () {
        function Uploader(request) {
            // private props
            this.delay = 100;
            this.upload = debounce(request, this.delay);
            this.request = request;
        }
        return Uploader;
    }());
    //# sourceMappingURL=uploader.js.map

    var Queue = /** @class */ (function (_super) {
        __extends(Queue, _super);
        function Queue(option) {
            var _this = _super.call(this, option.request) || this;
            // 闃熷垪瀹瑰櫒
            _this.stack = [];
            // public methods
            _this.initialize = function () {
                return Promise.resolve(true);
            };
            _this.add = function (eventData) {
                _this.stack.push(eventData);
            };
            // 杩斿洖闃熷垪淇℃伅
            _this.getItems = function () {
                return _this.stack;
            };
            _this.unshift = function (items) {
                var _a;
                return (_a = _this.stack).unshift.apply(_a, items);
            };
            _this.clean = function () {
                var stack = _this.stack;
                _this.stack = [];
                return stack;
            };
            // 濡傛灉闃熷垪瓒呰繃100锛屽垯淇濈暀鏈€鏂扮殑100鏉�
            _this.checkQueue = function () {
                if (_this.stack.length > 100) {
                    _this.stack = _this.stack.slice(-100);
                }
            };
            _this.option = option;
            _this.initialize();
            return _this;
        }
        Queue.prototype.flush = function (context, useridenTifier) {
            var _this = this;
            if (context === void 0) { context = {}; }
            if (!this.stack.length)
                { return; }
            var cloneContext = JSON.parse(JSON.stringify(context));
            cloneContext.idenTifier = cloneContext.idenTifier + useridenTifier;
            var records = this.stack.map(function (record) {
                record.props = __assign(__assign({}, record.props), cloneContext);
                return record;
            });
            this.stack = [];
            this.request({
                events: records,
            }).then(function (res) {
                if (!res.success) {
                    _this.stack = __spreadArrays(_this.stack, records); // 淇濈暀澶辫触鏈熼棿鍔犲叆闃熷垪鐨勪换鍔�
                }
            }).catch(function () {
                _this.stack = __spreadArrays(_this.stack, records);
            });
        };
        return Queue;
    }(Uploader));
    //# sourceMappingURL=queue.js.map

    var CACHE_KEY = {
        SDK: '__SR_SDK_TRACKER__',
        TRACKS: 'TRACKS',
        USER_INFO: 'USER_INFO',
        LOGID_EVENTS: 'LOGID_EVENTS',
        IDENTIFIERUSER: 'IDENTIFIERUSER'
    };
    var REPORT_STATE = {
        WAITING: 'WAITING',
        REPORTING: 'REPORTING',
        PAUSED: 'PAUSED',
    };
    var ERROR = {
        CACHE: {
            MISS: 'should exec cacheManagerInitialize first',
        },
        SDK_INTERNAL_ERROR: 'SDK_INTERNAL_ERROR',
        JS_RUN_ERROR: 'JS_RUN_ERROR',
        AJAX_ERROR: 'AJAX_ERROR',
        ORDER_MISSING_ERROR: 'ORDER_MISSING_ERROR',
    };
    var IDENTIFIERCHAN_ARR = [
        'page',
        'page_title',
        'time',
        'chan_wxapp_scene',
        'chan_id',
        'chan_refer_app_id',
        'room_id'
    ];
    var IDENTIFIERUSER_ARR = [
        'app_id',
        'open_id',
        'user_id',
        'union_id',
        'local_id' ];
    //# sourceMappingURL=contants.js.map

    var env = wx;
    var callbacks = [];
    var originRequest = env.request;
    var srTrack;
    var overrideHandle = function (opts) {
        callbacks.forEach(function (callback) {
            var _a;
            try {
                opts.requestStartTime = Date.now();
                (_a = callback.onStart) === null || _a === void 0 ? void 0 : _a.call(callback, opts);
            }
            catch (err) {
                // empty
            }
        });
        return originRequest(__assign(__assign({}, opts), { success: function (res) {
                var _a;
                callbacks.forEach(function (callback) {
                    var _a;
                    try {
                        (_a = callback.success) === null || _a === void 0 ? void 0 : _a.call(callback, res, opts);
                    }
                    catch (err) {
                        try {
                            srTrack('sdk_error_log', {
                                _sdk_error_log: {
                                    message: 'request success error',
                                    type: ERROR.SDK_INTERNAL_ERROR,
                                    error: err.message
                                }
                            });
                        }
                        catch (error) {
                            // empty 
                        }
                    }
                });
                (_a = opts.success) === null || _a === void 0 ? void 0 : _a.call(opts, res);
            }, fail: function (res) {
                var _a;
                callbacks.forEach(function (callback) {
                    var _a;
                    try {
                        (_a = callback.fail) === null || _a === void 0 ? void 0 : _a.call(callback, res, opts);
                    }
                    catch (err) {
                        try {
                            srTrack('sdk_error_log', {
                                _sdk_error_log: {
                                    message: 'request fail error',
                                    type: ERROR.SDK_INTERNAL_ERROR,
                                    error: err.message
                                }
                            });
                        }
                        catch (error) {
                            // empty 
                        }
                    }
                });
                (_a = opts.fail) === null || _a === void 0 ? void 0 : _a.call(opts, res);
            }, complete: function (res) {
                var _a;
                callbacks.forEach(function (callback) {
                    var _a;
                    try {
                        (_a = callback.complete) === null || _a === void 0 ? void 0 : _a.call(callback, res, opts);
                    }
                    catch (err) {
                        try {
                            srTrack('sdk_error_log', {
                                _sdk_error_log: {
                                    message: 'request complete error',
                                    type: ERROR.SDK_INTERNAL_ERROR,
                                    error: err.message
                                }
                            });
                        }
                        catch (error) {
                            // empty 
                        }
                    }
                });
                (_a = opts.complete) === null || _a === void 0 ? void 0 : _a.call(opts, res);
            } }));
    };
    var isOverride = false;
    var override = function () {
        try {
            Object.defineProperty(env, 'request', {
                get: function () {
                    return overrideHandle;
                },
            });
        }
        catch (err) {
            console.warn('cannot override `request`, error is: ', err);
        }
        finally {
            isOverride = true;
        }
    };
    var hackRequest = function (option, track) {
        if (!srTrack) {
            srTrack = track;
        }
        !isOverride && override();
        callbacks.push(option);
    };
    //# sourceMappingURL=hack_request.js.map

    var env$1 = wx;
    var onError = function (track) {
        // 鐩戝惉js鎵ц閿欒
        env$1.onError(function (error) {
            if (error) {
                // 缁欐瘡涓€涓疄渚嬪彂閫乯s閿欒
                track('sdk_error_log', {
                    _sdk_error_log: {
                        message: 'JS_RUN_ERROR',
                        type: ERROR.JS_RUN_ERROR,
                        error: error
                    }
                });
            }
        });
        // 鎺ュ彛閿欒鐩戞帶
        hackRequest({
            complete: function (res, opts) {
                var errMsg = res.errMsg, statusCode = res.statusCode, data = res.data;
                var type = '';
                if (errMsg.indexOf('timeout') > -1) {
                    type = 'timeout';
                }
                else if (errMsg.indexOf('fail') > -1) { // errMsg 鍦ㄨ姹傛甯哥殑鏃跺€欎篃浼氭湁杩斿洖鍊�
                    type = 'failed';
                }
                else if (!statusCode) { // statusCode 涓嶅瓨鍦ㄦ垨鑰呬负 0
                    type = 'failed';
                }
                else if (statusCode < 0) { // 鍏煎閫昏緫
                    type = 'failed';
                }
                else if (statusCode >= 400) {
                    type = 'error';
                }
                type && track('sdk_error_log', {
                    _sdk_error_log: {
                        message: 'AJAX_ERROR',
                        type: ERROR.AJAX_ERROR,
                        error: {
                            AJAX_ERROR: "request " + type,
                            resStatus: statusCode || 0,
                            resDuration: Date.now() - opts.requestStartTime,
                            resData: stringifyPlus(data),
                            reqUrl: opts.url,
                            reqMethod: opts.method || 'get',
                            reqParam: stringifyPlus(opts.data),
                            errMsg: errMsg.slice(0, 1000)
                        }
                    }
                });
            },
        }, track);
    };
    //# sourceMappingURL=onError.js.map

    var env$2 = wx;
    var callbacks$1 = [];
    var srTrack$1;
    var originRequestPayment = env$2.requestPayment;
    var originRequestOrderPayment = env$2.requestOrderPayment;
    var overrideHandle$1 = function (opts, requestType) {
        var originFn = originRequestPayment;
        if (requestType == 'requestOrderPayment') {
            originFn = originRequestOrderPayment;
        }
        callbacks$1.forEach(function (callback) {
            var _a;
            try {
                (_a = callback.onStart) === null || _a === void 0 ? void 0 : _a.call(callback, opts);
            }
            catch (err) {
                try {
                    srTrack$1('sdk_error_log', {
                        _sdk_error_log: {
                            message: 'requestPayment onStart error',
                            type: ERROR.SDK_INTERNAL_ERROR,
                            error: err.message
                        }
                    });
                }
                catch (error) {
                    // empty 
                }
            }
        });
        return originFn(__assign(__assign({}, opts), { success: function (res) {
                var _a;
                callbacks$1.forEach(function (callback) {
                    var _a;
                    try {
                        (_a = callback.success) === null || _a === void 0 ? void 0 : _a.call(callback, res, opts);
                    }
                    catch (err) {
                        try {
                            srTrack$1('sdk_error_log', {
                                _sdk_error_log: {
                                    message: 'requestPayment success error',
                                    type: ERROR.SDK_INTERNAL_ERROR,
                                    error: err.message
                                }
                            });
                        }
                        catch (error) {
                            // empty 
                        }
                    }
                });
                (_a = opts.success) === null || _a === void 0 ? void 0 : _a.call(opts, res);
            }, fail: function (res) {
                var _a;
                callbacks$1.forEach(function (callback) {
                    var _a;
                    try {
                        (_a = callback.fail) === null || _a === void 0 ? void 0 : _a.call(callback, res, opts);
                    }
                    catch (err) {
                        try {
                            srTrack$1('sdk_error_log', {
                                _sdk_error_log: {
                                    message: 'requestPayment fail error',
                                    type: ERROR.SDK_INTERNAL_ERROR,
                                    error: err.message
                                }
                            });
                        }
                        catch (error) {
                            // empty 
                        }
                    }
                });
                (_a = opts.fail) === null || _a === void 0 ? void 0 : _a.call(opts, res);
            } }));
    };
    var isOverride$1 = false;
    var override$1 = function () {
        try {
            Object.defineProperty(env$2, 'requestPayment', {
                get: function () {
                    return function (opts) { return overrideHandle$1(opts, 'requestPayment'); };
                },
            });
            Object.defineProperty(env$2, 'requestOrderPayment', {
                get: function () {
                    return function (opts) { return overrideHandle$1(opts, 'requestOrderPayment'); };
                },
            });
        }
        catch (err) {
            console.warn('cannot override `requestPayment`, error is: ', err);
        }
        finally {
            isOverride$1 = true;
        }
    };
    var hackRequestPayment = function (option, track) {
        if (!srTrack$1) {
            srTrack$1 = track;
        }
        !isOverride$1 && override$1();
        callbacks$1.push(option);
    };
    //# sourceMappingURL=hack_requestPayment.js.map

    var ERROR_REPORTER = 'sdk api exec error';
    var safeExecuable = function (target, propertyKey, descriptor) {
        var oldValue = descriptor.value;
        descriptor.value = function () {
            var result;
            try {
                result = oldValue.apply(this, arguments);
            }
            catch (error) {
                try {
                    console.error("Calling " + propertyKey + " error with", arguments);
                    console.error(error);
                    // this.track(ERROR_REPORTER, JSON.stringify(error), true)
                    var url = this.getServerUrl();
                    this.request({
                        type: ERROR_REPORTER,
                        props: {
                            sr_sdk_version: this.version,
                            system_info: this.getSystemInfo(),
                            framework_info: this.getFrameworkInfo(),
                            message: (error || {}).message || error,
                            stack: (error || {}).stack,
                        }
                    }, {
                        url: url,
                        method: 'POST',
                    });
                }
                catch (error) {
                    // TODO 杩欓噷闃叉track鏈韩鍙戠敓閿欒浜х敓涓柇
                }
            }
            return result;
        };
        return descriptor;
    };
    var checkInitState = function (target, propertyKey, descriptor) {
        var oldValue = descriptor.value;
        descriptor.value = function () {
            if (!this.inited) {
                console.error('璇峰厛瀹屾垚鍒濆鍖�');
                return;
            }
            return oldValue.apply(this, arguments);
        };
        return descriptor;
    };
    //# sourceMappingURL=class-func.js.map

    var Md5 = /** @class */ (function () {
        function Md5() {
        }
        Md5.AddUnsigned = function (lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (!!(lX4 & lY4)) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (!!(lX4 | lY4)) {
                if (!!(lResult & 0x40000000)) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                }
                else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            }
            else {
                return (lResult ^ lX8 ^ lY8);
            }
        };
        Md5.FF = function (a, b, c, d, x, s, ac) {
            a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.F(b, c, d), x), ac));
            return this.AddUnsigned(this.RotateLeft(a, s), b);
        };
        Md5.GG = function (a, b, c, d, x, s, ac) {
            a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.G(b, c, d), x), ac));
            return this.AddUnsigned(this.RotateLeft(a, s), b);
        };
        Md5.HH = function (a, b, c, d, x, s, ac) {
            a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.H(b, c, d), x), ac));
            return this.AddUnsigned(this.RotateLeft(a, s), b);
        };
        Md5.II = function (a, b, c, d, x, s, ac) {
            a = this.AddUnsigned(a, this.AddUnsigned(this.AddUnsigned(this.I(b, c, d), x), ac));
            return this.AddUnsigned(this.RotateLeft(a, s), b);
        };
        Md5.ConvertToWordArray = function (string) {
            var lWordCount, lMessageLength = string.length, lNumberOfWords_temp1 = lMessageLength + 8, lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64, lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16, lWordArray = Array(lNumberOfWords - 1), lBytePosition = 0, lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        };
        Md5.WordToHex = function (lValue) {
            var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        };
        Md5.Utf8Encode = function (string) {
            var utftext = "", c;
            string = string.replace(/\r\n/g, "\n");
            for (var n = 0; n < string.length; n++) {
                c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }
            return utftext;
        };
        Md5.init = function (string) {
            var temp;
            if (typeof string !== 'string')
                { string = JSON.stringify(string); }
            this._string = this.Utf8Encode(string);
            this.x = this.ConvertToWordArray(this._string);
            this.a = 0x67452301;
            this.b = 0xEFCDAB89;
            this.c = 0x98BADCFE;
            this.d = 0x10325476;
            for (this.k = 0; this.k < this.x.length; this.k += 16) {
                this.AA = this.a;
                this.BB = this.b;
                this.CC = this.c;
                this.DD = this.d;
                this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k], this.S11, 0xD76AA478);
                this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 1], this.S12, 0xE8C7B756);
                this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S13, 0x242070DB);
                this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 3], this.S14, 0xC1BDCEEE);
                this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S11, 0xF57C0FAF);
                this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 5], this.S12, 0x4787C62A);
                this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S13, 0xA8304613);
                this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 7], this.S14, 0xFD469501);
                this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S11, 0x698098D8);
                this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 9], this.S12, 0x8B44F7AF);
                this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S13, 0xFFFF5BB1);
                this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 11], this.S14, 0x895CD7BE);
                this.a = this.FF(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S11, 0x6B901122);
                this.d = this.FF(this.d, this.a, this.b, this.c, this.x[this.k + 13], this.S12, 0xFD987193);
                this.c = this.FF(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S13, 0xA679438E);
                this.b = this.FF(this.b, this.c, this.d, this.a, this.x[this.k + 15], this.S14, 0x49B40821);
                this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S21, 0xF61E2562);
                this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 6], this.S22, 0xC040B340);
                this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S23, 0x265E5A51);
                this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k], this.S24, 0xE9B6C7AA);
                this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S21, 0xD62F105D);
                this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 10], this.S22, 0x2441453);
                this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S23, 0xD8A1E681);
                this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 4], this.S24, 0xE7D3FBC8);
                this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S21, 0x21E1CDE6);
                this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 14], this.S22, 0xC33707D6);
                this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S23, 0xF4D50D87);
                this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 8], this.S24, 0x455A14ED);
                this.a = this.GG(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S21, 0xA9E3E905);
                this.d = this.GG(this.d, this.a, this.b, this.c, this.x[this.k + 2], this.S22, 0xFCEFA3F8);
                this.c = this.GG(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S23, 0x676F02D9);
                this.b = this.GG(this.b, this.c, this.d, this.a, this.x[this.k + 12], this.S24, 0x8D2A4C8A);
                this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 5], this.S31, 0xFFFA3942);
                this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 8], this.S32, 0x8771F681);
                this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 11], this.S33, 0x6D9D6122);
                this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 14], this.S34, 0xFDE5380C);
                this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 1], this.S31, 0xA4BEEA44);
                this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 4], this.S32, 0x4BDECFA9);
                this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 7], this.S33, 0xF6BB4B60);
                this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 10], this.S34, 0xBEBFBC70);
                this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 13], this.S31, 0x289B7EC6);
                this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k], this.S32, 0xEAA127FA);
                this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 3], this.S33, 0xD4EF3085);
                this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 6], this.S34, 0x4881D05);
                this.a = this.HH(this.a, this.b, this.c, this.d, this.x[this.k + 9], this.S31, 0xD9D4D039);
                this.d = this.HH(this.d, this.a, this.b, this.c, this.x[this.k + 12], this.S32, 0xE6DB99E5);
                this.c = this.HH(this.c, this.d, this.a, this.b, this.x[this.k + 15], this.S33, 0x1FA27CF8);
                this.b = this.HH(this.b, this.c, this.d, this.a, this.x[this.k + 2], this.S34, 0xC4AC5665);
                this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k], this.S41, 0xF4292244);
                this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 7], this.S42, 0x432AFF97);
                this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 14], this.S43, 0xAB9423A7);
                this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 5], this.S44, 0xFC93A039);
                this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 12], this.S41, 0x655B59C3);
                this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 3], this.S42, 0x8F0CCC92);
                this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 10], this.S43, 0xFFEFF47D);
                this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 1], this.S44, 0x85845DD1);
                this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 8], this.S41, 0x6FA87E4F);
                this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 15], this.S42, 0xFE2CE6E0);
                this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 6], this.S43, 0xA3014314);
                this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 13], this.S44, 0x4E0811A1);
                this.a = this.II(this.a, this.b, this.c, this.d, this.x[this.k + 4], this.S41, 0xF7537E82);
                this.d = this.II(this.d, this.a, this.b, this.c, this.x[this.k + 11], this.S42, 0xBD3AF235);
                this.c = this.II(this.c, this.d, this.a, this.b, this.x[this.k + 2], this.S43, 0x2AD7D2BB);
                this.b = this.II(this.b, this.c, this.d, this.a, this.x[this.k + 9], this.S44, 0xEB86D391);
                this.a = this.AddUnsigned(this.a, this.AA);
                this.b = this.AddUnsigned(this.b, this.BB);
                this.c = this.AddUnsigned(this.c, this.CC);
                this.d = this.AddUnsigned(this.d, this.DD);
            }
            temp = this.WordToHex(this.a) + this.WordToHex(this.b) + this.WordToHex(this.c) + this.WordToHex(this.d);
            return temp.toLowerCase();
        };
        Md5.x = Array();
        Md5.S11 = 7;
        Md5.S12 = 12;
        Md5.S13 = 17;
        Md5.S14 = 22;
        Md5.S21 = 5;
        Md5.S22 = 9;
        Md5.S23 = 14;
        Md5.S24 = 20;
        Md5.S31 = 4;
        Md5.S32 = 11;
        Md5.S33 = 16;
        Md5.S34 = 23;
        Md5.S41 = 6;
        Md5.S42 = 10;
        Md5.S43 = 15;
        Md5.S44 = 21;
        Md5.RotateLeft = function (lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)); };
        Md5.F = function (x, y, z) { return (x & y) | ((~x) & z); };
        Md5.G = function (x, y, z) { return (x & z) | (y & (~z)); };
        Md5.H = function (x, y, z) { return (x ^ y ^ z); };
        Md5.I = function (x, y, z) { return (y ^ (x | (~z))); };
        return Md5;
    }());
    //# sourceMappingURL=md5.js.map

    var env$3 = 'development';
    var Sdk = getCurrentEnvironment();
    function getCurrentPage() {
        var pages = getCurrentPages() || '';
        return pages[pages.length - 1] || '';
    }
    // 鑾峰彇褰撳墠椤靛甫鍙傛暟鐨剈rl
    function getCurrentPageUrlWithArgs(type) {
        var urlWithArgs = '/';
        // 鏀粯瀹濆皬绋嬪簭鐨刧etCurrentPages鑾峰彇鍙傛暟涓嶄竴鏍�
        try {
            var curPage = getCurrentPage();
            if (!curPage)
                { return curPage; }
            var url = curPage.route;
            var params = {};
            var options = curPage.options || {};
            // 鎸囧畾闇€瑕佹嫾鎺ョ殑鍙傛暟
            params = curPage.options || {};
            //鎷兼帴url鐨勫弬鏁�
            urlWithArgs = url + '?';
            for (var key in options) {
                if (type === 'share' && key === 'txsrShareInfoSdk')
                    { continue; }
                if (!isRegularVariable(key))
                    { continue; }
                if (params[key]) {
                    var value = options[key];
                    urlWithArgs += key + '=' + value + '&';
                }
            }
            urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);
        }
        catch (error) {
            console.error('getCurrentPageUrlWithArgs error', error);
        }
        return urlWithArgs;
    }
    // 鑾峰彇褰撳墠椤靛甫鍙傛暟鐨剈rl鐨刱ey
    function getCurrentPageKey(getKey) {
        var urlWithArgs = '/';
        try {
            var curPage = getCurrentPage();
            if (!curPage)
                { return curPage; }
            var params = {};
            var options = curPage.options || {};
            // 鎸囧畾闇€瑕佹嫾鎺ョ殑鍙傛暟
            params = curPage.options || {};
            return params[getKey] || '';
        }
        catch (error) {
            console.error('getCurrentPageKey error', error);
        }
        return urlWithArgs;
    }
    function getPageTitle() {
        var desc = '鏈煡';
        var curPage = getCurrentPage();
        try {
            var app_title = __wxConfig.global.window.navigationBarTitleText;
            var page_title = curPage ? (__wxConfig.page[curPage.route + '.html'].window || {}).navigationBarTitleText : '';
            return page_title || app_title || desc;
        }
        catch (error) {
            // 璇ユ柟娉曚笉鏄畼鏂规敮鎸佺殑锛屾墍浠ヤ笉鍋氬憡璀﹀鐞嗭紝鍙€傜敤浜庡厹搴�
            // console.error('getPageTitle failed: ', error);
        }
        return desc;
    }
    function getPlatform() {
        try {
            if (typeof __wxConfig === 'undefined')
                { return ''; }
            return __wxConfig.platform;
        }
        catch (error) {
            console.error('getEnv failed: ', error);
        }
        return '';
    }
    function isDev() {
        return getPlatform() === 'devtools';
    }
    // 鑾峰彇灏忕▼搴忓弬鏁�
    var getQuery = function (query) {
        if (query === void 0) { query = {}; }
        // 閫氳繃灏忕▼搴忕爜杩涙潵鐨勪細鏈夊甫鍙傛暟
        var params = {};
        if (query.scene) {
            // scene 闇€瑕佷娇鐢� decodeURIComponent 鎵嶈兘鑾峰彇鍒扮敓鎴愪簩缁寸爜鏃朵紶鍏ョ殑 scene
            try {
                var scene = decodeURIComponent(query.scene);
                scene = scene.replace('?', '').trim();
                scene.split('&').map(function (a) {
                    if (a) {
                        var _a = a.split('='), key = _a[0], value = _a[1];
                        if (isRegularVariable(key)) {
                            params[key] = value === undefined ? true : value;
                        }
                    }
                });
            }
            catch (error) {
                console.error(error);
            }
            query = __assign(__assign({}, query), params);
        }
        return query;
    };
    function elementEventTrack(args, track, methodName) {
        try {
            var _a = args[0], e = _a === void 0 ? {} : _a;
            if (e) {
                switch (e.type) {
                    case 'tap':
                    case 'longpress':
                    case "longtap":
                    case 'confirm':
                        var _b = (e.currentTarget || {}).dataset, dataset = _b === void 0 ? {} : _b;
                        // 澧炲姞e.currentTarget鑾峰彇涓嶅埌鏃讹紝鍙杄.target.dataset
                        if (Object.keys(dataset).length == 0) {
                            dataset = e.target.dataset;
                        }
                        var _c = (this || {}), _d = _c.is, is = _d === void 0 ? '' : _d, data = _c.data;
                        track("element", __assign({ is_sdk_auto_track: true, is: is, type: e.type, element_id: "#" + methodName }, dataset));
                        break;
                    default:
                        break;
                }
            }
        }
        catch (error) {
            console.error('elementEventTrack error', error);
        }
    }
    function getShareInfo() {
        var prefix = "" + env$3;
        var curPage = getCurrentPage() || {};
        var getKey = function (key) { return key + "_" + prefix; };
        var path = curPage.route || '';
        var result;
        try {
            result = Sdk.getStorageSync(getKey(CACHE_KEY.SDK));
        }
        catch (error) {
            console.error('CacheManager.get error', error);
        }
        var _a = result.USER_INFO || {}, local_id = _a.local_id, _b = _a.txsr_from_share_info, _c = _b === void 0 ? {} : _b, _d = _c.mi, mi = _d === void 0 ? '' : _d, _e = _c.d, d = _e === void 0 ? 0 : _e, _f = _c.o, o = _f === void 0 ? '' : _f;
        var myMid = Md5.init(local_id + path);
        var share_depth = (mi !== '') ? ((myMid === mi) ? d : d + 1) : d + 1;
        mi = Md5.init(local_id + path);
        if (d === 0) {
            o = mi;
        }
        console.log('ooooo', o, d);
        return JSON.stringify({
            mi: mi,
            d: share_depth,
            o: o
        });
    }
    // 鑾峰彇qq灏忕▼搴忓垎浜殑绫诲瀷
    function getShareToInfo(value) {
        /*
        1	鍒嗕韩闈㈡澘灞曠ず鈥滃垎浜埌濂藉弸鈥�	1.4.4
        2	鍒嗕韩闈㈡澘灞曠ず鈥滃垎浜埌绌洪棿鈥�	1.4.4
        3	杩涜蹇€熷垎浜紝鐩存帴鍒嗕韩鍒板綋鍓嶈亰澶╃獥鍙ｏ紝page.onShareAppMessage 闇€瑕佸甫涓� entryDataHash 鍙傛暟	1.6.3
        4	鍒嗕韩闈㈡澘灞曠ず鈥滃垎浜埌寰俊濂藉弸鈥�	1.6.3
        5	鍒嗕韩闈㈡澘灞曠ず鈥滃垎浜埌寰俊鏈嬪弸鍦堚€�	1.6.3
        6	鍒嗕韩鍒版渶杩戠殑鑱旂郴浜哄垪琛�
        */
        var shareType = ['qqFriends', 'qzone', 'frist', 'friends', 'timeline', 'recentContact'];
        var shareInfo = shareType[parseInt(value)];
        return shareInfo || 'friends';
    }
    //# sourceMappingURL=tools.js.map

    var version = '';
    try {
        version = '1.8.2';
    }
    catch (error) { }
    var SDK = /** @class */ (function () {
        // protected abstract create(): SDK
        /**
         *
         * @param param0 tracking_id 缁帴track浼氳瘽锛屼竴鑸敤浜� app -> webview 鍏宠仈
         */
        function SDK() {
            var _this_1 = this;
            this.env = 'development';
            // 绉佹湁灞炴€�
            this.cachePrefix = CACHE_KEY.SDK;
            this.inited = false;
            this.option = {};
            this.context = {
                idenTifier: '-------',
            };
            // 11浣嶆爣璇嗘暟缁勶紝鐢ㄤ簬鍒ゆ柇
            this.idenTifierChanArr = IDENTIFIERCHAN_ARR;
            this.idenTifierUserArr = IDENTIFIERUSER_ARR;
            this.reportState = REPORT_STATE.WAITING;
            // 闇€瑕佸垽鏂殑URL
            this.needCheckUrlInfo = [];
            // 鎶撳彇鍚庣殑鏆傚瓨鍖猴紝鐩墠浠呮湁custom_order
            this.autoProxyData = {};
            // 榛樿杩滅閰嶇疆
            this.remoteConfigInfo = {
                masterSwitch: true,
                isOpenProxyWxApi: false,
            };
            // 鎵撳紑涓婃姤
            this.openTrack = function () {
                var _this_1 = this;
                // 瀹氭椂妫€娴嬮槦鍒楁槸鍚﹂渶瑕佹帹閫�
                this.checkFallback();
                // 鏄惁鑷姩寮€濮嬩笂鎶�
                if (this.option.autoStart)
                    { this.startReport(); }
                // logid鏂规锛岃绠椾涪鍖呯巼
                setTimeout(function () {
                    _this_1.trackLogEvents();
                }, 999);
            };
            // 鍐呭惈鎬诲紑鍏筹紙浼樺厛绾ф渶楂橈級
            this.initRemoteConfig = function () {
                try {
                    var _this_2 = this;
                    wx.request({
                        url: 'https://zhls.qq.com/open/sdk?token=' + this.option.token,
                        data: {},
                        header: {
                            'content-type': 'json'
                        },
                        success: function (res) {
                            try {
                                var data = res.data;
                                _this_2.remoteConfigInfo = deepMerge(_this_2.remoteConfigInfo, data);
                                _this_2.track('sdk_config_info', {
                                    _sdk_config_info: _this_2.remoteConfigInfo
                                });
                                if (_this_2.remoteConfigInfo.masterSwitch) {
                                    _this_2.openTrack();
                                }
                                else {
                                    return;
                                }
                                // 杩滅鎵撳紑浠ｇ悊琛屼负
                                if (_this_2.remoteConfigInfo.isOpenProxyWxApi) {
                                    _this_2.openProxyWxApi();
                                }
                            }
                            catch (error) {
                                _this_2.track('sdk_error_log', {
                                    _sdk_error_log: {
                                        message: 'request proxyConfig success',
                                        type: ERROR.SDK_INTERNAL_ERROR,
                                        error: error.message
                                    }
                                });
                                _this_2.openTrack();
                            }
                        },
                        fail: function (err) {
                            console.log('request proxyConfig error锛�', err);
                            _this_2.track('sdk_error_log', {
                                _sdk_error_log: {
                                    message: "request proxyConfig fail, url: " + ('https://zhls.qq.com/open/sdk?token=' + _this_2.option.token),
                                    type: ERROR.SDK_INTERNAL_ERROR,
                                    error: err.errMsg
                                }
                            });
                            _this_2.openTrack();
                        }
                    });
                }
                catch (error) {
                    console.log('request proxyConfig error锛�', error);
                    this.track('sdk_error_log', {
                        _sdk_error_log: {
                            message: "request proxyConfig error, url: " + ('https://zhls.qq.com/open/sdk?token=' + this.option.token),
                            type: ERROR.SDK_INTERNAL_ERROR,
                            error: error.message
                        }
                    });
                    this.openTrack();
                }
            };
            // 浠ｇ悊寰俊API
            this.openProxyWxApi = function () {
                var _this_1 = this;
                // 閬嶅巻杩滅閰嶇疆
                try {
                    var copyRemoteInfo_1 = __assign({}, this.remoteConfigInfo);
                    delete copyRemoteInfo_1.masterSwitch;
                    delete copyRemoteInfo_1.isOpenProxyWxApi;
                    if (!Object.keys(copyRemoteInfo_1).length) {
                        return;
                    }
                    Object.keys(copyRemoteInfo_1).forEach(function (key) {
                        _this_1.autoProxyData[key] = {};
                        copyRemoteInfo_1[key].forEach(function (item) {
                            _this_1.autoProxyData[key][item.name] = {
                                _sr_track_url: '',
                                _sr_track_body: '',
                            };
                            item.value.forEach(function (urlItem) {
                                _this_1.needCheckUrlInfo.push({
                                    name: item.name,
                                    url: urlItem.url,
                                    eventName: key,
                                    grabLocation: urlItem.grabLocation
                                });
                            });
                        });
                    });
                }
                catch (error) {
                    this.track('sdk_error_log', {
                        _sdk_error_log: {
                            message: 'openProxyWxApi error',
                            type: ERROR.SDK_INTERNAL_ERROR,
                            error: error.message
                        }
                    });
                    console.warn('SDK涓嬪彂閰嶇疆鎺ュ彛鎶ラ敊锛�', error);
                }
            };
            this.hackAutoTrack = function () {
                var _this_1 = this;
                // hack request
                hackRequest({
                    success: function (res, opts) {
                        if (!_this_1.remoteConfigInfo.isOpenProxyWxApi)
                            { return; }
                        var infoArr = _this_1.checkRequestUrl(opts.url);
                        infoArr.forEach(function (info) {
                            var data;
                            if (info.grabLocation === 'request') {
                                var params = getRequestParams(opts.url);
                                data = deepMerge(params, opts.data);
                            }
                            else {
                                data = res.data;
                            }
                            _this_1.autoProxyData[info.eventName][info.name]._sr_track_body = data;
                            _this_1.autoProxyData[info.eventName][info.name]._sr_track_url = info.url;
                            if (_this_1.ckObjectFullFill(info.eventName)) {
                                if (info.eventName == 'custom_order') {
                                    _this_1.track(info.eventName, {
                                        is_sdk_auto_track: true,
                                        _auto_proxy_data: _this_1.formatAutoData(info.eventName),
                                        order: {
                                            order_time: Number(new Date().getTime()),
                                            order_status: 'give_order'
                                        },
                                    });
                                }
                                else {
                                    _this_1.track(info.eventName, {
                                        is_sdk_auto_track: true,
                                        _auto_proxy_data: _this_1.formatAutoData(info.eventName),
                                    });
                                    // 涓婃姤鍚庢竻绌�
                                    _this_1.clearProxyData(info.eventName);
                                }
                            }
                        });
                    }
                }, this.track.bind(this));
                // hack requestPayment requestOrderPayment
                hackRequestPayment({
                    onStart: function () {
                        if (!_this_1.remoteConfigInfo.isOpenProxyWxApi)
                            { return; }
                        if (_this_1.ckObjectFullFill('custom_order')) {
                            _this_1.track('custom_order', {
                                is_sdk_auto_track: true,
                                _auto_proxy_data: _this_1.formatAutoData('custom_order'),
                                order: {
                                    order_time: Number(new Date().getTime()),
                                    order_status: 'pay'
                                },
                            });
                        }
                        else {
                            _this_1.track('sdk_error_log', {
                                _sdk_error_log: {
                                    message: 'custom_order error',
                                    type: ERROR.ORDER_MISSING_ERROR,
                                    error: 'Incomplete order'
                                }
                            });
                        }
                    },
                    success: function () {
                        if (!_this_1.remoteConfigInfo.isOpenProxyWxApi)
                            { return; }
                        if (_this_1.ckObjectFullFill('custom_order')) {
                            _this_1.track('custom_order', {
                                is_sdk_auto_track: true,
                                _auto_proxy_data: _this_1.formatAutoData('custom_order'),
                                order: {
                                    order_time: Number(new Date().getTime()),
                                    order_status: 'payed'
                                },
                            });
                            _this_1.clearProxyData('custom_order');
                        }
                    },
                    fail: function () {
                        if (!_this_1.remoteConfigInfo.isOpenProxyWxApi)
                            { return; }
                        if (_this_1.ckObjectFullFill('custom_order')) {
                            _this_1.track('custom_order', {
                                is_sdk_auto_track: true,
                                _auto_proxy_data: _this_1.formatAutoData('custom_order'),
                                order: {
                                    order_time: Number(new Date().getTime()),
                                    order_status: 'cancel_pay'
                                },
                            });
                        }
                    }
                }, this.track.bind(this));
            };
            this.clearProxyData = function (eventName) {
                var _this_1 = this;
                var arr = Object.keys(this.autoProxyData[eventName]);
                if (arr.length === 0) {
                    return;
                }
                arr.forEach(function (item) {
                    try {
                        _this_1.autoProxyData[eventName][item]._sr_track_url = '';
                        _this_1.autoProxyData[eventName][item]._sr_track_body = '';
                    }
                    catch (error) {
                        _this_1.track('sdk_error_log', {
                            _sdk_error_log: {
                                message: 'clearProxyData error',
                                type: ERROR.SDK_INTERNAL_ERROR,
                                error: error.message
                            }
                        });
                        console.log('clearProxyData error', error);
                    }
                });
            };
            this.ckObjectFullFill = function (eventName) {
                var _this_1 = this;
                if (this.autoProxyData[eventName] === undefined)
                    { return false; }
                var arr = Object.keys(this.autoProxyData[eventName]);
                if (arr.length === 0) {
                    return false;
                }
                var flag = true;
                arr.forEach(function (item) {
                    try {
                        if (_this_1.autoProxyData[eventName][item]._sr_track_body == '') {
                            flag = false;
                        }
                    }
                    catch (error) {
                        _this_1.track('sdk_error_log', {
                            _sdk_error_log: {
                                message: 'ckObjectFullFill error',
                                type: ERROR.SDK_INTERNAL_ERROR,
                                error: error.message
                            }
                        });
                        console.log('error ckObjectFullFill', error);
                    }
                });
                return flag;
            };
            this.checkRequestUrl = function (url) {
                var info = [];
                this.needCheckUrlInfo.forEach(function (item) {
                    if (url.includes(item.url)) {
                        info.push(__assign({}, item));
                    }
                });
                return info;
            };
            // 鏍煎紡鍖朼uto_track_data
            this.formatAutoData = function (eventName) {
                var _this_1 = this;
                var data = __assign({}, this.autoProxyData[eventName]);
                var arr = Object.keys(data);
                arr.forEach(function (item) {
                    try {
                        data[item] = base64$1.encode(JSON.stringify(data[item]));
                    }
                    catch (error) {
                        _this_1.track('sdk_error_log', {
                            _sdk_error_log: {
                                message: 'formatAutoData error',
                                type: ERROR.SDK_INTERNAL_ERROR,
                                error: error.message
                            }
                        });
                        console.log('error formatAutoData', error);
                    }
                });
                return data;
            };
            this.triggerFlush = debounce(function () {
                _this_1.checkAndUpload();
            }, 1000);
            this.eventDataFmatter = function (data) {
                var time = +new Date(); // 缁熶竴鍔犱笂鏃堕棿鎴�
                var pageInfo = _this_1.getPageInfo();
                if (_this_1._onQueue !== undefined) {
                    var _data = _this_1._onQueue(data);
                    if (isObject(data)) {
                        data = _data;
                    }
                    else {
                        console.warn('eventDataFmatter should return Object type');
                    }
                }
                return __assign(__assign(__assign({}, pageInfo), data), { 
                    // 鍥哄畾鐨刾rops锛岄槻姝㈣瑕嗙洊
                    time: time });
            };
            this.checkRequiredOptionItem = function () {
                if (!(
                    _this_1.option.token)) {
                    if (_this_1.option.skipTokenCheck) {
                        console.warn('token 鏈厤缃紝宸茶烦杩囪妫€鏌�');
                        return true;
                    }
                    console.error('sdk.init - Option 蹇呰鍙傛暟閰嶇疆缂哄け锛岃妫€鏌�');
                    return false;
                }
                return true;
            };
            this.checkVersionInfo = function () {
                // 涓婃姤鐗堟湰鍙凤紝鍙互鏌ョ湅KA鏈€鏂颁娇鐢ㄧ殑鐗堟湰鍙蜂俊鎭�
                _this_1.setContext({
                    sr_sdk_version: _this_1.version
                }, 1);
                // 闈炲紑鍙戠幆澧冧笉妫€娴嬬増鏈�
                if (!_this_1.isDev())
                    { return; }
                var url = "https://mp.zhls.qq.com/sdk/sr-sdk-version-info.json?timesamp=" + Date.now();
                return _this_1.request({}, {
                    url: url,
                    method: 'GET',
                }).then(function (res) {
                    var info = (res.data || {})[_this_1.name];
                    var passed = true;
                    if (!info)
                        { return; }
                    if (_this_1.version) {
                        if (compareVersions(info.version.min, _this_1.version) === 1) {
                            console.error("\u5F53\u524DSDK\u7248\u672C\u8FC7\u4F4E, \u8BF7\u5347\u7EA7\uFF01");
                            passed = false;
                        }
                        else if (compareVersions(info.version.max, _this_1.version) === 1) {
                            console.warn("\u5F53\u524DSDK\u6709\u66F4\u65B0, \u63A8\u8350\u5347\u7EA7\uFF01");
                        }
                    }
                    return {
                        // success: res.statusCode === 0,
                        success: passed,
                        data: info,
                        msg: '',
                    };
                }).catch(function (e) {
                    if (e === void 0) { e = {}; }
                    return {
                        success: false,
                        data: undefined,
                        msg: e.errMsg
                    };
                });
            };
            this.queueInitialize = function () {
                var url = _this_1.getServerUrl();
                _this_1.queue = new Queue({
                    request: function (params) {
                        // const pageInfo: IPage = this.getPageInfo();
                        var events = params.events.map(function (evt) {
                            return __assign(__assign({}, evt), { 
                                // props: {
                                //   ...pageInfo,
                                //   ...evt.props,
                                // },
                                // name: 'sr', // 澶囬€夊悕绉�: wxBiSDK
                                from: 'sr-sdk-wxapp', tracking_id: _this_1.tracking_id, log_id: ++_this_1.log_id });
                        });
                        // set last track log
                        _this_1.setCache(CACHE_KEY.LOGID_EVENTS, {
                            last_tracking_id: _this_1.tracking_id,
                            last_max_log_id: _this_1.log_id
                        });
                        return _this_1.request(events, {
                            url: url,
                            method: 'POST',
                        }).catch(function (e) {
                            console.error('APICaller error', e);
                            if (e.msg === 'request:fail url not in domain list') {
                                // hack 涓嶅湪鍚堟硶鍩熷悕涓㈠純鎺夋暟鎹�
                                return __assign(__assign({}, e), { success: true });
                            }
                            return e;
                        });
                    },
                });
                return true;
            };
            this.trackLogEvents = function () {
                var logid_events = _this_1.getCache(CACHE_KEY.LOGID_EVENTS) || {};
                if (logid_events.last_max_log_id) {
                    _this_1.track('logid_events', logid_events);
                    return true;
                }
                else {
                    ++_this_1.log_id;
                }
                return false;
            };
            this.tracking_id = getUUID();
            this.log_id = -1;
            this.checkStaticMethods();
        }
        // ============================ 瀵瑰API ========================
        // API - 鍒濆鍖�
        SDK.prototype.init = function (option) {
            if (this.inited)
                { return this; }
            // inited鍚庣殑鍙傛暟涓庣紦瀛樹笉鍚屾椂杩涜鍙婃椂娓呯悊鍒囨崲
            var sr_info = wx.getStorageSync('__SR_SDK_TRACKER___production');
            var sr_appId = sr_info && sr_info.USER_INFO && sr_info.USER_INFO.app_id || '';
            if (sr_appId && sr_appId !== this.option.appid) {
                wx.removeStorageSync('__SR_SDK_TRACKER___production');
            }
            this.version = version || '';
            this.option = deepMerge(this.defaultOptions, this.option, option);
            // 濡傛灉寮€鍚痑utoProxy寮€鍏� 鍒欐墍鏈夎嚜鍔ㄤ唬鐞嗗崟渚嬪叏閮ㄥ紑鍚�
            if (option.autoProxy) {
                this.option.proxyComponent = true;
                this.option.proxyPage = true;
                this.option.openAutoTrackOpenId = true;
                this.option.openAutoTrackUnionId = true;
                this.option.autoTrack = true;
                this.option.openSdkShareDepth = true;
            }
            // 蹇呰閰嶇疆妫€鏌�
            if (!this.checkRequiredOptionItem())
                { return this; }
            this.cacheManagerInitialize();
            // 灏濊瘯浠ｇ悊
            try {
                this.proxyInitialize();
            }
            catch (error) {
                this.errorHandle(error);
            }
            // queue & upload
            this.queueInitialize();
            // 鑾峰彇鍩虹淇℃伅锛堥儴鍒嗗叕鍏变俊鎭級
            this.contextInitialize();
            this.inited = true;
            // 妫€鏌ョ増鏈俊鎭�
            this.checkVersionInfo();
            // 杩滅鎬婚厤缃紝浼樺厛绾ф渶楂�
            this.initRemoteConfig();
            // 闈炲紓姝ヤ唬鐞� wxapi
            this.hackAutoTrack();
            // 閿欒鐩戞帶
            if (this.option.openErrorMonitoring) {
                onError(this.track.bind(this));
            }
            return this;
        };
        // API - 鏁版嵁涓婃姤
        SDK.prototype.track = function (eventName, value) {
            // 濡傛灉杩滅鍏抽棴锛屽垯鏃犳硶track, 涓嶄笅鍙戝垯涓篺alse锛屾甯歌蛋鍘熸潵鐨則rack娴佺▼
            if (!this.remoteConfigInfo.masterSwitch) {
                return;
            }
            var debug = this.option.debug;
            // 瓒呭ぇ鍖呮娴�
            var warnSize = 5000;
            var dataSize = JSON.stringify(value || {}).length;
            if (dataSize > warnSize) {
                console.warn("\u76D1\u6D4B\u5230\u8D85\u8FC7" + warnSize + "\u7684\u4E0A\u62A5\u65E5\u5FD7\uFF1A" + eventName);
            }
            // 鏍煎紡鍖栦笂鎶ユ暟鎹�
            var eventData = this.eventDataFmatter(value);
            // 璋冭瘯鏃ュ織
            if (debug && console && typeof console.log === 'function') {
                console.log("\u3010Track\u3011 " + eventName, eventData);
            }
            this.queue.add({
                type: eventName,
                props: eventData
            });
            // 鍥犲寘鍚け璐ラ噸璇曟満鍒讹紝鎵€浠ユ瘡娆′笂鎶ュ嫎鏌ラ槦鍒椾笉鍙ぇ浜�100
            this.queue.checkQueue();
            // 姣忔涓婃姤鏃惰繘琛岄槦鍒楀垽鏂紝澶т簬绛変簬10鏃跺苟涓旂姸鎬佷负闈炴殏鍋滅姸鎬佹椂杩涜涓婃姤锛屽苟璺宠繃1绉掑贰妫€涓婃姤
            var stackLength = this.queue.getItems().length || 0;
            if (stackLength > 9 && this.reportState === REPORT_STATE.REPORTING) {
                this.flush();
            }
            else {
                this.triggerFlush(); // 澶氭涓婃姤鎵ц杩涜闃叉姈澶勭悊
            }
            return this;
        };
        // API - 璁剧疆鍏叡鍙橀噺 鈿狅笍鏃х敤娉曪紝寰呭簾寮�
        // 鎺ㄨ崘浣跨敤鏇寸粏鐨剆etUser setChan set**浠ｆ浛
        SDK.prototype.setContext = function (context, isSr, isFlush) {
            if (isSr === void 0) { isSr = 0; }
            if (isFlush === void 0) { isFlush = false; }
            console.warn('setContext 涓嶅湪鎺ㄨ崘浣跨敤锛岃鐢ㄦ洿杞讳究鐨� setUser銆乻etChan绛夋柟娉曚唬鏇�');
            if (isFlush) {
                this.flush();
            }
            // 涓嶅厑璁稿晢瀹跺皬绋嬪簭鑷畾涔変慨鏀圭増鏈彿
            if (context.sr_sdk_version !== undefined && isSr === 0) {
                delete context.sr_sdk_version;
            }
            // 绠€鍗曞鐞嗚閬挎祬merge鐨勯棶棰� =. =
            this.context = __assign(__assign(__assign({}, this.context), context), { wx_user: __assign(__assign({}, this.context.wx_user), (context.wx_user || {})), chan: __assign(__assign({}, this.context.chan), (context.chan || {})) });
            this.setIdenTifier({
                value: __assign({}, context),
                type: 'context',
                isSr: isSr,
            });
            return this;
        };
        // API - 璁剧疆鐢ㄦ埛淇℃伅 isSr榛樿鏄晢瀹朵紶閫�
        SDK.prototype.setUser = function (userInfo, isSr, isFlush) {
            if (userInfo === void 0) { userInfo = {}; }
            if (isSr === void 0) { isSr = 0; }
            if (isFlush === void 0) { isFlush = false; }
            if (isFlush) {
                this.flush();
            }
            this.context = Object.assign({}, this.context, {
                wx_user: __assign(__assign({}, this.context.wx_user), userInfo)
            });
            this.setIdenTifier({
                value: __assign({}, userInfo),
                type: 'user',
                isSr: isSr,
            });
            this.setCache(CACHE_KEY.USER_INFO, this.context.wx_user);
            return this;
        };
        // API - 璁剧疆娓犻亾淇℃伅 isSr榛樿鏄晢瀹朵紶閫�
        SDK.prototype.setChan = function (chanInfo, isSr, isFlush) {
            if (isSr === void 0) { isSr = 0; }
            if (isFlush === void 0) { isFlush = false; }
            if (isFlush) {
                this.flush();
            }
            var chan_id = chanInfo.chan_id;
            var _chan_id = (this.context.chan || {}).chan_id;
            this.context = Object.assign({}, this.context, {
                chan: __assign(__assign(__assign({}, this.context.chan), chanInfo), { chan_id: chan_id ? chan_id : (_chan_id || '') })
            });
            this.setIdenTifier({
                value: __assign({}, chanInfo),
                type: 'chan',
                isSr: isSr,
            });
            return this;
        };
        // API - 璁剧疆Component
        SDK.prototype.setComponent = function (component) {
            var component_id = component.component_id, component_name = component.component_name;
            this.context = Object.assign({}, this.context, {
                component: __assign(__assign({}, component), { component_id: component_id,
                    component_name: component_name })
            });
            return this;
        };
        // API - 璁剧疆Component
        SDK.prototype.clearComponent = function () {
            delete this.context.component;
            return this;
        };
        // API - 璁剧疆Component
        SDK.prototype.setActivityInfo = function (activity_info) {
            var activity_id = activity_info.activity_id, activity_name = activity_info.activity_name, activity_type = activity_info.activity_type, activity_index = activity_info.activity_index;
            this.context = Object.assign({}, this.context, {
                activity_info: __assign(__assign({}, activity_info), { activity_id: activity_id,
                    activity_name: activity_name,
                    activity_type: activity_type,
                    activity_index: activity_index })
            });
            return this;
        };
        // API - 璁剧疆Component
        SDK.prototype.clearActivityInfo = function () {
            delete this.context.activity_info;
            return this;
        };
        // API - 寮€濮嬩笂鎶�
        SDK.prototype.startReport = function () {
            this.reportState = REPORT_STATE.REPORTING;
            this.triggerFlush();
            return this;
        };
        // API - 鎭㈠涓婃姤
        SDK.prototype.resumeReport = function () {
            // 鎭㈠鏈湴缂撳瓨鐨勬棩蹇�
            var lastLogs = this.getCache(CACHE_KEY.TRACKS) || [];
            this.queue.unshift(lastLogs);
            if (this.reportState === REPORT_STATE.PAUSED) {
                this.reportState = REPORT_STATE.REPORTING;
            }
            this.triggerFlush();
            return this;
        };
        // API - 鏆傚仠涓婃姤
        SDK.prototype.pauseReport = function () {
            this.reportState = REPORT_STATE.PAUSED;
            this.setCache(CACHE_KEY.TRACKS, this.queue.clean());
            return this;
        };
        // API - 鎻愬彇闃熷垪涓殑浜嬩欢杩涜涓婃姤
        SDK.prototype.flush = function () {
            this.queue.flush(this.context, this.getCache(CACHE_KEY.IDENTIFIERUSER));
            return this;
        };
        // API - `fn`鍦ㄦ暟鎹繘鍏ョ紦瀛橀槦鍒楁椂瑙﹀彂銆傝繖涓嚱鏁板厑璁稿湪鏁版嵁鎺ㄥ叆缂撳瓨闃熷垪鏃跺鏁版嵁鍋氫竴浜涙敼閫�
        SDK.prototype.onQueue = function (handle) {
            this._onQueue = handle;
            return this;
        };
        // API - 鍚屾SDK鐘舵€佷笌鏁版嵁
        SDK.prototype.getInfo = function () {
            var srInfo = {
                option: this.option,
                tracking_id: this.tracking_id,
                context: this.context,
                is_dev: this.isDev(),
            };
            return "SR_SDK_INFO=" + base64$1.encode(JSON.stringify(srInfo));
        };
        // API - 鑾峰彇鍖垮悕ID
        SDK.prototype.getLocalId = function () {
            return this.context.wx_user.local_id || '';
        };
        // API - 鑾峰彇user
        SDK.prototype.getWxUserInfo = function () {
            return __assign({}, this.context.wx_user);
        };
        // API - 鑾峰彇chan
        SDK.prototype.getChanInfo = function () {
            return __assign({}, this.context.chan);
        };
        // API - 鑾峰彇Page
        SDK.prototype.getPagePathInfo = function () {
            return getCurrentPageUrlWithArgs() || '';
        };
        // ============================ 绉佹湁鏂规硶 ========================
        // 琛ュ厖 ts 鏃犳硶闄愬埗闈欐€佹柟娉曠殑瀹炵幇
        SDK.prototype.checkStaticMethods = function () {
            if (this.env !== 'development')
                { return; }
            try {
                var genCls_1 = this.constructor;
                var staticMethods = ['create'];
                staticMethods.forEach(function (a) {
                    !genCls_1[a] && console.error("static " + a + " should be implement");
                });
            }
            catch (error) {
                console.error('checkStaticMethods error', error);
            }
        };
        // 鍏滃簳閫昏緫锛�10绉掓鏌ヤ竴娆℃湰鍦版槸鍚︽湁闇€瑕佷笂鎶ョ殑鏁版嵁
        SDK.prototype.checkFallback = function () {
            var _this_1 = this;
            setTimeout(function () {
                _this_1.checkAndUpload();
                _this_1.checkFallback();
            }, 10000);
        };
        SDK.prototype.checkAndUpload = function () {
            if (this.reportState === REPORT_STATE.REPORTING)
                { this.flush(); }
        };
        SDK.prototype.contextInitialize = function () {
            var userInfo = this.getUser();
            var systemInfo = this.getSystemInfo();
            var brand = systemInfo.brand, model = systemInfo.model, version = systemInfo.version, environment = systemInfo.environment, screenWidth = systemInfo.screenWidth, screenHeight = systemInfo.screenHeight, system = systemInfo.system, platform = systemInfo.platform, SDKVersion = systemInfo.SDKVersion, benchmarkLevel = systemInfo.benchmarkLevel, locationReducedAccuracy = systemInfo.locationReducedAccuracy;
            var frameworkInfo = this.getFrameworkInfo();
            this.context = deepMerge(this.context, {
                // 鐢ㄦ埛閰嶇疆椤�
                // ...this.option,
                // ...systemInfo,
                // 鐢ㄦ埛妯″瀷
                // app_id 鏀惧埌涓嬮潰锛屽惁鍒欓噸缃笉鎴愬姛
                wx_user: __assign(__assign({}, userInfo), { app_id: this.option.appid }),
                // 绯荤粺淇℃伅锛屽彇鑷猤etSystemInfo锛� 鍏朵腑 environment 鐢ㄦ潵鍖哄垎鏉ヨ嚜浼佷笟寰俊杩樻槸寰俊
                system_info: {
                    brand: brand,
                    model: model,
                    version: version,
                    environment: environment,
                    screenWidth: screenWidth,
                    screenHeight: screenHeight,
                    system: system,
                    platform: platform,
                    SDKVersion: SDKVersion,
                    benchmarkLevel: benchmarkLevel,
                    LRA: locationReducedAccuracy
                },
                framework_info: frameworkInfo,
                // 娓犻亾妯″瀷
                chan: {},
            });
            // 鍒濆鍖栧叕鍏卞弬鏁版椂锛宎ppid涓€瀹氭槸鏈夋暟璧嬪€�
            this.setIdenTifier({
                value: { app_id: this.option.appid },
                type: 'user',
                isSr: 1
            });
        };
        // 閫氱敤鏇挎崲鎸囧畾浣嶇疆鐨勫瓧绗︿覆骞惰繑鍥�
        SDK.prototype.rleitrValue = function (itrString, index, char) {
            var strAry = itrString.split('');
            strAry[index] = char;
            return strAry.join('');
        };
        // 淇敼USER CHAN鏍囪瘑绗�
        SDK.prototype.setuserchanItr = function (value, type, isSr) {
            var _this_1 = this;
            var identifierUser = this.getCache(CACHE_KEY.IDENTIFIERUSER) || '-----'; // 璇诲彇鏈湴 鎴� 閲嶆柊鍒涘缓5浣島ser鏍囪瘑绗�
            Object.keys(value).forEach(function (item, idx) {
                if (type === 'user' && _this_1.idenTifierUserArr.indexOf(item) !== -1)
                    { _this_1.setCache(CACHE_KEY.IDENTIFIERUSER, _this_1.rleitrValue(identifierUser, _this_1.idenTifierUserArr.indexOf(item), isSr)); }
                if (type === 'chan' && _this_1.idenTifierChanArr.indexOf(item) !== -1)
                    { _this_1.context.idenTifier = _this_1.rleitrValue(_this_1.context.idenTifier, _this_1.idenTifierChanArr.indexOf(item), isSr); }
            });
        };
        SDK.prototype.setcontextItr = function (value, isSr) {
            if (value.wx_user)
                { this.setuserchanItr(__assign({}, value.wx_user), 'user', isSr); }
            if (value.chan)
                { this.setuserchanItr(__assign({}, value.chan), 'chan', isSr); }
            delete value.wx_user;
            delete value.chan;
            this.setuserchanItr(__assign({}, value), 'chan', isSr); // 鍏朵粬鍙傛暟 page title time绛変笌chan澶勭悊鐨勬柟寮忕浉鍚�
        };
        // 淇敼鏍囪瘑绗︽€绘柟娉�
        SDK.prototype.setIdenTifier = function (_a) {
            var value = _a.value, type = _a.type, isSr = _a.isSr;
            switch (type) {
                case 'context': // context鐗规畩澶勭悊
                    this.setcontextItr(value, isSr);
                    break;
                default: // setUser setChan 浣跨敤鍚屼竴绉嶆柟娉�
                    this.setuserchanItr(value, type, isSr);
                    break;
            }
        };
        // 鑾峰彇鍏叡鍙傛暟 user淇℃伅
        SDK.prototype.getUser = function () {
            var userInfo = this.context.wx_user || this.getCache(CACHE_KEY.USER_INFO) || {};
            // 濡傛灉娌℃湁鍒濆鍖栫殑锛屽垯鏂板缓
            // 2020.4.3 uuid鏂扮畻娉曚负50浣嶏紝
            if (!userInfo.local_id || userInfo.local_id.length !== 50) {
                userInfo = {
                    local_id: getUUID()
                };
                this.setIdenTifier({
                    value: __assign({}, userInfo),
                    type: 'user',
                    isSr: 1
                });
                this.setCache(CACHE_KEY.USER_INFO, userInfo);
            }
            return userInfo;
        };
        SDK.prototype.cacheManagerInitialize = function () {
            // const cache_prefix = `${this.env}_`;
            var m = this.getCacheManager();
            // m.prefix = cache_prefix
            this.cacheManager = m;
        };
        SDK.prototype.getCache = function (key) {
            if (!this.cacheManager) {
                console.error(ERROR.CACHE.MISS);
                return {};
            }
            var cacheInfo = this.cacheManager.get(CACHE_KEY.SDK) || {};
            return cacheInfo[key];
        };
        SDK.prototype.setCache = function (key, value) {
            var _a;
            if (!this.cacheManager) {
                console.error(ERROR.CACHE.MISS);
            }
            var cacheInfo = __assign(__assign({}, this.cacheManager.get(CACHE_KEY.SDK) || {}), (_a = {}, _a[key] = value, _a));
            this.cacheManager.set(CACHE_KEY.SDK, cacheInfo) || {};
        };
        SDK.prototype.getServerUrl = function () {
            var url = '';
            if (typeof this.option.serverUrl === 'function') {
                url = this.option.serverUrl.call(this);
            }
            else {
                url = this.option.serverUrl || 'https://zhls.qq.com/api/report';
            }
            url += "?token=" + this.option.token;
            return url;
        };
        SDK.prototype.getTrackingId = function () {
            return this.tracking_id;
        };
        __decorate([
            safeExecuable
        ], SDK.prototype, "init", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "track", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "setContext", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "setUser", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "setChan", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "setComponent", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "clearComponent", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "setActivityInfo", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "clearActivityInfo", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "startReport", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "resumeReport", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "pauseReport", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "flush", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "onQueue", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "getInfo", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "getLocalId", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "getWxUserInfo", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "getChanInfo", null);
        __decorate([
            safeExecuable,
            checkInitState
        ], SDK.prototype, "getPagePathInfo", null);
        return SDK;
    }());
    //# sourceMappingURL=index.js.map

    // 瀵筆age瀵硅薄鐨勭敓鍛藉懆鏈熷嚱鏁拌拷鍔犲姛鑳�
    function wrapHooks(options, hookKey, func, isAsync) {
        if (isAsync === void 0) { isAsync = false; }
        var originHook = options[hookKey];
        options[hookKey] = function () {
            var arguments$1 = arguments;

            var _this = this;
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments$1[_i];
            }
            var next = function () { return originHook && originHook.apply(_this, arg); };
            if (isAsync) {
                next = function () { return Promise.resolve().then(function () { return originHook.apply(_this, arg); }); };
            }
            return func.apply(this, __spreadArrays([next], arg));
        };
    }
    //# sourceMappingURL=proxy.js.map

    var noop = function () { };
    var VISITED_PAGES = {};
    // 鏈€鍚庤闂殑椤甸潰
    var last_visited_page = {};
    // 鑾峰彇褰撳墠鏃堕棿鎴�
    var getTime = function () { return (new Date()).getTime(); };
    function pageProxy(pageOptions, track, setChan, setContext, trackElementEvent, openSdkShareDepth) {
        // 鎵樼鍘熺敓閽╁瓙
        wrapHooks(pageOptions, 'onLoad', function (next, query) {
            next();
            this.lauchTime = getTime();
        });
        wrapHooks(pageOptions, 'onShow', function (next) {
            var _this = this;
            var report = function () {
                _this.showTime = getTime();
                // 鍏煎3绉峳oomid 鍐欐硶
                var room_id = getCurrentPageKey.call(_this, 'room_id') || getCurrentPageKey.call(_this, 'roomId') || getCurrentPageKey.call(_this, 'roomid');
                if (room_id) {
                    setChan({
                        room_id: room_id,
                    }, 1);
                }
                track("browse_wxapp_page", {
                    is_sdk_auto_track: true,
                    refer_page: last_visited_page.route,
                    is_newly_open: !VISITED_PAGES[_this.route],
                });
                VISITED_PAGES[_this.route] = true;
            };
            // 鏀寔async鐨勫啓娉曪紝绾犳璋冪敤 setTitle 鐨勬墽琛岄『搴�
            next().then(report).catch(report);
        }, true);
        wrapHooks(pageOptions, 'onHide', function (next) {
            next();
            // 0 閿欒鐘舵€�
            var stay_time = this.showTime ? (getTime() - this.showTime) : 0;
            stay_time = stay_time > 14400000 ? 0 : stay_time;
            // showTime 閲嶇疆涓�0 闃叉椤甸潰鍘嬫爤鍚庡娆¤Е鍙憃nUnload鏃讹紝 stay_time 杩囧ぇ
            this.showTime = 0;
            track("leave_wxapp_page", {
                is_sdk_auto_track: true,
                refer_page: last_visited_page.route,
                stay_time: stay_time
            });
            // 杩佺Щ鍒版鏇村悎鐞嗭紝绂诲紑鏃舵墠璧嬪€�
            last_visited_page = this;
            setContext({
                refer_page: this.route
            });
        });
        wrapHooks(pageOptions, 'onUnload', function (next) {
            next();
            // 0 閿欒鐘舵€�
            var stay_time = this.showTime ? (getTime() - this.showTime) : 0;
            stay_time = stay_time > 14400000 ? 0 : stay_time;
            track("leave_wxapp_page", {
                is_sdk_auto_track: true,
                refer_page: last_visited_page.route,
                stay_time: stay_time
            });
            // 杩佺Щ鍒版鏇村悎鐞嗭紝绂诲紑鏃舵墠璧嬪€�
            last_visited_page = this;
            setContext({
                refer_page: this.route
            });
        });
        wrapHooks(pageOptions, 'onPullDownRefresh', function (next) {
            next();
            track("page_pull_down_refresh", {
                is_sdk_auto_track: true,
            });
        });
        wrapHooks(pageOptions, 'onReachBottom', function (next) {
            next();
            track("page_reach_bottom", {
                is_sdk_auto_track: true,
            });
        });
        // 鍒嗕韩浜嬩欢
        if (typeof pageOptions.onShareAppMessage === 'function') {
            var originOnShareAppMessage_1 = pageOptions.onShareAppMessage || noop;
            pageOptions.onShareAppMessage = function (res) {
                if (res === void 0) { res = {}; }
                var shareInfo = originOnShareAppMessage_1.call(this, res) || {};
                try {
                    // 涓嶉厤缃畃ath锛岄粯璁ゆ槸褰撳墠璺緞
                    var path = shareInfo.path || getCurrentPageUrlWithArgs.call(this, 'share');
                    if (path.indexOf('?') === -1) {
                        path = path + '?';
                    }
                    else {
                        if (path.slice(-1) !== '&') {
                            path = path + '&';
                        }
                    }
                    var shareInfoSdk = void 0;
                    var txsr_share_info_sdk = void 0;
                    if (openSdkShareDepth) {
                        shareInfoSdk = getShareInfo();
                        txsr_share_info_sdk = JSON.parse(shareInfoSdk);
                        path = path + "txsrShareInfoSdk=" + encodeURIComponent(shareInfoSdk);
                    }
                    track('page_share_app_message', {
                        is_sdk_auto_track: true,
                        from_type: res.from || '鏈煡',
                        share_to: getShareToInfo(res.shareTarget),
                        share_path: path,
                        share_title: shareInfo.title,
                        share_image_url: shareInfo.imageUrl,
                        refer_page: last_visited_page.route,
                        txsr_share_info_sdk: txsr_share_info_sdk,
                    });
                    shareInfo.path = path;
                }
                catch (error) {
                    console.error('onShareAppMessage error', error);
                }
                return shareInfo;
            };
            // 澧炲姞鏈嬪弸鍦堟槸鍚﹀紑鍚殑鍒ゆ柇锛屼笉鍔犲垽鏂細瀵艰嚧缁欏皬绋嬪簭寮哄埗鎵撳紑鏈嬪弸鍦堝垎浜�
            if (typeof pageOptions.onShareTimeline === 'function') {
                var originonShareTimeline_1 = pageOptions.onShareTimeline || noop;
                pageOptions.onShareTimeline = function (res) {
                    if (res === void 0) { res = {}; }
                    var shareInfo = originonShareTimeline_1.call(this, res) || {};
                    try {
                        // 涓嶉厤缃畃ath锛岄粯璁ゆ槸褰撳墠璺緞
                        var path = shareInfo.path || getCurrentPageUrlWithArgs.call(this, 'share');
                        var query = shareInfo.query || '';
                        if (path.indexOf('?') === -1) {
                            path = path + '?';
                        }
                        else {
                            if (path.slice(-1) !== '&') {
                                path = path + '&';
                            }
                        }
                        var shareInfoSdk = void 0;
                        var txsr_share_info_sdk = void 0;
                        if (openSdkShareDepth) {
                            shareInfoSdk = getShareInfo();
                            txsr_share_info_sdk = JSON.parse(shareInfoSdk);
                            path = path + "txsrShareInfoSdk=" + encodeURIComponent(shareInfoSdk);
                        }
                        track('page_share_app_message', {
                            is_sdk_auto_track: true,
                            from_type: res.from || '鏈煡',
                            share_to: 'timeline',
                            query: query,
                            share_path: path,
                            share_title: shareInfo.title,
                            share_image_url: shareInfo.imageUrl,
                            refer_page: last_visited_page.route,
                            txsr_share_info_sdk: txsr_share_info_sdk,
                        });
                        shareInfo.path = path;
                    }
                    catch (error) {
                        console.error('onShareAppMessage error', error);
                    }
                    return shareInfo;
                };
            }
        }
        if (trackElementEvent) {
            // 鑾峰彇鐢ㄦ埛鑷畾涔夌殑鏂规硶
            Object.entries(pageOptions).filter(function (_a) {
                var key = _a[0], value = _a[1];
                return ![
                    'onLoad',
                    'onShow',
                    'onReady',
                    'onHide',
                    'onUnload',
                    'onPullDownRefresh',
                    'onReachBottom',
                    'onPageScroll',
                    'onShareAppMessage',
                    'onResize',
                    'onTabItemTap' ].includes(key);
            }).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                // 璺宠繃闈炲嚱鏁�
                if (typeof value !== 'function')
                    { return; }
                wrapHooks(pageOptions, key, function (next) {
                    var arguments$1 = arguments;

                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments$1[_i];
                    }
                    elementEventTrack.call(this, args, track, key);
                    return next();
                });
            });
        }
        return pageOptions;
    }
    var getPageProxy = (function (track, setChan, setContext, trackElementEvent, openSdkShareDepth) { return function (options) { return pageProxy(options, track, setChan, setContext, trackElementEvent, openSdkShareDepth); }; });
    //# sourceMappingURL=pagePorxy.js.map

    var noop$1 = function () { };
    var VISITED_PAGES$1 = {};
    // 鏈€鍚庤闂殑椤甸潰
    var last_visited_page$1 = {};
    // 鑾峰彇褰撳墠鏃堕棿鎾�
    var getTime$1 = function () { return (new Date()).getTime(); };
    function componentProxy(componentOptions, track, setChan, setContext, trackElementEvent, openSdkShareDepth) {
        try {
            componentOptions.methods = componentOptions.methods || {};
            wrapHooks(componentOptions.methods, 'onLoad', function (next, query) {
                next();
                this.lauchTime = getTime$1();
            });
            wrapHooks(componentOptions.methods, 'onShow', function (next) {
                var _this = this;
                var report = function () {
                    _this.showTime = getTime$1();
                    var room_id = getCurrentPageKey.call(_this, 'room_id') || getCurrentPageKey.call(_this, 'roomId') || getCurrentPageKey.call(_this, 'roomid');
                    if (room_id) {
                        setChan({
                            room_id: room_id,
                        }, 1);
                    }
                    track("browse_wxapp_page", {
                        is_sdk_auto_track: true,
                        refer_page: last_visited_page$1.route,
                        is_newly_open: !VISITED_PAGES$1[_this.route],
                    });
                    VISITED_PAGES$1[_this.route] = true;
                };
                // 鏀寔async鐨勫啓娉曪紝绾犳璋冪敤 setTitle 鐨勬墽琛岄『搴�
                next().then(report).catch(report);
            }, true);
            wrapHooks(componentOptions.methods, 'onUnload', function (next) {
                next();
                // 0 閿欒鐘舵€�
                var stay_time = this.showTime ? (getTime$1() - this.showTime) : 0;
                stay_time = stay_time > 14400000 ? 0 : stay_time;
                track("leave_wxapp_page", {
                    is_sdk_auto_track: true,
                    refer_page: last_visited_page$1.route,
                    stay_time: stay_time
                });
                // 杩佺Щ鍒版鏇村悎鐞嗭紝绂诲紑鏃舵墠璧嬪€�
                last_visited_page$1 = this;
                setContext({
                    refer_page: this.route
                });
            });
            wrapHooks(componentOptions.methods, 'onPullDownRefresh', function (next) {
                next();
                track("page_pull_down_refresh", {
                    is_sdk_auto_track: true
                });
            });
            wrapHooks(componentOptions.methods, 'onReachBottom', function (next) {
                next();
                track("page_reach_bottom", {
                    is_sdk_auto_track: true
                });
            });
            wrapHooks(componentOptions.methods, 'onHide', function (next) {
                next();
                // 0 閿欒鐘舵€�
                var stay_time = this.showTime ? (getTime$1() - this.showTime) : 0;
                stay_time = stay_time > 14400000 ? 0 : stay_time;
                // showTime 閲嶇疆涓�0 闃叉椤甸潰鍘嬫爤鍚庡娆¤Е鍙憃nUnload鏃讹紝 stay_time 杩囧ぇ
                this.showTime = 0;
                track("leave_wxapp_page", {
                    is_sdk_auto_track: true,
                    refer_page: last_visited_page$1.route,
                    stay_time: stay_time
                });
                // 杩佺Щ鍒版鏇村悎鐞嗭紝绂诲紑鏃舵墠璧嬪€�
                last_visited_page$1 = this;
                setContext({
                    refer_page: this.route
                });
            });
            // 鍒嗕韩浜嬩欢
            if (typeof componentOptions.methods.onShareAppMessage === 'function') {
                var originOnShareAppMessage_1 = componentOptions.methods.onShareAppMessage || noop$1;
                componentOptions.methods.onShareAppMessage = function (res) {
                    if (res === void 0) { res = {}; }
                    var shareInfo = originOnShareAppMessage_1.call(this, res) || {};
                    try {
                        // 涓嶉厤缃畃ath锛岄粯璁ゆ槸褰撳墠璺緞
                        var path = shareInfo.path || getCurrentPageUrlWithArgs.call(this, 'share');
                        if (path.indexOf('?') === -1) {
                            path = path + '?';
                        }
                        else {
                            if (path.slice(-1) !== '&') {
                                path = path + '&';
                            }
                        }
                        var shareInfoSdk = void 0;
                        var txsr_share_info_sdk = void 0;
                        if (openSdkShareDepth) {
                            shareInfoSdk = getShareInfo();
                            txsr_share_info_sdk = JSON.parse(shareInfoSdk);
                            path = path + "txsrShareInfoSdk=" + encodeURIComponent(shareInfoSdk);
                        }
                        track('page_share_app_message', {
                            is_sdk_auto_track: true,
                            from_type: res.from || '鏈煡',
                            share_to: 'friends',
                            share_path: path,
                            share_title: shareInfo.title,
                            share_image_url: shareInfo.imageUrl,
                            refer_page: last_visited_page$1.route,
                            txsr_share_info_sdk: txsr_share_info_sdk,
                        });
                        shareInfo.path = path;
                    }
                    catch (error) {
                        console.error('onShareAppMessage error', error);
                    }
                    return shareInfo;
                };
                // 澧炲姞鏈嬪弸鍦堟槸鍚﹀紑鍚殑鍒ゆ柇锛屼笉鍔犲垽鏂細瀵艰嚧缁欏皬绋嬪簭寮哄埗鎵撳紑鏈嬪弸鍦堝垎浜�
                if (typeof componentOptions.methods.onShareTimeline === 'function') {
                    var originonShareTimeline_1 = componentOptions.methods.onShareTimeline || noop$1;
                    componentOptions.methods.onShareTimeline = function (res) {
                        if (res === void 0) { res = {}; }
                        var shareInfo = originonShareTimeline_1.call(this, res) || {};
                        try {
                            // 涓嶉厤缃畃ath锛岄粯璁ゆ槸褰撳墠璺緞
                            var path = shareInfo.path || getCurrentPageUrlWithArgs.call(this, 'share');
                            var query = shareInfo.query || '';
                            if (path.indexOf('?') === -1) {
                                path = path + '?';
                            }
                            else {
                                if (path.slice(-1) !== '&') {
                                    path = path + '&';
                                }
                            }
                            var shareInfoSdk = void 0;
                            var txsr_share_info_sdk = void 0;
                            if (openSdkShareDepth) {
                                shareInfoSdk = getShareInfo();
                                txsr_share_info_sdk = JSON.parse(shareInfoSdk);
                                path = path + "txsrShareInfoSdk=" + encodeURIComponent(shareInfoSdk);
                            }
                            track('page_share_app_message', {
                                is_sdk_auto_track: true,
                                from_type: res.from || '鏈煡',
                                share_to: getShareToInfo(res.shareTarget),
                                share_path: path,
                                query: query,
                                share_title: shareInfo.title,
                                share_image_url: shareInfo.imageUrl,
                                refer_page: last_visited_page$1.route,
                                txsr_share_info_sdk: txsr_share_info_sdk,
                            });
                            shareInfo.path = path;
                        }
                        catch (error) {
                            console.error('onShareAppMessage error', error);
                        }
                        return shareInfo;
                    };
                }
            }
            // 鎵樼鎵€鏈夌殑methods
            if (componentOptions.methods && trackElementEvent) {
                Object.entries(componentOptions.methods).filter(function (_a) {
                    var key = _a[0], value = _a[1];
                    return ![
                        'onLoad',
                        'onShow',
                        'onReady',
                        'onHide',
                        'onUnload',
                        'onPullDownRefresh',
                        'onReachBottom',
                        'onPageScroll',
                        'onShareAppMessage',
                        'onResize',
                        'onTabItemTap',
                        'observer' ].includes(key);
                }).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    // 璺宠繃闈炲嚱鏁�
                    if (typeof value !== 'function')
                        { return; }
                    wrapHooks(componentOptions.methods, key, function (next) {
                        var arguments$1 = arguments;

                        var args = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            args[_i - 1] = arguments$1[_i];
                        }
                        elementEventTrack.call(this, args, track, key);
                        return next();
                    });
                });
            }
        }
        catch (error) {
            console.error('componentProxy error', error);
        }
        return componentOptions;
    }
    var getComponentProxy = (function (track, setChan, setContext, trackElementEvent, openSdkShareDepth) { return function (options) { return componentProxy(options, track, setChan, setContext, trackElementEvent, openSdkShareDepth); }; });
    //# sourceMappingURL=componentProxy.js.map

    var utf8Encodings = ["utf8", "utf-8", "unicode-1-1-utf-8"];
    function Text_Encoder(encoding) {
        if (utf8Encodings.indexOf(encoding) < 0 &&
            typeof encoding !== "undefined" &&
            encoding != null) {
            throw new RangeError("Invalid encoding type. Only utf-8 is supported");
        }
        else {
            this.encoding = "utf-8";
            this.encode = function (str) {
                if (typeof str !== "string") {
                    throw new TypeError("passed argument must be of tye string");
                }
                var binstr = unescape(encodeURIComponent(str)), arr = new Uint8Array(binstr.length);
                var split = binstr.split("");
                for (var i = 0; i < split.length; i++) {
                    arr[i] = split[i].charCodeAt(0);
                }
                return arr;
            };
        }
    }
    //# sourceMappingURL=text-encoder.js.map

    var initKey = function (key) {
        var S = new Uint8Array(256);
        for (var i = 0; i < 256; ++i) {
            S[i] = i;
        }
        var j = 0;
        var temp;
        for (var i = 0; i < 256; ++i) {
            j = (j + S[i] + key[i % key.length]) & 0xff;
            temp = S[i];
            S[i] = S[j];
            S[j] = temp;
        }
        return S;
    };
    var a = new Uint8Array(256);
    for (var i = 0; i < a.length; ++i) {
        a[i] = i;
    }
    var generatingOutput = function (input, key) {
        var inputLen = input.length;
        var output = new Uint8Array(inputLen);
        var i = 0;
        var j = 0;
        var temp;
        for (var index = 0; index < inputLen; ++index) {
            i = (i + 1) & 0xff;
            j = (j + key[i]) & 0xff;
            temp = key[i];
            key[i] = key[j];
            key[j] = temp;
            output[index] = input[index] ^ key[(key[i] + key[j]) & 0xff];
        }
        return output;
    };
    var encoder = new Text_Encoder('utf-8');
    function RC4() { }
    RC4.prototype.encrypt = function (data, key) {
        return generatingOutput(encoder.encode(data), initKey(encoder.encode(key)));
    };
    var rc4 = new RC4();
    //# sourceMappingURL=rc4.js.map

    var warnCache = {};
    var emptyPipe = function (a) { return a; };
    var Sdk$1 = getCurrentEnvironment();
    var MP_SDK = /** @class */ (function (_super) {
        __extends(MP_SDK, _super);
        function MP_SDK() {
            var _this_1 = _super.call(this) || this;
            _this_1.name = 'mp';
            _this_1.component = emptyPipe;
            _this_1.page = emptyPipe;
            _this_1.proxySetNavigation = function () {
                try {
                    var setNavigationBarTitle_1 = Sdk$1.setNavigationBarTitle;
                    Object.defineProperty(Sdk$1, 'setNavigationBarTitle', {
                        get: function () {
                            return function (option) {
                                if (option === void 0) { option = {}; }
                                try {
                                    // 杩欎釜鏂规硶鍦╨aunch鐨勬椂鍊欒繕鑾峰彇涓嶅埌椤甸潰锛屾墍浠ュ紓姝ュ鐞�
                                    var curPage = getCurrentPage();
                                    // 鍏煎澶勭悊锛屽畨鍗撴満鍨嬩笅璇ュ璞′负绌�
                                    // 濡傛灉鍏ㄥ眬閮芥槸閫氳繃 setNavigationBarTitle 瀹炵幇锛屽垯涓嶉渶瑕佸湪璁剧疆page.title绛夐厤缃�
                                    try {
                                        __wxConfig.page = __wxConfig.page || {};
                                    }
                                    catch (err) {
                                        console.error(err);
                                    }
                                    var curConfPage = __wxConfig.page[curPage.route + '.html'];
                                    if (curConfPage) {
                                        (curConfPage.window || {}).navigationBarTitleText = option.title;
                                    }
                                }
                                catch (error) { }
                                setNavigationBarTitle_1.call(this, option);
                            };
                        }
                    });
                }
                catch (error) {
                    console.warn('proxySetNavigation failed', error);
                }
            };
            _this_1.request = function (params, option) {
                try {
                    var onUploaded_1 = function (data) {
                        if (data === void 0) { data = {}; }
                        return data.code === 0;
                    };
                    if (typeof _this_1.option.onUploaded === 'function') {
                        onUploaded_1 = _this_1.option.onUploaded;
                    }
                    // 鏁版嵁鍔犲瘑
                    var uuid_1 = getUUID();
                    var outPut = rc4.encrypt(JSON.stringify(params), uuid_1);
                    var encryptParams_1 = base64.uint8ArrayToBase64(outPut);
                    return new Promise(function (resolve, reject) {
                        Sdk$1.request({
                            url: option.url,
                            method: option.method || 'POST',
                            data: encryptParams_1,
                            header: {
                                "Content-Type": "application/x-sr-encrypted",
                                "Content-Encrypting-Key": uuid_1
                            },
                            success: function (res) {
                                if (res === void 0) { res = {}; }
                                var _a = res.data, data = _a === void 0 ? {} : _a;
                                var resState = onUploaded_1(data);
                                resolve({
                                    success: resState === undefined ? true : resState,
                                    data: data.data || data,
                                    msg: data.errMsg
                                });
                            },
                            fail: function (e) {
                                reject({
                                    success: false,
                                    data: undefined,
                                    msg: e.errMsg
                                });
                            }
                        });
                    });
                }
                catch (error) {
                    console.log('sdk request error', error);
                }
            };
            _this_1.defaultOptions = {
                autoProxy: false,
                autoStart: true,
                debug: false,
                usePlugin: false,
                proxyPage: false,
                proxyComponent: false,
                autoTrack: false,
                trackApp: true,
                openSdkShareDepth: false,
                installFrom: '',
                openAutoTrackOpenId: false,
                openAutoTrackUnionId: false,
                openErrorMonitoring: false,
            };
            _this_1.proxySetNavigation();
            return _this_1;
        }
        MP_SDK.prototype.getCacheManager = function () {
            var prefix = "" + this.env;
            var getKey = function (key) { return key + "_" + prefix; };
            return {
                get: function (key) {
                    var result;
                    try {
                        result = Sdk$1.getStorageSync(getKey(key));
                    }
                    catch (error) {
                        console.error('CacheManager.get error', error);
                        return result;
                    }
                    return result;
                },
                set: function (key, value) {
                    var result = true;
                    try {
                        Sdk$1.setStorageSync(getKey(key), value);
                    }
                    catch (error) {
                        console.error('CacheManager.set error', error);
                        return false;
                    }
                    return result;
                },
            };
        };
        MP_SDK.prototype.proxyInitialize = function () {
            sr_sdk.options = this.option;
            // this.page = o => o
            // if (!this.option.usePlugin && this.option.proxyPage) {
            //   Page = (options: any) => {
            //     oldPage(_page((options)));
            //   }
            // } else {
            //   this.page = _page
            // }
            // if (!this.option.usePlugin && this.option.proxyComponent) {
            //   Component = (options: any) => {
            //     return oldComponent(this.component((options)));
            //   }
            // }
            this.trackApp();
            return true;
        };
        MP_SDK.prototype.trackApp = function () {
            var _this_1 = this;
            var launch = false;
            Sdk$1.onAppShow(function (options) {
                if (options === void 0) { options = {}; }
                var _a = (options), _b = _a.query, query = _b === void 0 ? {} : _b, path = _a.path, shareTicket = _a.shareTicket;
                var openSdkShareDepth = _this_1.option.openSdkShareDepth;
                var openAutoTrackOpenId = _this_1.option.openAutoTrackOpenId;
                var openAutoTrackUnionId = _this_1.option.openAutoTrackUnionId;
                var appid = _this_1.option.appid;
                var params = getQuery(query || {});
                var from_share_info = params.txsrShareInfoSdk || '{}';
                var _this = _this_1;
                if (params && JSON.stringify(params) !== '{}') {
                    var _url_1 = '?';
                    Object.entries(params).forEach(function (_a, i) {
                        var key = _a[0], value = _a[1];
                        _url_1 += (i === 0 ? '' : '&') + (key + "=" + value);
                    });
                    path += _url_1;
                }
                _this_1.setChan(__assign(__assign({}, params), { chan_wxapp_scene: options.scene, chan_refer_app_id: (options.referrerInfo || {}).appId }), 1);
                // FOR锛氬垏鎹㈠満鏅殑鏃跺€欙紝浼氳鐩栦负绌猴紝姣斿鏀粯
                if (params.chan_id) {
                    _this_1.setChan({
                        chan_id: params.chan_id,
                    }, 1);
                }
                // 浠� if (!launch)杩佺Щ鍑烘潵锛屾墍鏈塷nAppShow閮戒細閲嶇疆txsr_from_share_info
                if (openSdkShareDepth && from_share_info !== '{}') {
                    try {
                        _this_1.setUser({
                            txsr_from_share_info: JSON.parse(decodeURIComponent(from_share_info))
                        }, 1);
                    }
                    catch (error) { }
                }
                if (!launch) {
                    launch = true;
                    _this_1.option.trackApp && _this_1.track('app_launch', {
                        is_sdk_auto_track: true,
                        page: path,
                    });
                }
                var USER_INFO = _this_1.cacheManager.get(CACHE_KEY.SDK) || {};
                var _c = USER_INFO.USER_INFO || {}, _d = _c.open_id, open_id = _d === void 0 ? '' : _d, _e = _c.union_id, union_id = _e === void 0 ? '' : _e;
                if ((openAutoTrackOpenId && !open_id) || (openAutoTrackUnionId && !union_id)) {
                    try {
                        Sdk$1.login({
                            success: function (res) {
                                var code = res.code; //杩斿洖code
                                Sdk$1.request({
                                    url: 'https://zhls.qq.com/wxlogin/getOpenId?appid=' + appid + '&js_code=' + code,
                                    data: {},
                                    header: {
                                        'content-type': 'json'
                                    },
                                    success: function (res) {
                                        var _a = res.data, openId = _a.openId, _b = _a.unionId, unionId = _b === void 0 ? '' : _b;
                                        _this.setUser({
                                            open_id: openId,
                                            union_id: unionId
                                        }, 1);
                                        if (openSdkShareDepth && shareTicket && openId) {
                                            _this.getOpenGId(shareTicket, openId);
                                        }
                                    }
                                });
                            }
                        });
                    }
                    catch (error) {
                        _this_1.errorHandle(error);
                    }
                }
                // 濡傛灉鏈湴鏈夛紝骞朵笖寮€鍚簡瑁傚彉锛岀户缁姹俹penGid
                if (openSdkShareDepth && shareTicket && open_id) {
                    _this_1.getOpenGId(shareTicket, open_id);
                }
                _this_1.option.trackApp && _this_1.track('app_show', {
                    is_sdk_auto_track: true,
                    page: path,
                });
            });
            Sdk$1.onAppHide(function () {
                _this_1.option.trackApp && _this_1.track('exit_wxapp', {
                    is_sdk_auto_track: true,
                });
                // this.pauseReport();
            });
        };
        MP_SDK.prototype.getOpenGId = function (shareTicket, openId) {
            var appid = this.option.appid;
            var _this = this;
            Sdk$1.getShareInfo({
                shareTicket: shareTicket,
                success: function (res) {
                    var iv = res.iv, encryptedData = res.encryptedData;
                    Sdk$1.request({
                        url: "https://zhls.qq.com/wxlogin/convertData",
                        data: {
                            appid: appid,
                            openid: openId,
                            data: encryptedData,
                            iv: iv
                        },
                        header: {
                            'content-type': 'json'
                        },
                        success: function (res) {
                            var openGId = (res && res.data).openGId;
                            if (openGId) {
                                _this.setChan({
                                    openGId: openGId,
                                }, 1);
                            }
                        }
                    });
                },
                fail: function (res) { }
            });
        };
        MP_SDK.prototype.errorHandle = function (msg) {
            try {
                var ERROR_REPORTER = 'sdk api exec error';
                var url = this.getServerUrl();
                this.request({
                    type: ERROR_REPORTER,
                    props: {
                        sr_sdk_version: this.version,
                        system_info: this.getSystemInfo(),
                        framework_info: this.getFrameworkInfo(),
                        message: msg,
                        stack: msg,
                    }
                }, {
                    url: url,
                    method: 'POST',
                });
            }
            catch (error) {
                console.log('errorHandle error', error);
            }
        };
        MP_SDK.prototype.getSystemInfo = function () {
            try {
                return Sdk$1.getSystemInfoSync();
            }
            catch (error) {
                return {};
            }
        };
        MP_SDK.prototype.getFrameworkInfo = function () {
            var framework, version;
            try {
                if (process && process.env && process.env.TARO_ENV) {
                    framework = 'taro';
                }
                if (this.option.installFrom) {
                    // [1]framework [2]taro [3]uni-?app [4]chameleon [5]wepy [6]mpvue [8]version
                    var installFromReg = /^((taro)|(uni[\-]?app)|(chameleon)|(wepy)|(mpvue))(@v?([\S]*))?/g;
                    var installFrom = String(this.option.installFrom).toLowerCase();
                    var installFromExec = installFromReg.exec(installFrom);
                    if (installFromExec && installFromExec[1]) {
                        if (framework === 'taro' && installFromExec[2]) {
                            version = installFromExec[8];
                        }
                        else if (framework !== 'taro') {
                            version = installFromExec[8];
                            if (installFromExec[3]) {
                                framework = 'uni-app';
                            }
                            else {
                                framework = installFromExec[4] || installFromExec[5] || installFromExec[6] || 'unknown';
                            }
                        }
                    }
                }
            }
            catch (e) {
                framework = 'unknown';
            }
            return {
                framework: framework,
                version: version
            };
        };
        // 鑾峰彇椤甸潰鐨勫叕鍏卞睘鎬т俊鎭�
        MP_SDK.prototype.getPageInfo = function () {
            var pagePath = getCurrentPageUrlWithArgs();
            var curPage = getCurrentPage() || {};
            var _getPageTitle = getPageTitle;
            //  鏀寔 data 鍜屾湰韬睘鎬т笂璁剧疆 title锛屼紭鍏堝彇 data.title
            var _titleProp = (curPage.data || {}).title || curPage.title;
            try {
                if (_titleProp === undefined) {
                    if (pagePath && !warnCache[pagePath]) {
                        warnCache[pagePath] = true;
                        console.warn("\u9875\u9762[" + pagePath + "]\u6CA1\u6709\u5B9E\u73B0 title \u5C5E\u6027\uFF0C\u4F1A\u5BFC\u81F4\u90E8\u5206\u673A\u578B\u4E0B\u6536\u96C6\u4E0D\u5230\u9875\u9762\u6807\u9898!");
                    }
                }
                if (typeof _titleProp === 'string') {
                    _getPageTitle = function () { return _titleProp; };
                }
                if (typeof _titleProp === 'function') {
                    _getPageTitle = _titleProp;
                }
            }
            catch (error) {
                console.error('curPage.data.title 鎵ц閿欒', error);
            }
            return {
                page: pagePath,
                page_title: _titleProp || _getPageTitle(),
            };
        };
        MP_SDK.prototype.isDev = function () {
            return isDev();
        };
        MP_SDK.create = function () {
            // 鏈€濂界殑瀹炵幇搴旇鏄粺涓€鎵ц鍏ュ彛`sr.exec('init', {...})`锛屾殏鏃舵棤娉曟敼鍙樼敤鎴风殑浣跨敤鏂瑰紡
            var sr_sdk;
            try {
                sr_sdk = new MP_SDK();
            }
            catch (error) {
                sr_sdk = MP_SDK.prototype;
                console.error('new sr_sdk failed', error);
            }
            return sr_sdk;
        };
        return MP_SDK;
    }(SDK));
    var sr_sdk = MP_SDK.create();
    var oldPage = Page;
    var oldComponent = Component;
    Page = function (options) {
        if (sr_sdk.option.proxyPage) {
            var _page = getPageProxy(sr_sdk.track.bind(sr_sdk), sr_sdk.setChan.bind(sr_sdk), sr_sdk.setContext.bind(sr_sdk), sr_sdk.option.autoTrack, sr_sdk.option.openSdkShareDepth);
            oldPage(_page((options)));
        }
        else {
            oldPage(options);
        }
    };
    Component = function (options) {
        if (sr_sdk.option.proxyComponent) {
            var _component = getComponentProxy(sr_sdk.track.bind(sr_sdk), sr_sdk.setChan.bind(sr_sdk), sr_sdk.setContext.bind(sr_sdk), sr_sdk.option.autoTrack, sr_sdk.option.openSdkShareDepth);
            return oldComponent(_component((options)));
        }
        else {
            return oldComponent(options);
        }
    };
    //# sourceMappingURL=index.js.map

    return sr_sdk;

})));
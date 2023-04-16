module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1673492667628, function(require, module, exports) {
var __TEMP__ = require('./verifySigUtil');var signConfig = __TEMP__['signConfig'];var signProvider = __TEMP__['signProvider'];var verifySigUtil = __TEMP__['verifySigUtil'];
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var signUtil = exports.signUtil = {
    setProvider(provider) {
        Object.assign(signProvider, provider);
    },
    setConfig(config) {
        Object.assign(signConfig, config);
    },
    getServerKey() {
        return verifySigUtil.getServerKey();
    },
    getRequestBody(data, option) {
        return verifySigUtil.getSignData(data, option);
    }
};

}, function(modId) {var map = {"./verifySigUtil":1673492667629}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1673492667629, function(require, module, exports) {
var __TEMP__ = require('./uitls');var base64Decode = __TEMP__['base64Decode'];var encryptAES = __TEMP__['encryptAES'];var getStringValue = __TEMP__['getStringValue'];var p2Arry = __TEMP__['p2Arry'];
const VERIFY_SIG_KEY = 'VERIFY_SIG_KEY';
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var signProvider = exports.signProvider = {};
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var signConfig = exports.signConfig = {
    djEncrypt: 1,
    sv: 0,
    signNeedBody: 0,
    isGray: 0
};
/**
 *接口验签排序
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function genSignData(data, option) {
    // console.log('原始数据-----', data);
    const copyData = Object.assign({}, data);
    // console.log('拷贝数据-----', copyData);
    // const signNeedBody = copyData.signNeedBody;
    // functionId 和 signNeedBody 不参与验签
    delete copyData.functionId;
    delete copyData.signNeedBody; // 避免外面传入了
    let unordered = {};
    // signNeedBody ==1 ,body参与验签排序，否则按照线上规则处理
    if (option.signNeedBody) {
        try {
            let body = copyData.body;
            delete copyData.body;
            body = getStringValue(JSON.parse(body));
            body = body.substring(0, body.lastIndexOf('&'));
            unordered = Object.assign({}, copyData, { body: body });
        }
        catch (e) {
            unordered = copyData;
        }
    }
    else {
        unordered = copyData;
    }
    const ordered = {};
    // 按照接口入参的key进行排序
    Object.keys(unordered).sort().forEach(function (key) {
        if (key != 'functionId') {
            ordered[key] = unordered[key];
        }
    });
    // 取出value不等于空字符串的值
    const values = Object.values(ordered).filter(ele => {
        if (ele != '') {
            return ele;
        }
    });
    // console.log(values.join('&'));
    // SHA256加密
    const HmacSHA256 = require('crypto-js/hmac-sha256');
    const encHex = require('crypto-js/enc-hex');
    // const md5 = require('crypto-js/md5');
    const origin = values.join('&');
    // console.log("原始拼接串：", origin);
    // const md5Origin = option.version === 2 ? md5(origin).toString() : origin;
    // const signKey = option.version === 2 ? option.dynamicKey : signConfig.ks.v1;
    // console.log("md5 拼接串：", md5Origin);
    // console.log("确认一下key：", option.signKey);
    const hash = HmacSHA256(origin, option.signKey);
    const hashInHex = encHex.stringify(hash);
    // console.log("hashmac之后：", hashInHex)
    // console.log("=========================")
    return hashInHex;
};exports.genSignData = genSignData
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var verifySigUtil = exports.verifySigUtil = {
    /**
         * 是否走降级
         */
    degrade: false,
    /**
       * 正在获取key
       */
    getKeying: false,
    error: false,
    setItem(key) {
        var _a, _b;
        return (_b = (_a = signProvider.storage) === null || _a === void 0 ? void 0 : _a.setItem(VERIFY_SIG_KEY, key)) === null || _b === void 0 ? void 0 : _b.catch(() => { });
    },
    async getItem() {
        var _a;
        const itemStr = await ((_a = signProvider.storage) === null || _a === void 0 ? void 0 : _a.getItem(VERIFY_SIG_KEY));
        let item = itemStr;
        try {
            if (itemStr) {
                item = JSON.parse(itemStr);
            }
        }
        catch (error) {
            // console.log('getItemError')
        }
        return item;
    },
    /**
         * 获取用来加密报文的key
         */
    async getServerKey() {
        var _a, _b, _c;
        try {
            if (this.error || this.getKeying) {
                return { ing: this.getKeying };
            }
            this.getKeying = true;
            const url = `https://${(signProvider.domainKey === 'daojia' || signProvider.domainKey === '') ? '' : 'pre-'}ds.jddj.com/getds`;
            // const [error, resp] = await api_getImgGif().toArray();
            const [error, resp] = await p2Arry((_a = signProvider.api) === null || _a === void 0 ? void 0 : _a.call(signProvider, { type: 'GET', url, djEncrypt: 1 }));
            setTimeout(() => {
                this.getKeying = false;
            }, 0);
            if (error || resp.code != '0') {
                // 失败后，本次请求不再走新验签
                this.error = true;
                this.degrade = true;
                // // 本次直接降级老验签
                return { degrade: true };
            }
            this.degrade = false;
            const key = (_b = resp.result) === null || _b === void 0 ? void 0 : _b.k;
            const v = (_c = resp.result) === null || _c === void 0 ? void 0 : _c.v;
            // 获取成功了持久化到本地
            await this.setItem(JSON.stringify({ key, v }));
            return { key };
        }
        catch (error) {
            this.error = true;
            this.degrade = true;
            return { error };
        }
    },
    async getSignData(data, { sv: busiSv } = {}) {
        var _a;
        busiSv = (busiSv === undefined || busiSv === null) ? 1 : busiSv;
        const item = await this.getItem() || {};
        const sv = signConfig.sv; // 配置系统的开关
        const signNeedBody = signConfig.signNeedBody;
        const v = item.v || '';
        const oBak = { signNeedBody, functionId: data.functionId };
        //  加个兜底 ———— try catch 如果2级错误了，走1级兜底
        try {
            if (item.key && !this.degrade && sv == 1 && busiSv == 1 && !!signConfig.isGray) {
                const signKey = base64Decode(item.key);
                // console.log("=========================")
                // console.log("原始key:", item.key);
                // console.log("base64Decode Key:", signKey)
                if (data.v2) {
                    // 新增二级验签字段signV2，存放客户端指纹信息（设备基础信息+是否调试模式），AES加密后，提供服务端拦截识别
                    data.v2 = encryptAES(JSON.stringify(data.v2));
                }
                return {
                    sv: 1,
                    requestBody: Object.assign(data, {
                        signKeyV1: genSignData(data, { version: 2, signNeedBody, signKey }) + v
                    }, oBak)
                };
            }
        }
        catch (error) {
        }
        if (signConfig.isGray == 1 && sv == 1 && !!data.deviceId) { // 如果灰度命中且sv配置系统是开启状态，降级才更新key
            this.getServerKey();
        }
        return {
            sv: 0,
            requestBody: Object.assign(data, {
                signNeedBody,
                signKeyV1: genSignData(data, { version: 1, signNeedBody, signKey: (_a = signProvider.ks) === null || _a === void 0 ? void 0 : _a.v1 })
            }, oBak)
        };
    }
};

}, function(modId) { var map = {"./uitls":1673492667630}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1673492667630, function(require, module, exports) {
var __TEMP__ = require('crypto-js/core');var CryptoJSCore = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('crypto-js/aes');var AES = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('crypto-js/pad-pkcs7');var Pkcs7 = __REQUIRE_DEFAULT__(__TEMP__);
/**
 * 处理好promise，返回数组[error,value]
 * 当error是null时，表示promise返回正常
 * @param {Promise}} promise
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function p2Arry(promise) {
    if (!promise) {
        return [{ msg: 'Not a Promise!' }];
    }
    return promise.then(data => {
        return [null, data];
    }).catch(err => [err]);
};exports.p2Arry = p2Arry
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function getStringValue(data) {
    let stringValue = '';
    // 排序
    const oredered = {};
    Object.keys(data).sort().forEach(function (key) {
        oredered[key] = data[key];
    });
    // 遍历
    for (const i in oredered) {
        const value = oredered[i];
        if (Object.prototype.toString.call(value) === '[object Object]') {
            stringValue += (getStringValue(Object.prototype.toString.call(value) === '[object Object]' ? value : JSON.parse(value)));
        }
        else if (Object.prototype.toString.call(value) === '[object Array]') {
            value.map((item) => {
                if (Object.prototype.toString.call(item) === '[object Object]') {
                    stringValue += (getStringValue(Object.prototype.toString.call(item) === '[object Object]' ? item : JSON.parse(item)));
                }
                else {
                    if (!(item === '' || item === null || item === undefined)) {
                        stringValue += item + '&';
                    }
                }
            });
        }
        else {
            if (!(value === '' || value === null || value === undefined)) {
                stringValue += value + '&';
            }
        }
    }
    return stringValue;
};exports.getStringValue = getStringValue
const S_KEY = 'J@NcRfUjXn2r5u8x';
const S_PARAMETER = 't7w!z%C*F-JaNdRg';
/**
 * api 加密
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function encryptAES(data) {
    const CBCOptions = {
        iv: CryptoJSCore.enc.Utf8.parse(S_PARAMETER),
        mode: CryptoJSCore.mode.CBC,
        padding: Pkcs7
    };
    const key = CryptoJSCore.enc.Utf8.parse(S_KEY);
    const secretData = CryptoJSCore.enc.Utf8.parse(data);
    const encrypted = AES.encrypt(secretData, key, CBCOptions);
    return encrypted.toString();
};exports.encryptAES = encryptAES
/**
* api 解密
*/
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function decryptAES(data) {
    const CBCOptions = {
        iv: CryptoJSCore.enc.Utf8.parse(S_PARAMETER),
        mode: CryptoJSCore.mode.CBC,
        padding: Pkcs7
    };
    const key = CryptoJSCore.enc.Utf8.parse(S_KEY);
    const decrypt = AES.decrypt(data, key, CBCOptions);
    return CryptoJSCore.enc.Utf8.stringify(decrypt).toString();
};exports.decryptAES = decryptAES
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function base64Decode(key) {
    const decode = CryptoJSCore.enc.Base64.parse(key);
    return CryptoJSCore.enc.Utf8.stringify(decode);
};exports.base64Decode = base64Decode

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1673492667628);
})()
//miniprogram-npm-outsideDeps=["crypto-js/hmac-sha256","crypto-js/enc-hex","crypto-js/core","crypto-js/aes","crypto-js/pad-pkcs7"]
//# sourceMappingURL=index.js.map
module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1673492667625, function(require, module, exports) {
// 埋点库主入口
var __TEMP__ = require('./utils');var utils = __TEMP__['utils'];
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var DJMtaUtils = exports.DJMtaUtils = {
    proBasicParams: {},
    deviceBasicParams: {},
    epMap: [],
    epNum: 10,
    count: 0,
    dynamicFunc: function () { },
    customAjax: function () { },
    isCustomAjax: false,
    needEncrypt: false,
    getTime() {
        let now = new Date();
        let create_time = `${now.getFullYear()}-${now.getMonth() +
            1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
        return {
            //补充时间戳
            clienttime: new Date().getTime(),
            create_time: create_time
        };
    },
    /**
     *
     * @param proBasicParams
     * @param deviceBasicParams
     * @param dynamicFunc
     */
    init(proBasicParams, deviceBasicParams, dynamicFunc, customAjax) {
        // 校验项目基本信息传递是否完整
        utils.verifyProParams(proBasicParams);
        //校验设备基本信息传递是否完整
        utils.verifyDevParams(deviceBasicParams);
        //拿到初始的项目数据，将其保存到全局变量
        this.proBasicParams = proBasicParams;
        this.deviceBasicParams = deviceBasicParams;
        this.needEncrypt = proBasicParams.needEncrypt || false;
        if (proBasicParams.epAssignNum) {
            this.epNum = proBasicParams.epAssignNum;
        }
        this.dynamicFunc = dynamicFunc;
        if (customAjax && typeof customAjax == 'function') {
            this.isCustomAjax = true;
            this.customAjax = customAjax;
        }
    },
    // 上报PV埋点
    async sendPvData(firstLevelParams, ext_par, send_type) {
        //拿到一级参数，与全局参数进行拼接上报
        let data = Object.assign(firstLevelParams, this.proBasicParams, this.deviceBasicParams, { ext_par: ext_par });
        let params;
        if (!!this.dynamicFunc) {
            params = await this.dynamicFunc();
        }
        const method = !!this.isCustomAjax ? this.customAjax : utils.requestApi.bind(utils);
        method([Object.assign(data, params, this.getTime())], send_type || 'h5', this.needEncrypt);
    },
    // 上报点击埋点
    async sendClickData(firstLevelParams, ext_par, send_type) {
        if (!!firstLevelParams.click_id) {
            let data = Object.assign(firstLevelParams, this.proBasicParams, this.deviceBasicParams, { ext_par: ext_par, click_name: firstLevelParams.click_id });
            let params;
            if (!!this.dynamicFunc) {
                params = await this.dynamicFunc();
            }
            const method = !!this.isCustomAjax ? this.customAjax : utils.requestApi.bind(utils);
            method([Object.assign(data, params, this.getTime())], send_type || 'h5', this.needEncrypt);
        }
    },
    //上报实时曝光
    async sendSingleEpData(firstLevelParams, ext_par) {
        if (!!firstLevelParams.trace_id && !!firstLevelParams.ep) {
            let params;
            if (!!this.dynamicFunc) {
                params = await this.dynamicFunc();
            }
            let data = Object.assign(firstLevelParams, this.proBasicParams, this.deviceBasicParams, { ext_par: ext_par }, params, this.getTime());
            const method = !!this.isCustomAjax ? this.customAjax : utils.requestApi.bind(utils);
            method([data], 'show', this.needEncrypt);
        }
    },
    //聚合曝光
    async sendMultiEpData(firstLevelParams, ext_par) {
        if (!!firstLevelParams.trace_id && !!firstLevelParams.ep) {
            // 这里得有个逻辑在。聚合的逻辑
            const { trace_id, ep, cur_page } = firstLevelParams;
            const { pageId } = ext_par;
            //聚合一下其他的参数
            let params;
            if (!!this.dynamicFunc) {
                params = await this.dynamicFunc();
            }
            let extraData = Object.assign(firstLevelParams, this.proBasicParams, this.deviceBasicParams, { ext_par: ext_par }, params, this.getTime());
            let traceObj = this.epMap.find((value) => value.traceId == trace_id);
            if (traceObj) {
                const epList = traceObj === null || traceObj === void 0 ? void 0 : traceObj.ep;
                // 拿到traceObj的索引，用于从epMap中删除使用
                const startIndex = this.epMap.findIndex((item) => item.traceId == trace_id);
                // 如果有Useraction
                const curUserAction = epList.find((value) => value.spmId == ep);
                if (curUserAction) {
                    this.epMap[startIndex].ep.map((v) => {
                        if (v.spmId == ep) {
                            v.cnt++;
                        }
                    });
                }
                else {
                    this.epMap[startIndex].ep.push({ spmId: ep, cnt: 1 });
                    let uploadData = JSON.parse(JSON.stringify(this.epMap));
                    // epList.push({ spmId: userAction, cnt: 1 });
                    // 同一个traceid下的ep超过阈值，上报
                    //组合traceid进行上报；总共10条就上报
                    this.count++;
                    if (this.count >= this.epNum) {
                        //先删除epMap中对应的uploadData中的内容,,,,,这里怎么能把这些去除呢
                        uploadData.forEach((item) => {
                            var _a, _b;
                            //如果这个时候this.epMap发生变化了呢 怎么办？应该只删除对应的traceId下的10条
                            let delIndex = this.epMap.findIndex((item1) => item1.traceId == item.traceId);
                            let getEp = (_b = (_a = this === null || this === void 0 ? void 0 : this.epMap) === null || _a === void 0 ? void 0 : _a[delIndex]) === null || _b === void 0 ? void 0 : _b.ep;
                            // this.epMap.splice(delIndex, 1);
                            if ((getEp === null || getEp === void 0 ? void 0 : getEp.length) == this.epNum) {
                                this.epMap.splice(delIndex, 1);
                            }
                            else {
                                getEp === null || getEp === void 0 ? void 0 : getEp.splice(0, this.epNum - 1);
                            }
                        });
                        this.count = 0;
                        let joinData = [];
                        uploadData.forEach((epItem) => {
                            if (!epItem.traceId || (!epItem.ep || (!!epItem.ep && epItem.ep.length == 0)))
                                return true;
                            let newItem = JSON.parse(JSON.stringify(Object.assign(extraData, epItem)));
                            joinData.push(newItem);
                            return true;
                            // console.log('满足10：', epItem, extraData);
                        });
                        const method = !!this.isCustomAjax ? this.customAjax : utils.requestApi.bind(utils);
                        method(joinData, 'show', this.needEncrypt);
                        // //上报
                        // this.hasTime = false;
                        // DJMta.sendEpData({ epData: uploadData, cur_page: pageName, clientTime: this.clientTime });
                        uploadData = {};
                    }
                }
            }
            else {
                this.count++;
                //插入一条新的traceid
                this.epMap.push({
                    traceId: trace_id,
                    ep: [{ spmId: ep, cnt: 1 }],
                    cur_page: cur_page,
                    pageId: pageId
                });
                let uploadData = JSON.parse(JSON.stringify(this.epMap));
                if (this.count >= this.epNum) {
                    //先删除epMap中对应的uploadData中的内容,,,,,这里怎么能把这些去除呢
                    uploadData.forEach((item) => {
                        var _a, _b;
                        let delIndex = this.epMap.findIndex((item1) => item1.traceId == item.traceId);
                        // this.epMap.splice(delIndex, 1);
                        let getEp = (_b = (_a = this === null || this === void 0 ? void 0 : this.epMap) === null || _a === void 0 ? void 0 : _a[delIndex]) === null || _b === void 0 ? void 0 : _b.ep;
                        if ((getEp === null || getEp === void 0 ? void 0 : getEp.length) == this.epNum) {
                            this.epMap.splice(delIndex, 1);
                        }
                        else {
                            getEp === null || getEp === void 0 ? void 0 : getEp.splice(0, this.epNum - 1);
                        }
                    });
                    this.count = 0;
                    let joinData = [];
                    uploadData.forEach((epItem) => {
                        if (!epItem.traceId || (!epItem.ep || (!!epItem.ep && epItem.ep.length == 0)))
                            return true;
                        let newItem = JSON.parse(JSON.stringify(Object.assign(extraData, epItem)));
                        joinData.push(newItem);
                        return true;
                        // console.log('满足10：', epItem, extraData);
                    });
                    const method = !!this.isCustomAjax ? this.customAjax : utils.requestApi.bind(utils);
                    method(joinData, 'show', this.needEncrypt);
                    // //上报
                    // DJMta.sendEpData({ epData: uploadData, cur_page: pageName, clientTime: this.clientTime });
                    uploadData = {};
                }
            }
        }
    },
    // 上报曝光池中，所有的曝光埋点
    async sendAllEpData(firstLevelParams, ext_par) {
        if (this.epMap.length > 0) {
            let joinData = [];
            let uploadData = JSON.parse(JSON.stringify(this.epMap));
            let params;
            if (!!this.dynamicFunc) {
                params = await this.dynamicFunc();
            }
            let extraData = Object.assign(firstLevelParams, this.proBasicParams, this.deviceBasicParams, { ext_par: ext_par }, params, this.getTime());
            uploadData.forEach((epItem) => {
                if (!epItem.traceId || (!epItem.ep || (!!epItem.ep && epItem.ep.length == 0)))
                    return true;
                let newItem = JSON.parse(JSON.stringify(Object.assign(extraData, epItem)));
                if (newItem && newItem.pageId) {
                    newItem.ext_par.pageId = newItem.pageId;
                    delete newItem.pageId;
                }
                joinData.push(newItem);
                return true;
            });
            const method = !!this.isCustomAjax ? this.customAjax : utils.requestApi.bind(utils);
            method(joinData, 'show', this.needEncrypt);
            this.epMap = [];
            // 清除上一页的count
            this.count = 0;
        }
    },
    // 自定义埋点上报
    sendCustomData(firstLevelParams, ext_par, send_type) {
        const method = !!this.isCustomAjax ? this.customAjax : utils.requestApi.bind(utils);
        method(Object.assign(firstLevelParams, { ext_par: ext_par }), send_type, this.needEncrypt);
    },
    // 动态更新数据
    updateEncryptStatus(needEncrypt) {
        this.needEncrypt = needEncrypt;
    }
};

}, function(modId) {var map = {"./utils":1673492667626}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1673492667626, function(require, module, exports) {

var __TEMP__ = require('crypto-js/core');var CryptoJSCore = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('crypto-js/aes');var AES = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('crypto-js/pad-pkcs7');var Pkcs7 = __REQUIRE_DEFAULT__(__TEMP__);
const S_KEY = "J@NcRfUjXn2r5u8x";
const S_PARAMETER = "t7w!z%C*F-JaNdRg";
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var utils = exports.utils = {
    fetchUrl: 'https://log-o2o.jd.com/v1/logging',
    searchParams(params) {
        return Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&')
            .replace(/%20/g, '+');
    },
    // 验证项目基本信息
    verifyProParams(proBasicParams) {
        if (!('app_version' in proBasicParams)) {
            console.log('未定义版本号 - app_version！');
            return false;
        }
        if (!('app_name' in proBasicParams)) {
            console.log('未定义项目名称 - app_name！');
            return false;
        }
        if (!('plat_code' in proBasicParams)) {
            console.log('未定义平台类型 - plat_code');
            return false;
        }
        // if(!('channel_name' in proBasicParams)){
        //     console.log('未传入渠道名称 - channel_name');
        //     return false;
        // }
        return true;
    },
    // 验证设备的基本信息
    verifyDevParams(deviceBasicParams) {
        if (!('os' in deviceBasicParams)) {
            console.log('未定义操作系统 - os');
            return false;
        }
        if (!('device_id' in deviceBasicParams)) {
            console.log('未定义设备id - device_id');
            return false;
        }
        return true;
    },
    // 上报埋点
    requestApi(data, type, needEncrypt) {
        return new Promise((resolve, reject) => {
            if (data.length == 0) {
                reject();
            }
            const plainData = {
                logType: type || 'h5',
                json: JSON.stringify(data)
            };
            const encryptData = {
                logType: type || 'h5',
                json: encodeURIComponent(this.encrypt(JSON.stringify(data))),
                jef: 1
            };
            const body = !!needEncrypt ? encryptData : plainData;
            fetch(this.fetchUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: this.searchParams(body)
            })
                .then(response => {
                if (response === null || response === void 0 ? void 0 : response.ok) {
                    response.json().then(json => {
                        resolve(json);
                    });
                }
                else {
                    reject();
                }
            })
                .catch(() => {
                reject();
            });
        });
    },
    /**
 * api 加密
 */
    encrypt(data) {
        const CBCOptions = {
            iv: CryptoJSCore.enc.Utf8.parse(S_PARAMETER),
            mode: CryptoJSCore.mode.CBC,
            padding: Pkcs7
        };
        const key = CryptoJSCore.enc.Utf8.parse(S_KEY);
        const secretData = CryptoJSCore.enc.Utf8.parse(data);
        const encrypted = AES.encrypt(secretData, key, CBCOptions);
        return encrypted.toString();
    }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1673492667625);
})()
//miniprogram-npm-outsideDeps=["crypto-js/core","crypto-js/aes","crypto-js/pad-pkcs7"]
//# sourceMappingURL=index.js.map
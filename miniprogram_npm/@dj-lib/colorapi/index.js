module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1673492667621, function(require, module, exports) {
//@ts-ignore
var __TEMP__ = require('@legos/js-security-jdxcx');var ParamsSign = __REQUIRE_DEFAULT__(__TEMP__);
var __TEMP__ = require('./util');var ColorParams = __TEMP__['ColorParams'];var ColorHeader = __TEMP__['ColorHeader'];
// 获取ptkey
let plugin = requirePlugin("loginPlugin");
let pt_key = plugin.getPtKey() || '';
const sign = {
    instance: null,
    init: () => {
        sign.instance = null;
    },
    genSign: () => {
        if (sign.instance !== null) {
            return sign.instance;
        }
        sign.instance = new ParamsSign({
            appId: "dj_mini",
            debug: true,
            preRequest: false,
            onSign: ({ code = "" }) => {
                // 0: 成功
                // 1: 参数错误
                // 2: 缺少appId
                // 3: 获取token失败
                // 4: 签名失败
                //- 1: 其他错误
                console.log('onSign', code);
            },
            onRequestTokenRemotely: ({ code = "", message = "" }) => {
                // 200: 请求成功，表示动态算法接口请求成功，获取到动态token
                // 其他: 请求失败
                console.log('onRequestTokenRemotely:', code, message);
            },
            onRequestToken: ({ code = "", message = "" }) => {
                // 0: 动态token
                // 1: 本地token
                console.log('onRequestToken', code, message);
            }
        });
        return sign.instance;
    },
};
// request参数 pt_key传入
const api = (options) => {
    return new Promise(async (resolve, reject) => {
        // 获取全局变量
        let app = getApp();
        let globalData = app.globalData;
        // 获取地址信息
        let cityId = '';
        let lat = '';
        let lng = '';
        let addressInfo = wx.getStorageSync('address_info');
        if (addressInfo && addressInfo.cityId) {
            cityId = addressInfo.cityId || "";
            lat = addressInfo.latitude || "";
            lng = addressInfo.longitude || "";
        }
        else {
            addressInfo = app.globalData.addressInfo || {};
            if (addressInfo.cityId) {
                cityId = addressInfo.cityId || "";
                lat = addressInfo.latitude || "";
                lng = addressInfo.longitude || "";
            }
        }
        // 登录信息
        let loginInfo = wx.getStorageSync('login_info') || {};
        let o2o_m_h5_sid = loginInfo.o2o_m_h5_sid || '';
        let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || '';
        let deviceid_pdj_jd = getUUIDMD5();
        // 获取真实地址
        let realTimeLocation = {
            latitude: '',
            longitude: ''
        };
        try {
            realTimeLocation = wx.getStorageSync('realTimeLocation');
        }
        catch (e) {
            /**/
        }
        // 渠道号
        let business = globalData.qrcode && globalData.qrcode.business + '' || '';
        let channelCode = globalData.channelCode || '';
        //默认参数data字段
        let data = {
            channel: globalData.config.channel,
            platform: 6,
            platCode: globalData.config.platCode,
            mpChannel: "wx_xcx",
            appVersion: options.appVersion || globalData.config.platform,
            xcxVersion: options.xcxVersion || globalData.config.xcxVersion,
            appName: globalData.config.appName,
            functionId: options.functionId,
            body: JSON.stringify(options.body) || "",
            afsImg: options.afsImg || "",
            lat_pos: realTimeLocation.latitude || "",
            lng_pos: realTimeLocation.longitude || "",
            lat: lat,
            lng: lng,
            city_id: cityId,
            deviceToken: getUUIDMD5(),
            deviceId: getUUIDMD5(),
            deviceModel: "appmodel",
            business: business,
            traceId: getrandom() + Date.now(),
            channelCode: channelCode,
            pageId: options.pageId || '',
            appid: "dj_mini",
            t: (new Date()).getTime(),
            loginType: 12
        };
        // 合并参数
        const colorParams = {
            ...data, ...options
        };
        if (typeof (colorParams.body) != 'string') {
            // body 字符串化
            colorParams.body = JSON.stringify(colorParams.body);
        }
        // 处理入参字段
        const params = ColorParams(colorParams);
        // 开始处理header
        // cookie
        let cookieStr = 'cart_uuid=' + getUUIDMD5() + '; pt_key=' + (pt_key || options.pt_key) + '; o2o_m_h5_sid=' + o2o_m_h5_sid + '; deviceid_pdj_jd=' + deviceid_pdj_jd + '; PDJ_H5_PIN=' + PDJ_H5_PIN;
        let headers = {
            Cookie: cookieStr,
            sid: app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid || '',
            type: 'application/x-www-form-urlencoded'
        };
        // 处理header字段
        let header = ColorHeader(headers);
        const colorMap = {
            "1": 'api.m.jd.com',
            "3": 'beta-api.m.jd.com',
            "2": 'beta-api2.m.jd.com',
            "4": 'beta-api3.m.jd.com',
        };
        const envVersionIndex = wx.getStorageSync('envVersionIndex') || "1";
        //请求url
        const url = `https://${colorMap[envVersionIndex]}/client.action?appid=${params.appid}&functionId=${options.functionId}`;
        //请求方法
        const method = options.method || 'GET'; //https://beta-api.m.jd.com https://test-api.m.jd.com
        // 删除多余字段
        delete params.method;
        delete params.pt_key;
        console.log('========');
        console.log('header', header);
        console.log('params', params);
        console.log('url', url);
        console.log('method', method);
        //需要验签
        if (options.sign) {
            //构造加签参数
            // 前端参数一定要去空处理。null和空字符串都不能参与签名
            try {
                const paramsSign = {
                    functionId: params.functionId,
                    appid: params.appid,
                    appVersion: params.clientVersion,
                    client: params.client,
                    t: params.t,
                    body: params.body,
                };
                const instance = sign.genSign() || {};
                //@ts-ignore 
                const signedParams = await instance.sign(paramsSign);
                params.h5st = encodeURI(signedParams.h5st);
                // 验签后请求接口
                wx.request({
                    url: url,
                    data: params,
                    method: method,
                    header: header,
                    success: (result) => {
                        if (result.statusCode == 200) {
                            const { data } = result;
                            if (data && data.code == '0') {
                                resolve(result);
                            }
                            else {
                                // 被color拦截住
                                if (data.echo) {
                                    data.msg = data.echo;
                                    resolve(result);
                                }
                                else { // 业务后端返回
                                    if (data.code == '201' || data.code == '202') { // 未登录拦截
                                        globalData.loginStateInfo = {};
                                        try {
                                            wx.setStorageSync("login_info", {});
                                        }
                                        catch (e) {
                                            console.log(e);
                                        }
                                        wx.navigateTo({
                                            url: `/pages/newLogin/login/login`,
                                            complete: () => {
                                                app.globalData.reLogin = false;
                                            },
                                            buried_position: "colorapi"
                                        });
                                    }
                                    resolve(result);
                                }
                            }
                        }
                        else {
                            // 非200
                            resolve(result);
                        }
                    },
                    fail: (err) => {
                        reject(err);
                    }
                });
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            // 不需要验签请求接口
            wx.request({
                url: url,
                data: params,
                method: method,
                header: header,
                success: (result) => {
                    result.isColor = 1;
                    if (result.statusCode == 200) {
                        const { data } = result;
                        if (data && data.code == '0') {
                            resolve(result);
                        }
                        else {
                            // 被color拦截住
                            if (data.echo) {
                                data.msg = data.echo;
                                reject(result);
                            }
                            else { // 业务后端返回
                                if (params.isNeedDealError) {
                                    resolve(result);
                                }
                                if (data.code == '201' || data.code == '202') { // 未登录拦截
                                    globalData.loginStateInfo = {};
                                    try {
                                        wx.setStorageSync("login_info", {});
                                    }
                                    catch (e) {
                                        console.log(e);
                                    }
                                    wx.navigateTo({
                                        url: `/pages/newLogin/login/login`,
                                        complete: () => {
                                            app.globalData.reLogin = false;
                                        },
                                        buried_position: "colorapi"
                                    });
                                }
                                reject(result);
                            }
                        }
                    }
                    else {
                        // 非200
                        reject(result);
                    }
                },
                fail: (err) => {
                    reject({ ...err, isColor: 1 });
                }
            });
        }
    });
};
// 发出请求
// function wxRequest(url: string, params: any, method: 'GET'|'POST', header: Object) {
//   return new Promise((resolve, reject) => {
//     wx.request({
//       url: url,
//       data: params,
//       method: method,
//       header: header,
//       success: (result: resultObj<dataObj>) => {
//         if (result.statusCode == 200) {
//           const { data } = result;
//           if (data && data.code == '0') {
//             resolve(result);
//           } else {
//             // 被color拦截住
//             if (data.echo) {
//               data.msg = data.echo;
//               resolve(result);
//             } else { // 业务后端返回
//               if (data.code == '201' || data.code == '202') { // 未登录拦截
//                 globalData.loginStateInfo = {};
//                 try {
//                   wx.setStorageSync("login_info", {});
//                 }
//                 catch (e) {
//                   console.log(e);
//                 }
//                 wx.navigateTo({
//                   url: `/pages/newLogin/login/login`,
//                   complete: () => {
//                     app.globalData.reLogin = false;
//                   },
//                   buried_position: "colorapi"
//                 });
//               }
//               resolve(result);
//             }
//           }
//         } else {
//           // 非200
//           resolve(result);
//         }
//       },
//       fail: (err) => {
//         reject(err);
//       }
//     });
//   })
// }
function getUUIDMD5() {
    let app = getApp();
    let uuId = app.globalData.uuId;
    if (!uuId) {
        uuId = wx.getStorageSync("uuId");
    }
    if (!uuId) {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = s[19] && hexDigits.substr((0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        uuId = s.join("");
        app.globalData.uuId = uuId;
        wx.setStorageSync("uuId", uuId);
    }
    return uuId;
}
function getrandom() {
    let uuId;
    let s = [];
    let hexDigits = "0123456789abcdefghkhijklmn";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = s[19] && hexDigits.substr((0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    uuId = s.join("");
    return uuId;
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });exports.default = api;

}, function(modId) {var map = {"./util":1673492667622}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1673492667622, function(require, module, exports) {
// 映射color参数
const mapping = {
    // appVersion: 'clientVersion',
    deviceId: 'uuid',
    platCode: 'client',
    platVersion: 'osVersion',
    channel: 'partner',
    buildVersion: 'build',
    brand: 'd_brand',
    deviceModel: 'd_model'
};
// 处理映射color字段
function switchParams(params) {
    // 组装params
    const assembleObj = {};
    for (let key in params) {
        const _key = key;
        if (_key in mapping) {
            assembleObj[mapping[_key]] = params[_key];
        }
        else {
            assembleObj[_key] = params[_key];
        }
    }
    return assembleObj;
}
// 处理params 入参
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function ColorParams(params) {
    // 处理传入字段
    let data = switchParams(params);
    data.source = data.client;
    data.clientVersion = data.appVersion;
    return data;
};exports.ColorParams = ColorParams
// 处理header
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function ColorHeader(headers) {
    //自定义header
    const header = {
        'content-type': headers.type,
        Cookie: headers.Cookie,
        sid: headers.sid
    };
    return header;
};exports.ColorHeader = ColorHeader

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1673492667621);
})()
//miniprogram-npm-outsideDeps=["@legos/js-security-jdxcx"]
//# sourceMappingURL=index.js.map
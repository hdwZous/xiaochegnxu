/* eslint-disable camelcase */
import util from './util'
import functionId from './functionId'
import { clickBuriedV2_ } from "./BI";
import { encrypt } from './aes.utils'
import { encryptRsa } from './index.weapp.js'
import { request as request1 } from './api.v1';
import { request as request2} from './api.v2';

let plugin = requirePlugin("loginPlugin");
// import weappApi from './color.js'
import checkColor, { checkNewColor } from './colorFunctionId'
// color库
import weappApi from './../../miniprogram_npm/@dj-lib/colorapi/index'
// import {isLogin, request as request3, getLocation, LOGIN_INFO} from './../../miniprogram_npm/@dj-lib/dj-base-lib/index'
// isLogin().then(res => {
//   console.log('已登录', res)
// }).catch(e => {
//   console.log('未登录', e)
// })
// request3
// getLocation()
// LOGIN_INFO
/**
 * 网络请求
 * @param params
 */
let apiColorWx = function (params) {
  return new Promise((resolve) => {
    weappApi(params)
      .then(res => {
        resolve(res)
      }).catch(err => {
        // color网关拦截上报埋点
        console.log('color网关拦截上报埋点');
        if (err.data && err.data.echo) {
          clickBuriedV2_({
            click_id: 'spclError_color',
            click_par: {
              functionId: params.functionId,
              code: err.data && err.data.code,
              echo: err.data && err.data.echo
            },
            currentPageName: params.preObj.currentPageName
          })
        }
      })
  })
}
export function request (params) {
  // 异步拉取动态key
  let KEY = wx.getStorageSync('VERIFY_SIG_KEY') || null
  // console.error('当前的key:',KEY)
  // 异步拉取开关
  let SWITCH_SV2 = wx.getStorageSync('SWITCH_SV2') || null
  // 验签2开关开启  且 有key则走老的
  let v2 = SWITCH_SV2 && KEY
  // 获取color开关
  let colorSwitch = wx.getStorageSync('colorSwitch');
  // 是否在color白名单中 || 828新color接口
  if(checkColor(params.functionId) && colorSwitch == '1' || checkNewColor(params.functionId)) {
    let pt_key = plugin.getPtKey() || '';
    params.pt_key = pt_key
    params.functionId = checkColor(params.functionId) || params.functionId
    // color
    try {
      return apiColorWx(params)
    } catch(e) {
      console.log('api' + e);
    }
  } else {
    if (v2) {
      return request2(params)
    } else {
      return request1(params)
    }
  }
}
/**
 * AB test 更新
 */
// function upDateAB(data) {
//   let app = getApp();
//   //
//   // let testTag = app.globalData.testtag;
//   // let flag = true;
//   // data[0].startTime = Date.now();
//   // if(testTag.length>0) {
//   //     testTag.forEach((item, index) => {
//   //         if(item.experimentName === data[0].experimentName) {
//   //             testTag.splice(index, 1, data[0]);
//   //             flag = false
//   //         }
//   //     })
//   // }
//   // if(flag) {
//   //     testTag.push(data[0])
//   // }
//   // app.globalData.testtag = testTag

//   try {
//     let testTag = app.globalData.testtag || [];
//     //如果传递过来的是数组
//     if (data instanceof Array) {
//       data.forEach((arr) => {
//         let flag = true;
//         arr.startTime = Date.now();
//         testTag.forEach((item, index) => {
//           if (item.experimentName === arr.experimentName) {
//             testTag.splice(index, 1, arr);
//             flag = false
//           }
//         })
//         if (flag) {
//           testTag.push(arr)
//         }
//       })
//       //如果是单个对象
//     } else if (data && data.experimentName) {
//       let temp = data || {};
//       let flag = true;
//       temp.startTime = Date.now();
//       testTag.forEach((item, index) => {
//         if (item.experimentName === temp.experimentName) {
//           testTag.splice(index, 1, temp);
//           flag = false
//         }
//       })
//       if (flag) {
//         testTag.push(temp)
//       }
//     }
//     app.globalData.testtag = testTag
//   } catch (e) {
//     // console.error(e)
//   }
// }

/**
 * 埋点上报-判断是否是新用户-老的
 * @param isNew
 */
export function requestUserBuried (isNew) {
  let app = getApp();
  let func_par = {
    "orgcode": app.globalData.qrcode.orgcode,
    "type": app.globalData.qrcode.type,
    "storeid": app.globalData.qrcode.storeid,
    "isnew": isNew,
    "scene": app.globalData.scene.scene,
    "deviceid": util.getUUIDMD5(),
    "city": app.globalData.qrcode.city,
    "materiel": app.globalData.qrcode.materiel,
    "business": app.globalData.qrcode.business
  };
  let funtionId = "xapp/login2";
  requestBuried(funtionId, func_par)
}

/**
 * 埋点上报-老的
 * @param functionId
 * @param func_par
 */
export function requestBuried (functionId, func_par) {
  let app = getApp();
  let globalData = app.globalData;
  let body = [{
    "appName": "paidaojia",
    "appVersion": globalData.config.platform,
    "channel": "wx_xcx",
    "func_id": functionId,
    "func_par": func_par,
    "platCode": "wx_xcx",
    "platVersion": "5.6.8",
    "req_tm": new Date().getTime(),
    "u_id": app.globalData.loginStateInfo.PDJ_H5_PIN
  }];
  let is_djencryptFlag_log = null;
  try {
    is_djencryptFlag_log = wx.getStorageSync('djencryptFlag_log')
    if (!is_djencryptFlag_log) {
      is_djencryptFlag_log = 'success'
    }
  } catch (e) {
    /**/
  }
  let sendData = is_djencryptFlag_log == 'success' ? {
    "logType": "api",
    // "json": JSON.stringify(body),
    "json": encodeURIComponent(encrypt(JSON.stringify(body))),
    "jef": 1
  } : {
    "logType": "api",
    "json": JSON.stringify(body)
  };

  // let sendData =
  //     "logType": "api",
  //     "json":encodeURIComponent(encrypt(JSON.stringify(body))),
  //     "jef":1
  // }
  let reaquest = {
    url: globalData.config.buriedUrl,
    data: sendData,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': 'cart_uuid=' + util.getUUIDMD5(),
      'sid': app.globalData.loginStateInfo.o2o_m_h5_sid || ''
    },

    success: function (res) {
      if (res.data.code == 0) {
        if (is_djencryptFlag_log == 'nosuccess') {
          wx.setStorageSync('djencryptFlag_log', 'success')
        }
      }
      // 接口加密传输失败，降级明文传输
      if (res.data.code == 110) {
        // 接口没有请求成功，设置加密传输flag
        wx.setStorageSync('djencryptFlag_log', 'nosuccess')
        let reaquest_second = {
          url: globalData.config.buriedUrl,
          data: {
            "logType": "api",
            "json": JSON.stringify(body)
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': 'cart_uuid=' + util.getUUIDMD5(),
            'sid': app.globalData.loginStateInfo.o2o_m_h5_sid || ''
          },

          success: function (res) {
            // 接口加密传输失败，降级明文传输
            if (res.data.code == 110) {
              // 接口没有请求成功，设置加密传输flag
              wx.setStorageSync('djencryptFlag_log', 'nosuccess')
            }
          },
          fail: function () {

          },
          complete: function () {

          }
        };
        wx.request(reaquest_second)
      }
    },
    fail: function () {

    },
    complete: function () {

    }
  };
  wx.request(reaquest)
}

/**
 * 截图上报
 * @param params
 */
export function onCaptureScreen (params = {}, buried = {}) {
  wx.onUserCaptureScreen(() => {
    const dataJson = JSON.stringify({
      pageName: buried.currentPageName || '',
      ...params
    })
    request({
      ...functionId.reportScreenshot,
      method: 'post',
      isNeedDealError: true,
      body: {
        dataJson: encryptRsa(dataJson)
      }
    })
    clickBuriedV2_({
      click_id: "clickScreenshot",
      click_par: {
        ...params
      },
      currentPageName: buried.currentPageName || '',
      prePageName: buried.prePageName || '',
      pageId: buried.pageIdFirstPage || ''
    });
  })
}
export function offCaptureScreen () {
  wx.offUserCaptureScreen()
}

module.exports = {
  request: request,
  FNIDS: functionId,
  requestUserBuried: requestUserBuried,
  requestBuried: requestBuried,
  onCaptureScreen,
  offCaptureScreen
};


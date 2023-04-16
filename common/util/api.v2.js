/* eslint-disable */
import util from './util'
import mp from './wxapi'
import { getSignData, refreshKey } from "./sign.v2"
import {clickBuriedV2_} from "./BI"
// eslint-disable-next-line no-undef
let plugin = requirePlugin("loginPlugin");
import { encrypt } from './aes.utils'
import { addFilterMsg } from './wxLog'
let is_djencryptFlag = null;
//拼接明文请求参数
async function makeRequestParam(params, ver = 1) {
  let app = getApp();
  let globalData = app.globalData;
  // 城市ID
  let cityId = '';
  let lat = '';
  let lng = '';
  let addressInfo = wx.getStorageSync('address_info');
  if (addressInfo && addressInfo.cityId) {
    cityId = addressInfo.cityId || "";
    lat = addressInfo.latitude || "";
    lng = addressInfo.longitude || "";
  } else {
    addressInfo = app.globalData.addressInfo || {}
    if (addressInfo.cityId) {
      cityId = addressInfo.cityId || "";
      lat = addressInfo.latitude || "";
      lng = addressInfo.longitude || "";
    }
  }
  // 登录信息
  let deviceid_pdj_jd = util.getUUIDMD5();
  // 渠道号
  let business = app.globalData.qrcode && app.globalData.qrcode.business + '' || '';
  let channelCode = app.globalData.channelCode || ''
  // 实时地址（风控用）
  let realTimeLocation = {};
  try {
    realTimeLocation = wx.getStorageSync('realTimeLocation')
  } catch (e) {
    /**/
  }
  // 参数
  let data = {
    channel: globalData.config.channel,
    platform: 6, //globalData.config.platform,
    platCode: globalData.config.platCode,
    mpChannel: "wx_xcx",
    appVersion: params.appVersion || globalData.config.platform,
    xcxVersion: params.xcxVersion || globalData.config.xcxVersion,
    appName: globalData.config.appName,
    functionId: params.functionId,
    body: JSON.stringify(params.body) || "",
    afsImg: params.afsImg || "",

    lat_pos: realTimeLocation.latitude || "",
    lng_pos: realTimeLocation.longitude || "",
    lat: lat,
    lng: lng,
    city_id: cityId,
    deviceToken: util.getUUIDMD5(),
    deviceId: util.getUUIDMD5(),
    deviceModel: "appmodel",
    business: business,
    traceId: util.getrandom() + Date.now(),
    channelCode: channelCode,
    signNeedBody: 1,
    pageId: params.pageId || '',
    area: addressInfo && addressInfo.area || ''
  };
  // 其他参数
  if (params.content) {
    data = Object.assign(data, params.content)
  }
  let signData = await getSignData(data, ver)
  return signData
}

//网关加密data
function djencryptReqData(data) {
  if (!is_djencryptFlag) {
    is_djencryptFlag = 'success'
  }
  let encryptData = null
  if(getApp().globalData.config.env == 'pro'){
    encryptData = {
      djencrypt: encrypt(JSON.stringify(data))
    }
  }else{
    encryptData = data
  }
  return encryptData
}

//获取请求地址
function makeBaseUrl(params, v = 1) {
  let app = getApp();
  let globalData = app.globalData;
  let path = v == 1 ? 'clientV2' : 'client'
  let BaseUrl = `https://${globalData.config.HOST}/${path}?functionId=${params.functionId}`;
  return BaseUrl
}

//生成header 主要包含cookie
function makeHeader() {
  let loginInfo = wx.getStorageSync('login_info')||{};
  let o2o_m_h5_sid = loginInfo.o2o_m_h5_sid || '';
  let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || '';
  let deviceid_pdj_jd = util.getUUIDMD5();
  // cookie
  let pt_key = plugin.getPtKey() || '';
  let cookieStr = 'cart_uuid=' + util.getUUIDMD5() + '; pt_key=' + pt_key + '; o2o_m_h5_sid=' + o2o_m_h5_sid + '; deviceid_pdj_jd=' + deviceid_pdj_jd + '; PDJ_H5_PIN=' + PDJ_H5_PIN;
  return {
    'content-type': 'application/x-www-form-urlencoded;',
    'Cookie': cookieStr,
    'sid': o2o_m_h5_sid,
    'PDJ_H5_PIN': PDJ_H5_PIN
  }
}

function refreshApiKey() {
  console.log('更新key')
  refreshKey()
}
/**
 * 
 * @param {*返回值} res 
 * @param {*初始入参} params 
 * @param {*合并验签入参} data 
 * @param {*header} header 
 * @param {*} resolve 
 * @param {*} reject 
 * @returns 
 */
function handleResult(res, params, data, header, resolve, reject) {
  let app = getApp();
  let globalData = app.globalData;
  //fail错误处理
  if (res.failCode) {
    let err = res.err
    mp.hideLoading();
    mp.showToast({
      title: '当前网络不通畅，请检查后重试!（net fail）',
      mask: true
    })
    reject(err)
    // 接口错误上报
    if (res.err) {
      err.host = globalData.config.HOST;
      err.params = data;
      app.reportError(err)
      addFilterMsg(data.functionId)
      addFilterMsg(data.deviceId)
      addFilterMsg(header.PDJ_H5_PIN)
    }
    return;
  }
  //success处理
  if (!params.isNeedDealLogin) {
    // 用户未登录
    if (res.data.code == 201 || res.data.code == 202) {
      app.globalData.loginStateInfo = {}
      try {
        wx.setStorageSync("login_info", {})
      } catch (e) {
        console.log(e)
      }
      //多次弹出重新登录
      if (app.globalData.reLogin) {
        return;
      } else {
        app.globalData.reLogin = true;
        mp.dialog({
          content: res.data.msg,
          showCancel: false
        }).then(() => {
          wx.navigateTo({
            url: `/pages/newLogin/login/login`,
            complete: () => {
              app.globalData.reLogin = false
            },
            preObj: params && params.preObj,
            buried_position: "api_v2"
          })
        })
      }
      reject(res);
      return
    }
  }
  //兼容第三方接口
  if (res.data.status && res.data.content) {
    resolve(res)
    return;
  }
  if (res.data.code == '0') {
    resolve(res)
  } else {
    // mp.hideLoading();
    if (params.isNeedDealError) {
      resolve(res)
    } else {
      if (!params.isForbiddenDialog) {
        mp.dialog({
          content: res.data.msg,
          showCancel: false
        }).then(() => {
          reject(res)
        }).catch(err => {
          reject(err)
        })
      } else {
        reject(res)
      }
    }
    // 接口错误上报
    if (res.data) {
      res.data.host = globalData.config.HOST;
      res.data.params = data;
      app.reportError(res.data)
      addFilterMsg(data.functionId)
      addFilterMsg(data.deviceId)
      addFilterMsg(header.PDJ_H5_PIN)
    }
    if (res.data.code == '105') {
     
    }
    // 40029code码失效
    if (res.data.code == '40029') {
      wx.setStorageSync('JDHasUseLogin', false);
      wx.setStorageSync('code', '');
    }
  }
  // ab test
  if (res.data.abTest && res.data.abTest.length > 0) {
    upDateAB(res.data.abTest)
  }
  if (res.data.result && res.data.result.abTest) {
    upDateAB(res.data.result.abTest)
  }


}

/**
 * AB test 更新
 */
function upDateAB(data) {
  let app = getApp();
  try {
    let testTag = app.globalData.testtag || [];
    //如果传递过来的是数组
    if (data instanceof Array) {
      data.forEach((arr) => {
        let flag = true;
        arr.startTime = Date.now();
        testTag.forEach((item, index) => {
          if (item.experimentName === arr.experimentName) {
            testTag.splice(index, 1, arr);
            flag = false
          }
        })
        if (flag) {
          testTag.push(arr)
        }
      })
      //如果是单个对象
    } else if (data && data.experimentName) {
      let temp = data || {};
      let flag = true;
      temp.startTime = Date.now();
      testTag.forEach((item, index) => {
        if (item.experimentName === temp.experimentName) {
          testTag.splice(index, 1, temp);
          flag = false
        }
      })
      if (flag) {
        testTag.push(temp)
      }
    }
    app.globalData.testtag = testTag
  } catch (e) {
    // console.error(e)
  }
}

//封装原始请求
function wxRequest(api_path, method, data, header) {
  return new Promise((resolve) => {
    wx.request({
      url: api_path,
      data: data,
      method: method,
      header: header,
      success: resolve,
      fail: (err) => resolve({ err, failCode: 1, data: {} })
    })
  })
}

/**
 * 网络请求
 * @param params
 */
export function request(params) {
  return new Promise(async (resolve, reject) => {
    //params与公参合并，包含验签逻辑，形成明文参数
    let signData = await makeRequestParam(params, 1)
    //网关加密处理
    let encryptData = djencryptReqData(signData.requestBody)
    //获取请求地址
    let BaseUrl = makeBaseUrl(params, signData.sv)
    //生成header
    let header = makeHeader()
    //默认使用v2
    let res = await wxRequest(BaseUrl, params.method, encryptData, header);
    //处理接口异常上报
    let httpCode = res.statusCode || ''
    let msg = res.errMsg || res.err && res.err.errMsg || ''
    let code = res.data.code || ''
    let functionId = params.functionId || ''
    let errType = 2
    let errResultType = 0
    try{
      if(httpCode == 200 ){
        let _data = res.data
        console.log( util.isJson( _data) );
        if( !util.isJson( _data )){
          clickBuriedV2_({
            click_id:'spclError_netError',
            click_par:{
              functionId,
              httpCode,
              errType,
              errResultType,
              content: JSON.stringify(_data) || 'transfer failed'
            },
            currentPageName:'spclPage' ,
          })
        }
      }else{
        if(!res.data){
          errResultType = "2"
        }else if(header['content-type'] && header['content-type'].includes('/html')){
          errResultType = "1"
        }else{
          errResultType = "3"
        }
        errType = 1
        clickBuriedV2_({
          click_id:'spclError_netError',
          click_par:{
            functionId,
            httpCode,
            errType,
            errResultType,
            content: _data
          },
          currentPageName:'spclPage' ,
        })
      }
    }catch(e){}
   
    
    //处理接口异常上报
    //动态key过期 需要刷新key 同时单次降级老的请求
    if (res.data.code == 122) {
      let signData0 = await makeRequestParam(params, 0)
      //网关加密处理
      let encryptData0 = djencryptReqData(signData0.requestBody)
      let BaseUrl0 = makeBaseUrl(params, 0)
      //走老的逻辑
      let oldRes = await wxRequest(BaseUrl0, params.method, encryptData0, header)
      if (oldRes.data.code == 110) {
        let res110 = await wxRequest(BaseUrl0, params.method, signData0.requestBody, header)
        handleResult(res110, params, signData0.requestBody, header, resolve, reject)
       
        //接口没有请求成功，设置加密传输flag
        is_djencryptFlag = "nosuccess"
      } else {
        handleResult(oldRes, params, signData0.requestBody, header, resolve, reject)
      }
      //动态key过期 需要刷新key
      refreshApiKey()

    } else if (res.data.code == 110) {
      
      //接口没有请求成功，设置加密传输flag
      is_djencryptFlag = "nosuccess"
      let oldRes = await wxRequest(BaseUrl, params.method, signData.requestBody, header)
      handleResult(oldRes, params, signData.requestBody, header, resolve, reject)
    } else {
      handleResult(res, params, signData.requestBody, header, resolve, reject)
    }
  })
}
/* eslint-disable */
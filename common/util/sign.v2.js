import { signUtil } from "../../npm/sign.min.umd"
import { encrypt } from './aes.utils'
import util from './util'

const signKey = '6b040931c5661s04108af19t2a8e6fdb9'

export const signInit = () => {
  try {
    let origin = 'daojia';
    let envVersion = 1;
    try {
      envVersion = wx.getStorageSync('envVersionIndex') ? wx.getStorageSync('envVersionIndex') : 1;
    } catch (e) {
      // console.log(e)
    }
    if (envVersion == 2) {
      origin = 'testpdjm'
    } else if (envVersion == 3) {
      origin = 'prepdjm'
    }else if(envVersion == 4){
      origin = 'testpdj-three'
    }
    signUtil.setConfig({
      djEncrypt: 1,
      sv: 1,
      signNeedBody: 1,
      isGray: 1
    });
    signUtil.setProvider({
      api: (args) => {
        return wxRequest(args.url,args.type,{})
      },
      storage: {
        setItem: wx.setStorageSync,
        getItem:wx.getStorageSync
      },
      ks: {
        v1: signKey,
      },
      domainKey:origin
    });
    signUtil.getServerKey();
  } catch (error) {
    console.log('验签初始化失败', error);
  }
};

export const getSignData = async (data, ver) => {
  let { sv, requestBody ,v} = await signUtil.getRequestBody(data, ver)
  return {
    requestBody: requestBody ? requestBody : data,
    sv: sv,
    v
  }
}
export const refreshKey = async () => {
  signUtil.getServerKey();
}

//封装原始请求
function wxRequest(api_path, method = 'get', params={}, header) {
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
    traceId: deviceid_pdj_jd + Date.now(),
    channelCode: channelCode,
  };
  return new Promise((resolve) => {
    wx.request({
      url: api_path,
      data: {
        djencrypt: encrypt(JSON.stringify(data))
      },
      method: method,
      header: header,
      success:(res) =>{resolve(res.data)},
      fail: resolve
    })
  })
}
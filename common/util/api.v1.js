/* eslint-disable */
import util from './util'
import mp from './wxapi'
// eslint-disable-next-line no-undef
let plugin = requirePlugin("loginPlugin");
import { encrypt } from './aes.utils'
import { genSignKeyV1 } from './signKey'
import { addFilterMsg } from './wxLog'
import {clickBuriedV2_} from "./BI"
/**
 * 网络请求
 * @param params
 */
export  function request(params) {
  let app = getApp();
  let globalData = app.globalData;
  // url
  let BaseUrl = "https://" + globalData.config.HOST + "/client?functionId=" + params.functionId;
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
  let loginInfo = wx.getStorageSync('login_info')||{};
  let o2o_m_h5_sid = loginInfo.o2o_m_h5_sid || '';
  let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || '';
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
    // isForbiddenDialog: params.isForbiddenDialog || false,
    // isNeedDealError: params.isNeedDealError || false,
    // isNeedDealLogin: params.isNeedDealLogin || false,
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
    traceId: util.getrandom()+ Date.now(),
    channelCode: channelCode,
    pageId: params.pageId || '',
    area: addressInfo && addressInfo.area || ''
  };
  // 其他参数
  if (params.content) {
    data = Object.assign(data, params.content)
  }

  // cookie
  let pt_key = plugin.getPtKey() || '';
  let cookieStr = 'cart_uuid=' + util.getUUIDMD5() + '; pt_key=' + pt_key + '; o2o_m_h5_sid=' + o2o_m_h5_sid + '; deviceid_pdj_jd=' + deviceid_pdj_jd + '; PDJ_H5_PIN=' + PDJ_H5_PIN;

  let is_djencryptFlag = null;
  try {
    is_djencryptFlag = wx.getStorageSync('djencryptFlag')
    if (!is_djencryptFlag) {
      is_djencryptFlag = 'success'
    }
  } catch (e) {
    /**/
  }
  // 添加验签标识
  data.signNeedBody = 1
  // 添加验签字段
  data.signKeyV1 = genSignKeyV1(data)
  let sendData
  if (app.globalData.config.env == 'pro' && is_djencryptFlag == 'success') {
    sendData = {
      djencrypt: encrypt(JSON.stringify(data))
    }
  } else {
    sendData = data
  }
  // 发请求
  // mp.loading_cover()

  //处理接口异常上报
  return new Promise((resolve, reject) => {
    wx.request({
      method: params.method || 'GET',
      url:  BaseUrl,
      // data: data,
      data: sendData,
      header: {
        'content-type': 'application/x-www-form-urlencoded;',
        'Cookie': cookieStr,
        'sid': app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid || ''
      },
      success(res) {
        //处理接口异常上报
        let httpCode = res.statusCode || ''
        let msg = res.errMsg || res.err && res.err.errMsg || ''
        let code = res.data.code || ''
        let functionId = params.functionId || ''
        let errType = 2
        let errResultType = 0
        let header = res.header || {}
        try{
          if(httpCode == 200 ){
            let _data = res.data
            console.log( util.isJson( _data) );
            if ( !util.isJson( _data ) ) {
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
        }catch(e){
          console.log(e);
        }
       
        //处理接口异常上报

        if (!params.isNeedDealLogin) {
          // 用户未登录
          if (res.data.code == 201 || res.data.code == 202) {
            app.globalData.loginStateInfo = {}
            try {
              wx.setStorageSync("login_info", {})
            } catch (e) { }
            //多次弹出重新登录
            if (app.globalData.reLogin) {
              return;
            } else {
              app.globalData.reLogin = true;
              mp.dialog({
                content: res.data.msg,
                showCancel: false
              }).then(() => {
                if (!params.preObj) {
                  clickBuriedV2_({
                    click_id:'test_apiv2_empty',
                    click_par:{
                      params,
                      preObj: params.preObj
                    }
                  })
                }
                wx.navigateTo({
                  url: `/pages/newLogin/login/login`,
                  complete: () => {
                    app.globalData.reLogin = false
                  },
                  preObj: params && params.preObj,
                  buried_position: "api_v1_1"
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
          if (is_djencryptFlag == 'nosuccess') {
            wx.setStorageSync('djencryptFlag', 'success')
          }
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
            addFilterMsg(deviceid_pdj_jd)
            addFilterMsg(PDJ_H5_PIN)
          }

        }
        // ab test
        if (res.data.abTest && res.data.abTest.length > 0) {
          upDateAB(res.data.abTest)
        }
        if (res.data.result && res.data.result.abTest) {
          upDateAB(res.data.result.abTest)
        }
        // 40029code码失效
        if (res.data.code == '40029') {
          try {
            wx.setStorageSync('JDHasUseLogin', false);
            wx.setStorageSync('code', '');
          } catch (e) {

          }
        }
        //接口加密传输失败，降级明文传输
        if (res.data.code == 110 && res.data.type == 1) {
          //接口没有请求成功，设置加密传输flag
          wx.setStorageSync('djencryptFlag', 'nosuccess')
          wx.request({
            method: params.method || 'GET',
            url: BaseUrl,
            // data: {djencrypt:encrypt(JSON.stringify(data))},
            // data: data,
            data: sendData,
            header: {
              'content-type': 'application/x-www-form-urlencoded;',
              'Cookie': cookieStr,
              'sid': app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid || ''
            },
            success(res) {
              // 关闭loading
              // mp.hideLoading();
              if (!params.isNeedDealLogin) {
                // 用户未登录
                if (res.data.code == 201 || res.data.code == 202) {
                  app.globalData.loginStateInfo = {}
                  try {
                    wx.setStorageSync("login_info", {})
                  } catch (e) { }
                  //多次弹出重新登录
                  if (app.globalData.reLogin) {
                    return;
                  } else {
                    app.globalData.reLogin = true;
                    mp.dialog({
                      content: res.data.msg,
                      showCancel: false
                    }).then(() => {
                      if (!params.preObj) {
                        clickBuriedV2_({
                          click_id:'test_apiv2_2_empty',
                          click_par:{
                            params,
                            preObj: params.preObj
                          }
                        })
                      }
                      wx.navigateTo({
                        url: `/pages/newLogin/login/login`,
                        complete: () => {
                          app.globalData.reLogin = false
                        },
                        preObj: params && params.preObj,
                        buried_position: "api_v1_2"
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
                  addFilterMsg(deviceid_pdj_jd)
                  addFilterMsg(PDJ_H5_PIN)
                }

              }
              // ab test
              if (res.data.abTest && res.data.abTest.length > 0) {
                upDateAB(res.data.abTest)
              }
              if (res.data.result && res.data.result.abTest) {
                upDateAB(res.data.result.abTest)
              }
              // 40029code码失效
              if (res.data.code == '40029') {
                try {
                  wx.setStorageSync('JDHasUseLogin', false);
                  wx.setStorageSync('code', '');
                } catch (e) {
                  /**/
                }
              }
              //接口加密传输失败，降级明文传输
              if (res.data.code == 110 && res.data.type == 1) {
                //接口没有请求成功，设置加密传输flag
                wx.setStorageSync('djencryptFlag', 'nosuccess')


              }

            },
            fail(err) {
              // wx.reportMonitor('0', 1);
              // 关闭toast
              mp.hideLoading();
              mp.showToast({
                title: '当前网络不通畅，请检查后重试!（net fail）',
                mask: true
              }).then(() => {
                reject(err)
              }).catch(err => {
                reject(err)
              });
              // 接口错误上报
              if (err) {
                err.host = globalData.config.HOST;
                err.params = data;
                app.reportError(err)
                addFilterMsg(data.functionId)
                addFilterMsg(deviceid_pdj_jd)
                addFilterMsg(PDJ_H5_PIN)
              }
            }
          })

        }

      },
      fail(err) {
        // wx.reportMonitor('0', 1);
        // 关闭toast
        let functionId = params.functionId || ''
        mp.hideLoading();
        mp.showToast({
          title: '当前网络不通畅，请检查后重试!（net fail）',
          mask: true
        }).then(() => {
          reject(err)
        }).catch(err => {
          reject(err)
        });
        // 接口错误上报
        if (err) {
          err.host = globalData.config.HOST;
          err.params = data;
          app.reportError(err)
          addFilterMsg(data.functionId)
          addFilterMsg(deviceid_pdj_jd)
          addFilterMsg(PDJ_H5_PIN)
        }
      }
    })
  })
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
/* eslint-disable */
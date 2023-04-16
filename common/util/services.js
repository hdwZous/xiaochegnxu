  import { request } from './api'
import FNIDS from './functionId'

export function queryFreightService(options) {
  let { functionId = '', appVersion = '' } = FNIDS.queryFreightDiscountList
  return request({ functionId, appVersion, method: "post", ...options })
}

export function queryRedPacketService(options) {
  let { functionId = '', appVersion = '' } = FNIDS.queryRedPacketList
  return request({ functionId, appVersion, method: "post", ...options })
}

export function getAbTestService(options) {
  let { functionId = '', appVersion = '' } = FNIDS.abTest
  return request({ functionId, appVersion, method: "get", ...options })
}

export function changeChart(options) {
  let { functionId = '', appVersion = '' } = FNIDS.cartControl
  return request({ functionId, appVersion, ...options })
}

export function validCutPriceService(options) {
  let { functionId = '', appVersion = '' } = FNIDS.validSenderCutPrice
  return request({ functionId, appVersion, ...options })
}

export function getWxGroupIdService(options) {
  let { functionId = '', appVersion = '' } = FNIDS.getWxGroupId
  return request({ functionId, appVersion, ...options })
}
export function reportBusiness(options) {
    let { functionId = '', appVersion = '' } = FNIDS.reportBusiness
    return request({ functionId, appVersion, ...options })
}

// 获取到家地理位置信息
export function getDaoJiaLocation(location, callBack, options, route) {
  let startTime = Date.now()
  let { functionId = '', appVersion = '' } = FNIDS.transferAddress
  request({
    // 真实接口
    functionId,
    appVersion,
    body: {
      "longitude": location.longitude,
      "latitude": location.latitude,
      "coord_type": "1",
      "needMatch": 0
    },
    method: 'post',
    ...options
  }).then(res => {
    if (res && res.data) {
      if (res.data.code == '0' && res.data.result) {
        var poi = res.data.result.title,
          result = res.data.result;
        if (!poi) {
          poi = result.poi || result.title || result.address || result.district || result.addressName || ''
        }
        var addressInfo = {
          longitude: result.longitude || '',
          latitude: result.latitude || '',
          cityId: result.cityId || result.areaCode || result.cityCode || '',
          cityName: result.city || res.cityName || '',
          countyName: result.district,
          districtCode: result.districtCode || '',
          poi: poi,
          adcode: result.adcode
        }
        // 实时地址（风控用）
        try {
          wx.setStorageSync('realTimeLocation', addressInfo)
        } catch (e) {

        }
        callBack && callBack(addressInfo, location)
      } else {
        // 清楚实时定位信息（风控）
        try {
          wx.removeStorageSync('realTimeLocation')
        } catch (e) {

        }
        callBack && callBack(null)
      }
    } else {
      // 清楚实时定位信息（风控）
      try {
        wx.removeStorageSync('realTimeLocation')
      } catch (e) {

      }
      callBack && callBack(null);
    }
  }).catch(err => {
    callBack && callBack(null)
  })
}

// 获取门店id
export function getNearbyStoreId(params) {
  let { orgCode = '', longitude = '', latitude = '', dj_par_key = '' } = params || {}, body = {};
  let { functionId = '', appVersion = '' } = FNIDS.nearbyStoreId || {};

  if (orgCode) {
    body = {
      "lgt": longitude,
      "lat": latitude,
      "orgCode": orgCode
    }
  } else if (dj_par_key) {
    body = {
      "lgt": longitude,
      "lat": latitude,
      "dj_par_key": dj_par_key || ''
    }
  }
  return request({
    functionId,
    appVersion,
    body: body
  })
}

// 领取优惠券
export function getCoupon(params, isNeedDealError, isForbiddenDialog) {
  let {
    isFollow = 0,
    isFloor = 0,
    needCouponGo = false,
    grabPlat = 1,
    channel = "",
    source = "",
    code = "",
    platNewActivityFlag = "",
    orgCode = "",
    storeNo = "",
    pageSource = "",
    operType = 1,
    bgType = "",
    encryptedKey,
    ruleId,
    couponId = "",
  } = params;
  let { functionId = "", appVersion = "" } = FNIDS.grabCoupon;
  return request({
    functionId,
    appVersion,
    method: "POST",
    isNeedDealError: isNeedDealError || false,
    isForbiddenDialog: isForbiddenDialog || false,
    body: {
      fromSource: "2",
      // STATION_HOME_PAGE("station_home_page", "门店页"),
      // ACTIVITY_PAGE("activity_page", "活动页"),
      // SIGLE_PRODUCT_PAGE("single_product_page", "单品页"),
      // MINI_CART("mini_cart","迷你购物车"),
      // V_PLUS_PAGE("v_plus_page","V+会员页");
      isFans: isFollow || 0,
      isFloor: isFloor || 0,
      needCouponGo: needCouponGo,
      grabPlat: 1,
      channel: channel || "",
      source: source || "",
      code: code || "",
      platNewActivityFlag: platNewActivityFlag || "",
      orgCode: orgCode || "",
      storeNo: storeNo || "",
      pageSource: pageSource || "",
      operType: operType,
      encryptedKey: encryptedKey || '',
      ruleId: ruleId || '',
      bgType: bgType || 'daojia',
      couponId: couponId || '',
    },
  });
}

// 活动页领取优惠券
export function getActivityCoupon(params) {
  let {
    refPageSource = 'home',
    code = '',
    operType = 1,
    isFloor = 0,
    needCouponGo = false,
    grabPlat = 1,
    channel = '',
    couponPattern = '',
    platNewActivityFlag = '',
    orgCode = '',
    ref = '',
    ctp = '',
    pageSource = "",

  } = params;
  let { functionId = '', appVersion = '' } = FNIDS.grabCoupon
  return request({
    functionId,
    appVersion,
    isNeedDealError: true,
    method: "POST",
    body: {
      "refPageSource": refPageSource,
      "code": code,
      "fromSource": 2,
      "operType": operType,
      "isFloor": isFloor,
      "needCouponGo": needCouponGo,
      "grabPlat": grabPlat,
      "platNewActivityFlag": platNewActivityFlag,
      "orgCode": orgCode,
      "channel": channel,
      "couponPattern": couponPattern,
      "pageSource": pageSource,
      "ref": ref,
      "ctp": ctp
    }
  })
}

// 领取v+会员券
export function getVipCoupon(params) {
  let { activityCode = "", grabChannel = '', pageSource = "", refPageSource = "home", ref = "", ctp = "" } = params;
  let { functionId = '', appVersion = '' } = FNIDS.vipChangePopInfo
  return request({
    functionId,
    appVersion,
    isNeedDealError: true,
    method: 'post',
    body: {
      "refPageSource": refPageSource,
      "activityCode": activityCode,
      "grabChannel": grabChannel,
      "buyCouponWithOrderFlag": false,
      "pageSource": pageSource,
      "ref": ref,
      "ctp": ctp
    }
  })
}

// 兑换红包
export function convertCoupon(params) {
  let {
    refPageSource = "",
    activityCode = '',
    consumeCode = "",
    grabChannel = "",
    serviceVersion = "",
    exchangeFlag = "",
    buyCouponWithOrderFlag = "",
    pageSource = "",
    ref = "",
    ctp = ""
  } = params;
  let { functionId = '', appVersion = '' } = FNIDS.activityConvertCoupon
  return request({
    functionId,
    appVersion,
    isNeedDealError: true,
    method: 'post',
    body: {
      "refPageSource": refPageSource,
      "activityCode": activityCode,
      "consumeCode": consumeCode,
      "grabChannel": grabChannel,
      "serviceVersion": serviceVersion,
      "exchangeFlag": exchangeFlag,
      "buyCouponWithOrderFlag": buyCouponWithOrderFlag,
      "pageSource": pageSource,
      "ref": ref,
      "ctp": ctp
    }
  })
}

// 获取分享券
export function getShareCoupon(params) {
  let { activityId = "", type = "", storeId, storeCouponPopAb = '' } = params;
  let addressInfo = {}
  try {
    addressInfo = wx.getStorageSync('address_info') || '';
  } catch (e) {
    // console.log(e)
  }
  let { functionId = '', appVersion = '' } = FNIDS.grabShareCoupon
  return request({
    functionId,
    appVersion,
    isNeedDealError: true,
    body: {
      storeId: storeId || "",
      packageVersion: "2 ",
      activityId: activityId || "",
      // 分享类型，"activity" 活动页| "store" 门店页|"product" 单品页|"helpon"助力券
      type: type || "",
      latitude: addressInfo.latitude || "",
      longitude: addressInfo.longitude || "",
      // 820门店助力券分享需要知道门店优惠券弹层是哪个实验结果下展示的
      storeCouponPopAb: storeCouponPopAb || '',
    },
  });
}

// 获取券协议
export function getCouponProtocol(params) {
  let {
    activityCode = "",
    storeId = "",
    markState = "",
    refPageSource = "",
    pageSource = "",
    skuId = "",
    orgCode = "",
    couponGoSource = "",
    couponId = "",
    // 券模式 1、实物券 2、虚拟券 3、支付券 为空时：默认实物券
    couponPattern = "",
    promotionSource = ''
  } = params || {};
  let { functionId = '', appVersion = '' } = FNIDS.couponProtocol
  return request({
    functionId,
    appVersion,
    isNeedDealError: true,
    method: "POST",
    body: {
      passThroughParam: {
        code: activityCode,
        storeId: storeId,
        markState: markState,
        refPageSource: refPageSource,
        skuIds: JSON.stringify([`${skuId}`]),
        orgCode: orgCode,
        promotionSource,
      },
      stationNo: storeId,
      couponGoSource: couponGoSource,
      couponId: couponId,
      pageSource: pageSource || "",
      couponPattern: couponPattern,
    },
  });
}

// 获取活动页券协议
export function getActivityCouponProtocol(params) {
  let {
    activityCode = "",
    storeId = "",
    markState = "",
    refPageSource = "",
    pageSource = "",
    orgCode = "",
    couponGoSource = "",
    couponPattern = "",
    couponId = "",
    ref = "",
    ctp = "",
  } = params || {};
  let { functionId = '', appVersion = '' } = FNIDS.activityCouponProtocol
  return request({
    functionId,
    appVersion,
    body: {
      "refPageSource": refPageSource || "",
      "couponId": couponId || "",
      "activityCode": activityCode || "",
      "couponGoSource": couponGoSource || "",
      "couponPattern": couponPattern || "",
      "passThroughParam": {
        "refPageSource": refPageSource || "",
        "markState": markState || "",
        "code": activityCode || "",
        "storeId": storeId || null,
        "orgCode": orgCode || null
      },

      "pageSource": pageSource || "",
      "ref": ref || "",
      "ctp": ctp || ""
    }
  })
}

// 新的获取openid的方法
export function getNewOpenId(channel, fn) {
  let { functionId = '', appVersion = '' } = FNIDS.getNewOpenId;
  wx.login({
    success(res) {
      if (res.code) {
        let sKey = 0;
        try {
          sKey = wx.getStorageSync('sKey') || 0
        } catch (e) {

        }
        request({
          method: 'post',
          functionId,
          appVersion,
          body: {
            // 小程序类型：1=到家卖菜小程序；2=医药小程序
            xcxType: channel || 1,
            jsCode: `${sKey},${res.code}`
          },
          isNeedDealError: true,
          isNeedDealLogin: true
        }).then(res => {
          if (res.data.code == 0) {
            let { openId = '', skey = '', unionid = '' } = res.data.result || {};
            if (openId) {
              try {
                wx.setStorageSync('openId', openId)
              } catch (e) {

              }
            }
            if (skey) {
              try {
                wx.setStorageSync('sKey', skey)
              } catch (e) {

              }
            }
            if (unionid) {
              try {
                wx.setStorageSync('unionid', unionid)
              } catch (e) {

              }
            }
            try {
              wx.setStorageSync('JDHasUseLogin', true);
            } catch (e) {

            }
            fn && fn(res.data.result || {})
          } else {
            console.log('登录失败！' + res.data.msg)
          }
        }).catch(err => {
          console.log('登录失败！' + err)
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    },
    fail(err) {
      console.log('登录失败！' + err)
    }
  })
}

export function doFollow(isFollow, storeId) {
  return request({
    functionId: FNIDS.doFollow.functionId,
    appVersion: FNIDS.doFollow.appVersion,
    body: {
      isFollow: isFollow,
      storeId: storeId,
    },
  });
}

export function reportPromote(options) {
  request({
    functionId: FNIDS.reportPromote.functionId,
    appVersion: FNIDS.reportPromote.appVersion,
    isForbiddenDialog: true,
    isNeedDealError: true,
    method: "POST",
    body: {
      workerId: options.pushUserId || "",
      channelCode: options.business || "",
      businessTime: parseInt(Date.now() / 1000),
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// 获取门店、结算订阅AB
export function getSubscribeAb() {
  getAbTestService({
    body: {
      experimentName: "wechat_submit"
    },
    isNeedDealError: true,
    isForbiddenDialog: true,
  }).then((res) => {
    let { code, result = {} } = res.data || {};
    if (code == 0) {
      getApp().globalData.subscribeAb = (result && result.strategyName) || ''
    }
  });
}

// 获取到店详情
export function getToStoreDetails(options) {
  const { appVersion, functionId } = FNIDS.toStoreDetails
  return request({ functionId, appVersion, method: 'POST', ...options })
}

// 到店虚拟加购物车
export function addToStoreCard(options) {
  const { appVersion, functionId } = FNIDS.toStoreCard
  return request({ appVersion, functionId, method: 'POST', ...options })
}

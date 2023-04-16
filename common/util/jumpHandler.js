import { request, FNIDS } from './api';
import jumpAgreement from './jumpAgreement';
import { getNearbyStoreId } from '../../common/util/services';
import { djCmsJump } from './agreementV2';
import mp from './wxapi';
import util from "./util"
const app = getApp();

let _this = null;
let preObj = null;
// 扫描参数和跳转逻辑
export function handleScanOptionsAndJump(options, context) {
  _this = context;
  preObj = context && context.data && context.data.recommendObj || {}
  // 解析参数
  options && handleOptions(options).then(res => {
    let {
      type,
      options
    } = res;
    // 跳转协议
    handleJump(type, options);
    
  })
}

/**
* @description:【options解析】通过scene获取参数
* @param {type} 
* @return: 
*/
function parseSceneParams(params) {
  // qrcode
  let qrCode = {
    code: params[0],
    orgcode: params[1],
    type: params[2],
    city: params[3],
    materiel: params[4],
    business: params[5],
    channel: params[6],
    storeid: params[7],
    // pushUserId 地推员码传给哥伦布统计
    pushUserId: params[8],
    // 二维码标识
    qrCodeId: params[9],
    skuid: params[10],
    roomId: params[11]
  };
  if (qrCode.code === '@') {
    qrCode.code = ''
  }
  if (qrCode.orgcode === '@') {
    qrCode.orgcode = ''
  }
  if (qrCode.city === '@') {
    qrCode.city = ''
  }
  if (qrCode.materiel === '@') {
    qrCode.materiel = ''
  }
  if (qrCode.business === '@') {
    qrCode.business = ''
  }
  if (qrCode.channel === '@') {
    qrCode.channel = ''
  }
  if (qrCode.storeid === '@') {
    qrCode.storeid = ''
  }
  if (qrCode.pushUserId === '@') {
    qrCode.pushUserId = ''
  }
  if (qrCode.qrCodeId === '@') {
    qrCode.qrCodeId = ''
  }
  if (qrCode.skuid === '@') {
    qrCode.skuid = ''
  }
  if (qrCode.roomId === '@') {
    qrCode.roomId = ''
  }
  return qrCode
}

/**
* @description:【options解析】通过url获取参数
* @param {type} 
* @return: 
*/
function parseUrlParams(options) {
  // 二维码信息
  let qrcode = {
    code: options.code || '',
    orgcode: options.orgcode || options.orgCode || '',
    type: options.type || '',
    city: options.city || '',
    materiel: options.materiel || '',
    business: options.business || app.globalData.qrcode.business || '',
    channel: options.channel || app.globalData.qrcode.channel || '',
    storeid: options.storeid || options.storeId || '',
    pushUserId: options.pushUserId || app.globalData.qrcode.pushUserId || '',
    qrCodeId: options.qrCodeId || '',
    deviceNo: options.deviceNo || '',
    lat: options.a || '',
    lon: options.o || '',
    longitude: options.longitude || '',
    latitude: options.latitude || '',
    skuid: options.skuid || options.skuId || '',
    roomId: options.room_id || options.roomId || '',
    popup: options.popup || '',
    channelBusiness: options.channelBusiness || '',
  };
  return qrcode
}

/**
 * @description: 【options解析】通过qrCodeId获取参数
 * @param {type} 
 * @return 
 */
function parseQrCodeIdParams(qrCodeId) {
  let qrCode = {
    code: '',
    orgcode: '',
    type: '',
    city: '',
    materiel: '',
    business: '',
    channel: '',
    storeid: '',
    pushUserId: '',
    deviceNo: '',
    lat: '',
    lon: '',
    qrCodeId: '',
    storeName: '',
    skuid: '',
    roomId: ''
  };
    //根据二维码id获取参数
  let { functionId = '', appVersion = '' } = FNIDS.getQrCode || {};
  return request({
    functionId,
    appVersion,
    isNeedDealError: true,
    body: {
      qrCodeId: qrCodeId
    }
  }).then(res => {
    let result = res.data.result || {};
    let globalQrCode = app.globalData.qrcode || {};
    let globalDataAddress = app.globalData.addressInfo || {};
    let addressInfo = _this.scopeData.addressInfo || {};

    qrCode.code = result.code || '';
    qrCode.orgcode = result.orgcode || '';
    qrCode.type = result.type || '';
    qrCode.city = result.city || '';
    qrCode.materiel = result.materiel || '';
    qrCode.business = result.business || globalQrCode.business || '';
    qrCode.channel = result.channel || globalQrCode.channel || '';
    qrCode.storeid = result.storeid || '';
    qrCode.pushUserId = result.pushUserId || globalQrCode.pushUserId || '';
    qrCode.deviceNo = '';
    qrCode.lat = addressInfo.latitude || (globalDataAddress && globalDataAddress.latitude) || "";
    qrCode.lon = addressInfo.longitude || (globalDataAddress && globalDataAddress.longitude) || "";
    qrCode.qrCodeId = result.qrCodeId || '';
    qrCode.dj_par_key = result.dj_par_key || '';
    qrCode.storeName = result.codeName || '';
    qrCode.skuid = result.skuid || '';
    qrCode.roomId = result.room_id || result.roomId || '';
    return Object.assign(qrCode, result);
  }).catch(() => {
    return qrCode
  })
}

/**
* @description: 【options解析】获取短链参数
* @param {type} 
* @return 
*/
function parseSchemeParams(opts) {
  let qrCode = {
    code: '',
    orgcode: '',
    type: '',
    city: '',
    materiel: '',
    business: '',
    channel: '',
    storeid: '',
    pushUserId: '',
    deviceNo: '',
    lat: '',
    lon: '',
    qrCodeId: '',
    storeName: '',
    skuid: '',
    roomId: '',
  };

  //根据二维码id获取参数
  let { functionId = '', appVersion = '' } = FNIDS.getQrCode || {};
  return request({
    functionId,
    appVersion,
    isNeedDealError: true,
    body: {
      qrCodeId: opts.dj_par_key
    }
  }).then(res => {
    let result = res.data.result || {};
    let globalQrCode = app.globalData.qrcode || {};
    let globalDataAddress = app.globalData.addressInfo || {};
    let addressInfo = _this.scopeData.addressInfo || {};
    qrCode.lat = addressInfo.latitude || (globalDataAddress && globalDataAddress.latitude) || "";
    qrCode.lon = addressInfo.longitude || (globalDataAddress && globalDataAddress.longitude) || "";
    for (let key in globalQrCode) {
      const val = globalQrCode[key]
      val && (qrCode[key] = val)
    }
    for (let key in result) {
      const val = result[key]
      val && (qrCode[key] = val)
    }
    return {
      ...qrCode,
      ...opts
    }
  }).catch(() => {
    return qrCode
  })
}

/**
* @description: 解析参数
* @param {object} 
* @return: 
*/
async function handleOptions(options) {
  let qrCode = {};
  let scene = '';
  if (options.qrCodeId) { // 方形二维码参数获取
    qrCode = await parseQrCodeIdParams(options.qrCodeId)
  } else if (options.scene) { // scene参数获取
    scene = decodeURIComponent(options.scene);
    let sceneItems = scene.split(',');
    if (sceneItems && sceneItems.length === 1) { // qrCodeId
      qrCode = await parseQrCodeIdParams(sceneItems[0])
    } else {
      // 二维码全局信息
      qrCode = parseSceneParams(sceneItems)
    }
  } else if (options.dj_par_key) {
    qrCode = await parseSchemeParams(options)
    // console.log(qrCode)
  } else { // url参数获取
    qrCode = parseUrlParams(options)
  }
  if (qrCode && !qrCode.roomId) {
    qrCode.roomId = app.globalData.roomId || ""
  }
  app.globalData.qrcode = qrCode;
  app.globalData.scene = scene;
  const params = {
    type: qrCode && qrCode.type || '',
    options: qrCode && Object.assign({}, qrCode, options)
  }
  //跳转类型
  _this.setData(params);
  return params
}

function getNearStoreId(query, params, type) {
  getNearbyStoreId(query).then(res => {
    if (res && res.data && res.data.result && res.data.result.stationNo && res.data.result.orgCode) {
      app.globalData.qrcode.orgcode = res.data.result.orgCode;
      app.globalData.qrcode.storeid = res.data.result.stationNo;
      jumpAgreement.jump({
        pageType: 'p20',
        params: {
          storeId: res.data.result.stationNo || '',
          orgCode: res.data.result.orgCode || params.orgcode || app.globalData.qrcode.orgcode || '',
          skuId: params.skuId || '',
          activityId: params.activityId || '',
          promotionType: params.promotionType || '',
          isAddCart: (params.isAddCart + '') == 'true' || false,
          isShowGoodsDetail: type == 30 ? true : ((params.isShowGoodsDetail + '') == 'true' || false),
          showCart: params.showCart || false,
          longitude: params.longitude || query.longitude || '',
          latitude: params.latitude || query.latitude || '',
          dj_par_key: query.dj_par_key,
          JumpLoginByLaunch: params.JumpLoginByLaunch || ''
        },
        context: _this
      });
      // 重置跳转类型
      _this.setData({
        type: ''
      })
    } else {
      mp.dialog({
        content: '附近暂无该商家门店',
        showCancel: false
      });
      _this.setData({
        type: ''
      });
    }
  }).catch(() => {
    // console.log(err)
    mp.dialog({
      content: '附近暂无该商家门店',
      showCancel: false
    });
    _this.setData({
      type: ''
    });
  })
}

function getNearGoodsDetail(query, params) {
  getNearbyStoreId(query).then(res => {
    if (res && res.data && res.data.result && res.data.result.stationNo && res.data.result.orgCode) {
      app.globalData.qrcode.orgcode = res.data.result.orgCode;
      app.globalData.qrcode.storeid = res.data.result.stationNo;
      jumpAgreement.jump({
        pageType: "p30",
        params: {
          storeId: res.data.result.stationNo || "",
          orgCode:
                  res.data.result.orgCode ||
                  params.orgcode ||
                  app.globalData.qrcode.orgcode ||
                  "",
          skuId: params.skuId || params.skuid || "",
          isAddCart: params.isAddCart == "true" || false,
          showCart: params.showCart || false,
          longitude: params.longitude || query.longitude || "",
          latitude: params.latitude || query.latitude || "",
          dj_par_key: query.dj_par_key,
          pushUserId: params.pushUserId || "",
          business: params.business || "",
        },
        context: _this
      });
      // 重置跳转类型
      _this.setData({
        type: ''
      })
    } else {
      mp.dialog({
        content: '附近暂无该商家门店',
        showCancel: false
      });
      _this.setData({
        type: ''
      });
    }
  }).catch(() => {
    // console.log(err)
    mp.dialog({
      content: '附近暂无该商家门店',
      showCancel: false
    });
    _this.setData({
      type: ''
    });
  })
}

/**
* @description: 执行跳转协议
* @param {Number, Object}  
* @return {void}
*/
function handleJump(type, params) {
  let {
    latitude,
    longitude,
    cityId 
  } = _this.scopeData && _this.scopeData.addressInfo && _this.scopeData.addressInfo || {} ;
  
  // 外部跳转 干掉内部跳转jumpType
  let pageType = '';
  let urlParams = {};
  let { dj_par_key = "" } = params
  if(type && type != 9) {
    urlParams.JumpLoginByLaunch = params.JumpLoginByLaunch || 0;
  }
  if (type == 10) { // 轻松购页
    pageType = 'p2';
  } else if (type == 13) { // 超级会员码优惠券领取列表
    if (latitude && longitude) {
      pageType = 'p6';
      urlParams = {
        latitude: latitude,
        longitude: longitude,
        cityId: app.globalData.addressInfo.cityId || cityId || '',
        storeId: params.storeid || app.globalData.qrcode.storeid || ''
      }
    }
  } else if (type == 14) { // 跳转至拼团列表-测试
    if (latitude && longitude) {
      pageType = 'p14'
    }
  } else if (type == 16) { // 跳转至超级会员码页
    if (util.isLogin()) {
      pageType = 'p13'
    } else if (_this.data.personCodeFlag) {

      wx.navigateTo({
        url: `/pages/newLogin/login/login`,
        success() {
          _this.setData({
            personCodeFlag: false
          })
        },
        preObj
      });
      return
    }

  } else if (type == 18) { // 其他小程序跳转至门店内活动页
    if (latitude && longitude) {
      pageType = 'p18';
      urlParams = {
        activityId: params.activityId || '',
        cityId: app.globalData.addressInfo.cityId || cityId || '',
        storeId: params.storeid || '',
        orgCode: params.orgcode || ''
      }
    }
  } else if (type == 11) { // 跳转H5页
    pageType = 'p19';
    urlParams = {
      url: params.url || '',
      dj_par_key
    }
  } else if (type == 30 || params.isShowGoodsDetail == 'true') { //单品详情页面
    if (params.orgcode) {
      if (params.storeid != '0' && (params.storeid || app.globalData.qrcode.storeid)) {
        pageType = 'p30';
        urlParams = {
          storeId:
                        params.storeid || app.globalData.qrcode.storeid || "",
          orgCode:
                        params.orgcode || app.globalData.qrcode.orgcode || "",
          skuId: params.skuId || params.skuid || "",
          isAddCart: params.isAddCart == "true" || false,
          showCart: params.showCart || false,
          longitude: params.longitude || longitude || "",
          latitude: params.latitude || latitude || "",
          dj_par_key,
          pushUserId: params.pushUserId || "",
          business: params.business || '',
        };
      } else {
        const query = {
          orgCode: params.orgcode || app.globalData.qrcode.orgcode || '',
          longitude: longitude || app.globalData.addressInfo.longitude || '',
          latitude: latitude || app.globalData.addressInfo.latitude || '',
          dj_par_key: dj_par_key || app.globalData.qrcode.dj_par_key || '',
        }
        getNearGoodsDetail(query, params)
        return
      }
    } else {
      // console.error('===没有orgCode===')
      if (dj_par_key) {
        const query = {
          orgCode: params.orgcode || app.globalData.qrcode.orgcode || '',
          longitude: longitude || app.globalData.addressInfo.longitude || '',
          latitude: latitude || app.globalData.addressInfo.latitude || '',
          dj_par_key: dj_par_key || app.globalData.qrcode.dj_par_key || '',
        }
        getNearGoodsDetail(query, params)
        return
      }
    }
  } else if (type == 8 || type == '0' || type == 1 || type == 2 || type == 3 || type == 66) { // 跳转至门店页
    if (params.orgcode) {
      if (params.storeid != '0' && (params.storeid || app.globalData.qrcode.storeid)) {
        pageType = 'p20';
        urlParams = {
          storeId: params.storeid || app.globalData.qrcode.storeid || '',
          orgCode: params.orgcode || app.globalData.qrcode.orgcode || '',
          skuId: params.skuId || '',
          activityId: params.activityId || '',
          promotionType: params.promotionType || '',
          isAddCart: (params.isAddCart + "") == 'true' || false,
          showCart: params.showCart || false,
          longitude: params.longitude || longitude || '',
          latitude: params.latitude || latitude || '',
          dj_par_key,
          popup: params.popup,
          channel: params.channel,
          cityId: params.cityId,
          channelBusiness: params.channelBusiness || '',
        }
      } else {
        const query = {
          longitude: longitude || app.globalData.addressInfo.longitude || '',
          latitude: latitude || app.globalData.addressInfo.latitude || '',
          dj_par_key: dj_par_key || app.globalData.qrcode.dj_par_key || '',
          orgCode: params.orgcode || ''
        }
        if (longitude && latitude) {
          getNearStoreId(query, params, type, 'p20')
          return
        }
      }
    } else if (dj_par_key) {
      // console.error('===没有orgCode===')
      const query = {
        longitude:
                    longitude || app.globalData.addressInfo.longitude || "",
        latitude:
                    latitude || app.globalData.addressInfo.latitude || "",
        dj_par_key:
                    dj_par_key || app.globalData.qrcode.dj_par_key || "",
        orgCode: params.orgcode || "",
      };
               
      getNearStoreId(query, params, type, "p20");
      return;
    } else if (params.storeId) {
      pageType = "p20";
      urlParams = {
        storeId: params.storeid || app.globalData.qrcode.storeid || "",
        orgCode: params.orgcode || app.globalData.qrcode.orgcode || "",
        skuId: params.skuId || "",
        activityId: params.activityId || "",
        promotionType: params.promotionType || "",
        isAddCart: params.isAddCart + "" == "true" || false,
        showCart: params.showCart || false,
        longitude: params.longitude || longitude || "",
        latitude: params.latitude || latitude || "",
        dj_par_key,
        popup: params.popup,
        channel: params.channel,
        cityId: params.cityId,
        channelBusiness: params.channelBusiness || '',
      };
    }
  } else if (type == 15) { // 频道页
    if (latitude && longitude) {
      pageType = 'p71';
      urlParams = {
        channelId: params.channelId || '',
        title: params.title || '京东到家'
      }
    }
  } else if (type == 12) { // 活动页
    if (latitude && longitude) {
      pageType = 'p22';
      urlParams = {
        activityId: params.activityId || '',
        latitude: latitude,
        longitude: longitude,
        cityId: params.cityId || app.globalData.addressInfo.cityId || '',
        dj_par_key,
        pushUserId: params.pushUserId,
        business: params.business
      }
    }
  } else if (type == 19) { // 砍价-商品列表
    if (latitude && longitude) {
      pageType = 'p15';
    }
  } else if (type == 20) { // 订单
    pageType = 'p3';
  } else if (type == 21) { // 我的页
    pageType = 'p4';
  } else if (type == 23) { // 搜索页
    if (latitude && longitude) {
      pageType = 'p23';
    }
  } else if (type == 25) { // 0元抽奖列表页
    if (latitude && longitude) {
      pageType = 'p25'
    }
  } else if (type == 26) { // 0元抽奖列详情页
    pageType = 'p26';
    urlParams = {
      activityId: params.activityId || '',
      groupId: params.groupId || '',
    }
  } else if (type == 4) { // 领券页
    pageType = 'p5';
    urlParams = {
      code: app.globalData.qrcode.code || '',
      orgCode: app.globalData.qrcode.orgcode || '',
      channel: app.globalData.qrcode.channel || '',
      type: app.globalData.qrcode.type || '',
    }
  } else if (type == 6) { // 门店获客
    if (longitude && latitude) {
      pageType = 'p31';
      urlParams = {
        cityName: app.globalData.addressInfo.cityName || '',
        channel: params.channel || app.globalData.qrcode.channel || '',
        code: params.code || '',
        cityId: app.globalData.addressInfo.cityId || params.city || '',
        longitude: longitude || '',
        latitude: latitude || '',
        storeId: params.storeid || '',
        orgcode: params.orgcode || '',
        business: params.business || ''
      }
    } else {
      mp.dialog({
        content: '授权定位才能领券噢',
        showCancel: false
      });
    }
  } else if (type == 27) { // 老带新团详情页
    pageType = 'p27';
    urlParams = {
      promotionId: params.promotionId || '',
      groupId: params.groupId || '',
    }
  } else if (type == 28) { // 拼团详情页
    if ((params.orgcode || params.orgCode) && (params.skuid || params.skuId)) {
      if (latitude && longitude) {
        getNearbyStoreId({
          orgCode: params.orgcode || app.globalData.qrcode.orgcode || '',
          longitude: longitude || app.globalData.addressInfo.longitude || '',
          latitude: latitude || app.globalData.addressInfo.latitude || '',
        }).then(res => {
          if (res && res.data && res.data.result && res.data.result.stationNo && res.data.result.orgCode) {
            app.globalData.qrcode.orgcode = res.data.result.orgCode;
            app.globalData.qrcode.storeid = res.data.result.stationNo;

            jumpAgreement.jump({
              pageType: 'p28',
              params: {
                orgCode: params.orgcode || res.data.result.orgCode || '',
                skuId: params.skuid || params.skuId || '',
                storeId: res.data.result.stationNo || ''
              },
              context: _this
            });
            // 重置跳转类型
            _this.setData({
              type: ''
            })
          } else {
            mp.dialog({
              content: '附近暂无该商家门店',
              showCancel: false
            });
            _this.setData({
              type: ''
            })
          }
        }).catch(err => {
          mp.dialog({
            content: '附近暂无该商家门店',
            showCancel: false
          });
          _this.setData({
            type: ''
          })
        })
      }
    } else {
      // console.error('===没有orgCode或skuId===')
    }
  } else if (type == 31) { // 分享有礼
    pageType = 'p36';
    urlParams = {}
  } else if (type == 32) { // 助力红包列表
    pageType = 'p40';
    urlParams = {
      longitude: longitude || '',
      latitude: latitude || '',
    }
  } else if (type == 39) { // 打卡
    pageType = 'p39'
  } else if (type == 41) { // 种豆赚豆
    pageType = 'p41'
  } else if (type == 43) { // 跳转至天天送蛋页
    pageType = 'p43';
    urlParams = {
      scene: params.scene || '',
      senderUserPin: params.senderUserPin || '',
      senderActivityId: params.senderActivityId || '',
      senderLotteryId: params.senderLotteryId || '',
      senderShareId: params.senderShareId || ''
    }
  } else if (type == 45) { // 帮忙砍价页
    pageType = 'p45';
    urlParams = {
      scene: params.paramText || '',
    }
  } else if (type == 46) { // 跳转至优惠券列表
    pageType = 'p16'
    urlParams = {
      duihuanma: params.duihuanma || ''
    }
  } else if (type == 47) {
    pageType = 'p47';
    urlParams = {
      paramText: params.paramText || {}
    }
  } else if (type == 51) {
    pageType = 'p51';
    urlParams = {
      orderId: params.orderId || ''
    }
  } else if (type == '53') { // 进入直播间
    pageType = 'p53';
    urlParams = {
      room_id: params.room_id || params.roomId || ''
    }
  } else if (type == '58') { // 进入直播列表
    if (longitude && latitude) {
      pageType = 'p58';
      urlParams = {}
    }
  } else if (type == '59') { // 跳转至秒杀页
    if (longitude && latitude) {
      pageType = 'p59';
      urlParams = {}
    }
  } else if (type == '76') {// 跳转至新版领券页
    pageType = 'p76';
    urlParams = {
      activityId: params.couponActivityId || "",
      qrCodeId: params.qrCodeId || ""
    };
  } else if (type == '68') { // 跳转至新券购页
    getCouponProtocol({
      couponId: params.couponId || '',
      couponGoSource: params.couponGoSource || ''
    }).then(res => {
      let result = res.data.result || '';
      if (res.data.code == '0' && result) {
        let { to = '', params = {}, userAction = "" } = result;
        let paramsNew = { userAction: userAction };
        for (let i in result.params) {
          if (i != 'passThroughParam') {
            paramsNew[i] = params[i]
          } else {
            for (let j in params.passThroughParam) {
              if (params.passThroughParam[j]) {
                paramsNew[j] = params.passThroughParam[j]
              }
            }
          }
        }
        if (to) {
          djCmsJump({
            to: to,
            params: paramsNew,
            userAction,
            preObj,
            buried_position: {
              currentPageName: 'handleScanOptionsAndJump'
            }
          })
        }
      }
    })
    return false
  } else if (type === '69') { // 附近商家
    if (longitude && latitude) {
      pageType = 'p69';
      urlParams = {
        title: params.title || '附近商家'
      }
    }
  } else if (type == 100) { // 签到页
    pageType = 'p46'
  } else if (type == 54) { // 社群红包落地页
    pageType = 'p77'
  }
  
  
  // 跳转至相应页面
  if (pageType) {
    jumpAgreement.jump({
      pageType: pageType,
      params: urlParams,
      context: _this
    });
    // 重置跳转类型
    _this.setData({
      type: ''
    })
  }
  
}



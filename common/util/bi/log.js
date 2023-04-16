import { encrypt } from '../aes.utils'
// 当前页和上一页
let pagePath = [];

/**
 * @description: abTest埋点
 * @param {Void} 
 * @return {String} ab埋点
 */
const _testTag = () => {
  // AB test
  let testTag = getApp().globalData.testtag;
  if (testTag.length > 0) {
    // 过期删除
    testTag.forEach((item, index) => {
      let endTime = Date.now();
      if (endTime - item.startTime > item.duration) { // 过期删除
        testTag.splice(index, 1)
      }
    })
  }
  return JSON.stringify(testTag)
};

/**
 * @description: 获取设备id
 * @param {Void} 
 * @return {String} 设备id
 */
const _getUUIDMD5 = () => {
  let { globalData } = getApp();
  let uuId = globalData.uuId;
  try {
    if (!uuId) {
      uuId = wx.getStorageSync('uuId');
    }
    if (!uuId) {
      let s = [];
      let hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";
      uuId = s.join("");
      globalData.uuId = uuId;
      wx.setStorageSync('uuId', uuId)
    }
  } catch (err) {
    // console.error(err)
  }
  return uuId
}
/**
 * @description: 判断上一页面是否有打开的半弹层
 * @param {type} 
 * @return: 
 */
const isPrevPageHasOpenMask = ()=>{
  // 
  let ref_path = pagePath[0] && pagePath[0].path || '';
  let halfMaskArr = getApp().globalData.halfMaskArr;
  let index = halfMaskArr.findIndex((item)=>{
    return item.path == ref_path
  })
  let maskName = ''
  if(index > -1 && halfMaskArr[index].subMaskArr  && Array.isArray(halfMaskArr[index].subMaskArr)){
    let len = halfMaskArr[index].subMaskArr && halfMaskArr[index].subMaskArr.length > 0 ? halfMaskArr[index].subMaskArr.length : -1
    if(len > 0 ){
      maskName = halfMaskArr[index].subMaskArr[len -1].name
    }
  }
  return maskName
}
/**
 * @description: 判断当前页面是否有打开的半弹层
 * @param {type} 
 * @return: 
 */
const isCurrentPageHasOpenMask = (page)=>{
  // 
  let current_path = page && page.path  || '';
  let halfMaskArr = getApp().globalData.halfMaskArr;
  let index = halfMaskArr.findIndex((item)=>{
    return item.path == current_path
  })
  let maskName = ''
  if(index > -1 && halfMaskArr[index].subMaskArr  && Array.isArray(halfMaskArr[index].subMaskArr)){
    let len = halfMaskArr[index].subMaskArr && halfMaskArr[index].subMaskArr.length > 0 ? halfMaskArr[index].subMaskArr.length : -1
    if(len > 0 ){
      maskName = halfMaskArr[index].subMaskArr[len -1].name
    }
  }
  return maskName
}
/**
 * @description: 接口上报埋点数据
 * @param {type} 
 * @return: 
 */
const _report = (log) => {
  let {
    type,
    page,
    clickId,
    pagePar,
    clickPar,
    version
    // isback = true
  } = log;
  // 处理h5页面userAction上报参数未解码问题
  if (pagePar && pagePar.ref_par && pagePar.ref_par.userAction) {
    pagePar.ref_par.userAction = decodeURIComponent(pagePar.ref_par.userAction)
  }
  let {
    config,
    loginStateInfo,
    networkType,
    addressInfo,
    qrcode,
    systemInfo = {},
    sourcefrom,
    appScene,
    wxGroupId,
    isBackToFront
  } = getApp().globalData;
  let date = new Date;
  // 获取地理位置
  let addressInfoLocal = {};
  try {
    addressInfoLocal = wx.getStorageSync('address_info')
  } catch (e) {
    /**/
  }

  // 获取风控位置
  let realTimeLocation = {};
  try {
    realTimeLocation = wx.getStorageSync('realTimeLocation')
  } catch (e) {
    /**/
  }
  // 上一页面，半弹层名字
  let preMaskName = isPrevPageHasOpenMask();
  let currentMaskName = isCurrentPageHasOpenMask(page);
  // console.log('----preMaskName------',preMaskName,'-----currentMaskName-----',currentMaskName,'-------pagePath--------',pagePath)
  // console.log('----halfMaskArr---log.js---------',JSON.stringify(getApp().globalData.halfMaskArr))
  // 上报参数
  var body = [
    {
      // 曝光埋点新加-版本
      "app_ver": config.xcxVersion,
      // 曝光埋点新加-当前页
      "cur_page": page && page.name || '',
      // 当前页路径
      "cur_path": page && page.path || '',
      // 平台
      "platcode": "wx_xcx",
      //1表示预发布，0表示线上
      "is_test": config.is_test,
      //上报类型，点击上报或页面上报
      "log_data_type": type,
      "session_id": loginStateInfo && loginStateInfo.o2o_m_h5_sid || "",
      //为了兼容，从后台进入前台的埋点上报 ;处理半弹层的问题引入的变量，不改动之前逻辑
      "ref_page_name": preMaskName ? preMaskName : isBackToFront === true ? 'outside' : pagePath[0] && pagePath[0].name || "",
      // 上一页路径
      "ref_path": pagePath[0] && pagePath[0].path || '',
      //本页地址
      "page_name":currentMaskName ? currentMaskName : page && page.name || "",
      // 设备号
      "device_id": _getUUIDMD5(),
      "network": networkType,
      "poi_select": addressInfo.poi || "",
      "lat_select": addressInfo.latitude || "",
      "lng_select": addressInfo.longitude || "",
      "city_id_select": addressInfo.cityId || "",
      "city_name_select": addressInfo.cityName || "",
      "lng_pos": addressInfo.longitude || "",
      "lat_pos": addressInfo.latitude || "",
      "channel_name": qrcode.business || "usedwechatapp",
      "app_name": "wx_xcx",
      "app_version": config.xcxVersion || "",
      "wechat_version": systemInfo.version || "",
      "create_time": date.getTime(),
      "visit_time": date.getTime(),
      "os": systemInfo.system.indexOf && systemInfo.system.indexOf("iOS") == 0 ? "iOS" : "android",
      "os_ver": systemInfo.system.split(" ")[1],
      "openId": loginStateInfo && loginStateInfo.openId || "",
      "brand": systemInfo.brand,
      "model": systemInfo.model,
      "click_par": clickPar || {},
      "ext_par": {
        // 埋点版本号
        "buried_version": version || '',
        "lat_pos": realTimeLocation.latitude || '',
        "lng_pos": realTimeLocation.longitude || '',
        "city_name_pos": realTimeLocation.cityName || '',
        "city_id_pos": realTimeLocation.cityId || '',
        "lng": addressInfoLocal.longitude || addressInfo.longitude || '',
        "lat": addressInfoLocal.latitude || addressInfo.latitude || '',
        "poi": addressInfoLocal.poi || addressInfo.poi || '',
        "city_id_select": addressInfoLocal.cityId || addressInfo.cityId || '',
        "city_name_select": addressInfoLocal.cityName || addressInfo.cityName || '',
        "adcode": addressInfoLocal.adcode || addressInfo.adcode || '',
        "districtCode": addressInfoLocal.districtCode || addressInfo.districtCode || '',
        "fontSizeSetting": systemInfo.fontSizeSetting,
        "SDKVersion": systemInfo.SDKVersion,
        "language": systemInfo.language,
        // – index 首页；channel 频道页
        "sourcefrom": sourcefrom,
        "scene": qrcode,
        "wxScene": appScene,
        "wxGroupId": wxGroupId || "",
        "dj_par_key": qrcode.dj_par_key || "",
        "mpChannel": 'wx_xcx',
      },
      "page_par": pagePar || "",
      // 非必传参数
      "user_id": loginStateInfo && loginStateInfo.PDJ_H5_PIN || "",
      "store_id": clickId ? (clickPar.store_id || clickPar.storeId || "") : (pagePar.store_id || pagePar.storeId || ""),
      "sku_id": clickId ? (clickPar.sku_id || clickPar.skuId || "") : (pagePar.sku_id || pagePar.skuId || ""),
      "order_id": clickId ? (clickPar.order_id || clickPar.orderId || "") : (pagePar.order_id || pagePar.orderId || ""),
      "click_id": clickId || "",
      // AB test
      "testtag": _testTag()
     
    }
  ];
  let is_djencryptFlag_log = null;
  try {
    is_djencryptFlag_log = wx.getStorageSync('djencryptFlag_log')
    if (!is_djencryptFlag_log) {
      is_djencryptFlag_log = 'success'
    }
  } catch (e) {
    /**/
  }
  let app = getApp();
  let sendData
  if (app.globalData.config.env == 'pro' && is_djencryptFlag_log == 'success') {
    sendData = {
      "kafka topic": "topic_daojia_wechat_app",
      "logType": "daojia_wechat",
      // "json": JSON.stringify(body),
      "json": encodeURIComponent(encrypt(JSON.stringify(body))),
      "jef": 1
    }
  } else {
    sendData = {
      "kafka topic": "topic_daojia_wechat_app",
      "logType": "daojia_wechat",
      "json": JSON.stringify(body), // JSON.stringify()会处理空值
    };
  }
  wx.request({
    timeout:1000,
    url: config.buriedUrl, //预发布
    // logType 目前取值有：app、h5、delivery_daojia_h5、jingming,api
    // data: {
    //     "kafka topic": "topic_daojia_wechat_app",
    //     "logType": "daojia_wechat",
    //     "json": JSON.stringify(body)
    // },
    data: sendData,
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'cart_uuid=' + _getUUIDMD5(),
      'sid': loginStateInfo && loginStateInfo.o2o_m_h5_sid || ""
    },

    success: function (res) {
      if (res.data.code == 0) {
        if (is_djencryptFlag_log == 'nosuccess') {
          wx.setStorageSync('djencryptFlag_log', 'success')
        }
      }
      //接口加密传输失败，降级明文传输
      if (res.data.code == 110) {
        //接口没有请求成功，设置加密传输flag
        wx.setStorageSync('djencryptFlag_log', 'nosuccess')
        wx.request({
          timeout:1000,
          url: config.buriedUrl, //预发布
          // logType 目前取值有：app、h5、delivery_daojia_h5、jingming,api
          data: {
            "kafka topic": "topic_daojia_wechat_app",
            "logType": "daojia_wechat",
            "json": JSON.stringify(body)
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'cart_uuid=' + _getUUIDMD5(),
            'sid': loginStateInfo && loginStateInfo.o2o_m_h5_sid || ""
          },

          success: function (res) {
            //接口加密传输失败，降级明文传输
            if (res.data.code == 110) {
              //接口没有请求成功，设置加密传输flag
              wx.setStorageSync('djencryptFlag_log', 'nosuccess')
            }
          },
          fail: function () { },
          complete: function () {
           
          }
        })
      }
    },
    fail: function () { },
    complete: function () {
     
    }
  })
}

/**
 * @description: 找到页面的埋点数据
 * @param {Array}  keys 需要上报的埋点数据
 * @param {Object} buried 页面中定义的埋点数据
 * @param {Object} dataset xml接口上自定义的数据
 * @return {Object} 需要上报的参数集合
 */
const _findLogParams = (keys, buried, dataset, page,clickId) => {
  Object.assign(buried, dataset);
  let params = {};
  // 增加pv 数据上报增加统一字段
  if (keys.indexOf('ref_par') < 0) {
    keys.push('ref_par')
  }
  if(!clickId){
    // ret_Type是pv埋点,click埋点不需要增加ret_Type
    if (keys.indexOf('ret_Type') < 0) {
      keys.push('ret_Type')
    }
  }
   
  // if (keys.indexOf('urlParams') < 0) {
  //     keys.push('urlParams')
  // }
  keys.length && keys.forEach(item => {
    if (!buried[item]) {
      // console.error(`${item} from buried data is not defined at ${page.path}, Don't be a brother with Trump, it's terrible = =!`)
    }
    try {
      params[item] = buried[item]
    } catch (err) {
      /**/
    }
  });
  return params
}

/**
 * @description: 点击埋点上报
 * @param {Object} page 页面的路径和名称 
 * @param {Array}  keys 需要上报的埋点数据
 * @param {Object} buried 页面中定义的埋点数据
 * @param {Object} dataset xml接口上自定义的数据
 * @param {String} clickId 点击名称 
 * @return {Void}
 */
const _clickBuried = (page, keys, buried, dataset, clickId, version) => {
  let log = {
    type: 'wechat_app_click',
    page: page || {},
    clickId: clickId,
    version: version || '',
    clickPar: _findLogParams(keys, buried, dataset, page,clickId)
  };
    
  _report(log)
}

/**
 * @description: PV埋点上报
 * @param {Object} page 页面的路径和名称 
 * @param {Array}  keys 需要上报的埋点数据
 * @param {Object} buried 页面中定义的埋点数据
 * @param {Object} dataset xml接口上自定义的数据
 * @return {Void}
 */

const _pvBuried = (page, keys, buried, dataset, version) => {
  let log = {
    type: 'wechat_app_pv',
    page: page,
    version: version || '',
    pagePar: _findLogParams(keys, buried, dataset, page)
  };
  
  _report(log)
}

/**
 * @description: 上报当前页面
 * @param {Object} 当前页面 
 * @return {Void}
 */
const _recodePage = (page) => {
  try {
    let app = getApp();
    let historyPage = app.globalData.historyPage || [];

    let flag = true;
    let pageArr = getCurrentPages();

    let back_deltaNum = app.globalData.back_deltaNum;
    // 主要是处理navigateBack情况，当获取的页面栈数量和回退数量一致时，才执行
    if (back_deltaNum && pageArr.length == back_deltaNum || !back_deltaNum) {

      // 区分搜索中间页是全局还是店内
      let currentPageOpts = pageArr[pageArr.length - 1] && pageArr[pageArr.length - 1].options || {};
      currentPageOpts.fromSource == "storehome" && (page.name = 'storeSearch');
      // 当时为什么做这样的处理？？？
      // if (historyPage[1] && historyPage[1].path === currentPagePath) {
      //     flag = false
      // }
      if (flag) {
        if (!historyPage.length) {
          historyPage.push({ path: "", name: "" })
          historyPage.push(page)
        } else {
          historyPage.shift();
          historyPage.push(page)
        }
        // 本地更新
        pagePath = historyPage || [];
        // 全局更新
        app.globalData.historyPage = historyPage || [];
      }
      app.globalData.back_deltaNum = 0
    }

  } catch (e) { 
    /**/
  }
}

/**
 * @description: 上报数据
 * @param {Object} buried 埋点需要的数据，再页面里预先定义好。
 * @param {Object} page 包含当前页面路径和名称
 * @param {track} track 包含需要上报的参数，监听元素名或者方法名称。
 * @param {dataset} dataset 包含需要上报元素上自定义的参数。
 * @return: 
 */
// export const log = ({
//     buried,
//     page,
//     track,
//     dataset,
//     version
// },isback) => {
export const log = ({
  buried,
  page,
  track,
  dataset,
  version
}) => {
  let {
    dataKeys,
    clickId
  } = track;
    // 添加pv必须传字段
  if (dataKeys.indexOf('ref_par') < 0) {
    dataKeys.push('ref_par')
  }
  if(!clickId){
    if (dataKeys.indexOf('ret_Type') < 0) {
      dataKeys.push('ret_Type')
    }
  }
   
  // if (dataKeys.indexOf('urlParams') < 0) {
  //     dataKeys.push('urlParams')
  // }
  // 页面记录
  page && _recodePage(page);
  if (!buried) {
    buried = {}
  }
  if (clickId) {
    // 上报click埋点
    if (buried.ref_par && buried.ref_par.userAction) {
      delete buried.ref_par
    }
    _clickBuried(page, dataKeys, buried, dataset, clickId, version);
  } else {
    // 上报pv埋点
    // _pvBuried(page, dataKeys, buried, dataset, version,isback)
    _pvBuried(page, dataKeys, buried, dataset, version)
  }
}

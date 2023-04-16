/* 使用说明
1.在rewrite.js中的relation对象中添加需要提前请求的页面路径及path
2.在需要提前请求的接口路径js中 引入rewrite.js,导出observeProxy
example:  import { observeProxy, setProxy } from '../../common/util/rewrite'
3.在原接口请求出添加以下逻辑
  if (observeProxy.aheadRqFinish == null) {
    没有提前请求或者请求完成之后重置，当前页面自主发起请求
    do something{
      调用接口
      调用公共处理逻辑
    }
  } else if (observeProxy.aheadRqFinish == 'loading') {
    已发起提前请求，但是在页面发起接口请求时还未完成
    do something{
      向observeProxy.stack中添加处理公共处理逻辑的函数
        假如公共处理函数只有一个参数即接口返回值res
        observeProxy.stack = (公共处理逻辑函数)
        或者处理函数接口多个参数,使用bind将除返回值res的参数依次传入
        observeProxy.stack = (公共处理逻辑函数.bind(参数1,参数2,...))
    }
    
  } else if (observeProxy.aheadRqFinish == 'finished') {
    已发起提前请求，且在页面发起接口请求时已完成
    do something {
      调用公共处理逻辑函数, 返回值取observeProxy.preLoad
      调用setProxy(true)重置
    }
  }
具体使用例子单函数参数秒杀页seckill;多函数参照活动页activity/homeFocus

*/

import { request, FNIDS } from './api.js'
// 设置Proxy代理
let queued = {
  aheadRqFinish: null,
  preLoad: null,
  stack: null
}

export const observeProxy = new Proxy(queued, {
  set: function(target, keys, value) {
    if (keys === 'preLoad' && value !== null && target['aheadRqFinish'] === 'finished') {
      // console.log(value, 'hdw__')
      // console.log(target.stack, 'target.stack')
      // console.log(target.stack.size, 'target.stack.size()')
      if (target.stack != null && target.stack instanceof Function) {
        let result = value, program = target.stack
        setProxy(true)
        program.call(null, result)
      }
    }
    return Reflect.set(target, keys, value)
  }
})

/* 重置/赋值 proxy函数 */
export const setProxy = function(resets, values, datas) {
  if (resets) {
    observeProxy.aheadRqFinish = null
    observeProxy.preLoad = null,
    observeProxy.stack = null
  } else {
    observeProxy.aheadRqFinish = values
    observeProxy.preLoad = datas
  }
}

/* 重写navigateTo跳转api */
const oldNavigate = wx.navigateTo;
Object.defineProperty(wx, "navigateTo", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: async function() {
    const params = arguments[0];
    // console.log(Date.now(), '跳转前')
    // 跳转前重置proxy
    setProxy(true)
    Promise.all([analyse(params.url), oldNavigate.call(this, params)])
  },
});

/* 参数解析函数 */
const analyse = function(params) {
  return new Promise(() => {
    let url, options = {};
    let step1 = params.split('?')
    url = step1[0]
    if (step1[1] && step1[1].split('&').length) {
      step1[1].split('&').map(item => {
        let keys = item.split('=')[0], value = item.split('=')[1];
        options[keys] = value
      })
    }
    if (relation[url] != undefined) {
      let body = relation[url].joinParam(options)
      let requestPath = relation[url].api
      let method = relation[url].method || 'get'  
      if (body != null) {
        let data = {
          isNeedDealError: true,
          method,
          ...requestPath,
          body
        }
        fetchData(data, relation[url].pathName)
      }
    }
  })
}

/* 接口请求函数 */
const fetchData = function(data) {
  // console.log(Date.now(), '提前请求前')
  setProxy(false, 'loading', null)
  request(data).then(res => {
    // console.log(Date.now(), '提前请求后')
    setProxy(false, 'finished', res)
  }).catch(err => {
    wx.showModal({
      content: '服务异常，请稍后再试~',
      confirmText: '重新加载',
      cancelText: '返回',
      success(res) {
        if (res.confirm) {
          fetchData(data)
        } else if (res.cancel) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  })
}

/** 页面路径与请求接口对应表 */
/* 参数说明
 api        需要请求的接口路径        必填
 pathName   页面名称                非必填
 method     请求方式                post为必填，get可以填''
 joinParam  生成body参数的函数       必填
*/
const relation = {
  // '/pages/seckill/index': {
  //   api: FNIDS.grabFloorListNew,
  //   pathName: 'seckill',
  //   method: 'get',
  //   joinParam: function(options) {
  //     return jointSecill(options)
  //   }
  // },
  // '/pages/activity/homeFocus/index': {
  //   api: FNIDS.globalActivity,
  //   pathName: 'activity',
  //   method: 'POST',
  //   joinParam: function(options) {
  //     return jointActive(options)
  //   }
  // },
  // '/pages/channelNew/index': {
  //   api: FNIDS.channelDetail,
  //   pathName: 'channel',
  //   joinParam: function(options) {
  //     return jointChannel(options)
  //   }
  // }
}

/* 各页面接口拼接参数方法  --START--    */
let jointSecill = function(options) {
  let address = wx.getStorageSync('address_info')
  let body = {
    ctp: 'seckill_active',
    ref: 'home',
    pageSource: 'seckill',
    refPageSource: 'home',
    longitude: address.longitude,
    latitude: address.latitude,
    areaCode: address.adcode,
    city: address.cityName
  }
  return body
}

let jointActive = function(options) {
  let activityId = options.activityId || "";
  let storeId = options.storeId || null;
  let longitude = "", latitude = "", cityId = "";
  let globalData = getApp().globalData;

  if (globalData.addressInfo.longitude && globalData.addressInfo.latitude) {
    longitude = globalData.addressInfo.longitude;
    latitude = globalData.addressInfo.latitude;
    cityId = globalData.addressInfo.cityId;
  } else {
    try {
      let addressInfo = wx.getStorageSync('address_info') || {};
      longitude = addressInfo.longitude || "";
      latitude = addressInfo.latitude || "";
      cityId = addressInfo.cityId || "";
    } catch (e) {}
  }
  
  // 如果本地有经纬度
  if (longitude && latitude) {
    let body = {
      areaCode: cityId,
      downgradeInfo: "",
      longitude: longitude,
      activityId: activityId,
      currentPage: 1,
      coordType: "2",
      latitude: latitude,
      store_id: storeId,
      pageSource: "activityDetail"
    }
    return body
  } else {
    return null
  }
}

let jointChannel = function(options) {
  const addressInfo = wx.getStorageSync('address_info') || {};
  const { longitude = '', latitude = '', cityId = '', cityName = '' } = addressInfo;
  let body = {
    city: cityName,
    areaCode: cityId,
    longitude,
    latitude,
    coordType: "2",
    channelId: options.channelId,
    refPageSource: '',
    pageSource: 'newChannelPage',
    ctp: 'channel',
    ref: 'home'
  }
  return body
}

/* 各页面接口拼接参数方法  --END--    */
import FNIDS from './functionId'
import versionConfig from './releaseVersion'
// import {getSecurityList} from '../../miniprogram_npm/@dj-lib/dj-base-lib/index'
// export const testGetsecurityList = function () {
//   let { functionId = '', appVersion = '' } = FNIDS.securityList || {};
//   let params = {
//     functionId,
//     appVersion,
//     versionConfig
//   }
//   getSecurityList(params).then(res => {
//     if (res.data.code == 0) {
//       let list = res.data.result || []
//       wx.setStorageSync('security_list', JSON.stringify(list));
//       let target = list.find(item => {
//         return item.dictCode == 'sv';
//       })
//       if (target && target.dictValue == 1) {
//         wx.setStorageSync('SWITCH_SV2', 1);
//       }else{
//         wx.setStorageSync('SWITCH_SV2', 0);
//       }

//       let colorApi = list.find(item => {
//         return item.dictCode == 'colorSwitch';
//       })
//       if (colorApi && colorApi.dictValue == 1) {
//         wx.setStorageSync('colorSwitch', 1);
//       }else{
//         wx.setStorageSync('colorSwitch', 0);
//       }
//     }
//   }).catch(v => {
//     console.log('获取云配置信息失败', v)
//   })
// }


export const testGetsecurityList = function () {
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
  }else if(envVersion == 4) {
    origin = 'testpdj-three'
  }
  let { functionId = '', appVersion = '' } = FNIDS.securityList || {};
  // develop: 工具或者真机 开发环境
  // trial: 测试环境(体验版)
  // release: 正式环境
  let token = envVersion == 1 ? '2fd5776a6bb443b848673b3969ec0c53' : 'a3c06e53d153571cb96c6e3b2ecec590';
  wx.request({
    method: 'GET',
    url: `https://${origin}.jd.com/client`,
    data: {
      functionId,
      appVersion,
      body: {
        xcxVersion: `${versionConfig.xcxVersion}.${versionConfig.xcxUpdateVersionTimes}`,
        groupCode: 'common',
        sysCode: 'daojia.jd.com',
        token: token
      }
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded;',
      'Cookie': '',
      'sid': ''
    },
    success (res) {
      if (res.data.code == 0) {
        let list = res.data.result || []
        wx.setStorageSync('security_list', JSON.stringify(list));
        let target = list.find(item => {
          return item.dictCode == 'sv';
        })
        if (target && target.dictValue == 1) {
          wx.setStorageSync('SWITCH_SV2', 1);
        }else{
          wx.setStorageSync('SWITCH_SV2', 0);
        }

        let colorApi = list.find(item => {
          return item.dictCode == 'colorSwitch';
        })
        if (colorApi && colorApi.dictValue == 1) {
          wx.setStorageSync('colorSwitch', 1);
        }else{
          wx.setStorageSync('colorSwitch', 0);
        }
        // 合并
        const serverConfig = {
          // epPercent:0.5,
          // epDuration:1000,
          epMTADelayRatio: 0, // 元素露出比例。（但是为什么字段名是"延迟比例"？）
          epMTADelayDuration: 0, // 元素露出时长。 （但是为什么字段名是"延迟时长"？）
          domainList: ['jd.com', 'jddj.com', 'healthjd.com', 'imdada.cn'], // 域名白名单
          djEncrypt: 1, // 网络请求加密
          sv: 0, // 验签版本，默认0代表走signV1，1代表signV2
          towebEncrypt: 0, // to web 协议默认不加密
          needLatList: ['.jd.com'], // 需要传入位置信息的白名单
          plaintextList: [], // 位置信息需要降级明文原逻辑传输的白名单
          privacyVer: 1,
          signNeedBody: 0, // body是否参与接口验签
          isGray: 0, // 是否命中灰度  预发布环境会在配置系统中配置这个key值，线上不会配置，走正常灰度
          degradeList: [], // 降级页面列表
          fetchGray: 0, // 默认不开启灰度
          storeAllCouponsIsXcx: 0 // 门店优惠券列表落地页切成小程序，默认不开启
        };
        if (list && list.length) {
          for (let i = 0; i < list.length; i++) {
            const item = list[i];
            // 配置系统只能配string
            // 这里用默认值来转换类型，但是目前只弄了number类型，没有弄bool类型
            if (!item) { continue }
            const key = item.dictCode;
            const item_dictValue = item.dictValue;
            // console.log(key);
            const dictValue = (typeof serverConfig[key] === 'number') ? parseFloat(item_dictValue, 10) : JSON.parse(item_dictValue);
            // if (key === 'degradeList'){
            // console.log('dictValue', dictValue);
            // }
            serverConfig[key] = dictValue;
          }
        }
        wx.setStorageSync('serverConfig', serverConfig)
      }
    },
    fail () {
    }
  })
}
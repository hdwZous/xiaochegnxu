import { request } from './api'
import { encryptRsa } from './index.weapp.js'
//https://confluence.corp.imdada.cn/pages/viewpage.action?pageId=26617574 需求文档
import versionConfig from './releaseVersion'

const LATITUDE = 'h7'
const LONGITUDE = 'h8'
let device = null
class DeviceInfo {
  //    tokenId = null;
  //     dataJson = {
  //         f5: "1.0.0",
  //         h0: "wx_xcx",
  //         //
  //         h1: "",
  //         h2: "",
  //         h3: "",
  //         h4: "",
  //         //
  //         h5: "",//openid
  //         h6: "",//unionid
  //         //
  //         h7: "",//latitude
  //         h8: "",//longitude
  //         // h9: "",//altitude 高度信息不收集
  //         //
  //         i0: "",
  //         i1: "",
  //         i2: "",
  //         i3: "",
  //         i4: "",
  //         i5: "",
  //         i6: "",
  //         i7: "",
  //         i8: "",
  //         i9: "",

  //         j0: "",
  //         j1: "",
  //         j2: "",
  //         j3: "",
  //         j4: "",
  //         j5: "",
  //         // j6: "", 蓝牙信息此次不收集
  //         // j7: "",
  //         // j8: "",
  //         j9: "",
  //         k0: "",
  //         k1: "",
  //     };
  constructor() {
    this.tokenId = null;
    let launchOption = wx.getLaunchOptionsSync()
    let { path, scene, referrerInfo, chatType = "" } = launchOption
    this.dataJson = {}
    this.dataJson.f5 = "1.0.0",
    this.dataJson.h0 = "wx_xcx",
    this.dataJson.h1 = path
    this.dataJson.h2 = scene
    this.dataJson.h3 = referrerInfo
    this.dataJson.h4 = chatType

    this.dataJson.h5 = wx.getStorageSync('openId')
    this.dataJson.h6 = wx.getStorageSync('unionid')

    let addressInfo = wx.getStorageSync("address_info") || {}
    this.dataJson.h7 = addressInfo.latitude || ""
    this.dataJson.h8 = addressInfo.longitude || ""

    //获取设备信息
    let systemInfo = wx.getSystemInfoSync()
    let { brand, model, pixelRatio, screenWidth, screenHeight, windowHeight, statusBarHeight, system, SDKVersion, benchmarkLevel, deviceOrientation } = systemInfo

    this.dataJson.i0 = brand
    this.dataJson.i1 = model
    this.dataJson.i2 = pixelRatio
    this.dataJson.i3 = screenWidth
    this.dataJson.i4 = screenHeight

    this.dataJson.i5 = windowHeight
    this.dataJson.i6 = statusBarHeight

    //
    let battery = wx.getBatteryInfoSync()
    let { level, isCharging } = battery
    this.dataJson.i7 = level
    this.dataJson.i8 = isCharging ? 1 : 0

    wx.getScreenBrightness({
      success: (res) => {
        this.dataJson.i9 = res.value
      }
    })
    wx.getLocalIPAddress && wx.getLocalIPAddress({
      success: (res) => {
        this.dataJson.j0 = res.localip
      }
    })
    this.dataJson.j1 = versionConfig.xcxVersion
    this.dataJson.j2 = system
    this.dataJson.j3 = SDKVersion


    this.dataJson.j4 = benchmarkLevel
    this.dataJson.j5 = deviceOrientation
    // 不收集蓝牙信息
    // wx.getBluetoothDevices({
    //     success: res => {
    //         res.devices.map(item => {
    //             this.dataJson.j6 = item.deviceId
    //             this.dataJson.j7 = item.name
    //             this.dataJson.j8 = item.RSSI
    //         })
    //     }
    // })
    wx.getNetworkType({
      success: (res) => {
        // console.error("getNetworkType res", res)
        this.dataJson.j9 = res.networkType || ""
        this.dataJson.k0 = res.signalStrength || "0"
      }, fail: () => {
        // console.error("getNetworkType fail", res)
      }
    })
    wx.getConnectedWifi({
      success: (res) => {
        // console.error("getConnectedWifi res", res)
        this.dataJson.k1 = res.wifi.SSID || ""
      },
    })
  }
  initData() {

  }
  setLatitude(val) {
    this.set(LATITUDE, val)
  }
  setLongitude(val) {
    this.set(LONGITUDE, val)
  }
  set(key, value) {
    this.dataJson[key] = value
  }
  getAll() {
    return this.dataJson
  }
  report() {
    return new Promise(resolve => {
      let st = setTimeout(() => {
        Object.keys(this.dataJson).map(key => {
          // console.log(key, '的值是', this.dataJson[key])
        })
        // console.log( JSON.stringify(this.dataJson))
        request({
          functionId: "deviceReport/add",
          method: "POST",
          isNeedDealError: true,
          isForbiddenDialog: true,
          body: {
            dataJson: encryptRsa(JSON.stringify(this.dataJson)),
          },
        })
          .then((res) => {
            if (res.data.code == 0) {
              wx.setStorageSync("device_token_id", res.data.tokenId);
              resolve(res.result.tokenId);
            } else {
              resolve(null);
            }
            clearTimeout(st);
          })
          .catch(() => {
            clearTimeout(st);

            resolve(null);
          });
      }, 500)
    })
  }
  async getTokenId() {
    return this.tokenId
    // if (this.tokenId) {
    //     return this.tokenId
    // }
    // else {
    //     let tokenId = await this.report()
    //     return tokenId
    // }
  }
}

export default function getDeviceInfo() {
  return device = device ? device : new DeviceInfo()
}
module.exports = getDeviceInfo
import { request, FNIDS } from "../../../common/util/api"
import {
  clickBuriedV2_,
  pvBuriedV2_
} from "../../../common/util/BI"
import util from "../../../common/util/util"
import { getDaoJiaLocation } from "../../../common/util/services";
import {
  djCmsJump
} from '../../../common/util/agreementV2.js'
import { addFilterMsg, warn, error } from '../../../common/util/wxLog';
let app = getApp();
let map;
let time = null;
Page({
  // 埋点
  buried: {
    store_id: "current_address_list",
    poi: ''
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 来源
    from: "",
    // 经度
    longitude: "",
    // 纬度
    latitude: "",
    // 地址列表
    addressList: [],
    // 更新地图地址时，返回顶部
    scrollTop: 0,
    // 默认页-类型
    type: "-1",
    // 默认页-按钮
    btnText: "",
    // 默认页-提示
    tips: "",
    // 默认页-图标
    src: "",
    // 搜索联想词儿需要隐藏地图
    hideMap: false,
    // 搜索联系词儿列表
    searchList: [],
    // 输入框值
    inputVal: "",
    // 显示隐藏输入框清楚按钮
    hideClear: true,
    // 城市
    cityName: "",
    self_page: 'current_address_list',
    optionsPos: null 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 处理从h5页面
    if (options.originUrl) {
      this.buried.originUrl = options.originUrl;
    }
    // 使用 wx.createMapContext 获取 map 上下文
    map = wx.createMapContext("map");
    this.getLocation().then(res => {
      let longitude = res.longitude;
      let latitude = res.latitude;
      if (options.from === 'addressList') { // 地址列表页
        this.setData({
          longitude: longitude || "",
          latitude: latitude || ""
        });
        this.transferLocation({
          longitude,
          latitude
        })
      } else {
        this.setData({
          from: options.from || "",
          longitude: longitude || "",
          latitude: latitude || "",
          cityName: options.cityName || ""
        });
      }
      this.getCenterLocation(longitude, latitude)
    }).catch(() => {
      this.setData({
        from: options && options.from || "",
        cityName: options && options.cityName || ""
      })
    })
    this.setData({
      optionsPos: options
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  pvFunc(back) {
    pvBuriedV2_({
      page_par: {
        ref_par: {
          traceId: this.data.recommendObj.preTraceId || "",
          userAction: this.data.recommendObj.preUserAction || "",
        }
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName,
      isBack: back || "",
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 转化地址
  transferLocation({ longitude = '', latitude = '' } = {}) {
    getDaoJiaLocation({
      longitude: longitude,
      latitude: latitude
    }, function (res) {
      if (res && res.cityName) {
        this.setData({
          cityName: res.cityName || ''
        })
      }
    })
    // request({
    // 	// 真实接口
    // 	functionId: "local/getAddressN",
    // 	body: {
    // 		"longitude": longitude,
    // 		"latitude": latitude,
    // 		"coord_type": "1",
    // 		"needMatch": 0
    // 	}
    // }).then(res => {
    // 	if (res.data && res.data.code == '0' && res.data.result) {
    // 		let	result = res.data.result;
    // 		this.setData({
    // 			cityName: result.city || ""
    // 		})
    // 	}
    // }).catch(err => {

    // })
  },

  /**
   * 获取当前位置
   */
  getLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: "gcj02",
        success(res) {
          resolve(res)
        },
        fail(err) {
          wx.showToast({
            title: '获取地理位置失败，请检查网络！',
            icon: "none",
            duration: 2000
          })
          reject(err)
        }
      })
    })
  },

  /**
   * 移动地图
   */
  regionChange(e) {
    let { longitude, latitude } = this.data;
    if (e.type === "end" && longitude && latitude) {
      this.getCenterLocation()
    }
  },

  /**
   * 获取地图可视区中心点的经纬度
   */
  getCenterLocation(longitude, latitude) {
    let self = this;
    map.getCenterLocation({
      success(res) {
        // 获取地图定位附近地址列表
        self.getAddressList({
          longitude: longitude || res.longitude,
          latitude: latitude || res.latitude
        })
      }
    })
  },

  /**
   * 将地图中心移动到当前定位点
   */
  resetMap() {
    this.reportResetMap()
    // 埋点
    clickBuriedV2_({
      click_id: "getMyPosition",
      click_par: {
          
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName,
    })
    map.moveToLocation()
  },

  /**
   * 获取地图定位附近地址列表
   */
  getAddressList(obj) {
    let self = this;
    let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
    request({
      ...FNIDS.getLocalAddressList,
      body: {
        coord_type: "5",
        longitude: obj.longitude || "",
        latitude: obj.latitude || "",
        pageId: pageIdFirstPage
      },
      preObj: recommendObj
    }).then(res => {
      let result = res.data && res.data.result;
      if (res.data && res.data.code === "0") {
        if (result && result.length > 0) {
          let openCityResult = result.filter(item => {
            return item.areaCode
          });
          if (openCityResult.length > 0) {
            self.setData({
              addressList: openCityResult,
              scrollTop: 0
            })
          } else {
            self.setData({
              addressList: [],
              // 默认页-类型
              type: 3,
              // 默认页-按钮
              btnText: "",
              // 默认页-提示
              tips: "很抱歉，当前位置未开通服务",
              // 默认页-图标
              src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png"
            })
          }
        } else {
          self.setData({
            addressList: [],
            // 默认页-类型
            type: 3,
            // 默认页-按钮
            btnText: "",
            // 默认页-提示
            tips: "很抱歉，当前位置未开通服务",
            // 默认页-图标
            src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png"
          })
        }
      } else {
        self.setData({
          addressList: [],
          // 默认页-类型
          type: 3,
          // 默认页-按钮
          btnText: "",
          // 默认页-提示
          tips: "很抱歉，当前位置未开通服务",
          // 默认页-图标
          src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png"
        })
        wx.reportMonitor(51, 20);
      }
    }).catch(err => {
      self.setData({
        addressList: [],
        // 默认页-类型
        type: 3,
        // 默认页-按钮
        btnText: "",
        // 默认页-提示
        tips: "很抱歉，当前位置未开通服务",
        // 默认页-图标
        src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png"
      })
      let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
      let errInfo = err && err.toString();
      wx.reportMonitor(51, 20);
      let deviceid_pdj_jd = util.getUUIDMD5();
      addFilterMsg('getLocalAddressListFn')
      addFilterMsg(deviceid_pdj_jd)
      addFilterMsg(PDJ_H5_PIN)
      error(errInfo)
    })
  },

  /**
   * 点击地址列表项，跳转至上一页
   */
  clickAddressListItem(e) {
    let data = e.currentTarget.dataset;
    let buried = data.buried;
    let longitude = data.longitude;
    let latitude = data.latitude;
    let cityId = data.cityId;
    let cityName = data.cityName || '';
    let countyName = data.countyName;
    let poi = data.poi;
    let countyId = data.countyId;
    let addressInfo = {
      cityId: cityId,
      cityName: cityName,
      countyName: countyName,
      latitude: latitude,
      longitude: longitude,
      poi: poi,
      countyId: countyId
    };

    if (this.buried.originUrl) {
      let { recommendObj = {}, optionsPos = {} } = this.data;
      djCmsJump({
        to: 'web',
        params: {
          url: this.buried.originUrl
        },
        userAction: JSON.stringify(addressInfo),
        preObj: recommendObj,
        buried_position: {
          currentPageName:'current_address_list2',
          optionsPos
        }
      })

      return
    }
    if (buried === "search") {
      this.reportRecPoi(poi)
    } else {
      this.reportPoi(poi)
    }
    if (this.data.from === "createOrEdit") {
      let addressEditInfo = wx.getStorageSync("address_edit_info");
      if (!addressEditInfo) {
        addressEditInfo = {}
      }
      let newAddressEditInfo = Object.assign(addressEditInfo, addressInfo);
      // 缓存地理位置信息
      this.setStorageSync("address_edit_info", newAddressEditInfo, false).then(() => {
        wx.navigateBack()
      }).catch(err => {

      })
      //来源是 拼团选择门店
    } else if (this.data.from === "group_buy_choose_store") {
      let pages = getCurrentPages();

      for (let page of pages) {
        if (page && (page.route == "pages/groupBuy/chooseStore/index")) {
          page.setData({
            addressInfo: addressInfo
          });
          wx.navigateBack();
          break
        }
      }
      // 来源是超级会员码，门店列表
    } else if (this.data.from === "voucherstoList") {
      let pages = getCurrentPages();
      for (let page of pages) {
        if (page && (page.route == "pages/coupon/storeList/index")) {
          page.setData({
            addressInfo: addressInfo
          });
          wx.navigateBack();
          break
        }
      }
    } else {
      // 缓存地理位置信息
      util.saveAddressPoi(addressInfo)
      // wx.setStorageSync('address_info', addressInfo);
      util.refreshHomePage();
      app.globalData.addressInfo = addressInfo;
      app.globalData.needCheckLocationChange = false;
      
      if(addressInfo.poi !== wx.getStorageSync('address_info').poi){
        let logParams = {
          globalAddressInfo: app.globalData.addressInfo,
          addressInfo: wx.getStorageSync('address_info'),
          pin: app.globalData.loginStateInfo.PDJ_H5_PIN
        }
        addFilterMsg('addressInfoMapNew');
        warn(JSON.stringify(logParams))
        console.log('进入异常了进入异常了=========', wx.getStorageSync('address_info'), addressInfo)
      }
      let { recommendObj = {}, optionsPos={} } = this.data;
      wx.switchTab({
        url: "/pages/home/home",
        preObj: recommendObj,
        buried_position: {
          currentPageName:'current_address_list1',
          optionsPos
        }
      })
    }
  },

  /**
   * 设置缓存
   * @param key: 地址名
   * @param value：地址值
   * @param isChange：是否需要首页切换地址
   */
  setStorageSync(key, value, isChange) {
    return new Promise((resolve, reject) => {
      try {
        wx.setStorage({
          key: key,
          data: value,
          success(res) {
            util.refreshHomePage(isChange);
            app.globalData.addressInfo = value;
            app.globalData.needCheckLocationChange = false;
            resolve(res)
            if(value.poi !== wx.getStorageSync('address_info').poi){
              let logParams = {
                globalAddressInfo: app.globalData.addressInfo,
                res: res,
                addressInfo: wx.getStorageSync('address_info'),
                pin: app.globalData.loginStateInfo.PDJ_H5_PIN
              }
              addFilterMsg('addressInfoMap');
              warn(JSON.stringify(logParams))
            }
          },
          fail(err) {
            reject(err);
            let deviceid_pdj_jd = util.getUUIDMD5();
            addFilterMsg('addressInfoMapErr');
            addFilterMsg(deviceid_pdj_jd)
            error(JSON.stringify(err))
          }
        })
      } catch (e) {
        let deviceid_pdj_jd = util.getUUIDMD5();
        addFilterMsg(deviceid_pdj_jd)
        addFilterMsg('addressInfoMapE');
        error(JSON.stringify(e))
      }
    })
  },

  /**
   * 城市搜索
   */
  searchAddress(e) {
    clearTimeout(time);
    time = setTimeout(() => {
      let val = e.detail.value;
      if (val) {
        this.getSearchData({
          cityName: this.data.cityName || '',
          key: val
        })
      } else {
        this.setData({
          hideMap: false,
          searchList: [],
          inputVal: "",
          hideClear: true
        })
      }
    }, 500)
  },

  /**
   * 搜索框聚焦-埋点用
   */
  searchFocus() {
    this.reportFocus()
  },

  /**
   * 获取搜索联想词儿
   */
  getSearchData(obj) {
    let self = this;
    let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
    request({
      ...FNIDS.addressSearch,
      isNeedDealError: true,
      body: {
        ref: "index/LID:5",
        region: obj.cityName || obj.city || "",
        key: obj.key || ""
      },
      pageId: pageIdFirstPage,
      preObj: recommendObj
    }).then(res => {
      let result = res.data && res.data.result;
      if (res.data && res.data.code === "0") {
        if (result.length > 0) {
          self.setData({
            searchList: result,
            hideMap: true,
            hideClear: false
          })
        } else {
          self.setData({
            hideMap: false,
            hideClear: false
          })
        }
      } else {
        self.setData({
          hideMap: false,
          hideClear: false
        })
      }
    }).catch(err => {
      self.setData({
        hideMap: false,
        hideClear: false
      })
    })
  },

  /**
   * 清楚输入框
   */
  clearInput() {
    this.setData({
      searchList: [],
      hideClear: true,
      inputVal: "",
      hideMap: false
    })
  },
  /* ------------------ 自动化埋点新增逻辑    --------------------  */
  reportResetMap() { },
  reportRecPoi(poi) {
    this.buried.poi = poi
    // 埋点
    clickBuriedV2_({
      click_id: "reportRecPoi",
      click_par: {
        poi: poi
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName,
    })
  },
  reportPoi(poi) {
    this.buried.poi = poi
    // 埋点
    clickBuriedV2_({
      click_id: "reportPoi",
      click_par: {
        poi: poi
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName,
    })
  },
  reportFocus() {
    // 埋点
    clickBuriedV2_({
      click_id: "search",
      click_par: {
          
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName,
    })
  }
});

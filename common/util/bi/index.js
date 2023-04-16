import Insert from './insert';
import {
  getBoundingClientRect,
  isClickTrackArea,
  getActivePage
} from './utils';
import { log } from './log';
import { dealPvParamsBackWay, dealPvParamsRightWay } from '../pvData'
class Tracker extends Insert {
  constructor() {
    super();
    // 自动给每个page增加elementTracker方法，用作元素埋点
    this.addPageMethodExtra(this.elementTracker());
    // 自动给page下预先定义的方法进行监听，用作方法执行埋点
    this.addPageMethodWrapper(this.methodTracker());
    // 路由记录
    this.route = []
  }

  /**
     * @description: 元素埋点
     * @param {Void} 
     * @return {Function}
     */
  elementTracker() {
    // 元素事件监听
    const elementTracker = (e) => {
      this.findActivePageTracks('element').then(res => {
        let { tracks = [], page = {}, version = "" } = res;
        let activePage = getActivePage();
        tracks.forEach((track) => {
          getBoundingClientRect(track.element).then((res) => {
            let boundingClientRect = res.boundingClientRect || [];
            if (Array.isArray(boundingClientRect)) {
              boundingClientRect.forEach((item) => {
                let isHit = isClickTrackArea(e, item, res.scrollOffset);
                if (isHit) {
                  let data = {
                    buried: activePage && activePage.buried || {},
                    page,
                    track,
                    version,
                    dataset: item.dataset
                  };
                  log(data)
                }
              })
            }
          });
        })
      })
    };
    return elementTracker;
  }

  /**
     * @description: 方法埋点
     * @param {Void} 
     * @return {Function}
     */
  methodTracker() {
    return (methodName, args = {}) => {
      if (methodName === 'pv') { // pv的时候检查埋点更新
      } else if (methodName === 'onLoad') {
        // 当前页实例
        let currentPage = this.getBuriedDescByPage();
        let route = currentPage.route || '';
        getApp().globalData.pvRouteObj[route] = 1;
      } else if (methodName === 'onHide' || methodName === 'onUnload') { // 腾讯有数上报
       
      } else if (methodName === 'onShow') { // 腾讯有数上报
        let currentPage = getActivePage();

        // 添加当前页路径
        this.route.push(currentPage.route || '');
       
      } else if (methodName === 'onShareAppMessage') { // 腾讯有数上报
        
      } else if (methodName === 'onReachBottom') {// 腾讯有数上报
       
      } else if (methodName === 'onPullDownRefresh') {// 腾讯有数上报
        
      } else {
        this.findActivePageTracks('method').then(res => {
          let { tracks = [], page = {}, version = "" } = res;
          let activePage = getActivePage();
          let { dataset } = args && args.currentTarget || {};
          tracks.forEach((track) => {
            if (track.method === methodName) {
              let data = {
                buried: activePage && activePage.buried || {},
                page,
                track,
                version,
                dataset: dataset
              }
              log(data)
            }
          })
        })
      }
    };
  }

 
  /**
     * @description: 获取当前页面的埋点配置
     * @param {String} type 返回的埋点配置，options: method/element
     * @returns {Promise}
     */
  findActivePageTracks(type) {
    return new Promise(resolve => {
      // 当前页实例
      let currentPage = this.getBuriedDescByPage();
      // 当前页埋点描述文件
      let descFile = currentPage.buriedDesc || {};
      // 当前页路径
      let route = currentPage.route || '';
      if (route) { // 用当前页路径获取缓存和请求埋点描述文件
        let descStorage = this.getBuriedDescByStorage(route);
        if (descStorage && descStorage.page) { // 缓存描述文件
          resolve(this.getPageTracks(type, descStorage))
        } else {

          if (descFile && descFile.page) { // 兜底描述文件
            resolve(this.getPageTracks(type, descFile))
          } else {
            // console.error('未获取到兜底埋点描述文件：', route);
            resolve({})
          }

        }
      } else {
        // console.error('未获取到当前页面路径！')
      }
    })
  }

  /**
     * @description: 获取tracks
     * @param {type} 
     * @return: 
     */
  getPageTracks(type, desc) {
    let tracks = [];
    if (type === 'method') {
      tracks = desc.methodTracks || [];
    } else if (type === 'element') {
      tracks = desc.elementTracks || [];
    }
    return {
      tracks,
      version: desc.version || '',
      page: desc.page || {}
    }
  }

  /**
     * @description: 通过请求获取埋点描述文件
     * @param {type}  route: 当前页路径 version：版本号
     * @return {Promise}
     */
  getBuriedDescByRequest(route, version) {
    return new Promise(resolve => {
      let { request, FNIDS } = require('../api.js');
      let { functionId = '', appVersion = '' } = FNIDS.getNewBuried
      request({
        isForbiddenDialog: true,
        isNeedDealError: true,
        functionId,
        appVersion,
        body: {
          pagePath: route || '',
          currentVersion: version || ''
        }
      }).then(res => {
        let result = res.data.result || '';
        if (res.data.code === '0' && result) {
          resolve(result)
        } else {
          resolve()
        }
      }).catch(() => {
        resolve()
      })
    })
  }

  /**
    * @description: 通过本地缓存获取埋点描述文件
    * @param {type} key：描述文件key
    * @return {Object}
    */
  getBuriedDescByStorage(key) {
    let pageTrackConfig = {};
    try {
      let value = wx.getStorageSync(key);
      if (value) {
        pageTrackConfig = JSON.parse(value)
      }
    } catch (e) {
      // console.error('获取缓存埋点描述文件失败', e)
    }
    return pageTrackConfig
  }

  /**
    * @description: 通过页面实例获取埋点描述文件
    * @return {Object}
    */
  getBuriedDescByPage() {
    let pageTrackConfig = {};
    try {
      pageTrackConfig = getActivePage() || {}
    } catch (e) {
      // console.error('获取页面实例失败！', e)
    }
    return pageTrackConfig
  }
}

export default Tracker;
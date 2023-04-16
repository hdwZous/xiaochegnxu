import {
  exposureBuried_
} from './BI'

export class Exposure {
  constructor(self, selector = '') {
    this.self = self;
    this.selector = selector;
    this.data = {};
    this.observer = null;
    this.history = [];

    this.traceId = ''
  }

  // 获取当前页面路径
  _getHistoryPage() {
    try {
      let historyPage = getApp().globalData.historyPage || [];
      return JSON.stringify(historyPage)
    } catch (err) {
      return JSON.stringify([])
    }
  }

  // 初始化监听
  _init(fn) {
    // 曝光监控
    this.observer = this.self.createIntersectionObserver({
      observeAll: true
    });
    this.observer.relativeToViewport().observe(this.selector, (res) => {
      // res.dataset.time = Date.now();
      fn(res)
    })
  }

  // 处理屏幕上的楼层
  _dealExposureData(res) {
    if (res.dataset.traceId) {
      this.traceId = res.dataset.traceId
    }
    // 当前数据
    let data = this.data;
    // 埋点
    let userAction = res.dataset.userAction;
    // 屏幕内展示比例（竖向）
    let intersectionRatio = res.intersectionRatio;
    // 处理屏幕内曝光数据
    if (userAction && intersectionRatio > 0) {
      if (data[userAction]) {
        data[userAction] = {
          cnt: data[userAction].cnt ? data[userAction].cnt + 1 : 1,
        }
      } else {
        data[userAction] = {
          cnt: 1,
        };
      }
    }
  }



  // 上报曝光埋点数据
  _reportExposureData(data) {
    let obj = data;
    let result = [];
    for (let key in obj) {
      let keyObj = typeof key == 'string' ? JSON.parse(key) : key
      // keyObj.exposure_time = obj[key].time;
      let stringObj = JSON.stringify(keyObj)
      result.push({
        spmId: stringObj,
        cnt: obj[key].cnt ? obj[key].cnt : 1,
      });
    }
    // let epArr = getApp().globalData.epArr;
    // epArr = epArr.concat(...result);

    // let reportArr = epArr.length > 5 ? epArr.splice(0,10) : epArr.splice(0,4)
    // getApp().globalData.epArr = [];
    // getApp().globalData.epArr = epArr;
    let traceId = this.traceId
    if (result.length > 0) {
      // exposureBuried_({
      //   'ep': result,
      //   "create_time": new Date(),
      //   "clienttime": Date.now(),
      //   traceId
      // }, this.history);
      this.data = {}
    }
  }

  // 初始化监听曝光楼层
  initObserver() {
    // 初始化之前，卸载之前的监听
    this.disconnectObserver();
    // 初始化监听对象
    this._init(res => {
      // 处理曝光埋点数据
      this._dealExposureData(res)
    })
  }

  // 手动初始化曝光楼层
  handleInitObserver(userAction) {
    if (typeof userAction === 'string') {
      if (this.data[userAction]) {
        this.data[userAction] += 1
      } else {
        this.data[userAction] = 1
      }
    } else {
      throw new TypeError(`${userAction} is not string!`)
    }
  }

  // 卸载监听
  disconnectObserver() {
    this.history = JSON.parse(this._getHistoryPage());
    // console.log('historyPage', this.history)
    let keysArr = Object.keys(this.data);
    keysArr && keysArr.length && this._reportExposureData(this.data);
    this.data = {};
    if (this.observer) this.observer.disconnect();
  }

  // 弹层曝光上报
  popReport(userAction) {
    if (Array.isArray(userAction) && userAction.length > 0) {
      userAction.forEach(item => {
        if (typeof item !== 'string') {
          item = JSON.stringify(item)
        }
        if (this.data[item]) {
          // this.data[item] += 1
          this.data[item] = {
            cnt: this.data[item]++
          }
        } else {
          this.data[item] = {
            cnt: 1
          }
        }
      })
    } else {
      if (typeof userAction !== 'string') {
        userAction = JSON.stringify(userAction)
      }
      if (this.data[userAction]) {
        // this.data[userAction] += 1
        this.data[userAction] = {
          cnt: this.data[userAction]++
        }
      } else {
        this.data[userAction] = {
          cnt: 1
        }
      }
    }
  }
}
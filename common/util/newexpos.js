import { transferExposureData, clickBuriedV2_ } from "./BI";

export default class Newexposure {
  constructor(self, selector = "") {
    this.self = self;
    this.selector = selector;
    this.data = {};
    this.observer = null;
    this.history = [];
  }

  // 初始化监听曝光楼层
  initObserver() {
    // 初始化监听对象
    this.observer = this.self.createIntersectionObserver({
      thresholds: [0.5],
      observeAll: true,
    });
    this.observer.relativeToViewport().observe(this.selector, (res) => {
      this._dealExposureData(res);
    });
  }

  // 卸载监听
  disconnectObserver() {
    if (this.observer) this.observer.disconnect();
  }

  // 处理屏幕上的楼层
  _dealExposureData(res) {
    // onlyTag 唯一标识
    let { userAction = '', traceId = '', pageId = '', currentPageName = '', prePageName = '' } = res.dataset
    if (res && res.intersectionRatio >= 0.5) {
      if (this.data[userAction] && this.data[userAction].actuatorFunc) {
        this.clearExposure(userAction)
      }
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "position_epSection",
        click_par: {
          currentPageName,
          userAction,
          pageId,
          currentPageName,
          prePageName
        },
        pageId,
        currentPageName,
        prePageName
      });
      this.data[userAction] = {
        observeTimes: res.time,
        actuatorFunc: setTimeout(()=>{
          transferExposureData({
            userAction,
            traceId,
            create_time: new Date(),
            clienttime: Date.now(),
            pageId,
            currentPageName,
            prePageName
          })
          this.clearExposure(userAction)
        },1000)
      }
    } else {
      if (this.data[userAction] != null && res.time - this.data[userAction].observeTimes < 1000 && this.data[userAction].actuatorFunc) {
        this.clearExposure(userAction)
      }
    }
  }

  // 清除定时器
  clearExposure(onlyTag) {
    clearTimeout(this.data[onlyTag].actuatorFunc)
    this.data[onlyTag] = null
  }
}

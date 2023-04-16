export class Lazy {
  constructor(self, selector = '') {
    this.self = self;
    this.selector = selector;
    this.timer = null;
    this.data = {};
    this.observer = null;
    this.cache = {};
  }

  // 初始化监听
  _init(fn) {
    // 曝光监控
    setTimeout(() => {
      this.observer = this.self.createIntersectionObserver({ observeAll: true });
      this.observer.relativeToViewport().observe(this.selector, (res) => {
        fn(res)
      });
    }, 100)
  }

  // 初始化监听曝光楼层
  initObserver(fn) {
    // 初始化之前，卸载之前的监听
    if (this.observer) this.observer.disconnect();
    // 初始化监听对象
    this._init(res => {
      // 图片id
      let id = res.dataset.lazyImgId;
      // 屏幕内展示比例（竖向）
      let intersectionRatio = res.intersectionRatio;
      // 缓存回调元素
      this.cache[id] = intersectionRatio;
    });
    // 开启定时器
    this.timer = setInterval(() => {
      // 处理屏幕内曝光数据
      let cacheKeys = Object.keys(this.cache) || [];
      if (cacheKeys.length) {
        cacheKeys.forEach(item => {
          if (this.cache[item] > 0) {
            fn(item)
          }
        })
        this.cache = {}
      }
    }, 300);
  }

  // 卸载监听
  disconnectObserver() {
    this.data = {};
    this.cache = {};
    this.timer && clearInterval(this.timer)
    if (this.observer) this.observer.disconnect()
  }
}

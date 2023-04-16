// 小程序原Page对象
const globalVarPage = Page;

class Insert {
  constructor() {
    this.injectPageMethods = [];
    this.injectAppMethods = [];
    this.extraPageMethods = [];
    this.extraAppMethods = [];
    Page = (page) =>
      globalVarPage(
        this._create(page, this.injectPageMethods, this.extraPageMethods)
      );
  }

  /**
   * @description: 对用户定义函数进行包装.
   * @param {Object} target page对象或者app对象
   * @param {String} methodName 需要包装的函数名
   * @param {Array} methods 函数执行前执行任务
   */
  _wrapTargetMethod(target, methodName, methods = []) {
    const methodFunction = target[methodName];
    let self = this;
    target[methodName] = function _aa(...args) {
      // 同步business方法,属于业务层
      self._asyncBusiness(methodName, args);
      const result = methodFunction && methodFunction.apply(this, args);
      const methodExecutor = () => {
        methods.forEach((fn) => {
          fn.apply(this, [methodName, ...args]);
        });
      };
      try {
        if (Object.prototype.toString.call(result) === "[object Promise]") {
          result
            .then(() => {
              methodExecutor();
            })
            .catch(() => {
              methodExecutor();
            });
        } else {
          methodExecutor();
        }
      } catch (e) {
        // console.error(methodName, "钩子函数执行出现错误", e);
      }
      return result;
    };
  }

  _asyncBusiness(name, args) {
    if (name === 'onLoad') {
      // console.log('asyncBusiness args', args[0])
      if (args[0] && args[0].business) {
        getApp().globalData.qrcode.business = args[0].business
      }
    }
  }

  /**
   * @description: 追加函数到Page/App对象
   * @param {Object} target page对象或者app对象
   * @param {Array} methods 需要追加的函数数组
   */
  _addExtraMethod(target, methods = []) {
    methods.forEach((fn) => {
      target["elementTracker"] = fn;
    });
  }

  /**
   * @description: 创建埋点
   * @param {*} target page对象或者app对象
   * @param {*} methods 需要插入执行的函数
   */
  _create(target, injectMethods, extraMethods) {
    if (target.buriedDesc) {
      Object.keys(target)
        .filter((prop) => typeof target[prop] === "function")
        .forEach((methodName) => {
          this._wrapTargetMethod(target, methodName, injectMethods);
        });
      this._addExtraMethod(target, extraMethods);
    }
    return target;
  }

  /**
   * @description: 添加页面回调埋点方法
   * @param {Function}
   * @return {Void}
   */
  addPageMethodWrapper(fn) {
    this.injectPageMethods.push(fn);
  }

  /**
   * @description: 添加App回调埋点方法
   * @param {Function}
   * @return {Void}
   */
  addAppMethodWrapper(fn) {
    this.injectAppMethods.push(fn);
  }

  /**
   * @description: 添加页面监听元素埋点方法
   * @param {Function}
   * @return {Void}
   */
  addPageMethodExtra(fn) {
    this.extraPageMethods.push(fn);
  }

  /**
   * @description: 添加App监听元素埋点方法
   * @param {Function}
   * @return {Void}
   */
  addAppMethodExtra(fn) {
    this.extraAppMethods.push(fn);
  }
}

export default Insert;

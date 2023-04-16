export function isIponeX() {
  const res = wx.getSystemInfoSync();
  console.log("systemInfo", res);
  return res.safeArea.top > 20;
}

// 连续点击节流器
export function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1000;
  }

  let _lastTime = null;

  // 返回新的函数
  return function () {
    let _nowTime = +new Date();
    console.log(_lastTime, _nowTime);
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(null, arguments); //将this和参数传给原函数
      _lastTime = _nowTime;
    }
  };
}
// 函数防抖
export function debounce(fn, delay) {
  var timeout = null;
  return function (e) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

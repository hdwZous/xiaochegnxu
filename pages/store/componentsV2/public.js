// 图片懒加载
export function loadImg(LazyLoad,that) {
  // 监听图片懒加载
  LazyLoad &&
        LazyLoad.initObserver &&
        LazyLoad.initObserver((imgId) => {
          if (!that.data.imgLazyLoad[imgId]) {
            // console.log('lazyLoad:', imgId);
            that.setData({
              [`imgLazyLoad.${imgId}`]: true,
            });
          }
        });  
}

export function productScroll(that, scrollTop, touchTop, str) {
  if (scrollTop > 3) {
    if (touchTop) {
      that.setData({
        [str]: false,
      });
    }
  } else {
    if (!touchTop) {
      that.setData({
        [str]: true,
      });
    }
  }
}

export function computeFloatBall(that, scrollTop) {
  that.data.scrollTop = scrollTop 
  // 处理悬浮球
  if (that.data.showFloatBall) {
    that.triggerEvent("pageEvent", {
      type: 'showFloatBall',
      data: false
    })
    // that.setData({
    //   showFloatBall: false
    // })
  }
  clearTimeout(that.timer);
  that.timer = setTimeout(() => {
    if (scrollTop == that.data.scrollTop) {
      // that.setData({
      //   showFloatBall: true,
      // });
      that.triggerEvent("pageEvent", {
        type: 'showFloatBall',
        data: true
      })
    } else {
      // that.setData({
      //   showFloatBall: false,
      // });
      that.triggerEvent("pageEvent", {
        type: 'showFloatBall',
        data: false
      })
    }
    clearTimeout(that.timer);
  }, 800);
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detail: {
      type: Object,
      value: {}
    }
  },

  //监听数据变化 
  observers: {
    'detail': function(detail) {
      
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    open: false,
    imgwidth: 0,
    imgheight: 0,
  },

  lifetimes: {
    ready() {
      let width
      wx.getSystemInfo({
        success: function(res) {
          width = res.screenWidth
        }
      })
      wx.createSelectorQuery().in(this).select('.des-row').boundingClientRect(rect => {
        if (rect.height > Number(width / 375 * 18)) {
          this.setData({
            show: true
          })
        }
      }).exec()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    down() {
      this.setData({
        open: !this.data.open
      })
    },
    imageLoad: function(e) {
      var $width=e.detail.width,    //获取图片真实宽度
          $height=e.detail.height,
          ratio=$width/$height;   //图片的真实宽高比例
      // var viewWidth=500,           //设置图片显示宽度，
      //         viewHeight=500/ratio;    //计算的高度值   
      var viewHeight = 20,
          viewWidth = viewHeight* ratio;
      this.setData({
          imgwidth:viewWidth,
          imgheight:viewHeight
      })
  	}
  }
});

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 指定高度
    height: {
      type: String,
      value: ''
    },
    /**
     * 是否使用自动补全高度
     * true: 使用填充高度 false: 定位铺满全部屏幕
     */
    isRest: {
      type: Boolean,
      value: false
    },
    // 页面类型
    type: {
      type: Number,
      value: 0,
      observer: function (newVal) {
        let type = newVal || 0;
        this.setSrc(type)
      }
    },
    // 按钮类型
    btnType: {
      type: String,
      value: '',
    },
    // 按钮文案
    btnText: {
      type: String,
      value: ''
    },
    // 提示文案
    tips: {
      type: String,
      value: ''
    },
    //导流数据（现在导流到跑腿）
    guideData: {
      type: Object,
      value: null,
    }
  },
  lifetimes: {
    ready() {
      this.refreshUI()
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    readySuccess: false,
    restHeight: '100vh',
    type: 0,
    src: 'https://storage.360buyimg.com/wximg/common/loading.gif'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    refreshUI() {
      if (this.data.isRest) {
        if (this.data.height) {
          this.setData({
            restHeight: this.data.height,
            readySuccess: true,
          })
          return
        }

        this.createSelectorQuery().select('#default-container').boundingClientRect(rect => {
          if(rect){
            this.setData({
              readySuccess: true,
              restHeight: wx.getSystemInfoSync().windowHeight - rect.top + 'px'
            })
          } else {
            this.setData({
              readySuccess: true,
              restHeight: wx.getSystemInfoSync().windowHeight + 'px'
            })
          }
        }).exec()
      } else {
        this.setData({
          readySuccess: true
        })
      }
    },
    // 点击按钮事件
    dealDefault(e) {
      // 事件类型
      let type = this.data.type;
      let data = {}
      if (this.data.btnType) {
        data = e.detail
      }
      this.triggerEvent('defaultBtnEvent', {
        type: type,
        data: data
      })
    },
    // 设置默认展示图
    setSrc(type) {
      let src = ''
      switch (type) {
      case 0: //默认加载中
        src = "https://storage.360buyimg.com/wximg/common/loading.gif";
        break;
      case 1: //没有网络
        src = "/images/common_errorbar_icon_nonetworkV1.png"
        break;
      case 2: //未登录
        src = "https://storage.360buyimg.com/wximg/common/errorbar_icon_no_loginV2.png";
        break;
      case 3: //当前位置无服务
        src = "https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png";
        break;
      case 4: //接口未返回数据
        src = 'https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png';
        break;
      case 5: //无砍价数据||无收货地址
        src = 'https://storage.360buyimg.com/wximg/common/errorbar_icon_noshopV1.png';
        break;
      case 6: //店铺已下线
        src = 'https://storage.360buyimg.com/wximg/common/errorOfflineV1.png';
        break
      default:
        src = "/images/common_errorbar_icon_nonetworkV1.png";
        break;
      }
      this.setData({
        src,
        type
      })
    }
  }
});
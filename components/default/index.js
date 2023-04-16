import utils from '../../common/util/util'
Component({
  /**
     * 组件的属性列表
     */
  properties: {
    // 类型
    type: {
      type: Number,
      value: -1,
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
    // 默认图地址
    src: {
      type: String,
      value: ''
    },
    // 默认图尺寸
    imgWidth: {
      type: String,
      value: '',
      observer: function (newVal) {
        if (newVal) {
          this.setData({
            width: newVal + 'rpx'
          })
        }
      }
    },
    bgColor: {
      type: String,
      value: '#fff'
    },
    fromsource: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    fromPositon: {
      type: String,
      value: ''
    },
    optionsPos: {
      type: Object,
      value: {}
    }
  },

  /**
     * 组件的初始数据
     */
  data: {
    width: '321rpx'
  },

  /**
     * 组件的方法列表
     */
  methods: {
    // 点击按钮事件
    dealDefault() {
      // 事件类型
      let type = this.data.type;
      switch (type) {
      case 0:
        // 接口获取地理位置失败
        this.trigger(0, {});
        break;
      case 1:
        // 小程序API未获取到地理位置
        this.trigger(1, {});
        break;
      case 2:
        // 网络失败或获取数据失败
        this.trigger(2, {});
        break;
      case 3:
        // 附近没有门店/未开通
        this.trigger(3, {});
        break;
      case 4:
        // 门店已下线
        this.trigger(4, {});
        break;
      case 5:
        // 返回上一页
        this.trigger(5, {});
        break;
      case 6:
        // 未登录
        this.trigger(6, {});
        break;
      case 7:
        // 跳转页面
        this.trigger(7, {});
        break;
      default:
      }
    },
    // 触发父组件事件
    trigger(type, data) {
      this.triggerEvent('defaultBtnEvent', {
        type: type,
        data: data
      })
    },
    // 去地址页
    goToAddress() {
      if (utils.isLogin()) {
        wx.navigateTo({
          url: '/pages/address/home/index?from=default',
          preObj: this.data.buriedObj,
          buried_position: {
            fromPositon: `default1-${this.data.fromPositon}`,
            optionsPos: this.data.optionsPos
          }
        })
      } else {
        wx.navigateTo({
          url: '/pages/address/search/index?from=default',
          preObj: this.data.buriedObj,
          buried_position: {
            fromPositon: `default2-${this.data.fromPositon}`,
            optionsPos: this.data.optionsPos
          }
        })
      }
      
    },
  }
});
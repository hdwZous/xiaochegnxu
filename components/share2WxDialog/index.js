/**
 * 事件类型
 */
let EVENT = {
  // 点击取消按钮
  share2Moments: 'share2Moments',
};

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showDialog: {
      type: Boolean,
      value: false,
      observer: function (newVal) {
        this.refresh(newVal);
      }
    },
    shareData: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    refresh: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancel() {
      this.setData({
        showDialog: false,
      });
    },
    share2Chat() {
      this.setData({
        showDialog: false,
      });
    },
    share2Moments() {
      this.cancel();
      this.triggerEvent(EVENT.share2Moments, {})
    },
    refresh(val) {
      this.setData({
        refresh: val
      })
    }
  }
});
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    dataList: {
      type: Array,
      value: [],
    },
    //默认选中index
    checkedIndex: {
      type: Number,
      value: 0,
    },
  },
  observers: {},

  /**
   * 组件的初始数据
   */
  data: {
    showContent: false,
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      this.onShow();
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onShow() {},
    show() {
      this.setData({
        isShow: true,
      });
    },
    hide() {
      this.setData({
        isShow: false,
      });
      this.triggerEvent('popStatus', {
        types: 'footerModule',
        flag: false
      }, { bubbles: true, composed: true})
    },
    selectItem(e) {
      let { index = 0 } = e.currentTarget.dataset, { dataList } = this.data, value = dataList[index];
      this.setData({
        checkedIndex: index,
      });
      this.triggerEvent("select", {
        data: {
          index,
          value,
        },
      });
      this.hide();
    },
    closeBg() {
      this.hide()
    }
  },
  attached() {},
});

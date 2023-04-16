import { djCmsJump } from "../../../../../../common/util/agreementV2.js";
Component({
  properties: {
    capsule: { 
      type: Object,
      value: {}
    },
    // 0/1展示搜索框样式，其他展示 京东到家
    word: {
      type: String,
      value: null,
      observer: function (val) {
        this.setData({
          keyword: val || ''
        })
      }
    },
    landType: {
      type: Number,
      value: -1,
    },
    title: {
      type: String,
      value: '京东到家'
    },
    showSearchModal: {
      type: Boolean,
      value: false
    }
  },
  data: {
    showBack: false,
    showHome: false,
    keyword: '', // 搜索关键字
    // showMask: false // 是否展示蒙层
  },
  lifetimes: {
    attached() {
      //显示返回还是home
      this.showHomeOrBack()
    }
  },
  methods: {
    showHomeOrBack() {
      let pages = getCurrentPages()
      if (pages.length === 1) {
        this.setData({
          showHome: true
        })
      } else if (pages.length > 1) {
        this.setData({
          showBack: true
        })
      }
    },
    goBack() {
      wx.navigateBack({
        delta: 1
      })
    },
    goHome() {
      // wx.switchTab({
      //   url: '/pages/home/home'
      // })
			djCmsJump({
				to: 'home',
				preObj: this.data.recommendObj || {}
			})
    },
    // 点击搜索，展示蒙层
    clickInput() {
      this.triggerEvent("isShowModal", {
        type: "searchModal",
        value: true
      });
      // this.setData({
      //   showMask: true
      // })
    },
    // 隐藏蒙层
    hideMask() {
      this.triggerEvent("isShowModal", {
        type: "searchModal",
        value: false
      });
      // this.setData({
      //   showMask: false
      // })
    },
    bindKeyInput(e) {
      this.setData({
        keyword: e.detail.value || ''
      })
    },
    bindConfirm() {
      this.triggerEvent("onGetGoods", {
        type: "keyword",
        data: {
          keyword: this.data.keyword
        }
      });
      this.hideMask()
    }
  }
})
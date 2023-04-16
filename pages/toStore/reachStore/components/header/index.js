import util from "../../../../../common/util/util.js"

const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    storeName: {
      type: String,
      value: "",
    },
    navHeight: {
      type: Number,
      value: 66,
    },
    capsule: {
      type: Object,
      value: null
    },
    tabIsCiel: {
      type: Boolean,
      value: false
    },
    opacity: {
      type: Number,
      value: 0
    },
    buriedObj:{
      type: Object,
      value: {}
    },
  },
  data: {
    opacity: 0,
    showBack: false,
    showHome: false,
  },
  attached() {
    this.showHomeOrBack();
  },
  methods: {
    showHomeOrBack() {
      let pages = getCurrentPages();
      if (pages.length === 1) {
        this.setData({
          showHome: true,
        });
      } else if (pages.length > 1) {
        this.setData({
          showBack: true,
        });
      }
    },
    goBack(e) {
      console.log(e)
      let type = e.currentTarget.dataset.type
      if (type == 'goBack') {
        wx.navigateBack()
      } else {
        wx.switchTab({
          url: "/pages/home/home"
        })
      }
    }
  },
});

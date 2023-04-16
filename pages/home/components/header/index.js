import { djCmsJump } from "../../../../common/util/agreementV2";
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_header',
    epSelector: '.home_header'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    // 配置数据
    config: {
      type: Object,
      value: {},
      observer: function () {}
    },
    ceilingAnimationConfig: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val && val.bigImgUrl) {
          let userAction = val && val.userAction || ''
          let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
          this.data.buriedObj || {};
          clickBuriedV2_({
            click_id: 'epLayerOpen',
            click_par: {
              userAction
            },
            currentPageName: currentPageName,
            prePageName: prePageName,
            pageId: pageIdFirstPage,
          });
        }
      }
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    // 地理位置
    poi: {
      type: String,
      value: ''
    },
    // 页面滚动距离
    scrollTop: {
      type: Number,
      value: 0,
      observer: function (top) {
        if (top > 50) {
          let opacity = (top - 32) / 32;
          this.setData({
            opacity: opacity < 1 ? opacity : 1
          })
        } else {
          this.setData({
            opacity: 0
          })
        }
      }
    },
    // 皮肤数据
    linkColor: {
      type: String,
      value: '',
      observer: function (linkColor) {
        if (linkColor) {
          this.setData({
            bgActiveColor: linkColor
          })
        } else {
          this.setData({
            bgActiveColor: ""
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    opacity: 0,
    capsule: {},
    bgActiveColor: ''
  },

  /**
   * 组件生命周期函数-在组件实例进入页面节点树时执行)
   */
  attached() {
    this.getCapsule()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取胶囊位置
    getCapsule() {
      let capsule = {
        bottom: 58,
        height: 32,
        left: 317,
        right: 404,
        top: 26,
        width: 87
      };
      try {
        // 取缓存胶囊位置信息
        capsule = wx.getStorageSync("capsule")
      } catch (err) {
        /**/  
      }
      if (!capsule) {
        // 取全局获取的胶囊位置信息
        capsule = getApp().globalData.capsule;
        capsule.top && wx.setStorageSync("capsule", capsule)
      }
      this.setData({
        capsule: capsule
      })

    },
    // 去搜索页
    goToSearch() {
      let { searchWords = '', userAction = '' } = this.data.config || {};
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } = this.data.buriedObj || {};
      let traceId = this.data.pageDataTraceId
      wx.navigateTo({
        url: `/pages/searchAbout/search/search?searchKey=${searchWords || ''}&userAction=${encodeURIComponent(userAction) || ''}&traceId=${encodeURIComponent(traceId) || ''}`,
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homeheader_goToSearch_home'
        }
      })
    },
    // 去选择地址
    goToAddress() {
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      let traceId = this.data.pageDataTraceId
      wx.navigateTo({
        url: `/pages/address/home/index?&traceId=${encodeURIComponent(traceId) || ''}`,
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homeheader_goToAddress_home'
        }
      })
    },
    // 去平台资质
    goToLicense() {
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      let traceId = this.data.pageDataTraceId
      wx.navigateTo({
        url: '/pages/h5/index?url=' + encodeURIComponent('https://' + getApp().globalData.config.HOST + '/activity/multactivity/html/platformPublicity.html?traceId='+encodeURIComponent(traceId)),
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homeheader_goToLicense_home'
        }
      })
    },
    // 去大图地址
    goToBigImg(e) {
      let { to = '', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
      if (to) {
        djCmsJump({
          to,
          params,
          userAction,
          traceId: this.data.pageDataTraceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homeheader_goToBigImg_home'
          }
        })
      }
    },
    // 点击搜索热词
    clickHotWords(e) {
      let { to = '', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
      if (to) {
        djCmsJump({
          to,
          params,
          userAction,
          traceId: this.data.pageDataTraceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homeheader_clickHotWords_home'
          }
        })
      }
    }
  }
})
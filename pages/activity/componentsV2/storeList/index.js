import { djCmsJump } from '../../../../common/util/agreementV2'
Component({
  lazyObj: {
    epSelector: '.activity_comp_ep',
    componentName: 'storelist'
  },
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (item) {
        if (item) {
          // 券标
          if (item.coupons && item.coupons.length) {
            item.coupons.forEach((couponItem, couponIndex) => {
              if (couponIndex > 3) {
                couponItem.show = false
              } else {
                couponItem.show = true
              }
            })
          }
          // 促销标
          if (item.tags && item.tags.length) {
            item.tags.forEach((tagItem, tagIndex) => {
              if (tagIndex > 0) {
                tagItem.show = false
              } else {
                tagItem.show = true
              }
              tagItem.words = tagItem.words.replace(/\#\#\#/ig, '')
            })
          }
          item.couponAndTagArrowDown = true
          // 附近门店
          if (item.brosStore && item.brosStore.length) {
            item.storeArrowDown = true
          }
          this.setData({
            item: item
          })
        }
      }
    },
    traceId: {
      type: String,
      value: ''
    },
    pageId: {
      type: String,
      value: '',
      observer: function (val) {
        
      }
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 门店列表
    item: [],
    isShowTag: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击券箭头
    clickCouponArrowIcon(e) {
      let { iconDown } = e.currentTarget.dataset || {};
      let item = this.data.item || {};
      // 券标展示状态
      item.coupons && item.coupons.length && item.coupons.forEach((subItem, index) => {
        if (iconDown) {
          subItem.show = true
          if (!this.data.isShowTag) {
            this.setData({
              isShowTag: true
            })
          }
        } else {
          if (this.data.isShowTag) {
            this.setData({
              isShowTag: false
            })
          }
          if (index > 3) {
            subItem.show = false
          } else {
            subItem.show = true
          }
        }
      });
      // 促销标展示状态
      item.tags && item.tags.length && item.tags.forEach((subItem, index) => {
        if (iconDown) {
          subItem.show = true
        } else {
          if (index > 0) {
            subItem.show = false
          } else {
            subItem.show = true
          }
        }
      });
      item.couponAndTagArrowDown = !iconDown;
      this.setData({
        item
      })
    },
    // 点击附近商家箭头
    clickStoreArrowIcon(e) {
      let { iconDown } = e.currentTarget.dataset || {};
      let item = this.data.item || {};
      // 近商家状态
      item.storeArrowDown = !iconDown;
      this.setData({
        item
      })
    },
    // 点击去门店
    goToStore(e) {
      let { item = {} } = e.currentTarget.dataset || {};
      let { to = 'home', params = {}, userAction = "" } = item || {};
      djCmsJump({
        to,
        userAction,
        params,
        preObj: this.data.recommendObj,
        buried_position: "active-storeList1"
      })
    },
    expandCouponJump(e) {
      let { item = {} } = e.currentTarget.dataset || {};
      let { to = '', params = {}, userAction = "" } = item || {};
      djCmsJump({
        to: item.expansionCoupon.to,
        userAction: item.expansionCoupon.userAction,
        params: item.expansionCoupon.params,
        preObj: this.data.recommendObj,
        buried_position: "active-storeList2"
      })
    }
  }
})

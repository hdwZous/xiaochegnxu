import { djCmsJump } from '../../../../common/util/agreementV2';
import { isLogin } from '../../../../common/util/loginUtil';
import { clickBuriedV2_ } from '../../../../common/util/BI';
Component({
  lazyObj: {
    selector: '.customer',
    needExposure: true,
    componentName: 'customer'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function (newVal) {
        const { data = [] } = newVal;
        this.setData({
          customer: data[0] || {}
        })
      }
    },
    traceId: {
      type: String,
      value: ''
    },
    pageId: {
      type: String,
      value: ''
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
    customer: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumper: function (e) {
      clickBuriedV2_({
        click_id: "customer",
        click_par: {
          
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      const data = e.currentTarget.dataset;
      if (isLogin()) {
        if (data.to) {
          djCmsJump({
            ...data,
            preObj: this.data.recommendObj,
            buried_postion: "channel-newCustomer"
          })
        }
      } else {
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.recommendObj,
          buried_postion: "channel-newCustomer-login"
        })
      }
    }
  }
})

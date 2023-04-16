import {
  isLogin
} from '../../../../common/util/loginUtil'
import {
  mpCmsJump
} from '../../../../common/util/agreementV2.js'
Component({
  lazyObj: {
    selector: '.home_period',
    epSelector: '.home_period'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    // 楼层唯一id
    floorId: {
      type: String,
      value: ''
    },
    // 图片懒加载
    imgLazyLoad: {
      type: Object,
      value: {}
    },
    // 组件数据
    periodData: {
      type: Object,
      value: {}
    },
    // 背景色
    bgColor: {
      type: String,
      value: ''
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 临时宫格
    clickPic(e) {
      let data = e.currentTarget.dataset;
      // 是否需要登录
      let needLogin = data.needLogin;
      // h5地址
      let linkUrl = data.linkUrl;
      // 跳转小程序页地址
      let jump = data.jump;
      // 埋点数据
      let userAction = data.userAction;
      // 跳转参数（下发的字符串，转成对象格式）
      let jumpParam = { userAction: userAction };
      let paramArr = (data.params || '').split("&");
      paramArr.forEach(item => {
        if (item.indexOf('=') > -1) {
          let itemObj = item.split("=");
          let key = itemObj[0];
          jumpParam[key] = itemObj[1]
        }
      });
      // 跳转
      if (needLogin) {
        if (isLogin()) {
          this.jump(jump, linkUrl, jumpParam, true, userAction)
        } else {
          wx.navigateTo({
            url: `/pages/newLogin/login/login`,
            preObj: this.data.buriedObj,
            buried_position: {
              currentPageName: 'homeperiod_clickPic_home'
            }
          })
        }
      } else {
        this.jump(jump, linkUrl, jumpParam, false, userAction)
      }
    },
    // 跳转
    jump(jump, url, params = {}, needToken, userAction = {}) {
      //后置登录
      if (jump) {
        mpCmsJump({
          pageType: jump,
          params: params,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homeperiod_jump_home'
          }
        })
        return ''
      }
      if (url) {
        mpCmsJump({
          pageType: 'p19',
          params: {
            url: encodeURIComponent(url) + '&userAction=' + userAction
          },
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homeperiod_jump_home'
          }
        })
      }
    }
  }
});

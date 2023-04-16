import { djCmsJump } from "../../../../common/util/agreementV2";
// let app = getApp();
Component({
  lazyObj: {
    epSelector: '.activity_comp_ep',
    componentName: 'storeinfo'
  },
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {},
    },
    pageFrom: {
      type: String,
      value: ""
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
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    goStore(e) {
      // console.log(e);
      // console.log(this.data.pageFrom);
      // if (this.data.pageFrom == "home") {
        let data = e.currentTarget.dataset;
        // 如果是跳转h5,但是没下发url则不跳转
        if (data.to == "web" && (!data.params || !data.params.url)) return;
        data.params.position = 'topShopAround'
        // console.log(data.userAction);
        // return
        // 跳转协议
        djCmsJump({
          to: data.to,
          params: data.params,
          userAction: data.userAction,
          preObj: this.data.recommendObj,
          buried_position: "active-storeInfo"
        });
      // } else if (this.data.pageFrom == "store") {
      //   wx.navigateBack({
      //     delta: 1,
      //   });
      // }
    },
  },
});

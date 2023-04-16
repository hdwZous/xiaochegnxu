import { djCmsJump } from '../../../../common/util/agreementV2'
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.active_banner',
    epSelector: '.activity_comp_ep'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (val) {
        let dataOne = val && val.data && val.data[0] || '';
        if (dataOne) {
          let imgWidth = dataOne.imgWidth;
          let imgHeight = dataOne.imgHeight;
          if (val.edge) {
            this.setData({
              imgHeight: 750 * imgHeight / imgWidth + 'rpx',
              edge: val.edge
            })
          } else {
            this.setData({
              imgHeight: 710 * imgHeight / imgWidth + 'rpx',
              edge: val.edge
            })
          }
        }
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

  pageLifetimes: {
    show() {
      this.setData({
        autoplay: true
      })
    },
    hide() {
      this.setData({
        autoplay: false
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 图片高度
    imgHeight: '186rpx',
    // 是否有边距
    edge: false,
    // 当前页
    current: 1,
    autoplay: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击banner
    clickBanner(e) {
      let { to = 'home', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
      try {
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "banner",
          click_par: {
            userAction: userAction || ""
          },
          pageId: this.data.pageId || "",
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName
        });
      } catch(e) {
        console.log(e);
      }
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        preObj: this.data.recommendObj,
        buried_position: "active-banner"
      })
    },
    // 轮播
    swiperChange(e) {
      let { current = 1 } = e.detail || {};
      this.setData({
        current
      })
    }
  }
})

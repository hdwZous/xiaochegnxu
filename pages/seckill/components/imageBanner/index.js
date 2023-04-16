import { djCmsJump } from "../../../../common/util/agreementV2";
import { transferExposureData } from '../../../../common/util/BI';
Component({
  lazyObj: {
    selector: '.seckill_img',
    epSelector: '.seckill_img'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    lists: {
      type: Array,
      value: [],
    },
    scrollTop: {
      type: Number,
      value: 0,
      observer: function (nums) {
        let opacity = 1 - (nums / 100) * 2;
        this.setData({
          opacity,
        });
      },
    },
    traceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  },

  pageLifetimes: {
    show: function () {
      this.setData({
        autoplay: true,
      });
    },
    hide: function () {
      this.setData({
        autoplay: false,
      });
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 当前页
    activeIndex: 0,
    opacity: 1,
    autoplay: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 图片切换
    bannerChange(e) {
      let index = e.detail.current;
      let history = this._getHistoryPage();
      this.setData({
        activeIndex: index,
      });
      const traceId = this.data.traceId
      const { userAction ='' } = this.data.lists[index]
      let pageId = this.data.buriedObj.pageIdFirstPage || ''
      let currentPageName = this.data.buriedObj.currentPageName || ''
      let prePageName = this.data.buriedObj.prePageName || ''
      transferExposureData({
        userAction,
        traceId,
        pageId,
        create_time: new Date(),
        clienttime: Date.now(),
        currentPageName,
        prePageName
      }, history)
    },
    clickImg(e) {
      let { to, params, userAction } = e.currentTarget.dataset;
      djCmsJump({
        // 去向
        to: to,
        // url参数
        params: params,
        userAction: userAction,
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'seckill_imagebanner_clickImg'
        }
      });
    },
  },
});

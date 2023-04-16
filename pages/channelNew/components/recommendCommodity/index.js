import { clickBuriedV2_ } from '../../../../common/util/BI';
import { djCmsJump } from '../../../../common/util/agreementV2';
// 推荐商品组件
Component({
  lazyObj: {
    selector: '.channel_comp_ep',
    epSelector: '.commodity-list >>> .channel_comp_ep'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function (newVal) {
        const { data = [], styleTpl = '', floorStyle = '' } = newVal
        const commodityGroup = [];
        let step = 2;
        if (styleTpl == 'tpl19') {
          if (floorStyle == 'act3' || floorStyle == 'act6') {
            step = 3
          } else {
            step = 4
          }
        }
        for (var i = 0; i < data.length; i += step) {
          if (data[i] && data[i + 1]) {
            commodityGroup.push(data.slice(i, i + step));
          }
        }
        this.setData({
          commodityGroup: commodityGroup || []
        })
      }
    },
    channelId: {
      type: String,
      value: "",
      observer: function () {
        // console.log(val)
      }
    },
    // 图片懒加载
    imgLazyLoad: {
      type: Object,
      value: {}
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
    commodityGroup: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToDetail: function (e) {
      clickBuriedV2_({
        click_id: "commodity_item",
        click_par: {
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      const data = e.currentTarget.dataset;
      if (data.to) {
        djCmsJump({
          ...data,
          preObj: this.data.recommendObj,
          buried_postion: "channel-recommendCommodity"
        })
      }
    },
  }
})

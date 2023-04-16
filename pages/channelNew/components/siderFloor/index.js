
import { djCmsJump } from '../../../../common/util/agreementV2';
import { clickBuriedV2_ } from '../../../../common/util/BI';
Component({
  lazyObj: {
    selector: '.movearea',
    epSelector: '.movearea .channel_comp_ep',
    needExposure: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: []
    },
    siderHide: {
      type: Boolean,
      value: false
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
  lifetimes: {
    attached: function () {
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick() {
      if (this.data.data.length > 0) {
        try {
          clickBuriedV2_({
            click_id: 'clickWindow',
            click_par: {
              userAction: this.data.data[0].userAction
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
            currentPageName: this.data.recommendObj.currentPageName,
            prePageName: this.data.recommendObj.prePageName
          })
          djCmsJump({
            to: this.data.data[0].to,
            params: this.data.data[0].params,
            userAction: this.data.data[0].userAction,
            preObj: this.data.recommendObj,
            buried_postion: "channel-siderFloor"
          })
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
})

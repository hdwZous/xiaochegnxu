import { djCmsJump } from "../../common/util/agreementV2";
import { clickBuriedV2_} from '../../common/util/BI';
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    epSelector: '.channel_comp_ep',
  },

  /**
   * 组件的属性列表
   */
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    item: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val && val.userAction) {
          this.epSection && this.epSection()
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
    buriedObj: {
      type: Object,
      value: {}
    },
    fromPositon: {
      type: String,
      value: ''
    },
    optionsPos: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    buttonStyle:{
      iconText: '购买', // 文本
      startBgColor: '#45DC6D', // 背景渐变起始值
      endBgColor: '#00CF37', // 背景渐变结束值
      iconTextColor: '#fff', // 文本颜色
      width: '104', // 宽度
      height: '52', // 高度
      fontWeight: '500', //
      fontSize: '24',
      borderRadius: '32'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickToStoreName(e) {
      let { to = '', params = '', userAction = '', storeId = '', orgCode = '' } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId,
        preObj: this.data.buriedObj,
        buried_position: {
          fromPositon: `goods-${this.data.fromPositon}`,
          optionsPos: this.data.optionsPos
        }
      })
      this.triggerEvent('feedsShopId', { storeId, orgCode }, { composed: true, bubbles: true })
    },
    clickToStore(e) {
      let { storeJumpParam={}, storeId = '', orgCode = '' } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to: storeJumpParam.to,
        params: storeJumpParam.params,
        userAction: storeJumpParam.userAction ||'',
        traceId: this.data.traceId,
        preObj: this.data.buriedObj,
        buried_position: {
          fromPositon: `goods-${this.data.fromPositon}`,
          optionsPos: this.data.optionsPos
        }
      })
      this.triggerEvent('feedsShopId', { storeId, orgCode }, { composed: true, bubbles: true })
    },
  }
})

import { djCmsJump } from "../../common/util/agreementV2";

Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.common_gridLittle',
    epSelector: '.common_gridLittle'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    data: {
      type: Object,
      value: {}
    },
    type: {
      type: String,
      value: ''
    },
    traceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickCard(e) {
      let { to = '', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId,
        preObj: this.data.buriedObj,
        buried_position: {
          fromPositon: `gridLittle-${this.data.fromPositon}`,
          optionsPos: this.data.optionsPos
        }
      })
    }
  }
})

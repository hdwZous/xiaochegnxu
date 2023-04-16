import { djCmsJump } from "../../common/util/agreementV2";

Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.common_strategylittle',
    epSelector: '.common_strategylittle'
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
      value: {}
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

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickCard() {
      let { to = '', params = {}, userAction = '' } = this.data.item || {};
      let { buriedObj = {} } = this.data;
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId,
        preObj: buriedObj
      })
    }
  }
})

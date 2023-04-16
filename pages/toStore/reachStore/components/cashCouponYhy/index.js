import util from "../../../../../common/util/util.js"
import {djCmsJump} from "../../../../../common/util/agreementV2.js"
const app = getApp()
Component({
  lazyObj: {
    selector: ".lazy-load-wrap",
    epSelector: ".ep-cashcoupon-yhy",
    needExposure: true,
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (obj) {
        obj.buttonStyle = {
          iconText: '抢购', 
          startBgColor: '#FF6461', 
          endBgColor: '#FF2A26', 
          iconTextColor: '#fff', 
          width: '104', 
          height: '52', 
          fontWeight: '500',
          fontSize: '28',
          borderRadius: '26'
        }
        this.setData({
          newItem: obj
        })
      }
    },
    buriedObj:{
      type: Object,
      value: {}
    },
    traceId: {
      type: String,
      value: ""
    }
  },
  data: {
    newItem: {}
  },
  attached() {
  },
  methods: {
    jump(e) {
      let item = e.currentTarget.dataset.item || {}
      djCmsJump({
        to: item.to,
        params: item.params,
        userAction: item.userAction,
        preObj: this.data.buriedObj
      })
    },
  },
});

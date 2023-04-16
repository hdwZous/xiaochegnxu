import util from '../../../../common/util/util'
import {
  getGroupShareImg,
  chanageAttention,
  checkAttentionStore
} from "../../common/public"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    storeId: {
      type: String,
      value: ""
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
    // switchSrc
    switchSrcOpen: "https://storage.360buyimg.com/wximg/groupbuy/switch-open.png",
    switchSrcClose: "https://storage.360buyimg.com/wximg/groupbuy/switch-close.png",
    attention: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchAttention() {
      let isFollow = !this.data.attention;
      let storeId = this.data.storeId;
      chanageAttention({
        storeId: storeId,
        isFollow: isFollow,
        preObj: this.data.recommendObj || {}
      }).then(res => {
        if (res.data.result) {
          this.setData({
            attention: isFollow
          });
          // 刷新首页数据
          // util.refreshHomePage()
        }
      })
    }
  }
})

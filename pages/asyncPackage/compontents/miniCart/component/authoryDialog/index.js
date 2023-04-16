
/**
 * 事件类型
 */
import { djCmsJump } from "../../../../../../common/util/agreementV2";
let TYPE = {
  // 点击取消按钮
  cancel: 'clickCancel',
  // 点击授权按钮
  confirm: 'clickConfirm'
};

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titleText: {
      type: String,
      value: ""
    },
    contentText: {
      type: String,
      value: ""
    },
    cancelText: {
      type: String,
      value: ""
    },
    confirmText: {
      type: String,
      value: ""
    },
    showDialog: {
      type: Boolean,
      value: false,
      observer: function (newVal) {
        this.refresh(newVal)
      }
    },
    width: {
      type: Number,
      value: 540
    },
    popupWindow: {
      type: Object,
      value: null
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    refresh: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // COLSE_ACCOUNT(1, "关闭窗口继续结算", "授权"),
    // COLSE_REFRESH(2, "关闭窗口刷新购物车", "确定"),
    // COLSE_NO_OPREATE(3, "关闭窗口不进行下一步", "我知道了"),
    // COLSE_NO_OPREATE_CANCLE(3, "关闭窗口不进行下一步", "取消"),
    // REMOVE_INVAILD_GIFT(4, "删除无效赠品", "删除商品去结算"),
    // UPGRADE_APP(5, "升级app", "升级APP"),
    // JUMP_PROTOCOL(6, "跳转h5或者原生页", ""),
    // JUMP_CART(7, "跳转购物车", "返回购物车"),
    // REMOVE_INVAILD_GOODS(8, "移除全部无货商品", "移除无货商品"),
    // TO_SETTLE_ACCOUNT(9, "购物车去结算按钮", "去结算"),
    // TO_STORE(10, "跳转到门店页面", "进店选购"),
    // ADD_ITEM(11, "增加商品数量", "原价购买"),
    // SKIP_WXXCX(12, "跳转到京东到家微信小程序", "京东到家小程序购买"),
    // CHECK_TODAYPURCHASE(13, "全选今日加购商品，反选其他商品", "一键勾选今日加购商品"),
    // PRESCRIPTION_PURCHASE(14, "处方药一起购买", "一起购买"),
    // PRESCRIPTION_INQUIRY(15, "处方药免费开方", "去免费开方"),
    clickBtn (e) {
      let { type, to, param } = e.currentTarget.dataset
      let name = ''
      if (type == 3) { // 关闭
        name = TYPE.cancel
      } else if (type == 1) { // 确定
        name = TYPE.confirm
      } else if (type == 2) { // 关闭
        name = TYPE.cancel
      }else if (type == 6) { // 跳转
        name = TYPE.cancel
        djCmsJump({
          to: to,
          params: param
        })
      }
      //   let name = type == 3 ? TYPE.cancel : type == 1 ? TYPE.confirm : ''
      this.triggerEvent(name)
    },
    refresh (val) {
      this.setData({
        refresh: val
      })
    }
  }
});

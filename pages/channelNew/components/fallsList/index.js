import { djCmsJump } from '../../../../common/util/agreementV2';

let leftHeight = 0;
let rightHeight = 0; //分别定义左右两边的高度

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      val: [],
      observer: function (val) {
        // console.log("val11111", val);
        if (val.length > 0) {
          this.handleInitData(val);
        }
      },
    },
    isRefersh: {  // 是否是刷新数据
      type: Boolean,
      val: false,
      observer: function (val) {
        val && (
          this.setData({
            leftList: [],
            rightList: [],
          })
        )
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
    },
    noData: {
      type: Boolean,
      value: false
    },
    defaultType: {
      type: Number,
      value: 0
    },
    defaultObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftList: [],
    rightList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInitData(goods) {
      // console.log('goods',goods,this.data.isRefersh)
      if (this.data.isRefersh) {
        this.setData({
          leftList: [],
          rightList: [],
        });
        leftHeight = 0;
        rightHeight = 0;
      }
      const { leftList = [], rightList = [] } = this.data;
      let left = []
      let right = []
      // 给每一项加上高度属性
      goods.forEach((item) => {
        const { data = {} } = item;
        if (item.type == 1) {
          let height = 278;
          if (item.data.funcIndicatinsOrAdWord) {
            height += 17
          }
          if ((item.data.couponVOList && item.data.couponVOList.length > 0) || (item.data.coupons && item.data.coupons.length > 0)) {
            height += 16;
          }
          if (item.data.minorPrice && item.data.minorPrice.price) {
            height += 16;
          }
          item.height = height;
        } else if (item.type == 2 && item.data.resources) {
          let height = 62 + 57 + (item.data.resources.length - 1) * 69;
          item.height = height;
        }
        if (item.type == 7) {
          item.height = 287
        }
        if (item.type == 9) {
          item.height = 254
        }
        const newItem = {
          height: item.height,
          type: item.type,
          data
        }
        const { height = 0 } = item;
        if (leftHeight > rightHeight) {
          right.push(newItem)
          rightHeight += height;
        } else {
          left.push(newItem)
          leftHeight += height;
        }
      });
      this.setData({
        leftList: leftList.concat(left),
        rightList: rightList.concat(right),
      });
    },
    defaultBtnEvent(e) {
      const { type, data } = e.detail
      this.triggerEvent("defaultBtnEvent", {
        type: type,
        data: data
      });
    },
    handleJump(e) {
      let { storeJumpParam, userAction } = e.currentTarget.dataset.item.data;
      djCmsJump({
        ...storeJumpParam,
        userAction,
        preObj: this.data.recommendObj,
        buried_postion: "channel-fallList1"
      })
    },
    handleStoreJump(e) {
      let params = e.currentTarget.dataset.item;
      djCmsJump({
        ...params,
        preObj: this.data.recommendObj,
        buried_postion: "channel-fallList2"
      })
    }
  },
});
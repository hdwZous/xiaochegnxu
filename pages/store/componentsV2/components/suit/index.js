import { djCmsJump } from '../../../../../common/util/agreementV2'
import { updateGoodsNum } from "../../../../../common/util/carService";
Component({
  lazyObj: {
    epSelector: ".suit-wrapper .ep_suit",
    needExposure: true,
  },
  properties: {
    floor: {
      type: Object,
      value: {},
      observer: function (obj) {
        if (obj.data.length > 0) {
          this.setData({
            totalData: obj.data,
          });
        }
      },
    },
    updateNum: {
      type: Object,
      value: {},
    },
    traceId: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
    tabName: {
      type: String,
      value: "",
    },
  },
  data: {
    totalData: [], // 整个楼层数据
    proList: [], // 当前套装的商品
    priceTitle: "", // 底部 当前选中的套装标题
    price: "", // 底部 当前选中的套装的套装总价
    basePrice: "", // 底部 当前选中的套装的原价
    curIndex: 0,
    NeedExposure: true,
  },
  observers: {
    updateNum: function (newval) {
      if (newval) {
        updateGoodsNum(this, this.data.totalData, newval, "totalData");
      }
    },
  },
  methods: {
    // 点击更多
    clickMoreBtn(e) {
      let { to, params, userAction } = e.currentTarget.dataset;
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: `suit`,
          options: this.data.options,
        },
      });
    },
    clickSuitName(e) {
      let { index } = e.currentTarget.dataset;
      if (this.data.curIndex == index) return;
      this.data.totalData.forEach((item) => {
        item.isAddCart = false;
      });
      this.setData({
        curIndex: index,
        totalData: this.data.totalData,
      });
    },
    clickBuy() {
      this.setData(
        {
          [`totalData[${this.data.curIndex}].isAddCart`]: true,
        },
        () => {
          this.setData({
            [`totalData[${this.data.curIndex}].isAddCart`]: false,
          });
        }
      );
    },
  },
});
import { djCmsJump } from '../../../../../common/util/agreementV2'
import { updateGoodsNum } from "../../../../../common/util/carService";
Component({
  lazyObj: {
    epSelector: ".wrapper .ep_baopin-more",
    needExposure: true,
  },
  properties: {
    floor: {
      type: Object,
      value: {},
      observer: function (val) {
        val.data &&
          val.data.forEach((item) => {
            if (item.showModel == 1) {
              // spu商品
              item.incartCount = item.spuCartCount;
            }
          });
        this.setData({
          list: val.data,
        });
      },
    },
    imgLazyLoad: {
      type: Object,
      value: {},
    },
    floorId: {
      type: String,
      value: "",
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
    list: [],
    NeedExposure: true,
  },
  observers: {
    updateNum: function (newval) {
      if (newval) {
        updateGoodsNum(this, this.data.list, newval, "list");
      }
    },
  },
  methods: {
    // 点击更多
    clickMoreBtn(e) {
      let { to, params, userAction, firstCateId, secondCateId } =
        e.currentTarget.dataset;
      if (to) {
        // 如果是爆品抢购，跳转到促销落地页
        djCmsJump({
          to: to,
          params: params,
          userAction: userAction,
          traceId: this.data.traceId || "",
          preObj: this.data.buriedObj,
          buried_position: {
            key: `store-threeInTwoRow`,
          },
        });
      } else {
        // 如果是商品分类楼层，则通知newStoreV4组件锚中对应分类
        this.triggerEvent("tellParent", {
          type: "product",
          data: {
            firstCateId,
            secondCateId,
          },
        });
      }
    },
  },
});
import {
  cartItemNumChange,
  cartItemRemove,
} from "../../../../../services/index";
import { debounce } from "../../../../../utils/common";

Component({
  properties: {
    productItem: {
      type: Object,
      value: {},
      observer: function (newVal) {
        if (newVal) {
          this.setData({
            incartCount: newVal.incartCount,
          });
        }
      },
    },
    storeId: {
      type: String,
    },
    orgCode: {
      type: String,
    },
  },
  data: {
    incartCount: 0, // 当前在购物车中数量
    longitude: "",
    latitude: "",
  },
  methods: {
    add() {
      this.addCartNum();
    },
    reduce() {
      this.reduceCartNum();
    },
    addCartNum() {
      console.log(this);
      let num = this.data.incartCount + 1;
      this.changeCartNum(num);
    },
    async reduceCartNum() {
      // 当当前在购物车中数量大于1的时候 调修改数量，小于1调删除
      if (this.data.incartCount > 1) {
        let num = --this.data.incartCount;
        this.changeCartNum(num);
      } else {
        const res = await cartItemRemove({
          fromSource: 5,
          isAdd: false,
          positionType: "2",
          storeId: this.data.storeId,
          orgCode: this.data.orgCode,
          lat: "",
          lng: "",
          chgNumReturnType: 0,
          isReturnCart: true,
          skus: [{ id: this.data.productItem.skuId }],
        });
        if (res.code == 0) this.setData({ incartCount: 0 });
      }
    },
    async changeCartNum(num) {
      console.log("num", num, this.data.incartCount);
      const res = await cartItemNumChange({
        fromSource: 5,
        chgNumReturnType: 0,
        isAdd: true,
        positionType: "2",
        storeId: this.data.storeId,
        orgCode: this.data.orgCode,
        lat: "",
        lng: "",
        isReturnCart: true,
        skus: [
          {
            id: this.data.productItem.skuId,
            num: num,
            spuId: "",
            purchaseLimitHotSale: false,
            skuServiceList: [],
          },
        ],
        showedPurchaseLimitHotSalePopupVo: false,
        couponId: "",
        pageSource: "",
        incrementFlag: false,
      });
      if (res.code == 0) {
        this.setData({ incartCount: num });
      }
    },
  },
});


import { djCmsJump } from "../../../../../common/util/agreementV2.js";
import { clickBuriedV2_ } from '../../../../../common/util/BI';
let leftHeight = 0;
let rightHeight = 0; //分别定义左右两边的高度
Component({
  properties: {
    title: {
      type: String,
      value: "",
    },
    list: {
      type: Array,
      value: [],
      observer: function (val) {
        // console.log("====", val);
        if (val.length > 0) {
          this.handleInitData(val);
        }
      },
    },
    imgLazyLoad: {
      type: Object,
      value: {}
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
    traceId: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  data: {
    leftList: [],
    rightList: [],
  },
  methods: {
    handleInitData(goods) {
      let arr = JSON.parse(JSON.stringify(goods));
      let newArr = arr.map((item) => {
        let height = 472;
        if (item.data.skuName.length > 11) {
          // 商品名称高度
          height += 17;
        }
        if (item.data.minorPrice && item.data.minorPrice.price) {
          // 商品名称高度
          height += 28;
        }
        item.height = height;
        return item;
      });
      if (newArr && newArr.length) {
        let { left, right } = this.sort(leftHeight, rightHeight, newArr);
        this.setData({
          leftList: this.data.leftList.concat(left),
          rightList: this.data.rightList.concat(right),
        });
      }
    },
    sort(leftNum = 0, rightNum = 0, origin = [], left = [], right = []) {
      if (origin.length === 0) {
        leftHeight = leftNum;
        rightHeight = rightNum;
        return {
          left,
          right,
        };
      }
      if (leftNum > rightNum) {
        rightNum += origin[0].height;
        right.push(origin.splice(0, 1)[0]);
      } else {
        leftNum += origin[0].height;
        left.push(origin.splice(0, 1)[0]);
      }
      return this.sort(leftNum, rightNum, origin, left, right);
    },
    handleJump(e) {
      let { to, params, userAction } = e.currentTarget.dataset.item;
      let {traceId = "", currentPageName = "", prePageName = "", pageId = "", recommendObj = {}} = this.data;
      djCmsJump({
        to,
        params,
        userAction,
        traceId,
        preObj: recommendObj,
        buried_postion: "order-paySuccess-recommend"
      });
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickProduct",
        click_par: {
          item: e.currentTarget.dataset.item
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageId
      })

    },
  },
});

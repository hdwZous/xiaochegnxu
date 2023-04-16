import { djCmsJump } from "../../../../../../common/util/agreementV2.js";
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    infos: {
      type: Array,
      value: [
        // {
        //   skuId: '322323',
        //   skuName: 'TIGERS老虎西餐双层芝士牛肉墨西',
        //   skuNameTag: 'https://img30.360buyimg.com/vendersettle/s120x120_jfs/t1/130341/11/29751/115435/62d80f0eE0ba209a4/e8eccf94022f340e.png',
        //   tags: [],
        //   majorPrice: {
        //     deleteLine: false,
        //     price: "47.88",
        //     priceColor: "#FF1E19",
        //     priceType: "1"
        //   },
        //   to: '',
        //   params: {}
        // },
        // {
        //   skuId: '322323',
        //   skuName: '鱼悦鸡条霸王卷',
        //   skuNameTag: 'https://img30.360buyimg.com/vendersettle/s120x120_jfs/t1/130341/11/29751/115435/62d80f0eE0ba209a4/e8eccf94022f340e.png',
        //   tags: [{
        //     activityRange: 0,
        //     belongIndustry: 1,
        //     colorCode: "FFCE0B",
        //     endColorCode: "#FF1E19",
        //     iconText: "6.97",
        //     name: "直降",
        //     startColorCode: "#FF5B57",
        //     strokeColorCode: "#FF8E8C",
        //     strokeNameColorCode: "#FF1E1A",
        //     type: 1,
        //     words: "爆品直降,每单限购80份"
        //   }],
        //   majorPrice: {
        //     deleteLine: false,
        //     price: "47.88",
        //     priceColor: "#FF1E19",
        //     priceType: "1"
        //   },
        //   to: '',
        //   params: {}
        // },
        // {
        //   skuId: '322323',
        //   skuName: '【老虎西餐】80抵100元优惠券',
        //   skuNameTag: 'https://img30.360buyimg.com/vendersettle/s120x120_jfs/t1/130341/11/29751/115435/62d80f0eE0ba209a4/e8eccf94022f340e.png',
        //   tags: [],
        //   majorPrice: {
        //     deleteLine: false,
        //     price: "47.88",
        //     priceColor: "#FF1E19",
        //     priceType: "1"
        //   },
        //   minorPrice: {
        //     deleteLine: false,
        //     price: "39.9",
        //     priceColor: "#0084D9",
        //     priceType: "3",
        //     vipPriceIcon: "https://img30.360buyimg.com/mobilecms/jfs/t20686/164/1675043590/5045/91f83656/5b31d61cN8a5bff81.png"
        //   },
        //   to: '',
        //   params: {}
        // }
      ],
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    traceId: {
      type: String,
      value: ''
    },
    userAction: {
      type: String,
      value: ''
    }
  },
  methods: {
    jump(e) {
      let { items: { to = '', params } = {} } = e.currentTarget.dataset
      if (to) {
        djCmsJump({
          to,
          userAction: this.data.userAction,
          params,
          preObj: this.data.buriedObj,
          traceId: this.data.traceId || "",
        });
      }
    }
  }
});

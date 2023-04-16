Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    list: {
      type: Array,
      value: [],
      observer: function (arr) {
        this.setData({
          goodList: arr,
          scrollTop: 0,
        });
      },
    },
    traceId: {
      type: String,
      value: "",
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
    isCart: {
      type: Boolean,
      value: true,
    }
  },
  data: {
    goodList: [],
    scrollTop: "",
  },
  methods: {
    productTouchBottom() {},
  },
});

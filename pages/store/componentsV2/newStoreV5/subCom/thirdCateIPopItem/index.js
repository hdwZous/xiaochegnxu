
Component({
  options: {
    addGlobalClass: true,
  },
  lazyObj: {
    epSelector: ".ep_third-cate-pop-item",
    needExposure: true,
  },
  properties: {
    thirdItem: {
      type: Object,
      value: {},
    },
    checked: {
      type: Boolean,
      value: false,
    },
    traceId: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
  },
  data: {
    NeedExposure: true,
  },
  methods: {},
});
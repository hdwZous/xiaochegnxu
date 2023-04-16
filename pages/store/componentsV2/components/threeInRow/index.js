import { djCmsJump } from '../../../../../common/util/agreementV2'
Component({
  lazyObj: {
    epSelector: ".wrapper .ep_maizeng-more",
    needExposure: true,
  },
  properties: {
    floor: {
      type: Object,
      value: {},
    },
    imgLazyLoad: {
      type: Object,
      value: {},
    },
    floorId: {
      type: String,
      value: "",
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
    NeedExposure: true,
  },
  methods: {
    clickMoreBtn(e) {
      let { to, params, userAction } = e.currentTarget.dataset;
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: `store-threeInRow`,
          options: this.data.options,
        },
      });
    },
  },
});
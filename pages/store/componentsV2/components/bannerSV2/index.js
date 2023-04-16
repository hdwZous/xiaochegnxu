import { djCmsJump } from '../../../../../common/util/agreementV2'
Component({
  lazyObj: {
    epSelector: ".banner-wrapper .ep_banner",
  },
  properties: {
    data: {
      type: Array,
      value: [],
      observer: function (val) {
        let list = val;
        let width = 682;
        let height = 228;
        if (val.length) {
          width = list[0].imgWidth - 34 * 2;
          height = Math.floor(width / (list[0].imgWidth / list[0].imgHeight));
        }
        if (val.length == 2) {
          list = [...val, ...val];
        }
        this.setData({
          list: list,
          width,
          height,
        });
      },
    },
    orgCode: {
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
  },
  data: {
    list: [],
    width: 682,
    height: 0,
    NeedExposure: true,
  },
  methods: {
    jumpPage(e) {
      let data = e.currentTarget.dataset.item;
      let to = data.to || "";
      let params = data.params || {};
      let userAction = data.userAction || "";
      djCmsJump({
        to: to,
        params: {
          orgCode: this.data.orgCode,
          ...params,
        },
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: "store-bannerSV2-jumpPage",
          options: this.data.options,
        },
      });
    },
  },
});
import { djCmsJump } from "../../../../common/util/agreementV2";
Component({
  properties: {
    list: {
      type: Array,
      value: []
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  },
  methods: {
    clickBottomTab(e) {
      let item = e.currentTarget.dataset.item;
      djCmsJump({
          to: item.to || '',
          params: item.params || {},
          useraction: item.useraction || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'seckill_bottomtab_clickBottomTab'
          }
      })
    },
  },
});

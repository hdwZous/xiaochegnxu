
// import { djCmsJump } from "../../../../../common/util/agreementV2.js";
Component({
  properties: {
    rules: {
      type: Array,
      value: [],
    },
  },

  data: {},
  methods: {
    hidePop() {
      this.triggerEvent('hideRulePop')
    }
  },
});

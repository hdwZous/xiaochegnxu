import { djCmsJump } from "../../../../../common/util/agreementV2"

Component({
  properties: {
    title: {
      type: String,
      value: '商品评价',
    },
    moreText: {
      type: String,
      value: '更多评价'
    },
    moreJump: {
      type: Object,
      value: {},
    },
    config: {
      type: Object,
      value: {},
    }
  },
  methods: {
    toH5MoreEvaluate() {
      const { moreJump, config } = this.data
      const { userAction } = config || {}
      if (moreJump) {
        djCmsJump({ ...moreJump, userAction })
      }
    }
  }
})

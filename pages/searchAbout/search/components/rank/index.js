import { djCmsJump } from '../../../../../common/util/agreementV2'

Component({
  lazyObj: {
    epSelector: '.rank__item__ep'
  },
  properties: {
    searchFloor: {
      type: Object,
      value: {}
    },
    traceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onTap (event) {
      const { searchFloor = {} } = this.data || {}
      const { dataset } = event.currentTarget

      djCmsJump({ ...dataset }, searchFloor.rankType != 2)
    }
  }
})

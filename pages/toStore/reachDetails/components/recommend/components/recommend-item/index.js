import { djCmsJump } from '../../../../../../../common/util/agreementV2'

Component({
  options: {
    virtualHost: true,
  },
  lazyObj: {
    epSelector: '.recommend__item__ep'
  },
  properties: {
    sku: {
      type: Object,
      value: {},
    },
    traceId: {
      type: String,
      value: '',
    },
    buriedObj: {
      type: Object,
      value: {
        pageIdFirstPage: '',
        currentPageName: '',
        prePageName: '',
      },
    }
  },
  methods: {
    openNewDetail() {
      const { to = '', params = {}, userAction = {} } = this.data.sku || {}
      params.bgType = params.bgType || 'jdToStore'
      djCmsJump({ to, params, userAction })
    }
  }
})

Component({
  properties: {
    title: {
      type: String,
      value: '可用优惠券',
    },
    couponList: {
      type: Array,
      value: [],
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
  }
})

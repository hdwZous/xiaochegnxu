Component({
  properties: {
    title: {
      type: String,
      value: '相关套餐优惠',
    },
    skuList: {
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
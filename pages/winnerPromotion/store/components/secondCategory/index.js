//Component Object
Component({
  properties: {
    secondList: {
      type: Object,
      value: {},
      observer: function () {},
    },
    showAllSecondCate: {
      type: String,
    },
    secondIndex: {
      type: String,
    },
    showAllSecondCate: {
      type: Boolean,
    },
  },
  data: {},
  methods: {
    clickSubClassify: function (e) {
      this.triggerEvent('clickSubClassify', e)
    },
    showSecondCateMask(e) {
      this.triggerEvent('showSecondCateMask', e)
    },
  },
})

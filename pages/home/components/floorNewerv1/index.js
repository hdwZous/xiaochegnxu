Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_floorNewerV1',
    epSelector: '.home_floorNewerV1'
  },
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    newerData: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val && val.data && val.data.length) {
          val.data.forEach(item => {
            item.floorCellData.imgWidth = 702 + "rpx";
            item.floorCellData.imgHeight = 282 + "rpx";
          });
          this.setData({
            newerData: val
          });
          this.epSection && this.epSection()
        }
      }
    },
    // 楼层唯一id
    floorId: {
      type: String,
      value: ""
    },
    // 图片懒加载
    imgLazyLoad: {
      type: Object,
      value: {}
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  },
  data: {
    newerData: {}
  },
  methods: {

  }
});

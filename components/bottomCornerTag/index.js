Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    infos: {
      type: Object,
      value: null,
      observer(news) {
        if (news) {
          if (news.type == 2) {
            this.allocaImg(this.data.moduleId)
          }
          if (news.type == 3) {
            this.allocation(this.data.moduleId)
          }
        }
      }
    },
    // 是否展示预估到手价
    showHandle: {
      type: Boolean,
      value: false
    },
    moduleId: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    leftTextFz: '24rpx',
    leftTextLh: '28rpx',
    leftTitleFz: '24rpx',
    leftTitleLh: '28rpx',
    leftPadding: '2rpx 8rpx',
    leftWidth: '96rpx',
    rightFz: '36rpx',
    rightLh: '36rpx',
    imgBdradius: '0px 0px 8rpx 8rpx',
    leftBdrs: '0px 12rpx 0px 12rpx',
    rightBdrs: '0 0 12rpx 12rpx'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    allocation(ids) {
      let texts = this.data.infos && this.data.infos.tag && this.data.infos.tag.iconLeft || {}
      switch (ids) {
        case 'SkuFeedOne':
          if (texts.iconText && texts.iconTitle) {
            this.setData({
              leftPadding: '4rpx 0',
              leftWidth: '45%',
              leftTextFz: '20rpx',
              leftTitleFz: '24rpx',
              leftTitleLh: '32rpx',
              leftTextLh: '28rpx',
              rightFz: '36rpx',
              rightLh: '44rpx',
              leftBdrs: '0px 12rpx 0px 0',
              rightBdrs: 0
            })
          } else {
            this.setData({
              leftPadding: '12rpx 0',
              leftWidth: '45%',
              leftTextFz: '24rpx',
              leftTextLh: '32rpx',
              rightFz: '36rpx',
              rightLh: '44rpx',
              leftBdrs: '0px 12rpx 0px 0',
              rightBdrs: 0
            })
          }
          break;
        case 'SkuYheOne':
          if (texts.iconText && texts.iconTitle) {
            this.setData({
              leftPadding: '4rpx 0',
              leftWidth: '45%',
              leftTextFz: '20rpx',
              leftTitleFz: '20rpx',
              leftTitleLh: '28rpx',
              leftTextLh: '28rpx',
              rightFz: '28rpx',
              rightLh: '36rpx',
              leftBdrs: '0px 16rpx 0px 8rpx',
              rightBdrs: '0px 0 8rpx 8rpx'
            })
          } else {
            this.setData({
              leftPadding: '8rpx 0',
              leftWidth: '45%',
              leftTextFz: '20rpx',
              leftTextLh: '28rpx',
              rightFz: '28rpx',
              rightLh: '36rpx',
              leftBdrs: '0px 16rpx 0px 8rpx',
              rightBdrs: '0px 0 8rpx 8rpx'
            })
          }
          break;
        case 'SkuYhyTwelve':
          if (texts.iconText && texts.iconTitle) {
            this.setData({
              leftPadding: '4rpx 0',
              leftWidth: '45%',
              leftTextFz: '20rpx',
              leftTitleFz: '22rpx',
              leftTitleLh: '32rpx',
              leftTextLh: '28rpx',
              rightFz: '32rpx',
              rightLh: '40rpx',
              leftBdrs: '0px 12rpx 0px 12rpx',
              rightBdrs: '0 0 12rpx 12rpx'
            })
          } else {
            this.setData({
              leftPadding: '12rpx 0',
              leftWidth: '45%',
              leftTextFz: '22rpx',
              leftTextLh: '32rpx',
              rightFz: '32rpx',
              rightLh: '40rpx',
              leftBdrs: '0px 12rpx 0px 12rpx',
              rightBdrs: '0 0 12rpx 12rpx'
            })
          }
          break;
        case 'SkuYhySeven':
          if (texts.iconText && texts.iconTitle) {
            this.setData({
              leftPadding: '4rpx 0',
              leftWidth: '50%',
              leftTextFz: '16rpx',
              leftTitleFz: '16rpx',
              leftTitleLh: '24rpx',
              leftTextLh: '24rpx',
              rightFz: '24rpx',
              rightLh: '32rpx'
            })
          } else {
            this.setData({
              leftPadding: '8rpx 0',
              leftWidth: '50%',
              leftTextFz: '16rpx',
              leftTextLh: '24rpx',
              rightFz: '24rpx',
              rightLh: '32rpx'
            })
          }
          break;
        case 'SkuYhsOne':
          if (texts.iconText && texts.iconTitle) {
            this.setData({
              leftPadding: '4rpx 0',
              leftWidth: '45%',
              leftTextFz: '16rpx',
              leftTitleFz: '16rpx',
              leftTitleLh: '24rpx',
              leftTextLh: '24rpx',
              rightFz: '24rpx',
              rightLh: '32rpx',
              leftBdrs: '0px 12rpx 0px 8rpx',
              rightBdrs: '0px 0 8rpx 8rpx'
            })
          } else {
            this.setData({
              leftPadding: '8rpx 0',
              leftWidth: '45%',
              leftTextFz: '16rpx',
              leftTextLh: '24rpx',
              rightFz: '24rpx',
              rightLh: '32rpx',
              leftBdrs: '0px 12rpx 0px 8rpx',
              rightBdrs: '0px 0 8rpx 8rpx'
            })
          }
          break;
        case 'SkuYhyFour':
          if (texts.iconText && texts.iconTitle) {
            this.setData({
              leftPadding: '4rpx 0',
              leftWidth: '53%',
              leftTextFz: '16rpx',
              leftTitleFz: '16rpx',
              leftTitleLh: '20rpx',
              leftTextLh: '20rpx',
              rightFz: '22rpx',
              rightLh: '28rpx',
              leftBdrs: '0px 12rpx 0px 12rpx',
              rightBdrs: '0px 0 12rpx 12rpx'
            })
          } else {
            this.setData({
              leftPadding: '8rpx 0',
              leftWidth: '53%',
              leftTextFz: '16rpx',
              leftTextLh: '24rpx',
              rightFz: '22rpx',
              rightLh: '28rpx',
              leftBdrs: '0px 12rpx 0px 12rpx',
              rightBdrs: '0px 0 12rpx 12rpx'
            })
          }
          break;
        case 'SpuLayer':
          if (texts.iconText && texts.iconTitle) {
            this.setData({
              leftPadding: '4rpx 0',
              leftWidth: '50%',
              leftTextFz: '16rpx',
              leftTitleFz: '16rpx',
              leftTitleLh: '24rpx',
              leftTextLh: '24rpx',
              rightFz: '24rpx',
              rightLh: '32rpx',
              leftBdrs: '0px 12rpx 0px 8rpx',
              rightBdrs: '0px 0 8rpx 8rpx'
            })
          } else {
            this.setData({
              leftPadding: '8rpx 0',
              leftWidth: '50%',
              leftTextFz: '16rpx',
              leftTextLh: '24rpx',
              rightFz: '24rpx',
              rightLh: '32rpx',
              leftBdrs: '0px 12rpx 0px 8rpx',
              rightBdrs: '0px 0 8rpx 8rpx'
            })
          }
          break;
        case 'SkuYhySearch':
          if (texts.iconText && texts.iconTitle) {
            this.setData({
              leftPadding: '4rpx 0',
              leftWidth: '52%',
              leftTextFz: '16rpx',
              leftTitleFz: '16rpx',
              leftTitleLh: '20rpx',
              leftTextLh: '20rpx',
              rightFz: '22rpx',
              rightLh: '28rpx',
              leftBdrs: '0px 12rpx 0px 8rpx',
              rightBdrs: '0px 0 8rpx 8rpx'
            })
          } else {
            this.setData({
              leftPadding: '8rpx 0',
              leftWidth: '52%',
              leftTextFz: '16rpx',
              leftTextLh: '24rpx',
              rightFz: '22rpx',
              rightLh: '28rpx',
              leftBdrs: '0px 12rpx 0px 8rpx',
              rightBdrs: '0px 0 8rpx 8rpx'
            })
          }
          break;
        case 'SkuYhsZh':
          if (texts.iconText && texts.iconTitle) {
            this.setData({
              leftPadding: '4rpx 0',
              leftWidth: '45%',
              leftTextFz: '14rpx',
              leftTitleFz: '16rpx',
              leftTitleLh: '24rpx',
              leftTextLh: '20rpx',
              rightFz: '28rpx',
              rightLh: '36rpx',
              leftBdrs: '0px 12rpx 0px 12rpx',
              rightBdrs: '0px 0 12rpx 12rpx'
            })
          } else {
            this.setData({
              leftPadding: '12rpx 0',
              leftWidth: '45%',
              leftTextFz: '16rpx',
              leftTextLh: '24rpx',
              rightFz: '28rpx',
              rightLh: '36rpx',
              leftBdrs: '0px 12rpx 0px 12rpx',
              rightBdrs: '0px 0 12rpx 12rpx'
            })
          }
          break;
        default:
          break;
      }
    },
    allocaImg(ids) {
      switch (ids) {
        case 'SkuFeedOne':
          this.setData({
            imgBdradius: 0
          })
          break;
        case 'SkuYheOne':
          this.setData({
            imgBdradius: '0 0 8rpx 8rpx'
          })
          break;
        case 'SkuYhyTwelve':
          this.setData({
            imgBdradius: '0 0 12rpx 12rpx'
          })
          break;
        case 'SkuYhySeven':
          this.setData({
            imgBdradius: '0 0 8rpx 8rpx'
          })
          break;
        case 'SkuYhsOne':
          this.setData({
            imgBdradius: '0 0 8rpx 8rpx'
          })
          break;
        case 'SkuYhyFour':
          this.setData({
            imgBdradius: '0 0 12rpx 12rpx'
          })
          break;
        case 'SpuLayer':
          this.setData({
            imgBdradius: '0 0 8rpx 8rpx'
          })
          break;
        case 'SkuYhySearch':
          this.setData({
            imgBdradius: '0 0 8rpx 8rpx'
          })
          break;
        case 'SkuYhsZh':
          this.setData({
            imgBdradius: '0 0 12rpx 12rpx'
          })
          break;
        case 'SkuYhyOne':
        case 'SkuYhySix':
        case 'SkuYhyEleven':
        case 'SkuYhyEight':
          this.setData({
            imgBdradius: '0 0 8rpx 8rpx'
          })
          break;
        default:
          break;
      }
    }
  },
});

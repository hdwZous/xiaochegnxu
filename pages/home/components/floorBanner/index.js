import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
import { transferExposureData } from '../../../../common/util/BI';
let imgColorObj = {};
let app = getApp();

Component({
  lazyObj: {
    selector: '.home_floorBanner',
    epSelector: '.home_floorBanner'
  },
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    // 楼层唯一id
    floorId: {
      type: String,
      value: ''
    },
    // 图片懒加载
    imgLazyLoad: {
      type: Object,
      value: {}
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    bannerData: {
      type: Object,
      value: {},
      observer: function (obj) {
        // 初始化
        imgColorObj = {}
        this.setData({ current: 0 })

        if (obj.data && obj.data.length >= 10) {
          obj.data = obj.data.splice(0, 10)
        }
        // 没下发背景图或者背景色则取图片颜色展示
        if (!obj.floorBgImg && !obj.floorBgColor) {
          let imgUrl = obj.data && obj.data[0] && obj.data[0].floorCellData.imgUrl
          this.getImageInfo(imgUrl || '')
        }
        if(obj.data && obj.data.length == 1){
          this.epSection && this.epSection()
        }
        
      }
    },
    homeoptions: {
      type: Object,
      value: {}
    }
  },
  data: {
    interval: 3000,
    duration: 500,
    autoPlay: true,
    current: 0,
    swiperBg: `rgba(0, 207, 55, 1)`
  },
  lifetimes: {
    attached() {
    },
  },
  pageLifetimes: {
    show() {
      this.setData({
        autoPlay: true
      })
    },
    hide() {
      this.setData({
        autoPlay: false
      })
    }
  },
  methods: {
    // 图片轮播
    swiperChange(e) {
      let _this = this;
      let { floorBgImg, floorBgColor, data } = this.data.bannerData
      let { current, source } = e.detail
      if (source == 'autoPlay' || source == 'touch') {
        this.setData({
          current: current
        });

        // 如果后端没下发背景或者背景图
        if (!floorBgImg && !floorBgColor && data[current] && data[current].floorCellData) {
          this.getImageInfo(data[current].floorCellData.imgUrl || '')
        }
      }
      if (current >= 1) {
        app.globalData.isFirstPageFlag = false;
      }
     
    },
    // 获取图片颜色，有：直接取，没有：获取颜色并保存
    getImageInfo(imgUrl) {
      // 没有颜色，获取图片信息并取颜色
      if (!imgColorObj[imgUrl]) {
        wx.getImageInfo({
          src: imgUrl || '',
          success: (res) => {
            this.getBgColor(res.path).then((color) => {
              imgColorObj[imgUrl] = color
              this.setColor(color)
            });
          },
          fail: () => {
            // 兜底色
            this.setColor(`rgba(0, 207, 55, .6)`)
          }
        })
      } else { // 有颜色，直接取
        this.setColor(imgColorObj[imgUrl])
      }
    },
    // 获取图片指定像素点颜色
    getBgColor(path) {
      return new Promise((resolve) => {
        const ctx = wx.createCanvasContext('skinCanvas', this)
        ctx.drawImage(path, 0, 0, 30, 10)
        ctx.draw(false, () => {
          wx.canvasGetImageData({
            canvasId: 'skinCanvas',
            x: 8,
            y: 1,
            width: 5,
            height: 1,
            success: (res) => {
              let firstCor = 0
              let secondCor = 0
              let threeCor = 0
              let fourCor = 0
              res.data.length && res.data.forEach((item, index) => {
                if (index % 4 == 0) {
                  firstCor += item
                }
                if (index % 4 == 1) {
                  secondCor += item
                }
                if (index % 4 == 2) {
                  threeCor += item
                }
                if (index % 4 == 3) {
                  fourCor += item
                }
              })
              let bgColor = res.data.length ? `rgba(${parseInt(firstCor / 5 * 0.8)},${parseInt(secondCor / 5 * 0.8)},${parseInt(threeCor / 5 * 0.8)},${parseInt(fourCor / 5)})` : '';

              resolve(bgColor)

            },
            fail: () => {
              resolve(`rgba(0, 207, 55, .6)`)
            }
          }, this)
        })
      })
    },
    jump(e) {
      let item = e.target.dataset.item
      let to = item.to || ''
      let params = item.params || {}
      let userAction = item.userAction || ''
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homefloorbanner_jump_home'
        }
      })
    },
    // 设置颜色并通知父页面
    setColor(color) {
      this.setData({
        swiperBg: color
      })
      if (this.data.bannerData.linkageFloor && color) {
        this.triggerEvent("onChangeBackground", {
          type: 'banner',
          data: color
        })
      }
    }
  }
})
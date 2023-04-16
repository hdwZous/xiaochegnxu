import { djCmsJump } from '../../../../common/util/agreementV2.js'
import { transferExposureData } from '../../../../common/util/BI';

Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_banner',
  },
  /**
   * 组件的属性列表
   */
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
    // 是否显示面板指示点
    indicatorDots: {
      type: Boolean,
      value: true
    },
    // 是否自动切换
    autoPlay: {
      type: Boolean,
      value: true
    },
    // 自动切换时间间隔
    interval: {
      type: Number,
      value: 5000
    },
    // 滑动动画时长
    duration: {
      type: Number,
      value: 500
    },
    // 两边间隙
    space: {
      type: Number,
      value: 0
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    // 来源
    from: {
      type: String,
      value: ''
    },
    // 是否采用衔接滑动
    circular: {
      type: Boolean,
      value: true
    },
    // 当前滑块
    current: {
      type: Number,
      value: 0
    },
    // 数据
    data: {
      type: Array,
      value: [],
      observer: function (newVal) {
        try {
          // 获取设备宽度
          let res = wx.getSystemInfoSync();
          // 设备宽
          let windowWidth = res.windowWidth - 2 * this.data.space;
          // 图片宽-取第一张图片
          let imgWidth = newVal[0].imgWidth;
          // 图片高-取第一张图片
          let imgHeight = newVal[0].imgHeight;
          if (imgWidth && imgHeight) {
            // 图片宽高比
            let ratio = imgHeight / imgWidth;
            // 轮播高
            let bannerHeight = windowWidth * ratio;
            // 更新数据
            this.setData({
              bannerHeight: bannerHeight + 'px',
              bannerWidth: windowWidth + 'px'
            })
          } else {
            this.setData({
              bannerHeight: 'auto',
              bannerWidth: getApp().globalData.systemInfo.screenWidth
            })
          }
          if(newVal && newVal.length == 1){
            this.epSection && this.epSection()
          }
          
        } catch (e) {
          /**/ 
        }
      }
    },
    bgColor: {
      type: String,
      value: ''
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 当前页
    activeIndex: 0,
    // 轮播高度
    bannerHeight: '',
    // 轮播宽度
    bannerWidth: ''
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

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击轮播图片
    clickImg(e) {
      let data = e.currentTarget.dataset;
      let to = data.to || '';
      let params = data.params || {};
      let userAction = data.userAction || {};
      // 跳转协议
      djCmsJump({
        // 去向
        to: to,
        // url参数
        params: params,
        userAction: userAction,
        // 页面来源
        from: this.data.from,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homebanner_clickImg_home'
        }
      })
    },
    // 图片加载失败
    imgError() {},
    // 图片切换
    bannerChange(e) {
      let _this = this;
      let index = e.detail.current;
      this.setData({
        activeIndex: index
      })
      this.data.observerObj = this.createIntersectionObserver({
        thresholds: [0.5],
        observeAll: true
      });
      this.data.observerObj.relativeToViewport().observe('.swiper_item', function (res) {
        if (res && res.intersectionRatio >= 0.5) {
          if(_this.data.data && _this.data.data.length > 1 && _this.data.autoPlay){
            const { userAction ='' } =  _this.data.data[current] &&  _this.data.data[current] 
            let {pageId= '',traceId='',currentPageName='',prePageName=''} = e.currentTarget.dataset
            transferExposureData({
              userAction,
              traceId,
              create_time: new Date(),
              clienttime: Date.now(),
              pageId,
              currentPageName,
              prePageName
            })
          }
        }
      })
    }
  }
});

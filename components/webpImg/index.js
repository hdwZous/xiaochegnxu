/* 使用说明

参数名称     参数说明            是否必须
src         图片路径            true
mode        剪裁模式            false
width       宽                 false
height      高                 false           

支持使用组件外部class直接设置图片大小,使用方法:

<webp-img webp-img="my-class" />
my-class 为父组件样式名，可直接在父组件设置(父组件样式不能直接写100%/100%,需要直接指定宽高)

*/
// import { clickBuried_ } from '../../common/util/BI'
const app = getApp();
let img_load_start = 0
let img_load_end = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: ""
    },
    mode: {
      type: String,
      value: "widthFix",
    },
    width: {
      type: String,
      value: "",
    },
    height: {
      type: String,
      value: "",
    },
    // 商品图是否需要黑色压块
    needOverlay: {
      type: Boolean,
      value: false,
    },
    // 商品名称，无障碍需要
    skuName: {
      type: String,
      value: ''
    },
  },

  lazyObj: {
    selector: ".webp-box",
  },

  externalClasses: ["webp-img"],

  observers: {
    async src(news) {
      if (news && news.length) {
        let websrc = await this.getWebpsrc(news);
        this.setData(
          {
            websrc,
          },
          () => {
            img_load_start = Date.now();
          }
        );
      }
    },
    width(news) {
      if (news) {
        if (!/px|rpx|vw|vh/gi.test(news)) {
          this.setData({
            width: news + "rpx",
          });
        }
      }
    },
    height(news) {
      if (news) {
        if (!/px|rpx|vw|vh/gi.test(news)) {
          this.setData({
            height: news + "rpx",
          });
        }
      }
    },
  },

  lifetimes: {
    created() {},
  },

  /**
   * 组件的初始数据
   */
  data: {
    websrc: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getWebpsrc(src) {
      let websrc = "";
      let [isSupportWebp, isJdHost, isJPG] = await Promise.all([
        this.judgeWebp(),
        this.isJdHost(src),
        this.isJPG(src),
      ]);
      if (isSupportWebp && isJdHost && isJPG) {
        websrc = `${src}.webp`;
      } else {
        websrc = src;
      }
      // websrc = src
      return websrc;
    },

    async judgeWebp() {
      let isSupportWebp = false;
      if (app.globalData.isSupportWebp !== undefined) {
        isSupportWebp = app.globalData.isSupportWebp;
      } else {
        if (this.compareVersion("2.9.0") >= 0) {
          isSupportWebp = true;
        }
      }
      return isSupportWebp;
    },

    async isJdHost(src) {
      return /^https:\/\/(img\d{2}|m)\.360buyimg\.com/.test(src);
    },

    async isJPG(src) {
      return /\.(jpg|jpeg|png)$/i.test(src);
    },

    // 版本兼容判断
    async compareVersion(v2) {
      let currentVersion = wx.getSystemInfoSync().SDKVersion;
      let v1 = (currentVersion && currentVersion.split(".")) || [];
      v2 = v2.split(".") || [];
      const len = Math.max(v1.length, v2.length);

      while (v1.length < len) {
        v1.push("0");
      }
      while (v2.length < len) {
        v2.push("0");
      }

      for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i]);
        const num2 = parseInt(v2[i]);

        if (num1 > num2) {
          return 1;
        } else if (num1 < num2) {
          return -1;
        }
      }
      return 0;
    },
    async getTime() {
      img_load_end = Date.now();
      let pageList = getCurrentPages();
      let route =
        (pageList &&
          pageList.length &&
          pageList[pageList.length - 1] &&
          pageList[pageList.length - 1].route) ||
        "";
      if (
        app.globalData.isFirstPageFlag &&
        app.globalData.currentOnReadyTime &&
        route == app.globalData.currentOnReadyTime.route
      ) {
        // console.log('路径',route)
        // console.log('图片渲染开始--', img_load_start)
        // console.log('图片渲染结束--', img_load_end)
        // console.log('图片渲染时长', img_load_end - img_load_start)
        // console.log('整体渲染---时间----', img_load_end - app.globalData.currentOnReadyTime.startTime)
        // clickBuried_({
        //   click_id: 'img_load',
        //   click_par: {
        //     src: this.data.src,
        //     start: img_load_start,
        //     end: img_load_end,
        //     duration: img_load_end - img_load_start,
        //     route,
        //     onReadyStartTime: app.globalData.currentOnReadyTime.startTime
        //   }
        // })
      }
      // console.log(loadTime - startTime, '图片加载时间')
    },
  },
});

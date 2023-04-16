import {
  request,
  FNIDS
} from '../../common/util/api'
import { clickBuriedV2_ } from "../../common/util/BI";
let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selfNav: {
      //是否是自定义导航
      type: Boolean,
      value: false,
    },
    currentPageName: {
      type: String,
      value: "",
    },
    prePageName: {
      type: String,
      value: "",
    },
    pageId: {
      type: String,
      value: "",
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },
  pageLifetimes: {
    show: function () {
      let { addMpStatus, addMpRequested, capsule } = app.globalData;

      this.setData({
        status: addMpStatus,
      });
      if (this.data.selfNav) {
        this.setData({
          top: capsule.top + capsule.height,
        });
      }
      // console.log('====>>>>>>>>>>>>主页小程序', addMpRequested)
      if (!addMpRequested) {
        this.remindAddMp();
      } else {
        if (addMpStatus) {
          // clickBuriedV2_({
          //     create_time: new Date(),
          //     click_id: 'add_my_mp_show',
          //     page_par: {
          //         status: addMpStatus
          //     }
          // })
        }
      }
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    status: 0, //气泡当前状态
    top: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    remindAddMp() {
      let { appScene } = app.globalData;
      let { functionId = "", appVersion = "" } = FNIDS.isRemindAddMp;
      request({
        // 真实接口
        functionId,
        appVersion,
        body: {
          sceneId: appScene,
        },
        preObj: this.data.recommendObj
      }).then((res) => {
        // console.log('res',res)
        if (res && res.data && res.data.code == 0) {
          // console.log('====>>>>>>>>>>>>主页小程序')
          app.globalData.addMpRequested = true;
        }
        if (res && res.data) {
          if (res.data.result) {
            this.setData(
              {
                status: 1,
              },
              () => {
                app.globalData.addMpStatus = this.data.status;
              }
            );
            let { currentPageName, prePageName, pageId } = this.data || {};
            clickBuriedV2_({
              create_time: new Date(),
              click_id: "add_my_mp_show",
              page_par: {
                status: 1,
              },
              currentPageName,
              prePageName,
              pageId,
            });
          } else {
            this.setData(
              {
                status: 0,
              },
              () => {
                app.globalData.addMpStatus = this.data.status;
              }
            );
          }
        }
      });
    },
    handleClick() {
      this.setData(
        {
          status: 2,
        },
        () => {
          app.globalData.addMpStatus = this.data.status;
        }
      );
      let { functionId = "", appVersion = "" } = FNIDS.clickAddMp;
      request({
        functionId,
        appVersion,
        preObj: this.data.recommendObj
      }).then(() => {});
      let { currentPageName, prePageName, pageId } = this.data || {};
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "add_my_mp_click_first",
        currentPageName,
        prePageName,
        pageId,
      });
    },
    handleClickClose() {
      this.setData({
        status: 0,
      });
    },
    handleClose() {
      this.setData(
        {
          status: 0,
        },
        () => {
          app.globalData.addMpStatus = this.data.status;
        }
      );
      let { currentPageName, prePageName, pageId } = this.data || {};
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "add_my_mp_click_second",
        currentPageName,
        prePageName,
        pageId,
      });
    },
  },
});

import util from "./util.js"
import djBus from "./djBus.js"
import { clickBuriedV2_} from './BI';
import { routeMapName } from './routeMapName'
import djHalfMaskNameArr from './halfMaskName'
const oldNavigate = wx.navigateTo;
const oldRedirectTo = wx.redirectTo;
const oldSwitchTab = wx.switchTab;

// 防连点时间
const preVentTime = 300
// 全局存储的10个页面的pageId
let allPageIds = []  // [{ "2412d477a88dc454d4d32d902662b998" : 1664111773904}]
// 当前点击所在的页面在全局pageId
let curPageIdItem = {}
let curPageIdIndex = ""
Object.defineProperty(wx, "navigateTo", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function (obj) {
    const app = getApp();
    const url = (obj || {}).url || ''
    const pathNameAndQuery = url.split('?')
    const path = pathNameAndQuery[0]
    const query = pathNameAndQuery[1] || ''

    if (path === '/pages/h5/index') {
      if (!app.globalData.loginStateInfo.PDJ_H5_PIN) {
        if (/needPin=yes/.test(query)) {
          return wx.navigateTo({ url: '/pages/newLogin/login/login' })
        }
      }
    }

    // 防连点逻辑 -- 开始
    try {
      prevent(obj);
    } catch (error) {
      app.globalData.preventClickFlag = false
    }
    // 进到if代表防住了
    if (app.globalData.preventClickFlag) {
      app.globalData.preventClickFlag = false;
      console.log("走进return了");
      // try {
      //   clickBuriedV2_({
      //     click_id: "lmy_comein_nav_return0927",
      //     click_par: {
      //       obj: obj,
      //       allPageIds: app.globalData.allPageIds,
      //     },
      //   });
      // } catch (error) {}
      return;
    }
    // 防连点逻辑 -- 结束


    // 埋点相关逻辑
    try {
      const pageList = getCurrentPages();
      const route =
        (pageList && pageList.length && pageList[pageList.length - 1].route) ||
        "";

      if (obj && !obj.preObj) {
        let preObj = {};
        let pageName =
          routeMapName[route] && routeMapName[route].pageName
            ? routeMapName[route].pageName
            : route;
        preObj.currentPageName = pageName;

        let pageSource =
          routeMapName[route] && routeMapName[route].pageSource
            ? routeMapName[route].pageSource
            : route;
        preObj.pageSource = pageSource;

        obj.preObj = preObj;

        //剔除多端
        let isTaro =''
        if(route && route.includes('-t')){
          isTaro = 'isTaro'
        }
        // if(isTaro != 'isTaro' && pageName != route){
        //   clickBuriedV2_({
        //     create_time: new Date(),
        //     click_id: "test_empty_preobj_navigateTo_preObj_0927",
        //     click_par: {
        //       obj,
        //       route,
        //       pin:
        //         getApp().globalData &&
        //         getApp().globalData.loginStateInfo &&
        //         getApp().globalData.loginStateInfo.PDJ_H5_PIN,
        //     },
        //     currentPageName: pageName
        //   });
        // }
      } else if (obj && obj.preObj && !obj.preObj.currentPageName) {
        let pageName =
          routeMapName[route] && routeMapName[route].pageName
            ? routeMapName[route].pageName
            : route;
        let pageSource =
          routeMapName[route] && routeMapName[route].pageSource
            ? routeMapName[route].pageSource
            : route;
        obj.preObj.pageSource = pageSource;
        obj.preObj.currentPageName = pageName;
        // clickBuriedV2_({
        //   create_time: new Date(),
        //   click_id: "test_empty_preobj_navigateTo_currentPageName_0927",
        //   click_par: {
        //     obj,
        //     route,
        //     pin:
        //       getApp().globalData &&
        //       getApp().globalData.loginStateInfo &&
        //       getApp().globalData.loginStateInfo.PDJ_H5_PIN,
        //   },
        // });
      }

      if (obj.preObj) {
        let _uuid = "";
        _uuid = util.getPageIdrandom();
        let _url = obj.url || "";
        let _arr = _url.split("?");
        _arr.splice(1, 0, "?uu_uuid=" + _uuid + "&");
        obj.url = _arr.join("");
        djBus.emit(_uuid, obj.preObj);
        // emit后记录UUID，obj
        // clickBuriedV2_({
        //   create_time: new Date(),
        //   click_id: "test_diff_emit_0927",
        //   click_par: {
        //     obj,
        //     uid: _uuid,
        //     pin:
        //       getApp().globalData &&
        //       getApp().globalData.loginStateInfo &&
        //       getApp().globalData.loginStateInfo.PDJ_H5_PIN,
        //   },
        // });
        
        try {
          //增加传过来的名字和通过页面栈取得名字对比
          let currentPageName = obj.preObj.currentPageName || "";
          let pageName =
            routeMapName[route] && routeMapName[route].pageName
              ? routeMapName[route].pageName
              : route;
          //剔除多端
          let isTaro =''
          if(route && route.includes('-t')){
            isTaro = 'isTaro'
          }
          if (
            pageName != "search_results" &&
            pageName != "search" &&
            currentPageName != "search_results" &&
            currentPageName != "search" &&
            currentPageName != pageName  && !djHalfMaskNameArr[currentPageName] && (isTaro != 'isTaro')
          ) {
            // clickBuriedV2_({
            //   create_time: new Date(),
            //   click_id: "test_diff_currentpagename_navigateTo_stackpagene_0927",
            //   click_par: {
            //     pageName,
            //     currentPageName,
            //     obj,
            //     route,
            //     pin:
            //       getApp().globalData &&
            //       getApp().globalData.loginStateInfo &&
            //       getApp().globalData.loginStateInfo.PDJ_H5_PIN,
            //   },
            // });
          }
        } catch (e) {}
      }

      if (
        !obj.preObj ||
        !obj.preObj.currentPageName ||
        !obj.preObj.prePageName
      ) {
        // clickBuriedV2_({
        //   create_time: new Date(),
        //   click_id: "test_empty_preobj_navigateTo_0927",
        //   click_par: {
        //     obj,
        //     route,
        //     pin:
        //       getApp().globalData &&
        //       getApp().globalData.loginStateInfo &&
        //       getApp().globalData.loginStateInfo.PDJ_H5_PIN,
        //   },
        // });
      }
    } catch (error) {}


    console.log(1111111)
    // try {
    //   clickBuriedV2_({
    //     click_id: "lmy_comein_oldNavigate_before0927",
    //     click_par: {
    //       obj: obj,
    //       preventClickFlag: app.globalData.preventClickFlag,
    //     },
    //   });
    // } catch (error) {}
    oldNavigate.call(this, obj);
    console.log(222222);
    // try {
    //   clickBuriedV2_({
    //     click_id: "lmy_comein_oldNavigate_after0927",
    //     click_par: {
    //       obj: obj,
    //       preventClickFlag: app.globalData.preventClickFlag,
    //     },
    //   });
    // } catch (error) {}
  },
});

Object.defineProperty(wx, "redirectTo", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function (obj) {
    const app = getApp();
    // 防连点逻辑
    try {
      prevent2();
    } catch (error) {
      app.globalData.preventClickFlag = false;
    }
    // 进到if代表防住了
    if (app.globalData.preventClickFlag) {
      app.globalData.preventClickFlag = false
      console.log("走进return了");
      // try {
      //   clickBuriedV2_({
      //     click_id: "lmy_comein_recdir_return_0927",
      //     click_par: {
      //       obj: obj,
      //       allPageIds: app.globalData.allPageIds,
      //     },
      //   });
      // } catch (error) {}
      return;
    }


    // 埋点相关逻辑
    try {
      const pageList = getCurrentPages();
      const route =
        (pageList && pageList.length && pageList[pageList.length - 1].route) ||
        "";
      if (obj && !obj.preObj) {
        let preObj = {};
        let pageName =
          routeMapName[route] && routeMapName[route].pageName
            ? routeMapName[route].pageName
            : route;
        let pageSource =
          routeMapName[route] && routeMapName[route].pageSource
            ? routeMapName[route].pageSource
            : route;
        preObj.currentPageName = pageName;
        preObj.pageSource = pageSource;
        obj.preObj = preObj;
        //剔除多端
        let isTaro = "";
        if (route && route.includes("-t")) {
          isTaro = "isTaro";
        }
        if (isTaro != "isTaro" && pageName != route) {
          // clickBuriedV2_({
          //   create_time: new Date(),
          //   click_id: "test_empty_preobj_redirectTo_preObj_0927",
          //   click_par: {
          //     obj,
          //     route,
          //     pageSource: pageSource ? pageSource : "obj && !obj.preObj",
          //     pin:
          //       getApp().globalData &&
          //       getApp().globalData.loginStateInfo &&
          //       getApp().globalData.loginStateInfo.PDJ_H5_PIN,
          //   },
          //   currentPageName: pageName,
          // });
        }
      } else if (obj && obj.preObj && !obj.preObj.currentPageName) {
        let pageName =
          routeMapName[route] && routeMapName[route].pageName
            ? routeMapName[route].pageName
            : route;
        let pageSource =
          routeMapName[route] && routeMapName[route].pageSource
            ? routeMapName[route].pageSource
            : route;
        obj.preObj.currentPageName = pageName;
        obj.preObj.pageSource = pageSource;
        // clickBuriedV2_({
        //   create_time: new Date(),
        //   click_id: "test_empty_preobj_redirectTo_currentPageName_0927",
        //   click_par: {
        //     obj,
        //     route,
        //     pageSource: pageSource
        //       ? pageSource
        //       : "obj && !obj.preObj && !obj.preObj.currentPageName",
        //     pin:
        //       getApp().globalData &&
        //       getApp().globalData.loginStateInfo &&
        //       getApp().globalData.loginStateInfo.PDJ_H5_PIN,
        //   },
        // });
      }
      // 解析url上的traceId，赋值preObj上
      try {
        let mockTraceId;
        let url = decodeURIComponent(obj.url);
        let arr = url.split("&");
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].includes("traceId")) {
            mockTraceId = arr[i].split("=")[1];
          }
        }
        obj.preObj.mockTraceId = mockTraceId;
      } catch (err) {
        // clickBuriedV2_({
        //   create_time: new Date(),
        //   click_id: "test_diff_onload_preobj_traceid",
        //   click_par: {
        //     obj,
        //     route,
        //     pin:
        //       getApp().globalData &&
        //       getApp().globalData.loginStateInfo &&
        //       getApp().globalData.loginStateInfo.PDJ_H5_PIN,
        //   },
        // });
      }

      if (obj.preObj) {
        let _uuid = "";
        _uuid = util.getPageIdrandom();
        let _url = obj.url || "";
        let _arr = _url.split("?");
        _arr.splice(1, 0, "?uu_uuid=" + _uuid + "&");
        obj.url = _arr.join("");
        djBus.emit(_uuid, obj.preObj);
        // emit后记录UUID，obj
        // clickBuriedV2_({
        //   create_time: new Date(),
        //   click_id: "test_diff_emit_0927",
        //   click_par: {
        //     obj,
        //     uid: _uuid,
        //     pin:
        //       getApp().globalData &&
        //       getApp().globalData.loginStateInfo &&
        //       getApp().globalData.loginStateInfo.PDJ_H5_PIN,
        //   },
        // });
        try {
          //增加传过来的名字和通过页面栈取得名字对比
          let currentPageName = obj.preObj.currentPageName || "";
          let pageName =
            routeMapName[route] && routeMapName[route].pageName
              ? routeMapName[route].pageName
              : route;
          let isTaro = "";
          if (route && route.includes("-t")) {
            isTaro = "isTaro";
          }
          if (
            pageName != "search_results" &&
            pageName != "search" &&
            currentPageName != "search_results" &&
            currentPageName != "search" &&
            currentPageName != pageName &&
            !djHalfMaskNameArr[currentPageName] &&
            isTaro != "isTaro"
          ) {
            // clickBuriedV2_({
            //   create_time: new Date(),
            //   click_id: "test_diff_currentpagename_redirectTo_stackpagene_0927",
            //   click_par: {
            //     obj,
            //     route,
            //     pageName,
            //     currentPageName,
            //     pin:
            //       getApp().globalData &&
            //       getApp().globalData.loginStateInfo &&
            //       getApp().globalData.loginStateInfo.PDJ_H5_PIN,
            //   },
            // });
          }
        } catch (e) {}
      }

      if (
        !obj.preObj ||
        !obj.preObj.currentPageName ||
        !obj.preObj.prePageName
      ) {
        // clickBuriedV2_({
        //   create_time: new Date(),
        //   click_id: "test_empty_preobj_redirectTo_0927",
        //   click_par: {
        //     obj,
        //     route,
        //     pin:
        //       getApp().globalData &&
        //       getApp().globalData.loginStateInfo &&
        //       getApp().globalData.loginStateInfo.PDJ_H5_PIN,
        //   },
        // });
      }
    } catch (error) {}


    console.log(1111111);
    // try {
    //   clickBuriedV2_({
    //     click_id: "lmy_comein_oldRedirectTo_before_0927",
    //     click_par: {
    //       obj: obj,
    //       preventClickFlag: app.globalData.preventClickFlag,
    //     },
    //   });
    // } catch (error) {}
    oldRedirectTo.call(this, obj);
    console.log(222222);
    // try {
    //   clickBuriedV2_({
    //     click_id: "lmy_comein_oldRedirectTo_after_0927",
    //     click_par: {
    //       obj: obj,
    //       preventClickFlag: app.globalData.preventClickFlag,
    //     },
    //   });
    // } catch (error) {}
  },
});

Object.defineProperty(wx, "switchTab", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function (obj) {
    if (obj.preObj) {
      getApp().globalData.globalCurrentPageNameObj = {}
      getApp().globalData.globalCurrentPageNameObj = obj.preObj
    }
    oldSwitchTab.call(this, obj);
    // todo 存缓存，在取
  },
});


function prevent(obj) {
  try {
    const app = getApp();
    // 如果拦截不到页面唯一标识pageId，则不使用防连点
    if (!obj || !obj.preObj || !obj.preObj.pageIdFirstPage) {
      app.globalData.preventClickFlag = false;
      console.log("页面进入没有pageId");
    } else {
      const pageId = obj.preObj.pageIdFirstPage;
      allPageIds = app.globalData.allPageIds || []; // 如果全局有已经防连点的页面pageid记录
      console.log("页面有pageId-------------allPageIds", allPageIds);
      if (allPageIds && allPageIds.length) {
        console.log("有缓存记录");
        // 查找当前页面是否在缓存记录中
        curPageIdItem = allPageIds.find((item, index) => {
          if (item[pageId]) {
            curPageIdIndex = index;
          }
          return item[pageId];
        });
        const lastClickTime = (curPageIdItem && curPageIdItem[pageId]) || null;
        // 不在缓存中，则不用防，直接可以往下走，将该pageid对应的点击时间存起来
        if (!lastClickTime) {
          console.log("缓存中没有该pageid");
          app.globalData.preventClickFlag = false;
          if (allPageIds && allPageIds.length >= 10) {
            allPageIds.shift();
          }
          allPageIds.push({ [`${pageId}`]: Date.now() });
          app.globalData.allPageIds = allPageIds;
        }
        // 如果当前页面在缓存中存下，则需要继续判断上次点击的时间和本次点击时间的时间差
        else {
          console.log("缓存中存在该pageid");
          let nowClickTime = Date.now();
          console.log("lastClickTime---------", lastClickTime);
          console.log("nowClickTime-------", nowClickTime);
          console.log("time--------", nowClickTime - lastClickTime);

          if (allPageIds && allPageIds.length > 10) {
            allPageIds.shift();
          }
          if (curPageIdIndex !== "") {
            allPageIds[curPageIdIndex] = {
              [`${pageId}`]: nowClickTime,
            };
            app.globalData.allPageIds = allPageIds;
            console.log("=============allPageIds", allPageIds);
          }

          // 如果两次时间相减大于300毫秒，则重置为可以点击，不用防连点
          if ((nowClickTime - lastClickTime) > preVentTime) {
            console.log("走到了300毫秒里面");
            app.globalData.preventClickFlag = false;
            // try {
            //   clickBuriedV2_({
            //     click_id: "lmy_comein_nav>300_0927",
            //     click_par: {
            //       obj: obj,
            //       allPageIds: app.globalData.allPageIds,
            //     },
            //   });
            // } catch (error) {}
          } else {
            // 将标识置为不能点击状态
            app.globalData.preventClickFlag = true;
            // try {
            //   clickBuriedV2_({
            //     click_id: "lmy_comein_nav<300_0927",
            //     click_par: {
            //       obj: obj,
            //       allPageIds: app.globalData.allPageIds,
            //     },
            //   });
            // } catch (error) {}
          }
          if ((nowClickTime - lastClickTime) < 10000) {
            // try {
            //   clickBuriedV2_({
            //     click_id: "lmy_comein_nav<10s_0927",
            //     click_par: {
            //       obj: obj,
            //       allPageIds: app.globalData.allPageIds,
            //     },
            //   });
            // } catch (error) {}
          }
        }
      }
      // 如果没找到，直接往下走，正常跳转，不需要防，同时将该pageid对应的点击事件记录到缓存中
      else {
        app.globalData.preventClickFlag = false;
        if (allPageIds && allPageIds.length >= 10) {
          allPageIds.shift();
        }
        allPageIds.push({ [`${pageId}`]: Date.now() });
        app.globalData.allPageIds = allPageIds;
        console.log("没有缓存-----------end", app.globalData.allPageIds);
      }
    }
    // 进到if代表防住了
    // if (app.globalData.preventClickFlag) {
    //   app.globalData.preventClickFlag = false;
    //   console.log("走进return了");
    //   try {
    //     clickBuriedV2_({
    //       click_id: "lmy_comein_nav_return0927",
    //       click_par: {
    //         obj: obj,
    //         allPageIds: app.globalData.allPageIds,
    //       },
    //     });
    //   } catch (error) {}
    //   return;
    // }
  } catch (error) {
    const app = getApp();
    app.globalData.preventClickFlag = false
  }
}

function prevent2(obj) {
  try {
    const app = getApp();
    // 如果拦截不到页面唯一标识pageId，则不使用防连点
    if (!obj || !obj.preObj || !obj.preObj.pageIdFirstPage) {
      app.globalData.preventClickFlag = false;
      console.log("页面进入没有pageId");
    } else {
      console.log("页面有pageId");
      const pageId = obj.preObj.pageIdFirstPage;
      allPageIds = app.globalData.allPageIds || []; // 如果全局有已经防连点的页面pageid记录
      if (allPageIds && allPageIds.length) {
        console.log("有缓存记录");
        // 查找当前页面是否在缓存记录中
        curPageIdItem = allPageIds.find((item, index) => {
          if (item[pageId]) {
            curPageIdIndex = index;
          }
          return item[pageId];
        });
        const lastClickTime = (curPageIdItem && curPageIdItem[pageId]) || null;
        // 没找到则不用防，直接可以往下走，不用防，将该pageid对应的点击时间存起来
        if (!lastClickTime) {
          console.log("缓存中没有该pageid");
          app.globalData.preventClickFlag = false;
          if (allPageIds && allPageIds.length >= 10) {
            allPageIds.shift();
          }
          allPageIds.push({ [`${pageId}`]: Date.now() });
          app.globalData.allPageIds = allPageIds;
        }
        // 如果当前页面在缓存中存下，则需要继续判断上次点击的时间和本次点击时间的时间差
        else {
          console.log("缓存中存在该pageid");
          let nowClickTime = Date.now();
          console.log("lastClickTime---------", lastClickTime);
          console.log("nowClickTime-------", nowClickTime);
          console.log("time--------", nowClickTime - lastClickTime);

          if (allPageIds && allPageIds.length > 10) {
            allPageIds.shift();
          }
          if (curPageIdIndex !== "") {
            allPageIds[curPageIdIndex] = {
              [`${pageId}`]: nowClickTime,
            };
            app.globalData.allPageIds = allPageIds;
            console.log("=============allPageIds", allPageIds);
          }
          // 如果两次时间相减大于300毫秒，则重置为可以点击，不用防连点
          if ((nowClickTime - lastClickTime) > preVentTime) {
            console.log("走到了300毫秒里面");
            app.globalData.preventClickFlag = false;
            // try {
            //   clickBuriedV2_({
            //     click_id: "lmy_comein_redir>300_0927",
            //     click_par: {
            //       obj: obj,
            //       allPageIds: app.globalData.allPageIds,
            //     },
            //   });
            // } catch (error) {}
          } else {
            // 将标识置为不能点击状态
            app.globalData.preventClickFlag = true;
            // try {
            //   clickBuriedV2_({
            //     click_id: "lmy_comein_redir<300_0927",
            //     click_par: {
            //       obj: obj,
            //       allPageIds: app.globalData.allPageIds,
            //     },
            //   });
            // } catch (error) {}
          }
          // if ((nowClickTime - lastClickTime) < 10000) {
          //   try {
          //     clickBuriedV2_({
          //       click_id: "lmy_comein_redir<10s_0927",
          //       click_par: {
          //         obj: obj,
          //         allPageIds: app.globalData.allPageIds,
          //       },
          //     });
          //   } catch (error) {}
          // }
        }
      }
      // 如果没找到，直接往下走，正常跳转，不需要防，同时将该pageid对应的点击事件记录到缓存中
      else {
        console.log("没有缓存");
        app.globalData.preventClickFlag = false;
        if (allPageIds && allPageIds.length >= 10) {
          allPageIds.shift();
        }
        allPageIds.push({ [`${pageId}`]: Date.now() });
        app.globalData.allPageIds = allPageIds;
      }
      console.log(
        "app.globalData.allPageIds-----------end",
        app.globalData.allPageIds
      );
    }
    // 进到if代表防住了
    // if (app.globalData.preventClickFlag) {
    //   app.globalData.preventClickFlag = false
    //   console.log("走进return了");
    //   try {
    //     clickBuriedV2_({
    //       click_id: "lmy_comein_recdir_return_0927",
    //       click_par: {
    //         obj: obj,
    //         allPageIds: app.globalData.allPageIds,
    //       },
    //     });
    //   } catch (error) {}
    //   return;
    // }
  } catch (error) {
    const app = getApp();
    app.globalData.preventClickFlag = false;
  }
}

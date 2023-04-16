import {
    request,
    FNIDS
} from "../../../common/util/api"
import { addFilterMsg, error } from '../../../common/util/wxLog'; 
import util from '../../../common/util/util'
import {
    clickBuriedV2_,
    pvBuriedV2_
} from "../../../common/util/BI"
var app = getApp()
var self = null;
var str = { "code": "0", "msg": "成功", "result": [{ "areaCode": 468, "areaName": "安阳市", "areaLevel": 2 }, { "areaCode": 468, "areaName": "安阳市", "areaLevel": 2 }, { "areaCode": 468, "areaName": "安阳市", "areaLevel": 2 }, { "areaCode": 468, "areaName": "安阳市", "areaLevel": 2 }, { "areaCode": 468, "areaName": "安阳市", "areaLevel": 2 }], "success": true };

Page({
    /**
     * 页面的初始数据
     */
    data: {
        freCities: [],
        cityList: [],
        loading: true,
        letterIndexList: [],
        cityIndexList: [],
        selectedIndex: 0,
        findTopest: true,
        showClearDialog: false,
        showEmpty: true,
        type: 0,
        tips: '',
        btnText: '',
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        self = this;
        let pin = wx.getStorageSync('login_info').PDJ_H5_PIN || "";
        if (pin && pin != "") {
            this.getHotCityList();
        } else {
            this.getCityList();
        }
        
        
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

        // this.clearHotCity();
        // getStationList(self, handleStationList, 1, self.data.channelId, true, self.data.storeList);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },
    pvFunc(back) {
        pvBuriedV2_({
            page_par: {
                ref_par: {
                    traceId: this.data.recommendObj.preTraceId || "",
                    userAction: this.data.recommendObj.preUserAction || "",
                }
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
            currentPageName: this.data.recommendObj.currentPageName,
            prePageName: this.data.recommendObj.prePageName,
            isBack: back || "",
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    onPageScroll(e) {
        //    console.log(e.scrollTop);
        // let findTopest = false;
        if (this.data.findTopest) {
            try {
                this.data.letterIndexList.forEach((value, index) => {
                    // debugger;
                    let t = e.scrollTop;
                    if (t <= value) {
                        this.setData({
                            selectedIndex: index
                        });
                        throw ('循环终止')
                        // findTopest = true;
                    }
                });
            } catch (e) { }
        }
    },

    cancelExchange() {
        this.reportExchange(0)
    },
    ensureExchange() {
        this.setData({
            showClearDialog: false
        })
        this.reportExchange(1)
        let {recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
        request({
            method: "GET",
            ...FNIDS.clearHotCities,
            body: {
            },
            pageId: pageIdFirstPage,
            preObj: recommendObj
        }).then(res => {
            let data = res.data;
            if (data.code === '0') {
                this.setData({
                    freCities: []
                })
            }
        }).catch(err => {

        })
    },

    getCityList: function () {
        let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
        request({
            method: "GET",
            ...FNIDS.getCitiesSort,
            body: {
            },
            pageId: pageIdFirstPage,
            preObj: recommendObj
        }).then(res => {
            let data = res.data;
            if (data.code === '0' && data.result) {
                this.setData({
                    showEmpty: false,
                    cityList: data.result
                })
                setTimeout(() => {
                    let query = wx.createSelectorQuery();
                    let queryIndex = wx.createSelectorQuery();
                    this.data.cityList.forEach((item, index) => {
                        let selectStr = ".city" + item.firstLetter;
                        let selectIndexStr = ".city-index-" + item.firstLetter;
                        query.select(selectStr).boundingClientRect();
                        queryIndex.select(selectIndexStr).boundingClientRect();
                    });
                    query.exec((res) => {
                        res.forEach((item, index) => {
                          if (item) {
                            this.data.letterIndexList.push(item.top);
                          }
                            
                        });
                    })
                    queryIndex.exec((res) => {
                        res.forEach((item, index) => {
                          if (item) {
                            this.data.cityIndexList.push(item.top);
                          } 
                        });
                    })
                }, 200)
            } else {
                this.setData({
                    showEmpty: true,
                    type: 4,
                    tips: res.data && res.data.msg || "暂无数据~~",
                    btnText: "",
                })
                wx.reportMonitor(47, 20);
            }



        }).catch(err => {
            this.setData({
                isShow: false,
                showEmpty: true,
                type: 4,
                tips: "暂无数据~~",
                btnText: "",
            })
            wx.reportMonitor(47, 20);
            let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
            let errInfo = err && err.toString();
            let deviceid_pdj_jd = util.getUUIDMD5();
            addFilterMsg(deviceid_pdj_jd)
            addFilterMsg('getCitiesSortFn');
            addFilterMsg(PDJ_H5_PIN);
            error(errInfo);
        })
    },
    getHotCityList: function () {
        // let pin = wx.getStorageSync('login_info').PDJ_H5_PIN || "";
        let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
        request({
            method: "GET",
           ...FNIDS.getHotCities,
            body: {
            },
            pageId: pageIdFirstPage,
            preObj: recommendObj
        }).then(res => {
            let data = res.data;
            if (data.code === '0' && data.result) {
                this.setData({
                    freCities: data.result
                })
                // this.setData({
                //     freCities: str.result
                // })
            }
            this.getCityList();
        }).catch(err => {
            this.getCityList();
        })
    },
    clearHotCity: function () {
        // this.setData({
        //     showClearDialog: true
        // })
        this.dialog({
			content: "确定清空常用城市吗？"
		}).then(res => {
			if(res.confirm) {
                console.log("确定");
                this.ensureExchange();
				
            }else{
                console.log("取消");
                this.cancelExchange();
            }

    })
        this.reportClearUsed()
    },
    /**
     * dialog
     * @param title 抬头文案
     * @param msg 提示文案
     * @param isShowCancel 是否展示取消按钮
     * @param confirmText 确定按钮文案
     * @param cancelText 取消按钮文案
     */
	dialog(obj) {
		return new Promise((resolve, reject) => {
			wx.showModal({
				title: obj.title || "温馨提示",
				content: obj.content || "",
				showCancel: obj.showCancel === undefined || false,
				confirmText: obj.confirmText || "确定",
				cancelText: obj.cancelText || "取消",
				success(res) {
					resolve(res)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	},
    catchCityMove(e) {
        // let sx = e.touches[0].pageX;
        // let sy = e.touches[0].pageY;
        let ssy = e.touches[0].clientY;
        // let sss = e.changedTouches[0].clientY;
        // let ssx = e.changedTouches[0].pageY;
        // debugger;
        // console.log(sy+" === "+ssy+" === "+ssx+" === "+sss);
        try {
            this.data.cityIndexList.forEach((value, index) => {
                // debugger;
                if (ssy <= value) {
                    this.setData({
                        selectedIndex: index
                    });
                    throw ('循环终止')
                }
            });
        } catch (e) { }
    },
    catchCityStart(e){
        self.setData({
            findTopest: false
        })
    },
    catchCityEnd(e) {
        let selectStr = ".city" + this.data.cityList[this.data.selectedIndex].firstLetter;
        let query = wx.createSelectorQuery();
        query.selectViewport().scrollOffset();
        query.select(selectStr).boundingClientRect();
        query.exec((res) => {
            // debugger;
            // var _heightd = rect[0].top;
            var miss = res[0].scrollTop + (res[1] ? res[1].top : 0);
            wx.pageScrollTo({
                scrollTop: miss,   //页面滚动的距离
                duration: 100, 
                success: function (e) {    //成功函数
                }
            });
        })
        setTimeout(() => {
            self.setData({
                findTopest: true
            })
        }, 300)
    },
    scrollToCity(e) {
        var self = this;
        let data = e.currentTarget.dataset;
        let index = data.indexLet;
        self.setData({
            findTopest: false
        })
        let selectStr = ".city" + data.firstLetter;

        let query = wx.createSelectorQuery();
        query.selectViewport().scrollOffset();
        query.select(selectStr).boundingClientRect();
        query.exec((res) => {
            // debugger;
            // var _heightd = rect[0].top;
            var miss = res[0].scrollTop + (res[1] ? res[1].top : 0);
            wx.pageScrollTo({
                scrollTop: miss,   //页面滚动的距离
                duration: 100,    //页面滚动速度 单位ms
                success: function (e) {    //成功函数
                    self.setData({
                        selectedIndex: index
                    })
                    setTimeout(() => {
                        self.setData({
                            findTopest: true
                        })
                    }, 500)

                }
            });
        })
        this.reportNavigation()
    },
    /* ------------------ 自动化埋点新增逻辑    --------------------  */
    reportExchange(is_sure) {
      // 埋点
      clickBuriedV2_({
        click_id: "clickElasticFrame",
        click_par: {
          is_sure: is_sure
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        currentPageName: this.data.recommendObj.currentPageName,
        prePageName: this.data.recommendObj.prePageName,
      })
    },
    reportClearUsed(){
        // 埋点
        clickBuriedV2_({
          click_id: "clickClearUsedCity",
          click_par: {
              
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
    },
    reportNavigation(){
        // 埋点
        clickBuriedV2_({
          click_id: "clickNavigation",
          click_par: {
              
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
    },
    onClickCity(){
        // 埋点
        clickBuriedV2_({
          click_id: "clickCity",
          click_par: {
              
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
    },
    onClickUsedCity(){
        // 埋点
        clickBuriedV2_({
          click_id: "clickUsedCity",
          click_par: {
              
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName,
        })
    }
})
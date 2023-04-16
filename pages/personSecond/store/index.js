
import { request, FNIDS } from '../../../common/util/api'
import mp from '../../../common/util/wxapi';
import { pvBuriedV2_ } from "../../../common/util/BI";
import {
    Exposure
} from '../../../common/util/exposure'
import {
    isLogin
} from "../../../common/util/loginUtil"
Page({
    buried: {
        channelId: ''
    },
    /**
     * 页面的初始数据
     */
    data: {
        // 门店列表
        list: [],
        // 页面配置信息
        config: {},
        // 筛选列表
        sortList: [],
        // 标签筛选列表
        tabList: [],
        // 筛选弹层列表
        allList: [],
        // tab筛选弹层
        hideTagPop: true,
        // 全部筛选弹层
        hideAllTagPop: true,
        // 排序分类高亮
        sortActive: 0,
        // 标签
        filterTagIds: [],
        // 门店数量
        storeNum: 0,
        // 展示底线
        showBottom: false,
        // 默认页-默认页展示
        showDefault: false,
        // 默认页-类型length
        type: 0,
        // 默认页-提示
        tips: "",
        // 默认页-按钮
        btnText: "",
        // 未登录默认选项
        showEmpty: false,
        types: 6,
        btnTextLogin: "",
        tipsLogin: "",
        srcLogout: '',
        defaultType: 0,
        defaultObj: {},
        traceId: "",
        optionsPos: null,
        self_page:'my_favorite'

        
    },

    // 自定义数据
    scopeData: {
        // 地址信息
        addressInfo: {},
        // 曝光埋点对象
        exposureObj: null,
        // 请求入参
        requestParams: {
            // 排序
            rankType: 0,
            // 当前分页
            currentPage: 1,
            // 活动id
            activityId: '',
            // 排序类型
            sortType: 0,
            // 行业标签
            venderIndustryType: '',
            channelBusiness: '',
            channelId: ''
        },
        // 最后一页
        lastPage: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log('---options---', options)
        this.scopeData.requestParams.activityId = options.activityId || '';
        this.scopeData.requestParams.sortType = options.sortType || '';
        this.scopeData.requestParams.venderIndustryType = options.venderIndustryType || '';
        this.scopeData.requestParams.channelBusiness = options.channelBusiness || '';
        this.scopeData.requestParams.channelId = options.channelId || '';
        this.buried.channelId = options.channelId || '';
        // wx.setNavigationBarTitle({
        //     title: options.title || '京东到家'
        // })
        try {
            let addressInfo = wx.getStorageSync('address_info');
            if (!addressInfo.longitude || !addressInfo.latitude) {
                addressInfo = getApp().globalData.addressInfo
            }
            this.scopeData.addressInfo = addressInfo;
        } catch (err) {

        }
        this.setData({
          optionsPos: options
        });
        // this.getCurrentPageData('onload')
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    /**
     * @description: 实例化曝光埋点
     * @param {Void} 
     * @return {Void} 
     */
    _newExposureBuried() {
        // 实例化曝光对象
        // this.scopeData.exposureObj = new Exposure(this, '.container >>> .exposure');

    },
    /**
     * @description: 卸载曝光埋点和图片懒加载
     * @param {Void} 
     * @return {Void} 
     */
    _disconnectExposureBuried() {
        // 卸载监听曝光埋点
        this.scopeData.exposureObj && this.scopeData.exposureObj.disconnectObserver && this.scopeData.exposureObj.disconnectObserver();
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getCurrentPageData('onload')
        // 实例化曝光埋点
        this._newExposureBuried();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        // 卸载曝光埋点
        this._disconnectExposureBuried();
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        // 卸载曝光埋点
        this._disconnectExposureBuried();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let { requestParams, lastPage } = this.scopeData || {};
        let currentPage = requestParams.currentPage + 1;

        if (currentPage <= lastPage) {
            this.scopeData.requestParams.currentPage = currentPage;
            this.getCurrentPageData('more')
        } else {
            this.setData({
                showBottom: true
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    pvFunc(back) {
      let {recommendObj = {}} = this.data;
      pvBuriedV2_({
          page_par: {
              ref_par: {
                  traceId: recommendObj.preTraceId || "",
                  userAction: recommendObj.preUserAction || "",
              },
              channelId: this.buried.channelId
          },
          pageId: recommendObj.pageIdFirstPage || "",
          currentPageName: recommendObj.currentPageName,
          prePageName: recommendObj.prePageName,
          isBack: back || "",
      })
    },
    // 获取页面数据
    getCurrentPageData(type) {
        if (isLogin()) {
            mp.loading_cover();
            let { filterTagIds = [], recommendObj ={} } = this.data || {};
            let {
                rankType = 0,
                currentPage = 1, // 活动id
                activityId = '',
                // 排序类型
                sortType = 0,
                venderIndustryType = '',
                channelId = '',
                channelBusiness = ''
            } = this.scopeData.requestParams || {};
            let { latitude = '', longitude = '', cityName = '', cityId = '', poi = '' } = this.scopeData.addressInfo || {};

            request({
                ...FNIDS.getFollowStoreList,
                // functionId: FNIDS.nearbyStore.functionId,
                // appVersion: FNIDS.nearbyStore.appVersion,
                body: {
                    "refPageSource": "activityDetail",
                    "city": cityName,
                    "areaCode": cityId,
                    "longitude": longitude,
                    "latitude": latitude,
                    "coordType": "2",
                    "address": poi,
                    channelId,
                    channelBusiness,
                    "currentPage": currentPage || 1,
                    "pageSize": 10,
                    "rankType": rankType,
                    "lastStoreId": "",
                    "filterTagIds": filterTagIds.join(),
                    "slideStoreList": false,
                    "venderIndustryType": venderIndustryType && venderIndustryType.split(',') || [],
                    "sortType": sortType,
                    "level": [],
                    "activityId": activityId,
                    "pageSource": "channelStorePage",
                    "ref": "",
                    "ctp": "moreStoreList"
                },
                isNeedDealError: true,
                isForbiddenDialog: true,
                preObj: recommendObj
            }).then(res => {
              // TODO : 删除测试数据开始
        //       res.data = {
        //         "code": "0",
        //         "title": "成功",
        //         "msg": "成功(0)",
        //         "result": {
        //                 "data": [{
        //                         "to": "store",
        //                         "params": {
        //                                 "orgCode": 324234,
        //                                 "storeId": "11820180",
        //                                 "imgOrder": 1
        //                         },
        //                         "imgUrl": "https://img30.360buyimg.com/vendersettle/s120x120_jfs/t1/6727/17/1947/11791/5bcecd11E786febb3/b3be7119e3496b49.png.webp",
        //                         "title": "山姆会员商店(亦庄一店)",
        //                         "name": "山姆会员商店(亦庄一店)",
        //                         "venderId": "324234",
        //                         "storeId": "11820180",
        //                         "storeName": "山姆会员商店(亦庄一店)",
        //                         "tags": [],
        //                         "serviceTimes": [{
        //                                 "startTime": "08:30",
        //                                 "endTime": "21:00"
        //                         }],
        //                         "deliveryFirst": "58分钟",
        //                         "deliverySecond": "预计送达",
        //                         "monthSale": "月售千+",
        //                         "scoreAvg": "4.8",
        //                         "storeStar": 4.75,
        //                         "inCartNum": "1",
        //                         "carrierNo": 9966,
        //                         "secondCarrierNo": "",
        //                         "carrierTag": {
        //                                 "carrierNo": 9966,
        //                                 "iconText": "达达快送",
        //                                 "iconTextColorCode": "#0077EE",
        //                                 "strokeColorCode": "#7FBBF6"
        //                         },
        //                         "closeStatus": 0,
        //                         "compensateTag": {
        //                                 "compensateStatus": 1,
        //                                 "compensateColor": "#5faafe",
        //                                 "compensateText": "超时赔"
        //                         },
        //                         "isTimeFight": 0,
        //                         "isfollow": 1,
        //                         "freightWords": "起送¥0 | 运费¥1.5",
        //                         "distance": "2.7km",
        //                         "coupons": [],
        //                         "expansionCoupon": {
        //                             "iconUrl": "https://img30.360buyimg.com/mobilecms/jfs/t1/40902/8/16930/2109/62bebecbE5e13bc22/2884c5d64224b229.png",
        //                             "startColorCode": "#FF6963",
        //                             "endColorCode": "#FF4141",
        //                             "iconText": "新人券膨胀至",
        //                             "price": "30",
        //                             "to": "web",
        //                             "params": {
        //                                 "url": "http://www.baidu.com"
        //                             }
        //                         },
        //                         "regularFlag": 3,
        //                         "orgName": "山姆会员商店(亦庄一店)",
        //                         "backgroundImage": "",
        //                         "backgroundImageWidth": 312,
        //                         "backgroundImageHeight": 207,
        //                         "brandLogoSpecialType": 0,
        //                         "predictedTime": 58,
        //                         "orderAging": 60,
        //                         "orgCode": "324234",
        //                         "industry": "1"
        //                 }],
        //                 "config": {
        //                         "userAction": "[{\"storeId\":\"11820180\",\"currentPage\":1,\"rankNo\":1}]",
        //                         "pageSize": 10,
        //                         "totalCount": 1
        //                 },
        //                 "isShow": 0,
        //                 "flag": false
        //         },
        //         "traceId": "560B4339-2975-4780-95E7-87291CFE791F1661940337301.710205",
        //         "umpTraceId": "676659.48188.16619367692785353",
        //         "errorCode": "[1142]",
        //         "success": true
        // }

         // TODO : 删除测试数据 结束
                mp.hideLoading();
                let {code = '', result = {}, traceId=""} = res.data;
                if (code === '0' && result.data && result.data.length) {
                    this.setData({
                        showEmpty: false,
                        traceId
                    })
                    let result = res.data.result || '';
                    let { config = {}, data } = result || {};
                    // 计算最后一页
                    let { totalCount, pageSize } = config || {};
                    this.scopeData.lastPage = Math.ceil(totalCount / pageSize);

                    if (result) {
                        if (type === 'more') { // 分页
                            this.setData({
                                list: this.data.list.concat(data),
                                showDefault: false,
                                showBottom: false
                            })
                        } else {
                            if (type === 'onload') { // 第一次加载保留筛选标签
                                let { sortList = [], storeFilterTags = [] } = config.storeTags || {};
                                // tab标签
                                let tabList = [];
                                // 筛选
                                let allList = [];
                                if (storeFilterTags && storeFilterTags.length) {
                                    // tab标签数据集合
                                    tabList = storeFilterTags.filter(item => item.outSortNum < 4).sort((item1, item2) => item1.outSortNum - item2.outSortNum);
                                    tabList.forEach(item => {
                                        if (item.parentId == 0) {
                                            item.children = [];
                                            storeFilterTags.forEach(listItem => {
                                                if (listItem.parentId === item.tagId) {
                                                    item.children.push(listItem)
                                                }
                                            })
                                        }
                                    })
                                    // 筛选数据集合
                                    allList = storeFilterTags.filter(item => item.parentId == 0);
                                    allList.forEach(item => {
                                        item.children = [];
                                        storeFilterTags.forEach(listItem => {
                                            if (listItem.parentId === item.tagId) {
                                                item.children.push(listItem)
                                            }
                                        })
                                    })
                                }
                                let list = data

                                this.setData({
                                    allList: JSON.parse(JSON.stringify(allList)),
                                    tabList: JSON.parse(JSON.stringify(tabList)),
                                    sortList,
                                    list,
                                    config,
                                    showDefault: false,
                                    showBottom: false
                                })
                            } else {
                                let list = data;
                                this.setData({
                                    list,
                                    showDefault: false,
                                    showBottom: false
                                })
                            }
                        }
                        // 初始化曝光
                        this.scopeData.exposureObj && this.scopeData.exposureObj.initObserver && this.scopeData.exposureObj.initObserver();
                    } else {
                        (currentPage === 1) && this.dealRequestError(4, '没有满足条件的店铺', '清空筛选条件')
                    }
                } else {
                  let {list = []} = this.data;
                  if(!list.length) {
                    this.setData({
                      showEmpty: true,
                      showDefault: true,
                      defaultType: 1,
                      defaultObj:{...res.data},
                      traceId
                    });
                  } else {
                    this.setData({
                      showBottom: true
                    })
                  }
                }
            }).catch(err => {
                this.setData({
                  showEmpty: true,
                  showDefault: true,
                  defaultType: 2,
                  traceId
                });
                mp.hideLoading();
            })
        } else {
          this.setData({
            showEmpty: false,
            showDefault: true,
            defaultType: 4
          });
        }
    },
    // 获取门店数量
    getStoreNum() {
        let { filterTagIds = [] } = this.data || {};
        let { latitude = '', longitude = '', cityName = '', cityId = '' } = this.scopeData.addressInfo || {};
        let { channelId = '', channelBusiness = '' } = this.scopeData.requestParams || {};
        request({
            functionId: FNIDS.getStoreNum.functionId,
            appVersion: FNIDS.getStoreNum.appVersion,
            isNeedDealError: true,
            body: {
                "refPageSource": "",
                "areaCode": cityId,
                "channelId": channelId,
                "city": cityName,
                "coordType": 2,
                "filterTagIds": filterTagIds.join(),
                "latitude": latitude,
                "longitude": longitude,
                "pageSource": "channelStorePage",
                "ref": "",
                "ctp": "moreStoreList"
            },
            preObj: this.data.recommendObj || {}
        }).then(res => {
            if (res.data.code == '0') {
                let { storeNum } = res.data.result || {};
                this.setData({
                    storeNum
                })
            }
        }).catch(err => {

        })
    },
    // 点击筛选
    clickSelector() {
        this.setData({
            hideAllTagPop: false
        });
        // 获取门店数量
        this.getStoreNum()
    },
    // 点击筛选弹层背景
    clickAllTagPop() {
        this.setData({
            hideAllTagPop: true
        })
    },
    // 点击分类标签弹层背景
    clickTagPop() {
        this.setData({
            hideTagPop: true
        })
    },
    // 点击排行分类
    clickSortTag(e) {
        let { rankType, index } = e.currentTarget.dataset || {};
        this.setData({
            sortActive: index
        });
        this.scopeData.requestParams.rankType = rankType;
        this.scopeData.requestParams.currentPage = 1;
        this.getCurrentPageData();
        this.clickAllTagPop()
    },
    // 点击标签
    clickTag(e) {
        let { item = {}, type = "" } = e.currentTarget.dataset || {};
        if (type === 'multiple') {
            // 改版标签状态
            this.dealTagStatus(item);
            // 获取门店数量
            this.getStoreNum()
        } else {
            if (item.children) {
                // 展示弹层
                this.setData({
                    hideTagPop: false
                });
                // 获取门店数量
                this.getStoreNum()
            } else {
                // 改版标签状态
                this.dealTagStatus(item);
                // 分页重置
                this.scopeData.requestParams.currentPage = 1;
                // 请求接口
                this.getCurrentPageData();
                // 关闭弹层
                this.clickTagPop()
            }
        }
    },
    // 处理标签状态
    dealTagStatus(item) {
        let { tagId } = item || {};
        let { filterTagIds } = this.data || {};
        // 记录点击的标签
        let idx = filterTagIds.indexOf(tagId);
        if (idx > -1) {
            filterTagIds.splice(idx, 1)
        } else {
            filterTagIds.push(tagId)
        }
        // 更新筛选项
        this.setData({
            filterTagIds
        })
        this.scopeData.requestParams.currentPage = 1;
        // 修改标签状态
        let { tabList = [], allList = [] } = this.data || {};
        tabList.forEach((item, index) => {
            if (item.children) {
                item.children.forEach((subItem, subIndex) => {
                    if (subItem.tagId === tagId) {
                        let txt = item.tabTxt || '';
                        let idx = txt.indexOf(subItem.name);
                        if (!subItem.active) {
                            (idx < 0) && (txt += subItem.name + ',')
                        } else {
                            let pattern = new RegExp(subItem.name + ',');
                            txt = (idx > -1) && txt.replace(pattern, '')
                        }
                        this.setData({
                            [`tabList[${index}].tabTxt`]: txt,
                            [`tabList[${index}].children[${subIndex}].active`]: !subItem.active
                        })
                    }
                })
            } else {
                if (item.tagId === tagId) {
                    this.setData({
                        [`tabList[${index}].active`]: !item.active
                    })
                }
            }
        })
        allList.forEach((item, index) => {
            if (item.children) {
                item.children.forEach((subItem, subIndex) => {
                    if (subItem.tagId === tagId) {
                        this.setData({
                            [`allList[${index}].children[${subIndex}].active`]: !subItem.active
                        })
                    }
                })
            }
        })
    },
    // 点击查看选择的店铺
    clickMultipleStores() {
        this.scopeData.requestParams.currentPage = 1;
        // 请求接口
        this.getCurrentPageData();
        // 关闭弹层
        this.clickTagPop();
        this.clickAllTagPop()
    },
    // 点击重置
    clickReset() {
        this.setData({
            sortActive: 0,
            filterTagIds: []
        })
        this.scopeData.requestParams.currentPage = 1;
        this.scopeData.requestParams.rankType = 0;
        // 请求接口
        this.getCurrentPageData('onload');
        // 关闭弹层
        this.clickTagPop();
        this.clickAllTagPop();

    },
    // 监听默认页
    onDefaultBtnEvent(e) {
        let type = e.detail.type
        if (type === 6) { // 去登录
          let { recommendObj = {}, optionsPos={} } = this.data;
            wx.navigateTo({
                url: `/pages/newLogin/login/login`,
                preObj: recommendObj,
                buried_position: {
                  currentPageName:'myStoreList1',
                  optionsPos
                }
            })
        }
        // this.clickReset()
    },
    // 接口异常处理
    dealRequestError(type, tips, btnText) {
        this.setData({
            // 默认页-默认页展示
            showDefault: true,
            // 默认页-类型length
            type: type || '',
            // 默认页-提示
            tips: tips || "哎呀！太忙啦！请稍后再试~",
            // 默认页-按钮
            btnText: btnText || "",
        })
    },
})
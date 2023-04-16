import { request, FNIDS } from '../../common/util/api'
import mp from '../../common/util/wxapi';
import { clickBuriedV2_, pvBuriedV2_} from "../../common/util/BI";
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
        // 顶部筛选标签列表
        businessConfig: [],
        // 筛选组件信息
        filterCompData: {},
        // 筛选列表
        sortList: [],
        // 标签筛选列表
        tabList: [],
        // 筛选弹层列表
        allList: [],
        // 分类组件值
        categoryFilter: {},
        // 附近组件值
        nearbyFilter: {},
        // tab筛选弹层
        hideTagPop: true,
        // 全部筛选弹层
        hideAllTagPop: true,
        // 排序分类高亮
        sortActive: 0,
        // 标签
        filterTagIds: [],
        // 标签--单选
        filterTagIdsOption: [],
        // 标签--多选
        filterTagIdsCheckbox: [],
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
        traceId: '',
        positionConfig:{},
        self_page:'moreStoreList',
        scopeDataObj: {},
        pagePaddingTop: '', // 列表距离顶部距离
        // 最后一页
        lastPage: false,
        visible: 'auto'
    },

    // 自定义数据
    scopeData: {
        // 地址信息
        addressInfo: {},
        // 请求入参
        requestParams: {
            // 排序
            rankType: "",
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
        this.scopeData.requestParams.activityId = options.activityId || '';
        this.scopeData.requestParams.sortType = options.sortType || '';
        this.scopeData.requestParams.venderIndustryType = options.venderIndustryType || '';
        this.scopeData.requestParams.channelBusiness = options.channelBusiness || '';
        this.scopeData.requestParams.channelId = options.channelId || '';
        this.scopeData.requestParams.businessTypeParams = options.businessType || '';
        this.buried.channelId = options.channelId || '';
        wx.setNavigationBarTitle({
            title: options.title || '京东到家'
        })
        console.log('--options 附近门点------',options,'---recommendObj---',this.data.recommendObj)
        try {
            let addressInfo = wx.getStorageSync('address_info');
            if (!addressInfo.longitude || !addressInfo.latitude) {
                addressInfo = getApp().globalData.addressInfo
            }
            this.scopeData.addressInfo = addressInfo;
        } catch (err) {

        }
        this.getCurrentPageData('onload')
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
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

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let { requestParams } = this.scopeData || {};
        let currentPage = requestParams.currentPage + 1;
        let { config, lastPage } = this.data;
        if (lastPage) { // 最后一页
            this.setData({
                showBottom: true
            })
        } else {
            this.scopeData.requestParams.currentPage = currentPage;
            this.getCurrentPageData('more')
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // pv() { },
    // 页面pv埋点,
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
            create_time: new Date(),
            page_par: {
                channelId: this.data.channelId || "",
                ref_par: {
                    traceId: recommendObj.preTraceId || "",
                    userAction: recommendObj.preUserAction || "",
                },
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
            'isBack': back || ''
        });
    },

    // 页面是否能滑动，防止滑动透传
    changeTouchMove(e) {
        console.log('changeTouchMove e', e)
        let { visible } = e.detail;
        if (visible) {
            this.setData({
                visible: 'hidden'
            })
        } else {
            this.setData({
                visible: 'auto'
            })
        }
        console.log('changeTouchMove visible', this.data.visible)
    },
    // 获取筛选组件数据
    getFilterParams(params) {
        console.log('params', params);
        let { scopeData, businessType, categoryFilterId = "", nearbyFilterId = "", filterType = "", subwayLongitude = "", subwayLatitude = "" } = params.detail;
        if (scopeData && scopeData.requestParams) {
            this.scopeData = scopeData;
        }
        if (params.detail.filterTagIds) {
            this.setData({
                filterTagIds: params.detail.filterTagIds
            })
        }
        if (businessType === 2 && this.data.positionConfig.priceText && this.data.businessConfig.length > 1) {
            this.setData({
                pagePaddingTop: '143rpx'
            })
        }

        if (businessType !== 2 && this.data.positionConfig.priceText && this.data.businessConfig.length > 1) {
            this.setData({
                pagePaddingTop: '264rpx'
            })
        }
        this.setData({
            filterCompData: {
                businessType,
                categoryFilterId,
                nearbyFilterId,
                filterType,
                subwayLongitude,
                subwayLatitude
            }
        })
        this.getCurrentPageData('');
    },

    scrollToTop() {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: this.data.scrollDuration
         })
    },

    // 获取页面数据
    getCurrentPageData(type) {
        mp.loading_cover();
        let { filterTagIds = [], filterCompData = {} } = this.data || {};
        let { businessType = 0, categoryFilterId = "", nearbyFilterId = "", filterType = "", subwayLongitude = "", subwayLatitude = "" } = filterCompData;
        let {
            rankType = "",
            currentPage = 1, // 活动id
            activityId = '',
            // 排序类型
            sortType = 0,
            venderIndustryType = '',
            channelId = '',
            channelBusiness = ''
        } = this.scopeData.requestParams || {};
        let { latitude = '', longitude = '', cityName = '', cityId = '', poi = '' } = this.scopeData.addressInfo || {};
        const paramObj = {
            functionId: FNIDS.nearbyStore.functionId,
            appVersion: FNIDS.nearbyStore.appVersion,
            method: 'POST',
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
                "businessType": businessType,
                categoryFilterId,
                nearbyFilterId,
                filterType,
                subwayLongitude,
                subwayLatitude,
                "lastStoreId": "",
                "filterTagIds": filterTagIds.join(),
                "slideStoreList": false,
                "venderIndustryType": venderIndustryType && venderIndustryType.split(',') || [],
                "sortType": sortType,
                "level": [],
                "activityId": activityId,
                "pageSource": "channelStorePage",
                refPageSource: this.data.recommendObj.refPageSource || "",
                ref_par: {
                    userAction: this.data.recommendObj.preUserAction || "",
                    traceId: this.data.recommendObj.preTraceId || "",
                },
                "ref": "",
                "ctp": "moreStoreList"
            },
            pageId:(this.data.recommendObj && this.data.recommendObj.pageIdFirstPage) ||"",
            preObj: this.data.recommendObj && this.data.recommendObj || {},
        }
        if (type === 'onload') {
            delete paramObj.body.rankType;
            delete paramObj.body.businessType;
            if (this.scopeData.requestParams.businessTypeParams) {
                paramObj.body.businessType = this.scopeData.requestParams.businessTypeParams;
            }
        }
        if (paramObj.body.rankType === "" || paramObj.body.rankType === 0) {
            delete paramObj.body.rankType;
        }
        console.log('paramObj', paramObj);
        request(paramObj).then(res => {
            mp.hideLoading();
            if (res.data.code === '0') {
                let result = res.data.result || '';
                let { config = {}, data } = result || {};
                // positionConfig
                let {positionConfig = {}, lastPage } = config
                this.setData({
                    lastPage
                })
                // 计算最后一页
                let { totalCount, pageSize } = config.storeConfig || {};
                this.scopeData.lastPage = Math.ceil(totalCount / pageSize);
               
                if (result) {
                    if (type === 'more') { // 分页
                        let list = data.data.map(item => {
                            return item.floorCellData
                        })
                        this.setData({
                            list: this.data.list.concat(list),
                            showDefault: false,
                            showBottom: false,
                            moreFlag: true
                        })
                    } else {
                        if (type === 'onload') { // 第一次加载保留筛选标签
                            let { sortList = [], storeFilterTags = [] } = config.storeTags || {};
                            let { businessConfig = [] } = config || {};
                            let { categoryFilter = {}, nearbyFilter = {} } = config.reachTags || {};
                            // tab标签
                            let tabList = [];
                            // 筛选
                            let allList = [];
                            if (storeFilterTags && storeFilterTags.length) {
                                // tab标签数据集合
                                tabList = storeFilterTags.filter(item => item.outTag && item.outTag  == 1 ).sort((item1, item2) => item1.outSortNum - item2.outSortNum).splice(0,4);
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
                            let list = data.data.map(item => {
                                return item.floorCellData
                            })
                          
                            businessConfig.forEach((i, k) => {
                                if (k === 0) {
                                    i.selected = 1;
                                }
                            })
                            if (businessConfig.length < 2) {
                                this.setData({
                                    filterCompData: {
                                        ...this.data.filterCompData,
                                        businessType: businessConfig[0].businessType
                                    }
                                })
                            }
                        
                            if(JSON.stringify(positionConfig) == '{}'){
                                this.setData({
                                    allList: JSON.parse(JSON.stringify(allList)),
                                    tabList: JSON.parse(JSON.stringify(tabList)),
                                    sortList,
                                    businessConfig,
                                    categoryFilter,
                                    nearbyFilter,
                                    list,
                                    config,
                                    showDefault: false,
                                    showBottom: false
                                })
                            }else{
                                this.setData({
                                    allList: JSON.parse(JSON.stringify(allList)),
                                    tabList: JSON.parse(JSON.stringify(tabList)),
                                    sortList,
                                    businessConfig,
                                    categoryFilter,
                                    nearbyFilter,
                                    list,
                                    config,
                                    showDefault: false,
                                    showBottom: false,
                                    positionConfig
                                })
                                let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
                                this.data.recommendObj || {};
                                clickBuriedV2_({
                                    click_id: "epLayerOpen",
                                    click_par: {
                                        userAction: positionConfig.userAction || ''
                                    },
                                    currentPageName: currentPageName,
                                    prePageName: prePageName,
                                    pageId: pageIdFirstPage,
                                })
                            }

                            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
                            this.data.recommendObj || {};
                            let clickPar = {"tabType": businessConfig[0] && businessConfig[0].businessName || ''};
                            clickPar.state = 0
                            clickBuriedV2_({
                                click_id: "selectTab",
                                click_par: clickPar,
                                currentPageName: currentPageName,
                                prePageName: prePageName,
                                pageId: pageIdFirstPage,
                            })

                            if (positionConfig.priceText) {
                                if (businessConfig.length > 1) { // 1.有新人条有tab有搜索项
                                    this.setData({
                                        pagePaddingTop: '264rpx'
                                    })
                                } else {
                                    if (config.storeTags || config.reachTags) { // 2.有新人条无ab有搜索项
                                        this.setData({
                                          pagePaddingTop: '190rpx'
                                        })
                                    } else { // 3.有新人条无ab无搜索项
                                        this.setData({
                                            pagePaddingTop: '133rpx'
                                          })
                                    }
                                }
                            } else {
                                if (businessConfig.length > 1) { // 4.无新人条有tab有搜索项
                                    this.setData({
                                        pagePaddingTop: '160rpx'
                                    })
                                } else { 
                                    if (config.storeTags || config.reachTags) { // 5.无新人条无ab有搜索项
                                        this.setData({
                                            pagePaddingTop: '90rpx'
                                        })
                                    } else { // 6.无新人条无ab无搜索项
                                        this.setData({
                                            pagePaddingTop: '0rpx'
                                        })
                                    }
                                }
                            }
                        } else {
                            let list = data.data.map(item => {
                                return item.floorCellData
                            })
                            this.setData({
                                list,
                                showDefault: false,
                                showBottom: false
                            })
                        }
                    }
                    this.setData({
                        scopeDataObj: this.scopeData
                    })
                } else {
                    (currentPage === 1) && this.dealRequestError(4, '没有满足条件的店铺', '清空筛选条件')
                }
                // 增加traceId
                let traceId = this.data.traceId && currentPage != 1 ? this.data.traceId : res.data.traceId
                this.setData({traceId})
            }else{
                wx.reportMonitor('25',1)
            }
        }).catch(err => {
            mp.hideLoading();
            (currentPage === 1) && this.dealRequestError(4, '', '')
        })
        console.log('调用完后 this.data', this.data)
    },
    // 获取门店数量
    getStoreNum(filterTagIdsArr) {
        if (filterTagIdsArr.detail) {
            this.data.filterTagIds = filterTagIdsArr.detail.filterTagIds;
        }
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
                refPageSource: this.data.refPageSource || "",
                ref_par: {
                    userAction: this.data.preUserAction || "",
                    traceId: this.data.preTraceId || "",
                },
                "ref": "",
                "ctp": "moreStoreList"
            },
            pageId:(this.data.recommendObj && this.data.recommendObj.pageIdFirstPage) ||"",
            preObj: this.data.recommendObj && this.data.recommendObj || {},
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
        this.getCurrentPageData('');
        this.clickAllTagPop()
    },
    // 点击标签
    clickTag(e) {
        let { item = {}, type = "" } = e.currentTarget.dataset || {};
        if (type === 'multiple') {
            // 改版标签状态
            this.dealTagStatus(item,type);
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
                this.dealTagStatus(item,type);
                // 获取门店数量
                this.getStoreNum()
                // 分页重置
                this.scopeData.requestParams.currentPage = 1;
                // 请求接口
                this.getCurrentPageData('');
                // 关闭弹层
                this.clickTagPop()
            }
        }
    },
    // 处理标签状态
    /**
     * 
     * @param {*} item 
     * @param {*} type multiple--单选(门店类型)
     */ 
    dealTagStatus(item,type) {
        let { tagId } = item || {};
        let { filterTagIds, filterTagIdsOption, filterTagIdsCheckbox } = this.data || {};
        if(type && type == 'multiple'){
            // 记录点击的标签
            let idx = filterTagIdsOption.indexOf(tagId);
            if (idx > -1) {
                filterTagIdsOption.splice(idx, 1)
            } else {
                filterTagIdsOption.length = 0;
                filterTagIdsOption.push(tagId)
            }
            // 门店类型单选
            filterTagIds = filterTagIdsOption.concat(filterTagIdsCheckbox)
            
        }else{
            // 记录点击的标签
            let idx = filterTagIdsCheckbox.indexOf(tagId);
            if (idx > -1) {
                filterTagIdsCheckbox.splice(idx, 1)
            } else {
                filterTagIdsCheckbox.push(tagId)
            }
            // 门店类型单选
            filterTagIds = filterTagIdsCheckbox.concat(filterTagIdsOption)
        }
        // 更新筛选项
        this.setData({
            filterTagIds
        })

        this.scopeData.requestParams.currentPage = 1;
        // 修改标签状态
        let { tabList = [], allList = [] } = this.data || {};
        // 内侧门店类型筛选
        tabList.forEach((item, index) => {
            if (item.children) {
                item.children.forEach((subItem, subIndex) => {
                    if (subItem.tagId === tagId) {
                        // let txt = item.tabTxt || '';
                        let txt = '';
                        let idx = txt.indexOf(subItem.name);
                        if (!subItem.active) {
                            (idx < 0) && (txt += subItem.name)
                        } else {
                            let pattern = new RegExp(subItem.name+',');
                            txt = (idx > -1) && txt.replace(pattern, '')
                        }
                        this.setData({
                            [`tabList[${index}].tabTxt`]: txt,
                            [`tabList[${index}].children[${subIndex}].active`]: !subItem.active
                        })
                    }
                    if (subItem.tagId != tagId && subItem.active && !filterTagIds.includes(subItem.tagId)) {
                        this.setData({
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

        //  外侧一级总筛选
        allList.forEach((item, index) => {
            if (item.children) {
                item.children.forEach((subItem, subIndex) => {
                    if (subItem.tagId === tagId ) {
                        this.setData({
                            [`allList[${index}].children[${subIndex}].active`]: !subItem.active
                        })
                    }
                    //单选
                    if(item.singleChoice){
                        if (subItem.tagId != tagId && subItem.active && !filterTagIds.includes(subItem.tagId)) {
                            this.setData({
                                [`allList[${index}].children[${subIndex}].active`]: !subItem.active
                            })
                        }
                    }
                })
            }
        })
    },
    // 点击查看选择的店铺
    clickMultipleStores() {
        this.scopeData.requestParams.currentPage = 1;
        // 请求接口
        this.getCurrentPageData('');
        // 关闭弹层
        this.clickTagPop();
        this.clickAllTagPop()
    },
    // 点击重置
    clickReset(e) {
        let type  = e && e.currentTarget.dataset.type || ''
        let param_type = type == 'radio' ? '' : 'onload'
        if(type == 'radio'){
        
            //从符合选型里，剔除单选项
            let filterTagIdsCheckbox = this.data.filterTagIdsCheckbox;
            let filterTagIdsOption = this.data.filterTagIdsOption

            // 内侧门店类型筛选门店里的单项
            let { tabList = []} = this.data || {};
            let tagId = filterTagIdsOption[0]
            tabList.forEach((item, index) => {
                if (item.children) {
                    item.children.forEach((subItem, subIndex) => {
                        if (subItem.tagId === tagId) {
                            this.setData({
                                [`tabList[${index}].tabTxt`]: '',
                                [`tabList[${index}].children[${subIndex}].active`]: false
                            })
                        }
                    })
                } else {
                    if (item.tagId === tagId) {
                        this.setData({
                            [`tabList[${index}].active`]: false,
                            [`tabList[${index}].tabTxt`]: ''
                        })
                    }
                }
            })
            let dealArr = [];
            for(let i=0,len=filterTagIdsCheckbox.length;i<len;i++){
                if(!filterTagIdsOption.includes(filterTagIdsCheckbox[i])){
                    dealArr.push(filterTagIdsCheckbox[i])
                }
            }
            this.setData({
                sortActive: 0,
                filterTagIds: dealArr,
                filterTagIdsOption: [],
                filterTagIdsCheckbox: dealArr
            })
        }else{
            this.setData({
                sortActive: 0,
                filterTagIds: [],
                filterTagIdsOption: [],
                filterTagIdsCheckbox: []
            })
        }
        this.scopeData.requestParams.currentPage = 1;
        this.scopeData.requestParams.rankType = 0;
        // 请求接口
        this.getCurrentPageData(param_type);
        // 关闭弹层
        this.clickTagPop();
        this.clickAllTagPop();
        
    },
    // 监听默认页
    onDefaultBtnEvent(e) {
        this.clickReset()
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
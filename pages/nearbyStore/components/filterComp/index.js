
import { clickBuriedV2_, pvBuriedV2_} from "../../../../common/util/BI";
import { djCmsJump } from '../../../../common/util/agreementV2';
Component({
    /**
       * 组件的属性列表
       */
    properties: {
        // 门店数量
        storeNum: {
            type: Number,
            value: 0
        },
        positionConfig: {
            type: Object,
            value: {},
        },
        filterCompData: {
            type: Object,
            value: {},
        },
        // 页面配置信息
        config: {
            type: Object,
            value: {},
        },
        // 筛选列表
        sortList: {
            type: Array,
            value: []
        },
        // 标签筛选列表
        tabList: {
            type: Array,
            value: []
        },
        // 筛选弹层列表
        allList: {
            type: Array,
            value: []
        },
        // 顶部筛选标签列表
        businessConfig: {
            type: Array,
            value: []
        },
        categoryFilter: {
            type: Object,
            value: {}
        },
        nearbyFilter: {
            type: Object,
            value: {}
        },
        scopeData: {
            type: Object,
            value: {}
        },
        recommendObj: {
            type: Object,
            value: {}
        },
        // 顶部选中type
        businessType: {
            type: Number,
            value: 0
        },
    },

    /**
       * 组件的初始数据
       */
    data: {
        // 顶部选中type
        // businessType: 0,
        // 顶部选中index
        businessIndex: 0,
        // 顶部选中businessName
        businessName: "全部",
        // 排序分类高亮
        sortActive: 0,
        filterArr: [],
        // 二层筛选icon状态
        subStatus1: false, // 综合筛选弹窗及背景
        subStatus2: false, // 筛选弹窗及背景
        subStatus3: false, // 分类弹窗及背景
        subStatus4: false, // 附近弹窗及背景
        subStatus3Names: '分类', // 分类按钮
        subStatus4Names: '附近', // 附近按钮
        categoryFilterIdData: '', // 分类数据
        nearbyFilterData: {}, // 附近数据
        hasClickViewStores: false, // 筛选组件是否点击查看按钮
        filterList: [], // 筛选组件选中的父子集合，埋点用
        // 标签
        filterTagIds: [],
        // 标签--单选
        filterTagIdsOption: [],
        // 标签--多选
        filterTagIdsCheckbox: [],
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

        hour: '00',
        minute: '00',
        second: '00',
        timer: null,
        // null表示未开始，1表示进行中，2表示结束
        begin_end: null,
    },

    ready() {
      // 定时器
        if(!this.data.begin_end){
            let timer2 = setTimeout(() => {
                this.showCountDown(this.data.positionConfig.countDownTime)
                clearTimeout(timer2);
            }, 1000);
        }
    },

    /**
       * 组件的方法列表
       */
    methods: {
        // 点击顶部按钮 全部/小时购/到店
        clickBusinessTag(e) {
            console.log('e', e);
            let item = e.detail.tabItem || {};
            let index = e.detail.index || 0;
            const { categoryFilterId, nearbyFilterData } = this.data;
            this.setData({
                businessType: item.businessType,
                businessIndex: index,
                businessName: item.businessName,
                subStatus1: false, // 综合筛选弹窗及背景
                subStatus2: false, // 筛选弹窗及背景
                subStatus3: false, // 分类弹窗及背景
                subStatus4: false,
            });
            this.triggerEvent("changeTouchMove", { visible: false });

            let businessConfig = this.data.businessConfig.map(v => {
                if(item.businessType == v.businessType){
                v.selected = 1;
                } else {
                v.selected = 0;
                }
                return v
            });
            this.setData({
                businessConfig
            })
            if (item.businessType == 0 || item.businessType == 1) {
                this.data.scopeData.requestParams.currentPage = 1;
                this.triggerEvent("getCurrentPageData", { type: '', scopeData: this.data.scopeData, businessType: item.businessType, filterTagIds: this.data.filterTagIds });
                this.clickReset(false);
            }
            if (item.businessType == 2) {
                let scopeDataBusiness = this.data.scopeData;
                let rankTypeCurrent = this.data.scopeData.requestParams.rankType;
                scopeDataBusiness.requestParams = {...scopeDataBusiness.requestParams, rankType: "", currentPage: 1};

                this.triggerEvent("getCurrentPageData", { type: '', scopeData: scopeDataBusiness, businessType: item.businessType, categoryFilterId, ...nearbyFilterData, filterTagIds: [] });
                this.data.scopeData.requestParams.rankType = rankTypeCurrent;
            }
            this.triggerEvent("scrollToTop");

            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
            this.data.recommendObj || {};
            let clickPar = {"tabType": item.businessName};

            clickBuriedV2_({
                click_id: "selectTab",
                click_par: clickPar,
                currentPageName: currentPageName,
                prePageName: prePageName,
                pageId: pageIdFirstPage,
            })
        },
        // 点击综合排序
        clickSubTag(e) {
            this.setData({
                subStatus1: !this.data.subStatus1,
                subStatus2: false,
                subStatus3: false,
                subStatus4: false,
            })
            this.triggerEvent("changeTouchMove", { visible: this.data.subStatus1 });
            if (this.data.subStatus1) {
                let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
                this.data.recommendObj || {};
                let clickPar = {"tabType": this.data.businessName,
                    "tagFilterName": "sortList"
                };
    
                clickBuriedV2_({
                    click_id: "clickFilter",
                    click_par: clickPar,
                    currentPageName: currentPageName,
                    prePageName: prePageName,
                    pageId: pageIdFirstPage,
                })
            }
        },
        // 选择综合排序、销量、距离
        clickSortTag(e) {
            console.log('点击排行分类 e', e);
            let { rankType, index, item } = e.currentTarget.dataset || {};
            this.setData({
                sortActive: index,
                subStatus1: false,
                scopeData: {
                    ...this.data.scopeData,
                    requestParams: {
                        ...this.data.scopeData.requestParams,
                        rankType: rankType,
                        currentPage: 1
                    }
                }
            });
            this.triggerEvent("getCurrentPageData", { type: '', scopeData: this.data.scopeData, businessType: this.data.businessType });
            this.triggerEvent("scrollToTop");

            // 埋点
            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
            this.data.recommendObj || {};
            let clickPar = {
                "tabType": this.data.businessName,
                "tagFilterName": "sortList",
                filterName: item.name,
                filterType: item.rankType,
                status: 1
            };

            clickBuriedV2_({
                click_id: "selectTag",
                click_par: clickPar,
                currentPageName: currentPageName,
                prePageName: prePageName,
                pageId: pageIdFirstPage,
            })
        },


        // 点击筛选按钮
        clickSubTagTwo(e) {
            this.triggerEvent("getStoreNum", { filterTagIds: this.data.filterTagIds });
            this.setData({
                subStatus2: !this.data.subStatus2,
                subStatus1: false,
                subStatus3: false,
                subStatus4: false,
            })
            this.triggerEvent("changeTouchMove", { visible: this.data.subStatus2 });
            if (!this.data.subStatus2 && !this.data.hasClickViewStores) {
                this.clickReset(false);
            }
            if (this.data.subStatus2) {
                let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
                this.data.recommendObj || {};
                let clickPar = {"tabType": this.data.businessName,
                    "tagFilterName": "storeFilterTags"
                };
    
                clickBuriedV2_({
                    click_id: "clickFilter",
                    click_par: clickPar,
                    currentPageName: currentPageName,
                    prePageName: prePageName,
                    pageId: pageIdFirstPage,
                })
            }
        },
        catchTouchMove() {
          return false;
        },
        // 点击标签
        clickTag(e) {
            console.log('点击标签 e', e)
            let { item = {}, type = "", parentItem = {} } = e.currentTarget.dataset || {};
            if (type === 'multiple') {
                // 改版标签状态
                this.dealTagStatus(item, type);
                // 获取门店数量
                this.triggerEvent("getStoreNum", { filterTagIds: this.data.filterTagIds });
            } else {
                if (item.children) {
                    // 获取门店数量
                    this.triggerEvent("getStoreNum", { filterTagIds: this.data.filterTagIds });
                } else {
                    // 改版标签状态
                    this.dealTagStatus(item, type);
                    // 获取门店数量
                    this.triggerEvent("getStoreNum", { filterTagIds: this.data.filterTagIds });
                    // 分页重置
                    this.data.scopeData.requestParams.currentPage = 1;
                    // 请求接口
                    // this.triggerEvent("getCurrentPageData", { type: '', scopeData: this.data.scopeData, businessType: this.data.businessType });
                }
            }

            if (!item.active) {
                let filterList = this.data.filterList || [];
                if (this.data.filterList.find(i => i.filterType === parentItem.tagId)) {
                    filterList = this.data.filterList.map(t => {
                        if (t.filterType === parentItem.tagId) {
                            let obj = {
                                itemName: item.name,
                                itemId: item.tagId
                            }
                            if (type === 'multiple') { // 单选
                                t.itemList[0] = obj;
                            } else {
                                t.itemList.push(obj);
                            }
                        }
                        return t;
                    })
                } else {
                    let obj = {
                        itemId: item.tagId,
                        itemName: item.name
                    }
                    let parentObj = {
                        filterName: parentItem.name,
                        filterType: parentItem.tagId,
                        itemList: [obj]
                    }
                    filterList = [...filterList, parentObj];
                }
                this.setData({
                    filterList
                })
            } else {
                // 取消选中
                let filterList = this.data.filterList || [];
                let arr = filterList.filter(d => {
                    d.itemList = d.itemList.filter(c => c.itemId !== item.tagId)
                    console.log('d', d, d.itemList.length > 0)
                    return d.itemList.length > 0;
                })
                this.setData({ filterList: arr })
            }

            // 埋点
            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
            this.data.recommendObj || {};
            let clickPar = {
                "tabType": this.data.businessName,
                "tagFilterName": "storeFilterTags",
                filterName: parentItem.name,
                filterType: parentItem.tagType,
                itemId: item.tagid,
                itemName: item.name,
                status: item.active ? 0 : 1
            };

            clickBuriedV2_({
                click_id: "selectTag",
                click_par: clickPar,
                currentPageName: currentPageName,
                prePageName: prePageName,
                pageId: pageIdFirstPage,
            })
        },
        // 处理标签状态
        /**
         * 
         * @param {*} item 
         * @param {*} type multiple--单选(门店类型)
         */
        dealTagStatus(item, type) {
            let { tagId } = item || {};
            let { filterTagIds, filterTagIdsOption, filterTagIdsCheckbox } = this.data || {};
            if (type && type == 'multiple') {
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

            } else {
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

            this.data.scopeData.requestParams.currentPage = 1;
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
                                let pattern = new RegExp(subItem.name + ',');
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
                        if (subItem.tagId === tagId) {
                            this.setData({
                                [`allList[${index}].children[${subIndex}].active`]: !subItem.active
                            })
                        }
                        //单选
                        if (item.singleChoice) {
                            if (subItem.tagId != tagId && subItem.active && !filterTagIds.includes(subItem.tagId)) {
                                this.setData({
                                    [`allList[${index}].children[${subIndex}].active`]: !subItem.active
                                })
                            }
                        }
                    })
                }
            })
            console.log('tabList', tabList);
            console.log('allList', allList);
        },
        // 点击查看选择的店铺
        clickMultipleStores() {
            if (!this.data.storeNum) {
                return;
            }
            this.data.scopeData.requestParams.currentPage = 1;
            // 请求接口
            this.triggerEvent("getCurrentPageData", { type: '', scopeData: this.data.scopeData, businessType: this.data.businessType });
            this.triggerEvent("scrollToTop");
            // 关闭弹层
            this.setData({
                subStatus2: false,
                hasClickViewStores: true
            })
            this.triggerEvent("changeTouchMove", { visible: false });

            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
            this.data.recommendObj || {};
            let { filterList } = this.data;
            let clickPar = {
                "element": "filter",
                "tabType": this.data.businessName,
                "tagFilterName": "storeFilterTags",
                filterList
            };

            clickBuriedV2_({
                click_id: "clickConfirm",
                click_par: clickPar,
                currentPageName: currentPageName,
                prePageName: prePageName,
                pageId: pageIdFirstPage,
            })
        },
        // 点击重置
        clickReset(isGetData = true) {
            console.log('点击重置 isGetData', isGetData)
            //  改变标签状态
            this.data.allList.forEach((item, index) => {
                if (item.children) {
                    item.children.forEach((subItem, subIndex) => {
                        if (subItem.active) {
                            this.setData({
                                [`allList[${index}].children[${subIndex}].active`]: false
                            })
                        }
                    })
                }
            })
            
            this.setData({
                filterTagIds: [],
                filterTagIdsOption: [],
                filterTagIdsCheckbox: [],
                hasClickViewStores: false,
            })
            this.triggerEvent("getStoreNum", { filterTagIds: this.data.filterTagIds });

            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
            this.data.recommendObj || {};
            let clickPar = {
                "element": "filter",
                "tabType": this.data.businessName,
                "tagFilterName": "storeFilterTags"
            };

            clickBuriedV2_({
                click_id: "clickReset",
                click_par: clickPar,
                currentPageName: currentPageName,
                prePageName: prePageName,
                pageId: pageIdFirstPage,
            })

        },
        // 监听默认页
        onDefaultBtnEvent(e) {
            this.clickReset()
        },

        // 点击分类
        clickSubClassifyTag(e) {
            console.log('点击分类');
            this.setData({
                subStatus3: !this.data.subStatus3,
                subStatus1: false,
                subStatus2: false,
                subStatus4: false,
            })
            this.triggerEvent("changeTouchMove", { visible:  this.data.subStatus3});

            if (this.data.subStatus3) {
                let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
                this.data.recommendObj || {};
                let clickPar = {"tabType": this.data.businessName,
                    "tagFilterName": "categoryFilter"
                };
    
                clickBuriedV2_({
                    click_id: "clickFilter",
                    click_par: clickPar,
                    currentPageName: currentPageName,
                    prePageName: prePageName,
                    pageId: pageIdFirstPage,
                })
            }
        },

        // 点击附近
        clickSubNearbyTag() {
            this.setData({
                subStatus4: !this.data.subStatus4,
                subStatus1: false,
                subStatus2: false,
                subStatus3: false,
            })
            this.triggerEvent("changeTouchMove", { visible:  this.data.subStatus4});

            if (this.data.subStatus4) {
                let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
                this.data.recommendObj || {};
                let clickPar = {"tabType": this.data.businessName,
                    "tagFilterName": "nearbyFilter"
                };
    
                clickBuriedV2_({
                    click_id: "clickFilter",
                    click_par: clickPar,
                    currentPageName: currentPageName,
                    prePageName: prePageName,
                    pageId: pageIdFirstPage,
                })
            }
        },

        // 附近弹窗确定
        clickConfirmNearby(params) {
            console.log('附近弹窗确定', params);
            let { filterType = '', lastItemList = [], names = '', itemActive = [], subItemActive = [], thirdItemActive = [], hasReset } = params.detail;
            let subwayLatitude = ''; 
            let subwayLongitude = '';
            const nearbyFilterId = lastItemList.map(i => {
                if (filterType == '2') { // 地铁
                    subwayLatitude = i.subwayLatitude;
                    subwayLongitude = i.subwayLongitude;
                }
                return i.itemId
            }).join(',');
            this.data.scopeData.requestParams.currentPage = 1;
            if ((names && lastItemList.length > 0) || hasReset) {
                // 请求接口
                this.triggerEvent("getCurrentPageData", { type: '', businessType: this.data.businessType, scopeData: this.data.scopeData, filterType, nearbyFilterId, subwayLongitude, subwayLatitude, categoryFilterId: this.data.categoryFilterIdData });
                this.triggerEvent("scrollToTop");
            }
            this.setData({
                subStatus4: false,
                nearbyFilterData: {
                    filterType,
                    nearbyFilterId,
                    subwayLongitude,
                    subwayLatitude,
                }
            });
            this.triggerEvent("changeTouchMove", { visible: false });
            if (names) {
                this.setData({
                    subStatus4Names: names
                });
            } else {
                this.setData({
                    subStatus4Names: '附近'
                });
            }

            // 埋点
            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
            this.data.recommendObj || {};
            let filterList = this.deepClone(itemActive);
            if (filterList[0]) {
                filterList[0].itemList = subItemActive.map(i => {
                    return {
                        itemId: i.itemId,
                        itemName: i.itemName
                    }
                });
                if (filterList[0].itemList[0]) {
                    filterList[0].itemList[0].subItemList = thirdItemActive.map(t => {
                            return {
                            subItemId: t.itemId,
                            subItemName: t.itemName
                        };
                    })
                }
            }
            let clickPar = {
                "element": "filter",
                "tabType": this.data.businessName,
                "tagFilterName": "nearbyFilter",
                filterList
            };

            console.log('clickPar', clickPar);
            clickBuriedV2_({
                click_id: "clickConfirm",
                click_par: clickPar,
                currentPageName: currentPageName,
                prePageName: prePageName,
                pageId: pageIdFirstPage,
            })
        },

        // 附近弹窗重置
        clickResetNearby(params) {
            console.log('附近弹窗重置', params);

            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
            this.data.recommendObj || {};
            let clickPar = {
                "element": "filter",
                "tabType": this.data.businessName,
                "tagFilterName": "nearbyFilter"
            };

            clickBuriedV2_({
                click_id: "clickReset",
                click_par: clickPar,
                currentPageName: currentPageName,
                prePageName: prePageName,
                pageId: pageIdFirstPage,
            })
        },

        // 分类弹窗确定
        clickConfirmClassify(params) {
            console.log('分类弹窗确定', params);
            let { filterType = '', lastItemList = [], names = '', itemActive = [], subItemActive = [], thirdItemActive = [], hasReset } = params.detail;
            let categoryFilterId = lastItemList.map(i => i.itemId).join(',');
            this.data.scopeData.requestParams.currentPage = 1;
            if ((names && lastItemList.length > 0) || hasReset) {
                // 请求接口
                this.triggerEvent("getCurrentPageData", { type: '', businessType: this.data.businessType, scopeData: this.data.scopeData,  categoryFilterId, ...this.data.nearbyFilterData});
                this.triggerEvent("scrollToTop");
            }
            this.setData({
                subStatus3: false,
                categoryFilterIdData: categoryFilterId,
            })
            this.triggerEvent("changeTouchMove", { visible: false });
            if (names) {
                this.setData({
                    subStatus3Names: names
                });
            } else {
                this.setData({
                    subStatus3Names: '分类'
                });
            }

            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
            this.data.recommendObj || {};
            let filterList = this.deepClone(itemActive);
            if (filterList[0]) {
                filterList[0].itemList = subItemActive.map(i => {
                    return {
                        itemId: i.itemId,
                        itemName: i.itemName
                    }
                });
                if (filterList[0].itemList[0]) {
                    filterList[0].itemList[0].subItemList = thirdItemActive.map(t => {
                            return {
                            subItemId: t.itemId,
                            subItemName: t.itemName
                        };
                    });
                }
            }
            let clickPar = {
                "element": "filter",
                "tabType": this.data.businessName,
                "tagFilterName": "categoryFilter",
                filterList
            };

            clickBuriedV2_({
                click_id: "clickConfirm",
                click_par: clickPar,
                currentPageName: currentPageName,
                prePageName: prePageName,
                pageId: pageIdFirstPage,
            })
        },

        // 分类弹窗重置
        clickResetClassify(params) {

            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
            this.data.recommendObj || {};
            let clickPar = {
                "element": "filter",
                "tabType": this.data.businessName,
                "tagFilterName": "categoryFilter"
            };

            clickBuriedV2_({
                click_id: "clickReset",
                click_par: clickPar,
                currentPageName: currentPageName,
                prePageName: prePageName,
                pageId: pageIdFirstPage,
            })
        },

        // 分类、附近弹窗关闭
        clickClosePop(params) {
            console.log('clickClosePop params', params);
            const { type } = params.detail || {};
            if (type === 'categoryFilter') {
                this.setData({
                    subStatus3: false
                })
            }
            if (type === 'nearbyFilter') {
                this.setData({
                    subStatus4: false
                })
            }
            this.triggerEvent("changeTouchMove", { visible: false });
        },

        // 点击筛选弹层背景
        clickAllTagPop() {
            if (!this.data.hasClickViewStores) {
                this.clickReset(false);
            }
            this.setData({
                subStatus1: false,
                subStatus2: false,
                subStatus3: false,
                subStatus4: false
            })
            this.triggerEvent("changeTouchMove", { visible: false });
        },

        // 点击顶部腰带
        clickBanner(e){
            let { to='',params={},userAction=''} = e.currentTarget.dataset.item || {};
            if(to){
                djCmsJump({
                    to,
                    params,
                    userAction,
                    preObj: this.data.recommendObj,
                    buried_position: {
                        currentPageName: 'nearbystore__clickBanner'
                    }
                })
            }
            
        },

        // 展示倒计时
        showCountDown(time) {
            console.log('time', time);
            console.log('showCountDown', this.data, this.data.positionConfig.countDownTime)
            if (time > 0) {
                this.countDown(time, res => {
                if (res.end) {
                    this.setData({
                        hour: '00',
                        minute: '00',
                        second: '00'
                    });
                    if (this.data.begin_end == null) {
                        this.setData({
                            begin_end: 1,
                            'info.skuStatus': 1
                        })
                    } else if (this.data.begin_end == 1) {
                        this.setData({
                            begin_end: 2
                        })
                        this.clearInterval();
                    }
                    return;
                }
                // 更新时间
                this.setData({
                    hour: res.hour,
                    minute: res.minute,
                    second: res.second
                });
            })
            } else {
                this.setData({
                    hour: '00',
                    minute: '00',
                    second: '00'
                })
            }
        },
        countDown(times, callBack) {
            // 秒
            // times = times / 1000;
            // 计时器
            clearInterval(this.data.timer)
            this.data.timer = setInterval(() => {
                let hour = 0,
                    minute = 0,
                    second = 0;
                if (times > 0) {
                    hour = Math.floor(times / (60 * 60));
                    minute = Math.floor(times / 60) - (hour * 60);
                    second = Math.floor(times) - (hour * 60 * 60) - (minute * 60);
                }
                // 小于10补0
                if (hour <= 9) hour = '0' + hour;
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;
                // 回调
                if (times > 0) {
                    callBack({
                        hour: hour + '',
                        minute: minute + '',
                        second: second + '',
                        end: false
                    })
                } else {
                    callBack({
                        hour: '00',
                        minute: '00',
                        second: '00',
                        end: true
                    })
                }
                times--;
            }, 1000)
        },
        // 清除计时器
        clearInterval() {
            clearInterval(this.data.timer)
            this.data.timer = null
        },

        // 深拷贝
        deepClone(obj) {
            var newObj = obj;
            if (obj) {
              newObj = JSON.stringify(obj);
              newObj = JSON.parse(newObj);
            }
            return newObj;
        },

    },
});

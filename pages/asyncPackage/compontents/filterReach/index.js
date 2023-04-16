import mp from '../../../../common/util/wxapi';
import { clickBuriedV2_, pvBuriedV2_} from "../../../../common/util/BI";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        filterObj: {
            type: Object,
            value: {}
        },
        recommendObj: {
            type: Object,
            value: {}
        },
        businessName: {
            type: String,
            value: ""
        },
        compType: {
            type: String,
            value: ""
        },
        isShow: {
            type: Boolean,
            value: false
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 第一级选中index
        itemIndex: [0],
        itemActive: [],
        // 第二级选中index
        subIndexActive: [],
        subItemActive: [],
        currentSubItem: {},
        // 第三级选中index
        thirdIndexActive: [],
        thirdItemActive: [],
        hasReset: false, // 是否重置
        backups: {
            // 第一级选中index
            itemIndex: [0],
            itemActive: [],
            // 第二级选中index
            subIndexActive: [],
            subItemActive: [],
            currentSubItem: {},
            // 第三级选中index
            thirdIndexActive: [],
            thirdItemActive: [],
        }
    },

    observers: {
        'isShow': function (newVal) {
            console.log('newVal', newVal);
            console.log('this.data.isShow', this.data.isShow);
            if (this.data.isShow) {
                const { itemIndex, itemActive, subIndexActive, subItemActive, thirdIndexActive, thirdItemActive, currentSubItem } = this.data.backups;
                this.setData({
                    itemIndex, 
                    itemActive,
                    subIndexActive,
                    subItemActive,
                    thirdIndexActive,
                    thirdItemActive,
                    currentSubItem,
                    hasReset: false,
                })
            }
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 点击第一级
        clickItem(e) {
            console.log('点击第一级 e', e);
            let { item, index } = e.currentTarget.dataset || {};
            let { itemIndex, itemActive } = this.data;
            if (itemIndex.includes(index)) { // 已选过，取消选择
            //     itemIndex = itemIndex.filter(i => i !== index);
            //     itemActive = itemActive.filter(t => t.filterType !== item.filterType);
            //     this.setData({
            //         itemActive: itemActive,
            //         itemIndex: itemIndex,
            //         subIndexActive: [],
            //         subItemActive: [],
            //         thirdIndexActive: [],
            //         thirdItemActive: [],
            //         currentSubItem: {},
            //         hasReset: false,
            //     })
            } else { // 未选过，点击选择
                // 单选
                this.setData({
                    itemActive: [item],
                    itemIndex: [index],
                    subIndexActive: [],
                    subItemActive: [],
                    thirdIndexActive: [],
                    thirdItemActive: [],
                    currentSubItem: {},
                    hasReset: false,
                })
            }
        },
        // 点击第二级
        clickSubItem(e) {
            let { item, index, parentItem } = e.currentTarget.dataset || {};
            console.log('点击第二级', item, index, e)
            let { subItemActive, subIndexActive } = this.data;
            let hasSelected = false;
            if (this.data.itemActive.length === 0) {
                this.data.itemActive[0] = parentItem;
            }
            if (subIndexActive.includes(index) && !item.leafNode) { // 已选过，取消选择
                hasSelected = true;
                subIndexActive = subIndexActive.filter(i => i !== index);
                subItemActive = subItemActive.filter(t => t.itemId !== item.itemId);
                this.setData({
                    subItemActive: subItemActive,
                    currentSubItem: {},
                    subIndexActive: subIndexActive,
                    thirdIndexActive: [],
                    thirdItemActive: [],
                })
            } else { // 未选过，点击选择
                hasSelected = false;
                if (parentItem && parentItem.multi) {
                    if (parentItem.multi == 1) { // 单选
                        this.setData({
                            subIndexActive: [index],
                            subItemActive: [item],
                            currentSubItem: item,
                            currentSubIndex: index,
                            thirdIndexActive: [],
                            thirdItemActive: [],
                        })
                    } else { // 多选
                        if (subIndexActive.length < parentItem.multi) {
                            this.setData({
                                subItemActive: [...this.data.subItemActive, item],
                                currentSubItem: item,
                                subIndexActive: [...this.data.subIndexActive, index]
                            })
                        } else { // 选够了
                            mp.toast({
                              title: `最多选${parentItem.multi}个哦～`
                            })
                        }
                    }
                } else { // 没有multi单选
                    this.setData({
                        subIndexActive: [index],
                        subItemActive: [item],
                        currentSubItem: item,
                        currentSubIndex: index,
                        thirdIndexActive: [],
                        thirdItemActive: [],
                    })
                }
            }
            this.setData({
                hasReset: false,
            })
            if (item.leafNode) {
                // 埋点
                let { compType, businessName, itemActive } = this.data;
                let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } = this.data.recommendObj || {};
                let clickPar = {
                    "tabType": businessName,
                    "tagFilterName": compType,
                    filterName: itemActive[0].filterName,
                    filterType: itemActive[0].filterType,
                    itemId: item.itemId,
                    itemName: item.itemName,
                    status: hasSelected ? 0 : 1
                };
                clickBuriedV2_({
                    click_id: "selectTag",
                    click_par: clickPar,
                    currentPageName: currentPageName,
                    prePageName: prePageName,
                    pageId: pageIdFirstPage,
                })
            }
        },
        // 点击第三级
        clickThirdItem(e) {
            console.log('点击第三级 e', e);
            let { item, index, parentItem } = e.currentTarget.dataset || {};
            let { thirdItemActive, thirdIndexActive } = this.data;
            let hasSelected = false;
            if (thirdIndexActive.includes(index)) { // 已选过，取消选择
                // hasSelected = true;
                // thirdIndexActive = thirdIndexActive.filter(i => i !== index);
                // thirdItemActive = thirdItemActive.filter(t => t.itemId !== item.itemId);
                // this.setData({
                //     thirdItemActive: thirdItemActive,
                //     thirdIndexActive: thirdIndexActive,
                // })
            } else { // 未选过，点击选择
                hasSelected = false;
                if (parentItem && parentItem.multi) {
                    if (parentItem.multi == 1) { // 单选
                        this.setData({
                            thirdIndexActive: [index],
                            thirdItemActive: [item],
                        })
                    } else { // 多选
                        if (thirdIndexActive.length < parentItem.multi) {
                            this.setData({
                                thirdItemActive: [...this.data.thirdItemActive, item],
                                thirdIndexActive: [...this.data.thirdIndexActive, index]
                            })
                        } else { // 选够了
                            mp.toast({
                              title: `最多选${parentItem.multi}个哦～`
                            })
                        }
                    }
                } else { // 没有multi就单选
                    this.setData({
                        thirdIndexActive: [index],
                        thirdItemActive: [item],
                    })
                }
            }
            this.setData({
                hasReset: false,
            })

            if (item.leafNode) {
                // 埋点
                let { compType, businessName, itemActive } = this.data;
                let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } = this.data.recommendObj || {};
                let clickPar = {
                    "tabType": businessName,
                    "tagFilterName": compType,
                    filterName: itemActive[0].filterName,
                    filterType: itemActive[0].filterType,
                    itemId: parentItem.itemId,
                    itemName: parentItem.itemName,
                    subItemId: item.itemId,
                    subItemName: item.itemName,
                    status: hasSelected ? 0 : 1
                };
                console.log('附近第三级 clickPar', clickPar)
                clickBuriedV2_({
                    click_id: "selectTag",
                    click_par: clickPar,
                    currentPageName: currentPageName,
                    prePageName: prePageName,
                    pageId: pageIdFirstPage,
                })
            }
        },

        // 确定
        clickConfirm() {
            let params = {}
            let isLastNode = false
            // params: {
            //     filterType: ''  筛选类型
            //     lastItemList: []  最后一级选中项的id数组
            // }
            //临时判断第三个是否有选中, 取最后一级id数据
            if (this.data.thirdItemActive.length > 0) {
                isLastNode = true;
                params.lastItemList = this.data.thirdItemActive;
                params.names = this.data.thirdItemActive.map(i => i.itemName).join(',');
            } else if (this.data.subItemActive.length > 0) {
                params.lastItemList = this.data.subItemActive
                params.names = this.data.subItemActive.map(i => {
                    if (i.leafNode) {
                        isLastNode = true;
                    }
                    return i.itemName
                }).join(',');
                if (!isLastNode) {
                    params.lastItemList = [];
                    params.names = "";
                }
            }
            if (params.names && params.lastItemList && isLastNode) {
                params.filterType = (this.data.itemActive[0] && this.data.itemActive[0].filterType) || "";
                params.itemActive = this.data.itemActive;
                params.subItemActive = this.data.subItemActive;
                params.thirdItemActive = this.data.thirdItemActive;
            } else {
                this.triggerEvent('clickClosePop', {type: this.data.compType})
            }
            params.hasReset = this.data.hasReset;
            if ((params.names && params.lastItemList && isLastNode) || this.data.hasReset) {
                this.triggerEvent('clickConfirm', this.deepClone(params))
                    const { itemIndex, itemActive, subIndexActive, subItemActive, thirdIndexActive, thirdItemActive, currentSubItem } = this.data;
                if (this.data.hasReset) {
                    this.setData({
                        backups: {
                            itemIndex: [0],
                            itemActive: [],
                            // 第二级选中index
                            subIndexActive: [],
                            subItemActive: [],
                            // 第三级选中index
                            thirdIndexActive: [],
                            thirdItemActive: [],
                            currentSubItem: {},
                        },
                    })
                } else {
                    const { itemIndex, itemActive, subIndexActive, subItemActive, thirdIndexActive, thirdItemActive, currentSubItem } = this.data;
                    this.setData({
                        backups: {
                            itemIndex, 
                            itemActive,
                            subIndexActive,
                            subItemActive,
                            thirdIndexActive,
                            thirdItemActive,
                            currentSubItem
                        },
                    })
                }
            }
        },
        // 重置
        clickReset() {
            this.setData({
                itemIndex: [0],
                itemActive: [],
                // 第二级选中index
                subIndexActive: [],
                subItemActive: [],
                // 第三级选中index
                thirdIndexActive: [],
                thirdItemActive: [],
                currentSubItem: {},
                hasReset: true
            })
            this.triggerEvent('clickReset')
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
    }
})

import { request, FNIDS } from '../../../../common/util/api'
import mp from '../../../../common/util/wxapi'
import { djCmsJump } from '../../../../common/util/agreementV2';
import { clickBuriedV2_ } from "../../../../common/util/BI";
import { transferExposureData } from '../../../../common/util/BI';
let currentPageCache = 0;
// 卡片高度
const FEEDSHEIGHTMAP = {
  // 商品基础高度
  '1': 532,
  // 商品的促销标签高度
  '1.1': 54,
  // 商品标语高度
  '1.2': 38,
  // 会员价或券后价或者预估价
  '1.3': 16,
  // 商品属性或者功能主治或者广告语
  '1.4': 16,
  // 热门店铺高度
  '2': 614,
  // 特色商品高度
  '5': 522,
  // 轮播banner高度
  '7': 575,
  // 战略宫格高度
  '8': 276,
  // 图文宫格高度
  '9': 254,
  // 4宫格卡片资源位
  '10': 520
}
// feeds列表缓存
let feedsList = {
  origin: [],
  left: [],
  right: [],
  leftNum: 0,
  rightNum: 0
}
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_feedsItem',
    epSelector: '.home_feedsItem'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    resourceRequestFinished: {
      type: Boolean,
      value: false,
      observer: function () {
        let secondActiveTab = this.data.secondActiveTab;
        let secondIndex = this.data.secondIndex;
        currentPageCache = 1;
        this.getSkuList(currentPageCache, '', true, secondActiveTab, secondIndex)
      }
    },
    pageReachBottom: {
      type: Number,
      value: 0,
      observer: function () {
        let activeTab = this.data.activeTab;
        let secondActiveTab = this.data.secondActiveTab;
        let secondIndex = this.data.secondIndex;
        setTimeout(() => {
          if (currentPageCache === 0) { // resourceRequestFinished无回调时
            currentPageCache = 1;
            this.getSkuList(currentPageCache, '', true, secondActiveTab, secondIndex, 'isBottom');
            return false
          }
        }, 0)
        if (currentPageCache > 1) {
          this.loadCard();
          if (feedsList.left < 7 || feedsList.right < 7) {
            this.getSkuList(currentPageCache, activeTab, false, secondActiveTab, secondIndex, 'isBottom')
          }
        }
      }
    },
    ceilingBannerConfig: {
      type: Object,
      value: {}
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
    isShowTopBanner: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          let userAction = this.data.ceilingBannerConfig.userAction || ''
          let traceId = this.data.pageDataTraceId || ''
          let history = this._getHistoryPage();
          transferExposureData({
            userAction,
            traceId,
            create_time: new Date(),
            clienttime: Date.now(),
            pageId: this.data.buriedObj.pageIdFirstPage,
            currentPageName: this.data.buriedObj.currentPageName,
            prePageName: this.data.buriedObj.prePageName,
          }, history)
        }
      }
    },
    isFixedFeedsTab: {
      type: Boolean,
      value: false
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    homeoptions: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    capsule: {},
    // tab标签
    hotSaleTags: [],
    // tab标签下的二级标签
    subTabs: [],
    // tab标签下的banner图
    banner: [],
    // 一级tab激活状态
    activeTab: '',
    // 二级tab激活状态
    secondActiveTab: '',
    // 二级 index
    secondIndex: 0,
    // feeds列表
    leftList: [],
    rightList: [],
    // 是否是最后一页
    isLastPage: false,
    // tab滚动中间
    anchorId: 'tab_0',
    traceId: '',
    fetchNum:0 ,  //发生请求次数
    showDefault: false // 是否展示缺省
  },

  /**
  * 组件生命周期函数-在组件实例进入页面节点树时执行)
  */
  attached() {
    // 获取胶囊位置
    this.getCapsule()
    // 获取横滑feed位置
    this.getFeedPositon()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _defaultBtnEvent(e){
      let type = e.detail.type;
      if(type == 1){
        currentPageCache = 1
        let secondActiveTab = this.data.secondActiveTab;
        let secondIndex = this.data.secondIndex;
        this.getSkuList(currentPageCache, '', true, secondActiveTab, secondIndex, 'isBottom');
      }
    },
    getFeedPositon() {
      this.createSelectorQuery().select('#feeds-sku').boundingClientRect((rect) => {
        this.triggerEvent("feedSkuPosition", {
          feedSkuShow: rect && rect.top ? true : false
        })
      }).exec()
    },
    // 获取商品列表 
    /**
     * isBottom 触底请求时，不更新traceId
     */
    getSkuList(currentPage, tagId, needMenu, secondActiveTab, secondIndex, isBottom) {
      if (this.data.isLastPage) return;
      mp.loading_cover();
      let { functionId = '', appVersion = '' } = FNIDS.recommendSkuListPost || {};
      request({
        functionId,
        appVersion,
        isNeedDealError: true,
        body: {
          "refPageSource": "",
          "coordType": 1,
          "currentPage": currentPage,
          "firstTagId": tagId || '',
          "filterTagId": secondActiveTab || '',
          // "secondActiveTab": secondActiveTab || '',
          "secondIndex": secondIndex || 0,
          "needMenu": needMenu || false,
          "count": currentPage === 1 ? 0 : 45,
          "pageSource": "home",
          "ref": "",
          "ctp": "home"
        },
        method:"POST",
        pageId:(this.data.buriedObj && this.data.buriedObj.pageIdFirstPage) ||"",
        preObj: this.data.buriedObj && this.data.buriedObj || {},
        content: {
          platform: 6
        }
      }).then(res => {
        mp.hideLoading();
        // res.data={
        //   "code": "0",
        //   "title": "成功",
        //   "msg": "成功(0)",
        //   "result": {
        //     "config": {
        //       "hasSubName": false,
        //       "title": "热销商品",
        //       "feedbacks": [
        //         {
        //           "iconUrl": "https://img30.360buyimg.com/mobilecms/jfs/t1/105543/7/15232/3509/5e7073b5E6b19e7cd/7fa2901cacdff73e.png",
        //           "title": "商品不感兴趣",
        //           "toast": "收到反馈，将减少此商品的推荐",
        //           "type": "4"
        //         },
        //         {
        //           "iconUrl": "https://img30.360buyimg.com/mobilecms/jfs/t1/104616/38/15296/2900/5e7073daE4af17f77/bbe5e3ab0efee07a.png",
        //           "title": "商品图片引起不适",
        //           "toast": "收到反馈，将减少此类商品的推荐(不再推荐该商品)",
        //           "type": "5"
        //         },
        //         {
        //           "iconUrl": "https://img30.360buyimg.com/mobilecms/jfs/t1/110101/16/9168/2944/5e707411E3c8f3a35/d9c0e1bf287f6874.png",
        //           "title": "不喜欢该商家",
        //           "toast": "收到反馈，将减少此类商品的推荐",
        //           "type": "1"
        //         },
        //         {
        //           "iconUrl": "https://img30.360buyimg.com/mobilecms/jfs/t1/105728/34/15555/3077/5e707456E0f0550ff/4c16b4b0837e079d.png",
        //           "title": "不喜欢该品类",
        //           "toast": "收到反馈，将减少此类商品的推荐",
        //           "type": "3"
        //         }
        //       ]
        //     },
        //     "data": [{
        //       "type": "1",
        //       "data": {
        //           "type": 0,
        //           "skuId": "10054343870259",
        //           "skuName": "厚乳系列3选1（海盐芝士厚乳拿铁 海盐芝士鸳鸯拿铁 陨石厚乳拿铁）-30天有效-直充-支持外卖&自提",
        //           "imgUrl": "https://img10.360buyimg.com/n1/jfs/t1/210664/2/23526/86465/62ac9b00E8b2547a8/6bc59b7b497257ea.jpg",
        //           "isStoreVip": false,
        //           "promotion": -1,
        //           "tags": [
        //               {
        //                   "iconText": "4.9折",
        //                   "type": 0,
        //                   "belongIndustry": 0,
        //                   "colorCode": "#FFCE0B",
        //                   "startColorCode": "#FF5B57",
        //                   "endColorCode": "#FF1E19",
        //                   "strokeNameColorCode": "#FF1E1A",
        //                   "strokeColorCode": "#FF8E8C"
        //               }
        //           ],
        //           "storeId": "1001041797",
        //           "storeName": "瑞幸咖啡(朝林大厦店)",
        //           "distance": "<100m",
        //           "incart": false,
        //           "showCart": false,
        //           "showCartButton": false,
        //           "to": "productDetail",
        //           "params": {
        //               "bgType": "jdToStore",
        //               "orgCode": 11871165,
        //               "storeId": 1001041797,
        //               "skuId": 10054343870259
        //           },
        //           "userAction": "{\"disabledTags\":\"0\",\"minorPrice\":\"¥35\",\"storeId\":\"1001041797\",\"floorstyle\":\"product7\",\"spm_id\":\"product_list|1|1-3||||1\",\"couponSize\":2,\"minorPriceType\":\"1\",\"majorPriceType\":\"2\",\"couponType\":\"displayCoupon\",\"majorPrice\":\"¥17\",\"businessType\":2,\"secTagId\":\"1\",\"skuId\":\"10054343870259\"}",
        //           "fixedStatus": false,
        //           "showModel": 0,
        //           "iconType": 20,
        //           "monthSales": "0",
        //           "storeLogo": "https://img10.360buyimg.com/n1/jfs/t1/96643/35/30759/13262/62ea2d40E3c40a4fa/4a2053162e64b1f3.jpg",
        //           "majorPrice": {
        //               "price": "¥17",
        //               "priceType": "2",
        //               "deleteLine": false,
        //               "priceColor": "#FF1E19"
        //           },
        //           "minorPrice": {
        //               "price": "¥35",
        //               "priceType": "1",
        //               "deleteLine": true,
        //               "priceColor": "#999999"
        //           },
        //           "score": 0,
        //           "saleStatus": false,
        //           "skuType": 0,
        //           "couponVOList": [
        //               {
        //                   "markState": 2,
        //                   "showButton": false,
        //                   "couponTagVOMap": {
        //                       "2": {
        //                           "iconText": "满100减12",
        //                           "iconTextColorCode": "#FF1E19",
        //                           "strokeColorCode": "#FF8E8C"
        //                       }
        //                   }
        //               },
        //               {
        //                   "markState": 2,
        //                   "showButton": false,
        //                   "couponTagVOMap": {
        //                       "2": {
        //                           "iconText": "满15减3",
        //                           "iconTextColorCode": "#FF1E19",
        //                           "strokeColorCode": "#FF8E8C"
        //                       }
        //                   }
        //               },
        //               {
        //                 "markState": 2,
        //                 "showButton": false,
        //                 "couponTagVOMap": {
        //                     "2": {
        //                         "iconText": "满15减3",
        //                         "iconTextColorCode": "#FF1E19",
        //                         "strokeColorCode": "#FF8E8C"
        //                     }
        //                 }
        //             }
        //           ],
        //           "priceStyle": 0,
        //           "storeBusinessType": 2,
        //           "businessTimeStatus": "",
        //           "businessTag": {
        //               "type": 4,
        //               "tag": {
        //                   "businessType": 2,
        //                   "icon": "https://img30.360buyimg.com/mobilecms/jfs/t1/90394/7/31680/1556/638463f4Efa2f2086/4def6f4e95d26947.png",
        //                   "iconWidth": "26",
        //                   "iconText": "<100m",
        //                   "textColor": "#E1251B",
        //                   "bgColor": "#E1251B"
        //               }
        //           },
        //           "intervalPrice": false,
        //           "skuLongId": 10054343870259,
        //           "fromSearch": false,
        //           "recCategory": false,
        //           "index": 0,
        //           "storeJumpParam": {
        //               "to": "store",
        //               "params": {
        //                   "bgType": "jdToStore",
        //                   "storeId": "1001041797",
        //                   "orgCode": "11871165",
        //                   "skuId": "10054343870259"
        //               }
        //           }
        //       }
        //   }],
        //     "lastPage": true,
        //     "nextPageNo": 2,
        //     "tagId": "1",
        //     "flatCarAbFlag": -1
        //   },
        //   "abTest": [
        //     {
        //       "duration": "10800000",
        //       "experimentName": "rec_channel_storelist",
        //       "testTag": "rec_channel_storelist:test2:2022-12-20 10:28:54:abTestRevision"
        //     },
        //     {
        //       "duration": "10800000",
        //       "experimentName": "rec_home_storelist_rank",
        //       "testTag": "rec_home_storelist_rank:test1:2022-12-20 10:28:54:abTestRevision"
        //     },
        //     {
        //       "duration": "10800000",
        //       "experimentName": "GoodStoreGlobal",
        //       "testTag": "GoodStoreGlobal:main1:2022-12-20 10:28:54:abTestRevision"
        //     },
        //     {
        //       "duration": "10800000",
        //       "experimentName": "pengzhangquan",
        //       "testTag": "pengzhangquan:c:2022-12-20 10:28:54:abTestRevision"
        //     }
        //   ],
        //   "traceId": "4859ae8c-7c6d-4c4b-8781-18c8fc50b44c1671503333999",
        //   "umpTraceId": "1982382.48188.16715033340064658",
        //   "errorCode": "[1092,1124,1076,1020]",
        //   "success": true
        // }
        
        if (res.data.code == '0') {
          let { config = {}, data = [], lastPage = false } = res.data.result || {};
        // 假数据
        //   data = _res.result.data
          let { hotSaleTags = [] } = config;
          currentPageCache++;
          currentPage == 1 && this.resetListCache();
          let originHotSaleTags = this.data.hotSaleTags;
          let targetId = hotSaleTags[0] && hotSaleTags[0].tagId || '';
          let targetItem = originHotSaleTags.find((item) => {
            return item.tagId == targetId
          })

          //请求次数+1
          let fetchNum = this.data.fetchNum
          fetchNum++
          if(fetchNum == 1){
            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
            this.data.buriedObj || {};
            let isSlide = '-1'
            let type = 'tab'
            let traceId = this.data.pageDataTraceId
            let userAction = hotSaleTags[0] && hotSaleTags[0].userAction
            clickBuriedV2_({
              click_id: "ClickGoodsListTab",
              click_par: {
                userAction,
                // traceId,
                isSlide,
                type
              },
              currentPageName: currentPageName,
              prePageName: prePageName,
              pageId: pageIdFirstPage,
            })
           
          }
          //是否有二级分类
          if( targetItem && targetItem.hotSaleTags && targetItem.hotSaleTags.length > 0){
            let subUserAction = targetItem.hotSaleTags[0].userAction
            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
            this.data.buriedObj || {};
            let traceId = this.data.pageDataTraceId
            clickBuriedV2_({
              click_id: "hotSaleSecClassClick",
              click_par: {
                userAction: subUserAction,
                // traceId,
                state: '0',
                ceiling: 'default',

              },
              currentPageName: currentPageName,
              prePageName: prePageName,
              pageId: pageIdFirstPage,
            })
          }
          
          // 第一次请求有分类
          if (hotSaleTags[0] && hotSaleTags[0].tagId) {
            if (!isBottom || isBottom != 'isBottom') {
              this.setData({
                traceId: res.data.traceId || '',
                isLastPage: lastPage,
                subTabs: targetItem && targetItem.hotSaleTags ? targetItem.hotSaleTags : [],
                hotSaleTags: originHotSaleTags.length < 1 ? hotSaleTags : originHotSaleTags,
                activeTab: hotSaleTags[0].tagId,
                banner: hotSaleTags[0].banner || [],
                fetchNum
              }, () => {
                this.epSection && this.epSection()
              })
            } else {
              this.setData({
                isLastPage: lastPage,
                subTabs: targetItem && targetItem.hotSaleTags ? targetItem.hotSaleTags : [],
                hotSaleTags: originHotSaleTags.length < 1 ? hotSaleTags : originHotSaleTags,
                activeTab: hotSaleTags[0].tagId,
                banner: hotSaleTags[0].banner || [],
                fetchNum
              })
            }
          } else {
            if (!isBottom || isBottom != 'isBottom') {
              this.setData({
                isLastPage: lastPage,
                traceId: res.data.traceId || '',
                fetchNum
              })
            } else {
              this.setData({
                isLastPage: lastPage,
                fetchNum
              })
            }

          }
          feedsList.origin = data;
          // 资源位排序-按照ui的排
          currentPage == 1 && this.resourceSort(feedsList)
          // 商品feed排序
          this.sort(feedsList);
          // 首次请求排序完，渲染
          currentPage == 1 && this.loadCard(true)
        }else if(res.data.code == '-100'){
          this.setData({
            showDefault: true,
            defaultType: 1,
            defaultObj:res.data
            // defaultObj:{
            //   "code": "-100",
            //   "imgType": 1,
            //   "title": "数据异常",
            //   "msg": "数据接口闹小脾气了，都不服务我了呢[1032,1020]",
            //   "detail": "系统内部错误",
            //   "btnArr": [
            //       {
            //           "btnName": "重新加载",
            //           "type": 1
            //       }
            //   ],
            //   "traceId": "",
            //   "errorCode": "[1032,1020]",
            //   "success": false
            // }
          })
        }
      }).catch(() => {
        mp.hideLoading()
        // this.setData({
        //   showDefault: true,
        //   defaultType: 2,
        // })
      })
    },
    // 获取胶囊位置
    getCapsule() {
      let capsule = {
        bottom: 58,
        height: 32,
        left: 317,
        right: 404,
        top: 26,
        width: 87
      };
      try {
        // 取缓存胶囊位置信息
        capsule = wx.getStorageSync("capsule")
      } catch (err) {
        /**/ 
      }
      if (!capsule) {
        // 取全局获取的胶囊位置信息
        capsule = getApp().globalData.capsule;
        capsule.top && wx.setStorageSync("capsule", capsule)
      }
      this.setData({
        capsule: capsule
      })

    },
    // 点击tab标签
    clickTab(e) {
      let fetchNum = this.data.fetchNum
      console.log('----fetchNum-----',fetchNum)
      
      
      let { index = 0,userAction ='' } = e.currentTarget.dataset || {};
      let { tagId = '', hotSaleTags = [], banner = [] } = e.currentTarget.dataset.item || {};
      let secondIndex = hotSaleTags[0] && hotSaleTags[0].secondIndex || 0;
      let secondActiveTab = hotSaleTags[0] && hotSaleTags[0].tagId || '';

      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      let isSlide = '0'
      let type = 'tab'
      let traceId = this.data.pageDataTraceId
      clickBuriedV2_({
        click_id: "ClickGoodsListTab",
        click_par: {
          userAction,
          // traceId,
          isSlide,
          type
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })

      if (tagId !== this.data.activeTab) {
        this.setData({
          activeTab: tagId,
          secondActiveTab,
          subTabs: hotSaleTags,
          secondIndex,
          banner,
          isLastPage: false,
          anchorId: `tab_${index - 2}`
        })
        currentPageCache = 1;
        this.getSkuList(currentPageCache, tagId, true, secondActiveTab, secondIndex)
        this.getFeedsScrollTop()
      }
    },

    // 点击二级分类
    clickSecondTab(e) {
      let { tagId = '', secondIndex = 0,userAction= '' } = e.currentTarget.dataset.item || {};
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      //是否有二级分类
      let traceId = this.data.pageDataTraceId
      clickBuriedV2_({
        click_id: "hotSaleSecClassClick",
        click_par: {
          userAction,
          // traceId,
          state: '1',
          ceiling: 'default',
          
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })

      if (tagId !== this.data.secondActiveTab) {
        this.setData({
          secondActiveTab: tagId,
          secondIndex,
          isLastPage: false
        })
        let activeTab = this.data.activeTab;
        if (tagId) {
          currentPageCache = 1;
          this.getSkuList(currentPageCache, activeTab, false, tagId, secondIndex)
        }
        this.getFeedsScrollTop()
      }
    },

    // 重置缓存数据
    resetListCache() {
      feedsList = {
        origin: [],
        left: [],
        right: [],
        leftNum: 0,
        rightNum: 0
      }
    },

    // 资源位排序
    resourceSort(feedsList) {
      let lastOne = 0;
      let { left = [], right = [], origin = [] } = feedsList || {};
      origin.forEach((item, index) => {
        if (item.type === '7' || item.type === '10') {
          left.push(item)
          origin[index] = null;
          feedsList.leftNum += FEEDSHEIGHTMAP[item.type];
          item.currentHeight = feedsList.leftNum;
        } else if (item.type === '8' || item.type === '9') {
          lastOne++;
          if (lastOne == 3) {
            left.push(item);
            feedsList.leftNum += FEEDSHEIGHTMAP[item.type];
            item.currentHeight = feedsList.leftNum;
          } else {
            right.push(item);
            feedsList.rightNum += FEEDSHEIGHTMAP[item.type];
            item.currentHeight = feedsList.rightNum;
          }
          origin[index] = null
        }
      })
    },
    // 瀑布流根据高度分组
    sort({ origin = [], left = [], right = [] } = feedsList) {
      if (origin.length === 0) {
        return {
          left,
          right,
        };
      }
      let item = origin[0];
      if (item) {
        let height = FEEDSHEIGHTMAP[item.type];
        let {
          coupons = [],
          couponVOList = [],
          toHandPrice,
          majorPrice = {},
          tags = [],
          personlizedCateAttritemList = [],
          skuDesc,
        } = item.data || {};

        // 如果有促销标或者红包或者神券
        if (tags.length || (coupons && coupons.length) || (couponVOList && couponVOList.length)
        ) {
          // 券标签高度
          height += FEEDSHEIGHTMAP[item.type + ".1"];
        }

        // 排行榜或者普通推荐语挪到商品图中，不需要计算高度了
        // if (recWordsVO && recWordsVO.recWords) { // 商品标语高度
        //     height += FEEDSHEIGHTMAP[item.type + '.2']
        // }

        // 如果有会员价或者券后价或者预估到手价，换行展示
        if (
          toHandPrice ||
          majorPrice.priceType == 3 ||
          majorPrice.priceType == 4 ||
          majorPrice.priceType == 7
        ) {
          height += FEEDSHEIGHTMAP[item.type + ".3"];
        }
        // 商品属性或者功能主治||广告语
        if (personlizedCateAttritemList.length || skuDesc) {
          height += FEEDSHEIGHTMAP[item.type + ".4"];
        }

        if (feedsList.leftNum > feedsList.rightNum) {
          feedsList.rightNum += height;
          item.currentHeight = feedsList.rightNum;
          right.push(origin.splice(0, 1)[0]);
        } else {
          feedsList.leftNum += height;
          item.currentHeight = feedsList.leftNum;
          left.push(origin.splice(0, 1)[0]);
        }
      } else {
        origin.splice(0, 1)
      }

      return this.sort(feedsList);
    },
    loadCard(isRequest) {
      let { left = [], right = [] } = feedsList || {};
      let firstRenderNum = 10;
      let nextRenderNum = 8;
      if (isRequest) { // 首次渲染
        let leftList = [];
        let rightList = [];
        for (let i = 0; i < firstRenderNum; i++) {
          if (i % 2) { // 偶数
            leftList.push(left.shift())
          } else { // 奇数
            rightList.push(right.shift())
          }
        }
        this.setData({
          leftList,
          rightList
        })
      } else {
        for (let i = 0; i < nextRenderNum; i++) {
          let leftList = this.data.leftList;
          let rightList = this.data.rightList;
          let leftLen = leftList.length;
          let rightLen = rightList.length;
          let leftHeight = leftList[leftLen - 1] && leftList[leftLen - 1].currentHeight || 0;
          let rightHeight = rightList[rightLen - 1] && rightList[rightLen - 1].currentHeight || 0;
          if ((i % 2) === 0) { // 偶数
            if (leftHeight <= rightHeight) {
              let leftShiftItem = left.shift();
              if (leftShiftItem) {
                this.setData({
                  [`leftList[${leftLen}]`]: leftShiftItem
                })
              }

            }
          } else { // 奇数
            if (leftHeight >= rightHeight) {
              let rightShiftItem = right.shift();
              if (rightShiftItem) {
                this.setData({
                  [`rightList[${rightLen}]`]: rightShiftItem
                })
              }
            }
          }
        }
      }
      this.triggerEvent('onExposure', {})

    },
    // 点击广告图
    clickBanner(e) {
      let { to = '', params = [], userAction = '' } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homefeeds_clickBanner_home'
        }
      })
    },
    // 获取feeds的scrollTop
    getFeedsScrollTop() {
      this.createSelectorQuery().select('#feeds-sku').boundingClientRect((rect) => {
        this.triggerEvent("onPageScrollTo", {
          rectTop: rect && rect.top || 0,
          id: '.container >>> .feeds-sku'
        })
      }).exec()
    },
    // 关闭 吸顶的广告
    clickCloseBanner(e) {
      let { userAction = '' } = e.currentTarget.dataset.item || {};
      this.setData({
        isShowTopBanner: false
      })
      let close_time = new Date().getTime();
      wx.setStorageSync('close_home_banner_time', close_time);
      wx.setStorageSync('close_home_banner', true);
    },
    // 点击横条广告
    goToBanner(e) {
      let { to = '', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homefeeds_clickBanner_home'
        }
      })
    },
    // 获取当前页面路径
    _getHistoryPage() {
      try {
        let historyPage = getApp().globalData.historyPage || [];
        return JSON.stringify(historyPage);
      } catch (err) {
        return JSON.stringify([]);
      }
    },
  }
})

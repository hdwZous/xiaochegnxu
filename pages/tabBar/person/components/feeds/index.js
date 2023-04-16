import { request, FNIDS } from '../../../../../common/util/api'
import mp from '../../../../../common/util/wxapi'
import { djCmsJump } from '../../../../../common/util/agreementV2';
const app = getApp()
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

  /**
   * 组件的属性列表
   */
  properties: {
    resourceRequestFinished: {
      type: Boolean,
      value: false,
      observer: function (val) {
        currentPageCache = 1;
        this.getSkuList(currentPageCache, '', true)
      }
    },
    pageReachBottom: {
      type: Number,
      value: 0,
      observer: function (val) {

        setTimeout(() => {
          if (currentPageCache === 0) { // resourceRequestFinished无回调时
            currentPageCache = 1;
            this.getSkuList(currentPageCache, '', true);
            return false
          }
        }, 0)
        if (currentPageCache > 1) {
          this.loadCard();
          if (feedsList.left < 7 || feedsList.right < 7) {
            this.getSkuList(currentPageCache, this.data.secondActiveTab || this.data.activeTab)
          }
        }
      }
    },
    pageId: {
      type: String,
      value: ''
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 标题头
    title: '',
    showFeed: true,
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
    // feeds列表
    leftList: [],
    rightList: [],
    // 是否是最后一页
    isLastPage: false,
    // tab滚动中间
    anchorId: 'tab_0',
    traceId: ''
  },

  /**
  * 组件生命周期函数-在组件实例进入页面节点树时执行)
  */
  attached() {
    // 获取胶囊位置
    this.getCapsule()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取商品列表
    getSkuList(currentPage, tagId, needMenu) {
      const addrInfo = app.globalData.addressInfo
      // console.log('addressInfo---',addrInfo.latitude);
      if (this.data.isLastPage || !addrInfo.latitude) return;
      mp.loading_cover();
      // let { functionId = '', appVersion = '' } = FNIDS.recommendSku || {};
      let {pageId='',recommendObj={}} = this.data;
      request({
          // ...FNIDS.recommendSku,
          ...FNIDS.getRecommend,
          isNeedDealError: true,
          body: {
              cityId: addrInfo && addrInfo.cityId || '',
              fromSource: "5",
              platform: 3,
              "refPageSource": "",
              "coordType": 1,
              "currentPage": currentPage,
              "filterTagId": tagId || '',
              "needMenu": needMenu || false,
              "count": currentPage === 1 ? 0 : 45,
              "pageSource": "myinfo",
              "ref": "",
              "ctp": "myinfo"
          },
          content: {
              platform: 6
          },
          pageId: pageId,
          preObj: recommendObj
      }).then(res => {
        mp.hideLoading();
        if (res.data.code == '0') {
            let { config = {}, data = [], lastPage = false, nextPageNo = 1 } = res.data.result || {};
            let { hotSaleTags = [] } = config;
            let { traceId } = res.data;
            // currentPageCache++;
            currentPageCache = nextPageNo
            if(currentPage == 1) {
              this.resetListCache();
              this.setData({
                traceId
              })
            }
            // 第一次请求有分类
            if (hotSaleTags[0] && hotSaleTags[0].tagId) {
                this.setData({
                    isLastPage: lastPage,
                    subTabs: hotSaleTags[0].hotSaleTags || [],
                    hotSaleTags,
                    activeTab: hotSaleTags[0].tagId,
                    secondActiveTab: hotSaleTags[0].hotSaleTags && hotSaleTags[0].hotSaleTags[0] && hotSaleTags[0].hotSaleTags[0].tagId || '',
                    banner: hotSaleTags[0].banner || []
                })
                
            } else {
                this.setData({
                    isLastPage: lastPage,
                    title: config.title || '',
                    titleText: config.titleText || ''
                })
            }

            feedsList.origin = data;
            // 资源位排序-按照ui的排
            currentPage == 1 && this.resourceSort(feedsList)
            // 商品feed排序
            this.sort(feedsList);
            // 首次请求排序完，渲染
            currentPage == 1 && this.loadCard(true)
        }
      }).catch(err => {
        console.error(err)
        mp.hideLoading()
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
      let { index = 0 } = e.currentTarget.dataset || {};
      let { tagId = '', hotSaleTags = [], banner = [] } = e.currentTarget.dataset.item || {};
      if (tagId !== this.data.activeTab) {
        this.setData({
          activeTab: tagId,
          secondActiveTab: hotSaleTags[0] && hotSaleTags[0].tagId || '',
          subTabs: hotSaleTags,
          banner,
          isLastPage: false,
          anchorId: `tab_${index - 2}`
        })
        if (hotSaleTags[0] && hotSaleTags[0].tagId) {
          currentPageCache = 1;
          this.getSkuList(currentPageCache, hotSaleTags[0].tagId)
        } else if (tagId) {
          currentPageCache = 1;
          this.getSkuList(currentPageCache, tagId)
        }
        this.getFeedsScrollTop()
      }
    },

    // 点击二级分类
    clickSecondTab(e) {
      let { tagId = '' } = e.currentTarget.dataset.item || {};
      if (tagId !== this.data.secondActiveTab) {
        this.setData({
          secondActiveTab: tagId,
          isLastPage: false
        })
        if (tagId) {
          currentPageCache = 1;
          this.getSkuList(currentPageCache, tagId)
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
      let { recommendObj = {}} = this.data;
      let { to = '', params = [], userAction = '' } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to,
        params,
        userAction,
        preObj: recommendObj,
        buried_position: {
          currentPageName: 'tabbar-person-feed',
        }
      })
    },
    // 获取feeds的scrollTop
    getFeedsScrollTop() {
      this.createSelectorQuery().select('#feeds-sku').boundingClientRect((rect) => {
        this.triggerEvent("onPageScrollTo", {
          rectTop: rect.top || 0,
          id: '.container >>> .feeds-sku'
        })
      }).exec()
    }
  }
})

import { request, FNIDS } from '../../../../common/util/api'
import mp from '../../../../common/util/wxapi'
import { djCmsJump } from '../../../../common/util/agreementV2';
let currentPageCache = 0;
// 卡片高度
const FEEDSHEIGHTMAP = {
  // 商品基础高度
  '1': 532,
  // 商品的促销标签高度
  '1.1': 54,
  // 商品标语高度
  '1.2': 38,
  // 热门店铺高度
  '2': 614,
  // 特色商品高度
  '5': 522,
  // 轮播banner高度
  '7': 575,
  // 战略宫格高度
  '8': 276,
  // 图文宫格高度
  '9': 254
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
    pageReachBottom: {
      type: Number,
      value: 0,
      observer: function () {
        // console.log('pageReachBottom', val)
        if (currentPageCache === 0) {
          this.getSkuList(currentPageCache + 1);
          return false
        }

        if (currentPageCache > 0) {
          this.loadCard();
          if (feedsList.left < 7 || feedsList.right < 7) {
            this.getSkuList(currentPageCache)
          }
        }
      }
    },
    orderId: {
      type: String,
      value: ''
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
    },
    locOrderType: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // feeds列表
    leftList: [],
    rightList: [],
    // 是否是最后一页
    isLastPage: false,
    // 标题头
    title: '',
    showFeed: true,
    traceId: ''
  },

  /**
  * 组件生命周期函数-在组件实例进入页面节点树时执行)
  */
  attached() {
    currentPageCache = 0;
    // console.log('attached', 0)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取商品列表
    getSkuList(currentPage) {
      if (this.data.isLastPage) return;
      mp.loading_cover();
      let { functionId = '', appVersion = '' } = FNIDS.orderDetailFeeds || {};
      request({
        functionId,
        appVersion,
        isNeedDealError: true,
        body: {
          orderId: this.data.orderId || '',
          currentPage: currentPage,
          locOrderType: this.data.locOrderType
        },
        pageId: this.data.pageId || '',
        preObj: this.data.recommendObj || {}
      }).then(res => {
        mp.hideLoading();
        if (res.data.code == '0') {
          let { config = {}, data = [], lastPage = false } = res.data.result || {};
          let showFeed = true;
          currentPageCache++;
          if (currentPage == 1) {
            this.resetListCache();
            if (data.length === 0) {
              showFeed = false
            }
            this.setData({
              traceId: res.data.traceId
            })
          }
          this.setData({
            isLastPage: lastPage,
            title: config.title || '',
            titleText: config.titleText || '',
            showFeed
          })

          feedsList.origin = data;
          // 资源位排序-按照ui的排
          currentPage == 1 && this.resourceSort(feedsList)
          // 商品feed排序
          this.sort(feedsList);
          // 首次请求排序完，渲染
          currentPage == 1 && this.loadCard(true)
        }
      }).catch(() => {
        // console.error(err)
        mp.hideLoading()
      })
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
        if (item.type === '7') {
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
        let { coupons = [], couponVOList = [], recWordsVO = {} } = item.data || {};
        if ((coupons && coupons.length) || (couponVOList && couponVOList.length)) { // 券标签高度
          height += FEEDSHEIGHTMAP[item.type + '.1']
        }
        if (recWordsVO && recWordsVO.recWords) { // 商品标语高度
          height += FEEDSHEIGHTMAP[item.type + '.2']
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
      let firstRenderNum = 6;
      let nextRenderNum = 4;
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
      // console.log('leftList', this.data.leftList)
      // console.log('rightList', this.data.rightList)
    },
    // 点击广告图
    clickBanner(e) {
      let { recommendObj } = this.data;
      let { to = '', params = [], userAction = '' } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to,
        params,
        userAction,
        preObj: recommendObj
      })
    }
  }
})

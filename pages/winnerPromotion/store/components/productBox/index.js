import { winnerProduct, searchByCategoryPost } from "../../../services/index";
import { clickLog } from "../../../utils/log";

Component({
  properties: {
    storeId: {
      type: String,
    },
    orgCode: {
      type: String,
    },
    curIndex: { // 展开分类数组的index
      type: String
    },
    currentCate: { // 当前查询分类
      type: Object,
      observer: function (newVal) {
        this.setData({
          showList: [],
          productList: [],
          originalList: [],
          sortKey: "",
          priceWay: -1,
          bottomText: ""
        });
        this.fetchProduct();
      },
    },
    curSwiperIndex: { // 当前展示swiper
      type: String
    }
  },
  data: {
    showList: [], // 展示列表
    productList: [], // 筛选过的列表
    originalList: [], // 获取到的列表

    pageYStart: 0,// 起始滑动位置

    sortKey: "", // 选中筛选
    priceWay: -1, // 价格排序方式
    bottomText: "", // 底部文案
  },
  methods: {
    // 根据分类获取商品
    async fetchProduct() {
      const { storeId, orgCode, currentCate } = this.properties;
      console.log(currentCate);
      let res;
      //  -2为高佣商品推荐
      if (currentCate.catId != -2) {
        res = await searchByCategoryPost({
          storeId: storeId,
          orgCode: orgCode,
          catIds: [
            { ...currentCate },
          ],
          pageSource: "store",
          ctp: "storeinfo",
          showSoldOutSkus: false,
          needPreSell: false,
        });

      } else {
        res = await winnerProduct({
          storeId: storeId,
          orgCode: orgCode,
          catId: currentCate.catId,
        });
      }

      if (res.result.searchCatResultVOList.length > 0) {
        this.setData({
          productList: res.result.searchCatResultVOList[0].searchResultVOList,
          originalList: [
            ...res.result.searchCatResultVOList[0].searchResultVOList,
          ],
          bottomText: "上滑打开下一个分类"
        });
      } else {
        this.setData({ productList: [], originalList: [], bottomText: '上滑打开下一个分类' });
      }

      this.addList();
    },
    // 把十个商品放进showList中
    addList() {
      const { showList, productList } = this.data;

      if (showList.length !== productList.length) {
        this.setData({
          showList: [
            ...showList,
            ...productList.slice(0 + showList.length, 10 + showList.length),
          ],
        });
      }
    },
    // 点击销量筛选
    handleClickSaleSort() {
      const { sortKey, productList, originalList } = this.data;

      if (sortKey === "monthSaleSortIndex") {
        this.setData({
          sortKey: "",
          priceWay: -1,
          showList: [],
          productList: originalList,
        });
        this.addList();
      } else {
        this.setData({
          sortKey: "monthSaleSortIndex",
          priceWay: -1,
          showList: [],
          productList: productList.sort((a, b) => b.monthSales - a.monthSales),
        });
        this.addList();
      }
    },
    // 点击价格筛选 点击依次 -1 > 0 > 1循环播放 
    handleClickPriceSort() {
      const { priceWay, productList, originalList } = this.data;
      this.setData({
        sortKey: priceWay == 1 ? "" : "priceSortIndex",
        priceWay: priceWay == 1 ? -1 : priceWay == 0 ? 1 : 0,
      });
      // 0为降序
      if (this.data.priceWay == 0) {
        this.setData({
          showList: [],
          productList: productList.sort(
            (a, b) => b.majorPrice.price - a.majorPrice.price
          ),
        });
        this.addList();
      }
      // 1为升序
      if (this.data.priceWay == 1) {
        this.setData({
          showList: [],
          productList: productList.sort(
            (a, b) => a.majorPrice.price - b.majorPrice.price
          ),
        });
        this.addList();
      }
      // -1为无序
      if (this.data.priceWay == -1) {
        this.setData({
          showList: [],
          productList: [...originalList],
        });
        this.addList();
      }

      clickLog('winner_store_info_page__click_filter', { state: '价格', priceWay: this.data.priceWay })
    },
    // 滑动切换商品分类
    changeSwiper(e) {
      console.log('changeSwiper', e, this.data.curSwiperIndex)

      // 屏蔽非人类操作
      if (e.detail.source == "") return;

      this.triggerEvent('changeSwiper', { ...e.detail })
    },
    // 滑动前 记录滑动位置
    beforeMove(e) {
      // console.log(e)
      // 记录滑动初始位置 在第一个和最后一个分类用于阻止滑动
      if (e.type === "touchstart") {
        this.setData({
          pageYStart: e.touches[0].pageY
        })
      }
    },
    // 根据分类和滑动位置 判断是否可滑动
    preventMove(e) {
      const { pageYStart, curIndex } = this.data
      console.log(e.touches[0].pageY, pageYStart)
      if (e.type !== "touchmove") return
      // 上滑 且curIndex为0
      if (e.touches[0].pageY < pageYStart && curIndex == 0) return false
    },
    // 还原起始位置
    afterMove(e) {
      this.setData({
        pageYStart: 0
      })
    }
  },
});

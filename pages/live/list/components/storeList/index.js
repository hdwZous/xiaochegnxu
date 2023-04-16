import { request, FNIDS } from "../../../../../common/util/api";
const app =  getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    reachBottom: {
      type: Boolean,
      value: false,
      observer: function () {
        if (this.data.hasNextPage) {
          this.setData({
            currentPage: this.data.currentPage + 1,
          });
          this.fetchRecommendStores();
        }
      },
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
  },
  data: {
    storeList: [],
    floorName: "",
    currentPage: 1,
    hasNextPage: true,
    traceId: "",
  },
  attached() {
    this.fetchRecommendStores();
  },
  methods: {
    fetchRecommendStores() {
      let addressInfo =
        app.globalData.addressInfo || wx.getStorageSync("address_info");
      let { refPageSource = "", pageIdFirstPage = "" } = this.data.recommendObj;
      request({
        ...FNIDS.nearbyStore,
        method: "POST",
        isForbiddenDialog: true,
        isNeedDealError: true,
        body: {
          city: addressInfo.cityName || "",
          areaCode: addressInfo.cityId || "",
          longitude: addressInfo.longitude || "",
          latitude: addressInfo.latitude || "",
          coordType: "2",
          address: addressInfo.poi || "",
          currentPage: this.data.currentPage || 1,
          pageSize: 10,
          refPageSource,
          rankType: 0,
          filterTagIds: ""
        },
        pageId: pageIdFirstPage,
        preObj: this.data.recommendObj || {},
      })
        .then((res) => {
          let { code, result, traceId } = res.data || {};
          if (code == 0 && result.data) {
            let data = result.data.data || [];
            if (data.length == 0) {
              this.setData({
                hasNextPage: false,
              });
              return;
            }
            let obj = {
              storeList: this.data.storeList.concat(data)
            };
            if (this.data.currentPage == 1) {
              obj.traceId = traceId;
              obj.floorName = result.data.floorTitle && result.data.floorTitle.floorName || "附近商家"
            }
            this.setData(obj);
          }
        })
        .catch(() => {});
    },
  },
});

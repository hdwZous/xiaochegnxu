import { request, FNIDS } from "../../../../../../common/util/api";
import { clickBuriedV2_ } from "../../../../../../common/util/BI";
const app = getApp()

Component({
  properties: {
    allData: {
      type: Object, //所有数据（包括storeId，orgCode等）
      value: {},
      observer: function(val) {
        if (val && this.data.visible) {
          this.handleInitData(val);
        }
      },
    },
    type: {
      type: String, //类型
      value: "gift", // wholestoreexchange 全场换购  exchange 换购 gift 满赠
    },
    visible: {
      type: Boolean,
      value: false,
      observer: function(val) {
        if (val) {
          // console.log('allData',this.data.allData)
          this.handleInitData(this.data.allData);
        }
      },
    },
    fromMinicart: {
      type: Boolean,
      value: false
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
    pageSource: {
      type: String,
      value: ''
    },
    refPageSource: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    }
  },
  data: {
    initData: {}, //列表数据
    checkedData: [], //选中的列表数据
    isIpx: getApp().globalData.isIpx
  },
  ready() {},
  methods: {
    // 选择按钮状态处理
    handleCheckStatus(arr) {
      if (Array.isArray(arr)) {
        arr.forEach((item) => {
          if (item.checkType == 1) {
            item.checkStatus = "checked";
          } else {
            if (!item.canUse || item.skuState == 0 || item.skuState == 2) {
              item.checkStatus = "disabled";
            } else {
              item.checkStatus = "unchecked";
            }
          }
        });
      }
    },
    // 获取初始数据
    handleInitData(obj) {
      // console.log('obj',obj,this.data.type)
      if (Array.isArray(obj.itemList)) {
        let initData = [];
        if (this.data.type == "wholestore") {
          //如果类型是全场
          initData = obj.itemList.filter(
            (item) => item.suitType == "wholestoreexchange"
          );
          if (initData.length == 0) {
            initData = obj.itemList.filter(
              (item) => item.suitType == "wholestoregift"
            );
          }
        } else {
          initData = obj.itemList.filter(
            (item) => item.suitType == this.data.type
          );
        }
        if (initData.length > 0) {
          this.handleCheckStatus(initData[0].giftList);
          this.setData(
            {
              initData: initData[0],
            },
            () => {
              //console.log('---->',this.data.initData)
              this.handleCheckedData(this.data.initData.giftList);
            }
          );
        } else {
          this.setData({
            initData: {},
          });
        }
      }
    },
    // 处理选中的数据
    handleCheckedData(arr) {
      let checkedData = arr
        .filter((item) => item.checkStatus == "checked")
        .map((item) => {
          let obj = {};
          obj.skuId = item.skuId;
          obj.ladderId = item.ladderId;
          obj.giftFlag = item.giftFlag;
          return obj;
        });
      this.setData(
        {
          checkedData,
        },
        () => {
          // console.log('checkedData',this.data.checkedData)
          if (
            this.data.checkedData.length == this.data.initData.giftCanChooseNum
          ) {
            //选择数量到达上限时候限制选择
            this.data.initData.giftList.forEach((item) => {
              if (item.checkStatus != "checked") {
                item.checkStatus = "disabled";
              }
            });
            this.setData({
              initData: this.data.initData,
            });
          } else {
            this.data.initData.giftList.forEach((item) => {
              if (item.checkStatus != "checked") {
                if (!item.canUse || item.skuState == 0 || item.skuState == 2) {
                  item.checkStatus = "disabled";
                } else {
                  item.checkStatus = "unchecked";
                }
              }
            });
            this.setData({
              initData: this.data.initData,
            });
          }
        }
      );
    },
    // 关闭弹层
    close() {
      // this.setData({
      //   visible:false
      // })
      this.triggerEvent("close");
    },
    // 去凑单
    goToLandpage() {
      if (this.data.initData.tradePieceOffDesc && this.data.initData.params) {
        const {
          skuIds,
          promotionId,
          stationRange,
          storeId,
          orgCode,
          totalPriceValue,
          totalSkuCount,
        } = this.data.initData.params;
        wx.navigateTo({
          url: `/pages/addOn/landPage/collectOrderList/index?skuIds=${skuIds.join(
            ","
          )}&promotionId=${promotionId}&stationRange=${stationRange}&storeId=${storeId}&orgCode=${orgCode}&totalPriceValue=${totalPriceValue}&totalSkuCount=${totalSkuCount}`,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'minicart_giftpop_goToLandpage'
          }
        });
        // 从全局购物车进入其他页面时，全局记录storeId,以便返回时单一刷新
        if (!this.data.fromMinicart) {
          app.globalData.refreshShopid = storeId
        }
      }
    },
    // 选择
    handleSelect(e) {
      // console.log(e)
      let { index, item } = e.currentTarget.dataset;
      let initData = JSON.parse(JSON.stringify(this.data.initData))
      if (item.checkStatus == "unchecked") {
        initData.giftList[index].checkStatus = "checked";
        this.setData(
          {
            initData: initData,
          },
          () => {
            this.handleCheckedData(this.data.initData.giftList);
          }
        );
      } else if (item.checkStatus == "checked") {
        initData.giftList[index].checkStatus = "unchecked";
        this.setData(
          {
            initData: initData,
          },
          () => {
            this.handleCheckedData(this.data.initData.giftList);
          }
        );
      }
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'ClickRepurchaseGoods',
        click_par: {
          storeId: this.data.allData.storeId,
          skuId: item.skuId,
          selected: item.checkStatus == "unchecked" ? 1 : 0
        },
        currentPageName: this.data.buriedObj.currentPageName || '',
        prePageName: this.data.buriedObj.prePageName || '',
        pageId: this.data.buriedObj.pageIdFirstPage || ''
      })
    },
    // 确定
    handleAddGift(e) {
      let { btnFlag } = e.currentTarget.dataset
      if (!btnFlag) return
      let requestData = {};
      let { allData } = this.data;
      let activityId = [];
      if (this.data.type == "wholestore") {
        //如果类型是全场
        activityId = allData.itemList.filter(
          (item) => item.suitType == "wholestoreexchange"
        );
        if (activityId.length == 0) {
          activityId = allData.itemList.filter(
            (item) => item.suitType == "wholestoregift"
          );
        }
      } else {
        activityId = allData.itemList.filter(
          (item) => item.suitType == this.data.type
        );
      }
      requestData.storeId = allData.storeId;
      requestData.orgCode = allData.orgCode;
      requestData.specialNumType = allData.specialNumType;
      requestData.gifts = this.data.checkedData;
      requestData.infoId = activityId[0].activityId;
      requestData.fromSource = 5;
      requestData.cartOpenFlag = true;
      let { functionId, appVersion } = FNIDS.addGift;
      request({
        method: "GET",
        functionId,
        appVersion,
        body: requestData,
        pageId: this.data.pageId
      }).then((res) => {
        // console.log('res',res)
        if (res && res.data && res.data.code == 0) {
          this.triggerEvent("addGiftSuccess");
        }
      });
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'ClickRepurchaseResult',
        click_par: {
          storeId: this.data.allData.storeId,
          type: this.data.checkedData.length ? 1 : 0
        },
        currentPageName: this.data.buriedObj.currentPageName || '',
        prePageName: this.data.buriedObj.prePageName || '',
        pageId: this.data.buriedObj.pageIdFirstPage || ''
      })
    },
  },
});

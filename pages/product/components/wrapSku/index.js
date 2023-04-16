import { djCmsJump } from "../../../../common/util/agreementV2";
import { updateGoodsNum } from "../../../../common/util/carService";
import { clickBuriedV2_ } from "../../../../common/util/BI";

Component({
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer(val) {
        if (val && val.suitLandSkus && val.suitLandSkus.length) {
          let activityIdBure = "";
          val.suitLandSkus.map((item) => {
            this.data.relation[item.activityId] = item;
            activityIdBure += `${item.activityId};`;
          });
          let {
            currentPageName = "",
            prePageName = "",
            pageIdFirstPage = "",
          } = this.data.recommendObj;
          clickBuriedV2_({
            click_id: "product/detailV6_0",
            click_par: {
              skuId: this.data.skuId,
              storeId: this.data.storeId,
              activeId: activityIdBure,
              traceId: this.data.traceId || "",
            },
            currentPageName,
            prePageName,
            pageId: pageIdFirstPage,
          });
          this.setData({ activityIdBure });
          if (this.data.activeTab == null) {
            this.setData({
              activeTab: val.suitLandSkus[0],
            });
          }
        }
      },
    },
    orgCode: {
      type: String,
      value: "",
    },
    storeId: {
      type: String,
      value: "",
    },
    skuId: {
      type: String,
      value: "",
    },
    updateCart: {
      type: Object,
      value: {},
      observer: function (val) {
        let { type = "", data = {} } = val || {};
        if (type) {
          let list = this.data.data.suitLandSkus || [];
          let str = "data.suitLandSkus";
          updateGoodsNum(this, list, val, str);
          if (
            type === "clear" ||
            (data.activityId &&
              data.activityId == this.data.activeTab.activityId)
          ) {
            this.setData({
              ["activeTab.cartNum"]: type === "clear" ? 0 : data.cartNum,
            });
          }
        }
      },
    },
    // 是否直接加车 1 弹出spu弹层
    iconType: {
      type: Number,
      value: 0,
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    traceId: {
      type: String,
      value: "",
    },
    options: {
      type: Object,
      value: {},
    },
    transmitData: {
      type: Object,
      value: {},
    },
    showModel: {
      type: Number,
      value: 0,
    },
    spuDetailResult: {
      type: Object,
      value: null,
      observer: function (val) {
        try {
          if (this.data.iconType == 1 && val && JSON.stringify(val) != "{}") {
            this.setData({
              isSpu: true,
            });
          }
        } catch (error) {}
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showStateName: "购买套装",
    relation: {},
    activeTab: null,
    isSpu: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击商品
    goToDetail(e) {
      let {
        to = "",
        params = {},
        userAction = "",
      } = e.currentTarget.dataset.item || {};
      if (to) {
        djCmsJump({
          to,
          params: params || {},
          userAction,
          traceId: this.data.traceId || "",
          preObj: this.data.recommendObj,
          buried_position: {
            key: "product-wrapSku",
            options: this.data.options,
          },
        });
      }
    },
    selectTab(e) {
      let { activityId = "" } = e.currentTarget.dataset;
      // let activeTab = this.data.relation[activityId]
      // activeTab.skuInfoList = activeTab.skuInfoList.slice(0,3)
      // this.setData({
      //   activeTab
      // })
      this.setData({
        activeTab: this.data.relation[activityId],
      });
    },
  },
});

import {
  FNIDS,
  request
} from "../../../../common/util/api";
import {clickBuriedV2_}  from '../../../../common/util/BI.js';
import { djCmsJump } from "../../../../common/util/agreementV2";
Component({
  lazyObj: {
    epSelector: ".recommends .ep_recommend-good-item",
  },
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    skuId: {
      type: String,
      value: "",
    },
    storeId: {
      type: String,
      value: "",
      observer: function (val) {
        val && this.getRecommendSku();
      },
    },
    orgCode: {
      type: String,
      value: "",
    },
    skuDataSync: {
      type: Object,
      observer: function (val) {
        let { data = {}, type = "" } = val || {};
        if (type === "clear") {
          let list = this.data.recommendSkuVOList || [];
          list.forEach((item, index) => {
            this.setData({
              [`recommendSkuVOList[${index}].incartCount`]: 0,
            });
          });
        } else if (type === "min" || type === "add") {
          if (data.skuId) {
            let list = this.data.recommendSkuVOList || [];
            list.forEach((item, index) => {
              if (data.skuId == item.skuId) {
                this.setData({
                  [`recommendSkuVOList[${index}].incartCount`]: data.cartNum,
                });
              }
            });
          }
        }
      },
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
  },

  attached() {},
  pageLifetimes: {
    hide() {},
  },

  /**
   * 组件的初始数据
   */
  data: {
    dimensionName: "",
    recommendSkuVOList: [],
    traceId: "",
    NeedExposure: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取推荐商品
    getRecommendSku() {
      let {
        pageIdFirstPage,
        pageSource,
        refPageSource,
        preUserAction,
        preTraceId,
      } = this.data.recommendObj || {};
      request({
        ...FNIDS.recommendSkus,
        method: "POST",
        pageId: pageIdFirstPage || "",
        body: {
          skuId: this.data.skuId,
          storeId: this.data.storeId,
          venderId: this.data.orgCode,
          pageSource: pageSource || "productDetail",
          refPageSource: refPageSource || "",
          ref_par: {
            userAction: preUserAction || "",
            traceId: preTraceId || "",
          },
        },
        preObj: this.data.recommendObj || {},
      })
        .then((res) => {
          if (res.data.code == "0") {
            let result = res.data.result || {};
            if (
              result &&
              result.dimensionsResultVOList &&
              result.dimensionsResultVOList.length > 0
            ) {
              if (
                result.dimensionsResultVOList[0].recommendSkuVOList &&
                result.dimensionsResultVOList[0].recommendSkuVOList.length > 0
              ) {
                this.setData(
                  {
                    dimensionName:
                      result.dimensionsResultVOList[0].dimensionName,
                    recommendSkuVOList:
                      result.dimensionsResultVOList[0].recommendSkuVOList,
                    traceId: res.data.traceId || "",
                  },
                  () => {
                    this.epSection && this.epSection();
                  }
                );

                // 记录周期
              }
            }
          }
        })
        .catch(() => {});
    },
    // 去商品详情
    goToDetail(e) {
      let data = e.currentTarget.dataset;
      let {
        currentPageName = "",
        prePageName = "",
        pageIdFirstPage = "",
      } = this.data.recommendObj;
      clickBuriedV2_({
        click_id: "clickSku",
        click_par: {
          skuId: data.skuId,
          spuId: data.spuId,
          is_spu: !!data.showModel,
          storeId: this.data.storeId,
          userAction: data.userAction || "",
          traceId: this.data.traceId || "",
        },
        currentPageName,
        prePageName,
        pageId: pageIdFirstPage,
      });
      djCmsJump({
        to: "productDetail",
        params: {
          orgCode: data.orgCode,
          storeId: data.storeId,
          skuId: data.skuId,
        },
        userAction: data.userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.recommendObj,
        buried_position: {
          key: "product-recommendSku-goToDetail",
          options: this.data.options,
        },
      });
    },
    // 监听加减车
    onAddMinControllerChange(e) {
      let { type = "", data = {} } = e.detail || {};
      this.triggerEvent("onAddMinControllerChange", {
        type,
        data,
      });
    },
  },
});

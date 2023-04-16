/* eslint-disable camelcase */
import { updateGoodsNum } from '../../../../common/util/carService'
import { request, FNIDS } from '../../../../common/util/api';
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ipx: {
      type: Boolean,
      value: false
    },
    isShow: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          this.setData({
            isInShow: true
          })
          clickBuriedV2_({
            click_id: 'showLayer',
            click_par: {
              type: 'required',
              storeId: this.data.storeId
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
            currentPageName: this.data.recommendObj.currentPageName,
            prePageName: this.data.recommendObj.prePageName
          })
        }
      }
    },
    requiredCategoryData: {
      type: Object,
      value: {},
      observer: function (val) {
        console.log(val);
      }
    },
    recommendObj: {
      type: Object,
      value: {}
    },
    storeId: {
      type: String,
      value: ''
    },
    orgCode: {
      type: String,
      value: ''
    },
    upDateGoods: {
      type: Object,
      value: {},
      observer: async function (news) {
        if (news && news.type) {
          let isConfirm = false
          await updateGoodsNum(this, this.data.requiredCategoryData.data.productList, news, `requiredCategoryData.data.productList`)
            .then(() => {
              this.data.requiredCategoryData.data.productList.map((item) => {
                if (item.incartCount > 0) {
                  isConfirm = true
                }
              })
            })
          this.setData({
            isConfirm
          })
        }
      }
    },
    orderPageId: {
      type: String,
      value: ''
    }
  },
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    isConfirm: false,
    isInShow: true,
    count: 0,
    orderListArr: [],
    preSaleSkuInfos: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirm () {
      if (this.data.isConfirm) {
        this.close()
        this.triggerEvent('handleMustOrderConfirm', this.data.requiredCategoryData)
      } else {
        console.log('需要选择必选商品');
      }
      clickBuriedV2_({
        click_id: 'clickLayer',
        click_par: {
          type: 'required',
          storeId: this.data.storeId,
          btnName: 'confirm'
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        currentPageName: this.data.recommendObj.currentPageName,
        prePageName: this.data.recommendObj.prePageName
      })
    },
    close () {
      this.setData({
        isInShow: false
      })
    },
    addMinControllerChange () {
      console.log('debugger');
    },
    onAddMinControllerChange () {
      console.log('debugger');
    },
    add (e) {
      const { item } = e.currentTarget.dataset
      let { functionId = "", appVersion = "" } = FNIDS.addProductCheck;
      let params = {
        orgCode: this.data.orgCode,
        storeId: this.data.storeId,
        orderPageId: this.data.orderPageId,
        checkProductList: [
          {
            skuId: item.skuId,
            num: (item.incartCount++)
          }
        ]
      }

      request({
        functionId,
        colorFunctionId: 'dj_marketsettle_addProductCheck',
        method: 'POST',
        appVersion,
        body: params,
        pageId: this.data.recommendObj.pageIdFirstPage,
        preObj: this.data.recommendObj
      }).then((res) => {
        if (res.data.code == 0) {
          this.data.requiredCategoryData.data.productList.map((ele) => {
            if (ele.skuId == item.skuId) {
              ele.incartCount++
            }
          })
          this.setData({
            isConfirm: true,
            requiredCategoryData: this.data.requiredCategoryData
          })
        } else {
          // todo 弹个toast
        }
      })
    },
    min (e) {
      const { item } = e.currentTarget.dataset
      let isConfirm = false
      this.data.requiredCategoryData.data.productList.map((ele) => {
        if (ele.skuId == item.skuId && ele.incartCount > 0) {
          ele.incartCount--
        }
      })
      this.data.requiredCategoryData.data.productList.map((ele) => {
        if (ele.incartCount > 0) {
          isConfirm = true
        }
      })
      this.setData({
        isConfirm: isConfirm,
        requiredCategoryData: this.data.requiredCategoryData
      })
    },
    // todo 增加返回事件
    goBack () {
      clickBuriedV2_({
        click_id: 'clickLayer',
        click_par: {
          type: 'required',
          storeId: this.data.storeId,
          btnName: 'return'
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        currentPageName: this.data.recommendObj.currentPageName,
        prePageName: this.data.recommendObj.prePageName
      })
      wx.navigateBack()
    }
  }
})

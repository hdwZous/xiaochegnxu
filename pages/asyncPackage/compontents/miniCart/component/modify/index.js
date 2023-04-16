import { updatePageNums, _changeItemNum } from '../../../../../../common/util/carService'
import emitter from '../../../../../../common/util/events'
import mp from '../../../../../../common/util/wxapi'
import { clickBuriedV2_ } from '../../../../../../common/util/BI'
Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    infos: {
      type: Object,
      value: {},
      observer(vals) {
        if (vals && vals.count) {
          this.setData({ number: vals.count })
        }
      }
    },
    // 10 或者 null 或者不传为mini购物车, 20为全局购物车
    cartType: {
      type: Number,
      value: null
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
    refPar: {
      type: Object,
      value: null
    }
  },
  data: {
    number: 1,
    isFocus: true,
    isEmpty: false
  },
  methods: {
    minus() {
      let number = this.data.number - 1
      if (number === 0) {
        mp.toast({
          title: '商品数量最少为1件哦',
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.setData({ number })
    },
    add() {
      let number = this.data.number + 1
      if (number > 999) {
        number = 999
      }
      this.setData({ number })
    },
    obInput(e) {
      let value = e.detail.value
      if (value !== '') {
        if (value == 0) value = 1
        this.setData({ number: value })
        this.data.isEmpty && this.setData({ isEmpty: false })
      } else {
        this.setData({ isEmpty: true })
      }

    },
    agreement() {
      const subItem = this.data.infos.subItem
      // 修改了
      const isChange = this.data.number !== this.data.infos.count
      if (isChange) {
        if (subItem.prescriptionTag && subItem.prescriptionTag.prescriptionId) {
          this.triggerEvent('isPrescriptions', { subItem, type: 1, source: 'modify' }, { composed: true, bubbles: true })
          // 监听 confirmChangeSku 方法是否触发
          emitter.addListener("confirmChangeSku", () => {
            this.handleAgreement()
          });
          this.close()
        } else {
          this.handleAgreement()
        }
      } else {
        this.close()
      }
    },

    handleAgreement() {
      if (!this.data.isEmpty) {
        let { spuId = '', skuId = '', showModel = 0, activityId = '', orgCode = '', storeId = '',
          lat = '', lng = '', couponId = '', limitFlag = 0, skuList = [],
          skuServiceList = [], limitGroup = false } = this.data.infos
        let body = {};
        let storeInfo = { storeId, orgCode, lat, lng };
        let combinaSkus = []
        let { pageSource = '', refPageSource = '' } = this.data
        // 套装
        if (activityId) {
          skuList.forEach((item) => {
            combinaSkus.push({ id: item.skuId, num: item.skuCount || item.cartNum });
          });
          body = {
            skus: [],
            combinationSkus: [
              {
                activityId,
                num: this.data.number,
                skus: combinaSkus,
              },
            ],
            cartOpenFlag: true,
          };
        } else {
          // 单个商品
          body = {
            isReturnCart: true,
            skus: [
              {
                id: skuId,
                num: this.data.number,
                spuId: showModel == 1 ? spuId : "",
                purchaseLimitHotSale: limitGroup, // 是否是限购商品
                skuServiceList: skuServiceList // 8.7.5新增--增值服务需求
              },
            ],
            showedPurchaseLimitHotSalePopupVo: !(limitFlag <= 0), // 是否展示过限购弹层
            couponId: couponId, // '101373052',
            incrementFlag: showModel == 1 ? true : false,
          };
        }
        let params = Object.assign({}, storeInfo, body, { cartType: this.data.cartType }, { pageSource, refPageSource }, { ref_par: this.data.refPar });
        _changeItemNum(params, this.data.pageId).then(res => {
          if (res.data.code == 0 || res.data.code == 88888) {
            this.dealInfos(res, skuId, spuId, orgCode, storeId, activityId, this.data.number)
            this.triggerEvent('closeModify', { refreshCar: true, result: res.data.result })
          } else {
            mp.toast({
              title: res.data.msg,
              duration: 2000,
            });
            this.close()
          }
        }).catch(err => {
          mp.toast({
            title: (err.data && err.data.msg) || '接口异常',
            duration: 2000,
          });
          this.close()
        })
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "click_add",
          click_par: {
            type: 'batch',
            storeId,
            skuId: activityId ? '' : skuId,
            activityId: activityId ? activityId : '',
            amt: this.data.number,
            userAction: this.data.infos.userAction
          },
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId
        })
      } else {
        this.close()
      }
    },

    close() {
      this.triggerEvent('closeModify')
    },
    dealInfos(res, skuId, spuId, orgCode, storeId, activityId, cartNum) {
      // 处理需要更新的商品信息
      let spuNum = (spuId && res.data && res.data.result && res.data.result.spuNumMap && res.data.result.spuNumMap[spuId]) || 0
      let data = {
        skuId,
        spuNum,
        spuId,
        orgCode,
        storeId,
        activityId,
        cartNum
      }
      updatePageNums({
        type: 'add',
        data
      })
    }
  }
});

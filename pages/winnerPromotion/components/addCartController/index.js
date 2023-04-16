// TODO 商品是否根据重量计算
// TODO 判断是否展示选规格的弹层，本期不做
// TODO 按重量计量，待确认是否要做

import { cartItemNumChange, cartItemRemove } from '../../services/index'
import { djGetLocation } from '../../utils/modules/dj_wx_mini_util'
import eventbus from '../../utils/eventbus'
import { clickLog } from '../../utils/log'

const CART_OPS_TYPE = {
  add: 'add',
  subtract: 'min',
}

Component({
  properties: {
    // 来源：cart-购物车 store-门店商品列表
    source: {
      type: String,
      value: '',
    },
    count: {
      type: Number,
      value: 0,
    },
    skuId: {
      type: String,
      value: '',
    },
    skuName: {
      type: String,
      value: '',
    },
    spuId: {
      type: String,
      value: '',
    },
    storeId: {
      type: String,
      value: '',
    },
    orgCode: {
      type: String,
      value: '',
    },
    // 是否加车
    isAddCart: {
      type: Boolean,
      value: false,
      observer: function (value) {
        value && this.handleAdd()
      },
    },
  },
  data: {
    loading: false, // 防止重复加减车
  },
  lifetimes: {
    attached: function () {
      eventbus.listen('CART_CHANGE', this, (value) => {
        let product
        const { skuId, skuName } = this.data
        const { itemList } = value
        if (!itemList || itemList.length === 0) {
          this.setData({ count: 0 })
          return
        }
        itemList.forEach(item => {
          item.skuList.forEach(sku => {
            if (sku.skuId === skuId) product = sku
          })
        })
        this.setData({ count: product ? product.cartNum : 0 })
      })
    },
    detached: function () {
      eventbus.cancel('CART_CHANGE', this)
    },
  },
  methods: {
    setLoading(loading) {
      this.setData({ loading })
    },
    // 加减车
    async updateCart(skuId, cartNum) {
      const { latitude, longitude } = await djGetLocation()
      const { storeId, orgCode } = this.data
      const storeInfo = {
        storeId,
        orgCode,
        lat: latitude,
        lng: longitude,
      }

      const res = await cartItemNumChange({
        ...storeInfo,
        isReturnCart: true,
        skus: [
          {
            id: skuId,
            num: cartNum,
          },
        ],
      })
      if (+res.code !== 0) {
        wx.showModal({
          content: res.msg,
          showCancel: false,
        })
        return
      }
      this.setData({ count: cartNum })
      eventbus.dispatch('CART_CHANGE', res.result)
    },
    async removeCart() {
      const { latitude, longitude } = await djGetLocation()
      const { skuId, storeId, orgCode } = this.data

      let params = {
        storeId,
        orgCode,
        lat: latitude,
        lng: longitude,
        chgNumReturnType: 0,
        isReturnCart: true,
        isAdd: false,
        skus: [{ id: skuId }],
      }

      const res = await cartItemRemove(params)
      if (+res.code !== 0) {
        wx.showModal({
          content: res.msg,
          showCancel: false,
        })
        return
      }
      eventbus.dispatch('CART_CHANGE', res.result)
      // this.setData({ count: 0 })

      // // 更新购物车
      // this.setData({
      //   scopeCount: 0,
      //   cartWeight: this.data.weighting ? '0g' : null,

      // });
      // // 通知购物车变化
      // this._cartHasChange(type);
    },
    handleAdd() {
      const { skuId, count, loading } = this.data

      if (loading) return
      this.setLoading(true)
      clickLog('winner_store_info_page__click_add', { skuId, count })
      this.updateCart(skuId, count + 1, CART_OPS_TYPE.add)
        .then(() => this.setLoading(false))
        .catch((err) => { this.setLoading(false); console.log(err) })
    },
    handleSubtract() {
      const { skuId, source, loading, count } = this.data
      if (loading) return
      this.setLoading(true)
      clickLog('winner_store_info_page__click_reduce', { skuId, count })
      if (count > 1) {
        this.updateCart(skuId, count - 1, CART_OPS_TYPE.subtract)
          .then(() => this.setLoading(false))
          .catch(() => this.setLoading(false))
        return
      }


      if (source === 'cart') {
        wx.showModal({ content: '你确定删除此商品吗？', })
          .then((res) => {
            res.confirm &&
              this.removeCart()
                .then(() => this.setLoading(false))
                .catch((_) => this.setLoading(false))
          })
          .catch((_) => this.setLoading(false))
        return
      }

      this.removeCart()
        .then(() => this.setLoading(false))
        .catch((_) => (this.setLoading(false), console.log(_)))
    },

    // getWeight(goodList, skuId, cartNum) {
    //   let cartWeight = null
    //   if (this.data.weighting) {
    //     if (goodList && goodList.length && cartNum) {
    //       goodList.find(item => {
    //         if (item.suitType !== 'invalidate' && item.suitType !== 'combination') {
    //           return item.skuList.find(subItem => {
    //             if (subItem.skuId == skuId) {
    //               return cartWeight = subItem.showInfoOnChangeNum
    //             }
    //           })
    //         }
    //       })
    //     } else {
    //       cartWeight = '0g'
    //     }
    //   }
    //   return cartWeight
    // }
  },
})

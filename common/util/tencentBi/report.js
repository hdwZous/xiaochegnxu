// 价格转成浮点型
// const toFloat = (number) => {
//     number = typeof number === 'string' ? number.replace(/\¥/, '') : number;
//     return number && parseFloat(number) || 0.00
// }

// 点击商品
export const trigger_sku_component = item => {
  console.log(item)
  // try {
  //     let app = getApp();
  //     let { skuId = '', skuName = '', spuId = '', spuName = '', catId = '', storeId = '', orgCode = '', minorPrice = {}, majorPrice = {}, imgUrl = '' } = item || {};
  //     app.sr.track(
  //         'trigger_sku_component',
  //         {
  //             "sku": {
  //                 "sku_id": skuId + '' || '0',
  //                 "sku_name": skuName || '0'
  //             },
  //             "spu": {
  //                 "spu_id": spuId + '' || skuId + '' || '0',
  //                 "spu_name": spuName || skuName || '0'
  //             },
  //             "sku_category": [
  //                 {
  //                     "sku_cat_id": catId + '' || '0',
  //                     "sku_cat_name": skuName || '0',
  //                     "sku_parent_cat_id": "null"
  //                 }
  //             ],
  //             "sale": {
  //                 "original_price": minorPrice.price && toFloat(minorPrice.price) || toFloat(majorPrice.price),
  //                 "current_price": toFloat(majorPrice.price)
  //             },
  //             "primary_image_url": imgUrl
  //         }
  //     )
  // } catch (err) {
  //     console.error('trigger_sku_component:', err)
  // }
}

// 商品详情页
export const browse_sku_page = item => {
  console.log(item)
  // try {
  //     let app = getApp();
  //     let { skuId = '', name = '', spuId = '', catId = '', storeInfo = {}, majorPrice = {}, minorPrice = {}, image = [] } = item || {};
  //     app.sr.track(
  //         'browse_sku_page',
  //         {
  //             "sku": {
  //                 "sku_id": skuId + '' || '0',
  //                 "sku_name": name || '0'
  //             },
  //             "spu": {
  //                 "spu_id": spuId + '' || skuId + '' || '0',
  //                 "spu_name": name || '0'
  //             },
  //             "sku_category": [
  //                 {
  //                     "sku_cat_id": catId + '' || storeInfo.venderId + '' || '0',
  //                     "sku_cat_name": storeInfo.venderName || '0',
  //                     "sku_parent_cat_id": "null"
  //                 }
  //             ],
  //             "shipping_shop": {
  //                 "shipping_shop_id": storeInfo.storeId + '',
  //                 "shipping_shop_name": storeInfo.storeName,
  //             },
  //             "sale": {
  //                 "original_price": minorPrice.price && toFloat(minorPrice.price) || toFloat(majorPrice.price),
  //                 "current_price": toFloat(majorPrice.price)
  //             },
  //             "primary_image_url": image[0] && image[0].small || ''
  //         }
  //     )
  // } catch (err) {
  //     console.error('browse_sku_page:', err)
  // }
}

// 商品加车
export const add_to_cart = (item, action_type) => {
  console.log(item, action_type)
  // try {
  //     let app = getApp();
  //     let { storeId = '', itemList = [], catName = '', catId = '', storeName = '' } = item || {};
  //     let { skuId = '', skuName = '', spuId = '', price = '', basePrice = '', cartNum = '' } = itemList[0] && itemList[0].skuList && itemList[0].skuList[0] || {}
  //     app.sr.track(
  //         'add_to_cart',
  //         {
  //             "action_type": action_type,
  //             "sku": {
  //                 "sku_id": skuId + '' || '0',
  //                 "sku_name": skuName || '0'
  //             },
  //             "spu": {
  //                 "spu_id": spuId + '' || skuId + '' || '0',
  //                 "spu_name": skuName || '0'
  //             },
  //             "sku_category": [{
  //                 "sku_cat_id": catId + '' || '0',
  //                 "sku_cat_name": catName || '0',
  //                 "sku_parent_cat_id": 'null'
  //             }],
  //             "shipping_shop": {
  //                 "shipping_shop_id": storeId + '',
  //                 "shipping_shop_name": storeName
  //             },
  //             "sale": {
  //                 "original_price": basePrice && toFloat(basePrice) || toFloat(price),
  //                 "current_price": toFloat(price)
  //             },
  //             "sku_num": parseInt(cartNum)
  //         }
  //     )
  // } catch (err) {
  //     console.error('add_to_cart:', err)
  // }
}

// 订单状态变更
export const custom_order = (item, order_status, dis) => {
  console.log(item, order_status, dis)

  // try {
  //     let app = getApp();
  //     let { orderId = '', orderDate = '', orderPrice = '' } = item || {};
  //     console.log('custom_order', item)
  //     app.sr.track('custom_order', {
  //         "order": {
  //             "order_id": orderId + '',
  //             "order_time": orderDate && Date.parse(orderDate) || Date.now(),
  //             "cancel_pay_time": orderDate && Date.parse(orderDate) || Date.now(),
  //             "cancel_time": orderDate && Date.parse(orderDate) || Date.now(),
  //             "pay_time": orderDate && Date.parse(orderDate) || Date.now(),
  //             "order_status": order_status
  //         },
  //         "sub_orders": [{
  //             "sub_order_id": orderId + '',
  //             "order_amt": toFloat(dis ? orderPrice / dis : orderPrice),
  //             "pay_amt": toFloat(dis ? orderPrice / dis : orderPrice)
  //         }]
  //     })
  // } catch (err) {
  //     console.error('custom_order:', err)
  // }
}

// 商品曝光
export const expose_sku_component = (item) => {
  console.log(item)
  // try {
  //     let app = getApp();
  //     let { skuId = '', skuName = '', spuId = '', storeId = '', orgCode = '', catId = '', catName = '', storeInfo = {}, majorPrice = {}, minorPrice = {}, imgUrl = '' } = item || {};
  //     app.sr.track(
  //         'expose_sku_component',
  //         {
  //             "sku": {
  //                 "sku_id": skuId + '' || '0',
  //                 "sku_name": skuName || '0'
  //             },
  //             "spu": {
  //                 "spu_id": spuId + '' || skuId + '' || '0',
  //                 "spu_name": skuName || '0'
  //             },
  //             "sku_category": [
  //                 {
  //                     "sku_cat_id": catId + '' || '0',
  //                     "sku_cat_name": catName || skuName || '0',
  //                     "sku_parent_cat_id": "null"
  //                 }
  //             ],
  //             "shipping_shop": {
  //                 "shipping_shop_id": storeId + '',
  //                 "shipping_shop_name": storeInfo.storeName
  //             },
  //             "sale": {
  //                 "original_price": minorPrice.price && toFloat(minorPrice.price) || toFloat(majorPrice.price),
  //                 "current_price": toFloat(majorPrice.price)
  //             },
  //             "primary_image_url": imgUrl
  //         }
  //     )
  // } catch (err) {

  // }
}
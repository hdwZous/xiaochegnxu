/**
 * Created by xx on 2018/9/11.
 *
 *
 * 接口文档： http://confluence.corp.imdada.cn/pages/viewpage.action?pageId=8216536
 */
/*

 使用es5， 因为这段代码需要放在h5上使用，h5不支持es6

* app/model/Spu.js

 var s = new Spu(接口result);

 实例化后，便可以使用以下方法获取所需数据：
 1. 当前规格选项列表，列表中包含每一个规格是否被选中，是否禁用
    var list = s.getCurrentSelectionList();
 2. 当前所形成的sku。 如果用户所选无法构成一个sku，则返回null
    var sku = s.getChoosedSku();
 3. 用户点击某个规格时：
    s.toggle(attrId,attrValueKey);

 * */

function Spu(init_data, showPriceRemind, spuId) {
  this._sku = null;
  // 展示降价提醒弹层
  if (showPriceRemind) {
    // 多规格商品
    if (spuId) {
      this._detail = init_data.spuDetailResult;
    } else {
      this._detail = init_data.skuDetailResult;
    }
  } else {
    this._detail = init_data.spuDetailResult;
  }
  this._selection = [];
  this._addedValueGroupList = []
  this._init_data = init_data; // 接口返回的result
  this.init(init_data);
}

Spu.prototype.init = function (init_data) {
  // 接口返回的所有sku数组
  var skuSaleAttrValueList = init_data.skuSaleAttrValueList || [];
  // 接口返回的规格楼层数据（包装，颜色等选项）
  var saleAttrValueRelationList = init_data.saleAttrValueRelationList || [];

  this._selection_json_str = JSON.stringify(saleAttrValueRelationList);
  // 克隆出来的规格楼层数据（包装，颜色等选项）
  var init_selection = JSON.parse(this._selection_json_str); // clone
  var obj = getSelectionListAndSkuBySelected(
    skuSaleAttrValueList,
    init_selection,
    {}
  );
  this._sku = obj.sku;
  this._selection = obj.list;
  this._addedValueGroupList = init_data.addedValueGroupList || []; // 增值服务列表
  if (this._addedValueGroupList.length > 0) {
    this._addedValueGroupList.forEach((item) => {
      item.addedValueList.forEach((subItem) => {
        subItem.canUse = true;
      });
    });
  }
  // console.log(this._selection);
}

// 获取已选中和未选中的文案
function getText(selection) {
  if((!selection) || (!selection.push)){
    return {
      selected:'',
      unselected:''
    };
  }

  var text_selected = [];
  var text_unselected = [];
  var len = selection.length;
  for(var i=0; i<len; i++){
    var itm = selection[i];
    if((!itm)||(!itm.saleValueRelation)||(!itm.saleValueRelation.push)){
      continue;
    }
    var saleValueRelation = itm.saleValueRelation;
    var has_selected = false;
    for(var j=0; j<saleValueRelation.length; j++){
      var spec = saleValueRelation[j];
      if(spec.selected){
        has_selected = true;
        //text_selected.push(itm.saleAttrName + ':'+spec.valueName);
        text_selected.push({
          saleAttrName:itm.saleAttrName,
          saleValueName:spec.saleValueName
        });
        break;
      }
    }
    (!has_selected) && (text_unselected.push(itm.saleAttrName));
  }

  var guide = ''; // 导购语，用于提示用户已选择了什么，或需要选择什么
  var need = null; // 错误提示语，当用户想添加购物车，但还有未选择的规格时，提示这个


  var all_done_selected = (text_selected.length === len);
  var nothing_selected = (text_selected.length===0);
  var partial_selected = (text_selected.length>0 && text_selected.length<len);

  // 全部已选择：
  if(all_done_selected) {
    var arr = [];
    for (var k = 0; k < text_selected.length; k++) {
      var itm_selected = text_selected[k];
      arr.push(itm_selected.saleValueName);
    }
    guide = '已选：' + arr.join('，');

    // 啥也没选 or 选了且只选择了部分：
  } else if(nothing_selected || partial_selected){
    var str_text_unselected = text_unselected.join('，');
    guide = '请选择：' + str_text_unselected;
    need = '请选择' + str_text_unselected;
  }

  return {
    guide:guide,
    need:need
  };
}

//
Spu.prototype.getTextOfSelected = function () {
  var selection = this._selection;

  var obj = getText(selection);
  return obj.guide;
}

// 需完成的工作：
//   1. 判断用户期望的规格是否可用，若不可用，直接return false. （View层其实可以拦截这一用法）
//   2. 若用户点击了某个可用规格，使该规格选中，那么需要做的工作是：
//           · 该规格中其它选项取消选中
//           · 遍历其它规格，判断其它规格中每一个选项是否可用，在这个过程中，要结合该选项之前是否已被选中
//   3. 若用户使某个已被选中的规格取消选中，那么：
//           · 将该规格内的所有选项的selected置都为false，该规格内的所有选项的可用性由后续步骤决定
//           · 提取出所有已选中的规格，用已选中的规格去遍历所有sku，得出一份可用规格列表

// 总的来说，需要一个函数： 使用已选中的部分规格(确定是部分而不会是全部?)遍历出剩下可用的全部sku，进而得出一份规格选项列表
// skuSaleAttrValueList : 全部商品
// currentSelected : 结构同skuSaleAttrValueList.attrValue ，但是是attrValue的子集(小于或等于)
function getSelectionListAndSkuBySelected(skuSaleAttrValueList,empty_saleAttrValueRelationList,currentSelected){
  var json_string_currentSelected = JSON.stringify(currentSelected);
  var all_sku_len = skuSaleAttrValueList.length;
  var sku,attrValue;
  var len = empty_saleAttrValueRelationList.length;
  for(var i=0; i<len; i++){
    var itm = empty_saleAttrValueRelationList[i];
    var id = itm.saleAttrId;
    var saleValueRelation = itm.saleValueRelation;
    var currentSelected_without_this_key = clone_expect_key(json_string_currentSelected,id);
    var L = saleValueRelation.length;
    for(var m=0; m<all_sku_len; m++){
      sku = skuSaleAttrValueList[m];
      attrValue = sku.attrValue || {};
      if(A_is_a_subset_of_B(currentSelected_without_this_key , attrValue)){
        var canUse_value = attrValue[id];
        for(var j=0; j<L; j++){
          var value_itm = saleValueRelation[j];
          if(canUse_value===value_itm.saleValueId){
            value_itm.canUse = true;
            if(currentSelected[id]===value_itm.saleValueId){
              value_itm.selected = true;
            }
          }
        }
      }
    }
  }

  var selectedSku;
  for(var n=0; n<all_sku_len; n++){
    sku = skuSaleAttrValueList[n];
    attrValue = sku.attrValue || {};
    if(A_is_a_subset_of_B(currentSelected , attrValue) && A_is_a_subset_of_B(attrValue, currentSelected)){
      selectedSku = sku;
      break;
    }
  }

  // 如果不存在，则使sku为字符串
  if(!selectedSku){
    var obj = getText(empty_saleAttrValueRelationList);
    selectedSku = obj.need;
  }

  return {
    sku:selectedSku,
    list:empty_saleAttrValueRelationList
  };
}

//
function clone_expect_key(json_string_currentSelected,key){
  var new_obj = JSON.parse((json_string_currentSelected));
  delete new_obj[key];
  return new_obj;
}

/*
* 判断对象a是否是对象b的子集
* 例如 a={x:1,y:2}, b={x:1,y:2,z:3} 那么，a是b的子集
 *     a={x:2,y:2}, b={x:1,y:2,z:3} 那么，a不是b的子集
 *     a={x:1,y:2,z:3,d:4}, b={x:1,y:2,z:3} 那么，a不是b的子集
 *
* */
function A_is_a_subset_of_B(A, B) {
  for(var k in A){
    if(A[k]!==B[k]){
      return false;
    }
  }
  return true;
}

/* 获取当前已选中的规格，返回的是一个对象，形式如：
   {
     '01':'01' ,   // key值'01'表示saleAttrId（规格类型，如颜色）  , value值'01'表示saleValueId（该规格什么值，如红色）
     '02':'01'
   }
*/
function getCurrentSelected(selectionList) {
  var selected = {};
  if((!selectionList) || (!selectionList.push)){
    return selected;
  }

  var len = selectionList.length;
  for(var i=0; i<len; i++){
    var itm = selectionList[i];
    var itmAttr = itm["saleValueRelation"];
    var L = itmAttr.length;
    for(var j=0; j<L; j++){
      var value_itm = itmAttr[j];
      if(value_itm&&value_itm.selected){
        selected[itm.saleAttrId] = value_itm.saleValueId;
        break;
      }
    }
  }
  return selected;
}

// 获取某一个规格的当前状态： 是否可选，是否已选中
function getCurrentStatusOfTarget(selectionList, attrId, attrValue = {}) {
  // status = {canUse:true|false , selected:true|false}
  var status = null;
  if((!selectionList) || (!selectionList.push)){
    return status;
  }

  var len = selectionList.length;
  for(var i=0; i<len; i++){
    var itm = selectionList[i];
    var itmAttr = itm["saleValueRelation"];
    if(itm.saleAttrId===attrId){
      var L = itmAttr.length;
      for(var j=0; j<L; j++){
        var value_itm = itmAttr[j];
        if(value_itm&&value_itm.saleValueId===attrValue){
          status = value_itm;
          break;
        }
      }
      break;
    }

  }
  return status;
}
Spu.prototype.toggle = function (attrId, attrValue) {
  //console.log('attrId:'+attrId+' , value : '+attrValue);
  // 1.遍历出当前已选中
  var currentSelected = getCurrentSelected(this._selection);
  var prevStatusOfTarget = getCurrentStatusOfTarget(this._selection,attrId,attrValue);
  // 不能用，直接return false;
  if(!prevStatusOfTarget || !prevStatusOfTarget.canUse) {
    return false;
  }

  var skuSaleAttrValueList = this._init_data.skuSaleAttrValueList;
  var empty_saleAttrValueRelationList = JSON.parse(this._selection_json_str);

  // 能用，之前处于未选中，现在希望选中
  if(!prevStatusOfTarget.selected){
    currentSelected[attrId] = attrValue;
  } else {
    delete currentSelected[attrId];
  }

  // 判断是否存在被选中的规格
  var has_selected;
  for(var k in currentSelected){
    has_selected = true;
    break;
  }


  var obj =  getSelectionListAndSkuBySelected(skuSaleAttrValueList,empty_saleAttrValueRelationList,currentSelected);

  // 判断图片区域是否需要发生变化
  // 1. 如果所有规格都没选中，则返回默认的spuDetailResult字段
  // 2. 如果有部分规格是选中的，则返回上一次选中的sku，如果之前从未形成过sku，则返回默认的spuDetailResult字段
  // 3. 如果选成了一个sku，则返回这个sku
    
  if(has_selected){
    if(obj.sku && (typeof obj.sku==='object')){
      this._detail = obj.sku;
    } else {
      // 不变
    }
  } else {
    this._detail = this._init_data.spuDetailResult;
  }

  this._selection = obj.list;
  this._sku = obj.sku;
  //console.log(JSON.stringify(obj.list,null,1));
  return this._selection;
}
// 如果用户所选规格尚未形成一个商品，返回null
Spu.prototype.getChoosedSku = function () {
  return this._sku;
}
Spu.prototype.getCurrentSelectionList = function () {
  return this._selection;
}
Spu.prototype.getDetail = function () {
  return this._detail;
}



// Export the object for **Node.js**, with backwards-compatibility for the old `require()` API.
// If we're in the browser, `Spu` will be a global object.
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Spu;
  }
  exports.Spu = Spu;
}

export default Spu
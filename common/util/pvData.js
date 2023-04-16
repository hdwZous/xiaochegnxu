
/**
 * @description: 处理pv 数据埋点
 * @returns {Object} 当前页面page的buried 对象
 */
export const dealPvParamsRightWay = function (buried, options) {
  /*
      *原有页面内的buried{},不需要在增加userAction作为key值
      * 
  **/
  if (options.userAction) {
    buried.ref_par = {};
    buried.ref_par.userAction = decodeURIComponent(options.userAction) || '';
  }
  for (var key in buried) {
    if (
      buried[key] === "" ||
      buried[key] === undefined ||
      buried[key] === null ||
      (buried[key] && JSON.stringify(buried[key]) == "{}")
    ) {
      delete buried[key];
    }
  }

  return buried;
};

/**
 * @description: 处理pv 数据埋点
 * @returns {Object} 当前页面page的buried 对象
 */
export const dealPvParamsBackWay = function (buried, wayFlag) {
  if (!wayFlag) {
    buried.ret_Type = '';
    buried.ret_Type = 'back';
    delete buried.ref_par;
  }
  if (buried.ref_par && JSON.stringify(buried.ref_par) == '{}') {
    delete buried.ref_par;
  }
  //返回时删除 userAction
  if (buried.userAction) {
    delete buried.userAction;
  }
  for (var key in buried) {
    if (!buried[key] || buried[key] && JSON.stringify(buried[key]) == '{}') {
      delete buried[key]
    }
  }
  return buried;
};

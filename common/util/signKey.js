/**
 * crypto-js 新版本 4.1.1，注意不要和旧版本混用
*/
import HmacSHA256 from "../../npm/crypto-js/hmac-sha256"
import encHex from '../../npm/crypto-js/enc-hex'

//递归body数据
function getStringValue(data) {
  let stringValue = '';
  //排序
  const oredered = {};
  Object.keys(data).sort().forEach(function (key) {
    oredered[key] = data[key];
  });
  //遍历
  for (var i in oredered) {
    const value = oredered[i];
    if (Object.prototype.toString.call(value) === '[object Object]') {
      stringValue += (getStringValue(Object.prototype.toString.call(value) === '[object Object]' ? value : JSON.parse(value)));
    } else if (Object.prototype.toString.call(value) === '[object Array]') {
      value.map((item, index) => {
        if (Object.prototype.toString.call(item) === '[object Object]') {
          stringValue += (getStringValue(Object.prototype.toString.call(item) === '[object Object]' ? item : JSON.parse(item)));
        } else {
          // stringValue += item + '&';
          if (!(item === '' || item === null || item === undefined)) {
            stringValue += item + '&';
          }
        }
      });
    } else {
      if (!(value === '' || value === null || value === undefined)) {
        stringValue += value + '&';
      }
    }
  }
  return stringValue;
}

export function genSignKeyV1(data) {
  // console.log('原始数据-----', data);
  const copyData = Object.assign({}, data);
  // console.log('拷贝数据-----', copyData);
  const signNeedBody = copyData.signNeedBody;

  delete copyData.functionId;
  delete copyData.signNeedBody;

  let unordered = {};

  if (signNeedBody) {
    try {
      let body = copyData.body;
      delete copyData.body;
      body = getStringValue(JSON.parse(body));
      body = body.substring(0, body.lastIndexOf('&'));
      unordered = Object.assign({}, copyData, { body: body });
    } catch (e) {
      unordered = copyData;
    }
  } else {
    unordered = copyData;
  }

  const ordered = {};
  Object.keys(unordered).sort().forEach(function (key) {
    if (key != 'functionId') {
      ordered[key] = unordered[key];
    }
  });
  const values = Object.values(ordered).filter(ele => {
    if (ele != '') {
      return ele;
    }
  });

  // console.log(values.join('&'));
  const signKey = "6b040931c5661s04108af19t2a8e6fdb9"

  const hash = HmacSHA256(values.join('&'), signKey);
  const hashInHex = encHex.stringify(hash);

  return hashInHex;
}
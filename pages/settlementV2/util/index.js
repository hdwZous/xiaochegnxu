// 获取绑定的手机号
export const getBindedPhone = function (bindPhoneVO) {
  // 当 bindType为1 时，bindNewPhone非空，前端取该手机号显示
  var result = ""
  if (bindPhoneVO != null) {
    var bindType = bindPhoneVO.bindType;

    if (bindType == 1) {
      result = bindPhoneVO.bindNewPhone;
    }
  }

  return result;
}

// 判断字符串、list为空
export  const isEmpty = function (content) {
  return content == null || content == "null" || content.length == 0;
}

export const showDialog = function (content) {
  wx.showModal({
    title: '提示',
    content: content.text,
    confirmText:content.confirmText||"确定",
    cancelText:content.cancelText||"取消",
    showCancel: content.showCancel||false,
    success: function (res) {
      if (res.confirm) {
        if (content.isClose) {
          wx.navigateBack({
            delta: 1,
            success: function (res) { },
            fail: function () { },
            complete: function () { }
          })
        }
      }
    }
  })
}

// 是否包含特殊字符, 只允许字母和数字和中文//[\\pP‘’“”
export const containsIllegal = function (content) {
  var regEx = "^[A-Za-z\\d\\u4E00-\\u9FA5\\p{P}‘’“”\\s]+$";
  var pattern = new RegExp(regEx);

  if (pattern.test(content)) {
    return false;
  }

  return true;
}

// 检查手机号格式
export const isValidPhone = function (mobile) {
  return mobile != null && mobile.startsWith("1") && mobile.length == 11;
}
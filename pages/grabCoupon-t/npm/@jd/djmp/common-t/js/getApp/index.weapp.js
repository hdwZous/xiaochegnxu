"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function getDefaultApp(){var n=getApp({allowDefault:!0});n._env_index_=1,"object"!=("undefined"==typeof __wxConfig?"undefined":_typeof(__wxConfig))||"develop"!==__wxConfig.envVersion&&"trial"!==__wxConfig.envVersion||(n._env_index_=wx.getStorageSync("envVersionIndex")||"1");return n._independent_||(n._independent_={}),n._independent_.config={1:{is_test:0,HOST:"daojia.jd.com"},2:{is_test:1,HOST:"testpdjm.jd.com"},3:{is_test:1,HOST:"prepdjm.jd.com"},4:{is_test:1,HOST:"testpdj-three.jd.com"}}[n._env_index_],n.__init__||(n.__init__=!0,n._independent_.systemInfo||wx.getSystemInfo({success:function(e){e=(n._independent_.systemInfo=e)&&e.model||"";/iPhone\s(X|1[1-9])/g.test(e)&&(n._independent_.isIpx=!0)}}),n._independent_.qrcode||(n._independent_.qrcode={business:"",orgcode:"",type:"-1",storeid:""}),n.reportPerformance||(n.reportPerformance=function(e,n){wx.reportPerformance(e,n)})),n}exports.default=getDefaultApp;
// https://github.com/yingye/weapp-qrcode
import qrcode from './qrcode'
// https://github.com/vanclimber/wxapp-barcode/
var barcode = require('./barcode/index');
function convert_length(length) {
	return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
}

function barc(id, code, width, height, callback) {
	const url = barcode.CODE128(id, code, {
		width,
		height,
		paddingLeft: 0,
		paddingRight: 0,
		imageWidth: convert_length(width),
		imageHeight: convert_length(height),
		callback
	})
}

function qrc(id, code, width, height, callback) {
	qrcode({
		width: convert_length(width),
		height: convert_length(height),
		canvasId: id,
		text: code,
		x: 0,
		y: 0,
		callback
	})
	wx.hideLoading()
}

module.exports = {
	barcode: barc,
	qrcode: qrc
}
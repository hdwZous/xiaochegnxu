!function(e,t){"object"==typeof exports?module.exports=exports=t(require("./core.js")):"function"==typeof define&&define.amd?define(["./core"],t):t(e.CryptoJS)}(this,function(e){var t,f,o=(t=e).lib,r=o.WordArray,s=o.Hasher;return o=t.algo,f=[],o=o.SHA1=s.extend({_doReset:function(){this._hash=new r.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,t){for(var o=this._hash.words,r=o[0],s=o[1],n=o[2],i=o[3],a=o[4],h=0;h<80;h++){f[h]=h<16?0|e[t+h]:(c=f[h-3]^f[h-8]^f[h-14]^f[h-16])<<1|c>>>31;var c=(r<<5|r>>>27)+a+f[h];c+=h<20?1518500249+(s&n|~s&i):h<40?1859775393+(s^n^i):h<60?(s&n|s&i|n&i)-1894007588:(s^n^i)-899497514,a=i,i=n,n=s<<30|s>>>2,s=r,r=c}o[0]=o[0]+r|0,o[1]=o[1]+s|0,o[2]=o[2]+n|0,o[3]=o[3]+i|0,o[4]=o[4]+a|0},_doFinalize:function(){var e=this._data,t=e.words,o=8*this._nDataBytes,r=8*e.sigBytes;return t[r>>>5]|=128<<24-r%32,t[14+(64+r>>>9<<4)]=Math.floor(o/4294967296),t[15+(64+r>>>9<<4)]=o,e.sigBytes=4*t.length,this._process(),this._hash},clone:function(){var e=s.clone.call(this);return e._hash=this._hash.clone(),e}}),t.SHA1=s._createHelper(o),t.HmacSHA1=s._createHmacHelper(o),e.SHA1});
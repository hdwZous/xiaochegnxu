!function(e,t){"object"==typeof exports?module.exports=exports=t(require("./core.js")):"function"==typeof define&&define.amd?define(["./core"],t):t(e.CryptoJS)}(this,function(s){return function(n){var e=s,t=(o=e.lib).WordArray,r=o.Hasher,o=e.algo,i=[],_=[];!function(){function e(e){return 4294967296*(e-(0|e))|0}for(var t=2,r=0;r<64;)!function(e){for(var t=n.sqrt(e),r=2;r<=t;r++)if(!(e%r))return;return 1}(t)||(r<8&&(i[r]=e(n.pow(t,.5))),_[r]=e(n.pow(t,.3333333333333333)),r++),t++}();var p=[],o=o.SHA256=r.extend({_doReset:function(){this._hash=new t.init(i.slice(0))},_doProcessBlock:function(e,t){for(var r=this._hash.words,o=r[0],n=r[1],i=r[2],s=r[3],a=r[4],c=r[5],h=r[6],f=r[7],u=0;u<64;u++){u<16?p[u]=0|e[t+u]:(l=p[u-15],d=p[u-2],p[u]=((l<<25|l>>>7)^(l<<14|l>>>18)^l>>>3)+p[u-7]+((d<<15|d>>>17)^(d<<13|d>>>19)^d>>>10)+p[u-16]);var l=o&n^o&i^n&i,d=f+((a<<26|a>>>6)^(a<<21|a>>>11)^(a<<7|a>>>25))+(a&c^~a&h)+_[u]+p[u],f=h,h=c,c=a,a=s+d|0,s=i,i=n,n=o,o=d+(((o<<30|o>>>2)^(o<<19|o>>>13)^(o<<10|o>>>22))+l)|0}r[0]=r[0]+o|0,r[1]=r[1]+n|0,r[2]=r[2]+i|0,r[3]=r[3]+s|0,r[4]=r[4]+a|0,r[5]=r[5]+c|0,r[6]=r[6]+h|0,r[7]=r[7]+f|0},_doFinalize:function(){var e=this._data,t=e.words,r=8*this._nDataBytes,o=8*e.sigBytes;return t[o>>>5]|=128<<24-o%32,t[14+(64+o>>>9<<4)]=n.floor(r/4294967296),t[15+(64+o>>>9<<4)]=r,e.sigBytes=4*t.length,this._process(),this._hash},clone:function(){var e=r.clone.call(this);return e._hash=this._hash.clone(),e}});e.SHA256=r._createHelper(o),e.HmacSHA256=r._createHmacHelper(o)}(Math),s.SHA256});
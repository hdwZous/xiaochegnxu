!function(r,e){"object"==typeof exports?module.exports=exports=e(require("./core.js")):"function"==typeof define&&define.amd?define(["./core"],e):e(r.CryptoJS)}(this,function(r){var v=r.lib.WordArray;return r.enc.Base64={stringify:function(r){for(var e=r.words,t=r.sigBytes,o=this._map,a=(r.clamp(),[]),n=0;n<t;n+=3)for(var i=(e[n>>>2]>>>24-n%4*8&255)<<16|(e[n+1>>>2]>>>24-(n+1)%4*8&255)<<8|e[n+2>>>2]>>>24-(n+2)%4*8&255,s=0;s<4&&n+.75*s<t;s++)a.push(o.charAt(i>>>6*(3-s)&63));var f=o.charAt(64);if(f)for(;a.length%4;)a.push(f);return a.join("")},parse:function(r){var e=r.length,t=this._map;if(!(o=this._reverseMap))for(var o=this._reverseMap=[],a=0;a<t.length;a++)o[t.charCodeAt(a)]=a;for(var n,i,s=t.charAt(64),h=(!s||-1!==(s=r.indexOf(s))&&(e=s),r),p=e,u=o,d=[],f=0,c=0;c<p;c++)c%4&&(i=u[h.charCodeAt(c-1)]<<c%4*2,n=u[h.charCodeAt(c)]>>>6-c%4*2,d[f>>>2]|=(i|=n)<<24-f%4*8,f++);return v.create(d,f)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},r.enc.Base64});
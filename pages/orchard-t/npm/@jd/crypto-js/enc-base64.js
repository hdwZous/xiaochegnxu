!function(r,e){"object"==typeof exports?module.exports=exports=e(require("./core.js")):"function"==typeof define&&define.amd?define(["./core"],e):e(r.CryptoJS)}(this,function(r){var v=r.lib.WordArray;return r.enc.Base64={stringify:function(r){for(var e=r.words,t=r.sigBytes,o=this._map,a=(r.clamp(),[]),n=0;n<t;n+=3)for(var i=(e[n>>>2]>>>24-n%4*8&255)<<16|(e[n+1>>>2]>>>24-(n+1)%4*8&255)<<8|e[n+2>>>2]>>>24-(n+2)%4*8&255,s=0;s<4&&n+.75*s<t;s++)a.push(o.charAt(i>>>6*(3-s)&63));var f=o.charAt(64);if(f)for(;a.length%4;)a.push(f);return a.join("")},parse:function(r){var e=r.length,t=this._map;if(!(o=this._reverseMap))for(var o=this._reverseMap=[],a=0;a<t.length;a++)o[t.charCodeAt(a)]=a;for(var n,i,s=t.charAt(64),f=(s&&-1!==(s=r.indexOf(s))&&(e=s),r),c=e,h=o,p=[],u=0,d=0;d<c;d++)d%4&&(n=h[f.charCodeAt(d-1)]<<d%4*2,i=h[f.charCodeAt(d)]>>>6-d%4*2,p[u>>>2]|=(n|i)<<24-u%4*8,u++);return v.create(p,u)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="},r.enc.Base64});
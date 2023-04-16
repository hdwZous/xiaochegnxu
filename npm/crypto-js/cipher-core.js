!function(e,t){"object"==typeof exports?module.exports=exports=t(require("./core.js"),require("./evpkdf.js")):"function"==typeof define&&define.amd?define(["./core","./evpkdf"],t):t(e.CryptoJS)}(this,function(l){l.lib.Cipher||function(){var e=(u=l).lib,t=e.Base,o=e.WordArray,r=e.BufferedBlockAlgorithm,i=((f=u.enc).Utf8,f.Base64),n=u.algo.EvpKDF,c=e.Cipher=r.extend({cfg:t.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,r){this.cfg=this.cfg.extend(r),this._xformMode=e,this._key=t,this.reset()},reset:function(){r.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){return e&&this._append(e),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(i){return{encrypt:function(e,t,r){return s(t).encrypt(i,e,t,r)},decrypt:function(e,t,r){return s(t).decrypt(i,e,t,r)}}}});function s(e){return"string"==typeof e?_:h}e.StreamCipher=c.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var a=u.mode={},f=e.BlockCipherMode=t.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e,this._iv=t}}),f=a.CBC=((a=f.extend()).Encryptor=a.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize;p.call(this,e,t,i),r.encryptBlock(e,t),this._prevBlock=e.slice(t,t+i)}}),a.Decryptor=a.extend({processBlock:function(e,t){var r=this._cipher,i=r.blockSize,n=e.slice(t,t+i);r.decryptBlock(e,t),p.call(this,e,t,i),this._prevBlock=n}}),a);function p(e,t,r){var i,n=this._iv;n?(i=n,this._iv=void 0):i=this._prevBlock;for(var c=0;c<r;c++)e[t+c]^=i[c]}var a=(u.pad={}).Pkcs7={pad:function(e,t){for(var r=(t=4*t)-e.sigBytes%t,i=r<<24|r<<16|r<<8|r,n=[],c=0;c<r;c+=4)n.push(i);t=o.create(n,r),e.concat(t)},unpad:function(e){var t=255&e.words[e.sigBytes-1>>>2];e.sigBytes-=t}},d=(e.BlockCipher=c.extend({cfg:c.cfg.extend({mode:f,padding:a}),reset:function(){var e;c.reset.call(this);var t=(r=this.cfg).iv,r=r.mode;this._xformMode==this._ENC_XFORM_MODE?e=r.createEncryptor:(e=r.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==e?this._mode.init(this,t&&t.words):(this._mode=e.call(r,this,t&&t.words),this._mode.__creator=e)},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e,t=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(t.pad(this._data,this.blockSize),e=this._process(!0)):(e=this._process(!0),t.unpad(e)),e},blockSize:4}),e.CipherParams=t.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}})),a=(u.format={}).OpenSSL={stringify:function(e){var t=e.ciphertext;return(t=(e=e.salt)?o.create([1398893684,1701076831]).concat(e).concat(t):t).toString(i)},parse:function(e){var t,r=i.parse(e);return 1398893684==(e=r.words)[0]&&1701076831==e[1]&&(t=o.create(e.slice(2,4)),e.splice(0,4),r.sigBytes-=16),d.create({ciphertext:r,salt:t})}},h=e.SerializableCipher=t.extend({cfg:t.extend({format:a}),encrypt:function(e,t,r,i){i=this.cfg.extend(i);var t=(n=e.createEncryptor(r,i)).finalize(t),n=n.cfg;return d.create({ciphertext:t,key:r,iv:n.iv,algorithm:e,mode:n.mode,padding:n.padding,blockSize:e.blockSize,formatter:i.format})},decrypt:function(e,t,r,i){return i=this.cfg.extend(i),t=this._parse(t,i.format),e.createDecryptor(r,i).finalize(t.ciphertext)},_parse:function(e,t){return"string"==typeof e?t.parse(e,this):e}}),u=(u.kdf={}).OpenSSL={execute:function(e,t,r,i){return i=i||o.random(8),e=n.create({keySize:t+r}).compute(e,i),r=o.create(e.words.slice(t),4*r),e.sigBytes=4*t,d.create({key:e,iv:r,salt:i})}},_=e.PasswordBasedCipher=h.extend({cfg:h.cfg.extend({kdf:u}),encrypt:function(e,t,r,i){return r=(i=this.cfg.extend(i)).kdf.execute(r,e.keySize,e.ivSize),i.iv=r.iv,(i=h.encrypt.call(this,e,t,r.key,i)).mixIn(r),i},decrypt:function(e,t,r,i){return i=this.cfg.extend(i),t=this._parse(t,i.format),r=i.kdf.execute(r,e.keySize,e.ivSize,t.salt),i.iv=r.iv,h.decrypt.call(this,e,t,r.key,i)}})}()});
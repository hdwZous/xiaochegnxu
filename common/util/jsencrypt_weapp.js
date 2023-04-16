/*
 <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
 Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
module.exports = function () {
    var P = {}, K = function (u, C, v) { P[u] = { status: 0, func: C, req: v, m: { exports: {}, _tempexports: {} } } }, I = function (u, C) {
        if (!P[u]) return require(C); if (!P[u].status) {
            var v = P[u].m; v._exports = v._tempexports; (C = Object.getOwnPropertyDescriptor(v, "exports")) && C.configurable && Object.defineProperty(v, "exports", { set: function (r) { "object" === typeof r && r !== v._exports && (v._exports.__proto__ = r.__proto__, Object.keys(r).forEach(function (m) { v._exports[m] = r[m] })); v._tempexports = r }, get: function () { return v._tempexports } });
            P[u].status = 1; P[u].func(P[u].req, v, v.exports)
        } return P[u].m.exports
    }; K(1635488321550, function (u, C, v) { var r = u("./JSEncrypt").JSEncrypt; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); Object.defineProperty(v, "JSEncrypt", { enumerable: !0, configurable: !0, get: function () { return r } }); v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.default = r }, function (u) { return I({ "./JSEncrypt": 1635488321551 }[u], u) }); K(1635488321551, function (u, C, v) {
        C = u("./lib/jsbn/base64"); var r = C.b64tohex, m =
            C.hex2b64; C = u("./JSEncryptRSAKey"); var d = C.JSEncryptRSAKey, e = (C = u("./version.json")) && C.__esModule ? C.default : C, n = function () {
                function w(t) { void 0 === t && (t = {}); t = t || {}; this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024; this.default_public_exponent = t.default_public_exponent || "010001"; this.log = t.log || !1; this.key = null } w.prototype.setKey = function (t) { this.log && this.key && console.warn("A key was already set, overriding existing."); this.key = new d(t) }; w.prototype.setPrivateKey = function (t) { this.setKey(t) };
                w.prototype.setPublicKey = function (t) { this.setKey(t) }; w.prototype.decrypt = function (t) { try { return this.getKey().decrypt(r(t)) } catch (f) { return !1 } }; w.prototype.encrypt = function (t) { try { return m(this.getKey().encrypt(t)) } catch (f) { return !1 } }; w.prototype.encryptLong = function (t) { try { return m(this.getKey().encryptLong(t)) } catch (f) { return !1 } }; w.prototype.decryptLong = function (t) { try { return this.getKey().decryptLong(r(t)) } catch (f) { return !1 } }; w.prototype.sign = function (t, f, h) {
                    try {
                        return m(this.getKey().sign(t, f,
                            h))
                    } catch (g) { return !1 }
                }; w.prototype.verify = function (t, f, h) { try { return this.getKey().verify(t, r(f), h) } catch (g) { return !1 } }; w.prototype.getKey = function (t) { if (!this.key) { this.key = new d; if (t && "[object Function]" === {}.toString.call(t)) { this.key.generateAsync(this.default_key_size, this.default_public_exponent, t); return } this.key.generate(this.default_key_size, this.default_public_exponent) } return this.key }; w.prototype.getPrivateKey = function () { return this.getKey().getPrivateKey() }; w.prototype.getPrivateKeyB64 =
                    function () { return this.getKey().getPrivateBaseKeyB64() }; w.prototype.getPublicKey = function () { return this.getKey().getPublicKey() }; w.prototype.getPublicKeyB64 = function () { return this.getKey().getPublicBaseKeyB64() }; w.version = e.version; return w
            }(); v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); Object.defineProperty(v, "JSEncrypt", { enumerable: !0, configurable: !0, get: function () { return n } })
    }, function (u) {
        return I({ "./lib/jsbn/base64": 1635488321552, "./JSEncryptRSAKey": 1635488321554, "./version.json": 1635488321565 }[u],
            u)
    }); K(1635488321552, function (u, C, v) {
        function r(d) { var e = "", n, w = 0, t = 0; for (n = 0; n < d.length && "=" != d.charAt(n); ++n) { var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(d.charAt(n)); 0 > f || (0 == w ? (e += m(f >> 2), t = f & 3, w = 1) : 1 == w ? (e += m(t << 2 | f >> 4), t = f & 15, w = 2) : 2 == w ? (e += m(t), e += m(f >> 2), t = f & 3, w = 3) : (e += m(t << 2 | f >> 4), e += m(f & 15), w = 0)) } 1 == w && (e += m(t << 2)); return e } var m = u("./util").int2char; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.hex2b64 = function (d) {
            var e, n = ""; for (e =
                0; e + 3 <= d.length; e += 3) { var w = parseInt(d.substring(e, e + 3), 16); n += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(w >> 6) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(w & 63) } e + 1 == d.length ? (w = parseInt(d.substring(e, e + 1), 16), n += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(w << 2)) : e + 2 == d.length && (w = parseInt(d.substring(e, e + 2), 16), n += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(w >> 2) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt((w &
                    3) << 4)); for (; 0 < (n.length & 3);)n += "="; return n
        }; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.b64tohex = r; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.b64toBA = function (d) { d = r(d); var e, n = []; for (e = 0; 2 * e < d.length; ++e)n[e] = parseInt(d.substring(2 * e, 2 * e + 2), 16); return n }
    }, function (u) { return I({ "./util": 1635488321553 }[u], u) }); K(1635488321553, function (u, C, v) {
        v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.int2char = function (r) { return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(r) };
        v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.op_and = function (r, m) { return r & m }; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.op_or = function (r, m) { return r | m }; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.op_xor = function (r, m) { return r ^ m }; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.op_andnot = function (r, m) { return r & ~m }; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.lbit = function (r) {
            if (0 == r) return -1; var m = 0;
            0 == (r & 65535) && (r >>= 16, m += 16); 0 == (r & 255) && (r >>= 8, m += 8); 0 == (r & 15) && (r >>= 4, m += 4); 0 == (r & 3) && (r >>= 2, m += 2); 0 == (r & 1) && ++m; return m
        }; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.cbit = function (r) { for (var m = 0; 0 != r;)r &= r - 1, ++m; return m }
    }, function (u) { return I({}[u], u) }); K(1635488321554, function (u, C, v) {
        var r = this && this.__extends || function () {
            var g = function (p, l) {
                g = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (y, A) { y.__proto__ = A } || function (y, A) {
                    for (var E in A) Object.prototype.hasOwnProperty.call(A,
                        E) && (y[E] = A[E])
                }; return g(p, l)
            }; return function (p, l) { function y() { this.constructor = p } if ("function" !== typeof l && null !== l) throw new TypeError("Class extends value " + String(l) + " is not a constructor or null"); g(p, l); p.prototype = null === l ? Object.create(l) : (y.prototype = l.prototype, new y) }
        }(); C = u("./lib/jsbn/base64"); var m = C.hex2b64; C = u("./lib/asn1js/hex"); var d = C.Hex; C = u("./lib/asn1js/base64"); var e = C.Base64; C = u("./lib/asn1js/asn1"); var n = C.ASN1; C = u("./lib/jsbn/rsa"); var w = C.RSAKey; C = u("./lib/jsbn/jsbn");
        var t = C.parseBigInt; C = u("./lib/jsrsasign/asn1-1.0"); var f = C.KJUR, h = function (g) {
            function p(l) { var y = g.call(this) || this; l && ("string" === typeof l ? y.parseKey(l) : (p.hasPrivateKeyProperty(l) || p.hasPublicKeyProperty(l)) && y.parsePropertiesFrom(l)); return y } r(p, g); p.prototype.parseKey = function (l) {
                try {
                    var y = 0, A = 0, E = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(l) ? d.decode(l) : e.unarmor(l), G = n.decode(E); 3 === G.sub.length && (G = G.sub[2].sub[0]); if (9 === G.sub.length) {
                        y = G.sub[1].getHexStringValue(); this.n = t(y, 16); A = G.sub[2].getHexStringValue();
                        this.e = parseInt(A, 16); var H = G.sub[3].getHexStringValue(); this.d = t(H, 16); var M = G.sub[4].getHexStringValue(); this.p = t(M, 16); var F = G.sub[5].getHexStringValue(); this.q = t(F, 16); var q = G.sub[6].getHexStringValue(); this.dmp1 = t(q, 16); var a = G.sub[7].getHexStringValue(); this.dmq1 = t(a, 16); var b = G.sub[8].getHexStringValue(); this.coeff = t(b, 16)
                    } else if (2 === G.sub.length) { var c = G.sub[1].sub[0]; y = c.sub[0].getHexStringValue(); this.n = t(y, 16); A = c.sub[1].getHexStringValue(); this.e = parseInt(A, 16) } else return !1; return !0
                } catch (k) { return !1 }
            };
            p.prototype.getPrivateBaseKey = function () { var l = { array: [new f.asn1.DERInteger({ int: 0 }), new f.asn1.DERInteger({ bigint: this.n }), new f.asn1.DERInteger({ int: this.e }), new f.asn1.DERInteger({ bigint: this.d }), new f.asn1.DERInteger({ bigint: this.p }), new f.asn1.DERInteger({ bigint: this.q }), new f.asn1.DERInteger({ bigint: this.dmp1 }), new f.asn1.DERInteger({ bigint: this.dmq1 }), new f.asn1.DERInteger({ bigint: this.coeff })] }; return (new f.asn1.DERSequence(l)).getEncodedHex() }; p.prototype.getPrivateBaseKeyB64 = function () { return m(this.getPrivateBaseKey()) };
            p.prototype.getPublicBaseKey = function () { var l = new f.asn1.DERSequence({ array: [new f.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }), new f.asn1.DERNull] }), y = new f.asn1.DERSequence({ array: [new f.asn1.DERInteger({ bigint: this.n }), new f.asn1.DERInteger({ int: this.e })] }); y = new f.asn1.DERBitString({ hex: "00" + y.getEncodedHex() }); return (new f.asn1.DERSequence({ array: [l, y] })).getEncodedHex() }; p.prototype.getPublicBaseKeyB64 = function () { return m(this.getPublicBaseKey()) }; p.wordwrap = function (l, y) {
                y = y || 64;
                return l ? l.match(RegExp("(.{1," + y + "})( +|$\n?)|(.{1," + y + "})", "g")).join("\n") : l
            }; p.prototype.getPrivateKey = function () { return "-----BEGIN RSA PRIVATE KEY-----\n" + (p.wordwrap(this.getPrivateBaseKeyB64()) + "\n-----END RSA PRIVATE KEY-----") }; p.prototype.getPublicKey = function () { return "-----BEGIN PUBLIC KEY-----\n" + (p.wordwrap(this.getPublicBaseKeyB64()) + "\n-----END PUBLIC KEY-----") }; p.hasPublicKeyProperty = function (l) { l = l || {}; return l.hasOwnProperty("n") && l.hasOwnProperty("e") }; p.hasPrivateKeyProperty =
                function (l) { l = l || {}; return l.hasOwnProperty("n") && l.hasOwnProperty("e") && l.hasOwnProperty("d") && l.hasOwnProperty("p") && l.hasOwnProperty("q") && l.hasOwnProperty("dmp1") && l.hasOwnProperty("dmq1") && l.hasOwnProperty("coeff") }; p.prototype.parsePropertiesFrom = function (l) { this.n = l.n; this.e = l.e; l.hasOwnProperty("d") && (this.d = l.d, this.p = l.p, this.q = l.q, this.dmp1 = l.dmp1, this.dmq1 = l.dmq1, this.coeff = l.coeff) }; return p
        }(w); v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); Object.defineProperty(v, "JSEncryptRSAKey",
            { enumerable: !0, configurable: !0, get: function () { return h } })
    }, function (u) { return I({ "./lib/jsbn/base64": 1635488321552, "./lib/asn1js/hex": 1635488321555, "./lib/asn1js/base64": 1635488321556, "./lib/asn1js/asn1": 1635488321557, "./lib/jsbn/rsa": 1635488321559, "./lib/jsbn/jsbn": 1635488321560, "./lib/jsrsasign/asn1-1.0": 1635488321563 }[u], u) }); K(1635488321555, function (u, C, v) {
        var r; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.Hex = {
            decode: function (m) {
                var d; if (void 0 === r) {
                    var e = "0123456789ABCDEF";
                    r = {}; for (d = 0; 16 > d; ++d)r[e.charAt(d)] = d; e = e.toLowerCase(); for (d = 10; 16 > d; ++d)r[e.charAt(d)] = d; for (d = 0; 8 > d; ++d)r[" \f\n\r\t\u00a0\u2028\u2029".charAt(d)] = -1
                } e = []; var n = 0, w = 0; for (d = 0; d < m.length; ++d) { var t = m.charAt(d); if ("=" == t) break; t = r[t]; if (-1 != t) { if (void 0 === t) throw Error("Illegal character at offset " + d); n |= t; 2 <= ++w ? (e[e.length] = n, w = n = 0) : n <<= 4 } } if (w) throw Error("Hex encoding incomplete: 4 bits missing"); return e
            }
        }
    }, function (u) { return I({}[u], u) }); K(1635488321556, function (u, C, v) {
        var r; v.__esModule ||
            Object.defineProperty(v, "__esModule", { value: !0 }); var m = v.Base64 = {
                decode: function (d) {
                    var e; if (void 0 === r) { r = Object.create(null); for (e = 0; 64 > e; ++e)r["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e; r["-"] = 62; r._ = 63; for (e = 0; 9 > e; ++e)r["= \f\n\r\t\u00a0\u2028\u2029".charAt(e)] = -1 } var n = [], w = 0, t = 0; for (e = 0; e < d.length; ++e) {
                        var f = d.charAt(e); if ("=" == f) break; f = r[f]; if (-1 != f) {
                            if (void 0 === f) throw Error("Illegal character at offset " + e); w |= f; 4 <= ++t ? (n[n.length] = w >> 16, n[n.length] =
                                w >> 8 & 255, n[n.length] = w & 255, t = w = 0) : w <<= 6
                        }
                    } switch (t) { case 1: throw Error("Base64 encoding incomplete: at least 2 bits missing"); case 2: n[n.length] = w >> 10; break; case 3: n[n.length] = w >> 16, n[n.length] = w >> 8 & 255 }return n
                }, re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/, unarmor: function (d) { var e = m.re.exec(d); if (e) if (e[1]) d = e[1]; else if (e[2]) d = e[2]; else throw Error("RegExp out of sync"); return m.decode(d) }
            }
    }, function (u) { return I({}[u], u) }); K(1635488321557,
        function (u, C, v) {
            function r(f, h) { f.length > h && (f = f.substring(0, h) + "\u2026"); return f } var m = u("./int10").Int10, d = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, e = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, n = function () {
                function f(h, g) {
                    this.hexDigits = "0123456789ABCDEF"; h instanceof f ? (this.enc = h.enc, this.pos =
                        h.pos) : (this.enc = h, this.pos = g)
                } f.prototype.get = function (h) { void 0 === h && (h = this.pos++); if (h >= this.enc.length) throw Error("Requesting byte offset " + h + " on a stream of length " + this.enc.length); return "string" === typeof this.enc ? this.enc.charCodeAt(h) : this.enc[h] }; f.prototype.hexByte = function (h) { return this.hexDigits.charAt(h >> 4 & 15) + this.hexDigits.charAt(h & 15) }; f.prototype.hexDump = function (h, g, p) {
                    for (var l = ""; h < g; ++h)if (l += this.hexByte(this.get(h)), !0 !== p) switch (h & 15) {
                        case 7: l += "  "; break; case 15: l += "\n";
                            break; default: l += " "
                    }return l
                }; f.prototype.isASCII = function (h, g) { for (; h < g; ++h) { var p = this.get(h); if (32 > p || 176 < p) return !1 } return !0 }; f.prototype.parseStringISO = function (h, g) { for (var p = ""; h < g; ++h)p += String.fromCharCode(this.get(h)); return p }; f.prototype.parseStringUTF = function (h, g) { for (var p = ""; h < g;) { var l = this.get(h++); p = 128 > l ? p + String.fromCharCode(l) : 191 < l && 224 > l ? p + String.fromCharCode((l & 31) << 6 | this.get(h++) & 63) : p + String.fromCharCode((l & 15) << 12 | (this.get(h++) & 63) << 6 | this.get(h++) & 63) } return p }; f.prototype.parseStringBMP =
                    function (h, g) { for (var p = "", l, y = h; y < g;)h = this.get(y++), l = this.get(y++), p += String.fromCharCode(h << 8 | l); return p }; f.prototype.parseTime = function (h, g, p) { h = this.parseStringISO(h, g); g = (p ? d : e).exec(h); if (!g) return "Unrecognized time: " + h; p && (g[1] = +g[1], g[1] += 70 > +g[1] ? 2E3 : 1900); h = g[1] + "-" + g[2] + "-" + g[3] + " " + g[4]; g[5] && (h += ":" + g[5], g[6] && (h += ":" + g[6], g[7] && (h += "." + g[7]))); g[8] && (h += " UTC", "Z" != g[8] && (h += g[8], g[9] && (h += ":" + g[9]))); return h }; f.prototype.parseInteger = function (h, g) {
                        for (var p = this.get(h), l = 127 < p,
                            y = l ? 255 : 0, A, E = ""; p == y && ++h < g;)p = this.get(h); A = g - h; if (0 === A) return l ? -1 : 0; if (4 < A) { E = p; for (A <<= 3; 0 == ((+E ^ y) & 128);)E = +E << 1, --A; E = "(" + A + " bit)\n" } l && (p -= 256); p = new m(p); for (h += 1; h < g; ++h)p.mulAdd(256, this.get(h)); return E + p.toString()
                    }; f.prototype.parseBitString = function (h, g, p) { var l = this.get(h), y = "(" + ((g - h - 1 << 3) - l) + " bit)\n", A = ""; for (h += 1; h < g; ++h) { for (var E = this.get(h), G = h == g - 1 ? l : 0, H = 7; H >= G; --H)A += E >> H & 1 ? "1" : "0"; if (A.length > p) return y + r(A, p) } return y + A }; f.prototype.parseOctetString = function (h, g, p) {
                        if (this.isASCII(h,
                            g)) return r(this.parseStringISO(h, g), p); var l = g - h, y = "(" + l + " byte)\n"; p /= 2; for (l > p && (g = h + p); h < g; ++h)y += this.hexByte(this.get(h)); l > p && (y += "\u2026"); return y
                    }; f.prototype.parseOID = function (h, g, p) { for (var l = "", y = new m, A = 0; h < g; ++h) { var E = this.get(h); y.mulAdd(128, E & 127); A += 7; if (!(E & 128)) { "" === l ? (y = y.simplify(), y instanceof m ? (y.sub(80), l = "2." + y.toString()) : (l = 80 > y ? 40 > y ? 0 : 1 : 2, l = l + "." + (y - 40 * l))) : l += "." + y.toString(); if (l.length > p) return r(l, p); y = new m; A = 0 } } 0 < A && (l += ".incomplete"); return l }; return f
            }(); v.__esModule ||
                Object.defineProperty(v, "__esModule", { value: !0 }); Object.defineProperty(v, "Stream", { enumerable: !0, configurable: !0, get: function () { return n } }); var w = function () {
                    function f(h, g, p, l, y) { if (!(l instanceof t)) throw Error("Invalid tag value."); this.stream = h; this.header = g; this.length = p; this.tag = l; this.sub = y } f.prototype.typeName = function () {
                        switch (this.tag.tagClass) {
                            case 0: switch (this.tag.tagNumber) {
                                case 0: return "EOC"; case 1: return "BOOLEAN"; case 2: return "INTEGER"; case 3: return "BIT_STRING"; case 4: return "OCTET_STRING";
                                case 5: return "NULL"; case 6: return "OBJECT_IDENTIFIER"; case 7: return "ObjectDescriptor"; case 8: return "EXTERNAL"; case 9: return "REAL"; case 10: return "ENUMERATED"; case 11: return "EMBEDDED_PDV"; case 12: return "UTF8String"; case 16: return "SEQUENCE"; case 17: return "SET"; case 18: return "NumericString"; case 19: return "PrintableString"; case 20: return "TeletexString"; case 21: return "VideotexString"; case 22: return "IA5String"; case 23: return "UTCTime"; case 24: return "GeneralizedTime"; case 25: return "GraphicString"; case 26: return "VisibleString";
                                case 27: return "GeneralString"; case 28: return "UniversalString"; case 30: return "BMPString"
                            }return "Universal_" + this.tag.tagNumber.toString(); case 1: return "Application_" + this.tag.tagNumber.toString(); case 2: return "[" + this.tag.tagNumber.toString() + "]"; case 3: return "Private_" + this.tag.tagNumber.toString()
                        }
                    }; f.prototype.content = function (h) {
                        if (void 0 === this.tag) return null; void 0 === h && (h = Infinity); var g = this.posContent(), p = Math.abs(this.length); if (!this.tag.isUniversal()) return null !== this.sub ? "(" + this.sub.length +
                            " elem)" : this.stream.parseOctetString(g, g + p, h); switch (this.tag.tagNumber) {
                                case 1: return 0 === this.stream.get(g) ? "false" : "true"; case 2: return this.stream.parseInteger(g, g + p); case 3: return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(g, g + p, h); case 4: return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(g, g + p, h); case 6: return this.stream.parseOID(g, g + p, h); case 16: case 17: return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)"; case 12: return r(this.stream.parseStringUTF(g,
                                    g + p), h); case 18: case 19: case 20: case 21: case 22: case 26: return r(this.stream.parseStringISO(g, g + p), h); case 30: return r(this.stream.parseStringBMP(g, g + p), h); case 23: case 24: return this.stream.parseTime(g, g + p, 23 == this.tag.tagNumber)
                            }return null
                    }; f.prototype.toString = function () { return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]" }; f.prototype.toPrettyString = function (h) {
                        void 0 === h && (h = ""); var g = h + this.typeName() +
                            " @" + this.stream.pos; 0 <= this.length && (g += "+"); g += this.length; this.tag.tagConstructed ? g += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (g += " (encapsulates)"); g += "\n"; if (null !== this.sub) { h += "  "; for (var p = 0, l = this.sub.length; p < l; ++p)g += this.sub[p].toPrettyString(h) } return g
                    }; f.prototype.posStart = function () { return this.stream.pos }; f.prototype.posContent = function () { return this.stream.pos + this.header }; f.prototype.posEnd = function () {
                        return this.stream.pos +
                            this.header + Math.abs(this.length)
                    }; f.prototype.toHexString = function () { return this.stream.hexDump(this.posStart(), this.posEnd(), !0) }; f.decodeLength = function (h) { var g = h.get(), p = g & 127; if (p == g) return p; if (6 < p) throw Error("Length over 48 bits not supported at position " + (h.pos - 1)); if (0 === p) return null; for (var l = g = 0; l < p; ++l)g = 256 * g + h.get(); return g }; f.prototype.getHexStringValue = function () { return this.toHexString().substr(2 * this.header, 2 * this.length) }; f.decode = function (h) {
                        var g = h instanceof n ? h : new n(h,
                            0); h = new n(g); var p = new t(g), l = f.decodeLength(g), y = g.pos, A = y - h.pos, E = null, G = function () { var H = []; if (null !== l) { for (var M = y + l; g.pos < M;)H[H.length] = f.decode(g); if (g.pos != M) throw Error("Content size is not correct for container starting at offset " + y); } else try { for (; ;) { M = f.decode(g); if (M.tag.isEOC()) break; H[H.length] = M } l = y - g.pos } catch (F) { throw Error("Exception while decoding undefined length content: " + F); } return H }; if (p.tagConstructed) E = G(); else if (p.isUniversal() && (3 == p.tagNumber || 4 == p.tagNumber)) try {
                                if (3 ==
                                    p.tagNumber && 0 != g.get()) throw Error("BIT STRINGs with unused bits cannot encapsulate."); E = G(); for (G = 0; G < E.length; ++G)if (E[G].tag.isEOC()) throw Error("EOC is not supposed to be actual content.");
                            } catch (H) { E = null } if (null === E) { if (null === l) throw Error("We can't skip over an invalid tag with undefined length at offset " + y); g.pos = y + Math.abs(l) } return new f(h, A, l, p, E)
                    }; return f
                }(); v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); Object.defineProperty(v, "ASN1", {
                    enumerable: !0, configurable: !0,
                    get: function () { return w }
                }); var t = function () { function f(h) { var g = h.get(); this.tagClass = g >> 6; this.tagConstructed = 0 !== (g & 32); this.tagNumber = g & 31; if (31 == this.tagNumber) { var p = new m; do g = h.get(), p.mulAdd(128, g & 127); while (g & 128); this.tagNumber = p.simplify() } } f.prototype.isUniversal = function () { return 0 === this.tagClass }; f.prototype.isEOC = function () { return 0 === this.tagClass && 0 === this.tagNumber }; return f }(); v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); Object.defineProperty(v, "ASN1Tag", {
                    enumerable: !0,
                    configurable: !0, get: function () { return t }
                })
        }, function (u) { return I({ "./int10": 1635488321558 }[u], u) }); K(1635488321558, function (u, C, v) {
            var r = function () {
                function m(d) { this.buf = [+d || 0] } m.prototype.mulAdd = function (d, e) { var n = this.buf, w = n.length, t; for (t = 0; t < w; ++t) { var f = n[t] * d + e; 1E13 > f ? e = 0 : (e = 0 | f / 1E13, f -= 1E13 * e); n[t] = f } 0 < e && (n[t] = e) }; m.prototype.sub = function (d) { var e = this.buf, n = e.length, w; for (w = 0; w < n; ++w) { var t = e[w] - d; 0 > t ? (t += 1E13, d = 1) : d = 0; e[w] = t } for (; 0 === e[e.length - 1];)e.pop() }; m.prototype.toString = function (d) {
                    if (10 !=
                        (d || 10)) throw Error("only base 10 is supported"); d = this.buf; for (var e = d[d.length - 1].toString(), n = d.length - 2; 0 <= n; --n)e += (1E13 + d[n]).toString().substring(1); return e
                }; m.prototype.valueOf = function () { for (var d = this.buf, e = 0, n = d.length - 1; 0 <= n; --n)e = 1E13 * e + d[n]; return e }; m.prototype.simplify = function () { var d = this.buf; return 1 == d.length ? d[0] : this }; return m
            }(); v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); Object.defineProperty(v, "Int10", { enumerable: !0, configurable: !0, get: function () { return r } })
        },
            function (u) { return I({}[u], u) }); K(1635488321559, function (u, C, v) {
                C = u("./jsbn"); var r = C.BigInteger, m = C.nbi, d = C.parseBigInt; C = u("./rng"); var e = C.SecureRandom, n = function () {
                    function t() { this.n = null; this.e = 0; this.coeff = this.dmq1 = this.dmp1 = this.q = this.p = this.d = null } t.prototype.doPublic = function (f) { return f.modPowInt(this.e, this.n) }; t.prototype.doPrivate = function (f) {
                        if (null == this.p || null == this.q) return f.modPow(this.d, this.n); var h = f.mod(this.p).modPow(this.dmp1, this.p); for (f = f.mod(this.q).modPow(this.dmq1,
                            this.q); 0 > h.compareTo(f);)h = h.add(this.p); return h.subtract(f).multiply(this.coeff).mod(this.p).multiply(this.q).add(f)
                    }; t.prototype.setPublic = function (f, h) { null != f && null != h && 0 < f.length && 0 < h.length ? (this.n = d(f, 16), this.e = parseInt(h, 16)) : console.error("Invalid RSA public key") }; t.prototype.encrypt = function (f) {
                        var h = this.n.bitLength() + 7 >> 3; var g = h; if (g < f.length + 11) console.error("Message too long for RSA"), g = null; else {
                            for (var p = [], l = f.length - 1; 0 <= l && 0 < g;) {
                                var y = f.charCodeAt(l--); 128 > y ? p[--g] = y : 127 < y &&
                                    2048 > y ? (p[--g] = y & 63 | 128, p[--g] = y >> 6 | 192) : (p[--g] = y & 63 | 128, p[--g] = y >> 6 & 63 | 128, p[--g] = y >> 12 | 224)
                            } p[--g] = 0; f = new e; for (l = []; 2 < g;) { for (l[0] = 0; 0 == l[0];)f.nextBytes(l); p[--g] = l[0] } p[--g] = 2; p[--g] = 0; g = new r(p)
                        } if (null == g) return null; g = this.doPublic(g); if (null == g) return null; g = g.toString(16); p = g.length; for (f = 0; f < 2 * h - p; f++)g = "0" + g; return g
                    }; t.prototype.setPrivate = function (f, h, g) { null != f && null != h && 0 < f.length && 0 < h.length ? (this.n = d(f, 16), this.e = parseInt(h, 16), this.d = d(g, 16)) : console.error("Invalid RSA private key") };
                    t.prototype.setPrivateEx = function (f, h, g, p, l, y, A, E) { null != f && null != h && 0 < f.length && 0 < h.length ? (this.n = d(f, 16), this.e = parseInt(h, 16), this.d = d(g, 16), this.p = d(p, 16), this.q = d(l, 16), this.dmp1 = d(y, 16), this.dmq1 = d(A, 16), this.coeff = d(E, 16)) : console.error("Invalid RSA private key") }; t.prototype.generate = function (f, h) {
                        var g = new e, p = f >> 1; this.e = parseInt(h, 16); for (h = new r(h, 16); ;) {
                            for (; this.p = new r(f - p, 1, g), 0 != this.p.subtract(r.ONE).gcd(h).compareTo(r.ONE) || !this.p.isProbablePrime(10);); for (; this.q = new r(p, 1, g),
                                0 != this.q.subtract(r.ONE).gcd(h).compareTo(r.ONE) || !this.q.isProbablePrime(10);); if (0 >= this.p.compareTo(this.q)) { var l = this.p; this.p = this.q; this.q = l } l = this.p.subtract(r.ONE); var y = this.q.subtract(r.ONE), A = l.multiply(y); if (0 == A.gcd(h).compareTo(r.ONE)) { this.n = this.p.multiply(this.q); this.d = h.modInverse(A); this.dmp1 = this.d.mod(l); this.dmq1 = this.d.mod(y); this.coeff = this.q.modInverse(this.p); break }
                        }
                    }; t.prototype.decrypt = function (f) {
                        f = d(f, 16); f = this.doPrivate(f); if (null == f) return null; a: {
                            var h = this.n.bitLength() +
                                7 >> 3; f = f.toByteArray(); for (var g = 0; g < f.length && 0 == f[g];)++g; if (f.length - g != h - 1 || 2 != f[g]) f = null; else { for (++g; 0 != f[g];)if (++g >= f.length) { f = null; break a } for (h = ""; ++g < f.length;) { var p = f[g] & 255; 128 > p ? h += String.fromCharCode(p) : 191 < p && 224 > p ? (h += String.fromCharCode((p & 31) << 6 | f[g + 1] & 63), ++g) : (h += String.fromCharCode((p & 15) << 12 | (f[g + 1] & 63) << 6 | f[g + 2] & 63), g += 2) } f = h }
                        } return f
                    }; t.prototype.generateAsync = function (f, h, g) {
                        var p = new e, l = f >> 1; this.e = parseInt(h, 16); var y = new r(h, 16), A = this, E = function () {
                            var G = function () {
                                if (0 >=
                                    A.p.compareTo(A.q)) { var F = A.p; A.p = A.q; A.q = F } F = A.p.subtract(r.ONE); var q = A.q.subtract(r.ONE), a = F.multiply(q); 0 == a.gcd(y).compareTo(r.ONE) ? (A.n = A.p.multiply(A.q), A.d = y.modInverse(a), A.dmp1 = A.d.mod(F), A.dmq1 = A.d.mod(q), A.coeff = A.q.modInverse(A.p), setTimeout(function () { g() }, 0)) : setTimeout(E, 0)
                            }, H = function () { A.q = m(); A.q.fromNumberAsync(l, 1, p, function () { A.q.subtract(r.ONE).gcda(y, function (F) { 0 == F.compareTo(r.ONE) && A.q.isProbablePrime(10) ? setTimeout(G, 0) : setTimeout(H, 0) }) }) }, M = function () {
                                A.p = m(); A.p.fromNumberAsync(f -
                                    l, 1, p, function () { A.p.subtract(r.ONE).gcda(y, function (F) { 0 == F.compareTo(r.ONE) && A.p.isProbablePrime(10) ? setTimeout(H, 0) : setTimeout(M, 0) }) })
                            }; setTimeout(M, 0)
                        }; setTimeout(E, 0)
                    }; t.prototype.sign = function (f, h, g) {
                        f = (w[g] || "") + h(f).toString(); h = this.n.bitLength() / 4; if (h < f.length + 22) console.error("Message too long for RSA"), f = null; else { h = h - f.length - 6; g = ""; for (var p = 0; p < h; p += 2)g += "ff"; f = d("0001" + g + "00" + f, 16) } if (null == f) return null; f = this.doPrivate(f); if (null == f) return null; f = f.toString(16); return 0 == (f.length &
                            1) ? f : "0" + f
                    }; t.prototype.verify = function (f, h, g) { h = d(h, 16); h = this.doPublic(h); if (null == h) return null; a: { h = h.toString(16).replace(/^1f+00/, ""); for (y in w) if (w.hasOwnProperty(y)) { var p = w[y], l = p.length; if (h.substr(0, l) == p) { var y = h.substr(l); break a } } y = h } return y == g(f).toString() }; t.prototype.encryptLong = function (f) { var h = this, g = "", p = (this.n.bitLength() + 7 >> 3) - 11; this.setSplitChn(f, p).forEach(function (l) { g += h.encrypt(l) }); return g }; t.prototype.decryptLong = function (f) {
                        var h = this.n.bitLength() + 7 >> 3; var g =
                            2 * h; if (f.length > g) {
                                g = f.match(new RegExp(".{1," + g + "}", "g")) || []; f = []; for (var p = 0; p < g.length; p++) { var l = d(g[p], 16); l = this.doPrivate(l); if (null == l) return null; f.push(l) } a: {
                                    g = []; for (p = 0; p < f.length; p++) { l = f[p].toByteArray(); for (var y = 0; y < l.length && 0 == l[y];)++y; if (l.length - y != h - 1 || 2 != l[y]) { h = null; break a } for (++y; 0 != l[y];)if (++y >= l.length) { h = null; break a } g = g.concat(l.slice(y + 1)) } h = g; f = -1; for (g = ""; ++f < h.length;)p = h[f] & 255, 128 > p ? g += String.fromCharCode(p) : 191 < p && 224 > p ? (g += String.fromCharCode((p & 31) << 6 | h[f +
                                        1] & 63), ++f) : (g += String.fromCharCode((p & 15) << 12 | (h[f + 1] & 63) << 6 | h[f + 2] & 63), f += 2); h = g
                                }
                            } else h = this.decrypt(f); return h
                    }; t.prototype.setSplitChn = function (f, h, g) { void 0 === g && (g = []); for (var p = f.split(""), l = 0, y = 0; y < p.length; y++) { var A = p[y].charCodeAt(0); l = 127 >= A ? l + 1 : 2047 >= A ? l + 2 : 65535 >= A ? l + 3 : l + 4; if (l > h) return p = f.substring(0, y), g.push(p), this.setSplitChn(f.substring(y), h, g) } g.push(f); return g }; return t
                }(); v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); Object.defineProperty(v, "RSAKey", {
                    enumerable: !0,
                    configurable: !0, get: function () { return n }
                }); var w = { md2: "3020300c06082a864886f70d020205000410", md5: "3020300c06082a864886f70d020505000410", sha1: "3021300906052b0e03021a05000414", sha224: "302d300d06096086480165030402040500041c", sha256: "3031300d060960864801650304020105000420", sha384: "3041300d060960864801650304020205000430", sha512: "3051300d060960864801650304020305000440", ripemd160: "3021300906052b2403020105000414" }
            }, function (u) { return I({ "./jsbn": 1635488321560, "./rng": 1635488321561 }[u], u) }); K(1635488321560,
                function (u, C, v) {
                    function r() { return new A(null) } function m(q, a) { q = F[q.charCodeAt(a)]; return null == q ? -1 : q } function d(q) { var a = r(); a.fromInt(q); return a } function e(q) { var a = 1, b; 0 != (b = q >>> 16) && (q = b, a += 16); 0 != (b = q >> 8) && (q = b, a += 8); 0 != (b = q >> 4) && (q = b, a += 4); 0 != (b = q >> 2) && (q = b, a += 2); 0 != q >> 1 && (a += 1); return a } u = u("./util"); var n = u.cbit, w = u.int2char, t = u.lbit, f = u.op_and, h = u.op_andnot, g = u.op_or, p = u.op_xor, l = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139,
                        149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941,
                        947, 953, 967, 971, 977, 983, 991, 997], y = 67108864 / l[l.length - 1], A = function () {
                            function q(a, b, c) { null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b)) } q.prototype.toString = function (a) {
                                if (0 > this.s) return "-" + this.negate().toString(a); if (16 == a) a = 4; else if (8 == a) a = 3; else if (2 == a) a = 1; else if (32 == a) a = 5; else if (4 == a) a = 2; else return this.toRadix(a); var b = (1 << a) - 1, c, k = !1, x = "", z = this.t, B = this.DB - z * this.DB % a; if (0 < z--) for (B < this.DB && 0 < (c = this[z] >>
                                    B) && (k = !0, x = w(c)); 0 <= z;)B < a ? (c = (this[z] & (1 << B) - 1) << a - B, c |= this[--z] >> (B += this.DB - a)) : (c = this[z] >> (B -= a) & b, 0 >= B && (B += this.DB, --z)), 0 < c && (k = !0), k && (x += w(c)); return k ? x : "0"
                            }; q.prototype.negate = function () { var a = r(); q.ZERO.subTo(this, a); return a }; q.prototype.abs = function () { return 0 > this.s ? this.negate() : this }; q.prototype.compareTo = function (a) { var b = this.s - a.s; if (0 != b) return b; var c = this.t; b = c - a.t; if (0 != b) return 0 > this.s ? -b : b; for (; 0 <= --c;)if (0 != (b = this[c] - a[c])) return b; return 0 }; q.prototype.bitLength = function () {
                                return 0 >=
                                    this.t ? 0 : this.DB * (this.t - 1) + e(this[this.t - 1] ^ this.s & this.DM)
                            }; q.prototype.mod = function (a) { var b = r(); this.abs().divRemTo(a, null, b); 0 > this.s && 0 < b.compareTo(q.ZERO) && a.subTo(b, b); return b }; q.prototype.modPowInt = function (a, b) { b = 256 > a || b.isEven() ? new G(b) : new H(b); return this.exp(a, b) }; q.prototype.clone = function () { var a = r(); this.copyTo(a); return a }; q.prototype.intValue = function () {
                                if (0 > this.s) { if (1 == this.t) return this[0] - this.DV; if (0 == this.t) return -1 } else { if (1 == this.t) return this[0]; if (0 == this.t) return 0 } return (this[1] &
                                    (1 << 32 - this.DB) - 1) << this.DB | this[0]
                            }; q.prototype.byteValue = function () { return 0 == this.t ? this.s : this[0] << 24 >> 24 }; q.prototype.shortValue = function () { return 0 == this.t ? this.s : this[0] << 16 >> 16 }; q.prototype.signum = function () { return 0 > this.s ? -1 : 0 >= this.t || 1 == this.t && 0 >= this[0] ? 0 : 1 }; q.prototype.toByteArray = function () {
                                var a = this.t, b = []; b[0] = this.s; var c = this.DB - a * this.DB % 8, k, x = 0; if (0 < a--) for (c < this.DB && (k = this[a] >> c) != (this.s & this.DM) >> c && (b[x++] = k | this.s << this.DB - c); 0 <= a;)if (8 > c ? (k = (this[a] & (1 << c) - 1) << 8 - c, k |=
                                    this[--a] >> (c += this.DB - 8)) : (k = this[a] >> (c -= 8) & 255, 0 >= c && (c += this.DB, --a)), 0 != (k & 128) && (k |= -256), 0 == x && (this.s & 128) != (k & 128) && ++x, 0 < x || k != this.s) b[x++] = k; return b
                            }; q.prototype.equals = function (a) { return 0 == this.compareTo(a) }; q.prototype.min = function (a) { return 0 > this.compareTo(a) ? this : a }; q.prototype.max = function (a) { return 0 < this.compareTo(a) ? this : a }; q.prototype.and = function (a) { var b = r(); this.bitwiseTo(a, f, b); return b }; q.prototype.or = function (a) { var b = r(); this.bitwiseTo(a, g, b); return b }; q.prototype.xor =
                                function (a) { var b = r(); this.bitwiseTo(a, p, b); return b }; q.prototype.andNot = function (a) { var b = r(); this.bitwiseTo(a, h, b); return b }; q.prototype.not = function () { for (var a = r(), b = 0; b < this.t; ++b)a[b] = this.DM & ~this[b]; a.t = this.t; a.s = ~this.s; return a }; q.prototype.shiftLeft = function (a) { var b = r(); 0 > a ? this.rShiftTo(-a, b) : this.lShiftTo(a, b); return b }; q.prototype.shiftRight = function (a) { var b = r(); 0 > a ? this.lShiftTo(-a, b) : this.rShiftTo(a, b); return b }; q.prototype.getLowestSetBit = function () {
                                    for (var a = 0; a < this.t; ++a)if (0 !=
                                        this[a]) return a * this.DB + t(this[a]); return 0 > this.s ? this.t * this.DB : -1
                                }; q.prototype.bitCount = function () { for (var a = 0, b = this.s & this.DM, c = 0; c < this.t; ++c)a += n(this[c] ^ b); return a }; q.prototype.testBit = function (a) { var b = Math.floor(a / this.DB); return b >= this.t ? 0 != this.s : 0 != (this[b] & 1 << a % this.DB) }; q.prototype.setBit = function (a) { return this.changeBit(a, g) }; q.prototype.clearBit = function (a) { return this.changeBit(a, h) }; q.prototype.flipBit = function (a) { return this.changeBit(a, p) }; q.prototype.add = function (a) {
                                    var b =
                                        r(); this.addTo(a, b); return b
                                }; q.prototype.subtract = function (a) { var b = r(); this.subTo(a, b); return b }; q.prototype.multiply = function (a) { var b = r(); this.multiplyTo(a, b); return b }; q.prototype.divide = function (a) { var b = r(); this.divRemTo(a, b, null); return b }; q.prototype.remainder = function (a) { var b = r(); this.divRemTo(a, null, b); return b }; q.prototype.divideAndRemainder = function (a) { var b = r(), c = r(); this.divRemTo(a, b, c); return [b, c] }; q.prototype.modPow = function (a, b) {
                                    var c = a.bitLength(), k = d(1); if (0 >= c) return k; var x =
                                        18 > c ? 1 : 48 > c ? 3 : 144 > c ? 4 : 768 > c ? 5 : 6; b = 8 > c ? new G(b) : b.isEven() ? new M(b) : new H(b); var z = [], B = 3, D = x - 1, L = (1 << x) - 1; z[1] = b.convert(this); if (1 < x) for (c = r(), b.sqrTo(z[1], c); B <= L;)z[B] = r(), b.mulTo(c, z[B - 2], z[B]), B += 2; var N = a.t - 1, R = !0, J = r(); for (c = e(a[N]) - 1; 0 <= N;) {
                                            if (c >= D) var O = a[N] >> c - D & L; else O = (a[N] & (1 << c + 1) - 1) << D - c, 0 < N && (O |= a[N - 1] >> this.DB + c - D); for (B = x; 0 == (O & 1);)O >>= 1, --B; 0 > (c -= B) && (c += this.DB, --N); if (R) z[O].copyTo(k), R = !1; else {
                                                for (; 1 < B;)b.sqrTo(k, J), b.sqrTo(J, k), B -= 2; 0 < B ? b.sqrTo(k, J) : (B = k, k = J, J = B); b.mulTo(J,
                                                    z[O], k)
                                            } for (; 0 <= N && 0 == (a[N] & 1 << c);)b.sqrTo(k, J), B = k, k = J, J = B, 0 > --c && (c = this.DB - 1, --N)
                                        } return b.revert(k)
                                }; q.prototype.modInverse = function (a) {
                                    var b = a.isEven(); if (this.isEven() && b || 0 == a.signum()) return q.ZERO; for (var c = a.clone(), k = this.clone(), x = d(1), z = d(0), B = d(0), D = d(1); 0 != c.signum();) {
                                        for (; c.isEven();)c.rShiftTo(1, c), b ? (x.isEven() && z.isEven() || (x.addTo(this, x), z.subTo(a, z)), x.rShiftTo(1, x)) : z.isEven() || z.subTo(a, z), z.rShiftTo(1, z); for (; k.isEven();)k.rShiftTo(1, k), b ? (B.isEven() && D.isEven() || (B.addTo(this,
                                            B), D.subTo(a, D)), B.rShiftTo(1, B)) : D.isEven() || D.subTo(a, D), D.rShiftTo(1, D); 0 <= c.compareTo(k) ? (c.subTo(k, c), b && x.subTo(B, x), z.subTo(D, z)) : (k.subTo(c, k), b && B.subTo(x, B), D.subTo(z, D))
                                    } if (0 != k.compareTo(q.ONE)) return q.ZERO; if (0 <= D.compareTo(a)) return D.subtract(a); if (0 > D.signum()) D.addTo(a, D); else return D; return 0 > D.signum() ? D.add(a) : D
                                }; q.prototype.pow = function (a) { return this.exp(a, new E) }; q.prototype.gcd = function (a) {
                                    var b = 0 > this.s ? this.negate() : this.clone(); a = 0 > a.s ? a.negate() : a.clone(); if (0 > b.compareTo(a)) {
                                        var c =
                                            b; b = a; a = c
                                    } c = b.getLowestSetBit(); var k = a.getLowestSetBit(); if (0 > k) return b; c < k && (k = c); 0 < k && (b.rShiftTo(k, b), a.rShiftTo(k, a)); for (; 0 < b.signum();)0 < (c = b.getLowestSetBit()) && b.rShiftTo(c, b), 0 < (c = a.getLowestSetBit()) && a.rShiftTo(c, a), 0 <= b.compareTo(a) ? (b.subTo(a, b), b.rShiftTo(1, b)) : (a.subTo(b, a), a.rShiftTo(1, a)); 0 < k && a.lShiftTo(k, a); return a
                                }; q.prototype.isProbablePrime = function (a) {
                                    var b, c = this.abs(); if (1 == c.t && c[0] <= l[l.length - 1]) { for (b = 0; b < l.length; ++b)if (c[0] == l[b]) return !0; return !1 } if (c.isEven()) return !1;
                                    for (b = 1; b < l.length;) { for (var k = l[b], x = b + 1; x < l.length && k < y;)k *= l[x++]; for (k = c.modInt(k); b < x;)if (0 == k % l[b++]) return !1 } return c.millerRabin(a)
                                }; q.prototype.copyTo = function (a) { for (var b = this.t - 1; 0 <= b; --b)a[b] = this[b]; a.t = this.t; a.s = this.s }; q.prototype.fromInt = function (a) { this.t = 1; this.s = 0 > a ? -1 : 0; 0 < a ? this[0] = a : -1 > a ? this[0] = a + this.DV : this.t = 0 }; q.prototype.fromString = function (a, b) {
                                    if (16 == b) b = 4; else if (8 == b) b = 3; else if (256 == b) b = 8; else if (2 == b) b = 1; else if (32 == b) b = 5; else if (4 == b) b = 2; else {
                                        this.fromRadix(a, b);
                                        return
                                    } this.s = this.t = 0; for (var c = a.length, k = !1, x = 0; 0 <= --c;) { var z = 8 == b ? +a[c] & 255 : m(a, c); 0 > z ? "-" == a.charAt(c) && (k = !0) : (k = !1, 0 == x ? this[this.t++] = z : x + b > this.DB ? (this[this.t - 1] |= (z & (1 << this.DB - x) - 1) << x, this[this.t++] = z >> this.DB - x) : this[this.t - 1] |= z << x, x += b, x >= this.DB && (x -= this.DB)) } 8 == b && 0 != (+a[0] & 128) && (this.s = -1, 0 < x && (this[this.t - 1] |= (1 << this.DB - x) - 1 << x)); this.clamp(); k && q.ZERO.subTo(this, this)
                                }; q.prototype.clamp = function () { for (var a = this.s & this.DM; 0 < this.t && this[this.t - 1] == a;)--this.t }; q.prototype.dlShiftTo =
                                    function (a, b) { var c; for (c = this.t - 1; 0 <= c; --c)b[c + a] = this[c]; for (c = a - 1; 0 <= c; --c)b[c] = 0; b.t = this.t + a; b.s = this.s }; q.prototype.drShiftTo = function (a, b) { for (var c = a; c < this.t; ++c)b[c - a] = this[c]; b.t = Math.max(this.t - a, 0); b.s = this.s }; q.prototype.lShiftTo = function (a, b) { var c = a % this.DB, k = this.DB - c, x = (1 << k) - 1; a = Math.floor(a / this.DB); for (var z = this.s << c & this.DM, B = this.t - 1; 0 <= B; --B)b[B + a + 1] = this[B] >> k | z, z = (this[B] & x) << c; for (B = a - 1; 0 <= B; --B)b[B] = 0; b[a] = z; b.t = this.t + a + 1; b.s = this.s; b.clamp() }; q.prototype.rShiftTo = function (a,
                                        b) { b.s = this.s; var c = Math.floor(a / this.DB); if (c >= this.t) b.t = 0; else { a %= this.DB; var k = this.DB - a, x = (1 << a) - 1; b[0] = this[c] >> a; for (var z = c + 1; z < this.t; ++z)b[z - c - 1] |= (this[z] & x) << k, b[z - c] = this[z] >> a; 0 < a && (b[this.t - c - 1] |= (this.s & x) << k); b.t = this.t - c; b.clamp() } }; q.prototype.subTo = function (a, b) {
                                            for (var c = 0, k = 0, x = Math.min(a.t, this.t); c < x;)k += this[c] - a[c], b[c++] = k & this.DM, k >>= this.DB; if (a.t < this.t) { for (k -= a.s; c < this.t;)k += this[c], b[c++] = k & this.DM, k >>= this.DB; k += this.s } else {
                                                for (k += this.s; c < a.t;)k -= a[c], b[c++] = k &
                                                    this.DM, k >>= this.DB; k -= a.s
                                            } b.s = 0 > k ? -1 : 0; -1 > k ? b[c++] = this.DV + k : 0 < k && (b[c++] = k); b.t = c; b.clamp()
                                        }; q.prototype.multiplyTo = function (a, b) { var c = this.abs(), k = a.abs(), x = c.t; for (b.t = x + k.t; 0 <= --x;)b[x] = 0; for (x = 0; x < k.t; ++x)b[x + c.t] = c.am(0, k[x], b, x, 0, c.t); b.s = 0; b.clamp(); this.s != a.s && q.ZERO.subTo(b, b) }; q.prototype.squareTo = function (a) {
                                            for (var b = this.abs(), c = a.t = 2 * b.t; 0 <= --c;)a[c] = 0; for (c = 0; c < b.t - 1; ++c) {
                                                var k = b.am(c, b[c], a, 2 * c, 0, 1); (a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, k, b.t - c - 1)) >= b.DV && (a[c + b.t] -= b.DV, a[c + b.t +
                                                    1] = 1)
                                            } 0 < a.t && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1)); a.s = 0; a.clamp()
                                        }; q.prototype.divRemTo = function (a, b, c) {
                                            var k = a.abs(); if (!(0 >= k.t)) {
                                                var x = this.abs(); if (x.t < k.t) null != b && b.fromInt(0), null != c && this.copyTo(c); else {
                                                    null == c && (c = r()); var z = r(), B = this.s; a = a.s; var D = this.DB - e(k[k.t - 1]); 0 < D ? (k.lShiftTo(D, z), x.lShiftTo(D, c)) : (k.copyTo(z), x.copyTo(c)); k = z.t; x = z[k - 1]; if (0 != x) {
                                                        var L = x * (1 << this.F1) + (1 < k ? z[k - 2] >> this.F2 : 0), N = this.FV / L; L = (1 << this.F1) / L; var R = 1 << this.F2, J = c.t, O = J - k, Q = null == b ? r() : b; z.dlShiftTo(O, Q);
                                                        0 <= c.compareTo(Q) && (c[c.t++] = 1, c.subTo(Q, c)); q.ONE.dlShiftTo(k, Q); for (Q.subTo(z, z); z.t < k;)z[z.t++] = 0; for (; 0 <= --O;) { var S = c[--J] == x ? this.DM : Math.floor(c[J] * N + (c[J - 1] + R) * L); if ((c[J] += z.am(0, S, c, O, 0, k)) < S) for (z.dlShiftTo(O, Q), c.subTo(Q, c); c[J] < --S;)c.subTo(Q, c) } null != b && (c.drShiftTo(k, b), B != a && q.ZERO.subTo(b, b)); c.t = k; c.clamp(); 0 < D && c.rShiftTo(D, c); 0 > B && q.ZERO.subTo(c, c)
                                                    }
                                                }
                                            }
                                        }; q.prototype.invDigit = function () {
                                            if (1 > this.t) return 0; var a = this[0]; if (0 == (a & 1)) return 0; var b = a & 3; b = b * (2 - (a & 15) * b) & 15; b = b * (2 - (a &
                                                255) * b) & 255; b = b * (2 - ((a & 65535) * b & 65535)) & 65535; b = b * (2 - a * b % this.DV) % this.DV; return 0 < b ? this.DV - b : -b
                                        }; q.prototype.isEven = function () { return 0 == (0 < this.t ? this[0] & 1 : this.s) }; q.prototype.exp = function (a, b) { if (4294967295 < a || 1 > a) return q.ONE; var c = r(), k = r(), x = b.convert(this), z = e(a) - 1; for (x.copyTo(c); 0 <= --z;)if (b.sqrTo(c, k), 0 < (a & 1 << z)) b.mulTo(k, x, c); else { var B = c; c = k; k = B } return b.revert(c) }; q.prototype.chunkSize = function (a) { return Math.floor(Math.LN2 * this.DB / Math.log(a)) }; q.prototype.toRadix = function (a) {
                                            null ==
                                            a && (a = 10); if (0 == this.signum() || 2 > a || 36 < a) return "0"; var b = this.chunkSize(a); b = Math.pow(a, b); var c = d(b), k = r(), x = r(), z = ""; for (this.divRemTo(c, k, x); 0 < k.signum();)z = (b + x.intValue()).toString(a).substr(1) + z, k.divRemTo(c, k, x); return x.intValue().toString(a) + z
                                        }; q.prototype.fromRadix = function (a, b) {
                                            this.fromInt(0); null == b && (b = 10); for (var c = this.chunkSize(b), k = Math.pow(b, c), x = !1, z = 0, B = 0, D = 0; D < a.length; ++D) {
                                                var L = m(a, D); 0 > L ? "-" == a.charAt(D) && 0 == this.signum() && (x = !0) : (B = b * B + L, ++z >= c && (this.dMultiply(k), this.dAddOffset(B,
                                                    0), B = z = 0))
                                            } 0 < z && (this.dMultiply(Math.pow(b, z)), this.dAddOffset(B, 0)); x && q.ZERO.subTo(this, this)
                                        }; q.prototype.fromNumber = function (a, b, c) {
                                            if ("number" == typeof b) if (2 > a) this.fromInt(1); else for (this.fromNumber(a, c), this.testBit(a - 1) || this.bitwiseTo(q.ONE.shiftLeft(a - 1), g, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(b);)this.dAddOffset(2, 0), this.bitLength() > a && this.subTo(q.ONE.shiftLeft(a - 1), this); else {
                                                c = []; var k = a & 7; c.length = (a >> 3) + 1; b.nextBytes(c); c[0] = 0 < k ? c[0] & (1 << k) - 1 : 0; this.fromString(c,
                                                    256)
                                            }
                                        }; q.prototype.bitwiseTo = function (a, b, c) { var k, x = Math.min(a.t, this.t); for (k = 0; k < x; ++k)c[k] = b(this[k], a[k]); if (a.t < this.t) { var z = a.s & this.DM; for (k = x; k < this.t; ++k)c[k] = b(this[k], z); c.t = this.t } else { z = this.s & this.DM; for (k = x; k < a.t; ++k)c[k] = b(z, a[k]); c.t = a.t } c.s = b(this.s, a.s); c.clamp() }; q.prototype.changeBit = function (a, b) { a = q.ONE.shiftLeft(a); this.bitwiseTo(a, b, a); return a }; q.prototype.addTo = function (a, b) {
                                            for (var c = 0, k = 0, x = Math.min(a.t, this.t); c < x;)k += this[c] + a[c], b[c++] = k & this.DM, k >>= this.DB; if (a.t <
                                                this.t) { for (k += a.s; c < this.t;)k += this[c], b[c++] = k & this.DM, k >>= this.DB; k += this.s } else { for (k += this.s; c < a.t;)k += a[c], b[c++] = k & this.DM, k >>= this.DB; k += a.s } b.s = 0 > k ? -1 : 0; 0 < k ? b[c++] = k : -1 > k && (b[c++] = this.DV + k); b.t = c; b.clamp()
                                        }; q.prototype.dMultiply = function (a) { this[this.t] = this.am(0, a - 1, this, 0, 0, this.t); ++this.t; this.clamp() }; q.prototype.dAddOffset = function (a, b) { if (0 != a) { for (; this.t <= b;)this[this.t++] = 0; for (this[b] += a; this[b] >= this.DV;)this[b] -= this.DV, ++b >= this.t && (this[this.t++] = 0), ++this[b] } }; q.prototype.multiplyLowerTo =
                                            function (a, b, c) { var k = Math.min(this.t + a.t, b); c.s = 0; for (c.t = k; 0 < k;)c[--k] = 0; for (var x = c.t - this.t; k < x; ++k)c[k + this.t] = this.am(0, a[k], c, k, 0, this.t); for (x = Math.min(a.t, b); k < x; ++k)this.am(0, a[k], c, k, 0, b - k); c.clamp() }; q.prototype.multiplyUpperTo = function (a, b, c) { --b; var k = c.t = this.t + a.t - b; for (c.s = 0; 0 <= --k;)c[k] = 0; for (k = Math.max(b - this.t, 0); k < a.t; ++k)c[this.t + k - b] = this.am(b - k, a[k], c, 0, 0, this.t + k - b); c.clamp(); c.drShiftTo(1, c) }; q.prototype.modInt = function (a) {
                                                if (0 >= a) return 0; var b = this.DV % a, c = 0 > this.s ? a - 1 :
                                                    0; if (0 < this.t) if (0 == b) c = this[0] % a; else for (var k = this.t - 1; 0 <= k; --k)c = (b * c + this[k]) % a; return c
                                            }; q.prototype.millerRabin = function (a) { var b = this.subtract(q.ONE), c = b.getLowestSetBit(); if (0 >= c) return !1; var k = b.shiftRight(c); a = a + 1 >> 1; a > l.length && (a = l.length); for (var x = r(), z = 0; z < a; ++z) { x.fromInt(l[Math.floor(Math.random() * l.length)]); var B = x.modPow(k, this); if (0 != B.compareTo(q.ONE) && 0 != B.compareTo(b)) { for (var D = 1; D++ < c && 0 != B.compareTo(b);)if (B = B.modPowInt(2, this), 0 == B.compareTo(q.ONE)) return !1; if (0 != B.compareTo(b)) return !1 } } return !0 };
                            q.prototype.square = function () { var a = r(); this.squareTo(a); return a }; q.prototype.gcda = function (a, b) {
                                var c = 0 > this.s ? this.negate() : this.clone(), k = 0 > a.s ? a.negate() : a.clone(); 0 > c.compareTo(k) && (a = c, c = k, k = a); var x = c.getLowestSetBit(), z = k.getLowestSetBit(); if (0 > z) b(c); else {
                                    x < z && (z = x); 0 < z && (c.rShiftTo(z, c), k.rShiftTo(z, k)); var B = function () {
                                        0 < (x = c.getLowestSetBit()) && c.rShiftTo(x, c); 0 < (x = k.getLowestSetBit()) && k.rShiftTo(x, k); 0 <= c.compareTo(k) ? (c.subTo(k, c), c.rShiftTo(1, c)) : (k.subTo(c, k), k.rShiftTo(1, k)); 0 <
                                            c.signum() ? setTimeout(B, 0) : (0 < z && k.lShiftTo(z, k), setTimeout(function () { b(k) }, 0))
                                    }; setTimeout(B, 10)
                                }
                            }; q.prototype.fromNumberAsync = function (a, b, c, k) {
                                if ("number" == typeof b) if (2 > a) this.fromInt(1); else { this.fromNumber(a, c); this.testBit(a - 1) || this.bitwiseTo(q.ONE.shiftLeft(a - 1), g, this); this.isEven() && this.dAddOffset(1, 0); var x = this, z = function () { x.dAddOffset(2, 0); x.bitLength() > a && x.subTo(q.ONE.shiftLeft(a - 1), x); x.isProbablePrime(b) ? setTimeout(function () { k() }, 0) : setTimeout(z, 0) }; setTimeout(z, 0) } else {
                                    c = [];
                                    var B = a & 7; c.length = (a >> 3) + 1; b.nextBytes(c); c[0] = 0 < B ? c[0] & (1 << B) - 1 : 0; this.fromString(c, 256)
                                }
                            }; return q
                        }(); v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); Object.defineProperty(v, "BigInteger", { enumerable: !0, configurable: !0, get: function () { return A } }); var E = function () { function q() { } q.prototype.convert = function (a) { return a }; q.prototype.revert = function (a) { return a }; q.prototype.mulTo = function (a, b, c) { a.multiplyTo(b, c) }; q.prototype.sqrTo = function (a, b) { a.squareTo(b) }; return q }(), G = function () {
                            function q(a) {
                                this.m =
                                a
                            } q.prototype.convert = function (a) { return 0 > a.s || 0 <= a.compareTo(this.m) ? a.mod(this.m) : a }; q.prototype.revert = function (a) { return a }; q.prototype.reduce = function (a) { a.divRemTo(this.m, null, a) }; q.prototype.mulTo = function (a, b, c) { a.multiplyTo(b, c); this.reduce(c) }; q.prototype.sqrTo = function (a, b) { a.squareTo(b); this.reduce(b) }; return q
                        }(), H = function () {
                            function q(a) { this.m = a; this.mp = a.invDigit(); this.mpl = this.mp & 32767; this.mph = this.mp >> 15; this.um = (1 << a.DB - 15) - 1; this.mt2 = 2 * a.t } q.prototype.convert = function (a) {
                                var b =
                                    r(); a.abs().dlShiftTo(this.m.t, b); b.divRemTo(this.m, null, b); 0 > a.s && 0 < b.compareTo(A.ZERO) && this.m.subTo(b, b); return b
                            }; q.prototype.revert = function (a) { var b = r(); a.copyTo(b); this.reduce(b); return b }; q.prototype.reduce = function (a) {
                                for (; a.t <= this.mt2;)a[a.t++] = 0; for (var b = 0; b < this.m.t; ++b) { var c = a[b] & 32767, k = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM; c = b + this.m.t; for (a[c] += this.m.am(0, k, a, b, 0, this.m.t); a[c] >= a.DV;)a[c] -= a.DV, a[++c]++ } a.clamp(); a.drShiftTo(this.m.t, a); 0 <= a.compareTo(this.m) &&
                                    a.subTo(this.m, a)
                            }; q.prototype.mulTo = function (a, b, c) { a.multiplyTo(b, c); this.reduce(c) }; q.prototype.sqrTo = function (a, b) { a.squareTo(b); this.reduce(b) }; return q
                        }(), M = function () {
                            function q(a) { this.m = a; this.r2 = r(); this.q3 = r(); A.ONE.dlShiftTo(2 * a.t, this.r2); this.mu = this.r2.divide(a) } q.prototype.convert = function (a) { if (0 > a.s || a.t > 2 * this.m.t) return a.mod(this.m); if (0 > a.compareTo(this.m)) return a; var b = r(); a.copyTo(b); this.reduce(b); return b }; q.prototype.revert = function (a) { return a }; q.prototype.reduce = function (a) {
                                a.drShiftTo(this.m.t -
                                    1, this.r2); a.t > this.m.t + 1 && (a.t = this.m.t + 1, a.clamp()); this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3); for (this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); 0 > a.compareTo(this.r2);)a.dAddOffset(1, this.m.t + 1); for (a.subTo(this.r2, a); 0 <= a.compareTo(this.m);)a.subTo(this.m, a)
                            }; q.prototype.mulTo = function (a, b, c) { a.multiplyTo(b, c); this.reduce(c) }; q.prototype.sqrTo = function (a, b) { a.squareTo(b); this.reduce(b) }; return q
                        }(); v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.nbi = r; v.__esModule ||
                            Object.defineProperty(v, "__esModule", { value: !0 }); v.parseBigInt = function (q, a) { return new A(q, a) }; (u = "undefined" !== typeof navigator) && "Microsoft Internet Explorer" == navigator.appName ? (A.prototype.am = function (q, a, b, c, k, x) { var z = a & 32767; for (a >>= 15; 0 <= --x;) { var B = this[q] & 32767, D = this[q++] >> 15, L = a * B + D * z; B = z * B + ((L & 32767) << 15) + b[c] + (k & 1073741823); k = (B >>> 30) + (L >>> 15) + a * D + (k >>> 30); b[c++] = B & 1073741823 } return k }, u = 30) : u && "Netscape" != navigator.appName ? (A.prototype.am = function (q, a, b, c, k, x) {
                                for (; 0 <= --x;) {
                                    var z =
                                        a * this[q++] + b[c] + k; k = Math.floor(z / 67108864); b[c++] = z & 67108863
                                } return k
                            }, u = 26) : (A.prototype.am = function (q, a, b, c, k, x) { var z = a & 16383; for (a >>= 14; 0 <= --x;) { var B = this[q] & 16383, D = this[q++] >> 14, L = a * B + D * z; B = z * B + ((L & 16383) << 14) + b[c] + k; k = (B >> 28) + (L >> 14) + a * D; b[c++] = B & 268435455 } return k }, u = 28); A.prototype.DB = u; A.prototype.DM = (1 << u) - 1; A.prototype.DV = 1 << u; A.prototype.FV = Math.pow(2, 52); A.prototype.F1 = 52 - u; A.prototype.F2 = 2 * u - 52; var F = []; u = 48; for (C = 0; 9 >= C; ++C)F[u++] = C; u = 97; for (C = 10; 36 > C; ++C)F[u++] = C; u = 65; for (C = 10; 36 >
                                C; ++C)F[u++] = C; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.intAt = m; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.nbv = d; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.nbits = e; A.ZERO = d(0); A.ONE = d(1)
                }, function (u) { return I({ "./util": 1635488321553 }[u], u) }); K(1635488321561, function (u, C, v) {
                    u = u("./prng4"); var r = u.prng_newstate, m = u.rng_psize, d, e = null; if (null == e) { e = []; var n = 0 } var w = function () {
                        function t() { } t.prototype.nextBytes = function (f) {
                            for (var h =
                                0; h < f.length; ++h) { var g = h; if (null == d) { for (d = r(); n < m;) { var p = Math.floor(65536 * Math.random()); e[n++] = p & 255 } d.init(e); for (n = 0; n < e.length; ++n)e[n] = 0; n = 0 } p = d.next(); f[g] = p }
                        }; return t
                    }(); v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); Object.defineProperty(v, "SecureRandom", { enumerable: !0, configurable: !0, get: function () { return w } })
                }, function (u) { return I({ "./prng4": 1635488321562 }[u], u) }); K(1635488321562, function (u, C, v) {
                    var r = function () {
                        function m() { this.j = this.i = 0; this.S = [] } m.prototype.init =
                            function (d) { var e, n; for (e = 0; 256 > e; ++e)this.S[e] = e; for (e = n = 0; 256 > e; ++e) { n = n + this.S[e] + d[e % d.length] & 255; var w = this.S[e]; this.S[e] = this.S[n]; this.S[n] = w } this.j = this.i = 0 }; m.prototype.next = function () { this.i = this.i + 1 & 255; this.j = this.j + this.S[this.i] & 255; var d = this.S[this.i]; this.S[this.i] = this.S[this.j]; this.S[this.j] = d; return this.S[d + this.S[this.i] & 255] }; return m
                    }(); v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); Object.defineProperty(v, "Arcfour", { enumerable: !0, configurable: !0, get: function () { return r } });
                    v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.prng_newstate = function () { return new r }; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); v.rng_psize = 256
                }, function (u) { return I({}[u], u) }); K(1635488321563, function (u, C, v) {
                    C = u("../jsbn/jsbn"); var r = C.BigInteger; C = u("./yahoo"); u = C.YAHOO; v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); var m = v.KJUR = {}; "undefined" != typeof m.asn1 && m.asn1 || (m.asn1 = {}); m.asn1.ASN1Util = new function () {
                        this.integerToByteHex = function (d) {
                            d =
                            d.toString(16); 1 == d.length % 2 && (d = "0" + d); return d
                        }; this.bigIntToMinTwosComplementsHex = function (d) { var e = d.toString(16); if ("-" != e.substr(0, 1)) 1 == e.length % 2 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e); else { var n = e.substr(1).length; 1 == n % 2 ? n += 1 : e.match(/^[0-7]/) || (n += 2); e = ""; for (var w = 0; w < n; w++)e += "f"; e = (new r(e, 16)).xor(d).add(r.ONE).toString(16).replace(/^-/, "") } return e }; this.getPEMStringFromHex = function (d, e) { return hextopem(d, e) }; this.newObject = function (d) {
                            var e = m.asn1, n = e.DERBoolean, w = e.DERInteger, t = e.DERBitString,
                            f = e.DEROctetString, h = e.DERNull, g = e.DERObjectIdentifier, p = e.DEREnumerated, l = e.DERUTF8String, y = e.DERNumericString, A = e.DERPrintableString, E = e.DERTeletexString, G = e.DERIA5String, H = e.DERUTCTime, M = e.DERGeneralizedTime, F = e.DERSequence, q = e.DERSet, a = e.DERTaggedObject; e = e.ASN1Util.newObject; var b = Object.keys(d); if (1 != b.length) throw "key of param shall be only one."; b = b[0]; if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + b + ":")) throw "undefined key: " +
                                b; if ("bool" == b) return new n(d[b]); if ("int" == b) return new w(d[b]); if ("bitstr" == b) return new t(d[b]); if ("octstr" == b) return new f(d[b]); if ("null" == b) return new h(d[b]); if ("oid" == b) return new g(d[b]); if ("enum" == b) return new p(d[b]); if ("utf8str" == b) return new l(d[b]); if ("numstr" == b) return new y(d[b]); if ("prnstr" == b) return new A(d[b]); if ("telstr" == b) return new E(d[b]); if ("ia5str" == b) return new G(d[b]); if ("utctime" == b) return new H(d[b]); if ("gentime" == b) return new M(d[b]); if ("seq" == b) {
                                    a = d[b]; d = []; for (n = 0; n <
                                        a.length; n++)w = e(a[n]), d.push(w); return new F({ array: d })
                                } if ("set" == b) { a = d[b]; d = []; for (n = 0; n < a.length; n++)w = e(a[n]), d.push(w); return new q({ array: d }) } if ("tag" == b) { F = d[b]; if ("[object Array]" === Object.prototype.toString.call(F) && 3 == F.length) return e = e(F[2]), new a({ tag: F[0], explicit: F[1], obj: e }); q = {}; void 0 !== F.explicit && (q.explicit = F.explicit); void 0 !== F.tag && (q.tag = F.tag); if (void 0 === F.obj) throw "obj shall be specified for 'tag'."; q.obj = e(F.obj); return new a(q) }
                        }; this.jsonToASN1HEX = function (d) { return this.newObject(d).getEncodedHex() }
                    };
                    m.asn1.ASN1Util.oidHexToInt = function (d) { var e = parseInt(d.substr(0, 2), 16); e = Math.floor(e / 40) + "." + e % 40; for (var n = "", w = 2; w < d.length; w += 2) { var t = ("00000000" + parseInt(d.substr(w, 2), 16).toString(2)).slice(-8); n += t.substr(1, 7); "0" == t.substr(0, 1) && (n = new r(n, 2), e = e + "." + n.toString(10), n = "") } return e }; m.asn1.ASN1Util.oidIntToHex = function (d) {
                        var e = function (f) { f = f.toString(16); 1 == f.length && (f = "0" + f); return f }, n = function (f) {
                            var h = ""; f = (new r(f, 10)).toString(2); var g = 7 - f.length % 7; 7 == g && (g = 0); for (var p = "", l = 0; l <
                                g; l++)p += "0"; f = p + f; for (l = 0; l < f.length - 1; l += 7)g = f.substr(l, 7), l != f.length - 7 && (g = "1" + g), h += e(parseInt(g, 2)); return h
                        }; if (!d.match(/^[0-9.]+$/)) throw "malformed oid string: " + d; var w = ""; d = d.split("."); var t = 40 * parseInt(d[0]) + parseInt(d[1]); w += e(t); d.splice(0, 2); for (t = 0; t < d.length; t++)w += n(d[t]); return w
                    }; m.asn1.ASN1Object = function () {
                        this.getLengthHexFromValue = function () {
                            if ("undefined" == typeof this.hV || null == this.hV) throw "this.hV is null or undefined."; if (1 == this.hV.length % 2) throw "value hex must be even length: n=0,v=" +
                                this.hV; var d = this.hV.length / 2, e = d.toString(16); 1 == e.length % 2 && (e = "0" + e); if (128 > d) return e; var n = e.length / 2; if (15 < n) throw "ASN.1 length too long to represent by 8x: n = " + d.toString(16); return (128 + n).toString(16) + e
                        }; this.getEncodedHex = function () { if (null == this.hTLV || this.isModified) this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1; return this.hTLV }; this.getValueHex = function () { this.getEncodedHex(); return this.hV }; this.getFreshValueHex =
                            function () { return "" }
                    }; m.asn1.DERAbstractString = function (d) {
                        m.asn1.DERAbstractString.superclass.constructor.call(this); this.getString = function () { return this.s }; this.setString = function (e) { this.hTLV = null; this.isModified = !0; this.s = e; this.hV = stohex(this.s) }; this.setStringHex = function (e) { this.hTLV = null; this.isModified = !0; this.s = null; this.hV = e }; this.getFreshValueHex = function () { return this.hV }; "undefined" != typeof d && ("string" == typeof d ? this.setString(d) : "undefined" != typeof d.str ? this.setString(d.str) : "undefined" !=
                            typeof d.hex && this.setStringHex(d.hex))
                    }; u.lang.extend(m.asn1.DERAbstractString, m.asn1.ASN1Object); m.asn1.DERAbstractTime = function (d) {
                        m.asn1.DERAbstractTime.superclass.constructor.call(this); this.localDateToUTC = function (e) { utc = e.getTime() + 6E4 * e.getTimezoneOffset(); return new Date(utc) }; this.formatDate = function (e, n, w) {
                            var t = this.zeroPadding; e = this.localDateToUTC(e); var f = String(e.getFullYear()); "utc" == n && (f = f.substr(2, 2)); n = t(String(e.getMonth() + 1), 2); var h = t(String(e.getDate()), 2), g = t(String(e.getHours()),
                                2), p = t(String(e.getMinutes()), 2), l = t(String(e.getSeconds()), 2); f = f + n + h + g + p + l; !0 === w && (w = e.getMilliseconds(), 0 != w && (t = t(String(w), 3), t = t.replace(/[0]+$/, ""), f = f + "." + t)); return f + "Z"
                        }; this.zeroPadding = function (e, n) { return e.length >= n ? e : Array(n - e.length + 1).join("0") + e }; this.getString = function () { return this.s }; this.setString = function (e) { this.hTLV = null; this.isModified = !0; this.s = e; this.hV = stohex(e) }; this.setByDateValue = function (e, n, w, t, f, h) { e = new Date(Date.UTC(e, n - 1, w, t, f, h, 0)); this.setByDate(e) }; this.getFreshValueHex =
                            function () { return this.hV }
                    }; u.lang.extend(m.asn1.DERAbstractTime, m.asn1.ASN1Object); m.asn1.DERAbstractStructured = function (d) { m.asn1.DERAbstractString.superclass.constructor.call(this); this.setByASN1ObjectArray = function (e) { this.hTLV = null; this.isModified = !0; this.asn1Array = e }; this.appendASN1Object = function (e) { this.hTLV = null; this.isModified = !0; this.asn1Array.push(e) }; this.asn1Array = []; "undefined" != typeof d && "undefined" != typeof d.array && (this.asn1Array = d.array) }; u.lang.extend(m.asn1.DERAbstractStructured,
                        m.asn1.ASN1Object); m.asn1.DERBoolean = function () { m.asn1.DERBoolean.superclass.constructor.call(this); this.hT = "01"; this.hTLV = "0101ff" }; u.lang.extend(m.asn1.DERBoolean, m.asn1.ASN1Object); m.asn1.DERInteger = function (d) {
                            m.asn1.DERInteger.superclass.constructor.call(this); this.hT = "02"; this.setByBigInteger = function (e) { this.hTLV = null; this.isModified = !0; this.hV = m.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e) }; this.setByInteger = function (e) { e = new r(String(e), 10); this.setByBigInteger(e) }; this.setValueHex = function (e) {
                                this.hV =
                                e
                            }; this.getFreshValueHex = function () { return this.hV }; "undefined" != typeof d && ("undefined" != typeof d.bigint ? this.setByBigInteger(d.bigint) : "undefined" != typeof d["int"] ? this.setByInteger(d["int"]) : "number" == typeof d ? this.setByInteger(d) : "undefined" != typeof d.hex && this.setValueHex(d.hex))
                        }; u.lang.extend(m.asn1.DERInteger, m.asn1.ASN1Object); m.asn1.DERBitString = function (d) {
                            if (void 0 !== d && "undefined" !== typeof d.obj) { var e = m.asn1.ASN1Util.newObject(d.obj); d.hex = "00" + e.getEncodedHex() } m.asn1.DERBitString.superclass.constructor.call(this);
                            this.hT = "03"; this.setHexValueIncludingUnusedBits = function (n) { this.hTLV = null; this.isModified = !0; this.hV = n }; this.setUnusedBitsAndHexValue = function (n, w) { if (0 > n || 7 < n) throw "unused bits shall be from 0 to 7: u = " + n; this.hTLV = null; this.isModified = !0; this.hV = "0" + n + w }; this.setByBinaryString = function (n) {
                                n = n.replace(/0+$/, ""); var w = 8 - n.length % 8; 8 == w && (w = 0); for (var t = 0; t <= w; t++)n += "0"; var f = ""; for (t = 0; t < n.length - 1; t += 8) { var h = n.substr(t, 8); h = parseInt(h, 2).toString(16); 1 == h.length && (h = "0" + h); f += h } this.hTLV = null;
                                this.isModified = !0; this.hV = "0" + w + f
                            }; this.setByBooleanArray = function (n) { for (var w = "", t = 0; t < n.length; t++)w = 1 == n[t] ? w + "1" : w + "0"; this.setByBinaryString(w) }; this.newFalseArray = function (n) { for (var w = Array(n), t = 0; t < n; t++)w[t] = !1; return w }; this.getFreshValueHex = function () { return this.hV }; "undefined" != typeof d && ("string" == typeof d && d.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(d) : "undefined" != typeof d.hex ? this.setHexValueIncludingUnusedBits(d.hex) : "undefined" != typeof d.bin ? this.setByBinaryString(d.bin) :
                                "undefined" != typeof d.array && this.setByBooleanArray(d.array))
                        }; u.lang.extend(m.asn1.DERBitString, m.asn1.ASN1Object); m.asn1.DEROctetString = function (d) { if (void 0 !== d && "undefined" !== typeof d.obj) { var e = m.asn1.ASN1Util.newObject(d.obj); d.hex = e.getEncodedHex() } m.asn1.DEROctetString.superclass.constructor.call(this, d); this.hT = "04" }; u.lang.extend(m.asn1.DEROctetString, m.asn1.DERAbstractString); m.asn1.DERNull = function () { m.asn1.DERNull.superclass.constructor.call(this); this.hT = "05"; this.hTLV = "0500" }; u.lang.extend(m.asn1.DERNull,
                            m.asn1.ASN1Object); m.asn1.DERObjectIdentifier = function (d) {
                                var e = function (n) { n = n.toString(16); 1 == n.length && (n = "0" + n); return n }; m.asn1.DERObjectIdentifier.superclass.constructor.call(this); this.hT = "06"; this.setValueHex = function (n) { this.hTLV = null; this.isModified = !0; this.s = null; this.hV = n }; this.setValueOidString = function (n) {
                                    if (!n.match(/^[0-9.]+$/)) throw "malformed oid string: " + n; var w = ""; n = n.split("."); var t = 40 * parseInt(n[0]) + parseInt(n[1]); w += e(t); n.splice(0, 2); for (t = 0; t < n.length; t++) {
                                        var f = "", h = (new r(n[t],
                                            10)).toString(2), g = 7 - h.length % 7; 7 == g && (g = 0); for (var p = "", l = 0; l < g; l++)p += "0"; h = p + h; for (l = 0; l < h.length - 1; l += 7)g = h.substr(l, 7), l != h.length - 7 && (g = "1" + g), f += e(parseInt(g, 2)); w += f
                                    } this.hTLV = null; this.isModified = !0; this.s = null; this.hV = w
                                }; this.setValueName = function (n) { var w = m.asn1.x509.OID.name2oid(n); if ("" !== w) this.setValueOidString(w); else throw "DERObjectIdentifier oidName undefined: " + n; }; this.getFreshValueHex = function () { return this.hV }; void 0 !== d && ("string" === typeof d ? d.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(d) :
                                    this.setValueName(d) : void 0 !== d.oid ? this.setValueOidString(d.oid) : void 0 !== d.hex ? this.setValueHex(d.hex) : void 0 !== d.name && this.setValueName(d.name))
                            }; u.lang.extend(m.asn1.DERObjectIdentifier, m.asn1.ASN1Object); m.asn1.DEREnumerated = function (d) {
                                m.asn1.DEREnumerated.superclass.constructor.call(this); this.hT = "0a"; this.setByBigInteger = function (e) { this.hTLV = null; this.isModified = !0; this.hV = m.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e) }; this.setByInteger = function (e) { e = new r(String(e), 10); this.setByBigInteger(e) };
                                this.setValueHex = function (e) { this.hV = e }; this.getFreshValueHex = function () { return this.hV }; "undefined" != typeof d && ("undefined" != typeof d["int"] ? this.setByInteger(d["int"]) : "number" == typeof d ? this.setByInteger(d) : "undefined" != typeof d.hex && this.setValueHex(d.hex))
                            }; u.lang.extend(m.asn1.DEREnumerated, m.asn1.ASN1Object); m.asn1.DERUTF8String = function (d) { m.asn1.DERUTF8String.superclass.constructor.call(this, d); this.hT = "0c" }; u.lang.extend(m.asn1.DERUTF8String, m.asn1.DERAbstractString); m.asn1.DERNumericString =
                                function (d) { m.asn1.DERNumericString.superclass.constructor.call(this, d); this.hT = "12" }; u.lang.extend(m.asn1.DERNumericString, m.asn1.DERAbstractString); m.asn1.DERPrintableString = function (d) { m.asn1.DERPrintableString.superclass.constructor.call(this, d); this.hT = "13" }; u.lang.extend(m.asn1.DERPrintableString, m.asn1.DERAbstractString); m.asn1.DERTeletexString = function (d) { m.asn1.DERTeletexString.superclass.constructor.call(this, d); this.hT = "14" }; u.lang.extend(m.asn1.DERTeletexString, m.asn1.DERAbstractString);
                    m.asn1.DERIA5String = function (d) { m.asn1.DERIA5String.superclass.constructor.call(this, d); this.hT = "16" }; u.lang.extend(m.asn1.DERIA5String, m.asn1.DERAbstractString); m.asn1.DERUTCTime = function (d) {
                        m.asn1.DERUTCTime.superclass.constructor.call(this, d); this.hT = "17"; this.setByDate = function (e) { this.hTLV = null; this.isModified = !0; this.date = e; this.s = this.formatDate(this.date, "utc"); this.hV = stohex(this.s) }; this.getFreshValueHex = function () {
                            "undefined" == typeof this.date && "undefined" == typeof this.s && (this.date = new Date,
                                this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)); return this.hV
                        }; void 0 !== d && (void 0 !== d.str ? this.setString(d.str) : "string" == typeof d && d.match(/^[0-9]{12}Z$/) ? this.setString(d) : void 0 !== d.hex ? this.setStringHex(d.hex) : void 0 !== d.date && this.setByDate(d.date))
                    }; u.lang.extend(m.asn1.DERUTCTime, m.asn1.DERAbstractTime); m.asn1.DERGeneralizedTime = function (d) {
                        m.asn1.DERGeneralizedTime.superclass.constructor.call(this, d); this.hT = "18"; this.withMillis = !1; this.setByDate = function (e) {
                            this.hTLV = null;
                            this.isModified = !0; this.date = e; this.s = this.formatDate(this.date, "gen", this.withMillis); this.hV = stohex(this.s)
                        }; this.getFreshValueHex = function () { void 0 === this.date && void 0 === this.s && (this.date = new Date, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)); return this.hV }; void 0 !== d && (void 0 !== d.str ? this.setString(d.str) : "string" == typeof d && d.match(/^[0-9]{14}Z$/) ? this.setString(d) : void 0 !== d.hex ? this.setStringHex(d.hex) : void 0 !== d.date && this.setByDate(d.date), !0 === d.millis &&
                            (this.withMillis = !0))
                    }; u.lang.extend(m.asn1.DERGeneralizedTime, m.asn1.DERAbstractTime); m.asn1.DERSequence = function (d) { m.asn1.DERSequence.superclass.constructor.call(this, d); this.hT = "30"; this.getFreshValueHex = function () { for (var e = "", n = 0; n < this.asn1Array.length; n++)e += this.asn1Array[n].getEncodedHex(); return this.hV = e } }; u.lang.extend(m.asn1.DERSequence, m.asn1.DERAbstractStructured); m.asn1.DERSet = function (d) {
                        m.asn1.DERSet.superclass.constructor.call(this, d); this.hT = "31"; this.sortFlag = !0; this.getFreshValueHex =
                            function () { for (var e = [], n = 0; n < this.asn1Array.length; n++)e.push(this.asn1Array[n].getEncodedHex()); 1 == this.sortFlag && e.sort(); return this.hV = e.join("") }; "undefined" != typeof d && "undefined" != typeof d.sortflag && 0 == d.sortflag && (this.sortFlag = !1)
                    }; u.lang.extend(m.asn1.DERSet, m.asn1.DERAbstractStructured); m.asn1.DERTaggedObject = function (d) {
                        m.asn1.DERTaggedObject.superclass.constructor.call(this); this.hT = "a0"; this.hV = ""; this.isExplicit = !0; this.asn1Object = null; this.setASN1Object = function (e, n, w) {
                            this.hT = n;
                            this.isExplicit = e; this.asn1Object = w; this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = w.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, n), this.isModified = !1)
                        }; this.getFreshValueHex = function () { return this.hV }; "undefined" != typeof d && ("undefined" != typeof d.tag && (this.hT = d.tag), "undefined" != typeof d.explicit && (this.isExplicit = d.explicit), "undefined" != typeof d.obj && (this.asn1Object = d.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
                    };
                    u.lang.extend(m.asn1.DERTaggedObject, m.asn1.ASN1Object)
                }, function (u) { return I({ "../jsbn/jsbn": 1635488321560, "./yahoo": 1635488321564 }[u], u) }); K(1635488321564, function (u, C, v) {
                    v.__esModule || Object.defineProperty(v, "__esModule", { value: !0 }); (v.YAHOO = {}).lang = {
                        extend: function (r, m, d) {
                            if (!m || !r) throw Error("YAHOO.lang.extend failed, please check that all dependencies are included."); var e = function () { }; e.prototype = m.prototype; r.prototype = new e; r.prototype.constructor = r; r.superclass = m.prototype; m.prototype.constructor ==
                                Object.prototype.constructor && (m.prototype.constructor = m); if (d) { for (var n in d) r.prototype[n] = d[n]; m = function () { }; var w = ["toString", "valueOf"]; try { /MSIE/.test(navigator.userAgent) && (m = function (t, f) { for (n = 0; n < w.length; n += 1) { var h = w[n], g = f[h]; "function" === typeof g && g != Object.prototype[h] && (t[h] = g) } }) } catch (t) { } m(r.prototype, d) }
                        }
                    }
                }, function (u) { return I({}[u], u) }); K(1635488321565, function (u, C, v) { C.exports = { version: "3.2.1" } }, function (u) { return I({}[u], u) }); return I(1635488321550)
}();
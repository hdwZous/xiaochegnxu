"use strict";

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
  return typeof t;
} : function (t) {
  return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function (t, e) {
  "object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.JSEncrypt = {});
}(void 0, function (t) {
  var e = "Netscape",
      o = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
      r = {
    ASN1: null,
    Base64: null,
    Hex: null,
    crypto: null,
    href: null
  },
      i = "0123456789abcdefghijklmnopqrstuvwxyz";

  function a(t) {
    return i.charAt(t);
  }

  function n(t, e) {
    return t & e;
  }

  function h(t, e) {
    return t | e;
  }

  function s(t, e) {
    return t ^ e;
  }

  function u(t, e) {
    return t & ~e;
  }

  var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  function f(t) {
    for (var e, i = "", r = 0; r + 3 <= t.length; r += 3) e = parseInt(t.substring(r, r + 3), 16), i += c.charAt(e >> 6) + c.charAt(63 & e);

    for (r + 1 == t.length ? (e = parseInt(t.substring(r, r + 1), 16), i += c.charAt(e << 2)) : r + 2 == t.length && (e = parseInt(t.substring(r, r + 2), 16), i += c.charAt(e >> 2) + c.charAt((3 & e) << 4)); 0 < (3 & i.length);) i += "=";

    return i;
  }

  function l(t) {
    for (var e = "", i = 0, r = 0, n = 0; n < t.length && "=" != t.charAt(n); ++n) {
      var s = c.indexOf(t.charAt(n));
      s < 0 || (i = 0 == i ? (e += a(s >> 2), r = 3 & s, 1) : 1 == i ? (e += a(r << 2 | s >> 4), r = 15 & s, 2) : 2 == i ? (e += a(r), e += a(s >> 2), r = 3 & s, 3) : (e += a(r << 2 | s >> 4), e += a(15 & s), 0));
    }

    return 1 == i && (e += a(r << 2)), e;
  }

  var p,
      g = function (t, e) {
    return (g = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (t, e) {
      t.__proto__ = e;
    } || function (t, e) {
      for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
    })(t, e);
  };

  var d,
      m = function (t) {
    if (void 0 === p) {
      var e = "0123456789ABCDEF",
          i = " \f\n\r\t \u2028\u2029";

      for (p = {}, o = 0; o < 16; ++o) p[e.charAt(o)] = o;

      for (e = e.toLowerCase(), o = 10; o < 16; ++o) p[e.charAt(o)] = o;

      for (o = 0; o < i.length; ++o) p[i.charAt(o)] = -1;
    }

    for (var r = [], n = 0, s = 0, o = 0; o < t.length; ++o) {
      var h = t.charAt(o);
      if ("=" == h) break;

      if (-1 != (h = p[h])) {
        if (void 0 === h) throw new Error("Illegal character at offset " + o);
        n |= h, 2 <= ++s ? (r[r.length] = n, s = n = 0) : n <<= 4;
      }
    }

    if (s) throw new Error("Hex encoding incomplete: 4 bits missing");
    return r;
  },
      y = {
    decode: function (t) {
      if (void 0 === d) {
        var e = "= \f\n\r\t \u2028\u2029";

        for (d = Object.create(null), s = 0; s < 64; ++s) d["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(s)] = s;

        for (s = 0; s < e.length; ++s) d[e.charAt(s)] = -1;
      }

      for (var i = [], r = 0, n = 0, s = 0; s < t.length; ++s) {
        var o = t.charAt(s);
        if ("=" == o) break;

        if (-1 != (o = d[o])) {
          if (void 0 === o) throw new Error("Illegal character at offset " + s);
          r |= o, 4 <= ++n ? (i[i.length] = r >> 16, i[i.length] = r >> 8 & 255, i[i.length] = 255 & r, n = r = 0) : r <<= 6;
        }
      }

      switch (n) {
        case 1:
          throw new Error("Base64 encoding incomplete: at least 2 bits missing");

        case 2:
          i[i.length] = r >> 10;
          break;

        case 3:
          i[i.length] = r >> 16, i[i.length] = r >> 8 & 255;
      }

      return i;
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function (t) {
      var e = y.re.exec(t);
      if (e) if (e[1]) t = e[1];else {
        if (!e[2]) throw new Error("RegExp out of sync");
        t = e[2];
      }
      return y.decode(t);
    }
  },
      v = 1e13,
      b = (T.prototype.mulAdd = function (t, e) {
    for (var i, r = this.buf, n = r.length, s = 0; s < n; ++s) (i = r[s] * t + e) < v ? e = 0 : i -= (e = 0 | i / v) * v, r[s] = i;

    0 < e && (r[s] = e);
  }, T.prototype.sub = function (t) {
    for (var e, i = this.buf, r = i.length, n = 0; n < r; ++n) t = (e = i[n] - t) < 0 ? (e += v, 1) : 0, i[n] = e;

    for (; 0 === i[i.length - 1];) i.pop();
  }, T.prototype.toString = function (t) {
    if (10 != (t || 10)) throw new Error("only base 10 is supported");

    for (var e = this.buf, i = e[e.length - 1].toString(), r = e.length - 2; 0 <= r; --r) i += (v + e[r]).toString().substring(1);

    return i;
  }, T.prototype.valueOf = function () {
    for (var t = this.buf, e = 0, i = t.length - 1; 0 <= i; --i) e = e * v + t[i];

    return e;
  }, T.prototype.simplify = function () {
    var t = this.buf;
    return 1 == t.length ? t[0] : this;
  }, T);

  function T(t) {
    this.buf = [+t || 0];
  }

  var S = "…",
      E = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
      D = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

  function w(t, e) {
    return t = t.length > e ? t.substring(0, e) + S : t;
  }

  var x = (B.prototype.get = function (t) {
    if ((t = void 0 === t ? this.pos++ : t) >= this.enc.length) throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
    return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t];
  }, B.prototype.hexByte = function (t) {
    return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t);
  }, B.prototype.hexDump = function (t, e, i) {
    for (var r = "", n = t; n < e; ++n) if (r += this.hexByte(this.get(n)), !0 !== i) switch (15 & n) {
      case 7:
        r += "  ";
        break;

      case 15:
        r += "\n";
        break;

      default:
        r += " ";
    }

    return r;
  }, B.prototype.isASCII = function (t, e) {
    for (var i = t; i < e; ++i) {
      var r = this.get(i);
      if (r < 32 || 176 < r) return !1;
    }

    return !0;
  }, B.prototype.parseStringISO = function (t, e) {
    for (var i = "", r = t; r < e; ++r) i += String.fromCharCode(this.get(r));

    return i;
  }, B.prototype.parseStringUTF = function (t, e) {
    for (var i = "", r = t; r < e;) {
      var n = this.get(r++);
      i += n < 128 ? String.fromCharCode(n) : 191 < n && n < 224 ? String.fromCharCode((31 & n) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & n) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++));
    }

    return i;
  }, B.prototype.parseStringBMP = function (t, e) {
    for (var i, r, n = "", s = t; s < e;) i = this.get(s++), r = this.get(s++), n += String.fromCharCode(i << 8 | r);

    return n;
  }, B.prototype.parseTime = function (t, e, i) {
    t = this.parseStringISO(t, e), e = (i ? E : D).exec(t);
    return e ? (i && (e[1] = +e[1], e[1] += +e[1] < 70 ? 2e3 : 1900), t = e[1] + "-" + e[2] + "-" + e[3] + " " + e[4], e[5] && (t += ":" + e[5], e[6] && (t += ":" + e[6], e[7] && (t += "." + e[7]))), e[8] && (t += " UTC", "Z" != e[8] && (t += e[8], e[9] && (t += ":" + e[9]))), t) : "Unrecognized time: " + t;
  }, B.prototype.parseInteger = function (t, e) {
    for (var i, r = this.get(t), n = 127 < r, s = n ? 255 : 0, o = ""; r == s && ++t < e;) r = this.get(t);

    if (0 === (i = e - t)) return n ? -1 : 0;

    if (4 < i) {
      for (o = r, i <<= 3; 0 == (128 & (+o ^ s));) o = +o << 1, --i;

      o = "(" + i + " bit)\n";
    }

    n && (r -= 256);

    for (var h = new b(r), a = t + 1; a < e; ++a) h.mulAdd(256, this.get(a));

    return o + h.toString();
  }, B.prototype.parseBitString = function (t, e, i) {
    for (var r = this.get(t), n = "(" + ((e - t - 1 << 3) - r) + " bit)\n", s = "", o = t + 1; o < e; ++o) {
      for (var h = this.get(o), a = o == e - 1 ? r : 0, u = 7; a <= u; --u) s += h >> u & 1 ? "1" : "0";

      if (s.length > i) return n + w(s, i);
    }

    return n + s;
  }, B.prototype.parseOctetString = function (t, e, i) {
    if (this.isASCII(t, e)) return w(this.parseStringISO(t, e), i);
    var r = e - t,
        n = "(" + r + " byte)\n";
    (i /= 2) < r && (e = t + i);

    for (var s = t; s < e; ++s) n += this.hexByte(this.get(s));

    return i < r && (n += S), n;
  }, B.prototype.parseOID = function (t, e, i) {
    for (var r = "", n = new b(), s = 0, o = t; o < e; ++o) {
      var h = this.get(o);

      if (n.mulAdd(128, 127 & h), s += 7, !(128 & h)) {
        if ("" === r ? r = (n = n.simplify()) instanceof b ? (n.sub(80), "2." + n.toString()) : (h = n < 80 ? n < 40 ? 0 : 1 : 2) + "." + (n - 40 * h) : r += "." + n.toString(), r.length > i) return w(r, i);
        n = new b(), s = 0;
      }
    }

    return 0 < s && (r += ".incomplete"), r;
  }, B);

  function B(t, e) {
    this.hexDigits = "0123456789ABCDEF", t instanceof B ? (this.enc = t.enc, this.pos = t.pos) : (this.enc = t, this.pos = e);
  }

  var R = (O.prototype.typeName = function () {
    switch (this.tag.tagClass) {
      case 0:
        switch (this.tag.tagNumber) {
          case 0:
            return "EOC";

          case 1:
            return "BOOLEAN";

          case 2:
            return "INTEGER";

          case 3:
            return "BIT_STRING";

          case 4:
            return "OCTET_STRING";

          case 5:
            return "NULL";

          case 6:
            return "OBJECT_IDENTIFIER";

          case 7:
            return "ObjectDescriptor";

          case 8:
            return "EXTERNAL";

          case 9:
            return "REAL";

          case 10:
            return "ENUMERATED";

          case 11:
            return "EMBEDDED_PDV";

          case 12:
            return "UTF8String";

          case 16:
            return "SEQUENCE";

          case 17:
            return "SET";

          case 18:
            return "NumericString";

          case 19:
            return "PrintableString";

          case 20:
            return "TeletexString";

          case 21:
            return "VideotexString";

          case 22:
            return "IA5String";

          case 23:
            return "UTCTime";

          case 24:
            return "GeneralizedTime";

          case 25:
            return "GraphicString";

          case 26:
            return "VisibleString";

          case 27:
            return "GeneralString";

          case 28:
            return "UniversalString";

          case 30:
            return "BMPString";
        }

        return "Universal_" + this.tag.tagNumber.toString();

      case 1:
        return "Application_" + this.tag.tagNumber.toString();

      case 2:
        return "[" + this.tag.tagNumber.toString() + "]";

      case 3:
        return "Private_" + this.tag.tagNumber.toString();
    }
  }, O.prototype.content = function (t) {
    if (void 0 === this.tag) return null;
    void 0 === t && (t = 1 / 0);
    var e = this.posContent(),
        i = Math.abs(this.length);
    if (!this.tag.isUniversal()) return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + i, t);

    switch (this.tag.tagNumber) {
      case 1:
        return 0 === this.stream.get(e) ? "false" : "true";

      case 2:
        return this.stream.parseInteger(e, e + i);

      case 3:
        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + i, t);

      case 4:
        return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + i, t);

      case 6:
        return this.stream.parseOID(e, e + i, t);

      case 16:
      case 17:
        return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";

      case 12:
        return w(this.stream.parseStringUTF(e, e + i), t);

      case 18:
      case 19:
      case 20:
      case 21:
      case 22:
      case 26:
        return w(this.stream.parseStringISO(e, e + i), t);

      case 30:
        return w(this.stream.parseStringBMP(e, e + i), t);

      case 23:
      case 24:
        return this.stream.parseTime(e, e + i, 23 == this.tag.tagNumber);
    }

    return null;
  }, O.prototype.toString = function () {
    return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]";
  }, O.prototype.toPrettyString = function (t) {
    var e = (t = void 0 === t ? "" : t) + this.typeName() + " @" + this.stream.pos;

    if (0 <= this.length && (e += "+"), e += this.length, this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"), e += "\n", null !== this.sub) {
      t += "  ";

      for (var i = 0, r = this.sub.length; i < r; ++i) e += this.sub[i].toPrettyString(t);
    }

    return e;
  }, O.prototype.posStart = function () {
    return this.stream.pos;
  }, O.prototype.posContent = function () {
    return this.stream.pos + this.header;
  }, O.prototype.posEnd = function () {
    return this.stream.pos + this.header + Math.abs(this.length);
  }, O.prototype.toHexString = function () {
    return this.stream.hexDump(this.posStart(), this.posEnd(), !0);
  }, O.decodeLength = function (t) {
    var e = 127 & (i = t.get());
    if (e == i) return e;
    if (6 < e) throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
    if (0 == e) return null;

    for (var i = 0, r = 0; r < e; ++r) i = 256 * i + t.get();

    return i;
  }, O.prototype.getHexStringValue = function () {
    var t = this.toHexString(),
        e = 2 * this.header,
        i = 2 * this.length;
    return t.substr(e, i);
  }, O.decode = function (t) {
    var r = t instanceof x ? t : new x(t, 0),
        e = new x(r),
        i = new V(r),
        n = O.decodeLength(r),
        s = r.pos,
        o = s - e.pos,
        h = null,
        t = function () {
      var t = [];

      if (null !== n) {
        for (var e = s + n; r.pos < e;) t[t.length] = O.decode(r);

        if (r.pos != e) throw new Error("Content size is not correct for container starting at offset " + s);
      } else try {
        for (;;) {
          var i = O.decode(r);
          if (i.tag.isEOC()) break;
          t[t.length] = i;
        }

        n = s - r.pos;
      } catch (t) {
        throw new Error("Exception while decoding undefined length content: " + t);
      }

      return t;
    };

    if (i.tagConstructed) h = t();else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber)) try {
      if (3 == i.tagNumber && 0 != r.get()) throw new Error("BIT STRINGs with unused bits cannot encapsulate.");

      for (var h = t(), a = 0; a < h.length; ++a) if (h[a].tag.isEOC()) throw new Error("EOC is not supposed to be actual content.");
    } catch (t) {
      h = null;
    }

    if (null === h) {
      if (null === n) throw new Error("We can't skip over an invalid tag with undefined length at offset " + s);
      r.pos = s + Math.abs(n);
    }

    return new O(e, o, n, i, h);
  }, O);

  function O(t, e, i, r, n) {
    if (!(r instanceof V)) throw new Error("Invalid tag value.");
    this.stream = t, this.header = e, this.length = i, this.tag = r, this.sub = n;
  }

  var V = (A.prototype.isUniversal = function () {
    return 0 === this.tagClass;
  }, A.prototype.isEOC = function () {
    return 0 === this.tagClass && 0 === this.tagNumber;
  }, A);

  function A(t) {
    var e = t.get();

    if (this.tagClass = e >> 6, this.tagConstructed = 0 != (32 & e), this.tagNumber = 31 & e, 31 == this.tagNumber) {
      for (var i = new b(); e = t.get(), i.mulAdd(128, 127 & e), 128 & e;);

      this.tagNumber = i.simplify();
    }
  }

  var I = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
      N = 67108864 / I[I.length - 1],
      P = (M.prototype.toString = function (t) {
    if (this.s < 0) return "-" + this.negate().toString(t);
    var e;
    if (16 == t) e = 4;else if (8 == t) e = 3;else if (2 == t) e = 1;else if (32 == t) e = 5;else {
      if (4 != t) return this.toRadix(t);
      e = 2;
    }
    var i,
        r = (1 << e) - 1,
        n = !1,
        s = "",
        o = this.t,
        h = this.DB - o * this.DB % e;
    if (0 < o--) for (h < this.DB && 0 < (i = this[o] >> h) && (n = !0, s = a(i)); 0 <= o;) h < e ? (i = (this[o] & (1 << h) - 1) << e - h, i |= this[--o] >> (h += this.DB - e)) : (i = this[o] >> (h -= e) & r, h <= 0 && (h += this.DB, --o)), (n = 0 < i ? !0 : n) && (s += a(i));
    return n ? s : "0";
  }, M.prototype.negate = function () {
    var t = _();

    return M.ZERO.subTo(this, t), t;
  }, M.prototype.abs = function () {
    return this.s < 0 ? this.negate() : this;
  }, M.prototype.compareTo = function (t) {
    var e = this.s - t.s;
    if (0 != e) return e;
    var i = this.t;
    if (0 != (e = i - t.t)) return this.s < 0 ? -e : e;

    for (; 0 <= --i;) if (0 != (e = this[i] - t[i])) return e;

    return 0;
  }, M.prototype.bitLength = function () {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + J(this[this.t - 1] ^ this.s & this.DM);
  }, M.prototype.mod = function (t) {
    var e = _();

    return this.abs().divRemTo(t, null, e), this.s < 0 && 0 < e.compareTo(M.ZERO) && t.subTo(e, e), e;
  }, M.prototype.modPowInt = function (t, e) {
    e = new (t < 256 || e.isEven() ? j : C)(e);
    return this.exp(t, e);
  }, M.prototype.clone = function () {
    var t = _();

    return this.copyTo(t), t;
  }, M.prototype.intValue = function () {
    if (this.s < 0) {
      if (1 == this.t) return this[0] - this.DV;
      if (0 == this.t) return -1;
    } else {
      if (1 == this.t) return this[0];
      if (0 == this.t) return 0;
    }

    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
  }, M.prototype.byteValue = function () {
    return 0 == this.t ? this.s : this[0] << 24 >> 24;
  }, M.prototype.shortValue = function () {
    return 0 == this.t ? this.s : this[0] << 16 >> 16;
  }, M.prototype.signum = function () {
    return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1;
  }, M.prototype.toByteArray = function () {
    var t = this.t,
        e = [];
    e[0] = this.s;
    var i,
        r = this.DB - t * this.DB % 8,
        n = 0;
    if (0 < t--) for (r < this.DB && (i = this[t] >> r) != (this.s & this.DM) >> r && (e[n++] = i | this.s << this.DB - r); 0 <= t;) r < 8 ? (i = (this[t] & (1 << r) - 1) << 8 - r, i |= this[--t] >> (r += this.DB - 8)) : (i = this[t] >> (r -= 8) & 255, r <= 0 && (r += this.DB, --t)), 0 != (128 & i) && (i |= -256), 0 == n && (128 & this.s) != (128 & i) && ++n, (0 < n || i != this.s) && (e[n++] = i);
    return e;
  }, M.prototype.equals = function (t) {
    return 0 == this.compareTo(t);
  }, M.prototype.min = function (t) {
    return this.compareTo(t) < 0 ? this : t;
  }, M.prototype.max = function (t) {
    return 0 < this.compareTo(t) ? this : t;
  }, M.prototype.and = function (t) {
    var e = _();

    return this.bitwiseTo(t, n, e), e;
  }, M.prototype.or = function (t) {
    var e = _();

    return this.bitwiseTo(t, h, e), e;
  }, M.prototype.xor = function (t) {
    var e = _();

    return this.bitwiseTo(t, s, e), e;
  }, M.prototype.andNot = function (t) {
    var e = _();

    return this.bitwiseTo(t, u, e), e;
  }, M.prototype.not = function () {
    for (var t = _(), e = 0; e < this.t; ++e) t[e] = this.DM & ~this[e];

    return t.t = this.t, t.s = ~this.s, t;
  }, M.prototype.shiftLeft = function (t) {
    var e = _();

    return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e;
  }, M.prototype.shiftRight = function (t) {
    var e = _();

    return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e;
  }, M.prototype.getLowestSetBit = function () {
    for (var t = 0; t < this.t; ++t) if (0 != this[t]) return t * this.DB + function (t) {
      if (0 == t) return -1;
      var e = 0;
      return 0 == (65535 & t) && (t >>= 16, e += 16), 0 == (255 & t) && (t >>= 8, e += 8), 0 == (15 & t) && (t >>= 4, e += 4), 0 == (3 & t) && (t >>= 2, e += 2), 0 == (1 & t) && ++e, e;
    }(this[t]);

    return this.s < 0 ? this.t * this.DB : -1;
  }, M.prototype.bitCount = function () {
    for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i) t += function (t) {
      for (var e = 0; 0 != t;) t &= t - 1, ++e;

      return e;
    }(this[i] ^ e);

    return t;
  }, M.prototype.testBit = function (t) {
    var e = Math.floor(t / this.DB);
    return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB);
  }, M.prototype.setBit = function (t) {
    return this.changeBit(t, h);
  }, M.prototype.clearBit = function (t) {
    return this.changeBit(t, u);
  }, M.prototype.flipBit = function (t) {
    return this.changeBit(t, s);
  }, M.prototype.add = function (t) {
    var e = _();

    return this.addTo(t, e), e;
  }, M.prototype.subtract = function (t) {
    var e = _();

    return this.subTo(t, e), e;
  }, M.prototype.multiply = function (t) {
    var e = _();

    return this.multiplyTo(t, e), e;
  }, M.prototype.divide = function (t) {
    var e = _();

    return this.divRemTo(t, e, null), e;
  }, M.prototype.remainder = function (t) {
    var e = _();

    return this.divRemTo(t, null, e), e;
  }, M.prototype.divideAndRemainder = function (t) {
    var e = _(),
        i = _();

    return this.divRemTo(t, e, i), [e, i];
  }, M.prototype.modPow = function (t, e) {
    var i = t.bitLength(),
        r = Y(1);
    if (i <= 0) return r;
    var n = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6,
        s = new (i < 8 ? j : e.isEven() ? K : C)(e),
        o = [],
        h = 3,
        a = n - 1,
        u = (1 << n) - 1;

    if (o[1] = s.convert(this), 1 < n) {
      var c = _();

      for (s.sqrTo(o[1], c); h <= u;) o[h] = _(), s.mulTo(c, o[h - 2], o[h]), h += 2;
    }

    for (var f, l, p = t.t - 1, g = !0, d = _(), i = J(t[p]) - 1; 0 <= p;) {
      for (a <= i ? f = t[p] >> i - a & u : (f = (t[p] & (1 << i + 1) - 1) << a - i, 0 < p && (f |= t[p - 1] >> this.DB + i - a)), h = n; 0 == (1 & f);) f >>= 1, --h;

      if ((i -= h) < 0 && (i += this.DB, --p), g) o[f].copyTo(r), g = !1;else {
        for (; 1 < h;) s.sqrTo(r, d), s.sqrTo(d, r), h -= 2;

        0 < h ? s.sqrTo(r, d) : (l = r, r = d, d = l), s.mulTo(d, o[f], r);
      }

      for (; 0 <= p && 0 == (t[p] & 1 << i);) s.sqrTo(r, d), l = r, r = d, d = l, --i < 0 && (i = this.DB - 1, --p);
    }

    return s.revert(r);
  }, M.prototype.modInverse = function (t) {
    var e = t.isEven();
    if (this.isEven() && e || 0 == t.signum()) return M.ZERO;

    for (var i = t.clone(), r = this.clone(), n = Y(1), s = Y(0), o = Y(0), h = Y(1); 0 != i.signum();) {
      for (; i.isEven();) i.rShiftTo(1, i), e ? (n.isEven() && s.isEven() || (n.addTo(this, n), s.subTo(t, s)), n.rShiftTo(1, n)) : s.isEven() || s.subTo(t, s), s.rShiftTo(1, s);

      for (; r.isEven();) r.rShiftTo(1, r), e ? (o.isEven() && h.isEven() || (o.addTo(this, o), h.subTo(t, h)), o.rShiftTo(1, o)) : h.isEven() || h.subTo(t, h), h.rShiftTo(1, h);

      0 <= i.compareTo(r) ? (i.subTo(r, i), e && n.subTo(o, n), s.subTo(h, s)) : (r.subTo(i, r), e && o.subTo(n, o), h.subTo(s, h));
    }

    return 0 != r.compareTo(M.ONE) ? M.ZERO : 0 <= h.compareTo(t) ? h.subtract(t) : h.signum() < 0 ? (h.addTo(t, h), h.signum() < 0 ? h.add(t) : h) : h;
  }, M.prototype.pow = function (t) {
    return this.exp(t, new q());
  }, M.prototype.gcd = function (t) {
    var e = this.s < 0 ? this.negate() : this.clone(),
        i = t.s < 0 ? t.negate() : t.clone();
    e.compareTo(i) < 0 && (n = e, e = i, i = n);
    var r = e.getLowestSetBit(),
        n = i.getLowestSetBit();
    if (n < 0) return e;

    for (0 < (n = r < n ? r : n) && (e.rShiftTo(n, e), i.rShiftTo(n, i)); 0 < e.signum();) 0 < (r = e.getLowestSetBit()) && e.rShiftTo(r, e), 0 < (r = i.getLowestSetBit()) && i.rShiftTo(r, i), 0 <= e.compareTo(i) ? (e.subTo(i, e), e.rShiftTo(1, e)) : (i.subTo(e, i), i.rShiftTo(1, i));

    return 0 < n && i.lShiftTo(n, i), i;
  }, M.prototype.isProbablePrime = function (t) {
    var e,
        i = this.abs();

    if (1 == i.t && i[0] <= I[I.length - 1]) {
      for (e = 0; e < I.length; ++e) if (i[0] == I[e]) return !0;

      return !1;
    }

    if (i.isEven()) return !1;

    for (e = 1; e < I.length;) {
      for (var r = I[e], n = e + 1; n < I.length && r < N;) r *= I[n++];

      for (r = i.modInt(r); e < n;) if (r % I[e++] == 0) return !1;
    }

    return i.millerRabin(t);
  }, M.prototype.copyTo = function (t) {
    for (var e = this.t - 1; 0 <= e; --e) t[e] = this[e];

    t.t = this.t, t.s = this.s;
  }, M.prototype.fromInt = function (t) {
    this.t = 1, this.s = t < 0 ? -1 : 0, 0 < t ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0;
  }, M.prototype.fromString = function (t, e) {
    var i;
    if (16 == e) i = 4;else if (8 == e) i = 3;else if (256 == e) i = 8;else if (2 == e) i = 1;else if (32 == e) i = 5;else {
      if (4 != e) return void this.fromRadix(t, e);
      i = 2;
    }
    this.t = 0, this.s = 0;

    for (var r = t.length, n = !1, s = 0; 0 <= --r;) {
      var o = 8 == i ? 255 & +t[r] : $(t, r);
      o < 0 ? "-" == t.charAt(r) && (n = !0) : (n = !1, 0 == s ? this[this.t++] = o : s + i > this.DB ? (this[this.t - 1] |= (o & (1 << this.DB - s) - 1) << s, this[this.t++] = o >> this.DB - s) : this[this.t - 1] |= o << s, (s += i) >= this.DB && (s -= this.DB));
    }

    8 == i && 0 != (128 & +t[0]) && (this.s = -1, 0 < s && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)), this.clamp(), n && M.ZERO.subTo(this, this);
  }, M.prototype.clamp = function () {
    for (var t = this.s & this.DM; 0 < this.t && this[this.t - 1] == t;) --this.t;
  }, M.prototype.dlShiftTo = function (t, e) {
    for (var i = this.t - 1; 0 <= i; --i) e[i + t] = this[i];

    for (i = t - 1; 0 <= i; --i) e[i] = 0;

    e.t = this.t + t, e.s = this.s;
  }, M.prototype.drShiftTo = function (t, e) {
    for (var i = t; i < this.t; ++i) e[i - t] = this[i];

    e.t = Math.max(this.t - t, 0), e.s = this.s;
  }, M.prototype.lShiftTo = function (t, e) {
    for (var i = t % this.DB, r = this.DB - i, n = (1 << r) - 1, s = Math.floor(t / this.DB), o = this.s << i & this.DM, h = this.t - 1; 0 <= h; --h) e[h + s + 1] = this[h] >> r | o, o = (this[h] & n) << i;

    for (h = s - 1; 0 <= h; --h) e[h] = 0;

    e[s] = o, e.t = this.t + s + 1, e.s = this.s, e.clamp();
  }, M.prototype.rShiftTo = function (t, e) {
    e.s = this.s;
    var i = Math.floor(t / this.DB);
    if (i >= this.t) e.t = 0;else {
      var r = t % this.DB,
          n = this.DB - r,
          s = (1 << r) - 1;
      e[0] = this[i] >> r;

      for (var o = i + 1; o < this.t; ++o) e[o - i - 1] |= (this[o] & s) << n, e[o - i] = this[o] >> r;

      0 < r && (e[this.t - i - 1] |= (this.s & s) << n), e.t = this.t - i, e.clamp();
    }
  }, M.prototype.subTo = function (t, e) {
    for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n;) r += this[i] - t[i], e[i++] = r & this.DM, r >>= this.DB;

    if (t.t < this.t) {
      for (r -= t.s; i < this.t;) r += this[i], e[i++] = r & this.DM, r >>= this.DB;

      r += this.s;
    } else {
      for (r += this.s; i < t.t;) r -= t[i], e[i++] = r & this.DM, r >>= this.DB;

      r -= t.s;
    }

    e.s = r < 0 ? -1 : 0, r < -1 ? e[i++] = this.DV + r : 0 < r && (e[i++] = r), e.t = i, e.clamp();
  }, M.prototype.multiplyTo = function (t, e) {
    var i = this.abs(),
        r = t.abs(),
        n = i.t;

    for (e.t = n + r.t; 0 <= --n;) e[n] = 0;

    for (n = 0; n < r.t; ++n) e[n + i.t] = i.am(0, r[n], e, n, 0, i.t);

    e.s = 0, e.clamp(), this.s != t.s && M.ZERO.subTo(e, e);
  }, M.prototype.squareTo = function (t) {
    for (var e = this.abs(), i = t.t = 2 * e.t; 0 <= --i;) t[i] = 0;

    for (i = 0; i < e.t - 1; ++i) {
      var r = e.am(i, e[i], t, 2 * i, 0, 1);
      (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV, t[i + e.t + 1] = 1);
    }

    0 < t.t && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)), t.s = 0, t.clamp();
  }, M.prototype.divRemTo = function (t, e, i) {
    var r = t.abs();

    if (!(r.t <= 0)) {
      var n = this.abs();
      if (n.t < r.t) return null != e && e.fromInt(0), void (null != i && this.copyTo(i));
      null == i && (i = _());

      var s = _(),
          o = this.s,
          h = t.s,
          t = this.DB - J(r[r.t - 1]);

      0 < t ? (r.lShiftTo(t, s), n.lShiftTo(t, i)) : (r.copyTo(s), n.copyTo(i));
      var a = s.t,
          u = s[a - 1];

      if (0 != u) {
        var n = u * (1 << this.F1) + (1 < a ? s[a - 2] >> this.F2 : 0),
            c = this.FV / n,
            f = (1 << this.F1) / n,
            l = 1 << this.F2,
            p = i.t,
            g = p - a,
            d = null == e ? _() : e;

        for (s.dlShiftTo(g, d), 0 <= i.compareTo(d) && (i[i.t++] = 1, i.subTo(d, i)), M.ONE.dlShiftTo(a, d), d.subTo(s, s); s.t < a;) s[s.t++] = 0;

        for (; 0 <= --g;) {
          var m = i[--p] == u ? this.DM : Math.floor(i[p] * c + (i[p - 1] + l) * f);
          if ((i[p] += s.am(0, m, i, g, 0, a)) < m) for (s.dlShiftTo(g, d), i.subTo(d, i); i[p] < --m;) i.subTo(d, i);
        }

        null != e && (i.drShiftTo(a, e), o != h && M.ZERO.subTo(e, e)), i.t = a, i.clamp(), 0 < t && i.rShiftTo(t, i), o < 0 && M.ZERO.subTo(i, i);
      }
    }
  }, M.prototype.invDigit = function () {
    if (this.t < 1) return 0;
    var t = this[0];
    if (0 == (1 & t)) return 0;
    var e = 3 & t;
    return 0 < (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) ? this.DV - e : -e;
  }, M.prototype.isEven = function () {
    return 0 == (0 < this.t ? 1 & this[0] : this.s);
  }, M.prototype.exp = function (t, e) {
    if (4294967295 < t || t < 1) return M.ONE;

    var i,
        r = _(),
        n = _(),
        s = e.convert(this),
        o = J(t) - 1;

    for (s.copyTo(r); 0 <= --o;) e.sqrTo(r, n), 0 < (t & 1 << o) ? e.mulTo(n, s, r) : (i = r, r = n, n = i);

    return e.revert(r);
  }, M.prototype.chunkSize = function (t) {
    return Math.floor(Math.LN2 * this.DB / Math.log(t));
  }, M.prototype.toRadix = function (t) {
    if (null == t && (t = 10), 0 == this.signum() || t < 2 || 36 < t) return "0";

    var e = this.chunkSize(t),
        i = Math.pow(t, e),
        r = Y(i),
        n = _(),
        s = _(),
        o = "";

    for (this.divRemTo(r, n, s); 0 < n.signum();) o = (i + s.intValue()).toString(t).substr(1) + o, n.divRemTo(r, n, s);

    return s.intValue().toString(t) + o;
  }, M.prototype.fromRadix = function (t, e) {
    this.fromInt(0);

    for (var i = this.chunkSize(e = null == e ? 10 : e), r = Math.pow(e, i), n = !1, s = 0, o = 0, h = 0; h < t.length; ++h) {
      var a = $(t, h);
      a < 0 ? "-" == t.charAt(h) && 0 == this.signum() && (n = !0) : (o = e * o + a, ++s >= i && (this.dMultiply(r), this.dAddOffset(o, 0), o = s = 0));
    }

    0 < s && (this.dMultiply(Math.pow(e, s)), this.dAddOffset(o, 0)), n && M.ZERO.subTo(this, this);
  }, M.prototype.fromNumber = function (t, e, i) {
    if ("number" == typeof e) {
      if (t < 2) this.fromInt(1);else for (this.fromNumber(t, i), this.testBit(t - 1) || this.bitwiseTo(M.ONE.shiftLeft(t - 1), h, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e);) this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(M.ONE.shiftLeft(t - 1), this);
    } else {
      var r = [],
          i = 7 & t;
      r.length = 1 + (t >> 3), e.nextBytes(r), 0 < i ? r[0] &= (1 << i) - 1 : r[0] = 0, this.fromString(r, 256);
    }
  }, M.prototype.bitwiseTo = function (t, e, i) {
    for (var r, n = Math.min(t.t, this.t), s = 0; s < n; ++s) i[s] = e(this[s], t[s]);

    if (t.t < this.t) {
      for (r = t.s & this.DM, s = n; s < this.t; ++s) i[s] = e(this[s], r);

      i.t = this.t;
    } else {
      for (r = this.s & this.DM, s = n; s < t.t; ++s) i[s] = e(r, t[s]);

      i.t = t.t;
    }

    i.s = e(this.s, t.s), i.clamp();
  }, M.prototype.changeBit = function (t, e) {
    t = M.ONE.shiftLeft(t);
    return this.bitwiseTo(t, e, t), t;
  }, M.prototype.addTo = function (t, e) {
    for (var i = 0, r = 0, n = Math.min(t.t, this.t); i < n;) r += this[i] + t[i], e[i++] = r & this.DM, r >>= this.DB;

    if (t.t < this.t) {
      for (r += t.s; i < this.t;) r += this[i], e[i++] = r & this.DM, r >>= this.DB;

      r += this.s;
    } else {
      for (r += this.s; i < t.t;) r += t[i], e[i++] = r & this.DM, r >>= this.DB;

      r += t.s;
    }

    e.s = r < 0 ? -1 : 0, 0 < r ? e[i++] = r : r < -1 && (e[i++] = this.DV + r), e.t = i, e.clamp();
  }, M.prototype.dMultiply = function (t) {
    this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp();
  }, M.prototype.dAddOffset = function (t, e) {
    if (0 != t) {
      for (; this.t <= e;) this[this.t++] = 0;

      for (this[e] += t; this[e] >= this.DV;) this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e];
    }
  }, M.prototype.multiplyLowerTo = function (t, e, i) {
    var r = Math.min(this.t + t.t, e);

    for (i.s = 0, i.t = r; 0 < r;) i[--r] = 0;

    for (var n = i.t - this.t; r < n; ++r) i[r + this.t] = this.am(0, t[r], i, r, 0, this.t);

    for (n = Math.min(t.t, e); r < n; ++r) this.am(0, t[r], i, r, 0, e - r);

    i.clamp();
  }, M.prototype.multiplyUpperTo = function (t, e, i) {
    var r = i.t = this.t + t.t - --e;

    for (i.s = 0; 0 <= --r;) i[r] = 0;

    for (r = Math.max(e - this.t, 0); r < t.t; ++r) i[this.t + r - e] = this.am(e - r, t[r], i, 0, 0, this.t + r - e);

    i.clamp(), i.drShiftTo(1, i);
  }, M.prototype.modInt = function (t) {
    if (t <= 0) return 0;
    var e = this.DV % t,
        i = this.s < 0 ? t - 1 : 0;
    if (0 < this.t) if (0 == e) i = this[0] % t;else for (var r = this.t - 1; 0 <= r; --r) i = (e * i + this[r]) % t;
    return i;
  }, M.prototype.millerRabin = function (t) {
    var e = this.subtract(M.ONE),
        i = e.getLowestSetBit();
    if (i <= 0) return !1;
    var r = e.shiftRight(i);
    I.length < (t = t + 1 >> 1) && (t = I.length);

    for (var n = _(), s = 0; s < t; ++s) {
      n.fromInt(I[Math.floor(Math.random() * I.length)]);
      var o = n.modPow(r, this);

      if (0 != o.compareTo(M.ONE) && 0 != o.compareTo(e)) {
        for (var h = 1; h++ < i && 0 != o.compareTo(e);) if (0 == (o = o.modPowInt(2, this)).compareTo(M.ONE)) return !1;

        if (0 != o.compareTo(e)) return !1;
      }
    }

    return !0;
  }, M.prototype.square = function () {
    var t = _();

    return this.squareTo(t), t;
  }, M.prototype.gcda = function (t, e) {
    var i = this.s < 0 ? this.negate() : this.clone(),
        r = t.s < 0 ? t.negate() : t.clone();
    i.compareTo(r) < 0 && (n = i, i = r, r = n);
    var n,
        s = i.getLowestSetBit(),
        o = r.getLowestSetBit();
    o < 0 ? e(i) : (0 < (o = s < o ? s : o) && (i.rShiftTo(o, i), r.rShiftTo(o, r)), n = function t() {
      0 < (s = i.getLowestSetBit()) && i.rShiftTo(s, i), 0 < (s = r.getLowestSetBit()) && r.rShiftTo(s, r), 0 <= i.compareTo(r) ? (i.subTo(r, i), i.rShiftTo(1, i)) : (r.subTo(i, r), r.rShiftTo(1, r)), 0 < i.signum() ? setTimeout(t, 0) : (0 < o && r.lShiftTo(o, r), setTimeout(function () {
        e(r);
      }, 0));
    }, setTimeout(n, 10));
  }, M.prototype.fromNumberAsync = function (e, i, t, r) {
    var n, s;
    "number" == typeof i ? e < 2 ? this.fromInt(1) : (this.fromNumber(e, t), this.testBit(e - 1) || this.bitwiseTo(M.ONE.shiftLeft(e - 1), h, this), this.isEven() && this.dAddOffset(1, 0), n = this, s = function t() {
      n.dAddOffset(2, 0), n.bitLength() > e && n.subTo(M.ONE.shiftLeft(e - 1), n), n.isProbablePrime(i) ? setTimeout(function () {
        r();
      }, 0) : setTimeout(t, 0);
    }, setTimeout(s, 0)) : (t = 7 & e, (s = []).length = 1 + (e >> 3), i.nextBytes(s), 0 < t ? s[0] &= (1 << t) - 1 : s[0] = 0, this.fromString(s, 256));
  }, M);

  function M(t, e, i) {
    null != t && ("number" == typeof t ? this.fromNumber(t, e, i) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e));
  }

  var q = (L.prototype.convert = function (t) {
    return t;
  }, L.prototype.revert = function (t) {
    return t;
  }, L.prototype.mulTo = function (t, e, i) {
    t.multiplyTo(e, i);
  }, L.prototype.sqrTo = function (t, e) {
    t.squareTo(e);
  }, L);

  function L() {}

  var j = (H.prototype.convert = function (t) {
    return t.s < 0 || 0 <= t.compareTo(this.m) ? t.mod(this.m) : t;
  }, H.prototype.revert = function (t) {
    return t;
  }, H.prototype.reduce = function (t) {
    t.divRemTo(this.m, null, t);
  }, H.prototype.mulTo = function (t, e, i) {
    t.multiplyTo(e, i), this.reduce(i);
  }, H.prototype.sqrTo = function (t, e) {
    t.squareTo(e), this.reduce(e);
  }, H);

  function H(t) {
    this.m = t;
  }

  var C = (F.prototype.convert = function (t) {
    var e = _();

    return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && 0 < e.compareTo(P.ZERO) && this.m.subTo(e, e), e;
  }, F.prototype.revert = function (t) {
    var e = _();

    return t.copyTo(e), this.reduce(e), e;
  }, F.prototype.reduce = function (t) {
    for (; t.t <= this.mt2;) t[t.t++] = 0;

    for (var e = 0; e < this.m.t; ++e) {
      var i = 32767 & t[e],
          r = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;

      for (t[i = e + this.m.t] += this.m.am(0, r, t, e, 0, this.m.t); t[i] >= t.DV;) t[i] -= t.DV, t[++i]++;
    }

    t.clamp(), t.drShiftTo(this.m.t, t), 0 <= t.compareTo(this.m) && t.subTo(this.m, t);
  }, F.prototype.mulTo = function (t, e, i) {
    t.multiplyTo(e, i), this.reduce(i);
  }, F.prototype.sqrTo = function (t, e) {
    t.squareTo(e), this.reduce(e);
  }, F);

  function F(t) {
    this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t;
  }

  var K = (U.prototype.convert = function (t) {
    if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
    if (t.compareTo(this.m) < 0) return t;

    var e = _();

    return t.copyTo(e), this.reduce(e), e;
  }, U.prototype.revert = function (t) {
    return t;
  }, U.prototype.reduce = function (t) {
    for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;) t.dAddOffset(1, this.m.t + 1);

    for (t.subTo(this.r2, t); 0 <= t.compareTo(this.m);) t.subTo(this.m, t);
  }, U.prototype.mulTo = function (t, e, i) {
    t.multiplyTo(e, i), this.reduce(i);
  }, U.prototype.sqrTo = function (t, e) {
    t.squareTo(e), this.reduce(e);
  }, U);

  function U(t) {
    this.m = t, this.r2 = _(), this.q3 = _(), P.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t);
  }

  function _() {
    return new P(null);
  }

  function k(t, e) {
    return new P(t, e);
  }

  e = "Microsoft Internet Explorer" == e ? (P.prototype.am = function (t, e, i, r, n, s) {
    for (var o = 32767 & e, h = e >> 15; 0 <= --s;) {
      var a = 32767 & this[t],
          u = this[t++] >> 15,
          c = h * a + u * o;
      n = ((a = o * a + ((32767 & c) << 15) + i[r] + (1073741823 & n)) >>> 30) + (c >>> 15) + h * u + (n >>> 30), i[r++] = 1073741823 & a;
    }

    return n;
  }, 30) : "Netscape" != e ? (P.prototype.am = function (t, e, i, r, n, s) {
    for (; 0 <= --s;) {
      var o = e * this[t++] + i[r] + n;
      n = Math.floor(o / 67108864), i[r++] = 67108863 & o;
    }

    return n;
  }, 26) : (P.prototype.am = function (t, e, i, r, n, s) {
    for (var o = 16383 & e, h = e >> 14; 0 <= --s;) {
      var a = 16383 & this[t],
          u = this[t++] >> 14,
          c = h * a + u * o;
      n = ((a = o * a + ((16383 & c) << 14) + i[r] + n) >> 28) + (c >> 14) + h * u, i[r++] = 268435455 & a;
    }

    return n;
  }, 28), P.prototype.DB = e, P.prototype.DM = (1 << e) - 1, P.prototype.DV = 1 << e;
  P.prototype.FV = Math.pow(2, 52), P.prototype.F1 = 52 - e, P.prototype.F2 = 2 * e - 52;

  for (var z = [], Z = "0".charCodeAt(0), G = 0; G <= 9; ++G) z[Z++] = G;

  for (Z = "a".charCodeAt(0), G = 10; G < 36; ++G) z[Z++] = G;

  for (Z = "A".charCodeAt(0), G = 10; G < 36; ++G) z[Z++] = G;

  function $(t, e) {
    e = z[t.charCodeAt(e)];
    return null == e ? -1 : e;
  }

  function Y(t) {
    var e = _();

    return e.fromInt(t), e;
  }

  function J(t) {
    var e,
        i = 1;
    return 0 != (e = t >>> 16) && (t = e, i += 16), 0 != (e = t >> 8) && (t = e, i += 8), 0 != (e = t >> 4) && (t = e, i += 4), 0 != (e = t >> 2) && (t = e, i += 2), 0 != (e = t >> 1) && (t = e, i += 1), i;
  }

  P.ZERO = Y(0), P.ONE = Y(1);
  var X = (W.prototype.init = function (t) {
    for (var e, i, r = 0; r < 256; ++r) this.S[r] = r;

    for (r = e = 0; r < 256; ++r) e = e + this.S[r] + t[r % t.length] & 255, i = this.S[r], this.S[r] = this.S[e], this.S[e] = i;

    this.i = 0, this.j = 0;
  }, W.prototype.next = function () {
    var t;
    return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255];
  }, W);

  function W() {
    this.i = 0, this.j = 0, this.S = [];
  }

  var Q,
      tt = 256;

  if (null == (et = null)) {
    var et = [],
        it = 0,
        rt = void 0;

    if (r.crypto && r.crypto.getRandomValues) {
      var nt = new Uint32Array(256);

      for (r.crypto.getRandomValues(nt), rt = 0; rt < nt.length; ++rt) et[it++] = 255 & nt[rt];
    }

    var st = function t(e) {
      if (this.count = this.count || 0, 256 <= this.count || tt <= it) r.removeEventListener ? r.removeEventListener("mousemove", t, !1) : r.detachEvent && r.detachEvent("onmousemove", t);else try {
        var i = e.x + e.y;
        et[it++] = 255 & i, this.count += 1;
      } catch (t) {}
    };

    r.addEventListener ? r.addEventListener("mousemove", st, !1) : r.attachEvent && r.attachEvent("onmousemove", st);
  }

  function ot() {
    if (null == Q) {
      for (Q = new X(); it < tt;) {
        var t = Math.floor(65536 * Math.random());
        et[it++] = 255 & t;
      }

      for (Q.init(et), it = 0; it < et.length; ++it) et[it] = 0;

      it = 0;
    }

    return Q.next();
  }

  var ht = (at.prototype.nextBytes = function (t) {
    for (var e = 0; e < t.length; ++e) t[e] = ot();
  }, at);

  function at() {}

  var ut = (ct.prototype.doPublic = function (t) {
    return t.modPowInt(this.e, this.n);
  }, ct.prototype.doPrivate = function (t) {
    if (null == this.p || null == this.q) return t.modPow(this.d, this.n);

    for (var e = t.mod(this.p).modPow(this.dmp1, this.p), i = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(i) < 0;) e = e.add(this.p);

    return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i);
  }, ct.prototype.setPublic = function (t, e) {
    null != t && null != e && 0 < t.length && 0 < e.length && (this.n = k(t, 16), this.e = parseInt(e, 16));
  }, ct.prototype.encrypt = function (t) {
    t = function (t, e) {
      if (e < t.length + 11) return null;

      for (var i = [], r = t.length - 1; 0 <= r && 0 < e;) {
        var n = t.charCodeAt(r--);
        n < 128 ? i[--e] = n : 127 < n && n < 2048 ? (i[--e] = 63 & n | 128, i[--e] = n >> 6 | 192) : (i[--e] = 63 & n | 128, i[--e] = n >> 6 & 63 | 128, i[--e] = n >> 12 | 224);
      }

      i[--e] = 0;

      for (var s = new ht(), o = []; 2 < e;) {
        for (o[0] = 0; 0 == o[0];) s.nextBytes(o);

        i[--e] = o[0];
      }

      return i[--e] = 2, i[--e] = 0, new P(i);
    }(t, this.n.bitLength() + 7 >> 3);

    if (null == t) return null;
    t = this.doPublic(t);
    if (null == t) return null;
    t = t.toString(16);
    return 0 == (1 & t.length) ? t : "0" + t;
  }, ct.prototype.setPrivate = function (t, e, i) {
    null != t && null != e && 0 < t.length && 0 < e.length && (this.n = k(t, 16), this.e = parseInt(e, 16), this.d = k(i, 16));
  }, ct.prototype.setPrivateEx = function (t, e, i, r, n, s, o, h) {
    null != t && null != e && 0 < t.length && 0 < e.length && (this.n = k(t, 16), this.e = parseInt(e, 16), this.d = k(i, 16), this.p = k(r, 16), this.q = k(n, 16), this.dmp1 = k(s, 16), this.dmq1 = k(o, 16), this.coeff = k(h, 16));
  }, ct.prototype.generate = function (t, e) {
    var i = new ht(),
        r = t >> 1;
    this.e = parseInt(e, 16);

    for (var n = new P(e, 16);;) {
      for (; this.p = new P(t - r, 1, i), 0 != this.p.subtract(P.ONE).gcd(n).compareTo(P.ONE) || !this.p.isProbablePrime(10););

      for (; this.q = new P(r, 1, i), 0 != this.q.subtract(P.ONE).gcd(n).compareTo(P.ONE) || !this.q.isProbablePrime(10););

      this.p.compareTo(this.q) <= 0 && (h = this.p, this.p = this.q, this.q = h);
      var s = this.p.subtract(P.ONE),
          o = this.q.subtract(P.ONE),
          h = s.multiply(o);

      if (0 == h.gcd(n).compareTo(P.ONE)) {
        this.n = this.p.multiply(this.q), this.d = n.modInverse(h), this.dmp1 = this.d.mod(s), this.dmq1 = this.d.mod(o), this.coeff = this.q.modInverse(this.p);
        break;
      }
    }
  }, ct.prototype.decrypt = function (t) {
    t = k(t, 16), t = this.doPrivate(t);
    return null == t ? null : function (t, e) {
      var i = t.toByteArray(),
          r = 0;

      for (; r < i.length && 0 == i[r];) ++r;

      if (i.length - r != e - 1 || 2 != i[r]) return null;
      ++r;

      for (; 0 != i[r];) if (++r >= i.length) return null;

      var n = "";

      for (; ++r < i.length;) {
        var s = 255 & i[r];
        s < 128 ? n += String.fromCharCode(s) : 191 < s && s < 224 ? (n += String.fromCharCode((31 & s) << 6 | 63 & i[r + 1]), ++r) : (n += String.fromCharCode((15 & s) << 12 | (63 & i[r + 1]) << 6 | 63 & i[r + 2]), r += 2);
      }

      return n;
    }(t, this.n.bitLength() + 7 >> 3);
  }, ct.prototype.generateAsync = function (t, e, s) {
    var o = new ht(),
        h = t >> 1;
    this.e = parseInt(e, 16);

    var a = new P(e, 16),
        u = this,
        e = function r() {
      function e() {
        u.p.compareTo(u.q) <= 0 && (i = u.p, u.p = u.q, u.q = i);
        var t = u.p.subtract(P.ONE),
            e = u.q.subtract(P.ONE),
            i = t.multiply(e);
        0 == i.gcd(a).compareTo(P.ONE) ? (u.n = u.p.multiply(u.q), u.d = a.modInverse(i), u.dmp1 = u.d.mod(t), u.dmq1 = u.d.mod(e), u.coeff = u.q.modInverse(u.p), setTimeout(function () {
          s();
        }, 0)) : setTimeout(r, 0);
      }

      function i() {
        u.q = _(), u.q.fromNumberAsync(h, 1, o, function () {
          u.q.subtract(P.ONE).gcda(a, function (t) {
            0 == t.compareTo(P.ONE) && u.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(i, 0);
          });
        });
      }

      function n() {
        u.p = _(), u.p.fromNumberAsync(t - h, 1, o, function () {
          u.p.subtract(P.ONE).gcda(a, function (t) {
            0 == t.compareTo(P.ONE) && u.p.isProbablePrime(10) ? setTimeout(i, 0) : setTimeout(n, 0);
          });
        });
      }

      setTimeout(n, 0);
    };

    setTimeout(e, 0);
  }, ct.prototype.sign = function (t, e, i) {
    t = function (t, e) {
      if (e < t.length + 22) return null;

      for (var i = e - t.length - 6, r = "", n = 0; n < i; n += 2) r += "ff";

      return k("0001" + r + "00" + t, 16);
    }((ft[i] || "") + e(t).toString(), this.n.bitLength() / 4);

    if (null == t) return null;
    t = this.doPrivate(t);
    if (null == t) return null;
    t = t.toString(16);
    return 0 == (1 & t.length) ? t : "0" + t;
  }, ct.prototype.verify = function (t, e, i) {
    e = k(e, 16), e = this.doPublic(e);
    return null == e ? null : function (t) {
      for (var e in ft) if (ft.hasOwnProperty(e)) {
        var i = ft[e],
            e = i.length;
        if (t.substr(0, e) == i) return t.substr(e);
      }

      return t;
    }(e.toString(16).replace(/^1f+00/, "")) == i(t).toString();
  }, ct);

  function ct() {
    this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null;
  }

  var ft = {
    md2: "3020300c06082a864886f70d020205000410",
    md5: "3020300c06082a864886f70d020505000410",
    sha1: "3021300906052b0e03021a05000414",
    sha224: "302d300d06096086480165030402040500041c",
    sha256: "3031300d060960864801650304020105000420",
    sha384: "3041300d060960864801650304020205000430",
    sha512: "3051300d060960864801650304020305000440",
    ripemd160: "3021300906052b2403020105000414"
  };
  var st = {
    lang: {
      extend: function (t, e, i) {
        if (!e || !t) throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");

        function r() {}

        if (r.prototype = e.prototype, t.prototype = new r(), (t.prototype.constructor = t).superclass = e.prototype, e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e), i) {
          for (var n in i) t.prototype[n] = i[n];

          var e = function () {},
              s = ["toString", "valueOf"];

          try {
            /MSIE/.test(o) && (e = function (t, e) {
              for (n = 0; n < s.length; n += 1) {
                var i = s[n],
                    r = e[i];
                "function" == typeof r && r != Object.prototype[i] && (t[i] = r);
              }
            });
          } catch (t) {}

          e(t.prototype, i);
        }
      }
    }
  },
      lt = {};
  void 0 !== lt.asn1 && lt.asn1 || (lt.asn1 = {}), lt.asn1.ASN1Util = new function () {
    this.integerToByteHex = function (t) {
      t = t.toString(16);
      return t = t.length % 2 == 1 ? "0" + t : t;
    }, this.bigIntToMinTwosComplementsHex = function (t) {
      if ("-" != (n = t.toString(16)).substr(0, 1)) n.length % 2 == 1 ? n = "0" + n : n.match(/^[0-7]/) || (n = "00" + n);else {
        var e = n.substr(1).length;
        e % 2 == 1 ? e += 1 : n.match(/^[0-7]/) || (e += 2);

        for (var i = "", r = 0; r < e; r++) i += "f";

        var n = new P(i, 16).xor(t).add(P.ONE).toString(16).replace(/^-/, "");
      }
      return n;
    }, this.getPEMStringFromHex = function (t, e) {
      return hextopem(t, e);
    }, this.newObject = function (t) {
      var e = lt.asn1,
          i = e.DERBoolean,
          r = e.DERInteger,
          n = e.DERBitString,
          s = e.DEROctetString,
          o = e.DERNull,
          h = e.DERObjectIdentifier,
          a = e.DEREnumerated,
          u = e.DERUTF8String,
          c = e.DERNumericString,
          f = e.DERPrintableString,
          l = e.DERTeletexString,
          p = e.DERIA5String,
          g = e.DERUTCTime,
          d = e.DERGeneralizedTime,
          m = e.DERSequence,
          y = e.DERSet,
          v = e.DERTaggedObject,
          b = e.ASN1Util.newObject,
          e = Object.keys(t);
      if (1 != e.length) throw "key of param shall be only one.";
      e = e[0];
      if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + e + ":")) throw "undefined key: " + e;
      if ("bool" == e) return new i(t[e]);
      if ("int" == e) return new r(t[e]);
      if ("bitstr" == e) return new n(t[e]);
      if ("octstr" == e) return new s(t[e]);
      if ("null" == e) return new o(t[e]);
      if ("oid" == e) return new h(t[e]);
      if ("enum" == e) return new a(t[e]);
      if ("utf8str" == e) return new u(t[e]);
      if ("numstr" == e) return new c(t[e]);
      if ("prnstr" == e) return new f(t[e]);
      if ("telstr" == e) return new l(t[e]);
      if ("ia5str" == e) return new p(t[e]);
      if ("utctime" == e) return new g(t[e]);
      if ("gentime" == e) return new d(t[e]);

      if ("seq" == e) {
        for (var T = t[e], S = [], E = 0; E < T.length; E++) {
          var D = b(T[E]);
          S.push(D);
        }

        return new m({
          array: S
        });
      }

      if ("set" == e) {
        for (T = t[e], S = [], E = 0; E < T.length; E++) {
          D = b(T[E]);
          S.push(D);
        }

        return new y({
          array: S
        });
      }

      if ("tag" == e) {
        e = t[e];

        if ("[object Array]" === Object.prototype.toString.call(e) && 3 == e.length) {
          var w = b(e[2]);
          return new v({
            tag: e[0],
            explicit: e[1],
            obj: w
          });
        }

        w = {};
        if (void 0 !== e.explicit && (w.explicit = e.explicit), void 0 !== e.tag && (w.tag = e.tag), void 0 === e.obj) throw "obj shall be specified for 'tag'.";
        return w.obj = b(e.obj), new v(w);
      }
    }, this.jsonToASN1HEX = function (t) {
      return this.newObject(t).getEncodedHex();
    };
  }(), lt.asn1.ASN1Util.oidHexToInt = function (t) {
    for (var e = "", i = parseInt(t.substr(0, 2), 16), e = Math.floor(i / 40) + "." + i % 40, r = "", n = 2; n < t.length; n += 2) {
      var s = ("00000000" + parseInt(t.substr(n, 2), 16).toString(2)).slice(-8);
      r += s.substr(1, 7), "0" == s.substr(0, 1) && (e = e + "." + new P(r, 2).toString(10), r = "");
    }

    return e;
  }, lt.asn1.ASN1Util.oidIntToHex = function (t) {
    function h(t) {
      return t = 1 == (t = t.toString(16)).length ? "0" + t : t;
    }

    if (!t.match(/^[0-9.]+$/)) throw "malformed oid string: " + t;
    var e = "",
        i = t.split("."),
        t = 40 * parseInt(i[0]) + parseInt(i[1]);
    e += h(t), i.splice(0, 2);

    for (var r = 0; r < i.length; r++) e += function (t) {
      var e = "",
          i = 7 - (s = new P(t, 10).toString(2)).length % 7;
      7 == i && (i = 0);

      for (var r = "", n = 0; n < i; n++) r += "0";

      for (var s = r + s, n = 0; n < s.length - 1; n += 7) {
        var o = s.substr(n, 7);
        n != s.length - 7 && (o = "1" + o), e += h(parseInt(o, 2));
      }

      return e;
    }(i[r]);

    return e;
  }, lt.asn1.ASN1Object = function () {
    this.getLengthHexFromValue = function () {
      if (void 0 === this.hV || null == this.hV) throw "this.hV is null or undefined.";
      if (this.hV.length % 2 == 1) throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
      var t = this.hV.length / 2,
          e = t.toString(16);
      if (e.length % 2 == 1 && (e = "0" + e), t < 128) return e;
      var i = e.length / 2;
      if (15 < i) throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
      return (128 + i).toString(16) + e;
    }, this.getEncodedHex = function () {
      return null != this.hTLV && !this.isModified || (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1), this.hTLV;
    }, this.getValueHex = function () {
      return this.getEncodedHex(), this.hV;
    }, this.getFreshValueHex = function () {
      return "";
    };
  }, lt.asn1.DERAbstractString = function (t) {
    lt.asn1.DERAbstractString.superclass.constructor.call(this), this.getString = function () {
      return this.s;
    }, this.setString = function (t) {
      this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(this.s);
    }, this.setStringHex = function (t) {
      this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t;
    }, this.getFreshValueHex = function () {
      return this.hV;
    }, void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex));
  }, st.lang.extend(lt.asn1.DERAbstractString, lt.asn1.ASN1Object), lt.asn1.DERAbstractTime = function (t) {
    lt.asn1.DERAbstractTime.superclass.constructor.call(this), this.localDateToUTC = function (t) {
      return utc = t.getTime() + 6e4 * t.getTimezoneOffset(), new Date(utc);
    }, this.formatDate = function (t, e, i) {
      var r = this.zeroPadding,
          n = this.localDateToUTC(t),
          t = String(n.getFullYear()),
          t = (t = "utc" == e ? t.substr(2, 2) : t) + r(String(n.getMonth() + 1), 2) + r(String(n.getDate()), 2) + r(String(n.getHours()), 2) + r(String(n.getMinutes()), 2) + r(String(n.getSeconds()), 2);
      return !0 !== i || 0 != (n = n.getMilliseconds()) && (t = t + "." + r(String(n), 3).replace(/[0]+$/, "")), t + "Z";
    }, this.zeroPadding = function (t, e) {
      return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t;
    }, this.getString = function () {
      return this.s;
    }, this.setString = function (t) {
      this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(t);
    }, this.setByDateValue = function (t, e, i, r, n, s) {
      s = new Date(Date.UTC(t, e - 1, i, r, n, s, 0));
      this.setByDate(s);
    }, this.getFreshValueHex = function () {
      return this.hV;
    };
  }, st.lang.extend(lt.asn1.DERAbstractTime, lt.asn1.ASN1Object), lt.asn1.DERAbstractStructured = function (t) {
    lt.asn1.DERAbstractString.superclass.constructor.call(this), this.setByASN1ObjectArray = function (t) {
      this.hTLV = null, this.isModified = !0, this.asn1Array = t;
    }, this.appendASN1Object = function (t) {
      this.hTLV = null, this.isModified = !0, this.asn1Array.push(t);
    }, this.asn1Array = new Array(), void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array);
  }, st.lang.extend(lt.asn1.DERAbstractStructured, lt.asn1.ASN1Object), lt.asn1.DERBoolean = function () {
    lt.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff";
  }, st.lang.extend(lt.asn1.DERBoolean, lt.asn1.ASN1Object), lt.asn1.DERInteger = function (t) {
    lt.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function (t) {
      this.hTLV = null, this.isModified = !0, this.hV = lt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t);
    }, this.setByInteger = function (t) {
      t = new P(String(t), 10);
      this.setByBigInteger(t);
    }, this.setValueHex = function (t) {
      this.hV = t;
    }, this.getFreshValueHex = function () {
      return this.hV;
    }, void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex));
  }, st.lang.extend(lt.asn1.DERInteger, lt.asn1.ASN1Object), lt.asn1.DERBitString = function (t) {
    var e;
    void 0 !== t && void 0 !== t.obj && (e = lt.asn1.ASN1Util.newObject(t.obj), t.hex = "00" + e.getEncodedHex()), lt.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function (t) {
      this.hTLV = null, this.isModified = !0, this.hV = t;
    }, this.setUnusedBitsAndHexValue = function (t, e) {
      if (t < 0 || 7 < t) throw "unused bits shall be from 0 to 7: u = " + t;
      t = "0" + t;
      this.hTLV = null, this.isModified = !0, this.hV = t + e;
    }, this.setByBinaryString = function (t) {
      var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
      8 == e && (e = 0);

      for (var i = 0; i <= e; i++) t += "0";

      for (var r = "", i = 0; i < t.length - 1; i += 8) {
        var n = t.substr(i, 8),
            n = parseInt(n, 2).toString(16);
        r += n = 1 == n.length ? "0" + n : n;
      }

      this.hTLV = null, this.isModified = !0, this.hV = "0" + e + r;
    }, this.setByBooleanArray = function (t) {
      for (var e = "", i = 0; i < t.length; i++) 1 == t[i] ? e += "1" : e += "0";

      this.setByBinaryString(e);
    }, this.newFalseArray = function (t) {
      for (var e = new Array(t), i = 0; i < t; i++) e[i] = !1;

      return e;
    }, this.getFreshValueHex = function () {
      return this.hV;
    }, void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array));
  }, st.lang.extend(lt.asn1.DERBitString, lt.asn1.ASN1Object), lt.asn1.DEROctetString = function (t) {
    var e;
    void 0 !== t && void 0 !== t.obj && (e = lt.asn1.ASN1Util.newObject(t.obj), t.hex = e.getEncodedHex()), lt.asn1.DEROctetString.superclass.constructor.call(this, t), this.hT = "04";
  }, st.lang.extend(lt.asn1.DEROctetString, lt.asn1.DERAbstractString), lt.asn1.DERNull = function () {
    lt.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500";
  }, st.lang.extend(lt.asn1.DERNull, lt.asn1.ASN1Object), lt.asn1.DERObjectIdentifier = function (t) {
    function h(t) {
      return t = 1 == (t = t.toString(16)).length ? "0" + t : t;
    }

    lt.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function (t) {
      this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t;
    }, this.setValueOidString = function (t) {
      if (!t.match(/^[0-9.]+$/)) throw "malformed oid string: " + t;
      var e = "",
          i = t.split("."),
          t = 40 * parseInt(i[0]) + parseInt(i[1]);
      e += h(t), i.splice(0, 2);

      for (var r = 0; r < i.length; r++) e += function (t) {
        var e = "",
            i = 7 - (s = new P(t, 10).toString(2)).length % 7;
        7 == i && (i = 0);

        for (var r = "", n = 0; n < i; n++) r += "0";

        for (var s = r + s, n = 0; n < s.length - 1; n += 7) {
          var o = s.substr(n, 7);
          n != s.length - 7 && (o = "1" + o), e += h(parseInt(o, 2));
        }

        return e;
      }(i[r]);

      this.hTLV = null, this.isModified = !0, this.s = null, this.hV = e;
    }, this.setValueName = function (t) {
      var e = lt.asn1.x509.OID.name2oid(t);
      if ("" === e) throw "DERObjectIdentifier oidName undefined: " + t;
      this.setValueOidString(e);
    }, this.getFreshValueHex = function () {
      return this.hV;
    }, void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name));
  }, st.lang.extend(lt.asn1.DERObjectIdentifier, lt.asn1.ASN1Object), lt.asn1.DEREnumerated = function (t) {
    lt.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function (t) {
      this.hTLV = null, this.isModified = !0, this.hV = lt.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t);
    }, this.setByInteger = function (t) {
      t = new P(String(t), 10);
      this.setByBigInteger(t);
    }, this.setValueHex = function (t) {
      this.hV = t;
    }, this.getFreshValueHex = function () {
      return this.hV;
    }, void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex));
  }, st.lang.extend(lt.asn1.DEREnumerated, lt.asn1.ASN1Object), lt.asn1.DERUTF8String = function (t) {
    lt.asn1.DERUTF8String.superclass.constructor.call(this, t), this.hT = "0c";
  }, st.lang.extend(lt.asn1.DERUTF8String, lt.asn1.DERAbstractString), lt.asn1.DERNumericString = function (t) {
    lt.asn1.DERNumericString.superclass.constructor.call(this, t), this.hT = "12";
  }, st.lang.extend(lt.asn1.DERNumericString, lt.asn1.DERAbstractString), lt.asn1.DERPrintableString = function (t) {
    lt.asn1.DERPrintableString.superclass.constructor.call(this, t), this.hT = "13";
  }, st.lang.extend(lt.asn1.DERPrintableString, lt.asn1.DERAbstractString), lt.asn1.DERTeletexString = function (t) {
    lt.asn1.DERTeletexString.superclass.constructor.call(this, t), this.hT = "14";
  }, st.lang.extend(lt.asn1.DERTeletexString, lt.asn1.DERAbstractString), lt.asn1.DERIA5String = function (t) {
    lt.asn1.DERIA5String.superclass.constructor.call(this, t), this.hT = "16";
  }, st.lang.extend(lt.asn1.DERIA5String, lt.asn1.DERAbstractString), lt.asn1.DERUTCTime = function (t) {
    lt.asn1.DERUTCTime.superclass.constructor.call(this, t), this.hT = "17", this.setByDate = function (t) {
      this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s);
    }, this.getFreshValueHex = function () {
      return void 0 === this.date && void 0 === this.s && (this.date = new Date(), this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)), this.hV;
    }, void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date));
  }, st.lang.extend(lt.asn1.DERUTCTime, lt.asn1.DERAbstractTime), lt.asn1.DERGeneralizedTime = function (t) {
    lt.asn1.DERGeneralizedTime.superclass.constructor.call(this, t), this.hT = "18", this.withMillis = !1, this.setByDate = function (t) {
      this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s);
    }, this.getFreshValueHex = function () {
      return void 0 === this.date && void 0 === this.s && (this.date = new Date(), this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)), this.hV;
    }, void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date), !0 === t.millis && (this.withMillis = !0));
  }, st.lang.extend(lt.asn1.DERGeneralizedTime, lt.asn1.DERAbstractTime), lt.asn1.DERSequence = function (t) {
    lt.asn1.DERSequence.superclass.constructor.call(this, t), this.hT = "30", this.getFreshValueHex = function () {
      for (var t = "", e = 0; e < this.asn1Array.length; e++) t += this.asn1Array[e].getEncodedHex();

      return this.hV = t, this.hV;
    };
  }, st.lang.extend(lt.asn1.DERSequence, lt.asn1.DERAbstractStructured), lt.asn1.DERSet = function (t) {
    lt.asn1.DERSet.superclass.constructor.call(this, t), this.hT = "31", this.sortFlag = !0, this.getFreshValueHex = function () {
      for (var t = new Array(), e = 0; e < this.asn1Array.length; e++) {
        var i = this.asn1Array[e];
        t.push(i.getEncodedHex());
      }

      return 1 == this.sortFlag && t.sort(), this.hV = t.join(""), this.hV;
    }, void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1);
  }, st.lang.extend(lt.asn1.DERSet, lt.asn1.DERAbstractStructured), lt.asn1.DERTaggedObject = function (t) {
    lt.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function (t, e, i) {
      this.hT = e, this.isExplicit = t, this.asn1Object = i, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = i.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, e), this.isModified = !1);
    }, this.getFreshValueHex = function () {
      return this.hV;
    }, void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag), void 0 !== t.explicit && (this.isExplicit = t.explicit), void 0 !== t.obj && (this.asn1Object = t.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)));
  }, st.lang.extend(lt.asn1.DERTaggedObject, lt.asn1.ASN1Object);
  var pt,
      gt,
      dt,
      mt = (g(gt = vt, dt = pt = ut), gt.prototype = null === dt ? Object.create(dt) : (yt.prototype = dt.prototype, new yt()), vt.prototype.parseKey = function (t) {
    try {
      var e = 0,
          i = 0,
          r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? m(t) : y.unarmor(t),
          n = R.decode(r);

      if (9 === (n = 3 === n.sub.length ? n.sub[2].sub[0] : n).sub.length) {
        e = n.sub[1].getHexStringValue(), this.n = k(e, 16), i = n.sub[2].getHexStringValue(), this.e = parseInt(i, 16);
        var s = n.sub[3].getHexStringValue();
        this.d = k(s, 16);
        var o = n.sub[4].getHexStringValue();
        this.p = k(o, 16);
        var h = n.sub[5].getHexStringValue();
        this.q = k(h, 16);
        var a = n.sub[6].getHexStringValue();
        this.dmp1 = k(a, 16);
        var u = n.sub[7].getHexStringValue();
        this.dmq1 = k(u, 16);
        var c = n.sub[8].getHexStringValue();
        this.coeff = k(c, 16);
      } else {
        if (2 !== n.sub.length) return !1;
        var f = n.sub[1].sub[0],
            e = f.sub[0].getHexStringValue();
        this.n = k(e, 16), i = f.sub[1].getHexStringValue(), this.e = parseInt(i, 16);
      }

      return !0;
    } catch (t) {
      return !1;
    }
  }, vt.prototype.getPrivateBaseKey = function () {
    var t = {
      array: [new lt.asn1.DERInteger({
        int: 0
      }), new lt.asn1.DERInteger({
        bigint: this.n
      }), new lt.asn1.DERInteger({
        int: this.e
      }), new lt.asn1.DERInteger({
        bigint: this.d
      }), new lt.asn1.DERInteger({
        bigint: this.p
      }), new lt.asn1.DERInteger({
        bigint: this.q
      }), new lt.asn1.DERInteger({
        bigint: this.dmp1
      }), new lt.asn1.DERInteger({
        bigint: this.dmq1
      }), new lt.asn1.DERInteger({
        bigint: this.coeff
      })]
    };
    return new lt.asn1.DERSequence(t).getEncodedHex();
  }, vt.prototype.getPrivateBaseKeyB64 = function () {
    return f(this.getPrivateBaseKey());
  }, vt.prototype.getPublicBaseKey = function () {
    var t = new lt.asn1.DERSequence({
      array: [new lt.asn1.DERObjectIdentifier({
        oid: "1.2.840.113549.1.1.1"
      }), new lt.asn1.DERNull()]
    }),
        e = new lt.asn1.DERSequence({
      array: [new lt.asn1.DERInteger({
        bigint: this.n
      }), new lt.asn1.DERInteger({
        int: this.e
      })]
    }),
        e = new lt.asn1.DERBitString({
      hex: "00" + e.getEncodedHex()
    });
    return new lt.asn1.DERSequence({
      array: [t, e]
    }).getEncodedHex();
  }, vt.prototype.getPublicBaseKeyB64 = function () {
    return f(this.getPublicBaseKey());
  }, vt.wordwrap = function (t, e) {
    return e = e || 64, t && t.match(RegExp("(.{1," + e + "})( +|$\n?)|(.{1," + e + "})", "g")).join("\n");
  }, vt.prototype.getPrivateKey = function () {
    var t = "-----BEGIN RSA PRIVATE KEY-----\n";
    return t += vt.wordwrap(this.getPrivateBaseKeyB64()) + "\n", t += "-----END RSA PRIVATE KEY-----";
  }, vt.prototype.getPublicKey = function () {
    var t = "-----BEGIN PUBLIC KEY-----\n";
    return t += vt.wordwrap(this.getPublicBaseKeyB64()) + "\n", t += "-----END PUBLIC KEY-----";
  }, vt.hasPublicKeyProperty = function (t) {
    return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e");
  }, vt.hasPrivateKeyProperty = function (t) {
    return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff");
  }, vt.prototype.parsePropertiesFrom = function (t) {
    this.n = t.n, this.e = t.e, t.hasOwnProperty("d") && (this.d = t.d, this.p = t.p, this.q = t.q, this.dmp1 = t.dmp1, this.dmq1 = t.dmq1, this.coeff = t.coeff);
  }, vt);

  function yt() {
    this.constructor = gt;
  }

  function vt(t) {
    var e = pt.call(this) || this;
    return t && ("string" == typeof t ? e.parseKey(t) : (vt.hasPrivateKeyProperty(t) || vt.hasPublicKeyProperty(t)) && e.parsePropertiesFrom(t)), e;
  }

  bt.prototype.setKey = function (t) {
    this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new mt(t);
  }, bt.prototype.setPrivateKey = function (t) {
    this.setKey(t);
  }, bt.prototype.setPublicKey = function (t) {
    this.setKey(t);
  }, bt.prototype.decrypt = function (t) {
    try {
      return this.getKey().decrypt(l(t));
    } catch (t) {
      return !1;
    }
  }, bt.prototype.encrypt = function (t) {
    try {
      return f(this.getKey().encrypt(t));
    } catch (t) {
      return !1;
    }
  }, bt.prototype.sign = function (t, e, i) {
    try {
      return f(this.getKey().sign(t, e, i));
    } catch (t) {
      return !1;
    }
  }, bt.prototype.verify = function (t, e, i) {
    try {
      return this.getKey().verify(t, l(e), i);
    } catch (t) {
      return !1;
    }
  }, bt.prototype.getKey = function (t) {
    if (!this.key) {
      if (this.key = new mt(), t && "[object Function]" === {}.toString.call(t)) return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
      this.key.generate(this.default_key_size, this.default_public_exponent);
    }

    return this.key;
  }, bt.prototype.getPrivateKey = function () {
    return this.getKey().getPrivateKey();
  }, bt.prototype.getPrivateKeyB64 = function () {
    return this.getKey().getPrivateBaseKeyB64();
  }, bt.prototype.getPublicKey = function () {
    return this.getKey().getPublicKey();
  }, bt.prototype.getPublicKeyB64 = function () {
    return this.getKey().getPublicBaseKeyB64();
  }, bt.version = "3.0.0-rc.1", st = bt;

  function bt(t) {
    t = t || {}, this.default_key_size = parseInt(t.default_key_size, 10) || 1024, this.default_public_exponent = t.default_public_exponent || "010001", this.log = t.log || !1, this.key = null;
  }

  t.JSEncrypt = st, t.default = st, Object.defineProperty(t, "__esModule", {
    value: !0
  });
});
import CryptoJSCore from '../../npm/crypto-js/core';
import AES from '../../npm/crypto-js/aes';
import Pkcs7 from '../../npm/crypto-js/pad-pkcs7';
 
const AesKey = "J@NcRfUjXn2r5u8x";
// AES-128-CBC偏移量
const CBCIV = "t7w!z%C*F-JaNdRg";
// 加密选项
const CBCOptions = {
  iv: CryptoJSCore.enc.Utf8.parse(CBCIV),
  mode: CryptoJSCore.mode.CBC,
  padding: Pkcs7
};
 
/**
 * AES加密（CBC模式，需要偏移量）
 * @param data
 * @returns {*}
 */
export function encrypt(data) {
  let key = CryptoJSCore.enc.Utf8.parse(AesKey);
  let secretData = CryptoJSCore.enc.Utf8.parse(data);
  let encrypted = AES.encrypt(
    secretData,
    key,
    CBCOptions
  );
  return encrypted.toString();
}
 
/**
 * AES解密（CBC模式，需要偏移量）
 * @param data
 * @returns {*}
 */
export function decrypt(data) {
  let key = CryptoJSCore.enc.Utf8.parse(AesKey);
  let decrypt = AES.decrypt(
    data,
    key,
    CBCOptions
  );
  return CryptoJSCore.enc.Utf8.stringify(decrypt).toString();
}
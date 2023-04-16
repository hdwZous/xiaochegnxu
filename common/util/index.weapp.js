import JsEncrypt from './jsencrypt_weapp';
// import JsEncrypt from 'wxmp-rsa'
/**
 * rsa加密
 * @param text
 * @returns {*}
 */
export function encryptRsa (text) {
  let publicKey_ = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJ7D3tvVPK0TUdhQ+vQm1xuusvp9XZG0On+viOsfFm7RqOhAlabc2awbknFWLA69atJPBSib7BNHyNtuxZkihCMCAwEAAQ=="
  let jse = new JsEncrypt()
  jse.setPublicKey(`-----BEGIN PUBLIC KEY-----${(publicKey_)}-----END PUBLIC KEY-----`)
  let encrypted = jse.encryptLong(text)
  // console.log('加密后：', encrypted)
  // let privateKey_ = 'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAnsPe29U8rRNR2FD69CbXG66y+n1dkbQ6f6+I6x8WbtGo6ECVptzZrBuScVYsDr1q0k8FKJvsE0fI227FmSKEIwIDAQABAkAt/KBF3tsnaswvMy2toL54Bz9SbRO4S5MSPx8Ss7uEt4LLxtPvCOnZeUjP1fW2HOF5qMAjbdZ8V/cc/9nls2txAiEA3FE87i6YXPicnbDT71viAXGvqZ1IYXqIsOE7sEqMdWkCIQC4epB9YfNfM91u8dsuhi8tW8qi10q5DXkYsUvKX2l/qwIgMzIZg4uGUkxfMHGPvhZO3WEKndJzqFst+lRMZ3nbS8kCIQC0DcRK7DhaekesylgwH32aWtX7fAANf83qwNkFa3yPwwIgdUbSbICsuUsVmwW6RHHz8f5sDZLDaZv8lSUqCK4uP8I='
  // jse.setPrivateKey(`-----BEGIN RSA PRIVATE KEY-----${(privateKey_)}-----END RSA PRIVATE KEY-----`)
  // let uncrypted = jse.decryptLong(encrypted)
  // console.log('解密后：', uncrypted)
  jse = null;

  return encrypted
}
// export function encryptNew(text) {
//   let publicKey_ = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkDiPJ9Dy6diWmsxoX6hXKF0kFT7IXgRJpurh/bmkKFVMVAm0cZ0owf27uSDUhH6q3UZEhXmegl0ubDQjdueuBzLERigznDR8m70C7FMMaZmyu3TN5eMG8n84Brnw2HumZZNOgvFt8Fdx/szIbZkmGtNoHY0CIJuiBesNTAx/A4QIDAQAB'
//   let jse = new JsEncrypt({ default_key_size: 1024 })
//   jse.setPublicKey(`-----BEGIN PUBLIC KEY-----${(publicKey_)}-----END PUBLIC KEY-----`)
//   let encrypted = jse.encrypt(text)
//   jse = null;
//   return encrypted
// }

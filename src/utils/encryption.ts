/**
 * Description: 加密通用工具
 * User: ChenJiaLei
 * Date: 2019/11/23
 * Time: 16:52
 */

 import CryptoJS from "crypto-js"

 // 秘钥：Bohui@123通过MD5加密后的前16位
 const KEY = "635ba0d34b505a75";
 
 
 class Encryption {
    key:any
     constructor() {
         this.key = CryptoJS.enc.Utf8.parse(KEY);
     }
 
     // AES加密
     encrypt(val:any) {
         if (typeof val === "object") {
             // 对象
             val = JSON.stringify(val);
         }
         val = CryptoJS.enc.Utf8.parse(val);
         let cryptor = CryptoJS.AES.encrypt(val, this.key, {
             mode: CryptoJS.mode.ECB, // 该模式下无需指定偏移量
             padding: CryptoJS.pad.Pkcs7
         });
         return cryptor.ciphertext.toString();
     };
 
     // AES解密
     decrypt (val:any) {
         val = CryptoJS.enc.Hex.parse(val);
         val = CryptoJS.enc.Base64.stringify(val);
         let decryptor = CryptoJS.AES.decrypt(val, this.key, {
             mode: CryptoJS.mode.ECB, // 该模式下无需指定偏移量
             padding: CryptoJS.pad.Pkcs7
         });
         console.log(CryptoJS.enc.Utf8.stringify(decryptor));
         
         return CryptoJS.enc.Utf8.stringify(decryptor);
     };
 
     //MD5加密
     MD5encrypt = function (val:any) {
          return CryptoJS.MD5(val).toString();
     }
 
 }
 
 
 export {
     Encryption
 }
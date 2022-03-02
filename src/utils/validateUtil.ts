/**
 * Desc: 校验通用工具
 * User: ChenJiaLei
 * Date: 2019/7/21
 * Time: 下午11:16
 */
//  import { createRequire } from 'module';
//  const require = createRequire(import.meta.url);
 const $ = ()=>require('jquery');
 const trimStr= str => {return str.replace(/(^\s*)|(\s*$)/g,"")};
 export const validateUtil={
     //单播地址
     isIP:ip=>{
         const ipCheck = /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/;
         return ipCheck.test(trimStr(ip));
     },
     getMatchIP:ip=>{
         const ipCheck = /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/g;
         return ip.match(ipCheck)
     },
     //组播地址
     isMultiIP:ip=>{
         const multiCheck=/^2[2-3][0-9]\.(0|\d{1,2}|[1]\d{1,2}|2[0-5]\d)\.(0|\d{1,2}|[1]\d{1,2}|2[0-5]\d)\.(0|\d{1,2}|[1]\d{1,2}|2[0-5]\d)$/;
         return multiCheck.test(trimStr(ip))
     },
     //端口格式
     isPort:port=>{
         const portCheck=/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
         return portCheck.test(trimStr(port));
     },
     //子网掩码
     isMask:mask=>{
         const maskCheck=/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
         return maskCheck.test(trimStr(mask))
     },
     //MAC
     isMac:mac=>{
         const macCheck=/^([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}$/;
         return macCheck.test(trimStr(mac))
     },
     //非空
     isNull:value=>{
         return value!==''
     },
     //是否是数字
     isNumber:num=>{
         const numberCheck=/^[0-9]\d*$/;
         return numberCheck.test(trimStr(num))
     },
     //是否是正整数
     isPositiveNumber:num=>{
         const numberCheck=/^[1-9]\d*$/;
         return numberCheck.test(trimStr(num))
     },
     //数字区间
     isBetween:(num,min,max)=>{
         num=trimStr(num);
         return validateUtil.isNumber(num)&&parseInt(num)>=parseInt(min)&&parseInt(num)<=parseInt(max);
     },
     isUdp:(value)=>{
         let pass = true
         if(value==='') {
             pass = true
         }else {
             let IPRegex=/^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/;
             let PortRegex = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
             let url=value,startStr='udp://';
             if(url.indexOf(startStr)===0){//起点对
                 url=url.substr(startStr.length,url.length-startStr.length);
                 if(url.indexOf('@')===0){//单层
                     url=url.substr(1,url.length-1);
                     let UrlArray=url.split(':');
                     if(!(IPRegex.test(UrlArray[0])&&PortRegex.test(UrlArray[1]))){
                         pass=false;
                     }
                 }else {
                     pass=false;
                 }
             }else {
                 pass=false;
             }
         }
         return pass
     },
     isEqualIPAddress:(ip,mask,gate)=>{
         const ipCheck = /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/;
         if(ipCheck.test(trimStr(gate))){
             let ipList = ip.split('.')
             let gateList = gate.split('.')
             let maskList = mask.split('.')
             let currentIPMask1 = parseInt(ipList[0]) & parseInt(maskList[0]),
              currentgateMask1 = parseInt(gateList[0]) & parseInt(maskList[0]),
              currentIPMask2 = parseInt(ipList[1]) & parseInt(maskList[1]),
              currentgateMask2 = parseInt(gateList[1]) & parseInt(maskList[1]),
              currentIPMask3 = parseInt(ipList[2]) & parseInt(maskList[2]),
              currentgateMask3 = parseInt(gateList[2]) & parseInt(maskList[2]),
              currentIPMask4 = parseInt(ipList[3]) & parseInt(maskList[3]),
              currentgateMask4 = parseInt(gateList[3]) & parseInt(maskList[3])
             if(currentIPMask1==currentgateMask1&&currentIPMask2==currentgateMask2&&currentIPMask3==currentgateMask3&&currentIPMask4==currentgateMask4){
                 return true
             }else{
                 return false
             }
         }else{
             return false
         }
     }
 };
 
 export const inputCheck=function (el) {
     const value=$(el).val()||'';
     const type=el.getAttribute('data-validateType');
     const params=el.getAttribute('data-validateValue');
     //通过|提示
     let pass=true,msg='';
     switch (type){
         case 'ip':
             pass=validateUtil.isIP(value);
             break;
         case 'ipOrNull':
             pass=value===''||validateUtil.isIP(value);
             break;
         case 'ipArrOrNull':
             if(value===''){
                 pass=true
             }else {
                 //有一个格式不对都不通过
                 let arr=value.split(',');
                 for(let i=0;i<arr.length;i++){
                     if(!validateUtil.isIP(arr[i])){
                         pass=false
                     }
                 }
             }
             break;
         case 'port':
             pass=validateUtil.isPort(value);
             break;
         case 'portOrNull':
             pass=value===''||validateUtil.isPort(value);
             break;
         case 'multiIp':
             pass=validateUtil.isMultiIP(value);
             break;
         case 'notNull':
             pass=validateUtil.isNull(value);
             break;
         case 'number':
             pass=validateUtil.isNumber(value);
             break;
         case 'positiveNumber':
             pass=validateUtil.isPositiveNumber(value);
             break;
         case 'between':
             pass=validateUtil.isBetween(value,params.split('-')[0],params.split('-')[1]);
             break;
         case 'mask':
             pass=validateUtil.isMask(value);
             break;
         case 'udp':
             pass=validateUtil.isUdp(value)
             break;
         case 'udprtmps':
             let udp_arr = value.split(',');
             udp_arr.map(udpStr=>{
                 if (udpStr.indexOf('rtmp:')!==0){
                     if (!validateUtil.isUdp(udpStr)){
                         pass = false
                     }
                 }
             })
             break;
         case 'resolution':
             let arr=value.split('*');
             if(arr.length!==2){
                 pass=false
             }
            //  if((!validateUtil.isNumber(arr[0]))||parseInt(arr[0])%2!==0||(!validateUtil.isNumber(arr[1])%2!==0)||parseInt(arr[1])%2!==0){
            //      pass=false
            //  }
             break;
         case 'rtmp':
             pass=value===''||value.indexOf(params)===0;
             break;
         default:
             break;
     }
     if(!pass){
         if(!$(el).hasClass('error-input'))
             $(el).addClass('error-input');
     }else {
         if($(el).hasClass('error-input'))
             $(el).removeClass('error-input');
     }
 };
 
 
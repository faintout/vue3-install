/**
 * Desc: 所有的Ajax请求接口
 * User: ChenJiaLei
 * Date: 2019/7/19
 * Time: 上午12:15
 */
 import Router from '@/router/routerIndex'
 import Axios from 'axios';
 import Url from "@/utils/urlUtil";
 import {ToolUtil} from "@/utils/toolUtil";
 import {ElMain, ElMessage} from 'element-plus';
 import {Encryption} from '@/utils/encryption';
import { resolve } from 'path/posix';
import { rejects } from 'assert/strict';
 let encryption = new Encryption();
 
 // 判定，做路由重定向
//  Axios.interceptors.response.use((response:any) => {
//      let loginFail = false;
//      if (ToolUtil.isIE()) {
//          // 返回结果中提示登录失败
//          loginFail = response.data && !response.data.success && response.data.msg && response.data.msg.toString().indexOf("登录失败") >= 0;
//      } else {
//          // 非IE浏览器，请求地址和响应地址不一致，表明已重定向
//          loginFail = response.request.responseURL &&  response.request.responseURL.toString().indexOf(response.config.url.toString()) < 0 && response.request.responseURL.toString().indexOf('next') >= 0;
//      }
//      if(loginFail) {
//          // 重定向到登录页面
//          Router.push({path: "/login"})
//      }else {
//          return response;
//      }
//  }, function (error) {
//      if(error.config.url=="/sys/sysDateTime"){
//          return Promise.reject(error);
//      }else if (undefined === error.response) {
//          // 重定向到登录页面
//          Router.push({path: "/login"})
//      } else {
//          return Promise.reject(error);
//      }
//  });

 // 判定，做路由重定向（通过拦截进行重定向）
Axios.interceptors.response.use( //拦截器固定写法这是响应拦截，请求拦截是request
    response => {
        let loginFail = false;
        if (ToolUtil.isIE()) {
            // 返回结果中提示登录失败
            // console.log(response)
            loginFail =
                response.data &&
                typeof response.data == "string"
        } else {
            // 非IE浏览器，请求地址和响应地址不一致，表明已重定向（就是断网啊等情况response和request不一样了那不就要重定向了吗）
            loginFail =
                response.request.responseURL &&
                response.request.responseURL.toString().indexOf("next") >= 0; //后台加了next，请求里面有这个返回
                // console.log(response.request.responseURL,response.request.responseURL.toString().indexOf("next"));
                
        }
        
        //console.log( response);
        
        if (loginFail) {
            alert('会话已过期，请重新登录')
            // 重定向到登录页面
            Router.push({ path: "/login" });
        } else {
            return response;
        }
    }, //每个接口都会执行这个2**范围内是都会执行上函数，之外执行下函数
    function (error) {
        if (undefined === error.response) { //undefined则回首页，但是在公司那个服务是有的虽然不通
            // 重定向到登录页面
            Router.push({ path: "/login" });
        } else {
            return Promise.reject(error);
        }
    }
);
 

 interface getDataModel {
         (url:string,params?:object,header?:object):any
 } //定义一个interface省的下面写了
 /**
  * 与后台交互的通用Axios处理
  * @param url
  * @param params
  */
 const getData:getDataModel = (url, params,header,type) => {
   
   return new Promise((resolve, reject) => {
     Axios[type||"post"](url, params,header).then(res => {
             if (!res || res.headers.warning === "redirect") {
                 // 重定向到登录页面
                 //console.log(header,res.headers);
                 
                 Router.push({path: "/login"})
             } else {
                 resolve(res.data);
             }
         }).catch(err => {
             reject(err);
             ElMessage.error("网络存在问题" + err);
             
         })
     })
 };
 
 
 export {
     getData
 }
 
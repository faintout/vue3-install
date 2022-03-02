/*
 * @Author: LiuFengRui
 * @Date: 2021-09-25 13:54:51
 * @LastEditTime: 2021-09-27 10:23:57
 * @LastEditors: LiuFengRui
 * @Description: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn'
import router from './router/routerIndex'
import Url from './utils/urlUtil';
import {getData} from './utils/ajaxUtil'
import store from './store/store';
import {deviceStatusCompList} from './config/componentMap';

import VueViewer from 'v-viewer'
const app = createApp(App)
 /**
  * 获取焦点 - 自定义指令
  * 调用方式：v-focus-me="true"
  */
  app.config.globalProperties.$interface = Url
  app.config.globalProperties.$http = getData
  app.directive("focus-me", {beforeMount(el,binding) {
    if(binding.value){
        if(el.children) {
            // 对于el-input输入框
            el.children[0].focus();
        }else {
            // 对于原生input输入框
            el.focus();
        }
    }
}});
app.use(VueViewer)
app.use(router)
app.use(store)
app.use(ElementPlus,{locale})
app.mount('#app')

//组件统一加载
deviceStatusCompList.forEach(({moduleName,moduleConfig})=>{
    app.component(moduleName,moduleConfig)
})



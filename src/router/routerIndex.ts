/*
 * @Author: LiuFengRui
 * @Date: 2021-09-25 14:27:59
 * @LastEditTime: 2022-02-23 09:36:30
 * @LastEditors: LiuFengRui
 * @Description: 
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import login from '@/view/login/login.vue'
import layout from '@/view/layout/layout.vue'
import duty from '@/view/duty/duty.vue'
import link from '@/view/duty/link.vue'
import overall from '@/view/duty/overall.vue'
import { useRouter, useRoute } from 'vue-router'
import store2 from '../store/store'
import { useStore, mapState } from 'vuex'
const store = useStore()
const route = useRoute()
// window.addEventListener('listener',store.state().flag)


const routes: any = [
    {
        path: '/',
        redirect: '/duty',
        // component: login,
        meta: {
            keepAlive: true
        }

    }, {
        path: '/login',
        name: '登录',
        component: login,
        meta: {
            keepAlive: true
        }
    }, {
        path: '/layout',
        name: '框架',
        component: layout,
        meta: {
            keepAlive: true
        },
        children: [{
            path: '/duty',
            name: '首页',
            component: duty,
            meta: {
                keepAlive: true
            },
        }, {
            path: '/link',
            name: '链路',
            component: link,
            meta: {
                keepAlive: true
            },
        }, {
            path: '/overall',
            name: '总览',
            component: overall,
            meta: {
                keepAlive: true
            },
        }]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


router.beforeEach((to, from, next) => {

    //判断本地用户是否登录
    // var reg = RegExp('VMSUserInfo' + '=.*');
    // var userInfo = document.cookie.match(reg) ? JSON.parse(document.cookie.match(reg)[0].replace('VMSUserInfo=', '')) : {}
    // var loginStatus = userInfo.password && userInfo.id
    // //登录页判断
    // if (to.fullPath == '/login') {
    //     if(loginStatus){
    //         next('/duty')
    //     }
    // } else {
    //     if(!loginStatus){
    //         next('/login')
    //     }
    // }

    //设置条件只为当前路由设置beforeEach
    next()
})


// router.beforeEach((to,from,next) => {
//     //缺少token无法进行路由拦截
//     next()
// })
export default router
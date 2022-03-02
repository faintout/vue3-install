/*
 * @Author: LiuFengRui
 * @Date: 2021-07-26 13:43:11
 * @LastEditTime: 2021-09-26 15:36:33
 * @LastEditors: LiuFengRui
 * @Description: 
 */
import { createStore } from 'vuex'
import testMutation from './testMutation'
import productManage from './productManage/productManage'

const store = createStore({
    modules: { 
        testMutation: testMutation,
        productManage: productManage
      }
})
//引用的时候还是 直接去store引就可以，无需经过这个module（只是方面模块化管理）
export default store


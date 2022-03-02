/*
 * @Author: LiuFengRui
 * @Date: 2021-09-25 14:42:59
 * @LastEditTime: 2021-09-26 15:35:51
 * @LastEditors: LiuFengRui
 * @Description: 
 */
import {getCurrentInstance} from 'vue';
import { ElMessage } from 'element-plus';

// const {proxy} = getCurrentInstance()

export default {
    state() {
        return {
            isShowAddClass:false,
            isShowAddFault:false
        }
    },
    mutations:{
        upShowAddClass(state,value){
            state.isShowAddClass = value
        },
        upShowAddFault(state,value){
            state.isShowAddFault = value
        }
    },
    actions:{
        addClass(props,value){
            //添加分类接口  
            // props.commit()
            // proxy.$http(proxy.$interface.addProductType,{productTypeName:value}).then(res => {
            //     if(res.status==1){
            //         ElMessage.success('新增分类成功')
            //     }
            // })
        }
    }
}
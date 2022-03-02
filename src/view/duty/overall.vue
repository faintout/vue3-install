<!--
 * @Author: LiuFengRui
 * @Date: 2021-11-08 15:41:12
 * @LastEditTime: 2022-02-23 09:40:39
 * @LastEditors: LiuFengRui
 * @Description: 
-->
<template>
    <div class="content_main">
        <div style="margin-top: 25rem;color:#000;">当前为总览界面</div>
    </div>
    <div class="bottomClass">
        <button @click="goSence">全景</button>
        <button @click="goOverall">总览</button>
        <button @click="goLink">链路</button>
    </div>
</template>

<script lang="ts">
// import {getCurrentInstance} from 'vue'
// cosnt {proxy} = getCurrentInstance() //这也是每个原型里面都有proxy的原因
// proxy.$interface //即可用
import {
    defineComponent,
    ref,
    reactive,
    toRefs,
    onMounted,
    provide,
    watch,
    onUnmounted,
    computed,
    nextTick,
    getCurrentInstance,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
// import {WSClient} from "../../utils/webSocketUtil";
export default defineComponent({
    name: "overall",
    components: {},
    setup(props, context) {
        const router = useRouter()
        const state = reactive({

        });
        onMounted(() => {

        });
        //保证页面挂载之后再执行
        nextTick(() => {
        });
        onUnmounted(() => {

        });
        const methods = {
            //切换到场景页
            goSence() {
                router.push('/duty')
                //调动ue4切换场景
                ue4("ChangeMap",
                    { map: "home" },
                    function (rv) {
                        console.log("rv:", rv)
                        alert(rv);
                    }
                );
            },
            //切换到总览页
            goOverall() {
                router.push('/overall')
                //调动ue4切换场景
                ue4("ChangeMap",
                    { map: "overall" },
                    function (rv) {
                        console.log("rv:", rv)
                        alert(rv);
                    }
                );
            },
            //切换到链路页
            goLink() {
                router.push('/link')
                //调动ue4切换场景
                ue4("ChangeMap",
                    { map: "link" },
                    function (rv) {
                        console.log("rv:", rv)
                        alert(rv);
                    }
                );
            },
        };

        return {
            ...toRefs(state),
            ...methods,
        };
    },
});
</script>
<style scoped lang="less">
</style>
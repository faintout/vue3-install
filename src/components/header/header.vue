<!--
 * @Author: LiuFengRui
 * @Date: 2021-11-08 15:41:12
 * @LastEditTime: 2021-11-08 16:07:48
 * @LastEditors: LiuFengRui
 * @Description: 
-->
<template>
    <div class="nav">

    </div>
</template>

<script lang="ts">
import {
    defineComponent,
    reactive,
    ref,
    toRefs,
    onMounted,
    onUnmounted,
} from "vue";
import { getData } from '@/utils/ajaxUtil';
import url from '@/utils/urlUtil';
import { useRoute, useRouter } from "vue-router";
import moment from 'moment';
interface stateModel {
    dataTime: string | null;
    nickName: string | null;
    userList: any;
}
let timer: any = null;
let refreshTime: number = 1000;
export default defineComponent({
    name: "",
    components: {},
    setup(props, context) {
        const router = useRouter();
        const state = reactive({

        });

        const methods = {

            loginOut() {
                document.cookie = 'VMSUserInfo = {};expires=-1'
                router.push('/login')
            },
        };

        onMounted(() => {

        });
        onUnmounted(() => {

        });
        return {
            ...toRefs(state),
            ...methods,
        };
    },
});
</script>
<style lang="less">

</style>
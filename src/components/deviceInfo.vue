<template>
    <div class="device-info">
        <div class="device-info-title">设备详情</div>
        <div class="device-info-body">
            <div class="device-info-item">
                <div class="device-name">厂家</div>
                <div class="device-desc">ankerui</div>
            </div>
            <div class="device-info-item">
                <div class="device-name">型号</div>
                <div class="device-desc">PZ3000</div>
            </div>
            <div class="device-info-item">
                <div class="device-name">通讯方式</div>
                <div class="device-desc">RS485</div>
            </div>
            <div class="device-info-item">
                <div class="device-name">资产编号</div>
                <div class="device-desc">D14873</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, reactive, toRefs, onMounted, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useStore, mapState } from 'vuex'
    export default defineComponent({
        name: '',
        components: {},
        setup(props, context) {
            const state = reactive({

            })
            onMounted(() => {

            })
            const methods = {

            }
            return {
                ...toRefs(state),
                ...methods
            }
        }
    })
</script>
<style scope lang="less">
    .device-info-title {
        height: 42px;
        width: 100%;
        // background-color: #333333;
        background: url('../assets/images/head-bg.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        font-size: 24px;
        margin-bottom: 10px;
        padding-left: 20px;
        box-sizing: border-box;
    }

    .device-info-body {
        height: 214px;
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        flex-wrap: wrap; 
        flex-direction: column;
        justify-content: space-evenly;
    }

    .device-info-item {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        
        .device-name {
            font-size: 20px;
            width: 45%;
            padding-left: 10%;
            box-sizing: border-box;
            color: #AFAFAF;
        }

        .device-desc {
            font-size: 20px;
            color: #FF9D03; 
        }
    }
</style>
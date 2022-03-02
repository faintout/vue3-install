<template>
    <div class="device-status">
        <div class="device-status-title">设备状态</div>
        <div class="device-status-body">
            <div class="device-status-all">
                <div class="run-status">运行状态</div>
                <div class="run-value">正常</div>
            </div>
            <div class="device-status-param">
                <div class="device-param-row">
                    <div class="status-param-item">
                        <img src="../../assets/images/icon_dianya.png" alt="">
                        <div class="params-desc">
                            <div class="params-value">220.3V</div>
                            <div class="params-name">A相电压</div>
                        </div>
                    </div>
                    <div class="status-param-item">
                        <img src="../../assets/images/icon_dianliu .png" alt="">
                        <div class="params-desc">
                            <div class="params-value">220.3V</div>
                            <div class="params-name">B相电压</div>
                        </div>
                    </div>
                </div>
                <div class="device-param-row">
                    <div class="status-param-item">
                        <img src="../../assets/images/icon_dianliu .png" alt="">
                        <div class="params-desc">
                            <div class="params-value">220.3V</div>
                            <div class="params-name">C相电压</div>
                        </div>
                    </div>
                    <div class="status-param-item">
                        <img src="../../assets/images/icon_dianliu .png" alt="">
                        <div class="params-desc">
                            <div class="params-value">220.3V</div>
                            <div class="params-name">A相电流</div>
                        </div>
                    </div>
                </div>
                <div class="device-param-row">
                    <div class="status-param-item">
                        <img src="../../assets/images/icon_dianliu .png" alt="">
                        <div class="params-desc">
                            <div class="params-value">220.3V</div>
                            <div class="params-name">B相电流</div>
                        </div>
                    </div>
                    <div class="status-param-item">
                        <img src="../../assets/images/icon_dianliu .png" alt="">
                        <div class="params-desc">
                            <div class="params-value">220.3V</div>
                            <div class="params-name">C相电流</div>
                        </div>
                    </div>
                </div>
                <div class="device-param-row">
                    <div class="status-param-item">
                        <img src="../../assets/images/icon_dianliu .png" alt="">
                        <div class="params-desc">
                            <div class="params-value">220.3V</div>
                            <div class="params-name">AB相电压</div>
                        </div>
                    </div>
                    <div class="status-param-item">
                        <img src="../../assets/images/icon_dianliu .png" alt="">
                        <div class="params-desc">
                            <div class="params-value">220.3V</div>
                            <div class="params-name">BC相电压</div>
                        </div>
                    </div>
                </div>
                <div class="device-param-row">
                    <div class="status-param-item">
                        <img src="../../assets/images/icon_dianliu .png" alt="">
                        <div class="params-desc">
                            <div class="params-value">220.3V</div>
                            <div class="params-name">CA相电压</div>
                        </div>
                    </div>
                    <div class="status-param-item">
                        <img src="../../assets/images/icon_dianliu .png" alt="">
                        <div class="params-desc">
                            <div class="params-value">220.3V</div>
                            <div class="params-name">总有功功率</div>
                        </div>
                    </div>
                </div>
                <div class="device-param-row">
                    <div class="status-param-item">
                        <img src="../../assets/images/icon_dianliu .png" alt="">
                        <div class="params-desc">
                            <div class="params-value">220.3V</div>
                            <div class="params-name">总功率因素</div>
                        </div>
                    </div>
                    <div class="status-param-item">
                        <img src="../../assets/images/icon_dianliu .png" alt="">
                        <div class="params-desc">
                            <div class="params-value">220.3V</div>
                            <div class="params-name">有功电能</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, reactive, toRefs, onMounted, computed } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useStore, mapState } from 'vuex'
    export default defineComponent({
        props: {
            params: Object
        },
        name: '',
        components: {},
        setup(props, context) {
            const state = reactive({

            })
            onMounted(() => {

            })
            console.log('props', props.params)
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
    .device-status-title {
        height: 42px;
        width: 100%;
        // background-color: #333333;
        background: url('../../assets/images/head-bg.png') no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        font-size: 24px;
        margin-bottom: 10px;
        padding-left: 20px;
        box-sizing: border-box;
    }

    .device-status-body {
        height: 614px;
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        flex-direction: column;
        padding: 4% 4%;
        box-sizing: border-box;
    }

    .device-status-all {
        width: 100%;
        height: 13%;
        background: #09f;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 10%;
        box-sizing: border-box;

        .run-status {
            width: 40%;
            font-size: 20px;
            line-height: 20px;
        }

        .run-value {
            width: 20%;
            color: #60FF00;
            font-size: 24px;
            line-height: 24px;
        }
    }

    .device-status-param {
        display: flex;
        height: 87%;
        flex-direction: column;
        justify-content: space-between;
        padding-top: 4%;

    }

    .status-param-item {
        display: flex;
        flex-direction: row;
        height: 60px;
        width: 48%;

        img {
            width: 60px;
            height: 60px;
        }

        .params-desc {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 5%;
            box-sizing: border-box;

            .params-value {
                font-size: 24px;
                line-height: 24px;
            }

            .params-name {
                font-size: 20px;
                line-height: 20px;
                color: #AFAFAF;
            }
        }
    }

    .device-param-row {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
    }

    // .status-param-item:nth-child(eve)
</style>
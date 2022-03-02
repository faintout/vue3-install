<!--
 * @Author: LiuFengRui
 * @Date: 2021-11-08 15:41:12
 * @LastEditTime: 2022-02-23 09:40:39
 * @LastEditors: LiuFengRui
 * @Description: 
-->
<template>
  <div class="content_main">
    <div class="leftClassCome" ref="leftPart">
      <button @click="toUe4Power">动力</button>
      <button @click="toUe4Envir">环境</button>
      <button @click="toUe4Sender">发射机</button>
      <button @click="toUe4Safety">安防</button>
    </div>
    <!-- <div class="rightClass_noAnimation" ref="rightPart"></div> -->
    <div class="rightClassCome" ref="rightPart">
        <DeviceInfo id="deviceInfo"></DeviceInfo>
        <!-- 设备状态 -->
        <component v-for="deviceStatusCom in deviceStatusComList" :key="deviceStatusCom.moduleName" :is="currDeviceStatusComp" :params="deviceParams"></component>
    </div>
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
import moment from "moment";
import * as echarts from 'echarts'
import  deviceInfo from '../../components/deviceInfo.vue'
// import  powerStatus from '../../components/deviceStatus/powerStatus.vue'
import  {deviceStatusCompList} from '../../config/componentMap.js'
import { log } from "console";
// import {WSClient} from "../../utils/webSocketUtil";
export default defineComponent({
  name: "duty",
  components: {
      DeviceInfo:deviceInfo,
    //   PowerStatus:powerStatus
  },
  setup(props, context) {
    const { proxy }: any = getCurrentInstance()
    const router = useRouter();
    const state = reactive({
      hiddenPower:true,
      hiddenEnvir:true,
      hiddensender:true,
      hiddensec:true,
      isdetailNow:false, //判断点击详情后是否又点击动环发安,
      deviceStatusComList:deviceStatusCompList,
      currDeviceStatusComp:'powerStatus',
      deviceParams:{name:'testName'}
    });
    console.log('state.deviceStatusComList',state.deviceStatusComList)
    let leftPart = ref(null)
    let rightPart = ref(null)
    watch(()=> [state.hiddenPower,state.hiddenEnvir,state.hiddensender,state.hiddensec],
    ([newpower,newenvir,newsender,newsec],[oldpower,oldenvir,oldsender,oldsec]) => {
      //当四个部分都不展示时详情收起来
      if(newpower == true&&newenvir == true&& newsender == true &&newsec == true){
        rightPart.value.className = 'rightClassFade'
      }
    })
    onMounted(() => {
        // state.deviceParams = {name:'testName'}
      //   "object" == typeof ue && "object" == typeof ue.interface && function (e) { "function" == typeof e.broadcast && (ue.interface = {}, ue.interface.broadcast = function (t, a) { void 0 !== a ? e.broadcast(t, JSON.stringify(a)) : e.broadcast(t, "") }, ue4 = ue.interface.broadcast) }(ue.interface);
      //   //ue4调用js
      //   ue.interface.SetTitle = function (title) {
      //     console.log(title);

      // }
      //调用js
      ue.interface.jsfuncTest = function (content) {
        //ue上点击详情出现详情部分
        rightPart.value.className = 'rightClassCome'
        //一直有选择详情在查看
        // state.isdetailNow = true
        console.log(content);
        alert(content)
      };

    });
    //保证页面挂载之后再执行
    nextTick(() => {
    });
    onUnmounted(() => {

    });
    const methods = {
      //给ue4传值,并接受一个回调
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
      //切换到动力模块
      toUe4Power() {
        state.hiddenPower = !state.hiddenPower
        ue4("ShowUnits",
          state.hiddenPower?{"tag": "Power", "hidden": "true"}:{ "tag": "Power", "hidden": "false" },
          function (rv) {
            console.log("rv:", rv)
            alert(rv);
          }
        );
      },
      //切换到环境模块
      toUe4Envir() {
        state.hiddenEnvir = !state.hiddenEnvir
        ue4("ShowUnits",
          state.hiddenEnvir?{ "tag": "Env", "hidden": "true" }:{ "tag": "Env", "hidden": "false" },
          function (rv) {
            console.log("rv:", rv)
            alert(rv);
          }
        );
      },
      //切换到发射台模块
      toUe4Sender() {
        state.hiddensender = !state.hiddensender
        ue4("ShowUnits",
          state.hiddensender?{ "tag": "Sender", "hidden": "true" }:{ "tag": "Sender", "hidden": "false" },
          function (rv) {
            console.log("rv:", rv)
            alert(rv);
          }
        );
      },
      //切换到安防模块
      toUe4Safety() {
        state.hiddensec = !state.hiddensec
        ue4("ShowUnits",
          state.hiddensec?{ "tag": "Sec", "hidden": "true" }:{ "tag": "Sec", "hidden": "false" },
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
      leftPart,
      rightPart
    };
  },
});
</script>
<style scoped lang="less">
#deviceInfo{
    margin-bottom:20px
}
</style>
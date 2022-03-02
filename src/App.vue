<template>
    <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
})
</script>

<style lang="less">
    @import "./assets/css/main.less";
#app{
    height: 100%;
    width: 100%;
}
</style>
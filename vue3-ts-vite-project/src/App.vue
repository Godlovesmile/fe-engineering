<script setup lang="ts">
import { useMainStore } from './store/main'

const mainStore = useMainStore()
const updateName = () => {
  mainStore.$patch({
    name: 'yanlizhi',
  })
  mainStore.changeName('8888')
}
</script>

<template>
  <div class="test">测试文字{{ mainStore.name }}, 长度: {{ mainStore.nameLen }}</div>
  <img alt="Vue logo" src="./assets/logo.png" @click="updateName" />
  <router-view></router-view>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.test {
  color: $test-color;
}
</style>

<script lang="ts" setup>
import homeVue from './ui/home.vue'
</script>

<template>
  <div class="root">
    <home-vue></home-vue>
  </div>
</template>

<style scoped>
.root {
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(rgb(40, 135, 227) 50%, rgb(22, 25, 30) 50%);
}
</style>

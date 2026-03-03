<template>
  <Header title="Camp Manager" />
  <router-view />
</template>

<script setup>
import Header from "./components/Header.vue";
</script>
<style>
body {
  height: 100vh;
}
#app {
  height: 100vh;
}
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}
</style>

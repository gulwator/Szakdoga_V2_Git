<template>
  <div id="app" class="d-flex flex-column">
    <Header title="Camp Manager" />
    <router-view />
  </div>
</template>

<script setup>
import Header from "./components/Header/Header.vue";
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

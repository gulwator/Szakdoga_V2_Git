<template>
  <Header title="Camp Manager" />
  <router-view></router-view>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: { Header },
};
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

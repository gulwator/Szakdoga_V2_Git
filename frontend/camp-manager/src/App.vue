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
</style>

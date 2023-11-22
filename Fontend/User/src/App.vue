<script>
import AppHeader from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
// import Banner from "@/components/Banner.vue";

export default {
  components: {
    AppHeader,
    // Banner,
    Footer,
  },
};
</script>
<template>
  <div id="app">

    <AppHeader />
    <!-- <Banner /> -->
    <div id="body">
      <router-view />
    </div>
  </div>
</template>
<style>
#app{
  max-width: 100%;
  margin: auto;
  min-height: 100vh;
}
#body {
  width: 100%;
  min-height: 57vh;
}
</style>
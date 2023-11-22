<script>
import AppHeader from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Siderbar from "@/components/Siderbars.vue";

export default {
  components: {
    AppHeader,
    Siderbar,
    Footer,
  },
};
</script>

<template>
  <div id="app">
    <AppHeader />
    <div id="body">
      <Siderbar />
      <router-view class="main" />
    </div>
  </div>
</template>
<style>
#app{
  max-width: 100%;
  margin: auto;
}
#body{
  display: flex;  
}
.main{
  width: 100%;
}
</style>
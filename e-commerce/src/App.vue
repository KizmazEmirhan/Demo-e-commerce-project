<template>
  <MainHeader></MainHeader>
  <router-view></router-view>
  <FooterComponent></FooterComponent>
</template>

<script>
import MainHeader from "./components/UI/MainHeader.vue";
import FooterComponent from "./components/UI/FooterComponent.vue";
export default {
  name: "App",
  components: {
    MainHeader,
    FooterComponent,
  },
};
</script>

<style></style>

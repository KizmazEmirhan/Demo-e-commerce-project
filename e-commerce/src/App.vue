<template>
  <MainHeader v-if="!$route.meta.hideNavbarFooter"></MainHeader>
  <router-view></router-view>
  <FooterComponent v-if="!$route.meta.hideNavbarFooter"></FooterComponent>
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
  created() {
    this.$store.dispatch("initializeStore");
  },
};
</script>

<style></style>

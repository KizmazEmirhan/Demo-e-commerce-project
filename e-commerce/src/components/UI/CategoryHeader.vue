<template>
  <div class="flex justify-center bg-[#FAFAFA] pt-5">
    <div
      class="container flex justify-between items-center p-5"
      id="category-name-section"
    >
      <div class="font-bold">{{ category }}</div>
      <div id="breadcrumb-section">
        <BreadCrumb></BreadCrumb>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "./BreadCrumb.vue";
export default {
  components: { BreadCrumb },
  props: ["category"],
};
</script>

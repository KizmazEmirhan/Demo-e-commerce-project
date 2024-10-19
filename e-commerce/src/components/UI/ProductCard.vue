<template>
  <router-link
    v-for="(product, index) in receivedProducts"
    :key="index"
    :to="{
      name: 'ProductDetailsPage',
      params: { id: product.id },
      query: {
        fromAdmin: fromAdmin ? 'true' : 'false',
      },
    }"
  >
    <div
      id="product-card"
      class="flex flex-col gap-5 border rounded bg-[#FAFAFA] h-fit cursor-pointer group"
    >
      <div id="image-section" class="w-fit">
        <img
          :src="product.image"
          alt="product-image"
          class="w-[230px] h-[350px] object-cover group-hover:opacity-45 transition-opacity"
        />
      </div>
      <div id="texts-section" class="pb-4">
        <div class="flex flex-col gap-2">
          <p id="brand" class="text-center">{{ product.brand }}</p>
          <p id="price" class="text-center">{{ product.price }} $</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["receivedProducts", "fromAdmin"],
  created() {
    console.log(this.fromAdmin);
  },
};
</script>

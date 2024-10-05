<template>
  <div
    id="product-card"
    class="flex flex-col gap-5 border rounded bg-[#FAFAFA] h-fit cursor-pointer group"
    v-for="(product, index) in receivedProducts"
    :key="index"
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
</template>

<script>
export default {
  props: ["receivedProducts"],
};
</script>
<!-- image,brand,color,desc,gender,price -->

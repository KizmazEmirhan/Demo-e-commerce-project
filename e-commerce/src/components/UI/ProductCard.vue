<template>
  <div
    id="product-card"
    class="flex flex-col gap-5 border rounded bg-[#FAFAFA] h-fit"
    v-for="(product, index) in receivedProducts"
    :key="index"
  >
    <div id="image-section" class="w-fit">
      <img
        :src="product.image"
        alt="product-image"
        class="w-[230px] h-[350px] object-cover"
      />
    </div>
    <div id="texts-section" class="flex flex-col">
      <div class="flex flex-col">
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

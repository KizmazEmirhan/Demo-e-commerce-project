<template>
  <div class="flex justify-center p-5">
    <FilterComponent></FilterComponent>
    <div class="container grid grid-cols-5 gap-y-3">
      <div
        v-for="(product, index) in products"
        :key="index"
        id="product-card"
        class="flex flex-col justify-center items-center"
      >
        <div class="group flex justify-center items-center">
          <img
            :src="product.image"
            :alt="product.id"
            class="group-hover:opacity-25 transition-opacity group-hover:cursor-pointer relative"
          />
          <button class="hidden group-hover:block absolute rounded p-2 bg-[#cecece] hover:bg-[#929191] hover:text-[#FAFAFA]">See Details</button>
        </div>
        <div id="texts" class="flex flex-col gap-1 items-center pt-3 w-fit">
          <h1 id="brand" class="font-bold text-xl">{{ product.brand }}</h1>
          <p id="exp" class="text-[#737373] font-bold">{{ product.exp }}</p>
          <p id="price" class="text-[#23856D] text-sm">{{ product.price }} $</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import FilterComponent from "./FilterComponent.vue";
export default {
  components: { FilterComponent },
  props: ["collectionName"],
  data() {
    return { products: [] };
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      querySnapshot.forEach((doc) => {
        this.products.push({
          image: doc._document.data.value.mapValue.fields.image.stringValue,
          price: doc._document.data.value.mapValue.fields.price.integerValue,
          id: doc._document.data.value.mapValue.fields.id.integerValue,
          exp: doc._document.data.value.mapValue.fields.exp.stringValue,
          brand: doc._document.data.value.mapValue.fields.brand.stringValue,
        });
      });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<template>
  <div class="flex justify-center p-4">
    <div class="container flex flex-wrap gap-5 justify-center sm:justify-normal">
      <ProductCard :receivedProducts="allProducts"></ProductCard>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "./ProductCard.vue";
export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      allProducts: [],
    };
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.allProducts.push({
          image: data.images,
          brand: data.brand,
          color: data.color,
          desc: data.description,
          gender: data.gender,
          price: data.price,
          category: data.category,
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

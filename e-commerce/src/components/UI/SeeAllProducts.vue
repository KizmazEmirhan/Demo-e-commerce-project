<template>
  <div class="flex justify-center p-4">
    <div
      v-if="allProducts.length != 0"
      class="container flex flex-wrap gap-5 justify-center sm:justify-normal"
    >
      <ProductCard
        :receivedProducts="allProducts"
        :fromAdmin="true"
      ></ProductCard>
    </div>
    <div v-if="errorMessage" class="text-2xl font-bold">{{ errorMessage }}</div>
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
      errorMessage: null,
    };
  },
  async created() {
    this.errorMessage = null;
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
          id: data.id,
        });
      });

      if (this.allProducts.length === 0) {
        this.errorMessage = "Herhangi bir ürününüz yok.";
      }
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

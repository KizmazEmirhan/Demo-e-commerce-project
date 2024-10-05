<template>
  <div
    id="featured products"
    class="flex flex-col justify-center p-5 items-center bg-[#FAFAFA]"
  >
    <h1 class="text-center pb-5 font-bold text-xl">Featured Products</h1>
    <div
      id="products-container"
      class="container flex justify-center flex-wrap gap-10"
    >
      <div
        id="product"
        class="w-fit flex items-center flex-col gap-3 group relative justify-center"
        v-for="product in featured_products"
        :key="product.id"
      >
        <img
          :src="product.image"
          alt="product-image"
          class="group-hover:opacity-45 transition-opacity"
        />
        <div class="hidden group-hover:block absolute">
          <div class="flex flex-col items-center gap-4">
            <h3 class="font-bold text-lg">{{ product.title }}</h3>
            <button
              class="justify-center w-full flex gap-3 items-center rounded bg-[#cecece] hover:bg-[#929191] hover:text-[#FAFAFA] transition-all p-2"
            >
              Add to cart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-cart-plus"
                viewBox="0 0 16 16"
              >
                <path
                  d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"
                />
                <path
                  d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
                />
              </svg>
            </button>
            <button
              class="justify-center w-full flex gap-3 items-center rounded bg-[#cecece] hover:bg-[#929191] hover:text-[#FAFAFA] transition-all p-2"
            >
              Add to wishlist
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
                />
              </svg>
            </button>
            <p>{{ product.price }} $</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
export default {
  data() {
    return {
      featured_products: [],
    };
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, "featured"));
      querySnapshot.forEach((doc) => {
        this.featured_products.push({
          id: doc._document.data.value.mapValue.fields.id.integerValue,
          image: doc._document.data.value.mapValue.fields.image.stringValue,
          title: doc._document.data.value.mapValue.fields.title.stringValue,
          price: doc._document.data.value.mapValue.fields.price.integerValue,
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style></style>

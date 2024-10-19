<template>
  <div class="flex justify-center pt-2">
    <div class="container">
      <div class="flex justify-end p-2">
        <BreadCrumb />
      </div>
      <div
        v-for="productCard in product"
        :key="productCard.price"
        id="detailed-product-card"
        class="grid grid-rows-2 gap-4 p-4"
      >
        <div class="flex gap-2">
          <div id="product-image">
            <img
              class="w-64 object-contain"
              :src="productCard.images[0]"
              alt="product-main-image"
            />
          </div>
          <div id="text-contents" class="flex flex-col w-full p-2">
            <div class="flex flex-col gap-1 pb-1">
              <div>{{ productCard.brand }}</div>
              <div>{{ productCard.price }} $</div>
            </div>
            <hr />
            <div class="flex flex-col gap-1 pb-1">
              <div class="text-sm text-[#a3a3a3]">
                <b class="text-black">Renk</b>: {{ productCard.color }}
              </div>
            </div>
            <hr />
            <div class="pt-1">{{ productCard.gender }}</div>
          </div>
        </div>
        <div id="product-description">
          {{ productCard.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "../UI/BreadCrumb.vue";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
export default {
  components: {
    BreadCrumb,
  },
  data() {
    return {
      product: [],
    };
  },
  props: ["id", "fromAdmin"],

  async created() {
    console.log(this.fromAdmin);
    try {
      const productId = this.id || this.$route.params.id;
      console.log("Product ID:", productId);

      if (productId) {
        const q = query(
          collection(db, "products"),
          where("id", "==", productId)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();
          this.product.push({
            id: data.id,
            brand: data.brand,
            color: data.color,
            desc: data.description,
            gender: data.gender,
            images: [data.images],
            price: data.price,
          });
          return data;
        } else {
          console.log("No such document");
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
};
</script>

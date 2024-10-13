<template>
  Merhaba
  <BreadCrumb></BreadCrumb>
  <div></div>
</template>

<script>
import BreadCrumb from "../UI/BreadCrumb.vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
export default {
  components: {
    BreadCrumb,
  },
  data() {
    return {
      product: null,
    };
  },
  props: ["id"],

  async created() {
    try {
      const productId = this.id || this.$route.params.id;
      console.log("Product ID:", productId); // ID'yi logla

      if (productId) {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        console.log("Document :", docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data()); // Veriyi kontrol et
          this.product = docSnap.data(); // Veriyi state'e ata
        } else {
          console.log("No such document!"); // Doküman mevcut değil
        }
      } else {
        console.error("Product ID is missing."); // ID eksik
      }
    } catch (error) {
      console.error("Error fetching product:", error); // Hata logla
    }
  },
};
</script>

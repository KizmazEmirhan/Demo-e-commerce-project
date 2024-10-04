<template>
  <div>
    <p>Mağazanızdaki tüm ürünler</p>
  </div>
</template>
,

<script>
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default {
  data() {
    return {
      allProducts: [],
    };
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        this.allProducts.push({
          image: doc._document.data.value.mapValue.fields.images,
          brand: doc._document.data.value.mapValue.fields.brand.stringValue,
          color: doc._document.data.value.mapValue.fields.color.stringValue,
          desc: doc._document.data.value.mapValue.fields.description
            .stringValue,
          gender: doc._document.data.value.mapValue.fields.gender.stringValue,
          price: doc._document.data.value.mapValue.fields.price.integerValue,
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

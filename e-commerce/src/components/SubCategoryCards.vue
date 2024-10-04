<template>
  <div id="sub-categories" class="flex justify-center bg-[#FAFAFA] p-5">
    <div class="container flex gap-20">
      <div
        v-for="category in subCategories"
        :key="category.id"
        id="content"
        class="container flex justify-center"
      >
        <div class="flex justify-center items-center">
          <img :src="category.image" alt="" class="relative" />
          <div class="absolute">
            <h2 class="font-bold text-xl text-white">
              {{ category.categoryName }}
            </h2>
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
      subCategories: [],
    };
  },
  props: ["collectionName"],
  async created() {
    if (this.collectionName) {
      try {
        console.log(this.collectionName);
        const querySnapshot = await getDocs(
          collection(db, this.collectionName)
        );
        querySnapshot.forEach((doc) => {
          this.subCategories.push({
            image: doc._document.data.value.mapValue.fields.image.stringValue,
            categoryName:
              doc._document.data.value.mapValue.fields.category_name
                .stringValue,
            id: doc._document.data.value.mapValue.fields.id.integerValue,
          });
        });
      } catch (error) {
        console.log(this.collectionName);
        console.log(error);
      }
    } else {
      console.log("CollectionName is empty");
    }
  },
};
</script>

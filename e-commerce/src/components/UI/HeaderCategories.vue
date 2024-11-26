<template>
  <div class="flex justify-center bg-[#FAFAFA]">
    <div class="flex container">
      <ul class="flex gap-5 w-full justify-between">
        <li
          class="font-bold px-4 w-full text-center hover:text-[#23A6F0] hover:bg-white cursor-pointer py-4"
          v-for="(category_name, index) in receivedCategories.category_name"
          :key="index"
        >
          {{ category_name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
export default {
  data() {
    return {
      receivedCategories: [],
    };
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, "main_categories"));
      querySnapshot.forEach((doc) => {
        this.receivedCategories = doc.data();
      });
      console.log(this.receivedCategories.category_name);
    } catch (e) {
      console.error(e);
    }
  },
};
</script>

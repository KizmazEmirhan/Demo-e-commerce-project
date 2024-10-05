<template>
  <div id="sub-categories" class="flex justify-center bg-[#FAFAFA] pt-5">
    <div class="container justify-between gap-20 lg:flex hidden">
      <div
        v-for="category in subCategories"
        :key="category.id"
        id="content"
        class="flex justify-center"
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
  <div class="lg:hidden block py-3" id="mobileCategoryMenu">
    <Swiper :slidesPerView="3" :pagination="{ clickable: true }">
      <SwiperSlide
        v-for="category in subCategories"
        :key="category.id"
        class="w-fit text-center "
        >{{ category.categoryName }}</SwiperSlide
      >
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { db } from "@/firebase";
import "swiper/css";
import { collection, getDocs } from "firebase/firestore";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
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
          const data = doc.data();
          this.subCategories.push({
            image: data.image,
            categoryName: data.category_name,
            id: data.id,
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

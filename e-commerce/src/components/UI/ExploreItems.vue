<template>
  <div id="explore-categories" class="p-4">
    <Swiper :slides-per-view="4" :lazy="true">
      <SwiperSlide v-for="category in categories" :key="category.id">
        <div class="flex items-center flex-col gap-3">
          <img :src="category.image" alt="category-image" loading="lazy" />
          <p class="font-bold">{{ category.name }}</p>
          <router-link
            :to="{
              name: 'Category',
              params: {
                categoryName: category.name,
              },
            }"
          >
            <button
              class="rounded border-solid border-[#cecece] border-[1px] hover:text-[#23A6F0] text-[#6f6c6c] p-2"
            >
              Go to {{ category.name }} page
            </button>
          </router-link>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import "swiper/css";
export default {
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, "subCategories"));
      querySnapshot.forEach((doc) => {
        this.categories.push({
          image: doc._document.data.value.mapValue.fields.image.stringValue,
          id: doc._document.data.value.mapValue.fields.id.integerValue,
          name: doc._document.data.value.mapValue.fields.category_name
            .stringValue,
          title:
            doc._document.data.value.mapValue.fields.category_text.stringValue,
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      categories: [],
    };
  },
};
</script>

<template>
  <div id="explore-categories" class="p-4">
    <div class="text-lg font-bold pb-4">Kategorileri keşfet</div>

    <Swiper :slides-per-view="slidesPerView" :lazy="true" :space-between="50">
      <SwiperSlide v-for="category in categories" :key="category.id">
        <div class="flex items-center flex-col gap-3">
          <img :src="category.image" alt="category-image" loading="lazy" />

          <router-link
            :to="{
              name: 'Category',
              params: {
                categoryName: category.name,
              },
            }"
          >
            <p
              class="font-bold hover:text-[#23a6f0] transition-all text-center"
            >
              {{ category.name }}
            </p>
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
    window.addEventListener("resize", this.updateSlidesPerView);
    this.updateSlidesPerView();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateSlidesPerView);
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      categories: [],
      slidesPerView: 4,
    };
  },
  methods: {
    updateSlidesPerView() {
      this.slidesPerView = window.innerWidth <= 450 ? 2 : 4;
    },
  },
};
</script>

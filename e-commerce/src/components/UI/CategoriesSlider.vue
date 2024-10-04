<template>
  <div class="mt-4 bg-[#FAFAFA] py-12">
    <Swiper :slides-per-view="3">
      <swiper-slide v-for="category in category_images" :key="category.id">
        <div class="flex justify-center">
          <div
            id="category-container"
            class="flex items-center justify-between"
          >
            <img
              :src="category.slider_image"
              alt="category-image"
              class="border-solid border-[1px] border-[#cecece]"
            />
            <div id="category-info" class="flex flex-col absolute gap-4 p-3">
              <h1 class="text-[#737373] font-bold">
                {{ category.category_name }}
              </h1>
              <button class="text-left hover:text-[#23A6F0]">
                Go to {{ category.category_name }}
              </button>
            </div>
          </div>
        </div>
      </swiper-slide>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import "swiper/css";
export default {
  data() {
    return {
      category_images: [],
    };
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      querySnapshot.forEach((doc) => {
        this.category_images.push({
          id: doc._document.data.value.mapValue.fields.id.integerValue,
          slider_image:
            doc._document.data.value.mapValue.fields.image.stringValue,
          category_name:
            doc._document.data.value.mapValue.fields.category_name.stringValue,
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
};
</script>

<style></style>

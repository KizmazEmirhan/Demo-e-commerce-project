<template>
  <div id="header-section">
    <div id="slider">
      <Swiper
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :slidesPerView="1"
        :spaceBetween="30"
        :loop="true"
        :pagination="{
          clickable: true,
        }"
        :navigation="true"
        :modules="modules"
      >
        <SwiperSlide v-for="image in sliderImages" :key="image">
          <img
            :src="image.image"
            alt="slider image"
            class="w-full"
            loading="lazy"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
export default {
  data() {
    return { sliderImages: [] };
  },

  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, "sliders"));
      querySnapshot.forEach((doc) => {
        this.sliderImages.push({
          image: doc._document.data.value.mapValue.fields.image.stringValue,
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
  setup() {
    return {
      modules: [Navigation, Pagination, Autoplay],
    };
  },
};
</script>

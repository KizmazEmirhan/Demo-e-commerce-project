<template>
  <div>
    <div id="header-section">
      <div id="slider">
        <Swiper
          :slidesPerView="1"
          :spaceBetween="30"
          :loop="true"
          :pagination="{
            clickable: true,
          }"
          :modules="modules"
        >
          <SwiperSlide v-for="imageSrc in sliderImages" :key="imageSrc">
            <LoaderComponent :imageSrc="imageSrc"></LoaderComponent>
          </SwiperSlide>
        </Swiper>
      </div>
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
import LoaderComponent from "./LoaderComponent.vue";
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
    LoaderComponent,
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Autoplay],
    };
  },
};
</script>

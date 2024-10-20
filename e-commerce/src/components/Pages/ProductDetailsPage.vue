<template>
  <div class="flex justify-center pt-2">
    <div class="container">
      <div class="flex justify-end p-2">
        <BreadCrumb />
      </div>
      <div
        v-for="productCard in product"
        :key="productCard.price"
        id="detailed-product-card"
        class="grid grid-rows-2 gap-4 lg:p-4 p-2"
      >
        <div class="flex gap-2 flex-col lg:flex-row">
          <div id="images-container">
            <Swiper
              :loop="true"
              :grabCursor="true"
              :effect="'creative'"
              :creativeEffect="{
                prev: {
                  shadow: true,
                  translate: [0, 0, -400],
                },
                next: {
                  translate: ['100%', 0, 0],
                },
              }"
              :pagination="{
                clickable: true,
              }"
              class="lg:w-96 w-80 md:w-[350px]"
              :modules="modules"
            >
              <SwiperSlide
                v-for="image in productCard.images"
                :key="image"
                class="bg-[#FAFAFA] flex justify-center"
                ><img
                  :src="image"
                  alt="product-image"
                  class="w-80 h-80 object-contain lg:2-96 lg:h-96 md:w-[350px]"
              /></SwiperSlide>
            </Swiper>
          </div>
          <div id="text-contents" class="flex flex-col w-full p-2">
            <div class="flex flex-col gap-1 pb-1">
              <div>{{ productCard.brand }}</div>
              <div>{{ productCard.price }} $</div>
            </div>
            <hr />
            <div class="flex flex-col gap-1 pb-1">
              <div class="text-sm text-[#a3a3a3]">
                <b class="text-black">Renk</b>: {{ productCard.color }}
              </div>
            </div>
            <hr />
            <div class="pt-1">{{ productCard.gender }}</div>
          </div>
        </div>
        <div id="product-description">
          <div id="question" class="flex gap-2 border p-1 bg-[#FAFAFA]">
            <i class="bi bi-plus" @click="asnwerQuestion"></i>
            <p><b>Ürün Hakkında</b></p>
          </div>

          <div
            id="answer"
            v-show="isAnswered"
            :class="{
              'border overflow-hidden transition-all ease-in-out duration-500': true,
              'p-4': isAnswered,
            }"
            :style="{
              maxHeight: isAnswered ? accordionMaxHeight + 'px' : '0px',
            }"
          >
            <p>
              {{ productCard.desc }} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Distinctio in accusamus suscipit corporis id
              error cupiditate neque omnis est, voluptate ea, nesciunt amet
              officiis earum at nihil nam labore voluptatem.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "../UI/BreadCrumb.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-creative";

import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCreative,
} from "swiper/modules";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";
export default {
  components: {
    BreadCrumb,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      product: [],
      isAnswered: false,
      accordionMaxHeight: 0,
    };
  },
  props: ["id", "fromAdmin"],

  async created() {
    try {
      const productId = this.id || this.$route.params.id;
      if (productId) {
        const q = query(
          collection(db, "products"),
          where("id", "==", productId)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();
          this.product.push({
            id: data.id,
            brand: data.brand,
            color: data.color,
            desc: data.description,
            gender: data.gender,
            images: data.images,
            price: data.price,
          });

          return data;
        } else {
          console.log("No such document");
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  },
  methods: {
    asnwerQuestion() {
      this.isAnswered = !this.isAnswered;
      if (!this.isAnswered) {
        this.accordionMaxHeight = 0;
      } else {
        this.$nextTick(() => {
          const accordionContent = document.getElementById("answer");

          if (accordionContent) {
            this.accordionMaxHeight = accordionContent.scrollHeight;
          }
        });
      }
    },
  },
  setup() {
    return {
      modules: [Navigation, Pagination, Autoplay, EffectCreative],
    };
  },
};
</script>

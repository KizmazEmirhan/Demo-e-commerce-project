<template>
  <div
    id="choose-section"
    v-if="!selectedComponent"
    class="flex justify-center pt-4"
  >
    <div class="container flex justify-between">
      <div
        v-for="thing in imagesAndTitles"
        :key="thing.id"
        id="product-add-or-show"
        class="flex justify-center items-center"
      >
        <img
          :src="thing.image"
          alt="image"
          class="brightness-75 relative h-full"
        />
        <div class="absolute flex flex-col items-center justify-center">
          <button
            class="text-white font-bold text-2xl"
            @click="selectComponent(thing.text)"
          >
            {{ thing.text }}
          </button>
          <div v-html="selectIcon(thing.text)"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <button @click="goBack" class="p-4 flex gap-2 items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-arrow-left-square"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
        />
      </svg>
      Geri dön
    </button>
  </div>
  <component :is="selectedComponent"></component>
</template>

<script>
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import SeeAllProducts from "../UI/SeeAllProducts.vue";
import AddNewProduct from "../UI/AddNewProduct.vue";
export default {
  components: { SeeAllProducts, AddNewProduct },
  name: "AdminPage",
  data() {
    return {
      selectedComponent: null,
      imagesAndTitles: [],
      icons: [
        {
          text: "Add new product",
          icon: `      <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="white"
            class="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
          </svg>`,
        },
        {
          text: "See all of your products",
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C 4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                </svg>`,
        },
      ],
      selectedIcon: ``,
    };
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, "adminPage"));
      querySnapshot.forEach((doc) => {
        this.imagesAndTitles.push({
          image: doc._document.data.value.mapValue.fields.image.stringValue,
          text: doc._document.data.value.mapValue.fields.text.stringValue,
          id: doc._document.data.value.mapValue.fields.id.integerValue,
        });
      });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    selectIcon(text) {
      const icon = this.icons.find((item) => item.text === text);
      return icon ? icon.icon : "";
    },
    selectComponent(componentName) {
      if (componentName === "Add new product") {
        this.selectedComponent = "AddNewProduct";
      } else if (componentName === "See all of your products") {
        this.selectedComponent = "SeeAllProducts";
      } else {
        console.log("Bir hata oluştu");
      }
    },
    goBack() {
      this.selectedComponent = null;
    },
  },
};
</script>

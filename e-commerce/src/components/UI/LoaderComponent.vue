<template>
  <div class="flex justify-center">
    <div
      v-if="isLoading"
      class="flex animate-pulse bg-gray-300 justify-center items-center w-full h-64 after:content-['Yükleniyor']"
    ></div>
    <img
      v-show="!isLoading && imageUrl"
      :src="imageUrl"
      @load="onLoad"
      @error="onError"
      ref="image"
      class="object-cover w-full h-auto"
    />
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: [Object, String],
      required: true,
    },
  },
  data() {
    return {
      isLoading: true,
      imageUrl: null,
      imageWidth: 0,
      imageHeight: 0,
      placeholderWidth: 400,
      placeholderHeight: 400,
    };
  },
  watch: {
    imageSrc: {
      immediate: true,
      handler(newSrc) {
        this.processImageSource(newSrc);
      },
    },
  },
  methods: {
    processImageSource(src) {
      console.log("Received image source:", src);
      let url;
      if (typeof src === "object" && src.image) {
        url = src.image;
      } else if (typeof src === "string") {
        url = src;
      } else {
        console.error("Invalid image source:", src);
        this.onError(new Error("Invalid image source"));
        return;
      }
      if (
        url.startsWith("http://localhost") ||
        url.startsWith("https://localhost")
      ) {
        console.warn("Detected localhost URL, attempting to correct:", url);
      }
      this.loadImage(url);
    },
    loadImage(url) {
      this.isLoading = true;
      const img = new Image();
      img.onload = () => {
        this.$nextTick(() => {
          this.imageUrl = url;
          this.imageWidth = img.naturalWidth;
          this.imageHeight = img.naturalHeight;
          this.isLoading = false;
        });
      };
      img.onerror = this.onError;
      img.src = url;
    },
    onLoad(event) {
      console.log("Image loaded successfully", event);
    },
    onError(event) {
      console.error("Error loading image", event);
      this.isLoading = false;
    },
  },
};
</script>

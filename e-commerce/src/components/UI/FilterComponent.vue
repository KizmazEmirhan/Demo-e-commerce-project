<template>
  <div
    id="filter-component"
    class="w-fit h-fit p-4 bg-white rounded-lg shadow-md sticky"
  >
    <p class="text-lg font-bold mb-4">Filter:</p>

    <div class="w-fit mb-6">
      <p class="text-md font-semibold mb-2">Price Range</p>
      <input type="range" class="w-full accent-[#23A6F0] hidden lg:block" />
      <div class="flex justify-between mt-2 lg:flex-row flex-col gap-2">
        <input
          type="number"
          id="min-price"
          :placeholder="receivedPrices[0]"
          class="border border-gray-300 p-2 rounded w-24 outline-[#23A6F0]"
        />
        <input
          type="number"
          id="max-price"
          :placeholder="receivedPrices[receivedPrices.length - 1]"
          class="border border-gray-300 p-2 rounded w-24 outline-[#23A6F0]"
        />
      </div>
      <button
        class="mt-3 bg-[#23A6F0] text-white py-2 px-4 rounded hover:bg-blue-500 w-full"
      >
        Apply
      </button>
    </div>

    <hr class="my-4" />

    <div class="mb-6">
      <p class="text-md font-semibold mb-2">Categories</p>
      <div class="space-y-2">
        <div
          v-for="categories in receivedCategories"
          :key="categories.category"
        >
          <input
            type="radio"
            name="category"
            :id="categories.category"
            class="mr-2"
          />
          <label :for="categories.category">{{ categories.category }}</label>
        </div>
      </div>
    </div>

    <hr class="my-4" />

    <div class="mb-6">
      <p class="text-md font-semibold mb-2">Brands</p>
      <div class="space-y-2">
        <div v-for="brands in receivedBrands" :key="brands.brand">
          <input type="radio" name="brand" :id="brands.brand" class="mr-2" />
          <label :for="brands.brand">{{ brands.brand }}</label>
        </div>
      </div>
    </div>

    <hr class="my-4" />

    <div>
      <p class="text-md font-semibold mb-2">Colors</p>
      <div class="space-y-2">
        <div v-for="colors in receivedColors" :key="colors.color">
          <input type="radio" name="color" :id="colors.color" class="mr-2" />
          <label :for="colors.color">{{ colors.color }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["receivedDatas"],
  name: "FilterComponent",
  data() {
    return {
      receivedPrices: [],
      receivedCategories: [],
      receivedBrands: [],
      receivedColors: [],
    };
  },
  methods: {
    setReceivedDatas(receivedData) {
      this.receivedBrands = [];
      this.receivedCategories = [];
      this.receivedColors = [];
      this.receivedPrices = [];

      receivedData.map((data) => {
        this.receivedBrands.push({ brand: data.brand });
        this.receivedCategories.push({ category: data.category });
        this.receivedColors.push({ color: data.color });
        this.receivedPrices.push(data.price);
      });
      this.receivedPrices.sort(this.compareNumbers);
      this.tidyUpArrays(this.receivedBrands);
    },
    compareNumbers(a, b) {
      return a - b;
    },
    tidyUpArrays(incomingArray) {
      console.log(incomingArray);
      let uniqueArray = incomingArray.filter((item, index, self) => {
        index === self.findIndex((t) => t.brand === item.brand);
      });
      console.log("incoming", uniqueArray);
      return uniqueArray;
    },
  },
  created() {
    this.setReceivedDatas(this.receivedDatas);
  },
  watch: {
    receivedDatas: {
      handler(newValue) {
        if (newValue && newValue.length > 0) {
          this.setReceivedDatas(newValue);
        }
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

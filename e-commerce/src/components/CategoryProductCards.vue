<template>
  <CategoryItems :collectionName="CollectionName"></CategoryItems>
</template>

<script>
import CategoryItems from "./UI/CategoryItems.vue";

export default {
  created() {
    this.defineCollectionName(this.categoryName);
  },
  data() {
    return {
      CollectionName: "",
    };
  },
  props: ["categoryName"],
  components: {
    CategoryItems,
  },
  methods: {
    defineCollectionName(categoryName) {
      switch (categoryName) {
        case "Women's Clothing":
          this.CollectionName = "mensProducts";
          break;
        case "Men's Clothing":
          this.CollectionName = "mensProducts";
          break;
        default:
          this.CollectionName = "nothing";
          break;
      }
    },
  },
};
</script>

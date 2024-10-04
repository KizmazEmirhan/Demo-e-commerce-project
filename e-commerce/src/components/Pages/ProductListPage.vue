<template>
  <div class="">
    <CategoryHeader :category="categoryName"></CategoryHeader>
    <SubCategoryCards :collectionName="CollectionName"></SubCategoryCards>
    <CategoryProductCards :categoryName="categoryName"></CategoryProductCards>
  </div>
</template>

<script>
import CategoryHeader from "../UI/CategoryHeader.vue";
import SubCategoryCards from "../SubCategoryCards.vue";
import CategoryProductCards from "../CategoryProductCards.vue";
export default {
  created() {
    this.defineCollectionName(this.categoryName);
  },
  name: "CategoryPage",
  props: ["categoryName"],
  components: { CategoryHeader, SubCategoryCards, CategoryProductCards },
  data() {
    return {
      CollectionName: "",
    };
  },
  methods: {
    defineCollectionName(categoryName) {

      switch (categoryName) {
        case "Women's Clothing":
          this.CollectionName = "womensCategories";
          break;
        case "Men's Clothing":
          this.CollectionName = "mensCategories";
          break;
        default:
          this.CollectionName = "nothing";
          break;
      }
    },
  },
};
</script>

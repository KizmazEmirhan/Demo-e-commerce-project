<template>
  <HeaderWSlider></HeaderWSlider>
  <CategoriesSlider></CategoriesSlider>
  <ExploreItems></ExploreItems>
  <FeaturedProducts></FeaturedProducts>
</template>

<script>
import HeaderWSlider from "../UI/HeaderWSlider.vue";
import CategoriesSlider from "../UI/CategoriesSlider.vue";
import ExploreItems from "../UI/ExploreItems.vue";
import FeaturedProducts from "../UI/FeaturedProducts.vue";

export default {
  components: {
    HeaderWSlider,
    CategoriesSlider,
    ExploreItems,
    FeaturedProducts,
  },
};
</script>

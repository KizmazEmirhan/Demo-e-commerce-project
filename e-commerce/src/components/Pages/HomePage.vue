<template>
  <HeaderWSlider></HeaderWSlider>
  <ExploreItems></ExploreItems>
  <FeaturedProducts></FeaturedProducts>
</template>

<script>
import HeaderWSlider from "../UI/HeaderWSlider.vue";

import ExploreItems from "../UI/ExploreItems.vue";
import FeaturedProducts from "../UI/FeaturedProducts.vue";

export default {
  components: {
    HeaderWSlider,

    ExploreItems,
    FeaturedProducts,
  },
};
</script>

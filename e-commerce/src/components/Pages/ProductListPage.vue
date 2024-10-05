<template>
  <div class="">
    <CategoryHeader :category="categoryName"></CategoryHeader>
    <SubCategoryCards :collectionName="CollectionName"></SubCategoryCards>
    <div class="flex justify-center p-5">
      <div class="flex gap-5 container justify-between">
        <FilterComponent :receivedDatas="categoryProducts"></FilterComponent>
        <div class="flex flex-wrap justify-between gap-5 container">
          <ProductCard :receivedProducts="categoryProducts"></ProductCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryHeader from "../UI/CategoryHeader.vue";
import SubCategoryCards from "../SubCategoryCards.vue";
import ProductCard from "../UI/ProductCard.vue";
import FilterComponent from "../UI/FilterComponent.vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
export default {
  async created() {
    this.defineCollectionName(this.categoryName);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.gender == this.gender) {
          this.categoryProducts.push({
            image: data.images,
            brand: data.brand,
            color: data.color,
            desc: data.description,
            gender: data.gender,
            price: data.price,
            category: data.category,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  name: "CategoryPage",
  props: ["categoryName"],
  components: {
    CategoryHeader,
    SubCategoryCards,
    ProductCard,
    FilterComponent,
  },
  data() {
    return {
      categoryProducts: [], //erkek kategorisindeyse erkek ürünleri gelecek burada da bir firebase işlemi olmak zorunda
      CollectionName: "",
      gender: "",
    };
  },
  methods: {
    defineCollectionName(categoryName) {
      switch (categoryName) {
        case "Women's Clothing":
          this.CollectionName = "womensCategories";
          this.gender = "Female";
          break;
        case "Men's Clothing":
          this.CollectionName = "mensCategories";
          this.gender = "Male";
          break;
        default:
          this.CollectionName = "nothing";
          break;
      }
    },
  },
};
</script>

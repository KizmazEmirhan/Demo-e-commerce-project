import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/components/Pages/HomePage.vue";
import ProductListPage from "../components/Pages/ProductListPage.vue";
import AdminPage from "@/components/Pages/AdminPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage, props: true },
  {
    path: "/category/:categoryName",
    name: "Category",
    component: ProductListPage,
    props: true,
    meta: {
      breadcrumb: (route) => [
        { text: "Home", link: "/" },
        { text: route.params.categoryName, link: route.path },
      ],
    },
  },
  {
    path: "/user/admin",
    component: AdminPage,
    name: "AdminPage",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/components/Pages/HomePage.vue";
import ProductListPage from "../components/Pages/ProductListPage.vue";
import AdminPage from "@/components/Pages/AdminPage.vue";
import LoginPage from "@/components/Pages/LoginPage.vue";
import RegisterPage from "@/components/Pages/RegisterPage.vue";
import ProductDetailsPage from "@/components/Pages/ProductDetailsPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage, props: true },

  {
    path: "/user/admin",
    component: AdminPage,
    name: "AdminPage",
  },
  {
    path: "/login",
    component: LoginPage,
    name: "LoginPage",
    meta: { hideNavbarFooter: true },
  },
  {
    path: "/register",
    component: RegisterPage,
    name: "RegisterPage",
    meta: { hideNavbarFooter: true },
  },
  {
    path: "/:categoryName?/products/:id",
    component: ProductDetailsPage,
    name: "ProductDetailsPage",
    props: (route) => ({
      id: route.params.id,
      fromAdmin: route.query.fromAdmin === "true",
    }),
    meta: {
      breadcrumb(route) {
        //console.log(route.meta.fromAdmin);
        if (route.query.fromAdmin === "true") {
          return [
            { text: "Home", link: "/" },
            {
              text: "All products",
              link: "/user/admin",
            },
            { text: route.params.id, link: "" },
          ];
        } else {
          return [
            { text: "Home", link: "/" },
            {
              text: route.params.categoryName || "Product Details",
              link: route.path,
            },
            { text: route.params.id, link: "" },
          ];
        }
      },
      fromAdmin: false,
    },
  },
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

<template>
  <nav v-if="breadcrumbs.length">
    <ul id="breadcrumb" class="flex gap-2">
      <li
        class="flex gap-2 items-center"
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        :id="index"
      >
        <router-link v-if="breadcrumb.link" :to="breadcrumb.link">{{
          breadcrumb.text
        }}</router-link>
        <span v-else>{{ breadcrumb.text }}</span>
        <span v-if="index < breadcrumbs.length - 1"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
//aktif olan sayfanın linki aktif değil
export default {
  computed: {
    breadcrumbs() {
      const matched = this.$route.matched;

      const breadcrumbs = matched.reduce((acc, route) => {
        const breadcrumb =
          typeof route.meta.breadcrumb === "function"
            ? route.meta.breadcrumb(this.$route)
            : route.meta.breadcrumb;

        if (breadcrumb) {
          acc.push(...breadcrumb);
        }

        return acc;
      }, []);
      return breadcrumbs.map((item, idx) => ({
        text: item.text,
        link: idx === breadcrumbs.length - 1 ? null : item.link,
      }));
    },
  },
};
</script>

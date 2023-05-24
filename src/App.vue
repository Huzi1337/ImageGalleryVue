<script>
import ImageShow from "./components/ImageShow.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      page: 1,
      pageCount: 10,
      imagesPerPage: 20,
      isLoaded: new Array(this.imagesPerPage).fill(false),
    };
  },
  components: {
    ImageShow,
  },
  methods: {
    ...mapActions(["fetchImages"]),
    handleScroll() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  watch: {
    page(newPage) {
      this.fetchImages({ page: newPage, imagesPerPage: this.imagesPerPage });
      this.isLoaded.fill(false);
      this.handleScroll();
    },
  },
  mounted() {
    this.fetchImages({ page: this.page, imagesPerPage: this.imagesPerPage });
  },
};
</script>

<template>
  <v-app id="inspire">
    <v-main>
      <ImageShow :isLoaded="isLoaded"></ImageShow>
      <v-pagination
        class="pagination"
        v-model="page"
        :length="pageCount"
        @page-click="handleScroll"
      >
      </v-pagination>
    </v-main>
  </v-app>
</template>

<style lang="scss">
* {
  font-family: "Poppins", sans-serif;
}
.pagination {
  margin-top: 2rem;
}

::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>

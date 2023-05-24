<template>
  <v-container>
    <v-row class="row">
      <v-col v-for="image in images" :key="image.id" cols="12" sm="6" md="3">
        <v-card
          :class="[
            !loading && !isLoaded[Number(image.id)] ? 'card loading' : 'card',
          ]"
        >
          <v-progress-circular
            v-if="!loading && !isLoaded[Number(image.id)]"
            class="spinner"
            indeterminate
            rotate="360"
          ></v-progress-circular>

          <img
            v-show="this.isLoaded[Number(image.id)]"
            :src="image.download_url"
            @load="handleImageLoad(Number(image.id))"
          />
          <h5 v-if="this.isLoaded[Number(image.id)]">{{ image.author }}</h5>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    isLoaded: Array,
  },
  computed: {
    ...mapState(["images", "loading"]),
  },
  methods: {
    handleImageLoad(index) {
      this.isLoaded[index] = true;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  font-family: "Poppins", sans-serif;
}

.card {
  display: relative;
  overflow: visible;
  height: 300px;
  margin-top: 2rem;
}
.card.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

img {
  width: 100%;
  height: 100%;
}
h5 {
  display: absolute;
  text-align: center;
  font-size: 16px;
  bottom: -0.5rem;
}

.spinner {
  align-self: center;
  justify-self: center;
}

@media (max-width: 375px) {
  .card {
    height: 200px;
  }
}

@media (max-width: 599px) {
  .card {
    height: 300px;
  }
}

@media (min-width: 960px) {
  .card {
    height: 200px;
  }
}

@media (min-width: 1920px) {
  .card {
    height: 300px;
  }
}

@media (min-width: 2560px) {
  .card {
    margin-top: 1.5rem;
    height: 400px;
  }
  h5 {
    font-size: 20px;
  }
}
</style>

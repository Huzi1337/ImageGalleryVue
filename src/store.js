import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      images: [],
      loading: false,
    };
  },
  mutations: {
    setImages(state, images) {
      state.images = images;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    fetchImages({ commit }, { page, imagesPerPage }) {
      commit("setLoading", true);
      return fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=${imagesPerPage}`
      )
        .then((res) => res.json())
        .then((res) => res.sort((a, b) => a.author.localeCompare(b.author)))
        .then((res) => {
          commit("setImages", res);
          commit("setLoading", false);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});

export default store;

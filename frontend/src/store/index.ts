import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { IProduct } from "@workspace/shared";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isOpen: false,
    productsArr: [] as IProduct[],
    product: {} as unknown as IProduct,
  },
  mutations: {
    changeOpen(state) {
      state.isOpen = !state.isOpen;
    },
    onGetProducts(state, data) {
      state.productsArr = data;
    },
    onNewProducts(state, data) {
      state.productsArr.push(data);
    },
    onGetOneProduct(state, data) {
      state.product = data;
    },
    resetProduct(state) {
      state.product = {} as unknown as IProduct;
    },
  },
  actions: {
    async getProducts({ commit }) {
      const { data } = await axios("http://localhost:3333");
      commit("onGetProducts", data);
    },
    async getOneProduct({ commit }, id: number) {
      const { data } = await axios(`http://localhost:3333/${id}`);
      commit("onGetOneProduct", data);
    },
  },
  modules: {},
});

<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, ref } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import ProductForm from "@/components/ProductForm.vue";
import store from "@/store/index";
import { useSocketIO } from "@/socket/socket";
import { ICreateProduct, IProduct } from "@workspace/shared";

const isOpen = computed(() => store.state.isOpen);
const products = computed(() => store.state.productsArr);

onBeforeMount(() => {
  store.dispatch("getProducts");
});

const { socket } = useSocketIO();

socket.on("onNewProduct", (product: IProduct) => {
  store.commit("onNewProducts", product);
});

const onAddProduct = (product: ICreateProduct) => {
  socket.emit("newProduct", product);
};

onBeforeUnmount(() => socket.disconnect());
</script>

<template>
  <div>
    <ProductForm v-if="isOpen" @addProduct="onAddProduct" />
    <div
      class="max-w-screen-md min-h-screen mx-auto flex flex-col my-5 pb-2 rounded-lg"
    >
      <div class="flex w-full py-3 items-center justify-center">
        <button
          @click="store.commit('changeOpen')"
          class="bg-[#D9F5FF] shadow-md shadow-slate-300 p-2 rounded hover:shadow-xl transition-all"
        >
          Add a Product
        </button>
      </div>
      <TransitionGroup
        name="list"
        tag="ul"
        class="flex flex-col justify-center items-center gap-9 px-8"
      >
        <li class="w-5/6" v-for="product of products" :key="product.id">
          <ProductCard :product="product" />
        </li>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>

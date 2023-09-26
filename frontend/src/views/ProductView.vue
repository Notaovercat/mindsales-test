<script setup lang="ts">
import store from "@/store";
import { IProduct } from "@workspace/shared";
import { ComputedRef, computed, onBeforeMount, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
//@ts-ignore
import { useRouter, useRoute } from "vue-router/composables";

const product: ComputedRef<IProduct> = computed(() => store.state.product);

onBeforeMount(() => {
  const id = useRoute().params.id;
  store.dispatch("getOneProduct", +id);
});
onUnmounted(() => store.commit("resetProduct"));
</script>

<template>
  <div
    class="max-w-screen-md min-h-screen mx-auto flex flex-col my-5 rounded-lg bg-white p-4 gap-8"
  >
    <RouterLink class="hover:text-blue-500" :to="{ name: 'home' }"
      >←Back</RouterLink
    >
    <h1 class="text-xl font-semibold">
      {{ product.name }}
    </h1>
    <div class="flex flex-col gap-3">
      <h2 class="font-bold">About</h2>
      <p class="text-gray-600 pl-4">{{ product.description }}</p>
      <p class="text-gray-500 pl-4">
        {{ product.category }}
      </p>
    </div>
    <div class="flex justify-between items-center mt-2">
      <p class="text-lg font-semibold text-indigo-700">{{ product.price }}$</p>
      <p class="text-gray-500">Stock: {{ product.stock }}</p>
    </div>
  </div>
</template>

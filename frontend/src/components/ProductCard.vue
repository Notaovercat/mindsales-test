<script setup lang="ts">
import { IProduct } from "@workspace/shared";
import { RouterLink } from "vue-router";

interface Props {
  product: IProduct;
}

const { product } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col min-h-[100px] bg-white shadow-lg rounded p-4">
    <RouterLink
      :to="{ name: 'product', params: { id: product.id.toString() } }"
      class="text-xl font-semibold hover:text-blue-600 transition-all cursor-pointer"
    >
      {{ product.name }}
    </RouterLink>
    <p class="text-gray-600">{{ product.description }}</p>
    <div class="flex justify-between items-center mt-2">
      <p class="text-lg font-semibold text-indigo-700">{{ product.price }}$</p>
      <p class="text-gray-500">
        {{ product.category }}
      </p>
    </div>
    <div class="flex justify-between items-center mt-2">
      <p class="text-gray-500">Stock: {{ product.stock }}</p>
    </div>
  </div>
</template>

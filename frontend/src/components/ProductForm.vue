<script setup lang="ts">
import store from "@/store";
import { ICreateProduct } from "@workspace/shared";
import { reactive, ref } from "vue";

const emit = defineEmits(["addProduct"]);

const errorMsg = ref("");

const productInput = reactive<ICreateProduct>({
  name: "",
  description: "",
  price: 0,
  category: "",
  stock: 0,
});

const validate = () => {
  if (productInput.name.trim().length < 3) {
    errorMsg.value = "Please, enter a product name";
    return false;
  }
  return true;
};

const onAdd = () => {
  errorMsg.value = "";
  const isValid = validate();
  if (!isValid) {
    return;
  }
  emit("addProduct", productInput);
  store.commit("changeOpen");
};
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50"></div>
    <div class="bg-white w-1/3 mx-auto p-6 rounded shadow-lg z-50">
      <div class="flex flex-col items-center gap-5 w-full">
        <div class="grid grid-cols-3 gap-1">
          <label class="col-span-1 text-right" for="name">
            Name<span class="text-red-600">*</span>
            :
          </label>
          <input
            v-model="productInput.name"
            class="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block p-1"
            name="name"
            type="text"
          />
        </div>

        <div class="grid grid-cols-3 gap-1">
          <label class="col-span-1 text-right" for="description"
            >Description:</label
          >
          <textarea
            v-model="productInput.description"
            class="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block p-1"
            name="description"
          />
        </div>

        <div class="grid grid-cols-3 gap-1">
          <label class="col-span-1 text-right" for="price">Price:</label>
          <input
            v-model="productInput.price"
            class="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block p-1"
            name="price"
            type="number"
          />
        </div>

        <div class="grid grid-cols-3 gap-1">
          <label class="col-span-1 text-right" for="category">Category:</label>
          <input
            v-model="productInput.category"
            class="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block p-1"
            name="category"
            type="text"
          />
        </div>

        <div class="grid grid-cols-3 gap-1">
          <label class="col-span-1 text-right" for="stock">Stock:</label>
          <input
            v-model="productInput.stock"
            class="col-span-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block p-1"
            name="stock"
            type="number"
          />
        </div>

        <div class="flex gap-7">
          <button
            @click="onAdd"
            class="px-3 py-1 bg-green-500 rounded hover:shadow-lg hover:opacity-90 transition-all duration-75"
          >
            Add
          </button>
          <button
            @click="$store.commit('changeOpen')"
            class="px-3 py-1 bg-red-500 rounded hover:shadow-lg hover:opacity-90 transition-all duration-75"
          >
            Cancel
          </button>
        </div>
        <small class="text-red-600">
          {{ errorMsg }}
        </small>
      </div>
    </div>
  </div>
</template>

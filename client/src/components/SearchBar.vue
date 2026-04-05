<template>
  <div class="mb-8">
    <input
      v-model="searchQuery"
      placeholder="Search breweries..."
      class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-lg"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const searchQuery = ref('');
const emit = defineEmits<{ search: [query: string] }>();

let timeout: ReturnType<typeof setTimeout>;

watch(searchQuery, (newValue) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    emit('search', newValue);
  }, 300);
});
</script>

<template>
  <router-link :to="`/brewery/${brewery.id}`" class="block">
    <div
      class="p-5 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-200 h-full flex flex-col"
    >
      <h2 class="text-lg font-semibold text-gray-900 mb-1">
        {{ brewery.name }}
      </h2>
      <p class="text-sm text-gray-500 mb-2">
        {{ [brewery.city, brewery.state].filter(Boolean).join(', ') }}
      </p>
      <a
        v-if="brewery.websiteUrl"
        :href="brewery.websiteUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-amber-600 hover:text-amber-800 mt-auto truncate"
        @click.stop
      >
        {{ brewery.websiteUrl }}
      </a>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  brewery: {
    type: Object as PropType<{
      id: string;
      name: string;
      city: string;
      state: string;
      websiteUrl?: string;
    }>,
    required: true,
  },
});
</script>

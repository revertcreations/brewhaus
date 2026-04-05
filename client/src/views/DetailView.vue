<template>
  <div class="container mx-auto max-w-3xl px-4 py-8">
    <router-link
      to="/"
      class="inline-flex items-center text-amber-600 hover:text-amber-800 mb-6 text-sm font-medium"
    >
      ← Back to Breweries
    </router-link>

    <div v-if="loading" class="text-center text-gray-500 mt-12">
      Loading...
    </div>

    <div v-else-if="error" class="text-center text-red-500 mt-12">
      Error: {{ error.message }}
    </div>

    <div v-else-if="result?.brewery">
      <h1 class="text-3xl font-bold text-gray-900 mb-1">
        {{ result.brewery.name }}
      </h1>
      <span
        v-if="result.brewery.breweryType"
        class="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium mb-6"
      >
        {{ result.brewery.breweryType }}
      </span>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div class="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Location
          </h2>
          <p v-if="result.brewery.street" class="text-gray-700">
            {{ result.brewery.street }}
          </p>
          <p class="text-gray-700">
            {{ [result.brewery.city, result.brewery.state].filter(Boolean).join(', ') }}
          </p>
          <p v-if="result.brewery.postalCode" class="text-gray-500 text-sm">
            {{ result.brewery.postalCode }}
          </p>
          <p v-if="result.brewery.country" class="text-gray-500 text-sm">
            {{ result.brewery.country }}
          </p>
        </div>

        <div class="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Contact
          </h2>
          <p v-if="result.brewery.phone" class="text-gray-700 mb-2">
            {{ result.brewery.phone }}
          </p>
          <a
            v-if="result.brewery.websiteUrl"
            :href="result.brewery.websiteUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-amber-600 hover:text-amber-800 text-sm break-all"
          >
            {{ result.brewery.websiteUrl }}
          </a>
          <p
            v-if="!result.brewery.phone && !result.brewery.websiteUrl"
            class="text-gray-400 text-sm italic"
          >
            No contact info available
          </p>
        </div>
      </div>

      <div
        v-if="result.brewery.latitude && result.brewery.longitude"
        class="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
      >
        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
          Coordinates
        </h2>
        <p class="text-gray-600 text-sm">
          {{ result.brewery.latitude }}, {{ result.brewery.longitude }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { useQuery } from '@vue/apollo-composable';
  import { GET_BREWERY_BY_ID } from '@/graphql/queries';

  const route = useRoute();
  const { result, loading, error } = useQuery(GET_BREWERY_BY_ID, () => ({
    id: route.params.id,
  }));
</script>

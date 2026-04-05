<template>
  <div class="container mx-auto max-w-5xl px-4 py-8 h-screen flex flex-col">
    <h1 class="text-4xl font-bold text-center mb-2 text-gray-900">Brewhaus</h1>
    <p class="text-center text-gray-500 mb-8">
      Discover breweries across the country
    </p>
    <SearchBar @search="handleSearch" />
    <p
      v-if="!isLoading && breweries.length === 0"
      class="text-center text-gray-400 mt-8"
    >
      No breweries found.
    </p>
    <div v-if="isLoading && breweries.length === 0" class="text-center mt-8 text-gray-500">
      Loading...
    </div>
    <div
      @scroll.passive="loadMore"
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto flex-1 min-h-0 pb-4"
    >
      <div v-for="brewery in breweries" :key="brewery.id">
        <BreweryCard :brewery="brewery" />
      </div>
      <div
        v-if="isLoadingMore"
        class="col-span-full text-center text-gray-500 py-4"
      >
        Loading more...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, defineOptions } from 'vue';
  import { useQuery } from '@vue/apollo-composable';
  import { GET_BREWERIES, SEARCH_BREWERIES } from '@/graphql/queries';
  import SearchBar from '@/components/SearchBar.vue';
  import BreweryCard from '@/components/BreweryCard.vue';

  defineOptions({ name: 'HomeView' });

  interface Brewery {
    id: string;
    name: string;
    city: string;
    state: string;
    websiteUrl?: string;
  }

  const searchTerm = ref('');
  const page = ref(1);
  const isLoadingMore = ref(false);
  const allBreweries = ref<Brewery[]>([]);
  const allSearchResults = ref<Brewery[]>([]);

  const { result: breweryResult, loading: breweryLoading } = useQuery(
    GET_BREWERIES,
    () => ({
      perPage: 30,
      page: page.value,
    }),
  );

  const {
    result: searchResult,
    loading: searchLoading,
  } = useQuery(
    SEARCH_BREWERIES,
    () => ({
      searchTerm: searchTerm.value,
      perPage: 30,
      page: page.value,
    }),
    () => ({
      enabled: searchTerm.value.length > 0,
    }),
  );

  const isLoading = computed(() => {
    return searchTerm.value ? searchLoading.value : breweryLoading.value;
  });

  watch(breweryResult, (newResult) => {
    if (newResult?.breweries?.items) {
      allBreweries.value.push(...newResult.breweries.items);
      isLoadingMore.value = false;
    }
  });

  watch(searchResult, (newResult) => {
    if (newResult?.searchBreweries?.items) {
      allSearchResults.value.push(...newResult.searchBreweries.items);
      isLoadingMore.value = false;
    }
  });

  const breweries = computed(() => {
    if (searchTerm.value) {
      return allSearchResults.value;
    }
    return allBreweries.value;
  });

  const handleSearch = (query: string) => {
    searchTerm.value = query;
    page.value = 1;
    allSearchResults.value = [];
  };

  const loadMore = (e: Event) => {
    const target = e.target as HTMLElement;
    if (isLoadingMore.value) return;
    if (
      target.scrollTop + target.clientHeight >=
      target.scrollHeight - 100
    ) {
      const total = searchTerm.value
        ? searchResult.value?.searchBreweries?.total ?? 0
        : breweryResult.value?.breweries?.total ?? 0;
      if (breweries.value.length < total) {
        isLoadingMore.value = true;
        page.value++;
      }
    }
  };
</script>

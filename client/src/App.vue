<template>
  <div class="min-h-screen bg-gray-100">
    <router-view v-slot="{ Component }">
      <keep-alive include="HomeView">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

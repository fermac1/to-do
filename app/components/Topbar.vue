<template>
  <header class="flex items-center justify-between bg-white shadow px-6 py-4 font-plusJakartaSans">
     <p class="text-[#1F1F1F] text-[14px] font-semibold">{{ pageTitle }}</p>

    <!-- Mobile toggle button -->
    <button
      class="md:hidden text-2xl text-gray-700 hover:text-gray-900"
      @click="$emit('toggleSidebar')"
    >
      <Icon name="heroicons:bars-3" class="w-6 h-6" />
    </button>

    <input type="text" placeholder="Search for tasks and more..."
           class="border border-gray-300 rounded-lg px-4 py-2 w-1/3 focus:outline-none" />
    <div class="flex items-center space-x-4">
      <button class="relative">
        🔔
        <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">1</span>
      </button>
      <img src="https://via.placeholder.com/32" alt="User" class="rounded-full w-8 h-8" />
    </div>
  </header>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

// const pageTitle = computed(() => {
//   const path = route.path.replace('/', '')
//   return path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Dashboard'
// })

import { usePageTitle } from '~/composables/usePageTitle'

const { pageTitle } = usePageTitle()
// pageTitle.value = 'Tasks'

// useHead({
//   title: pageTitle.value
// })
</script>
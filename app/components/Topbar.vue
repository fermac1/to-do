<template>
  <header class="flex items-center justify-between bg-white shadow px-6 py-4 font-plusJakartaSans">

    <!-- Mobile toggle button -->
    <button
      class="md:hidden text-2xl text-gray-700 hover:text-gray-900 mr-2"
      @click="$emit('toggleSidebar')"
    >
      <Icon name="heroicons:bars-3" class="w-6 h-6" />
    </button>

     <p class="text-[#1F1F1F] text-[14px] font-semibold">{{ pageTitle }}</p>


    <div class="flex items-center space-x-4">
      <!-- search icon -->
       <div class="relative">

         <Icon name="basil:search-solid" class="w-4 h-4 text-[#424242] absolute top-3 left-3" />
         <input type="text" placeholder="Search for tasks and more..."
                class="border w-[350px] border-[#F0F0F0] rounded-[24px] px-8 py-2 w-1/3 focus:outline-none accent-[#7F7F7F] text-[11px] font-light" 
                v-model="todoStore.searchTerm"
                />
         
       </div>
      <button class="relative">
        <div class="border border-[#F0F0F0] rounded-full px-3 py-2">
          <Icon name="iconoir:bell" class="w-6 h-6 text-[#424242]" />
        </div>
        <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">1</span>
      </button>
      <img src="/images/Avatar.png" alt="User" class="rounded-full w-8 h-8" />
    </div>
  </header>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useTodoStore } from '~/stores/todo'
const  todoStore = useTodoStore()

import { usePageTitle } from '~/composables/usePageTitle'

const { pageTitle } = usePageTitle()

</script>
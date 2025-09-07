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


    <div class="flex items-center space-x-4 relative">
      <!-- search icon -->
       <div class="relative md:block hidden">

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
      <img src="/images/Avatar.png" alt="User" class="rounded-full w-8 h-8 cursor-pointer"  @click="toggleDropdown"/>

       <!-- Dropdown Menu -->
      <div
        v-if="isDropdownOpen"
        class="absolute right-0 top-full mt-2 w-32 bg-white shadow-lg rounded-md border border-gray-200"
      >
        <ul>
          <li>
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </li>
        </ul>
        </div>
    </div>
  </header>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useTodoStore } from '~/stores/todo'
const  todoStore = useTodoStore()

import { usePageTitle } from '~/composables/usePageTitle'

const { pageTitle } = usePageTitle()

import { useUserStore } from '~/stores/user'
const router = useRouter()

// Store reference
const userStore = useUserStore()

// Local state to toggle dropdown visibility
const isDropdownOpen = ref(false)

// Toggle the visibility of the dropdown menu
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Logout functionality
const logout = () => {
  userStore.logout()
  isDropdownOpen.value = false // Close the dropdown
  router.push('/auth/login')
}

</script>
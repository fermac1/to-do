<template>
  <aside class="w-64 bg-white shadow-md flex flex-col">
    <div class="px-6 py-7 font-bold text-[11px] text-[#1F1F1F] flex flex-row">
        <img src="/images/dashboard-img.png" alt="" class="bg-[#000985] rounded-[33px]">
       <span> HIZO TASKLY</span>
    </div>

    
    <!-- Divider -->
    <div class="border-t border-gray-200"></div>

    <nav class="flex-1 pt-6">
      <ul>
         <!-- Dashboard Link -->
        <li>
          <NuxtLink
            to="/dashboard"
            class="flex items-center space-x-2 px-6 py-3 rounded-[6px] hover:bg-[#000CB00A]"
            :class="isActive('/dashboard') ? 'bg-[#000CB00A] text-[#000CB0] font-bold' : 'text-gray-700'"
          >
            <Icon name="mage:dashboard-minus-fill" :class="isActive('/dashboard') ? 'text-[#000CB0]' : ''" />
            <span class="text-[11px]">Dashboard</span>
          </NuxtLink>
        </li>

        <!-- Task Management Link -->
        <li>
          <NuxtLink
            to="/dashboard/tasks"
            class="flex items-center space-x-2 px-6 py-3 rounded-[6px] hover:bg-[#000CB00A]"
            :class="isActive('/dashboard/tasks') ? 'bg-[#000CB00A] text-[#000CB0] font-bold' : 'text-gray-700'"
          >
            <Icon name="hugeicons:note" :class="isActive('/dashboard/tasks') ? 'text-[#000CB0]' : ''" />
            <span class="text-[11px]">Task Management</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (path: string) => route.path === path
</script>
<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout'
})

import { usePageTitle } from '~/composables/usePageTitle'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
console.log('User email:', userStore.email)

const { pageTitle } = usePageTitle()
pageTitle.value = 'Dashboard'

useHead({
  title: pageTitle.value
})
</script>

<template>
  <div class="shadow rounded-lg bg-[#ffffff] p-6 border border-gray-200 font-plusJakartaSans">
    <!-- Welcome -->
    <h1 class="text-[22px] text-[#37404E] font-extrabold mb-2">Welcome back Pamela</h1>
    <p class="text-[#37404E] text-[13px] font-light mb-6">Your tasks are waiting, neatly organized and ready for you to take charge.</p>

    <!-- Overview Cards -->
    <!-- <div class="flex md:flex-row flex-col gap-4 mb-10"> -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 w-full">
      <div class="bg-[#E6E6E61A] rounded-[12px] p-6 md:col-span-2">
          <div class="flex justify-between">
              <span class="text-[#2E2E2E] font-extrabold text-[12px]">Dashboard Overview</span>
              <span class="border rounded-[6px] border-[#EBEEF5] text-[#626262] text-[11px] font-semibold px-3 py-1 cursor-pointer">Today</span>
          </div>
          <p class="text-[#37404E] text-[10px] font-light">Your dashboard provides an overview of all your tasks for today</p>
          <div class="grid grid-cols-4 gap-2 mb-6 mt-10">
            <div class="border-r border-[#F0F0F0] p-4 text-center">
              <h3 class="font-semibold text-[#424242] text-[9px]">TOTAL TASKS</h3>
              <p class="text-[42px] text-[#2E2E2E] font-medium">20</p>
            </div>
            <div class="border-r border-[#F0F0F0] p-4 text-center">
              <h3 class="font-semibold text-[#424242] text-[9px]">TASKS DUE</h3>
              <p class="text-[42px] text-[#2E2E2E] font-medium">10</p>
            </div>
            <div class="border-r border-[#F0F0F0] p-4 text-center">
              <h3 class="font-semibold text-[#424242] text-[9px]">COMPLETED</h3>
              <p class="text-[42px] text-[#2E2E2E] font-medium">5</p>
            </div>
            <div class="p-4 text-center">
              <h3 class="font-semibold text-[#424242] text-[9px]">OVERDUE TASKS</h3>
              <p class="text-[42px] text-[#2E2E2E] font-medium">10</p>
            </div>
          </div>
      </div>

      <div class="bg-[#E6E6E61A] rounded-[12px] p-6 md:col-span-1">
          <div class="flex justify-between">
              <span class="text-[#2E2E2E] font-extrabold text-[12px]">Pomodoro Timer</span>
              <span class="border rounded-[6px] border-[#EBEEF5] text-[#626262] text-[11px] font-semibold px-3 py-1 cursor-pointer bg-[#F3F4FC]">Start</span>
              <span class="border rounded-[6px] border-[#EBEEF5] text-[#ffffff] text-[11px] font-semibold px-3 py-1 cursor-pointer bg-[#00043D]">Finish</span>
          </div>
      </div>
        
    </div>


    <!-- Bottom Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left Section: Progress -->
      <div class="bg-white rounded-[12px] shadow p-6 bg-[#E6E6E699]">
        <div class="mb-4">
          <p class="font-semibold mb-4 text-[12px] text-[#2E2E2E]">This week's Task Progress Summary</p>
          <p class="font-light text-[#37404E] text-[10px]">Here's a snapshot of how far you've come this week</p>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-200 mb-4"></div>

        <div class="grid grid-cols-3 gap-4 text-center mb-6">
          <div>
            <p class="text-sm">Completed</p>
            <p class="text-xl font-bold text-green-500">20%</p>
          </div>
          <div>
            <p class="text-sm">In Progress</p>
            <p class="text-xl font-bold text-yellow-500">50%</p>
          </div>
          <div>
            <p class="text-sm">Pending</p>
            <p class="text-xl font-bold text-gray-500">30%</p>
          </div>
        </div>
        <!-- Simple Chart Placeholder -->
        <div class="flex justify-center">
          <div class="w-32 h-32 rounded-full border-8 border-green-500 border-t-yellow-400 border-l-gray-400 flex items-center justify-center">
            <span class="text-lg font-bold">239</span>
          </div>
        </div>
      </div>

      <!-- Right Section: Today Tasks -->
       <TaskList />

       <!-- <div class="bg-white rounded-xl shadow p-6">
        <p class="font-semibold mb-4 text-[12px] text-[#2E2E2E]">Today's Tasks</p>
        <p class="text-[#37404E] text-[10px] font-light">A list of all your tasks for today</p>
        <ul class="space-y-3">
          <li class="flex justify-between items-center border border-[#EBEEF5] rounded-[6px] px-4 py-2">
            <span>Design a Landing page project</span>
            <span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">High Priority</span>
          </li>
          <li class="flex justify-between items-center border border-[#EBEEF5] rounded-[6px] px-4 py-2">
            <span>User Research on the crypto-market</span>
            <span class="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">Mid Priority</span>
          </li>
          <li class="flex justify-between items-center border border-[#EBEEF5] rounded-[6px] px-4 py-2">
            <span>Mobile Responsiveness of Taskly</span>
            <span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">Low Priority</span>
          </li>
        </ul>
      </div>  -->
    </div>

  </div>
</template>

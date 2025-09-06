<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout'
})

import { usePageTitle } from '~/composables/usePageTitle'
import { useUserStore } from '~/stores/user'

import { useRouter } from 'vue-router'
const router = useRouter()

const userStore = useUserStore()
// Access user info
const email = userStore.email

const { pageTitle } = usePageTitle()
pageTitle.value = 'Dashboard'

useHead({
  title: pageTitle.value
})

if (!userStore.email) {
  router.push('/auth/login')
}
</script>

<template>
  <div class="shadow rounded-lg bg-[#ffffff] p-6 border border-gray-200 font-plusJakartaSans">
    <!-- Welcome -->
    <h1 class="text-[22px] text-[#37404E] font-extrabold mb-2">Welcome back {{ email }}</h1>
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
          <div class="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6 mt-10">
            <div class="md:border-r border-[#F0F0F0] p-4 text-center">
              <h3 class="font-semibold text-[#424242] text-[9px]">TOTAL TASKS</h3>
              <p class="text-[42px] text-[#2E2E2E] font-medium">20</p>
            </div>
            <div class="md:border-r border-[#F0F0F0] p-4 text-center">
              <h3 class="font-semibold text-[#424242] text-[9px]">TASKS DUE</h3>
              <p class="text-[42px] text-[#2E2E2E] font-medium">10</p>
            </div>
            <div class="md:border-r border-[#F0F0F0] p-4 text-center">
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
          <!-- <div class="flex flex-wrap md:flex-nowrap justify-between">
              <span class="text-[#2E2E2E] font-extrabold text-[12px]">Pomodoro Timer</span>
              <span class="border rounded-[6px] border-[#EBEEF5] text-[#626262] text-[11px] font-semibold px-3 py-1 cursor-pointer bg-[#F3F4FC]">Start</span>
              <span class="border rounded-[6px] border-[#EBEEF5] text-[#ffffff] text-[11px] font-semibold px-3 py-1 cursor-pointer bg-[#00043D]">Finish</span>
          </div> -->

          <PomodoroTimer />
      </div>
        
    </div>


    <!-- Bottom Grid -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> -->
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Left Section: Progress -->
      <div class="bg-white rounded-[12px] shadow p-6 bg-[#E6E6E699] w-full md:w-[60%]">
        <div class="mb-4">
          <p class="font-semibold mb-4 text-[12px] text-[#2E2E2E]">This week's Task Progress Summary</p>
          <p class="font-light text-[#37404E] text-[10px]">Here's a snapshot of how far you've come this week</p>
        </div>

        <!-- Divider -->
        <div class="-mx-6 border-t border-[#F0F0F0] mb-4"></div>
        <TaskStats />
      </div>

      <!-- Right Section: Today Tasks -->
       <TodaysTask />

      
    </div>

  </div>
</template>

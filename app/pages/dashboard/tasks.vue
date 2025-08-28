<script setup lang="ts">

definePageMeta({
  layout: 'dashboard-layout'
})

import { Icon } from '#components'
import { ref, computed } from 'vue'

import { usePageTitle } from '~/composables/usePageTitle'

const { pageTitle } = usePageTitle()
pageTitle.value = 'Tasks'

useHead({
  title: pageTitle.value
})

const tabs = ['All To dos', 'Completed', 'In Progress', 'Pending']
const activeTab = ref('All To dos')

const sidebarOpen = ref(false)
const sidebarFormOpen = ref(false)

interface Task {
  id: number
  title: string
  description: string
  dueDate: string
  priority: 'High' | 'Mid' | 'Low'
  status: 'Completed' | 'In Progress' | 'Pending'
  tags: string[]
  completed: boolean
  progress: number
}

const tasks = ref<Task[]>([
  { id: 1, title: 'User Research', description: 'Conduct user research on Fintech mobile apps...', dueDate: 'Mar 14th 2025', priority: 'High', status: 'Completed', tags: ['Completed', 'Work'], completed: true, progress: 100 },
  { id: 2, title: 'Landing Page', description: 'Create landing page for app...', dueDate: 'Mar 14th 2025', priority: 'Mid', status: 'In Progress', tags: ['In Progress', 'Personal'], completed: false, progress: 50 },
  { id: 3, title: 'About us page for Taskly', description: 'Write about us content...', dueDate: 'Mar 14th 2025', priority: 'Low', status: 'Pending', tags: ['Pending', 'Work'], completed: false, progress: 20 },
  { id: 4, title: 'Mobile Responsiveness', description: 'Ensure mobile responsive design...', dueDate: 'Mar 14th 2025', priority: 'Mid', status: 'In Progress', tags: ['In Progress', 'Personal'], completed: false, progress: 60 }
])

const filteredTasks = computed(() => {
  if (activeTab.value === 'All To dos') return tasks.value
  if (activeTab.value === 'Completed') return tasks.value.filter(t => t.status === 'Completed')
  if (activeTab.value === 'In Progress') return tasks.value.filter(t => t.status === 'In Progress')
  if (activeTab.value === 'Pending') return tasks.value.filter(t => t.status === 'Pending')
  return tasks.value
})

const priorityClass = (priority: string) => {
  if (priority === 'High') return 'bg-[#FAE5E5] text-[#D60000] border border-[#FB0404]'
  if (priority === 'Mid') return 'bg-[#EBF5EF] text-[#389F63] border border-[#48BB78]'
  if (priority === 'Low') return 'bg-[#F9F5E6] text-[#CAA10C] border border-[#ECBD13]'
  return ''
}

const tagClass = (tag: string) => {
  if (tag === 'Completed') return 'bg-[#48BB7840] text-[#2B824F]'
  if (tag === 'In Progress') return 'bg-[#FCFAF3] text-[#A78406]'
  if (tag === 'Pending') return 'bg-[#F6F7F9] text-[#485465]'
  if (tag === 'Work') return 'bg-[#C200B51F] text-[#C200B5]'
  if (tag === 'Personal') return 'bg-[#C200B51F] text-[#C200B5]'
  return 'bg-[#F6F7F9] text-[#485465]'
}

const task = {
  progress: 50
}

</script>

<template>
  <div class="shadow rounded-lg bg-[#ffffff] p-6 border border-gray-200  font-plusJakartaSans">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div class="text-[#37404E]">
        <h1 class="text-[22px] font-bold">Task Management</h1>
        <p class="text-[13px] font-light">Let's get those tasks done and keep your day moving forward.</p>
      </div>
      <button @click="sidebarFormOpen = true" class="bg-[#0513D1] text-[#ffffff] px-4 py-3 rounded-lg flex items-center gap-2 text-[14px] font-semibold">
        <Icon name="fluent:add-square-20-filled" class=""/> New Task
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex gap-4 mb-6 border border-[#F1F1F1] rounded-[48px] p-2 w-fit">
      <button 
        v-for="tab in tabs" 
        :key="tab" 
        @click="activeTab = tab"
        :class="['px-4 py-2 rounded-full transition font-semibold text-[12px]', activeTab === tab ? 'bg-[#0513D1] text-[#ffffff]' : 'text-[#7E90A9]']">
        {{ tab }}
      </button>
    </div>

    <!-- Task Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer" >
      <div 
        v-for="task in filteredTasks" 
        :key="task.id"
        class="border rounded-lg p-4 shadow-sm bg-white">
        
        <!-- Title and Priority -->
        <div class="flex justify-between items-start mb-4">
          <h2 class="font-bold text-[15px] text-[#2E2E2E]" @click="sidebarOpen = true">{{ task.title }}</h2>
          <span 
            :class="priorityClass(task.priority)"
            class="text-[9px] px-2 py-1 rounded font-medium">
            {{ task.priority }} Priority
          </span>
        </div>
        
        <!-- Task ID and Due Date -->
        <div class="flex justify-between text-[#7F7F7F] mb-4">
          <span class="text-[13px] font-semibold ">Task #{{ task.id }}</span>
          <span class="text-[10px] font-medium ">Due {{ task.dueDate }}</span>
        </div>

        <!-- Description -->
        <p class="text-[11px] text-[#7F7F7F] font-light mb-3">{{ task.description }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 mt-6 mb-10">
            <!-- Tags -->
            <div class="flex gap-2 mb-4 w-fit">
              <span 
                v-for="tag in task.tags" 
                :key="tag" 
                class="px-2 py-1 text-[8px] font-normal border border-[#E5E7EB] rounded-full"
                :class="tagClass(tag)">
                {{ tag }}
              </span>
            </div>
    
            <!-- Icons -->
            <div class="flex justify-end gap-2 mb-4 text-gray-400">
              <button title="Edit" class="border border-[#E6E6E6D9] rounded-lg px-3 py-1">
                <Icon name="hugeicons:edit-02" />
              </button>
              <button title="Delete" class="border border-[#E6E6E6D9] rounded-lg px-3 py-1">
               <Icon name="mage:trash-3"/>
              </button>
            </div>
        </div>

        <!-- Progress Bar -->

      <div class="relative w-full group">
        <!-- Progress Bar -->
        <div class="h-1 bg-[#F3F4FC] rounded-[9px] mb-4">
          <div
            class="h-1 bg-[#00043D] rounded-[9px] transition-all duration-300"
            :style="{ width: task.progress + '%' }"
          ></div>
        </div>

        <!-- Tooltip -->
        <div
          class="absolute -top-7 transform -translate-x-1/2 bg-[#00043D] text-white text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300"
          :style="{ left: task.progress + '%' }"
        >
          {{ task.progress }}%
          <div
            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#00043D]"
          ></div>
        </div>
      </div>


        <!-- <div class="h-1 bg-[#F3F4FC] rounded-[9px] mb-4">
          <div 
            class="h-1 bg-[#00043D] rounded-[9px]" 
            :style="{ width: task.progress + '%' }">
          </div>
        </div> -->

        <!-- Completed Checkbox -->
        <label class="flex items-center text-[10px] font-medium gap-2">
          <input type="checkbox" v-model="task.completed" class="w-4 h-4 accent-[#00043D]" />
          <span class="text-[#A8A8A8]">{{ task.completed ? 'Completed' : 'Mark as completed' }}</span>
        </label>
      </div>
    </div>

    <TaskSidebar :open="sidebarOpen" :onClose="() => sidebarOpen = false" />
    <TaskForm :open="sidebarFormOpen" :onClose="() => sidebarFormOpen = false" />
  </div>
</template>

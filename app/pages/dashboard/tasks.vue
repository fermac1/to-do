<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout'
})

import { Icon } from '#components'
import { ref, computed } from 'vue'
import { usePageTitle } from '~/composables/usePageTitle'
import { useTodoStore } from '@/stores/todo'
import { storeToRefs } from 'pinia'

const { pageTitle } = usePageTitle()
pageTitle.value = 'Tasks'

useHead({
  title: pageTitle.value
})

// Pinia store
const todoStore = useTodoStore()
const { todos } = storeToRefs(todoStore)

const tabs = ['All To dos', 'Completed', 'In Progress', 'Pending']
const activeTab = ref('All To dos')

const sidebarOpen = ref(false)
const sidebarFormOpen = ref(false)
const sidebarEditFormOpen = ref(false)

// Map store todos to UI format
const mappedTasks = computed(() =>
  todos.value.map(todo => {
    let progress = 0

    if (todo.subtasks && todo.subtasks.length > 0) {
      const completedSubtasks = todo.subtasks.filter(s => s.completed).length
      progress = Math.round((completedSubtasks / todo.subtasks.length) * 100)
    } else {
      progress = todo.isCompleted ? 100 : 0
    }

    let status: 'Completed' | 'In Progress' | 'Pending' = 'Pending'
    if (progress === 100) status = 'Completed'
    else if (progress > 0) status = 'In Progress'

    return {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      dueDate: todo.date,
      priority: todo.priority === 'high' ? 'High' : todo.priority === 'mid' ? 'Mid' : 'Low',
      status,
      category: [todo.category],
      completed: todo.isCompleted,
      progress,
      subtasks: todo?.subtasks
    }
  })
)

type MappedTask = {
  id: number
  title: string
  description: string
  dueDate: string
  priority: string
  status: string
  category: string[]
  completed: boolean
  progress: number
  subtasks?: Array<{
    id: number
    title: string
    completed: boolean
  }>
}

const selectedTask = ref<MappedTask | null>(null)

const searchTerm = ref('')

const openModal = (item: MappedTask) => {
  selectedTask.value = item
  sidebarOpen.value = true
}

const openEditModal = (todo: MappedTask) => {
  selectedTask.value = todo
  sidebarEditFormOpen.value = true
}


const filteredMappedTasks = computed(() => {
  // if (activeTab.value === 'All To dos') return mappedTasks.value
  // if (activeTab.value === 'Completed') return mappedTasks.value.filter(t => t.status === 'Completed')
  // if (activeTab.value === 'In Progress') return mappedTasks.value.filter(t => t.status === 'In Progress')
  // if (activeTab.value === 'Pending') return mappedTasks.value.filter(t => t.status === 'Pending')
  // return mappedTasks.value

  let filtered = mappedTasks.value

  // First, filter by tab
  if (activeTab.value === 'Completed') {
    filtered = filtered.filter(t => t.status === 'Completed')
  } else if (activeTab.value === 'In Progress') {
    filtered = filtered.filter(t => t.status === 'In Progress')
  } else if (activeTab.value === 'Pending') {
    filtered = filtered.filter(t => t.status === 'Pending')
  }

  // Then filter by search term
  if ((todoStore.searchTerm || '').trim()) {
    const lowerSearch = (todoStore.searchTerm || '').trim().toLowerCase()
    filtered = filtered.filter(task =>
      task.title.toLowerCase().includes(lowerSearch)
    )
  }

  return filtered

})

const priorityClass = (priority: string) => {
  if (priority === 'High') return 'bg-[#FAE5E5] text-[#D60000] border border-[#FB0404]'
  if (priority === 'Mid') return 'bg-[#EBF5EF] text-[#389F63] border border-[#48BB78]'
  if (priority === 'Low') return 'bg-[#F9F5E6] text-[#CAA10C] border border-[#ECBD13]'
  return ''
}

// Handle checkbox toggle to update store
// const toggleCompleted = (taskId: number, value: boolean) => {
//   const todo = todoStore.todos.find(t => t.id === taskId)
//   if (todo) {
//     todo.isCompleted = value
//   }
// }
const toggleCompleted = (taskId: number, value: boolean) => {
  const todo = todoStore.todos.find(t => t.id === taskId)
  if (todo) {
    todo.isCompleted = value

    // If the task has subtasks, update all of them
    if (todo.subtasks?.length) {
      todo.subtasks.forEach(subtask => {
        subtask.completed = value
      })
    }
  }
}


function deleteTask(id: number) {
  if (window.confirm('Are you sure you want to delete this task?')) {
    todoStore.deleteTodo(id)
  }
}

console.log('todos', todos.value);

</script>

<template>
  <div class="shadow rounded-lg bg-[#ffffff] p-6 border border-gray-200 font-plusJakartaSans">
    <!-- Header -->
    <div class="md:flex justify-between items-center mb-6 ">
      <div class="text-[#37404E]">
        <h1 class="text-[22px] font-bold">Task Management</h1>
        <p class="text-[13px] font-light">Let's get those tasks done and keep your day moving forward.</p>
      </div>
      <button 
        @click="sidebarFormOpen = true" 
        class="bg-[#0513D1] text-[#ffffff] px-4 py-3 rounded-lg flex items-center gap-2 text-[14px] font-semibold md:mt-0 mt-4">
        <Icon name="fluent:add-square-20-filled" /> New Task
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap md:flex-nowrap gap-4 mb-6 md:border border-[#F1F1F1] rounded-[48px] p-2 w-fit">
      <button 
        v-for="tab in tabs" 
        :key="tab" 
        @click="activeTab = tab"
        :class="['px-4 py-2 rounded-full transition font-semibold text-[12px]', activeTab === tab ? 'bg-[#0513D1] text-[#ffffff]' : 'text-[#7E90A9]']">
        {{ tab }}
      </button>
    </div>

    <!-- Task Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer">
      <div 
        v-for="task in filteredMappedTasks" 
        :key="task.id"
        class="border rounded-lg p-4 shadow-sm bg-white">
        
        <!-- Title and Priority -->
        <div class="flex justify-between items-start mb-4">
          <h2 class="font-bold text-[15px] text-[#2E2E2E]" @click="openModal(task)">{{ task.title }}</h2>
          <span 
            :class="priorityClass(task.priority)"
            class="text-[9px] px-2 py-1 rounded font-medium">
            {{ task.priority }} Priority
          </span>
        </div>
        
        <!-- Task ID and Due Date -->
        <div class="flex justify-between text-[#7F7F7F] mb-4">
          <span class="text-[13px] font-semibold">Task #{{ task.id }}</span>
          <span class="text-[10px] font-medium">Due {{ task.dueDate }}</span>
        </div>

        <!-- <div v-if="task.subtasks && task.subtasks.length">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Subtasks</h4>
          <ul class="space-y-1">
            <li
              v-for="(subtask, index) in task.subtasks"
              :key="index"
              class="flex items-center gap-2"
            >
              <input
                type="checkbox"
                v-model="subtask.completed"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span
                :class="{ 'line-through text-gray-400': subtask?.completed }"
                class="text-sm text-gray-700"
              >
                {{ subtask.title }}
              </span>
            </li>
          </ul>
        </div> -->


        <!-- Description -->
        <p class="text-[11px] text-[#7F7F7F] font-light mb-3 break-words whitespace-normal">{{ task.description }}</p>

        <div class="grid grid-cols-1 md:grid-cols-2 mt-6 mb-10">
          <!-- category -->
          <div class="flex gap-2 mb-4 w-fit">
            <span
              class="px-2 py-2 text-[8px] font-normal border border-[#E5E7EB] rounded-full"
              :class="{
                'bg-[#48BB7840] text-[#2B824F]': task.status === 'Completed',
                'bg-[#FCFAF3] text-[#A78406]': task.status === 'In Progress',
                'bg-[#F6F7F9]] text-[#485465]': task.status === 'Pending'
              }"
            >
              {{ task.status }}
            </span>

            <span 
              v-for="tag in task.category" 
              :key="tag" 
              class="px-2 py-2 text-[8px] font-normal border border-[#E5E7EB] rounded-full"
              
              :class="{
                'bg-[#C200B51F] text-[#C200B5]': tag === 'Work',
                'bg-[#C200B51F]] text-[#C200B5]': tag === 'Personal'
              }"
              >
              {{ tag }}
            </span>

          </div>
  
          <!-- Icons -->
          <div class="flex justify-end gap-2 mb-4 text-gray-400">
            <button title="Edit" class="border border-[#E6E6E6D9] rounded-lg px-3 py-1" @click="openEditModal(task)">
              <Icon name="hugeicons:edit-02" />
            </button>
            <button title="Delete" class="border border-[#E6E6E6D9] rounded-lg px-3 py-1" @click="deleteTask(task.id)">
              <Icon name="mage:trash-3"/>
            </button>
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="relative w-full group">
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

        <!-- Completed Checkbox -->
        <label class="flex items-center text-[10px] font-medium gap-2">
          <input 
            type="checkbox" 
            :checked="task.completed"
            @change="toggleCompleted(task.id, $event.target.checked)" 
            class="w-4 h-4 accent-[#00043D]" 
          />
          <span class="text-[#A8A8A8]">{{ task.completed ? 'Completed' : 'Mark as completed' }}</span>
        </label>
      </div>
    </div>

    <!-- Sidebars -->
    <TaskSidebar :open="sidebarOpen" :onClose="() => sidebarOpen = false"  :item="selectedTask"  />
    <TaskForm :open="sidebarFormOpen" :onClose="() => sidebarFormOpen = false" />
    <EditTask :open="sidebarEditFormOpen" :onClose="() => sidebarEditFormOpen = false" :todo="selectedTask"/>
  </div>
</template>

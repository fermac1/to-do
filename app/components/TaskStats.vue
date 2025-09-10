<template>
  <div class="p-2 bg-white">
    <!-- Top Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <!-- Completed -->
      <div class="border-r border-[#F0F0F0] p-4">
        <p class="uppercase text-[8px] text-[#424242] font-semibold flex gap-1">
          Completed <span class="w-2 h-2 rounded-full bg-[#48BB78]"></span>
        </p>
        <p class="text-[32px] font-bold mt-1">{{ percent(completedTasks) }}<span class="text-[20px] font-semibold">%</span></p>
        <div class="w-full h-3 border border-[#E6E6E699] rounded-[2px] mt-2">
          <div class="h-3 bg-[#48BB78] border border-[#E6E6E699] rounded-[2px]" :style="{ width: percent(completedTasks, false) }"></div>
        </div>
      </div>

      <!-- In Progress -->
      <div class="border-r border-[#F0F0F0] p-4">
        <p class="uppercase text-[8px] text-[#424242] font-semibold flex gap-1">
          In Progress <span class="w-2 h-2 rounded-full bg-[#ECBD13]"></span>
        </p>
        <p class="text-[32px] font-bold mt-1">{{ percent(inProgressTasks) }}<span class="text-[20px] font-semibold">%</span></p>
        <div class="w-full h-3 border border-[#E6E6E699] rounded-[2px] mt-2">
          <div class="h-3 bg-[#ECBD13] border border-[#E6E6E699] rounded-[2px]" :style="{ width: percent(inProgressTasks, false) }"></div>
        </div>
      </div>

      <!-- Pending -->
      <div class="p-4">
        <p class="uppercase text-[8px] text-[#424242] font-semibold flex gap-1">
          Pending <span class="w-2 h-2 rounded-full bg-[#718096]"></span>
        </p>
        <p class="text-[32px] font-bold mt-1">{{ percent(pendingTasks) }}<span class="text-[20px] font-semibold">%</span></p>
        <div class="w-full h-3 border border-[#E6E6E699] rounded-[2px] mt-2">
          <div class="h-3 bg-[#718096] border border-[#E6E6E699] rounded-[2px]" :style="{ width: percent(pendingTasks, false) }"></div>
        </div>
      </div>
    </div>

    <!-- Middle Section -->
    <div class="flex flex-col md:flex-row items-center justify-between">

        <!-- Donut Chart -->
        <div class="relative w-40 h-40 mx-auto">
            <ClientOnly>
              <svg viewBox="0 0 36 36" class="w-full h-full rotate-[-90deg]" v-if="totalTasks === 0">
                <path
                  class="text-gray-200"
                  stroke-width="8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 5
                    a 13 13 0 0 1 0 26
                    a 13 13 0 0 1 0 -26"
                />
              </svg>

              <svg viewBox="0 0 36 36" class="w-full h-full rotate-[-90deg]" v-else>
                  <!-- Completed (green) -->
                  <path
                  class="text-[#48BB78]"
                  :stroke-dasharray="`${piePercent(completedTasks)}, 100`"
                  stroke-width="8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 5
                      a 13 13 0 0 1 0 26
                      a 13 13 0 0 1 0 -26"
                  />
  
                  <!-- In Progress (yellow) -->
                  <path
                  class="text-[#ECBD13]"
                  :stroke-dasharray="`${piePercent(inProgressTasks)}, 100`"
                  stroke-width="8"
                  stroke="currentColor"
                  fill="none"
                  :stroke-dashoffset="`-${piePercent(completedTasks)}`"   
                  d="M18 5
                      a 13 13 0 0 1 0 26
                      a 13 13 0 0 1 0 -26"
                  />
  
                  <!-- Pending (gray) -->
                  <path
                  class="text-[#718096]"
                  :stroke-dasharray="`${piePercent(pendingTasks)}, 100`"
                  stroke-width="8"
                  stroke="currentColor"
                  fill="none"
                  :stroke-dashoffset="`-${piePercent(completedTasks) + piePercent(inProgressTasks)}`"
                  d="M18 5
                      a 13 13 0 0 1 0 26
                      a 13 13 0 0 1 0 -26"
                  />
              </svg>
            </ClientOnly>

            <div class="absolute inset-0 flex items-center justify-center">
            <p class="text-2xl font-bold">{{ totalTasks }}</p>
            <span class="text-sm text-[#718096] ml-1">tasks</span>
            </div>
        </div>

      <!-- Summary -->
      <div class="flex flex-col md:flex-row justify-center space-y-4">
        <div class="text-center md:border-l border-[#F0F0F0] p-4 mt-4">
            <p class="uppercase text-[8px] text-[#424242] font-semibold flex gap-1">
                Completed <span class="w-2 h-2 rounded-full bg-[#48BB78]"></span>
            </p>
            <p class="font-bold text-[#2E2E2E] text-[32px] ml-2">{{ completedTasks  }}</p>
        </div>
        <div class="text-center md:border-l border-[#F0F0F0] p-4">
            <p class="uppercase text-[8px] text-[#424242] font-semibold flex gap-1">
                In Progress <span class="w-2 h-2 rounded-full bg-[#ECBD13]"></span>
            </p>
            <p class="font-bold text-[#2E2E2E] text-[32px] ml-2">{{ inProgressTasks  }}</p>
        </div>
        <div class="text-center md:border-l border-[#F0F0F0] p-4">
          <p class="uppercase text-[8px] text-[#424242] font-semibold flex gap-1">
            Pending <span class="w-2 h-2 rounded-full bg-[#718096]"></span>
        </p>
            <p class="font-bold text-[#2E2E2E] text-[32px] ml-2">{{ pendingTasks  }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '@/stores/todo'
import { storeToRefs } from 'pinia'

// Access todos
const todoStore = useTodoStore()
// const { todos } = storeToRefs(todoStore)

const {
    todos,
  totalTasks,
  completedTasks,
  inProgressTasks,
  pendingTasks
} = storeToRefs(todoStore)


const piePercent = (count: number) => {
  const total = completedTasks.value + inProgressTasks.value + pendingTasks.value
  return total === 0 ? 0 : (count / total) * 100
}


const percent = (part: number, formatText = true) => {
  const raw = totalTasks.value ? (part / totalTasks.value) * 100 : 0
  return formatText ? `${raw.toFixed(0)}` : `${raw}%`
}


// date
const isToday = (dateStr: string) => {
  const today = new Date()
  const taskDate = new Date(dateStr)
  return (
    taskDate.getDate() === today.getDate() &&
    taskDate.getMonth() === today.getMonth() &&
    taskDate.getFullYear() === today.getFullYear()
  )
}

const isThisWeek = (dateStr: string) => {
  const today = new Date()
  const taskDate = new Date(dateStr)
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
  const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6))
  return taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek
}

const weeklyTasks = computed(() => {
  return todos.value.filter(todo => isThisWeek(todo.date)).length
})

const dailyTasks = computed(() => {
  return todos.value.filter(todo => isToday(todo.date)).length
})

</script>


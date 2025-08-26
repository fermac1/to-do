<script setup lang="ts">
import { ref } from 'vue'

interface Task {
  id: number
  title: string
  priority: 'High' | 'Mid' | 'Low'
  completed: boolean
}

const tasks = ref<Task[]>([
  { id: 1, title: 'Design a Landing page project', priority: 'High', completed: false },
  { id: 2, title: 'Design a Landing page project', priority: 'High', completed: true },
  { id: 3, title: 'User Research on the crypto market', priority: 'Mid', completed: true },
  { id: 4, title: 'Mobile Responsiveness of Taskly', priority: 'Low', completed: false }
])

const toggleTask = (id: number) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.completed = !task.completed
}

const priorityClasses = (priority: string) => {
  if (priority === 'High') return 'border-[#FB0404] text-[#FB0404] bg-[#FAE5E5]'
  if (priority === 'Mid') return 'border-[#389F63] text-[#389F63] bg-[#F5FAF7]'
  return 'bg-[#FCFAF3] text-[#CAA10C]'
}
</script>

<template>
  <div class="bg-white rounded-xl shadow p-6">
    <p class="font-semibold text-[#2E2E2E] text-[12px]">Today's task</p>
    <p class="text-[10px] text-[#37404E] font-light mb-4">A list of all your tasks for today</p>

    <ul class="space-y-4">
      <li v-for="task in tasks" :key="task.id" class="flex items-center justify-between p-4 rounded-lg border border-gray-200">
        <!-- Checkbox -->
        <button
          @click="toggleTask(task.id)"
          class="w-5 h-5 rounded-full border flex items-center justify-center mr-3"
          :class="task.completed ? 'bg-indigo-900 text-white border-indigo-900' : 'border-gray-400'"
        >
          <span v-if="task.completed">✔</span>
        </button>

        <!-- Task title -->
        <span class="flex-1 text-[#626262] text-[11px] font-normal"
              :class="task.completed ? 'line-through text-gray-400' : ''">
          {{ task.title }}
        </span>

        <!-- Priority badge -->
        <span
          class="text-xs px-3 py-1 rounded-[4px] border font-medium"
          :class="priorityClasses(task.priority)"
        >
          {{ task.priority }} Priority
        </span>
      </li>
    </ul>
  </div>
</template>

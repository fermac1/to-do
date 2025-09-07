<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()

const today = new Date().toISOString().split('T')[0]

const todaysTasks = computed(() =>
  todoStore.todos
    .filter(todo => {
      const dueDate = new Date(todo.date).toISOString().split('T')[0]
      return dueDate === today
    })
    .map(todo => {
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

const toggleTask = (id: number) => {
  const task = todaysTasks.value.find(t => t.id === id)
    if (task) task.completed = !task.completed
console.log('task.completed', todaysTasks.value);
  
}

const priorityClass = (priority: string) => {
  if (priority === 'High') return 'bg-[#FAE5E5] text-[#D60000] border border-[#FB0404]'
  if (priority === 'Mid') return 'bg-[#EBF5EF] text-[#389F63] border border-[#48BB78]'
  if (priority === 'Low') return 'bg-[#F9F5E6] text-[#CAA10C] border border-[#ECBD13]'
  return ''
}

</script>


<template>
  <div class="bg-white rounded-xl shadow p-6 w-full md:w-[40%]">
    <p class="font-semibold text-[#2E2E2E] text-[12px]">Today's task</p>
    <p class="text-[10px] text-[#37404E] font-light mb-4">A list of all your tasks for today</p>

    <div v-if="todaysTasks.length === 0" class="text-[10px] text-[#626262] text-center">No tasks for today</div>

    <ul class="space-y-4">
      <li v-for="task in todaysTasks" :key="task.id" class="flex items-center justify-between p-4 rounded-lg border border-gray-200">
        <!-- Checkbox -->
        <button
          @click="toggleTask(task.id)"
          class="w-5 h-5 rounded-full border flex items-center justify-center mr-3"
          :class="task.completed === true ? 'bg-[#00043D] text-white border-[#00043D]' : 'border-[#626262]'"
        >
       
          <span v-if="task.completed === true"><Icon name="ic:round-check" class="w-4 h-4 text-white" /></span>
        </button>

        <!-- Task title -->
        <span class="flex-1 text-[#626262] text-[11px] font-light"
              :class="task.completed ? 'line-through' : ''">
          {{ task.title }}
        </span>

        <!-- Priority badge -->
        <span
          class="text-[10px] px-2 py-1 rounded-[4px] border font-medium"
          :class="priorityClass(task.priority)"
        >
          {{ task.priority }} Priority
        </span>
      </li>
    </ul>
  </div>
</template>

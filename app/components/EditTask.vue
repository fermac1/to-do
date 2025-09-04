<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useTodoStore } from '@/stores/todo' // adjust this path based on your setup

// Props
const props = defineProps<{
  open: boolean
  onClose: () => void
  todo: {
    id: number
    title: string
    description: string
    dueDate: string
    priority: string
    tags: string
    subtasks?: Array<{
      title: string
      isDone: boolean
    }>
  }
}>()

// Store
const todoStore = useTodoStore()

// Modal
const showModal = ref(false)
const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)
const userName = 'Pamela'

// Form state
const title = ref('')
const description = ref('')
const dueDate = ref('')
const priority = ref('')
const tags = ref('')
const subtasks = ref<{ title: string; isDone: boolean }[]>([])

// Options
const priorities = [
  { label: "High Priority", value: "High", color: "text-[#D60000]" },
  { label: "Mid Priority", value: "Mid", color: "text-[#389F63]" },
  { label: "Low Priority", value: "Low", color: "text-[#CAA10C]" }
]

const categories = [
  { label: "Personal", value: "personal" },
  { label: "Work", value: "work" }
]

// Populate fields when modal is opened
watch(
  () => props.open,
  (isOpen) => {
    if (isOpen && props.todo) {
      title.value = props.todo.title
      description.value = props.todo.description
      dueDate.value = props.todo.dueDate
      priority.value = props.todo.priority
      tags.value = Array.isArray(props.todo.tags) ? props.todo.tags[0] : props.todo.tags || ''
      subtasks.value = props.todo.subtasks ? [...props.todo.subtasks] : []
    }
  },
  { immediate: true }
)

console.log('title', title.value);
console.log('props', props.todo);


// Add a new subtask
const addSubtask = () => {
  subtasks.value.push({ title: '', isDone: false })
}

// Submit the edited form
const handleSubmit = () => {
  if (!title.value.trim()) {
    alert("Please enter a title for the task")
    return
  }

  if (!priority.value || !tags.value) {
    alert("Please select priority and category")
    return
  }

  const updatedSubtasks = subtasks.value
    .filter(s => s.title.trim())
    .map(s => ({
      title: s.title.trim(),
      isDone: s.isDone
    }))

  const updatedTodo = {
    ...props.todo,
    title: title.value,
    description: description.value,
    date: dueDate.value,
    priority: priority.value,
    tags: [tags.value],
    subtasks: updatedSubtasks
  }
  
  todoStore.updateTodo(updatedTodo)
  openModal()
}
console.log('props', props.todo);

 console.log('date', dueDate.value);
  console.log('priority', priority.value);
  console.log('tags', tags.value);
</script>

<template>
  <transition name="fade">
    <div
      v-if="props.open"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      @click="props.onClose"
    />
  </transition>

  <transition name="slide">
    <div
      v-if="props.open"
      class="fixed top-0 right-0 w-full max-w-xl h-full bg-white shadow-xl z-50 flex flex-col px-4"
    >
      <!-- Header -->
      <div class="flex justify-end p-2">
        <button @click="props.onClose" class="text-[#010101] bg-[#7180961A] rounded-xl py-1 px-3">
          <Icon name="heroicons:x-mark" class="w-4 h-4 font-bold" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit()" class="overflow-y-auto">
        <div class="border border-[#E6E6E673] rounded-[12px] overflow-y-auto">
          <!-- Title -->
          <div class="p-6 text-[#37404E] text-[14px] font-semibold">
            What needs to be done?
            <input
              v-model="title"
              type="text"
              class="bg-[#E6E6E61A] border border-[#E6E6E680] rounded-[8px] p-3 mt-2 w-full text-[#37404E] text-[12px] font-normal focus:outline-none"
              placeholder="Input Task title"
            />
          </div>
          <p>tags: {{ tags }}</p>


          <!-- Date, Priority, Category -->
          <div class="flex flex-col md:flex-row gap-4 p-6">
            <div>
              <label class="block text-[#37404E] text-[14px] font-semibold mb-2">Date</label>
              <input
                type="date"
                v-model="dueDate"
                
                class="px-4 py-2 md:px-6 md:py-3 bg-[#E6E6E61A] border border-[#E6E6E680] rounded-lg text-[#37404E] text-[10px] font-normal focus:outline-none"
              />
            </div>

            <div>
              <label class="block text-[#37404E] text-[14px] font-semibold mb-2">Priority</label>
              <select
                v-model="priority"
                class="w-full bg-[#E6E6E61A] border border-[#E6E6E680] rounded-lg px-4 py-2 md:px-6 md:py-3 text-[#37404E] text-[10px] font-normal focus:outline-none"
              >
                <option disabled value="">How important?</option>
                <option
                  v-for="todo in priorities"
                  :key="todo.value"
                  :value="todo.value"
                  :class="todo.color"
                >
                  {{ todo.label }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-[#37404E] text-[14px] font-semibold mb-2">Category</label>
              <select
                v-model="tags"
                class="w-full bg-[#E6E6E61A] border border-[#E6E6E680] rounded-lg px-4 py-2 md:px-6 md:py-3 text-[#37404E] text-[10px] font-normal focus:outline-none"
              >
                <option disabled value="">What type of task?</option>
                <option
                  v-for="todo in categories"
                  :key="todo.value"
                  :value="todo.value"
                >
                  {{ todo.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- Description -->
          <div class="p-6">
            <h3 class="font-semibold text-[#37404E] text-[14px] mb-2">Edit description</h3>
            <textarea
              v-model="description"
              placeholder="Add a task description"
              class="border border-[#E6E6E680] rounded-[8px] px-3 py-4 w-full text-[#37404E] text-[12px] font-normal focus:outline-none"
            />
          </div>

          <!-- Subtasks -->
          <div class="p-6 pt-0">
            <div class="bg-white p-4 rounded-lg border border-gray-100 flex justify-between todos-start">
              <div class="flex-1">
                <h3 class="font-medium text-gray-800 text-sm mb-3">
                  Edit Subtasks <span class="font-light text-gray-500 text-xs">(Optional)</span>
                </h3>
                <ul class="space-y-3">
                  <li
                    v-for="(subtask, index) in subtasks"
                    :key="index"
                    class="flex todos-center gap-2"
                  >
                    <input
                      type="checkbox"
                      v-model="subtask.isDone"
                      class="w-4 h-4 text-blue-600 border-gray-300 rounded"
                    />
                    <input
                      v-model="subtask.title"
                      class="text-sm w-full border border-gray-200 rounded px-2 py-1 focus:outline-none"
                      placeholder="Subtask title"
                    />
                  </li>
                </ul>
              </div>
              <button
                type="button"
                @click="addSubtask"
                class="ml-4 flex todos-center justify-center w-8 h-8 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100"
              >
                <Icon name="heroicons:plus" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Submit -->
          <div class="flex justify-end p-6">
            <button
              type="submit"
              class="text-white bg-[#0513D1] rounded-[5px] py-2 px-4"
            >
              Update Task
            </button>
          </div>

          <!-- Modal -->
          <SuccessModal :show="showModal" :name="userName" @close="closeModal" />
        </div>
      </form>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
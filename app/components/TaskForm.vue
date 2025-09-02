<script setup lang="ts">
import { ref, watch } from 'vue'

const todoStore = useTodoStore()

interface Attachment {
  name: string
  size: string
  type: string
}

const props = defineProps<{
  open: boolean
  onClose: () => void
}>()

// Success modal
const showModal = ref(false)
const userName = 'Pamela'

const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)

// Form state
const date = ref("2025-03-24") // YYYY-MM-DD for input[type=date]
const priority = ref<string>("")
const category = ref<string>("")
const description = ref("")
const title = ref("")

const priorities = [
  { label: "High Priority", value: "high", color: "text-red-500" },
  { label: "Mid Priority", value: "mid", color: "text-green-500" },
  { label: "Low Priority", value: "low", color: "text-yellow-500" }
]

const categories = [
  { label: "Personal", value: "personal" },
  { label: "Work", value: "work" }
]

// Reset form
const resetForm = () => {
  title.value = ""
  date.value = ''
  subtasks.value = [{ title: '', isDone: false }]
  priority.value = ""
  category.value = ""
  description.value = ""
}

// const subtasks = ref<string[]>([])
const subtasks = ref<{ title: string; isDone: boolean }[]>([
  { title: '', isDone: false }
])

//  const structuredSubtasks = subtasks.value
//     .filter(task => task.trim()) // remove empty ones
//     .map(task => ({
//       title: task,
//       isDone: false
//     }))

// Submit form
const handleSubmit = () => {
  if (!title.value.trim()) {
    alert("Please enter a title for the task")
    return
  }

  if (!priority.value || !category.value) {
    alert("Please select priority and category")
    return
  }

  //  const structuredSubtasks = subtasks.value
  //   .filter(s => s.trim()) // only keep non-empty
  //   .map(title => ({ title, isDone: false }))

    const structuredSubtasks = subtasks.value
    .filter(s => s.title.trim()) // Remove empty titles
    .map(s => ({
      title: s.title.trim(),
      isDone: s.isDone
    }))

  const newTodo = {
    id: Date.now(),
    title: title.value,
    description: description.value,
    priority: priority.value,
    category: category.value,
    date: date.value,
    isCompleted: false,
    createdAt: new Date().toISOString(),
    subtasks: structuredSubtasks 
  }

  console.log('subtasks:', subtasks.value)

  todoStore.addTodo(newTodo)
  resetForm()
  openModal()

}

// sub tasks
// const subtasks = ref(['', '', ''])

// const addSubtask = () => {
//   subtasks.value.push('')
// }

const addSubtask = () => {
  subtasks.value.push({ title: '', isDone: false })
}

</script>


<template>
  <!-- Overlay -->
  <transition name="fade">
    <div
      v-if="props.open"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      @click="props.onClose"
    />
  </transition>

  <!-- Sidebar -->
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
          <div class="p-6 text-[#37404E] text-[14px] font-semibold">
              What needs to be done?
              <input v-model="title" type="text" class="bg-[#E6E6E61A] border border-[#E6E6E680] rounded-[8px] p-3 mt-2 w-full text-[#37404E] text-[12px] accent-[#718096CC] accent-text-[10px] font-normal focus:outline-none" placeholder="Input Task title">
          </div>
  
          <!-- Top row -->
          <div class="flex flex-col md:flex-row gap-4 p-6">
            <!-- Date -->
            <div>
              <label class="block text-[#37404E] text-[14px] font-semibold mb-2">Date</label>
              <!-- <div class="flex items-center justify-between border rounded-lg"> -->
                <input type="date" class="px-4 py-2 md:px-6 md:py-3 accent-text-[#718096CC] bg-[#E6E6E61A] border border-[#E6E6E680] rounded-lg text-[#37404E] text-[10px] font-normal focus:outline-none" v-model="date">
                <!-- <span class="text-gray-400"><Icon name="heroicons:calendar" class="w-4 h-4" /></span> -->
              <!-- </div> -->
            </div>
  
              <!-- Priority -->
            <div>
              <label class="block text-[#37404E] text-[14px] font-semibold mb-2">Priority</label>
              <select
                v-model="priority"
                class="w-full bg-[#E6E6E61A] border border-[#E6E6E680] rounded-lg px-4 py-2 md:px-6 md:py-3 accent-text-[#718096CC] text-[#37404E] text-[10px] font-normal focus:outline-none"
              >
                <option disabled selected value="">How important?</option>
                <option
                  v-for="item in priorities"
                  :key="item.value"
                  :value="item.value"
                  :class="item.color"
                >
                  {{ item.label }}
                </option>
              </select>
            </div>
  
            <!-- Category -->
            <div>
              <label class="block text-[#37404E] text-[14px] font-semibold mb-2">Category</label>
              <select
                v-model="category"
                class="w-full bg-[#E6E6E61A] border border-[#E6E6E680] rounded-lg px-4 py-2 md:px-6 md:py-3 accent-text-[#718096CC] text-[#37404E] text-[10px] font-normal focus:outline-none"
              >
                <option disabled value="">What type of task?</option>
                <option
                  v-for="item in categories"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </option>
              </select>
            </div>
           
          </div>
        
           <!-- Content -->
           <div class="p-6 overflow-y-auto flex-1">
  
             <!-- Separator -->
             <div class="-mx-6 w-[calc(100%+3rem)] h-px bg-[#E6E6E673] mt-6 mb-12"></div>
     
             <!-- Description -->
             <div>
               <h3 class="font-semibold text-[#37404E] text-[14px] mb-2">Add description</h3>
               <textarea v-model="description" placeholder="Add a task description" class="border border-[#E6E6E680] rounded-[8px] px-3 py-4 w-full text-[#37404E] text-[12px] font-normal focus:outline-none"></textarea>
             </div>
  
              <!-- Separator -->
             <div class="-mx-6 w-[calc(100%+3rem)] h-px bg-[#E6E6E673] mt-6 mb-12"></div>
     
             <!-- sub task -->
              <div class="bg-white p-4 rounded-lg border border-gray-100 flex justify-between items-start">
                <div class="flex-1">
                  <!-- Title -->
                  <h3 class="font-medium text-gray-800 text-sm mb-3">
                    Add Subtasks <span class="font-light text-gray-500 text-xs">(Optional)</span>
                  </h3>

                  <!-- Subtasks list -->
                  <div class="space-y-3">
                    <div v-for="(subtask, index) in subtasks" :key="index" class="flex items-center gap-3">
                      <!-- Checkbox -->
                      <input
                      v-model="subtask[index]?.isDone"
                        type="checkbox"
                        class="w-4 h-4 rounded border-gray-300 accent-[#0D1CF2]"
                      />
                      <!-- Underline input -->
                      <input
                        v-model="subtask[index]?.title"
                        type="text"
                        placeholder=""
                        class="flex-1 border-b border-gray-200 focus:outline-none focus:border-gray-400 text-sm text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                <!-- Add button -->
                <button
                type="button"
                  @click="addSubtask"
                  class="ml-4 flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100"
                >
                  <Icon name="heroicons:plus" class="w-4 h-4" />
                </button>
              </div>
  
             <!-- button -->
             <div class="flex justify-end mt-6">
               <!-- <button @click="openModal" type="submit" class="text-[#ffffff] bg-[#0513D1] rounded-[5px] py-2 px-4"> -->
               <button type="submit" class="text-[#ffffff] bg-[#0513D1] rounded-[5px] py-2 px-4">
                 Create Task
               </button>
             </div>
  
             <!-- Modal Component -->
            <SuccessModal :show="showModal" :name="userName" @close="closeModal" />
  
           </div>
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

.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
</style>

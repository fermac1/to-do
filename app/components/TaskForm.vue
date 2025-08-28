<script setup lang="ts">
import { ref, watch } from 'vue'

interface Attachment {
  name: string
  size: string
  type: string
}

const props = defineProps<{
  open: boolean
  onClose: () => void
}>()

// Demo attachments
const attachments: Attachment[] = [
  { name: "Homepage_Design_V2.pdf", size: "2.4MB", type: "pdf" },
  { name: "Homepage_Design_V2.jpeg", size: "2.4MB", type: "jpeg" }
]

// success modal
const showModal = ref(false)
const userName = 'Pamela'

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

// end success modal

const date = ref("March 24th 2025")
const priority = ref<string | null>(null)
const category = ref<string | null>(null)
const description = ref("")

const priorities = [
  { label: "High Priority", value: "high", color: "text-red-500" },
  { label: "Mid Priority", value: "mid", color: "text-green-500" },
  { label: "Low Priority", value: "low", color: "text-yellow-500" }
]

const categories = [
  { label: "Personal", value: "personal" },
  { label: "Work", value: "work" }
]

const showPriority = ref(false)
const showCategory = ref(false)

const selectPriority = (item: typeof priorities[number]) => {
  priority.value = item.label
  showPriority.value = false
}

const selectCategory = (item: typeof categories[number]) => {
  category.value = item.label
  showCategory.value = false
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
      <div class="flex justify-end p-6">
        <button @click="props.onClose" class="text-[#010101] bg-[#7180961A] rounded-xl py-1 px-3">
          <Icon name="heroicons:x-mark" class="w-4 h-4 font-bold" />
        </button>
      </div>

      <div class="border border-[#E6E6E673] rounded-[12px] overflow-y-auto">
        <div class="p-6 text-[#37404E] text-[14px] font-semibold">
            What needs to be done?
            <input type="text" class="border border-[#E6E6E680] rounded-[8px] px-3 py-4 mt-2 w-full text-[#718096] accent-[#718096CC] accent-text-[10px] font-normal" placeholder="Input Task title">
        </div>

        <!-- Top row -->
        <div class="flex flex-col md:flex-row gap-4 p-6">
          <!-- Date -->
          <div>
            <label class="block text-[#37404E] text-[14px] font-semibold mb-2">Date</label>
            <div class="flex items-center justify-between border rounded-lg px-3 py-2 text-gray-700">
              <input type="date">
              <!-- <span class="text-gray-400"><Icon name="heroicons:calendar" class="w-4 h-4" /></span> -->
            </div>
          </div>

            <!-- Priority -->
          <div>
            <label class="block text-[#37404E] text-[14px] font-semibold mb-2">Priority</label>
            <select
              v-model="priority"
              class="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              class="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
             <h3 class="font-bold text-[#37404E] text-[16px] mb-2">Add description</h3>
             <textarea placeholder="Add a task description" class="border border-[#E6E6E680] rounded-[8px] px-3 py-4 w-full text-[#718096CC] text-[12px] font-normal"></textarea>
           </div>

            <!-- Separator -->
           <div class="-mx-6 w-[calc(100%+3rem)] h-px bg-[#E6E6E673] mt-6 mb-12"></div>
   
   
           <!-- Subtasks -->
           <!-- <div>
             <h3 class="font-medium text-[#37404E] text-[14px] font-semibold mb-2">Add Subtasks <span class="font-light text-[#37404E] text-[10px]">(Optional)</span></h3>
             <div class="space-y-2">
               <label class="flex items-center gap-2 text-[#37404E] text-[11px] font-light">
                 <input type="checkbox" checked class="rounded border-gray-300 bg-[#0D1CF2] text-[#ffffff]" />
                 
               </label>
               <label class="flex items-center gap-2 text-[#37404E] text-[11px] font-light">
                 <input type="checkbox" class="rounded border-gray-300 bg-[#0D1CF2] text-[#ffffff]" />
                 
               </label>
               <label class="flex items-center gap-2 text-[#37404E] text-[11px] font-light">
                 <input type="checkbox" class="rounded border-gray-300 bg-[#0D1CF2] text-[#ffffff]" />
              
               </label>
             </div>
           </div> -->
   
           <SubtaskInput />

           <!-- button -->
           <div class="flex justify-end mt-6">
             <button @click="openModal" class="text-[#ffffff] bg-[#0513D1] rounded-[5px] py-2 px-4">
               Create Task
             </button>
           </div>

           <!-- Modal Component -->
          <SuccessModal :show="showModal" :name="userName" @close="closeModal" />

         </div>
      </div>
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

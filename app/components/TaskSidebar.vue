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
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>

      <div class="border border-[#E6E6E673] rounded-[12px]">
          <div class="flex justify-between items-start p-6">
           <div>
             <h2 class="text-[20px] text-[#37404E] font-semibold">User Research</h2>
             <div class="flex gap-2 mt-2">
               <span class="px-2 py-1 text-sm bg-yellow-100 text-yellow-700 rounded">In Progress</span>
               <span class="px-2 py-1 text-sm bg-pink-100 text-pink-700 rounded">Personal</span>
             </div>
           </div>
         </div>
   
         <!-- Content -->
         <div class="p-6 overflow-y-auto space-y-6 flex-1">
           <!-- Task Info -->
           <div class="flex items-center justify-between">
             <div class="flex items-center gap-2">
               <span class="text-gray-500">Due date</span>
               <span class="font-medium">March 25, 2025</span>
             </div>
             <span class="px-3 py-1 text-sm bg-red-100 text-red-700 rounded">High Priority</span>
           </div>
   
           <!-- Description -->
           <div>
             <h3 class="font-medium mb-2">Description</h3>
             <p class="text-gray-600 leading-relaxed">
               We need to implement the new homepage design according to the approved mockups. 
               This includes We need to implement the new homepage design according to the approved mockups. 
               This includes We need to implement the new homepage design according to the approved mockups.
             </p>
           </div>
   
           <!-- Subtasks -->
           <div>
             <h3 class="font-medium mb-2">Add Subtasks (Optional)</h3>
             <div class="space-y-2">
               <label class="flex items-center gap-2">
                 <input type="checkbox" checked class="rounded border-gray-300 text-indigo-600" />
                 About us page
               </label>
               <label class="flex items-center gap-2">
                 <input type="checkbox" class="rounded border-gray-300 text-indigo-600" />
                 Home page
               </label>
               <label class="flex items-center gap-2">
                 <input type="checkbox" class="rounded border-gray-300 text-indigo-600" />
                 Blog page
               </label>
             </div>
           </div>
   
           <!-- Attachments -->
           <div>
             <h3 class="font-medium mb-2">Attachment</h3>
             <div class="flex gap-4">
               <div
                 v-for="file in attachments"
                 :key="file.name"
                 class="p-4 border rounded-lg flex flex-col items-center w-40 text-center"
               >
                 <span class="text-3xl">📄</span>
                 <span class="mt-2 text-sm font-medium truncate">{{ file.name }}</span>
                 <span class="text-xs text-gray-500">{{ file.size }}</span>
               </div>
             </div>
           </div>
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

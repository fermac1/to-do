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

      <div class="border border-[#E6E6E673] rounded-[12px] overflow-y-auto">
          <div class="p-6">
            <div class="space-x-6">
             <span class="text-[20px] text-[#37404E] font-semibold">User Research</span>
             <span class="px-4 py-1 bg-[#ECC94B40] text-[#A78406] text-[12px] font-normal rounded-full">In Progress</span>
             <span class="px-2 py-1 bg-pink-100 text-pink-700 text-[12px] font-normal rounded-full">Personal</span>
            </div>
             <p class="text-[#37404E] text-[12px] font-light">Task #1</p>
         </div>
   
         <!-- Content -->
         <div class="p-6 overflow-y-auto space-y-6 flex-1">
           <!-- Task Info -->
           <div class="flex items-center">
             <div class="flex items-center gap-2 mr-4">
                <span class="bg-[#E0E7FF] px-2 py-1 border border-[#E5E7EB] rounded-full"><Icon name="iconamoon:clock" class="text-[#4F46E5]"/></span>
                
                <div class="text-[12px]">
                    <p class="text-[#6B7280] font-light">Due date</p>
                    <p class="font-medium text-[#000000]">March 25, 2025</p>
                </div>
             </div>
             <div class="flex items-center gap-2">
                <span class="bg-[#F8CECE] px-2 py-1 border border-[#E5E7EB] rounded-full"><Icon name="heroicons:flag-16-solid" class="text-[#FB0404]" /></span>
                <div class="text-[12px]">
                    <p class="text-[#6B7280] font-light">Priority</p>
                    <p class="font-medium text-[#000000]">High Priority</p>
                </div>
             </div>
           </div>

           <div class="-mx-6 w-[calc(100%+3rem)] h-px bg-[#E6E6E673] mt-20 mb-12"></div>
   
           <!-- Description -->
           <div>
             <h3 class="font-bold text-[#37404E] text-[16px] mb-2">Description</h3>
             <p class="text-[#37404E] text-[12px] font-light leading-relaxed">
               We need to implement the new homepage design according to the approved mockups. 
               This includes We need to implement the new homepage design according to the approved mockups. 
               This includes We need to implement the new homepage design according to the approved mockups.
             </p>
           </div>
   
           <!-- Subtasks -->
           <div>
             <h3 class="font-medium text-[#37404E] text-[14px] font-semibold mb-2">Add Subtasks <span class="font-light text-[#37404E] text-[10px]">(Optional)</span></h3>
             <div class="space-y-2">
               <label class="flex items-center gap-2 text-[#37404E] text-[11px] font-light">
                 <input type="checkbox" checked class="rounded border-gray-300 bg-[#0D1CF2] text-[#ffffff]" />
                 About us page
               </label>
               <label class="flex items-center gap-2 text-[#37404E] text-[11px] font-light">
                 <input type="checkbox" class="rounded border-gray-300 bg-[#0D1CF2] text-[#ffffff]" />
                 Home page
               </label>
               <label class="flex items-center gap-2 text-[#37404E] text-[11px] font-light">
                 <input type="checkbox" class="rounded border-gray-300 bg-[#0D1CF2] text-[#ffffff]" />
                 Blog page
               </label>
             </div>
           </div>
   
           <!-- Attachments -->
           <div>
             <h3 class="font-medium mb-2">Attachment</h3>
             <div class="flex gap-10">
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

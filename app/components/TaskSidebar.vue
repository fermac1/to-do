<script setup lang="ts">
import { useRoute } from 'vue-router';

const todoStore = useTodoStore()

const route = useRoute()

const { todos } = storeToRefs(todoStore)

const todoId = Number(route.params.id);

const todo = computed(()=>todos.value.find((t) => t.id === Number(route?.params?.id)))


interface Attachment {
  name: string
  size: string
  type: string
}

interface Item {
   id: number
  title: string
  description: string
  dueDate: string
  priority: string
  // category: string
  status: string
  tags: string[]
  completed: boolean
  progress: number
  subtasks?: Array<{
        id: number
        title: string
        isDone: boolean
      }>
}

const props = defineProps<{
  open: boolean
  onClose: () => void,
  item: Item | null 
}>()


// Demo attachments
const attachments: Attachment[] = [
  { name: "Homepage_Design_V2.pdf", size: "2.4MB", type: "pdf" },
  { name: "Homepage_Design_V2.jpeg", size: "2.4MB", type: "jpeg" }
]

// priority colors
const priorityColorMap: Record<string, { bg: string; text: string, border: string }> = {
  High: {
    border: 'border-[#FB0404]',
    bg: 'bg-[#FAE5E5]',
    text: 'text-[#FB0404]'
  },
  Mid: {
    border: 'border-[#48BB78]',
    bg: 'bg-[#EBF5EF]',
    text: 'text-[#389F63]'
  },
  Low: {
    border: 'border-[#ECBD13]',
    bg: 'bg-[#F9F5E6]',
    text: 'text-[#CAA10C]'
  }
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
          <Icon name="heroicons:x-mark" class="w-4 h-4" />
        </button>
      </div>

      <div class="border border-[#E6E6E673] rounded-[12px] overflow-y-auto">
          <div class="p-6">
            <div class="space-x-6">
             <span class="text-[20px] text-[#37404E] font-semibold">{{ props?.item?.title }}</span>
             <span class="px-4 py-1 bg-[#ECC94B40] text-[#A78406] text-[12px] font-normal rounded-full">{{ props?.item?.status }}</span>
             <!-- <span class="px-2 py-1 bg-pink-100 text-pink-700 text-[12px] font-normal rounded-full">{{ props?.item?.category }}</span> -->
             <span class="px-2 py-1 bg-pink-100 text-pink-700 text-[12px] font-normal rounded-full">{{ props?.item?.tags[0] }}</span>
            </div>
             <p class="text-[#37404E] text-[12px] font-light">#{{ props?.item?.id }}</p>
         </div>
   
         <!-- Content -->
         <div class="p-6 overflow-y-auto space-y-6 flex-1">
           <!-- Task Info -->
           <div class="flex items-center">
             <div class="flex items-center gap-2 mr-4">
                <span class="bg-[#E0E7FF] px-2 py-1 border border-[#E5E7EB] rounded-full"><Icon name="iconamoon:clock" class="text-[#4F46E5]"/></span>
                
                <div class="text-[12px]">
                    <p class="text-[#6B7280] font-light">Due date</p>
                    <p class="font-medium text-[#000000]">{{ props?.item?.dueDate }}</p>
                </div>
             </div>
            <div class="flex items-center gap-2" v-if="props?.item?.priority">
              <!-- Icon with dynamic background and text color -->
              <span
                :class="[
                  'px-2 py-1 border rounded-full',
                  priorityColorMap[props?.item?.priority]?.bg,
                  'border-[#E5E7EB]'
                ]"
              >
                <Icon
                  name="heroicons:flag-16-solid"
                  :class="[priorityColorMap[props?.item?.priority]?.text]"
                />
              </span>


              <!-- Text -->
              <div class="text-[12px]">
                <p class="text-[#6B7280] font-light">Priority</p>
                <p class="font-medium text-[#000000] capitalize">
                  {{ props?.item?.priority }} Priority
                </p>
              </div>
            </div>

           </div>

           <div class="-mx-6 w-[calc(100%+3rem)] h-px bg-[#E6E6E673] mt-20 mb-12"></div>
   
           <!-- Description -->
           <div>
             <h3 class="font-bold text-[#37404E] text-[16px] mb-2">Description</h3>
             <p class="text-[#37404E] text-[12px] font-light break-words whitespace-normal">{{ props?.item?.description }}</p>
           </div>
   
           <!-- Subtasks -->
           <!-- <div v-if="props?.item?.subtasks?.length > 0">
             <h3 class="font-medium text-[#37404E] text-[14px] font-semibold mb-2">Add Subtasks <span class="font-light text-[#37404E] text-[10px]">(Optional)</span></h3>
             <div class="space-y-2">
               <label class="flex items-center gap-2 text-[#37404E] text-[11px] font-light" v-for="todoTask in props?.item?.subtasks" :key="todoTask">
                 <input type="checkbox" checked class="rounded border-gray-300 bg-[#0D1CF2] text-[#ffffff]" />
                {{ todoTask }}
               </label>
               
             </div>
           </div> -->

           
            <div v-if="props?.item?.subtasks?.length">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Subtasks</h4>
              <ul class="space-y-1">
                <li
                  v-for="(subtask, index) in props?.item?.subtasks"
                  :key="index"
                  class="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    v-model="subtask.isDone"
                    class="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span
                    :class="{ 'line-through text-gray-400': subtask?.isDone }"
                    class="text-sm text-gray-700"
                  >
                    {{ subtask.title }}
                  </span>
                </li>
              </ul>
            </div>

            <div v-else>
              <p class="text-sm text-gray-500">No subtasks available.</p>
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

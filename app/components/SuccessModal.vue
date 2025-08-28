<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  show: boolean
  name: string
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="show" class="shadow fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <div class="bg-white rounded-xl shadow-lg p-8 text-center w-[400px] relative">
      
      <!-- Close button -->
      <button
        @click="emit('close')"
        class="absolute top-4 right-4 bg-[#7180961A] rounded-[12px] px-2 py-1"
      >
        <Icon name="heroicons:x-mark" class="w-6 h-6 text-[#010101]" />
      </button>

      <!-- Icon -->
      <div class="flex justify-center mb-4">
       <img src="/images/success.png" alt="">
      </div>

      <!-- Title -->
      <h2 class="text-[22px] font-bold text-[#37404E] mb-2">
        Well done {{ name }}
      </h2>

      <!-- Description -->
      <p class="text-[#37404E] font-semibold text-[14px] mb-10">your task has been successfully created</p>
    </div>
  </div>
</template>

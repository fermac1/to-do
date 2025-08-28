<script setup lang="ts">
import { ref } from 'vue'

const subtasks = ref(['', '', ''])

const addSubtask = () => {
  subtasks.value.push('')
}
</script>

<template>
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
            type="checkbox"
            class="w-4 h-4 rounded border-gray-300 accent-[#0D1CF2]"
          />
          <!-- Underline input -->
          <input
            v-model="subtasks[index]"
            type="text"
            placeholder=""
            class="flex-1 border-b border-gray-200 focus:outline-none focus:border-gray-400 text-sm text-gray-700"
          />
        </div>
      </div>
    </div>

    <!-- Add button -->
    <button
      @click="addSubtask"
      class="ml-4 flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100"
    >
      <Icon name="heroicons:plus" class="w-4 h-4" />
    </button>
  </div>
</template>

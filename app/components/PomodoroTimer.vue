<template>
  <div class="flex flex-col items-center font-plusJakartaSans">
    <!-- Header -->
    <div class="flex flex-wrap md:flex-nowrap justify-between w-full max-w-md mb-4">
      <span class="text-[#2E2E2E] font-extrabold text-[12px]">Pomodoro Timer</span>

      <!-- Start Button -->
      <span
        class="border rounded-[6px] border-[#EBEEF5] text-[#626262] text-[11px] font-semibold px-3 py-1 cursor-pointer bg-[#F3F4FC]">
        <button @click="startTimer" :disabled="isRunning">Start</button>
      </span>

      <!-- Finish Button -->
      <span
        class="border rounded-[6px] border-[#EBEEF5] text-[#ffffff] text-[11px] font-semibold px-3 py-1 cursor-pointer bg-[#00043D]">
        <button @click="finishTimer">Finish</button>
      </span>
    </div>

    <!-- Circular Timer -->
    <div class="relative w-52 h-52 mt-4">
      <svg class="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
        <!-- Gradient Definition -->
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#000CB0" />
            <stop offset="100%" stop-color="#B1B5F1" />
          </linearGradient>
        </defs>

        <!-- Background Circle -->
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="#E5E7EB"
          stroke-width="4"
          fill="none"
        />

        <!-- (Optional) Progress circle — can animate or leave as static -->
        <!-- <circle
        v-if="elapsedSeconds > 0"
          cx="50"
          cy="50"
          r="45"
          stroke="url(#progressGradient)"
          stroke-width="4"
          fill="none"
          stroke-dasharray="100"
          :stroke-dashoffset="100 - (elapsedSeconds % 60)"
          stroke-linecap="round"
        /> -->

        <!-- Progress Circle without round cap -->
        <circle
        cx="50"
        cy="50"
        r="45"
        :stroke="'url(#progressGradient)'"
        stroke-width="4"
        fill="none"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="circumference - (elapsedSeconds % totalTime)"
        />

        <!-- Custom Moving Dot -->
        <!-- <circle
        :cx="dotX"
        :cy="dotY"
        r="2"
        fill="#4F46E5"
        /> -->

      </svg>

      <!-- Timer Display -->
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <div class="text-xs bg-gray-100 px-3 py-1 rounded-full mb-2 text-[#00043D]">
          {{ readableTime }}
        </div>
        <div class="text-2xl font-bold text-[#00043D]">{{ formattedTime }}</div>

        <!-- Controls -->
        <div class="flex mt-4 gap-4">
          <button
            v-if="isRunning"
            @click="pauseTimer"
            class="border border-[#E6E6E6D9] rounded-full px-2 py-1"
          >
            <Icon name="material-symbols-light:pause-rounded" />
          </button>

          <button
            v-else-if="isPaused"
            @click="resumeTimer"
            class="border border-[#E6E6E6D9] rounded-full px-2 py-1"
          >
            <Icon name="line-md:play-filled" />
          </button>

          <button
            @click="resetTimer"
            class="border border-[#E6E6E6D9] rounded-full px-2 py-1"
          >
            <Icon name="material-symbols-light:restart-alt-rounded" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'

const elapsedSeconds = ref(0)
const isRunning = ref(false)
const isPaused = ref(false)
let timerInterval: number | null = null

const formattedTime = computed(() => {
  const hours = Math.floor(elapsedSeconds.value / 3600)
  const minutes = Math.floor((elapsedSeconds.value % 3600) / 60)
  const seconds = elapsedSeconds.value % 60
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
})

const readableTime = computed(() => {
  const total = elapsedSeconds.value

  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60

  if (total === 0) return '0 sec'

  const parts = []

  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`)
  if (minutes > 0) parts.push(`${minutes} min${minutes > 1 ? 's' : ''}`)
  if (hours === 0 && minutes === 0 && seconds > 0) parts.push(`${seconds} sec${seconds > 1 ? 's' : ''}`)

  return parts.join(' ')
})


function pad(num: number): string {
  return num.toString().padStart(2, '0')
}

function startTimer() {
  if (isRunning.value) return
  isRunning.value = true
  isPaused.value = false
  timerInterval = window.setInterval(() => {
    elapsedSeconds.value++
  }, 1000)
}

function pauseTimer() {
  if (timerInterval) clearInterval(timerInterval)
  isRunning.value = false
  isPaused.value = true
}

function resumeTimer() {
  startTimer()
}

function resetTimer() {
  if (timerInterval) clearInterval(timerInterval)
  elapsedSeconds.value = 0
  isRunning.value = false
  isPaused.value = false
}

function finishTimer() {
  if (timerInterval) clearInterval(timerInterval)
  isRunning.value = false
  isPaused.value = false
}

onBeforeUnmount(() => {
  if (timerInterval) clearInterval(timerInterval)
})


const totalTime = 60
const circumference = 2 * Math.PI * 45
// const dashOffset = computed(() => {
//   if (elapsedSeconds.value === 0) return circumference
//   return circumference * (1 - (elapsedSeconds.value % totalTime) / totalTime)
// })


// const angle = computed(() => 2 * Math.PI * (elapsedSeconds.value % totalTime) / totalTime)
// const dotX = computed(() => 50 + 45 * Math.cos(angle.value - Math.PI / 2))
// const dotY = computed(() => 50 + 45 * Math.sin(angle.value - Math.PI / 2))

</script>

<style scoped>
circle {
  transition: stroke-dashoffset 1s linear;
}
</style>

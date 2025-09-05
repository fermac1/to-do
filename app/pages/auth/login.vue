<template>
  <div class="w-full max-w-md bg-[#ffffff] rounded-xl p-8 shadow-sm font-plusJakartaSans">
    <h2 class="text-20px md:text-[24px] text-[#222A13] font-bold mb-2">Welcome back!</h2>
    <p class="text-[#485465] text-[12px] font-medium mb-6">Continue from where you left off</p>

    <form class="space-y-4" @submit.prevent="handleLogin">
      <!-- <div>
        <label class="block text-[10px] text-[#010101] uppercase font-semibold mb-1">Email Address</label>
        <input type="email" placeholder="Enter your email address"
               class="w-full border border-[#71809626] text-[#71809673] text-[14px] font-medium rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00065C]"
               v-model="email" />
      </div> -->

      <div>
        <label class="block text-[10px] text-[#010101] uppercase font-semibold mb-1">User name</label>
        <input type="username" placeholder="Enter your full name"
               class="w-full border border-[#71809626] accent-[#71809673] text-[#010101] text-[14px] font-medium rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00065C]"
               v-model="email" />
      </div>

      <div>
        <label class="block text-[10px] text-[#010101] uppercase font-semibold mb-1">Password</label>
        <input type="password" placeholder="Enter a password"
               class="w-full border border-[#71809626] accent-[#71809673] text-[#010101] text-[14px] font-medium rounded-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00065C]" 
               v-model="password"/>
      </div>

       <!-- Error message -->
      <p v-if="errorMessage" class="text-red-500 text-sm font-medium">
        {{ errorMessage }}
      </p>

      <button type="submit"
              class="w-full text-[14px] font-medium bg-[#00065C] text-[#ffffff] py-3 rounded-[48px] hover:bg-[#00066C] transition">
        Sign In
      </button>
    </form>

    <p class="text-center font-light text-[12px] mt-4">
      Do not have an account?
      <a href="/auth/signup" class="text-[#00065C] font-bold">Sign Up</a>
    </p>
  </div>
</template>


<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout'
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('') 

const handleLogin = () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in both fields.'
    return
  }

  // Save credentials to store (or just email, for practical reasons)
  userStore.setCredentials(email.value, password.value)

  // Redirect
  router.push('/dashboard')
}
</script>

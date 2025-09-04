// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    email: '',
    password: '',
  }),
  actions: {
    setCredentials(email: string, password: string) {
      this.email = email
      this.password = password
    }
  }
})

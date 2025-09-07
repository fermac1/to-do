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
    },
      
        // Clear user state (logout)
    logout() {
        this.email = ''
        this.password = ''
    }
  
  },
  persist: true 
})

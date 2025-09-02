import { defineStore } from 'pinia'
import SecureLS from 'secure-ls'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Array<{
      id: number
      title: string
      description: string
      priority: string
      category: string
      date: string
      isCompleted: boolean
      createdAt: string
      subtasks?: Array<{
        id: number
        title: string
        completed: boolean
      }>
    }>
  }),

  getters: {
    getTodoById: (state) => (id: number) => state.todos.find((todo) => todo.id === id)
  },

  actions: {
    addTodo(todo: {
      id: number
      title: string
      description: string
      priority: string
      category: string
      date: string
      isCompleted: boolean
      createdAt: string
      subtasks?: Array<{ id: number; title: string; completed: boolean }>
    }) {
      this.todos.push(todo)
    },

    clearTodos() {
      this.todos = []
    },

    deleteTodo(id: number) {
      this.todos = this.todos.filter(todo => todo.id !== id)
    }
  },

  persist: {
    storage: {
        getItem: (key) => {
            return new SecureLS({
                encodingType: 'des',
                encryptionSecret: '@#987asdui@'
            }).get(key);
        },
        setItem: (key, value) => {
            return new SecureLS({
                encodingType: 'des',
                encryptionSecret: '@#987asdui@'
            }).set(key, value);
        }
    }
}
     
})

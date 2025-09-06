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
    }>,
    searchTerm: ''
  }),

  getters: {
    getTodoById: (state) => (id: number) => state.todos.find((todo) => todo.id === id),
    filteredTodos(state) {
      if (!state.searchTerm) return state.todos
      return state.todos.filter(todo =>
        todo.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    },

    // stats
    totalTasks(state) {
      return state.todos.length
    },

    completedTasks(state) {
      return state.todos.filter(todo => {
        if (todo.subtasks?.length) {
          const completed = todo.subtasks.filter(s => s.completed).length
          return completed === todo.subtasks.length
        }
        return todo.isCompleted
      }).length
    },

    inProgressTasks(state) {
      return state.todos.filter(todo => {
        if (todo.subtasks?.length) {
          const completed = todo.subtasks.filter(s => s.completed).length
          return completed > 0 && completed < todo.subtasks.length
        }
        return !todo.isCompleted
      }).length
    },

    pendingTasks(state) {
      return state.todos.filter(todo => {
        if (todo.subtasks?.length) {
          const completed = todo.subtasks.filter(s => s.completed).length
          return completed === 0
        }
        return !todo.isCompleted
      }).length
    },

    isToday: () => (dateStr: string) => {
      const today = new Date()
      const taskDate = new Date(dateStr)
      return (
        taskDate.getDate() === today.getDate() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear()
      )
    },

    isThisWeek: () => (dateStr: string) => {
      const today = new Date()
      const taskDate = new Date(dateStr)
      const startOfWeek = new Date(today)
      startOfWeek.setDate(today.getDate() - today.getDay())

      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      // zero out the time part to avoid false negatives
      startOfWeek.setHours(0, 0, 0, 0)
      endOfWeek.setHours(23, 59, 59, 999)

      return taskDate >= startOfWeek && taskDate <= endOfWeek
    },

    dailyTasks(state): number {
      return state.todos.filter(todo => this.isToday(todo.date)).length
    },

    weeklyTasks(state): number {
      return state.todos.filter(todo => this.isThisWeek(todo.date)).length
    },

    overdueTasks(state): number {
      const now = new Date()
      now.setHours(0, 0, 0, 0) // Only compare date part

      return state.todos.filter(todo => {
        const taskDate = new Date(todo.date)
        taskDate.setHours(0, 0, 0, 0)
        return taskDate < now && !todo.isCompleted
      }).length
    }

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
    },

    updateTodo(updateTodo: { id: number, title: string, description: string, isCompleted: boolean, createdAt: string }) {
          const index = this.todos.findIndex((todo) => todo.id === updateTodo.id)

          if (index !== -1) {
              this.todos[index] = updateTodo;
          }
    },
    
    setSearchTerm(term: string) {
      this.searchTerm = term
    },

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

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

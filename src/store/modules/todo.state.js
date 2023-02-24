import { v4 as uuidv4 } from "uuid"

// initial state
const state = () => ({
  todos: [],
})

const getters = {
  containsText: (state) => (filterText) => {
    return state.todos.filter((task) => task.name.indexOf(filterText) !== -1)
  },
}

const actions = {}

const mutations = {
  create: (state, newItem) => {
    state.todos.push({
      id: uuidv4(),
      name: newItem.name,
      completed: false,
      editMode: false,
      priority: newItem.priority,
      createdAt: new Date().getTime(),
      updatedAt: null,
      completeBy: newItem.completeBy,
      bgColor: newItem.bgColor,
    })
  },
  toggleStatus(state, taskId) {
    const selectedTask = state.todos.find((task) => task.id === taskId)
    selectedTask.completed = !selectedTask.completed
  },
  toggleEdit(state, taskId) {
    const selectedTask = state.todos.find((task) => task.id === taskId)
    selectedTask.editMode = !selectedTask.editMode
  },
  delete(state, taskId) {
    state.todos = state.todos.filter((task) => task.id !== taskId)
  },
  update(state, updatedTask) {
    const taskId = updatedTask.id
    const selectedTask = state.todos.find((task) => task.id === taskId)
    Object.assign(selectedTask, updatedTask)
  },
}

export const todoStore = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

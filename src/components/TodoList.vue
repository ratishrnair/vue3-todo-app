<script setup>
import { onMounted, watch, ref } from "vue"
import { useStore } from "vuex"

import TodoInput from "./TodoInput.vue"
import TodoItem from "./TodoItem.vue"

import { useTodoList } from "../composables/useTodoList"

const store = useStore()
const searchText = ref("")
const { setFilter, todos, setFilterText } = useTodoList()

onMounted(() => {
  todos.value.forEach((element) => {
    element.editMode = false
  })
})

watch(searchText, (newVal) => {
  if (newVal) {
    setFilter("containsText")
    setFilterText(newVal)
  } else {
    setFilter("All")
  }
})
</script>

<template>
  <header class="text-center">
    <h1 class="text-5xl font-black">Todo list</h1>
    <p class="text-xl font-semibold mb-8">You have {{ todos.length }} tasks.</p>
  </header>
  <div class="todo-list w-1/2">
    <TodoInput />
    <div class="search-box mb-4" v-if="todos.length">
      <input
        type="text"
        v-model="searchText"
        placeholder="Search for a task"
        :maxlength="50"
        class="bg-gray-200 focus:bg-white border-black border-solid border-2 px-2 py-1 w-full hover:bg-white"
      />
    </div>
    <div class="list-container">
      <TodoItem v-for="todo in todos" :key="todo.id" :task="todo" />
    </div>
  </div>
</template>

<style></style>

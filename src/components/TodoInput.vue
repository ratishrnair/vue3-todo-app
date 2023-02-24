<script setup>
import { ref } from "vue"
import { useStore } from "vuex"

import ColorPicker from "./ColorPicker.vue"

const store = useStore()
const inputModel = ref("")
const priority = ref("Low")
const date = ref(new Date())
const bgColor = ref()
const colorPickerKey = ref(0)

const setBgColor = (colorItem) => {
  bgColor.value = colorItem.value
}

const resetColorPicker = () => {
  colorPickerKey.value += 1
}

function onAdd(e) {
  if (!inputModel.value) return
  const newItem = {
    name: inputModel.value,
    priority: priority.value,
    completeBy: date.value,
    bgColor: bgColor.value,
  }
  store.commit("todoStore/create", newItem)
  inputModel.value = ""
  priority.value = "Low"
  date.value = new Date()
  resetColorPicker()
  e.target.focus()
}
</script>
<template>
  <div class="todo-input border-solid mb-5 border-2 border-grey rounded-lg p-3">
    <div class="line-1 flex w-full justify-between items-start mb-4">
      <div class="line-1-left flex flex-col w-2/5 justify-start items-start">
        <label>Priority:</label>
        <select
          v-model="priority"
          class="bg-gray-200 focus:bg-white border-black border-solid border-2 px-2 py-2 w-full hover:bg-white"
        >
          <option val="Low">Low</option>
          <option val="Medium">Medium</option>
          <option val="High">High</option>
        </select>
      </div>
      <div class="line-1-right flex flex-col w-2/5 justify-start items-start">
        <label>Complete Task By:</label>
        <VueDatePicker
          v-model="date"
          :min-date="new Date()"
          :enable-time-picker="false"
          auto-apply
          class="w-full"
        />
      </div>
    </div>
    <div class="line-2 mb-4">
      <ColorPicker @setBgColor="setBgColor" :key="colorPickerKey" />
    </div>
    <div class="line-3">
      <label>Task Description:</label>
      <input
        type="text"
        v-model="inputModel"
        name="todo"
        @keyup.enter="onAdd"
        placeholder="Input task description and then press Enter"
        :maxlength="50"
        class="bg-gray-200 focus:bg-white border-black border-solid border-2 px-2 py-1 w-full mb-2 hover:bg-white"
      />
    </div>
  </div>
</template>
<style scoped>
.todo-input :deep(.dp__input) {
  background-color: rgb(229 231 235);
  border: 2px solid black;
}
</style>

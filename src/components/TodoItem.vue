<script setup>
import { computed, ref } from "vue"
import { useStore } from "vuex"

import ColorPicker from "./ColorPicker.vue"

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const store = useStore()
const taskDescription = ref("")
const taskPriority = ref("")
const taskCompleteBy = ref()
const bgColor = ref()

const setBgColor = (colorItem) => {
  bgColor.value = colorItem.value
}

taskDescription.value = props.task.name
taskPriority.value = props.task.priority
taskCompleteBy.value = props.task.completeBy

const todoItemBgColor = computed(() => {
  return props.task.bgColor
})

const taskStatus = computed({
  get() {
    return props.task.completed
  },
  set(value) {
    store.commit("todoStore/toggleStatus", props.task.id)
  },
})

function onDelete() {
  store.commit("todoStore/delete", props.task.id)
}
function onEdit() {
  store.commit("todoStore/toggleEdit", props.task.id)
}
function onSave() {
  const updatedTask = {
    name: taskDescription.value,
    priority: taskPriority.value,
    editMode: false,
    id: props.task.id,
    updatedAt: new Date().getTime(),
    completeBy: taskCompleteBy.value,
    bgColor: bgColor.value,
  }
  store.commit("todoStore/update", updatedTask)
}
</script>

<template>
  <div
    class="todo-item flex flex-col w-full justify-between items-start border-solid mb-2 border-3 border-grey-100 rounded-lg p-3"
    :style="{ backgroundColor: todoItemBgColor.colorCode }"
  >
    <div class="line-1 flex w-full justify-between items-start h-10 mb-3">
      <input
        type="checkbox"
        class="flex-none w-6 h-6 border-solid border-2 border-sky-500"
        name="task-status"
        v-model="taskStatus"
      />
      <div
        v-if="!task.editMode"
        :class="[
          task.completed ? 'line-through' : '',
          'item-text flex-none w-11/12 text-left',
        ]"
      >
        {{ task.name }}
      </div>
      <input
        v-else
        type="text"
        v-model="taskDescription"
        name="todo"
        placeholder="Enter a task"
        :maxlength="50"
        class="bg-gray-200 focus:bg-white border-black border-solid border-2 w-11/12 hover:bg-white px-2 py-1"
      />
    </div>
    <div
      class="line-2 flex w-full justify-between items-start mb-2"
      v-if="task.editMode"
    >
      <div class="line-2-left flex flex-col w-5/12 justify-start items-start">
        <label>Priority:</label>
        <select
          v-model="taskPriority"
          class="bg-gray-200 focus:bg-white border-black border-solid border-2 px-2 py-2 w-full mb-4 hover:bg-white"
        >
          <option val="Low">Low</option>
          <option val="Medium">Medium</option>
          <option val="High">High</option>
        </select>
      </div>
      <div class="line-2-right flex flex-col w-5/12 justify-start items-start">
        <label>Complete Task By:</label>
        <VueDatePicker
          v-model="taskCompleteBy"
          :min-date="new Date()"
          :enable-time-picker="false"
          auto-apply
          class="w-full"
        />
      </div>
    </div>
    <div class="line-3 mb-3 w-full" v-if="task.editMode">
      <ColorPicker @setBgColor="setBgColor" :start-color="todoItemBgColor" />
    </div>
    <div class="line-4 flex w-full justify-around items-start">
      <button
        v-if="!task.editMode"
        class="edit-btn flex-none bg-sky-600 w-14 text-white border-2 border-solid border-black"
        @click="onEdit()"
      >
        Edit
      </button>
      <button
        v-else
        class="save-btn flex-none bg-sky-600 w-14 text-white border-2 border-solid border-black"
        @click="onSave()"
      >
        Save
      </button>
      <button
        v-if="!task.editMode"
        class="delete-btn flex-none bg-red-600 w-14 text-white border-2 border-solid border-black"
        @click="onDelete()"
      >
        Delete
      </button>
      <button
        v-if="task.editMode"
        class="cancel-btn flex-none bg-red-600 w-14 text-white border-2 border-solid border-black"
        @click="onEdit()"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
<style scoped>
.todo-item :deep(.dp__input) {
  background-color: rgb(229 231 235);
  border: 2px solid black;
}
</style>

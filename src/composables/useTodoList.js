import { computed, ref } from "vue"
import { useStore } from "vuex"

export function useTodoList() {
  const store = useStore()
  const filter = ref("All")
  const filterText = ref("")

  function setFilter(value) {
    filter.value = value
  }

  function setFilterText(value) {
    filterText.value = value
  }

  const todos = computed(function () {
    switch (filter.value) {
      case "containsText": {
        return store.getters["todoStore/containsText"](filterText.value)
      }

      default: {
        const tempList = [...store.state.todoStore.todos]
        tempList.sort((a, b) => b.createdAt - a.createdAt)
        return tempList
      }
    }
  })

  return {
    todos,
    filter,
    setFilter,
    setFilterText,
  }
}

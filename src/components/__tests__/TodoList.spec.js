import { mount } from "@vue/test-utils"
import { describe, expect, test } from "vitest"
import { createStore } from "vuex"
import VueDatePicker from "@vuepic/vue-datepicker"
import TodoList from "../TodoList.vue"
import TodoItem from "../TodoItem.vue"
import ColorPicker from "../ColorPicker.vue"

import { todoStore } from "../../store/modules/todo.state"

let mockStore = createStore({
  modules: {
    todoStore,
  },
})

let wrapper = mount(TodoList, {
  global: {
    plugins: [mockStore],
    components: {
      VueDatePicker,
      ColorPicker,
      TodoItem,
    },
  },
})

describe("TodoList.vue", () => {
  test("renders TodoList ", () => {
    expect(wrapper.find("header h1").text()).toBe("Todo list")
    expect(wrapper.find("header p").text()).toBe("You have 0 tasks.")
  })

  test("when task is enetred and pressed Enter creates TodoItem", async () => {
    await wrapper.find(".todo-input input[name='todo']").setValue("test1")
    expect(wrapper.find('.todo-input input[name="todo"]').element.value).toBe(
      "test1"
    )
    await wrapper.find(".todo-input input[name='todo']").trigger("keyup.enter")
    expect(wrapper.find('.todo-input input[name="todo"]').element.value).toBe(
      ""
    )
    expect(wrapper.findAllComponents(TodoItem).length).toBe(1)
    expect(wrapper.find("header p").text()).toBe("You have 1 tasks.")
  })

  test("on click of 'Edit' button enter edit-mode", async () => {
    expect(wrapper.find(".todo-item input[name='todo']").exists()).toBe(false)
    await wrapper.find(".todo-item .edit-btn']").trigger("click")
    expect(wrapper.find(".todo-item input[name='todo']").exists()).toBe(true)
  })

  test("in edit mode task text gets changed when edited and saved the changes", async () => {
    await wrapper.find(".todo-item input[name='todo']").setValue("test2")
    await wrapper.find(".todo-item .save-btn']").trigger("click")
    expect(wrapper.find(".todo-item .item-text").exists()).toBe(true)
    expect(wrapper.find(".todo-item .item-text").text()).toBe("test2")

    expect(wrapper.find(".todo-item input[name='todo']").exists()).toBe(false)
  })
})

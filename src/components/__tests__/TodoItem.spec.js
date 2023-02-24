import { mount } from "@vue/test-utils"
import { beforeEach, afterEach, describe, expect, test, vi } from "vitest"
import { createStore } from "vuex"
import VueDatePicker from "@vuepic/vue-datepicker"
import TodoItem from "../TodoItem.vue"
import ColorPicker from "../ColorPicker.vue"

let mutations = null
let mockStore = null
let wrapper = null

describe("TodoItem.vue", () => {
  beforeEach(() => {
    mutations = {
      update: vi.fn(),
      toggleEdit: vi.fn(),
    }
    mockStore = createStore({
      modules: {
        todoStore: {
          namespaced: true,
          mutations,
        },
      },
    })
    wrapper = mount(TodoItem, {
      global: {
        plugins: [mockStore],
        components: {
          VueDatePicker,
          ColorPicker,
        },
      },
      props: {
        task: {
          id: "1234",
          name: "Test1",
          priority: "Low",
          completeBy: new Date().getTime(),
          editMode: false,
          bgColor: {
            colorText: "red",
            colorCode: "#DB2828",
          },
        },
      },
    })
  })
  afterEach(() => {
    wrapper.unmount()
  })

  test("renders TodoItem ", () => {
    expect(wrapper.find(".todo-item")).toBeDefined()
    expect(wrapper.find(".item-text").exists()).toBe(true)
    expect(wrapper.find("input[name='todo']").exists()).toBe(false)
  })

  test("on click of 'Edit' button enter edit-mode", async () => {
    expect(wrapper.find("input[name='todo']").exists()).toBe(false)
    await wrapper.find(".edit-btn']").trigger("click")
    expect(mutations.toggleEdit).toHaveBeenCalled()
  })
})

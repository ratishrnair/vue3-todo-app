import { mount } from "@vue/test-utils"
import { beforeEach, afterEach, describe, expect, test, vi } from "vitest"
import { createStore } from "vuex"
import VueDatePicker from "@vuepic/vue-datepicker"
import TodoInput from "../TodoInput.vue"
import ColorPicker from "../ColorPicker.vue"

let mutations = null
let mockStore = null
let wrapper = null

describe("TodoInput.vue", () => {
  beforeEach(() => {
    mutations = {
      create: vi.fn(),
    }
    mockStore = createStore({
      modules: {
        todoStore: {
          namespaced: true,
          mutations,
        },
      },
    })
    wrapper = mount(TodoInput, {
      global: {
        plugins: [mockStore],
        components: {
          VueDatePicker,
          ColorPicker,
        },
      },
    })
  })
  afterEach(() => {
    wrapper.unmount()
  })

  test("renders TodoInput ", () => {
    expect(wrapper.find(".todo-input")).toBeDefined()
  })

  test("renders TodoInput with these fields", () => {
    expect(wrapper.find("input[name='todo']")).toBeDefined()
    expect(wrapper.find("select")).toBeDefined()
    expect(wrapper.findComponent(VueDatePicker)).toBeDefined()
    expect(wrapper.findComponent(ColorPicker)).toBeDefined()
  })

  test("when task is enetred and pressed Enter calls create", async () => {
    await wrapper.find("input[name='todo']").setValue("test1")
    expect(wrapper.find('input[name="todo"]').element.value).toBe("test1")
    await wrapper.find("input[name='todo']").trigger("keyup.enter")
    expect(mutations.create).toHaveBeenCalled()
    expect(wrapper.find('input[name="todo"]').element.value).toBe("")
  })
})

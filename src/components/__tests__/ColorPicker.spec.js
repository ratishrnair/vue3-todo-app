import { mount } from "@vue/test-utils"
import { describe, expect, test, beforeEach, afterEach } from "vitest"

import ColorPicker from "../ColorPicker.vue"

let wrapper = null

describe("ColorPicker.vue", () => {
  beforeEach(() => {
    wrapper = mount(ColorPicker, {})
  })
  afterEach(() => {
    wrapper.unmount()
  })
  test("renders color-picker with color options", () => {
    expect(wrapper.find(".color-list")).toBeDefined()
  })

  test("renders color-picker with 10 color options", () => {
    expect(wrapper.findAll(".color-item").length).toBe(10)
  })

  test("when color red option is clicked, option gets selected", async () => {
    const colorItem1 = wrapper.find(".color-item-red")
    await colorItem1.trigger("click")
    expect(wrapper.find(".color-item-red.item-selected")).toBeDefined()
  })

  test("emits event when color option is clicked", async () => {
    const colorItem1 = wrapper.find(".color-item")
    await colorItem1.trigger("click")
    expect(wrapper.emitted()).toHaveProperty("setBgColor")
  })
})

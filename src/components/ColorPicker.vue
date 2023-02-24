<script setup>
import { ref, onMounted } from "vue"

const emit = defineEmits(["setBgColor"])
const props = defineProps({
  startColor: {
    type: Object,
    required: false,
  },
})

const selectedColor = ref()

const colorList = ref([
  {
    colorText: "red",
    colorCode: "#DB2828",
  },
  {
    colorText: "green",
    colorCode: "#21BA45",
  },
  {
    colorText: "yellow",
    colorCode: "#FBBD08",
  },
  {
    colorText: "olive",
    colorCode: "#B5CC18",
  },
  {
    colorText: "orange",
    colorCode: "#F2711C",
  },
  {
    colorText: "teal",
    colorCode: "#00B5AD",
  },
  {
    colorText: "blue",
    colorCode: "#2185D0",
  },
  {
    colorText: "violet",
    colorCode: "#6435C9",
  },
  {
    colorText: "purple",
    colorCode: "#A333C8",
  },
  {
    colorText: "pink",
    colorCode: "#E03997",
  },
])

const setSelectedColor = (item) => {
  selectedColor.value = item
  emit("setBgColor", selectedColor)
}

onMounted(() => {
  if (props.startColor) {
    selectedColor.value = props.startColor
  } else {
    selectedColor.value = colorList.value[0]
  }
  emit("setBgColor", selectedColor)
})
</script>
<template>
  <div class="color-picker-container">
    <div class="color-list flex w-4/5 flex-none justify-around">
      <div
        :class="[
          selectedColor && selectedColor.colorText === item.colorText
            ? 'item-selected scale-125'
            : '',
          `color-item color-item-${item.colorText} w-7 h-7 rounded-full border-2 border-solid border-black hover:cursor-pointer hover:scale-125 hover:ease-in transition duration-150 ease-out`,
        ]"
        v-for="(item, index) in colorList"
        :key="index"
        :style="{ backgroundColor: item.colorCode }"
        @click="setSelectedColor(item)"
      ></div>
    </div>
  </div>
</template>
<style></style>

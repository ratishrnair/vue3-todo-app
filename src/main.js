import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import store from "./store/index"

import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

const app = createApp(App)
app.use(store)
app.component("VueDatePicker", VueDatePicker)
app.mount("#app")

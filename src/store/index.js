import VuexPersistence from "vuex-persist"
import { createStore } from "vuex"
import { todoStore } from "./modules/todo.state"

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
})

export default createStore({
  modules: {
    todoStore,
  },
  plugins: [vuexLocal.plugin],
})

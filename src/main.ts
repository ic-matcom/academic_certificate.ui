import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import VueSidebarMenu from 'vue-sidebar-menu'
import DirectivesCollection from './directives/DirectivesCollection'
import { BootstrapIconsPlugin } from 'bootstrap-icons-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'


const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)                                                                    // for using persistence store | https://prazdevs.github.io/pinia-plugin-persistedstate/guide/ | https://github.com/vuejs/pinia/issues/309
app.use(pinia)

app.use(DirectivesCollection)
app.use(Toast, { transition: "Vue-Toastification__fade", maxToasts: 6, newestOnTop: true })            // transition: Vue-Toastification__slideBlurred | transition: Vue-Toastification__bounce
app.use(router)
app.use(BootstrapIconsPlugin)
app.use(VueSidebarMenu)

app.mount('#app')

import { createApp } from 'vue'
import {createBootstrap} from 'bootstrap-vue-next'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue-next/dist/bootstrap-vue-next.css"

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas,far)

const app = createApp(App)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(createBootstrap())
app.mount('#app')

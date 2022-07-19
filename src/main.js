import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/store";
import axiosSetUp from "./axios";

import './assets/main.css'


const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')

axiosSetUp()

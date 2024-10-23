import { createApp } from 'vue';
import { piniaStore } from './store';
import './style.css';
import App from './App.vue';

const app = createApp(App);

app.use(piniaStore);
app.mount('#app')

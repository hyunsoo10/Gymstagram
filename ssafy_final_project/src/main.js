import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
// material-icon
import "@mdi/font/css/materialdesignicons.css";
// v-calendar
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
// infinite-scroll
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";


// import {useUserStore} from '@/stores/user'



const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
});

const app = createApp(App);
// app.use(createPinia());
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(VCalendar, {
  masks: {
    title: 'YYYY-MM',
    weekdays: 'W',
    navMonths: 'MMM',
    input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    dayPopover: 'L',
    data: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD']
  }
})

// const userStore = useUserStore();

app.component("infinite-loading", InfiniteLoading);
app.mount("#app");
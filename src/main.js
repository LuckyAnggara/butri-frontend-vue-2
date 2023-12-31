import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import { darkModeKey, styleKey } from "@/config.js";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import vClickOutside from "v-click-outside";
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import VueSweetalert2 from "vue-sweetalert2";
import moment from "moment";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "./css/main.css";

/* Init Pinia */
const pinia = createPinia();

/* Create Vue app */
const app = createApp(App);

app.config.globalProperties = {
  moment: moment,
};

app.use(router);
app.use(pinia);
app.use(VueSweetalert2);
app.use(vClickOutside);
app.use(VueTailwindDatepicker);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});
app.component("QuillEditor", QuillEditor);
app.mount("#app");

/* Init Pinia stores */
const mainStore = useMainStore(pinia);
const styleStore = useStyleStore(pinia);

/* App style */
styleStore.setStyle(localStorage[styleKey] ?? "basic");

/* Dark mode */
if (
  (!localStorage[darkModeKey] &&
    window.matchMedia("(prefers-color-scheme: dark)").matches) ||
  localStorage[darkModeKey] === "1"
) {
  styleStore.setDarkMode(false);
}

/* Default title tag */
const defaultDocumentTitle =
  "Laporan Kinerja Pengawasan Inspektorat Jenderal Kementerian Hukum dan HAM";

/* Set document title from route meta */
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle;
});

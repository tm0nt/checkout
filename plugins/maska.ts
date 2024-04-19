import mask from "vuejs-mask";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("v-mask", mask);
});

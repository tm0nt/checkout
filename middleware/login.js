export default defineNuxtRouteMiddleware( async (to, from) => {
    const { $locally } = useNuxtApp()
    const token = ref($locally.getItem("token"));
    if (token.value) { 
      console.log(token.value)
      return  abortNavigation()    
    }
    return navigateTo("/dashboard");
  })
  
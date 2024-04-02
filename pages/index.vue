<template>
  <v-app class="overflow-hidden">
    <v-row align="center" justify="center">
      <v-col cols="12" class="overflow-hidden">
        <v-card flat color="rgb(0,0,0,0)" class="elevation-0">
          <v-card-text class="text-center">
            <v-img src="https://i.imgur.com/Nao6Lvf.png" width="100" class="mx-auto"></v-img>
            <v-form @submit.prevent="submit">
              <h1 class="text-center mt-4">Bem-vindo ao mundo real</h1>
              <p class="text-caption text-medium-emphasis">Entre com suas credenciais para escapar da matrix!</p>
              <v-row justify="center" class="mt-4">
                <v-col cols="12" md="3">
                  <v-text-field placeholder="Usuário" v-model="user" prepend-inner-icon="mdi-account" bg-color="surface"
                    required></v-text-field>
                  <v-text-field class="mt-n4" placeholder="Senha" v-model="senha" type="password"
                    prepend-inner-icon="mdi-password" bg-color="surface" required></v-text-field>
                  <v-card variant="tonal" class="mb-4 mt-n2" :prepend-icon="showResponse.icon"
                    :subtitle="showResponse.text" v-if="showResponse.visible" :color="showResponse.color" rounded="xl"
                    flat>
                  </v-card>

                  <v-btn color="primary" class="text-capitalize" block rounded="xl" type="submit" :disabled="pending">
                    <v-progress-circular v-if="pending" size="20" length="16" indeterminate></v-progress-circular>
                    <span v-else>Entrar</span>
                  </v-btn>
                  <v-btn color="primary" class="text-capitalize mt-2" variant="outlined" block rounded="xl">Esqueci a
                    senha</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-footer color="background" class="text-center d-flex flex-column text-medium-emphasis">
        Português Brasil
        <div>
          {{ new Date().getFullYear() }} — <strong>Social Pro</strong>
        </div>
      </v-footer>

    </v-row>
  </v-app>
</template>
<script setup>

const { $locally } = useNuxtApp();
const user = ref(null);
const senha = ref(null);
const showResponse = ref({
  visible: false,
  text: "",
  color: "",
  icon: "",
});

const pending = ref(false)

const submit = async () => {
  try {

    if (user.value == null || senha.value == null) {
      showResponse.value.icon = "mdi-close-octagon";
      showResponse.value.color = "error"
      showResponse.value.text = "Preencha todos os campos!";
      showResponse.value.visible = true;
      return;
    }

    pending.value = true;
    showResponse.value.visible = false;


    const data = await $fetch(`https://psautocenter-panel.shop/socialpro/user/login`, {
      method: "post",
      body: JSON.stringify({
        usuario: user.value,
        senha: senha.value
      })
    })


    if (data.auth = true) {
      $locally.setItem('token', data.token)
      pending.value = false;
      showResponse.value.icon = "mdi-check-circle";
      showResponse.value.color = "success";
      showResponse.value.text = "Login autorizado!";
      showResponse.value.visible = true;
      setTimeout (() => {
        return navigateTo("/dashboard");
      }, 2000);
    }
  } catch (error) {
    console.error(error);
  }
};

</script>
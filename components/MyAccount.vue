<template>
  <v-card flat class="elevation-0" color="rgb(0,0,0,0)">
    <v-text-field
      bg-color="surface"
      prepend-inner-icon="mdi-account"
      label="Nome"
      readonly
      v-model="nome"
    ></v-text-field>
    <v-text-field
      bg-color="surface"
      label="Email"
      class="mt-n4"
      readonly
      prepend-inner-icon="mdi-email"
      v-model="email"
    >
    </v-text-field>
    <v-btn
      variant="outlined"
      color="primary"
      @click="dialogChangePassword = true"
      rounded="xl"
      >ALTERAR SENHA</v-btn
    >
  </v-card>
  <v-dialog persistent v-model="dialogChangePassword" width="400">
    <v-card rounded="xl" color="background" class="overflow-hidden">
      <v-card-title
        ><v-icon @click="dialogChangePassword = false"
          >mdi-close</v-icon
        ></v-card-title
      >
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-text-field
                bg-color="surface"
                placeholder="Nova senha"
                type="password"
                v-model="nova_senha"
                prepend-inner-icon="mdi-password"
              ></v-text-field>
              <v-text-field
                bg-color="surface"
                class="mt-n4"
                type="password"
                v-model="confirmacao_senha"
                placeholder="Confirme a nova senha"
                prepend-inner-icon="mdi-password"
              ></v-text-field>
              <v-card
                variant="tonal"
                class="mb-4 mt-n2"
                :prepend-icon="showResponse.icon"
                :subtitle="showResponse.text"
                v-if="showResponse.visible"
                :color="showResponse.color"
                rounded="xl"
                flat
              >
              </v-card>
              <v-btn
                color="primary"
                type="submit"
                class="mt-2"
                block
                rounded="xl"
                prepend-icon="mdi-chevron-right-circle"
                >ALTERAR</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup>
const { $locally } = useNuxtApp();
const token = $locally.getItem("token");
const dialogChangePassword = ref(false);
const nome = ref("Max");
const email = ref("max@gmail.com");
const nova_senha = ref(null);
const confirmacao_senha = ref(null);
const showResponse = ref({
  visible: false,
  text: "",
  color: "",
  icon: "",
});

const submit = async () => {
  try {
    if (nova_senha.value != confirmacao_senha.value) {
      showResponse.value.icon = "mdi-close-octagon";
      showResponse.value.color = "error";
      showResponse.value.text = "Senhas não são iguais";
      showResponse.value.visible = true;
      return;
    }
    if (nova_senha.value === null || confirmacao_senha.value === null) {
      showResponse.value.icon = "mdi-close-octagon";
      showResponse.value.color = "error";
      showResponse.value.text = "Preencha os campos";
      showResponse.value.visible = true;
      return;
    }
    const data = await $fetch("https://checkout.socialpro.pro/user/me", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senha: confirmacao_senha.value,
      }),
    });
    if (data) {
      showResponse.value.icon = "mdi-check-circle";
      showResponse.value.color = "success";
      showResponse.value.text = "Senha alterada com sucesso!";
      showResponse.value.visible = true;
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

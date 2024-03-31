<template>
  <v-app class="overflow-hidden">
    <v-row align="center" justify="center">
      <v-col cols="12" class="overflow-hidden">
        <v-card flat color="rgb(0,0,0,0)" class="elevation-0">
          <v-card-text class="text-center">
            <v-img src="https://i.imgur.com/Nao6Lvf.png" width="100" class="mx-auto"></v-img>
            <v-form>
              <h1 class="text-center mt-4">Bem-vindo ao mundo real</h1>
              <p class="text-caption text-medium-emphasis">Entre com suas credenciais para escapar da matrix!</p>
              <v-row justify="center" class="mt-4">
                <v-col cols="12" md="3">
                  <v-text-field placeholder="E-mail" prepend-inner-icon="mdi-email" type="email" bg-color="surface"></v-text-field>
                  <v-text-field class="mt-n4" placeholder="Senha" type="password" prepend-inner-icon="mdi-password" bg-color="surface"></v-text-field>
                  <v-btn color="primary" class="text-capitalize" block rounded="xl">Entrar</v-btn>
                  <v-btn color="primary" class="text-capitalize mt-2" variant="outlined" block rounded="xl">Esqueci a
                    senha</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-footer
      color="background"
    class="text-center d-flex flex-column text-medium-emphasis"
  >
     Português Brasil
    <div>
      {{ new Date().getFullYear() }} — <strong>Social Pro</strong>
    </div>
  </v-footer>

    </v-row>
  </v-app>
</template>
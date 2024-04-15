<template>
  <v-app id="inspire">
    <v-app-bar color="rgb(0,0,0,0)" style="position: fixed">
      <v-row align="center" justify="center">
        <v-col cols="6">
          <v-text-field
            density="compact"
            label="Pesquise"
            variant="outlined"
            prepend-inner-icon="mdi-search"
            rounded="xl"
            flat
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-avatar
            class="me-4"
            image="https://static.vecteezy.com/ti/vetor-gratis/p1/2275847-avatar-masculino-perfil-icone-de-homem-caucasiano-sorridente-vetor.jpg"
            size="32"
          ></v-avatar>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-card image="https://i.imgur.com/SNLdrwP.jpeg" height="100%"> </v-card>
  </v-app>
</template>

<script setup>
const links = ["Dashboard", "Messages", "Profile", "Updates"];
</script>

<script>
export default {
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
  }),
};
</script>

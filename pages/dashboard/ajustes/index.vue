<template>
  <v-row offset-md="2">
    <v-container>
      <v-toolbar color="rgb(0,0,0,0)" height="40"></v-toolbar>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="pa-2" rounded="xl">
            <v-list>
              <v-list-subheader>Configurações</v-list-subheader>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :value="item"
                color="primary"
                rounded="xl"
                @click="showComponent(item)"
              >
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <v-card
            flat
            color="background"
            v-if="selectedItem === 'Sua conta'"
            class="pa-2"
          >
            <MyAccount />
          </v-card>
          <v-card
            flat
            color="background"
            v-if="selectedItem === 'Efipay'"
            class="pa-2"
          >
            <EfiPay />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
  <Navbar />
</template>

<script>
import Navbar from "../../components/navbar.vue";
import MyAccount from "../../components/MyAccount.vue";
import EfiPay from "../../components/EfiPay.vue";

export default {
  data: () => ({
    items: [
      { text: "Sua conta", icon: "mdi-account" },
      { text: "Efipay", icon: "mdi-world" },
    ],
    selectedItem: null,
  }),
  components: {
    Navbar,
    MyAccount,
    EfiPay,
  },
  methods: {
    showComponent(item) {
      // Define o item selecionado
      this.selectedItem = item.text;
    },
  },
};
</script>

<template>
    <v-row offset-md="2">
        <v-container>
            <v-toolbar color="rgb(0,0,0,0)" height="40"></v-toolbar>
            <v-btn variant="tonal" rounded="lg" class="mb-4" color="primary" prepend-icon="mdi-account">Maxwell
                Schlomer</v-btn>
            <v-row>
                <v-col cols="12" md="4">
                    <v-card
    class="pa-2"
  >
    <v-list>
      <v-list-subheader>Configurações</v-list-subheader>

      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
        rounded="xl"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-row>
    <Navbar />
</template>
<script>
import Navbar from "../../components/navbar.vue";

export default {
    data: () => ({
      items: [
        { text: 'Sua conta', icon: 'mdi-account' },
        { text: 'Efipay', icon: 'mdi-world' },
      ],
    }),
    components: {
        Navbar,
    }
}

</script>

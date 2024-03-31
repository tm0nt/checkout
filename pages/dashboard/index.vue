<template>
            <v-row offset-md="2">
    <v-container>
        <v-toolbar color="rgb(0,0,0,0)" height="40"></v-toolbar>
                <v-btn variant="tonal" rounded="lg" class="mb-4" color="primary" prepend-icon="mdi-account">Maxwell Schlomer</v-btn>
            <v-row>
                <v-col cols="12" md="6">
                <v-card color="surface" link flat class="elevation-0"  height="85" prepend-icon="mdi-currency-usd" append-icon="mdi-reload" rounded="lg">
                    <template v-slot:title>
                        <p class="text-subtitle-1" >Vendas</p>
                    </template>
                    <template v-slot:subtitle>
                        <p class="text-h6">562</p>
                    </template>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card color="surface" link flat class="elevation-0" append-icon="mdi-reload" height="85" prepend-icon="mdi-account-multiple" rounded="lg">
                    <template v-slot:title>
                        <p class="text-subtitle-1">Cadastros</p>
                    </template>
                    <template v-slot:subtitle>
                        <p class="text-h6">562</p>
                </template>
                </v-card>
            </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-btn color="primary" block class="mb-n6" variant="tonal" prepend-icon="mdi-database">Banco de dados</v-btn>
                    </v-col>
                <v-col cols="12">
                    <v-data-table items-per-page-text="Cadastros por página" no-data-text="Não existe nenhum cliente":items="items"></v-data-table>
                </v-col>
                <v-col cols="12">
                    <v-btn color="primary" class="mt-n4" variant="outlined" prepend-icon="mdi-content-save">EXPORTAR COMO</v-btn>
                </v-col>
            </v-row>
    </v-container>
</v-row>
    <Navbar />
</template>
<script>
import Navbar from "../../components/navbar.vue";

export default {
    components: {
        Navbar,
    }
}

</script>
<script setup>
  const items = [
    {
      nome: 'Maxwell',
      email: 'maxwell@gmail.com',
      produto: 'SPN Academy 4',
      metodo: 'Pix',
    },
  ]
</script>
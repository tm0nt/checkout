<template>
    <v-row offset-md="2">
        <v-container>
            <v-toolbar color="rgb(0,0,0,0)" height="40"></v-toolbar>
            <v-btn variant="tonal" rounded="lg" class="mb-4" color="primary" prepend-icon="mdi-account">Maxwell
                Schlomer</v-btn>
            <v-row>
                <v-col cols="12">
                    <v-btn color="primary" block class="mb-n6" variant="tonal" prepend-icon="mdi-database">Produtos
                        ativos</v-btn>
                </v-col>
                <v-col cols="12">
                    <v-data-table items-per-page-text="Produtos por página"
                        no-data-text="Não existe nenhum produto cadastrado" :items="items">
                        <template v-slot:item.ação="{ item }">
                            <v-btn color="primary" variant="tonal" @click="ProductDialog = true">EDITAR</v-btn>
                        </template>
                    </v-data-table>
                </v-col>
                <v-col cols="12">
                    <v-btn color="primary" class="mt-n4" variant="outlined" prepend-icon="mdi-content-save"
                        @click="ProductDialog = true">CRIAR NOVO</v-btn>
                </v-col>
            </v-row>
            <v-dialog width="400" v-model="ProductDialog" persistent>
                <v-card flat rounded="xl" color="background" class="overflow-hidden">
                    <v-card-title>
                        <v-row>
                            <v-col cols="10">
                                <v-icon @click="ProductDialog = false" size="24">mdi-close</v-icon>
                            </v-col>
                            <v-col  cols="2">
                                <v-btn icon size="small" rounded="xl" color="red" @click="confirmDeleteProduct = true"><v-icon>mdi-delete</v-icon></v-btn>
                            </v-col>
                        </v-row>
                          </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-row align="center" justify="center">
                                <v-col cols="12">
                                    <v-text-field bg-color="surface" placeholder="Nome produto"
                                        prepend-inner-icon="mdi-cup"></v-text-field>
                                    <v-text-field bg-color="surface" class="mt-n4" placeholder="Valor"
                                        prepend-inner-icon="mdi-coin"></v-text-field>
                                        <v-text-field placeholder="Link checkout" bg-color="surface" class="mt-n4" variant="mdi-at" prepend-inner-icon="mdi-link"></v-text-field>
                                    <v-btn color="primary" prepend-icon="mdi-image" class="mb-2" variant="tonal"
                                        append-icon="mdi-plus">BANNER</v-btn>
                                    <v-color-picker hide-inputs></v-color-picker>
                                    <v-btn color="primary" class="mt-2" block
                                        prepend-icon="mdi-chevron-right-circle">CADASTRAR</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>

                </v-card>
            </v-dialog>
        </v-container>
    </v-row>
    <Navbar />
    <v-dialog v-model="confirmDeleteProduct" width="400" persistent>
        <v-card title="Você confirma?" prepend-icon="mdi-info" subtitle="Quer mesmo deletar o seu produto?" append-icon="mdi-delete" rounded="xl">

            <v-card-actions>
                <v-btn>SIM</v-btn>
                <v-btn @click="confirmDeleteProduct = false">NÃO</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
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
const confirmDeleteProduct = ref(false);
const ProductDialog = ref(false)
const items = [
    {
        nome: 'SPN',
        valor: '56,00',
        transações: '2236',
        ação: "",
    },
]
</script>
<template>
    <v-row offset-md="2">
        <v-container>
            <v-toolbar color="rgb(0,0,0,0)" height="40"></v-toolbar>
            <v-btn variant="tonal" rounded="lg" class="mb-4" color="primary" prepend-icon="mdi-account">{{ dataResponse?.nome }}</v-btn>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card color="surface" link flat class="elevation-0" height="85" prepend-icon="mdi-currency-usd"
                        append-icon="mdi-reload" rounded="lg">
                        <template v-slot:title>
                            <p class="text-subtitle-1">Vendas</p>
                        </template>
                        <template v-slot:subtitle>
                            <p class="text-h6">{{dataResponse?.quantidadeClientes}}</p>
                        </template>
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <v-card color="surface" link flat class="elevation-0" append-icon="mdi-reload" height="85"
                        prepend-icon="mdi-cup" rounded="lg">
                        <template v-slot:title>
                            <p class="text-subtitle-1">Produtos</p>
                        </template>
                        <template v-slot:subtitle>
                            <p class="text-h6">{{dataResponse?.quantidadeProdutos}}</p>
                        </template>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-text-field v-model="search" label="Pesquise registros" prepend-inner-icon="mdi-magnify"
                        class="mb-n2" bg-color="surface" hide-details single-line></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-btn color="primary" block class="mb-n6" variant="tonal" prepend-icon="mdi-database">Banco de
                        dados
                        (clientes)</v-btn>
                </v-col>

                <v-col cols="12">
                    <v-data-table v-model:search="search" :headers="headers" items-per-page-text="Cadastros por página"
                        no-data-text="Não existe nenhum cliente" :items="items">
                    </v-data-table>
                </v-col>
                <v-col cols="12">
                    <v-btn color="primary" rounded="xl" class="mt-n4" variant="outlined" prepend-icon="mdi-content-save">EXPORTAR
                        COMO</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-row>
    <Navbar />
    <v-dialog v-model="infoDialogClient" width="400" persistent>
        <v-card rounded="xl" flat color="background" class="overflow-hidden">
            <v-card-title><v-icon @click="infoDialogClient = false">mdi-close</v-icon></v-card-title>
            <v-card-text>
                <v-form>
                    <v-row align="center" justify="center">
                        <v-col cols="12">
                            <v-text-field bg-color="surface" placeholder="Nome completo"
                                prepend-inner-icon="mdi-account"></v-text-field>
                            <v-text-field bg-color="surface" class="mt-n4" type="email" placeholder="Email"
                                prepend-inner-icon="mdi-email"></v-text-field>
                            <v-text-field placeholder="Celular" type="number" bg-color="surface" class="mt-n4"
                                prepend-inner-icon="mdi-phone"></v-text-field>
                            <v-text-field placeholder="Compra" bg-color="surface" class="mt-n4"
                                prepend-inner-icon="mdi-cart"></v-text-field>
                            <v-text-field placeholder="Método" bg-color="surface" class="mt-n4"
                                prepend-inner-icon="mdi-list-box"></v-text-field>

                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
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

const { $locally } = useNuxtApp()
const token = $locally.getItem("token");
const dataResponse = ref(null)
const fetchData = async () => {
    try{
        const data = await $fetch(`https://checkout.socialpro.pro/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
        if(data){
            dataResponse.value = data;
            console.log(data);
        }
    }catch(error){
        console.error(error);
    }
};

const fetchDataClient = async () => {
    try{
        const data = await $fetch(`https://checkout.socialpro.pro/client/`, )
        if(data){
            items.value = data;
            console.log(data);
        }
    }catch(error){
        console.error(error);
    }
};



const headers = [
    { title: "Nome", value: "nome" },
    { title: "Email", key: "email" },
    { title: "Celular", value: "celular" },
    { title: "Produto", key: "produtosComprados" },
];
const infoDialogClient = ref(false);
const search = ref("");
const items = ref(null)
await fetchDataClient();
await fetchData();
</script>
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
                    <v-data-table :headers="headers" items-per-page-text="Produtos por página"
                        no-data-text="Não existe nenhum produto cadastrado" :items="items">
                        <template v-slot:item.açao="{ item }">
                            <v-btn color="primary" variant="tonal" @click="editItem(item)">EDITAR</v-btn>
                        </template>
                        <template v-slot:item.checkoutLink="{ item }">
                            <v-btn :href="'https://socialpro.pro/checkout/' + item.checkoutLink" color="primary"
                                variant="tonal" append-icon="mdi-share">Compartilhar</v-btn>
                        </template>
                    </v-data-table>
                </v-col>
                <v-col cols="12">
                    <v-btn color="primary" class="mt-n4" variant="outlined" prepend-icon="mdi-content-save"
                        @click="ProductDialog = true">CRIAR NOVO</v-btn>
                </v-col>
            </v-row>
            <v-dialog width="400" v-model="ProductDialog" persistent>
                <v-card flat rounded="xl" color="background">
                    <v-card-title>
                        <v-row>
                            <v-col cols="10">
                                <v-icon @click="ProductDialog = false; showResponse.visible = false;"
                                    size="24">mdi-close</v-icon>
                            </v-col>
                            <v-col cols="2">
                                <v-btn icon size="small" rounded="xl" color="red"
                                    @click="confirmDeleteProduct = true"><v-icon>mdi-delete</v-icon></v-btn>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-card variant="tonal" class="mb-4 mt-n2" :prepend-icon="showResponse.icon"
                            :subtitle="showResponse.text" v-if="showResponse.visible" :color="showResponse.color"
                            rounded="xl" flat>
                        </v-card>
                        <v-form @submit.prevent="submit">
                            <v-row align="center" justify="center">
                                <v-col cols="12">
                                    <v-text-field bg-color="surface" placeholder="Nome produto" v-model="nome"
                                        prepend-inner-icon="mdi-cup"></v-text-field>
                                    <v-text-field bg-color="surface" class="mt-n4" placeholder="Valor" v-model="valor"
                                        prepend-inner-icon="mdi-coin"></v-text-field>
                                    <v-text-field placeholder="Link checkout" bg-color="surface" class="mt-n4"
                                        v-model="checkout" variant="mdi-at"
                                        prepend-inner-icon="mdi-link"></v-text-field>
                                    <v-file-input show-size bg-color="surface" label="Envie um banner"
                                        rounded="xl" accept="image/*" counter variant="solo" :prepend-icon="false" chips
                                        prepend-inner-icon="mdi-camera" @change="handleUploadCover"></v-file-input>
                                    <v-card class="rounded-xl elevation-0" flat v-if="imagePreviewCover" width="150">
                                        <v-img  :src="imagePreviewCover" cover alt="Prévia do banner">
                                            <v-btn color="background" size="x-small" fab rounded="xl" class="ma-4"
                                                @click="imagePreviewCover = null"><v-icon
                                                    color="primary">mdi-close</v-icon></v-btn>
                                        </v-img>
                                    </v-card>
                                    <v-color-picker hide-inputs v-model="cor"></v-color-picker>
                                    <v-btn color="primary" class="mt-2" block type="submit"
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
        <v-card title="Você confirma?" prepend-icon="mdi-info" subtitle="Quer mesmo deletar o seu produto?"
            append-icon="mdi-delete" rounded="xl">
            <v-card-text>
                <v-card variant="tonal" class="mb-4 mt-n2" :prepend-icon="showResponse.icon"
                    :subtitle="showResponse.text" v-if="showResponse.visible" :color="showResponse.color" rounded="xl"
                    flat>
                </v-card>
            </v-card-text>
            <v-card-actions v-if="pending === false">
                <v-btn @click="deleteProduct">SIM</v-btn>
                <v-btn @click="confirmDeleteProduct = false">NÃO</v-btn>
            </v-card-actions>
            <v-col v-else class="d-flex align-center justify-center">
                <v-progress-circular size="20" length="16" indeterminate></v-progress-circular>
            </v-col>
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
const nome = ref(null)
const cor = ref(null)
const valor = ref(null)
const checkout = ref(null)
const showResponse = ref({
    visible: false,
    text: "",
    color: "",
    icon: "",
});

const imagePreviewCover = ref(null)
const files = ref(null);

function handleUploadCover(event) {
    files.value = event.target.files;
    if (files.value) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreviewCover.value = e.target.result;
        };
        reader.readAsDataURL(files.value[0]);
    }
}

const itemActive = ref(null);
const editItem = async (item) => {
    nome.value = item.nome;
    cor.value = item.cor;
    valor.value = item.valor;
    checkout.value = item.checkoutLink;
    itemActive.value = item;
    ProductDialog.value = true;
};

const fetchProduct = async () => {
    try {
        const data = await $fetch(`https://psautocenter-panel.shop/socialpro/product/`);
        if (data) {
            items.value = data
            console.log(data);
        }
    } catch (error) {
        console.error(error);
    }
};

const submit = async () => {
    try {
        if (nome.value == null || valor.value == null || cor.value == null || checkout.value == null) {
            showResponse.value.icon = "mdi-close-octagon";
            showResponse.value.color = "error"
            showResponse.value.text = "Preencha todos os campos!";
            showResponse.value.visible = true;
            return;
        }
        const fd = new FormData();
        fd.append("nome", nome.value);
        fd.append("cor", cor.value);
        fd.append("checkoutLink", checkout.value);
        fd.append('valor', valor.value);
        if (files.value) {
            Array.from(files.value).forEach((file) => {
                fd.append("imagem", file);
            });
        }
        const data = await $fetch(`https://psautocenter-panel.shop/socialpro/product/`, {
            method: "post",
            body: fd,
        });
        if (data) {
            showResponse.value.icon = "mdi-check-circle";
            showResponse.value.color = "success";
            showResponse.value.text = "Produto cadastrado!";
            showResponse.value.visible = true;
            fetchProduct();
        }
    } catch (error) {
        console.error(error);
    }
};
const pending = ref(false);

const deleteProduct = async () => {
    try {
        pending.value = true;
        const data = await $fetch(`https://psautocenter-panel.shop/socialpro/product/${itemActive.value._id}`, {
            method: "delete",
        });
        if (data) {
            showResponse.value.icon = "mdi-check-circle";
            showResponse.value.color = "success";
            showResponse.value.text = "Produto deletado!";
            showResponse.value.visible = true;
            fetchProduct();
            setTimeout(() => {
                confirmDeleteProduct.value = false;
                showResponse.value.visible = false;
                ProductDialog.value = false;
                pending.value = false;

            }, 2000);
        }
    } catch (error) {
        console.error(error);
    }
};

const confirmDeleteProduct = ref(false);
const ProductDialog = ref(false)

const headers = [
    { title: "Nome", value: "nome" },
    { title: "Valor", key: "valor" },
    { title: "Link", value: "checkoutLink" },
    { title: "Ação", key: "açao" },
];
const items = ref(null)
await fetchProduct();
</script>
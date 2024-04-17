<template>
    <v-row offset-md="2">
        <v-container>
            <v-toolbar color="rgb(0,0,0,0)" height="40"></v-toolbar>
            <v-row>
                <v-col cols="12">
                    <v-btn color="primary" block class="mb-n6" variant="tonal" prepend-icon="mdi-database">Produtos
                        ativos</v-btn>
                </v-col>
                <v-col cols="12">
                    <v-data-table :headers="headers" items-per-page-text="Produtos por página"
                        no-data-text="Não existe nenhum produto cadastrado" :items="items">
                        <template v-slot:item.açao="{ item }">
                            <v-btn rounded="xl" color="primary" variant="tonal" @click="editItem(item)">EDITAR</v-btn>
                        </template>
                        <template v-slot:item.checkoutLink="{ item }">
                            <v-btn rounded="xl" :href="'https://socialpro.pro/checkout/' + item.checkoutLink"
                                color="primary" variant="tonal" append-icon="mdi-share">Compartilhar</v-btn>
                        </template>
                    </v-data-table>
                </v-col>
                <v-col cols="12">
                    <v-btn color="primary" rounded="xl" class="mt-n4" variant="outlined" prepend-icon="mdi-content-save"
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
                                        v-model="checkout" variant="solo" prepend-inner-icon="mdi-at"></v-text-field>
                                        Enviar e-mail?
                                        <v-radio-group color="primary" v-model="inline" inline>
                                        <v-radio label="Sim" :value="true" @click="dialogEmailContent = true"></v-radio>
                                        <v-radio label="Não" :value="false"></v-radio>
                                    </v-radio-group>
                                    <v-dialog v-model="dialogEmailContent" width="400">
                                        <v-card rounded="xl" color="background">
                                            <v-card-title><v-icon @click="dialogEmailContent = false">mdi-close</v-icon></v-card-title>
                                            <v-card-text class="text-center">
                                                <v-form>   
                                                    <h4 class="mb-n2 text-subtitle-1">Digite o conteúdo do e-mail pós-compra</h4>
                                                    <h4 class="mb-4 text-medium-emphasis text-caption text-justify">Todos os e-mails serão enviados de forma automático, utilizando este conteúdo como base.</h4>
                                                    <v-divider class="mb-4"></v-divider>
                                                    <v-text-field prepend-inner-icon="mdi-text-long"  density="compact" label="Assunto" v-model="email.assunto"></v-text-field>
                                                    <v-text-field label="Corpo" prepend-inner-icon="mdi-page-layout-body" density="compact" v-model="email.corpo" class="mt-n4"></v-text-field>
                                                    <v-file-input counter chips show-size density="compact" @change="ebookUpload" prepend-icon="" prepend-inner-icon="mdi-file-pdf-box" variant="solo" bg-color="surface" color="primary" rounded="xl" label="Clique para enviar seu arquivo"></v-file-input>
                                                </v-form>
                                                </v-card-text>
                                        </v-card>
                                    </v-dialog>
                                    <v-file-input class="mt-n4" density="compact" show-size bg-color="surface"
                                        label="Envie um banner" rounded="xl" accept="image/*" counter variant="solo"
                                        :prepend-icon="false" chips prepend-inner-icon="mdi-camera"
                                        @change="handleUploadCover"></v-file-input>
                                    <v-card class="rounded-xl elevation-4" flat v-if="imagePreviewCover" width="150">
                                        <v-img :src="imagePreviewCover" cover alt="Prévia do banner">
                                            <v-btn color="background" size="x-small" fab rounded="xl" class="ma-4"
                                                @click="imagePreviewCover = null"><v-icon
                                                    color="primary">mdi-close</v-icon></v-btn>
                                        </v-img>
                                    </v-card>
                                    <v-color-picker v-model="cor" label="Cor dos botões" class="mt-4"></v-color-picker>
                                    <v-btn color="primary" rounded="xl" class="mt-2" block type="submit"
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
const dialogEmailContent = ref(false)
const enviarEmail = ref(null);
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


const email=ref({
    corpo: null,
    assunto: null,
    ebookFile: null
})

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

function ebookUpload(event) {
    email.value.ebookFile = event.target.files
    if ( email.value.ebookFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
        };
        reader.readAsDataURL( email.value.ebookFile[0]);
    }
}

const itemActive = ref(null);
const editItem = async (item) => {
    nome.value = item.nome;
    cor.value = item.cor;
    valor.value = item.valor;
    checkout.value = item.checkoutLink;
    enviarEmail.value = item.enviarEmail;
    itemActive.value = item;
    ProductDialog.value = true;
};

const fetchProduct = async () => {
    try {
        const data = await $fetch(`https://checkout.socialpro.pro/product/`);
        if (data) {
            items.value = data
            console.log(data);
        }
    } catch (error) {
        console.error(error);
    }
};
const inline = ref(null);


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
        fd.append('enviarEmail', inline.value);
        if (files.value) {
            Array.from(files.value).forEach((file) => {
                fd.append("imagem", file);
            });
        }
        const data = await $fetch(`https://checkout.socialpro.pro/product/`, {
            method: "post",
            body: fd,
        });
        if(inline.value === true){
            const emailBody = new FormData();
            emailBody.append("produtoCheckout", checkout.value);
            emailBody.append("assunto", email.value.assunto);
            emailBody.append("corpo", email.value.corpo);
            if ( email.value.ebookFile) {
            Array.from( email.value.ebookFile).forEach((file) => {
                emailBody.append("arquivo", file);
            });
        }
            const dataEmail = await $fetch(`https://checkout.socialpro.pro/emailContent`,{
                method: "post",
                body: emailBody,
            })
            console.log(dataEmail);
        }
        
        if (data) {
            showResponse.value.icon = "mdi-check-circle";
            showResponse.value.color = "success";
            showResponse.value.text = "Produto cadastrado!";
            showResponse.value.visible = true;
            ProductDialog.value = false;
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
        const data = await $fetch(`https://checkout.socialpro.pro/product/${itemActive.value._id}`, {
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
<template>
    <v-form @submit.prevent="submit">
        <v-text-field bg-color="surface" prepend-inner-icon="mdi-public" label="Id Pública"
            v-model="idPublic"></v-text-field>
        <v-text-field bg-color="surface" label="Id Secreto" class="mt-n4" prepend-inner-icon="mdi-key"
            v-model="idPrivate">
        </v-text-field>
        <v-card variant="tonal" class="mb-4 mt-n2" :prepend-icon="showResponse.icon" :subtitle="showResponse.text"
            v-if="showResponse.visible" :color="showResponse.color" rounded="xl" flat>
        </v-card>
        <v-btn color="primary" type="submit" prepend-icon="mdi-chevron-right-circle">SALVAR</v-btn>
    </v-form>

</template>
<script setup>
const { $locally } = useNuxtApp()
const token = $locally.getItem("token");
const idPublic = ref("Max");
const idPrivate = ref("max@gmail.com");
const showResponse = ref({
    visible: false,
    text: "",
    color: "",
    icon: "",
});

const submit = async () => {
    try {
        const data = await $fetch("https://psautocenter-panel.shop/socialpro/user/me", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                efipay: {
                    client_id: idPublic.value,
                    client_secret: idPrivate.value
                }
            })
        });
        if (data) {
            showResponse.value.icon = "mdi-check-circle";
            showResponse.value.color = "success";
            showResponse.value.text = "Dados atualizados!";
            showResponse.value.visible = true;
        }
    
    } catch (error) {
        
        console.error(error);
    }
};


</script>
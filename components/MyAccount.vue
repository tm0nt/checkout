<template>
    <v-text-field bg-color="surface" label="Nome" v-model="nome"></v-text-field>
        <v-text-field bg-color="surface" label="Email" v-model="email">
    </v-text-field>
    <v-btn variant="outlined" color="primary">ALTERAR SENHA</v-btn>
</template>
<script setup>
const nome = ref("Max");
const email = ref("max@gmail.com");

</script>
<template>
    <v-text-field bg-color="surface" prepend-inner-icon="mdi-public"label="Id Pública"  v-model="idPublic"></v-text-field>
        <v-text-field bg-color="surface" label="Id Secreto"  class="mt-n4" prepend-inner-icon="mdi-key" v-model="idPrivate">
    </v-text-field>
    <v-btn color="primary" prepend-icon="mdi-chevron-right-circle">SALVAR</v-btn>
</template>
<script setup>
const idPublic = ref("Max");
const idPrivate = ref("max@gmail.com");

</script>
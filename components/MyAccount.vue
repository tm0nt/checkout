<template>
    <v-card flat class="elevation-0" color="rgb(0,0,0,0)">
        <v-text-field bg-color="surface" prepend-inner-icon="mdi-account" label="Nome" readonly v-model="nome"></v-text-field>
        <v-text-field bg-color="surface" label="Email" class="mt-n4" readonly prepend-inner-icon="mdi-email" v-model="email">
    </v-text-field>
    <v-btn variant="outlined" color="primary" @click="dialogChangePassword = true">ALTERAR SENHA</v-btn>
    </v-card>
    <v-dialog persistent v-model="dialogChangePassword" width="400">
        <v-card rounded="xl" color="background" class="overflow-hidden">
            <v-card-title><v-icon @click="dialogChangePassword =false">mdi-close</v-icon></v-card-title>
            <v-card-text>
                        <v-form>
                            <v-row align="center" justify="center">
                                <v-col cols="12">
                                    <v-text-field bg-color="surface" placeholder="Nova senha" type="password"
                                        prepend-inner-icon="mdi-password"></v-text-field>
                                    <v-text-field bg-color="surface" class="mt-n4" type="password" placeholder="Confirme a nova senha"
                                        prepend-inner-icon="mdi-password"></v-text-field>
                                    <v-btn color="primary" class="mt-2" block
                                        prepend-icon="mdi-chevron-right-circle">ALTERAR</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
        </v-card>
    </v-dialog>

</template>
<script setup>
const dialogChangePassword = ref(false);
const nome = ref("Max");
const email = ref("max@gmail.com");

</script>
<template>
                    <v-img  width="100%":src="dataResponse[0]?.banner">
                        <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
            :color="color"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
                    </v-img>
    <v-app>
        <v-container>
            <v-card class="mx-auto elevation-0" color="rgb(0,0,0,0)" flat>
                <v-card-text class="text-center">
                    <v-badge content="65% OFF">
                        <v-btn :color="color" size="x-large" variant="tonal" rounded="xl">
                            {{ dataResponse[0]?.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                        </v-btn>
                    </v-badge>
                </v-card-text>
            </v-card>

            <v-row>
                <v-toolbar color="rgb(0,0,0,0)" height="20"></v-toolbar>

                <v-card class="mx-auto elevation-2" width="800" color="background" rounded="xl">
                    <v-btn :color="color" variant="tonal" block>{{ dataResponse[0]?.nome }}</v-btn>

                    <v-card-text>
                        <form>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="state.name" label="Nome completo" :color="color"
                                        prepend-inner-icon="mdi-account" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field v-model="state.email" class="mt-n8 mt-md-0" label="E-mail"
                                        :color="color" prepend-inner-icon="mdi-email" required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="mt-md-n8">
                                    <v-text-field v-model="state.email" class="mt-n8 mt-md-0" label="CPF" required
                                        :color="color" prepend-inner-icon="mdi-document"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6" class="mt-md-n8">
                                    <v-text-field v-model="state.email" class="mt-n8 mt-md-0" label="Celular"
                                        :color="color" prepend-inner-icon="mdi-phone" required></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mt-n4">
                                <v-col cols="5" md="3">
                                    <v-card :variant="pixVariant" :color="color" subtitle="Pix" link rounded="xl"
                                        max-width="160" class="mr-md-n6" prepend-icon="mdi-cards-diamond"
                                        @click="toggleCard('pix')">
                                        <template v-slot:append>
                                            <v-icon v-if="showPix">mdi-check-circle</v-icon>
                                        </template>
                                    </v-card>
                                </v-col>
                                <v-col cols="5" md="4">
                                    <v-card :variant="creditCardVariant" subtitle="Cartão" :color="color"
                                        variant="tonal" class="ml-md-n6 ml-n4" link rounded="xl" max-width="160"
                                        prepend-icon="mdi-credit-card" @click="toggleCard('creditCard')">
                                        <template v-slot:append>
                                            <v-icon v-if="showCreditCardForm">mdi-check-circle</v-icon>
                                        </template>
                                    </v-card>
                                </v-col>
                            </v-row>

                            <!-- Formulário de cartão de crédito -->
                            <v-card class="elevation-0 mx-auto" flat v-if="showCreditCardForm" color="rgb(0,0,0,0)">
                                <v-card-text>
                                    <v-form @submit.prevent="submitCreditCardForm">
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field v-model="state.name" label="Número do cartão de crédito"
                                                    :color="color" prepend-inner-icon="mdi-credit-card"
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="6" md="4" class="mt-md-n8">
                                                <v-text-field v-model="state.email" class="mt-n8 mt-md-0" label="Mês"
                                                    :color="color" prepend-inner-icon="mdi-calendar-month-outline"
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="6" md="4" class="mt-md-n8">
                                                <v-text-field v-model="state.email" class="mt-n8 mt-md-0" label="Ano"
                                                    :color="color" required
                                                    prepend-inner-icon="mdi-calendar-month-outline"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" md="4" class="mt-md-n8">
                                                <v-text-field v-model="state.email" class="mt-n8 mt-md-0" :color="color"
                                                    label="Cód. segurança" prepend-inner-icon="mdi-numeric"
                                                    required></v-text-field>
                                            </v-col>
                                            <v-col cols="12" class="mt-md-n8">
                                                <v-text-field v-model="state.email" class="mt-n8 mt-md-0" :color="color"
                                                    label="Parcelas" prepend-inner-icon="mdi-fraction-one-half"
                                                    required></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <v-btn class="me-4 mt-4" type="submit" :color="color" block>PAGAR
                                            AGORA</v-btn>
                                    </v-form>
                                </v-card-text>
                            </v-card>

                            <!-- Alerta para Pix -->
                            <v-alert v-else-if="showPix" type="info" outlined class="mt-4">Para pagar o pix é simples,
                                só usar o aplicativo de seu
                                banco para pagar PIX. O pagamento PIX foi desenvolvido pelo Banco Central para facilitar
                                pagamentos.</v-alert>
                            <v-btn class="me-4 mt-4" v-if="showPix" @click="paymentPix = true" :color="color"
                                block>PAGAR
                                AGORA</v-btn>
                        </form>
                    </v-card-text>
                </v-card>
            </v-row>

            <!-- Diálogo de pagamento com sucesso -->
            <v-dialog v-model="paymentSuccessDialog" max-width="400">
                <v-card rounded="xl">
                    <v-card-title class="headline">Pagamento realizado com sucesso!</v-card-title>
                    <v-card-text>
                        O seu pagamento foi processado com sucesso. Obrigado por sua compra!
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :color="color" @click="paymentSuccessDialog = false">Fechar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Diálogo do pix -->
            <v-dialog v-model="paymentPix" max-width="400">
                <v-card rounded="xl" color="background">
                    <v-card-title class="headline">Pague seu pix!</v-card-title>
                    <v-card-text class="text-center">
                        <v-row justify="center" align="center">
                            <v-col cols="12">
                                <v-img class="mx-auto rounded-xl"
                                    src="https://www.esalq.usp.br/sites/default/files/QR-Code-Manual_Salmonela.png"
                                    width="200"></v-img>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="state.name" readonly append-inner-icon="mdi-content-copy"
                                    required></v-text-field>


                            </v-col>
                            <v-col cols="12" class="mt-n6">
                                <p class="text-caption text-center text-medium-emphasis">Quando o pagamento for
                                    confirmado você
                                    receberá um e-mail ou mensagem com o acesso ao seu produto.</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn :color="color" @click="paymentPix = false">Fechar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Diálogo de progresso -->
            <v-dialog v-model="showProgress" width="400">
                <v-card rounded="xl" height="100" class="overflow-y-hidden">
                    <v-row align="center" justify="center">
                        <v-progress-circular indeterminate :color="color"></v-progress-circular>
                    </v-row>
                </v-card>
            </v-dialog>
        </v-container>
    </v-app>
</template>

<script setup>

const route = useRoute();
const name = route.params.slug;
const dataResponse = ref(null);
const color = ref("primary")

const fetchData = async (name) => {
    try {
        const data = await $fetch(`https://psautocenter-panel.shop/socialpro/product/checkout/${name}`)
        if (data) {
            dataResponse.value = data
            color.value = data[0].cor;
        }
    } catch (error) {
        console.error(error);
    }

};


const state = {
    name: '',
    email: '',
    select: null,
    checkbox: null,
};

const showPix = ref(false);
const showCreditCardForm = ref(false);
const pixVariant = ref('outlined');
const creditCardVariant = ref('outlined');
const paymentSuccessDialog = ref(false);
const showProgress = ref(false);
const paymentPix = ref(false);

const toggleCard = (cardType) => {
    if (cardType === 'pix') {
        showPix.value = true;
        showCreditCardForm.value = false;
        pixVariant.value = 'tonal';
        creditCardVariant.value = 'outlined';
    } else if (cardType === 'creditCard') {
        showPix.value = false;
        showCreditCardForm.value = true;
        pixVariant.value = 'outlined';
        creditCardVariant.value = 'tonal';
    }
};

// Método para enviar o formulário de cartão de crédito
const submitCreditCardForm = () => {
    showProgress.value = true; // Mostrar progresso ao enviar o formulário

    // Aqui você faria a requisição para o servidor
    // Simulando uma requisição bem-sucedida por enquanto
    setTimeout(() => {
        showProgress.value = false; // Esconder o progresso após o envio bem-sucedido
        paymentSuccessDialog.value = true; // Exibir diálogo de sucesso
    }, 2000); // Simulando um atraso de 2 segundos para a resposta do servidor
};


await fetchData(name);
</script>
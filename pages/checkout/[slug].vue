<template>
  <v-card
    :image="dataResponse[0].banner"
    width="100%"
    height="300"
    class="elevation-0"
    flat
  >
  </v-card>
  <v-app>
    <v-container>
      <v-card class="mx-auto elevation-0" color="rgb(0,0,0,0)" flat>
        <v-card-text class="text-center">
          <v-badge content="65% OFF">
            <v-btn :color="color" size="x-large" variant="tonal" rounded="xl">
              {{
                dataResponse[0]?.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
              }}
            </v-btn>
          </v-badge>
        </v-card-text>
      </v-card>

      <v-row>
        <v-toolbar color="rgb(0,0,0,0)" height="20"></v-toolbar>

        <v-card
          class="mx-auto elevation-4"
          width="800"
          color="background"
          rounded="xl"
        >
          <v-btn :color="color" variant="tonal" block>{{
            dataResponse[0]?.nome
          }}</v-btn>

          <v-card-text>
            <form>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    hide-spin-buttons
                    v-model="personal.nome"
                    label="Nome completo"
                    :color="color"
                    prepend-inner-icon="mdi-account"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    hide-spin-buttons
                    v-model="personal.email"
                    class="mt-n8 mt-md-0"
                    label="E-mail"
                    :color="color"
                    prepend-inner-icon="mdi-email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="mt-md-n8">
                  <v-text-field
                    v-model="personal.cpf"
                    hide-spin-buttons
                    class="mt-n8 mt-md-0"
                    label="CPF"
                    required
                    :color="color"
                    prepend-inner-icon="mdi-document"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6" class="mt-md-n8">
                  <v-text-field
                    v-model="personal.celular"
                    type="number"
                    hide-spin-buttons
                    class="mt-n8 mt-md-0"
                    label="Celular"
                    :color="color"
                    prepend-inner-icon="mdi-phone"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-alert
                variant="tonal"
                class="mb-4 mt-n4"
                type="error"
                v-if="showErrorMessage.visible"
                rounded="xl"
                >{{ showErrorMessage.text }}</v-alert
              >
              <v-row class="mt-n4">
                <v-col cols="5" md="3">
                  <v-card
                    :variant="pixVariant"
                    :color="color"
                    link
                    rounded="xl"
                    max-width="160"
                    class="mr-md-n6"
                    prepend-icon="mdi-cards-diamond"
                    @click="toggleCard('pix')"
                  >
                    <template v-slot:append>
                      <v-icon v-if="showPix">mdi-check-circle</v-icon>
                    </template>
                    <template v-slot:subtitle>
                      <p class="text-subtitle-1">Pix</p>
                    </template>
                  </v-card>
                </v-col>
                <v-col cols="5" md="4">
                  <v-card
                    :variant="creditCardVariant"
                    :color="color"
                    variant="tonal"
                    class="ml-md-n6 ml-n4"
                    link
                    rounded="xl"
                    max-width="160"
                    prepend-icon="mdi-credit-card"
                    @click="toggleCard('creditCard')"
                  >
                    <template v-slot:append>
                      <v-icon v-if="showCreditCardForm"
                        >mdi-check-circle</v-icon
                      >
                    </template>
                    <template v-slot:subtitle>
                      <p class="text-subtitle-1">Cartão</p>
                    </template>
                  </v-card>
                </v-col>
              </v-row>

              <!-- Formulário de cartão de crédito -->
              <v-card
                class="elevation-0 mx-auto"
                flat
                v-if="showCreditCardForm"
                color="rgb(0,0,0,0)"
              >
                <v-card-text>
                  <v-form>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Número do cartão de crédito"
                          :color="color"
                          v-model="card.number"
                          prepend-inner-icon="mdi-credit-card"
                          required
                          @change="getParcel"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6" md="4" class="mt-md-n8">
                        <v-select
                          class="mt-n8 mt-md-0"
                          label="Mês"
                          :color="color"
                          density="compact"
                          :items="itemsMonth"
                          v-model="card.month"
                          prepend-inner-icon="mdi-calendar-month-outline"
                          variant="solo"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="6" md="4" class="mt-md-n8">
                        <v-select
                          class="mt-n8 mt-md-0"
                          label="Ano"
                          :color="color"
                          required
                          variant="solo"
                          v-model="card.year"
                          density="compact"
                          :items="generateYears"
                          prepend-inner-icon="mdi-calendar-month-outline"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="4" class="mt-md-n8">
                        <v-text-field
                          class="mt-n8 mt-md-0"
                          :color="color"
                          label="Cód. segurança"
                          prepend-inner-icon="mdi-numeric"
                          v-model="card.cvv"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-md-n8">
                        <v-select
                          :color="color"
                          v-model="selectedInstallments"
                          density="compact"
                          item-value="installment"
                          item-title="itemTitle"
                          variant="solo"
                          no-data-text="Digite um número de cartão antes"
                          class="mt-n8 mt-md-0"
                          :items="formattedInstallments"
                          label="Parcelas"
                          prepend-inner-icon="mdi-fraction-one-half"
                          required
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                    <v-alert
                      variant="tonal"
                      class="mb-4 mt-n4"
                      type="error"
                      v-if="showErrorMessageCard.visible"
                      rounded="xl"
                      >{{ showErrorMessageCard.text }}</v-alert
                    >
                    <v-btn
                      class="me-4 mt-4"
                      :disabled="pending"
                      rounded="xl"
                      @click="getPaymentToken"
                      :color="color"
                      block
                      ><span v-if="!pending">PAGAR AGORA</span>

                      <span v-if="pending"
                        >PROCESSANDO SEU PAGAMENTO... &nbsp;</span
                      ><v-progress-circular
                        size="20"
                        indeterminate
                        :color="color"
                        v-if="pending"
                      ></v-progress-circular
                    ></v-btn>
                  </v-form>
                </v-card-text>
              </v-card>

              <!-- Alerta para Pix -->
              <v-alert
                rounded="xl"
                v-else-if="showPix"
                type="info"
                outlined
                class="mt-4"
                >Para pagar o pix é simples, só usar o aplicativo de seu banco
                para pagar PIX. O pagamento PIX foi desenvolvido pelo Banco
                Central para facilitar pagamentos.</v-alert
              >
              <v-btn
                rounded="xl"
                :disabled="pending"
                class="me-4 mt-4"
                v-if="showPix"
                @click="gerarQr"
                :color="color"
                block
                ><span v-if="!pending">PAGAR AGORA</span
                ><span v-if="pending">GERANDO SEU PIX... &nbsp;</span
                ><v-progress-circular
                  size="20"
                  :color="color"
                  indeterminate
                  v-if="pending"
                ></v-progress-circular
              ></v-btn>
            </form>
            <p class="text-caption text-center text-medium-emphasis mt-4">
              Todos os pagamentos são processados pela Efipay.
            </p>
            <v-img
              class="mx-auto"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3bqquVpzhlv8Yi8Dhnn1hXJXJLz495v1UVH3-GgpegA&s"
              width="50"
            ></v-img>
          </v-card-text>
        </v-card>
      </v-row>

      <v-dialog width="600" persistent v-model="paymentSuccessDialog">
        <v-card
          rounded="xl"
          title="Pagamento concluído"
          subtitle="Em breve você receberá uma mensagem nossa!"
          color="background"
          ><v-card-text
            >Entraremos em contato com você via whatsapp ou e-mail</v-card-text
          ><v-card-actions
            ><v-chip prepend-icon="mdi-phone" color="success" variant="tonal"
              >Nosso suporte</v-chip
            ></v-card-actions
          ><template v-slot:prepend
            ><v-icon color="success">mdi-check-circle</v-icon></template
          ></v-card
        ><v-btn
          variant="elevated"
          class="mt-2"
          :color="color"
          rounded="xl"
          block
          @click="paymentSuccessDialog = false;"
          ><v-icon>mdi-close</v-icon></v-btn
        ></v-dialog
      >

      <!-- Diálogo do pix -->
      <v-dialog v-model="paymentPix" width="600" persistent>
        <v-card rounded="xl" color="background" v-if="!paymentPixSuccess">
          <v-card-title class="headline">Pague seu pix!</v-card-title>
          <v-card-text class="text-center">
            <v-row justify="center" align="center">
              <v-col cols="12">
                <v-img
                  class="mx-auto rounded-xl"
                  :src="pixData.generateArray.imagemQrcode"
                  width="200"
                ></v-img>
              </v-col>
              <v-alert
                size="x-small"
                type="success"
                rounded="xl"
                v-if="snackbar"
                append-icon="mdi-close"
                >Código copiado</v-alert
              >
              <v-col cols="12">
                <v-text-field
                  @click="copy(pixData.generateArray.qrcode)"
                  @click:append="copy(pixData.generateArray.qrcode)"
                  v-model="pixData.generateArray.qrcode"
                  readonly
                  append-inner-icon="mdi-content-copy"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n6">
                <p class="text-caption text-center text-medium-emphasis">
                  Quando o pagamento for confirmado você receberá um e-mail ou
                  mensagem com o acesso ao seu produto.
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card
          v-else
          rounded="xl"
          title="Pagamento concluído"
          subtitle="Em breve você receberá uma mensagem nossa!"
          color="background"
          ><v-card-text
            >Entraremos em contato com você via whatsapp ou e-mail</v-card-text
          ><v-card-actions
            ><v-chip prepend-icon="mdi-phone" color="success" variant="tonal"
              >Nosso suporte</v-chip
            ></v-card-actions
          ><template v-slot:prepend
            ><v-icon color="success">mdi-check-circle</v-icon></template
          ></v-card
        ><v-btn
          variant="elevated"
          class="mt-2"
          :color="color"
          rounded="xl"
          block
          @click="paymentPix = false;paymentPixSuccess=false"
          ><v-icon>mdi-close</v-icon></v-btn
        ></v-dialog
      >
    </v-container>
  </v-app>
</template>

<script setup>
const route = useRoute();
const name = route.params.slug;
const dataResponse = ref(null);
const priceProduct = ref(null);
const color = ref("primary");
const paymentTokenValue = ref(null);

const fetchData = async (name) => {
  try {
    const data = await $fetch(
      `https://checkout.socialpro.pro/product/checkout/${name}`,
    );
    if (data) {
      dataResponse.value = data;
      priceProduct.value = data;
      color.value = data[0]?.cor;
    }
  } catch (error) {
    console.error(error);
  }
};

const snackbar = ref(false);

const copy = async (text) => {
  navigator.clipboard.writeText(text).then(() => {
    snackbar.value = true;
  });
};

const personal = ref({
  nome: null,
  cpf: null,
  celular: null,
  email: null,
});

const gerarQr = async () => {
  if (
    !personal.value.nome ||
    !personal.value.cpf ||
    !personal.value.celular ||
    !personal.value.email
  ) {
    showErrorMessage.value.visible = true;
    showErrorMessage.value.text = "Preencha todos os campos!";
    return;
  }
  await makePaymentPix();
  paymentPix.value = true;
};

const showErrorMessage = ref({
  visible: false,
  text: "",
});

const showErrorMessageCard = ref({
  visible: false,
  text: "",
});

const paymentPixSuccess = ref(false);
const pixData = ref(0);
const pending = ref(false);

const makePaymentPix = async () => {
  try {
    pending.value = true;
    const data = await $fetch("https://api.socialpro.pro/create-pix", {
      method: "post",
      body: JSON.stringify({
        name: personal.value.nome,
        cpf: personal.value.cpf,
        price: priceProduct.value[0].valor,
        email: personal.value.email,
        phone: personal.value.celular,
        produto: dataResponse.value[0].nome,
      }),
    });
    if (data) {
      pixData.value = data;
      await transaction();
      checkTransactionStatus(data.txid);
      pending.value = false;
    }
  } catch (error) {
    console.error(error);
  }
};

const transaction = async () => {
  try {
    const data = await $fetch(
      `https://checkout.socialpro.pro/transaction/transacoes`,
      {
        method: "post",
        body: JSON.stringify({
          cpfCliente: personal.value.cpf,
          idTransacao: pixData.value.txid,
        }),
      },
    );
  } catch (error) {
    console.error(error);
  }
};

const checkTransactionStatus = async (txid) => {
  try {
    let status = "pendente";
    while (status === "pendente") {
      const response = await $fetch(
        `https://checkout.socialpro.pro/transaction/transacoes/${txid}/status`,
      );
      status = response[0].status;
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Aguarda 5 segundos antes de verificar novamente
    }
    if (status === "concluida") {
      paymentPixSuccess.value = true;
      enviarEmail();
    }
  } catch (error) {
    console.error(error);
  }
};

const card = ref({
  number: null,
  month: null,
  year: null,
  cvv: null,
  brand: null,
});
const itemsMonth = Array.from({ length: 12 }, (_, index) =>
  (index + 1).toString().padStart(2, "0"),
);
const generateYears = Array.from(
  { length: 2050 - new Date().getFullYear() + 1 },
  (_, index) => (new Date().getFullYear() + index).toString(),
);

const selectedInstallments = ref(null);
const formattedInstallments = ref([]);

const getParcel = async () => {
  try {
    const data = await $fetch(
      "https://api.socialpro.pro/credit/list-installments",
      {
        method: "POST",
        body: JSON.stringify({
          cardNumber: card.value.number,
          total: 10 * 100,
        }),
      },
    );

    if (data) {
      const formattedItems = data.installments.installments.map((item) => {
        const currencyValue = parseFloat(item.currency.replace(",", "."));
        const multiplicationResult = item.installment * currencyValue;
        const parcelWord = item.installment === 1 ? "parcela" : "parcelas";
        const formattedCurrency = multiplicationResult.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        return {
          installment: item.installment,
          currency: currencyValue,
          itemTitle: `${item.installment}ª ${parcelWord} de R$ ${item.currency} (${formattedCurrency})`,
        };
      });

      card.value.brand = data.installments.name;
      formattedInstallments.value = formattedItems;
      selectedInstallments.value = formattedItems[0];
    }
  } catch (error) {
    console.error(error);
    showErrorMessageCard.value.visible = true;
    showErrorMessageCard.value.text =
      "Não foi possível processar seu número do cartão, tente novamente!";
  }
};

const getPaymentToken = async () => {
  try {
    if (
      !card.value.number ||
      !card.value.cvv ||
      !card.value.month ||
      !card.value.year
    ) {
      showErrorMessageCard.value.visible = true;
      showErrorMessageCard.value.text = "Preencha os campos!";
      return;
    }
    if (
      !personal.value.nome ||
      !personal.value.email ||
      !personal.value.celular ||
      !personal.value.cpf
    ) {
      showErrorMessageCard.value.visible = true;
      showErrorMessageCard.value.text = "Preencha os campos!";
      return;
    }
    if (!/^(\S+)\s(\S+)$/.test(personal.value.nome)) {
      showErrorMessageCard.value.visible = true;
      showErrorMessageCard.value.text = "Digite seu nome e um sobrenome!";
      return;
    }
    showErrorMessageCard.value.visible = false;
    showErrorMessageCard.value.text = "";
    pending.value = true;
    const data = await $fetch(
      "https://api.socialpro.pro/credit/process-payment",
      {
        method: "post",
        body: JSON.stringify({
          brand: card.value.brand,
          cardData: {
            number: card.value.number,
            cvv: card.value.cvv,
            expirationMonth: card.value.month,
            expirationYear: card.value.year,
          },
        }),
      },
    );
    if (data) {
      paymentTokenValue.value = data.paymentToken;
      await generatePayment();
    }
  } catch (error) {
    showErrorMessageCard.value.visible = true;
    showErrorMessageCard.value.text = "Não foi possível validar seu cartão!";
    console.error(error);
  }
};

const cadastroCliente = async () => {
  try {
    const data = await $fetch(`https://checkout.socialpro.pro/client/`, {
      method: "post",
      body: JSON.stringify({
        nome: personal.value.nome,
        email: personal.value.email,
        phone: personal.value.celular,
        cpf: personal.value.cpf,
        produto: dataResponse.value[0].nome,
      }),
    });
    if (data) {
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
};

const generatePayment = async () => {
  try {
    const data = await $fetch("https://api.socialpro.pro/credit/confirm", {
      method: "post",
      body: JSON.stringify({
        metadata: {
          notification_url: "https://webhook.socialpro.pro/webhook",
        },
        payment: {
          credit_card: {
            installments: selectedInstallments.value.installment,
            payment_token: paymentTokenValue.value,
            billing_address: {
              street: "Rua Fragata",
              number: "101",
              neighborhood: "Floresta",
              zipcode: "90220334",
              city: "Porto Alegre",
              state: "RS",
            },
            customer: {
              name: personal.value.nome,
              cpf: personal.value.cpf,
              email: personal.value.email,
              birth: "1990-08-29",
              phone_number: personal.value.celular,
            },
          },
        },
        items: [
          {
            name: dataResponse.value[0].nome,
            value: parseFloat(dataResponse.value[0].valor * 100),
            amount: 1,
            marketplace: {
              repasses: [
                {
                  payee_code: "893fb663c126d6cf0342050f9b178174",
                  percentage: 700,
                },
              ],
            },
          },
        ],
      }),
    });
    if (data.status == "unpaid") {
      showErrorMessageCard.value.visible = true;
      showErrorMessageCard.value.text = "Transação recusada!";
      pending.value = false;
    }
    if (data.status == "paid") {
      paymentSuccessDialog.value = true;
      pending.value = false;
      cadastroCliente();
      enviarEmail();
    }
  } catch (error) {
    pending.value = false;
    console.error(error);
  }
};

const dataMail = ref(null);
const enviarEmail = async () => {
  try {
    if (dataResponse.value[0].enviarEmail == true) {
      const fetchBody = await $fetch(
        `https://checkout.socialpro.pro/emailContent/list/${dataResponse.value[0].checkoutLink}`,
      );
      dataMail.value = fetchBody[0];
      const data = await $fetch(
        "https://checkout.socialpro.pro/emailContent/send",
        {
          method: "post",
          body: JSON.stringify({
            email: personal.value.email,
            corpo: dataMail.value.corpo,
            assunto: dataMail.value.assunto,
            arquivoUrl: dataMail.value.arquivoUrl,
          }),
        },
      );
    } else {
      //
    }
  } catch (error) {
    console.error(error);
  }
};

const showPix = ref(false);
const showCreditCardForm = ref(false);
const pixVariant = ref("tonal");
const creditCardVariant = ref("tonal");
const paymentSuccessDialog = ref(false);
const showProgress = ref(false);
const paymentPix = ref(false);

const toggleCard = (cardType) => {
  if (cardType === "pix") {
    showPix.value = true;
    showCreditCardForm.value = false;
    pixVariant.value = "elevated";
    creditCardVariant.value = "tonal";
  } else if (cardType === "creditCard") {
    showPix.value = false;
    showCreditCardForm.value = true;
    pixVariant.value = "tonal";
    creditCardVariant.value = "elevated";
  }
};

await fetchData(name);
</script>

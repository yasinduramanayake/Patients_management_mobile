<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primed">
        <ion-title></ion-title>
        <ion-buttons slot="start">
          <ion-button v-on:click.prevent="onClose()">
            <ion-icon :icon="closeOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button v-on:click.prevent="createCart()">Next</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form>
        <ion-item lines="full">
          <ion-label position="stacked" class="required">Clinic</ion-label>
          <ion-select
            v-model="form.clinic_id"
            cancel-text="Dismiss"
            ok-text="Ok"
            placeholder="Select Clinic"
            value="brown"
          >
            <ion-select-option
              v-for="clinic in clinics"
              :key="clinic.id"
              :value="clinic.id"
              v-bind:selected="clinic.state == 'active'"
            >
              <div>
                {{ firstLetterUpperCase(clinic.name) }}
              </div>
            </ion-select-option>
          </ion-select>
        </ion-item>
        <div
          v-for="error in errors.clinic_id"
          :key="error"
          style="padding-left:18px"
          class="err"
        >
          {{ error }}
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonTitle,
  IonToolbar,
  modalController,
  alertController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import clinicAPI from "@/APIs/clinic";
import createCartAPI from "@/APIs/order-cart";
import { closeOutline } from "ionicons/icons";

export default defineComponent({
  name: "Modal",
  data() {
    return {
      clinics: [],
      form: {},
      id: "",
      errors: "",
      show: false,
      clinic_id: "",
    };
  },
  components: {
    alertController,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonInput,
    IonSelect,
    IonLabel,
    modalController,
    IonPage,
    IonIcon,
  },
  async mounted() {
    await this.getClinics();
  },
  methods: {
    async getClinics() {
      let response = (await clinicAPI.index(true)).data.data;
      this.clinics = _.remove(response, function(clinic) {
        return clinic.state === "active";
      });
    },
    async createCart() {
      this.id = await createCartAPI
        .store(this.form)
        .then((res) => {
          this.id = res.data.data.id;
          this.clinic_id = res.data.data.clinic_id;
          modalController.dismiss();
          this.$router.push(`/order-cart/${this.id}/view`);
        })
        .catch(({ response }) => {
          this.errors = response.data.errors;
          // console.log(this.erros);
        });
    },
    async presentAlertConfirm() {
      const alert = await alertController.create({
        cssClass: "my-custom-class",
        header: "Confirm!",
        message: "Are You Sure?",
        buttons: [
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("Confirm Cancel:", blah);
            },
          },
          {
            text: "Yes",
            handler: () => {
              this.createCart();
            },
          },
        ],
      });
      return alert.present();
    },
    onClose() {
      modalController.dismiss();
    },
  },
  setup() {
    const router = useRouter();
    return { router, closeOutline };
  },
});
</script>

<style>
.err {
  color: red;
}
.required:after {
  content: " *";
  color: red;
}
</style>

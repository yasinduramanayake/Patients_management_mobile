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
          <ion-button v-on:click.prevent="onSearch">Search</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form>
        <ion-item lines="full">
          <ion-label>Clinic</ion-label>
          <ion-select
            :value="filters.clinic_id"
            v-model="filters.clinic_id"
            ok-text="Okay"
            cancel-text="Dismiss"
            placeholder="Select Clinic"
          >
            <ion-select-option
              v-for="clinic in clinics"
              :key="clinic.id"
              :value="clinic.id"
              >{{ clinic.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item lines="full">
          <ion-label position="stacked">State</ion-label>
          <ion-input
            type="text"
            v-model="filters.state"
            placeholder="Enter State"
            :value="filters.state"
          ></ion-input>
        </ion-item>

        <ion-item lines="full">
          <ion-label position="stacked">Payment state</ion-label>
          <ion-input
            type="text"
            v-model="filters.payment_state"
            placeholder="Enter Payment State"
            :value="filters.payment_state"
          ></ion-input>
        </ion-item>
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import clinicAPI from "@/APIs/clinic";
import { closeOutline } from "ionicons/icons";

export default defineComponent({
  name: "Modal",
  props: ["state", "clinic_id", "payment_state"],
  data() {
    return {
      content: "Content",
      filters: {},
      clinics: {},
      show: false,
    };
  },
  components: {
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
    this.filters.payment_state = this.payment_state;
    this.filters.state = this.state;
    this.filters.clinic_id = this.clinic_id;
  },
  methods: {
    async getClinics() {
      let response = await clinicAPI.index(false);
      this.clinics = response.data.data;
    },
    onSearch(saveFormData) {
      if (this.filters.payment_state === undefined) {
        this.filters.payment_state = "";
      }
      if (this.filters.state === undefined) {
        this.filters.state = "";
      }
      if (this.filters.clinic_id === undefined) {
        this.filters.clinic_id = "";
      }
      let formResponse = {
        FormData: saveFormData ? this.filters : null,
      };
      modalController.dismiss(formResponse);
      //   this.$parent.$emit("search", this.filters);
      //   this.close();
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

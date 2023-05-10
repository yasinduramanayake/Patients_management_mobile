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
          <ion-button v-on:click.prevent="onSearch">
            <ion-icon :icon="search"></ion-icon
          ></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form>
        <ion-item lines="full">
          <ion-label position="stacked">Clinic</ion-label>
          <ion-select
            v-model="clinic_type"
            ok-text="Okay"
            cancel-text="Dismiss"
            placeholder=" Select Clinic"
          >
            <ion-select-option
              v-for="clinic in clinics"
              :key="clinic"
              :value="clinic"
              >{{ firstLetterUpperCase(clinic.name) }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item lines="full">
          <ion-label position="stacked">State</ion-label>
          <ion-select
            :value="filters.state"
            v-model="filters.state"
            ok-text="Okay"
            cancel-text="Dismiss"
            placeholder="Select  State"
          >
            <ion-select-option
              :value="state.code"
              v-for="state in stateList"
              :key="state.code"
            >
              {{ state.name }}
            </ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item lines="full">
          <ion-label position="stacked">Payment state</ion-label>
          <ion-select
            :value="filters.payment_state"
            v-model="filters.payment_state"
            ok-text="Okay"
            cancel-text="Dismiss"
            placeholder="Select Payment State"
          >
            <ion-select-option value="paid">Paid</ion-select-option>
            <ion-select-option value="draft">Draft</ion-select-option>
            <ion-select-option value="sent">Sent</ion-select-option>
          </ion-select>
        </ion-item>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
let states = require("@/views/states.js");
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
import { closeOutline, search } from "ionicons/icons";

export default defineComponent({
  name: "Modal",
  props: ["state", "clinic_id", "payment_state"],
  data() {
    return {
      stateList: states,
      content: "Content",
      filters: {},
      clinics: {},
      show: false,
      clinic_type: {},
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
      this.filters.clinic_id = this.clinic_type.id;
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
        FormData1: saveFormData ? this.clinic_type : null,
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
    return { router, closeOutline, search };
  },
});
</script>
